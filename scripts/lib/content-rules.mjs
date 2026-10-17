/**
 * Regras de conteúdo (puras e testáveis) — Ensina Lógica
 *
 * Centraliza as regras "anti-placeholder" usadas por `scripts/validate.mjs`
 * (CI) e exercitadas por `scripts/test-validation.mjs`. Nada aqui toca o disco:
 * as funções recebem front-matter/exercício já parseados e devolvem listas de
 * erros (strings), para que o chamador decida como reportá-los.
 *
 * Motivação: impedir que o problema descrito em `CONTENT_AUDIT.md` volte —
 * unidades marcadas `verified_with_source` sem trecho original literal conferido
 * contra a fonte, URLs genéricas, licenças/edições proibidas e exercícios com
 * enunciado/explicação de placeholder.
 */

// ---------------------------------------------------------------------------
// Licenças
// ---------------------------------------------------------------------------

/** Licenças de domínio público aceitas (além do CC0). */
export const PUBLIC_DOMAIN_LICENSES = ['PUBLIC-DOMAIN', 'PUBLIC DOMAIN', 'PD', 'CC-PD'];

/** Licenças permitidas para derivação (SPDX): CC0, CC BY, CC BY-SA, domínio público. */
export const ALLOWED_LICENSES = [
  'CC0-1.0',
  'CC-BY-3.0', 'CC-BY-4.0',
  'CC-BY-SA-3.0', 'CC-BY-SA-4.0',
  ...PUBLIC_DOMAIN_LICENSES
];

/** Licenças explicitamente proibidas para derivação. */
export const FORBIDDEN_LICENSES = [
  'CC-BY-NC-4.0', 'CC-BY-NC-SA-4.0', 'CC-BY-NC-ND-4.0',
  'CC-BY-ND-4.0',
  'GFDL-1.3',
  'MIT-OCW-NC-SA'
];

// ---------------------------------------------------------------------------
// Edições proibidas por fonte (livros cuja edição recente mudou de licença)
// ---------------------------------------------------------------------------

export const FORBIDDEN_EDITIONS = [
  {
    title: /Discrete Mathematics: An Open Introduction/i,
    edition: /\b4\s*(th|ª|a)?\b|fourth|\b4\b/i,
    reason: 'a 4ª edição de Levin é CC BY-NC-SA 4.0 (não comercial); usar a 3ª edição (dmoi3)'
  }
];

// ---------------------------------------------------------------------------
// URLs genéricas (homepage/página do livro, sem capítulo ou seção)
// ---------------------------------------------------------------------------

/** Homepages conhecidas das fontes aprovadas (não são capítulo/seção). */
export const GENERIC_URL_PATTERNS = [
  /^https?:\/\/[^/]+\/?$/i, // raiz do domínio
  /^https?:\/\/press\.rebus\.community\/programmingfundamentals\/?$/i,
  /^https?:\/\/discrete\.openmathbooks\.org\/?$/i,
  /^https?:\/\/discrete\.openmathbooks\.org\/dmoi3(\.html)?\/?$/i
];

/**
 * `true` quando a URL é genérica (homepage do livro) ou não tem caminho de
 * capítulo/seção. Heurística: exige ao menos 2 segmentos de caminho e rejeita
 * as homepages conhecidas.
 */
export function isGenericSourceUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return true;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return true;
  }
  if (GENERIC_URL_PATTERNS.some((re) => re.test(url))) return true;
  const segments = parsed.pathname.split('/').filter(Boolean);
  return segments.length < 2;
}

// ---------------------------------------------------------------------------
// Trecho original (`original_excerpt`)
// ---------------------------------------------------------------------------

/** Mínimo de palavras exigido de um trecho original conferido. */
export const MIN_EXCERPT_WORDS = 15;

/** Frases que denunciam texto gerado/placeholder (não é trecho literal). */
export const PLACEHOLDER_EXCERPT_PATTERNS = [
  /conte[úu]do\s+derivado\s+de/i,
  /conte[úu]do\s+gerado/i,
  /gerado\s+(por|com|pela?)\s+(ia|intelig)/i,
  /\bplaceholder\b/i,
  /licen[çc]a\s+CC-?\s*BY/i
];

/** Marcadores de português (a fonte dos trechos originais é o inglês). */
const PT_DIACRITICS = /[ãõçáéíóúâêôàü]/i;
const PT_WORDS = /\b(que|não|uma|para|com|por|dos|das|como|são|quando|duas|também|então|sobre|entre|cada|pode|deve|proposições|proposição|predicado|sentença|variáveis|afirmação|verdadeira|falsa|valor|supor)\b/gi;
const EN_WORDS = /\b(the|and|is|are|of|to|in|that|which|when|where|not|no|called|statement|statements|proof|proofs|true|false|number|numbers|there|exists|for all|set|function|sequence|induction|data|type|flow|program)\b/gi;

export function countWords(text) {
  return String(text ?? '').trim().split(/\s+/).filter(Boolean).length;
}

export function isPlaceholderExcerpt(text) {
  const s = String(text ?? '');
  return PLACEHOLDER_EXCERPT_PATTERNS.some((re) => re.test(s));
}

/**
 * Detecção simples de idioma do trecho: `'en'`, `'pt'` ou `'unknown'`.
 * As fontes aprovadas são em inglês; um trecho em português é sinal de que o
 * texto foi traduzido/gerado em vez de copiado da fonte.
 */
export function detectExcerptLanguage(text) {
  const s = String(text ?? '');
  const pt = (PT_DIACRITICS.test(s) ? 2 : 0) + (s.match(PT_WORDS) || []).length;
  const en = (s.match(EN_WORDS) || []).length;
  if (en >= 2 && en > pt) return 'en';
  if (pt > en) return 'pt';
  return en > 0 ? 'en' : 'unknown';
}

// ---------------------------------------------------------------------------
// Exercícios
// ---------------------------------------------------------------------------

/** Padrões de placeholder já vistos nos exercícios gerados em massa. */
export const EXERCISE_PLACEHOLDER_PATTERNS = [
  /quest[ãa]o\s+\d+\s+sobre/i,
  /alternativa\s+[a-d]\b/i,
  /explica[çc][ãa]o\s+da\s+quest[ãa]o/i
];

function normalizeForCitation(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * `true` se a explicação cita a fonte: um número de seção/seção ("Seção 0.2",
 * "Seções 0.2 e 3.2"), um capítulo nomeado ("capítulo Program Design",
 * "capítulos While Loop") ou o próprio nome da seção da unidade.
 */
export function explanationCitesSource(explanation, sourceSection = '') {
  const n = normalizeForCitation(explanation);
  if (/\bsecc?(ao|oes)e?s?\s*\d/.test(n)) return true;      // seção/seções N
  if (/\bcapitulos?\s+[a-z]/.test(n)) return true;           // capítulo/capítulos X
  if (/\b(chapter|section)s?\s+\d/.test(n)) return true;     // fallback em inglês
  if (sourceSection && n.includes(normalizeForCitation(sourceSection))) return true;
  return false;
}

/**
 * Regras de conteúdo de um exercício. `sourceSection` é a seção da unidade
 * teórica vinculada (usada para checar a citação).
 * @returns {string[]} erros
 */
export function exerciseContentErrors(exercise, { sourceSection = '' } = {}) {
  const errors = [];
  const prompt = String(exercise?.prompt ?? '');
  const explanation = String(exercise?.explanation ?? '');

  for (const [field, text] of [['prompt', prompt], ['explanation', explanation]]) {
    for (const re of EXERCISE_PLACEHOLDER_PATTERNS) {
      if (re.test(text)) errors.push(`${field} com padrão de placeholder (${re})`);
    }
  }

  if (!explanationCitesSource(explanation, sourceSection)) {
    errors.push('explanation não cita a seção/capítulo da fonte');
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Unidades teóricas
// ---------------------------------------------------------------------------

/**
 * Regras "anti-placeholder" de uma unidade teórica (front-matter já parseado).
 * @returns {string[]} erros
 */
export function theoryUnitContentErrors(fm = {}) {
  const errors = [];
  const source = fm.source || {};

  // Licença permitida / proibida
  if (fm.license) {
    if (FORBIDDEN_LICENSES.includes(fm.license)) {
      errors.push(`licença proibida para derivação: ${fm.license}`);
    } else if (!ALLOWED_LICENSES.includes(fm.license)) {
      errors.push(`licença fora da lista permitida (CC0/CC BY/CC BY-SA/domínio público): ${fm.license}`);
    }
  }

  // Edição proibida (ex.: Levin 4ª edição, NC)
  for (const rule of FORBIDDEN_EDITIONS) {
    if (rule.title.test(String(source.title ?? '')) && rule.edition.test(String(source.edition ?? ''))) {
      errors.push(`edição proibida para "${source.title}": ${source.edition} — ${rule.reason}`);
    }
  }

  // URL genérica (sem capítulo/seção)
  if (source.url && isGenericSourceUrl(source.url)) {
    errors.push(`source.url genérica (homepage sem capítulo/seção): ${source.url}`);
  }

  // `verified_with_source` exige trecho literal conferido + data + método
  if (fm.verification_status === 'verified_with_source') {
    const excerpt = String(fm.original_excerpt ?? '').trim();

    if (!excerpt) {
      errors.push('verified_with_source exige original_excerpt (trecho literal da fonte)');
    } else {
      const words = countWords(excerpt);
      if (words < MIN_EXCERPT_WORDS) {
        errors.push(`original_excerpt com menos de ${MIN_EXCERPT_WORDS} palavras (${words})`);
      }
      if (isPlaceholderExcerpt(excerpt)) {
        errors.push('original_excerpt parece texto gerado/placeholder (não é trecho literal)');
      }
      if (detectExcerptLanguage(excerpt) === 'pt') {
        errors.push('original_excerpt não está no idioma da fonte (deve ser o trecho original, em inglês)');
      }
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(fm.verified_at ?? ''))) {
      errors.push('verified_with_source exige verified_at no formato YYYY-MM-DD');
    }
    if (!String(fm.verification_method ?? '').trim()) {
      errors.push('verified_with_source exige verification_method');
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// ATTRIBUTIONS.md — bloco gerado a partir das unidades
// ---------------------------------------------------------------------------

export const ATTRIBUTIONS_BEGIN = '<!-- BEGIN GENERATED: theory-units -->';
export const ATTRIBUTIONS_END = '<!-- END GENERATED: theory-units -->';

/**
 * Gera o bloco determinístico (ordenado por id) que lista todas as unidades
 * publicadas. `units` = [{ id, source: { title, chapter, section } }].
 */
export function generateAttributionsBlock(units = []) {
  const sorted = [...units]
    .filter((u) => u && u.id)
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));

  const lines = [
    ATTRIBUTIONS_BEGIN,
    '| Unidade | Fonte | Capítulo › Seção |',
    '| --- | --- | --- |'
  ];

  for (const unit of sorted) {
    const source = unit.source || {};
    const location = [source.chapter, source.section].filter(Boolean).join(' › ') || '—';
    lines.push(`| \`${unit.id}\` | ${source.title || '—'} | ${location} |`);
  }

  lines.push(ATTRIBUTIONS_END);
  return lines.join('\n');
}

/** Extrai o bloco gerado de ATTRIBUTIONS.md, ou `null` se os marcadores faltarem. */
export function extractAttributionsBlock(content) {
  const text = String(content ?? '');
  const start = text.indexOf(ATTRIBUTIONS_BEGIN);
  const end = text.indexOf(ATTRIBUTIONS_END);
  if (start === -1 || end === -1 || end < start) return null;
  return text.slice(start, end + ATTRIBUTIONS_END.length);
}

/** Ids de unidades (`th-sem...`) citados num texto. */
export function collectUnitIds(content) {
  return new Set([...String(content ?? '').matchAll(/th-sem[1-8]-[a-z0-9-]+/g)].map((m) => m[0]));
}
