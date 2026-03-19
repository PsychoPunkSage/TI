import type { SectionId } from '@/types/questions';
import type { QuestionLog, SectionResult } from '@/types/session';
import { getBenchmark } from '@/constants/benchmarks';

/**
 * Speed index: 100 = at or under benchmark, 0 = 2x benchmark or slower.
 * Clamped to [0, 100].
 */
export function computeSpeedIndex(avgMs: number, benchmarkMs: number): number {
  const raw = 100 - ((avgMs - benchmarkMs) / benchmarkMs) * 100;
  return Math.max(0, Math.min(100, raw));
}

/**
 * Cognitive Efficiency Score formula:
 * CES = (accuracyPercent × 0.6) + (speedIndex × 0.4)
 */
export function computeCES(
  accuracyPercent: number,
  speedIndex: number
): number {
  return (accuracyPercent * 0.6) + (speedIndex * 0.4);
}

export function computeSectionResult(
  logs: QuestionLog[],
  sectionId: SectionId,
  totalQuestionsInSection: number
): SectionResult {
  const timedLogs = logs.filter((l) => !l.isPractice && l.sectionId === sectionId);

  const totalAttempted = timedLogs.length;
  const correctCount = timedLogs.filter((l) => l.isCorrect).length;
  const accuracyPercent =
    totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0;

  const responseTimes = timedLogs.map((l) => l.responseTimeMs);
  const avgResponseTimeMs =
    responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : 0;
  const fastestResponseTimeMs =
    responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
  const slowestResponseTimeMs =
    responseTimes.length > 0 ? Math.max(...responseTimes) : 0;

  const unanswered = Math.max(0, totalQuestionsInSection - totalAttempted);

  const benchmark = getBenchmark(sectionId);
  const speedIndex = computeSpeedIndex(avgResponseTimeMs, benchmark);
  const cognitiveEfficiencyScore = computeCES(accuracyPercent, speedIndex);

  return {
    sectionId,
    totalAttempted,
    correctCount,
    accuracyPercent,
    avgResponseTimeMs,
    fastestResponseTimeMs,
    slowestResponseTimeMs,
    unanswered,
    cognitiveEfficiencyScore,
  };
}

export function computeSessionCES(
  sectionResults: Partial<Record<SectionId, SectionResult>>
): number {
  const results = Object.values(sectionResults).filter(
    (r): r is SectionResult => r !== undefined
  );
  if (results.length === 0) return 0;
  const sum = results.reduce((acc, r) => acc + r.cognitiveEfficiencyScore, 0);
  return sum / results.length;
}
