/**
 * Streak with Weekly Freeze
 * Pure functions for streak logic
 */

/**
 * Get Monday of the week for a given date
 * @param {Date} date
 * @returns {Date} Monday 00:00:00 of that week
 */
function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Calculate days difference between two dates (ignoring time)
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number} Days difference (date2 - date1)
 */
function diffDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

/**
 * Update streak based on last activity date
 * @param {Object} progress - Progress store object (mutated)
 * @param {Date} [today=new Date()] - Current date
 * @returns {Object} { streakChanged: boolean, freezeUsed: boolean, streakReset: boolean }
 */
export function updateStreak(progress, today = new Date()) {
  const stats = progress.stats;
  const lastActivity = stats.last_activity_date ? new Date(stats.last_activity_date) : null;
  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  const result = {
    streakChanged: false,
    freezeUsed: false,
    streakReset: false
  };

  // If already counted today, do nothing
  if (lastActivity && diffDays(lastActivity, todayDate) === 0) {
    return result;
  }

  if (!lastActivity) {
    // First activity ever
    stats.current_streak = 1;
    result.streakChanged = true;
  } else {
    const daysDiff = diffDays(lastActivity, todayDate);

    if (daysDiff === 1) {
      // Consecutive day
      stats.current_streak += 1;
      result.streakChanged = true;
    } else if (daysDiff > 1) {
      // Gap in activity - check for freeze
      const freezesAvailable = stats.freezes_remaining || 0;
      const canFreeze = freezesAvailable > 0 && daysDiff <= 2; // Allow freeze for 1 missed day

      if (canFreeze) {
        stats.freezes_remaining -= 1;
        result.freezeUsed = true;
        // Streak maintained (not incremented)
      } else {
        // Streak broken
        stats.current_streak = 1;
        result.streakReset = true;
        result.streakChanged = true;
      }
    }
  }

  // Update last activity date
  stats.last_activity_date = todayDate.toISOString();

  // Weekly freeze reset (every Monday)
  const lastFreezeReset = stats.last_freeze_reset ? new Date(stats.last_freeze_reset) : null;
  const mondayThisWeek = getMondayOfWeek(todayDate);

  if (!lastFreezeReset || lastFreezeReset < mondayThisWeek) {
    stats.freezes_remaining = 1;
    stats.last_freeze_reset = mondayThisWeek.toISOString();
  }

  return result;
}

/**
 * Get streak display info
 * @param {Object} progress
 * @returns {Object} { currentStreak, freezesRemaining, lastActivity, isActiveToday }
 */
export function getStreakInfo(progress) {
  const stats = progress.stats;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActivity = stats.last_activity_date ? new Date(stats.last_activity_date) : null;
  const isActiveToday = lastActivity && diffDays(lastActivity, today) === 0;

  return {
    currentStreak: stats.current_streak || 0,
    freezesRemaining: stats.freezes_remaining || 0,
    lastActivity: stats.last_activity_date,
    isActiveToday
  };
}

/**
 * Check if user can use freeze today
 * @param {Object} progress
 * @returns {boolean}
 */
export function canUseFreeze(progress) {
  const stats = progress.stats;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActivity = stats.last_activity_date ? new Date(stats.last_activity_date) : null;

  if (!lastActivity) return false;

  const daysDiff = diffDays(lastActivity, today);
  return daysDiff >= 2 && daysDiff <= 3 && (stats.freezes_remaining || 0) > 0;
}

/**
 * Manually use a freeze (for UI button)
 * @param {Object} progress
 * @returns {boolean} Success
 */
export function useFreeze(progress) {
  if (!canUseFreeze(progress)) return false;

  progress.stats.freezes_remaining -= 1;
  return true;
}

// Export helper for testing
export { getMondayOfWeek, diffDays };