import {
  REASONING_POOL,
  generateReasoningQuestion,
  validateReasoningAnswer,
} from '@/engine/questions/reasoning';

describe('REASONING_POOL', () => {
  it('has at least 40 items', () => {
    expect(REASONING_POOL.length).toBeGreaterThanOrEqual(40);
  });

  it('all items have non-empty statement and question', () => {
    for (const item of REASONING_POOL) {
      expect(item.statement.length).toBeGreaterThan(0);
      expect(item.question.length).toBeGreaterThan(0);
    }
  });

  it('all items have non-empty person1 and person2', () => {
    for (const item of REASONING_POOL) {
      expect(item.person1.length).toBeGreaterThan(0);
      expect(item.person2.length).toBeGreaterThan(0);
    }
  });

  it('all items correctAnswer is person1 or person2', () => {
    for (const item of REASONING_POOL) {
      expect([item.person1, item.person2]).toContain(item.correctAnswer);
    }
  });
});

describe('generateReasoningQuestion', () => {
  it('generates a valid ReasoningQuestion with new format', () => {
    const item = REASONING_POOL[0];
    const q = generateReasoningQuestion(item, 0);
    expect(q.type).toBe('reasoning');
    expect(q.id).toBe('reasoning_0');
    expect(q.statement).toBe(item.statement);
    expect(q.question).toBe(item.question);
    expect(q.correctAnswer).toBe(item.correctAnswer);
  });

  it('includes both people in the question', () => {
    const item = REASONING_POOL[0];
    const q = generateReasoningQuestion(item, 0);
    const people = [q.person1, q.person2].sort();
    expect(people).toEqual([item.person1, item.person2].sort());
  });

  it('uses the index in the id', () => {
    const q = generateReasoningQuestion(REASONING_POOL[5], 5);
    expect(q.id).toBe('reasoning_5');
  });
});

describe('validateReasoningAnswer', () => {
  it('returns true for correct person name', () => {
    const item = REASONING_POOL[0];
    const q = generateReasoningQuestion(item, 0);
    expect(validateReasoningAnswer(q, item.correctAnswer)).toBe(true);
  });

  it('returns false for the wrong person', () => {
    const item = REASONING_POOL[0];
    const q = generateReasoningQuestion(item, 0);
    const wrong = item.correctAnswer === item.person1 ? item.person2 : item.person1;
    expect(validateReasoningAnswer(q, wrong)).toBe(false);
  });
});
