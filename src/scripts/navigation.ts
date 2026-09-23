import { scrollToTarget } from './scroll-state';

const headerHideOffset = 0.6;
const scrollDelta = 4;

export function setupNavigation() {
  setupAnchorLinks();
  setupScrollState();
  setupActiveSection();
}

function setupAnchorLinks() {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-scroll-link]');
    if (!link || link.pathname !== window.location.pathname) return;

    const id = decodeURIComponent(link.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    document.dispatchEvent(new CustomEvent('menu:close'));
    const url = id === 'top' ? `${window.location.pathname}${window.location.search}` : `#${id}`;
    window.history.replaceState(null, '', url);
    scrollToTarget(target, () => target.focus({ preventScroll: true }));
  });
}

function setupScrollState() {
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('[data-header]');
  const backToTop = document.querySelector<HTMLElement>('[data-back-to-top]');
  const progressBar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  const progressTargets = [progressBar, backToTop].filter((element): element is HTMLElement => element !== null);
  let lastY = window.scrollY;
  let frame = 0;

  const update = () => {
    frame = 0;
    const y = window.scrollY;
    const viewport = window.innerHeight;
    const scrollable = root.scrollHeight - viewport;
    const progress = scrollable > 0 ? Math.min(1, y / scrollable).toFixed(4) : '0';
    for (const element of progressTargets) element.style.setProperty('--progress', progress);

    if (header) {
      header.dataset.scrolled = String(y > 24);
      const pinned = root.dataset.menuOpen === 'true' || header.contains(document.activeElement);
      if (pinned || y < viewport * headerHideOffset || y < lastY - scrollDelta) header.dataset.hidden = 'false';
      else if (y > lastY + scrollDelta) header.dataset.hidden = 'true';
    }

    if (backToTop) backToTop.dataset.visible = String(y > viewport);
    lastY = y;
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  header?.addEventListener('focusin', () => {
    header.dataset.hidden = 'false';
  });
  update();
}

function setupActiveSection() {
  const links = new Map<string, HTMLAnchorElement>();
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')) {
    if (link.dataset.navLink) links.set(link.dataset.navLink, link);
  }

  const indicator = document.querySelector<HTMLElement>('[data-nav-indicator]');
  const sections = ['top', ...links.keys()]
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null);
  if (sections.length === 0) return;

  let activeId = '';

  const render = () => {
    for (const [id, link] of links) {
      if (id === activeId) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    if (!indicator) return;
    const activeLink = links.get(activeId);
    indicator.dataset.visible = String(Boolean(activeLink));
    if (!activeLink) return;
    indicator.style.setProperty('--indicator-x', `${activeLink.offsetLeft}px`);
    indicator.style.setProperty('--indicator-width', `${activeLink.offsetWidth}px`);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId = entry.target.id;
      }
      render();
    },
    { rootMargin: '-45% 0px -54% 0px' },
  );

  for (const section of sections) observer.observe(section);
  window.addEventListener('resize', render);
  document.fonts?.ready.then(render);
}
