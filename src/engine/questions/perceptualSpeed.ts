import type { PerceptualSpeedQuestion } from '@/types/questions';
import { shuffled } from '../shuffle';

export interface PerceptualSpeedPoolItem {
  topRow: [string, string, string, string];     // 4 uppercase letters
  bottomRow: [string, string, string, string];  // 4 lowercase letters
  correctAnswer: 0 | 1 | 2 | 3 | 4;            // columns where top.lower === bottom.lower
}

/**
 * Real GIA format: 4 columns, top = uppercase, bottom = lowercase.
 * Count columns where the letters match (case-insensitive).
 * Answers range 0–4. Distribution ~20% each.
 */
export const PERCEPTUAL_SPEED_POOL: PerceptualSpeedPoolItem[] = [
  // correctAnswer: 0
  { topRow: ['E', 'Q', 'D', 'K'], bottomRow: ['b', 'y', 'f', 'p'], correctAnswer: 0 },
  { topRow: ['A', 'B', 'C', 'D'], bottomRow: ['x', 'y', 'z', 'w'], correctAnswer: 0 },
  { topRow: ['M', 'N', 'P', 'R'], bottomRow: ['t', 'k', 'l', 'j'], correctAnswer: 0 },
  { topRow: ['F', 'G', 'H', 'J'], bottomRow: ['c', 'v', 'b', 'n'], correctAnswer: 0 },
  { topRow: ['S', 'T', 'U', 'V'], bottomRow: ['r', 'q', 'z', 'x'], correctAnswer: 0 },
  { topRow: ['W', 'X', 'Y', 'Z'], bottomRow: ['p', 'q', 'r', 's'], correctAnswer: 0 },
  { topRow: ['L', 'O', 'I', 'C'], bottomRow: ['n', 'u', 'd', 'g'], correctAnswer: 0 },
  { topRow: ['B', 'K', 'Q', 'F'], bottomRow: ['m', 'h', 'j', 'w'], correctAnswer: 0 },
  { topRow: ['H', 'R', 'V', 'W'], bottomRow: ['e', 'c', 't', 'p'], correctAnswer: 0 },
  { topRow: ['G', 'J', 'N', 'X'], bottomRow: ['d', 'k', 'f', 'b'], correctAnswer: 0 },

  // correctAnswer: 1
  { topRow: ['E', 'Q', 'D', 'K'], bottomRow: ['e', 'y', 'f', 'p'], correctAnswer: 1 },
  { topRow: ['A', 'B', 'C', 'D'], bottomRow: ['x', 'b', 'z', 'w'], correctAnswer: 1 },
  { topRow: ['M', 'N', 'P', 'R'], bottomRow: ['m', 'k', 'l', 'j'], correctAnswer: 1 },
  { topRow: ['F', 'G', 'H', 'J'], bottomRow: ['c', 'v', 'h', 'n'], correctAnswer: 1 },
  { topRow: ['S', 'T', 'U', 'V'], bottomRow: ['r', 't', 'z', 'x'], correctAnswer: 1 },
  { topRow: ['W', 'X', 'Y', 'Z'], bottomRow: ['p', 'q', 'r', 'z'], correctAnswer: 1 },
  { topRow: ['L', 'O', 'I', 'C'], bottomRow: ['l', 'u', 'd', 'g'], correctAnswer: 1 },
  { topRow: ['B', 'K', 'Q', 'F'], bottomRow: ['m', 'h', 'q', 'w'], correctAnswer: 1 },
  { topRow: ['H', 'R', 'V', 'W'], bottomRow: ['e', 'r', 't', 'p'], correctAnswer: 1 },
  { topRow: ['G', 'J', 'N', 'X'], bottomRow: ['d', 'j', 'f', 'b'], correctAnswer: 1 },

  // correctAnswer: 2
  { topRow: ['E', 'Q', 'D', 'K'], bottomRow: ['e', 'y', 'd', 'p'], correctAnswer: 2 },
  { topRow: ['A', 'B', 'C', 'D'], bottomRow: ['a', 'b', 'z', 'w'], correctAnswer: 2 },
  { topRow: ['M', 'N', 'P', 'R'], bottomRow: ['m', 'n', 'l', 'j'], correctAnswer: 2 },
  { topRow: ['F', 'G', 'H', 'J'], bottomRow: ['c', 'g', 'h', 'n'], correctAnswer: 2 },
  { topRow: ['S', 'T', 'U', 'V'], bottomRow: ['s', 't', 'z', 'x'], correctAnswer: 2 },
  { topRow: ['W', 'X', 'Y', 'Z'], bottomRow: ['p', 'x', 'y', 's'], correctAnswer: 2 },
  { topRow: ['L', 'O', 'I', 'C'], bottomRow: ['l', 'u', 'i', 'g'], correctAnswer: 2 },
  { topRow: ['B', 'K', 'Q', 'F'], bottomRow: ['b', 'h', 'q', 'w'], correctAnswer: 2 },
  { topRow: ['H', 'R', 'V', 'W'], bottomRow: ['h', 'r', 't', 'p'], correctAnswer: 2 },
  { topRow: ['G', 'J', 'N', 'X'], bottomRow: ['g', 'j', 'f', 'b'], correctAnswer: 2 },

  // correctAnswer: 3
  { topRow: ['E', 'Q', 'D', 'K'], bottomRow: ['e', 'q', 'd', 'p'], correctAnswer: 3 },
  { topRow: ['A', 'B', 'C', 'D'], bottomRow: ['a', 'b', 'c', 'w'], correctAnswer: 3 },
  { topRow: ['M', 'N', 'P', 'R'], bottomRow: ['m', 'n', 'p', 'j'], correctAnswer: 3 },
  { topRow: ['F', 'G', 'H', 'J'], bottomRow: ['f', 'g', 'h', 'n'], correctAnswer: 3 },
  { topRow: ['S', 'T', 'U', 'V'], bottomRow: ['s', 't', 'u', 'x'], correctAnswer: 3 },
  { topRow: ['W', 'X', 'Y', 'Z'], bottomRow: ['p', 'x', 'y', 'z'], correctAnswer: 3 },
  { topRow: ['L', 'O', 'I', 'C'], bottomRow: ['l', 'o', 'i', 'g'], correctAnswer: 3 },
  { topRow: ['B', 'K', 'Q', 'F'], bottomRow: ['b', 'k', 'q', 'w'], correctAnswer: 3 },
  { topRow: ['H', 'R', 'V', 'W'], bottomRow: ['h', 'r', 'v', 'p'], correctAnswer: 3 },
  { topRow: ['G', 'J', 'N', 'X'], bottomRow: ['g', 'j', 'n', 'b'], correctAnswer: 3 },

  // correctAnswer: 4
  { topRow: ['E', 'Q', 'D', 'K'], bottomRow: ['e', 'q', 'd', 'k'], correctAnswer: 4 },
  { topRow: ['A', 'B', 'C', 'D'], bottomRow: ['a', 'b', 'c', 'd'], correctAnswer: 4 },
  { topRow: ['M', 'N', 'P', 'R'], bottomRow: ['m', 'n', 'p', 'r'], correctAnswer: 4 },
  { topRow: ['F', 'G', 'H', 'J'], bottomRow: ['f', 'g', 'h', 'j'], correctAnswer: 4 },
  { topRow: ['S', 'T', 'U', 'V'], bottomRow: ['s', 't', 'u', 'v'], correctAnswer: 4 },
  { topRow: ['W', 'X', 'Y', 'Z'], bottomRow: ['w', 'x', 'y', 'z'], correctAnswer: 4 },
  { topRow: ['L', 'O', 'I', 'C'], bottomRow: ['l', 'o', 'i', 'c'], correctAnswer: 4 },
  { topRow: ['B', 'K', 'Q', 'F'], bottomRow: ['b', 'k', 'q', 'f'], correctAnswer: 4 },
  { topRow: ['H', 'R', 'V', 'W'], bottomRow: ['h', 'r', 'v', 'w'], correctAnswer: 4 },
  { topRow: ['G', 'J', 'N', 'X'], bottomRow: ['g', 'j', 'n', 'x'], correctAnswer: 4 },

  // Extra variety
  { topRow: ['P', 'T', 'E', 'A'], bottomRow: ['p', 'k', 'e', 'z'], correctAnswer: 2 },
  { topRow: ['Z', 'L', 'M', 'S'], bottomRow: ['z', 'l', 'b', 's'], correctAnswer: 3 },
  { topRow: ['C', 'U', 'R', 'B'], bottomRow: ['x', 'u', 'r', 'b'], correctAnswer: 3 },
  { topRow: ['D', 'V', 'J', 'T'], bottomRow: ['d', 'y', 'j', 'p'], correctAnswer: 2 },
  { topRow: ['N', 'I', 'O', 'Y'], bottomRow: ['n', 'i', 'o', 'y'], correctAnswer: 4 },
  { topRow: ['K', 'F', 'G', 'L'], bottomRow: ['k', 'f', 'n', 'l'], correctAnswer: 3 },
  { topRow: ['X', 'H', 'S', 'Q'], bottomRow: ['m', 'h', 'k', 'q'], correctAnswer: 2 },
  { topRow: ['O', 'A', 'W', 'U'], bottomRow: ['j', 'a', 'c', 'u'], correctAnswer: 2 },
  { topRow: ['Y', 'C', 'P', 'K'], bottomRow: ['y', 'f', 'p', 't'], correctAnswer: 2 },
  { topRow: ['I', 'D', 'B', 'N'], bottomRow: ['i', 'd', 'b', 'n'], correctAnswer: 4 },

  // --- Expanded pool (50+ new verified items) ---

  // correctAnswer: 0 (10 new)
  { topRow: ['A', 'E', 'I', 'O'], bottomRow: ['z', 'r', 'p', 'n'], correctAnswer: 0 },
  // verify: A≠z, E≠r, I≠p, O≠n → 0 ✓
  { topRow: ['T', 'R', 'S', 'P'], bottomRow: ['g', 'h', 'j', 'k'], correctAnswer: 0 },
  // verify: T≠g, R≠h, S≠j, P≠k → 0 ✓
  { topRow: ['C', 'V', 'Z', 'X'], bottomRow: ['m', 'w', 'q', 'b'], correctAnswer: 0 },
  // verify: C≠m, V≠w, Z≠q, X≠b → 0 ✓
  { topRow: ['D', 'F', 'G', 'H'], bottomRow: ['r', 's', 't', 'n'], correctAnswer: 0 },
  // verify: D≠r, F≠s, G≠t, H≠n → 0 ✓
  { topRow: ['J', 'K', 'L', 'M'], bottomRow: ['p', 'q', 'r', 's'], correctAnswer: 0 },
  // verify: J≠p, K≠q, L≠r, M≠s → 0 ✓
  { topRow: ['N', 'O', 'P', 'Q'], bottomRow: ['d', 'e', 'f', 'g'], correctAnswer: 0 },
  // verify: N≠d, O≠e, P≠f, Q≠g → 0 ✓
  { topRow: ['U', 'V', 'W', 'X'], bottomRow: ['c', 'd', 'e', 'f'], correctAnswer: 0 },
  // verify: U≠c, V≠d, W≠e, X≠f → 0 ✓
  { topRow: ['Y', 'Z', 'A', 'B'], bottomRow: ['h', 'i', 'j', 'k'], correctAnswer: 0 },
  // verify: Y≠h, Z≠i, A≠j, B≠k → 0 ✓
  { topRow: ['R', 'S', 'T', 'U'], bottomRow: ['b', 'c', 'd', 'e'], correctAnswer: 0 },
  // verify: R≠b, S≠c, T≠d, U≠e → 0 ✓
  { topRow: ['E', 'F', 'G', 'H'], bottomRow: ['n', 'o', 'p', 'q'], correctAnswer: 0 },
  // verify: E≠n, F≠o, G≠p, H≠q → 0 ✓

  // correctAnswer: 1 (10 new)
  { topRow: ['A', 'E', 'I', 'O'], bottomRow: ['a', 'r', 'p', 'n'], correctAnswer: 1 },
  // verify: A=a(1), E≠r, I≠p, O≠n → 1 ✓
  { topRow: ['T', 'R', 'S', 'P'], bottomRow: ['g', 'r', 'j', 'k'], correctAnswer: 1 },
  // verify: T≠g, R=r(1), S≠j, P≠k → 1 ✓
  { topRow: ['C', 'V', 'Z', 'X'], bottomRow: ['m', 'v', 'q', 'b'], correctAnswer: 1 },
  // verify: C≠m, V=v(1), Z≠q, X≠b → 1 ✓
  { topRow: ['D', 'F', 'G', 'H'], bottomRow: ['r', 's', 'g', 'n'], correctAnswer: 1 },
  // verify: D≠r, F≠s, G=g(1), H≠n → 1 ✓
  { topRow: ['J', 'K', 'L', 'M'], bottomRow: ['p', 'q', 'r', 'm'], correctAnswer: 1 },
  // verify: J≠p, K≠q, L≠r, M=m(1) → 1 ✓
  { topRow: ['N', 'O', 'P', 'Q'], bottomRow: ['n', 'e', 'f', 'g'], correctAnswer: 1 },
  // verify: N=n(1), O≠e, P≠f, Q≠g → 1 ✓
  { topRow: ['U', 'V', 'W', 'X'], bottomRow: ['c', 'd', 'w', 'f'], correctAnswer: 1 },
  // verify: U≠c, V≠d, W=w(1), X≠f → 1 ✓
  { topRow: ['Y', 'Z', 'A', 'B'], bottomRow: ['h', 'z', 'j', 'k'], correctAnswer: 1 },
  // verify: Y≠h, Z=z(1), A≠j, B≠k → 1 ✓
  { topRow: ['R', 'S', 'T', 'U'], bottomRow: ['b', 's', 'd', 'e'], correctAnswer: 1 },
  // verify: R≠b, S=s(1), T≠d, U≠e → 1 ✓
  { topRow: ['E', 'F', 'G', 'H'], bottomRow: ['e', 'o', 'p', 'q'], correctAnswer: 1 },
  // verify: E=e(1), F≠o, G≠p, H≠q → 1 ✓

  // correctAnswer: 2 (10 new)
  { topRow: ['A', 'E', 'I', 'O'], bottomRow: ['a', 'e', 'p', 'n'], correctAnswer: 2 },
  // verify: A=a(1), E=e(2), I≠p, O≠n → 2 ✓
  { topRow: ['T', 'R', 'S', 'P'], bottomRow: ['g', 'r', 's', 'k'], correctAnswer: 2 },
  // verify: T≠g, R=r(1), S=s(2), P≠k → 2 ✓
  { topRow: ['C', 'V', 'Z', 'X'], bottomRow: ['c', 'v', 'q', 'b'], correctAnswer: 2 },
  // verify: C=c(1), V=v(2), Z≠q, X≠b → 2 ✓
  { topRow: ['D', 'F', 'G', 'H'], bottomRow: ['d', 's', 'g', 'n'], correctAnswer: 2 },
  // verify: D=d(1), F≠s, G=g(2), H≠n → 2 ✓
  { topRow: ['J', 'K', 'L', 'M'], bottomRow: ['j', 'q', 'l', 'n'], correctAnswer: 2 },
  // verify: J=j(1), K≠q, L=l(2), M≠n → 2 ✓
  { topRow: ['N', 'O', 'P', 'Q'], bottomRow: ['n', 'o', 'f', 'g'], correctAnswer: 2 },
  // verify: N=n(1), O=o(2), P≠f, Q≠g → 2 ✓
  { topRow: ['U', 'V', 'W', 'X'], bottomRow: ['u', 'd', 'w', 'f'], correctAnswer: 2 },
  // verify: U=u(1), V≠d, W=w(2), X≠f → 2 ✓
  { topRow: ['Y', 'Z', 'A', 'B'], bottomRow: ['y', 'z', 'j', 'k'], correctAnswer: 2 },
  // verify: Y=y(1), Z=z(2), A≠j, B≠k → 2 ✓
  { topRow: ['R', 'S', 'T', 'U'], bottomRow: ['r', 'c', 't', 'e'], correctAnswer: 2 },
  // verify: R=r(1), S≠c, T=t(2), U≠e → 2 ✓
  { topRow: ['E', 'F', 'G', 'H'], bottomRow: ['e', 'f', 'p', 'q'], correctAnswer: 2 },
  // verify: E=e(1), F=f(2), G≠p, H≠q → 2 ✓

  // correctAnswer: 3 (10 new)
  { topRow: ['A', 'E', 'I', 'O'], bottomRow: ['a', 'e', 'i', 'n'], correctAnswer: 3 },
  // verify: A=a(1), E=e(2), I=i(3), O≠n → 3 ✓
  { topRow: ['T', 'R', 'S', 'P'], bottomRow: ['t', 'r', 's', 'k'], correctAnswer: 3 },
  // verify: T=t(1), R=r(2), S=s(3), P≠k → 3 ✓
  { topRow: ['C', 'V', 'Z', 'X'], bottomRow: ['c', 'v', 'z', 'b'], correctAnswer: 3 },
  // verify: C=c(1), V=v(2), Z=z(3), X≠b → 3 ✓
  { topRow: ['D', 'F', 'G', 'H'], bottomRow: ['d', 'f', 'g', 'n'], correctAnswer: 3 },
  // verify: D=d(1), F=f(2), G=g(3), H≠n → 3 ✓
  { topRow: ['J', 'K', 'L', 'M'], bottomRow: ['j', 'k', 'l', 'n'], correctAnswer: 3 },
  // verify: J=j(1), K=k(2), L=l(3), M≠n → 3 ✓
  { topRow: ['N', 'O', 'P', 'Q'], bottomRow: ['n', 'o', 'p', 'g'], correctAnswer: 3 },
  // verify: N=n(1), O=o(2), P=p(3), Q≠g → 3 ✓
  { topRow: ['U', 'V', 'W', 'X'], bottomRow: ['u', 'v', 'w', 'f'], correctAnswer: 3 },
  // verify: U=u(1), V=v(2), W=w(3), X≠f → 3 ✓
  { topRow: ['Y', 'Z', 'A', 'B'], bottomRow: ['h', 'z', 'a', 'b'], correctAnswer: 3 },
  // verify: Y≠h, Z=z(1), A=a(2), B=b(3) → 3 ✓
  { topRow: ['R', 'S', 'T', 'U'], bottomRow: ['r', 's', 'x', 'u'], correctAnswer: 3 },
  // verify: R=r(1), S=s(2), T≠x, U=u(3) → 3 ✓
  { topRow: ['E', 'F', 'G', 'H'], bottomRow: ['e', 'f', 'g', 'q'], correctAnswer: 3 },
  // verify: E=e(1), F=f(2), G=g(3), H≠q → 3 ✓

  // correctAnswer: 4 (10 new)
  { topRow: ['A', 'E', 'I', 'O'], bottomRow: ['a', 'e', 'i', 'o'], correctAnswer: 4 },
  // verify: A=a, E=e, I=i, O=o → 4 ✓
  { topRow: ['T', 'R', 'S', 'P'], bottomRow: ['t', 'r', 's', 'p'], correctAnswer: 4 },
  // verify: T=t, R=r, S=s, P=p → 4 ✓
  { topRow: ['C', 'V', 'Z', 'X'], bottomRow: ['c', 'v', 'z', 'x'], correctAnswer: 4 },
  // verify: C=c, V=v, Z=z, X=x → 4 ✓
  { topRow: ['D', 'F', 'G', 'H'], bottomRow: ['d', 'f', 'g', 'h'], correctAnswer: 4 },
  // verify: D=d, F=f, G=g, H=h → 4 ✓
  { topRow: ['J', 'K', 'L', 'M'], bottomRow: ['j', 'k', 'l', 'm'], correctAnswer: 4 },
  // verify: J=j, K=k, L=l, M=m → 4 ✓
  { topRow: ['N', 'O', 'P', 'Q'], bottomRow: ['n', 'o', 'p', 'q'], correctAnswer: 4 },
  // verify: N=n, O=o, P=p, Q=q → 4 ✓
  { topRow: ['U', 'V', 'W', 'X'], bottomRow: ['u', 'v', 'w', 'x'], correctAnswer: 4 },
  // verify: U=u, V=v, W=w, X=x → 4 ✓
  { topRow: ['Y', 'Z', 'A', 'B'], bottomRow: ['y', 'z', 'a', 'b'], correctAnswer: 4 },
  // verify: Y=y, Z=z, A=a, B=b → 4 ✓
  { topRow: ['R', 'S', 'T', 'U'], bottomRow: ['r', 's', 't', 'u'], correctAnswer: 4 },
  // verify: R=r, S=s, T=t, U=u → 4 ✓
  { topRow: ['E', 'F', 'G', 'H'], bottomRow: ['e', 'f', 'g', 'h'], correctAnswer: 4 },
  // verify: E=e, F=f, G=g, H=h → 4 ✓
];

/**
 * Generates a PerceptualSpeedQuestion from a pool item.
 * Columns (as index pairs) are shuffled together to randomise display order
 * while preserving each column's top+bottom relationship and the correct count.
 */
export function generatePerceptualSpeedQuestion(
  item: PerceptualSpeedPoolItem,
  index: number,
  seed?: number
): PerceptualSpeedQuestion {
  // Build column pairs, shuffle them, then split back to topRow / bottomRow
  const columns: Array<[string, string]> = item.topRow.map((t, i) => [t, item.bottomRow[i]]);
  const shuffledCols = shuffled(columns, seed !== undefined ? seed + index : undefined) as Array<[string, string]>;

  const topRow = shuffledCols.map((c) => c[0]) as [string, string, string, string];
  const bottomRow = shuffledCols.map((c) => c[1]) as [string, string, string, string];

  return {
    type: 'perceptual_speed',
    id: `perceptual_speed_${index}`,
    topRow,
    bottomRow,
    correctAnswer: item.correctAnswer,
  };
}

export function validatePerceptualSpeedAnswer(
  question: PerceptualSpeedQuestion,
  answer: number
): boolean {
  return question.correctAnswer === answer;
}
