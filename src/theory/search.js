/**
 * Busca full-text em memória sobre o índice de unidades teóricas.
 * Case- e acento-insensível, com trecho (snippet) ao redor do match.
 */

/**
 * Normaliza texto para busca (minúsculas, sem acentos).
 * @param {string} value
 * @returns {string}
 */
export function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Extrai um trecho do conteúdo ao redor da primeira ocorrência do termo.
 * @param {string} content
 * @param {string} query
 * @param {number} [radius=80]
 * @returns {string}
 */
export function extractSnippet(content, query, radius = 80) {
  const text = String(content || '').replace(/\s+/g, ' ').trim();
  const idx = normalize(text).indexOf(normalize(query));
  if (idx === -1) return text.slice(0, radius * 2);

  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

/**
 * Busca unidades no índice.
 * @param {Array<Object>} index - Índice de `loadTheoryIndex()`
 * @param {string} query
 * @returns {Array<Object>} [{ id, title, discipline, module, snippet }]
 */
export function searchTheory(index, query) {
  const q = normalize(query).trim();
  if (!q) return [];

  const results = [];
  for (const unit of index || []) {
    const haystack = normalize(`${unit.title} ${unit.discipline} ${unit.content}`);
    if (haystack.includes(q)) {
      results.push({
        id: unit.id,
        title: unit.title,
        discipline: unit.discipline,
        module: unit.module,
        semester: unit.semester,
        snippet: extractSnippet(unit.content, query)
      });
    }
  }
  return results;
}
