import type { WordMeaningQuestion } from '@/types/questions';
import { shuffled } from '../shuffle';

export interface WordMeaningPoolItem {
  words: [string, string, string];
  correctAnswer: string;
  category: string;
}

/**
 * Real GIA format: THREE words. Two are related (synonyms, antonyms, or same
 * category), one is the odd word out. Click the odd one.
 *
 * Relationship types:
 *   - same meaning (synonyms): halt/stop/cold → cold is odd
 *   - opposites category: up/down/street → street is odd
 *   - semantic group: cat/dog/table → table is odd
 */
export const WORD_MEANING_POOL: WordMeaningPoolItem[] = [
  // Synonyms for stop/halt
  { words: ['halt', 'cold', 'stop'], correctAnswer: 'cold', category: 'synonyms' },
  { words: ['begin', 'start', 'finish'], correctAnswer: 'finish', category: 'synonyms' },
  { words: ['angry', 'furious', 'calm'], correctAnswer: 'calm', category: 'synonyms' },
  { words: ['happy', 'joyful', 'sad'], correctAnswer: 'sad', category: 'synonyms' },
  { words: ['big', 'large', 'small'], correctAnswer: 'small', category: 'synonyms' },
  { words: ['fast', 'rapid', 'slow'], correctAnswer: 'slow', category: 'synonyms' },
  { words: ['brave', 'courageous', 'cowardly'], correctAnswer: 'cowardly', category: 'synonyms' },
  { words: ['bright', 'clever', 'stupid'], correctAnswer: 'stupid', category: 'synonyms' },
  { words: ['dull', 'boring', 'exciting'], correctAnswer: 'exciting', category: 'synonyms' },
  { words: ['hot', 'warm', 'cold'], correctAnswer: 'cold', category: 'synonyms' },
  { words: ['thin', 'slim', 'fat'], correctAnswer: 'fat', category: 'synonyms' },
  { words: ['old', 'ancient', 'new'], correctAnswer: 'new', category: 'synonyms' },
  { words: ['hard', 'tough', 'soft'], correctAnswer: 'soft', category: 'synonyms' },
  { words: ['dark', 'dim', 'bright'], correctAnswer: 'bright', category: 'synonyms' },
  { words: ['dirty', 'filthy', 'clean'], correctAnswer: 'clean', category: 'synonyms' },
  { words: ['loud', 'noisy', 'quiet'], correctAnswer: 'quiet', category: 'synonyms' },
  { words: ['tired', 'weary', 'energetic'], correctAnswer: 'energetic', category: 'synonyms' },
  { words: ['rich', 'wealthy', 'poor'], correctAnswer: 'poor', category: 'synonyms' },
  { words: ['sharp', 'keen', 'blunt'], correctAnswer: 'blunt', category: 'synonyms' },
  { words: ['fix', 'repair', 'break'], correctAnswer: 'break', category: 'synonyms' },

  // Direction / position category — odd one out
  { words: ['up', 'down', 'street'], correctAnswer: 'street', category: 'directions' },
  { words: ['left', 'right', 'chair'], correctAnswer: 'chair', category: 'directions' },
  { words: ['above', 'below', 'hammer'], correctAnswer: 'hammer', category: 'directions' },
  { words: ['inside', 'outside', 'apple'], correctAnswer: 'apple', category: 'directions' },
  { words: ['north', 'south', 'book'], correctAnswer: 'book', category: 'directions' },

  // Same semantic group
  { words: ['below', 'under', 'letter'], correctAnswer: 'letter', category: 'positions' },
  { words: ['ask', 'enquire', 'reply'], correctAnswer: 'reply', category: 'communication' },
  { words: ['cat', 'dog', 'table'], correctAnswer: 'table', category: 'animals' },
  { words: ['apple', 'pear', 'brick'], correctAnswer: 'brick', category: 'fruit' },
  { words: ['run', 'sprint', 'sit'], correctAnswer: 'sit', category: 'movement' },
  { words: ['red', 'blue', 'chair'], correctAnswer: 'chair', category: 'colors' },
  { words: ['hammer', 'saw', 'milk'], correctAnswer: 'milk', category: 'tools' },
  { words: ['bus', 'car', 'cloud'], correctAnswer: 'cloud', category: 'vehicles' },
  { words: ['swim', 'dive', 'write'], correctAnswer: 'write', category: 'water_actions' },
  { words: ['lion', 'tiger', 'rose'], correctAnswer: 'rose', category: 'animals' },
  { words: ['oak', 'elm', 'copper'], correctAnswer: 'copper', category: 'trees' },
  { words: ['house', 'flat', 'river'], correctAnswer: 'river', category: 'dwellings' },
  { words: ['doctor', 'nurse', 'engine'], correctAnswer: 'engine', category: 'professions' },
  { words: ['piano', 'guitar', 'bread'], correctAnswer: 'bread', category: 'instruments' },
  { words: ['circle', 'square', 'cotton'], correctAnswer: 'cotton', category: 'shapes' },
  { words: ['gold', 'silver', 'forest'], correctAnswer: 'forest', category: 'metals' },
  { words: ['cup', 'mug', 'door'], correctAnswer: 'door', category: 'containers' },
  { words: ['knife', 'fork', 'sock'], correctAnswer: 'sock', category: 'cutlery' },
  { words: ['inch', 'metre', 'colour'], correctAnswer: 'colour', category: 'measurements' },
  { words: ['war', 'battle', 'peace'], correctAnswer: 'peace', category: 'conflict' },
  { words: ['speak', 'talk', 'listen'], correctAnswer: 'listen', category: 'speaking' },
  { words: ['cold', 'flu', 'health'], correctAnswer: 'health', category: 'illness' },
  { words: ['moon', 'star', 'soil'], correctAnswer: 'soil', category: 'celestial' },
  { words: ['write', 'type', 'read'], correctAnswer: 'read', category: 'writing' },
  { words: ['cup', 'bowl', 'lamp'], correctAnswer: 'lamp', category: 'kitchenware' },
  { words: ['spring', 'summer', 'rain'], correctAnswer: 'rain', category: 'seasons' },
  { words: ['wool', 'cotton', 'plastic'], correctAnswer: 'plastic', category: 'fabrics' },
  { words: ['hop', 'jump', 'sleep'], correctAnswer: 'sleep', category: 'movement' },
  { words: ['crow', 'eagle', 'shark'], correctAnswer: 'shark', category: 'birds' },
  { words: ['France', 'Germany', 'London'], correctAnswer: 'London', category: 'countries' },
  { words: ['Monday', 'Tuesday', 'January'], correctAnswer: 'January', category: 'days' },
  { words: ['shout', 'yell', 'whisper'], correctAnswer: 'whisper', category: 'speaking_volume' },
  { words: ['always', 'never', 'perhaps'], correctAnswer: 'perhaps', category: 'frequency' },

  // --- Expanded pool (52+ new verified items) ---

  // Synonyms groups
  { words: ['swift', 'quick', 'heavy'], correctAnswer: 'heavy', category: 'synonyms' },
  { words: ['shout', 'yell', 'listen'], correctAnswer: 'listen', category: 'synonyms' },
  { words: ['choose', 'select', 'refuse'], correctAnswer: 'refuse', category: 'synonyms' },
  { words: ['weary', 'tired', 'alert'], correctAnswer: 'alert', category: 'synonyms' },
  { words: ['glad', 'pleased', 'upset'], correctAnswer: 'upset', category: 'synonyms' },
  { words: ['clever', 'smart', 'foolish'], correctAnswer: 'foolish', category: 'synonyms' },
  { words: ['damp', 'moist', 'dry'], correctAnswer: 'dry', category: 'synonyms' },
  { words: ['ample', 'plentiful', 'scarce'], correctAnswer: 'scarce', category: 'synonyms' },
  { words: ['chat', 'talk', 'silence'], correctAnswer: 'silence', category: 'synonyms' },
  { words: ['permit', 'allow', 'forbid'], correctAnswer: 'forbid', category: 'synonyms' },
  { words: ['tidy', 'neat', 'messy'], correctAnswer: 'messy', category: 'synonyms' },
  { words: ['correct', 'right', 'wrong'], correctAnswer: 'wrong', category: 'synonyms' },
  { words: ['error', 'mistake', 'success'], correctAnswer: 'success', category: 'synonyms' },
  { words: ['cold', 'chilly', 'warm'], correctAnswer: 'warm', category: 'synonyms' },
  { words: ['hide', 'conceal', 'reveal'], correctAnswer: 'reveal', category: 'synonyms' },
  { words: ['build', 'construct', 'destroy'], correctAnswer: 'destroy', category: 'synonyms' },
  { words: ['plain', 'simple', 'elaborate'], correctAnswer: 'elaborate', category: 'synonyms' },
  { words: ['near', 'close', 'distant'], correctAnswer: 'distant', category: 'synonyms' },
  { words: ['smile', 'grin', 'frown'], correctAnswer: 'frown', category: 'synonyms' },
  { words: ['gather', 'collect', 'scatter'], correctAnswer: 'scatter', category: 'synonyms' },

  // Semantic category groups (odd one out)
  { words: ['rose', 'tulip', 'carrot'], correctAnswer: 'carrot', category: 'flowers' },
  { words: ['iron', 'steel', 'silk'], correctAnswer: 'silk', category: 'metals' },
  { words: ['jacket', 'coat', 'sandal'], correctAnswer: 'sandal', category: 'outerwear' },
  { words: ['train', 'plane', 'shoe'], correctAnswer: 'shoe', category: 'transport' },
  { words: ['frog', 'toad', 'eagle'], correctAnswer: 'eagle', category: 'amphibians' },
  { words: ['river', 'lake', 'mountain'], correctAnswer: 'mountain', category: 'water_bodies' },
  { words: ['chess', 'poker', 'tennis'], correctAnswer: 'tennis', category: 'board_games' },
  { words: ['flute', 'violin', 'drum'], correctAnswer: 'drum', category: 'string_instruments' },
  { words: ['peach', 'plum', 'onion'], correctAnswer: 'onion', category: 'fruit' },
  { words: ['nurse', 'surgeon', 'pilot'], correctAnswer: 'pilot', category: 'medical' },
  { words: ['chair', 'table', 'spoon'], correctAnswer: 'spoon', category: 'furniture' },
  { words: ['sock', 'glove', 'belt'], correctAnswer: 'belt', category: 'paired_clothing' },
  { words: ['wolf', 'fox', 'crow'], correctAnswer: 'crow', category: 'canines' },
  { words: ['ocean', 'sea', 'desert'], correctAnswer: 'desert', category: 'water_bodies' },
  { words: ['triangle', 'rectangle', 'sphere'], correctAnswer: 'sphere', category: '2d_shapes' },
  { words: ['copper', 'zinc', 'rubber'], correctAnswer: 'rubber', category: 'metals' },
  { words: ['wheat', 'barley', 'cotton'], correctAnswer: 'cotton', category: 'grains' },
  { words: ['violin', 'cello', 'trumpet'], correctAnswer: 'trumpet', category: 'string_instruments' },
  { words: ['Paris', 'Rome', 'Brazil'], correctAnswer: 'Brazil', category: 'cities' },
  { words: ['inch', 'mile', 'litre'], correctAnswer: 'litre', category: 'distance_units' },
  { words: ['angry', 'furious', 'table'], correctAnswer: 'table', category: 'emotions' },
  { words: ['pine', 'cedar', 'daisy'], correctAnswer: 'daisy', category: 'coniferous_trees' },
  { words: ['coach', 'tram', 'bicycle'], correctAnswer: 'bicycle', category: 'public_transport' },
  { words: ['Sunday', 'Saturday', 'March'], correctAnswer: 'March', category: 'weekend_days' },
  { words: ['snore', 'sleep', 'run'], correctAnswer: 'run', category: 'sleep_actions' },
  { words: ['helmet', 'shield', 'sword'], correctAnswer: 'sword', category: 'armour' },
  { words: ['autumn', 'winter', 'frost'], correctAnswer: 'frost', category: 'seasons' },
  { words: ['sparrow', 'robin', 'salmon'], correctAnswer: 'salmon', category: 'small_birds' },
  { words: ['ink', 'paint', 'wood'], correctAnswer: 'wood', category: 'liquids' },
  { words: ['cave', 'tunnel', 'bridge'], correctAnswer: 'bridge', category: 'underground_passages' },
  { words: ['gram', 'kilogram', 'metre'], correctAnswer: 'metre', category: 'weight_units' },
  { words: ['brass', 'bronze', 'glass'], correctAnswer: 'glass', category: 'alloys' },
];

/**
 * Generates a WordMeaningQuestion from a pool item.
 * Word display order is shuffled each render.
 */
export function generateWordMeaningQuestion(
  item: WordMeaningPoolItem,
  index: number,
  seed?: number
): WordMeaningQuestion {
  const shuffledWords = shuffled([...item.words], seed !== undefined ? seed + index : undefined) as [string, string, string];
  return {
    type: 'word_meaning',
    id: `word_meaning_${index}`,
    words: shuffledWords,
    correctAnswer: item.correctAnswer,
    category: item.category,
  };
}

export function validateWordMeaningAnswer(
  question: WordMeaningQuestion,
  answer: string
): boolean {
  return question.correctAnswer === answer;
}
