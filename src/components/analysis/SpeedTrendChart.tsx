'use client';

import { useState } from 'react';
import type { SectionTrend } from '@/types/analytics';
import { SectionTrendCard } from './SectionTrendCard';

interface SpeedTrendChartProps {
  sectionTrends: SectionTrend[];
}

export function SpeedTrendChart({ sectionTrends }: SpeedTrendChartProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  function toggle(id: string) {
    setActiveSection((prev) => (prev === id ? null : id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-gray-900">Response Time Trend</h3>
        {activeSection && (
          <button
            onClick={() => setActiveSection(null)}
            className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Show all
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-3">Lower is faster</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectionTrends.map((trend) => (
          <SectionTrendCard
            key={trend.sectionId}
            trend={trend}
            metric="speed"
            isActive={activeSection === null || activeSection === trend.sectionId}
            isDimmed={activeSection !== null && activeSection !== trend.sectionId}
            onClick={() => toggle(trend.sectionId)}
          />
        ))}
      </div>
    </div>
  );
}
