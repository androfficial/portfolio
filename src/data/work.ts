import type { Period } from './profile';

export interface Metric {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  spoken: string;
}

export interface Highlight {
  title: string;
  text?: string;
  items?: string[];
}

export interface CaseStudy {
  id: 'fabu' | 'posbox';
  index: string;
  name: string;
  kind: string;
  title: string;
  company: string;
  role: string;
  period: Period;
  context: string;
  highlights: Highlight[];
  metrics: Metric[];
  outcome?: string;
  stack: string[];
  visualLabel: string;
}

export const fabuMetrics: Metric[] = [
  {
    value: 80,
    prefix: '',
    suffix: '%+',
    label: 'of product traffic went through the quiz platform',
    spoken: 'Over 80 percent of product traffic went through the quiz platform',
  },
  {
    value: 15,
    prefix: '~',
    suffix: '%',
    label: 'higher conversion from fast funnel iteration and A/B tests',
    spoken: 'About 15 percent higher conversion from fast funnel iteration and A/B tests',
  },
  {
    value: 20,
    prefix: '~',
    suffix: '%',
    label: 'fewer incomplete purchases after the payment flow work',
    spoken: 'About 20 percent fewer incomplete purchases after the payment flow work',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'fabu',
    index: '01',
    name: 'FABU',
    kind: 'FemTech wellness app',
    title: 'Quiz funnels and payments for a subscription wellness app.',
    company: 'w7g (ex SuitsMe), Genesis Tech',
    role: 'Front-end Developer',
    period: { from: 'Dec 2023', to: 'Oct 2025' },
    context:
      'FABU acquires users through Facebook, AppLovin and Google Ads traffic. Most of that traffic lands in the quiz platform, and the payment flows turn it into subscriptions.',
    highlights: [
      {
        title: 'Modular quiz platform',
        text: 'Personalized acquisition flows for Facebook, AppLovin and Google Ads traffic.',
      },
      {
        title: 'Fast experiments',
        text: 'Fast funnel iteration, A/B testing and systematic hypothesis validation.',
      },
      {
        title: 'Payments and monetization',
        text: 'Solidgate integration with fallback scenarios, session recovery, upsells and subscriptions.',
      },
      {
        title: 'Compliance and tracking',
        text: 'GDPR and CCPA compliance and centralized tracking across the funnel.',
      },
    ],
    metrics: fabuMetrics,
    stack: ['React', 'Remix', 'TypeScript', 'Tailwind CSS', 'Vite', 'TeamCity'],
    visualLabel:
      'Abstract diagram: traffic from Facebook, AppLovin and Google Ads flows through quiz steps with an A and B variant into checkout, upsell and subscription.',
  },
  {
    id: 'posbox',
    index: '02',
    name: 'Posbox',
    kind: 'POS and retail management platform',
    title: 'Checkout, fiscalization and back office for retail teams.',
    company: 'Checkbox Group',
    role: 'Front-end Developer',
    period: { from: 'Jan 2026', to: 'Present' },
    context:
      'A production POS and retail management platform. It covers sales, fiscal operations, inventory, customer management and back-office workflows.',
    highlights: [
      {
        title: 'Checkout and payments',
        items: [
          'Sales and returns',
          'Deferred receipts',
          'Cashier operations',
          'Shift management',
          'Receipt recovery',
          'Mixed payments',
          'Certificates',
          'IBAN',
          'Monobank integrations',
          'Refunds',
          'Fiscal cash rounding',
        ],
      },
      {
        title: 'Loyalty and CRM',
        items: [
          'Loyalty levels',
          'Gifts',
          'Client segmentation',
          'Bonus flows',
          'Client import and export',
          'Purchase history',
          'Promotions',
          'Discounts',
        ],
      },
      {
        title: 'Inventory and documents',
        items: [
          'Product catalog',
          'Barcode scanning',
          'Stock validation',
          'Supplies',
          'Waybills',
          'Manufacturing',
          'Online order documents',
          'Print-ready templates',
        ],
      },
      {
        title: 'Platform health',
        items: [
          'API request handling refactor',
          'Localization restructure',
          'Unused i18n keys removed',
          'Standard frontend workflows',
          'Multi-market product behavior',
        ],
      },
    ],
    metrics: [],
    outcome:
      'A more reliable platform that is easier to maintain, with frontend support for product behavior in more than one market.',
    stack: [
      'Vue.js',
      'Nuxt.js',
      'JavaScript',
      'Pinia',
      'Vuetify',
      'Pug',
      'SCSS',
      'Lodash',
      'Moment.js',
      'Big.js',
      'ApexCharts',
      'EUSignCP',
      'GTM',
      'Amplitude',
      'Userflow',
      'GitLab',
    ],
    visualLabel:
      'Abstract diagram: a printed receipt at the center, connected to checkout, fiscalization, payments, loyalty, inventory and documents modules.',
  },
];
