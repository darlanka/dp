import { DestroyRef, Directive, ElementRef, inject, input, signal } from '@angular/core';

/**
 * Fades an element in the first time it scrolls into view.
 * Optional [revealDelay] (ms) staggers elements that appear together.
 */
@Directive({
  selector: '[reveal]',
  host: {
    class: 'reveal',
    '[class.in]': 'visible()',
    '[style.transition-delay.ms]': 'delay()',
  },
})
export class Reveal {
  readonly delay = input(0, { alias: 'revealDelay' });
  protected readonly visible = signal(false);

  constructor() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(inject<ElementRef<HTMLElement>>(ElementRef).nativeElement);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}
