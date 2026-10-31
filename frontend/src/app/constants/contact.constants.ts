import { HttpStatus } from '@app/models';

/** Keep these equal to the validation annotations in ContactRequest.java. */
export const CONTACT_LIMITS = {
  nameMax: 80,
  emailMax: 120,
  messageMin: 10,
  messageMax: 2000,
} as const;

export const CONTACT_ERROR_MESSAGES: Readonly<Record<number, string>> = {
  [HttpStatus.BadRequest]: 'The server rejected the message. Check the fields and try again.',
  [HttpStatus.TooManyRequests]: 'Too many messages from this connection. Try again in an hour or email me directly.',
};

export const CONTACT_FALLBACK_ERROR = 'The message did not go through. Try again, or email me directly.';
