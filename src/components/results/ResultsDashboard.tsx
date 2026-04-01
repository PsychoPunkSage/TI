'use client';

import { useMemo } from 'react';
import type { DbSession, DbQuestionLog, DbSectionStat } from '@/types/db';
import type { SectionId } from '@/types/questions';
import type { SectionResult } from '@/types/session';
import { CognitiveScoreCard } from './CognitiveScoreCard';
import { SectionAccuracyChart } from './SectionAccuracyChart';
import { ResponseTimeLine } from './ResponseTimeLine';
import { SectionSummaryTable } from './SectionSummaryTable';
import { WrongAnswersDashboardSection } from './WrongAnswersDashboardSection';
import Link from 'next/link';

interface ResultsDashboardProps {
  session: DbSession;
  questionLogs: DbQuestionLog[];
  sectionStats: DbSectionStat[];
}

export function ResultsDashboard({
  session,
  questionLogs,
  sectionStats,
}: ResultsDashboardProps) {
  const sectionResults = useMemo((): Partial<Record<SectionId, SectionResult>> => {
    try {
      return JSON.parse(session.sectionResultsJson) as Partial<Record<SectionId, SectionResult>>;
    } catch {
      return {};
    }
  }, [session.sectionResultsJson]);

  const overallCES = session.cognitiveEfficiencyScore ?? 0;

  const startedDate = new Date(session.startedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const duration = session.completedAt
    ? Math.round((session.completedAt - session.startedAt) / 1000 / 60)
    : null;

  function handleExportJSON() {
    const data = {
      session,
      questionLogs,
      sectionStats,
      sectionResults,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gia-session-${session.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportCSV() {
    const headers = [
      'questionId',
      'sectionId',
      'responseTimeMs',
      'selectedAnswer',
      'correctAnswer',
      'isCorrect',
    ];
    const rows = questionLogs
      .filter((l) => l.isPractice === 0)
      .map((l) => [
        l.questionId,
        l.sectionId,
        l.responseTimeMs,
        l.selectedAnswer,
        l.correctAnswer,
        l.isCorrect,
      ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gia-session-${session.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Test Results
            </h1>
            <p className="text-gray-500 text-sm">
              {startedDate}
              {duration ? ` · ${duration} min` : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 cursor-pointer"
            >
              Export JSON
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 cursor-pointer"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <CognitiveScoreCard
          overallCES={overallCES}
          sectionResults={sectionResults}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionAccuracyChart sectionResults={sectionResults} />
          <ResponseTimeLine questionLogs={questionLogs} />
        </div>

        <SectionSummaryTable sectionResults={sectionResults} />

        <WrongAnswersDashboardSection questionLogs={questionLogs} />
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700"
        >
          Take Another Test
        </Link>
        <Link
          href="/analysis"
          className="px-6 py-3 border border-gray-200 text-gray-700 text-base font-semibold rounded-lg hover:border-gray-400"
        >
          View Analysis
        </Link>
      </div>
    </div>
  );
}
