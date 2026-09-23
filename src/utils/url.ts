const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/**
 * Додає базовий шлях сайту до шляху всередині сайту, щоб посилання працювали і в підпапці GitHub Pages, і в корені домену.
 *
 * @param {string} [path] - Шлях без початкового слеша, наприклад `og.jpg`.
 * @returns {string} Шлях від кореня домену, наприклад `/portfolio/og.jpg`.
 */
export function withBase(path = ''): string {
  return `${base}${path}`;
}
