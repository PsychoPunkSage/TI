import type { SectionExtreme } from '@/types/analytics';

interface BestWorstAverageTableProps {
  sectionExtremes: SectionExtreme[];
}

export function BestWorstAverageTable({
  sectionExtremes,
}: BestWorstAverageTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Performance Extremes
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Section
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Best CES
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Worst CES
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Average CES
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">
                Attempts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sectionExtremes.map((extreme) => (
              <tr key={extreme.sectionId} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {extreme.sectionName}
                </td>
                <td className="px-4 py-4 text-right font-mono text-green-700 font-semibold">
                  {extreme.totalAttempts > 0
                    ? Math.round(extreme.bestCES)
                    : '—'}
                </td>
                <td className="px-4 py-4 text-right font-mono text-red-700 font-semibold">
                  {extreme.totalAttempts > 0
                    ? Math.round(extreme.worstCES)
                    : '—'}
                </td>
                <td className="px-4 py-4 text-right font-mono text-gray-700 font-semibold">
                  {extreme.totalAttempts > 0
                    ? Math.round(extreme.averageCES)
                    : '—'}
                </td>
                <td className="px-4 py-4 text-right font-mono text-gray-600">
                  {extreme.totalAttempts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
