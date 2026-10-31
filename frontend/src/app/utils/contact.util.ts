import { CONTACT_ERROR_MESSAGES, CONTACT_FALLBACK_ERROR } from '@app/constants/contact.constants';

export function contactErrorMessage(status: number): string {
  return CONTACT_ERROR_MESSAGES[status] ?? CONTACT_FALLBACK_ERROR;
}
