import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAV_ITEMS } from '@app/constants/nav.constants';
import { SectionId } from '@app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly navItems = NAV_ITEMS;
  protected readonly topId = SectionId.Top;
}
