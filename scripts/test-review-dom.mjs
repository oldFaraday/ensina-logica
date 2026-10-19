#!/usr/bin/env node
/**
 * Testes de interação (jsdom) do SRS POR EXERCÍCIO.
 *
 * Cobre:
 * - migração v3 → v4 e remoção silenciosa de exercícios órfãos no boot;
 * - painel contando exercícios ("N exercícios para revisar");
 * - sessão de revisão um-por-um, com link "ver a teoria" e resumo final;
 * - lição com erros: resultado "Você acertou X de Y" e "Refazer só os que errei";
 * - erros repetidos do mesmo exercício = um único item (wrong_count soma);
 * - acerto na revisão avança o estágio e sai da fila;
 * - persistência após reload, export/import preservando os registros.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { JSDOM, VirtualConsole } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let passed = 0;
const ok = (label) => {
  passed += 1;
  console.log(`  ✅ ${label}`);
};

const startOfDay = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

async function main() {
  console.log('🧪 Testes de revisão por exercício (jsdom)...');

  const html = readFileSync(join(ROOT_DIR, 'index.html'), 'utf-8');
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', () => {});
  const dom = new JSDOM(html, { url: 'http://localhost/#/', pretendToBeVisual: true, virtualConsole });
  const { window } = dom;

  window.matchMedia = () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {}
  });
  window.confirm = () => true;
  window.scrollTo = () => {};

  const storage = {};
  const localStorageStub = {
    getItem: (k) => (k in storage ? storage[k] : null),
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { for (const k of Object.keys(storage)) delete storage[k]; },
    key: (i) => Object.keys(storage)[i] ?? null,
    get length() { return Object.keys(storage).length; }
  };

  for (const [key, value] of [
    ['window', window],
    ['document', window.document],
    ['navigator', window.navigator],
    ['localStorage', localStorageStub],
    ['location', window.location],
    ['history', window.history],
    ['CustomEvent', window.CustomEvent],
    ['HTMLElement', window.HTMLElement],
    ['Node', window.Node],
    ['Event', window.Event]
  ]) {
    Object.defineProperty(global, key, { value, writable: true, configurable: true });
  }

  global.fetch = async (url) => {
    const relativePath = String(url).replace(/^\.\//, '');
    try {
      const content = readFileSync(join(ROOT_DIR, relativePath), 'utf-8');
      return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
    } catch {
      return { ok: false, status: 404, json: async () => ({}), text: async () => '' };
    }
  };

  // Exercícios reais de l01 para dirigir as respostas.
  const lessonExercises = JSON.parse(
    readFileSync(join(ROOT_DIR, 'data/exercises/sem1/algorithms/m01-l01.json'), 'utf-8')
  );
  const exerciseById = new Map(lessonExercises.map((exercise) => [exercise.id, exercise]));
  const firstExerciseId = lessonExercises[0].id;
  const secondExerciseId = lessonExercises[1].id;

  // ---- Semente v3: fila por exercício + revisão por lição + ids órfãos ----
  const today = startOfDay(new Date());
  const seeded = {
    schema_version: 3,
    updated_at: new Date().toISOString(),
    preferences: { daily_xp_goal: 300, theme: 'auto', onboarding_completed: true },
    stats: {
      total_xp: 120,
      level: 1,
      current_streak: 2,
      freezes_remaining: 1,
      last_activity_date: new Date().toISOString(),
      last_freeze_reset: null
    },
    completed: { lessons: [], theory_sections: [] },
    exercises: {
      [firstExerciseId]: {
        attempts: 1,
        correct: false,
        xp_earned: 0,
        last_attempt_date: today.toISOString(),
        wrong_count: 1
      },
      'ex-sem1-algorithms-m01-orphan': {
        attempts: 3,
        correct: false,
        due_date: today.toISOString(),
        srs_stage: 0
      }
    },
    srs_queue: [{ lesson_id: 'l01', interval_index: 1, due_date: today.toISOString() }],
    review_queue: [
      {
        exercise_id: firstExerciseId,
        lesson_id: 'l01',
        interval_index: 0,
        wrong_count: 1,
        due_date: today.toISOString()
      }
    ],
    achievements: ['first-lesson'],
    annotations: { 'th-sem1-algorithms-m01-program-design::definicao': 'nota' }
  };
  storage['ensina-logica-progress'] = JSON.stringify(seeded);

  const { initApp } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'app.js')).href);
  const { progressStore, ProgressStore } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'store', 'ProgressStore.js')).href);
  const { getDueExerciseReviews } = await import(pathToFileURL(join(ROOT_DIR, 'src', 'gamification', 'srs.js')).href);

  await initApp();
  await wait(80);

  const doc = window.document;
  const hash = () => window.location.hash;
  const progress = () => window.EnsinaLogica.getProgress();

  // ---- 1. Migração v4 + órfãos ----
  assert.equal(progress().schema_version, 4, 'boot migra para schema 4');
  assert.equal(progress().srs_queue.length, 0, 'revisões por lição descartadas');
  assert.equal(progress().review_queue.length, 0, 'review_queue legada limpa');
  assert.equal(progress().exercises['ex-sem1-algorithms-m01-orphan'], undefined, 'exercício órfão removido');
  assert.ok(progress().exercises[firstExerciseId], 'exercício válido preservado');
  assert.equal(progress().stats.total_xp, 120, 'XP preservado');
  assert.equal(progress().stats.current_streak, 2, 'streak preservado');
  assert.equal(progress().achievements[0], 'first-lesson', 'conquistas preservadas');
  assert.equal(progress().annotations['th-sem1-algorithms-m01-program-design::definicao'], 'nota', 'anotações preservadas');
  ok('migração v4 + limpeza de órfãos no boot');

  // ---- 2. Painel conta exercícios ----
  assert.equal(hash(), '#/', 'boot abre o painel');
  const reviewsStat = doc.querySelector('.stat-card.reviews .stat-value')?.textContent?.trim();
  assert.equal(reviewsStat, '1', 'painel conta 1 exercício vencido');
  const reviewsTitle = doc.querySelector('#reviews-title')?.textContent?.trim();
  assert.equal(reviewsTitle, '1 exercício para revisar', 'texto do painel no singular');
  assert.ok(doc.getElementById('start-reviews-btn'), 'painel oferece "Iniciar revisões"');
  ok('painel conta exercícios');

  // ---- 3. Sessão de revisão: um por vez, teoria e resumo ----
  doc.getElementById('start-reviews-btn').click();
  await wait(80);
  assert.equal(hash(), '#/review', 'botão abre a rota de revisão');
  assert.equal(doc.querySelectorAll('.review-host .exercise').length, 1, 'revisão mostra um exercício por vez');
  assert.ok(doc.querySelector('.review-progress').textContent.includes('Exercício 1 de 1'), 'progresso da revisão');
  const theoryLink = doc.querySelector('.review-theory-link');
  assert.ok(theoryLink, 'link "ver a teoria" presente');
  assert.equal(
    theoryLink.getAttribute('href'),
    '#/theory/th-sem1-algorithms-m01-program-design?section=definicao',
    'link usa source_ref (unidade + seção)'
  );
  assert.equal(theoryLink.getAttribute('target'), '_blank', 'teoria abre em nova aba');

  const currentExercise = doc.querySelector('.review-host .exercise');
  assert.equal(currentExercise.dataset.exerciseId, firstExerciseId, 'revisão começa pelo exercício da fila');
  const correctRadio = [...currentExercise.querySelectorAll('input[type="radio"]')]
    .find((radio) => Number(radio.value) === Number(exerciseById.get(firstExerciseId).correct));
  correctRadio.checked = true;
  correctRadio.dispatchEvent(new window.Event('change'));
  currentExercise.querySelector('.submit-btn').click();
  doc.querySelector('.review-next-btn').click();
  await wait(20);

  assert.equal(doc.querySelector('.review-summary').hidden, false, 'resumo final aparece');
  const summaryText = doc.querySelector('.review-summary-text').textContent;
  assert.ok(summaryText.includes('Você acertou 1 de 1.'), 'resumo conta acertos');
  assert.ok(summaryText.includes('1 exercício volta amanhã.'), 'resumo informa a próxima revisão');
  assert.equal(progress().exercises[firstExerciseId].srs_stage, 1, 'acerto na revisão avança o estágio');
  assert.equal(progress().exercises[firstExerciseId].last_result, 'correct', 'last_result atualizado');
  const dueAfterReview = startOfDay(progress().exercises[firstExerciseId].due_date);
  const tomorrow = startOfDay(new Date());
  tomorrow.setDate(tomorrow.getDate() + 1);
  assert.equal(dueAfterReview.getTime(), tomorrow.getTime(), 'acerto agenda para amanhã');
  assert.equal(getDueExerciseReviews(progress()).length, 0, 'exercício acertado sai da fila');

  window.EnsinaLogica.navigate('/');
  await wait(80);
  assert.equal(doc.querySelector('.stat-card.reviews .stat-value')?.textContent?.trim(), '0', 'painel zera revisões');
  ok('revisão um-por-um, teoria, resumo e avanço do SRS');

  // ---- 4. Lição: resultado, retry e erros repetidos ----
  window.EnsinaLogica.navigate('/lesson/l01');
  await wait(120);
  assert.equal(doc.querySelectorAll('.lesson .exercise-item').length, lessonExercises.length, 'lição carregada');

  const answerWrong = (item) => {
    const ex = item.querySelector('.exercise');
    const type = ex.dataset.exerciseType;
    const data = exerciseById.get(ex.dataset.exerciseId);
    if (type === 'multiple-choice') {
      const radio = [...ex.querySelectorAll('input[type="radio"]')]
        .find((input) => Number(input.value) !== Number(data.correct));
      radio.checked = true;
      radio.dispatchEvent(new window.Event('change'));
      ex.querySelector('.submit-btn').click();
    } else if (type === 'true-false') {
      ex.querySelector(Number(data.correct) === 0 ? '.tf-false' : '.tf-true').click();
    } else if (type === 'order-steps') {
      ex.querySelector('.submit-btn').click(); // ordem inicial [0,1,2] != correta
    } else if (type === 'flashcards') {
      ex.querySelector('.flip-btn').click();
      ex.querySelector('.unknown-btn').click();
    }
  };

  for (const item of [...doc.querySelectorAll('.lesson .exercise-item')]) answerWrong(item);

  const completion = doc.querySelector('.lesson .lesson-completion');
  assert.ok(completion && !completion.hidden, 'conclusão aparece mesmo com erros (sem exigir 100%)');
  assert.equal(completion.querySelector('.lesson-completion-summary').textContent, 'Você acertou 0 de 6.', 'resultado X de Y');
  const retryBtn = completion.querySelector('.retry-wrong-btn');
  assert.ok(retryBtn && !retryBtn.hidden, 'botão de refazer errados visível');
  assert.equal(retryBtn.textContent, 'Refazer só os que errei (6)', 'botão mostra N errados');
  assert.equal(getDueExerciseReviews(progress()).length, 6, '6 exercícios errados = 6 itens únicos');

  retryBtn.click();
  await wait(20);
  assert.equal(doc.querySelectorAll('.lesson .exercise-item').length, 6, 'refazer monta somente os 6 errados');
  assert.ok(/Refazendo apenas/.test(doc.querySelector('.lesson-practice-notice').textContent), 'aviso do modo retry');

  const retryItem = [...doc.querySelectorAll('.lesson .exercise-item')]
    .find((item) => item.querySelector('.exercise')?.dataset.exerciseId === secondExerciseId);
  assert.ok(retryItem, 'exercício de retry encontrado');
  const repeatedId = retryItem.querySelector('.exercise').dataset.exerciseId;
  answerWrong(retryItem);
  const record = progress().exercises[repeatedId];
  assert.equal(record.wrong_count, 2, 'errar o mesmo exercício de novo soma wrong_count');
  assert.equal(
    getDueExerciseReviews(progress()).filter((item) => item.exercise_id === repeatedId).length,
    1,
    'mesmo exercício continua com um único item na fila'
  );
  assert.equal(getDueExerciseReviews(progress()).length, 6, 'retry não duplica itens');
  ok('lição: resultado, refazer errados e upsert por exercício');

  // ---- 5. Painel plural + acerto na revisão a partir de um card ----
  window.EnsinaLogica.navigate('/');
  await wait(80);
  assert.equal(doc.querySelector('.stat-card.reviews .stat-value')?.textContent?.trim(), '6', 'painel conta os 6 errados');
  assert.equal(doc.querySelector('#reviews-title')?.textContent?.trim(), '6 exercícios para revisar', 'texto plural do painel');

  window.EnsinaLogica.navigate(`/review?start=${encodeURIComponent(repeatedId)}`);
  await wait(80);
  const startExercise = doc.querySelector('.review-host .exercise');
  assert.equal(startExercise.dataset.exerciseId, repeatedId, '?start começa pelo exercício escolhido');

  // Responde corretamente de acordo com o tipo.
  const rerunData = exerciseById.get(repeatedId);
  if (rerunData.type === 'multiple-choice') {
    const radio = [...startExercise.querySelectorAll('input[type="radio"]')]
      .find((input) => Number(input.value) === Number(rerunData.correct));
    radio.checked = true;
    radio.dispatchEvent(new window.Event('change'));
    startExercise.querySelector('.submit-btn').click();
  } else if (rerunData.type === 'true-false') {
    startExercise.querySelector(Number(rerunData.correct) === 0 ? '.tf-true' : '.tf-false').click();
  } else if (rerunData.type === 'order-steps') {
    // Reordena para a sequência correta [1, 2, 0].
    startExercise.querySelector('.step-item[data-original-index="1"] .move-up').click();
    startExercise.querySelector('.step-item[data-original-index="2"] .move-up').click();
    startExercise.querySelector('.submit-btn').click();
  } else if (rerunData.type === 'flashcards') {
    startExercise.querySelector('.flip-btn').click();
    startExercise.querySelector('.known-btn').click();
  }

  assert.equal(progress().exercises[repeatedId].srs_stage, 1, 'acerto na revisão avança o estágio');
  assert.equal(getDueExerciseReviews(progress()).length, 5, 'acerto remove um item da fila');
  ok('?start + acerto na revisão reduz a fila');

  // ---- 6. Persistência após reload ----
  const persisted = JSON.parse(storage['ensina-logica-progress']);
  assert.equal(persisted.exercises[repeatedId].srs_stage, 1, 'registro persistido no localStorage');
  const reloadedStore = new ProgressStore();
  await reloadedStore.init();
  assert.equal(reloadedStore.get().exercises[repeatedId].wrong_count, 2, 'reload mantém wrong_count');
  assert.equal(reloadedStore.get().exercises[repeatedId].srs_stage, 1, 'reload mantém srs_stage');
  assert.equal(getDueExerciseReviews(reloadedStore.get()).length, 5, 'reload mantém a fila');
  ok('persistência após reload');

  // ---- 7. Export/import preserva registros por exercício ----
  const exported = progressStore.export();
  progressStore.clear();
  assert.equal(Object.keys(progressStore.get().exercises).length, 0, 'clear zera os exercícios');
  assert.equal(progressStore.import(exported), true, 'import aceita o JSON exportado');
  const restored = progressStore.get().exercises[repeatedId];
  assert.ok(restored, 'import restaura o registro do exercício');
  assert.equal(restored.wrong_count, 2, 'import preserva wrong_count');
  assert.equal(restored.srs_stage, 1, 'import preserva srs_stage');
  assert.equal(restored.first_try_correct, false, 'import preserva first_try_correct');
  assert.equal(getDueExerciseReviews(progressStore.get()).length, 5, 'import preserva a fila de revisões');
  ok('export/import preservam registros por exercício');

  console.log(`\n✅ Testes de revisão passaram (${passed}).`);
}

main().catch((error) => {
  console.error('❌ Teste de revisão falhou:', error);
  process.exit(1);
});
