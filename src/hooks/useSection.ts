import { useCallback } from 'react';
import { useSessionStore } from '@/store/sessionStore';

/**
 * Orchestrates practice → timed transitions and exposes section actions.
 * This is a thin wrapper — all state lives in sessionStore.
 */
export function useSection() {
  const {
    phase,
    currentSectionId,
    currentSectionIndex,
    practiceQuestions,
    timedQuestions,
    currentQuestionIndex,
    practiceAnswerLogs,
    timedAnswerLogs,
    completedSections,
    beginPractice,
    beginTimedTest,
    recordAnswer,
    forceCompleteSection,
    advanceSection,
  } = useSessionStore();

  const currentPracticeQuestion =
    phase === 'practice' ? practiceQuestions[currentQuestionIndex] ?? null : null;

  const currentTimedQuestion =
    phase === 'timed_test' ? timedQuestions[currentQuestionIndex] ?? null : null;

  const practiceComplete =
    phase === 'practice' && currentQuestionIndex >= practiceQuestions.length;

  const handleStartPractice = useCallback(() => {
    beginPractice();
  }, [beginPractice]);

  const handleStartTimedTest = useCallback(() => {
    beginTimedTest();
  }, [beginTimedTest]);

  const handleTimerExpiry = useCallback(() => {
    forceCompleteSection();
  }, [forceCompleteSection]);

  return {
    phase,
    currentSectionId,
    currentSectionIndex,
    currentPracticeQuestion,
    currentTimedQuestion,
    practiceQuestions,
    timedQuestions,
    currentQuestionIndex,
    practiceAnswerLogs,
    timedAnswerLogs,
    completedSections,
    practiceComplete,
    recordAnswer,
    handleStartPractice,
    handleStartTimedTest,
    handleTimerExpiry,
    advanceSection,
  };
}
