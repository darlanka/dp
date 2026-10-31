import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MetricList } from '@app/components/metric-list/metric-list';
import { TrendCanvas } from '@app/components/trend-canvas/trend-canvas';
import { Profile, SectionId } from '@app/models';
import { splitNameIntoWords } from '@app/utils/name.util';

@Component({
  selector: 'app-hero',
  imports: [TrendCanvas, MetricList],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly profile = input.required<Profile>();

  protected readonly id = SectionId.Top;
  protected readonly nameWords = computed(() => splitNameIntoWords(this.profile().name));
}
