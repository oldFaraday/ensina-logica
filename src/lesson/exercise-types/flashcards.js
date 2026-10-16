/**
 * Flashcards Exercise Type
 * Flip card (frente/verso), marcar "conheço"/"não conheço".
 * O "conhecido" conta como acerto (XP reduzido tratado pelo chamador).
 *
 * Convenção de dados:
 *  - `prompt`         → frente do cartão (pergunta/conceito)
 *  - `starter_code`   → verso do cartão (resposta/definição)
 *  - `explanation`    → contexto adicional opcional
 *  - `correct`        → string espelho do verso (exigido pelo schema)
 */

import { t } from '../../i18n.js';
import { showFeedback, FeedbackType } from '../feedback.js';

export function renderFlashcards(exercise, options = {}) {
  const container = document.createElement('div');
  container.className = 'exercise exercise-flashcards';
  container.dataset.exerciseId = exercise.id;
  container.dataset.exerciseType = 'flashcards';

  const isRetry = options.isRetry || false;
  const onAnswer = options.onAnswer || (() => {});

  const back = exercise.starter_code || exercise.correct || '';

  container.innerHTML = `
    <div class="exercise-header">
      <span class="exercise-type-badge">${t('lesson.exerciseTypes.flashcards')}</span>
      ${exercise.difficulty ? `<span class="difficulty-badge difficulty-${exercise.difficulty}">${t(`common.difficulty.${exercise.difficulty}`, { defaultValue: exercise.difficulty })}</span>` : ''}
    </div>
    <div class="flashcard" data-flipped="false">
      <div class="flashcard-front">
        <p class="flashcard-label">${t('lesson.flashcards.front')}</p>
        <p class="flashcard-prompt">${exercise.prompt}</p>
        <button class="btn btn-primary flip-btn">${t('lesson.flashcards.showAnswer')}</button>
      </div>
      <div class="flashcard-back" hidden>
        <p class="flashcard-label">${t('lesson.flashcards.back')}</p>
        <p class="flashcard-answer">${back}</p>
        <div class="flashcard-actions">
          <button class="btn btn-primary known-btn">${t('lesson.flashcards.known')}</button>
          <button class="btn btn-secondary unknown-btn">${t('lesson.flashcards.unknown')}</button>
        </div>
      </div>
    </div>
    <div class="exercise-feedback" aria-live="polite" hidden></div>
    <div class="exercise-explanation" hidden>
      <h4>${t('lesson.explanation')}</h4>
      <p>${exercise.explanation}</p>
    </div>
    <div class="exercise-actions">
      ${isRetry ? `<button class="btn btn-secondary retry-btn">${t('lesson.tryAgain')}</button>` : ''}
    </div>
  `;

  const card = container.querySelector('.flashcard');
  const front = container.querySelector('.flashcard-front');
  const backEl = container.querySelector('.flashcard-back');
  const flipBtn = container.querySelector('.flip-btn');
  const knownBtn = container.querySelector('.known-btn');
  const unknownBtn = container.querySelector('.unknown-btn');
  const retryBtn = container.querySelector('.retry-btn');
  const feedbackEl = container.querySelector('.exercise-feedback');
  const explanationEl = container.querySelector('.exercise-explanation');

  let answered = isRetry;

  flipBtn.addEventListener('click', () => {
    card.dataset.flipped = 'true';
    front.hidden = true;
    backEl.hidden = false;
    knownBtn.focus();
  });

  knownBtn.addEventListener('click', () => handleAnswer(true));
  unknownBtn.addEventListener('click', () => handleAnswer(false));
  if (retryBtn) retryBtn.addEventListener('click', resetExercise);

  function handleAnswer(known) {
    if (answered) return;
    answered = true;

    // Flashcard "conhecido" conta como acerto.
    const isCorrect = known;
    const xpEarned = options.calculateXP ? options.calculateXP(isCorrect, isRetry) : 0;

    knownBtn.disabled = true;
    unknownBtn.disabled = true;

    if (known) {
      knownBtn.classList.add('correct');
      showFeedback(feedbackEl, FeedbackType.CORRECT, {
        xp: xpEarned,
        streak: options.streak,
        isFirstAttempt: !isRetry
      });
    } else {
      unknownBtn.classList.add('incorrect');
      showFeedback(feedbackEl, FeedbackType.INCORRECT, {
        xp: 0,
        streak: options.streak,
        isFirstAttempt: !isRetry
      });
    }

    explanationEl.hidden = false;

    onAnswer({
      exerciseId: exercise.id,
      correct: isCorrect,
      xpEarned,
      isRetry
    });
  }

  function resetExercise() {
    answered = false;
    card.dataset.flipped = 'false';
    front.hidden = false;
    backEl.hidden = true;
    knownBtn.disabled = false;
    unknownBtn.disabled = false;
    knownBtn.classList.remove('correct');
    unknownBtn.classList.remove('incorrect');
    if (retryBtn) retryBtn.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    explanationEl.hidden = true;
  }

  // Atalhos de teclado: Espaço/Enter abre o cartão.
  container.addEventListener('keydown', (e) => {
    if (card.dataset.flipped === 'false' && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      flipBtn.click();
    }
  });

  return container;
}
