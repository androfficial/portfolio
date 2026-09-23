import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { countUp } from './counters';
import { isBelowFold } from './viewport';

export function setupReveals() {
  revealGroups();
  revealSingles();
  revealHeadings();
  revealLines();
  revealCounters();
}

function revealGroups() {
  for (const group of document.querySelectorAll<HTMLElement>('[data-reveal-group]')) {
    if (!isBelowFold(group)) continue;
    const items = Array.from(group.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      (item) => item.parentElement?.closest('[data-reveal-group]') === group,
    );
    if (items.length === 0) continue;
    gsap.from(items, {
      opacity: 0,
      y: 32,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      clearProps: 'transform',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  }
}

function revealSingles() {
  const singles = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
    (item) => !item.parentElement?.closest('[data-reveal-group]') && isBelowFold(item),
  );
  for (const item of singles) {
    gsap.from(item, {
      opacity: 0,
      y: 28,
      duration: 1,
      ease: 'expo.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: item, start: 'top 88%', once: true },
    });
  }
}

function revealHeadings() {
  for (const heading of document.querySelectorAll<HTMLElement>('[data-split]')) {
    if (!isBelowFold(heading)) continue;
    SplitText.create(heading, {
      type: 'lines',
      linesClass: 'split-line',
      mask: 'lines',
      aria: 'auto',
      autoSplit: true,
      onSplit: (split) =>
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
        }),
    });
  }
}

function revealLines() {
  for (const line of document.querySelectorAll<HTMLElement>('[data-line]')) {
    if (!isBelowFold(line)) continue;
    gsap.from(line, {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: 1.4,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: line, start: 'top 90%', once: true },
    });
  }
}

function revealCounters() {
  for (const counter of document.querySelectorAll<HTMLElement>('[data-count]')) {
    if (!isBelowFold(counter)) continue;
    countUp(counter, { scrollTrigger: { trigger: counter, start: 'top 92%', once: true } });
  }
}
