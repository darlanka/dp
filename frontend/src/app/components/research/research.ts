import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FusionDiagram } from '@app/components/fusion-diagram/fusion-diagram';
import { SectionHeading } from '@app/components/section-heading/section-heading';
import { Reveal } from '@app/directives/reveal.directive';
import { Research as ResearchPaper, SectionId } from '@app/models';

@Component({
  selector: 'app-research',
  imports: [SectionHeading, FusionDiagram, Reveal],
  templateUrl: './research.html',
  styleUrl: './research.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Research {
  readonly papers = input.required<readonly ResearchPaper[]>();

  protected readonly id = SectionId.Research;
}
