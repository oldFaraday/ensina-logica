/**
 * Teste de DOM/Integração (jsdom)
 *
 * Carrega o index.html real, executa initApp() e garante que a rota inicial
 * (#/) renderiza conteúdo dentro de <main>.
 *
 * Regressão que este teste cobre: o módulo de acessibilidade alterava o id do
 * <main> (main -> main-content) e o router procurava por `getElementById('main')`,
 * abortando a renderização e deixando a área principal vazia.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

// 1. DOM real a partir do index.html servido em produção
const html = readFileSync(join(ROOT_DIR, 'index.html'), 'utf-8');
const dom = new JSDOM(html, {
  url: 'http://localhost/#/',
  pretendToBeVisual: true,
});
const { window } = dom;

// 2. APIs que o jsdom não implementa e que o app utiliza
window.matchMedia = () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
});

// 3. Expõe o DOM no escopo global (os módulos usam document/window/history/etc.)
// `navigator`/`location` são getters no Node moderno: usa defineProperty
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
  Object.defineProperty(global, key, {
    value,
    writable: true,
    configurable: true,
  });
}

// 4. fetch: resolve arquivos locais relativos à raiz do projeto
global.fetch = async (url) => {
  const relativePath = String(url).replace(/^\.\//, '');
  try {
    const content = readFileSync(join(ROOT_DIR, relativePath), 'utf-8');
    return {
      ok: true,
      status: 200,
      json: async () => JSON.parse(content),
      text: async () => content,
    };
  } catch {
    return {
      ok: false,
      status: 404,
      json: async () => ({}),
      text: async () => '',
    };
  }
};

console.log('🧪 Executando teste de DOM (jsdom): rota inicial #/ ...');

try {
  // 5. Importa e executa o boot da aplicação
  const { initApp } = await import(
    pathToFileURL(join(ROOT_DIR, 'src', 'app.js')).href
  );

  await initApp();
  // Deixa listeners assíncronos ('load'/'hashchange') e o render concluírem
  await new Promise((resolve) => setTimeout(resolve, 50));

  const main = document.querySelector('main');
  assert.ok(main, 'O elemento <main> não foi encontrado no index.html');

  const markup = main.innerHTML.trim();
  assert.ok(
    markup.length > 0,
    'A área principal (<main>) ficou vazia após initApp() na rota inicial #/'
  );

  assert.ok(
    main.querySelector('.dashboard') || main.querySelector('.semester-card'),
    'A rota inicial não renderizou o painel com o mapa de semestres'
  );

  const semesterCards = main.querySelectorAll('.semester-card').length;
  assert.ok(
    semesterCards >= 8,
    `Esperado >= 8 semestres no mapa (1º com conteúdo + 2º..8º "em breve"), obtido ${semesterCards}`
  );

  console.log(`  ✅ <main> renderizado (${markup.length} caracteres)`);
  console.log(`  ✅ ${semesterCards} semestres no mapa`);
  console.log('✅ Teste de DOM passou com sucesso!');
} catch (error) {
  console.error('❌ Teste de DOM falhou:', error);
  process.exit(1);
}
