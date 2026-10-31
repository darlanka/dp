import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { COUNT_UP_MS } from '@app/constants/signal-traces.constants';
import { easeOutCubic, prefersReducedMotion } from '@app/utils/motion.util';

/** Counts the element's text from 0 up to [countUp] the first time it is visible. */
@Directive({ selector: '[countUp]' })
export class CountUp {
  readonly target = input.required<number>({ alias: 'countUp' });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.waitUntilVisible());
  }

  private waitUntilVisible() {
    if (prefersReducedMotion()) {
      this.show(this.target());
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        this.animate();
      }
    });
    observer.observe(this.el);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private animate() {
    const end = this.target();
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / COUNT_UP_MS, 1);
      this.show(Math.round(end * easeOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  private show(value: number) {
    this.el.textContent = String(value);
  }
}
