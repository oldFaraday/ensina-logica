/**
 * Embaralhamento determinístico das alternativas de múltipla escolha.
 *
 * Regras:
 * - A ordem dos dados NUNCA é alterada; só a ordem de exibição.
 * - A semente depende de (id do exercício, número da tentativa), então a ordem
 *   fica estável em re-renderizações da mesma tentativa e muda na seguinte.
 * - Alternativas que dependem de posição ("Todas as anteriores", "A e B", ...)
 *   ficam fixas no fim, na ordem original.
 * - `exercise.shuffle === false` desliga o embaralhamento.
 *
 * O retorno é uma lista de `{ text, originalIndex }`: a correção usa
 * `originalIndex` (identidade da opção), nunca a posição exibida.
 */

const FIXED_OPTION_PATTERNS = [
  /^(?:todas?|nenhuma?)\s+(?:as\s+|das\s+)?(?:alternativas|opcoes)(?:\s+(?:acima|anteriores|abaixo|a seguir|seguintes))?$/,
  /^(?:todas?|nenhuma?)\s+(?:as\s+|das\s+)?(?:acima|anteriores|abaixo|a seguir|seguintes)$/,
  /^(?:ambas?|ambos)\s+(?:as\s+|os\s+)?(?:alternativas|opcoes)(?:\s+(?:acima|anteriores))?$/,
  /^(?:ambas?|ambos)$/,
  /^(?:apenas\s+|somente\s+)?[a-f](?:\s*(?:,|e)\s*[a-f])+$/,
  /^(?:apenas\s+|somente\s+)?(?:as\s+)?(?:alternativas|opcoes)\s+[a-f](?:\s*(?:,|e)\s*[a-f])*$/,
  /^(?:apenas\s+|somente\s+)?(?:os\s+)?itens?\s+(?:[ivx]+|\d+)(?:\s*(?:,|e)\s*(?:[ivx]+|\d+))*$/,
  /^(?:(?:apenas|somente)\s+)?(?:[ivx]+|\d+)(?:\s*(?:,|e)\s*(?:[ivx]+|\d+))+$/
];

/** Normaliza texto para comparar com os padrões (sem acento, minúsculo). */
function normalizeOptionText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!;:]+$/g, '');
}

/**
 * Uma opção depende da posição das demais? Ex.: "Todas as anteriores",
 * "Nenhuma das opções acima", "Ambas", "A e B", "I, II e III".
 * @param {string} option
 * @returns {boolean}
 */
export function isFixedOption(option) {
  const value = normalizeOptionText(option);
  if (!value) return false;
  return FIXED_OPTION_PATTERNS.some((pattern) => pattern.test(value));
}

/** Hash FNV-1a de 32 bits (estável entre execuções e plataformas). */
export function hashString(value) {
  let hash = 0x811c9dc5;
  const text = String(value);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** PRNG determinístico (mulberry32). */
export function createSeededRandom(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace(list, random) {
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
  }
  return list;
}

/**
 * Calcula a ordem de exibição das opções.
 *
 * A permutação de base vem do id do exercício (estável). A tentativa define uma
 * rotação cíclica que avança uma posição por vez: a ordem muda a cada nova
 * tentativa, a distribuição das posições é uniforme ao longo das tentativas e
 * o resultado é sempre determinístico para (id, tentativa).
 *
 * @param {string[]} options - opções na ordem original dos dados
 * @param {Object} [config]
 * @param {string} [config.exerciseId]
 * @param {number} [config.attempt]
 * @param {boolean} [config.shuffle]
 * @returns {Array<{text: string, originalIndex: number}>}
 */
export function getDisplayOptions(options, { exerciseId = '', attempt = 1, shuffle = true } = {}) {
  const items = (Array.isArray(options) ? options : []).map((text, originalIndex) => ({
    text,
    originalIndex
  }));

  if (shuffle === false) return items;

  const movable = items.filter((item) => !isFixedOption(item.text));
  const fixed = items.filter((item) => isFixedOption(item.text));

  if (movable.length > 1) {
    const attemptNumber = Math.max(1, Math.trunc(Number(attempt)) || 1);
    const rotation = (attemptNumber - 1) % movable.length;
    const random = createSeededRandom(hashString(exerciseId));
    shuffleInPlace(movable, random);
    if (rotation > 0) movable.push(...movable.splice(0, rotation));
  }

  return [...movable, ...fixed];
}
