/**
 * Spaced Repetition System (SRS) por EXERCÍCIO.
 *
 * A fonte da verdade é `progress.exercises[exercise_id]`. Cada registro guarda
 * o estado de revisão do exercício (`srs_stage`, `due_date`, `wrong_count`),
 * além do histórico de tentativas. Não existe uma entrada por erro: erros
 * repetidos atualizam o MESMO registro (upsert por id).
 *
 * Escada de intervalos (dias): 0 (hoje) → 1 → 3 → 7 → 21.
 * - Errou: volta ao estágio 0 (vence hoje) e soma `wrong_count`.
 * - Acertou em revisão vencida: avança um degrau (1, 3, 7 ou 21 dias).
 * - Primeira resposta correta (sem histórico): agenda para amanhã.
 */

export const SRS_INTERVALS = [0, 1, 3, 7, 21]; // Dias (0 = revisar hoje)
const MAX_STAGE = SRS_INTERVALS.length - 1;

function startOfDay(date = new Date()) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return startOfDay(new Date());
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Retorna o registro de progresso de um exercício (ou null).
 * @param {Object} progress
 * @param {string} exerciseId
 * @returns {Object|null}
 */
export function getExerciseRecord(progress, exerciseId) {
  return progress?.exercises?.[exerciseId] || null;
}

/**
 * Registra (upsert) a resposta de um exercício e atualiza o SRS no MESMO item.
 *
 * Campos persistidos: `last_result`, `first_try_correct`, `attempts`,
 * `wrong_count`, `last_answered_at`, `srs_stage`, `due_date` (+ os campos
 * legados `correct`, `xp_earned` e `last_attempt_date`, usados por XP/streak).
 *
 * @param {Object} progress - Progresso (mutado)
 * @param {Object} params
 * @param {string} params.exerciseId
 * @param {boolean} params.correct
 * @param {string|null} [params.lessonId]
 * @param {number} [params.xpEarned]
 * @param {Date} [params.today]
 * @returns {Object} Registro atualizado
 */
export function recordExerciseAnswer(progress, {
  exerciseId,
  correct,
  lessonId = null,
  xpEarned = 0,
  today = new Date()
} = {}) {
  if (!exerciseId) throw new Error('recordExerciseAnswer: exerciseId obrigatório');
  if (!progress.exercises || typeof progress.exercises !== 'object') {
    progress.exercises = {};
  }

  const previous = progress.exercises[exerciseId] || null;
  const now = today instanceof Date ? new Date(today) : new Date(today);
  const nowIso = Number.isNaN(now.getTime()) ? new Date().toISOString() : now.toISOString();
  const todayDate = startOfDay(now);

  let stage = previous && previous.srs_stage !== undefined && previous.srs_stage !== null
    ? Number(previous.srs_stage)
    : null;
  let due = previous?.due_date ? startOfDay(previous.due_date) : null;

  if (!correct) {
    // Erro sempre reinicia: vence hoje e soma wrong_count (sem duplicar item).
    stage = 0;
    due = todayDate;
  } else if (stage === null || !due) {
    // Primeira resposta correta: agenda a primeira revisão para amanhã.
    stage = Math.min(1, MAX_STAGE);
    due = addDays(todayDate, SRS_INTERVALS[stage]);
  } else if (due <= todayDate) {
    // Acerto em revisão vencida: avança 1 → 3 → 7 → 21 dias.
    stage = Math.min((Number.isFinite(stage) ? stage : 0) + 1, MAX_STAGE);
    due = addDays(todayDate, SRS_INTERVALS[stage]);
  }
  // Acerto antes do vencimento mantém a agenda já existente.

  const attempts = Number(previous?.attempts) || 0;
  // A primeira tentativa é a que define `first_try_correct`. Registros legados
  // sem tentativas (ex.: vindos só da fila de erros) ainda podem ser corretos
  // na primeira resposta de verdade.
  const wasFirstTryCorrect = previous
    ? (attempts > 0 ? Boolean(previous.first_try_correct) : Boolean(correct))
    : Boolean(correct);

  progress.exercises[exerciseId] = {
    ...(previous || {}),
    attempts: attempts + 1,
    correct: Boolean(previous?.correct || correct),
    xp_earned: (Number(previous?.xp_earned) || 0) + (Number(xpEarned) || 0),
    first_try_correct: wasFirstTryCorrect,
    wrong_count: (Number(previous?.wrong_count) || 0) + (correct ? 0 : 1),
    last_result: correct ? 'correct' : 'wrong',
    last_answered_at: nowIso,
    // Campo legado mantido para a meta diária de XP (`getTodayXP`).
    last_attempt_date: nowIso,
    lesson_id: lessonId || previous?.lesson_id || null,
    srs_stage: stage ?? 0,
    due_date: due ? due.toISOString() : null
  };

  progress.updated_at = nowIso;
  return progress.exercises[exerciseId];
}

/**
 * Compatibilidade: registra um erro (upsert, vencendo hoje).
 * @param {Object} progress
 * @param {string} exerciseId
 * @param {string|null} [lessonId]
 * @param {Date} [today]
 * @returns {Object}
 */
export function recordWrongExercise(progress, exerciseId, lessonId = null, today = new Date()) {
  return recordExerciseAnswer(progress, {
    exerciseId,
    correct: false,
    lessonId,
    today
  });
}

/**
 * Compatibilidade: processa o resultado de um exercício já rastreado.
 * Acertar um exercício nunca respondido não cria registro.
 * @param {Object} progress
 * @param {string} exerciseId
 * @param {boolean} correct
 * @param {Date} [today]
 * @returns {Object|null}
 */
export function processExerciseReview(progress, exerciseId, correct, today = new Date()) {
  const existing = getExerciseRecord(progress, exerciseId);
  if (!existing && correct) return null;
  return recordExerciseAnswer(progress, { exerciseId, correct, lessonId: existing?.lesson_id || null, today });
}

/**
 * Revisões de exercícios vencidas hoje ou antes.
 * Retorna um item por exercício (nunca por lição/erro).
 * @param {Object} progress
 * @param {Date} [today=new Date()]
 * @returns {Array<Object>}
 */
export function getDueExerciseReviews(progress, today = new Date()) {
  const todayDate = startOfDay(today);
  return Object.entries(progress?.exercises || {})
    .filter(([, record]) => record?.due_date && startOfDay(record.due_date) <= todayDate)
    .map(([exerciseId, record]) => ({
      exercise_id: exerciseId,
      lesson_id: record.lesson_id || null,
      due_date: record.due_date,
      srs_stage: Number(record.srs_stage) || 0,
      interval_index: Number(record.srs_stage) || 0,
      wrong_count: Number(record.wrong_count) || 0,
      last_result: record.last_result || null
    }))
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
}

/**
 * Próxima revisão futura (depois de hoje).
 * @param {Object} progress
 * @param {Date} [today=new Date()]
 * @returns {Object|null}
 */
export function getNextReview(progress, today = new Date()) {
  const todayDate = startOfDay(today);
  const future = Object.entries(progress?.exercises || {})
    .filter(([, record]) => record?.due_date && startOfDay(record.due_date) > todayDate)
    .map(([exerciseId, record]) => ({
      exercise_id: exerciseId,
      lesson_id: record.lesson_id || null,
      due_date: record.due_date,
      interval_index: Number(record.srs_stage) || 0
    }))
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  return future[0] || null;
}

/**
 * Estatísticas de SRS contando EXERCÍCIOS (não lições).
 * @param {Object} progress
 * @returns {{dueToday:number, upcoming:number, totalScheduled:number}}
 */
export function getSRSStats(progress) {
  const today = startOfDay(new Date());
  let dueToday = 0;
  let upcoming = 0;

  for (const record of Object.values(progress?.exercises || {})) {
    if (!record?.due_date) continue;
    if (startOfDay(record.due_date) <= today) dueToday++;
    else upcoming++;
  }

  return {
    dueToday,
    upcoming,
    totalScheduled: dueToday + upcoming
  };
}

/**
 * Remove do progresso exercícios que não existem mais no conteúdo.
 * Ignora silenciosamente ids órfãos (módulos podem ser refeitos).
 * @param {Object} progress
 * @param {Set<string>|Iterable<string>} validIds
 * @returns {Array<string>} ids removidos
 */
export function pruneOrphanExercises(progress, validIds) {
  if (!progress?.exercises || typeof progress.exercises !== 'object') return [];
  const valid = validIds instanceof Set ? validIds : new Set(validIds || []);
  const removed = [];

  for (const id of Object.keys(progress.exercises)) {
    if (!valid.has(id)) {
      delete progress.exercises[id];
      removed.push(id);
    }
  }

  if (Array.isArray(progress.review_queue)) {
    progress.review_queue = progress.review_queue.filter(
      (entry) => entry?.exercise_id && valid.has(entry.exercise_id)
    );
  }

  if (removed.length > 0) {
    progress.updated_at = new Date().toISOString();
  }
  return removed;
}

/* --------------------------------------------------------------------------
 * API legada de SRS por LIÇÃO.
 * Mantida apenas para compatibilidade de importação/código antigo. O app não
 * agenda mais revisões por lição; a migração v4 descarta `srs_queue`.
 * ------------------------------------------------------------------------ */

export function scheduleReview(progress, lessonId, today = new Date()) {
  const queue = progress.srs_queue || [];
  const todayDate = startOfDay(today);

  const existingIndex = queue.findIndex(q => q.lesson_id === lessonId);
  let intervalIndex = 0;
  if (existingIndex >= 0) {
    intervalIndex = Math.min((queue[existingIndex].interval_index || 0) + 1, SRS_INTERVALS.length - 1);
  }

  const dueDate = addDays(todayDate, SRS_INTERVALS[intervalIndex]);
  const entry = {
    lesson_id: lessonId,
    due_date: dueDate.toISOString(),
    interval_index: intervalIndex,
    scheduled_at: todayDate.toISOString()
  };

  if (existingIndex >= 0) queue[existingIndex] = entry;
  else queue.push(entry);

  progress.srs_queue = queue;
  return entry;
}

export function getDueReviews(progress, today = new Date()) {
  const queue = progress.srs_queue || [];
  const todayDate = startOfDay(today);
  return queue.filter((q) => startOfDay(q.due_date) <= todayDate);
}

export function removeFromSRS(progress, lessonId) {
  const queue = progress.srs_queue || [];
  const index = queue.findIndex(q => q.lesson_id === lessonId);
  if (index >= 0) {
    queue.splice(index, 1);
    return true;
  }
  return false;
}

export function resetSRS(progress, lessonId, today = new Date()) {
  const queue = progress.srs_queue || [];
  const index = queue.findIndex(q => q.lesson_id === lessonId);
  if (index < 0) return null;

  const todayDate = startOfDay(today);
  queue[index] = {
    lesson_id: lessonId,
    due_date: addDays(todayDate, SRS_INTERVALS[0]).toISOString(),
    interval_index: 0,
    scheduled_at: todayDate.toISOString()
  };
  return queue[index];
}

export function getIntervalLabel(intervalIndex) {
  const days = SRS_INTERVALS[intervalIndex] ?? SRS_INTERVALS[SRS_INTERVALS.length - 1];
  if (days === 0) return 'hoje';
  if (days === 1) return '1 dia';
  return `${days} dias`;
}

export function processReview(progress, lessonId, correct, today = new Date()) {
  const queue = progress.srs_queue || [];
  const index = queue.findIndex(q => q.lesson_id === lessonId);

  if (index < 0) return scheduleReview(progress, lessonId, today);

  const entry = queue[index];
  const todayDate = startOfDay(today);
  const newIntervalIndex = correct
    ? Math.min((entry.interval_index || 0) + 1, SRS_INTERVALS.length - 1)
    : 0;

  queue[index] = {
    ...entry,
    due_date: addDays(todayDate, SRS_INTERVALS[newIntervalIndex]).toISOString(),
    interval_index: newIntervalIndex,
    last_reviewed: todayDate.toISOString(),
    last_result: correct ? 'correct' : 'incorrect'
  };

  return queue[index];
}
