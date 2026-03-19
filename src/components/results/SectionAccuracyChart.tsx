'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { SectionResult } from '@/types/session';
import type { SectionId } from '@/types/questions';
import { SECTION_ORDER } from '@/constants/sections';

interface SectionAccuracyChartProps {
  sectionResults: Partial<Record<SectionId, SectionResult>>;
}

export function SectionAccuracyChart({ sectionResults }: SectionAccuracyChartProps) {
  const data = SECTION_ORDER.map((section) => ({
    name: section.name.split(' ')[0], // shorten for chart
    accuracy: Math.round(sectionResults[section.id]?.accuracyPercent ?? 0),
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Accuracy by Section
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Accuracy']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.accuracy >= 70
                    ? '#16a34a'
                    : entry.accuracy >= 50
                    ? '#d97706'
                    : '#dc2626'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
