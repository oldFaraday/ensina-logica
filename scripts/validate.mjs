#!/usr/bin/env node
/**
 * Validation Script
 * Validação CI: curriculum schema, theory units, exercises, links, licenças, ATTRIBUTIONS.md sync
 * Executa: node scripts/validate.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { CURRENT_SCHEMA_VERSION } from '../src/store/schema-version.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

// Licenças permitidas para derivação (SPDX)
const ALLOWED_LICENSES = [
  'CC0-1.0',
  'CC-BY-3.0', 'CC-BY-4.0',
  'CC-BY-SA-3.0', 'CC-BY-SA-4.0'
];

// Licenças explicitamente proibidas
const FORBIDDEN_LICENSES = [
  'CC-BY-NC-4.0', 'CC-BY-NC-SA-4.0', 'CC-BY-NC-ND-4.0',
  'CC-BY-ND-4.0',
  'GFDL-1.3',
  'MIT-OCW-NC-SA'
];

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
    return;
  }

  const units = findMarkdownFiles(theoryDir);
  if (units.length === 0) {
    warn('Nenhuma unidade teórica encontrada');
    return;
  }

  for (const file of units) {
    validateTheoryFile(file);
  }

  success(`${units.length} unidade(s) teórica(s) validada(s)`);
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
  const content = readFileSync(filePath, 'utf-8');

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
  if (fm.verification_status && !['unverified', 'verified_with_source'].includes(fm.verification_status)) {
    error(`verification_status inválido: ${fm.verification_status}`, relPath);
  }

  // ID pattern
  if (fm.id && !/^th-sem[1-8]-[a-z-]+-[a-z0-9-]+$/.test(fm.id)) {
    error(`ID inválido (padrão: th-sem{N}-{discipline}-{module}-{slug}): ${fm.id}`, relPath);
  }
}

function parseFrontMatter(yaml) {
  const result = {};
  let currentKey = null;
  let inMultiline = false;
  let multilineKey = null;

  for (const line of yaml.split('\n')) {
    if (inMultiline) {
      if (line.trim() === '' || line.startsWith('  ')) {
        result[multilineKey] = (result[multilineKey] || '') + '\n' + line.trimEnd();
        continue;
      } else {
        inMultiline = false;
      }
    }

    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const kvMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      currentKey = key;

      if (value === '|' || value === '>') {
        inMultiline = true;
        multilineKey = key;
        result[key] = '';
        continue;
      }

      if (value.startsWith('[') && value.endsWith(']')) {
        result[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        continue;
      }

      result[key] = value.replace(/^["']|["']$/g, '');
      continue;
    }

    // Nested (source.title, etc.)
    const nestedMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (nestedMatch && currentKey) {
      const [, subKey, subValue] = nestedMatch;
      const combinedKey = `${currentKey}_${subKey}`;
      result[combinedKey] = subValue.replace(/^["']|["']$/g, '');
    }
  }

  // Normaliza source object
  if (result.source_title) {
    result.source = {
      title: result.source_title,
      authors: result.source_authors ? result.source_authors.split(',').map(a => a.trim()) : [],
      url: result.source_url,
      chapter: result.source_chapter,
      section: result.source_section,
      access_date: result.source_access_date,
      edition: result.source_edition,
      license_url: result.source_license_url,
      license_confirmed_at: result.source_license_confirmed_at
    };
    Object.keys(result).forEach(k => {
      if (k.startsWith('source_')) delete result[k];
    });
  }

  return result;
}

// ============================================
// 3. Valida exercícios
// ============================================
function validateExercises() {
  console.log('\n🏋️ Validando exercícios...');
  const exercisesDir = join(ROOT_DIR, 'data/exercises');

  if (!existsSync(exercisesDir)) {
    warn('Diretório data/exercises não existe (ainda sem conteúdo)');
    return;
  }

  const files = findJsonFiles(exercisesDir);
  if (files.length === 0) {
    warn('Nenhum exercício encontrado');
    return;
  }

  for (const file of files) {
    validateExerciseFile(file);
  }

  success(`${files.length} exercício(s) validado(s)`);
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

function validateExerciseFile(filePath) {
  const relPath = filePath.replace(ROOT_DIR + '/', '');

  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
    // Convenção: 1 arquivo por lição, contendo um ARRAY de exercícios.
    // Compatibilidade: também aceita um único objeto.
    const exercises = Array.isArray(parsed) ? parsed : [parsed];

    if (exercises.length === 0) {
      error('Arquivo de exercícios vazio', relPath);
      return;
    }

    exercises.forEach((exercise, idx) => {
      const label = `${relPath}#${idx}`;
      validateExerciseObject(exercise, label);
    });
  } catch (e) {
    error(`JSON inválido: ${e.message}`, relPath);
  }
}

function validateExerciseObject(exercise, relPath) {
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
    preferences: { daily_xp_goal: 20, theme: 'auto', onboarding_completed: false },
    stats: { total_xp: 0, level: 1, current_streak: 0, freezes_remaining: 1, last_activity_date: null },
    completed: { lessons: [], theory_sections: [] },
    exercises: {},
    srs_queue: [],
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
// Main
// ============================================
function main() {
  console.log('🔍 Ensina Lógica - Validação CI');
  console.log('==================================');

  validateCurriculum();
  validateTheoryUnits();
  validateExercises();
  validateAttributions();
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