import type { Metric, Period } from './types';

export interface ContactLink {
  id: 'linkedin' | 'telegram' | 'github';
  label: string;
  href: string;
}

export interface Degree {
  degree: string;
  field: string;
  period: Period;
}

export interface Education {
  school: string;
  city: string;
  degrees: Degree[];
}

export interface Language {
  name: string;
  code: string;
  level: string;
}

export interface HeadlinePart {
  text: string;
  tone?: 'teal' | 'coral';
}

const experienceYears = 5;
const years = `${experienceYears}+`;

export const profile = {
  name: 'Andrii Nakonechnyi',
  firstName: 'Andrii',
  lastName: 'Nakonechnyi',
  role: 'Frontend Developer',
  city: 'Kyiv',
  country: 'Ukraine',
  countryCode: 'UA',
  timeZone: 'Europe/Kyiv',
  years,
  lead: `Frontend Developer with ${years} years of experience in production web apps. I build checkout and payment flows, marketing funnels, and POS and retail platforms.`,
  stackLine: ['Vue', 'Nuxt', 'React', 'Next.js', 'Angular', 'TypeScript'],
  metaTitle: 'Andrii Nakonechnyi · Frontend Developer',
  metaDescription: `Frontend Developer in Kyiv, ${years} years in production: checkout and payment flows, quiz funnels, POS and retail platforms. Vue, Nuxt, React, Angular.`,
} as const;

export const experienceMetric: Metric = {
  value: experienceYears,
  prefix: '',
  suffix: '+',
  label: 'years building production web apps',
  spoken: `More than ${experienceYears} years building production web apps`,
};

export const headline: HeadlinePart[] = [
  { text: 'I turn complex business logic into' },
  { text: 'clear,', tone: 'teal' },
  { text: 'fast', tone: 'coral' },
  { text: 'interfaces.' },
];

export const contacts: ContactLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrii-nkn/' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/MistrixOreo' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/androfficial' },
];

export const languages: Language[] = [
  { name: 'Ukrainian', code: 'uk', level: 'Native' },
  { name: 'English', code: 'en', level: 'B1, Intermediate' },
];

export const education: Education = {
  school: 'National Academy of the Security Service of Ukraine',
  city: 'Kyiv',
  degrees: [
    {
      degree: 'Master of National Security',
      field: 'Cybersecurity, State Security in Information Sphere',
      period: { from: '2021', to: '2023' },
    },
    {
      degree: 'Bachelor of Management',
      field: 'Management of Restricted Information Security',
      period: { from: '2017', to: '2021' },
    },
  ],
};

export function findContact(id: ContactLink['id']): ContactLink {
  const contact = contacts.find((item) => item.id === id);
  if (!contact) throw new Error(`Unknown contact: ${id}`);
  return contact;
}
