import Dexie, { type Table } from 'dexie';
import type { DbSession, DbQuestionLog, DbSectionStat } from '@/types/db';

export class GiaDatabase extends Dexie {
  sessions!: Table<DbSession, string>;
  questionLogs!: Table<DbQuestionLog, string>;
  sectionStats!: Table<DbSectionStat, string>;

  constructor() {
    super('GiaMockTestDB');

    this.version(1).stores({
      sessions: 'id, startedAt, isComplete, cognitiveEfficiencyScore',
      questionLogs:
        '[sessionId+questionId], sessionId, sectionId, [sessionId+sectionId]',
      sectionStats:
        'id, sessionId, sectionId, [sessionId+sectionId], accuracyPercent',
    });

    // v2: adds questionSnapshotJson (non-indexed) to questionLogs for wrong-answer review
    this.version(2).stores({
      sessions: 'id, startedAt, isComplete, cognitiveEfficiencyScore',
      questionLogs:
        '[sessionId+questionId], sessionId, sectionId, [sessionId+sectionId]',
      sectionStats:
        'id, sessionId, sectionId, [sessionId+sectionId], accuracyPercent',
    });
  }
}

export const db = new GiaDatabase();
