'use client';

import React, { useState } from 'react';
import type { ReasoningQuestion as ReasoningQuestionType, AnswerValue } from '@/types/questions';

interface ReasoningQuestionProps {
  question: ReasoningQuestionType;
  onAnswer: (answer: AnswerValue) => void;
  disabled: boolean;
  selectedAnswer: AnswerValue | null;
  showFeedback: boolean;
}

/**
 * Two-phase rendering matching the real GIA booklet format:
 *
 * Phase 1 — statement: Shows the comparative statement in a white box.
 *   Two dark blank placeholder buttons below. "Click anywhere to continue."
 *   Clicking anywhere on the panel advances to phase 2.
 *
 * Phase 2 — question: Statement disappears. The question is shown with
 *   two named answer buttons. Clicking a name fires onAnswer immediately.
 */
export const ReasoningQuestion = React.memo(function ReasoningQuestion({
  question,
  onAnswer,
  disabled,
}: ReasoningQuestionProps) {
  const [phase, setPhase] = useState<'statement' | 'question'>('statement');

  function handlePanelClick() {
    if (phase === 'statement') {
      setPhase('question');
    }
  }

  function handleAnswer(name: string) {
    if (disabled) return;
    onAnswer(name);
  }

  if (phase === 'statement') {
    return (
      <div
        className="flex flex-col items-center gap-6 cursor-pointer select-none"
        onClick={handlePanelClick}
      >
        {/* Statement box */}
        <div className="w-full bg-white rounded shadow-sm px-8 py-6 text-center">
          <p className="text-xl font-semibold text-gray-900 leading-snug">
            {question.statement}
          </p>
        </div>

        {/* Blank dark placeholder buttons */}
        <div className="flex gap-4 w-full">
          <div className="flex-1 h-14 rounded bg-[#2d4a7a]" />
          <div className="flex-1 h-14 rounded bg-[#2d4a7a]" />
        </div>

        {/* Prompt */}
        <p className="text-sm text-gray-600 text-center mt-1">
          Click the screen when ready to continue
        </p>
      </div>
    );
  }

  // Phase 2 — question + named answer buttons
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Question box */}
      <div className="w-full bg-white rounded shadow-sm px-8 py-6 text-center">
        <p className="text-xl font-semibold text-gray-900 leading-snug">
          {question.question}
        </p>
      </div>

      {/* Named answer buttons */}
      <div className="flex gap-4 w-full">
        <button
          onClick={() => handleAnswer(question.person1)}
          disabled={disabled}
          className="flex-1 h-14 rounded bg-[#2d4a7a] text-white text-lg font-semibold hover:bg-[#3a5d99] disabled:opacity-50 cursor-pointer"
        >
          {question.person1}
        </button>
        <button
          onClick={() => handleAnswer(question.person2)}
          disabled={disabled}
          className="flex-1 h-14 rounded bg-[#2d4a7a] text-white text-lg font-semibold hover:bg-[#3a5d99] disabled:opacity-50 cursor-pointer"
        >
          {question.person2}
        </button>
      </div>
    </div>
  );
});
