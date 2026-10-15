/**
 * Spaced Repetition System (Simplified)
 * Pure functions for SRS logic
 */

export const SRS_INTERVALS = [1, 3, 7, 21]; // Days

/**
 * Schedule a review for a lesson
 * @param {Object} progress - Progress store object (mutated)
 * @param {string} lessonId - Lesson ID
 * @param {Date} [today=new Date()] - Current date
 * @returns {Object} Updated queue entry
 */
export function scheduleReview(progress, lessonId, today = new Date()) {
  const queue = progress.srs_queue || [];
  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  const existingIndex = queue.findIndex(q => q.lesson_id === lessonId);

  let intervalIndex = 0;
  if (existingIndex >= 0) {
    intervalIndex = Math.min((queue[existingIndex].interval_index || 0) + 1, SRS_INTERVALS.length - 1);
  }

  const dueDate = new Date(todayDate);
  dueDate.setDate(dueDate.getDate() + SRS_INTERVALS[intervalIndex]);

  const entry = {
    lesson_id: lessonId,
    due_date: dueDate.toISOString(),
    interval_index: intervalIndex,
    scheduled_at: todayDate.toISOString()
  };

  if (existingIndex >= 0) {
    queue[existingIndex] = entry;
  } else {
    queue.push(entry);
  }

  progress.srs_queue = queue;
  return entry;
}

/**
 * Get reviews due today or earlier
 * @param {Object} progress
 * @param {Date} [today=new Date()]
 * @returns {Array<Object>} Due review entries
 */
export function getDueReviews(progress, today = new Date()) {
  const queue = progress.srs_queue || [];
  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  return queue.filter(q => {
    const dueDate = new Date(q.due_date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate <= todayDate;
  });
}

/**
 * Get next upcoming review
 * @param {Object} progress
 * @param {Date} [today=new Date()]
 * @returns {Object|null}
 */
export function getNextReview(progress, today = new Date()) {
  const queue = progress.srs_queue || [];
  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  const future = queue
    .filter(q => {
      const dueDate = new Date(q.due_date);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate > todayDate;
    })
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  return future[0] || null;
}

/**
 * Get SRS stats
 * @param {Object} progress
 * @returns {Object} { dueToday, upcoming, totalScheduled }
 */
export function getSRSStats(progress) {
  const queue = progress.srs_queue || [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let dueToday = 0;
  let upcoming = 0;

  for (const entry of queue) {
    const dueDate = new Date(entry.due_date);
    dueDate.setHours(0, 0, 0, 0);
    if (dueDate <= today) {
      dueToday++;
    } else {
      upcoming++;
    }
  }

  return {
    dueToday,
    upcoming,
    totalScheduled: queue.length
  };
}

/**
 * Remove a lesson from SRS queue (e.g., when lesson is deleted or user opts out)
 * @param {Object} progress
 * @param {string} lessonId
 * @returns {boolean} Removed
 */
export function removeFromSRS(progress, lessonId) {
  const queue = progress.srs_queue || [];
  const index = queue.findIndex(q => q.lesson_id === lessonId);
  if (index >= 0) {
    queue.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Reset SRS for a lesson (back to first interval)
 * @param {Object} progress
 * @param {string} lessonId
 * @param {Date} [today=new Date()]
 * @returns {Object|null} New entry or null if not in queue
 */
export function resetSRS(progress, lessonId, today = new Date()) {
  const queue = progress.srs_queue || [];
  const index = queue.findIndex(q => q.lesson_id === lessonId);
  if (index >= 0) {
    const todayDate = new Date(today);
    todayDate.setHours(0, 0, 0, 0);

    const dueDate = new Date(todayDate);
    dueDate.setDate(dueDate.getDate() + SRS_INTERVALS[0]);

    queue[index] = {
      lesson_id: lessonId,
      due_date: dueDate.toISOString(),
      interval_index: 0,
      scheduled_at: todayDate.toISOString()
    };

    return queue[index];
  }
  return null;
}

/**
 * Get interval label for display
 * @param {number} intervalIndex
 * @returns {string}
 */
export function getIntervalLabel(intervalIndex) {
  const days = SRS_INTERVALS[intervalIndex] || SRS_INTERVALS[SRS_INTERVALS.length - 1];
  if (days === 1) return '1 dia';
  return `${days} dias`;
}

/**
 * Process a review result (correct/incorrect)
 * @param {Object} progress
 * @param {string} lessonId
 * @param {boolean} correct
 * @param {Date} [today=new Date()]
 * @returns {Object} Updated entry
 */
export function processReview(progress, lessonId, correct, today = new Date()) {
  const queue = progress.srs_queue || [];
  const index = queue.findIndex(q => q.lesson_id === lessonId);

  if (index < 0) {
    // Not in queue, schedule first review
    return scheduleReview(progress, lessonId, today);
  }

  const entry = queue[index];
  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  let newIntervalIndex;
  if (correct) {
    // Correct: advance to next interval (capped at max)
    newIntervalIndex = Math.min((entry.interval_index || 0) + 1, SRS_INTERVALS.length - 1);
  } else {
    // Incorrect: reset to first interval
    newIntervalIndex = 0;
  }

  const dueDate = new Date(todayDate);
  dueDate.setDate(dueDate.getDate() + SRS_INTERVALS[newIntervalIndex]);

  queue[index] = {
    ...entry,
    due_date: dueDate.toISOString(),
    interval_index: newIntervalIndex,
    last_reviewed: todayDate.toISOString(),
    last_result: correct ? 'correct' : 'incorrect'
  };

  return queue[index];
}