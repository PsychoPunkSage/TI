import type { SectionId } from '@/types/questions';
import type {
  AnalysisSummary,
  SectionStats,
  SectionTrend,
  SectionExtreme,
  TrendDirection,
} from '@/types/analytics';
import type { DbSession, DbSectionStat } from '@/types/db';
import { SECTION_ORDER } from '@/constants/sections';

/**
 * Simple linear regression: returns slope of best-fit line.
 * y = mx + b — we only need m (slope).
 */
function linearRegressionSlope(points: Array<{ x: number; y: number }>): number {
  const n = points.length;
  if (n < 2) return 0;

  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumX2 = points.reduce((acc, p) => acc + p.x * p.x, 0);

  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return 0;

  return (n * sumXY - sumX * sumY) / denom;
}

function classifyTrend(slope: number): TrendDirection {
  if (Math.abs(slope) < 0.5) return 'stable';
  return slope > 0 ? 'improving' : 'declining';
}

export function assembleAnalysisSummary(
  sessions: DbSession[],
  allSectionStats: DbSectionStat[]
): AnalysisSummary {
  // Sort sessions chronologically
  const sortedSessions = [...sessions]
    .filter((s) => s.isComplete === 1)
    .sort((a, b) => a.startedAt - b.startedAt);

  const totalSessions = sortedSessions.length;

  // Build a map of sessionId → attemptNumber (1-indexed)
  const attemptMap = new Map<string, number>();
  sortedSessions.forEach((s, i) => attemptMap.set(s.id, i + 1));

  // Convert DbSectionStats to SectionStats with attemptNumber
  const allStats: SectionStats[] = allSectionStats
    .map((stat) => {
      const session = sortedSessions.find((s) => s.id === stat.sessionId);
      if (!session) return null;
      const sectionMeta = SECTION_ORDER.find((s) => s.id === stat.sectionId);
      return {
        sectionId: stat.sectionId as SectionId,
        sectionName: sectionMeta?.name ?? stat.sectionId,
        attemptNumber: attemptMap.get(stat.sessionId) ?? 0,
        sessionId: stat.sessionId,
        startedAt: session.startedAt,
        accuracyPercent: stat.accuracyPercent,
        avgResponseTimeMs: stat.avgResponseTimeMs,
        cognitiveEfficiencyScore: stat.cognitiveEfficiencyScore,
      } satisfies SectionStats;
    })
    .filter((s): s is SectionStats => s !== null)
    .sort((a, b) => a.startedAt - b.startedAt);

  // Build section trends
  const sectionTrends: SectionTrend[] = SECTION_ORDER.map((sectionMeta) => {
    const sectionData = allStats.filter((s) => s.sectionId === sectionMeta.id);
    const points = sectionData.map((s) => ({
      x: s.attemptNumber,
      y: s.accuracyPercent,
    }));
    const slope = linearRegressionSlope(points);
    const direction = classifyTrend(slope);

    return {
      sectionId: sectionMeta.id,
      sectionName: sectionMeta.name,
      trendSlope: slope,
      trendDirection: direction,
      dataPoints: sectionData.map((s) => ({
        attemptNumber: s.attemptNumber,
        sessionId: s.sessionId,
        startedAt: s.startedAt,
        accuracyPercent: s.accuracyPercent,
        cognitiveEfficiencyScore: s.cognitiveEfficiencyScore,
      })),
    };
  });

  // Build section extremes
  const sectionExtremes: SectionExtreme[] = SECTION_ORDER.map((sectionMeta) => {
    const sectionData = allStats.filter((s) => s.sectionId === sectionMeta.id);
    if (sectionData.length === 0) {
      return {
        sectionId: sectionMeta.id,
        sectionName: sectionMeta.name,
        bestCES: 0,
        worstCES: 0,
        averageCES: 0,
        totalAttempts: 0,
      };
    }

    const scores = sectionData.map((s) => s.cognitiveEfficiencyScore);
    const bestCES = Math.max(...scores);
    const worstCES = Math.min(...scores);
    const averageCES = scores.reduce((a, b) => a + b, 0) / scores.length;

    return {
      sectionId: sectionMeta.id,
      sectionName: sectionMeta.name,
      bestCES,
      worstCES,
      averageCES,
      totalAttempts: sectionData.length,
    };
  });

  return {
    totalSessions,
    sectionTrends,
    sectionExtremes,
    allSessionStats: allStats,
  };
}
