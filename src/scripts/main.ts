import { startKyivClock } from './clock';
import { setupMenu } from './menu';
import { setupMotionToggle } from './motion-toggle';
import { setupNavigation } from './navigation';
import { setupSpotlights } from './spotlight';
import { watchVisualLoops } from './visual-loops';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let motionRequested = false;

function whenIdle(task: () => void) {
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(task, { timeout: 1500 });
  else setTimeout(task, 300);
}

function loadMotion() {
  if (motionRequested || reducedMotion.matches) return;
  motionRequested = true;
  whenIdle(() => {
    import('./motion').then(({ startMotion }) => startMotion());
  });
}

function loadAurora() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-aurora]');
  if (!canvas) return;
  whenIdle(() => {
    import('./aurora').then(({ startAurora }) => startAurora(canvas));
  });
}

setupNavigation();
setupMenu();
setupMotionToggle();
startKyivClock();
watchVisualLoops();
if (finePointer.matches) setupSpotlights();
loadAurora();
loadMotion();
reducedMotion.addEventListener('change', loadMotion);
