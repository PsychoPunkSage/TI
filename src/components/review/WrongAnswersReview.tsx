'use client';

import type { Question, AnswerValue } from '@/types/questions';
import { WrongAnswerItem } from './WrongAnswerItem';

export interface WrongAnswerEntry {
  question: Question;
  selectedAnswer: AnswerValue;
  correctAnswer: AnswerValue;
}

interface WrongAnswersReviewProps {
  logs: WrongAnswerEntry[];
  title?: string;
  onDismiss?: () => void;
}

export function WrongAnswersReview({ logs, title, onDismiss }: WrongAnswersReviewProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg font-semibold text-green-700 mb-1">Perfect score!</p>
        <p className="text-sm">You answered all questions correctly.</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="mt-6 px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 cursor-pointer"
          >
            Back
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      )}
      <p className="text-sm text-red-600 font-medium mb-4">
        {logs.length} question{logs.length !== 1 ? 's' : ''} answered incorrectly
      </p>

      <div className="flex flex-col gap-3">
        {logs.map((entry, i) => (
          <WrongAnswerItem
            key={i}
            question={entry.question}
            selectedAnswer={entry.selectedAnswer}
            correctAnswer={entry.correctAnswer}
            questionNumber={i + 1}
          />
        ))}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="mt-6 w-full py-3 border border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 cursor-pointer"
        >
          Back
        </button>
      )}
    </div>
  );
}
