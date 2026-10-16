/**
 * Teste de interação (jsdom): cliques de verdade mudam a rota e a tela.
 *
 * Cobre dois tipos de regressão:
 *   A. Deep-link: abrir/recarregar #/settings ou #/semester/sem1 mostra ESSA
 *      tela (e não o painel). O router não pode ler o hash antes de as rotas
 *      estarem registradas.
 *   B. Utilização: clicar em "Continuar" (painel), no 1º semestre, em "Entrar"
 *      na disciplina e no módulo navega de fato.
 *
 * Também garante o invariante de clique: um overlay de modal invisível NUNCA
 * captura cliques (classe `visible` controla opacidade E pointer-events), e
 * nenhum overlay sobra aberto depois de fechar o diálogo.
 *
 * Módulos ES são cacheados por processo, então cada "carregamento" (deep-link
 * e fluxo de cliques) roda em um processo Node separado.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { execFileSync } from 'child_process';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CSS = readFileSync(join(ROOT_DIR, 'src', 'ui', 'theme.css'), 'utf-8');

/** Extrai o corpo da primeira regra cujo seletor casa exatamente `selector`. */
function cssRule(selector) {
  const idx = CSS.indexOf(selector);
  if (idx === -1) return null;
  const open = CSS.indexOf('{', idx);
  const close = CSS.indexOf('}', open);
  if (open === -1 || close === -1) return null;
  return CSS.slice(open + 1, close);
}

// ============================================================
// Worker: simula UM carregamento da página e executa um cenário
// ============================================================
async function runPage(url, scenario) {
  const html = readFileSync(join(ROOT_DIR, 'index.html'), 'utf-8');
  const dom = new JSDOM(html, { url, pretendToBeVisual: true });
  const { window } = dom;

  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  });

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

  global.fetch = async (u) => {
    const relativePath = String(u).replace(/^\.\//, '');
    try {
      const content = readFileSync(join(ROOT_DIR, relativePath), 'utf-8');
      return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
    } catch {
      return { ok: false, status: 404, json: async () => ({}), text: async () => '' };
    }
  };

  const { initApp } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'app.js')).href);
  await initApp();
  await wait(60);

  const doc = window.document;
  const hash = () => window.location.hash;
  const heading = () => doc.querySelector('main h1')?.textContent?.trim() || null;
  const overlays = () =>
    [...doc.querySelectorAll('.modal-overlay')].map((m) => ({
      id: m.id || null,
      visible: m.classList.contains('visible'),
      role: m.getAttribute('role'),
    }));
  const click = (el, label) => {
    if (!el) throw new Error(`Elemento para clique não encontrado: ${label}`);
    el.click();
  };

  const result = { scenario, hash: hash(), heading: heading() };

  if (scenario === 'deep') {
    result.viewClass = doc.querySelector('main > *')?.className || null;
    result.overlays = overlays();
  }

  if (scenario === 'click') {
    // 1. Conclui o onboarding clicando na meta e em "Começar".
    click(doc.querySelector('#welcome-modal .goal-btn[data-goal="20"]'), 'meta 20 XP');
    click(doc.getElementById('welcome-start'), '"Começar"');
    await wait(90);
    result.afterOnboardingHash = hash();
    result.modalAfterOnboarding = !!doc.getElementById('welcome-modal');

    // 2. Volta ao painel pelo botão "Voltar".
    click(doc.querySelector('main .btn-back'), '"Voltar"');
    await wait(90);
    result.dashboardHash = hash();

    // 3. Clica em "Continuar" no painel.
    const continueBtn = doc.querySelector('.semester-card .btn-secondary');
    result.continueLabel = continueBtn?.textContent?.trim() || null;
    click(continueBtn, '"Continuar"');
    await wait(90);
    result.continueHash = hash();
    result.continueHeading = heading();

    // 4. Clica em "Entrar" na primeira disciplina.
    const discCard = doc.querySelector('.discipline-card');
    const discTitle = discCard?.querySelector('h2')?.textContent?.trim() || null;
    result.disciplineCardTitle = discTitle;
    click(discCard?.querySelector('.btn-primary'), '"Entrar" na disciplina');
    await wait(90);
    result.disciplineHash = hash();
    result.disciplineHeading = heading();

    // 5. Clica em "Entrar" no primeiro módulo.
    const modItem = doc.querySelector('.module-item');
    const modTitle = modItem?.querySelector('h3')?.textContent?.trim() || null;
    result.moduleCardTitle = modTitle;
    click(modItem?.querySelector('.btn-primary'), '"Entrar" no módulo');
    await wait(90);
    result.moduleHash = hash();
    result.moduleHeading = heading();

    result.overlays = overlays();
  }

  process.stdout.write(`\n__RESULT__${JSON.stringify(result)}\n`);
}

// ============================================================
// Orquestrador
// ============================================================
function runWorker(url, scenario) {
  const out = execFileSync(
    process.execPath,
    [__filename, '--url', url, '--scenario', scenario],
    { encoding: 'utf-8' }
  );
  const marker = '__RESULT__';
  const line = out.split(/\r?\n/).find((l) => l.startsWith(marker));
  if (!line) throw new Error(`Worker não retornou resultado:\n${out}`);
  return JSON.parse(line.slice(marker.length));
}

function runOrchestrator() {
  console.log('🧪 Executando teste de interação (jsdom): cliques reais...');
  const base = 'http://localhost/';

  try {
    // ---- Guarda de CSS: overlay invisível não captura cliques ----
    const baseRule = cssRule('.modal-overlay {') || cssRule('.modal-overlay');
    assert.ok(
      /pointer-events:\s*none/.test(baseRule || ''),
      'A regra base .modal-overlay deve declarar pointer-events: none (overlay invisível não pode capturar cliques)'
    );
    const visibleRule = cssRule('.modal-overlay.visible');
    assert.ok(
      /pointer-events:\s*auto/.test(visibleRule || ''),
      'A regra .modal-overlay.visible deve declarar pointer-events: auto'
    );
    console.log('  ✅ CSS: overlay invisível não captura cliques (pointer-events)');

    // ---- A. Deep-link abre a própria tela ----
    let r = runWorker(`${base}#/settings`, 'deep');
    assert.equal(r.hash, '#/settings', `#/settings deveria permanecer em #/settings, obtido ${r.hash}`);
    assert.ok(
      /settings-view/.test(r.viewClass || ''),
      `#/settings deveria renderizar a tela de configurações, obtido "${r.viewClass}"`
    );
    assert.ok(
      r.overlays.some((o) => o.id === 'welcome-modal' && o.visible && o.role === 'dialog'),
      'O modal de boas-vindas deveria estar aberto e visível (classe visible) sobre a tela'
    );
    assert.ok(
      !r.overlays.some((o) => !o.visible),
      'Nenhum overlay invisível deveria existir no DOM'
    );
    console.log('  ✅ Deep-link #/settings abre Configurações (não o painel)');

    r = runWorker(`${base}#/semester/sem1`, 'deep');
    assert.equal(r.hash, '#/semester/sem1', `#/semester/sem1 deveria permanecer, obtido ${r.hash}`);
    assert.ok(
      /semester-view/.test(r.viewClass || ''),
      `#/semester/sem1 deveria renderizar o semestre, obtido "${r.viewClass}"`
    );
    assert.equal(r.heading, '1º Semestre', `h1 do semestre, obtido "${r.heading}"`);
    console.log('  ✅ Deep-link #/semester/sem1 abre o Semestre (não o painel)');

    // ---- B. Fluxo de cliques reais ----
    r = runWorker(`${base}#/`, 'click');

    assert.equal(r.afterOnboardingHash, '#/semester/sem1', `Após concluir o onboarding, esperado #/semester/sem1, obtido ${r.afterOnboardingHash}`);
    assert.equal(r.modalAfterOnboarding, false, 'O modal deveria fechar após concluir o onboarding');
    assert.equal(r.dashboardHash, '#/', `"Voltar" deveria levar ao painel, obtido ${r.dashboardHash}`);
    assert.equal(r.continueLabel, 'Continuar', `O botão de destaque deveria ser "Continuar", obtido "${r.continueLabel}"`);

    assert.equal(r.continueHash, '#/semester/sem1', `Clicar em "Continuar" deveria ir para #/semester/sem1, obtido ${r.continueHash}`);
    assert.equal(r.continueHeading, '1º Semestre', `Tela do semestre após "Continuar", obtido "${r.continueHeading}"`);

    assert.ok(
      r.disciplineHash.startsWith('#/semester/sem1/discipline/'),
      `Clicar em "Entrar" na disciplina deveria abrir a disciplina, obtido ${r.disciplineHash}`
    );
    assert.equal(
      r.disciplineHeading,
      r.disciplineCardTitle,
      `A tela da disciplina deveria mostrar "${r.disciplineCardTitle}", obtido "${r.disciplineHeading}"`
    );

    assert.ok(
      /^#\/semester\/sem1\/discipline\/[^/]+\/module\/[^/]+$/.test(r.moduleHash),
      `Clicar em "Entrar" no módulo deveria abrir o módulo, obtido ${r.moduleHash}`
    );
    assert.equal(
      r.moduleHeading,
      r.moduleCardTitle,
      `A tela do módulo deveria mostrar "${r.moduleCardTitle}", obtido "${r.moduleHeading}"`
    );

    assert.equal(r.overlays.length, 0, 'Nenhum overlay deveria sobrar aberto após fechar o diálogo');
    console.log('  ✅ Cliques: Continuar → Semestre → Disciplina → Módulo (rota e tela mudaram)');

    console.log('✅ Teste de interação passou com sucesso!');
  } catch (error) {
    console.error('❌ Teste de interação falhou:', error);
    process.exit(1);
  }
}

// ============================================================
// Entry point: worker (--url) ou orquestrador
// ============================================================
const args = process.argv.slice(2);
const urlIndex = args.indexOf('--url');

if (urlIndex !== -1) {
  const url = args[urlIndex + 1];
  const scenario = args[args.indexOf('--scenario') + 1] || 'deep';
  await runPage(url, scenario);
} else {
  runOrchestrator();
}
