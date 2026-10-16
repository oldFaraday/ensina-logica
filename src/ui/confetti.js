/**
 * Confete (CSS puro) para celebrar a meta diária.
 * Respeita `prefers-reduced-motion` (não cria nada nesse caso).
 */

const COLORS = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-cta)', 'var(--color-success)'];

/**
 * Dispara a animação de confete.
 * @param {Object} [options]
 * @param {number} [options.count=24] - Número de partículas
 */
export function celebrate({ count = 24 } = {}) {
  if (typeof document === 'undefined') return;

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  }

  const pieces = [];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.setAttribute('aria-hidden', 'true');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = COLORS[i % COLORS.length];
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.appendChild(piece);
    pieces.push(piece);
  }

  setTimeout(() => {
    pieces.forEach((piece) => piece.remove());
  }, 3600);
}
