import { GRID_GAP_PX, SIGNAL_BAND, SIGNAL_SPEED_PX_PER_SEC, SIGNAL_TRACES } from '@app/constants/signal-traces.constants';
import { sampleTrace } from '@app/utils/signal.util';

const MONO = '"IBM Plex Mono", monospace';

/** Draws the simulated sensor feed. Knows about canvas drawing only, nothing about Angular. */
export class TrendRenderer {
  private width = 0;
  private height = 0;
  private pointerX: number | null = null;

  constructor(private readonly ctx: CanvasRenderingContext2D) {}

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setPointer(x: number | null) {
    this.pointerX = x;
  }

  draw(seconds: number) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid(seconds);
    this.drawTraces(seconds);
    this.drawReadout(seconds);
    this.drawCaption();
  }

  private get bandTop() {
    return this.height * SIGNAL_BAND.top;
  }

  private get bandHeight() {
    return this.height * SIGNAL_BAND.height;
  }

  private yFor(value: number) {
    return this.bandTop + (1 - value) * this.bandHeight;
  }

  private timeAt(x: number, seconds: number) {
    return seconds - (this.width - x) / SIGNAL_SPEED_PX_PER_SEC;
  }

  private drawGrid(seconds: number) {
    const { ctx } = this;
    const shift = (seconds * SIGNAL_SPEED_PX_PER_SEC) % GRID_GAP_PX;
    ctx.strokeStyle = 'rgba(142, 166, 176, 0.09)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -shift; x < this.width; x += GRID_GAP_PX) {
      ctx.moveTo(x, this.bandTop - 20);
      ctx.lineTo(x, this.bandTop + this.bandHeight + 20);
    }
    for (let row = 0; row <= 4; row++) {
      const y = this.bandTop + (this.bandHeight * row) / 4;
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.stroke();
  }

  private drawTraces(seconds: number) {
    const { ctx } = this;
    for (const trace of SIGNAL_TRACES) {
      const fade = ctx.createLinearGradient(0, 0, this.width, 0);
      fade.addColorStop(0, trace.color + '00');
      fade.addColorStop(0.4, trace.color + 'b3');
      fade.addColorStop(1, trace.color);
      ctx.strokeStyle = fade;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let x = 0; x <= this.width; x += 3) {
        const y = this.yFor(sampleTrace(trace, this.timeAt(x, seconds)));
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  private drawReadout(seconds: number) {
    const x = this.pointerX;
    if (x === null || x < 0 || x > this.width) return;
    const { ctx } = this;

    ctx.strokeStyle = 'rgba(232, 240, 242, 0.35)';
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    ctx.moveTo(x, this.bandTop - 20);
    ctx.lineTo(x, this.bandTop + this.bandHeight + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = `12px ${MONO}`;
    const labelOnLeft = x > this.width - 190;
    ctx.textAlign = labelOnLeft ? 'right' : 'left';
    for (const trace of SIGNAL_TRACES) {
      const value = sampleTrace(trace, this.timeAt(x, seconds));
      const y = this.yFor(value);
      ctx.fillStyle = trace.color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(`${trace.tag} ${(value * trace.scale).toFixed(1)} ${trace.unit}`, x + (labelOnLeft ? -10 : 10), y - 9);
    }
  }

  private drawCaption() {
    const { ctx } = this;
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(142, 166, 176, 0.7)';
    ctx.font = `11px ${MONO}`;
    ctx.fillText('simulated signal. move the cursor to read it', this.width - 16, this.bandTop + this.bandHeight + 40);
  }
}
