/**
 * Teste de onboarding (jsdom): fluxo de boas-vindas / meta diária.
 *
 * Cobre a flag dedicada `preferences.onboarding_completed`:
 *   1. armazenamento limpo            -> modal aparece;
 *   2. escolher uma meta              -> meta + flag gravadas, modal fecha;
 *   3. recarregar                     -> modal NÃO reaparece;
 *   4. reset do progresso             -> mantém preferências/flag (não reabre);
 *   5. recarregar após reset          -> modal NÃO reaparece;
 *   6. clear (limpar tudo)            -> flag volta ao padrão (false);
 *   7. recarregar após clear          -> modal reaparece.
 *
 * Para simular "recarregamentos" de forma fiel (módulos ES são cacheados por
 * processo), cada carregamento roda em um processo Node separado. O
 * localStorage é persistido entre eles num arquivo de estado temporário.
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

// ============================================================
// Worker: simula UM carregamento da página
// ============================================================
async function runPage(stateFile, action, goal) {
  const state = existsSync(stateFile)
    ? JSON.parse(readFileSync(stateFile, 'utf-8'))
    : {};
  const storage = state.storage || {};

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

  // 3. localStorage persistente entre "recarregamentos" (arquivo de estado)
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

  // 4. Globais (navigator/location são getters no Node moderno)
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

  // 5. fetch local
  global.fetch = async (url) => {
    const relativePath = String(url).replace(/^\.\//, '');
    try {
      const content = readFileSync(join(ROOT_DIR, relativePath), 'utf-8');
      return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
    } catch {
      return { ok: false, status: 404, json: async () => ({}), text: async () => '' };
    }
  };

  // 6. Boot da aplicação
  const { initApp } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'app.js')).href);
  const { progressStore } = await import(
    pathToFileURL(join(ROOT_DIR, 'src', 'store', 'ProgressStore.js')).href
  );

  await initApp();
  await wait(60);

  // 7. Ação do cenário
  if (action === 'choose-goal') {
    const btn = window.document.querySelector(`#welcome-modal .goal-btn[data-goal="${goal}"]`);
    if (btn) btn.click();
    const start = window.document.getElementById('welcome-start');
    if (start) start.click();
    await wait(80);
  } else if (action === 'reset') {
    progressStore.reset();
    await wait(20);
  } else if (action === 'clear') {
    progressStore.clear();
    await wait(20);
  } else if (action === 'select-hardcore') {
    const btn = window.document.querySelector('#welcome-modal .goal-btn[data-goal="1000"]');
    if (btn) btn.click();
    await wait(20);
  }

  const hardcodeBtn = window.document.querySelector('#welcome-modal .goal-btn[data-goal="1000"]');
  const hardcodeOption = hardcodeBtn ? hardcodeBtn.closest('.goal-option') : null;
  const defaultActiveBtn = window.document.querySelector('#welcome-modal .goal-option.active .goal-btn');

  const result = {
    modalVisible: !!window.document.getElementById('welcome-modal'),
    progress: progressStore.get(),
    storage,
    goalValues: [...window.document.querySelectorAll('#welcome-modal .goal-btn')].map((b) => b.dataset.goal),
    defaultGoalActive: defaultActiveBtn ? defaultActiveBtn.dataset.goal : null,
    hardcore: hardcodeOption
      ? {
          wrapperActive: hardcodeOption.classList.contains('active'),
          buttonActive: hardcodeBtn.classList.contains('active'),
          caption: hardcodeOption.querySelector('.goal-caption')?.textContent || '',
          emojiAriaHidden: hardcodeOption.querySelector('.goal-emoji')?.getAttribute('aria-hidden') || null,
        }
      : null,
  };

  writeFileSync(stateFile, JSON.stringify({ storage }), 'utf-8');
  process.stdout.write(`\n__RESULT__${JSON.stringify(result)}\n`);
}

// ============================================================
// Orchestrator: executa o cenário em múltiplos "carregamentos"
// ============================================================
function runWorker(stateFile, action, goal = 300) {
  const out = execFileSync(
    process.execPath,
    [__filename, '--state', stateFile, '--action', action, '--goal', String(goal)],
    { encoding: 'utf-8' }
  );
  const marker = '__RESULT__';
  const line = out.split(/\r?\n/).find((l) => l.startsWith(marker));
  if (!line) throw new Error(`Worker não retornou resultado:\n${out}`);
  return JSON.parse(line.slice(marker.length));
}

function runOrchestrator() {
  console.log('🧪 Executando teste de onboarding (jsdom): fluxo de boas-vindas...');

  const stateFile = join(tmpdir(), `ensina-onboarding-${process.pid}-${Date.now()}.json`);
  rmSync(stateFile, { force: true });

  try {
    // 1. Armazenamento limpo -> modal aparece
    let r = runWorker(stateFile, 'inspect');
    assert.equal(r.modalVisible, true, 'Modal deve aparecer com armazenamento limpo');
    assert.deepEqual(r.goalValues, ['100', '300', '600', '1000'], `metas 100/300/600/1000 (${r.goalValues.join(', ')})`);
    assert.equal(r.defaultGoalActive, '300', '300 XP pré-selecionado por padrão');
    console.log('  ✅ Armazenamento limpo: modal aparece com metas novas (default 300)');

    // 2. Escolher a meta (300 XP) -> grava meta + flag e fecha o modal
    r = runWorker(stateFile, 'choose-goal', 300);
    assert.equal(r.progress.preferences.daily_xp_goal, 300, 'Meta diária escolhida deve ser gravada');
    assert.equal(r.progress.preferences.onboarding_completed, true, 'Flag de onboarding deve virar true');
    assert.equal(r.modalVisible, false, 'Modal deve fechar após escolher a meta');

    const stored = JSON.parse(r.storage['ensina-logica-progress'] || '{}');
    assert.equal(stored.preferences.daily_xp_goal, 300, 'Meta diária deve estar persistida no localStorage');
    assert.equal(stored.preferences.onboarding_completed, true, 'Flag de onboarding deve estar persistida');
    console.log('  ✅ Meta escolhida persistida (goal 300, onboarding_completed true)');

    // 3. Recarregar -> modal não reaparece
    r = runWorker(stateFile, 'inspect');
    assert.equal(r.modalVisible, false, 'Modal não deve reaparecer ao recarregar após concluir o onboarding');
    assert.equal(r.progress.preferences.daily_xp_goal, 300, 'Meta diária mantida após recarregar');
    console.log('  ✅ Recarregamento não reabre o modal');

    // 4. Reset preserva preferências e flag
    r = runWorker(stateFile, 'reset');
    assert.equal(r.progress.preferences.onboarding_completed, true, 'Reset deve manter a flag de onboarding');
    assert.equal(r.progress.preferences.daily_xp_goal, 300, 'Reset deve manter a meta diária');
    console.log('  ✅ Reset preserva preferências e flag');

    // 5. Recarregar após reset -> modal não reaparece
    r = runWorker(stateFile, 'inspect');
    assert.equal(r.modalVisible, false, 'Modal não deve reaparecer após o reset');
    console.log('  ✅ Recarregamento após reset não reabre o modal');

    // 6. Clear (limpar tudo) -> flag volta ao padrão false
    r = runWorker(stateFile, 'clear');
    assert.equal(r.progress.preferences.onboarding_completed, false, 'Clear deve restaurar onboarding_completed = false');
    console.log('  ✅ Clear restaura a flag padrão');

    // 7. Recarregar após clear -> modal reabre
    r = runWorker(stateFile, 'inspect');
    assert.equal(r.modalVisible, true, 'Modal deve reabrir após limpar tudo');
    console.log('  ✅ Recarregamento após clear reabre o modal');

    // 8. T128: selecionar 1000 mostra 👿 + legenda HARDCORE (decorativos)
    r = runWorker(stateFile, 'select-hardcore');
    assert.ok(r.hardcore, 'meta 1000 presente na modal de boas-vindas');
    assert.equal(r.hardcore.wrapperActive, true, 'wrapper da meta 1000 fica ativo');
    assert.equal(r.hardcore.buttonActive, true, 'botão da meta 1000 fica ativo');
    assert.equal(r.hardcore.caption, 'HARDCORE', 'legenda HARDCORE exibida');
    assert.equal(r.hardcore.emojiAriaHidden, 'true', 'emoji 👿 é decorativo (aria-hidden)');
    console.log('  ✅ Meta 1000: 👿 + HARDCORE (modal)');

    console.log('✅ Teste de onboarding passou com sucesso!');
  } catch (error) {
    console.error('❌ Teste de onboarding falhou:', error);
    process.exit(1);
  } finally {
    rmSync(stateFile, { force: true });
  }
}

// ============================================================
// Entry point: worker (--state) ou orchestrator
// ============================================================
const args = process.argv.slice(2);
const stateIndex = args.indexOf('--state');

if (stateIndex !== -1) {
  const stateFile = args[stateIndex + 1];
  const action = args[args.indexOf('--action') + 1] || 'inspect';
  const goal = Number(args[args.indexOf('--goal') + 1] || 300);
  await runPage(stateFile, action, goal);
} else {
  runOrchestrator();
}
