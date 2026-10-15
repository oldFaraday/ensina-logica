/**
 * Achievements / Badges System
 * Pure functions for achievement logic
 */

export const ACHIEVEMENTS = {
  'first-lesson': {
    id: 'first-lesson',
    name: 'Primeira Lição',
    description: 'Complete sua primeira lição',
    icon: '🎓',
    category: 'progress'
  },
  'streak-3': {
    id: 'streak-3',
    name: 'Em Chamas',
    description: 'Mantenha um streak de 3 dias',
    icon: '🔥',
    category: 'streak'
  },
  'streak-7': {
    id: 'streak-7',
    name: 'Semana Perfeita',
    description: 'Mantenha um streak de 7 dias',
    icon: '🔥',
    category: 'streak'
  },
  'streak-30': {
    id: 'streak-30',
    name: 'Mestre da Consistência',
    description: 'Mantenha um streak de 30 dias',
    icon: '🏆',
    category: 'streak'
  },
  'module-1': {
    id: 'module-1',
    name: 'Módulo 1 Concluído',
    description: 'Conclua todas as lições do primeiro módulo',
    icon: '📦',
    category: 'progress'
  },
  'module-all-sem1': {
    id: 'module-all-sem1',
    name: 'Semestre 1 Completo',
    description: 'Conclua todos os módulos do 1º semestre',
    icon: '🎓',
    category: 'progress'
  },
  'exercises-10': {
    id: 'exercises-10',
    name: 'Dez Pontos',
    description: 'Responda 10 exercícios corretamente',
    icon: '✅',
    category: 'exercises'
  },
  'exercises-50': {
    id: 'exercises-50',
    name: 'Cinquentão',
    description: 'Responda 50 exercícios corretamente',
    icon: '✅',
    category: 'exercises'
  },
  'exercises-100': {
    id: 'exercises-100',
    name: 'Centena',
    description: 'Responda 100 exercícios corretamente',
    icon: '💯',
    category: 'exercises'
  },
  'exercises-500': {
    id: 'exercises-500',
    name: 'Quinhentos',
    description: 'Responda 500 exercícios corretamente',
    icon: '💯',
    category: 'exercises'
  },
  'first-note': {
    id: 'first-note',
    name: 'Anotador',
    description: 'Faça sua primeira anotação na biblioteca',
    icon: '📝',
    category: 'library'
  },
  'notes-10': {
    id: 'notes-10',
    name: 'Estudioso',
    description: 'Faça 10 anotações na biblioteca',
    icon: '📚',
    category: 'library'
  },
  'exported-progress': {
    id: 'exported-progress',
    name: 'Backup Feito',
    description: 'Exporte seu progresso pela primeira vez',
    icon: '💾',
    category: 'meta'
  },
  'level-5': {
    id: 'level-5',
    name: 'Nível 5',
    description: 'Alcance o nível 5',
    icon: '⭐',
    category: 'level'
  },
  'level-10': {
    id: 'level-10',
    name: 'Nível 10',
    description: 'Alcance o nível 10',
    icon: '⭐',
    category: 'level'
  },
  'level-25': {
    id: 'level-25',
    name: 'Mestre',
    description: 'Alcance o nível 25',
    icon: '👑',
    category: 'level'
  },
  'perfect-lesson': {
    id: 'perfect-lesson',
    name: 'Perfeccionista',
    description: 'Complete uma lição sem errar nenhum exercício',
    icon: '💎',
    category: 'exercises'
  },
  'night-owl': {
    id: 'night-owl',
    name: 'Coruja',
    description: 'Estude depois das 22h',
    icon: '🦉',
    category: 'meta'
  },
  'early-bird': {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Estude antes das 6h',
    icon: '🌅',
    category: 'meta'
  },
  'weekend-warrior': {
    id: 'weekend-warrior',
    name: 'Guerreiro de Fim de Semana',
    description: 'Complete lições em 5 fins de semana',
    icon: '⚔️',
    category: 'streak'
  }
};

/**
 * Check and unlock achievements based on current progress
 * @param {Object} progress - Progress store object
 * @param {Object} context - Additional context (e.g., { lessonCompleted: true, hour: 23 })
 * @returns {Array<string>} Array of newly unlocked achievement IDs
 */
export function checkAchievements(progress, context = {}) {
  const unlocked = progress.achievements || [];
  const newlyUnlocked = [];
  const stats = progress.stats;
  const exercises = progress.exercises || {};
  const completedLessons = progress.completed?.lessons || [];
  const annotations = progress.annotations || {};

  // Count correct exercises
  const correctExercises = Object.values(exercises).filter(e => e.correct).length;

  // Count total annotations
  let totalAnnotations = 0;
  for (const unitAnnotations of Object.values(annotations)) {
    totalAnnotations += Object.values(unitAnnotations).filter(a => a && a.trim()).length;
  }

  // Check each achievement
  for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
    if (unlocked.includes(id)) continue; // Already unlocked

    let shouldUnlock = false;

    switch (id) {
      case 'first-lesson':
        shouldUnlock = completedLessons.length >= 1;
        break;

      case 'streak-3':
        shouldUnlock = (stats.current_streak || 0) >= 3;
        break;

      case 'streak-7':
        shouldUnlock = (stats.current_streak || 0) >= 7;
        break;

      case 'streak-30':
        shouldUnlock = (stats.current_streak || 0) >= 30;
        break;

      case 'module-1':
        // Check if all lessons in first module of any discipline are completed
        shouldUnlock = checkModuleComplete(progress, 'sem1', 'algorithms', 'm01') ||
                       checkModuleComplete(progress, 'sem1', 'discrete-math', 'm01');
        break;

      case 'module-all-sem1':
        shouldUnlock = checkAllModulesComplete(progress, 'sem1');
        break;

      case 'exercises-10':
        shouldUnlock = correctExercises >= 10;
        break;

      case 'exercises-50':
        shouldUnlock = correctExercises >= 50;
        break;

      case 'exercises-100':
        shouldUnlock = correctExercises >= 100;
        break;

      case 'exercises-500':
        shouldUnlock = correctExercises >= 500;
        break;

      case 'first-note':
        shouldUnlock = totalAnnotations >= 1;
        break;

      case 'notes-10':
        shouldUnlock = totalAnnotations >= 10;
        break;

      case 'exported-progress':
        shouldUnlock = context.exported === true;
        break;

      case 'level-5':
        shouldUnlock = (stats.level || 1) >= 5;
        break;

      case 'level-10':
        shouldUnlock = (stats.level || 1) >= 10;
        break;

      case 'level-25':
        shouldUnlock = (stats.level || 1) >= 25;
        break;

      case 'perfect-lesson':
        shouldUnlock = context.perfectLesson === true;
        break;

      case 'night-owl':
        shouldUnlock = context.hour !== undefined && context.hour >= 22;
        break;

      case 'early-bird':
        shouldUnlock = context.hour !== undefined && context.hour < 6;
        break;

      case 'weekend-warrior':
        shouldUnlock = checkWeekendWarrior(progress);
        break;
    }

    if (shouldUnlock) {
      newlyUnlocked.push(id);
    }
  }

  return newlyUnlocked;
}

/**
 * Check if all lessons in a module are completed
 * @param {Object} progress
 * @param {string} semesterId
 * @param {string} disciplineId
 * @param {string} moduleId
 * @returns {boolean}
 */
function checkModuleComplete(progress, semesterId, disciplineId, moduleId) {
  // This would need curriculum data to know which lessons belong to the module
  // For now, return false - will be implemented when curriculum is loaded
  return false;
}

/**
 * Check if all modules in a semester are completed
 * @param {Object} progress
 * @param {string} semesterId
 * @returns {boolean}
 */
function checkAllModulesComplete(progress, semesterId) {
  // Requires curriculum data
  return false;
}

/**
 * Check weekend warrior achievement
 * @param {Object} progress
 * @returns {boolean}
 */
function checkWeekendWarrior(progress) {
  // Would need to track weekend activity dates
  return false;
}

/**
 * Get achievement info by ID
 * @param {string} id
 * @returns {Object|null}
 */
export function getAchievement(id) {
  return ACHIEVEMENTS[id] || null;
}

/**
 * Get all achievements with unlock status
 * @param {Object} progress
 * @returns {Array<Object>}
 */
export function getAllAchievements(progress) {
  const unlocked = progress.achievements || [];
  return Object.values(ACHIEVEMENTS).map(a => ({
    ...a,
    unlocked: unlocked.includes(a.id)
  }));
}

/**
 * Get achievements by category
 * @param {Object} progress
 * @param {string} category
 * @returns {Array<Object>}
 */
export function getAchievementsByCategory(progress, category) {
  return getAllAchievements(progress).filter(a => a.category === category);
}