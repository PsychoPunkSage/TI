import { db } from './schema';
import type { DbSession, DbQuestionLog, DbSectionStat } from '@/types/db';
import type { SectionId } from '@/types/questions';
import type { SectionResult } from '@/types/session';

export async function getCompletedSessions(limit = 10): Promise<DbSession[]> {
  return db.sessions
    .where('isComplete')
    .equals(1)
    .reverse()
    .sortBy('startedAt')
    .then((sessions) => sessions.slice(0, limit));
}

export async function getSectionTrend(
  sectionId: SectionId,
  limit = 10
): Promise<DbSectionStat[]> {
  return db.sectionStats
    .where('sectionId')
    .equals(sectionId)
    .sortBy('id')
    .then((stats) => stats.slice(-limit));
}

export async function getQuestionLogs(sessionId: string): Promise<DbQuestionLog[]> {
  return db.questionLogs.where('sessionId').equals(sessionId).toArray();
}

export async function getSectionExtremes(
  sectionId: SectionId
): Promise<DbSectionStat[]> {
  return db.sectionStats.where('sectionId').equals(sectionId).toArray();
}

export async function getSessionWithStats(sessionId: string): Promise<{
  session: DbSession | undefined;
  questionLogs: DbQuestionLog[];
  sectionStats: DbSectionStat[];
}> {
  const [session, questionLogs, sectionStats] = await Promise.all([
    db.sessions.get(sessionId),
    db.questionLogs.where('sessionId').equals(sessionId).toArray(),
    db.sectionStats.where('sessionId').equals(sessionId).toArray(),
  ]);

  return { session, questionLogs, sectionStats };
}

export async function getAllSectionStats(): Promise<DbSectionStat[]> {
  return db.sectionStats.toArray();
}
