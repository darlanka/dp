/** Wraps an index around a list, so "next" on the last slide goes back to the first. */
export function wrapIndex(index: number, count: number): number {
  return count === 0 ? 0 : ((index % count) + count) % count;
}
