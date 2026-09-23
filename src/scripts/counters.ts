import { gsap } from 'gsap';

export function countUp(counter: HTMLElement, vars: gsap.TweenVars = {}) {
  return gsap.from(counter, {
    textContent: 0,
    duration: 1.8,
    ease: 'power3.out',
    snap: { textContent: 1 },
    ...vars,
  });
}
