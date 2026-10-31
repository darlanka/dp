import { NavItem, SectionId } from '@app/models';

export const NAV_ITEMS: readonly NavItem[] = [
  { id: SectionId.About, label: 'About' },
  { id: SectionId.Experience, label: 'Experience' },
  { id: SectionId.Projects, label: 'Projects' },
  { id: SectionId.Research, label: 'Research' },
  { id: SectionId.Skills, label: 'Skills' },
  { id: SectionId.Contact, label: 'Contact' },
];
