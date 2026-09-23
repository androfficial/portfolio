export function watchVisualLoops() {
  const visuals = document.querySelectorAll<SVGSVGElement>('[data-visual]');
  if (visuals.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        (entry.target as SVGSVGElement).dataset.active = String(entry.isIntersecting);
      }
    },
    { threshold: 0.1 },
  );

  for (const visual of visuals) observer.observe(visual);
}
