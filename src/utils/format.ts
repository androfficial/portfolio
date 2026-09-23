/**
 * Форматує порядковий номер у двозначний рядок для нумерації секцій і пунктів.
 *
 * @param {number} position - Порядковий номер, що починається з 1.
 * @returns {string} Номер із провідним нулем, наприклад `01`.
 */
export function formatIndex(position: number): string {
  return String(position).padStart(2, '0');
}
