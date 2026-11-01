/** Ids of the page sections. Used for anchors, nav links and element ids. */
export enum SectionId {
  Top = 'top',
  About = 'about',
  Experience = 'experience',
  Projects = 'projects',
  Research = 'research',
  Skills = 'skills',
  Background = 'background',
  Contact = 'contact',
}

/** State of the initial GET /api/profile request. */
export enum LoadStatus {
  Loading = 'loading',
  Ready = 'ready',
  Failed = 'failed',
}

/** State of the contact form submission. */
export enum SendState {
  Idle = 'idle',
  Sending = 'sending',
  Sent = 'sent',
  Failed = 'failed',
}

/** Only the HTTP codes this app reacts to. */
export enum HttpStatus {
  BadRequest = 400,
  TooManyRequests = 429,
}

export enum PreviewState {
  Idle = 'idle',
  Loading = 'loading',
  Live = 'live',
  TimedOut = 'timed-out',
}