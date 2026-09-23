import { motionToggleEvent } from './events';

export const motionStorageKey = 'motion';
export const pausedMotion = 'paused';

export function isMotionPaused() {
  return document.documentElement.dataset.motion === pausedMotion;
}

export function setupMotionToggle() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
  const label = toggle?.querySelector<HTMLElement>('[data-motion-label]');
  if (!toggle || !label) return;

  const render = () => {
    const text = isMotionPaused() ? 'Play animations' : 'Pause animations';
    label.textContent = text;
    toggle.title = text;
  };

  toggle.addEventListener('click', () => {
    const paused = !isMotionPaused();
    if (paused) document.documentElement.dataset.motion = pausedMotion;
    else delete document.documentElement.dataset.motion;
    try {
      localStorage.setItem(motionStorageKey, paused ? pausedMotion : 'playing');
    } catch {}
    render();
    document.dispatchEvent(new Event(motionToggleEvent));
  });

  render();
}
