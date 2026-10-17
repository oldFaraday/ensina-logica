#!/usr/bin/env node
/**
 * Validation Script
 * Validação CI: curriculum schema, theory units, exercises, links, licenças, ATTRIBUTIONS.md sync
 * Executa: node scripts/validate.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { CURRENT_SCHEMA_VERSION } from '../src/store/schema-version.js';
import {
  ALLOWED_LICENSES,
  FORBIDDEN_LICENSES,
  theoryUnitContentErrors,
  exerciseContentErrors,
  generateAttributionsBlock,
  extractAttributionsBlock,
  collectUnitIds,
  ATTRIBUTIONS_BEGIN,
  ATTRIBUTIONS_END
} from './lib/content-rules.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

// Schema IDs esperados
const REQUIRED_THEORY_FIELDS = [
  'id', 'title', 'discipline', 'module', 'source', 'license',
  'derivation_type', 'language', 'verification_status',
  'linked_lessons', 'linked_exercises'
];

const REQUIRED_EXERCISE_FIELDS = [
  'id', 'theory_unit_id', 'lesson_id', 'type',
  'generated_by_ai', 'prompt', 'correct', 'explanation',
  'difficulty', 'xp_base'
];

const REQUIRED_SOURCE_FIELDS = [
  'title', 'authors', 'url', 'chapter', 'section',
  'access_date', 'edition', 'license_url', 'license_confirmed_at'
];

let errors = [];
let warnings = [];

function error(msg, file = null) {
  const prefix = file ? `[${file}] ` : '';
  errors.push(`${prefix}${msg}`);
}

function warn(msg, file = null) {
  const prefix = file ? `[${file}] ` : '';
  warnings.push(`${prefix}${msg}`);
}

function success(msg) {
  console.log(`  ✅ ${msg}`);
}

function info(msg) {
  console.log(`  ℹ️  ${msg}`);
}

// ============================================
// 1. Valida curriculum.json
// ============================================
function validateCurriculum() {
  console.log('\n📋 Validando curriculum.json...');
  const path = join(ROOT_DIR, 'data/curriculum.json');

  if (!existsSync(path)) {
    error('Arquivo não encontrado: data/curriculum.json');
    return;
  }

  try {
    const curriculum = JSON.parse(readFileSync(path, 'utf-8'));

    if (!curriculum.version) error('Campo "version" ausente');
    if (!curriculum.semesters || !Array.isArray(curriculum.semesters)) {
      error('Campo "semesters" ausente ou inválido');
      return;
    }

    if (curriculum.semesters.length !== 8) {
      warn(`Esperados 8 semestres, encontrados ${curriculum.semesters.length}`);
    }

    for (const sem of curriculum.semesters) {
      if (!sem.id || !sem.number || !sem.title) {
        error(`Semestre inválido: ${JSON.stringify(sem)}`);
      }
      if (!sem.disciplines || !Array.isArray(sem.disciplines)) {
        error(`Semestre ${sem.id}: disciplinas ausentes`);
        continue;
      }

      for (const disc of sem.disciplines) {
        if (!disc.id || !disc.title || !disc.modules) {
          error(`Disciplina inválida em ${sem.id}: ${JSON.stringify(disc)}`);
          continue;
        }

        for (const mod of disc.modules) {
          if (!mod.id || !mod.title || !mod.lessons) {
            error(`Módulo inválido em ${sem.id}/${disc.id}: ${JSON.stringify(mod)}`);
          }
        }
      }
    }

    success('curriculum.json válido');
  } catch (e) {
    error(`JSON inválido: ${e.message}`);
  }
}

// ============================================
// 2. Valida unidades teóricas
// ============================================
function validateTheoryUnits() {
  console.log('\n📚 Validando unidades teóricas...');
  const theoryDir = join(ROOT_DIR, 'data/theory');

  if (!existsSync(theoryDir)) {
    warn('Diretório data/theory não existe (ainda sem conteúdo)');
    return [];
  }

  const units = findMarkdownFiles(theoryDir);
  if (units.length === 0) {
    warn('Nenhuma unidade teórica encontrada');
    return [];
  }

  const collected = [];
  for (const file of units) {
    const info = validateTheoryFile(file);
    if (info) collected.push(info);
  }

  success(`${units.length} unidade(s) teórica(s) validada(s)`);
  return collected;
}

function findMarkdownFiles(dir) {
  const files = [];
  function walk(d) {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (extname(entry) === '.md' && !entry.startsWith('_')) {
        files.push(full);
      }
    }
  }
  walk(dir);
  return files;
}

function validateTheoryFile(filePath) {
  const relPath = filePath.replace(ROOT_DIR + '/', '');
  const content = readFileSync(filePath, 'utf-8').replace(/\r\n?/g, '\n');

  // Parse front-matter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    error('Front-matter não encontrado', relPath);
    return;
  }

  const fm = parseFrontMatter(fmMatch[1]);

  // Campos obrigatórios
  for (const field of REQUIRED_THEORY_FIELDS) {
    if (!(field in fm)) {
      error(`Campo obrigatório ausente: ${field}`, relPath);
    }
  }

  // Valida license
  if (fm.license) {
    if (!ALLOWED_LICENSES.includes(fm.license)) {
      error(`Licença não permitida para derivação: ${fm.license}`, relPath);
    }
    if (FORBIDDEN_LICENSES.includes(fm.license)) {
      error(`Licença EXPLICITAMENTE PROIBIDA: ${fm.license}`, relPath);
    }
  }

  // Valida source
  if (fm.source) {
    for (const field of REQUIRED_SOURCE_FIELDS) {
      if (!fm.source[field]) {
        warn(`Source.${field} ausente`, relPath);
      }
    }

    // Verifica URL da licença (HEAD request simulado - em CI real faria fetch)
    if (fm.source.license_url) {
      info(`License URL: ${fm.source.license_url}`);
    }
  }

  // Valida derivation_type
  if (fm.derivation_type && !['original', 'translated', 'adapted', 'summarized'].includes(fm.derivation_type)) {
    error(`derivation_type inválido: ${fm.derivation_type}`, relPath);
  }

  // Valida verification_status
  if (fm.verification_status && !['pending', 'unverified', 'verified_with_source'].includes(fm.verification_status)) {
    error(`verification_status inválido: ${fm.verification_status}`, relPath);
  }

  // ID pattern
  if (fm.id && !/^th-sem[1-8]-[a-z-]+-[a-z0-9-]+$/.test(fm.id)) {
    error(`ID inválido (padrão: th-sem{N}-{discipline}-{module}-{slug}): ${fm.id}`, relPath);
  }

  // Regras anti-placeholder (endurecidas): URL genérica, trecho literal,
  // idioma do trecho, verified_at/verification_method, licença/edição proibida.
  for (const msg of theoryUnitContentErrors(fm)) {
    error(msg, relPath);
  }

  return {
    id: fm.id,
    relPath,
    module: fm.module,
    discipline: fm.discipline,
    linkedLessons: Array.isArray(fm.linked_lessons) ? fm.linked_lessons : [],
    linkedExercises: Array.isArray(fm.linked_exercises) ? fm.linked_exercises : [],
    verificationStatus: fm.verification_status,
    license: fm.license,
    source: fm.source || {}
  };
}

/**
 * Parser de front-matter (one-level nesting), consistente com o loader.
 * Suporta escalares, listas inline `[a, b]`, strings multilinha (`|`/`>`) e UM
 * nível de objeto aninhado (ex.: `source:`).
 */
function parseFrontMatter(yaml) {
  const result = {};
  let parentKey = null;
  let currentArray = null;
  let inMultiline = false;
  let multilineKey = null;

  const stripQuotes = (v) => String(v).trim().replace(/^["']|["']$/g, '');
  const parseInlineArray = (v) =>
    v.slice(1, -1).split(',').map(stripQuotes).filter((s) => s !== '');

  for (const rawLine of String(yaml).split('\n')) {
    const raw = rawLine.replace(/\s+$/, '');
    const indent = raw.length - raw.trimStart().length;
    const trimmed = raw.trim();

    if (inMultiline) {
      if (trimmed === '' || indent >= 2) {
        result[multilineKey] = (result[multilineKey] || '') + (result[multilineKey] ? '\n' : '') + trimmed;
        continue;
      }
      inMultiline = false;
      multilineKey = null;
    }

    if (!trimmed || trimmed.startsWith('#')) continue;

    const arrayMatch = trimmed.match(/^-\s+(.*)$/);
    if (arrayMatch && currentArray) {
      currentArray.push(stripQuotes(arrayMatch[1]));
      continue;
    }

    const kvMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!kvMatch) {
      parentKey = null;
      currentArray = null;
      continue;
    }

    const [, key, rawValue] = kvMatch;
    const value = rawValue.trim();

    if (indent === 0) {
      currentArray = null;

      if (value === '') {
        result[key] = {};
        parentKey = key;
        continue;
      }

      if (value === '|' || value === '>') {
        inMultiline = true;
        multilineKey = key;
        result[key] = '';
        parentKey = null;
        continue;
      }

      if (value.startsWith('[') && value.endsWith(']')) {
        result[key] = parseInlineArray(value);
        parentKey = null;
        continue;
      }

      result[key] = stripQuotes(value);
      parentKey = null;
      continue;
    }

    if (parentKey && result[parentKey] && typeof result[parentKey] === 'object') {
      if (value === '') {
        result[parentKey][key] = {};
      } else if (value.startsWith('[') && value.endsWith(']')) {
        result[parentKey][key] = parseInlineArray(value);
      } else {
        result[parentKey][key] = stripQuotes(value);
      }
      currentArray = null;
    }
  }

  return result;
}

// ============================================
// 3. Valida exercícios
// ============================================
function validateExercises(theoryById = new Map()) {
  console.log('\n🏋️ Validando exercícios...');
  const exercisesDir = join(ROOT_DIR, 'data/exercises');

  if (!existsSync(exercisesDir)) {
    warn('Diretório data/exercises não existe (ainda sem conteúdo)');
    return [];
  }

  const files = findJsonFiles(exercisesDir);
  if (files.length === 0) {
    warn('Nenhum exercício encontrado');
    return [];
  }

  const collected = [];
  for (const file of files) {
    collected.push(...validateExerciseFile(file, theoryById));
  }

  success(`${files.length} arquivo(s) de exercício validado(s) (${collected.length} exercício(s))`);
  return collected;
}

function findJsonFiles(dir) {
  const files = [];
  function walk(d) {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (extname(entry) === '.json' && !entry.startsWith('_')) {
        files.push(full);
      }
    }
  }
  walk(dir);
  return files;
}

function validateExerciseFile(filePath, theoryById = new Map()) {
  const relPath = filePath.replace(ROOT_DIR + '/', '');
  const collected = [];

  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
    // Convenção: 1 arquivo por lição, contendo um ARRAY de exercícios.
    // Compatibilidade: também aceita um único objeto.
    const exercises = Array.isArray(parsed) ? parsed : [parsed];

    if (exercises.length === 0) {
      error('Arquivo de exercícios vazio', relPath);
      return collected;
    }

    // Detecta ids duplicados dentro do arquivo
    const seen = new Set();

    exercises.forEach((exercise, idx) => {
      const label = `${relPath}#${idx}`;
      validateExerciseObject(exercise, label, theoryById);

      if (exercise.id) {
        if (seen.has(exercise.id)) {
          error(`ID de exercício duplicado no arquivo: ${exercise.id}`, label);
        }
        seen.add(exercise.id);
      }

      collected.push({
        id: exercise.id,
        lessonId: exercise.lesson_id,
        theoryUnitId: exercise.theory_unit_id,
        type: exercise.type,
        relPath: label
      });
    });
  } catch (e) {
    error(`JSON inválido: ${e.message}`, relPath);
  }

  return collected;
}

function validateExerciseObject(exercise, relPath, theoryById = new Map()) {
  for (const field of REQUIRED_EXERCISE_FIELDS) {
    if (!(field in exercise)) {
      error(`Campo obrigatório ausente: ${field}`, relPath);
    }
  }

  // generated_by_ai deve ser true
  if (exercise.generated_by_ai !== true) {
    error('generated_by_ai deve ser true', relPath);
  }

  // Tipos válidos
  if (exercise.type && !['multiple-choice', 'true-false', 'order-steps', 'code-completion', 'flashcards'].includes(exercise.type)) {
    error(`Tipo inválido: ${exercise.type}`, relPath);
  }

  // code-completion precisa de test_command
  if (exercise.type === 'code-completion' && !exercise.test_command) {
    error('code-completion requer test_command', relPath);
  }

  // theory_unit_id pattern
  if (exercise.theory_unit_id && !/^th-sem[1-8]-[a-z-]+-[a-z0-9-]+$/.test(exercise.theory_unit_id)) {
    error(`theory_unit_id inválido: ${exercise.theory_unit_id}`, relPath);
  }

  // Regras anti-placeholder (T1xx): enunciado/explicação gerados ou sem
  // citação da seção da fonte vinculada.
  const unit = exercise.theory_unit_id ? theoryById.get(exercise.theory_unit_id) : null;
  const sourceSection = (unit && unit.source && unit.source.section) || '';
  for (const msg of exerciseContentErrors(exercise, { sourceSection })) {
    error(msg, relPath);
  }
}

// ============================================
// 4. Valida licenças e ATTRIBUTIONS.md
// ============================================
function validateAttributions() {
  console.log('\n📝 Validando ATTRIBUTIONS.md...');
  const path = join(ROOT_DIR, 'ATTRIBUTIONS.md');

  if (!existsSync(path)) {
    error('ATTRIBUTIONS.md não encontrado');
    return;
  }

  const content = readFileSync(path, 'utf-8');

  // Verifica se menciona as 4 fontes aprovadas
  const requiredSources = [
    'Mathematics for Computer Science',
    'Discrete Mathematics: An Open Introduction',
    'Programming Fundamentals',
    'An Open Guide to Data Structures and Algorithms',
    'KaTeX',
    'highlight.js'
  ];

  for (const source of requiredSources) {
    if (!content.includes(source)) {
      warn(`Fonte esperada não encontrada em ATTRIBUTIONS.md: ${source}`);
    }
  }

  success('ATTRIBUTIONS.md presente');
}

// ============================================
// 5. Valida progress schema_version
// ============================================
function validateProgressSchema() {
  console.log('\n💾 Validando schema de progresso...');

  // Simula progresso típico
  const sampleProgress = {
    schema_version: CURRENT_SCHEMA_VERSION,
    updated_at: new Date().toISOString(),
    preferences: { daily_xp_goal: 300, theme: 'auto', onboarding_completed: false },
    stats: { total_xp: 0, level: 1, current_streak: 0, freezes_remaining: 1, last_activity_date: null },
    completed: { lessons: [], theory_sections: [] },
    exercises: {},
    srs_queue: [],
    review_queue: [],
    achievements: [],
    annotations: {}
  };

  if (sampleProgress.schema_version !== CURRENT_SCHEMA_VERSION) {
    error(`schema_version esperado ${CURRENT_SCHEMA_VERSION}, encontrado ${sampleProgress.schema_version}`);
  } else {
    success(`schema_version compatível (v${CURRENT_SCHEMA_VERSION})`);
  }

  if (typeof sampleProgress.preferences.onboarding_completed !== 'boolean') {
    error('preferences.onboarding_completed ausente ou inválido');
  } else {
    success('preferences.onboarding_completed presente');
  }
}

// ============================================
// 6. Links internos (T110) + sync ATTRIBUTIONS (T111) + T112
// ============================================
function loadCurriculumData() {
  const path = join(ROOT_DIR, 'data/curriculum.json');
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch (e) {
    return null;
  }
}

function validateInternalLinks(theoryUnits, exercises) {
  console.log('\n🔗 Validando links internos (T110/T112)...');
  const curriculum = loadCurriculumData();
  if (!curriculum) {
    warn('curriculum.json não pôde ser lido; pulando verificação de links internos');
    return;
  }

  const lessonIndex = new Map(); // lessonId -> { discipline, module }
  const moduleTheory = new Map(); // `${discipline}/${module}` -> theory id

  for (const sem of curriculum.semesters || []) {
    for (const disc of sem.disciplines || []) {
      for (const mod of disc.modules || []) {
        if (mod.theory) moduleTheory.set(`${disc.id}/${mod.id}`, mod.theory);
        for (const lessonId of mod.lessons || []) {
          if (lessonIndex.has(lessonId)) {
            error(`ID de lição duplicado no currículo: ${lessonId} (${disc.id}/${mod.id})`);
          }
          lessonIndex.set(lessonId, { discipline: disc.id, module: mod.id });
        }
      }
    }
  }

  const theoryIds = new Set(theoryUnits.map((u) => u.id));
  const theoryById = new Map(theoryUnits.map((u) => [u.id, u]));

  // Unidades → lições ligadas
  for (const unit of theoryUnits) {
    const key = `${unit.discipline}/${unit.module}`;
    const expected = moduleTheory.get(key);
    if (expected && expected !== unit.id) {
      warn(`Módulo ${key} aponta para '${expected}', mas a unidade '${unit.id}' define module=${unit.module}`);
    }
    for (const lessonId of unit.linkedLessons) {
      if (!lessonIndex.has(lessonId)) {
        error(`Unidade '${unit.id}' referencia lição inexistente: ${lessonId}`, unit.relPath);
      }
    }
  }

  // Exercícios → lição e unidade teórica
  if (exercises.length > 0 && theoryIds.size === 0) {
    error('Existem exercícios, mas nenhuma unidade teórica foi encontrada');
  }

  const lessonsWithExercises = new Set();
  for (const ex of exercises) {
    if (ex.lessonId) {
      lessonsWithExercises.add(ex.lessonId);
      if (!lessonIndex.has(ex.lessonId)) {
        error(`Exercício '${ex.id}' referencia lição inexistente: ${ex.lessonId}`, ex.relPath);
      }
    }
    if (ex.theoryUnitId && theoryIds.size > 0 && !theoryIds.has(ex.theoryUnitId)) {
      error(`Exercício '${ex.id}' referencia unidade teórica inexistente: ${ex.theoryUnitId}`, ex.relPath);
    }
    const unit = theoryById.get(ex.theoryUnitId);
    if (unit && unit.verificationStatus === 'unverified') {
      warn(`Exercício '${ex.id}' aponta para unidade '${unit.id}' marcada como unverified (fora da trilha)`);
    }
  }

  // T112: lição ligada a unidade verificada mas sem exercícios publicados
  for (const unit of theoryUnits) {
    if (unit.verificationStatus !== 'verified_with_source') continue;
    for (const lessonId of unit.linkedLessons) {
      if (!lessonsWithExercises.has(lessonId)) {
        warn(`Lição ${lessonId} (unidade ${unit.id}) sem exercícios publicados (conteúdo pendente)`);
      }
    }
  }

  success('links internos consistentes');
}

/**
 * Regenera o bloco de unidades dentro de ATTRIBUTIONS.md a partir das unidades
 * reais. Usado por `node scripts/validate.mjs --update-attributions`.
 */
function updateAttributionsFile(theoryUnits) {
  const path = join(ROOT_DIR, 'ATTRIBUTIONS.md');
  if (!existsSync(path)) {
    error('ATTRIBUTIONS.md não encontrado para atualização');
    return;
  }

  const content = readFileSync(path, 'utf-8');
  const expected = generateAttributionsBlock(theoryUnits);
  const actual = extractAttributionsBlock(content);

  if (!actual) {
    error(`ATTRIBUTIONS.md sem o bloco gerado ('${ATTRIBUTIONS_BEGIN}' / '${ATTRIBUTIONS_END}')`);
    return;
  }

  writeFileSync(path, content.replace(actual, expected), 'utf-8');
  info('ATTRIBUTIONS.md atualizado (bloco de unidades regenerado)');
}

/**
 * Compara o bloco gerado de ATTRIBUTIONS.md com o esperado a partir das
 * unidades reais. FALHA (não apenas avisa) quando o arquivo difere, quando há
 * ids de unidades inexistentes e quando falta a fonte de alguma unidade.
 */
function validateAttributionsSync(theoryUnits) {
  console.log('\n📝 Validando sync ATTRIBUTIONS.md (T111)...');
  const path = join(ROOT_DIR, 'ATTRIBUTIONS.md');

  if (!existsSync(path)) {
    error('ATTRIBUTIONS.md não encontrado (não é possível sincronizar)');
    return;
  }

  const content = readFileSync(path, 'utf-8');
  const expected = generateAttributionsBlock(theoryUnits);
  const actual = extractAttributionsBlock(content);

  if (!actual) {
    error(`ATTRIBUTIONS.md sem bloco gerado (esperado entre '${ATTRIBUTIONS_BEGIN}' e '${ATTRIBUTIONS_END}')`);
    return;
  }

  if (actual.trimEnd() !== expected.trimEnd()) {
    error('ATTRIBUTIONS.md desatualizado: o bloco de unidades difere das unidades em data/theory/ (rode: node scripts/validate.mjs --update-attributions)');
  }

  // Nenhum id de unidade obsoleto pode sobrar em qualquer parte do arquivo.
  const currentIds = new Set(theoryUnits.map((u) => u.id));
  for (const id of collectUnitIds(content)) {
    if (!currentIds.has(id)) {
      error(`ATTRIBUTIONS.md lista unidade inexistente: ${id}`);
    }
  }

  // Cada fonte efetivamente usada precisa aparecer no arquivo.
  for (const title of new Set(theoryUnits.map((u) => u.source && u.source.title).filter(Boolean))) {
    if (!content.includes(title)) {
      error(`Fonte '${title}' (usada por unidades) não aparece em ATTRIBUTIONS.md`);
    }
  }

  success(`ATTRIBUTIONS.md em sincronia (${theoryUnits.length} unidade(s))`);
}

async function validateSourceUrls(theoryUnits) {
  console.log('\n🌐 Verificando URLs de fonte (T109)...');
  if (process.env.CHECK_URLS !== '1') {
    info('CHECK_URLS != 1 — verificação de rede ignorada (use CHECK_URLS=1 em CI com internet)');
    return;
  }

  const urls = [...new Set(theoryUnits.map((u) => u.source && u.source.url).filter(Boolean))];
  if (urls.length === 0) {
    info('Nenhuma URL de fonte para verificar');
    return;
  }

  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (!res.ok) {
        warn(`URL de fonte inacessível (${res.status}): ${url}`);
      } else {
        info(`URL ok (${res.status}): ${url}`);
      }
    } catch (e) {
      warn(`Falha ao verificar URL da fonte: ${url} (${e.message})`);
    }
  }
}

// ============================================
// Main
// ============================================
async function main() {
  console.log('🔍 Ensina Lógica - Validação CI');
  console.log('==================================');

  validateCurriculum();
  const theoryUnits = validateTheoryUnits();
  const theoryById = new Map(theoryUnits.map((u) => [u.id, u]));
  const exercises = validateExercises(theoryById);
  validateInternalLinks(theoryUnits, exercises);
  validateAttributions();
  if (process.argv.includes('--update-attributions')) {
    updateAttributionsFile(theoryUnits);
  }
  validateAttributionsSync(theoryUnits);
  await validateSourceUrls(theoryUnits);
  validateProgressSchema();

  console.log('\n📊 Resultado:');
  if (warnings.length > 0) {
    console.log(`\n⚠️  Avisos (${warnings.length}):`);
    warnings.forEach(w => console.log(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.log(`\n❌ Erros (${errors.length}):`);
    errors.forEach(e => console.log(`  - ${e}`));
    console.log('\n💥 Validação FALHOU');
    process.exit(1);
  } else {
    console.log('\n✅ Validação PASSOU - nenhum erro');
    process.exit(0);
  }
}

main();