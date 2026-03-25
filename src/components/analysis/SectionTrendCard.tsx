'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { SectionTrend } from '@/types/analytics';

export const SECTION_COLORS: Record<string, string> = {
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

export interface SectionTrendCardProps {
  trend: SectionTrend;
  metric: 'accuracy' | 'speed';
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
}

export function SectionTrendCard({
  trend,
  metric,
  isActive,
  isDimmed,
  onClick,
}: SectionTrendCardProps) {
  const color = SECTION_COLORS[trend.sectionId];
  const trendDir = metric === 'accuracy' ? trend.trendDirection : trend.speedTrendDirection;
  const badge = TREND_BADGE[trendDir];

  const data = trend.dataPoints.map((dp) => ({
    startedAt: dp.startedAt,
    value: metric === 'accuracy' ? dp.accuracyPercent : dp.avgResponseTimeMs,
  }));

  const hasData = data.length > 0;

  return (
    <div
      onClick={onClick}
      className={[
        'rounded-xl border p-4 cursor-pointer select-none transition-all duration-200',
        'bg-white',
        isDimmed ? 'opacity-40' : 'opacity-100',
        isActive && !isDimmed
          ? 'shadow-md'
          : 'border-gray-200',
      ].join(' ')}
      style={isActive && !isDimmed ? { borderColor: color, borderWidth: 2 } : {}}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold" style={{ color }}>
          {trend.sectionName}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.classes}`}>
          {badge.label}
        </span>
      </div>

      {/* Chart */}
      {hasData ? (
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="startedAt"
              type="number"
              scale="time"
              domain={['auto', 'auto']}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString('en', {
                  month: 'short',
                  day: 'numeric',
                })
              }
              tick={{ fontSize: 9, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickCount={3}
            />
            <YAxis
              domain={metric === 'accuracy' ? [0, 100] : ['auto', 'auto']}
              tick={{ fontSize: 9, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={
                metric === 'accuracy'
                  ? (v) => `${v}%`
                  : (v) => `${(v / 1000).toFixed(1)}s`
              }
              tickCount={3}
            />
            <Tooltip
              labelFormatter={(v) =>
                new Date(v as number).toLocaleDateString('en', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              }
              formatter={(v) =>
                metric === 'accuracy'
                  ? [`${Math.round(v as number)}%`, 'Accuracy']
                  : [`${((v as number) / 1000).toFixed(2)}s`, 'Avg Time']
              }
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '11px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={data.length === 1 ? { r: 3, fill: color } : false}
              activeDot={{ r: 3 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[120px] flex items-center justify-center">
          <p className="text-xs text-gray-400">No data yet</p>
        </div>
      )}
    </div>
  );
}
