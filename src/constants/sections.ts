import type { SectionId } from '@/types/questions';

export interface SectionMeta {
  id: SectionId;
  name: string;
  durationSeconds: number;
  testQuestionCount: number;
  practiceQuestionCount: number;
  description: string;
  instructions: string[];
}

export const SECTION_ORDER: SectionMeta[] = [
  {
    id: 'reasoning',
    name: 'Reasoning',
    durationSeconds: 240,
    testQuestionCount: 150,
    practiceQuestionCount: 8,
    description: 'Compare two people and identify who fits the description.',
    instructions: [
      'A statement will appear comparing two people — for example: "Tom is heavier than Fred."',
      'Study the statement carefully, then click the screen to continue.',
      'A question will then appear — for example: "Who is heavier?"',
      'Click the correct name to answer.',
      'Work as quickly and accurately as you can.',
    ],
  },
  {
    id: 'perceptual_speed',
    name: 'Perceptual Speed',
    durationSeconds: 240,
    testQuestionCount: 150,
    practiceQuestionCount: 8,
    description: 'Count how many columns have matching letters.',
    instructions: [
      'You will see four columns of letter pairs — one uppercase letter on top, one lowercase below.',
      'Count how many columns have the same letter (ignoring case).',
      'For example: E/e, Q/y, D/d, K/k — three columns match (E=e, D=d, K=k).',
      'Select the correct count from the five answer buttons (0 to 4).',
      'Work as quickly and accurately as you can.',
    ],
  },
  {
    id: 'number_speed',
    name: 'Number Speed & Accuracy',
    durationSeconds: 240,
    testQuestionCount: 150,
    practiceQuestionCount: 8,
    description: 'Identify which number is furthest from the remaining one.',
    instructions: [
      'Three numbers will be shown in boxes.',
      'Find the highest and lowest number.',
      'The remaining (middle) number is the reference.',
      'Click whichever of the highest or lowest is further from the reference.',
      'For example: 4, 2, 8 — lowest=2, highest=8, reference=4. 8 is 4 away; 2 is 2 away — click 8.',
    ],
  },
  {
    id: 'word_meaning',
    name: 'Word Meaning',
    durationSeconds: 240,
    testQuestionCount: 150,
    practiceQuestionCount: 8,
    description: 'Find the word that does not belong with the other two.',
    instructions: [
      'Three words will be shown.',
      'Two of the words are related — they share a meaning, category, or are opposites of each other.',
      'One word does NOT belong — it is the odd one out.',
      'Click the word that does not fit with the other two.',
      'For example: halt / cold / stop — "cold" does not fit (halt and stop are synonyms).',
    ],
  },
  {
    id: 'spatial',
    name: 'Spatial Visualisation',
    durationSeconds: 240,
    testQuestionCount: 150,
    practiceQuestionCount: 8,
    description: 'Count how many symbol pairs show a rotation (not a mirror).',
    instructions: [
      'You will see a grid of boxes, each containing two symbols.',
      'The top symbol is always the reference (like the letter R).',
      'The bottom symbol is either a rotation of the top (a match) or a mirror image (not a match).',
      'Count how many boxes show a matching pair — rotations count, mirrors do not.',
      'Select the correct count from the answer buttons.',
    ],
  },
];

export const SECTION_IDS: SectionId[] = SECTION_ORDER.map((s) => s.id);

export function getSectionMeta(id: SectionId): SectionMeta {
  const meta = SECTION_ORDER.find((s) => s.id === id);
  if (!meta) throw new Error(`Unknown section: ${id}`);
  return meta;
}
