/**
 * Code Completion Exercise Type
 * Textarea (highlight.js for the reference solution), "Verificar"/"Run" button,
 * syntax check for JavaScript, explanation.
 *
 * O app roda 100% no navegador (sem Node/backend), então não executamos
 * `node --check` aqui. Para JavaScript, fazemos uma checagem de sintaxe segura
 * com `new Function(...)` (sem executar o corpo) e comparamos a solução do
 * usuário com a solução de referência (normalizada). Os `test_command` do
 * arquivo de dados existem para a verificação do conteúdo no CI.
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';

const LANGUAGE_LABELS = {
  javascript: 'JavaScript',
  python: 'Python',
  pseudocode: 'Pseudocódigo'
};

/**
 * Normaliza código para comparação: remove espaços à direita de cada linha,
 * colapsa espaços/tabs internos e apara as extremidades.
 * @param {string} code
 * @returns {string}
 */
export function normalizeCode(code) {
  return String(code || '')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .trim()
    .replace(/\t/g, ' ')
    .replace(/[^\S\n]+/g, ' ');
}

/**
 * Checa se o código JavaScript tem sintaxe válida (sem executar).
 * @param {string} code
 * @returns {{ ok: boolean, message?: string }}
 */
export function checkJavaScriptSyntax(code) {
  try {
    // Apenas valida a sintaxe: `new Function` faz o parse sem invocar o corpo.
    // eslint-disable-next-line no-new-func
    new Function(String(code || ''));
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export function renderCodeCompletion(exercise, options = {}) {
  const container = document.createElement('div');
  container.className = 'exercise exercise-code-completion';
  container.dataset.exerciseId = exercise.id;
  container.dataset.exerciseType = 'code-completion';

  const isRetry = options.isRetry || false;
  const onAnswer = options.onAnswer || (() => {});
  const language = exercise.language || 'javascript';
  const languageLabel = LANGUAGE_LABELS[language] || language;

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.codeCompletion')}</span>
      <span class="language-badge">${languageLabel}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <p class="exercise-prompt">${exercise.prompt}</p>
    <label class="code-label" for="code-${exercise.id}">${t('lesson.codeCompletion.yourCode')}</label>
    <textarea id="code-${exercise.id}" class="code-input" rows="6" spellcheck="false"
      aria-describedby="code-hint-${exercise.id}" ${isRetry ? 'disabled' : ''}>${escapeHtml(exercise.starter_code || '')}</textarea>
    <p id="code-hint-${exercise.id}" class="code-hint">${t('lesson.codeCompletion.hint', { language: languageLabel })}</p>
    <div class="exercise-actions">
      ${!isRetry ? `<button class="btn btn-primary check-btn">${t('lesson.codeCompletion.check')}</button>` : ''}
    </div>
    <div class="exercise-feedback" aria-live="polite" hidden></div>
    <div class="exercise-explanation" hidden>
      <h4>${t('lesson.explanation')}</h4>
      <p>${exercise.explanation}</p>
      ${exercise.correct ? `<p class="reference-solution"><strong>${t('lesson.codeCompletion.reference')}:</strong> <code>${escapeHtml(exercise.correct)}</code></p>` : ''}
    </div>
    <div class="exercise-actions">
      ${isRetry ? `<button class="btn btn-secondary retry-btn">${t('lesson.tryAgain')}</button>` : ''}
    </div>
  `;

  const textarea = container.querySelector('.code-input');
  const checkBtn = container.querySelector('.check-btn');
  const retryBtn = container.querySelector('.retry-btn');
  const feedbackEl = container.querySelector('.exercise-feedback');
  const explanationEl = container.querySelector('.exercise-explanation');

  let answered = isRetry;

  if (checkBtn) {
    checkBtn.addEventListener('click', handleCheck);
  }
  if (retryBtn) {
    retryBtn.addEventListener('click', resetExercise);
  }

  function handleCheck() {
    if (answered) return;
    answered = true;

    const userCode = textarea.value;
    const matchesReference = normalizeCode(userCode) === normalizeCode(exercise.correct);
    let syntaxOk = true;
    let syntaxMessage = null;

    if (language === 'javascript') {
      const syntax = checkJavaScriptSyntax(userCode);
      syntaxOk = syntax.ok;
      syntaxMessage = syntax.message || null;
    }

    const isCorrect = matchesReference && syntaxOk;
    const xpEarned = options.calculateXP ? options.calculateXP(isCorrect, isRetry) : 0;

    textarea.disabled = true;
    if (checkBtn) checkBtn.hidden = true;

    if (!syntaxOk) {
      showFeedback(feedbackEl, FeedbackType.INCORRECT, {
        xp: 0,
        streak: options.streak,
        isFirstAttempt: !isRetry
      });
      feedbackEl.insertAdjacentHTML('beforeend',
        `<p class="feedback-detail">${t('lesson.codeCompletion.syntaxError', { message: syntaxMessage || '' })}</p>`);
    } else if (!matchesReference) {
      showFeedback(feedbackEl, FeedbackType.PARTIAL, {
        xp: 0,
        streak: options.streak,
        isFirstAttempt: !isRetry
      });
      feedbackEl.insertAdjacentHTML('beforeend',
        `<p class="feedback-detail">${t('lesson.codeCompletion.notQuite')}</p>`);
    } else {
      showFeedback(feedbackEl, FeedbackType.CORRECT, {
        xp: xpEarned,
        streak: options.streak,
        isFirstAttempt: !isRetry
      });
    }

    explanationEl.hidden = false;

    onAnswer({
      exerciseId: exercise.id,
      correct: isCorrect,
      xpEarned,
      isRetry,
      userAnswer: userCode
    });
  }

  function resetExercise() {
    answered = false;
    textarea.disabled = false;
    textarea.value = exercise.starter_code || '';
    if (checkBtn) {
      checkBtn.hidden = false;
      checkBtn.disabled = false;
    }
    if (retryBtn) retryBtn.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    explanationEl.hidden = true;
  }

  return container;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
