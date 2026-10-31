/** Body of POST /api/contact. Mirrors ContactRequest.java. */
export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  /** Honeypot. Real visitors never see this field, so it must stay empty. */
  readonly website: string;
}

/** The fields a visitor actually fills in. */
export type ContactField = 'name' | 'email' | 'message';
