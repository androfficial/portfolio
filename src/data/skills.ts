export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SkillHighlight {
  name: string;
  note: string;
}

export const skillHighlights: SkillHighlight[] = [
  { name: 'Vue.js', note: '3+ years' },
  { name: 'Nuxt 3', note: 'In production' },
  { name: 'React', note: 'Next.js and Remix' },
  { name: 'Angular', note: 'RxJS and NgRx' },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frameworks',
    items: ['Vue.js', 'Nuxt.js', 'React', 'Next.js', 'Remix', 'Angular', 'React Native (Expo)'],
  },
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    title: 'State and data',
    items: ['Pinia', 'Vuex', 'Redux', 'Redux Toolkit', 'RTK Query', 'NgRx', 'RxJS', 'REST APIs', 'WebSocket', 'WebRTC'],
  },
  {
    title: 'Styling and UI',
    items: [
      'Tailwind CSS',
      'SASS/SCSS',
      'CSS Modules',
      'Styled Components',
      'Vuetify',
      'Material UI',
      'Angular Material',
      'Bootstrap',
      'Storybook',
      'Figma',
    ],
  },
  {
    title: 'Testing',
    items: ['Jest', 'React Testing Library', 'Vue Test Utils', 'Cypress', 'Jasmine', 'Karma'],
  },
  {
    title: 'Build and delivery',
    items: ['Vite', 'Webpack', 'Git', 'GitLab', 'Bitbucket', 'GitHub Actions', 'Bitbucket Pipelines', 'TeamCity'],
  },
  {
    title: 'Product analytics',
    items: ['GTM', 'Amplitude', 'Userflow', 'Chart.js', 'ApexCharts'],
  },
  {
    title: 'Also worked with',
    items: ['Node.js', 'Express.js', 'Socket.IO'],
  },
];

export const marqueeItems = [
  'Vue.js',
  'Nuxt.js',
  'React',
  'Next.js',
  'Remix',
  'Angular',
  'TypeScript',
  'Pinia',
  'Redux Toolkit',
  'RxJS',
  'Tailwind CSS',
  'Vite',
  'WebRTC',
  'WebSocket',
];

export const knowsAbout = [
  'Frontend development',
  'Vue.js',
  'Nuxt.js',
  'React',
  'Next.js',
  'Remix',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Web performance',
  'Payment flows',
  'Conversion funnels',
  'POS systems',
];
