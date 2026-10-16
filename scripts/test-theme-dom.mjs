/**
 * Teste de tema (jsdom): persistência da preferência + botões do cabeçalho.
 *
 * Regressão que este teste cobre:
 *   1. a preferência de tema não era gravada no progresso — o boot lê
 *      `progress.preferences.theme`, mas os botões só chamavam toggleTheme()
 *      (que grava numa chave separada). Resultado: a escolha voltava para
 *      "automático" ao recarregar;
 *   2. o botão de tema do cabeçalho (#theme-toggle) não tinha handler algum.
 *
 * Módulos ES são cacheados por processo, então cada "recarregamento" roda em um
 * processo Node separado, com o localStorage persistido num arquivo de estado.
 */

import { strict as assert } from 'assert';
import { readFileSync, existsSync, writeFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { execFileSync } from 'child_process';
import { tmpdir } from 'os';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CSS = readFileSync(join(ROOT_DIR, 'src', 'ui', 'theme.css'), 'utf-8');

function cssRule(selector) {
  const idx = CSS.indexOf(selector);
  if (idx === -1) return null;
  const open = CSS.indexOf('{', idx);
  const close = CSS.indexOf('}', open);
  if (open === -1 || close === -1) return null;
  return CSS.slice(open + 1, close);
}

/**
 * Especificidade (id, classe/atributo/pseudo-classe, elemento) — suficiente
 * para os seletores simples usados aqui.
 */
function specificity(selector) {
  const s = selector.replace(/:not\(([^)]*)\)/g, ' $1 ');
  const ids = (s.match(/#[\w-]+/g) || []).length;
  const attrs = (s.match(/\[[^\]]*\]/g) || []).length;
  const pseudos = (s.match(/:{1,2}[\w-]+/g) || []).length;
  const classes = (s.match(/\.[\w-]+/g) || []).length + attrs + pseudos;
  const stripped = s
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/:{1,2}[\w-]+/g, ' ')
    .replace(/\.[\w-]+/g, ' ')
    .replace(/#[\w-]+/g, ' ');
  const els = (stripped.match(/[A-Za-z][\w-]*/g) || []).length;
  return [ids, classes, els];
}

function compareSpecificity(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

// ============================================================
// Worker: simula UM carregamento da página
// ============================================================
async function runPage(stateFile, action, theme) {
  const state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf-8')) : {};
  const storage = state.storage || {};

  const html = readFileSync(join(ROOT_DIR, 'index.html'), 'utf-8');
  const dom = new JSDOM(html, { url: 'http://localhost/#/', pretendToBeVisual: true });
  const { window } = dom;

  // Sistema sem preferência escura -> "automático" resolve para claro
  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  });

  const localStorageStub = {
    getItem: (k) => (k in storage ? storage[k] : null),
    setItem: (k, v) => {
      storage[k] = String(v);
    },
    removeItem: (k) => {
      delete storage[k];
    },
    clear: () => {
      for (const k of Object.keys(storage)) delete storage[k];
    },
    key: (i) => Object.keys(storage)[i] ?? null,
    get length() {
      return Object.keys(storage).length;
    },
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

  const { initApp } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'app.js')).href);
  const { progressStore } = await import(
    pathToFileURL(join(ROOT_DIR, 'src', 'store', 'ProgressStore.js')).href
  );

  await initApp();
  await wait(60);

  const doc = window.document;
  const dataTheme = () => doc.documentElement.getAttribute('data-theme');
  const storedTheme = () => {
    try {
      return JSON.parse(storage['ensina-logica-progress'] || '{}').preferences?.theme ?? null;
    } catch {
      return null;
    }
  };

  if (action === 'toggle') {
    const btn = doc.getElementById('theme-toggle');
    if (!btn) throw new Error('#theme-toggle não encontrado no cabeçalho');
    btn.click();
    await wait(60);
  } else if (action === 'set-theme') {
    window.EnsinaLogica.navigate('/settings');
    await wait(60);
    const btn = doc.querySelector(`.theme-btn[data-theme="${theme}"]`);
    if (!btn) throw new Error(`botão de tema ${theme} não encontrado em Configurações`);
    btn.click();
    await wait(60);
  }

  const result = {
    dataTheme: dataTheme(),
    storedTheme: storedTheme(),
    progressTheme: progressStore.get()?.preferences?.theme ?? null,
    activeButtons: [...doc.querySelectorAll('.theme-btn.active')].map((b) => b.dataset.theme),
    hash: window.location.hash,
    toggleExists: !!doc.getElementById('theme-toggle'),
  };

  writeFileSync(stateFile, JSON.stringify({ storage }), 'utf-8');
  process.stdout.write(`\n__RESULT__${JSON.stringify(result)}\n`);
}

// ============================================================
// Orquestrador
// ============================================================
function runWorker(stateFile, action, theme = '') {
  const out = execFileSync(
    process.execPath,
    [__filename, '--state', stateFile, '--action', action, '--theme', theme],
    { encoding: 'utf-8' }
  );
  const marker = '__RESULT__';
  const line = out.split(/\r?\n/).find((l) => l.startsWith(marker));
  if (!line) throw new Error(`Worker não retornou resultado:\n${out}`);
  return JSON.parse(line.slice(marker.length));
}

function runOrchestrator() {
  console.log('🧪 Executando teste de tema (jsdom): persistência e botões...');

  const stateFile = join(tmpdir(), `ensina-theme-${process.pid}-${Date.now()}.json`);
  rmSync(stateFile, { force: true });

  try {
    // Guarda de CSS: sol no claro / lua no escuro
    assert.ok(
      /display:\s*none/.test(cssRule('.icon-btn .icon-moon') || ''),
      '.icon-btn .icon-moon base deve ter display: none (lua escondida no claro)'
    );
    assert.ok(
      /display:\s*block/.test(cssRule('html[data-theme="dark"] .icon-btn .icon-moon') || ''),
      'html[data-theme="dark"] .icon-btn .icon-moon deve ter display: block'
    );
    assert.ok(
      /display:\s*none/.test(cssRule('html[data-theme="dark"] .icon-btn .icon-sun') || ''),
      'html[data-theme="dark"] .icon-btn .icon-sun deve ter display: none'
    );
    // Regressão: a regra que esconde a lua no claro precisa vencer
    // `.icon-btn svg { display: block }`, senão os dois ícones aparecem no claro.
    assert.ok(
      compareSpecificity(specificity('.icon-btn .icon-moon'), specificity('.icon-btn svg')) > 0,
      'A regra .icon-btn .icon-moon precisa ter especificidade maior que .icon-btn svg'
    );
    console.log('  ✅ CSS: sol no claro, lua no escuro (especificidade OK)');

    // 1. Estado limpo -> padrão "auto" (resolve para claro), botão existe
    let r = runWorker(stateFile, 'inspect');
    assert.equal(r.toggleExists, true, 'O botão de tema do cabeçalho (#theme-toggle) deve existir');
    assert.equal(r.storedTheme, 'auto', `Preferência padrão deveria ser "auto", obtido "${r.storedTheme}"`);
    assert.equal(r.dataTheme, 'light', `"auto" sem preferência de SO deveria resolver para claro, obtido "${r.dataTheme}"`);
    console.log('  ✅ Padrão: preferência "auto" → tema claro');

    // 2. Botão de Configurações grava a preferência
    r = runWorker(stateFile, 'set-theme', 'dark');
    assert.equal(r.storedTheme, 'dark', 'Escolher "escuro" deve persistir em progress.preferences.theme');
    assert.equal(r.progressTheme, 'dark', 'O store em memória deve refletir o tema escolhido');
    assert.equal(r.dataTheme, 'dark', 'data-theme deveria virar "dark"');
    assert.deepEqual(r.activeButtons, ['dark'], 'O botão "escuro" deveria ficar ativo');
    console.log('  ✅ Configurações: escolher "escuro" persiste');

    // 3. Recarregar -> o tema escolhido sobrevive
    r = runWorker(stateFile, 'inspect');
    assert.equal(r.hash, '#/', 'O reload abre o dashboard');
    assert.equal(r.storedTheme, 'dark', 'A preferência deve sobreviver ao reload');
    assert.equal(r.dataTheme, 'dark', 'O tema escuro deve continuar aplicado após o reload');
    console.log('  ✅ Recarregar mantém o tema escuro');

    // 4. Botão do cabeçalho alterna claro/escuro (antes não fazia nada)
    r = runWorker(stateFile, 'toggle');
    assert.equal(r.dataTheme, 'light', `O botão do cabeçalho deveria mudar o tema, obtido "${r.dataTheme}"`);
    assert.equal(r.storedTheme, 'light', 'A troca pelo cabeçalho deve persistir a nova preferência');
    console.log('  ✅ Botão do cabeçalho (#theme-toggle) alterna o tema (escuro → claro)');

    // 5. Recarregar -> a nova preferência sobrevive
    r = runWorker(stateFile, 'inspect');
    assert.equal(r.storedTheme, 'light', 'A preferência do cabeçalho deve sobreviver ao reload');
    assert.equal(r.dataTheme, 'light', 'O tema deveria continuar claro após o reload');
    console.log('  ✅ Recarregar mantém a preferência do cabeçalho');

    // 6. Alterna de volta para escuro
    r = runWorker(stateFile, 'toggle');
    assert.equal(r.dataTheme, 'dark', 'O botão deveria voltar para escuro');
    assert.equal(r.storedTheme, 'dark', 'A volta para escuro deve persistir');
    console.log('  ✅ Botão do cabeçalho volta para escuro (claro → escuro)');

    console.log('✅ Teste de tema passou com sucesso!');
  } catch (error) {
    console.error('❌ Teste de tema falhou:', error);
    process.exit(1);
  } finally {
    rmSync(stateFile, { force: true });
  }
}

// ============================================================
// Entry point
// ============================================================
const args = process.argv.slice(2);
const stateIndex = args.indexOf('--state');

if (stateIndex !== -1) {
  const stateFile = args[stateIndex + 1];
  const action = args[args.indexOf('--action') + 1] || 'inspect';
  const theme = args[args.indexOf('--theme') + 1] || '';
  await runPage(stateFile, action, theme);
} else {
  runOrchestrator();
}
