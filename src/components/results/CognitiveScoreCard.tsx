'use client';

import type { SectionResult } from '@/types/session';
import type { SectionId } from '@/types/questions';
import { SECTION_ORDER } from '@/constants/sections';

interface CognitiveScoreCardProps {
  overallCES: number;
  sectionResults: Partial<Record<SectionId, SectionResult>>;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 70 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-gray-900">{Math.round(score)}</div>
        <div className="text-xs text-gray-500 font-medium">/ 100</div>
      </div>
    </div>
  );
}

export function CognitiveScoreCard({
  overallCES,
  sectionResults,
}: CognitiveScoreCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Cognitive Efficiency Score
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
        <div className="text-center">
          <ScoreRing score={overallCES} />
          <p className="text-sm text-gray-500 mt-2 font-medium">Overall CES</p>
        </div>

        <div className="flex-1 w-full">
          <div className="space-y-3">
            {SECTION_ORDER.map((section) => {
              const result = sectionResults[section.id];
              const ces = result?.cognitiveEfficiencyScore ?? 0;
              const barColor =
                ces >= 70 ? 'bg-green-500' : ces >= 50 ? 'bg-amber-500' : 'bg-red-500';
              return (
                <div key={section.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{section.name}</span>
                    <span className="font-mono font-medium text-gray-900">
                      {result ? Math.round(ces) : '—'}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${ces}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        CES = (Accuracy% × 0.6) + (Speed Index × 0.4). Speed Index is normalized
        against section benchmarks.
      </p>
    </div>
  );
}
