/**
 * Lógica de Desbloqueio
 * Linear dentro da disciplina, livre entre disciplinas do mesmo semestre
 */

/**
 * Verifica se um módulo está desbloqueado
 * @param {Object} curriculum - Objeto do currículo carregado
 * @param {Object} progress - Progresso do usuário (do ProgressStore)
 * @param {string} semesterId - ID do semestre (ex: sem1)
 * @param {string} disciplineId - ID da disciplina (ex: algorithms)
 * @param {string} moduleId - ID do módulo (ex: m01)
 * @returns {boolean} True se desbloqueado
 */
export function isModuleUnlocked(curriculum, progress, semesterId, disciplineId, moduleId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem) return false;

  const disc = sem.disciplines.find(d => d.id === disciplineId);
  if (!disc) return false;

  const modIdx = disc.modules.findIndex(m => m.id === moduleId);
  if (modIdx === -1) return false;

  // Primeiro módulo sempre aberto
  if (modIdx === 0) return true;

  // Verifica se todas as lições do módulo anterior foram concluídas
  const prevModule = disc.modules[modIdx - 1];
  const completedLessons = progress.completed?.lessons || [];

  return prevModule.lessons.every(lessonId => completedLessons.includes(lessonId));
}

/**
 * Retorna disciplinas disponíveis no semestre (livres entre disciplinas)
 * @param {Object} curriculum - Objeto do currículo
 * @param {Object} progress - Progresso do usuário
 * @param {string} semesterId - ID do semestre
 * @returns {Array} Lista de disciplinas disponíveis
 */
export function getAvailableDisciplines(curriculum, progress, semesterId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem) return [];

  // MVP: todas as disciplinas do semestre atual estão disponíveis
  // Semestres futuros têm status "coming-soon"
  if (sem.status === 'coming-soon') return [];

  return sem.disciplines;
}

/**
 * Verifica se uma disciplina está disponível
 * @param {Object} curriculum - Currículo
 * @param {string} semesterId - ID do semestre
 * @param {string} disciplineId - ID da disciplina
 * @returns {boolean}
 */
export function isDisciplineAvailable(curriculum, semesterId, disciplineId) {
  const disciplines = getAvailableDisciplines(curriculum, {}, semesterId);
  return disciplines.some(d => d.id === disciplineId);
}

/**
 * Verifica se um semestre está disponível
 * @param {Object} curriculum - Currículo
 * @param {string} semesterId - ID do semestre
 * @returns {boolean}
 */
export function isSemesterAvailable(curriculum, semesterId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  return sem && sem.status !== 'coming-soon';
}

/**
 * Retorna o próximo módulo desbloqueado na disciplina
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @returns {Object|null} Próximo módulo ou null se todos concluídos
 */
export function getNextUnlockedModule(curriculum, progress, semesterId, disciplineId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem) return null;

  const disc = sem.disciplines.find(d => d.id === disciplineId);
  if (!disc) return null;

  for (const mod of disc.modules) {
    if (isModuleUnlocked(curriculum, progress, semesterId, disciplineId, mod.id)) {
      // Verifica se ainda tem lições não concluídas
      const completedLessons = progress.completed?.lessons || [];
      const hasPending = mod.lessons.some(l => !completedLessons.includes(l));
      if (hasPending) return mod;
    }
  }

  // Todos os módulos concluídos
  return null;
}

/**
 * Calcula progresso percentual de uma disciplina
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @returns {number} Percentual 0-100
 */
export function getDisciplineProgress(curriculum, progress, semesterId, disciplineId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem) return 0;

  const disc = sem.disciplines.find(d => d.id === disciplineId);
  if (!disc) return 0;

  const completedLessons = progress.completed?.lessons || [];
  let totalLessons = 0;
  let completedCount = 0;

  for (const mod of disc.modules) {
    for (const lessonId of mod.lessons) {
      totalLessons++;
      if (completedLessons.includes(lessonId)) completedCount++;
    }
  }

  return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
}

/**
 * Calcula progresso percentual de um módulo
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @param {string} moduleId - Módulo
 * @returns {number} Percentual 0-100
 */
export function getModuleProgress(curriculum, progress, semesterId, disciplineId, moduleId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem) return 0;

  const disc = sem.disciplines.find(d => d.id === disciplineId);
  if (!disc) return 0;

  const mod = disc.modules.find(m => m.id === moduleId);
  if (!mod) return 0;

  const completedLessons = progress.completed?.lessons || [];
  let completedCount = 0;

  for (const lessonId of mod.lessons) {
    if (completedLessons.includes(lessonId)) completedCount++;
  }

  return mod.lessons.length > 0 ? Math.round((completedCount / mod.lessons.length) * 100) : 0;
}

/**
 * Verifica se uma lição está concluída
 * @param {Object} progress - Progresso
 * @param {string} lessonId - ID da lição
 * @returns {boolean}
 */
export function isLessonCompleted(progress, lessonId) {
  return progress.completed?.lessons?.includes(lessonId) ?? false;
}

/**
 * Verifica se uma seção teórica foi marcada como lida
 * @param {Object} progress - Progresso
 * @param {string} theoryUnitId - ID da unidade teórica
 * @returns {boolean}
 */
export function isTheorySectionRead(progress, theoryUnitId) {
  return progress.completed?.theory_sections?.includes(theoryUnitId) ?? false;
}

/**
 * Retorna status de desbloqueio para UI (locked, available, completed)
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @param {string} moduleId - Módulo
 * @returns {'locked'|'available'|'completed'}
 */
export function getModuleUnlockStatus(curriculum, progress, semesterId, disciplineId, moduleId) {
  const modProgress = getModuleProgress(curriculum, progress, semesterId, disciplineId, moduleId);

  if (modProgress === 100) return 'completed';
  if (isModuleUnlocked(curriculum, progress, semesterId, disciplineId, moduleId)) return 'available';
  return 'locked';
}