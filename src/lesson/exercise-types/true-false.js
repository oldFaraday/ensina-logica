/**
 * True/False Exercise Type
 * Two buttons, explanation
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';

export function renderTrueFalse(exercise, options = {}) {
  const container = document.createElement('div');
  container.className = 'exercise exercise-true-false';
  container.dataset.exerciseId = exercise.id;
  container.dataset.exerciseType = 'true-false';

  const isRetry = options.isRetry || false;
  const onAnswer = options.onAnswer || (() => {});

  const trueLabel = exercise.options?.[0] || t('lesson.exerciseTypes.trueFalseOptions.true') || 'Verdadeiro';
  const falseLabel = exercise.options?.[1] || t('lesson.exerciseTypes.trueFalseOptions.false') || 'Falso';

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.trueFalse')}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <p class="exercise-prompt">${exercise.prompt}</p>
    <div class="exercise-tf-buttons" role="group" aria-label="${t('lesson.exerciseTypes.trueFalse')}">
      <button class="btn tf-btn tf-true" data-value="0" ${isRetry ? 'disabled' : ''}>
        <span class="tf-icon" aria-hidden="true">✓</span>
        <span>${trueLabel}</span>
      </button>
      <button class="btn tf-btn tf-false" data-value="1" ${isRetry ? 'disabled' : ''}>
        <span class="tf-icon" aria-hidden="true">✗</span>
        <span>${falseLabel}</span>
      </button>
    </div>
    <div class="exercise-actions">
      ${isRetry ? `<button class="btn btn-secondary retry-btn">${t('lesson.tryAgain')}</button>` : ''}
    </div>
    <div class="exercise-feedback" aria-live="polite" hidden></div>
    <div class="exercise-explanation" hidden>
      <h4>${t('lesson.explanation')}</h4>
      <p>${exercise.explanation}</p>
    </div>
  `;

  const buttons = container.querySelectorAll('.tf-btn');
  const retryBtn = container.querySelector('.retry-btn');
  const feedbackEl = container.querySelector('.exercise-feedback');
  const explanationEl = container.querySelector('.exercise-explanation');

  let answered = isRetry;
  let selectedValue = null;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      selectedValue = parseInt(btn.dataset.value, 10);
      handleAnswer(selectedValue);
    });
  });

  if (retryBtn) {
    retryBtn.addEventListener('click', resetExercise);
  }

  function handleAnswer(selected) {
    if (answered) return;
    answered = true;

    const isCorrect = selected === exercise.correct;
    const xpEarned = options.calculateXP ? options.calculateXP(isCorrect, isRetry) : 0;

    buttons.forEach(btn => btn.disabled = true);

    buttons.forEach(btn => {
      const val = parseInt(btn.dataset.value, 10);
      btn.classList.remove('selected');
      if (val === exercise.correct) {
        btn.classList.add('correct');
      } else if (val === selected && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    showFeedback(feedbackEl, isCorrect ? FeedbackType.CORRECT : FeedbackType.INCORRECT, {
      xp: xpEarned,
      streak: options.streak,
      isFirstAttempt: !isRetry
    });

    explanationEl.hidden = false;

    onAnswer({
      exerciseId: exercise.id,
      correct: isCorrect,
      selectedIndex: selected,
      xpEarned,
      isRetry
    });
  }

  function resetExercise() {
    answered = false;
    selectedValue = null;
    buttons.forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('selected', 'correct', 'incorrect');
    });
    if (retryBtn) retryBtn.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    explanationEl.hidden = true;
  }

  // Keyboard support: T/F keys
  container.addEventListener('keydown', (e) => {
    if (answered) return;
    if (e.key.toLowerCase() === 'v' || e.key.toLowerCase() === 't' || e.key === '1') {
      buttons[0]?.click();
    } else if (e.key.toLowerCase() === 'f' || e.key === '2') {
      buttons[1]?.click();
    }
  });

  return container;
}