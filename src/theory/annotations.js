/**
 * Anotações por seção de teoria (CRUD simples, persistido no progresso).
 * Estrutura: progress.annotations[theoryUnitId][sectionId] = "texto"
 */

/**
 * Retorna a anotação de uma seção (ou string vazia).
 * @param {Object} progress
 * @param {string} theoryUnitId
 * @param {string} sectionId
 * @returns {string}
 */
export function getAnnotation(progress, theoryUnitId, sectionId) {
  return progress?.annotations?.[theoryUnitId]?.[sectionId] || '';
}

/**
 * Salva (ou remove, se vazio) a anotação de uma seção. Muta o progresso.
 * @param {Object} progress
 * @param {string} theoryUnitId
 * @param {string} sectionId
 * @param {string} text
 * @returns {Object} progress
 */
export function saveAnnotation(progress, theoryUnitId, sectionId, text) {
  if (!progress.annotations) progress.annotations = {};
  if (!progress.annotations[theoryUnitId]) progress.annotations[theoryUnitId] = {};

  const trimmed = String(text || '').trim();
  if (trimmed === '') {
    delete progress.annotations[theoryUnitId][sectionId];
  } else {
    progress.annotations[theoryUnitId][sectionId] = trimmed;
  }

  progress.updated_at = new Date().toISOString();
  return progress;
}

/**
 * Remove a anotação de uma seção. Muta o progresso.
 * @param {Object} progress
 * @param {string} theoryUnitId
 * @param {string} sectionId
 * @returns {Object} progress
 */
export function deleteAnnotation(progress, theoryUnitId, sectionId) {
  if (progress?.annotations?.[theoryUnitId]) {
    delete progress.annotations[theoryUnitId][sectionId];
    progress.updated_at = new Date().toISOString();
  }
  return progress;
}
