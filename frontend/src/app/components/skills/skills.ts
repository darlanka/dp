import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { SectionHeading } from '@app/components/section-heading/section-heading';
import { Reveal } from '@app/directives/reveal.directive';
import { SectionId, SkillGroup } from '@app/models';

@Component({
  selector: 'app-skills',
  imports: [SectionHeading, Reveal],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  readonly groups = input.required<readonly SkillGroup[]>();

  protected readonly id = SectionId.Skills;
  protected readonly selectedIndex = signal(0);
  protected readonly selected = computed(() => this.groups()[this.selectedIndex()]);

  protected select(index: number) {
    this.selectedIndex.set(index);
  }
}
