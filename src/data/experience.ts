import type { Period } from './profile';

export interface Project {
  name: string;
  kind?: string;
  text: string;
  caseId?: 'fabu' | 'posbox';
  stack: string[];
}

export interface Role {
  company: string;
  title: string;
  location: string;
  period: Period;
  projects: Project[];
}

export const roles: Role[] = [
  {
    company: 'Checkbox Group',
    title: 'Front-end Developer',
    location: 'Kyiv, Ukraine',
    period: { from: 'Jan 2026', to: 'Present' },
    projects: [
      {
        name: 'Posbox',
        kind: 'POS and retail management platform',
        text: 'Core modules for sales, fiscal operations, inventory, customer management and back-office workflows.',
        caseId: 'posbox',
        stack: ['Vue.js', 'Nuxt.js', 'Pinia', 'Vuetify', 'SCSS'],
      },
    ],
  },
  {
    company: 'w7g (ex SuitsMe), Genesis Tech',
    title: 'Front-end Developer',
    location: 'Kyiv, Ukraine',
    period: { from: 'Dec 2023', to: 'Oct 2025' },
    projects: [
      {
        name: 'FABU',
        kind: 'FemTech wellness app',
        text: 'Modular quiz platform, fast funnel experiments and payment flows with Solidgate.',
        caseId: 'fabu',
        stack: ['React', 'Remix', 'TypeScript', 'Tailwind CSS'],
      },
      {
        name: 'SuitsMe',
        kind: 'Mobile game',
        text: 'An internal CMS that improved collaboration between product, content and development teams. Responsive web game interfaces with WebGL-based canvas rendering, smooth performance and consistent visuals across devices.',
        stack: ['Vue.js', 'TypeScript', 'Vuex', 'Vuetify', 'Tailwind CSS', 'Vite'],
      },
    ],
  },
  {
    company: 'GetWin',
    title: 'Front-end Developer',
    location: 'Kyiv, Ukraine',
    period: { from: 'Aug 2022', to: 'Nov 2023' },
    projects: [
      {
        name: '4HUB',
        kind: 'Team collaboration platform',
        text: 'Video calls, chat and real-time collaboration, so teams can work without third-party tools. File management with upload progress and activity monitoring that reduced upload errors and prevented data loss. Task scheduling, Kanban boards and analytics dashboards.',
        stack: ['React', 'TypeScript', 'Redux', 'WebRTC', 'WebSocket', 'Chart.js', 'Jest'],
      },
      {
        name: 'TeamCollab',
        kind: 'Internal admin portal',
        text: 'An admin panel for users, files and projects, with role-based access control, real-time data updates and user activity analytics.',
        stack: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Angular Material'],
      },
    ],
  },
  {
    company: 'Abz.agency',
    title: 'Front-end Developer',
    location: 'Kyiv, Ukraine',
    period: { from: 'Aug 2021', to: 'Jul 2022' },
    projects: [
      {
        name: 'Agency projects',
        text: 'Front-end architecture and standard state management across projects. Initiated component libraries and internal UI guidelines that cut development time for new projects. Built SPAs, server-rendered sites, admin panels, mobile apps and browser extensions, and improved load time, Lighthouse and PageSpeed scores.',
        stack: ['React', 'Vue', 'Angular', 'Next.js', 'TypeScript', 'Cypress'],
      },
    ],
  },
];
