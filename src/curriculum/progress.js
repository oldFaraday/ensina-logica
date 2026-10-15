/**
 * Curriculum Progress
 * Marca lição/módulo como completo, calcula % semestre
 */

import { getModuleProgress, getDisciplineProgress } from './unlock.js';

const LESSON_COMPLETION_KEY = 'completed_lessons';
const THEORY_SECTION_COMPLETION_KEY = 'completed_theory_sections';

/**
 * Marca uma lição como concluída
 * @param {Object} progress - Progresso do usuário (mutado)
 * @param {string} lessonId - ID da lição (ex: l01)
 * @returns {Object} Progresso atualizado
 */
export function markLessonComplete(progress, lessonId) {
  if (!progress.completed) {
    progress.completed = { lessons: [], theory_sections: [] };
  }

  if (!progress.completed.lessons.includes(lessonId)) {
    progress.completed.lessons.push(lessonId);
    progress.updated_at = new Date().toISOString();
  }

  return progress;
}

/**
 * Marca uma seção teórica como lida
 * @param {Object} progress - Progresso do usuário (mutado)
 * @param {string} theoryUnitId - ID da unidade teórica
 * @returns {Object} Progresso atualizado
 */
export function markTheorySectionRead(progress, theoryUnitId) {
  if (!progress.completed) {
    progress.completed = { lessons: [], theory_sections: [] };
  }

  if (!progress.completed.theory_sections.includes(theoryUnitId)) {
    progress.completed.theory_sections.push(theoryUnitId);
    progress.updated_at = new Date().toISOString();
  }

  return progress;
}

/**
 * Remove marcação de lição concluída (para reset/import)
 * @param {Object} progress - Progresso
 * @param {string} lessonId - ID da lição
 * @returns {Object} Progresso atualizado
 */
export function unmarkLessonComplete(progress, lessonId) {
  if (!progress.completed?.lessons) return progress;

  progress.completed.lessons = progress.completed.lessons.filter(l => l !== lessonId);
  progress.updated_at = new Date().toISOString();
  return progress;
}

/**
 * Remove marcação de seção teórica lida
 * @param {Object} progress - Progresso
 * @param {string} theoryUnitId - ID da unidade
 * @returns {Object} Progresso atualizado
 */
export function unmarkTheorySectionRead(progress, theoryUnitId) {
  if (!progress.completed?.theory_sections) return progress;

  progress.completed.theory_sections = progress.completed.theory_sections.filter(t => t !== theoryUnitId);
  progress.updated_at = new Date().toISOString();
  return progress;
}

/**
 * Verifica se módulo foi concluído (todas as lições)
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @param {string} moduleId - Módulo
 * @returns {boolean}
 */
export function isModuleComplete(curriculum, progress, semesterId, disciplineId, moduleId) {
  return getModuleProgress(curriculum, progress, semesterId, disciplineId, moduleId) === 100;
}

/**
 * Verifica se disciplina foi concluída
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @returns {boolean}
 */
export function isDisciplineComplete(curriculum, progress, semesterId, disciplineId) {
  return getDisciplineProgress(curriculum, progress, semesterId, disciplineId) === 100;
}

/**
 * Verifica se semestre foi concluído (todas as disciplinas)
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @returns {boolean}
 */
export function isSemesterComplete(curriculum, progress, semesterId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem || sem.status === 'coming-soon') return false;

  return sem.disciplines.every(disc =>
    isDisciplineComplete(curriculum, progress, semesterId, disc.id)
  );
}

/**
 * Calcula progresso geral do semestre (0-100)
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @returns {number} Percentual
 */
export function getSemesterProgress(curriculum, progress, semesterId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem || sem.status === 'coming-soon') return 0;

  let totalLessons = 0;
  let completedLessons = 0;

  for (const disc of sem.disciplines) {
    for (const mod of disc.modules) {
      for (const lessonId of mod.lessons) {
        totalLessons++;
        if (progress.completed?.lessons?.includes(lessonId)) {
          completedLessons++;
        }
      }
    }
  }

  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
}

/**
 * Retorna lições concluídas de um módulo
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @param {string} moduleId - Módulo
 * @returns {Array<string>} IDs das lições concluídas
 */
export function getCompletedLessonsInModule(curriculum, progress, semesterId, disciplineId, moduleId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem) return [];

  const disc = sem.disciplines.find(d => d.id === disciplineId);
  if (!disc) return [];

  const mod = disc.modules.find(m => m.id === moduleId);
  if (!mod) return [];

  return mod.lessons.filter(lessonId => progress.completed?.lessons?.includes(lessonId));
}

/**
 * Retorna próximo módulo com lições pendentes
 * @param {Object} curriculum - Currículo
 * @param {Object} progress - Progresso
 * @param {string} semesterId - Semestre
 * @param {string} disciplineId - Disciplina
 * @returns {Object|null} Módulo ou null
 */
export function getCurrentModule(curriculum, progress, semesterId, disciplineId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  if (!sem) return null;

  const disc = sem.disciplines.find(d => d.id === disciplineId);
  if (!disc) return null;

  for (const mod of disc.modules) {
    const modProgress = getModuleProgress(curriculum, progress, semesterId, disciplineId, mod.id);
    if (modProgress > 0 && modProgress < 100) return mod;
    if (modProgress === 0 && isModuleUnlocked(curriculum, progress, semesterId, disciplineId, mod.id)) {
      return mod;
    }
  }

  // Todos concluídos - retorna último
  return disc.modules[disc.modules.length - 1] || null;
}

/**
 * Função auxiliar: verifica desbloqueio (re-export para conveniência)
 */
export { isModuleUnlocked } from './unlock.js';