/**
 * Parser de front-matter compartilhado pelo validador e pelo check-module.
 *
 * Suporta escalares, listas inline `[a, b]`, strings multilinha (`|`/`>`) e UM
 * nível de objeto aninhado (ex.: `source:`). Listas em bloco são aceitas para
 * chaves de topo (ex.: `sections:` seguido de `- item`).
 */

const stripQuotes = (v) => String(v).trim().replace(/^["']|["']$/g, '');

function parseInlineArray(v) {
  return v
    .slice(1, -1)
    .split(',')
    .map(stripQuotes)
    .filter((s) => s !== '');
}

export function parseFrontMatter(yaml) {
  const result = {};
  let parentKey = null;
  let currentArray = null;
  let inMultiline = false;
  let multilineKey = null;
  let pendingListKey = null;

  for (const rawLine of String(yaml).split('\n')) {
    const raw = rawLine.replace(/\s+$/, '');
    const indent = raw.length - raw.trimStart().length;
    const trimmed = raw.trim();

    if (inMultiline) {
      if (trimmed === '' || indent >= 2) {
        result[multilineKey] =
          (result[multilineKey] || '') + (result[multilineKey] ? '\n' : '') + trimmed;
        continue;
      }
      inMultiline = false;
      multilineKey = null;
    }

    if (!trimmed || trimmed.startsWith('#')) continue;

    // Item de lista em bloco. Só vale para a chave de topo que acabou de ser
    // aberta sem valor (`sections:`), nunca para o objeto `source:`.
    const arrayMatch = trimmed.match(/^-\s+(.*)$/);
    if (arrayMatch && (currentArray || pendingListKey)) {
      const key = currentArray ? null : pendingListKey;
      if (key) {
        result[key] = [];
        currentArray = result[key];
        pendingListKey = null;
      }
      currentArray.push(stripQuotes(arrayMatch[1]));
      continue;
    }

    const kvMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!kvMatch) {
      parentKey = null;
      currentArray = null;
      pendingListKey = null;
      continue;
    }

    const [, key, rawValue] = kvMatch;
    const value = rawValue.trim();

    if (indent === 0) {
      currentArray = null;
      pendingListKey = null;

      if (value === '') {
        result[key] = {};
        parentKey = key;
        pendingListKey = key;
        continue;
      }

      if (value === '|' || value === '>') {
        inMultiline = true;
        multilineKey = key;
        result[key] = '';
        parentKey = null;
        continue;
      }

      if (value.startsWith('[') && value.endsWith(']')) {
        result[key] = parseInlineArray(value);
        parentKey = null;
        continue;
      }

      result[key] = stripQuotes(value);
      parentKey = null;
      continue;
    }

    pendingListKey = null;
    if (parentKey && result[parentKey] && typeof result[parentKey] === 'object') {
      if (value === '') {
        result[parentKey][key] = {};
      } else if (value.startsWith('[') && value.endsWith(']')) {
        result[parentKey][key] = parseInlineArray(value);
      } else {
        result[parentKey][key] = stripQuotes(value);
      }
      currentArray = null;
    }
  }

  // Chaves de topo abertas sem valor e sem itens de lista viram objeto vazio;
  // para o check-module, `sections`/`new_terms` vazios são equivalentes a [].
  return result;
}

/** Separa front-matter e corpo de um markdown. */
export function splitFrontMatter(markdown) {
  const normalized = String(markdown ?? '').replace(/\r\n?/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontMatter: {}, content: normalized };
  return { frontMatter: parseFrontMatter(match[1]), content: match[2].trim() };
}

/** Normaliza um termo para comparação (minúsculas, sem pontuação final). */
export function normalizeTerm(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[.?!:;,]+$/g, '')
    .trim();
}
