/**
 * Testes de lição (jsdom): renderização + feedback dos 5 tipos de exercício
 * (T042–T046) e utilitários de código (T045).
 *
 * Executa em jsdom sem tocar em src/app.js — monta os componentes diretamente
 * com dados sintéticos e simula as interações reais (clicar, digitar).
 */

import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = dirname(__dirname);

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/'
});
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

// fetch local para o i18n
global.fetch = async (u) => {
  const rel = String(u).replace(/^\.\//, '');
  const content = readFileSync(join(ROOT_DIR, rel), 'utf-8');
  return { ok: true, status: 200, json: async () => JSON.parse(content), text: async () => content };
};

const { loadLocale, t } = await import(new URL('../src/i18n.js', import.meta.url));
await loadLocale('pt-BR');

const { renderMultipleChoice } = await import(new URL('../src/lesson/exercise-types/multiple-choice.js', import.meta.url));
const { renderTrueFalse } = await import(new URL('../src/lesson/exercise-types/true-false.js', import.meta.url));
const { renderOrderSteps } = await import(new URL('../src/lesson/exercise-types/order-steps.js', import.meta.url));
const { renderCodeCompletion, normalizeCode, checkJavaScriptSyntax } = await import(new URL('../src/lesson/exercise-types/code-completion.js', import.meta.url));
const { renderFlashcards } = await import(new URL('../src/lesson/exercise-types/flashcards.js', import.meta.url));
const { renderLesson, getExerciseRenderer } = await import(new URL('../src/lesson/renderer.js', import.meta.url));

const root = window.document.getElementById('root');
const mount = (el) => {
  const holder = window.document.createElement('div');
  holder.appendChild(el);
  root.appendChild(holder);
  return holder;
};

function makeExercise(overrides) {
  return {
    id: 'ex-sem1-algorithms-m01-l01-test',
    theory_unit_id: 'th-sem1-algorithms-m01-intro',
    lesson_id: 'l01',
    generated_by_ai: true,
    prompt: 'Pergunta de teste com mais de 10 caracteres.',
    explanation: 'Explicação de referência com mais de vinte caracteres.',
    difficulty: 'easy',
    xp_base: 10,
    ...overrides
  };
}

let passed = 0;
function ok(label) {
  passed += 1;
  console.log(`  ✅ ${label}`);
}

try {
  console.log('🧪 Testes de lição (jsdom): 5 tipos de exercício...');

  // ---------- T042: múltipla escolha ----------
  {
    let answer = null;
    const ex = makeExercise({ type: 'multiple-choice', options: ['A', 'B', 'C'], correct: 1 });
    const el = renderMultipleChoice(ex, {
      streak: 0,
      calculateXP: () => 15,
      onAnswer: (r) => { answer = r; }
    });
    mount(el);
    const radios = el.querySelectorAll('input[type="radio"]');
    radios[1].checked = true;
    radios[1].dispatchEvent(new window.Event('change'));
    el.querySelector('.submit-btn').click();
    assert.equal(answer?.correct, true, 'múltipla escolha deveria marcar correto');
    assert.equal(answer?.xpEarned, 15, 'XP deveria vir do calculateXP');
    assert.ok(/feedback-correct/.test(el.querySelector('.exercise-feedback').className), 'feedback correto visível');
    assert.equal(el.querySelector('.exercise-explanation').hidden, false, 'explicação visível');
    ok('T042 múltipla escolha renderiza, responde e mostra feedback');
  }

  // ---------- T043: verdadeiro/falso ----------
  {
    let answer = null;
    const ex = makeExercise({ type: 'true-false', options: ['Verdadeiro', 'Falso'], correct: 0 });
    const el = renderTrueFalse(ex, { streak: 0, calculateXP: () => 12, onAnswer: (r) => { answer = r; } });
    mount(el);
    el.querySelector('.tf-true').click();
    assert.equal(answer?.correct, true, 'V/F deveria marcar correto');
    assert.ok(/feedback-correct/.test(el.querySelector('.exercise-feedback').className));
    ok('T043 verdadeiro/falso renderiza, responde e mostra feedback');
  }

  // ---------- T044: ordenar passos ----------
  {
    let answer = null;
    // options já na ordem CORRETA; correct = [0,1,2]
    const ex = makeExercise({ type: 'order-steps', options: ['Passo 1', 'Passo 2', 'Passo 3'], correct: [0, 1, 2] });
    const el = renderOrderSteps(ex, { streak: 0, calculateXP: () => 10, onAnswer: (r) => { answer = r; } });
    mount(el);
    el.querySelector('.submit-btn').click();
    assert.equal(answer?.correct, true, 'ordenar deveria marcar correto quando ordem inicial é a correta');
    ok('T044 ordenar passos renderiza, valida ordem e mostra feedback');
  }

  // ---------- T045: completar código ----------
  {
    assert.equal(normalizeCode('  let a = 1;  \n\n'), 'let a = 1;', 'normalizeCode apara e colapsa');
    assert.equal(checkJavaScriptSyntax('let a = 1;').ok, true, 'sintaxe válida reconhecida');
    assert.equal(checkJavaScriptSyntax('let a = ;').ok, false, 'sintaxe inválida detectada');

    let answer = null;
    const solution = 'function soma(a, b) { return a + b; }';
    const ex = makeExercise({
      type: 'code-completion',
      starter_code: 'function soma(a, b) {\n  \n}',
      correct: solution,
      test_command: 'node --check',
      language: 'javascript'
    });
    const el = renderCodeCompletion(ex, { streak: 0, calculateXP: () => 15, onAnswer: (r) => { answer = r; } });
    mount(el);
    el.querySelector('.code-input').value = solution;
    el.querySelector('.check-btn').click();
    assert.equal(answer?.correct, true, 'código igual à referência deveria ser correto');
    ok('T045 completar código renderiza, valida sintaxe/solução e mostra feedback');
  }

  // ---------- T046: flashcards ----------
  {
    let answer = null;
    const ex = makeExercise({ type: 'flashcards', starter_code: 'Resposta do cartão', correct: 'Resposta do cartão' });
    const el = renderFlashcards(ex, { streak: 0, calculateXP: () => 8, onAnswer: (r) => { answer = r; } });
    mount(el);
    el.querySelector('.flip-btn').click();
    assert.equal(el.querySelector('.flashcard-back').hidden, false, 'verso do cartão visível após virar');
    el.querySelector('.known-btn').click();
    assert.equal(answer?.correct, true, '"já sei" conta como acerto');
    ok('T046 flashcards viram o cartão e registram conhecido/desconhecido');
  }

  // ---------- Renderizador de lição ----------
  {
    assert.equal(typeof getExerciseRenderer('multiple-choice'), 'function', 'renderer registrado');
    assert.equal(getExerciseRenderer('inexistente'), null, 'tipo desconhecido retorna null');

    let answered = 0;
    let completed = null;
    const lesson = {
      id: 'l01',
      title: 'Lição de teste',
      theoryUnitId: 'th-sem1-algorithms-m01-intro',
      summary: '<p>Resumo curto de teste.</p>',
      exercises: [
        makeExercise({ id: 'ex-sem1-algorithms-m01-l01-a', type: 'true-false', options: ['V', 'F'], correct: 0 }),
        makeExercise({ id: 'ex-sem1-algorithms-m01-l01-b', type: 'multiple-choice', options: ['A', 'B'], correct: 1 })
      ]
    };
    const el = renderLesson(lesson, {
      getStreak: () => 0,
      calculateXP: () => 10,
      onAnswer: () => { answered += 1; },
      onComplete: (stats) => { completed = stats; }
    });
    mount(el);
    assert.equal(el.querySelectorAll('.exercise-item').length, 2, 'dois itens de exercício');
    assert.ok(el.querySelector('.lesson-completion').hidden, 'conclusão oculta antes de responder');

    el.querySelector('.tf-true').click();
    el.querySelectorAll('input[type="radio"]')[1].checked = true;
    el.querySelectorAll('input[type="radio"]')[1].dispatchEvent(new window.Event('change'));
    el.querySelectorAll('.submit-btn')[el.querySelectorAll('.submit-btn').length - 1].click();

    assert.equal(answered, 2, 'os dois exercícios notificaram resposta');
    assert.equal(el.querySelector('.lesson-completion').hidden, false, 'bloco de conclusão aparece após responder tudo');
    el.querySelector('.finish-btn').click();
    assert.equal(completed?.total, 2, 'conclusão recebe o total de exercícios');
    ok('renderLesson monta resumo + lista, progride e conclui');
  }

  console.log(`\n✅ Todos os testes de lição passaram (${passed}).`);
} catch (error) {
  console.error('❌ Teste de lição falhou:', error);
  process.exit(1);
}
