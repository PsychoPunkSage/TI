import React, { useMemo } from 'react';
import type { SpatialQuestion as SpatialQuestionType, AnswerValue } from '@/types/questions';

interface SpatialQuestionProps {
  question: SpatialQuestionType;
  onAnswer: (answer: AnswerValue) => void;
  disabled: boolean;
  selectedAnswer: AnswerValue | null;
  showFeedback: boolean;
}

/**
 * Real GIA spatial format:
 * - Grid of boxes (2×2 for 4 pairs, 1×2 for 2 pairs)
 * - Each box shows a top symbol (always 'R') and a bottom symbol
 *   - Bottom 'R' = rotation (match)
 *   - Bottom 'Я' = mirror (non-match), rendered with CSS scaleX(-1) so 'R' looks mirrored
 * - Count answer buttons: 0 up to pairs.length
 */
export const SpatialQuestion = React.memo(function SpatialQuestion({
  question,
  onAnswer,
  disabled,
}: SpatialQuestionProps) {
  const pairCount = question.pairs.length;
  const gridCols = pairCount === 2 ? 'grid-cols-2' : 'grid-cols-2';
  const maxAnswer = pairCount;
  const answerOptions = useMemo(
    () => Array.from({ length: maxAnswer + 1 }, (_, i) => i),
    [maxAnswer]
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Pairs grid */}
      <div className={`grid ${gridCols} gap-4 w-full`}>
        {question.pairs.map((pair, i) => (
          <div
            key={i}
            className="bg-white rounded shadow-sm flex flex-col items-center py-4 gap-2"
          >
            {/* Top symbol — always R */}
            <span className="font-mono text-5xl font-bold text-gray-900 leading-none select-none">
              R
            </span>

            {/* Horizontal divider */}
            <div className="w-10 border-t-2 border-gray-400" />

            {/* Bottom symbol — R (match) rendered normally, Я (mirror) rendered via scaleX(-1) */}
            <span
              className="font-mono text-5xl font-bold text-gray-900 leading-none select-none"
              style={{ display: 'inline-block', transform: pair.bottomTransform }}
            >
              R
            </span>
          </div>
        ))}
      </div>

      {/* Answer count buttons */}
      <div
        className="grid gap-3 w-full"
        style={{ gridTemplateColumns: `repeat(${answerOptions.length}, minmax(0, 1fr))` }}
      >
        {answerOptions.map((count) => (
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
