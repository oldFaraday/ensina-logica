/**
 * Regras da pipeline de conteúdo por módulo (v1).
 *
 * Funções puras: recebem dados já parseados (PLAN.md, unidades teóricas,
 * exercícios, glossário) e devolvem a lista de erros. O script
 * `scripts/check-module.mjs` lê o disco; os testes usam exemplos ruins.
 */

export const LEVELS = ['reconhecer', 'aplicar', 'analisar', 'transferir'];
export const DIFFICULTIES = ['easy', 'medium', 'hard'];
export const LESSON_MIN_EXERCISES = 5;
export const LESSON_MAX_EXERCISES = 7;
export const UNIT_MIN_WORDS = 300;
export const UNIT_MAX_WORDS = 900;
export const UNIT_MAX_NEW_TERMS = 3;
export const UNIT_MIN_LINKED_EXERCISES = 3;
export const CHALLENGE_QUESTIONS = 8;
export const FLASHCARDS_MIN = 8;
export const FLASHCARDS_MAX = 12;

/** Padrões genéricos de placeholder rejeitados em qualquer texto do módulo. */
export const PLACEHOLDER_PATTERNS = [
  { re: /\bplaceholder\b/i, label: 'placeholder' },
  { re: /\blorem\s+ipsum\b/i, label: 'lorem ipsum' },
  // Case-sensitive: "todo" é palavra comum em português; só marcadores em caixa alta.
  { re: /\bTODO\b|\bTBD\b/, label: 'TODO/TBD' },
  { re: /\[(?:preencher|inserir|todo|tbd)[^\]]*\]/i, label: '[preencher/inserir]' },
  { re: /conte[úu]do\s+derivado\s+de/i, label: 'conteúdo derivado de' },
  { re: /conte[úu]do\s+gerado/i, label: 'conteúdo gerado' },
  { re: /quest[ãa]o\s+\d+\s+sobre/i, label: 'questão N sobre' },
  { re: /alternativa\s+[a-d]\b/i, label: 'alternativa A/B/C/D' },
  { re: /explica[çc][ãa]o\s+da\s+quest[ãa]o/i, label: 'explicação da questão' },
  { re: /aqui\s+vai\s+(?:o\s+)?(?:texto|conte[úu]do)/i, label: 'aqui vai o texto' }
];

/** Objetivos declarados no PLAN.md (`OBJ-1`, `OBJ-2`, ...). */
export function extractPlanObjectives(planText) {
  const found = String(planText ?? '').match(/\bOBJ-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\b/g) || [];
  return [...new Set(found)];
}

/** Conta palavras do corpo (ignora front-matter, código, URLs e markdown). */
export function countPortugueseWords(text) {
  let body = String(text ?? '').replace(/^---\n[\s\S]*?\n---\n?/, '');
  body = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const tokens = body.match(/[\p{L}]+(?:['’\-][\p{L}]+)*/gu) || [];
  return tokens.length;
}

/** Ids de seção de uma unidade: front-matter `sections` + âncoras `{#id}` + headings. */
export function extractSectionIds(content, frontMatterSections = []) {
  const ids = new Set(
    (Array.isArray(frontMatterSections) ? frontMatterSections : []).map((s) => String(s).trim()).filter(Boolean)
  );

  const body = String(content ?? '');
  for (const match of body.matchAll(/^#{1,6}\s+.*?\{#([A-Za-z0-9_-]+)\}\s*$/gm)) {
    ids.add(match[1]);
  }
  for (const match of body.matchAll(/^#{2,6}\s+(.+)$/gm)) {
    const slug = match[1]
      .replace(/\{#[^}]+\}/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (slug) ids.add(slug);
  }
  return ids;
}

/** Compara termos novos com as entradas do glossário (`en` e `pt`). */
export function glossaryHasTerm(term, glossaryTerms = []) {
  const target = normalize(term);
  if (!target) return false;
  return glossaryTerms.some((entry) => {
    if (typeof entry === 'string') return normalize(entry) === target;
    return [entry?.en, entry?.pt]
      .filter(Boolean)
      .some((value) => normalize(value) === target);
  });
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[.?!:;,]+$/g, '')
    .trim();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function text(value) {
  return String(value ?? '').trim();
}

function sourceRefParts(sourceRef) {
  const value = text(sourceRef);
  const match = value.match(/^(th-sem[1-8]-[a-z-]+-[a-z0-9-]+)#([A-Za-z0-9_-]+)$/);
  if (!match) return null;
  return { unitId: match[1], sectionId: match[2] };
}

function placeholderErrors(label, fields) {
  const errors = [];
  for (const [field, value] of fields) {
    const valueText = String(value ?? '');
    for (const { re, label: patternLabel } of PLACEHOLDER_PATTERNS) {
      if (re.test(valueText)) errors.push(`${label}: ${field} contém padrão de placeholder (${patternLabel})`);
    }
  }
  return errors;
}

/**
 * Verifica um módulo inteiro. Todos os arrays devem vir na ordem em que
 * aparecem nos arquivos (a ordem importa para a rampa e a variedade).
 *
 * @param {Object} input
 * @param {Object} input.module            módulo do curriculum.json
 * @param {string} input.moduleLabel       ex.: `sem1/algorithms/m01`
 * @param {string} input.planText          conteúdo de docs/modules/<id>/PLAN.md
 * @param {Array}  input.theoryUnits       `{ id, content, sections, newTerms }`
 * @param {Array}  input.exercises         exercícios das lições (com lesson_id)
 * @param {Array}  input.challenge         exercícios do desafio
 * @param {Array}  input.flashcards        flashcards do módulo
 * @param {Array}  input.glossaryTerms     `{ en, pt }` ou strings
 * @returns {string[]} erros
 */
export function checkModuleContent({
  module = {},
  moduleLabel = 'módulo',
  planText = '',
  theoryUnits = [],
  exercises = [],
  challenge = [],
  flashcards = [],
  glossaryTerms = []
} = {}) {
  const errors = [];
  const label = moduleLabel || 'módulo';
  const lessons = asArray(module.lessons);
  const units = asArray(theoryUnits);
  const lessonExercises = asArray(exercises);
  const challengeExercises = asArray(challenge);
  const flashcardExercises = asArray(flashcards);
  const allExercises = [...lessonExercises, ...challengeExercises, ...flashcardExercises];

  // ------------------------------------------------------------------ plano
  const objectives = extractPlanObjectives(planText);
  if (!text(planText)) {
    errors.push(`${label}: PLAN.md ausente ou vazio (objetivos não verificáveis)`);
  } else if (objectives.length === 0) {
    errors.push(`${label}: PLAN.md não declara objetivos no formato OBJ-<n>`);
  }

  // -------------------------------------------------------------- objetivos
  for (const objectiveId of objectives) {
    const list = allExercises.filter((exercise) => text(exercise.objective_id) === objectiveId);
    if (list.length < 2) {
      errors.push(
        `${label}: objetivo ${objectiveId} tem ${list.length} exercício(s); exige ao menos 2 em níveis diferentes`
      );
      continue;
    }
    const levels = new Set(list.map((exercise) => text(exercise.level)).filter(Boolean));
    if (levels.size < 2) {
      errors.push(
        `${label}: objetivo ${objectiveId} tem exercícios em um único nível (${[...levels].join(', ') || 'nenhum'}); exige ao menos 2 níveis`
      );
    }
  }

  for (const exercise of allExercises) {
    const objectiveId = text(exercise.objective_id);
    if (objectiveId && objectives.length > 0 && !objectives.includes(objectiveId)) {
      errors.push(`${label}: exercício '${exercise.id || '?'}' aponta para objetivo inexistente no PLAN.md: ${objectiveId}`);
    }
  }

  // ----------------------------------------------------------------- lições
  if (lessons.length === 0) {
    errors.push(`${label}: módulo sem lições`);
  }

  lessons.forEach((lessonId, index) => {
    const list = lessonExercises.filter((exercise) => text(exercise.lesson_id) === lessonId);
    const lessonLabel = `${label}/lição ${lessonId}`;
    const isFirstLesson = index === 0;

    if (list.length < LESSON_MIN_EXERCISES || list.length > LESSON_MAX_EXERCISES) {
      errors.push(
        `${lessonLabel}: ${list.length} exercício(s); exige de ${LESSON_MIN_EXERCISES} a ${LESSON_MAX_EXERCISES}`
      );
    }

    const hard = list.filter((exercise) => text(exercise.difficulty) === 'hard');
    if (hard.length > 1) {
      errors.push(`${lessonLabel}: ${hard.length} exercícios difíceis; máximo 1`);
    }
    if (isFirstLesson && hard.length > 0) {
      errors.push(`${lessonLabel}: a lição 1 não pode ter exercício difícil`);
    }

    if (list.length > 0 && text(list[0].difficulty) !== 'easy') {
      errors.push(`${lessonLabel}: o 1º exercício deve ser fácil (encontrado: ${text(list[0].difficulty) || 'vazio'})`);
    }

    let runType = '';
    let runLength = 0;
    for (const exercise of list) {
      const type = text(exercise.type);
      if (type && type === runType) {
        runLength += 1;
      } else {
        runType = type;
        runLength = type ? 1 : 0;
      }
      if (runLength > 2) {
        errors.push(`${lessonLabel}: mais de 2 exercícios seguidos do tipo '${type}'`);
        break;
      }
    }
  });

  // ------------------------------------------------------ desafio/flashcards
  if (challengeExercises.length !== CHALLENGE_QUESTIONS) {
    errors.push(
      `${label}: desafio do módulo tem ${challengeExercises.length} questão(ões); exige exatamente ${CHALLENGE_QUESTIONS}`
    );
  }
  if (flashcardExercises.length < FLASHCARDS_MIN || flashcardExercises.length > FLASHCARDS_MAX) {
    errors.push(
      `${label}: ${flashcardExercises.length} flashcard(s); exige de ${FLASHCARDS_MIN} a ${FLASHCARDS_MAX}`
    );
  }

  // --------------------------------------------------------- unidades/teoria
  if (units.length === 0) {
    errors.push(`${label}: módulo sem unidade teórica`);
  }

  for (const unit of units) {
    const unitId = text(unit.id) || '?';
    const unitLabel = `${label}/unidade ${unitId}`;
    const words = countPortugueseWords(unit.content);
    if (words < UNIT_MIN_WORDS || words > UNIT_MAX_WORDS) {
      errors.push(`${unitLabel}: ${words} palavra(s); exige de ${UNIT_MIN_WORDS} a ${UNIT_MAX_WORDS}`);
    }

    const newTerms = asArray(unit.newTerms).map((term) => text(term)).filter(Boolean);
    if (newTerms.length > UNIT_MAX_NEW_TERMS) {
      errors.push(`${unitLabel}: ${newTerms.length} termos novos; máximo ${UNIT_MAX_NEW_TERMS}`);
    }
    for (const term of newTerms) {
      if (!glossaryHasTerm(term, glossaryTerms)) {
        errors.push(`${unitLabel}: termo novo '${term}' sem entrada no glossário`);
      }
    }

    const linked = allExercises.filter((exercise) => text(exercise.theory_unit_id) === unitId);
    if (linked.length < UNIT_MIN_LINKED_EXERCISES) {
      errors.push(
        `${unitLabel}: ${linked.length} exercício(s) ligado(s); exige ao menos ${UNIT_MIN_LINKED_EXERCISES}`
      );
    }

    errors.push(...placeholderErrors(unitLabel, [['conteúdo', unit.content]]));
  }

  // --------------------------------------------- campos e seções de origem
  const unitById = new Map(units.map((unit) => [text(unit.id), unit]));
  for (const exercise of allExercises) {
    const exerciseLabel = `${label}/exercício '${exercise.id || '?'}'`;
    const sourceRef = sourceRefParts(exercise.source_ref);

    if (!text(exercise.answer_check)) {
      errors.push(`${exerciseLabel}: sem answer_check`);
    }

    if (!text(exercise.source_ref)) {
      errors.push(`${exerciseLabel}: sem source_ref`);
    } else if (!sourceRef) {
      errors.push(
        `${exerciseLabel}: source_ref inválido ('${text(exercise.source_ref)}'); use 'th-sem...-<unidade>#<seção>'`
      );
    } else {
      const unit = unitById.get(sourceRef.unitId);
      if (!unit) {
        errors.push(`${exerciseLabel}: source_ref aponta para unidade fora do módulo: ${sourceRef.unitId}`);
      } else {
        const sections = unit.sections instanceof Set ? unit.sections : extractSectionIds(unit.content, unit.sections);
        if (!sections.has(sourceRef.sectionId)) {
          errors.push(
            `${exerciseLabel}: source_ref aponta para seção inexistente '${sourceRef.sectionId}' na unidade ${sourceRef.unitId}`
          );
        }
      }
    }

    errors.push(
      ...placeholderErrors(exerciseLabel, [
        ['prompt', exercise.prompt],
        ['explanation', exercise.explanation],
        ['answer_check', exercise.answer_check]
      ])
    );
  }

  return errors;
}
