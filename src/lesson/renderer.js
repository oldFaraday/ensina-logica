/**
 * Lesson Renderer
 * Renderiza a lição: resumo teórico curto + lista de exercícios (sequencial),
 * barra de progresso da lição e bloco de conclusão com "Praticar mais".
 *
 * A renderização dos tipos é delegada a `src/lesson/exercise-types/*`.
 * Quem chama (app.js) injeta os callbacks de XP/streak/persistência/SRS.
 */

import { t } from '../i18n.js';
import { renderMultipleChoice } from './exercise-types/multiple-choice.js';
import { renderTrueFalse } from './exercise-types/true-false.js';
import { renderOrderSteps } from './exercise-types/order-steps.js';
import { renderCodeCompletion } from './exercise-types/code-completion.js';
import { renderFlashcards } from './exercise-types/flashcards.js';

export const EXERCISE_RENDERERS = {
  'multiple-choice': renderMultipleChoice,
  'true-false': renderTrueFalse,
  'order-steps': renderOrderSteps,
  'code-completion': renderCodeCompletion,
  'flashcards': renderFlashcards
};

/**
 * Retorna o renderizador de um tipo de exercício.
 * @param {string} type
 * @returns {Function|null}
 */
export function getExerciseRenderer(type) {
  return EXERCISE_RENDERERS[type] || null;
}

/**
 * Renderiza a lição inteira dentro de um elemento.
 * @param {Object} lesson - { id, title, theoryUnitId, summary, theoryMeta, exercises }
 * @param {Object} callbacks - { calculateXP, getStreak, onAnswer, onComplete, onPracticeMore, onReadTheory }
 * @returns {HTMLElement} O elemento `.lesson`
 */
export function renderLesson(lesson, callbacks = {}) {
  const {
    getStreak = () => 0,
    onAnswer = () => {},
    onComplete = () => {},
    onPracticeMore = null,
    onRetryWrong = null,
    onReadTheory = null
  } = callbacks;

  const exercises = Array.isArray(lesson.exercises) ? lesson.exercises : [];

  const section = document.createElement('section');
  section.className = 'lesson';
  section.setAttribute('aria-label', lesson.title || t('lesson.title'));

  // ---- Resumo teórico ----
  if (lesson.summary) {
    const summary = document.createElement('section');
    summary.className = 'lesson-summary';
    summary.innerHTML = `
      <h2>${t('lesson.theorySummary')}</h2>
      <div class="lesson-summary-text">${lesson.summary}</div>
      ${renderTheoryMeta(lesson.theoryMeta)}
      ${lesson.theoryUnitId ? `<button type="button" class="btn btn-secondary read-theory-btn">${t('lesson.readInLibrary')}</button>` : ''}
    `;
    section.appendChild(summary);

    const readBtn = summary.querySelector('.read-theory-btn');
    if (readBtn && onReadTheory) {
      readBtn.addEventListener('click', () => onReadTheory(lesson.theoryUnitId));
    }
  }

  // ---- Estado da lição ----
  const state = {
    total: exercises.length,
    answered: 0,
    correct: 0,
    xpTotal: 0,
    wrongExerciseIds: []
  };

  const progressWrap = document.createElement('div');
  progressWrap.className = 'lesson-progress';
  progressWrap.innerHTML = `
    <div class="lesson-progress-header">
      <span class="lesson-progress-label"></span>
      <span class="lesson-progress-count"></span>
    </div>
    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div class="progress-fill" style="width: 0%"></div>
    </div>
  `;
  section.appendChild(progressWrap);

  const updateProgress = () => {
    const pct = state.total > 0 ? Math.round((state.answered / state.total) * 100) : 0;
    progressWrap.querySelector('.lesson-progress-label').textContent = t('lesson.progressLabel');
    progressWrap.querySelector('.lesson-progress-count').textContent =
      t('lesson.progressCount', { current: Math.min(state.answered + (state.answered < state.total ? 1 : 0), state.total), total: state.total });
    const bar = progressWrap.querySelector('.progress-bar');
    bar.setAttribute('aria-valuenow', String(pct));
    progressWrap.querySelector('.progress-fill').style.width = `${pct}%`;
  };
  updateProgress();

  // ---- Lista de exercícios ----
  if (exercises.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'placeholder';
    empty.textContent = t('lesson.noExercises');
    section.appendChild(empty);
    return section;
  }

  const list = document.createElement('ol');
  list.className = 'exercise-list';

  exercises.forEach((exercise, index) => {
    const item = document.createElement('li');
    item.className = 'exercise-item';

    const meta = document.createElement('div');
    meta.className = 'exercise-item-meta';
    meta.innerHTML = `
      <span class="exercise-number">${t('lesson.exerciseNumber', { number: index + 1 })}</span>
      ${exercise.generated_by_ai ? `<span class="ai-badge" title="${t('lesson.aiGeneratedHint')}">🤖 ${t('lesson.aiGenerated')}</span>` : ''}
    `;
    item.appendChild(meta);

    const renderer = getExerciseRenderer(exercise.type);
    if (!renderer) {
      const unsupported = document.createElement('p');
      unsupported.className = 'placeholder';
      unsupported.textContent = t('lesson.unsupportedType', { type: exercise.type });
      item.appendChild(unsupported);
      list.appendChild(item);
      return;
    }

    const wasAnswered = Boolean(exercise._previouslyAnswered);
    const exerciseEl = renderer(exercise, {
      isRetry: false,
      attempt: Number(exercise._attempt) || 1,
      streak: getStreak(),
      // Passa o exercício para o chamador decidir XP (base, first-time, retry)
      calculateXP: callbacks.calculateXP
        ? (isCorrect, isRetry) => callbacks.calculateXP(exercise, isCorrect, isRetry)
        : undefined,
      onAnswer: (result) => {
        state.answered += 1;
        if (result.correct) {
          state.correct += 1;
        } else if (!state.wrongExerciseIds.includes(exercise.id)) {
          state.wrongExerciseIds.push(exercise.id);
        }
        state.xpTotal += result.xpEarned || 0;
        updateProgress();
        onAnswer({ ...result, exercise, wasAnswered });
        maybeComplete();
      }
    });
    item.appendChild(exerciseEl);
    list.appendChild(item);
  });

  section.appendChild(list);

  // ---- Bloco de conclusão (oculto até responder tudo) ----
  const completion = document.createElement('section');
  completion.className = 'lesson-completion';
  completion.hidden = true;
  completion.setAttribute('aria-live', 'polite');
  completion.innerHTML = `
    <h2>${t('lesson.completedTitle')}</h2>
    <p class="lesson-completion-summary"></p>
    <p class="lesson-completion-xp"></p>
    <div class="lesson-completion-actions">
      ${onRetryWrong ? `<button type="button" class="btn btn-secondary retry-wrong-btn" hidden></button>` : ''}
      ${onPracticeMore ? `<button type="button" class="btn btn-secondary practice-more-btn">${t('lesson.practiceMore')}</button>` : ''}
      <button type="button" class="btn btn-primary finish-btn">${t('lesson.finish')}</button>
    </div>
  `;
  section.appendChild(completion);

  const retryWrongBtn = completion.querySelector('.retry-wrong-btn');
  if (retryWrongBtn && onRetryWrong) {
    retryWrongBtn.addEventListener('click', () => {
      onRetryWrong([...state.wrongExerciseIds]);
    });
  }
  const practiceBtn = completion.querySelector('.practice-more-btn');
  if (practiceBtn && onPracticeMore) {
    practiceBtn.addEventListener('click', () => onPracticeMore());
  }
  completion.querySelector('.finish-btn').addEventListener('click', () => {
    onComplete({ ...state, wrongExerciseIds: [...state.wrongExerciseIds] });
  });

  let completedNotified = false;
  function maybeComplete() {
    if (state.answered < state.total || completedNotified) return;
    completedNotified = true;
    completion.hidden = false;
    completion.querySelector('.lesson-completion-summary').textContent =
      t('lesson.resultSummary', { correct: state.correct, total: state.total });
    completion.querySelector('.lesson-completion-xp').textContent =
      t('lesson.xpSummary', { xp: state.xpTotal });

    if (retryWrongBtn) {
      const wrongCount = state.wrongExerciseIds.length;
      retryWrongBtn.hidden = wrongCount === 0;
      retryWrongBtn.textContent = t('lesson.retryWrong', { count: wrongCount });
    }

    if (typeof completion.scrollIntoView === 'function') {
      completion.scrollIntoView({ block: 'nearest' });
    }
  }

  return section;
}

/**
 * Renderiza o bloco de atribuição/verificação da unidade teórica ligada.
 * @param {Object|null} meta
 * @returns {string}
 */
function renderTheoryMeta(meta) {
  if (!meta) return '';
  const statusKey = meta.verification_status === 'verified_with_source' ? 'verified' : 'unverified';
  const authors = Array.isArray(meta.authors) ? meta.authors.join(', ') : (meta.authors || '');
  return `
    <details class="lesson-attribution">
      <summary>${t('theory.attribution')}</summary>
      <p><strong>${t('theory.source')}:</strong> ${meta.title || ''}${meta.edition ? ` (${meta.edition})` : ''}</p>
      ${authors ? `<p><strong>${t('theory.authors')}:</strong> ${authors}</p>` : ''}
      ${meta.chapter ? `<p><strong>${t('theory.chapter')}:</strong> ${meta.chapter}${meta.section ? ` — ${meta.section}` : ''}</p>` : ''}
      ${meta.license ? `<p><strong>${t('theory.license')}:</strong> ${meta.license}</p>` : ''}
      <p><span class="verification-badge verification-${statusKey}">${t(`theory.verificationStatus.${statusKey}`)}</span></p>
    </details>
  `;
}
