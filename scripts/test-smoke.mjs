/**
 * Smoke Test - Inicialização e Renderização do App
 * Simula ambiente de navegador com stubs para window, document e localStorage
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

// Mock fetch to load local JSON files
const originalFetch = global.fetch;
global.fetch = async (url) => {
  if (typeof url === 'string' && url.startsWith('./')) {
    const filePath = join(ROOT_DIR, url.replace('./', ''));
    try {
      const content = readFileSync(filePath, 'utf-8');
      return {
        ok: true,
        json: async () => JSON.parse(content),
        text: async () => content
      };
    } catch (e) {
      return { ok: false, status: 404 };
    }
  }
  if (originalFetch) return originalFetch(url);
  return { ok: false, status: 404 };
};

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

// Mock window e document básicos
const mediaQueryMock = {
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.window = {
  location: { hash: '#/' },
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
  matchMedia: () => mediaQueryMock,
  localStorage: localStorageMock
};

global.localStorage = localStorageMock;

let mainContent = '';
let bodyContent = '';

global.document = {
  documentElement: { lang: 'pt-BR', setAttribute: () => {}, removeAttribute: () => {} },
  body: {
    prepend: () => {},
    appendChild: () => {},
    insertAdjacentHTML: (pos, html) => { 
      console.log('insertAdjacentHTML called with:', html.substring(0, 50));
      bodyContent += html; 
    }
  },
  createElement: (tag) => {
    return {
      className: '',
      setAttribute: () => {},
      appendChild: () => {},
      querySelectorAll: () => [],
      querySelector: () => null,
      getBoundingClientRect: () => ({ top: 0, height: 0 }),
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      dataset: {}
    };
  },
  querySelectorAll: () => [],
  querySelector: () => null,
  getElementById: (id) => {
    if (id === 'main') {
      return {
        set innerHTML(html) { mainContent = html; },
        get innerHTML() { return mainContent; },
        focus: () => {}
      };
    }
    if (id === 'welcome-modal') {
       return {
         querySelectorAll: () => [],
         querySelector: (sel) => {
           if (sel === '#welcome-start') return { addEventListener: () => {} };
           return null;
         },
         remove: () => {}
       };
    }
    return null;
  },
  querySelector: (selector) => {
    if (selector === 'main') {
      return {
        set innerHTML(html) { mainContent = html; },
        get innerHTML() { return mainContent; },
        focus: () => {}
      };
    }
    return null;
  },
  addEventListener: () => {},
  readyState: 'complete'
};

Object.defineProperty(global, 'navigator', { value: { language: 'pt-BR' }, writable: true });
Object.defineProperty(global, 'Blob', { value: class Blob { constructor() {} }, writable: true });
Object.defineProperty(global, 'URL', { value: { createObjectURL: () => '', revokeObjectURL: () => {} }, writable: true });

try {
  console.log('🧪 Executando Smoke Test (initApp)...');
  
  // Import i18n and load mock translations directly to avoid fetch in test
  const i18n = await import('../src/i18n.js');
  i18n._translations.dashboard = { title: 'Painel', welcome: 'Bem-vindo', daily_goal: 'Meta' };
  i18n._translations.common = { back: 'Voltar', enter: 'Entrar' };
  i18n._translations.errors = { init_failed: 'Erro' };
  i18n._translations.welcome = { title: 'Bem-vindo', scope_notice: '', description: '', start: 'Começar' };

  // Import app and run initApp
  const { initApp } = await import('../src/app.js');
  
  console.log('  Calling initApp...');
  const initPromise = initApp();
  console.log('  initApp returned a promise');
  
  // Wait a bit for async operations
  await new Promise(r => setTimeout(r, 100));
  console.log('  After wait - mainContent:', mainContent.length, 'bodyContent:', bodyContent.length);
  
  await initPromise;
  console.log('  initApp promise resolved');
  console.log('  mainContent length:', mainContent.length);
  console.log('  bodyContent length:', bodyContent.length);
  console.log('  bodyContent:', bodyContent.substring(0, 100));
  
  // Check if showWelcomeModal was called by looking at the progress
  const { progressStore } = await import('../src/store/ProgressStore.js');
  const progress = progressStore.get();
  console.log('  progress.stats:', progress?.stats);

  const renderedContent = mainContent || bodyContent;
  assert.ok(renderedContent.length > 0, 'A área principal (<main>) e o body ficaram vazios após a inicialização!');
  console.log('  ✅ initApp executado com sucesso');
  console.log('  ✅ Conteúdo renderizado:', renderedContent.substring(0, 100) + '...');
  
  console.log('✅ Smoke test passou com sucesso!');
} catch (error) {
  console.error('❌ Smoke test falhou:', error);
  process.exit(1);
}