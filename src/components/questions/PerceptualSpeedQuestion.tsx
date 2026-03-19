import React from 'react';
import type { PerceptualSpeedQuestion as PerceptualSpeedQuestionType, AnswerValue } from '@/types/questions';

interface PerceptualSpeedQuestionProps {
  question: PerceptualSpeedQuestionType;
  onAnswer: (answer: AnswerValue) => void;
  disabled: boolean;
  selectedAnswer: AnswerValue | null;
  showFeedback: boolean;
}

const COUNT_OPTIONS = [0, 1, 2, 3, 4] as const;

/**
 * Real GIA perceptual speed format:
 * - 4 columns: uppercase letter on top row, lowercase on bottom row
 * - Count how many columns have the same letter (case-insensitive)
 * - Five answer buttons: 0, 1, 2, 3, 4
 */
export const PerceptualSpeedQuestion = React.memo(function PerceptualSpeedQuestion({
  question,
  onAnswer,
  disabled,
}: PerceptualSpeedQuestionProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* 4-column letter grid */}
      <div className="w-full bg-white rounded shadow-sm px-6 py-6">
        <div className="grid grid-cols-4 gap-3">
          {question.topRow.map((topLetter, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-mono text-3xl font-bold text-gray-900 leading-none">
                {topLetter}
              </span>
              <span className="font-mono text-3xl font-bold text-gray-900 leading-none">
                {question.bottomRow[colIndex]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5 answer buttons: 0–4 */}
      <div className="grid grid-cols-5 gap-3 w-full">
        {COUNT_OPTIONS.map((count) => (
          <button
            key={count}
            onClick={() => !disabled && onAnswer(count)}
            disabled={disabled}
            className="h-14 rounded bg-[#2d4a7a] text-white text-xl font-bold font-mono hover:bg-[#3a5d99] disabled:opacity-50 cursor-pointer"
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
});
