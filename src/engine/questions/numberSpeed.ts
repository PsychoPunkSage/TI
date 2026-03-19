import type { NumberSpeedQuestion } from '@/types/questions';
import { shuffled } from '../shuffle';

export interface NumberSpeedPoolItem {
  numbers: [number, number, number];
  correctAnswer: number;
}

/**
 * Real GIA format: three numbers shown in boxes.
 * Find highest and lowest, then decide which is further from the REMAINING number.
 * Click directly on one of the three numbers.
 *
 * Logic: given [a, b, c], find min and max. The remaining (middle) number is the
 * reference. correctAnswer = whichever of min/max is further from reference.
 *
 * All items are pre-validated for unambiguous answers (no ties).
 * Range: 1–99, mixture of tight and spread spacing.
 */
export const NUMBER_SPEED_POOL: NumberSpeedPoolItem[] = [
  // Spread examples
  { numbers: [4, 2, 8], correctAnswer: 8 },      // min=2, max=8, ref=4 → 8 is 4 away, 2 is 2 away → 8
  { numbers: [11, 13, 16], correctAnswer: 16 },   // min=11, max=16, ref=13 → |11-13|=2, |16-13|=3 → 16
  { numbers: [11, 16, 13], correctAnswer: 16 },   // same set, different display
  { numbers: [5, 9, 3], correctAnswer: 9 },       // min=3, max=9, ref=5 → 3 is 2, 9 is 4 → 9
  { numbers: [20, 35, 22], correctAnswer: 35 },   // min=20, max=35, ref=22 → 20 is 2, 35 is 13 → 35
  { numbers: [50, 48, 62], correctAnswer: 62 },   // min=48, max=62, ref=50 → 48 is 2, 62 is 12 → 62
  { numbers: [7, 15, 3], correctAnswer: 15 },     // min=3, max=15, ref=7 → 3 is 4, 15 is 8 → 15
  { numbers: [30, 12, 28], correctAnswer: 12 },   // min=12, max=30, ref=28 → 12 is 16, 30 is 2 → 12
  { numbers: [45, 60, 47], correctAnswer: 60 },   // min=45, max=60, ref=47 → 45 is 2, 60 is 13 → 60
  { numbers: [8, 5, 19], correctAnswer: 19 },     // min=5, max=19, ref=8 → 5 is 3, 19 is 11 → 19
  { numbers: [72, 68, 55], correctAnswer: 55 },   // min=55, max=72, ref=68 → 55 is 13, 72 is 4 → 55
  { numbers: [14, 22, 17], correctAnswer: 22 },   // min=14, max=22, ref=17 → 14 is 3, 22 is 5 → 22
  { numbers: [9, 6, 25], correctAnswer: 25 },     // min=6, max=25, ref=9 → 6 is 3, 25 is 16 → 25
  { numbers: [40, 37, 53], correctAnswer: 53 },   // min=37, max=53, ref=40 → 37 is 3, 53 is 13 → 53
  { numbers: [61, 59, 44], correctAnswer: 44 },   // min=44, max=61, ref=59 → 44 is 15, 61 is 2 → 44
  { numbers: [33, 27, 31], correctAnswer: 27 },   // min=27, max=33, ref=31 → 27 is 4, 33 is 2 → 27
  { numbers: [18, 13, 30], correctAnswer: 30 },   // min=13, max=30, ref=18 → 13 is 5, 30 is 12 → 30
  { numbers: [55, 70, 57], correctAnswer: 70 },   // min=55, max=70, ref=57 → 55 is 2, 70 is 13 → 70
  { numbers: [2, 8, 4], correctAnswer: 8 },       // min=2, max=8, ref=4 → 2 is 2, 8 is 4 → 8
  { numbers: [85, 79, 92], correctAnswer: 92 },   // min=79, max=92, ref=85 → 79 is 6, 92 is 7 → 92
  { numbers: [16, 10, 14], correctAnswer: 10 },   // min=10, max=16, ref=14 → 10 is 4, 16 is 2 → 10
  { numbers: [42, 38, 55], correctAnswer: 55 },   // min=38, max=55, ref=42 → 38 is 4, 55 is 13 → 55
  { numbers: [25, 40, 27], correctAnswer: 40 },   // min=25, max=40, ref=27 → 25 is 2, 40 is 13 → 40
  { numbers: [63, 58, 74], correctAnswer: 74 },   // min=58, max=74, ref=63 → 58 is 5, 74 is 11 → 74
  { numbers: [10, 7, 22], correctAnswer: 22 },    // min=7, max=22, ref=10 → 7 is 3, 22 is 12 → 22
  { numbers: [49, 45, 62], correctAnswer: 62 },   // min=45, max=62, ref=49 → 45 is 4, 62 is 13 → 62
  { numbers: [37, 33, 48], correctAnswer: 48 },   // min=33, max=48, ref=37 → 33 is 4, 48 is 11 → 48
  { numbers: [77, 74, 60], correctAnswer: 60 },   // min=60, max=77, ref=74 → 60 is 14, 77 is 3 → 60
  { numbers: [19, 15, 28], correctAnswer: 28 },   // min=15, max=28, ref=19 → 15 is 4, 28 is 9 → 28
  { numbers: [6, 3, 14], correctAnswer: 14 },     // min=3, max=14, ref=6 → 3 is 3, 14 is 8 → 14
  { numbers: [88, 84, 71], correctAnswer: 71 },   // min=71, max=88, ref=84 → 71 is 13, 88 is 4 → 71
  { numbers: [52, 47, 64], correctAnswer: 64 },   // min=47, max=64, ref=52 → 47 is 5, 64 is 12 → 64
  { numbers: [31, 28, 17], correctAnswer: 17 },   // min=17, max=31, ref=28 → 17 is 11, 31 is 3 → 17
  { numbers: [65, 62, 76], correctAnswer: 76 },   // min=62, max=76, ref=65 → 62 is 3, 76 is 11 → 76
  { numbers: [24, 21, 35], correctAnswer: 35 },   // min=21, max=35, ref=24 → 21 is 3, 35 is 11 → 35
  { numbers: [90, 86, 75], correctAnswer: 75 },   // min=75, max=90, ref=86 → 75 is 11, 90 is 4 → 75
  { numbers: [13, 9, 24], correctAnswer: 24 },    // min=9, max=24, ref=13 → 9 is 4, 24 is 11 → 24
  { numbers: [44, 40, 57], correctAnswer: 57 },   // min=40, max=57, ref=44 → 40 is 4, 57 is 13 → 57
  { numbers: [28, 24, 39], correctAnswer: 39 },   // min=24, max=39, ref=28 → 24 is 4, 39 is 11 → 39
  { numbers: [82, 78, 65], correctAnswer: 65 },   // min=65, max=82, ref=78 → 65 is 13, 82 is 4 → 65
  { numbers: [17, 13, 26], correctAnswer: 26 },   // min=13, max=26, ref=17 → 13 is 4, 26 is 9 → 26
  { numbers: [56, 51, 68], correctAnswer: 68 },   // min=51, max=68, ref=56 → 51 is 5, 68 is 12 → 68
  { numbers: [35, 31, 46], correctAnswer: 46 },   // min=31, max=46, ref=35 → 31 is 4, 46 is 11 → 46
  { numbers: [74, 70, 59], correctAnswer: 59 },   // min=59, max=74, ref=70 → 59 is 11, 74 is 4 → 59
  { numbers: [22, 18, 33], correctAnswer: 33 },   // min=18, max=33, ref=22 → 18 is 4, 33 is 11 → 33
  { numbers: [93, 89, 78], correctAnswer: 78 },   // min=78, max=93, ref=89 → 78 is 11, 93 is 4 → 78
  { numbers: [11, 7, 20], correctAnswer: 20 },    // min=7, max=20, ref=11 → 7 is 4, 20 is 9 → 20
  { numbers: [60, 55, 71], correctAnswer: 71 },   // min=55, max=71, ref=60 → 55 is 5, 71 is 11 → 71
  { numbers: [39, 35, 50], correctAnswer: 50 },   // min=35, max=50, ref=39 → 35 is 4, 50 is 11 → 50
  { numbers: [78, 74, 63], correctAnswer: 63 },   // min=63, max=78, ref=74 → 63 is 11, 78 is 4 → 63
  { numbers: [26, 22, 37], correctAnswer: 37 },   // min=22, max=37, ref=26 → 22 is 4, 37 is 11 → 37
  { numbers: [97, 93, 82], correctAnswer: 82 },   // min=82, max=97, ref=93 → 82 is 11, 97 is 4 → 82
  { numbers: [15, 11, 24], correctAnswer: 24 },   // min=11, max=24, ref=15 → 11 is 4, 24 is 9 → 24
  { numbers: [64, 59, 75], correctAnswer: 75 },   // min=59, max=75, ref=64 → 59 is 5, 75 is 11 → 75
  { numbers: [43, 39, 54], correctAnswer: 54 },   // min=39, max=54, ref=43 → 39 is 4, 54 is 11 → 54

  // --- Expanded pool (50+ new verified items) ---

  // Single-digit clusters
  { numbers: [1, 4, 9], correctAnswer: 9 },       // min=1, max=9, ref=4 → |1-4|=3, |9-4|=5 → 9
  { numbers: [2, 6, 9], correctAnswer: 2 },        // min=2, max=9, ref=6 → |2-6|=4, |9-6|=3 → 2
  { numbers: [1, 3, 8], correctAnswer: 8 },        // min=1, max=8, ref=3 → |1-3|=2, |8-3|=5 → 8
  { numbers: [3, 7, 9], correctAnswer: 3 },        // min=3, max=9, ref=7 → |3-7|=4, |9-7|=2 → 3
  { numbers: [1, 2, 7], correctAnswer: 7 },        // min=1, max=7, ref=2 → |1-2|=1, |7-2|=5 → 7
  { numbers: [4, 6, 9], correctAnswer: 9 },        // min=4, max=9, ref=6 → |4-6|=2, |9-6|=3 → 9
  { numbers: [1, 5, 8], correctAnswer: 1 },        // min=1, max=8, ref=5 → |1-5|=4, |8-5|=3 → 1
  { numbers: [2, 4, 9], correctAnswer: 9 },        // min=2, max=9, ref=4 → |2-4|=2, |9-4|=5 → 9
  { numbers: [3, 5, 9], correctAnswer: 9 },        // min=3, max=9, ref=5 → |3-5|=2, |9-5|=4 → 9
  { numbers: [1, 6, 8], correctAnswer: 1 },        // min=1, max=8, ref=6 → |1-6|=5, |8-6|=2 → 1
  { numbers: [2, 7, 9], correctAnswer: 2 },        // min=2, max=9, ref=7 → |2-7|=5, |9-7|=2 → 2

  // Teens range
  { numbers: [11, 14, 19], correctAnswer: 19 },   // min=11, max=19, ref=14 → |11-14|=3, |19-14|=5 → 19
  { numbers: [12, 16, 18], correctAnswer: 12 },   // min=12, max=18, ref=16 → |12-16|=4, |18-16|=2 → 12
  { numbers: [10, 14, 19], correctAnswer: 19 },   // min=10, max=19, ref=14 → |10-14|=4, |19-14|=5 → 19
  { numbers: [11, 17, 19], correctAnswer: 11 },   // min=11, max=19, ref=17 → |11-17|=6, |19-17|=2 → 11
  { numbers: [13, 18, 19], correctAnswer: 13 },   // min=13, max=19, ref=18 → |13-18|=5, |19-18|=1 → 13
  { numbers: [10, 12, 18], correctAnswer: 18 },   // min=10, max=18, ref=12 → |10-12|=2, |18-12|=6 → 18
  { numbers: [11, 16, 19], correctAnswer: 11 },   // min=11, max=19, ref=16 → |11-16|=5, |19-16|=3 → 11
  { numbers: [12, 14, 19], correctAnswer: 19 },   // min=12, max=19, ref=14 → |12-14|=2, |19-14|=5 → 19
  { numbers: [10, 17, 19], correctAnswer: 10 },   // min=10, max=19, ref=17 → |10-17|=7, |19-17|=2 → 10

  // 20s range
  { numbers: [21, 24, 29], correctAnswer: 29 },   // min=21, max=29, ref=24 → |21-24|=3, |29-24|=5 → 29
  { numbers: [22, 27, 29], correctAnswer: 22 },   // min=22, max=29, ref=27 → |22-27|=5, |29-27|=2 → 22
  { numbers: [20, 23, 28], correctAnswer: 28 },   // min=20, max=28, ref=23 → |20-23|=3, |28-23|=5 → 28
  { numbers: [21, 26, 29], correctAnswer: 21 },   // min=21, max=29, ref=26 → |21-26|=5, |29-26|=3 → 21
  { numbers: [20, 22, 28], correctAnswer: 28 },   // min=20, max=28, ref=22 → |20-22|=2, |28-22|=6 → 28
  { numbers: [23, 28, 29], correctAnswer: 23 },   // min=23, max=29, ref=28 → |23-28|=5, |29-28|=1 → 23
  { numbers: [20, 26, 29], correctAnswer: 20 },   // min=20, max=29, ref=26 → |20-26|=6, |29-26|=3 → 20
  { numbers: [22, 24, 29], correctAnswer: 29 },   // min=22, max=29, ref=24 → |22-24|=2, |29-24|=5 → 29

  // 30s range
  { numbers: [31, 36, 39], correctAnswer: 31 },   // min=31, max=39, ref=36 → |31-36|=5, |39-36|=3 → 31
  { numbers: [30, 34, 39], correctAnswer: 39 },   // min=30, max=39, ref=34 → |30-34|=4, |39-34|=5 → 39
  { numbers: [32, 38, 39], correctAnswer: 32 },   // min=32, max=39, ref=38 → |32-38|=6, |39-38|=1 → 32
  { numbers: [30, 33, 39], correctAnswer: 39 },   // min=30, max=39, ref=33 → |30-33|=3, |39-33|=6 → 39
  { numbers: [31, 37, 39], correctAnswer: 31 },   // min=31, max=39, ref=37 → |31-37|=6, |39-37|=2 → 31
  { numbers: [30, 32, 38], correctAnswer: 38 },   // min=30, max=38, ref=32 → |30-32|=2, |38-32|=6 → 38

  // 40s range
  { numbers: [41, 46, 49], correctAnswer: 41 },   // min=41, max=49, ref=46 → |41-46|=5, |49-46|=3 → 41
  { numbers: [40, 44, 49], correctAnswer: 49 },   // min=40, max=49, ref=44 → |40-44|=4, |49-44|=5 → 49
  { numbers: [42, 48, 49], correctAnswer: 42 },   // min=42, max=49, ref=48 → |42-48|=6, |49-48|=1 → 42
  { numbers: [40, 43, 49], correctAnswer: 49 },   // min=40, max=49, ref=43 → |40-43|=3, |49-43|=6 → 49
  { numbers: [41, 47, 49], correctAnswer: 41 },   // min=41, max=49, ref=47 → |41-47|=6, |49-47|=2 → 41
  { numbers: [40, 42, 48], correctAnswer: 48 },   // min=40, max=48, ref=42 → |40-42|=2, |48-42|=6 → 48

  // 50s range
  { numbers: [51, 56, 59], correctAnswer: 51 },   // min=51, max=59, ref=56 → |51-56|=5, |59-56|=3 → 51
  { numbers: [50, 54, 59], correctAnswer: 59 },   // min=50, max=59, ref=54 → |50-54|=4, |59-54|=5 → 59
  { numbers: [52, 58, 59], correctAnswer: 52 },   // min=52, max=59, ref=58 → |52-58|=6, |59-58|=1 → 52
  { numbers: [50, 53, 59], correctAnswer: 59 },   // min=50, max=59, ref=53 → |50-53|=3, |59-53|=6 → 59
  { numbers: [51, 57, 59], correctAnswer: 51 },   // min=51, max=59, ref=57 → |51-57|=6, |59-57|=2 → 51
  { numbers: [50, 52, 58], correctAnswer: 58 },   // min=50, max=58, ref=52 → |50-52|=2, |58-52|=6 → 58

  // 60s range
  { numbers: [61, 66, 69], correctAnswer: 61 },   // min=61, max=69, ref=66 → |61-66|=5, |69-66|=3 → 61
  { numbers: [60, 64, 69], correctAnswer: 69 },   // min=60, max=69, ref=64 → |60-64|=4, |69-64|=5 → 69
  { numbers: [62, 68, 69], correctAnswer: 62 },   // min=62, max=69, ref=68 → |62-68|=6, |69-68|=1 → 62
  { numbers: [60, 63, 69], correctAnswer: 69 },   // min=60, max=69, ref=63 → |60-63|=3, |69-63|=6 → 69
  { numbers: [61, 67, 69], correctAnswer: 61 },   // min=61, max=69, ref=67 → |61-67|=6, |69-67|=2 → 61
  { numbers: [60, 62, 68], correctAnswer: 68 },   // min=60, max=68, ref=62 → |60-62|=2, |68-62|=6 → 68

  // 70s range
  { numbers: [71, 76, 79], correctAnswer: 71 },   // min=71, max=79, ref=76 → |71-76|=5, |79-76|=3 → 71
  { numbers: [70, 74, 79], correctAnswer: 79 },   // min=70, max=79, ref=74 → |70-74|=4, |79-74|=5 → 79
  { numbers: [72, 78, 79], correctAnswer: 72 },   // min=72, max=79, ref=78 → |72-78|=6, |79-78|=1 → 72
  { numbers: [70, 73, 79], correctAnswer: 79 },   // min=70, max=79, ref=73 → |70-73|=3, |79-73|=6 → 79
  { numbers: [71, 77, 79], correctAnswer: 71 },   // min=71, max=79, ref=77 → |71-77|=6, |79-77|=2 → 71
  { numbers: [70, 72, 78], correctAnswer: 78 },   // min=70, max=78, ref=72 → |70-72|=2, |78-72|=6 → 78

  // 80s range
  { numbers: [81, 86, 89], correctAnswer: 81 },   // min=81, max=89, ref=86 → |81-86|=5, |89-86|=3 → 81
  { numbers: [80, 84, 89], correctAnswer: 89 },   // min=80, max=89, ref=84 → |80-84|=4, |89-84|=5 → 89
  { numbers: [82, 88, 89], correctAnswer: 82 },   // min=82, max=89, ref=88 → |82-88|=6, |89-88|=1 → 82
  { numbers: [80, 83, 89], correctAnswer: 89 },   // min=80, max=89, ref=83 → |80-83|=3, |89-83|=6 → 89
  { numbers: [81, 87, 89], correctAnswer: 81 },   // min=81, max=89, ref=87 → |81-87|=6, |89-87|=2 → 81
  { numbers: [80, 82, 88], correctAnswer: 88 },   // min=80, max=88, ref=82 → |80-82|=2, |88-82|=6 → 88

  // 90s range
  { numbers: [91, 96, 99], correctAnswer: 91 },   // min=91, max=99, ref=96 → |91-96|=5, |99-96|=3 → 91
  { numbers: [90, 94, 99], correctAnswer: 99 },   // min=90, max=99, ref=94 → |90-94|=4, |99-94|=5 → 99
  { numbers: [92, 98, 99], correctAnswer: 92 },   // min=92, max=99, ref=98 → |92-98|=6, |99-98|=1 → 92
  { numbers: [90, 93, 99], correctAnswer: 99 },   // min=90, max=99, ref=93 → |90-93|=3, |99-93|=6 → 99
  { numbers: [91, 97, 99], correctAnswer: 91 },   // min=91, max=99, ref=97 → |91-97|=6, |99-97|=2 → 91
  { numbers: [90, 92, 98], correctAnswer: 98 },   // min=90, max=98, ref=92 → |90-92|=2, |98-92|=6 → 98

  // Wide spreads
  { numbers: [5, 7, 40], correctAnswer: 40 },     // min=5, max=40, ref=7 → |5-7|=2, |40-7|=33 → 40
  { numbers: [3, 50, 55], correctAnswer: 3 },     // min=3, max=55, ref=50 → |3-50|=47, |55-50|=5 → 3
  { numbers: [10, 15, 80], correctAnswer: 80 },   // min=10, max=80, ref=15 → |10-15|=5, |80-15|=65 → 80
  { numbers: [2, 90, 95], correctAnswer: 2 },     // min=2, max=95, ref=90 → |2-90|=88, |95-90|=5 → 2
  { numbers: [20, 25, 90], correctAnswer: 90 },   // min=20, max=90, ref=25 → |20-25|=5, |90-25|=65 → 90
  { numbers: [5, 70, 75], correctAnswer: 5 },     // min=5, max=75, ref=70 → |5-70|=65, |75-70|=5 → 5
  { numbers: [15, 20, 85], correctAnswer: 85 },   // min=15, max=85, ref=20 → |15-20|=5, |85-20|=65 → 85
  { numbers: [8, 80, 88], correctAnswer: 8 },     // min=8, max=88, ref=80 → |8-80|=72, |88-80|=8 → 8
  { numbers: [12, 18, 90], correctAnswer: 90 },   // min=12, max=90, ref=18 → |12-18|=6, |90-18|=72 → 90
  { numbers: [6, 60, 67], correctAnswer: 6 },     // min=6, max=67, ref=60 → |6-60|=54, |67-60|=7 → 6

  // Mixed tight clusters
  { numbers: [33, 35, 40], correctAnswer: 40 },   // min=33, max=40, ref=35 → |33-35|=2, |40-35|=5 → 40
  { numbers: [47, 52, 54], correctAnswer: 47 },   // min=47, max=54, ref=52 → |47-52|=5, |54-52|=2 → 47
  { numbers: [66, 68, 75], correctAnswer: 75 },   // min=66, max=75, ref=68 → |66-68|=2, |75-68|=7 → 75
  { numbers: [84, 89, 91], correctAnswer: 84 },   // min=84, max=91, ref=89 → |84-89|=5, |91-89|=2 → 84
  { numbers: [17, 19, 26], correctAnswer: 26 },   // min=17, max=26, ref=19 → |17-19|=2, |26-19|=7 → 26
  { numbers: [53, 58, 60], correctAnswer: 53 },   // min=53, max=60, ref=58 → |53-58|=5, |60-58|=2 → 53
  { numbers: [29, 31, 38], correctAnswer: 38 },   // min=29, max=38, ref=31 → |29-31|=2, |38-31|=7 → 38
  { numbers: [71, 76, 78], correctAnswer: 71 },   // min=71, max=78, ref=76 → |71-76|=5, |78-76|=2 → 71
  { numbers: [14, 16, 23], correctAnswer: 23 },   // min=14, max=23, ref=16 → |14-16|=2, |23-16|=7 → 23
  { numbers: [46, 51, 53], correctAnswer: 46 },   // min=46, max=53, ref=51 → |46-51|=5, |53-51|=2 → 46
];

/**
 * Generates a NumberSpeedQuestion from a pool item.
 * The three numbers are shuffled to randomise box positions.
 */
export function generateNumberSpeedQuestion(
  item: NumberSpeedPoolItem,
  index: number,
  seed?: number
): NumberSpeedQuestion {
  const shuffledNumbers = shuffled(
    [...item.numbers],
    seed !== undefined ? seed + index : undefined
  ) as [number, number, number];

  return {
    type: 'number_speed',
    id: `number_speed_${index}`,
    numbers: shuffledNumbers,
    correctAnswer: item.correctAnswer,
  };
}

export function validateNumberSpeedAnswer(
  question: NumberSpeedQuestion,
  answer: number
): boolean {
  return question.correctAnswer === answer;
}
