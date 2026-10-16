/**
 * Teste end-to-end (jsdom): jornada completa do usuário (T122).
 *
 * Fluxo: onboarding → painel → semestre → disciplina → módulo → lição →
 * "ler na biblioteca" (teoria) → biblioteca (com filtro) → configurações →
 * exportar/importar progresso (round-trip, AC-06).
 *
 * Roda em um único processo com localStorage em memória. Os dados de teoria e
 * exercícios são servidos pelo fetch local (arquivos reais do repositório).
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { JSDOM, VirtualConsole } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let passed = 0;
const ok = (label) => { passed += 1; console.log(`  ✅ ${label}`); };

async function main() {
  console.log('🧪 Executando teste end-to-end (jsdom): jornada completa...');

  const html = readFileSync(join(ROOT_DIR, 'index.html'), 'utf-8');
  // VirtualConsole silencioso: o click de download (export) dispara um
  // "navigation not implemented" do jsdom, que não é um erro do app.
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', () => {});
  const dom = new JSDOM(html, { url: 'http://localhost/#/', pretendToBeVisual: true, virtualConsole });
  const { window } = dom;

  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  });
  window.confirm = () => true;

  const storage = {};
  const localStorageStub = {
    getItem: (k) => (k in storage ? storage[k] : null),
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { for (const k of Object.keys(storage)) delete storage[k]; },
    key: (i) => Object.keys(storage)[i] ?? null,
    get length() { return Object.keys(storage).length; },
  };

  for (const [key, value] of [
    ['window', window],
    ['document', window.document],
    ['navigator', window.navigator],
    ['localStorage', localStorageStub],
    ['location', window.location],
    ['history', window.history],
    ['CustomEvent', window.CustomEvent],
    ['HTMLElement', window.HTMLElement],
    ['Node', window.Node],
    ['Event', window.Event],
  ]) {
    Object.defineProperty(global, key, { value, writable: true, configurable: true });
  }

  global.fetch = async (url) => {
    const relativePath = String(url).replace(/^\.\//, '');
    try {
      const content = readFileSync(join(ROOT_DIR, relativePath), 'utf-8');
      return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
    } catch {
      return { ok: false, status: 404, json: async () => ({}), text: async () => '' };
    }
  };

  // Captura o Blob do export (jsdom não implementa createObjectURL)
  let capturedBlob = null;
  global.URL.createObjectURL = (blob) => { capturedBlob = blob; return 'blob:test'; };
  global.URL.revokeObjectURL = () => {};

  const { initApp } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'app.js')).href);
  const { progressStore } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'store', 'ProgressStore.js')).href);

  await initApp();
  await wait(60);

  const doc = window.document;
  const hash = () => window.location.hash;
  const click = (el, label) => {
    if (!el) throw new Error(`Elemento não encontrado: ${label}`);
    el.click();
  };

  // ---- 1. Onboarding ----
  click(doc.querySelector('#welcome-modal .goal-btn[data-goal="20"]'), 'meta 20 XP');
  click(doc.getElementById('welcome-start'), '"Começar"');
  await wait(90);
  assert.equal(hash(), '#/semester/sem1', 'onboarding leva ao 1º semestre');
  ok('onboarding → semestre');

  // ---- 2. Semestre → disciplina → módulo → lição ----
  click(doc.querySelector('main .btn-back'), '"Voltar" para o painel');
  await wait(90);
  click(doc.querySelector('.semester-card .btn-secondary'), '"Continuar"');
  await wait(90);
  assert.equal(hash(), '#/semester/sem1', 'painel → semestre');

  click(doc.querySelector('.discipline-card .btn-primary'), '"Entrar" na disciplina');
  await wait(90);
  assert.ok(hash().startsWith('#/semester/sem1/discipline/'), `disciplina aberta (${hash()})`);

  click(doc.querySelector('.module-item .btn-primary'), '"Entrar" no módulo');
  await wait(90);
  assert.ok(/\/module\//.test(hash()), `módulo aberto (${hash()})`);

  const lessonLink = doc.querySelector('.module-item [data-nav^="/lesson/"], main [data-nav^="/lesson/"]');
  const lessonNav = lessonLink?.getAttribute('data-nav');
  click(lessonLink, 'iniciar lição');
  await wait(120);
  assert.ok(/^#\/lesson\//.test(hash()), `lição aberta (${hash()})`);
  assert.ok(doc.querySelector('.lesson'), 'view da lição renderizada (.lesson)');
  assert.ok(doc.querySelectorAll('.exercise-item').length >= 1, 'lição mostra >= 1 exercício');
  assert.ok(doc.querySelector('.lesson-summary'), 'lição mostra o resumo teórico');
  ok(`jornada até a lição (${lessonNav})`);

  // ---- 3. Lição → biblioteca de teoria ----
  click(doc.querySelector('.read-theory-btn'), '"ler na biblioteca"');
  await wait(120);
  assert.ok(/^#\/theory\//.test(hash()), `teoria aberta (${hash()})`);
  assert.ok(doc.querySelector('.theory-unit'), 'unidade teórica renderizada');
  assert.ok(doc.querySelectorAll('.theory-section').length >= 1, 'unidade tem seções');
  assert.ok(doc.querySelector('.theory-attribution'), 'cabeçalho de atribuição presente');
  ok('lição → teoria (link "ler na biblioteca")');

  // ---- 4. Biblioteca (índice) com filtro por disciplina ----
  window.EnsinaLogica.navigate('/library');
  await wait(120);
  assert.ok(doc.querySelector('#library-discipline-filter'), 'filtro de disciplina presente');
  assert.ok(doc.querySelector('.library-semester'), 'índice agrupado por semestre');
  const filter = doc.querySelector('#library-discipline-filter');
  filter.value = 'discrete-math';
  filter.dispatchEvent(new window.Event('change'));
  await wait(40);
  const groupTitles = [...doc.querySelectorAll('.library-discipline h3')].map((h) => h.textContent);
  assert.ok(groupTitles.length >= 1 && groupTitles.every((t) => /Matemática/i.test(t)), `filtro mostra só Matemática Discreta (${groupTitles.join(', ')})`);
  ok('biblioteca: busca + filtro por disciplina + agrupamento');

  // ---- 5. Configurações: exportar → limpar → importar (round-trip) ----
  progressStore.update({ stats: { total_xp: 123 } });
  window.EnsinaLogica.navigate('/settings');
  await wait(120);
  assert.ok(doc.querySelector('.settings-view'), 'tela de configurações renderizada');

  click(doc.getElementById('export-progress'), 'exportar progresso');
  await wait(40);
  assert.ok(capturedBlob, 'export gerou um Blob');
  const exportedJson = await capturedBlob.text();
  const exported = JSON.parse(exportedJson);
  assert.equal(exported.schema_version, progressStore.get().schema_version, 'export contém schema_version');
  assert.equal(exported.stats.total_xp, 123, 'export contém o XP atual');

  progressStore.clear();
  assert.equal(progressStore.get().stats.total_xp, 0, 'clear zera o XP');

  const importInput = doc.getElementById('import-file');
  Object.defineProperty(importInput, 'files', { value: [{ text: async () => exportedJson }], configurable: true });
  importInput.dispatchEvent(new window.Event('change'));
  await wait(120);

  assert.equal(progressStore.get().stats.total_xp, 123, 'import restaura o XP (round-trip)');
  const persisted = JSON.parse(storage['ensina-logica-progress'] || '{}');
  assert.equal(persisted.stats.total_xp, 123, 'progresso restaurado persistido no localStorage');
  ok('export/import round-trip (AC-06) + persistência no localStorage');

  console.log(`\n✅ Teste end-to-end passou (${passed}).`);
}

main().catch((error) => {
  console.error('❌ Teste end-to-end falhou:', error.message);
  process.exit(1);
});
