import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

type Cleanup = () => void;

function listen<T extends Event>(target: EventTarget, type: string, handler: (event: T) => void): Cleanup {
  const listener = handler as EventListener;
  target.addEventListener(type, listener);
  return () => target.removeEventListener(type, listener);
}

function combine(cleanups: Cleanup[]): Cleanup {
  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

export function setupPointerMotion(): Cleanup {
  return combine([setupMagnetic(), setupTilt(), setupProximity()]);
}

function setupMagnetic(): Cleanup {
  return combine(
    Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]')).flatMap((element) => {
      const moveX = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' });
      const moveY = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });
      return [
        listen<PointerEvent>(element, 'pointermove', (event) => {
          const rect = element.getBoundingClientRect();
          moveX((event.clientX - rect.left - rect.width / 2) * 0.3);
          moveY((event.clientY - rect.top - rect.height / 2) * 0.4);
        }),
        listen(element, 'pointerleave', () => {
          moveX(0);
          moveY(0);
        }),
      ];
    }),
  );
}

function setupTilt(): Cleanup {
  return combine(
    Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]')).flatMap((card) => {
      gsap.set(card, { transformPerspective: 1200 });
      const tiltX = gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3.out' });
      const tiltY = gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3.out' });
      return [
        listen<PointerEvent>(card, 'pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          tiltY(((event.clientX - rect.left) / rect.width - 0.5) * 7);
          tiltX(-((event.clientY - rect.top) / rect.height - 0.5) * 6);
        }),
        listen(card, 'pointerleave', () => {
          tiltX(0);
          tiltY(0);
        }),
      ];
    }),
  );
}

function setupProximity(): Cleanup {
  return combine(
    Array.from(document.querySelectorAll<HTMLElement>('[data-proximity]')).flatMap((title) => {
      const split = SplitText.create(title, { type: 'chars', charsClass: 'proximity-char', aria: 'auto' });
      const chars = split.chars as HTMLElement[];
      const glow = chars.map((char) => gsap.quickTo(char, '--proximity', { duration: 0.45, ease: 'power2.out' }));
      const lift = chars.map((char) => gsap.quickTo(char, 'yPercent', { duration: 0.6, ease: 'power3.out' }));
      const zone = title.closest('section') ?? title;

      return [
        listen<PointerEvent>(zone, 'pointermove', (event) => {
          const reach = title.getBoundingClientRect().height * 1.4;
          chars.forEach((char, index) => {
            const rect = char.getBoundingClientRect();
            const distance = Math.hypot(
              event.clientX - (rect.left + rect.width / 2),
              event.clientY - (rect.top + rect.height / 2),
            );
            const influence = Math.max(0, 1 - distance / reach);
            glow[index]?.(influence);
            lift[index]?.(-influence * 8);
          });
        }),
        listen(zone, 'pointerleave', () => {
          for (const setGlow of glow) setGlow(0);
          for (const setLift of lift) setLift(0);
        }),
      ];
    }),
  );
}
