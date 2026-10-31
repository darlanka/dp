// These interfaces mirror the Java records in backend/.../profile/Profile.java one to one.
// If a field changes on the backend, change it here first and let the compiler show what breaks.

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly tagline: string;
  readonly focus: string;
  readonly about: readonly string[];
  readonly links: Links;
  readonly experience: readonly Job[];
  readonly projects: readonly Project[];
  readonly research: readonly Research[];
  readonly skills: readonly SkillGroup[];
  readonly education: Education;
  readonly achievements: readonly string[];
  readonly metrics: readonly Metric[];
}

export interface Links {
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
}

export interface Job {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly summary?: string | null;
  readonly highlights: readonly string[];
  readonly certificate?: Certificate | null;
}

export interface Certificate {
  readonly label: string;
  readonly src: string;
}

export interface Project {
  readonly title: string;
  /** Where the work happened, shown as a tag on the slide. */
  readonly context: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  /** Pipeline shown as an animated flow when there are no screenshots. */
  readonly steps: readonly string[];
  readonly images: readonly ProjectImage[];
  readonly links: readonly ProjectLink[];
}

export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

export interface ProjectLink {
  readonly label: string;
  readonly url: string;
}

export interface Research {
  readonly title: string;
  readonly stack: string;
  readonly venue: string;
  readonly highlights: readonly string[];
}

export interface SkillGroup {
  readonly label: string;
  readonly items: readonly string[];
}

export interface Education {
  readonly school: string;
  readonly degree: string;
  readonly period: string;
  readonly score: string;
}

export interface Metric {
  readonly tag: string;
  readonly label: string;
  readonly value: number;
  readonly prefix: string;
  readonly suffix: string;
}
