/**
 * Teste do confete (T074/T085): cria partículas e NÃO cria nada quando
 * `prefers-reduced-motion: reduce` está ativo.
 */

import { strict as assert } from 'assert';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost/' });
const { window } = dom;
for (const [key, value] of [
  ['window', window],
  ['document', window.document],
  ['HTMLElement', window.HTMLElement],
  ['Node', window.Node]
]) {
  Object.defineProperty(global, key, { value, writable: true, configurable: true });
}

const { celebrate } = await import(new URL('../src/ui/confetti.js', import.meta.url));

let passed = 0;
const ok = (label) => { passed += 1; console.log(`  ✅ ${label}`); };

try {
  console.log('🧪 Teste do confete (jsdom)...');

  // Movimento normal → cria partículas
  window.matchMedia = () => ({ matches: false });
  celebrate({ count: 5 });
  assert.equal(window.document.querySelectorAll('.confetti').length, 5, 'cinco partículas criadas');
  ok('T074 celebrate cria partículas quando movimento é permitido');

  window.document.querySelectorAll('.confetti').forEach((el) => el.remove());

  // Movimento reduzido → não cria nada
  window.matchMedia = () => ({ matches: true });
  celebrate({ count: 5 });
  assert.equal(window.document.querySelectorAll('.confetti').length, 0, 'nenhuma partícula com reduced-motion');
  ok('T085 celebrate respeita prefers-reduced-motion');

  console.log(`\n✅ Todos os testes de confete passaram (${passed}).`);
} catch (error) {
  console.error('❌ Teste de confete falhou:', error);
  process.exit(1);
}
