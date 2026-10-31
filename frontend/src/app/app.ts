import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { About } from '@app/components/about/about';
import { Background } from '@app/components/background/background';
import { Contact } from '@app/components/contact/contact';
import { Experience } from '@app/components/experience/experience';
import { Footer } from '@app/components/footer/footer';
import { Header } from '@app/components/header/header';
import { Projects } from '@app/components/projects/projects';
import { Hero } from '@app/components/hero/hero';
import { Research } from '@app/components/research/research';
import { Skills } from '@app/components/skills/skills';
import { LoadStatus, Profile } from '@app/models';
import { PortfolioApi } from '@app/services/portfolio-api';

/** Loads the profile once and hands each piece to the component that shows it. */
@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, Experience, Projects, Research, Skills, Background, Contact, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly api = inject(PortfolioApi);

  protected readonly LoadStatus = LoadStatus;
  protected readonly status = signal(LoadStatus.Loading);
  protected readonly profile = signal<Profile | null>(null);

  constructor() {
    this.api.getProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.status.set(LoadStatus.Ready);
      },
      error: () => this.status.set(LoadStatus.Failed),
    });
  }
}
