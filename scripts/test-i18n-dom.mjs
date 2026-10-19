/**
 * Teste de i18n (jsdom): garante que nenhuma chave de tradução crua
 * vaze para a interface renderizada.
 *
 * Ele percorre as rotas principais (painel, semestre, disciplina, módulo,
 * lição, configurações, conquistas, biblioteca) e falha se qualquer texto
 * ou atributo acessível casar com o padrão de uma chave de i18n não traduzida
 * (ex.: "lesson.l01.title", "settings.data").
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

// Namespaces de topo existentes em locales/pt-BR.json
const NAMESPACES = [
  'app', 'welcome', 'dashboard', 'semester', 'common', 'discipline',
  'module', 'lesson', 'theory', 'library', 'gamification', 'settings',
  'achievements', 'feedback', 'actions', 'error', 'errors', 'a11y',
];

// Chave crua: namespace.segmento(.segmento)* — ex.: lesson.l01.title
const RAW_KEY_REGEX = new RegExp(
  `\\b(?:${NAMESPACES.join('|')})\\.[a-z0-9_]+(?:\\.[a-z0-9_]+)*`,
  'g'
);

// 1. DOM real a partir do index.html
const html = readFileSync(join(ROOT_DIR, 'index.html'), 'utf-8');
const dom = new JSDOM(html, { url: 'http://localhost/#/', pretendToBeVisual: true });
const { window } = dom;

// 2. APIs ausentes no jsdom
window.matchMedia = () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
});

// 3. Globais
for (const [key, value] of [
  ['window', window],
  ['document', window.document],
  ['navigator', window.navigator],
  ['localStorage', window.localStorage],
  ['location', window.location],
  ['history', window.history],
  ['CustomEvent', window.CustomEvent],
  ['HTMLElement', window.HTMLElement],
  ['Node', window.Node],
]) {
  Object.defineProperty(global, key, { value, writable: true, configurable: true });
}

// 4. fetch local
global.fetch = async (url) => {
  const relativePath = String(url).replace(/^\.\//, '');
  try {
    const content = readFileSync(join(ROOT_DIR, relativePath), 'utf-8');
    return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
  } catch {
    return { ok: false, status: 404, json: async () => ({}), text: async () => '' };
  }
};

const ROUTES = [
  '/',
  '/semester/sem1',
  '/semester/sem1/discipline/algorithms',
  '/semester/sem1/discipline/algorithms/module/m01',
  '/lesson/l01',
  '/settings',
  '/achievements',
  '/library',
  '/theory/th-sem1-algorithms-m01-program-design',
];

const ATTRS = ['aria-label', 'title', 'placeholder', 'alt'];

function scanForRawKeys(root) {
  const findings = [];

  // Texto visível (textContent ignora comentários e tags)
  const text = root.textContent || '';
  for (const match of text.matchAll(RAW_KEY_REGEX)) {
    findings.push({ source: 'text', value: match[0] });
  }

  // Atributos acessíveis/visíveis
  for (const el of root.querySelectorAll('*')) {
    for (const attr of ATTRS) {
      const value = el.getAttribute(attr);
      if (!value) continue;
      for (const match of value.matchAll(RAW_KEY_REGEX)) {
        findings.push({ source: `${el.tagName.toLowerCase()}[${attr}]`, value: match[0] });
      }
    }
  }

  return findings;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log('🧪 Executando teste de i18n (jsdom): nenhuma chave crua renderizada...');

try {
  const { initApp } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'app.js')).href);
  await initApp();
  await wait(50);

  const { navigate } = window.EnsinaLogica;
  assert.equal(typeof navigate, 'function', 'window.EnsinaLogica.navigate indisponível');

  const allFindings = [];

  for (const route of ROUTES) {
    navigate(route);
    await wait(30);

    const findings = scanForRawKeys(document.body);
    if (findings.length > 0) {
      allFindings.push({ route, findings });
      console.error(`  ❌ Rota ${route}: ${findings.map(f => `${f.value} (${f.source})`).join(', ')}`);
    }
  }

  assert.equal(
    allFindings.length,
    0,
    'Chaves de tradução cruas encontradas:\n' +
      allFindings
        .map(({ route, findings }) =>
          `  ${route}:\n` + findings.map((f) => `    - ${f.value} (${f.source})`).join('\n')
        )
        .join('\n')
  );

  console.log(`  ✅ ${ROUTES.length} rotas verificadas sem chaves cruas`);

  // Ícones do cabeçalho: aria-label + tooltip (title) obrigatórios
  for (const selector of ['#theme-toggle', 'a[href="#/settings"]', 'a[href="#/achievements"]']) {
    const el = document.querySelector(selector);
    assert.ok(el, `Ícone do cabeçalho ausente: ${selector}`);
    assert.ok(el.getAttribute('aria-label')?.trim(), `aria-label ausente em ${selector}`);
    assert.ok(el.getAttribute('title')?.trim(), `title (tooltip) ausente em ${selector}`);
  }
  console.log('  ✅ ícones do cabeçalho com aria-label e title');

  console.log('✅ Teste de i18n passou com sucesso!');
} catch (error) {
  console.error('❌ Teste de i18n falhou:', error);
  process.exit(1);
}
