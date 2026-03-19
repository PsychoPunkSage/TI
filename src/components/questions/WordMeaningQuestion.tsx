import React from 'react';
import type { WordMeaningQuestion as WordMeaningQuestionType, AnswerValue } from '@/types/questions';

interface WordMeaningQuestionProps {
  question: WordMeaningQuestionType;
  onAnswer: (answer: AnswerValue) => void;
  disabled: boolean;
  selectedAnswer: AnswerValue | null;
  showFeedback: boolean;
}

/**
 * Real GIA word meaning format:
 * - Three words in equal-sized boxes in a row
 * - Two are related; one is the odd one out
 * - Click the odd word
 */
export const WordMeaningQuestion = React.memo(function WordMeaningQuestion({
  question,
  onAnswer,
  disabled,
}: WordMeaningQuestionProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Three word boxes */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {question.words.map((word) => (
          <button
            key={word}
            onClick={() => !disabled && onAnswer(word)}
            disabled={disabled}
            className="h-16 rounded bg-[#2d4a7a] text-white text-lg font-semibold flex items-center justify-center hover:bg-[#3a5d99] disabled:opacity-50 cursor-pointer px-2 text-center"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
});
