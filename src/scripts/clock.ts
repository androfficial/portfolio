const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' };

function createKyivFormatter() {
  try {
    return new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'Europe/Kyiv' });
  } catch {
    return new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'Europe/Kiev' });
  }
}

export function startKyivClock() {
  const clock = document.querySelector<HTMLElement>('[data-kyiv-clock]');
  const time = clock?.querySelector<HTMLTimeElement>('[data-kyiv-time]');
  if (!clock || !time) return;

  const formatter = createKyivFormatter();
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
