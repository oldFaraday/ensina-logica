/**
 * Lazy loader para as bibliotecas locais KaTeX e highlight.js (zero CDN).
 * Injeta <script src="lib/..."> uma única vez e resolve o global exposto.
 * Em ambientes sem DOM (testes de módulo), resolve `null` sem quebrar.
 */

const KATEX_SRC = './lib/katex/katex.min.js';
const HLJS_SRC = './lib/highlightjs/highlight.min.js';

let katexPromise = null;
let hljsPromise = null;

function loadScript(src, globalName) {
  if (typeof document === 'undefined') return Promise.resolve(null);
  if (typeof window !== 'undefined' && window[globalName]) return Promise.resolve(window[globalName]);

  return new Promise((resolve) => {
    const existing = document.querySelector(`script[data-lib="${globalName}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window[globalName] || null));
      existing.addEventListener('error', () => resolve(null));
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.lib = globalName;
    script.addEventListener('load', () => resolve((typeof window !== 'undefined' && window[globalName]) || null));
    script.addEventListener('error', () => resolve(null));
    document.head.appendChild(script);
  });
}

/**
 * Carrega KaTeX (uma vez). Resolve o objeto global `katex` ou `null`.
 * @returns {Promise<Object|null>}
 */
export function loadKatex() {
  if (!katexPromise) katexPromise = loadScript(KATEX_SRC, 'katex');
  return katexPromise;
}

/**
 * Carrega highlight.js (uma vez). Resolve o objeto global `hljs` ou `null`.
 * @returns {Promise<Object|null>}
 */
export function loadHighlight() {
  if (!hljsPromise) hljsPromise = loadScript(HLJS_SRC, 'hljs');
  return hljsPromise;
}
