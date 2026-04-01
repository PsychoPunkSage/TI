'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Question, AnswerValue } from '@/types/questions';
import type { QuestionLog } from '@/types/session';
import { QuestionCard } from './QuestionCard';
import { WrongAnswersReview } from '@/components/review/WrongAnswersReview';

interface PracticeScreenProps {
  sectionName: string;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: AnswerValue) => void;
  onStartTimedTest: () => void;
  isPracticeComplete: boolean;
  onRequestCancel?: () => void;
  wrongAnswerLogs?: QuestionLog[];
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
  wrongAnswerLogs,
}: PracticeScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerValue | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showReview, setShowReview] = useState(false);

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
    const wrongEntries = (wrongAnswerLogs ?? [])
      .filter((log) => !log.isCorrect && log.questionSnapshot)
      .map((log) => ({
        question: log.questionSnapshot!,
        selectedAnswer: log.selectedAnswer,
        correctAnswer: log.correctAnswer,
      }));

    if (showReview) {
      return (
        <div className="max-w-2xl mx-auto py-12 px-6">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {sectionName} — Practice Review
              </span>
            </div>
            <WrongAnswersReview
              logs={wrongEntries}
              title="Wrong Answers"
              onDismiss={() => setShowReview(false)}
            />
          </div>
        </div>
      );
    }

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
          {wrongEntries.length > 0 && (
            <button
              onClick={() => setShowReview(true)}
              className="w-full py-3 mb-3 border border-red-200 bg-red-50 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-100 cursor-pointer"
            >
              Review {wrongEntries.length} wrong answer{wrongEntries.length !== 1 ? 's' : ''}
            </button>
          )}
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
