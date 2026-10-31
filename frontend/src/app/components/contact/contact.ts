import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContactForm } from '@app/components/contact-form/contact-form';
import { Reveal } from '@app/directives/reveal.directive';
import { Links, SectionId } from '@app/models';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  readonly links = input.required<Links>();

  protected readonly id = SectionId.Contact;
}
