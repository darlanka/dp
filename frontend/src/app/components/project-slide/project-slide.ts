import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FlowSteps } from '@app/components/flow-steps/flow-steps';
import { ScreenshotViewer } from '@app/components/screenshot-viewer/screenshot-viewer';
import { Project } from '@app/models';

@Component({
  selector: 'app-project-slide',
  imports: [FlowSteps, ScreenshotViewer],
  templateUrl: './project-slide.html',
  styleUrl: './project-slide.css',
  host: { '[class.active]': 'active()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSlide {
  readonly project = input.required<Project>();
  readonly active = input(false);
}
