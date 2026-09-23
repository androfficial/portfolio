export type StrengthIcon = 'flow' | 'funnel' | 'layers' | 'gauge' | 'pulse' | 'stack';

export interface Strength {
  icon: StrengthIcon;
  title: string;
  text: string;
  proof: string;
}

export interface Principle {
  title: string;
  text: string;
  practice: string;
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
    proof: '5+ years',
  },
];

export const principles: Principle[] = [
  {
    title: 'Edge cases are part of the feature',
    text: 'Returns, recovery and fallbacks get the same care as the happy path.',
    practice:
      'Posbox: returns, deferred receipts and receipt recovery. FABU: fallback scenarios and session recovery in payments.',
  },
  {
    title: 'Measure, then iterate',
    text: 'Small changes, clear hypotheses and tracking that shows what actually worked.',
    practice:
      'FABU: A/B testing and systematic hypothesis validation with centralized tracking, about 15% higher conversion.',
  },
  {
    title: 'Build tools for the whole team',
    text: 'Good internal tools help product, content and development teams work better together.',
    practice:
      'SuitsMe: an internal CMS for product, content and development teams. Abz.agency: component libraries and UI guidelines.',
  },
  {
    title: 'Keep the codebase easy to change',
    text: 'Clear structure and shared conventions make every next feature cheaper.',
    practice: 'Posbox: API request handling refactor, localization restructure and standard frontend workflows.',
  },
];
