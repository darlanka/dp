import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Reveal } from '@app/directives/reveal.directive';
import { SectionId } from '@app/models';

@Component({
  selector: 'app-about',
  imports: [Reveal],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly paragraphs = input.required<readonly string[]>();

  protected readonly id = SectionId.About;
  // The first paragraph is set large as the introduction, the rest sit beside it.
  protected readonly lead = computed(() => this.paragraphs()[0] ?? '');
  protected readonly rest = computed(() => this.paragraphs().slice(1));
}
