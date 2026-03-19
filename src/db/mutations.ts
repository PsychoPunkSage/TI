import { db } from './schema';
import type { Session, SectionResult, QuestionLog } from '@/types/session';
import type { SectionId } from '@/types/questions';
import type { DbSession, DbQuestionLog, DbSectionStat } from '@/types/db';

export async function saveSession(session: Session): Promise<void> {
  const dbSession: DbSession = {
    id: session.id,
    startedAt: session.startedAt,
    completedAt: session.completedAt,
    isComplete: session.isComplete ? 1 : 0,
    sectionResultsJson: JSON.stringify(session.sectionResults),
    cognitiveEfficiencyScore: session.cognitiveEfficiencyScore,
  };
  await db.sessions.put(dbSession);
}

export function saveQuestionLog(log: QuestionLog): void {
  const dbLog: DbQuestionLog = {
    id: `${log.sessionId}_${log.questionId}`,
    sessionId: log.sessionId,
    questionId: log.questionId,
    sectionId: log.sectionId,
    displayedAt: log.displayedAt,
    answeredAt: log.answeredAt,
    responseTimeMs: log.responseTimeMs,
    selectedAnswer: String(log.selectedAnswer),
    correctAnswer: String(log.correctAnswer),
    isCorrect: log.isCorrect ? 1 : 0,
    isPractice: log.isPractice ? 1 : 0,
  };
  void db.questionLogs.put(dbLog);
}

export async function saveSectionStats(
  sessionId: string,
  sectionId: SectionId,
  result: SectionResult
): Promise<void> {
  const stat: DbSectionStat = {
    id: `${sessionId}_${sectionId}`,
    sessionId,
    sectionId,
    totalAttempted: result.totalAttempted,
    correctCount: result.correctCount,
    accuracyPercent: result.accuracyPercent,
    avgResponseTimeMs: result.avgResponseTimeMs,
    fastestResponseTimeMs: result.fastestResponseTimeMs,
    slowestResponseTimeMs: result.slowestResponseTimeMs,
    unanswered: result.unanswered,
    cognitiveEfficiencyScore: result.cognitiveEfficiencyScore,
  };
  await db.sectionStats.put(stat);
}

export async function finalizeSession(
  sessionId: string,
  cognitiveEfficiencyScore: number,
  sectionResults: Partial<Record<SectionId, SectionResult>>
): Promise<void> {
  await db.sessions.update(sessionId, {
    isComplete: 1,
    completedAt: Date.now(),
    cognitiveEfficiencyScore,
    sectionResultsJson: JSON.stringify(sectionResults),
  });

  for (const [sectionId, result] of Object.entries(sectionResults)) {
    if (result) {
      await saveSectionStats(sessionId, sectionId as SectionId, result);
    }
  }
}
