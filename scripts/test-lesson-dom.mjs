/**
 * Testes de lição (jsdom): renderização + interação dos 5 tipos de exercício.
 *
 * Cobre T042–T046 e audita a consistência "o que a tela pede = o que a
 * verificação compara" para cada tipo. Em especial, completar código: a lacuna
 * é um input inline (não um textarea com o código inteiro) e a verificação
 * compara APENAS o conteúdo das lacunas com `accepted_answers`.
 *
 * Executa em jsdom sem tocar em src/app.js — monta os componentes diretamente
 * com dados sintéticos e simula as interações reais (clicar, digitar, teclar).
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
  ['Event', window.Event],
  ['KeyboardEvent', window.KeyboardEvent]
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
const {
  renderCodeCompletion,
  normalizeBlankAnswer,
  answersMatch,
  countBlanks
} = await import(new URL('../src/lesson/exercise-types/code-completion.js', import.meta.url));
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

/** Renderiza um code-completion e expõe as respostas capturadas por `onAnswer`. */
function mountCodeCompletion(overrides) {
  const state = { answer: null, answers: [] };
  const ex = makeExercise({ type: 'code-completion', ...overrides });
  const el = renderCodeCompletion(ex, {
    streak: 0,
    calculateXP: () => 20,
    onAnswer: (r) => { state.answer = r; state.answers.push(r); }
  });
  mount(el);
  return { el, state };
}

let passed = 0;
function ok(label) {
  passed += 1;
  console.log(`  ✅ ${label}`);
}

try {
  console.log('🧪 Testes de lição (jsdom): 5 tipos de exercício...');

  // ===================================================================
  // T042 — múltipla escolha: a tela pede escolher 1 opção; a verificação
  // compara o índice escolhido com `correct`.
  // ===================================================================
  {
    const ex = makeExercise({ type: 'multiple-choice', options: ['A', 'B', 'C'], correct: 1 });

    // Acerto: escolher a opção correta pela identidade (value = índice original)
    let answer = null;
    const el = renderMultipleChoice(ex, { attempt: 1, streak: 0, calculateXP: () => 15, onAnswer: (r) => { answer = r; } });
    mount(el);
    const radios = el.querySelectorAll('input[type="radio"]');
    const correctRadio = [...radios].find((radio) => Number(radio.value) === ex.correct);
    correctRadio.checked = true;
    correctRadio.dispatchEvent(new window.Event('change'));
    el.querySelector('.submit-btn').click();
    assert.equal(answer?.correct, true, 'múltipla escolha: opção correta marca correto');
    assert.equal(answer?.xpEarned, 15, 'XP deveria vir do calculateXP');
    assert.ok(/feedback-correct/.test(el.querySelector('.exercise-feedback').className), 'feedback correto visível');
    assert.equal(el.querySelector('.exercise-explanation').hidden, false, 'explicação visível');
    assert.ok(
      el.querySelector('.option-option[data-original-index="1"]').classList.contains('correct'),
      'opção correta destacada pela identidade'
    );

    // Erro: escolher outra opção => incorreto (a tela não premia "qualquer clique")
    let wrong = null;
    const el2 = renderMultipleChoice(ex, { attempt: 2, streak: 0, calculateXP: () => 15, onAnswer: (r) => { wrong = r; } });
    mount(el2);
    const radios2 = el2.querySelectorAll('input[type="radio"]');
    const wrongRadio = [...radios2].find((radio) => Number(radio.value) !== ex.correct);
    const wrongOriginalIndex = Number(wrongRadio.value);
    wrongRadio.checked = true;
    wrongRadio.dispatchEvent(new window.Event('change'));
    el2.querySelector('.submit-btn').click();
    assert.equal(wrong?.correct, false, 'múltipla escolha: opção errada marca incorreto');
    assert.equal(wrong?.selectedIndex, wrongOriginalIndex, 'a verificação usa o índice original escolhido');

    // Submeter sem escolher nada não deve registrar resposta
    let noAnswer = null;
    const el3 = renderMultipleChoice(ex, { streak: 0, calculateXP: () => 15, onAnswer: (r) => { noAnswer = r; } });
    mount(el3);
    el3.querySelector('.submit-btn').click();
    assert.equal(noAnswer, null, 'múltipla escolha: sem seleção, nada é verificado');
    ok('T042 múltipla escolha: o que a tela pede = o que a verificação compara');
  }

  // ===================================================================
  // T043 — verdadeiro/falso: dois botões; verificação compara `correct` (0/1).
  // ===================================================================
  {
    const ex = makeExercise({ type: 'true-false', options: ['Verdadeiro', 'Falso'], correct: 0 });

    let answer = null;
    const el = renderTrueFalse(ex, { streak: 0, calculateXP: () => 12, onAnswer: (r) => { answer = r; } });
    mount(el);
    el.querySelector('.tf-true').click();
    assert.equal(answer?.correct, true, 'V/F: "Verdadeiro" (correct=0) marca correto');
    assert.ok(/feedback-correct/.test(el.querySelector('.exercise-feedback').className));

    let wrong = null;
    const el2 = renderTrueFalse(ex, { streak: 0, calculateXP: () => 12, onAnswer: (r) => { wrong = r; } });
    mount(el2);
    el2.querySelector('.tf-false').click();
    assert.equal(wrong?.correct, false, 'V/F: "Falso" marca incorreto quando a resposta é 0');
    assert.equal(wrong?.selectedIndex, 1, 'a verificação usa o valor do botão clicado');
    ok('T043 verdadeiro/falso: o que a tela pede = o que a verificação compara');
  }

  // ===================================================================
  // T044 — ordenar passos: a tela pede reordenar; a verificação compara a
  // ordem ATUAL do DOM com `correct`.
  // ===================================================================
  {
    // options já embaralhadas; ordem correta = [1, 2, 0] (B, C, A)
    const ex = makeExercise({ type: 'order-steps', options: ['A', 'B', 'C'], correct: [1, 2, 0] });

    // Ordem inicial (A,B,C) != correta => incorreto
    let wrong = null;
    const el = renderOrderSteps(ex, { streak: 0, calculateXP: () => 10, onAnswer: (r) => { wrong = r; } });
    mount(el);
    el.querySelector('.submit-btn').click();
    assert.equal(wrong?.correct, false, 'ordenar: ordem inicial embaralhada é incorreta');
    // Destaque consistente com o resultado: posições fora do lugar ficam marcadas
    assert.equal(el.querySelectorAll('.step-item.correct-position').length, 0, 'nenhuma posição correta no erro');

    // Reordenar de verdade para [B, C, A] e verificar => correto
    let answer = null;
    const el2 = renderOrderSteps(ex, { streak: 0, calculateXP: () => 10, onAnswer: (r) => { answer = r; } });
    mount(el2);
    el2.querySelector('.step-item[data-original-index="1"] .move-up').click(); // B sobe
    el2.querySelector('.step-item[data-original-index="2"] .move-up').click(); // C sobe
    el2.querySelector('.submit-btn').click();
    assert.equal(answer?.correct, true, 'ordenar: reordenar para a sequência correta marca correto');
    assert.deepEqual(answer?.selectedIndex, [1, 2, 0], 'a verificação usa a ordem atual do DOM');
    // Regressão: o destaque deve seguir a ordem ATUAL (senão contradiz o resultado)
    const items = el2.querySelectorAll('.step-item');
    assert.equal(items.length, 3);
    assert.equal(el2.querySelectorAll('.step-item.correct-position').length, 3, 'destaque consistente com o acerto');
    ok('T044 ordenar passos: o que a tela pede = o que a verificação compara');
  }

  // ===================================================================
  // T045 — completar código: lacunas inline + verificação por accepted_answers
  // ===================================================================
  {
    // --- Utilitários de normalização/comparação ---
    // Formatação irrelevante: espaços em volta de operadores/pontuação somem.
    assert.equal(normalizeBlankAnswer(' (A + B) / 2 '), '(A+B)/2', 'remove espaços só ao redor de operadores');
    assert.equal(normalizeBlankAnswer('lista[0] , x : y = z'), 'lista[0],x:y=z', 'pontuação também normaliza');
    assert.equal(normalizeBlankAnswer('a  *   b'), 'a*b', 'colapsa e remove espaços repetidos em volta de operador');
    assert.equal(normalizeBlankAnswer('not  x'), 'not x', 'colapsa espaços repetidos entre palavras');
    assert.equal(normalizeBlankAnswer('a   and    b'), 'a and b', 'mantém um espaço entre palavras');
    assert.equal(normalizeBlankAnswer('  x  '), 'x', 'remove espaços nas pontas');
    assert.equal(normalizeBlankAnswer('\u201Cx\u2019'), '"x\'', 'normaliza aspas tipográficas');

    // Conteúdo entre aspas é preservado (não vira "ab").
    assert.equal(normalizeBlankAnswer('print("a b")'), 'print("a b")', 'não altera espaços dentro de aspas');
    assert.equal(normalizeBlankAnswer("print('a  b')"), "print('a  b')", 'preserva aspas simples (inclusive espaços repetidos)');
    assert.equal(normalizeBlankAnswer('mensagem = "ola  mundo"'), 'mensagem="ola  mundo"', 'normaliza fora das aspas, preserva dentro');

    // Equivalências de formatação continuam aceitas.
    assert.ok(answersMatch('(idade1+idade2)/2', ['(idade1 + idade2) / 2']), 'equivalência só de espaços');
    assert.ok(answersMatch('x = 1 + 2', ['x=1+2']), 'espaços em volta de operadores são ignorados');
    assert.ok(answersMatch('not   x', ['not x']), 'espaços repetidos entre palavras são colapsados');
    assert.ok(answersMatch('(idade2 + idade1) / 2', ['(idade1 + idade2) / 2', '(idade2 + idade1) / 2']), 'aceita equivalência listada');

    // Respostas ERRADAS que a normalização antiga (remover TODOS os espaços) aceitaria.
    assert.ok(!answersMatch('notx', ['not x']), 'REGRESSÃO: "notx" não pode casar com "not x"');
    assert.ok(!answersMatch('aandb', ['a and b']), 'REGRESSÃO: "aandb" não pode casar com "a and b"');
    assert.ok(!answersMatch('x andy', ['x and y']), 'REGRESSÃO: "x andy" não pode casar com "x and y"');
    assert.ok(!answersMatch('print("ab")', ['print("a b")']), 'REGRESSÃO: conteúdo entre aspas não pode ser esvaziado');
    assert.ok(!answersMatch('"ab"', ['"a b"']), 'REGRESSÃO: "ab" não pode casar com "a b"');

    // Respostas realmente diferentes nunca casam.
    assert.ok(!answersMatch('(idade1 - idade2)/2', ['(idade1 + idade2) / 2']), 'resposta diferente não casa');
    assert.ok(!answersMatch('', ['x']), 'resposta vazia nunca casa');
    assert.ok(!answersMatch('   ', ['x']), 'resposta só com espaços nunca casa');
    assert.equal(countBlanks('a = ___\nb = ___'), 2, 'conta as lacunas');
  }

  {
    // --- O código é FIXO; a lacuna é um input inline (sem textarea) ---
    const single = {
      code: 'media = ___\nprint(media)',
      language: 'python',
      blanks: [{ accepted_answers: ['(idade1 + idade2) / 2', '(idade2 + idade1) / 2'] }]
    };
    const { el } = mountCodeCompletion(single);
    assert.ok(el.querySelector('.code-block'), 'código renderizado em bloco fixo');
    assert.equal(el.querySelector('textarea'), null, 'não há mais textarea editável');
    assert.equal(el.querySelectorAll('.code-blank').length, 1, 'uma lacuna vira um input');
    assert.ok(
      el.querySelector('.code-block code').textContent.includes('media = '),
      'o texto do código aparece como texto fixo'
    );
    // Largura fixa via CSS (não revela o tamanho da resposta)
    const css = readFileSync(join(ROOT_DIR, 'src/ui/theme.css'), 'utf-8');
    const blankRule = (css.match(/\.code-blank\s*\{[^}]*\}/s) || [''])[0];
    assert.ok(/width:\s*\d+ch/.test(blankRule), 'a lacuna tem largura fixa (não proporcional à resposta)');
  }

  {
    // --- Cada resposta aceita marca correto (inclusive variações de espaço/aspas) ---
    const single = {
      code: 'media = ___',
      language: 'python',
      blanks: [{ accepted_answers: ['(idade1 + idade2) / 2', '(idade2 + idade1) / 2'] }]
    };
    const variants = ['(idade1 + idade2) / 2', '(idade2 + idade1) / 2', '  (idade1+idade2)/2  '];
    for (const value of variants) {
      const { el, state } = mountCodeCompletion(single);
      el.querySelector('.code-blank').value = value;
      el.querySelector('.check-btn').click();
      assert.equal(state.answer?.correct, true, `resposta aceita "${value}" marca correto`);
    }
  }

  {
    // --- Resposta errada => incorreto, com resposta de referência + explicação ---
    const single = {
      code: 'media = ___',
      language: 'python',
      blanks: [{ accepted_answers: ['(idade1 + idade2) / 2'] }]
    };
    const { el, state } = mountCodeCompletion(single);
    el.querySelector('.code-blank').value = '(idade1 - idade2) / 2';
    el.querySelector('.check-btn').click();
    assert.equal(state.answer?.correct, false, 'resposta errada marca incorreto');
    const fb = el.querySelector('.exercise-feedback');
    assert.ok(fb.textContent.includes('Lacuna 1'), 'feedback identifica a lacuna errada');
    assert.ok(fb.textContent.includes('(idade1 + idade2) / 2'), 'feedback mostra a resposta de referência');
    assert.equal(el.querySelector('.exercise-explanation').hidden, false, 'explicação visível');
    assert.ok(el.querySelector('.code-blank').classList.contains('incorrect'), 'a lacuna errada é destacada');
  }

  {
    // --- Lacuna vazia não conta como correto ---
    const single = {
      code: 'media = ___',
      language: 'python',
      blanks: [{ accepted_answers: ['(idade1 + idade2) / 2'] }]
    };
    const { el, state } = mountCodeCompletion(single);
    el.querySelector('.check-btn').click();
    assert.equal(state.answer?.correct, false, 'lacuna vazia não conta como correto');
  }

  {
    // --- Digitar o código inteiro dentro da lacuna não conta como correto ---
    const single = {
      code: 'media = ___\nprint(media)',
      language: 'python',
      blanks: [{ accepted_answers: ['(idade1 + idade2) / 2'] }]
    };
    const { el, state } = mountCodeCompletion(single);
    el.querySelector('.code-blank').value = 'media = (idade1 + idade2) / 2\nprint(media)';
    el.querySelector('.check-btn').click();
    assert.equal(state.answer?.correct, false, 'digitar o código inteiro na lacuna não conta como correto');
  }

  {
    // --- Enter verifica ---
    const single = {
      code: 'media = ___',
      language: 'python',
      blanks: [{ accepted_answers: ['(idade1 + idade2) / 2'] }]
    };
    const { el, state } = mountCodeCompletion(single);
    const input = el.querySelector('.code-blank');
    input.value = '(idade1 + idade2) / 2';
    input.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    assert.equal(state.answer?.correct, true, 'Enter na lacuna verifica');
  }

  {
    // --- Várias lacunas: aria-label "Lacuna N de M" e verificação por lacuna ---
    const multi = {
      code: 'const soma = ___;\nconst dobro = ___;',
      language: 'javascript',
      blanks: [
        { accepted_answers: ['a + b'] },
        { accepted_answers: ['soma * 2', '(a + b) * 2'] }
      ]
    };

    const { el, state } = mountCodeCompletion(multi);
    const inputs = el.querySelectorAll('.code-blank');
    assert.equal(inputs.length, 2, 'duas lacunas renderizadas');
    assert.equal(inputs[0].getAttribute('aria-label'), 'Lacuna 1 de 2', 'aria-label da 1ª lacuna');
    assert.equal(inputs[1].getAttribute('aria-label'), 'Lacuna 2 de 2', 'aria-label da 2ª lacuna');
    // Tab segue a ordem natural dos inputs (mesma ordem do DOM das lacunas)
    assert.deepEqual(
      Array.from(el.querySelectorAll('.code-blank')).map((i) => i.dataset.blankIndex),
      ['0', '1'],
      'lacunas em ordem de tabulação'
    );
    assert.ok(!inputs[0].hasAttribute('size'), 'a largura não depende do tamanho da resposta');
    inputs[0].value = 'a+b'; // variação de espaços deve ser aceita
    inputs[1].value = '(a + b) * 2';
    el.querySelector('.check-btn').click();
    assert.equal(state.answer?.correct, true, 'todas as lacunas corretas => correto');
  }

  {
    // --- Várias lacunas: errar só a 2ª menciona apenas a lacuna 2 ---
    const multi = {
      code: 'const soma = ___;\nconst dobro = ___;',
      language: 'javascript',
      blanks: [
        { accepted_answers: ['a + b'] },
        { accepted_answers: ['soma * 2'] }
      ]
    };
    const { el, state } = mountCodeCompletion(multi);
    const inputs = el.querySelectorAll('.code-blank');
    inputs[0].value = 'a + b';
    inputs[1].value = 'a - b';
    el.querySelector('.check-btn').click();
    assert.equal(state.answer?.correct, false, 'uma lacuna errada => incorreto');
    const fb = el.querySelector('.exercise-feedback');
    assert.ok(fb.textContent.includes('Lacuna 2'), 'feedback aponta a lacuna errada (2)');
    assert.ok(!fb.textContent.includes('Lacuna 1'), 'feedback não acusa a lacuna correta (1)');
  }

  {
    // --- Clicar "Verificar" várias vezes NÃO concede XP várias vezes ---
    const single = {
      code: 'media = ___',
      language: 'python',
      blanks: [{ accepted_answers: ['(idade1 + idade2) / 2'] }]
    };
    const { el, state } = mountCodeCompletion(single);
    const input = el.querySelector('.code-blank');
    input.value = '(idade1 + idade2) / 2';
    const btn = el.querySelector('.check-btn');
    btn.click();
    btn.click();
    btn.click();
    // onAnswer deve disparar uma única vez (guard `answered`) → 1 XP, não 3.
    assert.equal(state.answers.length, 1, 'Verificar várias vezes verifica uma única vez');
    assert.equal(state.answers[0].xpEarned, 20, 'XP concedido uma única vez por render');
  }

  ok('T045 completar código: lacunas inline, normalização e respostas aceitas');

  // ===================================================================
  // T046 — flashcards: autoavaliação; "já sei" = correto, "não sei" = incorreto
  // ===================================================================
  {
    const ex = makeExercise({ type: 'flashcards', starter_code: 'Resposta do cartão', correct: 'Resposta do cartão' });

    let answer = null;
    const el = renderFlashcards(ex, { streak: 0, calculateXP: () => 8, onAnswer: (r) => { answer = r; } });
    mount(el);
    el.querySelector('.flip-btn').click();
    assert.equal(el.querySelector('.flashcard-back').hidden, false, 'verso do cartão visível após virar');
    el.querySelector('.known-btn').click();
    assert.equal(answer?.correct, true, '"já sei" conta como acerto');

    let unknown = null;
    const el2 = renderFlashcards(ex, { streak: 0, calculateXP: () => 8, onAnswer: (r) => { unknown = r; } });
    mount(el2);
    el2.querySelector('.flip-btn').click();
    el2.querySelector('.unknown-btn').click();
    assert.equal(unknown?.correct, false, '"ainda não sei" conta como incorreto');
    ok('T046 flashcards: o que a tela pede = o que a verificação compara');
  }

  // ===================================================================
  // Renderizador de lição
  // ===================================================================
  {
    assert.equal(typeof getExerciseRenderer('multiple-choice'), 'function', 'renderer registrado');
    assert.equal(getExerciseRenderer('inexistente'), null, 'tipo desconhecido retorna null');

    let answered = 0;
    let completed = null;
    let retried = null;
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
      onComplete: (stats) => { completed = stats; },
      onRetryWrong: (ids) => { retried = ids; }
    });
    mount(el);
    assert.equal(el.querySelectorAll('.exercise-item').length, 2, 'dois itens de exercício');
    assert.ok(el.querySelector('.lesson-completion').hidden, 'conclusão oculta antes de responder');

    // Erra o 1º e acerta o 2º: concluir NÃO exige acerto total.
    el.querySelector('.tf-false').click();
    const mcItem = el.querySelector('.exercise-multiple-choice');
    const mcCorrectRadio = [...mcItem.querySelectorAll('input[type="radio"]')]
      .find((radio) => Number(radio.value) === 1);
    mcCorrectRadio.checked = true;
    mcCorrectRadio.dispatchEvent(new window.Event('change'));
    mcItem.querySelector('.submit-btn').click();

    assert.equal(answered, 2, 'os dois exercícios notificaram resposta');
    assert.equal(el.querySelector('.lesson-completion').hidden, false, 'bloco de conclusão aparece após responder tudo');
    assert.equal(
      el.querySelector('.lesson-completion-summary').textContent,
      'Você acertou 1 de 2.',
      'resultado mostra "Você acertou X de Y"'
    );
    assert.ok(/XP ganho nesta lição/.test(el.querySelector('.lesson-completion-xp').textContent), 'resultado mostra o XP da lição');

    const retryBtn = el.querySelector('.retry-wrong-btn');
    assert.ok(retryBtn && !retryBtn.hidden, 'botão "Refazer só os que errei" visível');
    assert.equal(retryBtn.textContent, 'Refazer só os que errei (1)', 'botão mostra a quantidade errada');
    retryBtn.click();
    assert.deepEqual(retried, ['ex-sem1-algorithms-m01-l01-a'], 'retry recebe apenas os ids errados');

    el.querySelector('.finish-btn').click();
    assert.equal(completed?.total, 2, 'conclusão recebe o total de exercícios');
    assert.deepEqual(completed?.wrongExerciseIds, ['ex-sem1-algorithms-m01-l01-a'], 'conclusão recebe os ids errados');
    ok('renderLesson monta resumo + lista, progride e conclui com resultado/retry');
  }

  console.log(`\n✅ Todos os testes de lição passaram (${passed}).`);
} catch (error) {
  console.error('❌ Teste de lição falhou:', error);
  process.exit(1);
}
