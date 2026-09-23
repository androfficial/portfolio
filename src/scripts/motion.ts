import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { setupParallax } from './parallax';
import { setupPointerMotion } from './pointer';
import { setupReveals } from './reveal';
import { startSmoothScroll } from './smooth-scroll';
import { setupTimelineRail } from './timeline-rail';
import { setupVisualEntrances } from './visuals';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

export function startMotion() {
  const media = gsap.matchMedia();

  media.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      finePointer: '(hover: hover) and (pointer: fine)',
    },
    (context) => {
      const { motion = false, finePointer = false } = context.conditions ?? {};
      if (!motion) return;

      const cleanups: Array<() => void> = [];
      if (finePointer) cleanups.push(startSmoothScroll(), setupPointerMotion());
      setupReveals();
      setupParallax();
      setupTimelineRail();
      setupVisualEntrances();
      ScrollTrigger.refresh();

      return () => {
        for (const cleanup of cleanups) cleanup();
      };
    },
  );

  document.fonts?.addEventListener('loadingdone', () => ScrollTrigger.refresh());
}
