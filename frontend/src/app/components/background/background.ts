import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '@app/directives/reveal.directive';
import { Education, SectionId } from '@app/models';

@Component({
  selector: 'app-background',
  imports: [Reveal],
  templateUrl: './background.html',
  styleUrl: './background.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Background {
  readonly education = input.required<Education>();
  readonly achievements = input.required<readonly string[]>();

  protected readonly id = SectionId.Background;
}
