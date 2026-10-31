import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeading } from '@app/components/section-heading/section-heading';
import { Reveal } from '@app/directives/reveal.directive';
import { Job, SectionId } from '@app/models';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading, Reveal],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  readonly jobs = input.required<readonly Job[]>();

  protected readonly id = SectionId.Experience;
}
