import React from 'react';
import type { Question, AnswerValue } from '@/types/questions';
import { ReasoningQuestion } from '@/components/questions/ReasoningQuestion';
import { PerceptualSpeedQuestion } from '@/components/questions/PerceptualSpeedQuestion';
import { NumberSpeedQuestion } from '@/components/questions/NumberSpeedQuestion';
import { WordMeaningQuestion } from '@/components/questions/WordMeaningQuestion';
import { SpatialQuestion } from '@/components/questions/SpatialQuestion';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: AnswerValue) => void;
  disabled: boolean;
  selectedAnswer: AnswerValue | null;
  showFeedback: boolean;
  correctAnswer: AnswerValue;
}

/**
 * React.memo + key={question.id} on parent ensures full unmount/remount
 * on question change — zero internal state to reset.
 */
export const QuestionCard = React.memo(function QuestionCard({
  question,
  onAnswer,
  disabled,
  selectedAnswer,
  showFeedback,
}: QuestionCardProps) {
  switch (question.type) {
    case 'reasoning':
      return (
        <ReasoningQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
        />
      );

    case 'perceptual_speed':
      return (
        <PerceptualSpeedQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
        />
      );

    case 'number_speed':
      return (
        <NumberSpeedQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
        />
      );

    case 'word_meaning':
      return (
        <WordMeaningQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
        />
      );

    case 'spatial':
      return (
        <SpatialQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
        />
      );

    default: {
      const _exhaustive: never = question;
      return <div>Unknown question type: {JSON.stringify(_exhaustive)}</div>;
    }
  }
});
