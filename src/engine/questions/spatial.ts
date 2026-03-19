import type { SpatialQuestion, SymbolPair } from '@/types/questions';
import { shuffled } from '../shuffle';

export interface SpatialPoolItem {
  pairs: Array<{ isMatch: boolean; bottomTransform: string }>;
  correctAnswer: number;
}

/**
 * Real GIA format: a 1×2 grid of boxes.
 * Each box has a top symbol (always 'R') and a bottom symbol.
 * Bottom symbol is either a rotation (isMatch=true) or mirror (isMatch=false) of the top.
 * The CSS transform in bottomTransform drives the visual appearance.
 *
 * Match transforms (rotations):
 *   rotate(90deg), rotate(180deg), rotate(270deg)
 *
 * Non-match transforms (mirror + optional rotation):
 *   scaleX(-1), rotate(90deg) scaleX(-1), rotate(180deg) scaleX(-1), rotate(270deg) scaleX(-1)
 *
 * correctAnswer = count of pairs where isMatch === true.
 */

// --- 100 two-pair items ---
// Distribution: ~33 correctAnswer:0, ~34 correctAnswer:1, ~33 correctAnswer:2
// All 7 transforms appear roughly 14 times each across the pool.
export const SPATIAL_POOL: SpatialPoolItem[] = [
  // correctAnswer: 0 — both non-match (33 items)
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' },         { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },        { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 0 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },                       { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 0 },

  // correctAnswer: 1 — one match, one non-match (34 items)
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },            { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],              correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' },           { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(90deg)' }],              correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' },           { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },               { isMatch: true,  bottomTransform: 'rotate(270deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },            { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(90deg)' }],              correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' },           { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' },           { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(180deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },            { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },               { isMatch: true,  bottomTransform: 'rotate(90deg)' }],              correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' },           { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(180deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' },           { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],              correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },            { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(270deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' },           { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },               { isMatch: true,  bottomTransform: 'rotate(180deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' },           { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(270deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },            { isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' }],  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' },           { isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' }],  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'scaleX(-1)' },               { isMatch: true,  bottomTransform: 'rotate(270deg)' }],             correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },            { isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }],   correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(180deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(90deg)' }],              correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' },           { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(270deg) scaleX(-1)' },{ isMatch: true,  bottomTransform: 'rotate(90deg)' }],              correctAnswer: 1 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' },           { isMatch: false, bottomTransform: 'scaleX(-1)' }],                  correctAnswer: 1 },
  { pairs: [{ isMatch: false, bottomTransform: 'rotate(90deg) scaleX(-1)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],             correctAnswer: 1 },

  // correctAnswer: 2 — both match (33 items)
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(90deg)' },  { isMatch: true,  bottomTransform: 'rotate(270deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(270deg)' }, { isMatch: true,  bottomTransform: 'rotate(180deg)' }],  correctAnswer: 2 },
  { pairs: [{ isMatch: true,  bottomTransform: 'rotate(180deg)' }, { isMatch: true,  bottomTransform: 'rotate(90deg)' }],   correctAnswer: 2 },
];

/**
 * Builds a SymbolPair from pool data.
 * topSymbol is always 'R'; bottomSymbol is always 'R' — the CSS transform handles visual.
 */
function buildPair(pairData: { isMatch: boolean; bottomTransform: string }): SymbolPair {
  return {
    topSymbol: 'R',
    bottomSymbol: 'R',
    bottomTransform: pairData.bottomTransform,
    isMatch: pairData.isMatch,
  };
}

export function generateSpatialQuestion(
  item: SpatialPoolItem,
  index: number,
  seed?: number
): SpatialQuestion {
  const pairs = item.pairs.map((p) => buildPair(p));
  const shuffledPairs = shuffled(
    [...pairs],
    seed !== undefined ? seed + index : undefined
  );

  const correctAnswer = shuffledPairs.filter((p) => p.isMatch).length;

  return {
    type: 'spatial',
    id: `spatial_${index}`,
    pairs: shuffledPairs,
    correctAnswer,
  };
}

export function validateSpatialAnswer(
  question: SpatialQuestion,
  answer: number
): boolean {
  return question.correctAnswer === answer;
}
