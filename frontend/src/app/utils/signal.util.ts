import { SignalTrace } from '@app/models';

/** Value of a simulated sensor at a given time. Built from sine waves, so it needs no stored history. */
export function sampleTrace(trace: SignalTrace, seconds: number): number {
  const wave =
    Math.sin(seconds * trace.slowWave + trace.phase) +
    0.5 * Math.sin(seconds * trace.fastWave + trace.phase * 2) +
    0.25 * Math.sin(seconds * 4.9);
  const jitter = 0.012 * Math.sin(seconds * 23 + trace.phase) * Math.sin(seconds * 37);
  return trace.base + trace.amplitude * wave * 0.6 + jitter;
}
