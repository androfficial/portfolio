export function setupSpotlights() {
  for (const card of document.querySelectorAll<HTMLElement>('[data-spotlight]')) {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    });
  }
}
