#!/usr/bin/env node
/**
 * Verificação de fontes (MANUAL — fora do CI)
 *
 * Baixa cada `source.url` das unidades teóricas e confere se o
 * `original_excerpt` aparece no texto da página. Serve para provar, de tempos
 * em tempos, que nenhuma unidade `verified_with_source` carrega um trecho que
 * não existe na fonte.
 *
 * Uso:
 *   node scripts/verify-sources.mjs            # verifica todas as unidades
 *   node scripts/verify-sources.mjs th-sem...  # filtra por id (substring)
 *
 * Saída por unidade: "confere", "não confere" ou "sem acesso".
 * Código de saída: 0 se tudo conferir; 1 se houver "não confere" ou "sem acesso".
 *
 * NÃO roda no CI (sem rede garantida e para não tornar o build dependente de
 * fontes externas). O CI valida a *forma* do trecho; este script valida o
 * *conteúdo* contra a fonte viva.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

const filter = process.argv.slice(2).find((a) => !a.startsWith('-'));

function findMarkdownFiles(dir) {
  const files = [];
  function walk(d) {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (extname(entry) === '.md' && !entry.startsWith('_')) files.push(full);
    }
  }
  walk(dir);
  return files;
}

/** Parser de front-matter de um nível (suficiente para `source:` + `original_excerpt`). */
function parseFrontMatter(yaml) {
  const result = {};
  let parentKey = null;
  const stripQuotes = (v) => String(v).trim().replace(/^["']|["']$/g, '');

  for (const rawLine of String(yaml).split('\n')) {
    const raw = rawLine.replace(/\s+$/, '');
    const indent = raw.length - raw.trimStart().length;
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const kv = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!kv) {
      parentKey = null;
      continue;
    }
    const [, key, rawValue] = kv;
    const value = rawValue.trim();

    if (indent === 0) {
      if (value === '') {
        result[key] = {};
        parentKey = key;
      } else {
        result[key] = stripQuotes(value);
        parentKey = null;
      }
      continue;
    }

    if (parentKey && typeof result[parentKey] === 'object') {
      result[parentKey][key] = stripQuotes(value);
    }
  }
  return result;
}

/**
 * Normaliza texto para comparação robusta:
 * - remove tags HTML e entidades comuns;
 * - remove invólucros LaTeX `\(` `\)` e barras invertidas;
 * - colapsa espaços e baixa a caixa.
 */
function normalize(text) {
  return String(text ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\[()[\]]/g, '')
    .replace(/\\/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#8217;|&rsquo;/gi, "'")
    .replace(/&#8216;|&lsquo;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#8220;|&ldquo;/gi, '"')
    .replace(/&#8221;|&rdquo;/gi, '"')
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/"\s+/g, '"')
    .replace(/\s+"/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    // Tags inline inserem espaços antes de pontuação ("statement ."): remove-os.
    .replace(/\s+([.,;:!?)\]])/g, '$1')
    .replace(/([([{])\s+/g, '$1');
}

async function fetchText(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9'
    }
  });
  if (!res.ok) return { ok: false, status: res.status };
  return { ok: true, text: await res.text() };
}

async function main() {
  console.log('🔎 Verificação de fontes (manual) — Ensina Lógica');
  console.log('=================================================');

  const theoryDir = join(ROOT_DIR, 'data/theory');
  let files = [];
  try {
    files = findMarkdownFiles(theoryDir);
  } catch {
    console.error(`\n❌ Diretório não encontrado: ${theoryDir}`);
    process.exit(1);
  }

  const units = [];
  for (const file of files) {
    const content = readFileSync(file, 'utf-8').replace(/\r\n?/g, '\n');
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue;
    const fm = parseFrontMatter(m[1]);
    if (filter && !String(fm.id || '').includes(filter)) continue;
    if (fm.verification_status !== 'verified_with_source') continue;
    units.push({ id: fm.id, url: fm.source && fm.source.url, excerpt: fm.original_excerpt });
  }

  if (units.length === 0) {
    console.log('\nℹ️  Nenhuma unidade `verified_with_source` para verificar.');
    process.exit(0);
  }

  let naoConfere = 0;
  let semAcesso = 0;

  for (const unit of units) {
    const label = `${unit.id}`;
    if (!unit.url || !unit.excerpt) {
      console.log(`  ⚠️  ${label}: sem URL ou sem original_excerpt`);
      naoConfere++;
      continue;
    }

    let result;
    try {
      result = await fetchText(unit.url);
    } catch (e) {
      console.log(`  🌐 sem acesso  — ${label} (${e.message})`);
      console.log(`       ${unit.url}`);
      semAcesso++;
      continue;
    }

    if (!result.ok) {
      console.log(`  🌐 sem acesso  — ${label} (HTTP ${result.status})`);
      console.log(`       ${unit.url}`);
      semAcesso++;
      continue;
    }

    const needle = normalize(unit.excerpt);
    const haystack = normalize(result.text);
    if (needle && haystack.includes(needle)) {
      console.log(`  ✅ confere      — ${label}`);
    } else {
      console.log(`  ❌ não confere  — ${label}`);
      console.log(`       ${unit.url}`);
      console.log(`       trecho: ${unit.excerpt}`);
      naoConfere++;
    }
  }

  console.log('\n📊 Resultado:');
  console.log(`  unidades verificadas: ${units.length}`);
  console.log(`  confere:              ${units.length - naoConfere - semAcesso}`);
  console.log(`  não confere:          ${naoConfere}`);
  console.log(`  sem acesso:           ${semAcesso}`);

  process.exit(naoConfere > 0 || semAcesso > 0 ? 1 : 0);
}

main();
