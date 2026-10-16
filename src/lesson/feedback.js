/**
 * Feedback System for Exercises
 * Shows feedback with icon + text + color (never color-only), ARIA live
 */

import { t } from '../i18n.js';

export const FeedbackType = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  PARTIAL: 'partial',
  INFO: 'info'
};

/**
 * Show feedback in a container element
 * @param {HTMLElement} container - Container element to show feedback in
 * @param {FeedbackType} type - Type of feedback
 * @param {Object} options - Feedback options
 * @param {number} options.xp - XP earned
 * @param {number} options.streak - Current streak
 * @param {boolean} options.isFirstAttempt - Whether this is the first attempt
 */
export function showFeedback(container, type, options = {}) {
  const { xp = 0, streak = 0, isFirstAttempt = true } = options;

  let icon, label, className;

  switch (type) {
    case FeedbackType.CORRECT:
      icon = '✅';
      label = t('lesson.feedback.correct');
      className = 'feedback-correct';
      break;
    case FeedbackType.INCORRECT:
      icon = '❌';
      label = t('lesson.feedback.incorrect');
      className = 'feedback-incorrect';
      break;
    case FeedbackType.PARTIAL:
      icon = '⚠️';
      label = t('lesson.feedback.partial');
      className = 'feedback-partial';
      break;
    default:
      icon = 'ℹ️';
      label = t('lesson.feedback.info');
      className = 'feedback-info';
  }

  let xpText = '';
  if (type === FeedbackType.CORRECT && xp > 0) {
    let bonusText = '';
    if (isFirstAttempt) {
      bonusText += t('lesson.feedback.first_try_bonus');
    }
    if (streak > 1) {
      bonusText += ` ${t('lesson.feedback.streak_bonus', { streak })}`;
    }
    xpText = `<span class="feedback-xp">+${xp} XP${bonusText}</span>`;
  }

  container.hidden = false;
  container.className = `exercise-feedback ${className}`;
  container.innerHTML = `
    <span class="feedback-icon" aria-hidden="true">${icon}</span>
    <span class="feedback-text">${label}</span>
    ${xpText}
  `;

  // Auto-hide after 3 seconds for correct answers
  if (type === FeedbackType.CORRECT) {
    setTimeout(() => {
      container.hidden = true;
    }, 3000);
  }
}

/**
 * Clear feedback from container
 * @param {HTMLElement} container
 */
export function clearFeedback(container) {
  container.hidden = true;
  container.innerHTML = '';
  container.className = 'exercise-feedback';
}