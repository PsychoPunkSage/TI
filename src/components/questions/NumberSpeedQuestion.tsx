import React from 'react';
import type { NumberSpeedQuestion as NumberSpeedQuestionType, AnswerValue } from '@/types/questions';

interface NumberSpeedQuestionProps {
  question: NumberSpeedQuestionType;
  onAnswer: (answer: AnswerValue) => void;
  disabled: boolean;
  selectedAnswer: AnswerValue | null;
  showFeedback: boolean;
}

/**
 * Real GIA number speed format:
 * - Three numbers shown in equal-sized dark navy boxes in a row
 * - Clicking a box selects that number as the answer
 * - No separate "reference" — the middle value is the reference (the remaining one)
 */
export const NumberSpeedQuestion = React.memo(function NumberSpeedQuestion({
  question,
  onAnswer,
  disabled,
}: NumberSpeedQuestionProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Three number boxes */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {question.numbers.map((num, i) => (
          <button
            key={i}
            onClick={() => !disabled && onAnswer(num)}
            disabled={disabled}
            className="h-24 rounded bg-[#2d4a7a] text-white text-4xl font-bold font-mono flex items-center justify-center hover:bg-[#3a5d99] disabled:opacity-50 cursor-pointer"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
});
