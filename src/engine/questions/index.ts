import type { Question, SectionId } from '@/types/questions';
import { shuffled } from '../shuffle';
import { REASONING_POOL, generateReasoningQuestion } from './reasoning';
import { WORD_MEANING_POOL, generateWordMeaningQuestion } from './wordMeaning';
import { NUMBER_SPEED_POOL, NUMBER_SPEED_LEVEL2_POOL, generateNumberSpeedQuestion } from './numberSpeed';
import { PERCEPTUAL_SPEED_POOL, generatePerceptualSpeedQuestion } from './perceptualSpeed';
import { SPATIAL_POOL, generateSpatialQuestion } from './spatial';
import { getSectionMeta } from '@/constants/sections';

type PoolGeneratorFn<T> = (item: T, index: number, seed?: number) => Question;

function buildQuestions<T>(
  pool: T[],
  count: number,
  generator: PoolGeneratorFn<T>,
  seed?: number
): Question[] {
  const questions: Question[] = [];
  let pass = 0;
  while (questions.length < count) {
    const s = seed !== undefined ? seed + pass * 997 : undefined;
    const shuffledPool = shuffled([...pool], s);
    for (const item of shuffledPool) {
      if (questions.length >= count) break;
      questions.push(generator(item, questions.length, seed));
    }
    pass++;
  }
  return questions;
}

export function preloadSection(
  sectionId: SectionId,
  isPractice: boolean,
  seed?: number,
  numberSpeedLevel: 1 | 2 = 1
): Question[] {
  const meta = getSectionMeta(sectionId);
  const count = isPractice
    ? meta.practiceQuestionCount
    : meta.testQuestionCount;

  // Use different seed offset for practice vs timed to avoid overlap
  const baseSeed = seed !== undefined
    ? seed + (isPractice ? 1000 : 2000)
    : undefined;

  switch (sectionId) {
    case 'reasoning':
      return buildQuestions(
        REASONING_POOL,
        count,
        (item, i, s) => generateReasoningQuestion(item, i, s),
        baseSeed
      );

    case 'word_meaning':
      return buildQuestions(
        WORD_MEANING_POOL,
        count,
        (item, i, s) => generateWordMeaningQuestion(item, i, s),
        baseSeed
      );

    case 'number_speed': {
      const pool = numberSpeedLevel === 2 ? NUMBER_SPEED_LEVEL2_POOL : NUMBER_SPEED_POOL;
      return buildQuestions(
        pool,
        count,
        (item, i, s) => generateNumberSpeedQuestion(item, i, s),
        baseSeed
      );
    }

    case 'perceptual_speed':
      return buildQuestions(
        PERCEPTUAL_SPEED_POOL,
        count,
        (item, i, s) => generatePerceptualSpeedQuestion(item, i, s),
        baseSeed
      );

    case 'spatial':
      return buildQuestions(
        SPATIAL_POOL,
        count,
        (item, i, s) => generateSpatialQuestion(item, i, s),
        baseSeed
      );

    default: {
      const _exhaustive: never = sectionId;
      throw new Error(`Unknown section: ${_exhaustive}`);
    }
  }
}
