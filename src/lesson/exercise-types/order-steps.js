/**
 * Order Steps Exercise Type
 * Drag-and-drop or up/down buttons to reorder steps
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';

export function renderOrderSteps(exercise, options = {}) {
  const container = document.createElement('div');
  container.className = 'exercise exercise-order-steps';
  container.dataset.exerciseId = exercise.id;
  container.dataset.exerciseType = 'order-steps';

  const isRetry = options.isRetry || false;
  const onAnswer = options.onAnswer || (() => {});

  // Shuffle steps initially if not retry
  const steps = [...exercise.options];
  const correctOrder = [...exercise.correct]; // Array of indices in correct order

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.orderSteps')}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <p class="exercise-prompt">${exercise.prompt}</p>
    <ol class="steps-list" role="list" aria-label="${t('lesson.exerciseTypes.orderSteps')}">
      ${steps.map((step, displayIdx) => `
        <li class="step-item" data-original-index="${displayIdx}" draggable="true">
          <span class="step-number" aria-hidden="true">${displayIdx + 1}</span>
          <span class="step-text">${step}</span>
          <div class="step-controls">
            <button class="btn btn-ghost move-up" aria-label="${t('lesson.moveUp')}" ${displayIdx === 0 ? 'disabled' : ''}>↑</button>
            <button class="btn btn-ghost move-down" aria-label="${t('lesson.moveDown')}" ${displayIdx === steps.length - 1 ? 'disabled' : ''}>↓</button>
          </div>
        </li>
      `).join('')}
    </ol>
    <div class="exercise-actions">
      ${!isRetry ? `<button class="btn btn-primary submit-btn">${t('lesson.submit')}</button>` : ''}
      ${isRetry ? `<button class="btn btn-secondary retry-btn">${t('lesson.tryAgain')}</button>` : ''}
    </div>
    <div class="exercise-feedback" aria-live="polite" hidden></div>
    <div class="exercise-explanation" hidden>
      <h4>${t('lesson.explanation')}</h4>
      <p>${exercise.explanation}</p>
    </div>
  `;

  const list = container.querySelector('.steps-list');
  const submitBtn = container.querySelector('.submit-btn');
  const retryBtn = container.querySelector('.retry-btn');
  const feedbackEl = container.querySelector('.exercise-feedback');
  const explanationEl = container.querySelector('.exercise-explanation');

  let answered = isRetry;
  let draggedItem = null;

  // Initialize drag-and-drop
  const items = list.querySelectorAll('.step-item');
  items.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
  });

  // Move buttons
  list.querySelectorAll('.move-up').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = btn.closest('.step-item');
      const prev = item.previousElementSibling;
      if (prev) {
        list.insertBefore(item, prev);
        updateStepNumbers();
      }
    });
  });

  list.querySelectorAll('.move-down').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = btn.closest('.step-item');
      const next = item.nextElementSibling;
      if (next) {
        list.insertBefore(next, item);
        updateStepNumbers();
      }
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmit);
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', resetExercise);
  }

  function handleDragStart(e) {
    if (answered) { e.preventDefault(); return; }
    draggedItem = e.target.closest('.step-item');
    draggedItem.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnd(e) {
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
      draggedItem = null;
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.target.closest('.step-item');
    if (target && target !== draggedItem) {
      const rect = target.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        target.classList.add('drop-above');
        target.classList.remove('drop-below');
      } else {
        target.classList.add('drop-below');
        target.classList.remove('drop-above');
      }
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    if (!draggedItem) return;
    const target = e.target.closest('.step-item');
    if (!target || target === draggedItem) return;

    target.classList.remove('drop-above', 'drop-below');
    const rect = target.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;

    if (e.clientY < midY) {
      list.insertBefore(draggedItem, target);
    } else {
      list.insertBefore(draggedItem, target.nextElementSibling);
    }
    updateStepNumbers();
  }

  function updateStepNumbers() {
    list.querySelectorAll('.step-item').forEach((item, idx) => {
      item.querySelector('.step-number').textContent = idx + 1;
      const upBtn = item.querySelector('.move-up');
      const downBtn = item.querySelector('.move-down');
      upBtn.disabled = idx === 0;
      downBtn.disabled = idx === list.children.length - 1;
    });
  }

  function getCurrentOrder() {
    return Array.from(list.querySelectorAll('.step-item')).map(item =>
      parseInt(item.dataset.originalIndex, 10)
    );
  }

  function checkOrder(userOrder) {
    // correctOrder is array of indices representing correct sequence
    // userOrder is array of original indices in user's sequence
    // We need to check if userOrder matches correctOrder
    if (userOrder.length !== correctOrder.length) return false;
    return userOrder.every((val, idx) => val === correctOrder[idx]);
  }

  function handleSubmit() {
    if (answered) return;
    answered = true;

    const userOrder = getCurrentOrder();
    const isCorrect = checkOrder(userOrder);
    const xpEarned = options.calculateXP ? options.calculateXP(isCorrect, isRetry) : 0;

    items.forEach(item => item.draggable = false);
    list.querySelectorAll('.move-up, .move-down').forEach(btn => btn.disabled = true);
    if (submitBtn) submitBtn.hidden = true;

    // Highlight correct/incorrect positions
    items.forEach((item, idx) => {
      const originalIdx = parseInt(item.dataset.originalIndex, 10);
      const correctIdx = correctOrder[idx];
      if (originalIdx === correctIdx) {
        item.classList.add('correct-position');
      } else {
        item.classList.add('incorrect-position');
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
      selectedIndex: userOrder,
      xpEarned,
      isRetry
    });
  }

  function resetExercise() {
    answered = false;
    // Restore original order
    const itemsArray = Array.from(items);
    itemsArray.sort((a, b) =>
      parseInt(a.dataset.originalIndex, 10) - parseInt(b.dataset.originalIndex, 10)
    );
    itemsArray.forEach(item => list.appendChild(item));
    updateStepNumbers();

    items.forEach(item => {
      item.draggable = true;
      item.classList.remove('correct-position', 'incorrect-position');
    });
    list.querySelectorAll('.move-up, .move-down').forEach(btn => btn.disabled = false);
    if (submitBtn) submitBtn.hidden = false;
    if (retryBtn) retryBtn.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    explanationEl.hidden = true;
  }

  return container;
}