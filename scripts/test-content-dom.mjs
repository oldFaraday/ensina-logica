/**
 * Teste de conteúdo (T076–T081 + T110/T112): carrega o conteúdo real via o
 * CurriculumLoader (o mesmo caminho que o app usa), garantindo que:
 *  - o front-matter aninhado (`source:`) é parseado corretamente;
 *  - cada módulo do 1º semestre tem unidade teórica verificada e 3–5 seções;
 *  - cada lição tem 3–5 exercícios com campos válidos e tipos válidos;
 *  - os links teoria↔lição↔exercício são consistentes;
 *  - não há ids de exercício duplicados.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);

global.fetch = async (u) => {
  const rel = String(u).replace(/^\.\//, '');
  try {
    const content = readFileSync(join(ROOT_DIR, rel), 'utf-8');
    return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
  } catch {
    return { ok: false, status: 404, json: async () => ({}), text: async () => '' };
  }
};

const { loadCurriculum, loadTheoryUnit, loadExercisesForLesson } = await import(new URL('../src/curriculum/loader.js', import.meta.url));
const { splitSections } = await import(new URL('../src/theory/renderer.js', import.meta.url));

const VALID_TYPES = ['multiple-choice', 'true-false', 'order-steps', 'code-completion', 'flashcards'];
const REQUIRED_EX = ['id', 'theory_unit_id', 'lesson_id', 'type', 'generated_by_ai', 'prompt', 'explanation', 'difficulty', 'xp_base'];
// Campos obrigatórios por tipo (code-completion usa code+blanks, não correct).
const TYPE_REQUIRED = {
  'multiple-choice': ['options', 'correct'],
  'true-false': ['options', 'correct'],
  'order-steps': ['options', 'correct'],
  'flashcards': ['starter_code', 'correct'],
  'code-completion': ['code', 'blanks', 'language']
};
const codeBlanks = (code) => String(code || '').split('___').length - 1;

let passed = 0;
const ok = (label) => { passed += 1; console.log(`  ✅ ${label}`); };

try {
  console.log('🧪 Teste de conteúdo real (sem1)...');

  const curriculum = await loadCurriculum();
  const sem1 = curriculum.semesters.find((s) => s.id === 'sem1');
  assert.ok(sem1, 'semestre sem1 existe');

  const allExerciseIds = new Set();
  let unitsChecked = 0;
  let lessonsChecked = 0;
  let exercisesChecked = 0;

  for (const disc of sem1.disciplines) {
    for (const mod of disc.modules) {
      // --- Teoria (quando o módulo tiver campo theory) ---
      if (mod.theory) {
        const unit = await loadTheoryUnit(mod.theory);
        assert.ok(unit, `unidade ${mod.theory} carregada`);
        assert.equal(unit.verification_status, 'verified_with_source', `${unit.id} verificada com a fonte`);
        assert.ok(unit.source && typeof unit.source === 'object', `${unit.id} tem source como objeto`);
        assert.ok(unit.source.title && unit.source.title.length > 3, `${unit.id} source.title presente`);
        assert.ok(Array.isArray(unit.source.authors) && unit.source.authors.length > 0, `${unit.id} source.authors é array não vazio`);
        assert.ok(unit.source.license_url, `${unit.id} source.license_url presente`);
        assert.ok(['CC0-1.0', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0'].includes(unit.license), `${unit.id} licença permissiva`);
        assert.ok(unit.content.length > 300, `${unit.id} conteúdo substancial`);

        const sections = splitSections(unit.content);
        assert.ok(sections.length >= 3, `${unit.id} tem >= 3 seções (tem ${sections.length})`);

        // linked_lessons deve cobrir as lições do módulo
        for (const lessonId of mod.lessons) {
          assert.ok(unit.linked_lessons.includes(lessonId), `${unit.id}.linked_lessons inclui ${lessonId}`);
        }

        unitsChecked += 1;
      }

      // --- Lições + exercícios ---
      assert.ok(Array.isArray(mod.lessons) && mod.lessons.length >= 1, `${disc.id}/${mod.id} tem lições`);
      for (const lessonId of mod.lessons) {
        const exercises = await loadExercisesForLesson(lessonId, disc.id, sem1.number);
        assert.ok(Array.isArray(exercises), `${lessonId} carrega array de exercícios`);
        assert.ok(exercises.length >= 3 && exercises.length <= 5, `${lessonId} tem 3–5 exercícios (tem ${exercises.length})`);

        for (const ex of exercises) {
          for (const field of REQUIRED_EX) {
            assert.ok(field in ex, `${ex.id || lessonId}: campo ${field}`);
          }
          assert.equal(ex.generated_by_ai, true, `${ex.id}: generated_by_ai true`);
          assert.ok(VALID_TYPES.includes(ex.type), `${ex.id}: tipo válido (${ex.type})`);
          for (const field of TYPE_REQUIRED[ex.type] || []) {
            assert.ok(field in ex, `${ex.id}: campo ${field} para o tipo ${ex.type}`);
          }
          // code-completion: uma lacuna por entrada de blanks e respostas aceitas.
          if (ex.type === 'code-completion') {
            assert.ok(Array.isArray(ex.blanks) && ex.blanks.length >= 1, `${ex.id}: tem blanks`);
            assert.equal(codeBlanks(ex.code), ex.blanks.length, `${ex.id}: nº de ___ == nº de lacunas`);
            ex.blanks.forEach((blank, i) => {
              assert.ok(
                Array.isArray(blank.accepted_answers) && blank.accepted_answers.length >= 1 &&
                  blank.accepted_answers.every((a) => typeof a === 'string' && a.trim() !== ''),
                `${ex.id}: lacuna ${i + 1} tem accepted_answers válidos`
              );
            });
          }
          assert.equal(ex.lesson_id, lessonId, `${ex.id}: lesson_id bate`);
          assert.ok(!allExerciseIds.has(ex.id), `${ex.id}: id único`);
          allExerciseIds.add(ex.id);
          exercisesChecked += 1;
        }
        lessonsChecked += 1;
      }
    }
  }

  // Semestre 1 deve ter pelo menos 6 unidades teóricas (3 algorithms + 3 discrete-math originais)
  assert.ok(unitsChecked >= 6, `pelo menos 6 unidades teóricas (encontradas ${unitsChecked})`);
  // Pelo menos 18 lições com exercícios (as originais do semestre 1)
  assert.ok(lessonsChecked >= 18, `pelo menos 18 lições com exercícios (encontradas ${lessonsChecked})`);
  assert.ok(exercisesChecked >= 48, `pelo menos 48 exercícios (encontrados ${exercisesChecked})`);

  ok(`conteúdo OK: ${unitsChecked} unidades, ${lessonsChecked} lições, ${exercisesChecked} exercícios`);

  console.log(`\n✅ Teste de conteúdo passou (${passed}).`);
} catch (error) {
  console.error('❌ Teste de conteúdo falhou:', error.message);
  process.exit(1);
}
