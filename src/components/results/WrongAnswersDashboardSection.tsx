'use client';

import { useState, useMemo } from 'react';
import type { DbQuestionLog } from '@/types/db';
import type { Question } from '@/types/questions';
import type { SectionId } from '@/types/questions';
import { WrongAnswerItem } from '@/components/review/WrongAnswerItem';

const SECTION_LABELS: Record<SectionId, string> = {
  reasoning: 'Reasoning',
  perceptual_speed: 'Perceptual Speed',
  number_speed: 'Number Speed',
  word_meaning: 'Word Meaning',
  spatial: 'Spatial Visualisation',
};

interface ParsedWrongLog {
  question: Question;
  selectedAnswer: string;
  correctAnswer: string;
  sectionId: SectionId;
}

interface WrongAnswersDashboardSectionProps {
  questionLogs: DbQuestionLog[];
}

export function WrongAnswersDashboardSection({ questionLogs }: WrongAnswersDashboardSectionProps) {
  const wrongBySection = useMemo(() => {
    const map: Partial<Record<SectionId, ParsedWrongLog[]>> = {};

    for (const log of questionLogs) {
      if (log.isPractice !== 0 || log.isCorrect !== 0) continue;
      if (!log.questionSnapshotJson) continue;

      let question: Question;
      try {
        question = JSON.parse(log.questionSnapshotJson) as Question;
      } catch {
        continue;
      }

      const entry: ParsedWrongLog = {
        question,
        selectedAnswer: log.selectedAnswer,
        correctAnswer: log.correctAnswer,
        sectionId: log.sectionId,
      };

      if (!map[log.sectionId]) map[log.sectionId] = [];
      map[log.sectionId]!.push(entry);
    }

    return map;
  }, [questionLogs]);

  const sections = Object.keys(wrongBySection) as SectionId[];

  if (sections.length === 0) return null;

  const totalWrong = sections.reduce((sum, s) => sum + (wrongBySection[s]?.length ?? 0), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Wrong Answers</h2>
      <p className="text-sm text-red-600 font-medium mb-4">
        {totalWrong} question{totalWrong !== 1 ? 's' : ''} answered incorrectly
      </p>

      <div className="flex flex-col gap-3">
        {sections.map((sectionId) => (
          <SectionAccordion
            key={sectionId}
            sectionId={sectionId}
            logs={wrongBySection[sectionId]!}
          />
        ))}
      </div>
    </div>
  );
}

function SectionAccordion({ sectionId, logs }: { sectionId: SectionId; logs: ParsedWrongLog[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-left"
      >
        <span className="text-sm font-semibold text-gray-800">
          {SECTION_LABELS[sectionId]}
        </span>
        <span className="flex items-center gap-2 text-xs text-red-600 font-medium">
          {logs.length} wrong
          <span className="text-gray-400 text-base">{open ? '▲' : '▼'}</span>
        </span>
      </button>

      {open && (
        <div className="p-4 flex flex-col gap-3 bg-white">
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
      )}
    </div>
  );
}
