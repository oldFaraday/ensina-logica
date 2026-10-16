/**
 * Progress Store Schema Version Migrations
 * Handles migration of progress data between schema versions
 */

export const CURRENT_SCHEMA_VERSION = 2;

/**
 * Migration functions by version
 * Each function receives the progress object and mutates it
 */
const migrations = {
  // Version 1 is the base version, no migration needed
  1: (progress) => progress,
  // Version 2 adds preferences.onboarding_completed (default false)
  2: (progress) => {
    progress.preferences = progress.preferences || {};
    if (progress.preferences.onboarding_completed === undefined) {
      progress.preferences.onboarding_completed = false;
    }
    return progress;
  },
};

/**
 * Migrate progress data to current schema version
 * @param {Object} progress - Progress object from localStorage
 * @returns {Object} Migrated progress object
 */
export function migrateProgress(progress) {
  if (!progress || typeof progress !== 'object') {
    return createDefaultProgress();
  }

  const version = progress.schema_version || 0;

  if (version === CURRENT_SCHEMA_VERSION) {
    // Defensive: garante a flag mesmo em dados já na versão atual
    progress.preferences = progress.preferences || {};
    if (progress.preferences.onboarding_completed === undefined) {
      progress.preferences.onboarding_completed = false;
    }
    return progress;
  }

  // Base: legado (v0, sem schema_version) -> v1
  let migrated = version === 0 ? migrateToV1(progress) : { ...progress };
  const fromVersion = version === 0 ? 1 : version;

  // Apply migrations sequentially up to the current version
  for (let v = fromVersion + 1; v <= CURRENT_SCHEMA_VERSION; v++) {
    if (migrations[v]) {
      migrated = migrations[v](migrated);
    }
  }

  migrated.schema_version = CURRENT_SCHEMA_VERSION;
  migrated.updated_at = new Date().toISOString();

  return migrated;
}

/**
 * Migrate from legacy (no schema_version) to v1
 * @param {Object} progress
 * @returns {Object}
 */
function migrateToV1(progress) {
  const migrated = {
    schema_version: 1,
    updated_at: new Date().toISOString(),
    preferences: {
      daily_xp_goal: progress.preferences?.daily_xp_goal || 300,
      theme: progress.preferences?.theme || 'auto',
      onboarding_completed: progress.preferences?.onboarding_completed ?? false
    },
    stats: {
      total_xp: progress.stats?.total_xp || 0,
      level: progress.stats?.level || 1,
      current_streak: progress.stats?.current_streak || 0,
      freezes_remaining: progress.stats?.freezes_remaining || 1,
      last_activity_date: progress.stats?.last_activity_date || null,
      last_freeze_reset: progress.stats?.last_freeze_reset || null
    },
    completed: {
      lessons: progress.completed?.lessons || [],
      theory_sections: progress.completed?.theory_sections || []
    },
    exercises: progress.exercises || {},
    srs_queue: progress.srs_queue || [],
    achievements: progress.achievements || [],
    annotations: progress.annotations || {}
  };

  return migrated;
}

/**
 * Create default progress structure
 * @returns {Object}
 */
export function createDefaultProgress() {
  return {
    schema_version: CURRENT_SCHEMA_VERSION,
    updated_at: new Date().toISOString(),
    preferences: {
      daily_xp_goal: 300,
      theme: 'auto',
      onboarding_completed: false
    },
    stats: {
      total_xp: 0,
      level: 1,
      current_streak: 0,
      freezes_remaining: 1,
      last_activity_date: null,
      last_freeze_reset: null
    },
    completed: {
      lessons: [],
      theory_sections: []
    },
    exercises: {},
    srs_queue: [],
    achievements: [],
    annotations: {}
  };
}

/**
 * Validate progress structure
 * @param {Object} progress
 * @returns {boolean}
 */
export function validateProgress(progress) {
  if (!progress || typeof progress !== 'object') return false;
  if (typeof progress.schema_version !== 'number') return false;
  if (!progress.preferences || typeof progress.preferences !== 'object') return false;
  if (!progress.stats || typeof progress.stats !== 'object') return false;
  if (!progress.completed || typeof progress.completed !== 'object') return false;
  if (!progress.exercises || typeof progress.exercises !== 'object') return false;
  if (!Array.isArray(progress.srs_queue)) return false;
  if (!Array.isArray(progress.achievements)) return false;
  if (!progress.annotations || typeof progress.annotations !== 'object') return false;
  return true;
}