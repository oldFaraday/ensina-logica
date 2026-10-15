/**
 * Theme Manager
 * Claro/escuro com persistência e prefers-color-scheme
 */

const THEME_KEY = 'ensina-logica-theme';
const THEME_ATTR = 'data-theme';

let currentTheme = 'auto';
let mediaQuery = null;

/**
 * Inicializa o sistema de temas
 * @param {string} savedTheme - Tema salvo ('light', 'dark', 'auto')
 */
export function initTheme(savedTheme = 'auto') {
  currentTheme = savedTheme;
  applyTheme(currentTheme);

  // Escuta mudanças no prefers-color-scheme
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemThemeChange);
}

/**
 * Alterna tema
 * @param {string} theme - 'light', 'dark', ou 'auto'
 * @returns {string} Tema aplicado
 */
export function toggleTheme(theme) {
  if (theme && ['light', 'dark', 'auto'].includes(theme)) {
    currentTheme = theme;
  } else {
    // Cicla: light -> dark -> auto -> light
    const themes = ['light', 'dark', 'auto'];
    const idx = themes.indexOf(currentTheme);
    currentTheme = themes[(idx + 1) % themes.length];
  }

  applyTheme(currentTheme);
  saveTheme(currentTheme);
  return currentTheme;
}

/**
 * Retorna tema atual
 * @returns {string} Tema atual
 */
export function getTheme() {
  return currentTheme;
}

/**
 * Aplica tema ao documento
 * @param {string} theme - Tema a aplicar
 */
function applyTheme(theme) {
  const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
  document.documentElement.setAttribute(THEME_ATTR, effectiveTheme);
  document.documentElement.setAttribute('data-user-theme', theme);
}

/**
 * Retorna tema do sistema
 * @returns {string} 'light' ou 'dark'
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Handler para mudança de tema do sistema
 */
function handleSystemThemeChange() {
  if (currentTheme === 'auto') {
    applyTheme('auto');
  }
}

/**
 * Salva tema no localStorage
 * @param {string} theme - Tema a salvar
 */
function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.warn('[Theme] Falha ao salvar tema:', e);
  }
}

/**
 * Carrega tema salvo
 * @returns {string} Tema salvo ou 'auto'
 */
export function loadSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'auto';
  } catch (e) {
    return 'auto';
  }
}