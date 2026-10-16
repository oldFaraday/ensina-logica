/**
 * Toast Manager
 * Notificações não-intrusivas (XP, streak, conquistas)
 */

let container = null;
const TOAST_DURATION = 3500;

/**
 * Inicializa container de toasts
 */
export function initToasts() {
  if (container) return;

  // Reuse the container already declared in the shell (index.html) to
  // avoid duplicate nodes with the same id.
  const existing = document.getElementById('toast-container');
  if (existing) {
    container = existing;
    return;
  }

  container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-atomic', 'true');
  document.body.appendChild(container);
}

/**
 * Mostra um toast
 * @param {string} message - Mensagem
 * @param {string} type - 'info', 'success', 'error', 'achievement'
 */
export function showToast(message, type = 'info') {
  if (!container) initToasts();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  const icon = getIconForType(type);

  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger reflow para animação
  toast.offsetHeight;
  toast.classList.add('visible');

  // Remove após duração
  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, TOAST_DURATION);
}

/**
 * Retorna ícone baseado no tipo
 */
function getIconForType(type) {
  switch (type) {
    case 'success': return '✅';
    case 'error': return '❌';
    case 'achievement': return '🏆';
    case 'xp': return '⭐';
    default: return 'ℹ️';
  }
}