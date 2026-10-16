/**
 * Minimal, dependency-free Markdown renderer (subset).
 *
 * Por que não `marked`: o projeto proíbe CDN e não vendoriza `marked`; então
 * implementamos um subset seguro e suficiente para as unidades teóricas
 * (headings, parágrafos, listas, blockquote, tabelas, código, ênfase, links,
 * math $..$ e $$..$$). Todo texto é escapado antes do HTML ser montado.
 *
 * O HTML resultante usa placeholders para math e código:
 *   - math: `<span|div class="math-*" data-tex="...">tex</span>`
 *   - código: `<pre><code class="language-*">...</code></pre>`
 * Quem insere no DOM chama `renderMathIn(root, katex)` e
 * `highlightIn(root, hljs)` para finalizar a renderização.
 *
 * @param {string} markdown
 * @returns {string} HTML
 */

const CODE_TOKEN = '@@CODE';
const MATH_TOKEN = '@@MATH';

export function renderMarkdown(markdown) {
  const codeStore = [];
  const mathStore = [];

  let text = String(markdown || '').replace(/\r\n?/g, '\n');

  // 1. Protege blocos de código
  text = text.replace(/```([a-zA-Z0-9_+.-]*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    codeStore.push({ lang: lang || '', code });
    return `\n\n${CODE_TOKEN}${codeStore.length - 1}@@\n\n`;
  });

  // 2. Protege math (bloco antes de inline)
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex) => {
    mathStore.push({ tex: tex.trim(), block: true });
    return `\n\n${MATH_TOKEN}${mathStore.length - 1}@@\n\n`;
  });
  text = text.replace(/\$([^$\n]+?)\$/g, (_m, tex) => {
    mathStore.push({ tex: tex.trim(), block: false });
    return `${MATH_TOKEN}${mathStore.length - 1}@@`;
  });

  const lines = text.split('\n');
  const out = [];
  let i = 0;

  const isBlank = (line) => line.trim() === '';
  const isBlockStart = (line) => {
    const t = line.trim();
    return (
      /^#{1,6}\s/.test(t) ||
      /^(```|---|\*\*\*|___)\s*$/.test(t) ||
      /^>\s?/.test(t) ||
      /^([-*+]|\d+\.)\s+/.test(t) ||
      t.startsWith(CODE_TOKEN) ||
      t.startsWith(MATH_TOKEN)
    );
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (isBlank(line)) {
      i += 1;
      continue;
    }

    // Bloco de código protegido
    const codeMatch = trimmed.match(new RegExp(`^${CODE_TOKEN}(\\d+)@@$`));
    if (codeMatch) {
      const { lang, code } = codeStore[Number(codeMatch[1])];
      const cls = lang ? ` class="language-${escapeHtml(lang)}"` : '';
      out.push(`<pre><code${cls}>${escapeHtml(code)}</code></pre>`);
      i += 1;
      continue;
    }

    // Math em bloco protegido
    const mathMatch = trimmed.match(new RegExp(`^${MATH_TOKEN}(\\d+)@@$`));
    if (mathMatch) {
      out.push(mathToHtml(mathStore[Number(mathMatch[1])]));
      i += 1;
      continue;
    }

    // Heading
    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = Math.min(heading[1].length + 1, 6); // # → h2 (h1 é o título da unidade)
      out.push(`<h${level}>${inline(heading[2], mathStore)}</h${level}>`);
      i += 1;
      continue;
    }

    // Regra horizontal
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      out.push('<hr>');
      i += 1;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(trimmed)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      out.push(`<blockquote>${inline(quote.join(' '), mathStore)}</blockquote>`);
      continue;
    }

    // Lista não ordenada
    if (/^[-*+]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ''));
        i += 1;
      }
      out.push(`<ul>${items.map((it) => `<li>${inline(it, mathStore)}</li>`).join('')}</ul>`);
      continue;
    }

    // Lista ordenada
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      out.push(`<ol>${items.map((it) => `<li>${inline(it, mathStore)}</li>`).join('')}</ol>`);
      continue;
    }

    // Tabela (pipe) — cabeçalho + separador
    if (trimmed.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      const header = splitRow(trimmed);
      i += 2; // pula cabeçalho e separador
      const rows = [];
      while (i < lines.length && lines[i].trim().includes('|') && !isBlank(lines[i])) {
        rows.push(splitRow(lines[i].trim()));
        i += 1;
      }
      const thead = `<thead><tr>${header.map((h) => `<th>${inline(h, mathStore)}</th>`).join('')}</tr></thead>`;
      const tbody = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c, mathStore)}</td>`).join('')}</tr>`).join('')}</tbody>`;
      out.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    // Parágrafo (junta linhas até blank ou início de bloco)
    const para = [trimmed];
    i += 1;
    while (i < lines.length && !isBlank(lines[i]) && !isBlockStart(lines[i])) {
      para.push(lines[i].trim());
      i += 1;
    }
    out.push(`<p>${inline(para.join(' '), mathStore)}</p>`);
  }

  return out.join('\n');
}

/**
 * Converte um texto inline (já escapado) aplicando ênfase, código, links e math.
 * @param {string} text
 * @param {Array<{tex:string, block:boolean}>} mathStore
 * @returns {string}
 */
function inline(text, mathStore) {
  let t = escapeHtml(text);

  // Math (tokens não são tocados pelo escape)
  const mathRe = new RegExp(`${MATH_TOKEN}(\\d+)@@`, 'g');
  t = t.replace(mathRe, (_m, idx) => mathToHtml(mathStore[Number(idx)]));

  // Código inline
  t = t.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`);

  // Links [texto](url)
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) => {
    const safe = sanitizeUrl(url);
    if (!safe) return label;
    return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  // Ênfase
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');

  return t;
}

function mathToHtml(entry) {
  if (!entry) return '';
  const attr = escapeHtml(entry.tex).replace(/"/g, '&quot;');
  if (entry.block) {
    return `<div class="math-block" data-tex="${attr}">${escapeHtml(entry.tex)}</div>`;
  }
  return `<span class="math-inline" data-tex="${attr}">${escapeHtml(entry.tex)}</span>`;
}

function splitRow(row) {
  return row
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());
}

function sanitizeUrl(url) {
  const value = String(url || '').trim();
  if (/^(https?:|mailto:|\.{0,2}\/)/i.test(value)) return escapeHtml(value).replace(/"/g, '&quot;');
  return null;
}

export function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Renderiza math (KaTeX) dentro de um elemento, se a lib estiver disponível.
 * @param {HTMLElement} root
 * @param {Object|null} katex
 */
export function renderMathIn(root, katex) {
  if (!root || !katex || typeof katex.render !== 'function') return;
  root.querySelectorAll('[data-tex]').forEach((el) => {
    const tex = el.getAttribute('data-tex') || '';
    const displayMode = el.classList.contains('math-block');
    try {
      katex.render(tex, el, { throwOnError: false, displayMode });
    } catch (error) {
      // Mantém o texto TeX como fallback se falhar
      el.textContent = tex;
    }
  });
}

/**
 * Aplica highlight.js dentro de um elemento, se a lib estiver disponível.
 * @param {HTMLElement} root
 * @param {Object|null} hljs
 */
export function highlightIn(root, hljs) {
  if (!root || !hljs || typeof hljs.highlightElement !== 'function') return;
  root.querySelectorAll('pre code').forEach((el) => {
    try {
      hljs.highlightElement(el);
    } catch (error) {
      // ignora blocos sem linguagem suportada
    }
  });
}
