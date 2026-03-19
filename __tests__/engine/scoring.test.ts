import {
  computeSpeedIndex,
  computeCES,
  computeSectionResult,
  computeSessionCES,
} from '@/engine/scoring';
import type { QuestionLog } from '@/types/session';

function makeLog(overrides: Partial<QuestionLog> = {}): QuestionLog {
  return {
    questionId: 'q1',
    sectionId: 'reasoning',
    sessionId: 'session1',
    displayedAt: 1000,
    answeredAt: 5000,
    responseTimeMs: 4000,
    selectedAnswer: 'True',
    correctAnswer: 'True',
    isCorrect: true,
    isPractice: false,
    ...overrides,
  };
}

describe('computeSpeedIndex', () => {
  it('returns 100 when avgMs equals benchmark', () => {
    expect(computeSpeedIndex(8000, 8000)).toBe(100);
  });

  it('returns 100 when avgMs is under benchmark', () => {
    expect(computeSpeedIndex(4000, 8000)).toBe(100);
  });

  it('returns 0 when avgMs is 2x benchmark', () => {
    expect(computeSpeedIndex(16000, 8000)).toBe(0);
  });

  it('clamps at 0 for very slow responses', () => {
    expect(computeSpeedIndex(100000, 8000)).toBe(0);
  });

  it('calculates 50 at 1.5x benchmark', () => {
    const result = computeSpeedIndex(12000, 8000);
    expect(result).toBe(50);
  });
});

describe('computeCES', () => {
  it('returns 100 for perfect accuracy and speed', () => {
    expect(computeCES(100, 100)).toBe(100);
  });

  it('returns 0 for zero accuracy and speed', () => {
    expect(computeCES(0, 0)).toBe(0);
  });

  it('applies 0.6/0.4 weighting correctly', () => {
    // 80% accuracy, 60 speed = 0.6*80 + 0.4*60 = 48 + 24 = 72
    expect(computeCES(80, 60)).toBeCloseTo(72);
  });

  it('handles extreme values', () => {
    expect(computeCES(100, 0)).toBeCloseTo(60);
    expect(computeCES(0, 100)).toBeCloseTo(40);
  });
});

describe('computeSectionResult', () => {
  it('calculates accuracy correctly', () => {
    const logs: QuestionLog[] = [
      makeLog({ isCorrect: true }),
      makeLog({ questionId: 'q2', isCorrect: true }),
      makeLog({ questionId: 'q3', isCorrect: false }),
      makeLog({ questionId: 'q4', isCorrect: true }),
    ];
    const result = computeSectionResult(logs, 'reasoning', 4);
    expect(result.totalAttempted).toBe(4);
    expect(result.correctCount).toBe(3);
    expect(result.accuracyPercent).toBeCloseTo(75);
  });

  it('excludes practice logs', () => {
    const logs: QuestionLog[] = [
      makeLog({ isCorrect: true }),
      makeLog({ questionId: 'pq1', isCorrect: false, isPractice: true }),
    ];
    const result = computeSectionResult(logs, 'reasoning', 1);
    expect(result.totalAttempted).toBe(1);
    expect(result.correctCount).toBe(1);
    expect(result.accuracyPercent).toBe(100);
  });

  it('computes unanswered correctly', () => {
    const logs: QuestionLog[] = [
      makeLog({ isCorrect: true }),
      makeLog({ questionId: 'q2', isCorrect: true }),
    ];
    const result = computeSectionResult(logs, 'reasoning', 5);
    expect(result.unanswered).toBe(3);
  });

  it('computes response time stats', () => {
    const logs: QuestionLog[] = [
      makeLog({ responseTimeMs: 2000 }),
      makeLog({ questionId: 'q2', responseTimeMs: 4000 }),
      makeLog({ questionId: 'q3', responseTimeMs: 6000 }),
    ];
    const result = computeSectionResult(logs, 'reasoning', 3);
    expect(result.avgResponseTimeMs).toBeCloseTo(4000);
    expect(result.fastestResponseTimeMs).toBe(2000);
    expect(result.slowestResponseTimeMs).toBe(6000);
  });

  it('handles empty logs gracefully', () => {
    const result = computeSectionResult([], 'reasoning', 10);
    expect(result.totalAttempted).toBe(0);
    expect(result.accuracyPercent).toBe(0);
    expect(result.unanswered).toBe(10);
  });
});

describe('computeSessionCES', () => {
  it('averages across sections', () => {
    const sections = {
      reasoning: {
        sectionId: 'reasoning' as const,
        totalAttempted: 10,
        correctCount: 8,
        accuracyPercent: 80,
        avgResponseTimeMs: 5000,
        fastestResponseTimeMs: 2000,
        slowestResponseTimeMs: 8000,
        unanswered: 0,
        cognitiveEfficiencyScore: 80,
      },
      word_meaning: {
        sectionId: 'word_meaning' as const,
        totalAttempted: 10,
        correctCount: 6,
        accuracyPercent: 60,
        avgResponseTimeMs: 5000,
        fastestResponseTimeMs: 2000,
        slowestResponseTimeMs: 8000,
        unanswered: 0,
        cognitiveEfficiencyScore: 60,
      },
    };
    const result = computeSessionCES(sections);
    expect(result).toBeCloseTo(70);
  });

  it('returns 0 for empty sections', () => {
    expect(computeSessionCES({})).toBe(0);
  });
});
