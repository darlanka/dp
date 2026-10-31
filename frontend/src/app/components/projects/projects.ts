import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ProjectSlide } from '@app/components/project-slide/project-slide';
import { SectionHeading } from '@app/components/section-heading/section-heading';
import { SWIPE_THRESHOLD_PX } from '@app/constants/slider.constants';
import { Project, SectionId } from '@app/models';
import { wrapIndex } from '@app/utils/slider.util';

/** A slider with one project per slide. Works with buttons, dots, arrow keys and swipes. */
@Component({
  selector: 'app-projects',
  imports: [SectionHeading, ProjectSlide],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  readonly projects = input.required<readonly Project[]>();

  protected readonly id = SectionId.Projects;
  protected readonly index = signal(0);
  protected readonly trackTransform = computed(() => `translateX(${-100 * this.index()}%)`);

  private dragStartX: number | null = null;

  protected go(target: number) {
    this.index.set(wrapIndex(target, this.projects().length));
  }

  protected next() {
    this.go(this.index() + 1);
  }

  protected previous() {
    this.go(this.index() - 1);
  }

  protected onKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.previous();
  }

  protected dragStart(event: PointerEvent) {
    this.dragStartX = event.clientX;
  }

  protected dragEnd(event: PointerEvent) {
    if (this.dragStartX === null) return;
    const distance = event.clientX - this.dragStartX;
    this.dragStartX = null;
    if (Math.abs(distance) < SWIPE_THRESHOLD_PX) return;
    distance < 0 ? this.next() : this.previous();
  }
}
