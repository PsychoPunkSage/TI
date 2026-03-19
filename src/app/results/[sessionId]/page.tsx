'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { ResultsDashboard } from '@/components/results/ResultsDashboard';
import { getSessionWithStats } from '@/db/queries';
import type { DbSession, DbQuestionLog, DbSectionStat } from '@/types/db';
import Link from 'next/link';

interface SessionData {
  session: DbSession;
  questionLogs: DbQuestionLog[];
  sectionStats: DbSectionStat[];
}

export default function ResultsPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [data, setData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getSessionWithStats(sessionId);
        if (!cancelled) {
          if (!result.session) {
            setError('Session not found.');
          } else {
            setData({
              session: result.session,
              questionLogs: result.questionLogs,
              sectionStats: result.sectionStats,
            });
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load results.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto py-16 text-center text-gray-400 text-sm">
          Loading results...
        </div>
      </AppShell>
    );
  }

  if (error || !data) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto py-16 text-center">
          <p className="text-red-600 text-sm mb-4">{error ?? 'Session not found.'}</p>
          <Link href="/" className="text-blue-600 text-sm hover:underline">
            Return home
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <ResultsDashboard
        session={data.session}
        questionLogs={data.questionLogs}
        sectionStats={data.sectionStats}
      />
    </AppShell>
  );
}
