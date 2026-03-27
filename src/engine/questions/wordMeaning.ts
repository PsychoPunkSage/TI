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
 *   - same meaning (synonyms): brave/bold → timid is odd
 *   - opposites category: rise/ascend → fall is odd
 *   - semantic group: horse/donkey → salmon is odd
 */
export const WORD_MEANING_POOL: WordMeaningPoolItem[] = [
  // Synonyms (50) — two synonyms + one antonym/unrelated odd one out
  { words: ['brave', 'bold', 'timid'], correctAnswer: 'timid', category: 'synonyms' },
  { words: ['ancient', 'old', 'modern'], correctAnswer: 'modern', category: 'synonyms' },
  { words: ['joyful', 'happy', 'gloomy'], correctAnswer: 'gloomy', category: 'synonyms' },
  { words: ['quick', 'speedy', 'lazy'], correctAnswer: 'lazy', category: 'synonyms' },
  { words: ['silent', 'quiet', 'loud'], correctAnswer: 'loud', category: 'synonyms' },
  { words: ['cold', 'icy', 'hot'], correctAnswer: 'hot', category: 'synonyms' },
  { words: ['wise', 'smart', 'foolish'], correctAnswer: 'foolish', category: 'synonyms' },
  { words: ['weak', 'feeble', 'strong'], correctAnswer: 'strong', category: 'synonyms' },
  { words: ['clean', 'spotless', 'dirty'], correctAnswer: 'dirty', category: 'synonyms' },
  { words: ['slim', 'slender', 'plump'], correctAnswer: 'plump', category: 'synonyms' },
  { words: ['cruel', 'harsh', 'kind'], correctAnswer: 'kind', category: 'synonyms' },
  { words: ['empty', 'vacant', 'full'], correctAnswer: 'full', category: 'synonyms' },
  { words: ['wide', 'broad', 'narrow'], correctAnswer: 'narrow', category: 'synonyms' },
  { words: ['safe', 'secure', 'dangerous'], correctAnswer: 'dangerous', category: 'synonyms' },
  { words: ['daring', 'fearless', 'scared'], correctAnswer: 'scared', category: 'synonyms' },
  { words: ['gentle', 'tender', 'rough'], correctAnswer: 'rough', category: 'synonyms' },
  { words: ['polite', 'courteous', 'rude'], correctAnswer: 'rude', category: 'synonyms' },
  { words: ['fresh', 'new', 'stale'], correctAnswer: 'stale', category: 'synonyms' },
  { words: ['bitter', 'sour', 'sweet'], correctAnswer: 'sweet', category: 'synonyms' },
  { words: ['mend', 'fix', 'damage'], correctAnswer: 'damage', category: 'synonyms' },
  { words: ['laugh', 'chuckle', 'weep'], correctAnswer: 'weep', category: 'synonyms' },
  { words: ['love', 'adore', 'hate'], correctAnswer: 'hate', category: 'synonyms' },
  { words: ['accept', 'welcome', 'reject'], correctAnswer: 'reject', category: 'synonyms' },
  { words: ['rise', 'ascend', 'fall'], correctAnswer: 'fall', category: 'synonyms' },
  { words: ['arrive', 'reach', 'depart'], correctAnswer: 'depart', category: 'synonyms' },
  { words: ['earn', 'gain', 'lose'], correctAnswer: 'lose', category: 'synonyms' },
  { words: ['push', 'shove', 'pull'], correctAnswer: 'pull', category: 'synonyms' },
  { words: ['lead', 'guide', 'follow'], correctAnswer: 'follow', category: 'synonyms' },
  { words: ['give', 'donate', 'take'], correctAnswer: 'take', category: 'synonyms' },
  { words: ['win', 'succeed', 'fail'], correctAnswer: 'fail', category: 'synonyms' },
  { words: ['freeze', 'chill', 'heat'], correctAnswer: 'heat', category: 'synonyms' },
  { words: ['expand', 'grow', 'shrink'], correctAnswer: 'shrink', category: 'synonyms' },
  { words: ['praise', 'compliment', 'criticize'], correctAnswer: 'criticize', category: 'synonyms' },
  { words: ['trust', 'believe', 'doubt'], correctAnswer: 'doubt', category: 'synonyms' },
  { words: ['hurry', 'rush', 'dawdle'], correctAnswer: 'dawdle', category: 'synonyms' },
  { words: ['protect', 'guard', 'attack'], correctAnswer: 'attack', category: 'synonyms' },
  { words: ['create', 'make', 'destroy'], correctAnswer: 'destroy', category: 'synonyms' },
  { words: ['lift', 'raise', 'lower'], correctAnswer: 'lower', category: 'synonyms' },
  { words: ['start', 'begin', 'end'], correctAnswer: 'end', category: 'synonyms' },
  { words: ['forget', 'overlook', 'remember'], correctAnswer: 'remember', category: 'synonyms' },
  { words: ['blame', 'accuse', 'defend'], correctAnswer: 'defend', category: 'synonyms' },
  { words: ['obey', 'comply', 'defy'], correctAnswer: 'defy', category: 'synonyms' },
  { words: ['include', 'add', 'exclude'], correctAnswer: 'exclude', category: 'synonyms' },
  { words: ['shiver', 'tremble', 'relax'], correctAnswer: 'relax', category: 'synonyms' },
  { words: ['vanish', 'disappear', 'appear'], correctAnswer: 'appear', category: 'synonyms' },
  { words: ['permit', 'allow', 'ban'], correctAnswer: 'ban', category: 'synonyms' },
  { words: ['calm', 'peaceful', 'agitated'], correctAnswer: 'agitated', category: 'synonyms' },
  { words: ['petite', 'tiny', 'huge'], correctAnswer: 'huge', category: 'synonyms' },
  { words: ['shout', 'yell', 'murmur'], correctAnswer: 'murmur', category: 'synonyms' },
  { words: ['spend', 'waste', 'save'], correctAnswer: 'save', category: 'synonyms' },

  // Animals (12) — two from the same animal group, one odd one out
  { words: ['horse', 'donkey', 'salmon'], correctAnswer: 'salmon', category: 'equines' },
  { words: ['ant', 'bee', 'eagle'], correctAnswer: 'eagle', category: 'insects' },
  { words: ['frog', 'newt', 'hawk'], correctAnswer: 'hawk', category: 'amphibians' },
  { words: ['dolphin', 'whale', 'shark'], correctAnswer: 'shark', category: 'marine_mammals' },
  { words: ['sheep', 'goat', 'crow'], correctAnswer: 'crow', category: 'farm_animals' },
  { words: ['parrot', 'pigeon', 'cobra'], correctAnswer: 'cobra', category: 'birds' },
  { words: ['lion', 'cheetah', 'python'], correctAnswer: 'python', category: 'big_cats' },
  { words: ['trout', 'herring', 'duck'], correctAnswer: 'duck', category: 'fish' },
  { words: ['sparrow', 'finch', 'rabbit'], correctAnswer: 'rabbit', category: 'small_birds' },
  { words: ['camel', 'llama', 'wolf'], correctAnswer: 'wolf', category: 'camelids' },
  { words: ['cobra', 'python', 'lizard'], correctAnswer: 'lizard', category: 'snakes' },
  { words: ['lobster', 'crab', 'dolphin'], correctAnswer: 'dolphin', category: 'crustaceans' },

  // Fruits (8)
  { words: ['mango', 'papaya', 'potato'], correctAnswer: 'potato', category: 'tropical_fruits' },
  { words: ['lemon', 'lime', 'grape'], correctAnswer: 'grape', category: 'citrus' },
  { words: ['banana', 'pineapple', 'carrot'], correctAnswer: 'carrot', category: 'tropical_fruits' },
  { words: ['cherry', 'plum', 'turnip'], correctAnswer: 'turnip', category: 'stone_fruits' },
  { words: ['strawberry', 'raspberry', 'walnut'], correctAnswer: 'walnut', category: 'berries' },
  { words: ['orange', 'grapefruit', 'melon'], correctAnswer: 'melon', category: 'citrus' },
  { words: ['apple', 'pear', 'onion'], correctAnswer: 'onion', category: 'pome_fruits' },
  { words: ['blueberry', 'blackberry', 'pepper'], correctAnswer: 'pepper', category: 'berries' },

  // Vegetables (5)
  { words: ['radish', 'beetroot', 'mango'], correctAnswer: 'mango', category: 'root_vegetables' },
  { words: ['spinach', 'kale', 'banana'], correctAnswer: 'banana', category: 'leafy_greens' },
  { words: ['broccoli', 'cauliflower', 'peach'], correctAnswer: 'peach', category: 'brassicas' },
  { words: ['potato', 'yam', 'tomato'], correctAnswer: 'tomato', category: 'starchy_tubers' },
  { words: ['pea', 'bean', 'walnut'], correctAnswer: 'walnut', category: 'legumes' },

  // Clothing (8)
  { words: ['shirt', 'blouse', 'sandal'], correctAnswer: 'sandal', category: 'upper_garments' },
  { words: ['trousers', 'jeans', 'hat'], correctAnswer: 'hat', category: 'lower_garments' },
  { words: ['coat', 'jacket', 'scarf'], correctAnswer: 'scarf', category: 'outerwear' },
  { words: ['boots', 'shoes', 'gloves'], correctAnswer: 'gloves', category: 'footwear' },
  { words: ['hat', 'cap', 'belt'], correctAnswer: 'belt', category: 'headwear' },
  { words: ['glove', 'mitten', 'boot'], correctAnswer: 'boot', category: 'hand_coverings' },
  { words: ['ring', 'bracelet', 'hammer'], correctAnswer: 'hammer', category: 'jewelry' },
  { words: ['skirt', 'dress', 'tie'], correctAnswer: 'tie', category: 'womens_clothing' },

  // Furniture (5)
  { words: ['sofa', 'armchair', 'lamp'], correctAnswer: 'lamp', category: 'seating' },
  { words: ['wardrobe', 'dresser', 'clock'], correctAnswer: 'clock', category: 'storage_furniture' },
  { words: ['desk', 'table', 'mirror'], correctAnswer: 'mirror', category: 'surface_furniture' },
  { words: ['bed', 'mattress', 'shelf'], correctAnswer: 'shelf', category: 'sleeping_furniture' },
  { words: ['stool', 'bench', 'curtain'], correctAnswer: 'curtain', category: 'seating' },

  // Tools (5)
  { words: ['hammer', 'mallet', 'screwdriver'], correctAnswer: 'screwdriver', category: 'striking_tools' },
  { words: ['spanner', 'wrench', 'paintbrush'], correctAnswer: 'paintbrush', category: 'tightening_tools' },
  { words: ['chisel', 'gouge', 'drill'], correctAnswer: 'drill', category: 'carving_tools' },
  { words: ['rake', 'hoe', 'knife'], correctAnswer: 'knife', category: 'gardening_tools' },
  { words: ['scissors', 'shears', 'stapler'], correctAnswer: 'stapler', category: 'cutting_tools' },

  // Vehicles (6)
  { words: ['car', 'van', 'canoe'], correctAnswer: 'canoe', category: 'road_vehicles' },
  { words: ['ferry', 'yacht', 'bicycle'], correctAnswer: 'bicycle', category: 'water_vessels' },
  { words: ['helicopter', 'glider', 'submarine'], correctAnswer: 'submarine', category: 'aircraft' },
  { words: ['motorbike', 'scooter', 'sailboat'], correctAnswer: 'sailboat', category: 'two_wheeled_vehicles' },
  { words: ['train', 'tram', 'rowboat'], correctAnswer: 'rowboat', category: 'rail_vehicles' },
  { words: ['kayak', 'dinghy', 'tractor'], correctAnswer: 'tractor', category: 'paddle_boats' },

  // Countries (5)
  { words: ['Japan', 'China', 'France'], correctAnswer: 'France', category: 'asian_countries' },
  { words: ['Brazil', 'Argentina', 'Kenya'], correctAnswer: 'Kenya', category: 'south_american_countries' },
  { words: ['Egypt', 'Morocco', 'Sweden'], correctAnswer: 'Sweden', category: 'african_countries' },
  { words: ['Canada', 'Mexico', 'Australia'], correctAnswer: 'Australia', category: 'north_american_countries' },
  { words: ['Spain', 'Italy', 'Russia'], correctAnswer: 'Russia', category: 'mediterranean_countries' },

  // Professions (6)
  { words: ['teacher', 'lecturer', 'plumber'], correctAnswer: 'plumber', category: 'educators' },
  { words: ['chef', 'baker', 'lawyer'], correctAnswer: 'lawyer', category: 'food_professionals' },
  { words: ['pilot', 'navigator', 'nurse'], correctAnswer: 'nurse', category: 'aviation_crew' },
  { words: ['painter', 'sculptor', 'banker'], correctAnswer: 'banker', category: 'visual_artists' },
  { words: ['dentist', 'surgeon', 'builder'], correctAnswer: 'builder', category: 'medical_professionals' },
  { words: ['soldier', 'marine', 'poet'], correctAnswer: 'poet', category: 'military_professions' },

  // Sports (5)
  { words: ['tennis', 'badminton', 'swimming'], correctAnswer: 'swimming', category: 'racket_sports' },
  { words: ['football', 'rugby', 'golf'], correctAnswer: 'golf', category: 'team_sports' },
  { words: ['boxing', 'wrestling', 'cycling'], correctAnswer: 'cycling', category: 'combat_sports' },
  { words: ['skiing', 'snowboarding', 'archery'], correctAnswer: 'archery', category: 'winter_sports' },
  { words: ['cricket', 'baseball', 'hockey'], correctAnswer: 'hockey', category: 'bat_ball_sports' },

  // Musical Instruments (5)
  { words: ['violin', 'viola', 'trumpet'], correctAnswer: 'trumpet', category: 'string_instruments' },
  { words: ['flute', 'clarinet', 'drum'], correctAnswer: 'drum', category: 'woodwind_instruments' },
  { words: ['piano', 'organ', 'guitar'], correctAnswer: 'guitar', category: 'keyboard_instruments' },
  { words: ['harp', 'lute', 'trombone'], correctAnswer: 'trombone', category: 'plucked_strings' },
  { words: ['saxophone', 'oboe', 'cello'], correctAnswer: 'cello', category: 'woodwind_instruments' },

  // Buildings (5)
  { words: ['castle', 'fortress', 'cottage'], correctAnswer: 'cottage', category: 'defensive_structures' },
  { words: ['church', 'mosque', 'stadium'], correctAnswer: 'stadium', category: 'places_of_worship' },
  { words: ['hospital', 'clinic', 'school'], correctAnswer: 'school', category: 'medical_buildings' },
  { words: ['library', 'museum', 'garage'], correctAnswer: 'garage', category: 'cultural_buildings' },
  { words: ['tent', 'cabin', 'skyscraper'], correctAnswer: 'skyscraper', category: 'temporary_dwellings' },

  // Materials (5)
  { words: ['wood', 'timber', 'stone'], correctAnswer: 'stone', category: 'wood_forms' },
  { words: ['gold', 'platinum', 'iron'], correctAnswer: 'iron', category: 'precious_metals' },
  { words: ['silk', 'satin', 'denim'], correctAnswer: 'denim', category: 'luxury_fabrics' },
  { words: ['glass', 'crystal', 'clay'], correctAnswer: 'clay', category: 'transparent_materials' },
  { words: ['concrete', 'brick', 'paper'], correctAnswer: 'paper', category: 'construction_materials' },

  // Body Parts (5)
  { words: ['arm', 'leg', 'finger'], correctAnswer: 'finger', category: 'major_limbs' },
  { words: ['eye', 'ear', 'toe'], correctAnswer: 'toe', category: 'facial_organs' },
  { words: ['knee', 'shin', 'elbow'], correctAnswer: 'elbow', category: 'leg_parts' },
  { words: ['heart', 'kidney', 'skull'], correctAnswer: 'skull', category: 'soft_organs' },
  { words: ['thumb', 'index', 'palm'], correctAnswer: 'palm', category: 'fingers' },

  // Foods (5)
  { words: ['bread', 'toast', 'butter'], correctAnswer: 'butter', category: 'baked_wheat' },
  { words: ['milk', 'cream', 'juice'], correctAnswer: 'juice', category: 'dairy_products' },
  { words: ['chicken', 'turkey', 'salmon'], correctAnswer: 'salmon', category: 'poultry' },
  { words: ['rice', 'pasta', 'steak'], correctAnswer: 'steak', category: 'carbohydrates' },
  { words: ['soup', 'stew', 'salad'], correctAnswer: 'salad', category: 'hot_dishes' },

  // Nature (4)
  { words: ['mountain', 'hill', 'valley'], correctAnswer: 'valley', category: 'elevated_landforms' },
  { words: ['forest', 'jungle', 'desert'], correctAnswer: 'desert', category: 'forested_areas' },
  { words: ['river', 'stream', 'glacier'], correctAnswer: 'glacier', category: 'flowing_water' },
  { words: ['cliff', 'rock', 'sand'], correctAnswer: 'sand', category: 'solid_rock_formations' },

  // Weather (3)
  { words: ['rain', 'snow', 'thunder'], correctAnswer: 'thunder', category: 'precipitation' },
  { words: ['fog', 'mist', 'blizzard'], correctAnswer: 'blizzard', category: 'low_visibility_conditions' },
  { words: ['hurricane', 'tornado', 'drizzle'], correctAnswer: 'drizzle', category: 'severe_storms' },

  // Time (3)
  { words: ['January', 'February', 'Sunday'], correctAnswer: 'Sunday', category: 'months' },
  { words: ['Monday', 'Tuesday', 'April'], correctAnswer: 'April', category: 'weekdays' },
  { words: ['morning', 'evening', 'winter'], correctAnswer: 'winter', category: 'time_of_day' },
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
