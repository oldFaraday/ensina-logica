#!/usr/bin/env node
/**
 * Contrast Tests — WCAG AA
 * Lê os design tokens de src/ui/theme.css, calcula a razão de contraste dos
 * pares semânticos e falha (exit 1) se algum par ficar abaixo de AA.
 *
 * Texto: >= 4.5 | UI (bordas/foco): >= 3.0
 * Também garante que o fallback (prefers-color-scheme) do tema escuro é idêntico
 * ao bloco html[data-theme="dark"].
 *
 * Executa: node scripts/test-contrast.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);
const CSS_PATH = join(ROOT_DIR, 'src', 'ui', 'theme.css');
const css = readFileSync(CSS_PATH, 'utf8');

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

/* --- Extração de tokens ---------------------------------------------------- */

function extractTokens(selector) {
  const idx = css.indexOf(selector);
  if (idx === -1) throw new Error(`Seletor não encontrado no CSS: ${selector}`);
  const open = css.indexOf('{', idx);
  const close = css.indexOf('}', open);
  const body = css.slice(open + 1, close);
  const tokens = {};
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(body))) tokens[`--${m[1]}`] = m[2].trim();
  return tokens;
}

const light = extractTokens(':root {');
const dark = extractTokens('html[data-theme="dark"]');
const darkFallback = extractTokens(':root:not([data-theme="light"])');

/* --- Contraste WCAG -------------------------------------------------------- */

function hexToRgb(hex) {
  let h = hex.trim();
  if (!h.startsWith('#')) throw new Error(`Valor não-hex em par de contraste: ${hex}`);
  h = h.slice(1);
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relLuminance(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const la = relLuminance(hexToRgb(a));
  const lb = relLuminance(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/* --- Pares semânticos [fgToken, bgToken, minimo, rotulo] ------------------- */

const TEXT_MIN = 4.5;
const UI_MIN = 3.0;

const PAIRS = [
  // Texto principal e secundário sobre superfícies
  ['--color-ink', '--color-bg', TEXT_MIN, 'texto sobre fundo'],
  ['--color-ink', '--color-surface', TEXT_MIN, 'texto sobre cartão'],
  ['--color-ink', '--color-surface-2', TEXT_MIN, 'texto sobre superfície alt.'],
  ['--color-ink-muted', '--color-bg', TEXT_MIN, 'texto secundário sobre fundo'],
  ['--color-ink-muted', '--color-surface', TEXT_MIN, 'texto secundário sobre cartão'],
  ['--color-ink-muted', '--color-surface-2', TEXT_MIN, 'texto secundário sobre alt.'],

  // Botões / chips coloridos
  ['--color-primary-ink', '--color-primary', TEXT_MIN, 'texto sobre primária'],
  ['--color-primary-ink', '--color-primary-hover', TEXT_MIN, 'texto sobre primária (hover)'],
  ['--color-primary', '--color-primary-soft', TEXT_MIN, 'primária sobre fundo suave'],
  ['--color-accent-ink', '--color-accent', TEXT_MIN, 'texto sobre destaque'],
  ['--color-cta-ink', '--color-cta', TEXT_MIN, 'texto sobre CTA'],

  // Estados (texto) e fundos suaves
  ['--color-success-ink', '--color-success', TEXT_MIN, 'texto sobre sucesso'],
  ['--color-success', '--color-success-soft', TEXT_MIN, 'sucesso sobre fundo suave'],
  ['--color-danger-ink', '--color-danger', TEXT_MIN, 'texto sobre perigo'],
  ['--color-danger', '--color-danger-soft', TEXT_MIN, 'perigo sobre fundo suave'],
  ['--color-warning-ink', '--color-warning', TEXT_MIN, 'texto sobre aviso'],
  ['--color-warning', '--color-warning-soft', TEXT_MIN, 'aviso sobre fundo suave'],

  // UI: bordas e foco
  ['--color-border', '--color-bg', UI_MIN, 'borda sobre fundo'],
  ['--color-border', '--color-surface', UI_MIN, 'borda sobre cartão'],
  ['--color-focus', '--color-bg', UI_MIN, 'foco sobre fundo'],
  ['--color-focus', '--color-surface', UI_MIN, 'foco sobre cartão']
];

const REQUIRED_TOKENS = [
  '--color-bg', '--color-surface', '--color-surface-2', '--color-ink',
  '--color-ink-muted', '--color-border', '--color-primary', '--color-primary-hover',
  '--color-primary-ink', '--color-primary-soft', '--color-accent', '--color-accent-ink',
  '--color-cta', '--color-cta-ink', '--color-success', '--color-success-ink',
  '--color-success-soft', '--color-danger', '--color-danger-ink', '--color-danger-soft',
  '--color-warning', '--color-warning-ink', '--color-warning-soft', '--color-focus',
  '--color-shadow'
];

/* --- Testes ---------------------------------------------------------------- */

console.log('\n🎨 Contraste dos tokens (WCAG AA)\n');

for (const [themeName, tokens] of [['claro', light], ['escuro', dark]]) {
  console.log(`  Tema ${themeName}:`);
  for (const [fg, bg, min, label] of PAIRS) {
    const fgVal = tokens[fg];
    const bgVal = tokens[bg];
    if (!fgVal || !bgVal) {
      fail(`${label}: token ausente (${!fgVal ? fg : bg})`);
      continue;
    }
    const ratio = contrast(fgVal, bgVal);
    const rounded = ratio.toFixed(2);
    if (ratio >= min) {
      ok(`${label}: ${rounded}:1 (min ${min})`);
    } else {
      fail(`${label}: ${rounded}:1 — abaixo de ${min}`);
    }
  }
  console.log('');
}

// Tokens obrigatórios presentes nos dois temas
console.log('  Estrutura de tokens:');
for (const token of REQUIRED_TOKENS) {
  if (light[token] && dark[token]) ok(`token ${token} presente (claro e escuro)`);
  else fail(`token ausente: ${token}`);
}

/* Fallback do tema escuro deve ser idêntico ao bloco [data-theme="dark"] */
const darkKeys = Object.keys(dark).sort();
const fbKeys = Object.keys(darkFallback).sort();
if (darkKeys.join(',') !== fbKeys.join(',')) {
  fail('fallback do tema escuro tem chaves diferentes de [data-theme="dark"]');
} else {
  let drift = null;
  for (const key of darkKeys) {
    if (dark[key] !== darkFallback[key]) { drift = key; break; }
  }
  if (drift) fail(`fallback do tema escuro divergente no token ${drift}`);
  else ok('fallback do tema escuro idêntico a [data-theme="dark"]');
}

/* Regras estruturais dos fundamentos visuais */
console.log('\n  Fundamentos visuais:');
const borderWidths = ['--border-width-sm', '--border-width', '--border-width-lg'];
for (const token of borderWidths) {
  const px = parseInt(light[token], 10);
  if (px >= 2 && px <= 4) ok(`${token} = ${px}px (faixa 2–4px)`);
  else fail(`${token} = ${light[token]} fora da faixa 2–4px`);
}

const touch = parseInt(light['--touch-target'], 10);
if (touch >= 44) ok(`--touch-target = ${touch}px (>= 44px)`);
else fail(`--touch-target = ${light['--touch-target']} abaixo de 44px`);

for (const token of ['--shadow-hard-sm', '--shadow-hard', '--shadow-hard-lg']) {
  const value = light[token] || '';
  // sombra dura: offset deslocado + blur 0 + spread 0
  if (/^\d+px\s+\d+px\s+0\s+0\s+/.test(value.trim())) ok(`${token} é sombra dura (${value})`);
  else fail(`${token} não é sombra dura sem desfoque: "${value}"`);
}

const radiusMd = parseInt(light['--radius-md'], 10);
if (radiusMd <= 4) ok(`--radius-md = ${radiusMd}px (cantos quase retos)`);
else fail(`--radius-md = ${light['--radius-md']} — cantos arredondados demais`);

/* --- Resultado ------------------------------------------------------------- */

console.log(`\n${failed === 0 ? '✅' : '❌'} Contraste: ${passed} ok, ${failed} falhas\n`);

if (failed > 0) process.exit(1);
