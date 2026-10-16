/**
 * Multiple Choice Exercise Type
 * Radio options, single correct answer, explanation
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';

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

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.multipleChoice')}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <p class="exercise-prompt">${exercise.prompt}</p>
    <fieldset class="exercise-options" role="radiogroup" aria-label="${t('lesson.exerciseTypes.multipleChoice')}">
      ${exercise.options.map((option, index) => `
        <label class="option-option">
          <input type="radio" name="exercise-${exercise.id}" value="${index}" ${isRetry ? 'disabled' : ''}>
          <span class="option-content">
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
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
  let selectedIndex = null;

  // Handle radio selection
  radioInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      selectedIndex = index;
      if (submitBtn) submitBtn.disabled = false;
      // Clear previous feedback styling
      optionLabels.forEach(l => l.classList.remove('selected', 'correct', 'incorrect'));
      optionLabels[index].classList.add('selected');
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

    const isCorrect = selectedIdx === exercise.correct;
    const xpEarned = options.calculateXP ? options.calculateXP(isCorrect, isRetry) : 0;

    // Disable inputs
    radioInputs.forEach(input => input.disabled = true);
    if (submitBtn) submitBtn.hidden = true;

    // Show feedback on options
    optionLabels.forEach((label, idx) => {
      label.classList.remove('selected');
      if (idx === exercise.correct) {
        label.classList.add('correct');
        label.querySelector('.option-feedback').textContent = '✅';
      } else if (idx === selectedIdx && !isCorrect) {
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
    optionLabels.forEach(l => l.classList.remove('selected', 'correct', 'incorrect'));
    l => l.querySelector('.option-feedback').textContent = '';
    if (submitBtn) {
      submitBtn.hidden = false;
      submitBtn.disabled = true;
    }
    if (retryBtn) retryBtn.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    explanationEl.hidden = true;
  }

  // Keyboard support
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