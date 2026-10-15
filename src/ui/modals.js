/**
 * Modal Manager
 * Modais acessíveis (ARIA), focus trap
 */

let activeModal = null;
let previousFocus = null;

/**
 * Inicializa sistema de modais
 */
export function initModals() {
  // Fecha modal com ESC
  document.addEventListener('keydown', handleKeydown);

  // Fecha modal clicando no overlay
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });
}

/**
 * Abre um modal
 * @param {HTMLElement|string} content - Conteúdo do modal (HTML string ou elemento)
 * @param {Object} options - Opções
 */
export function openModal(content, options = {}) {
  closeModal(); // Fecha modal anterior se houver

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  if (options.title) {
    overlay.setAttribute('aria-labelledby', 'modal-title');
  }

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  if (typeof content === 'string') {
    modalContent.innerHTML = content;
  } else {
    modalContent.appendChild(content);
  }

  overlay.appendChild(modalContent);
  document.body.appendChild(overlay);

  // Focus trap
  previousFocus = document.activeElement;
  const focusable = modalContent.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  overlay.dataset.firstFocusable = firstFocusable ? '#' + firstFocusable.id || '' : '';
  overlay.dataset.lastFocusable = lastFocusable ? '#' + lastFocusable.id || '' : '';

  // Foca primeiro elemento
  setTimeout(() => firstFocusable?.focus(), 0);

  activeModal = overlay;

  // Trigger animação
  overlay.offsetHeight;
  overlay.classList.add('visible');

  return overlay;
}

/**
 * Fecha modal atual
 */
export function closeModal() {
  if (!activeModal) return;

  activeModal.classList.remove('visible');
  activeModal.addEventListener('transitionend', () => {
    activeModal.remove();
    activeModal = null;
    previousFocus?.focus();
  }, { once: true });
}

/**
 * Handler de teclado para focus trap e ESC
 */
function handleKeydown(e) {
  if (!activeModal) return;

  if (e.key === 'Escape') {
    closeModal();
    return;
  }

  if (e.key === 'Tab') {
    const focusables = activeModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
}