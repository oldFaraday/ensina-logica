/**
 * XP and Level Calculation
 * Pure functions for gamification logic
 */

// Base XP configuration
export const BASE_XP = 10;
export const FIRST_TIME_BONUS = 5;
export const RETRY_PENALTY = 0.5; // 50% of base XP
export const STREAK_BONUS_CAP = 10; // Max streak for bonus calculation
export const STREAK_BONUS_MULTIPLIER = 2; // 2 XP per streak day
export const XP_PER_LEVEL_BASE = 1000; // Base XP for level calculation

/**
 * Calculate XP for an exercise attempt
 * @param {Object} params
 * @param {boolean} params.isFirstAttempt - First time attempting this exercise
 * @param {boolean} params.isRetry - This is a retry attempt
 * @param {number} params.streak - Current streak days
 * @param {number} [params.baseXp=BASE_XP] - Base XP (for different exercise types)
 * @returns {number} XP earned
 */
export function calculateXP({ isFirstAttempt, isRetry, streak, baseXp = BASE_XP }) {
  let xp = baseXp;

  if (isFirstAttempt) {
    xp += FIRST_TIME_BONUS;
  }

  if (isRetry) {
    xp = Math.round(xp * RETRY_PENALTY);
  }

  // Streak bonus: min(streak, 10) * 2
  const streakBonus = Math.min(streak, STREAK_BONUS_CAP) * STREAK_BONUS_MULTIPLIER;
  xp += streakBonus;

  return xp;
}

/**
 * Calcula o XP de UM exercício de acordo com a regra "XP uma vez por exercício".
 *
 * - Resposta incorreta → 0.
 * - Primeira resposta correta (sem tentativa anterior) → base + bônus de 1ª vez + streak.
 * - Acerto após uma tentativa anterior (erro/retry) → valor reduzido (retry), sem bônus de 1ª vez.
 * - Exercício já creditado (`correct === true` ou `xp_earned > 0`) → 0: repetir não rende XP.
 *
 * @param {Object} params
 * @param {Object} params.exercise - Exercício (usa `xp_base`)
 * @param {Object|null|undefined} params.previous - Registro anterior em `progress.exercises[id]`
 * @param {boolean} params.isCorrect - Se a resposta atual está correta
 * @param {number} [params.streak=0] - Streak atual em dias
 * @returns {number} XP concedido (0 se não houver concessão)
 */
export function calculateExerciseXP({ exercise, previous, isCorrect, streak = 0 }) {
  if (!isCorrect) return 0;

  // Concede uma única vez: se o exercício já foi resolvido/creditado, repetir não rende.
  const alreadyCredited = Boolean(previous) && (previous.correct === true || (previous.xp_earned || 0) > 0);
  if (alreadyCredited) return 0;

  return calculateXP({
    isFirstAttempt: !previous,
    isRetry: Boolean(previous),
    streak,
    baseXp: exercise?.xp_base
  });
}

/**
 * Calculate level from total XP
 * Level formula: floor(sqrt(total_xp / 1000)) + 1
 * Levels: 1 (0-999), 2 (1000-3999), 3 (4000-8999), 4 (9000-15999), 5 (16000-24999)...
 * @param {number} totalXp
 * @returns {number} Level (1-based)
 */
export function levelFromXP(totalXp) {
  if (totalXp < 0) return 1;
  return Math.floor(Math.sqrt(totalXp / XP_PER_LEVEL_BASE)) + 1;
}

/**
 * Calculate XP required for a specific level
 * @param {number} level - Target level (1-based)
 * @returns {number} Total XP required to reach this level
 */
export function xpForLevel(level) {
  if (level <= 1) return 0;
  return (level - 1) ** 2 * XP_PER_LEVEL_BASE;
}

/**
 * Get XP progress info for current level
 * @param {number} totalXp
 * @returns {Object} { level, currentLevelXp, nextLevelXp, progressPercent }
 */
export function getLevelProgress(totalXp) {
  const level = levelFromXP(totalXp);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const xpInLevel = totalXp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const progressPercent = xpNeeded > 0 ? (xpInLevel / xpNeeded) * 100 : 100;

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    xpInLevel,
    xpNeeded,
    progressPercent: Math.min(100, Math.max(0, progressPercent))
  };
}

/**
 * Calculate XP needed for next level
 * @param {number} totalXp
 * @returns {number}
 */
export function xpToNextLevel(totalXp) {
  const { nextLevelXp } = getLevelProgress(totalXp);
  return nextLevelXp - totalXp;
}

// Re-export constants for convenience
export const XP_CONFIG = {
  BASE_XP,
  FIRST_TIME_BONUS,
  RETRY_PENALTY,
  STREAK_BONUS_CAP,
  STREAK_BONUS_MULTIPLIER,
  XP_PER_LEVEL_BASE
};