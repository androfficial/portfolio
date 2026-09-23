const storageKey = 'motion';

export function isMotionPaused() {
  return document.documentElement.dataset.motion === 'paused';
}

export function setupMotionToggle() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
  if (!toggle) return;

  const render = () => {
    const paused = isMotionPaused();
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.title = paused ? 'Play animations' : 'Pause animations';
  };

  toggle.addEventListener('click', () => {
    const paused = !isMotionPaused();
    if (paused) document.documentElement.dataset.motion = 'paused';
    else delete document.documentElement.dataset.motion;
    try {
      localStorage.setItem(storageKey, paused ? 'paused' : 'playing');
    } catch {}
    render();
    document.dispatchEvent(new CustomEvent('motion:toggle'));
  });

  render();
}
