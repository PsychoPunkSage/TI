'use client';

import { useEffect } from 'react';
import type { SectionResult } from '@/types/session';

interface SectionTransitionProps {
  sectionName: string;
  result: SectionResult;
  isLastSection: boolean;
  onAdvance: () => void;
}

export function SectionTransition({
  sectionName,
  result,
  isLastSection,
  onAdvance,
}: SectionTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAdvance();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onAdvance]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {sectionName} complete
      </h2>
      <p className="text-gray-500 text-base mb-6">
        {result.totalAttempted} of {result.totalAttempted + result.unanswered} questions answered
      </p>
      <p className="text-sm text-gray-400">
        {isLastSection
          ? 'Calculating your results...'
          : 'Moving to the next section...'}
      </p>
    </div>
  );
}
