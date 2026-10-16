/**
 * Testes da Biblioteca Teórica (US4, T059–T067) em jsdom.
 * Cobre: markdown (headings, listas, código, math, links seguros), split de
 * seções, render do unit (atribuição, "lida", anotações, "praticar"), busca,
 * anotações (CRUD) e índice lateral.
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/' });
const { window } = dom;
for (const [key, value] of [
  ['window', window],
  ['document', window.document],
  ['HTMLElement', window.HTMLElement],
  ['Node', window.Node],
  ['Event', window.Event]
]) {
  Object.defineProperty(global, key, { value, writable: true, configurable: true });
}
global.fetch = async (u) => {
  const rel = String(u).replace(/^\.\//, '');
  const content = readFileSync(join(ROOT_DIR, rel), 'utf-8');
  return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
};

const { loadLocale } = await import(new URL('../src/i18n.js', import.meta.url));
await loadLocale('pt-BR');

const { renderMarkdown, escapeHtml } = await import(new URL('../src/theory/markdown.js', import.meta.url));
const { splitSections, renderTheoryUnit } = await import(new URL('../src/theory/renderer.js', import.meta.url));
const { searchTheory, normalize, extractSnippet } = await import(new URL('../src/theory/search.js', import.meta.url));
const { getAnnotation, saveAnnotation, deleteAnnotation } = await import(new URL('../src/theory/annotations.js', import.meta.url));
const { renderTheorySidebar } = await import(new URL('../src/theory/sidebar.js', import.meta.url));

let passed = 0;
const ok = (label) => { passed += 1; console.log(`  ✅ ${label}`); };

try {
  console.log('🧪 Testes da biblioteca teórica (jsdom)...');

  // ---- Markdown ----
  {
    const md = [
      '## Título',
      '',
      'Parágrafo com **negrito**, *itálico*, `código` e [link](https://exemplo.org).',
      '',
      '- item 1',
      '- item 2',
      '',
      '```js',
      'const x = 1 < 2;',
      '```',
      '',
      'Inline $a^2+b^2=c^2$ e bloco:',
      '',
      '$$\\int_0^1 x\\,dx$$'
    ].join('\n');

    const html = renderMarkdown(md);
    assert.ok(html.includes('<h3>Título</h3>'), 'heading ## vira h3 (h1 é o título da unidade)');
    assert.ok(html.includes('<strong>negrito</strong>'), 'negrito');
    assert.ok(html.includes('<em>itálico</em>'), 'itálico');
    assert.ok(html.includes('<code>código</code>'), 'código inline');
    assert.ok(/class="language-js"/.test(html), 'bloco de código com linguagem');
    assert.ok(html.includes('1 &lt; 2'), 'código é escapado');
    assert.ok(html.includes('class="math-inline"') && html.includes('data-tex="a^2+b^2=c^2"'), 'math inline protegida');
    assert.ok(html.includes('class="math-block"'), 'math em bloco protegida');
    assert.ok(/<ul><li>item 1<\/li>/.test(html), 'lista não ordenada');
    assert.ok(html.includes('href="https://exemplo.org"'), 'link http permitido');

    // Segurança: javascript: é rejeitado
    const unsafe = renderMarkdown('[clique](javascript:alert(1))');
    assert.ok(!unsafe.includes('javascript:'), 'esquema javascript: bloqueado');
    assert.ok(unsafe.includes('clique'), 'rótulo mantido quando url é rejeitada');

    // Tabela
    const table = renderMarkdown('| A | B |\n| --- | --- |\n| 1 | 2 |');
    assert.ok(table.includes('<table>') && table.includes('<th>A</th>') && table.includes('<td>1</td>'), 'tabela GFM');
    ok('T059 renderMarkdown (headings, listas, código, math, links seguros, tabela)');
  }

  // ---- splitSections ----
  {
    const content = 'Intro sem título.\n\n## Primeira\n\ntexto 1\n\n## Segunda\n\ntexto 2';
    const sections = splitSections(content);
    assert.equal(sections.length, 3, 'intro + 2 seções');
    assert.equal(sections[1].title, 'Primeira');
    assert.equal(sections[1].id, 'primeira', 'slug sem acento/caixa');
    ok('T059 splitSections divide por ## e gera ids');
  }

  // ---- renderTheoryUnit ----
  {
    const unit = {
      id: 'th-sem1-algorithms-m01-intro',
      title: 'Introdução a Algoritmos',
      discipline: 'algorithms',
      module: 'm01',
      license: 'CC-BY-SA-4.0',
      derivation_type: 'summarized',
      language: 'pt-BR',
      verification_status: 'verified_with_source',
      linked_lessons: ['l01'],
      linked_exercises: [],
      original_excerpt: 'An algorithm is a finite sequence of instructions.',
      source: {
        title: 'Programming Fundamentals',
        authors: ['Busbee', 'Braunschweig'],
        url: 'https://press.rebus.community/programmingfundamentals/',
        chapter: 'Chapter 1',
        section: '1.1',
        access_date: '2026-10-16',
        edition: '2nd ed.',
        license_url: 'https://creativecommons.org/licenses/by-sa/4.0/',
        license_confirmed_at: '2026-10-16'
      },
      content: '## O que é um algoritmo\n\nUm **algoritmo** é uma sequência finita.\n\n## Propriedades\n\nFinito, definido, eficaz.'
    };

    let toggled = null;
    let saved = null;
    let practiced = null;
    const el = renderTheoryUnit(unit, {
      isRead: () => false,
      getAnnotation: () => '',
      onToggleRead: (id, read) => { toggled = { id, read }; },
      onSaveAnnotation: (id, text) => { saved = { id, text }; },
      onPractice: (id) => { practiced = id; }
    });
    window.document.getElementById('root').appendChild(el);

    assert.ok(el.querySelector('.theory-attribution'), 'bloco de atribuição presente');
    assert.ok(el.textContent.includes('Programming Fundamentals'), 'título da fonte exibido');
    assert.ok(el.textContent.includes('CC-BY-SA-4.0'), 'licença exibida');
    assert.equal(el.querySelectorAll('.theory-section').length, 2, 'duas seções renderizadas');
    assert.ok(el.querySelector('.verification-verified'), 'badge de verificação');

    const checkbox = el.querySelector('.theory-read-checkbox');
    checkbox.checked = true;
    checkbox.dispatchEvent(new window.Event('change'));
    assert.deepEqual(toggled, { id: 'th-sem1-algorithms-m01-intro::o-que-e-um-algoritmo', read: true }, 'checkbox de leitura dispara callback com sectionId');

    const textarea = el.querySelector('.theory-annotation textarea');
    textarea.value = 'minha nota';
    el.querySelector('.save-annotation-btn').click();
    assert.equal(saved.text, 'minha nota', 'salvar anotação dispara callback');
    assert.equal(el.querySelector('.annotation-status').hidden, false, 'confirmação de salvamento visível');

    el.querySelector('.practice-section-btn').click();
    assert.ok(typeof practiced === 'string', '"praticar este trecho" dispara callback');

    assert.ok(el.querySelector('.theory-original'), '"ver original" presente quando há excerpt');
    ok('T063/T065/T066/T067 renderTheoryUnit (atribuição, lida, anotações, praticar, ver original)');
  }

  // ---- Busca ----
  {
    assert.equal(normalize('Lógica Proposicional'), 'logica proposicional', 'normaliza acentos/caixa');
    const index = [
      { id: 'a', title: 'Lógica Proposicional', discipline: 'discrete-math', module: 'm01', content: 'Conectivos lógicos E, OU, NÃO.' },
      { id: 'b', title: 'Variáveis', discipline: 'algorithms', module: 'm02', content: 'Tipos primitivos.' }
    ];
    const results = searchTheory(index, 'logica');
    assert.equal(results.length, 1, 'busca ignora acento');
    assert.equal(results[0].id, 'a', 'acerta a unidade');
    assert.ok(results[0].snippet.length > 0, 'gera snippet');
    assert.equal(searchTheory(index, 'inexistente').length, 0, 'sem resultados');
    assert.equal(searchTheory(index, '').length, 0, 'query vazia não retorna nada');
    assert.ok(extractSnippet('abcdefghij', 'def', 2).includes('def'), 'snippet contém o termo');
    ok('T062 searchTheory (case/acento-insensível, snippet)');
  }

  // ---- Anotações ----
  {
    const progress = {};
    saveAnnotation(progress, 'u1', 's1', '  nota  ');
    assert.equal(getAnnotation(progress, 'u1', 's1'), 'nota', 'salva e apara');
    saveAnnotation(progress, 'u1', 's1', '   ');
    assert.equal(getAnnotation(progress, 'u1', 's1'), '', 'vazio remove');
    saveAnnotation(progress, 'u1', 's2', 'outra');
    deleteAnnotation(progress, 'u1', 's2');
    assert.equal(getAnnotation(progress, 'u1', 's2'), '', 'delete remove');
    ok('T061 annotations (get/save/delete por seção)');
  }

  // ---- Sidebar ----
  {
    const index = [
      { id: 'a', title: 'Unidade A', discipline: 'algorithms', disciplineTitle: 'Algoritmos' },
      { id: 'b', title: 'Unidade B', discipline: 'algorithms', disciplineTitle: 'Algoritmos' },
      { id: 'c', title: 'Unidade C', discipline: 'discrete-math', disciplineTitle: 'Matemática Discreta' }
    ];
    const aside = renderTheorySidebar(index, 'b');
    window.document.getElementById('root').appendChild(aside);
    assert.equal(aside.querySelectorAll('a').length, 3, 'três links');
    const active = aside.querySelector('a.active');
    assert.equal(active.dataset.nav, '/theory/b', 'destaca a unidade atual');
    assert.equal(active.getAttribute('aria-current'), 'page', 'aria-current na atual');
    ok('T060 renderTheorySidebar (agrupa e destaca atual)');
  }

  console.log(`\n✅ Todos os testes teóricos passaram (${passed}).`);
} catch (error) {
  console.error('❌ Teste teórico falhou:', error);
  process.exit(1);
}
