import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '@app/directives/reveal.directive';

@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  template: '<h2 reveal>{{ title() }}</h2>',
  styles: `
    :host { display: block; }
    h2 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; font-stretch: 112%; letter-spacing: -0.02em; margin-bottom: 2.5rem; max-width: 18ch; }
    h2::after { content: ''; display: block; height: 3px; width: 0; margin-top: 1rem; background: var(--amber); transition: width 0.9s 0.2s cubic-bezier(0.2, 0.7, 0.2, 1); }
    h2.in::after { width: 4.5rem; }
    @media (prefers-reduced-motion: reduce) { h2::after { width: 4.5rem; transition: none; } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeading {
  readonly title = input.required<string>();
}
