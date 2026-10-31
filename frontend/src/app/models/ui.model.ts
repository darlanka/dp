import { SectionId } from './enums';

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

export interface NameLetter {
  readonly char: string;
  readonly delayMs: number;
}

/** One word of the name, split into letters so each can animate in. */
export type NameWord = readonly NameLetter[];

/** Description of one simulated sensor line on the hero canvas. */
export interface SignalTrace {
  readonly tag: string;
  readonly unit: string;
  readonly color: string;
  /** Resting position inside the band, 0 to 1. */
  readonly base: number;
  readonly amplitude: number;
  /** Two wave speeds in radians per second. */
  readonly slowWave: number;
  readonly fastWave: number;
  readonly phase: number;
  /** Multiplier that turns the 0 to 1 value into a believable reading. */
  readonly scale: number;
}
