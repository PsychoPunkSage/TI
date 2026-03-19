'use client';

import { useState, useMemo } from 'react';
import type { SectionStats } from '@/types/analytics';
import { SECTION_ORDER } from '@/constants/sections';

interface SessionComparisonGridProps {
  allSessionStats: SectionStats[];
}

function getCellColor(value: number | undefined): string {
  if (value === undefined) return 'bg-gray-50 text-gray-300';
  if (value >= 70) return 'bg-green-50 text-green-800';
  if (value >= 50) return 'bg-amber-50 text-amber-800';
  return 'bg-red-50 text-red-800';
}

export function SessionComparisonGrid({
  allSessionStats,
}: SessionComparisonGridProps) {
  const [sessionCount, setSessionCount] = useState(5);

  // Get unique sessions sorted by startedAt
  const sessions = useMemo(() => {
    const sessionMap = new Map<string, { sessionId: string; startedAt: number; attemptNumber: number }>();
    for (const stat of allSessionStats) {
      if (!sessionMap.has(stat.sessionId)) {
        sessionMap.set(stat.sessionId, {
          sessionId: stat.sessionId,
          startedAt: stat.startedAt,
          attemptNumber: stat.attemptNumber,
        });
      }
    }
    return Array.from(sessionMap.values())
      .sort((a, b) => b.startedAt - a.startedAt)
      .slice(0, sessionCount);
  }, [allSessionStats, sessionCount]);

  const reversedSessions = [...sessions].reverse();

  if (sessions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Session Comparison
        </h3>
        <p className="text-gray-400 text-sm">No completed sessions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Session Comparison
        </h3>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Show last</label>
          <select
            value={sessionCount}
            onChange={(e) => setSessionCount(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded px-2 py-1 text-gray-700"
          >
            {[3, 5, 7, 10].map((n) => (
              <option key={n} value={n}>
                {n} sessions
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 pr-4">
                Section
              </th>
              {reversedSessions.map((s) => (
                <th
                  key={s.sessionId}
                  className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 px-2"
                >
                  #{s.attemptNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {SECTION_ORDER.map((section) => {
              return (
                <tr key={section.id}>
                  <td className="py-2 pr-4 text-gray-700 font-medium whitespace-nowrap">
                    {section.name}
                  </td>
                  {reversedSessions.map((s) => {
                    const stat = allSessionStats.find(
                      (st) =>
                        st.sessionId === s.sessionId &&
                        st.sectionId === section.id
                    );
                    return (
                      <td
                        key={s.sessionId}
                        className={`py-2 px-2 text-center font-mono font-medium rounded text-sm ${getCellColor(stat?.accuracyPercent)}`}
                      >
                        {stat ? `${Math.round(stat.accuracyPercent)}%` : '—'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Values show accuracy %. Green ≥ 70%, Amber ≥ 50%, Red &lt; 50%.
      </p>
    </div>
  );
}
