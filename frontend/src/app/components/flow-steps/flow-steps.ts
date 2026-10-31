import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A vertical pipeline whose nodes light up one after another, like data moving through. */
@Component({
  selector: 'app-flow-steps',
  templateUrl: './flow-steps.html',
  styleUrl: './flow-steps.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowSteps {
  readonly steps = input.required<readonly string[]>();
}
