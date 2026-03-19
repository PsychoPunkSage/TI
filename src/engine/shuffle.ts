/**
 * Mulberry32 seeded PRNG — fast, deterministic, sufficient entropy for test randomization.
 */
export function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let z = Math.imul(s ^ (s >>> 15), 1 | s);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle — mutates and returns the array.
 * Uses provided PRNG or Math.random if no seed given.
 */
export function shuffle<T>(array: T[], prng?: () => number): T[] {
  const rand = prng ?? Math.random;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Shuffle a copy of the array without mutating the original.
 */
export function shuffled<T>(array: T[], seed?: number): T[] {
  const copy = [...array];
  if (seed !== undefined) {
    return shuffle(copy, mulberry32(seed));
  }
  return shuffle(copy);
}
