export function isBelowFold(element: Element) {
  return element.getBoundingClientRect().top > window.innerHeight;
}
