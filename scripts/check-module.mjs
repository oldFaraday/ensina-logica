#!/usr/bin/env node
/**
 * check-module.mjs — portão da pipeline de conteúdo por módulo (v1).
 *
 * Uso:
 *   node scripts/check-module.mjs sem1/algorithms/m01
 *   node scripts/check-module.mjs sem1-algorithms-m01
 *   node scripts/check-module.mjs --list
 *
 * FALHA (exit 1) se o módulo não cumprir as regras de docs/CONTENT_PIPELINE.md.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { checkModuleContent, extractSectionIds } from './lib/module-rules.mjs';
import { splitFrontMatter } from './lib/front-matter.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

function fail(message) {
  console.error(`\n❌ ${message}`);
  process.exit(1);
}

function moduleEntries(curriculum) {
  const entries = [];
  for (const sem of curriculum.semesters || []) {
    for (const disc of sem.disciplines || []) {
      for (const mod of disc.modules || []) {
        entries.push({
          canonical: `sem${sem.number}-${disc.id}-${mod.id}`,
          semesterNumber: sem.number,
          semester: sem,
          discipline: disc,
          module: mod
        });
      }
    }
  }
  return entries;
}

function listModules(entries) {
  console.log('\nIDs de módulo em data/curriculum.json:');
  let lastSemester = null;
  for (const entry of entries) {
    if (entry.semester.id !== lastSemester) {
      lastSemester = entry.semester.id;
      console.log(`\n  ${entry.semester.title} (${entry.semester.id})`);
    }
    const lessons = Array.isArray(entry.module.lessons) && entry.module.lessons.length > 0
      ? ` — lições: ${entry.module.lessons.join(', ')}`
      : ' — sem lições (Em breve)';
    console.log(`    - ${entry.canonical}  ${entry.module.title}${lessons}`);
  }
}

function resolveModule(arg, entries) {
  const value = String(arg || '').trim().replace(/\\/g, '/');
  if (!value) return null;

  const direct = entries.find((entry) => entry.canonical === value);
  if (direct) return direct;

  const parts = value.split(/[/:]/).filter(Boolean);
  if (parts.length === 2) {
    const [disciplineId, moduleId] = parts;
    const matches = entries.filter(
      (entry) => entry.discipline.id === disciplineId && entry.module.id === moduleId
    );
    if (matches.length === 1) return matches[0];
    if (matches.length > 1) return { ambiguous: matches };
  }

  if (parts.length === 3) {
    const [semesterId, disciplineId, moduleId] = parts;
    const matches = entries.filter(
      (entry) =>
        entry.semester.id === semesterId &&
        entry.discipline.id === disciplineId &&
        entry.module.id === moduleId
    );
    if (matches.length === 1) return matches[0];
  }

  const byModuleId = entries.filter((entry) => entry.module.id === value);
  if (byModuleId.length === 1) return byModuleId[0];
  if (byModuleId.length > 1) return { ambiguous: byModuleId };

  return null;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function readExercises(path) {
  if (!existsSync(path)) return [];
  const parsed = readJson(path);
  return Array.isArray(parsed) ? parsed : [parsed];
}

function loadTheoryUnits(entry) {
  const dir = join(
    ROOT_DIR,
    'data',
    'theory',
    `sem${entry.semesterNumber}`,
    entry.discipline.id
  );
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((name) => extname(name) === '.md' && !name.startsWith('_'))
    .map((name) => {
      const markdown = readFileSync(join(dir, name), 'utf8');
      const { frontMatter: fm, content } = splitFrontMatter(markdown);
      return {
        id: fm.id,
        discipline: fm.discipline,
        module: fm.module,
        content,
        sections: extractSectionIds(content, fm.sections),
        newTerms: Array.isArray(fm.new_terms)
          ? fm.new_terms
          : typeof fm.new_terms === 'string' && fm.new_terms.trim()
            ? [fm.new_terms]
            : []
      };
    })
    .filter((unit) => unit.module === entry.module.id && unit.discipline === entry.discipline.id);
}

function loadModuleExercises(entry) {
  const dir = join(
    ROOT_DIR,
    'data',
    'exercises',
    `sem${entry.semesterNumber}`,
    entry.discipline.id
  );
  const result = { exercises: [], challenge: [], flashcards: [] };
  if (!existsSync(dir)) return result;

  const prefix = `${entry.module.id}-`;
  for (const name of readdirSync(dir)) {
    if (extname(name) !== '.json' || !name.startsWith(prefix) || name.startsWith('_')) continue;
    const suffix = name.slice(prefix.length, -extname(name).length);
    const filePath = join(dir, name);
    if (!statSync(filePath).isFile()) continue;
    const list = readExercises(filePath);
    if (suffix === 'challenge') {
      result.challenge.push(...list);
    } else if (suffix === 'flashcards') {
      result.flashcards.push(...list);
    } else if (/^l[0-9]{2,3}$/.test(suffix)) {
      result.exercises.push(...list);
    }
  }
  return result;
}

function loadGlossaryTerms() {
  const path = join(ROOT_DIR, 'data', 'glossary.json');
  if (!existsSync(path)) return [];
  try {
    const glossary = readJson(path);
    const terms = [];
    for (const group of glossary.groups || []) {
      for (const term of group.terms || []) terms.push(term);
    }
    return terms;
  } catch {
    return [];
  }
}

function main() {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const curriculumPath = join(ROOT_DIR, 'data', 'curriculum.json');
  if (!existsSync(curriculumPath)) fail('data/curriculum.json não encontrado');

  let curriculum;
  try {
    curriculum = readJson(curriculumPath);
  } catch (error) {
    fail(`data/curriculum.json inválido: ${error.message}`);
  }

  const entries = moduleEntries(curriculum);

  if (args.length === 0 || args[0] === '--list' || args[0] === 'list') {
    listModules(entries);
    if (args.length === 0) {
      console.log('\nUso: npm run check-module -- <id-do-módulo>');
      console.log('Exemplo: npm run check-module -- sem1/algorithms/m01');
    }
    process.exit(0);
  }

  const resolved = resolveModule(args[0], entries);
  if (!resolved) {
    console.error(`\n❌ Módulo não encontrado: ${args[0]}`);
    listModules(entries);
    process.exit(1);
  }
  if (resolved.ambiguous) {
    console.error(`\n❌ Módulo '${args[0]}' é ambíguo. Use um destes ids:`);
    for (const entry of resolved.ambiguous) console.error(`   - ${entry.canonical}`);
    process.exit(1);
  }

  const entry = resolved;
  const planPath = join(ROOT_DIR, 'docs', 'modules', entry.canonical, 'PLAN.md');
  const planText = existsSync(planPath) ? readFileSync(planPath, 'utf8') : '';
  const theoryUnits = loadTheoryUnits(entry);
  const { exercises, challenge, flashcards } = loadModuleExercises(entry);
  const glossaryTerms = loadGlossaryTerms();

  console.log(`\n🔎 check-module: ${entry.canonical} — ${entry.module.title}`);
  if (entry.module.pipeline_version !== 1) {
    console.log('  ℹ️  pipeline_version != 1 (módulo ainda não refeito; o portão continua valendo)');
  }
  console.log(
    `  ℹ️  ${theoryUnits.length} unidade(s), ${exercises.length} exercício(s) de lição, ` +
      `${challenge.length} do desafio, ${flashcards.length} flashcard(s)`
  );

  const errors = checkModuleContent({
    module: entry.module,
    moduleLabel: entry.canonical,
    planText,
    theoryUnits,
    exercises,
    challenge,
    flashcards,
    glossaryTerms
  });

  if (errors.length > 0) {
    console.error(`\n❌ check-module FALHOU (${errors.length} erro(s)):`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exit(1);
  }

  console.log('\n✅ check-module PASSOU');
  process.exit(0);
}

main();
