export function prefersReducedMotion(): boolean {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Fast start, slow finish. Takes progress from 0 to 1. */
export function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}
