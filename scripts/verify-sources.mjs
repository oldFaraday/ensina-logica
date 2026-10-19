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
 *   node scripts/verify-sources.mjs                       # verifica todas as unidades
 *   node scripts/verify-sources.mjs sem1-algorithms-m03    # só um módulo (id canônico)
 *   node scripts/verify-sources.mjs algorithms/m03         # id curto (disciplina/módulo)
 *   node scripts/verify-sources.mjs m03                    # id de módulo, se não for ambíguo
 *   node scripts/verify-sources.mjs th-sem...              # legado: filtra por id de unidade (substring)
 *
 * Saída por unidade: "confere", "não confere" ou "sem acesso".
 * Código de saída: 0 se tudo conferir; 1 se houver "não confere"/"sem acesso"
 * **entre as unidades selecionadas**. Com um id de módulo, o código reflete
 * somente aquele módulo (falhas em outros módulos não afetam o resultado).
 *
 * NÃO roda no CI (sem rede garantida e para não tornar o build dependente de
 * fontes externas). O CI valida a *forma* do trecho; este script valida o
 * *conteúdo* contra a fonte viva.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

const arg = process.argv.slice(2).find((a) => !a.startsWith('-'));

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
 * Lista os módulos de `data/curriculum.json` no mesmo formato do check-module,
 * para que `npm run verify-sources -- <id>` aceite o id canônico
 * (`sem1-algorithms-m03`), `disciplina/módulo` (`algorithms/m03`) ou o id do
 * módulo quando não houver ambiguidade (`m03`).
 */
function moduleEntries(curriculum) {
  const entries = [];
  for (const sem of curriculum.semesters || []) {
    for (const disc of sem.disciplines || []) {
      for (const mod of disc.modules || []) {
        entries.push({
          canonical: `sem${sem.number}-${disc.id}-${mod.id}`,
          semesterId: sem.id,
          disciplineId: disc.id,
          moduleId: mod.id,
          title: mod.title
        });
      }
    }
  }
  return entries;
}

function resolveModule(value, entries) {
  const v = String(value || '').trim().replace(/\\/g, '/');
  if (!v) return null;

  const direct = entries.find((entry) => entry.canonical === v);
  if (direct) return direct;

  const parts = v.split(/[/:]/).filter(Boolean);
  if (parts.length === 2) {
    const [disciplineId, moduleId] = parts;
    const matches = entries.filter(
      (entry) => entry.disciplineId === disciplineId && entry.moduleId === moduleId
    );
    if (matches.length === 1) return matches[0];
    if (matches.length > 1) return { ambiguous: matches };
  }
  if (parts.length === 3) {
    const [semesterId, disciplineId, moduleId] = parts;
    const matches = entries.filter(
      (entry) => entry.semesterId === semesterId && entry.disciplineId === disciplineId && entry.moduleId === moduleId
    );
    if (matches.length === 1) return matches[0];
  }

  const byModuleId = entries.filter((entry) => entry.moduleId === v);
  if (byModuleId.length === 1) return byModuleId[0];
  if (byModuleId.length > 1) return { ambiguous: byModuleId };
  return null;
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

  const allUnits = [];
  for (const file of files) {
    const content = readFileSync(file, 'utf-8').replace(/\r\n?/g, '\n');
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue;
    const fm = parseFrontMatter(m[1]);
    allUnits.push({
      id: fm.id,
      discipline: fm.discipline,
      module: fm.module,
      status: fm.verification_status,
      url: fm.source && fm.source.url,
      excerpt: fm.original_excerpt
    });
  }

  // Seleção: id de módulo (preferencial) ou substring do id da unidade (legado).
  let selected = allUnits;
  let scopeLabel = 'todas as unidades';
  let moduleMode = false;

  if (arg) {
    const curriculumPath = join(ROOT_DIR, 'data', 'curriculum.json');
    let curriculum = null;
    try {
      curriculum = JSON.parse(readFileSync(curriculumPath, 'utf8'));
    } catch {
      curriculum = null;
    }

    const resolved = curriculum ? resolveModule(arg, moduleEntries(curriculum)) : null;

    if (resolved && resolved.ambiguous) {
      console.error(`\n❌ Módulo '${arg}' é ambíguo. Use um destes ids:`);
      for (const entry of resolved.ambiguous) console.error(`   - ${entry.canonical}`);
      process.exit(1);
    }

    if (resolved) {
      moduleMode = true;
      scopeLabel = `módulo ${resolved.canonical} — ${resolved.title}`;
      selected = allUnits.filter(
        (unit) => unit.discipline === resolved.disciplineId && unit.module === resolved.moduleId
      );
    } else {
      selected = allUnits.filter((unit) => String(unit.id || '').includes(arg));
      scopeLabel = `unidades com id contendo '${arg}'`;
      if (selected.length === 0) {
        console.error(`\n❌ Módulo ou unidade não encontrado: ${arg}`);
        console.error('   Use o id canônico (ex.: sem1-algorithms-m03), disciplina/módulo (algorithms/m03) ou um id de unidade.');
        process.exit(1);
      }
    }
  }

  const units = selected.filter((unit) => unit.status === 'verified_with_source');

  console.log(`  Escopo: ${scopeLabel}`);
  if (moduleMode && selected.length > units.length) {
    const skipped = selected.length - units.length;
    console.log(`  ℹ️  ${skipped} unidade(s) fora de verified_with_source — não verificadas.`);
  }

  if (units.length === 0) {
    console.log('\nℹ️  Nenhuma unidade `verified_with_source` para verificar no escopo.');
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
  console.log(`  escopo:               ${scopeLabel}`);
  console.log(`  unidades verificadas: ${units.length}`);
  console.log(`  confere:              ${units.length - naoConfere - semAcesso}`);
  console.log(`  não confere:          ${naoConfere}`);
  console.log(`  sem acesso:           ${semAcesso}`);

  process.exit(naoConfere > 0 || semAcesso > 0 ? 1 : 0);
}

main();
