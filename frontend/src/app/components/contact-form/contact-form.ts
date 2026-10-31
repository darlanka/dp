import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT_LIMITS } from '@app/constants/contact.constants';
import { ContactField, SendState } from '@app/models';
import { PortfolioApi } from '@app/services/portfolio-api';
import { contactErrorMessage } from '@app/utils/contact.util';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly api = inject(PortfolioApi);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly SendState = SendState;
  protected readonly limits = CONTACT_LIMITS;
  protected readonly state = signal(SendState.Idle);
  protected readonly errorText = signal('');

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(CONTACT_LIMITS.nameMax)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(CONTACT_LIMITS.emailMax)]],
    message: ['', [Validators.required, Validators.minLength(CONTACT_LIMITS.messageMin), Validators.maxLength(CONTACT_LIMITS.messageMax)]],
    website: [''],
  });

  protected showError(field: ContactField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set(SendState.Sending);
    this.api.sendMessage(this.form.getRawValue()).subscribe({
      next: () => {
        this.state.set(SendState.Sent);
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.errorText.set(contactErrorMessage(err.status));
        this.state.set(SendState.Failed);
      },
    });
  }
}
