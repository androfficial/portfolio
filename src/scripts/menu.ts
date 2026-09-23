import { menuCloseEvent } from './events';
import { setScrollLocked } from './scroll-state';

export function setupMenu() {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!menu || typeof menu.showPopover !== 'function') return;

  const background = Array.from(document.body.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement && element !== menu,
  );
  const desktop = window.matchMedia('(min-width: 64rem)');

  const setOpenState = (open: boolean) => {
    for (const element of background) element.inert = open;
    setScrollLocked(open);
    document.documentElement.dataset.menuOpen = String(open);
  };

  menu.addEventListener('beforetoggle', (event) => {
    if ((event as ToggleEvent).newState === 'closed') setOpenState(false);
  });

  menu.addEventListener('toggle', (event) => {
    if ((event as ToggleEvent).newState !== 'open') return;
    setOpenState(true);
    menu.querySelector<HTMLElement>('nav a')?.focus();
  });

  const close = () => {
    if (menu.matches(':popover-open')) menu.hidePopover();
  };

  document.addEventListener(menuCloseEvent, close);
  desktop.addEventListener('change', (event) => {
    if (event.matches) close();
  });
}
