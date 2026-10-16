#!/usr/bin/env node
/**
 * Responsive Tests — Biblioteca Teórica (T127)
 * Análise ESTÁTICA de src/ui/theme.css: garante que as regras que impedem o
 * "blowout" horizontal da teoria/biblioteca no celular existem. Falha (exit 1)
 * se alguma regra de contenção estiver ausente.
 *
 * Cobre: min-width:0 nos filhos do grid, overflow-x em `pre`/`.katex-display`,
 * max-width:100% em mídia/tabelas e quebra de texto longo nos contêineres.
 *
 * Executa: node scripts/test-responsive.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);
const CSS_PATH = join(ROOT_DIR, 'src', 'ui', 'theme.css');
const css = readFileSync(CSS_PATH, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

let passed = 0;
let failed = 0;

function ok(message) {
  console.log(`  ✅ ${message}`);
  passed++;
}

function fail(message) {
  console.error(`  ❌ ${message}`);
  failed++;
}

/* --- Parser mínimo: coleta regras (inclusive dentro de @media) -------------- */

function collectRules(text) {
  const rules = [];
  let buf = '';
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '{') {
      const selectorText = buf.trim();
      let depth = 1;
      let j = i + 1;
      let body = '';
      while (j < text.length) {
        const c = text[j];
        if (c === '{') depth++;
        else if (c === '}') {
          depth--;
          if (depth === 0) break;
        }
        body += c;
        j++;
      }
      const isAtRule = selectorText.startsWith('@');
      if (isAtRule) {
        rules.push({ selectorText, body, at: true, children: collectRules(body) });
      } else {
        rules.push({ selectorText, body, at: false });
      }
      buf = '';
      i = j + 1;
      continue;
    }
    if (ch === '}') {
      buf = '';
      i++;
      continue;
    }
    buf += ch;
    i++;
  }
  return rules;
}

const topRules = collectRules(css);

/** Achata todas as regras de estilo (fora de at-rules). */
function flatten(rules) {
  const out = [];
  for (const rule of rules) {
    if (rule.at) out.push(...flatten(rule.children || []));
    else out.push(rule);
  }
  return out;
}

const styleRules = flatten(topRules);

function selectorList(rule) {
  return rule.selectorText.split(',').map((s) => s.trim());
}

/** Corpos das regras cujo seletor casa exatamente `selector`. */
function bodiesFor(selector) {
  return styleRules.filter((r) => selectorList(r).includes(selector)).map((r) => r.body);
}

/** Corpos das regras cujo seletor contém `needle` (ex.: qualquer regra `table`). */
function bodiesMatching(needle) {
  return styleRules
    .filter((r) => r.selectorText.includes(needle))
    .map((r) => r.body);
}

function hasDecl(bodies, prop, valuePattern = /.*/) {
  const re = new RegExp(`${prop.replace(/[-[\]{}()*+?.\\^$|]/g, '\\$&')}\\s*:\\s*([^;]+)`, 'i');
  return bodies.some((body) => {
    const m = body.match(re);
    return Boolean(m) && valuePattern.test(m[1].trim());
  });
}

function expectDecl(selector, prop, valuePattern, label) {
  const bodies = bodiesFor(selector);
  if (bodies.length === 0) {
    fail(`${label}: regra "${selector}" ausente no CSS`);
    return;
  }
  if (hasDecl(bodies, prop, valuePattern)) ok(`${label}: ${selector} { ${prop} }`);
  else fail(`${label}: "${selector}" sem ${prop}`);
}

/* --- Testes ---------------------------------------------------------------- */

console.log('\n📱 Responsividade da Biblioteca Teórica (T127)\n');

console.log('  Conteúdo largo não estoura a coluna:');
expectDecl('.theory-layout', 'min-width', /0$/, 'grid não infla');
expectDecl('.theory-layout > *', 'min-width', /0$/, 'filhos do grid não inflam');
for (const sel of ['.theory-main', '.theory-sidebar-host', '.theory-unit', '.theory-section']) {
  expectDecl(sel, 'min-width', /0$/, `contenção de ${sel}`);
  expectDecl(sel, 'max-width', /100%/, `largura máxima de ${sel}`);
}

console.log('\n  Código e fórmulas rolam dentro do próprio bloco:');
expectDecl('pre', 'overflow-x', /auto/, 'rolagem de <pre>');
expectDecl('pre', 'max-width', /100%/, 'largura de <pre>');
expectDecl('pre code', 'white-space', /pre/, 'preserva espaços no código');
expectDecl('.katex-display', 'overflow-x', /auto/, 'rolagem da fórmula em bloco');
expectDecl('.katex-display', 'max-width', /100%/, 'largura da fórmula em bloco');

console.log('\n  Mídia e tabelas limitadas:');
for (const sel of ['img', 'svg']) expectDecl(sel, 'max-width', /100%/, `largura de ${sel}`);
const mediaBodies = bodiesFor('img').concat(bodiesFor('svg'));
if (mediaBodies.some((b) => /height\s*:\s*auto/i.test(b))) ok('mídia com height:auto');
else fail('mídia (img/svg) sem height:auto');
if (bodiesMatching('table').some((b) => /max-width\s*:\s*100%/i.test(b))) ok('tabelas com max-width:100%');
else fail('nenhuma regra de tabela com max-width:100%');
expectDecl('.theory-section-body table', 'overflow-x', /auto/, 'rolagem de tabela');

console.log('\n  Quebra de texto longo/URL:');
for (const sel of ['main', '.theory-section-body', '.theory-attribution dd', '.lesson-summary-text', '.library-item']) {
  const bodies = bodiesFor(sel);
  if (hasDecl(bodies, 'overflow-wrap', /anywhere|break-word/)) ok(`${sel} com overflow-wrap`);
  else fail(`"${sel}" sem overflow-wrap`);
}

console.log('\n  Campos da biblioteca ocupam a largura:');
for (const sel of ['.library-search-input', '.library-discipline-filter']) {
  expectDecl(sel, 'width', /100%/, `campo ${sel}`);
}

console.log('\n  Rede de segurança e coluna única no celular:');
const htmlBodies = bodiesFor('html');
if (hasDecl(htmlBodies, 'overflow-x', /clip|hidden/)) ok('html com overflow-x (rede de segurança)');
else fail('html sem overflow-x (rede de segurança) ausente');

const mobile = topRules.find((r) => r.at && /max-width\s*:\s*767px/.test(r.selectorText));
if (!mobile) {
  fail('media query @media (max-width: 767px) ausente');
} else {
  const mobileRules = flatten(mobile.children || []);
  const layout = mobileRules.filter((r) => selectorList(r).includes('.theory-layout'));
  if (layout.some((r) => /grid-template-columns\s*:\s*1fr/i.test(r.body))) ok('teoria em coluna única no celular');
  else fail('teoria não força coluna única no celular');
}

/* --- Resultado ------------------------------------------------------------- */

console.log(`\n${failed === 0 ? '✅' : '❌'} Responsividade: ${passed} ok, ${failed} falhas\n`);

if (failed > 0) process.exit(1);
