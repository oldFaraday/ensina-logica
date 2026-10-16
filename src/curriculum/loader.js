/**
 * Curriculum Loader
 * Carrega curriculum.json + theory + exercises de forma assíncrona e cacheada
 */

const CURRICULUM_URL = './data/curriculum.json';
const THEORY_BASE_URL = './data/theory/';
const EXERCISES_BASE_URL = './data/exercises/';

let curriculumCache = null;
let theoryIndexCache = null;
let exercisesIndexCache = null;

/**
 * Carrega o mapa completo do currículo
 * @returns {Promise<Object>} Objeto do currículo
 */
export async function loadCurriculum() {
  if (curriculumCache) return curriculumCache;

  try {
    const response = await fetch(CURRICULUM_URL);
    if (!response.ok) {
      throw new Error(`Falha ao carregar curriculum.json: ${response.status}`);
    }
    curriculumCache = await response.json();
    return curriculumCache;
  } catch (error) {
    console.error('[CurriculumLoader] Erro ao carregar currículo:', error);
    throw error;
  }
}

/**
 * Carrega uma unidade teórica específica
 * @param {string} theoryUnitId - ID da unidade (ex: th-sem1-algorithms-m01-intro)
 * @returns {Promise<Object|null>} Unidade teórica parseada (front-matter + content) ou null se não encontrada
 */
export async function loadTheoryUnit(theoryUnitId) {
  // Extrai semestre e disciplina do ID
  const match = theoryUnitId.match(/^th-sem([1-8])-([a-z-]+)-/);
  if (!match) {
    console.warn('[CurriculumLoader] ID de teoria inválido:', theoryUnitId);
    return null;
  }

  const [, semNum, discipline] = match;
  const url = `${THEORY_BASE_URL}sem${semNum}/${discipline}/${theoryUnitId}.md`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Falha ao carregar ${url}: ${response.status}`);
    }
    const markdown = await response.text();
    return parseTheoryMarkdown(theoryUnitId, markdown);
  } catch (error) {
    console.error(`[CurriculumLoader] Erro ao carregar teoria ${theoryUnitId}:`, error);
    return null;
  }
}

/**
 * Carrega exercícios de uma lição específica
 * @param {string} lessonId - ID da lição (ex: l01)
 * @param {string} discipline - Disciplina (ex: algorithms)
 * @param {number} semNum - Número do semestre
 * @returns {Promise<Array>} Array de exercícios
 */
export async function loadExercisesForLesson(lessonId, discipline, semNum = 1) {
  const moduleMatch = lessonId.match(/^l([0-9]{2})$/);
  if (!moduleMatch) return [];

  // Precisamos descobrir o módulo - para simplificar, tentamos carregar todos os exercícios do módulo
  // Na prática, o curriculum.json mapeia lesson -> module
  const curriculum = await loadCurriculum();
  const sem = curriculum.semesters.find(s => s.number === semNum);
  if (!sem) return [];

  const disc = sem.disciplines.find(d => d.id === discipline);
  if (!disc) return [];

  let moduleId = null;
  for (const mod of disc.modules) {
    if (mod.lessons.includes(lessonId)) {
      moduleId = mod.id;
      break;
    }
  }
  if (!moduleId) return [];

  const url = `${EXERCISES_BASE_URL}sem${semNum}/${discipline}/${moduleId}-${lessonId}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Falha ao carregar ${url}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[CurriculumLoader] Erro ao carregar exercícios ${url}:`, error);
    return [];
  }
}

/**
 * Carrega todos os exercícios ligados a uma unidade teórica.
 * Usa `linked_lessons` (mesma convenção de arquivo por lição) e filtra por
 * `linked_exercises` quando presente.
 * @param {string} theoryUnitId - ID da unidade teórica
 * @returns {Promise<Array>} Array de exercícios
 */
export async function loadExercisesForTheoryUnit(theoryUnitId) {
  const theoryUnit = await loadTheoryUnit(theoryUnitId);
  if (!theoryUnit) return [];

  const match = theoryUnitId.match(/^th-sem([1-8])-([a-z-]+)-/);
  if (!match) return [];
  const [, semNum, discipline] = match;

  const linkedLessons = theoryUnit.linked_lessons || [];
  const linkedExerciseIds = theoryUnit.linked_exercises || [];

  const collected = [];
  for (const lessonId of linkedLessons) {
    const exercises = await loadExercisesForLesson(lessonId, discipline, Number(semNum));
    collected.push(...exercises);
  }

  if (linkedExerciseIds.length > 0) {
    return collected.filter((ex) => linkedExerciseIds.includes(ex.id));
  }
  return collected;
}

/**
 * Parseia markdown com front-matter YAML
 * @param {string} id - ID da unidade
 * @param {string} markdown - Conteúdo do arquivo .md
 * @returns {Object} Objeto com front-matter e content
 */
function parseTheoryMarkdown(id, markdown) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontMatterRegex);

  if (!match) {
    console.warn(`[CurriculumLoader] Front-matter inválido em ${id}`);
    return { id, frontMatter: {}, content: markdown };
  }

  const [, frontMatterYaml, content] = match;
  const frontMatter = parseYaml(frontMatterYaml);

  return {
    id,
    ...frontMatter,
    content: content.trim()
  };
}

/**
 * Parser YAML simples para front-matter (suporta subset necessário)
 * @param {string} yaml - String YAML
 * @returns {Object} Objeto parseado
 */
function parseYaml(yaml) {
  const result = {};
  const lines = yaml.split('\n');
  let currentKey = null;
  let currentArray = null;
  let inMultiline = false;
  let multilineKey = null;
  let multilineIndent = 0;

  for (const line of lines) {
    // Multiline string (| ou >)
    if (inMultiline) {
      const lineIndent = line.length - line.trimStart().length;
      if (line.trim() === '' || lineIndent > multilineIndent) {
        result[multilineKey] += '\n' + line.trimEnd();
        continue;
      } else {
        inMultiline = false;
        multilineKey = null;
        multilineIndent = 0;
      }
    }

    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Array item
    const arrayMatch = trimmed.match(/^-\s+(.*)$/);
    if (arrayMatch && currentArray !== null) {
      currentArray.push(arrayMatch[1].replace(/^["']|["']$/g, ''));
      continue;
    }

    // Key: value
    const kvMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      currentKey = key;
      currentArray = null;

      // Multiline
      if (value === '|' || value === '>') {
        inMultiline = true;
        multilineKey = key;
        multilineIndent = line.length - trimmed.length + 2;
        result[key] = '';
        continue;
      }

      // Array inline
      if (value.startsWith('[') && value.endsWith(']')) {
        result[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        continue;
      }

      // String ou número
      result[key] = value.replace(/^["']|["']$/g, '');
      continue;
    }

    // Indented key (nested object - simplified)
    const indentedMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (indentedMatch && currentKey) {
      // Para simplificar, achatamos source.title etc em source_title
      // Implementação completa usaria js-yaml, mas evitamos dependência
      const [, subKey, subValue] = indentedMatch;
      const combinedKey = `${currentKey}_${subKey}`;
      result[combinedKey] = subValue.replace(/^["']|["']$/g, '');
    }
  }

  // Normaliza source object se achatado
  if (result.source_title) {
    result.source = {
      title: result.source_title,
      authors: result.source_authors ? result.source_authors.split(',').map(a => a.trim()) : [],
      url: result.source_url,
      chapter: result.source_chapter,
      section: result.source_section,
      access_date: result.source_access_date,
      edition: result.source_edition,
      license_url: result.source_license_url,
      license_confirmed_at: result.source_license_confirmed_at
    };
    // Remove chaves achatadas
    Object.keys(result).forEach(k => {
      if (k.startsWith('source_')) delete result[k];
    });
  }

  return result;
}

/**
 * Pré-carrega índice de teorias para busca rápida.
 * Usa o campo `theory` de cada módulo do currículo (link explícito módulo → unidade).
 * @returns {Promise<Array>} Lista de metadados de todas as teorias publicadas
 */
export async function loadTheoryIndex() {
  if (theoryIndexCache) return theoryIndexCache;

  const curriculum = await loadCurriculum();
  const index = [];

  for (const sem of curriculum.semesters) {
    for (const disc of sem.disciplines) {
      for (const mod of disc.modules) {
        if (!mod.theory) continue;
        const theory = await loadTheoryUnit(mod.theory);
        // Constitution §2 / T112: só entra no índice o que foi conferido com a fonte
        if (theory && theory.verification_status === 'verified_with_source') {
          index.push({
            id: theory.id,
            title: theory.title,
            discipline: theory.discipline,
            module: theory.module,
            semester: sem.id,
            content: theory.content
          });
        }
      }
    }
  }

  theoryIndexCache = index;
  return index;
}

/**
 * Limpa todos os caches
 */
export function clearCache() {
  curriculumCache = null;
  theoryIndexCache = null;
  exercisesIndexCache = null;
}