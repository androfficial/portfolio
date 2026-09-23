import { gsap } from 'gsap';

export function setupTimelineRail() {
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  const rail = timeline?.querySelector<HTMLElement>('[data-timeline-rail]');
  if (!timeline || !rail) return;

  gsap.fromTo(
    rail,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: timeline, start: 'top 75%', end: 'bottom 75%', scrub: 0.4 },
    },
  );
}
