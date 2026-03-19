import {
  WORD_MEANING_POOL,
  generateWordMeaningQuestion,
  validateWordMeaningAnswer,
} from '@/engine/questions/wordMeaning';

describe('WORD_MEANING_POOL', () => {
  it('has at least 40 items', () => {
    expect(WORD_MEANING_POOL.length).toBeGreaterThanOrEqual(40);
  });

  it('all items have exactly 3 words', () => {
    for (const item of WORD_MEANING_POOL) {
      expect(item.words.length).toBe(3);
    }
  });

  it('all items correctAnswer is one of the three words', () => {
    for (const item of WORD_MEANING_POOL) {
      expect(item.words).toContain(item.correctAnswer);
    }
  });

  it('all items have a non-empty category', () => {
    for (const item of WORD_MEANING_POOL) {
      expect(item.category.length).toBeGreaterThan(0);
    }
  });
});

describe('generateWordMeaningQuestion', () => {
  it('generates a valid WordMeaningQuestion', () => {
    const item = WORD_MEANING_POOL[0];
    const q = generateWordMeaningQuestion(item, 0);
    expect(q.type).toBe('word_meaning');
    expect(q.id).toBe('word_meaning_0');
    expect(q.correctAnswer).toBe(item.correctAnswer);
    expect(q.category).toBe(item.category);
    expect(q.words.length).toBe(3);
  });

  it('preserves all three words after shuffling', () => {
    const item = WORD_MEANING_POOL[0];
    const q = generateWordMeaningQuestion(item, 0, 42);
    const sortedOriginal = [...item.words].sort();
    const sortedGenerated = [...q.words].sort();
    expect(sortedGenerated).toEqual(sortedOriginal);
  });

  it('correctAnswer is still present after word shuffling', () => {
    const item = WORD_MEANING_POOL[0];
    const q = generateWordMeaningQuestion(item, 0, 99);
    expect(q.words).toContain(q.correctAnswer);
  });

  it('uses index in id', () => {
    const q = generateWordMeaningQuestion(WORD_MEANING_POOL[3], 3);
    expect(q.id).toBe('word_meaning_3');
  });
});

describe('validateWordMeaningAnswer', () => {
  it('returns true for correct answer', () => {
    const item = WORD_MEANING_POOL[0];
    const q = generateWordMeaningQuestion(item, 0);
    expect(validateWordMeaningAnswer(q, item.correctAnswer)).toBe(true);
  });

  it('returns false for wrong answer', () => {
    const item = WORD_MEANING_POOL[0];
    const q = generateWordMeaningQuestion(item, 0);
    const wrongWord = item.words.find((w) => w !== item.correctAnswer)!;
    expect(validateWordMeaningAnswer(q, wrongWord)).toBe(false);
  });
});
