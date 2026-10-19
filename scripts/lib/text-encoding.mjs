/**
 * Regras de codificação de arquivos de texto do projeto.
 *
 * Um arquivo só é aceito se for UTF-8 válido, sem BOM e sem mojibake. Os
 * padrões usam escapes para que este próprio arquivo continue limpo (um
 * literal de mojibake aqui faria o validador rejeitar a si mesmo).
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { extname, join, relative, sep } from 'path';

export const TEXT_EXTENSIONS = new Set([
  '.json',
  '.md',
  '.js',
  '.mjs',
  '.html',
  '.css',
  '.yml',
  '.yaml'
]);

export const MOJIBAKE_PATTERNS = [
  {
    label: 'A-til seguido de caractere não ASCII',
    re: /\u00C3[^\x00-\x7F]/gu
  },
  {
    label: 'A-circunflexo seguido de U+00A0 a U+00BF',
    re: /\u00C2[\u00A0-\u00BF]/gu
  },
  {
    label: 'sequência de pontuação com a-circunflexo',
    re: /\u00E2\u20AC/gu
  },
  {
    label: 'caractere de substituição U+FFFD',
    re: /\uFFFD/gu
  }
];

/** Conta os marcadores de mojibake conhecidos em um texto já decodificado. */
export function countMojibake(text) {
  const value = String(text ?? '');
  return MOJIBAKE_PATTERNS.reduce((total, pattern) => {
    const matches = value.match(pattern.re);
    return total + (matches ? matches.length : 0);
  }, 0);
}

/**
 * Verifica um buffer de arquivo.
 * @param {Buffer|Uint8Array} buffer
 * @returns {Array<{type: string, message: string, count?: number}>}
 */
export function encodingIssues(buffer) {
  const bytes = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  const issues = [];

  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
    issues.push({ type: 'bom', message: 'BOM UTF-8 no início do arquivo' });
  }

  let text;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    issues.push({ type: 'invalid-utf8', message: 'bytes inválidos para UTF-8' });
    return issues;
  }

  for (const pattern of MOJIBAKE_PATTERNS) {
    const matches = text.match(pattern.re);
    if (matches && matches.length > 0) {
      issues.push({
        type: 'mojibake',
        message: `mojibake (${pattern.label}): ${matches.length} ocorrência(s)`,
        count: matches.length
      });
    }
  }

  return issues;
}

/** Formata uma issue para uma mensagem de erro de uma linha. */
export function formatEncodingIssue(issue) {
  return issue.message;
}

/**
 * Percorre o projeto e devolve os arquivos de texto com problema.
 * `lib/` na raiz é ignorado (bibliotecas de terceiros); `node_modules/` e
 * `.git/` são ignorados em qualquer nível.
 * @param {string} rootDir
 * @returns {Array<{file: string, issues: Array}>}
 */
export function findProjectEncodingIssues(rootDir) {
  const skipTopLevel = new Set(['lib']);
  const skipAnywhere = new Set(['node_modules', '.git']);
  const problems = [];

  function walk(dir, depth) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        if (skipAnywhere.has(entry)) continue;
        if (depth === 0 && skipTopLevel.has(entry)) continue;
        walk(full, depth + 1);
        continue;
      }
      if (!stats.isFile()) continue;
      if (!TEXT_EXTENSIONS.has(extname(entry).toLowerCase())) continue;

      const issues = encodingIssues(readFileSync(full));
      if (issues.length > 0) {
        problems.push({
          file: relative(rootDir, full).split(sep).join('/'),
          issues
        });
      }
    }
  }

  walk(rootDir, 0);
  return problems;
}

/** Lista os arquivos de texto que o validador percorre (para relatórios). */
export function collectTextFiles(rootDir) {
  const skipTopLevel = new Set(['lib']);
  const skipAnywhere = new Set(['node_modules', '.git']);
  const files = [];

  function walk(dir, depth) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        if (skipAnywhere.has(entry)) continue;
        if (depth === 0 && skipTopLevel.has(entry)) continue;
        walk(full, depth + 1);
      } else if (stats.isFile() && TEXT_EXTENSIONS.has(extname(entry).toLowerCase())) {
        files.push(full);
      }
    }
  }

  walk(rootDir, 0);
  return files;
}
