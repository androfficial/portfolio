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
}

function setupHeroParallax() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const layers: Array<[string, gsap.TweenVars]> = [
    ['[data-hero-backdrop]', { yPercent: 24 }],
    ['[data-hero-grid]', { yPercent: -12 }],
    ['[data-hero-content]', { y: -90, opacity: 0.3 }],
  ];
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: scrubBetween(hero, 'top top') });
  for (const [selector, vars] of layers) {
    const layer = hero.querySelector(selector);
    if (layer) timeline.to(layer, vars, 0);
  }
}
