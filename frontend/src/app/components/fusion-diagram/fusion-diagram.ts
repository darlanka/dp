import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Static diagram of the multimodal model. The animated dashes are pure CSS. */
@Component({
  selector: 'app-fusion-diagram',
  templateUrl: './fusion-diagram.html',
  styleUrl: './fusion-diagram.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FusionDiagram {}
