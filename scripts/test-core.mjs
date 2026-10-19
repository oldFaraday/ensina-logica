#!/usr/bin/env node
/**
 * Core Tests
 * Testes puros (Node, sem DOM): XP, streak, SRS, unlock, ProgressStore
 * Executa: node scripts/test-core.mjs
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = dirname(__dirname);

// Importa módulos para teste
import { calculateXP, calculateExerciseXP, levelFromXP, xpForLevel } from '../src/gamification/xp.js';
import { updateStreak, getStreakInfo, getMondayOfWeek } from '../src/gamification/streak.js';
import { recordExerciseAnswer, getDueExerciseReviews, getNextReview, getSRSStats, pruneOrphanExercises, SRS_INTERVALS } from '../src/gamification/srs.js';
import { isModuleUnlocked, getAvailableDisciplines, getDisciplineProgress, getModuleProgress } from '../src/curriculum/unlock.js';
import { markLessonComplete, isModuleComplete, getSemesterProgress } from '../src/curriculum/progress.js';
import { migrateProgress, createDefaultProgress, validateProgress, CURRENT_SCHEMA_VERSION } from '../src/store/schema-version.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ ${message}`);
    failed++;
  }
}

function assertEqual(actual, expected, message) {
  const ok = actual === expected;
  if (ok) {
    console.log(`  ✅ ${message} (${actual})`);
    passed++;
  } else {
    console.error(`  ❌ ${message} - esperado: ${expected}, obtido: ${actual}`);
    failed++;
  }
}

// ============================================
// Mock curriculum para testes
// ============================================
const mockCurriculum = {
  semesters: [{
    id: 'sem1',
    number: 1,
    title: '1º Semestre',
    disciplines: [
      {
        id: 'algorithms',
        title: 'Algoritmos',
        modules: [
          { id: 'm01', title: 'Intro', lessons: ['l01', 'l02', 'l03'] },
          { id: 'm02', title: 'Variables', lessons: ['l04', 'l05'] },
          { id: 'm03', title: 'Control', lessons: ['l06', 'l07'] }
        ]
      },
      {
        id: 'discrete-math',
        title: 'Discreta',
        modules: [
          { id: 'm01', title: 'Logic', lessons: ['l01', 'l02'] },
          { id: 'm02', title: 'Predicates', lessons: ['l03'] }
        ]
      }
    ]
  }]
};

// Mock progress base
function createMockProgress(overrides = {}) {
  return {
    schema_version: 1,
    updated_at: new Date().toISOString(),
    preferences: { daily_xp_goal: 300, theme: 'auto' },
    stats: {
      total_xp: 0,
      level: 1,
      current_streak: 0,
      freezes_remaining: 1,
      last_activity_date: null,
      last_freeze_reset: null,
      ...overrides.stats
    },
    completed: { lessons: [], theory_sections: [], ...overrides.completed },
    exercises: { ...overrides.exercises },
    srs_queue: [],
    review_queue: overrides.review_queue || [],
    achievements: [],
    annotations: {}
  };
}

// ============================================
// XP Tests
// ============================================
function testXP() {
  console.log('\n🧪 Testando XP...');

  // Base XP
  assertEqual(calculateXP({ isFirstAttempt: true, isRetry: false, streak: 0 }), 15, 'Base XP + first time bonus');

  // Retry penalty
  assertEqual(calculateXP({ isFirstAttempt: false, isRetry: true, streak: 0 }), 5, 'Retry penalty (50%)');

  // Streak bonus
  // streak=2 -> bonus 4, total=15+4=19
  assertEqual(calculateXP({ isFirstAttempt: true, isRetry: false, streak: 2 }), 19, 'Streak 2 -> bonus 4');
  assertEqual(calculateXP({ isFirstAttempt: true, isRetry: false, streak: 10 }), 35, 'Streak 10 -> bonus 20');

  // Level boundaries
  assertEqual(levelFromXP(0), 1, 'Level 1 at 0 XP');
  assertEqual(levelFromXP(999), 1, 'Level 1 at 999 XP');
  assertEqual(levelFromXP(1000), 2, 'Level 2 at 1000 XP');
  assertEqual(levelFromXP(3999), 2, 'Level 2 at 3999 XP');
  assertEqual(levelFromXP(4000), 3, 'Level 3 at 4000 XP');
  assertEqual(levelFromXP(9000), 4, 'Level 4 at 9000 XP');

  // xpForLevel
  assertEqual(xpForLevel(1), 0, 'Level 1 starts at 0');
  assertEqual(xpForLevel(2), 1000, 'Level 2 starts at 1000');
  assertEqual(xpForLevel(3), 4000, 'Level 3 starts at 4000');
  assertEqual(xpForLevel(4), 9000, 'Level 4 starts at 9000');

  // ---------------------------------------------------------------
  // XP por exercício: concedido UMA única vez por exercício.
  // ---------------------------------------------------------------
  const ex = { id: 'ex-x', xp_base: 20 };

  // 1ª resposta correta → base + bônus de 1ª vez + streak (20 + 5 + 1*2 = 27).
  assertEqual(
    calculateExerciseXP({ exercise: ex, previous: undefined, isCorrect: true, streak: 1 }),
    27,
    'Exercício: 1ª resposta correta = base + 1ª vez + streak (+27)'
  );

  // Errou antes (não creditado) e acertou agora → retry (metade da base + streak).
  assertEqual(
    calculateExerciseXP({ exercise: ex, previous: { correct: false, xp_earned: 0 }, isCorrect: true, streak: 0 }),
    10,
    'Exercício: acerto após erro vale retry (50%), sem bônus de 1ª vez'
  );

  // Já resolvido/corretamente creditado → repetir NÃO rende XP.
  assertEqual(
    calculateExerciseXP({ exercise: ex, previous: { correct: true, xp_earned: 27 }, isCorrect: true, streak: 5 }),
    0,
    'Exercício: acertar de novo um já creditado vale 0 (não dá para farmar)'
  );
  assertEqual(
    calculateExerciseXP({ exercise: ex, previous: { correct: false, xp_earned: 10 }, isCorrect: true, streak: 5 }),
    0,
    'Exercício: repetir quando já houve concessão de XP vale 0'
  );

  // Errar nunca rende XP, mesmo na 1ª tentativa.
  assertEqual(
    calculateExerciseXP({ exercise: ex, previous: undefined, isCorrect: false, streak: 3 }),
    0,
    'Exercício: resposta incorreta vale 0'
  );
}

// ============================================
// Streak Tests
// ============================================
function testStreak() {
  console.log('\n🧪 Testando Streak...');

  const progress = createMockProgress();

  // Primeiro dia
  const day1 = new Date('2026-10-15');
  updateStreak(progress, day1);
  assertEqual(progress.stats.current_streak, 1, 'Streak 1 no primeiro dia');

  // Dia consecutivo
  const day2 = new Date('2026-10-16');
  updateStreak(progress, day2);
  assertEqual(progress.stats.current_streak, 2, 'Streak 2 no dia seguinte');

  // Gap de 1 dia sem freeze
  const progress2 = createMockProgress({ stats: { current_streak: 5, freezes_remaining: 0, last_activity_date: '2026-10-16' } });
  const dayGap1 = new Date('2026-10-18'); // 2 dias depois
  updateStreak(progress2, dayGap1);
  assertEqual(progress2.stats.current_streak, 1, 'Streak reseta para 1 com gap >1 sem freeze');

  // Gap de 2 dias COM freeze - streak mantido (freeze usado, semanal recarrega na 2a)
  const progress3 = createMockProgress({ stats: { current_streak: 5, freezes_remaining: 1, last_activity_date: '2026-10-16T00:00:00.000Z' } });
  const dayGap2 = new Date('2026-10-18T00:00:00.000Z');
  updateStreak(progress3, dayGap2);
  assertEqual(progress3.stats.current_streak, 5, 'Streak mantido com freeze (freeze usado)');

  // Gap de 3 dias - freeze não cobre
  const progress4 = createMockProgress({ stats: { current_streak: 5, freezes_remaining: 1, last_activity_date: '2026-10-16T00:00:00.000Z' } });
  const dayGap3 = new Date('2026-10-19T00:00:00.000Z');
  updateStreak(progress4, dayGap3);
  assertEqual(progress4.stats.current_streak, 1, 'Streak reseta para 1 com gap 3 dias');
  assertEqual(progress4.stats.freezes_remaining, 1, 'Freeze NÃO consumido (gap > 2)');

  // Reset semanal de freeze (segunda-feira)
  const progress5 = createMockProgress({
    stats: { current_streak: 5, freezes_remaining: 0, last_freeze_reset: '2026-10-05' } // segunda anterior
  });
  const monday = new Date('2026-10-12'); // segunda seguinte
  updateStreak(progress5, monday);
  assertEqual(progress5.stats.freezes_remaining, 1, 'Freeze recarregado na segunda-feira');

  // getStreakInfo
  const progress6 = createMockProgress({ stats: { freezes_remaining: 1, last_freeze_reset: '2026-10-05' } });
  const streakInfo1 = getStreakInfo(progress6);
  assertEqual(streakInfo1.freezesRemaining, 1, 'Freeze disponível na segunda');
  const streakInfo2 = getStreakInfo(progress6);
  assertEqual(streakInfo2.freezesRemaining, 1, 'Freeze disponível na terça');
}

// ============================================
// SRS Tests (por exercício)
// ============================================
function testSRS() {
  console.log('\n🧪 Testando SRS por exercício...');

  const today = new Date('2026-10-16T12:00:00Z');
  const progress = createMockProgress();

  // Primeira resposta correta: agenda para amanhã (estágio 1).
  const first = recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: true, today });
  assertEqual(first.srs_stage, 1, 'Primeiro acerto agenda estágio 1');
  assertEqual(first.first_try_correct, true, 'Primeiro acerto marca first_try_correct');
  assertEqual(first.attempts, 1, 'Primeiro acerto conta 1 tentativa');
  assertEqual(getDueExerciseReviews(progress, today).length, 0, 'Primeiro acerto não vence hoje');
  assertEqual(getDueExerciseReviews(progress, new Date('2026-10-17T12:00:00Z')).length, 1, 'Vence amanhã');

  // Acerto antes do vencimento mantém a agenda.
  const early = recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: true, today });
  assertEqual(early.srs_stage, 1, 'Acerto antes do vencimento não avança');
  assertEqual(early.attempts, 2, 'Tentativa extra registrada');

  // Acerto na revisão vencida avança 1 → 3 → 7 → 21 dias.
  const day1 = new Date('2026-10-17T12:00:00Z');
  const second = recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: true, today: day1 });
  assertEqual(second.srs_stage, 2, 'Acerto vencido avança para estágio 2');
  const day4 = new Date('2026-10-20T12:00:00Z');
  const third = recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: true, today: day4 });
  assertEqual(third.srs_stage, 3, 'Acerto vencido avança para estágio 3');
  const day11 = new Date('2026-10-27T12:00:00Z');
  const fourth = recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: true, today: day11 });
  assertEqual(fourth.srs_stage, 4, 'Acerto vencido avança para estágio 4 (21 dias)');
  const day32 = new Date('2026-11-17T12:00:00Z');
  const fifth = recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: true, today: day32 });
  assertEqual(fifth.srs_stage, 4, 'Estágio máximo permanece em 4 (21 dias)');

  assertEqual(SRS_INTERVALS.length, 5, 'SRS_INTERVALS tem 5 degraus');
}

// ============================================
// Revisões por exercício (upsert + erro)
// ============================================
function testExerciseReview() {
  console.log('\n🧪 Testando revisões por exercício...');

  const today = new Date('2026-10-16T12:00:00Z');
  const progress = createMockProgress();

  // Erros repetidos do MESMO exercício = um único item.
  recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: false, lessonId: 'l01', today });
  recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: false, lessonId: 'l01', today });
  assertEqual(Object.keys(progress.exercises).length, 1, 'Erros repetidos não duplicam o item');
  assertEqual(progress.exercises.ex01.wrong_count, 2, 'wrong_count = 2');
  assertEqual(progress.exercises.ex01.first_try_correct, false, 'Erro na 1ª tentativa marca first_try_correct false');
  assertEqual(progress.exercises.ex01.srs_stage, 0, 'Erro reinicia no estágio 0');
  assertEqual(getDueExerciseReviews(progress, today).length, 1, 'Erro vence hoje');

  // Dois exercícios errados = dois itens distintos.
  recordExerciseAnswer(progress, { exerciseId: 'ex02', correct: false, lessonId: 'l01', today });
  assertEqual(getDueExerciseReviews(progress, today).length, 2, 'Dois exercícios errados = 2 itens');

  // Acerto em revisão vencida avança e sai da fila de hoje.
  recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: true, today });
  assertEqual(progress.exercises.ex01.srs_stage, 1, 'Acerto na revisão avança para estágio 1');
  const dueToday = getDueExerciseReviews(progress, today);
  assertEqual(dueToday.length, 1, 'Exercício acertado sai da fila de hoje');
  assertEqual(dueToday[0].exercise_id, 'ex02', 'Só o exercício ainda errado permanece');

  const expectedDue = new Date(today);
  expectedDue.setHours(0, 0, 0, 0);
  expectedDue.setDate(expectedDue.getDate() + 1);
  const due = new Date(progress.exercises.ex01.due_date);
  due.setHours(0, 0, 0, 0);
  assertEqual(due.getTime(), expectedDue.getTime(), 'Acerto agenda para amanhã');
  assertEqual(getNextReview(progress, today)?.exercise_id, 'ex01', 'getNextReview enxerga a próxima revisão');

  // Errar em revisão volta ao estágio 0 e soma wrong_count.
  recordExerciseAnswer(progress, { exerciseId: 'ex01', correct: false, today });
  assertEqual(progress.exercises.ex01.srs_stage, 0, 'Erro em revisão reinicia no estágio 0');
  assertEqual(getDueExerciseReviews(progress, today).length, 2, 'Volta a vencer hoje');
  assertEqual(progress.exercises.ex01.wrong_count, 3, 'wrong_count = 3');

  // first_try_correct permanece true quando o primeiro acerto veio antes do erro.
  const p2 = createMockProgress();
  recordExerciseAnswer(p2, { exerciseId: 'exA', correct: true, today });
  recordExerciseAnswer(p2, { exerciseId: 'exA', correct: false, today });
  assertEqual(p2.exercises.exA.first_try_correct, true, 'first_try_correct preservado após erro posterior');
  assertEqual(p2.exercises.exA.last_result, 'wrong', 'last_result reflete a última resposta');

  // Estatísticas contam exercícios, não lições.
  const stats = getSRSStats(progress);
  assertEqual(stats.dueToday, 2, 'getSRSStats conta 2 exercícios vencidos');
  assertEqual(stats.totalScheduled, 2, 'getSRSStats conta exercícios agendados');

  // Órfãos são removidos silenciosamente (e a fila legada também).
  const p3 = createMockProgress();
  recordExerciseAnswer(p3, { exerciseId: 'exKeep', correct: false, today });
  recordExerciseAnswer(p3, { exerciseId: 'exGone', correct: false, today });
  p3.review_queue = [
    { exercise_id: 'exKeep', due_date: today.toISOString() },
    { exercise_id: 'exGone', due_date: today.toISOString() }
  ];
  const removed = pruneOrphanExercises(p3, new Set(['exKeep']));
  assertEqual(removed.length, 1, 'pruneOrphanExercises remove 1 id órfão');
  assertEqual(p3.exercises.exGone, undefined, 'Exercício órfão removido do progresso');
  assertEqual(p3.review_queue.length, 1, 'Fila legada também descarta órfãos');
}

// ============================================
// Unlock Tests
// ============================================
function testUnlock() {
  console.log('\n🧪 Testando Unlock...');

  // Primeiro módulo sempre aberto
  assert(isModuleUnlocked(mockCurriculum, createMockProgress(), 'sem1', 'algorithms', 'm01'), 'Módulo 1 desbloqueado');

  // Segundo módulo bloqueado sem concluir primeiro
  const progress1 = createMockProgress();
  assert(!isModuleUnlocked(mockCurriculum, progress1, 'sem1', 'algorithms', 'm02'), 'Módulo 2 bloqueado');

  // Conclui módulo 1
  const progress2 = createMockProgress({ completed: { lessons: ['l01', 'l02', 'l03'] } });
  assert(isModuleUnlocked(mockCurriculum, progress2, 'sem1', 'algorithms', 'm02'), 'Módulo 2 desbloqueado após concluir módulo 1');

  // Livre entre disciplinas
  const disciplines = getAvailableDisciplines(mockCurriculum, createMockProgress(), 'sem1');
  assertEqual(disciplines.length, 2, 'Duas disciplinas disponíveis no sem1');

  // Semestre 2 "coming-soon"
  const curriculumWithSem2 = {
    ...mockCurriculum,
    semesters: [...mockCurriculum.semesters, { id: 'sem2', number: 2, title: '2º', status: 'coming-soon', disciplines: [] }]
  };
  const sem2Disc = getAvailableDisciplines(curriculumWithSem2, createMockProgress(), 'sem2');
  assertEqual(sem2Disc.length, 0, 'Semestre coming-soon retorna 0 disciplinas');
}

// ============================================
// Progress Tests
// ============================================
function testProgress() {
  console.log('\n🧪 Testando Progress...');

  let progress = createMockProgress();

  // Marca lição
  progress = markLessonComplete(progress, 'l01');
  assert(progress.completed.lessons.includes('l01'), 'Lição marcada como concluída');

  // Módulo completo
  progress = createMockProgress({ completed: { lessons: ['l01', 'l02', 'l03'] } });
  assert(isModuleComplete(mockCurriculum, progress, 'sem1', 'algorithms', 'm01'), 'Módulo 1 completo');

  // Módulo incompleto
  progress = createMockProgress({ completed: { lessons: ['l01', 'l02'] } });
  assert(!isModuleComplete(mockCurriculum, progress, 'sem1', 'algorithms', 'm01'), 'Módulo 1 incompleto');

  // Progresso semestre
  progress = createMockProgress({ completed: { lessons: ['l01', 'l02', 'l03', 'l04', 'l05'] } });
  const semProgress = getSemesterProgress(mockCurriculum, progress, 'sem1');
  // Total: algorithms 5 lições (3+2), discrete-math 3 lições (2+1) = 8 total
  // Concluídas: 5
  assertEqual(semProgress, 80, 'Progresso semestre 80% (8/10)');
}

// ============================================
// Migration Tests
// ============================================
function testMigration() {
  console.log('\n🧪 Testando migração de schema...');

  // Padrão: onboarding_completed deve existir e ser false
  const defaults = createDefaultProgress();
  assertEqual(defaults.schema_version, CURRENT_SCHEMA_VERSION, 'Schema padrão na versão atual');
  assertEqual(defaults.preferences.onboarding_completed, false, 'Padrão traz onboarding_completed = false');

  // v1 sem a flag -> v-atual com a flag false
  const v1 = createMockProgress(); // schema_version: 1, sem onboarding_completed
  const migratedV1 = migrateProgress(v1);
  assertEqual(migratedV1.schema_version, CURRENT_SCHEMA_VERSION, 'v1 migrado para a versão atual');
  assertEqual(migratedV1.preferences.onboarding_completed, false, 'v1 sem flag -> onboarding_completed false');

  // Legado (v0, sem schema_version) -> versão atual com a flag false
  const v0 = createMockProgress();
  delete v0.schema_version;
  const migratedV0 = migrateProgress(v0);
  assertEqual(migratedV0.schema_version, CURRENT_SCHEMA_VERSION, 'v0 (legado) migrado para a versão atual');
  assertEqual(migratedV0.preferences.onboarding_completed, false, 'v0 ganha onboarding_completed false');

  // Flag já existente é preservada
  const withFlag = createMockProgress();
  withFlag.preferences.onboarding_completed = true;
  const migratedFlag = migrateProgress(withFlag);
  assertEqual(migratedFlag.preferences.onboarding_completed, true, 'onboarding_completed = true preservado');

  // v2 → v3: migração adiciona review_queue
  const v2 = createMockProgress();
  v2.schema_version = 2;
  delete v2.review_queue;
  const migratedV2 = migrateProgress(v2);
  assertEqual(migratedV2.schema_version, CURRENT_SCHEMA_VERSION, 'v2 migrado para a versão atual');
  assert(Array.isArray(migratedV2.review_queue), 'v2 ganha review_queue []');

  // v3 → v4: SRS por exercício, descarte das revisões por lição.
  const v3 = createMockProgress();
  v3.schema_version = 3;
  v3.stats.total_xp = 4321;
  v3.stats.level = 3;
  v3.stats.current_streak = 5;
  v3.achievements = ['first-lesson'];
  v3.completed.theory_sections = ['th-x::intro'];
  v3.annotations = { 'th-x::intro': 'minha nota' };
  v3.exercises = {
    exA: { attempts: 2, correct: true, xp_earned: 15, last_attempt_date: '2026-10-01T10:00:00.000Z' }
  };
  v3.review_queue = [
    {
      exercise_id: 'exB',
      lesson_id: 'l01',
      interval_index: 0,
      wrong_count: 2,
      due_date: '2026-10-16T00:00:00.000Z'
    }
  ];
  v3.srs_queue = [{ lesson_id: 'l01', interval_index: 1, due_date: '2026-10-17T00:00:00.000Z' }];

  const migratedV3 = migrateProgress(v3);
  assertEqual(migratedV3.schema_version, 4, 'v3 migrado para schema 4');
  assertEqual(migratedV3.srs_queue.length, 0, 'Revisões por lição são descartadas');
  assertEqual(migratedV3.review_queue.length, 0, 'review_queue legada é limpa');
  assertEqual(migratedV3.exercises.exA.srs_stage, 0, 'Registro existente ganha srs_stage');
  assertEqual(migratedV3.exercises.exA.last_result, 'correct', 'Registro existente ganha last_result');
  assertEqual(migratedV3.exercises.exB.wrong_count, 2, 'Erro da fila antiga é importado');
  assertEqual(migratedV3.exercises.exB.due_date, '2026-10-16T00:00:00.000Z', 'due_date preservada na migração');
  assertEqual(migratedV3.stats.total_xp, 4321, 'XP preservado na migração');
  assertEqual(migratedV3.stats.level, 3, 'Nível preservado na migração');
  assertEqual(migratedV3.stats.current_streak, 5, 'Streak preservado na migração');
  assertEqual(migratedV3.achievements[0], 'first-lesson', 'Conquistas preservadas');
  assertEqual(migratedV3.completed.theory_sections[0], 'th-x::intro', 'Seções lidas preservadas');
  assertEqual(migratedV3.annotations['th-x::intro'], 'minha nota', 'Anotações preservadas');
  assertEqual(getDueExerciseReviews(migratedV3, new Date('2026-10-16T12:00:00Z')).length, 1, 'Exercício migrado vence na data');

  // Compat de importação: dados sem review_queue ainda passam na validação
  const v2NoQueue = createMockProgress();
  delete v2NoQueue.review_queue;
  assert(validateProgress(v2NoQueue), 'validateProgress aceita dados sem review_queue');

  // Objeto inválido cai no padrão
  const fallback = migrateProgress(null);
  assertEqual(fallback.preferences.onboarding_completed, false, 'progresso inválido -> padrão com flag false');
}

// ============================================
// Run all tests
// ============================================
function main() {
  console.log('🧪 Ensina Lógica - Testes Core');
  console.log('================================');

  testXP();
  testStreak();
  testSRS();
  testExerciseReview();
  testUnlock();
  testProgress();
  testMigration();

  console.log(`\n📊 Resultado: ${passed} passou, ${failed} falhou`);
  if (failed > 0) {
    process.exit(1);
  }
}

main();