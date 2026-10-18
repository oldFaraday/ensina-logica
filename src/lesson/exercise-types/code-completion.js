/**
 * Code Completion Exercise Type
 *
 * O código aparece como texto FIXO (bloco monoespaçado, não editável) e cada
 * lacuna `___` vira um campo de entrada inline. O aluno preenche apenas as
 * lacunas — nunca editamos nem executamos código digitado (sem `eval`, sem
 * `new Function`, sem interpretador), o que mantém a verificação
 * determinística e segura no navegador (sem backend).
 *
 * Convenção de dados (ver `data/exercises/_schema.json`):
 *  - `code`     → código com uma ou mais lacunas marcadas por `___`
 *  - `blanks`   → array de `{ accepted_answers: string[] }`, na ordem das
 *                 lacunas; a primeira resposta costuma ser a de referência
 *  - `language` → rótulo exibido na badge (javascript, python, pseudocode...)
 *
 * A comparação de cada lacuna normaliza aspas e espaços em branco, de modo que
 * `(a+b)/2`, `(a + b) / 2` e `(a+b) /2` sejam equivalentes. Diferenças que não
 * são só de formatação (ex.: `(a+b)/2` vs. `(b+a)/2`) precisam ser listadas em
 * `accepted_answers`.
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';

const LANGUAGE_LABELS = {
  javascript: 'JavaScript',
  python: 'Python',
  pseudocode: 'Pseudocódigo'
};

/** Marcador de lacuna usado no campo `code`. */
export const CODE_BLANK_TOKEN = '___';

/**
 * Normaliza a resposta de uma lacuna antes de comparar:
 *  - uniformiza aspas tipográficas ("" '' ′ ″) para ASCII;
 *  - remove todos os espaços em branco (espaços, tabs, quebras de linha).
 * Não altera maiúsculas/minúsculas (identificadores diferenciam caixa).
 * @param {unknown} value
 * @returns {string}
 */
export function normalizeBlankAnswer(value) {
  return String(value ?? '')
    .replace(/[\u2018\u2019\u201A\u201B\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u2033]/g, '"')
    .replace(/\s+/g, '');
}

/**
 * Compara a resposta digitada com a lista de respostas aceitas, após normalizar
 * espaços e aspas. Uma resposta vazia (ou só espaços) nunca é aceita.
 * @param {string} value
 * @param {string[]} acceptedAnswers
 * @returns {boolean}
 */
export function answersMatch(value, acceptedAnswers = []) {
  const normalized = normalizeBlankAnswer(value);
  if (!normalized) return false;
  return acceptedAnswers.some((answer) => normalizeBlankAnswer(answer) === normalized);
}

/**
 * Conta quantas lacunas (`___`) existem no código.
 * @param {string} code
 * @returns {number}
 */
export function countBlanks(code) {
  return String(code ?? '').split(CODE_BLANK_TOKEN).length - 1;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Renderiza um exercício de completar código.
 * @param {Object} exercise - Exercise data (code, blanks, language, ...)
 * @param {Object} options - { isRetry, streak, calculateXP, onAnswer }
 * @returns {HTMLElement} Exercise element
 */
export function renderCodeCompletion(exercise, options = {}) {
  const container = document.createElement('div');
  container.className = 'exercise exercise-code-completion';
  container.dataset.exerciseId = exercise.id;
  container.dataset.exerciseType = 'code-completion';

  const isRetry = options.isRetry || false;
  const onAnswer = options.onAnswer || (() => {});
  const language = exercise.language || 'javascript';
  const languageLabel = LANGUAGE_LABELS[language] || language;
  const acceptedByBlank = Array.isArray(exercise.blanks) ? exercise.blanks : [];
  const codeTemplate = String(exercise.code ?? '');

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.codeCompletion')}</span>
      <span class="language-badge">${languageLabel}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <p class="exercise-prompt">${exercise.prompt}</p>
    <p class="code-label">${t('lesson.codeCompletion.codeLabel')}</p>
    <div class="code-block-host"></div>
    <p id="code-hint-${exercise.id}" class="code-hint">${t('lesson.codeCompletion.hint', { language: languageLabel })}</p>
    <div class="exercise-actions">
      ${!isRetry ? `<button class="btn btn-primary check-btn">${t('lesson.codeCompletion.check')}</button>` : ''}
      ${isRetry ? `<button class="btn btn-secondary retry-btn">${t('lesson.tryAgain')}</button>` : ''}
    </div>
    <div class="exercise-feedback" aria-live="polite" hidden></div>
    <div class="exercise-explanation" hidden>
      <h4>${t('lesson.explanation')}</h4>
      <p>${exercise.explanation}</p>
      <div class="reference-solution" hidden>
        <p><strong>${t('lesson.codeCompletion.reference')}:</strong></p>
        <ul class="reference-blanks"></ul>
      </div>
    </div>
  `;

  // --- Bloco de código fixo com uma entrada inline por lacuna ---
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'code-block';
  const codeEl = document.createElement('code');
  const parts = codeTemplate.split(CODE_BLANK_TOKEN);
  const totalBlanks = parts.length - 1;
  const inputs = [];

  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i]) codeEl.appendChild(document.createTextNode(parts[i]));
    if (i < parts.length - 1) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'code-blank';
      input.dataset.blankIndex = String(i);
      // A largura é fixa (CSS): não revela o tamanho da resposta correta.
      input.setAttribute(
        'aria-label',
        t('lesson.codeCompletion.blank', { index: i + 1, total: totalBlanks })
      );
      input.setAttribute('aria-describedby', `code-hint-${exercise.id}`);
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('spellcheck', 'false');
      if (isRetry) input.disabled = true;
      codeEl.appendChild(input);
      inputs.push(input);
    }
  }
  codeBlock.appendChild(codeEl);
  container.querySelector('.code-block-host').replaceWith(codeBlock);

  const checkBtn = container.querySelector('.check-btn');
  const retryBtn = container.querySelector('.retry-btn');
  const feedbackEl = container.querySelector('.exercise-feedback');
  const explanationEl = container.querySelector('.exercise-explanation');
  const referenceEl = container.querySelector('.reference-solution');
  const referenceList = container.querySelector('.reference-blanks');

  let answered = isRetry;

  // Enter em qualquer lacuna verifica; Tab segue a ordem natural dos campos.
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target?.classList?.contains('code-blank')) {
      event.preventDefault();
      handleCheck();
    }
  });

  if (checkBtn) checkBtn.addEventListener('click', handleCheck);
  if (retryBtn) retryBtn.addEventListener('click', resetExercise);

  function acceptedAnswersFor(index) {
    const answers = acceptedByBlank[index]?.accepted_answers;
    return Array.isArray(answers) ? answers : [];
  }

  function referenceAnswerFor(index) {
    const answers = acceptedAnswersFor(index);
    return answers.length > 0 ? String(answers[0]) : '';
  }

  function handleCheck() {
    if (answered) return;
    answered = true;

    const values = inputs.map((input) => input.value);
    const results = inputs.map((input, index) => answersMatch(input.value, acceptedAnswersFor(index)));
    const isCorrect = results.length > 0 && results.every(Boolean);

    const xpEarned = isCorrect && options.calculateXP ? options.calculateXP(true, isRetry) : 0;

    inputs.forEach((input, index) => {
      input.disabled = true;
      input.classList.toggle('correct', results[index]);
      input.classList.toggle('incorrect', !results[index]);
    });

    if (checkBtn) checkBtn.hidden = true;

    showFeedback(feedbackEl, isCorrect ? FeedbackType.CORRECT : FeedbackType.INCORRECT, {
      xp: xpEarned,
      streak: options.streak,
      isFirstAttempt: !isRetry
    });

    // Sem vidas/punição: ao errar, mostramos a resposta de referência das
    // lacunas erradas e a explicação; nada é executado.
    if (!isCorrect) {
      const detailItems = results
        .map((isOk, index) => (isOk ? null : index))
        .filter((index) => index !== null)
        .map((index) =>
          `<li>${t('lesson.codeCompletion.answerReference', {
            index: index + 1,
            answer: escapeHtml(referenceAnswerFor(index))
          })}</li>`
        )
        .join('');
      feedbackEl.insertAdjacentHTML(
        'beforeend',
        `<p class="feedback-detail">${t('lesson.codeCompletion.notQuite')}</p>` +
          `<ul class="feedback-reference">${detailItems}</ul>`
      );
    }

    referenceList.innerHTML = inputs
      .map(
        (input, index) =>
          `<li><span class="reference-blank-index">${t('lesson.codeCompletion.blank', {
            index: index + 1,
            total: totalBlanks
          })}:</span> <code>${escapeHtml(referenceAnswerFor(index))}</code></li>`
      )
      .join('');
    referenceEl.hidden = false;
    explanationEl.hidden = false;

    onAnswer({
      exerciseId: exercise.id,
      correct: isCorrect,
      xpEarned,
      isRetry,
      userAnswer: values
    });
  }

  function resetExercise() {
    answered = false;
    inputs.forEach((input) => {
      input.disabled = false;
      input.value = '';
      input.classList.remove('correct', 'incorrect');
    });
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
