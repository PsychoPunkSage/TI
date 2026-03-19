'use client';

import { AppShell } from '@/components/layout/AppShell';
import { AnalysisDashboard } from '@/components/analysis/AnalysisDashboard';
import { useAnalysis } from '@/hooks/useAnalysis';
import Link from 'next/link';

export default function AnalysisPage() {
  const { summary, isLoading, error } = useAnalysis();

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto py-16 text-center text-gray-400 text-sm">
          Loading analysis...
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto py-16 text-center">
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <Link href="/" className="text-blue-600 text-sm hover:underline">
            Return home
          </Link>
        </div>
      </AppShell>
    );
  }

  if (!summary || summary.totalSessions === 0) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Performance Analysis
          </h1>
          <p className="text-gray-500 text-base mb-8">
            Complete your first test session to see your analysis here.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700"
          >
            Start a Test
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <AnalysisDashboard summary={summary} />
    </AppShell>
  );
}
