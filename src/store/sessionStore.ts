import { create } from 'zustand';
import type { Question, SectionId, AnswerValue } from '@/types/questions';
import type { TestPhase, QuestionLog, SectionResult } from '@/types/session';
import { SECTION_ORDER } from '@/constants/sections';
import { preloadSection } from '@/engine/questions/index';
import { computeSectionResult, computeSessionCES } from '@/engine/scoring';
import { saveQuestionLog, saveSession, finalizeSession } from '@/db/mutations';

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

interface SessionState {
  sessionId: string | null;
  currentSectionIndex: number;
  currentSectionId: SectionId | null;
  phase: TestPhase;
  practiceQuestions: Question[];
  timedQuestions: Question[];
  currentQuestionIndex: number;
  questionStartTime: number;
  practiceAnswerLogs: QuestionLog[];
  timedAnswerLogs: QuestionLog[];
  completedSections: Partial<Record<SectionId, SectionResult>>;
  isSingleSection: boolean;
}

interface SessionActions {
  initSession: () => void;
  initSingleSectionSession: (sectionId: SectionId) => void;
  startSection: (sectionIndex: number) => void;
  beginPractice: () => void;
  beginTimedTest: () => void;
  recordAnswer: (answer: AnswerValue) => void;
  forceCompleteSection: () => void;
  advanceSection: () => void;
  completeSession: () => void;
  resetSession: () => void;
  cancelSession: (saveData: boolean) => Promise<void>;
}

const initialState: SessionState = {
  sessionId: null,
  currentSectionIndex: 0,
  currentSectionId: null,
  phase: 'idle',
  practiceQuestions: [],
  timedQuestions: [],
  currentQuestionIndex: 0,
  questionStartTime: 0,
  practiceAnswerLogs: [],
  timedAnswerLogs: [],
  completedSections: {},
  isSingleSection: false,
};

export const useSessionStore = create<SessionState & SessionActions>((set, get) => ({
  ...initialState,

  initSession: () => {
    const sessionId = generateId();
    set({
      ...initialState,
      sessionId,
      phase: 'instructions',
      currentSectionIndex: 0,
      currentSectionId: SECTION_ORDER[0].id,
      isSingleSection: false,
    });
    // Fire-and-forget: save initial session row
    void saveSession({
      id: sessionId,
      startedAt: Date.now(),
      completedAt: null,
      isComplete: false,
      sectionResults: {},
      cognitiveEfficiencyScore: null,
    });
  },

  initSingleSectionSession: (sectionId: SectionId) => {
    const sessionId = generateId();
    const sectionIndex = SECTION_ORDER.findIndex((s) => s.id === sectionId);
    set({
      ...initialState,
      sessionId,
      phase: 'instructions',
      currentSectionIndex: sectionIndex,
      currentSectionId: sectionId,
      isSingleSection: true,
    });
    void saveSession({
      id: sessionId,
      startedAt: Date.now(),
      completedAt: null,
      isComplete: false,
      sectionResults: {},
      cognitiveEfficiencyScore: null,
    });
  },

  startSection: (sectionIndex: number) => {
    const sectionId = SECTION_ORDER[sectionIndex].id;
    set({
      currentSectionIndex: sectionIndex,
      currentSectionId: sectionId,
      phase: 'instructions',
      practiceQuestions: [],
      timedQuestions: [],
      currentQuestionIndex: 0,
      practiceAnswerLogs: [],
      timedAnswerLogs: [],
    });
  },

  beginPractice: () => {
    const { currentSectionId } = get();
    if (!currentSectionId) return;
    const practiceQuestions = preloadSection(currentSectionId, true);
    set({
      phase: 'practice',
      practiceQuestions,
      currentQuestionIndex: 0,
      questionStartTime: Date.now(),
    });
  },

  beginTimedTest: () => {
    const { currentSectionId } = get();
    if (!currentSectionId) return;
    const timedQuestions = preloadSection(currentSectionId, false);
    set({
      phase: 'timed_test',
      timedQuestions,
      currentQuestionIndex: 0,
      timedAnswerLogs: [],
      questionStartTime: Date.now(),
    });
  },

  /**
   * CRITICAL: Must be 100% synchronous.
   * Capture response time, update index and startTime in single set() call.
   * DB write is fire-and-forget (void).
   */
  recordAnswer: (answer: AnswerValue) => {
    const state = get();
    const {
      sessionId,
      currentSectionId,
      phase,
      currentQuestionIndex,
      questionStartTime,
      practiceQuestions,
      timedQuestions,
      practiceAnswerLogs,
      timedAnswerLogs,
    } = state;

    if (!sessionId || !currentSectionId) return;

    const now = Date.now();
    const responseTimeMs = now - questionStartTime;
    const isPractice = phase === 'practice';
    const questions = isPractice ? practiceQuestions : timedQuestions;
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = String(currentQuestion.correctAnswer) === String(answer);

    const log: QuestionLog = {
      questionId: currentQuestion.id,
      sectionId: currentSectionId,
      sessionId,
      displayedAt: questionStartTime,
      answeredAt: now,
      responseTimeMs,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      isPractice,
    };

    const nextQuestionIndex = currentQuestionIndex + 1;
    const newStartTime = Date.now();

    if (isPractice) {
      const newLogs = [...practiceAnswerLogs, log];
      set({
        practiceAnswerLogs: newLogs,
        currentQuestionIndex: nextQuestionIndex,
        questionStartTime: newStartTime,
      });
    } else {
      const newLogs = [...timedAnswerLogs, log];
      const hasMoreQuestions = nextQuestionIndex < timedQuestions.length;
      set({
        timedAnswerLogs: newLogs,
        currentQuestionIndex: nextQuestionIndex,
        questionStartTime: newStartTime,
      });

      // Fire-and-forget DB write — after state update
      saveQuestionLog(log);

      if (!hasMoreQuestions) {
        // All questions answered — auto complete section
        get().forceCompleteSection();
      }
    }
  },

  forceCompleteSection: () => {
    const { currentSectionId, timedAnswerLogs, timedQuestions, completedSections } = get();
    if (!currentSectionId) return;

    const result = computeSectionResult(
      timedAnswerLogs,
      currentSectionId,
      timedQuestions.length
    );

    const newCompletedSections = {
      ...completedSections,
      [currentSectionId]: result,
    };

    set({
      phase: 'section_complete',
      completedSections: newCompletedSections,
    });
  },

  advanceSection: () => {
    const { currentSectionIndex, sessionId, completedSections, isSingleSection } = get();

    // Single section mode: always go to results after completing the one section
    if (isSingleSection) {
      const overallCES = computeSessionCES(completedSections);
      if (sessionId) {
        void finalizeSession(sessionId, overallCES, completedSections);
      }
      set({ phase: 'complete' });
      return;
    }

    const nextIndex = currentSectionIndex + 1;

    if (nextIndex >= SECTION_ORDER.length) {
      // All sections done
      const overallCES = computeSessionCES(completedSections);
      if (sessionId) {
        void finalizeSession(sessionId, overallCES, completedSections);
      }
      set({ phase: 'complete' });
    } else {
      const nextSectionId = SECTION_ORDER[nextIndex].id;
      set({
        currentSectionIndex: nextIndex,
        currentSectionId: nextSectionId,
        phase: 'instructions',
        practiceQuestions: [],
        timedQuestions: [],
        currentQuestionIndex: 0,
        practiceAnswerLogs: [],
        timedAnswerLogs: [],
      });
    }
  },

  completeSession: () => {
    const { sessionId, completedSections } = get();
    if (!sessionId) return;
    const overallCES = computeSessionCES(completedSections);
    void finalizeSession(sessionId, overallCES, completedSections);
    set({ phase: 'complete' });
  },

  resetSession: () => {
    set(initialState);
  },

  cancelSession: async (saveData: boolean): Promise<void> => {
    if (!saveData) {
      set(initialState);
      return;
    }

    const {
      sessionId,
      phase,
      currentSectionId,
      timedAnswerLogs,
      timedQuestions,
      completedSections,
    } = get();

    let updatedSections = { ...completedSections };

    // Capture partial timed data if currently mid-timed-test
    if (
      phase === 'timed_test' &&
      currentSectionId !== null &&
      timedAnswerLogs.length > 0
    ) {
      const partialResult = computeSectionResult(
        timedAnswerLogs,
        currentSectionId,
        timedQuestions.length
      );
      updatedSections = {
        ...updatedSections,
        [currentSectionId]: partialResult,
      };
    }

    const overallCES = computeSessionCES(updatedSections);

    if (sessionId) {
      await finalizeSession(sessionId, overallCES, updatedSections);
    }

    set({ phase: 'complete', completedSections: updatedSections });
  },
}));
