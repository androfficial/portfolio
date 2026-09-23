import { gsap } from 'gsap';

function scrubBetween(trigger: Element, start = 'top bottom', end = 'bottom top') {
  return { trigger, start, end, scrub: true };
}

export function setupParallax() {
  setupHeroParallax();

  for (const element of document.querySelectorAll<HTMLElement>('[data-parallax]')) {
    const speed = Number(element.dataset.parallax) || 0.2;
    gsap.fromTo(
      element,
      { yPercent: -speed * 40 },
      { yPercent: speed * 40, ease: 'none', scrollTrigger: scrubBetween(element.parentElement ?? element) },
    );
  }

  for (const layer of document.querySelectorAll<SVGGElement>('[data-depth]')) {
    const depth = Number(layer.dataset.depth) || 0;
    const visual = layer.closest('[data-case-visual]') ?? layer;
    gsap.fromTo(layer, { y: depth * 36 }, { y: depth * -36, ease: 'none', scrollTrigger: scrubBetween(visual) });
  }

  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  const rail = timeline?.querySelector<HTMLElement>('[data-timeline-rail]');
  if (timeline && rail) {
    gsap.fromTo(
      rail,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: '50% 0%',
        scrollTrigger: { trigger: timeline, start: 'top 75%', end: 'bottom 75%', scrub: 0.4 },
      },
    );
  }
}

function setupHeroParallax() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const backdrop = hero.querySelector<HTMLElement>('[data-hero-backdrop]');
  const grid = hero.querySelector<HTMLElement>('[data-hero-grid]');
  const content = hero.querySelector<HTMLElement>('[data-hero-content]');

  if (backdrop) gsap.to(backdrop, { yPercent: 24, ease: 'none', scrollTrigger: scrubBetween(hero, 'top top') });
  if (grid) gsap.to(grid, { yPercent: -12, ease: 'none', scrollTrigger: scrubBetween(hero, 'top top') });
  if (content) gsap.to(content, { y: -90, opacity: 0.3, ease: 'none', scrollTrigger: scrubBetween(hero, 'top top') });
}
