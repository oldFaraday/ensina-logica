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
import { calculateXP, levelFromXP, xpForLevel } from '../src/gamification/xp.js';
import { updateStreak, getStreakInfo, getMondayOfWeek } from '../src/gamification/streak.js';
import { scheduleReview, getDueReviews, SRS_INTERVALS } from '../src/gamification/srs.js';
import { isModuleUnlocked, getAvailableDisciplines, getDisciplineProgress, getModuleProgress } from '../src/curriculum/unlock.js';
import { markLessonComplete, isModuleComplete, getSemesterProgress } from '../src/curriculum/progress.js';
import { migrateProgress, createDefaultProgress, CURRENT_SCHEMA_VERSION } from '../src/store/schema-version.js';

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
    preferences: { daily_xp_goal: 20, theme: 'auto' },
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
// SRS Tests
// ============================================
function testSRS() {
  console.log('\n🧪 Testando SRS...');

  const progress = createMockProgress();

  // Primeira agenda
  scheduleReview(progress, 'l01');
  assertEqual(progress.srs_queue.length, 1, 'Uma review agendada');
  assertEqual(progress.srs_queue[0].interval_index, 0, 'Intervalo índice 0 (1 dia)');

  // Repetição - avança intervalo
  scheduleReview(progress, 'l01');
  assertEqual(progress.srs_queue[0].interval_index, 1, 'Intervalo índice 1 (3 dias)');

  scheduleReview(progress, 'l01');
  assertEqual(progress.srs_queue[0].interval_index, 2, 'Intervalo índice 2 (7 dias)');

  scheduleReview(progress, 'l01');
  assertEqual(progress.srs_queue[0].interval_index, 3, 'Intervalo índice 3 (21 dias)');

  // Teto no máximo
  scheduleReview(progress, 'l01');
  assertEqual(progress.srs_queue[0].interval_index, 3, 'Intervalo teto em 3 (21 dias)');

  // Due reviews - agendada para hoje
  const today = new Date();
  const due = getDueReviews(progress, today);
  // A primeira review é agendada para hoje + 1 dia, então não vence hoje
  // Para testar "due today", agendamos com today = new Date(Date.now() - 86400000)
  const yesterday = new Date(today.getTime() - 86400000);
  const progress2 = createMockProgress();
  scheduleReview(progress2, 'l02', yesterday);
  const due2 = getDueReviews(progress2, today);
  assertEqual(due2.length, 1, 'Review agendada ontem vence hoje');
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
  testUnlock();
  testProgress();
  testMigration();

  console.log(`\n📊 Resultado: ${passed} passou, ${failed} falhou`);
  if (failed > 0) {
    process.exit(1);
  }
}

main();