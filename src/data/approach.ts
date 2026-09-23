export interface Principle {
  title: string;
  text: string;
  practice: string;
}

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
