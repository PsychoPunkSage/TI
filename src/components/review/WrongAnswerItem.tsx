'use client';

import { useMemo } from 'react';
import type { Question, AnswerValue } from '@/types/questions';

interface WrongAnswerItemProps {
  question: Question;
  selectedAnswer: AnswerValue;
  correctAnswer: AnswerValue;
  questionNumber?: number;
}

export function WrongAnswerItem({
  question,
  selectedAnswer,
  correctAnswer,
  questionNumber,
}: WrongAnswerItemProps) {
  return (
    <div className="bg-white rounded-lg border border-red-100 p-4">
      {questionNumber !== undefined && (
        <p className="text-xs text-gray-400 font-medium mb-3">
          Question {questionNumber}
        </p>
      )}
      <QuestionPreview
        question={question}
        selectedAnswer={selectedAnswer}
        correctAnswer={correctAnswer}
      />
    </div>
  );
}

function QuestionPreview({
  question,
  selectedAnswer,
  correctAnswer,
}: {
  question: Question;
  selectedAnswer: AnswerValue;
  correctAnswer: AnswerValue;
}) {
  switch (question.type) {
    case 'reasoning':
      return (
        <div className="flex flex-col gap-3">
          <div className="bg-gray-50 rounded px-4 py-3 text-center">
            <p className="text-sm font-semibold text-gray-800">{question.statement}</p>
          </div>
          <p className="text-sm text-gray-600 text-center">{question.question}</p>
          <div className="flex gap-3 mt-1">
            {[question.person1, question.person2].map((name) => {
              const isSelected = String(selectedAnswer) === name;
              const isCorrect = String(correctAnswer) === name;
              return (
                <div
                  key={name}
                  className={`flex-1 h-10 rounded flex items-center justify-center text-sm font-semibold ${
                    isCorrect
                      ? 'bg-green-600 text-white ring-2 ring-green-300'
                      : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-[#2d4a7a] text-white opacity-40'
                  }`}
                >
                  {name}
                </div>
              );
            })}
          </div>
          <AnswerLabels selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
        </div>
      );

    case 'number_speed':
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {question.numbers.map((num, i) => {
              const isSelected = String(selectedAnswer) === String(num);
              const isCorrect = String(correctAnswer) === String(num);
              return (
                <div
                  key={i}
                  className={`h-16 rounded flex items-center justify-center text-2xl font-bold font-mono ${
                    isCorrect
                      ? 'bg-green-600 text-white ring-2 ring-green-300'
                      : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-[#2d4a7a] text-white opacity-40'
                  }`}
                >
                  {num}
                </div>
              );
            })}
          </div>
          <AnswerLabels selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
        </div>
      );

    case 'word_meaning':
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {question.words.map((word) => {
              const isSelected = String(selectedAnswer) === word;
              const isCorrect = String(correctAnswer) === word;
              return (
                <div
                  key={word}
                  className={`h-12 rounded flex items-center justify-center text-sm font-semibold px-2 text-center ${
                    isCorrect
                      ? 'bg-green-600 text-white ring-2 ring-green-300'
                      : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-[#2d4a7a] text-white opacity-40'
                  }`}
                >
                  {word}
                </div>
              );
            })}
          </div>
          <AnswerLabels selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
        </div>
      );

    case 'perceptual_speed':
      return (
        <div className="flex flex-col gap-3">
          <div className="bg-gray-50 rounded px-4 py-4">
            <div className="grid grid-cols-4 gap-3">
              {question.topRow.map((topLetter, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="font-mono text-2xl font-bold text-gray-900">{topLetter}</span>
                  <span className="font-mono text-2xl font-bold text-gray-900">{question.bottomRow[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <CountAnswerRow
            maxCount={4}
            selectedAnswer={selectedAnswer}
            correctAnswer={correctAnswer}
          />
          <AnswerLabels selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
        </div>
      );

    case 'spatial':
      return (
        <SpatialPreview
          question={question}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
        />
      );
  }
}

function SpatialPreview({
  question,
  selectedAnswer,
  correctAnswer,
}: {
  question: import('@/types/questions').SpatialQuestion;
  selectedAnswer: AnswerValue;
  correctAnswer: AnswerValue;
}) {
  const answerOptions = useMemo(
    () => Array.from({ length: question.pairs.length + 1 }, (_, i) => i),
    [question.pairs.length]
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {question.pairs.map((pair, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded flex flex-col items-center py-3 gap-1"
          >
            <span className="font-mono text-3xl font-bold text-gray-900 select-none">R</span>
            <div className="w-8 border-t-2 border-gray-400" />
            <span
              className="font-mono text-3xl font-bold text-gray-900 select-none"
              style={{ display: 'inline-block', transform: pair.bottomTransform }}
            >
              R
            </span>
          </div>
        ))}
      </div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${answerOptions.length}, minmax(0, 1fr))` }}
      >
        {answerOptions.map((count) => {
          const isSelected = String(selectedAnswer) === String(count);
          const isCorrect = String(correctAnswer) === String(count);
          return (
            <div
              key={count}
              className={`h-10 rounded flex items-center justify-center text-base font-bold font-mono ${
                isCorrect
                  ? 'bg-green-600 text-white ring-2 ring-green-300'
                  : isSelected
                  ? 'bg-red-500 text-white'
                  : 'bg-[#2d4a7a] text-white opacity-40'
              }`}
            >
              {count}
            </div>
          );
        })}
      </div>
      <AnswerLabels selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
    </div>
  );
}

function CountAnswerRow({
  maxCount,
  selectedAnswer,
  correctAnswer,
}: {
  maxCount: number;
  selectedAnswer: AnswerValue;
  correctAnswer: AnswerValue;
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${maxCount + 1}, minmax(0, 1fr))` }}>
      {Array.from({ length: maxCount + 1 }, (_, i) => i).map((count) => {
        const isSelected = String(selectedAnswer) === String(count);
        const isCorrect = String(correctAnswer) === String(count);
        return (
          <div
            key={count}
            className={`h-10 rounded flex items-center justify-center text-base font-bold font-mono ${
              isCorrect
                ? 'bg-green-600 text-white ring-2 ring-green-300'
                : isSelected
                ? 'bg-red-500 text-white'
                : 'bg-[#2d4a7a] text-white opacity-40'
            }`}
          >
            {count}
          </div>
        );
      })}
    </div>
  );
}

function AnswerLabels({
  selectedAnswer,
  correctAnswer,
}: {
  selectedAnswer: AnswerValue;
  correctAnswer: AnswerValue;
}) {
  return (
    <div className="flex gap-4 text-xs mt-1">
      <span className="text-red-600 font-medium">
        Your answer: <span className="font-bold">{String(selectedAnswer)}</span>
      </span>
      <span className="text-green-700 font-medium">
        Correct: <span className="font-bold">{String(correctAnswer)}</span>
      </span>
    </div>
  );
}
