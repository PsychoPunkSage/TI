import type { SectionId } from '@/types/questions';

export const SECTION_BENCHMARKS: Record<SectionId, number> = {
  reasoning: 8000,
  perceptual_speed: 4000,
  number_speed: 5000,
  word_meaning: 6000,
  spatial: 7000,
};

export function getBenchmark(sectionId: SectionId): number {
  return SECTION_BENCHMARKS[sectionId];
}
