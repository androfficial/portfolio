export interface ContactLink {
  id: 'linkedin' | 'telegram' | 'github';
  label: string;
  handle: string;
  href: string;
}

export interface Period {
  from: string;
  to: string;
}

export interface Education {
  degree: string;
  field: string;
  school: string;
  city: string;
  period: Period;
}

export interface Language {
  name: string;
  level: string;
}

export interface HeadlinePart {
  text: string;
  tone?: 'teal' | 'coral';
}

export const profile = {
  name: 'Andrii Nakonechnyi',
  firstName: 'Andrii',
  lastName: 'Nakonechnyi',
  role: 'Frontend Developer',
  city: 'Kyiv',
  country: 'Ukraine',
  countryCode: 'UA',
  timeZone: 'Europe/Kyiv',
  years: '5+',
  lead: 'Frontend Developer with 5+ years of experience in production web apps. I build checkout and payment flows, marketing funnels, and POS and retail platforms.',
  stackLine: ['Vue', 'Nuxt', 'React', 'Next.js', 'Angular', 'TypeScript'],
  metaTitle: 'Andrii Nakonechnyi · Frontend Developer',
  metaDescription:
    'Frontend Developer in Kyiv, 5+ years in production: checkout and payment flows, quiz funnels, POS and retail platforms. Vue, Nuxt, React, Angular.',
} as const;

export const headline: HeadlinePart[] = [
  { text: 'I turn complex business logic into' },
  { text: 'clear,', tone: 'teal' },
  { text: 'fast', tone: 'coral' },
  { text: 'interfaces.' },
];

export const contacts: ContactLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/andrii-nkn',
    href: 'https://www.linkedin.com/in/andrii-nkn/',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    handle: '@MistrixOreo',
    href: 'https://t.me/MistrixOreo',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'androfficial',
    href: 'https://github.com/androfficial',
  },
];

export const languages: Language[] = [
  { name: 'Ukrainian', level: 'Native' },
  { name: 'English', level: 'B1, Intermediate' },
];

export const education: Education[] = [
  {
    degree: 'Master of National Security',
    field: 'Cybersecurity, State Security in Information Sphere',
    school: 'National Academy of the Security Service of Ukraine',
    city: 'Kyiv',
    period: { from: '2021', to: '2023' },
  },
  {
    degree: 'Bachelor of Management',
    field: 'Management of Restricted Information Security',
    school: 'National Academy of the Security Service of Ukraine',
    city: 'Kyiv',
    period: { from: '2017', to: '2021' },
  },
];

export function findContact(id: ContactLink['id']): ContactLink {
  const contact = contacts.find((item) => item.id === id);
  if (!contact) throw new Error(`Unknown contact: ${id}`);
  return contact;
}
