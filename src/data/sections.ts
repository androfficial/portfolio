import { formatIndex } from '../utils/format';

export type SectionId = 'work' | 'strengths' | 'approach' | 'experience' | 'skills' | 'contact';

export interface Section {
  id: SectionId;
  label: string;
  eyebrow?: string;
  title: string;
  intro: string;
}

export const sections: Section[] = [
  {
    id: 'work',
    label: 'Work',
    eyebrow: 'Selected work',
    title: 'Two products, two very different kinds of complexity.',
    intro:
      'Both are commercial products with private code, so the visuals here are abstract diagrams of the product flows, not screenshots.',
  },
  {
    id: 'strengths',
    label: 'Strengths',
    title: 'Where I add the most value.',
    intro: 'Six things I do well, each backed by a real project from the last five years.',
  },
  {
    id: 'approach',
    label: 'Approach',
    title: 'How I work with product teams.',
    intro: 'The frontend is where product decisions meet real users. These habits help me get that part right.',
  },
  {
    id: 'experience',
    label: 'Experience',
    title: 'From agency projects to product platforms.',
    intro:
      'Four teams since 2021: agency work, a collaboration platform, growth funnels and a mobile game, and now a POS platform.',
  },
  {
    id: 'skills',
    label: 'Skills',
    title: 'Stack and tools.',
    intro: 'Vue and React are my main tools. I have also built an internal admin portal in Angular.',
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Let’s talk.',
    intro: 'The quickest way to reach me is LinkedIn or Telegram. My public code is on GitHub.',
  },
];

export function getSection(id: SectionId) {
  const position = sections.findIndex((section) => section.id === id);
  const section = sections[position];
  if (!section) throw new Error(`Unknown section: ${id}`);
  return {
    ...section,
    index: formatIndex(position + 1),
    eyebrow: section.eyebrow ?? section.label,
    titleId: `${section.id}-title`,
  };
}

export type SectionView = ReturnType<typeof getSection>;
