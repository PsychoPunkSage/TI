export type QuestionType =
  | 'reasoning'
  | 'perceptual_speed'
  | 'number_speed'
  | 'word_meaning'
  | 'spatial';

export type SectionId = QuestionType;

export interface ReasoningQuestion {
  type: 'reasoning';
  id: string;
  statement: string;       // "Tom is heavier than Fred."
  question: string;        // "Who is heavier?"
  person1: string;         // "Tom"
  person2: string;         // "Fred"
  correctAnswer: string;   // "Tom"
}

export interface PerceptualSpeedQuestion {
  type: 'perceptual_speed';
  id: string;
  topRow: [string, string, string, string];     // 4 uppercase letters
  bottomRow: [string, string, string, string];  // 4 lowercase letters
  correctAnswer: 0 | 1 | 2 | 3 | 4;
}

export interface NumberSpeedQuestion {
  type: 'number_speed';
  id: string;
  numbers: [number, number, number];  // all three shown in boxes
  correctAnswer: number;              // one of the three
}

export interface WordMeaningQuestion {
  type: 'word_meaning';
  id: string;
  words: [string, string, string];  // three words; one is odd
  correctAnswer: string;
  category: string;
}

export interface SymbolPair {
  topSymbol: string;       // always 'R'
  bottomSymbol: string;    // always 'R' (transform handles visual)
  bottomTransform: string; // CSS transform applied to bottom symbol
  isMatch: boolean;        // true = rotation (counts toward answer)
}

export interface SpatialQuestion {
  type: 'spatial';
  id: string;
  pairs: SymbolPair[];      // 2 or 4 pairs
  correctAnswer: number;    // count of isMatch === true
}

export type Question =
  | ReasoningQuestion
  | PerceptualSpeedQuestion
  | NumberSpeedQuestion
  | WordMeaningQuestion
  | SpatialQuestion;

export type AnswerValue = number | string;
