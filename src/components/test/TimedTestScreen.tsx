'use client';

import { useEffect, useRef } from 'react';
import type { Question, AnswerValue } from '@/types/questions';
import { Timer } from './Timer';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { useTimer } from '@/hooks/useTimer';
import { getSectionMeta } from '@/constants/sections';
import type { SectionId } from '@/types/questions';

interface TimedTestScreenProps {
  sectionId: SectionId;
  question: Question | null;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: AnswerValue) => void;
  onTimerExpiry: () => void;
  onRequestCancel?: () => void;
}

/**
 * CRITICAL: Timer and QuestionCard are siblings — Timer only reads uiStore,
 * so timer ticks never cause QuestionCard to re-render.
 */
export function TimedTestScreen({
  sectionId,
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onTimerExpiry,
  onRequestCancel,
}: TimedTestScreenProps) {
  const meta = getSectionMeta(sectionId);
  const { start, stop } = useTimer({ onExpiry: onTimerExpiry });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      start(meta.durationSeconds);
    }
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!question) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed header bar */}
      <div className="sticky top-0 bg-[#b8bcd8] border-b border-[#a8acd0] z-10">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <ProgressBar
            sectionName={meta.name}
            current={questionNumber}
            total={totalQuestions}
          />
          <div className="flex items-center gap-3">
            <Timer />
            {onRequestCancel && (
              <button
                onClick={onRequestCancel}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium leading-none cursor-pointer"
                aria-label="Exit test"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        <QuestionCard
          key={question.id}
          question={question}
          onAnswer={onAnswer}
          disabled={false}
          selectedAnswer={null}
          showFeedback={false}
          correctAnswer={question.correctAnswer}
        />
      </div>
    </div>
  );
}
