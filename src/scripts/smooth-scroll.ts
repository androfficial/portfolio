import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { setSmoothScroller } from './scroll-state';

export function startSmoothScroll(): () => void {
  const lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
  const tick = (time: number) => lenis.raf(time * 1000);

  lenis.on('scroll', () => ScrollTrigger.update());
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  setSmoothScroller(lenis);

  return () => {
    setSmoothScroller(null);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
  };
}
