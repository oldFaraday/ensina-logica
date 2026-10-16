/**
 * Busca full-text em memória sobre o índice de unidades teóricas.
 * Case- e acento-insensível, com trecho (snippet) ao redor do match.
 *
 * Performance: o índice é estável (cacheado por `loadTheoryIndex()`), então o
 * "haystack" normalizado de cada unidade é memoizado em um `WeakMap` — evita
 * re-normalizar todo o conteúdo a cada tecla digitada na busca.
 */

const indexMemo = new WeakMap();

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
 * Constrói (ou recupera do cache) as entradas normalizadas do índice.
 * @param {Array<Object>} index
 * @returns {Array<{unit:Object, haystack:string, normalizedContent:string}>}
 */
function getEntries(index) {
  const list = Array.isArray(index) ? index : [];
  if (indexMemo.has(list)) return indexMemo.get(list);

  const entries = list.map((unit) => {
    const collapsed = String(unit.content || '').replace(/\s+/g, ' ').trim();
    return {
      unit,
      haystack: normalize(`${unit.title} ${unit.discipline} ${unit.content}`),
      normalizedContent: normalize(collapsed)
    };
  });

  indexMemo.set(list, entries);
  return entries;
}

/**
 * Extrai um trecho do conteúdo ao redor da primeira ocorrência do termo.
 * @param {string} content
 * @param {string} query
 * @param {number} [radius=80]
 * @param {string} [normalizedContent] - Conteúdo já normalizado (opcional, cache)
 * @returns {string}
 */
export function extractSnippet(content, query, radius = 80, normalizedContent = null) {
  const text = String(content || '').replace(/\s+/g, ' ').trim();
  const haystack = normalizedContent || normalize(text);
  const idx = haystack.indexOf(normalize(query));
  if (idx === -1) return text.slice(0, radius * 2);

  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

/**
 * Busca unidades no índice.
 * @param {Array<Object>} index - Índice de `loadTheoryIndex()`
 * @param {string} query
 * @returns {Array<Object>} [{ id, title, discipline, disciplineTitle, module, moduleTitle, semester, snippet }]
 */
export function searchTheory(index, query) {
  const q = normalize(query).trim();
  if (!q) return [];

  const results = [];
  for (const { unit, haystack, normalizedContent } of getEntries(index)) {
    if (haystack.includes(q)) {
      results.push({
        id: unit.id,
        title: unit.title,
        discipline: unit.discipline,
        disciplineTitle: unit.disciplineTitle,
        module: unit.module,
        moduleTitle: unit.moduleTitle,
        semester: unit.semester,
        snippet: extractSnippet(unit.content, query, 80, normalizedContent)
      });
    }
  }
  return results;
}
