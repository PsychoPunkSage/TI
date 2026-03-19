import {
  NUMBER_SPEED_POOL,
  generateNumberSpeedQuestion,
  validateNumberSpeedAnswer,
} from '@/engine/questions/numberSpeed';

describe('NUMBER_SPEED_POOL', () => {
  it('has at least 40 items', () => {
    expect(NUMBER_SPEED_POOL.length).toBeGreaterThanOrEqual(40);
  });

  it('all items have exactly 3 numbers', () => {
    for (const item of NUMBER_SPEED_POOL) {
      expect(item.numbers.length).toBe(3);
    }
  });

  it('all items correctAnswer is one of the three numbers', () => {
    for (const item of NUMBER_SPEED_POOL) {
      expect(item.numbers).toContain(item.correctAnswer);
    }
  });

  it('all items have an unambiguous answer (correctAnswer is highest or lowest)', () => {
    for (const item of NUMBER_SPEED_POOL) {
      const sorted = [...item.numbers].sort((a, b) => a - b);
      const [low, , high] = sorted;
      expect([low, high]).toContain(item.correctAnswer);
    }
  });
});

describe('generateNumberSpeedQuestion', () => {
  it('generates a valid NumberSpeedQuestion', () => {
    const item = NUMBER_SPEED_POOL[0];
    const q = generateNumberSpeedQuestion(item, 0);
    expect(q.type).toBe('number_speed');
    expect(q.id).toBe('number_speed_0');
    expect(q.numbers.length).toBe(3);
    expect(q.correctAnswer).toBe(item.correctAnswer);
  });

  it('preserves all three numbers after shuffling', () => {
    const item = NUMBER_SPEED_POOL[0];
    const q = generateNumberSpeedQuestion(item, 0, 42);
    expect([...q.numbers].sort((a, b) => a - b)).toEqual(
      [...item.numbers].sort((a, b) => a - b)
    );
  });

  it('correctAnswer is still present in numbers after shuffling', () => {
    const item = NUMBER_SPEED_POOL[0];
    const q = generateNumberSpeedQuestion(item, 0, 99);
    expect(q.numbers).toContain(q.correctAnswer);
  });
});

describe('validateNumberSpeedAnswer', () => {
  it('returns true for correct answer', () => {
    const item = NUMBER_SPEED_POOL[0];
    const q = generateNumberSpeedQuestion(item, 0);
    expect(validateNumberSpeedAnswer(q, q.correctAnswer)).toBe(true);
  });

  it('returns false for wrong answer', () => {
    const item = NUMBER_SPEED_POOL[0];
    const q = generateNumberSpeedQuestion(item, 0);
    const wrong = q.numbers.find((n) => n !== q.correctAnswer);
    if (wrong !== undefined) {
      expect(validateNumberSpeedAnswer(q, wrong)).toBe(false);
    }
  });
});
