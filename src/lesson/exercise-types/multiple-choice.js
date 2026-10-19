/**
 * Multiple Choice Exercise Type
 * Radio options, single correct answer, explanation
 *
 * A ordem de exibição é embaralhada de forma determinística por
 * (id do exercício, tentativa), mas a correção usa sempre o índice original da
 * opção (`originalIndex`). Alternativas que dependem de posição ficam no fim.
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';
import { getDisplayOptions } from '../option-shuffle.js';

/**
 * Render a multiple choice exercise
 * @param {Object} exercise - Exercise data
 * @param {Object} options - Rendering options
 * @returns {HTMLElement} Exercise element
 */
export function renderMultipleChoice(exercise, options = {}) {
  const container = document.createElement('div');
  container.className = 'exercise exercise-multiple-choice';
  container.dataset.exerciseId = exercise.id;
  container.dataset.exerciseType = 'multiple-choice';

  const isRetry = options.isRetry || false;
  const onAnswer = options.onAnswer || (() => {});
  const attempt = Number.isFinite(Number(options.attempt)) ? Number(options.attempt) : 1;
  const displayOptions = getDisplayOptions(exercise.options, {
    exerciseId: exercise.id,
    attempt,
    shuffle: exercise.shuffle !== false
  });
  const correctIndex = Number(exercise.correct);

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.multipleChoice')}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <p class="exercise-prompt">${exercise.prompt}</p>
    <fieldset class="exercise-options" role="radiogroup" aria-label="${t('lesson.exerciseTypes.multipleChoice')}">
      ${displayOptions.map((option, displayIndex) => `
        <label class="option-option" data-original-index="${option.originalIndex}" data-display-index="${displayIndex}">
          <input type="radio" name="exercise-${exercise.id}" value="${option.originalIndex}" ${isRetry ? 'disabled' : ''}>
          <span class="option-content">
            <span class="option-letter">${String.fromCharCode(65 + displayIndex)}</span>
            <span class="option-text">${option.text}</span>
          </span>
          <span class="option-feedback" aria-hidden="true"></span>
        </label>
      `).join('')}
    </fieldset>
    <div class="exercise-actions">
      ${!isRetry ? `<button class="btn btn-primary submit-btn" ${exercise.options.length === 0 ? 'disabled' : ''}>${t('lesson.submit')}</button>` : ''}
      ${isRetry ? `<button class="btn btn-secondary retry-btn">${t('lesson.tryAgain')}</button>` : ''}
    </div>
    <div class="exercise-feedback" aria-live="polite" hidden></div>
    <div class="exercise-explanation" hidden>
      <h4>${t('lesson.explanation')}</h4>
      <p>${exercise.explanation}</p>
    </div>
  `;

  const radioInputs = container.querySelectorAll('input[type="radio"]');
  const submitBtn = container.querySelector('.submit-btn');
  const retryBtn = container.querySelector('.retry-btn');
  const feedbackEl = container.querySelector('.exercise-feedback');
  const explanationEl = container.querySelector('.exercise-explanation');
  const optionLabels = container.querySelectorAll('.option-option');

  let answered = isRetry;
  // Identidade da opção escolhida (índice nos dados), nunca a posição exibida.
  let selectedIndex = null;

  // Handle radio selection (DOM follows the displayed order; value = original index)
  radioInputs.forEach((input) => {
    input.addEventListener('change', () => {
      selectedIndex = Number(input.value);
      if (submitBtn) submitBtn.disabled = false;
      // Clear previous feedback styling
      optionLabels.forEach(l => l.classList.remove('selected', 'correct', 'incorrect'));
      const selectedLabel = input.closest('.option-option');
      if (selectedLabel) selectedLabel.classList.add('selected');
    });
  });

  // Handle submit
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (selectedIndex === null) return;
      handleAnswer(selectedIndex);
    });
  }

  // Handle retry
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      resetExercise();
    });
  }

  function handleAnswer(selectedIdx) {
    if (answered) return;
    answered = true;

    const isCorrect = selectedIdx === correctIndex;
    const xpEarned = options.calculateXP ? options.calculateXP(isCorrect, isRetry) : 0;

    // Disable inputs
    radioInputs.forEach(input => input.disabled = true);
    if (submitBtn) submitBtn.hidden = true;

    // Show feedback on options (by original identity, not by displayed position)
    optionLabels.forEach((label) => {
      const originalIndex = Number(label.dataset.originalIndex);
      label.classList.remove('selected');
      if (originalIndex === correctIndex) {
        label.classList.add('correct');
        label.querySelector('.option-feedback').textContent = '✅';
      } else if (originalIndex === selectedIdx && !isCorrect) {
        label.classList.add('incorrect');
        label.querySelector('.option-feedback').textContent = '❌';
      }
    });

    // Show feedback message
    showFeedback(feedbackEl, isCorrect ? FeedbackType.CORRECT : FeedbackType.INCORRECT, {
      xp: xpEarned,
      streak: options.streak,
      isFirstAttempt: !isRetry
    });

    // Show explanation
    explanationEl.hidden = false;

    // Call callback
    onAnswer({
      exerciseId: exercise.id,
      correct: isCorrect,
      selectedIndex: selectedIdx,
      xpEarned,
      isRetry
    });
  }

  function resetExercise() {
    answered = false;
    selectedIndex = null;
    radioInputs.forEach(input => {
      input.disabled = false;
      input.checked = false;
    });
    optionLabels.forEach(l => {
      l.classList.remove('selected', 'correct', 'incorrect');
      const marker = l.querySelector('.option-feedback');
      if (marker) marker.textContent = '';
    });
    if (submitBtn) {
      submitBtn.hidden = false;
      submitBtn.disabled = true;
    }
    if (retryBtn) retryBtn.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    explanationEl.hidden = true;
  }

  // Keyboard support: 1..9 selects the option at that DISPLAY position.
  container.addEventListener('keydown', (e) => {
    if (answered) return;
    if (e.key >= '1' && e.key <= '9') {
      const idx = parseInt(e.key, 10) - 1;
      if (radioInputs[idx]) {
        radioInputs[idx].checked = true;
        radioInputs[idx].dispatchEvent(new Event('change'));
      }
    } else if (e.key === 'Enter' && submitBtn && !submitBtn.disabled) {
      submitBtn.click();
    }
  });

  return container;
}
