/**
 * Accessibility Utilities
 * Skip links, live regions, focus management
 */

/**
 * Inicializa utilitários de acessibilidade
 */
export function initA11y() {
  setupSkipLinks();
  setupLiveRegions();
  setupReducedMotion();
}

/**
 * Configura links de "pular para o conteúdo"
 */
function setupSkipLinks() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Pular para o conteúdo principal';
  document.body.prepend(skipLink);

  const main = document.querySelector('main');
  if (main) {
    main.id = 'main-content';
    main.tabIndex = -1;
  }
}

/**
 * Configura regiões ARIA live genéricas
 */
function setupLiveRegions() {
  // Criadas dinamicamente pelos módulos (ex: toasts)
}

/**
 * Configura tratamento de prefers-reduced-motion
 */
function setupReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleMotionChange() {
    if (mediaQuery.matches) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
    }
  }

  mediaQuery.addEventListener('change', handleMotionChange);
  handleMotionChange();
}

/**
 * Anuncia mensagem para leitores de tela
 * @param {string} message - Mensagem
 * @param {'polite'|'assertive'} priority - Prioridade
 */
export function announce(message, priority = 'polite') {
  let announcer = document.getElementById('a11y-announcer-' + priority);

  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'a11y-announcer-' + priority;
    announcer.className = 'visually-hidden';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }

  // Mudança de texto força o anúncio
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}

/**
 * Gerencia foco ao navegar para uma nova "página"
 */
export function focusPageView() {
  const main = document.querySelector('main');
  if (main) {
    main.focus();
  }
}