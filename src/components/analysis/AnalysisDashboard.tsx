'use client';

import { useState } from 'react';
import type { AnalysisSummary } from '@/types/analytics';
import { TrendChart } from './TrendChart';
import { SessionComparisonGrid } from './SessionComparisonGrid';
import { BestWorstAverageTable } from './BestWorstAverageTable';

type Tab = 'trends' | 'comparison' | 'extremes';

interface AnalysisDashboardProps {
  summary: AnalysisSummary;
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'trends', label: 'Trends' },
  { id: 'comparison', label: 'Session Comparison' },
  { id: 'extremes', label: 'Best / Worst' },
];

export function AnalysisDashboard({ summary }: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('trends');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Performance Analysis
        </h1>
        <p className="text-gray-500 text-sm">
          {summary.totalSessions} completed session
          {summary.totalSessions !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 cursor-pointer ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'trends' && (
        <TrendChart sectionTrends={summary.sectionTrends} />
      )}
      {activeTab === 'comparison' && (
        <SessionComparisonGrid
          allSessionStats={summary.allSessionStats}
        />
      )}
      {activeTab === 'extremes' && (
        <BestWorstAverageTable sectionExtremes={summary.sectionExtremes} />
      )}
    </div>
  );
}
