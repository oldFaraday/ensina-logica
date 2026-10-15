/**
 * i18n - Simple locale loader for pt-BR
 * Loads locale file and provides t(key, params) helper
 */

let currentLocale = 'pt-BR';
let translations = {};

/**
 * Load locale file
 * @param {string} locale - Locale code (e.g., 'pt-BR')
 * @returns {Promise<Object>} Translations object
 */
export async function loadLocale(locale = 'pt-BR') {
  try {
    const response = await fetch(`./locales/${locale}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load locale: ${locale}`);
    }
    translations = await response.json();
    currentLocale = locale;
    document.documentElement.lang = locale.replace('-', '-');
    return translations;
  } catch (error) {
    console.error('[i18n] Error loading locale:', error);
    // Fallback to empty object
    translations = {};
    currentLocale = locale;
    return translations;
  }
}

/**
 * Get translated string with optional parameter interpolation
 * @param {string} key - Dot-notation key (e.g., 'welcome.title')
 * @param {Object} params - Parameters for interpolation
 * @returns {string} Translated string or key if not found
 */
export function t(key, params = {}) {
  const keys = key.split('.');
  let value = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`[i18n] Missing translation key: ${key}`);
      return key;
    }
  }

  if (typeof value !== 'string') {
    console.warn(`[i18n] Translation key is not a string: ${key}`);
    return key;
  }

  // Simple parameter interpolation: {param} -> value
  return value.replace(/\{(\w+)\}/g, (match, param) => {
    return params[param] !== undefined ? params[param] : match;
  });
}

/**
 * Get current locale
 * @returns {string}
 */
export function getLocale() {
  return currentLocale;
}

/**
 * Set locale and reload
 * @param {string} locale
 */
export async function setLocale(locale) {
  await loadLocale(locale);
  // Dispatch event for components to react
  window.dispatchEvent(new CustomEvent('localechange', { detail: { locale } }));
}

// Initialize with default locale
loadLocale('pt-BR').catch(() => {});

// Export for direct access if needed
export { translations as _translations };