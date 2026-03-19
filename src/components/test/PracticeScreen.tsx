'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Question, AnswerValue } from '@/types/questions';
import { QuestionCard } from './QuestionCard';

interface PracticeScreenProps {
  sectionName: string;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: AnswerValue) => void;
  onStartTimedTest: () => void;
  isPracticeComplete: boolean;
  onRequestCancel?: () => void;
}

export function PracticeScreen({
  sectionName,
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onStartTimedTest,
  isPracticeComplete,
  onRequestCancel,
}: PracticeScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerValue | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAnswer = useCallback(
    (answer: AnswerValue) => {
      if (hasAnswered) return;
      setSelectedAnswer(answer);
      setHasAnswered(true);
      autoAdvanceRef.current = setTimeout(() => {
        setSelectedAnswer(null);
        setHasAnswered(false);
        onAnswer(answer);
      }, 1500);
    },
    [hasAnswered, onAnswer]
  );

  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, []);

  const isCorrect =
    hasAnswered && String(selectedAnswer) === String(question.correctAnswer);

  if (isPracticeComplete) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-2">
            <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              {sectionName} — Practice Complete
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Practice complete
          </h2>
          <p className="text-gray-600 mb-8 text-base">
            You have completed all practice questions. The timed test will now begin.
            You will have 4 minutes to answer as many questions as possible.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
            No feedback will be shown during the timed test. Answer as quickly and accurately as you can.
          </div>
          <button
            onClick={onStartTimedTest}
            className="w-full py-4 bg-[#2d4a7a] text-white text-lg font-semibold rounded-lg hover:bg-[#3a5d99] cursor-pointer"
          >
            Begin Timed Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-700 uppercase tracking-wide font-semibold">
          {sectionName} — Practice
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          {onRequestCancel && (
            <button
              onClick={onRequestCancel}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
              aria-label="Exit test"
            >
              Exit
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#c8cce8] rounded-xl p-6">
        <QuestionCard
          key={question.id}
          question={question}
          onAnswer={handleAnswer}
          disabled={hasAnswered}
          selectedAnswer={selectedAnswer}
          showFeedback={hasAnswered}
          correctAnswer={question.correctAnswer}
        />

        {hasAnswered && (
          <div className="mt-6">
            <div
              className={`p-4 rounded-lg mb-4 text-sm font-medium ${
                isCorrect
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {isCorrect
                ? 'Correct!'
                : `Incorrect. The correct answer is: ${String(question.correctAnswer)}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
