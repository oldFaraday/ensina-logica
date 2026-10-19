#!/usr/bin/env node
/**
 * Testes das regras da pipeline de conteúdo (scripts/lib/module-rules.mjs).
 *
 * Cada bloco parte de um módulo VÁLIDO e introduz UM defeito; o teste confirma
 * que `checkModuleContent` rejeita o defeito com a mensagem esperada.
 */

import {
  checkModuleContent,
  extractPlanObjectives,
  countPortugueseWords,
  extractSectionIds
} from './lib/module-rules.mjs';

let passed = 0;
let failed = 0;

function check(label, condition) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    console.log(`  ❌ ${label}`);
  }
}

const errorsText = (errors) => errors.join(' | ').toLowerCase();
const has = (errors, fragment) => errorsText(errors).includes(fragment.toLowerCase());

function exercise(id, lessonId, overrides = {}) {
  return {
    id,
    theory_unit_id: 'th-sem1-algorithms-m01-intro',
    lesson_id: lessonId,
    type: 'multiple-choice',
    generated_by_ai: true,
    prompt: 'Qual alternativa descreve corretamente o conceito?',
    options: ['A', 'B', 'C', 'D'],
    correct: 0,
    explanation: 'A alternativa correta segue a definição da Seção Program Design.',
    difficulty: 'easy',
    xp_base: 10,
    objective_id: 'OBJ-1',
    level: 'reconhecer',
    source_ref: 'th-sem1-algorithms-m01-intro#ideia-central',
    answer_check: 'Conferido manualmente contra a seção Ideia central.',
    ...overrides
  };
}

const unit = {
  id: 'th-sem1-algorithms-m01-intro',
  content: 'palavra '.repeat(320),
  sections: ['ideia-central', 'definicao', 'exemplo', 'erros-comuns', 'resumo'],
  newTerms: ['algoritmo']
};

const lesson1 = [
  exercise('ex-1', 'l01', { objective_id: 'OBJ-1', level: 'reconhecer', type: 'multiple-choice' }),
  exercise('ex-2', 'l01', { objective_id: 'OBJ-1', level: 'reconhecer', type: 'true-false' }),
  exercise('ex-3', 'l01', { objective_id: 'OBJ-2', level: 'aplicar', type: 'multiple-choice' }),
  exercise('ex-4', 'l01', { objective_id: 'OBJ-2', level: 'aplicar', type: 'order-steps' }),
  exercise('ex-5', 'l01', { objective_id: 'OBJ-1', level: 'analisar', type: 'multiple-choice' }),
  exercise('ex-6', 'l01', { objective_id: 'OBJ-2', level: 'analisar', type: 'true-false' })
];

const lesson2 = [
  exercise('ex-7', 'l02', { objective_id: 'OBJ-1', level: 'aplicar', type: 'true-false' }),
  exercise('ex-8', 'l02', { objective_id: 'OBJ-1', level: 'transferir', type: 'multiple-choice' }),
  exercise('ex-9', 'l02', { objective_id: 'OBJ-2', level: 'aplicar', type: 'code-completion' }),
  exercise('ex-10', 'l02', { objective_id: 'OBJ-2', level: 'analisar', type: 'order-steps' }),
  exercise('ex-11', 'l02', { objective_id: 'OBJ-1', level: 'analisar', type: 'multiple-choice' }),
  exercise('ex-12', 'l02', { objective_id: 'OBJ-2', level: 'transferir', type: 'true-false', difficulty: 'hard' })
];

const challenge = Array.from({ length: 8 }, (_, index) =>
  exercise(`ex-challenge-${index + 1}`, 'l02', {
    objective_id: index % 2 === 0 ? 'OBJ-1' : 'OBJ-2',
    level: index % 2 === 0 ? 'analisar' : 'transferir',
    difficulty: index < 2 ? 'easy' : index < 6 ? 'medium' : 'hard'
  })
);

const flashcards = Array.from({ length: 8 }, (_, index) =>
  exercise(`ex-flash-${index + 1}`, 'l02', {
    type: 'flashcards',
    objective_id: index % 2 === 0 ? 'OBJ-1' : 'OBJ-2',
    level: 'reconhecer',
    starter_code: 'Definição vinda da fonte.',
    correct: 'Definição vinda da fonte.',
    difficulty: 'easy'
  })
);

// O módulo de controle também precisa respeitar a distribuição das respostas
// de múltipla escolha: espalha o índice correto em vez de deixar tudo em 0.
let mcCursor = 0;
for (const item of [...lesson1, ...lesson2, ...challenge]) {
  if (item.type === 'multiple-choice') {
    item.correct = mcCursor % 4;
    mcCursor += 1;
  }
}

const goodModule = {
  module: { id: 'm01', title: 'Introdução', lessons: ['l01', 'l02'] },
  moduleLabel: 'sem1/algorithms/m01',
  planText: `
## Objetivos
- **OBJ-1** — Definir o conceito central.
- **OBJ-2** — Aplicar o conceito em um exemplo.
`,
  theoryUnits: [unit],
  exercises: [...lesson1, ...lesson2],
  challenge,
  flashcards,
  glossaryTerms: [{ en: 'algorithm', pt: 'algoritmo' }]
};

function clone(value = goodModule) {
  return structuredClone(value);
}

function errorsFor(mutate) {
  const value = clone();
  mutate(value);
  return checkModuleContent(value);
}

console.log('\n📐 Helpers da pipeline');
check('extrai objetivos OBJ-1/OBJ-2 do PLAN.md', extractPlanObjectives('OBJ-1 e OBJ-2').length === 2);
check('conta 320 palavras em português', countPortugueseWords('palavra '.repeat(320)) === 320);
check('ignora código no contador de palavras', countPortugueseWords('```\nconst x = 1\n```\n' + 'palavra '.repeat(300)) === 300);
check(
  'extrai seções de headings e âncoras',
  extractSectionIds('## Ideia central\n## Definição {#definicao}').has('ideia-central') &&
    extractSectionIds('## Ideia central\n## Definição {#definicao}').has('definicao')
);

console.log('\n✅ Controle: módulo válido');
check('módulo válido não gera erros', checkModuleContent(clone()).length === 0);

console.log('\n🎯 Objetivos');
check(
  'rejeita objetivo com menos de 2 exercícios',
  has(
    errorsFor((value) => {
      value.exercises = value.exercises.filter((item) => item.objective_id !== 'OBJ-2');
      value.challenge = value.challenge.filter((item) => item.objective_id !== 'OBJ-2');
      value.flashcards = value.flashcards.filter((item) => item.objective_id !== 'OBJ-2');
    }),
    'exige ao menos 2 em níveis diferentes'
  )
);
check(
  'rejeita objetivo com todos os exercícios no mesmo nível',
  has(
    errorsFor((value) => {
      for (const collection of [value.exercises, value.challenge, value.flashcards]) {
        collection.forEach((item) => {
          if (item.objective_id === 'OBJ-2') item.level = 'aplicar';
        });
      }
    }),
    'um único nível'
  )
);
check(
  'rejeita objetivo inexistente no PLAN.md',
  has(
    errorsFor((value) => {
      value.exercises[0].objective_id = 'OBJ-9';
    }),
    'objetivo inexistente no plan.md'
  )
);
check('rejeita PLAN.md ausente', has(errorsFor((value) => { value.planText = ''; }), 'plan.md ausente'));
check(
  'rejeita PLAN.md sem objetivos',
  has(errorsFor((value) => { value.planText = 'Sem objetivos aqui.'; }), 'não declara objetivos')
);

console.log('\n📚 Lições');
check(
  'rejeita lição com menos de 5 exercícios',
  has(
    errorsFor((value) => {
      value.exercises = value.exercises.filter((item) => !['ex-5', 'ex-6'].includes(item.id));
    }),
    'exige de 5 a 7'
  )
);
check(
  'rejeita lição com mais de 7 exercícios',
  has(
    errorsFor((value) => {
      value.exercises.push(exercise('ex-extra-1', 'l01'), exercise('ex-extra-2', 'l01'));
    }),
    'exige de 5 a 7'
  )
);
check(
  'rejeita mais de 1 exercício difícil na lição',
  has(
    errorsFor((value) => {
      value.exercises.find((item) => item.id === 'ex-2').difficulty = 'hard';
      value.exercises.find((item) => item.id === 'ex-3').difficulty = 'hard';
    }),
    'máximo 1'
  )
);
check(
  'rejeita 1º exercício que não é fácil',
  has(
    errorsFor((value) => {
      value.exercises.find((item) => item.id === 'ex-1').difficulty = 'medium';
    }),
    '1º exercício deve ser fácil'
  )
);
check(
  'rejeita 3 exercícios seguidos do mesmo tipo',
  has(
    errorsFor((value) => {
      for (const id of ['ex-1', 'ex-2', 'ex-3']) {
        value.exercises.find((item) => item.id === id).type = 'multiple-choice';
      }
    }),
    'mais de 2 exercícios seguidos'
  )
);
check(
  'rejeita exercício difícil na lição 1',
  has(
    errorsFor((value) => {
      value.exercises.find((item) => item.id === 'ex-6').difficulty = 'hard';
    }),
    'lição 1 não pode ter exercício difícil'
  )
);

console.log('\n🎲 Distribuição da múltipla escolha');
check(
  'rejeita resposta correta concentrada em um único índice',
  has(
    errorsFor((value) => {
      for (const collection of [value.exercises, value.challenge]) {
        collection.forEach((item) => {
          if (item.type === 'multiple-choice') item.correct = 0;
        });
      }
    }),
    'posição da resposta correta concentrada'
  )
);
check(
  'rejeita opção correta sistematicamente mais longa',
  has(
    errorsFor((value) => {
      for (const collection of [value.exercises, value.challenge]) {
        collection.forEach((item) => {
          if (item.type === 'multiple-choice') {
            item.options[item.correct] = `${item.options[item.correct]} (alternativa correta e muito mais detalhada)`;
          }
        });
      }
    }),
    'opção correta é a mais longa'
  )
);
check(
  'aceita distribuição equilibrada de respostas e tamanhos',
  checkModuleContent(clone()).length === 0
);

console.log('\n🏁 Desafio e flashcards');
check(
  'rejeita desafio com 7 questões',
  has(errorsFor((value) => { value.challenge.pop(); }), 'exige exatamente 8')
);
check(
  'rejeita desafio com 9 questões',
  has(errorsFor((value) => { value.challenge.push(exercise('ex-challenge-9', 'l02')); }), 'exige exatamente 8')
);
check(
  'rejeita menos de 8 flashcards',
  has(errorsFor((value) => { value.flashcards = value.flashcards.slice(0, 7); }), 'exige de 8 a 12')
);
check(
  'rejeita mais de 12 flashcards',
  has(
    errorsFor((value) => {
      for (let index = 0; index < 5; index++) {
        value.flashcards.push(exercise(`ex-flash-extra-${index}`, 'l02', { type: 'flashcards' }));
      }
    }),
    'exige de 8 a 12'
  )
);

console.log('\n📖 Unidades teóricas');
check(
  'rejeita unidade com menos de 300 palavras',
  has(errorsFor((value) => { value.theoryUnits[0].content = 'palavra '.repeat(299); }), '299 palavra(s)')
);
check(
  'rejeita unidade com mais de 900 palavras',
  has(errorsFor((value) => { value.theoryUnits[0].content = 'palavra '.repeat(901); }), '901 palavra(s)')
);
check(
  'rejeita mais de 3 termos novos',
  has(errorsFor((value) => { value.theoryUnits[0].newTerms = ['a', 'b', 'c', 'd']; }), 'máximo 3')
);
check(
  'rejeita unidade com menos de 3 exercícios ligados',
  has(
    errorsFor((value) => {
      value.exercises.forEach((item) => { item.theory_unit_id = 'th-sem1-algorithms-m01-outra'; });
      value.challenge.forEach((item) => { item.theory_unit_id = 'th-sem1-algorithms-m01-outra'; });
      value.flashcards.forEach((item) => { item.theory_unit_id = 'th-sem1-algorithms-m01-outra'; });
    }),
    'exige ao menos 3'
  )
);
check(
  'rejeita módulo sem unidade teórica',
  has(errorsFor((value) => { value.theoryUnits = []; }), 'sem unidade teórica')
);

console.log('\n🔗 source_ref e answer_check');
check(
  'rejeita exercício sem source_ref',
  has(errorsFor((value) => { delete value.exercises[0].source_ref; }), 'sem source_ref')
);
check(
  'rejeita source_ref com formato inválido',
  has(errorsFor((value) => { value.exercises[0].source_ref = 'secao-solta'; }), 'source_ref inválido')
);
check(
  'rejeita source_ref para unidade fora do módulo',
  has(
    errorsFor((value) => { value.exercises[0].source_ref = 'th-sem1-algorithms-m02-outra#ideia-central'; }),
    'fora do módulo'
  )
);
check(
  'rejeita source_ref para seção inexistente',
  has(
    errorsFor((value) => { value.exercises[0].source_ref = 'th-sem1-algorithms-m01-intro#nao-existe'; }),
    'seção inexistente'
  )
);
check(
  'rejeita exercício sem answer_check',
  has(errorsFor((value) => { delete value.exercises[0].answer_check; }), 'sem answer_check')
);
check(
  'rejeita answer_check vazio',
  has(errorsFor((value) => { value.exercises[0].answer_check = '   '; }), 'sem answer_check')
);

console.log('\n📕 Glossário e placeholders');
check(
  'rejeita termo novo sem entrada no glossário',
  has(
    errorsFor((value) => { value.theoryUnits[0].newTerms = ['termo-inexistente']; }),
    'sem entrada no glossário'
  )
);
check(
  'aceita termo novo em inglês presente no glossário',
  checkModuleContent(
    clone({
      ...goodModule,
      theoryUnits: [{ ...unit, newTerms: ['algorithm'] }]
    })
  ).length === 0
);
check(
  'rejeita placeholder no enunciado',
  has(
    errorsFor((value) => { value.exercises[0].prompt = 'Questão 1 sobre o conceito.'; }),
    'placeholder'
  )
);
check(
  'rejeita placeholder na teoria',
  has(
    errorsFor((value) => { value.theoryUnits[0].content += ' TODO preencher.'; }),
    'placeholder'
  )
);

console.log('\n📊 Resultado dos testes da pipeline:');
console.log(`  ✅ ${passed} passaram`);
if (failed > 0) {
  console.log(`  ❌ ${failed} falharam`);
  process.exit(1);
}
console.log('  🎉 Todos passaram');
process.exit(0);
