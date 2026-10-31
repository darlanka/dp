import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountUp } from '@app/directives/count-up.directive';
import { Metric } from '@app/models';

@Component({
  selector: 'app-metric-list',
  imports: [CountUp],
  templateUrl: './metric-list.html',
  styleUrl: './metric-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricList {
  readonly metrics = input.required<readonly Metric[]>();
}
