import { useEffect, useState } from 'react';
import type { AnalysisSummary } from '@/types/analytics';
import { getCompletedSessions, getAllSectionStats } from '@/db/queries';
import { assembleAnalysisSummary } from '@/engine/analytics';

interface UseAnalysisReturn {
  summary: AnalysisSummary | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [summary, setSummary] = useState<AnalysisSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const [sessions, sectionStats] = await Promise.all([
          getCompletedSessions(50),
          getAllSectionStats(),
        ]);
        if (!cancelled) {
          const assembled = assembleAnalysisSummary(sessions, sectionStats);
          setSummary(assembled);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load analysis data');
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
  }, [refreshKey]);

  const refresh = () => setRefreshKey((k) => k + 1);

  return { summary, isLoading, error, refresh };
}
