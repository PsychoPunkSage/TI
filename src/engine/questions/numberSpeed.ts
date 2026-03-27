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

  // --- Cross-decade clusters ---
  { numbers: [17, 22, 26], correctAnswer: 17 },   // min=17, max=26, ref=22 → |17-22|=5, |26-22|=4 → 17
  { numbers: [16, 21, 27], correctAnswer: 27 },   // min=16, max=27, ref=21 → |16-21|=5, |27-21|=6 → 27
  { numbers: [19, 21, 28], correctAnswer: 28 },   // min=19, max=28, ref=21 → |19-21|=2, |28-21|=7 → 28
  { numbers: [16, 24, 27], correctAnswer: 16 },   // min=16, max=27, ref=24 → |16-24|=8, |27-24|=3 → 16
  { numbers: [18, 21, 29], correctAnswer: 29 },   // min=18, max=29, ref=21 → |18-21|=3, |29-21|=8 → 29
  { numbers: [27, 31, 36], correctAnswer: 36 },   // min=27, max=36, ref=31 → |27-31|=4, |36-31|=5 → 36
  { numbers: [28, 34, 37], correctAnswer: 28 },   // min=28, max=37, ref=34 → |28-34|=6, |37-34|=3 → 28
  { numbers: [26, 32, 35], correctAnswer: 26 },   // min=26, max=35, ref=32 → |26-32|=6, |35-32|=3 → 26
  { numbers: [27, 33, 36], correctAnswer: 27 },   // min=27, max=36, ref=33 → |27-33|=6, |36-33|=3 → 27
  { numbers: [29, 32, 38], correctAnswer: 38 },   // min=29, max=38, ref=32 → |29-32|=3, |38-32|=6 → 38
  { numbers: [37, 41, 46], correctAnswer: 46 },   // min=37, max=46, ref=41 → |37-41|=4, |46-41|=5 → 46
  { numbers: [38, 44, 47], correctAnswer: 38 },   // min=38, max=47, ref=44 → |38-44|=6, |47-44|=3 → 38
  { numbers: [36, 42, 45], correctAnswer: 36 },   // min=36, max=45, ref=42 → |36-42|=6, |45-42|=3 → 36
  { numbers: [38, 41, 47], correctAnswer: 47 },   // min=38, max=47, ref=41 → |38-41|=3, |47-41|=6 → 47
  { numbers: [47, 52, 56], correctAnswer: 47 },   // min=47, max=56, ref=52 → |47-52|=5, |56-52|=4 → 47
  { numbers: [48, 53, 57], correctAnswer: 48 },   // min=48, max=57, ref=53 → |48-53|=5, |57-53|=4 → 48
  { numbers: [46, 51, 57], correctAnswer: 57 },   // min=46, max=57, ref=51 → |46-51|=5, |57-51|=6 → 57
  { numbers: [49, 52, 58], correctAnswer: 58 },   // min=49, max=58, ref=52 → |49-52|=3, |58-52|=6 → 58
  { numbers: [48, 54, 57], correctAnswer: 48 },   // min=48, max=57, ref=54 → |48-54|=6, |57-54|=3 → 48
  { numbers: [57, 62, 66], correctAnswer: 57 },   // min=57, max=66, ref=62 → |57-62|=5, |66-62|=4 → 57
  { numbers: [58, 63, 67], correctAnswer: 58 },   // min=58, max=67, ref=63 → |58-63|=5, |67-63|=4 → 58
  { numbers: [56, 61, 67], correctAnswer: 67 },   // min=56, max=67, ref=61 → |56-61|=5, |67-61|=6 → 67
  { numbers: [59, 62, 68], correctAnswer: 68 },   // min=59, max=68, ref=62 → |59-62|=3, |68-62|=6 → 68
  { numbers: [58, 64, 67], correctAnswer: 58 },   // min=58, max=67, ref=64 → |58-64|=6, |67-64|=3 → 58
  { numbers: [67, 72, 76], correctAnswer: 67 },   // min=67, max=76, ref=72 → |67-72|=5, |76-72|=4 → 67
  { numbers: [68, 73, 77], correctAnswer: 68 },   // min=68, max=77, ref=73 → |68-73|=5, |77-73|=4 → 68
  { numbers: [66, 71, 77], correctAnswer: 77 },   // min=66, max=77, ref=71 → |66-71|=5, |77-71|=6 → 77
  { numbers: [69, 72, 78], correctAnswer: 78 },   // min=69, max=78, ref=72 → |69-72|=3, |78-72|=6 → 78
  { numbers: [68, 74, 77], correctAnswer: 68 },   // min=68, max=77, ref=74 → |68-74|=6, |77-74|=3 → 68
  { numbers: [77, 82, 86], correctAnswer: 77 },   // min=77, max=86, ref=82 → |77-82|=5, |86-82|=4 → 77
  { numbers: [78, 83, 87], correctAnswer: 78 },   // min=78, max=87, ref=83 → |78-83|=5, |87-83|=4 → 78
  { numbers: [76, 81, 87], correctAnswer: 87 },   // min=76, max=87, ref=81 → |76-81|=5, |87-81|=6 → 87
  { numbers: [79, 82, 88], correctAnswer: 88 },   // min=79, max=88, ref=82 → |79-82|=3, |88-82|=6 → 88
  { numbers: [78, 84, 87], correctAnswer: 78 },   // min=78, max=87, ref=84 → |78-84|=6, |87-84|=3 → 78
  { numbers: [87, 92, 96], correctAnswer: 87 },   // min=87, max=96, ref=92 → |87-92|=5, |96-92|=4 → 87
  { numbers: [88, 93, 97], correctAnswer: 88 },   // min=88, max=97, ref=93 → |88-93|=5, |97-93|=4 → 88
  { numbers: [86, 91, 97], correctAnswer: 97 },   // min=86, max=97, ref=91 → |86-91|=5, |97-91|=6 → 97
  { numbers: [89, 92, 98], correctAnswer: 98 },   // min=89, max=98, ref=92 → |89-92|=3, |98-92|=6 → 98
  { numbers: [88, 94, 97], correctAnswer: 88 },   // min=88, max=97, ref=94 → |88-94|=6, |97-94|=3 → 88

  // --- Lower-number-wins items ---
  { numbers: [15, 28, 31], correctAnswer: 15 },   // min=15, max=31, ref=28 → |15-28|=13, |31-28|=3 → 15
  { numbers: [12, 27, 30], correctAnswer: 12 },   // min=12, max=30, ref=27 → |12-27|=15, |30-27|=3 → 12
  { numbers: [14, 29, 32], correctAnswer: 14 },   // min=14, max=32, ref=29 → |14-29|=15, |32-29|=3 → 14
  { numbers: [11, 26, 29], correctAnswer: 11 },   // min=11, max=29, ref=26 → |11-26|=15, |29-26|=3 → 11
  { numbers: [10, 24, 27], correctAnswer: 10 },   // min=10, max=27, ref=24 → |10-24|=14, |27-24|=3 → 10
  { numbers: [13, 25, 28], correctAnswer: 13 },   // min=13, max=28, ref=25 → |13-25|=12, |28-25|=3 → 13
  { numbers: [9, 23, 26], correctAnswer: 9 },     // min=9, max=26, ref=23 → |9-23|=14, |26-23|=3 → 9
  { numbers: [8, 22, 25], correctAnswer: 8 },     // min=8, max=25, ref=22 → |8-22|=14, |25-22|=3 → 8
  { numbers: [20, 36, 39], correctAnswer: 20 },   // min=20, max=39, ref=36 → |20-36|=16, |39-36|=3 → 20
  { numbers: [18, 35, 38], correctAnswer: 18 },   // min=18, max=38, ref=35 → |18-35|=17, |38-35|=3 → 18
  { numbers: [16, 34, 37], correctAnswer: 16 },   // min=16, max=37, ref=34 → |16-34|=18, |37-34|=3 → 16
  { numbers: [14, 33, 36], correctAnswer: 14 },   // min=14, max=36, ref=33 → |14-33|=19, |36-33|=3 → 14
  { numbers: [5, 18, 21], correctAnswer: 5 },     // min=5, max=21, ref=18 → |5-18|=13, |21-18|=3 → 5
  { numbers: [6, 20, 23], correctAnswer: 6 },     // min=6, max=23, ref=20 → |6-20|=14, |23-20|=3 → 6
  { numbers: [7, 21, 24], correctAnswer: 7 },     // min=7, max=24, ref=21 → |7-21|=14, |24-21|=3 → 7
  { numbers: [4, 17, 20], correctAnswer: 4 },     // min=4, max=20, ref=17 → |4-17|=13, |20-17|=3 → 4
  { numbers: [25, 43, 46], correctAnswer: 25 },   // min=25, max=46, ref=43 → |25-43|=18, |46-43|=3 → 25
  { numbers: [23, 41, 44], correctAnswer: 23 },   // min=23, max=44, ref=41 → |23-41|=18, |44-41|=3 → 23
  { numbers: [21, 39, 42], correctAnswer: 21 },   // min=21, max=42, ref=39 → |21-39|=18, |42-39|=3 → 21
  { numbers: [19, 37, 40], correctAnswer: 19 },   // min=19, max=40, ref=37 → |19-37|=18, |40-37|=3 → 19
  { numbers: [30, 49, 52], correctAnswer: 30 },   // min=30, max=52, ref=49 → |30-49|=19, |52-49|=3 → 30
  { numbers: [28, 47, 50], correctAnswer: 28 },   // min=28, max=50, ref=47 → |28-47|=19, |50-47|=3 → 28
  { numbers: [26, 45, 48], correctAnswer: 26 },   // min=26, max=48, ref=45 → |26-45|=19, |48-45|=3 → 26
  { numbers: [24, 43, 46], correctAnswer: 24 },   // min=24, max=46, ref=43 → |24-43|=19, |46-43|=3 → 24
  { numbers: [35, 54, 57], correctAnswer: 35 },   // min=35, max=57, ref=54 → |35-54|=19, |57-54|=3 → 35
  { numbers: [33, 52, 55], correctAnswer: 33 },   // min=33, max=55, ref=52 → |33-52|=19, |55-52|=3 → 33
  { numbers: [31, 50, 53], correctAnswer: 31 },   // min=31, max=53, ref=50 → |31-50|=19, |53-50|=3 → 31
  { numbers: [29, 48, 51], correctAnswer: 29 },   // min=29, max=51, ref=48 → |29-48|=19, |51-48|=3 → 29
  { numbers: [40, 59, 62], correctAnswer: 40 },   // min=40, max=62, ref=59 → |40-59|=19, |62-59|=3 → 40
  { numbers: [38, 57, 60], correctAnswer: 38 },   // min=38, max=60, ref=57 → |38-57|=19, |60-57|=3 → 38
  { numbers: [36, 55, 58], correctAnswer: 36 },   // min=36, max=58, ref=55 → |36-55|=19, |58-55|=3 → 36
  { numbers: [34, 53, 56], correctAnswer: 34 },   // min=34, max=56, ref=53 → |34-53|=19, |56-53|=3 → 34
  { numbers: [45, 64, 67], correctAnswer: 45 },   // min=45, max=67, ref=64 → |45-64|=19, |67-64|=3 → 45
  { numbers: [43, 62, 65], correctAnswer: 43 },   // min=43, max=65, ref=62 → |43-62|=19, |65-62|=3 → 43
  { numbers: [41, 60, 63], correctAnswer: 41 },   // min=41, max=63, ref=60 → |41-60|=19, |63-60|=3 → 41
  { numbers: [39, 58, 61], correctAnswer: 39 },   // min=39, max=61, ref=58 → |39-58|=19, |61-58|=3 → 39
  { numbers: [50, 69, 72], correctAnswer: 50 },   // min=50, max=72, ref=69 → |50-69|=19, |72-69|=3 → 50
  { numbers: [48, 67, 70], correctAnswer: 48 },   // min=48, max=70, ref=67 → |48-67|=19, |70-67|=3 → 48
  { numbers: [46, 65, 68], correctAnswer: 46 },   // min=46, max=68, ref=65 → |46-65|=19, |68-65|=3 → 46
  { numbers: [44, 63, 66], correctAnswer: 44 },   // min=44, max=66, ref=63 → |44-63|=19, |66-63|=3 → 44

  // --- Larger mid-range spreads ---
  { numbers: [34, 51, 53], correctAnswer: 34 },   // min=34, max=53, ref=51 → |34-51|=17, |53-51|=2 → 34
  { numbers: [32, 49, 52], correctAnswer: 32 },   // min=32, max=52, ref=49 → |32-49|=17, |52-49|=3 → 32
  { numbers: [36, 53, 55], correctAnswer: 36 },   // min=36, max=55, ref=53 → |36-53|=17, |55-53|=2 → 36
  { numbers: [38, 55, 57], correctAnswer: 38 },   // min=38, max=57, ref=55 → |38-55|=17, |57-55|=2 → 38
  { numbers: [30, 48, 51], correctAnswer: 30 },   // min=30, max=51, ref=48 → |30-48|=18, |51-48|=3 → 30
  { numbers: [33, 50, 53], correctAnswer: 33 },   // min=33, max=53, ref=50 → |33-50|=17, |53-50|=3 → 33
  { numbers: [35, 52, 68], correctAnswer: 35 },   // min=35, max=68, ref=52 → |35-52|=17, |68-52|=16 → 35
  { numbers: [37, 54, 56], correctAnswer: 37 },   // min=37, max=56, ref=54 → |37-54|=17, |56-54|=2 → 37
  { numbers: [40, 57, 59], correctAnswer: 40 },   // min=40, max=59, ref=57 → |40-57|=17, |59-57|=2 → 40
  { numbers: [42, 59, 61], correctAnswer: 42 },   // min=42, max=61, ref=59 → |42-59|=17, |61-59|=2 → 42
  { numbers: [44, 61, 63], correctAnswer: 44 },   // min=44, max=63, ref=61 → |44-61|=17, |63-61|=2 → 44
  { numbers: [46, 63, 65], correctAnswer: 46 },   // min=46, max=65, ref=63 → |46-63|=17, |65-63|=2 → 46
  { numbers: [31, 47, 66], correctAnswer: 66 },   // min=31, max=66, ref=47 → |31-47|=16, |66-47|=19 → 66
  { numbers: [33, 49, 68], correctAnswer: 68 },   // min=33, max=68, ref=49 → |33-49|=16, |68-49|=19 → 68
  { numbers: [30, 46, 63], correctAnswer: 63 },   // min=30, max=63, ref=46 → |30-46|=16, |63-46|=17 → 63
  { numbers: [32, 48, 65], correctAnswer: 65 },   // min=32, max=65, ref=48 → |32-48|=16, |65-48|=17 → 65
  { numbers: [34, 50, 67], correctAnswer: 67 },   // min=34, max=67, ref=50 → |34-50|=16, |67-50|=17 → 67
  { numbers: [36, 52, 69], correctAnswer: 69 },   // min=36, max=69, ref=52 → |36-52|=16, |69-52|=17 → 69
  { numbers: [38, 54, 71], correctAnswer: 71 },   // min=38, max=71, ref=54 → |38-54|=16, |71-54|=17 → 71
  { numbers: [40, 56, 73], correctAnswer: 73 },   // min=40, max=73, ref=56 → |40-56|=16, |73-56|=17 → 73
  { numbers: [42, 58, 60], correctAnswer: 42 },   // min=42, max=60, ref=58 → |42-58|=16, |60-58|=2 → 42
  { numbers: [44, 60, 62], correctAnswer: 44 },   // min=44, max=62, ref=60 → |44-60|=16, |62-60|=2 → 44
  { numbers: [46, 62, 64], correctAnswer: 46 },   // min=46, max=64, ref=62 → |46-62|=16, |64-62|=2 → 46
  { numbers: [48, 64, 66], correctAnswer: 48 },   // min=48, max=66, ref=64 → |48-64|=16, |66-64|=2 → 48
  { numbers: [30, 47, 49], correctAnswer: 30 },   // min=30, max=49, ref=47 → |30-47|=17, |49-47|=2 → 30
  { numbers: [32, 49, 51], correctAnswer: 32 },   // min=32, max=51, ref=49 → |32-49|=17, |51-49|=2 → 32
  { numbers: [34, 51, 69], correctAnswer: 69 },   // min=34, max=69, ref=51 → |34-51|=17, |69-51|=18 → 69
  { numbers: [41, 58, 76], correctAnswer: 76 },   // min=41, max=76, ref=58 → |41-58|=17, |76-58|=18 → 76
  { numbers: [43, 60, 62], correctAnswer: 43 },   // min=43, max=62, ref=60 → |43-60|=17, |62-60|=2 → 43

  // --- Tight 3-number clusters (all within 5) ---
  { numbers: [44, 45, 48], correctAnswer: 48 },   // min=44, max=48, ref=45 → |44-45|=1, |48-45|=3 → 48
  { numbers: [23, 24, 27], correctAnswer: 27 },   // min=23, max=27, ref=24 → |23-24|=1, |27-24|=3 → 27
  { numbers: [55, 56, 59], correctAnswer: 59 },   // min=55, max=59, ref=56 → |55-56|=1, |59-56|=3 → 59
  { numbers: [66, 67, 70], correctAnswer: 70 },   // min=66, max=70, ref=67 → |66-67|=1, |70-67|=3 → 70
  { numbers: [77, 78, 81], correctAnswer: 81 },   // min=77, max=81, ref=78 → |77-78|=1, |81-78|=3 → 81
  { numbers: [33, 34, 37], correctAnswer: 37 },   // min=33, max=37, ref=34 → |33-34|=1, |37-34|=3 → 37
  { numbers: [11, 12, 15], correctAnswer: 15 },   // min=11, max=15, ref=12 → |11-12|=1, |15-12|=3 → 15
  { numbers: [88, 89, 92], correctAnswer: 92 },   // min=88, max=92, ref=89 → |88-89|=1, |92-89|=3 → 92
  { numbers: [22, 23, 26], correctAnswer: 26 },   // min=22, max=26, ref=23 → |22-23|=1, |26-23|=3 → 26
  { numbers: [44, 46, 49], correctAnswer: 49 },   // min=44, max=49, ref=46 → |44-46|=2, |49-46|=3 → 49
  { numbers: [55, 57, 60], correctAnswer: 60 },   // min=55, max=60, ref=57 → |55-57|=2, |60-57|=3 → 60
  { numbers: [66, 68, 71], correctAnswer: 71 },   // min=66, max=71, ref=68 → |66-68|=2, |71-68|=3 → 71
  { numbers: [33, 35, 38], correctAnswer: 38 },   // min=33, max=38, ref=35 → |33-35|=2, |38-35|=3 → 38
  { numbers: [22, 24, 27], correctAnswer: 27 },   // min=22, max=27, ref=24 → |22-24|=2, |27-24|=3 → 27
  { numbers: [77, 79, 82], correctAnswer: 82 },   // min=77, max=82, ref=79 → |77-79|=2, |82-79|=3 → 82
  { numbers: [44, 47, 48], correctAnswer: 44 },   // min=44, max=48, ref=47 → |44-47|=3, |48-47|=1 → 44
  { numbers: [55, 58, 59], correctAnswer: 55 },   // min=55, max=59, ref=58 → |55-58|=3, |59-58|=1 → 55
  { numbers: [66, 69, 70], correctAnswer: 66 },   // min=66, max=70, ref=69 → |66-69|=3, |70-69|=1 → 66
  { numbers: [77, 80, 81], correctAnswer: 77 },   // min=77, max=81, ref=80 → |77-80|=3, |81-80|=1 → 77
  { numbers: [33, 36, 37], correctAnswer: 33 },   // min=33, max=37, ref=36 → |33-36|=3, |37-36|=1 → 33
  { numbers: [11, 14, 15], correctAnswer: 11 },   // min=11, max=15, ref=14 → |11-14|=3, |15-14|=1 → 11
  { numbers: [22, 25, 26], correctAnswer: 22 },   // min=22, max=26, ref=25 → |22-25|=3, |26-25|=1 → 22
  { numbers: [88, 91, 92], correctAnswer: 88 },   // min=88, max=92, ref=91 → |88-91|=3, |92-91|=1 → 88
  { numbers: [43, 44, 47], correctAnswer: 47 },   // min=43, max=47, ref=44 → |43-44|=1, |47-44|=3 → 47
  { numbers: [54, 55, 58], correctAnswer: 58 },   // min=54, max=58, ref=55 → |54-55|=1, |58-55|=3 → 58
  { numbers: [65, 66, 69], correctAnswer: 69 },   // min=65, max=69, ref=66 → |65-66|=1, |69-66|=3 → 69
  { numbers: [76, 77, 80], correctAnswer: 80 },   // min=76, max=80, ref=77 → |76-77|=1, |80-77|=3 → 80
  { numbers: [32, 33, 36], correctAnswer: 36 },   // min=32, max=36, ref=33 → |32-33|=1, |36-33|=3 → 36
  { numbers: [10, 11, 14], correctAnswer: 14 },   // min=10, max=14, ref=11 → |10-11|=1, |14-11|=3 → 14
  { numbers: [21, 22, 25], correctAnswer: 25 },   // min=21, max=25, ref=22 → |21-22|=1, |25-22|=3 → 25

  // --- High-range variety (75-99) ---
  { numbers: [76, 83, 87], correctAnswer: 76 },   // min=76, max=87, ref=83 → |76-83|=7, |87-83|=4 → 76
  { numbers: [75, 82, 86], correctAnswer: 75 },   // min=75, max=86, ref=82 → |75-82|=7, |86-82|=4 → 75
  { numbers: [77, 84, 88], correctAnswer: 77 },   // min=77, max=88, ref=84 → |77-84|=7, |88-84|=4 → 77
  { numbers: [78, 85, 89], correctAnswer: 78 },   // min=78, max=89, ref=85 → |78-85|=7, |89-85|=4 → 78
  { numbers: [79, 86, 90], correctAnswer: 79 },   // min=79, max=90, ref=86 → |79-86|=7, |90-86|=4 → 79
  { numbers: [80, 87, 91], correctAnswer: 80 },   // min=80, max=91, ref=87 → |80-87|=7, |91-87|=4 → 80
  { numbers: [76, 81, 95], correctAnswer: 95 },   // min=76, max=95, ref=81 → |76-81|=5, |95-81|=14 → 95
  { numbers: [77, 82, 96], correctAnswer: 96 },   // min=77, max=96, ref=82 → |77-82|=5, |96-82|=14 → 96
  { numbers: [75, 79, 94], correctAnswer: 94 },   // min=75, max=94, ref=79 → |75-79|=4, |94-79|=15 → 94
  { numbers: [76, 80, 93], correctAnswer: 93 },   // min=76, max=93, ref=80 → |76-80|=4, |93-80|=13 → 93
  { numbers: [77, 81, 94], correctAnswer: 94 },   // min=77, max=94, ref=81 → |77-81|=4, |94-81|=13 → 94
  { numbers: [78, 82, 95], correctAnswer: 95 },   // min=78, max=95, ref=82 → |78-82|=4, |95-82|=13 → 95
  { numbers: [85, 90, 94], correctAnswer: 85 },   // min=85, max=94, ref=90 → |85-90|=5, |94-90|=4 → 85
  { numbers: [86, 91, 95], correctAnswer: 86 },   // min=86, max=95, ref=91 → |86-91|=5, |95-91|=4 → 86
  { numbers: [75, 80, 84], correctAnswer: 75 },   // min=75, max=84, ref=80 → |75-80|=5, |84-80|=4 → 75
  { numbers: [76, 81, 85], correctAnswer: 76 },   // min=76, max=85, ref=81 → |76-81|=5, |85-81|=4 → 76
  { numbers: [79, 84, 88], correctAnswer: 79 },   // min=79, max=88, ref=84 → |79-84|=5, |88-84|=4 → 79
  { numbers: [80, 85, 89], correctAnswer: 80 },   // min=80, max=89, ref=85 → |80-85|=5, |89-85|=4 → 80
  { numbers: [81, 86, 90], correctAnswer: 81 },   // min=81, max=90, ref=86 → |81-86|=5, |90-86|=4 → 81
  { numbers: [82, 87, 91], correctAnswer: 82 },   // min=82, max=91, ref=87 → |82-87|=5, |91-87|=4 → 82
  { numbers: [83, 88, 92], correctAnswer: 83 },   // min=83, max=92, ref=88 → |83-88|=5, |92-88|=4 → 83
  { numbers: [84, 89, 93], correctAnswer: 84 },   // min=84, max=93, ref=89 → |84-89|=5, |93-89|=4 → 84
  { numbers: [85, 90, 93], correctAnswer: 85 },   // min=85, max=93, ref=90 → |85-90|=5, |93-90|=3 → 85
  { numbers: [86, 91, 94], correctAnswer: 86 },   // min=86, max=94, ref=91 → |86-91|=5, |94-91|=3 → 86
  { numbers: [87, 92, 95], correctAnswer: 87 },   // min=87, max=95, ref=92 → |87-92|=5, |95-92|=3 → 87
  { numbers: [88, 93, 96], correctAnswer: 88 },   // min=88, max=96, ref=93 → |88-93|=5, |96-93|=3 → 88
];

// --- Level 2 pool: no-outlier questions only ---

const OUTLIER_RATIO_THRESHOLD = 3.0;
const MIN_GAP = 2;

function isNoOutlier(item: NumberSpeedPoolItem): boolean {
  const sorted = [...item.numbers].sort((a, b) => a - b) as [number, number, number];
  const [min, ref, max] = sorted;
  const gap1 = ref - min;
  const gap2 = max - ref;
  if (gap1 < MIN_GAP || gap2 < MIN_GAP) return false;
  const ratio = Math.max(gap1, gap2) / Math.min(gap1, gap2);
  return ratio <= OUTLIER_RATIO_THRESHOLD;
}

export const NUMBER_SPEED_LEVEL2_POOL: NumberSpeedPoolItem[] =
  NUMBER_SPEED_POOL.filter(isNoOutlier);

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
