/**
 * Progress Store - Abstraction over localStorage for user progress
 * Designed to be swappable with IndexedDB in the future
 */

import { migrateProgress, createDefaultProgress, validateProgress, CURRENT_SCHEMA_VERSION } from './schema-version.js';

const STORAGE_KEY = 'ensina-logica-progress';
const LISTENERS = new Set();

class ProgressStore {
  constructor() {
    this._cache = null;
    this._initialized = false;
  }

  /**
   * Initialize the store (load from localStorage)
   * @returns {Promise<Object>} Current progress
   */
  async init() {
    if (this._initialized) return this._cache;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this._cache = migrateProgress(parsed);
      } else {
        this._cache = createDefaultProgress();
      }
    } catch (error) {
      console.error('[ProgressStore] Init error:', error);
      this._cache = createDefaultProgress();
    }

    this._initialized = true;
    return this._cache;
  }

  /**
   * Get current progress (from cache)
   * @returns {Object} Current progress
   */
  get() {
    if (!this._initialized) {
      console.warn('[ProgressStore] Access before init()');
    }
    return this._cache;
  }

  /**
   * Get a specific path from progress using dot notation
   * @param {string} path - Dot notation path (e.g., 'stats.total_xp')
   * @returns {any}
   */
  getPath(path) {
    const keys = path.split('.');
    let value = this._cache;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    return value;
  }

  /**
   * Set a specific path in progress using dot notation
   * @param {string} path - Dot notation path
   * @param {any} value - Value to set
   * @returns {boolean} Success
   */
  setPath(path, value) {
    if (!this._initialized) return false;

    const keys = path.split('.');
    let target = this._cache;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in target) || typeof target[key] !== 'object') {
        target[key] = {};
      }
      target = target[key];
    }

    target[keys[keys.length - 1]] = value;
    this._cache.updated_at = new Date().toISOString();
    this._saveAndNotify();
    return true;
  }

  /**
   * Update progress with partial object (deep merge)
   * @param {Object} updates - Partial progress object
   * @returns {Object} Updated progress
   */
  update(updates) {
    if (!this._initialized) return this._cache;

    this._cache = this._deepMerge(this._cache, updates);
    this._cache.updated_at = new Date().toISOString();
    this._cache.schema_version = CURRENT_SCHEMA_VERSION;
    this._saveAndNotify();
    return this._cache;
  }

  /**
   * Save progress to localStorage
   * @private
   */
  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cache));
      return true;
    } catch (error) {
      console.error('[ProgressStore] Save error:', error);
      // Try to free space by removing old SRS entries
      if (this._cache.srs_queue.length > 100) {
        this._cache.srs_queue = this._cache.srs_queue.slice(-50);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cache));
          return true;
        } catch (e) {
          console.error('[ProgressStore] Save failed after cleanup:', e);
        }
      }
      return false;
    }
  }

  /**
   * Save and notify listeners
   * @private
   */
  _saveAndNotify() {
    if (this._save()) {
      this._notify();
    }
  }

  /**
   * Deep merge two objects
   * @private
   */
  _deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        target[key] &&
        typeof target[key] === 'object' &&
        !Array.isArray(target[key])
      ) {
        result[key] = this._deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  /**
   * Subscribe to progress changes
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    LISTENERS.add(listener);
    return () => LISTENERS.delete(listener);
  }

  /**
   * Notify all listeners
   * @private
   */
  _notify() {
    for (const listener of LISTENERS) {
      try {
        listener(this._cache);
      } catch (error) {
        console.error('[ProgressStore] Listener error:', error);
      }
    }
  }

  /**
   * Export progress as JSON string
   * @returns {string} JSON string
   */
  export() {
    return JSON.stringify(this._cache, null, 2);
  }

  /**
   * Import progress from JSON string
   * @param {string} jsonString - JSON string to import
   * @returns {boolean} Success
   */
  import(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      if (!validateProgress(imported)) {
        throw new Error('Invalid progress structure');
      }
      this._cache = migrateProgress(imported);
      this._saveAndNotify();
      return true;
    } catch (error) {
      console.error('[ProgressStore] Import error:', error);
      return false;
    }
  }

  /**
   * Reset progress to defaults (keep preferences)
   * @returns {Object} New progress
   */
  reset() {
    const preferences = this._cache?.preferences || { daily_xp_goal: 20, theme: 'auto' };
    this._cache = createDefaultProgress();
    this._cache.preferences = preferences;
    this._saveAndNotify();
    return this._cache;
  }

  /**
   * Clear all data (including preferences)
   */
  clear() {
    this._cache = createDefaultProgress();
    this._saveAndNotify();
  }

  /**
   * Check if store is initialized
   * @returns {boolean}
   */
  isInitialized() {
    return this._initialized;
  }
}

// Export singleton instance
export const progressStore = new ProgressStore();

// Export class for testing
export { ProgressStore };