import { SignalTrace } from '@app/models';

export const SIGNAL_SPEED_PX_PER_SEC = 70;
export const GRID_GAP_PX = 84;
export const COUNT_UP_MS = 1400;
/** Time offset used for the single static frame when the visitor prefers reduced motion. */
export const STATIC_FRAME_SECONDS = 40;

/** Where the traces live, as fractions of the canvas height. */
export const SIGNAL_BAND = { top: 0.14, height: 0.4 } as const;

export const SIGNAL_TRACES: readonly SignalTrace[] = [
  { tag: 'grid.freq', unit: 'Hz', color: '#f5b544', base: 0.62, amplitude: 0.1, slowWave: 0.9, fastWave: 2.3, phase: 0.4, scale: 3 },
  { tag: 'turbine.rpm', unit: 'rpm', color: '#4fd1c5', base: 0.45, amplitude: 0.13, slowWave: 0.6, fastWave: 1.7, phase: 2.1, scale: 3600 },
  { tag: 'bearing.temp', unit: 'C', color: '#ff7a6b', base: 0.28, amplitude: 0.08, slowWave: 1.3, fastWave: 3.1, phase: 4.2, scale: 140 },
];
