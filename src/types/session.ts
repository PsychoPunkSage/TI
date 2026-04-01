import type { SectionId, AnswerValue, Question } from './questions';

export type TestPhase =
  | 'idle'
  | 'instructions'
  | 'practice'
  | 'timed_test'
  | 'section_complete'
  | 'complete';

export interface QuestionLog {
  questionId: string;
  sectionId: SectionId;
  sessionId: string;
  displayedAt: number;
  answeredAt: number;
  responseTimeMs: number;
  selectedAnswer: AnswerValue;
  correctAnswer: AnswerValue;
  isCorrect: boolean;
  isPractice: boolean;
  questionSnapshot?: Question;
}

export interface SectionResult {
  sectionId: SectionId;
  totalAttempted: number;
  correctCount: number;
  accuracyPercent: number;
  avgResponseTimeMs: number;
  fastestResponseTimeMs: number;
  slowestResponseTimeMs: number;
  unanswered: number;
  cognitiveEfficiencyScore: number;
}

export interface Session {
  id: string;
  startedAt: number;
  completedAt: number | null;
  isComplete: boolean;
  sectionResults: Partial<Record<SectionId, SectionResult>>;
  cognitiveEfficiencyScore: number | null;
}
