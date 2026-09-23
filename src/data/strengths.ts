import { profile } from './profile';

export type StrengthIcon = 'flow' | 'funnel' | 'layers' | 'gauge' | 'pulse' | 'stack';

export interface Strength {
  icon: StrengthIcon;
  title: string;
  text: string;
  proof: string;
}

export const strengths: Strength[] = [
  {
    icon: 'flow',
    title: 'Complex business flows',
    text: 'Checkout, fiscalization, refunds, subscriptions and loyalty logic, with the edge cases included.',
    proof: 'Posbox · FABU',
  },
  {
    icon: 'funnel',
    title: 'Funnels that convert',
    text: 'Quiz funnels, A/B tests and payment flows, judged by conversion and completed purchases.',
    proof: 'FABU',
  },
  {
    icon: 'layers',
    title: 'Scalable architecture',
    text: 'Clear component structure, standard state management, shared component libraries and UI guidelines.',
    proof: 'Abz.agency · Posbox',
  },
  {
    icon: 'gauge',
    title: 'Performance and rendering',
    text: 'Faster page loads, better Lighthouse and PageSpeed scores, smooth WebGL canvas rendering across devices.',
    proof: 'Abz.agency · SuitsMe',
  },
  {
    icon: 'pulse',
    title: 'Real-time features',
    text: 'Video calls, chat, live data updates and collaboration built on WebRTC and WebSocket.',
    proof: '4HUB · TeamCollab',
  },
  {
    icon: 'stack',
    title: 'Vue, React and Angular',
    text: 'Production work in all three: Vue with Nuxt, React with Next.js and Remix, Angular with RxJS and NgRx.',
    proof: `${profile.years} years`,
  },
];
