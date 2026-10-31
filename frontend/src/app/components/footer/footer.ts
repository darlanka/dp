import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: '<p>Built with Angular and Spring Boot.</p>',
  styles: ':host { display: block; width: min(1180px, 100% - 2.5rem); margin-inline: auto; padding: 5rem 0 2.5rem; color: var(--muted); font: 0.8125rem var(--mono) } p { margin: 0 }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
