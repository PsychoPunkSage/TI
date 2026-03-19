import type { SectionId } from './questions';

export type TrendDirection = 'improving' | 'declining' | 'stable';

export interface SectionStats {
  sectionId: SectionId;
  sectionName: string;
  attemptNumber: number;
  sessionId: string;
  startedAt: number;
  accuracyPercent: number;
  avgResponseTimeMs: number;
  cognitiveEfficiencyScore: number;
}

export interface SectionTrend {
  sectionId: SectionId;
  sectionName: string;
  trendSlope: number;
  trendDirection: TrendDirection;
  dataPoints: Array<{
    attemptNumber: number;
    sessionId: string;
    startedAt: number;
    accuracyPercent: number;
    cognitiveEfficiencyScore: number;
  }>;
}

export interface CognitiveEfficiencyScore {
  overall: number;
  bySection: Partial<Record<SectionId, number>>;
}

export interface SectionExtreme {
  sectionId: SectionId;
  sectionName: string;
  bestCES: number;
  worstCES: number;
  averageCES: number;
  totalAttempts: number;
}

export interface AnalysisSummary {
  totalSessions: number;
  sectionTrends: SectionTrend[];
  sectionExtremes: SectionExtreme[];
  allSessionStats: SectionStats[];
}

export interface SessionSummary {
  sessionId: string;
  startedAt: number;
  completedAt: number | null;
  overallCES: number | null;
  sectionScores: Partial<Record<SectionId, number>>;
}
