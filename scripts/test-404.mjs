/**
 * Teste estático do 404.html (T124 / AC-10).
 *
 * Verifica o fallback de SPA do GitHub Pages: uma URL profunda servida como 404
 * deve redirecionar para a rota hash equivalente (`/ensina-logica/#/...`).
 * Não há deploy aqui: o teste extrai e executa o script inline contra um
 * `window.location` falso, de forma determinística e offline.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);

const BASE_PATH = '/ensina-logica/';

function runFallback(pathname) {
  const html = readFileSync(join(ROOT_DIR, '404.html'), 'utf-8');
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(scriptMatch, '404.html deve conter um <script> de fallback');

  const fakeWindow = { location: { pathname, href: '' } };
  // eslint-disable-next-line no-new-func
  new Function('window', scriptMatch[1])(fakeWindow);
  return fakeWindow;
}

let passed = 0;
const ok = (label) => { passed += 1; console.log(`  ✅ ${label}`); };

try {
  console.log('🧪 Testando fallback SPA do 404.html...');

  const home = runFallback(`${BASE_PATH}`);
  assert.equal(home.location.href, `${BASE_PATH}#/`, 'raiz redireciona para #/');
  ok('raiz → #/');

  const deep = runFallback(`${BASE_PATH}semester/sem1/discipline/algorithms`);
  assert.equal(deep.location.href, `${BASE_PATH}#/semester/sem1/discipline/algorithms`, 'URL profunda → rota hash');
  ok('URL profunda → rota hash equivalente');

  const html = readFileSync(join(ROOT_DIR, '404.html'), 'utf-8');
  assert.ok(html.includes(BASE_PATH), '404.html usa o base path do Pages');
  assert.ok(/<a\s+href=/.test(html), '404.html oferece link manual de fallback');
  ok('base path e link manual presentes');

  console.log(`\n✅ Teste do 404.html passou (${passed}).`);
} catch (error) {
  console.error('❌ Teste do 404.html falhou:', error.message);
  process.exit(1);
}
