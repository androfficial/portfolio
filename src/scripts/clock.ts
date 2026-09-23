const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' };
const legacyTimeZones: Record<string, string> = { 'Europe/Kyiv': 'Europe/Kiev' };

function createFormatter(timeZone: string) {
  for (const zone of [timeZone, legacyTimeZones[timeZone]]) {
    if (!zone) continue;
    try {
      return new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: zone });
    } catch {}
  }
  return null;
}

export function syncCurrentYear() {
  const year = String(new Date().getFullYear());
  for (const element of document.querySelectorAll<HTMLElement>('[data-current-year]')) element.textContent = year;
}

export function startLocalClock() {
  const clock = document.querySelector<HTMLElement>('[data-local-clock]');
  const time = clock?.querySelector<HTMLTimeElement>('[data-local-time]');
  const formatter = clock?.dataset.timeZone ? createFormatter(clock.dataset.timeZone) : null;
  if (!clock || !time || !formatter) return;

  const render = () => {
    const now = new Date();
    time.textContent = formatter.format(now);
    time.dateTime = now.toISOString();
  };

  render();
  clock.hidden = false;
  window.setTimeout(
    () => {
      render();
      window.setInterval(render, 60_000);
    },
    60_000 - (Date.now() % 60_000),
  );
}
