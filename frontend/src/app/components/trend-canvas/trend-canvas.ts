import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, viewChild } from '@angular/core';
import { STATIC_FRAME_SECONDS } from '@app/constants/signal-traces.constants';
import { prefersReducedMotion } from '@app/utils/motion.util';
import { TrendRenderer } from './trend-renderer';

/** Owns the canvas element and the browser plumbing. Drawing itself lives in TrendRenderer. */
@Component({
  selector: 'app-trend-canvas',
  template: '<canvas #surface aria-hidden="true"></canvas>',
  styles: ':host { position: absolute; inset: 0; display: block } canvas { display: block; width: 100%; height: 100% }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendCanvas {
  private readonly surface = viewChild.required<ElementRef<HTMLCanvasElement>>('surface');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Animation frames fire 60 times a second, so keep them out of Angular's change detection.
    afterNextRender(() => this.zone.runOutsideAngular(() => this.start()));
  }

  private start() {
    const canvas = this.surface().nativeElement;
    const ctx = canvas.getContext('2d')!;
    const renderer = new TrendRenderer(ctx);
    const reduced = prefersReducedMotion();
    const startedAt = performance.now();
    let frame = 0;
    let onScreen = true;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderer.resize(w, h);
      if (reduced) renderer.draw(STATIC_FRAME_SECONDS);
    };

    const loop = () => {
      renderer.draw(STATIC_FRAME_SECONDS + (performance.now() - startedAt) / 1000);
      frame = requestAnimationFrame(loop);
    };

    const syncPlayback = () => {
      cancelAnimationFrame(frame);
      if (!reduced && onScreen && !document.hidden) loop();
    };

    const onPointerMove = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      const inside = e.clientY >= box.top && e.clientY <= box.bottom;
      renderer.setPointer(inside ? e.clientX - box.left : null);
    };
    const onPointerLeave = () => renderer.setPointer(null);

    const resizeObserver = new ResizeObserver(fit);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncPlayback();
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', syncPlayback);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', syncPlayback);
    });
  }
}
