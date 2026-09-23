import { gsap } from 'gsap';
import { isBelowFold } from './viewport';

const entrances: Record<string, gsap.TweenVars> = {
  fade: { opacity: 0 },
  rise: { opacity: 0, y: 26 },
  drop: { opacity: 0, y: -16 },
  slide: { opacity: 0, x: -18 },
  'slide-back': { opacity: 0, x: 18 },
  draw: { strokeDashoffset: 1, duration: 1.1, ease: 'power2.inOut' },
  grow: { scaleX: 0, transformOrigin: '0% 50%', duration: 1.2 },
  print: { attr: { height: 0 }, duration: 1.8, ease: 'power2.inOut' },
};

export function setupVisualEntrances() {
  for (const visual of document.querySelectorAll<SVGSVGElement>('[data-visual]')) {
    if (!isBelowFold(visual)) continue;

    const entrance = gsap.timeline({
      defaults: { duration: 0.9, ease: 'expo.out' },
      scrollTrigger: { trigger: visual, start: 'top 78%', once: true },
    });

    for (const element of visual.querySelectorAll<SVGElement>('[data-enter]')) {
      const from = entrances[element.dataset.enter ?? ''];
      if (!from) continue;
      entrance.from(element, { ...from }, Number(element.dataset.enterAt ?? 0));
    }
  }
}
