import { NameWord } from '@app/models';

/** Splits "Ada Lovelace" into words of letters, each letter with its own animation delay. */
export function splitNameIntoWords(name: string, stepMs = 45): NameWord[] {
  let index = 0;
  return name
    .split(' ')
    .map((word) => Array.from(word).map((char) => ({ char, delayMs: index++ * stepMs })));
}
