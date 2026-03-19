import type { SectionId, AnswerValue } from './questions';

export interface DbSession {
  id: string;
  startedAt: number;
  completedAt: number | null;
  isComplete: 0 | 1;
  sectionResultsJson: string;
  cognitiveEfficiencyScore: number | null;
}

export interface DbQuestionLog {
  id: string;
  sessionId: string;
  questionId: string;
  sectionId: SectionId;
  displayedAt: number;
  answeredAt: number;
  responseTimeMs: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: 0 | 1;
  isPractice: 0 | 1;
}

export interface DbSectionStat {
  id: string;
  sessionId: string;
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
