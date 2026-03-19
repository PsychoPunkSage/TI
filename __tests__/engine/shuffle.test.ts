import { shuffle, shuffled, mulberry32 } from '@/engine/shuffle';

describe('mulberry32', () => {
  it('produces deterministic output for same seed', () => {
    const prng1 = mulberry32(42);
    const prng2 = mulberry32(42);
    const results1 = Array.from({ length: 10 }, () => prng1());
    const results2 = Array.from({ length: 10 }, () => prng2());
    expect(results1).toEqual(results2);
  });

  it('produces values in [0, 1)', () => {
    const prng = mulberry32(123);
    for (let i = 0; i < 100; i++) {
      const v = prng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('produces different output for different seeds', () => {
    const prng1 = mulberry32(1);
    const prng2 = mulberry32(2);
    const v1 = prng1();
    const v2 = prng2();
    expect(v1).not.toEqual(v2);
  });
});

describe('shuffle', () => {
  it('returns the same array reference', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).toBe(arr);
  });

  it('preserves all elements', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const copy = [...arr];
    shuffle(arr);
    expect(arr.sort()).toEqual(copy.sort());
  });

  it('produces deterministic output with seeded PRNG', () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 3, 4, 5];
    const prng1 = mulberry32(99);
    const prng2 = mulberry32(99);
    shuffle(arr1, prng1);
    shuffle(arr2, prng2);
    expect(arr1).toEqual(arr2);
  });

  it('handles empty array without throwing', () => {
    expect(() => shuffle([])).not.toThrow();
  });

  it('handles single element array', () => {
    const arr = [42];
    shuffle(arr);
    expect(arr).toEqual([42]);
  });
});

describe('shuffled', () => {
  it('does not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    shuffled(original, 42);
    expect(original).toEqual(copy);
  });

  it('returns a new array with same elements', () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffled(original, 42);
    expect(result).not.toBe(original);
    expect(result.sort()).toEqual(original.sort());
  });

  it('produces deterministic output with same seed', () => {
    const arr = [10, 20, 30, 40, 50];
    const r1 = shuffled(arr, 7);
    const r2 = shuffled(arr, 7);
    expect(r1).toEqual(r2);
  });

  it('produces different output with different seeds', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const r1 = shuffled(arr, 1);
    const r2 = shuffled(arr, 99999);
    // Different seeds should (very likely) produce different orderings
    expect(r1).not.toEqual(r2);
  });
});
