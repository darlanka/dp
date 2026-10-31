import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ProjectImage } from '@app/models';

/** A framed screenshot with a tab for each image. */
@Component({
  selector: 'app-screenshot-viewer',
  templateUrl: './screenshot-viewer.html',
  styleUrl: './screenshot-viewer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenshotViewer {
  readonly images = input.required<readonly ProjectImage[]>();

  protected readonly selected = signal(0);

  protected select(index: number) {
    this.selected.set(index);
  }
}
