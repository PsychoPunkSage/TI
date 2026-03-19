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
import type { DbQuestionLog } from '@/types/db';
import { getSectionMeta } from '@/constants/sections';
import type { SectionId } from '@/types/questions';

interface ResponseTimeLineProps {
  questionLogs: DbQuestionLog[];
  sectionId?: SectionId;
}

export function ResponseTimeLine({ questionLogs, sectionId }: ResponseTimeLineProps) {
  const filtered = questionLogs
    .filter((l) => {
      if (l.isPractice === 1) return false;
      if (sectionId && l.sectionId !== sectionId) return false;
      return true;
    })
    .sort((a, b) => a.displayedAt - b.displayedAt)
    .map((l, i) => ({
      q: i + 1,
      time: Math.round(l.responseTimeMs / 100) / 10, // seconds, 1dp
      sectionId: l.sectionId,
    }));

  const sectionLabel = sectionId
    ? getSectionMeta(sectionId).name
    : 'All Sections';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Response Time — {sectionLabel}
      </h2>
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={filtered}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="q"
              label={{ value: 'Question', position: 'insideBottom', offset: -2, fontSize: 11 }}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}s`}
            />
            <Tooltip
              formatter={(v) => [`${v}s`, 'Response time']}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
