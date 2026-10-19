/**
 * Testes de múltipla escolha (jsdom): embaralhamento determinístico na
 * exibição, correção por identidade, opções fixas no fim e auditoria do texto.
 *
 * Requisitos cobertos:
 * - para TODOS os exercícios de múltipla escolha e várias tentativas, a opção
 *   correta é aceita e todas as outras são rejeitadas;
 * - a ordem é estável entre renderizações da mesma tentativa e muda na seguinte;
 * - opções que dependem de posição ("Todas as anteriores", "A e B", ...) ficam
 *   no fim, na ordem original; `shuffle: false` preserva a ordem dos dados;
 * - em 1000 tentativas, cada posição da resposta correta fica entre 15% e 35%;
 * - nenhuma explicação/feedback cita letras ou posições ("alternativa A").
 */

import { strict as assert } from 'assert';
import { readFileSync, readdirSync, statSync } from 'fs';
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
  ['Event', window.Event],
  ['KeyboardEvent', window.KeyboardEvent]
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

const { renderMultipleChoice } = await import(
  new URL('../src/lesson/exercise-types/multiple-choice.js', import.meta.url)
);
const { getDisplayOptions, isFixedOption } = await import(
  new URL('../src/lesson/option-shuffle.js', import.meta.url)
);
const { renderLesson } = await import(
  new URL('../src/lesson/renderer.js', import.meta.url)
);

let passed = 0;
function ok(label) {
  passed += 1;
  console.log(`  ✅ ${label}`);
}

function readExerciseFiles() {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name.endsWith('.json') && !name.startsWith('_')) files.push(path);
    }
  };
  walk(join(ROOT_DIR, 'data', 'exercises'));
  return files;
}

function loadMultipleChoice() {
  const exercises = [];
  for (const file of readExerciseFiles()) {
    const parsed = JSON.parse(readFileSync(file, 'utf8'));
    const list = Array.isArray(parsed) ? parsed : [parsed];
    for (const exercise of list) {
      if (exercise.type === 'multiple-choice') exercises.push(exercise);
    }
  }
  return exercises;
}

function render(exercise, attempt, onAnswer = () => {}) {
  return renderMultipleChoice(exercise, {
    attempt,
    streak: 0,
    calculateXP: () => 10,
    onAnswer
  });
}

function displayOrder(element) {
  return [...element.querySelectorAll('.option-option')].map((label) =>
    Number(label.dataset.originalIndex)
  );
}

function chooseByOriginalIndex(element, originalIndex) {
  const radio = [...element.querySelectorAll('input[type="radio"]')].find(
    (input) => Number(input.value) === originalIndex
  );
  assert.ok(radio, `opção de identidade ${originalIndex} existe no DOM`);
  radio.checked = true;
  radio.dispatchEvent(new window.Event('change', { bubbles: true }));
  element.querySelector('.submit-btn').click();
}

const baseExercise = {
  id: 'ex-sem1-algorithms-m01-l01-synthetic',
  type: 'multiple-choice',
  prompt: 'Pergunta sintética para o teste de embaralhamento.',
  explanation: 'Explicação sintética usada apenas pelo teste automatizado.',
  difficulty: 'easy',
  xp_base: 10,
  options: ['Opção zero', 'Opção um', 'Opção dois', 'Opção três'],
  correct: 0
};

try {
  console.log('🧪 Testes de múltipla escolha (jsdom)...');

  const allMultipleChoice = loadMultipleChoice();
  assert.ok(allMultipleChoice.length > 0, 'há exercícios reais de múltipla escolha');
  ok(`${allMultipleChoice.length} exercícios reais de múltipla escolha carregados`);

  // ---------------------------------------------------------------
  // 1. Todos os exercícios, várias tentativas: correção por identidade.
  // ---------------------------------------------------------------
  const attempts = [1, 2, 3, 7, 19];
  let accepted = 0;
  let rejected = 0;

  for (const exercise of allMultipleChoice) {
    for (const attempt of attempts) {
      const orderA = displayOrder(render(exercise, attempt));
      const orderB = displayOrder(render(exercise, attempt));
      assert.deepEqual(orderA, orderB, `${exercise.id} (tentativa ${attempt}): ordem estável`);

      // A ordem exibida contém todas as opções exatamente uma vez.
      assert.deepEqual(
        [...orderA].sort((a, b) => a - b),
        exercise.options.map((_, index) => index),
        `${exercise.id}: nenhuma opção some ou duplica`
      );

      let correctAnswer = null;
      const correctEl = render(exercise, attempt, (result) => { correctAnswer = result; });
      chooseByOriginalIndex(correctEl, exercise.correct);
      assert.equal(correctAnswer?.correct, true, `${exercise.id} (t${attempt}): correta aceita`);
      assert.equal(
        correctAnswer?.selectedIndex,
        exercise.correct,
        `${exercise.id}: selectedIndex é o índice original`
      );
      accepted += 1;

      for (let originalIndex = 0; originalIndex < exercise.options.length; originalIndex += 1) {
        if (originalIndex === exercise.correct) continue;
        let wrongAnswer = null;
        const wrongEl = render(exercise, attempt, (result) => { wrongAnswer = result; });
        chooseByOriginalIndex(wrongEl, originalIndex);
        assert.equal(
          wrongAnswer?.correct,
          false,
          `${exercise.id} (t${attempt}): opção ${originalIndex} rejeitada`
        );
        rejected += 1;
      }
    }
  }
  ok(`correção por identidade: ${accepted} acertos aceitos, ${rejected} distratores rejeitados`);

  // ---------------------------------------------------------------
  // 2. A ordem muda a cada nova tentativa e os dados não mudam de ordem.
  // ---------------------------------------------------------------
  for (const exercise of allMultipleChoice) {
    const snapshot = [...exercise.options];
    let previous = displayOrder(render(exercise, 1));
    for (let attempt = 2; attempt <= 12; attempt += 1) {
      const current = displayOrder(render(exercise, attempt));
      assert.notDeepEqual(
        current,
        previous,
        `${exercise.id}: a ordem muda entre as tentativas ${attempt - 1} e ${attempt}`
      );
      previous = current;
    }
    assert.deepEqual(exercise.options, snapshot, `${exercise.id}: dados originais não foram alterados`);
  }
  ok('ordem estável na mesma tentativa e diferente na tentativa seguinte (sem tocar nos dados)');

  // ---------------------------------------------------------------
  // 3. Opções que dependem de posição ficam fixas no fim.
  // ---------------------------------------------------------------
  const fixedExamples = [
    'Todas as anteriores',
    'Nenhuma das alternativas acima',
    'Ambas',
    'Ambas as opções',
    'A e B',
    'A, B e C',
    'Somente I e II',
    'I, II e III'
  ];
  const notFixed = ['Nenhum garante', 'Ambos garantem', 'A e B são equivalentes?'];
  for (const option of fixedExamples) assert.equal(isFixedOption(option), true, `fixa: "${option}"`);
  for (const option of notFixed) assert.equal(isFixedOption(option), false, `não fixa: "${option}"`);

  const pinned = {
    ...baseExercise,
    id: 'ex-sem1-algorithms-m01-l01-pinned',
    options: ['Todas as anteriores', 'Opção A', 'Nenhuma das anteriores', 'Opção B'],
    correct: 1
  };
  for (let attempt = 1; attempt <= 50; attempt += 1) {
    const order = displayOrder(render(pinned, attempt));
    assert.deepEqual(order.slice(-2), [0, 2], `tentativa ${attempt}: fixas no fim, na ordem original`);
    assert.deepEqual(order.slice(0, 2).sort((a, b) => a - b), [1, 3], 'opções normais vêm antes');
  }
  ok('opções dependentes de posição ficam sempre no fim (e na ordem original)');

  // ---------------------------------------------------------------
  // 4. `shuffle: false` preserva a ordem autoral.
  // ---------------------------------------------------------------
  const noShuffle = { ...baseExercise, id: 'ex-sem1-algorithms-m01-l01-noshuffle', shuffle: false };
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    assert.deepEqual(displayOrder(render(noShuffle, attempt)), [0, 1, 2, 3], `shuffle:false (t${attempt})`);
  }
  assert.deepEqual(
    getDisplayOptions(['Todas as anteriores', 'X'], { exerciseId: 'x', attempt: 3, shuffle: false })
      .map((item) => item.originalIndex),
    [0, 1],
    'shuffle:false também não move fixas'
  );
  ok('shuffle:false mantém a ordem dos dados');

  // ---------------------------------------------------------------
  // 5. O renderizador da lição repassa `_attempt` ao exercício.
  // ---------------------------------------------------------------
  {
    const lessonExercise = { ...baseExercise, id: 'ex-sem1-algorithms-m01-l01-lesson', _attempt: 3 };
    const lessonEl = renderLesson(
      { id: 'l01', title: 'Lição sintética', exercises: [lessonExercise] },
      { getStreak: () => 0, onAnswer: () => {}, onComplete: () => {} }
    );
    assert.deepEqual(
      displayOrder(lessonEl),
      getDisplayOptions(lessonExercise.options, { exerciseId: lessonExercise.id, attempt: 3 })
        .map((item) => item.originalIndex),
      'renderLesson usa _attempt como semente'
    );
    ok('renderLesson repassa a tentativa (semente) ao exercício');
  }

  // ---------------------------------------------------------------
  // 6. Teclado e ARIA seguem a ordem exibida.
  // ---------------------------------------------------------------
  {
    const exercise = { ...baseExercise, id: 'ex-sem1-algorithms-m01-l01-keyboard', correct: 2 };
    let answer = null;
    const el = render(exercise, 5, (result) => { answer = result; });
    const labels = [...el.querySelectorAll('.option-option')];
    assert.deepEqual(
      labels.map((label) => label.querySelector('.option-letter').textContent),
      ['A', 'B', 'C', 'D'],
      'letras das opções seguem a ordem exibida'
    );
    assert.equal(el.querySelector('.exercise-options').getAttribute('role'), 'radiogroup');

    const inputs = [...el.querySelectorAll('input[type="radio"]')];
    assert.deepEqual(
      inputs.map((input) => Number(input.value)),
      displayOrder(el),
      'inputs (foco/aria) estão na ordem exibida e guardam a identidade'
    );

    el.dispatchEvent(new window.KeyboardEvent('keydown', { key: '1', bubbles: true }));
    assert.equal(inputs[0].checked, true, 'tecla 1 seleciona a 1ª opção exibida');
    assert.equal(answer, null, 'tecla 1 ainda não envia');

    el.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    assert.equal(answer?.selectedIndex, Number(inputs[0].value), 'Enter envia a identidade da 1ª opção exibida');
    ok('teclado (1..9/Enter) e ARIA seguem a ordem exibida, enviando o índice original');
  }

  // ---------------------------------------------------------------
  // 7. Distribuição em 1000 tentativas: cada posição entre 15% e 35%.
  // ---------------------------------------------------------------
  {
    const exercise = { ...baseExercise, id: 'ex-sem1-algorithms-m01-l01-distribution', correct: 0 };
    const counts = [0, 0, 0, 0];
    let previous = null;
    for (let attempt = 1; attempt <= 1000; attempt += 1) {
      const el = render(exercise, attempt);
      const order = displayOrder(el);
      if (previous) {
        assert.notDeepEqual(order, previous, `distribuição: tentativa ${attempt} difere da anterior`);
      }
      previous = order;
      const correctPosition = order.indexOf(exercise.correct);
      assert.ok(correctPosition >= 0, 'posição da correta existe');
      counts[correctPosition] += 1;
    }
    for (let position = 0; position < counts.length; position += 1) {
      const share = counts[position] / 1000;
      assert.ok(
        share >= 0.15 && share <= 0.35,
        `posição ${position} apareceu ${(share * 100).toFixed(1)}% (esperado 15%–35%)`
      );
    }
    ok(`1000 tentativas: distribuição da correta = ${counts.join(' / ')} (15%–35% cada)`);
  }

  // ---------------------------------------------------------------
  // 8. Auditoria de texto: explicações/feedback não citam letras/posições.
  // ---------------------------------------------------------------
  {
    const forbidden = [
      /\b(?:alternativa|op[cç][aã]o|letra)\s+[A-F]\b/i,
      /\b(?:primeira|segunda|terceira|quarta|quinta|[úu]ltima|pen[úu]ltima)\s+(?:alternativa|op[cç][aã]o)\b/i,
      /\b(?:alternativa|op[cç][aã]o)\s+(?:acima|abaixo|anterior|seguinte)\b/i
    ];
    const findings = [];
    for (const exercise of allMultipleChoice) {
      const values = [exercise.prompt, exercise.explanation, ...(exercise.options || [])];
      for (const value of values) {
        for (const pattern of forbidden) {
          if (pattern.test(String(value ?? ''))) {
            findings.push(`${exercise.id}: "${String(value).match(pattern)[0]}"`);
          }
        }
      }
    }
    assert.deepEqual(findings, [], `textos que citam letra/posição: ${findings.join(' | ')}`);
    ok('auditoria: nenhuma explicação/opção cita letras ou posições');
  }

  console.log(`\n✅ Todos os testes de múltipla escolha passaram (${passed}).`);
} catch (error) {
  console.error('❌ Teste de múltipla escolha falhou:', error);
  process.exit(1);
}
