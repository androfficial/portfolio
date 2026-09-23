import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setSmoothScroller(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTarget(target: HTMLElement, onArrive: () => void) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.3, onComplete: onArrive });
    return;
  }
  target.scrollIntoView({ block: 'start' });
  onArrive();
}

export function setScrollLocked(locked: boolean) {
  document.documentElement.classList.toggle('scroll-locked', locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
