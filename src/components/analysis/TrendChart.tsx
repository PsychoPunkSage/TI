'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { SectionTrend } from '@/types/analytics';

interface TrendChartProps {
  sectionTrends: SectionTrend[];
}

const SECTION_COLORS: Record<string, string> = {
  reasoning: '#3b82f6',
  perceptual_speed: '#8b5cf6',
  number_speed: '#f59e0b',
  word_meaning: '#10b981',
  spatial: '#ef4444',
};

const TREND_BADGE: Record<string, { label: string; classes: string }> = {
  improving: { label: 'Improving', classes: 'bg-green-100 text-green-800' },
  declining: { label: 'Declining', classes: 'bg-red-100 text-red-800' },
  stable: { label: 'Stable', classes: 'bg-gray-100 text-gray-700' },
};

export function TrendChart({ sectionTrends }: TrendChartProps) {
  // Build chart data: one point per attempt number
  const maxAttempts = Math.max(
    ...sectionTrends.flatMap((t) => t.dataPoints.map((p) => p.attemptNumber)),
    0
  );

  if (maxAttempts === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Accuracy Trend
        </h3>
        <p className="text-gray-400 text-sm">
          Complete at least 2 sessions to see trends.
        </p>
      </div>
    );
  }

  // Build unified data points
  const chartData = Array.from({ length: maxAttempts }, (_, i) => {
    const attemptNumber = i + 1;
    const point: Record<string, number | null> = { attempt: attemptNumber };
    for (const trend of sectionTrends) {
      const dp = trend.dataPoints.find((p) => p.attemptNumber === attemptNumber);
      point[trend.sectionId] = dp ? Math.round(dp.accuracyPercent) : null;
    }
    return point;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Accuracy Trend</h3>
        <div className="flex flex-wrap gap-2 justify-end">
          {sectionTrends.map((t) => {
            const badge = TREND_BADGE[t.trendDirection];
            return (
              <div key={t.sectionId} className="flex items-center gap-1.5">
                <span
                  className="text-xs font-medium text-gray-600"
                  style={{ color: SECTION_COLORS[t.sectionId] }}
                >
                  {t.sectionName.split(' ')[0]}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.classes}`}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="attempt"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Session', position: 'insideBottom', offset: -2, fontSize: 11 }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(v) => [`${v}%`, '']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '12px',
            }}
          />
          <Legend
            iconType="line"
            wrapperStyle={{ fontSize: '12px' }}
          />
          {sectionTrends.map((trend) => (
            <Line
              key={trend.sectionId}
              type="monotone"
              dataKey={trend.sectionId}
              name={trend.sectionName}
              stroke={SECTION_COLORS[trend.sectionId]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
