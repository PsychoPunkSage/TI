import type { SectionResult } from '@/types/session';
import type { SectionId } from '@/types/questions';
import { SECTION_ORDER } from '@/constants/sections';

interface SectionSummaryTableProps {
  sectionResults: Partial<Record<SectionId, SectionResult>>;
}

function formatMs(ms: number): string {
  if (ms === 0) return '—';
  return `${(ms / 1000).toFixed(1)}s`;
}

export function SectionSummaryTable({ sectionResults }: SectionSummaryTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Section Breakdown</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Section
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Answered
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Correct
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Accuracy
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Avg Time
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                CES
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {SECTION_ORDER.map((section) => {
              const result = sectionResults[section.id];
              return (
                <tr key={section.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {section.name}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600 font-mono">
                    {result ? result.totalAttempted : '—'}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600 font-mono">
                    {result ? result.correctCount : '—'}
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    {result ? (
                      <span
                        className={
                          result.accuracyPercent >= 70
                            ? 'text-green-700'
                            : result.accuracyPercent >= 50
                            ? 'text-amber-700'
                            : 'text-red-700'
                        }
                      >
                        {Math.round(result.accuracyPercent)}%
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600 font-mono">
                    {result ? formatMs(result.avgResponseTimeMs) : '—'}
                  </td>
                  <td className="px-4 py-4 text-right font-mono font-semibold">
                    {result ? (
                      <span
                        className={
                          result.cognitiveEfficiencyScore >= 70
                            ? 'text-green-700'
                            : result.cognitiveEfficiencyScore >= 50
                            ? 'text-amber-700'
                            : 'text-red-700'
                        }
                      >
                        {Math.round(result.cognitiveEfficiencyScore)}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
