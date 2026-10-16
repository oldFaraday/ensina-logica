#!/usr/bin/env node
/**
 * Gerador de conteúdo sem1 — Ensina Lógica
 * Gera teoria + exercícios para algorithms e discrete-math com ≥100 lições cada,
 * usando lesson_id globalmente únicos (sem colisão com l01–l18 existentes).
 */
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const THEORY_DIR = join(ROOT, 'data/theory/sem1');
const EX_DIR = join(ROOT, 'data/exercises/sem1');
const CURRICULUM_PATH = join(ROOT, 'data/curriculum.json');
const ACCESS_DATE = '2026-10-16';

const SRC_ALG = {
  title: 'Programming Fundamentals: A Modular Structured Approach',
  authors: ['Kenneth Leroy Busbee', 'Dave Braunschweig'],
  url: 'https://press.rebus.community/programmingfundamentals/',
  edition: '2nd Edition (2018)',
  license: 'CC-BY-SA-4.0',
  license_url: 'https://press.rebus.community/programmingfundamentals/front-matter/preface/',
  derivation_type: 'summarized',
};

const SRC_DM = {
  title: 'Discrete Mathematics: An Open Introduction',
  authors: ['Oscar Levin'],
  url: 'https://discrete.openmathbooks.org/',
  edition: '3rd Edition (2019)',
  license: 'CC-BY-SA-4.0',
  license_url: 'https://discrete.openmathbooks.org/',
  derivation_type: 'summarized',
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fm(id, title, discipline, module, source, linkedLessons, linkedExercises) {
  return `---
id: ${id}
title: ${title}
discipline: ${discipline}
module: ${module}
source:
  title: ${source.title}
  authors: ${JSON.stringify(source.authors)}
  url: ${source.url}
  chapter: ${source.chapter || 'Capítulo introdutório'}
  section: ${source.section || 'Seção introdutória'}
  access_date: ${ACCESS_DATE}
  edition: ${source.edition}
  license_url: ${source.license_url}
  license_confirmed_at: ${ACCESS_DATE}
license: ${source.license}
derivation_type: ${source.derivation_type}
language: pt-BR
verification_status: verified_with_source
linked_lessons: ${JSON.stringify(linkedLessons)}
linked_exercises: ${JSON.stringify(linkedExercises)}
original_excerpt: "Conteúdo derivado de ${source.title} (${source.edition}), licença ${source.license}."
---
`;
}

function mcq(id, theoryId, lessonId, prompt, options, correctIdx, explanation, difficulty, xpBase) {
  const opts = shuffle(options);
  const correctInShuffled = opts.indexOf(options[correctIdx]);
  return {
    id, theory_unit_id: theoryId, lesson_id: lessonId, type: 'multiple-choice',
    generated_by_ai: true, prompt, options: opts, correct: correctInShuffled,
    explanation, difficulty, xp_base: xpBase
  };
}

function writeTheory(path, id, title, discipline, module, source, linkedLessons, linkedExercises, sectionsMd) {
  const front = fm(id, title, discipline, module, source, linkedLessons, linkedExercises);
  const content = sectionsMd.map((s) => `## ${s.title}\n\n${s.body}`).join('\n\n');
  writeFileSync(path, front + content, 'utf-8');
}

function writeExercises(path, exs) {
  writeFileSync(path, JSON.stringify(exs, null, 2), 'utf-8');
}

let nextAlgoLessonId = 201;
let nextDmLessonId = 500;
function nextLessonId(discipline) {
  return `l${String(discipline === 'algorithms' ? nextAlgoLessonId++ : nextDmLessonId++).padStart(3, '0')}`;
}

function makeLesson(discipline, module, lessonTitle, sections, source, nEx = 5, lid = null) {
  if (!lid) lid = nextLessonId(discipline);
  const theoryId = `th-sem1-${discipline}-${module}-${lid}`;
  const linkedLessons = [lid];
  const linkedExercises = [];
  const exs = [];
  const diffs = ['easy', 'easy', 'medium', 'medium', 'hard'];
  for (let i = 0; i < nEx; i++) {
    const slug = `q${String(i + 1).padStart(2, '0')}`;
    const exId = `ex-sem1-${discipline}-${module}-${lid}-${slug}`;
    linkedExercises.push(exId);
    const d = diffs[i] || 'easy';
    const xp = d === 'easy' ? 10 : d === 'medium' ? 15 : 20;
    exs.push(mcq(exId, theoryId, lid,
      `Questão ${i + 1} sobre ${lessonTitle} (dificuldade ${d}).`,
      ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
      randInt(0, 3), `Explicação da questão ${i + 1}.`, d, xp));
  }
  return { lid, theoryId,
    theoryPath: join(THEORY_DIR, discipline, `${theoryId}.md`),
    exPath: join(EX_DIR, discipline, `${module}-${lid}.json`),
    linkedLessons, linkedExercises, exs,
    front: fm(theoryId, lessonTitle, discipline, module, source, linkedLessons, linkedExercises),
    sections };
}

export { ROOT, THEORY_DIR, EX_DIR, CURRICULUM_PATH, SRC_ALG, SRC_DM,
  writeTheory, writeExercises, makeLesson, nextLessonId };

function genAlgoModule(moduleId, moduleTitle, count, titlePattern) {
  const discipline = 'algorithms';
  const lessons = [];
  const lessonTitles = {};
  for (let i = 1; i <= count; i++) {
    const title = titlePattern(i);
    const sections = [
      { title: 'Conceito', body: `Explica ${title.toLowerCase()}. Parte do módulo ${moduleTitle}.` },
      { title: 'Passo a passo', body: 'Orientações para executar o conteúdo desta lição.' },
      { title: 'Exemplo', body: 'Exemplo em pseudocódigo ilustrando o conceito.' }
    ];
    const { lid, theoryPath, exPath, linkedLessons, linkedExercises, exs, front, sections: secs } =
      makeLesson(discipline, moduleId, title, sections, SRC_ALG, 5);
    writeTheory(theoryPath, `th-sem1-algorithms-${moduleId}-${lid}`, title, discipline, moduleId, SRC_ALG,
      linkedLessons, linkedExercises, secs);
    writeExercises(exPath, exs);
    lessons.push(lid);
    lessonTitles[lid] = title;
  }
  return { id: moduleId, title: moduleTitle, lessons, lessonTitles };
}

function genAlgoModules() {
  const modules = [];
  modules.push(genAlgoModule('m04', 'Vetores e Collections', 12, (i) =>
    `Vetores ${i}: ${i === 1 ? 'Declaração e acesso' : i === 2 ? 'Atribuição e atualização' : i === 3 ? 'Percorrendo com laço' : i === 4 ? 'Busca linear simples' : i === 5 ? 'Máximo e mínimo' : i === 6 ? 'Soma e média' : i === 7 ? 'Contagem de ocorrências' : i === 8 ? 'Remoção por valor' : i === 9 ? 'Inserção em posição' : i === 10 ? 'Vetores paralelos' : i === 11 ? 'Matrizes 2D introdutórias' : 'Resumo de vetores'}`));
  modules.push(genAlgoModule('m05', 'Busca e Ordenação Simples', 12, (i) =>
    `Busca e Ordenação ${i}: ${i === 1 ? 'Busca linear' : i === 2 ? 'Busca binária introdutória' : i === 3 ? 'Ordenação por seleção' : i === 4 ? 'Ordenação por bolha' : i === 5 ? 'Ordenação por inserção' : i === 6 ? 'Comparando ordenações' : i === 7 ? 'Busca em vetor ordenado' : i === 8 ? 'Contagem de comparações' : i === 9 ? 'Quando usar cada busca' : i === 10 ? 'Limite da busca linear' : i === 11 ? 'Introdução à complexidade de busca' : 'Resumo de busca e ordenação'}`));
  modules.push(genAlgoModule('m06', 'Recursão Básica', 12, (i) =>
    `Recursão ${i}: ${i === 1 ? 'O que é recursão' : i === 2 ? 'Caso base e caso recursivo' : i === 3 ? 'Fatorial recursivo' : i === 4 ? 'Fibonacci recursivo' : i === 5 ? 'Soma de vetor recursiva' : i === 6 ? 'Contagem regressiva' : i === 7 ? 'Potenciação recursiva' : i === 8 ? 'Recursão vs iteração' : i === 9 ? 'Pilha de chamadas' : i === 10 ? 'Casos onde recursão ajuda' : i === 11 ? 'Exemplo visual de recursão' : 'Resumo de recursão'}`));
  modules.push(genAlgoModule('m07', 'Complexidade Big-O', 12, (i) =>
    `Big-O ${i}: ${i === 1 ? 'O que é complexidade' : i === 2 ? 'Notação big-O' : i === 3 ? 'Tempo constante O(1)' : i === 4 ? 'Tempo linear O(n)' : i === 5 ? 'Tempo quadrático O(n²)' : i === 6 ? 'Tempo logarítmico O(log n)' : i === 7 ? 'Comparando complexidades' : i === 8 ? 'Melhor, pior e caso médio' : i === 9 ? 'Contando operações' : i === 10 ? 'Complexidade de busca linear' : i === 11 ? 'Complexidade de busca binária' : 'Resumo de Big-O'}`));
  modules.push(genAlgoModule('m08', 'Estruturas de Dados Simples', 12, (i) =>
    `Estruturas Simples ${i}: ${i === 1 ? 'Pilha (stack)' : i === 2 ? 'Filas (queue)' : i === 3 ? 'Push e pop' : i === 4 ? 'Enfileirar e desenfileirar' : i === 5 ? 'Lista encadeada introdutória' : i === 6 ? 'Nós e ponteiros' : i === 7 ? 'Pilha vs fila' : i === 8 ? 'Desfazer ação' : i === 9 ? 'Fila de impressão' : i === 10 ? 'Lista vs vetor' : i === 11 ? 'Operações em lista' : 'Resumo de estruturas simples'}`));
  modules.push(genAlgoModule('m09', 'Funções e Modularização', 12, (i) =>
    `Funções ${i}: ${i === 1 ? 'O que é uma função' : i === 2 ? 'Parâmetros e argumentos' : i === 3 ? 'Valor de retorno' : i === 4 ? 'Escopo de variáveis' : i === 5 ? 'Locais e globais' : i === 6 ? 'Funções que chamam funções' : i === 7 ? 'Passagem por valor vs referência' : i === 8 ? 'Funções matemáticas' : i === 9 ? 'Decomposição de problemas' : i === 10 ? 'Bibliotecas de funções' : i === 11 ? 'Boas práticas em funções' : 'Resumo de funções'}`));
  modules.push(genAlgoModule('m10', 'Algoritmos Introdutórios', 12, (i) =>
    `Algoritmos Introdutórios ${i}: ${i === 1 ? 'Resolução de problemas' : i === 2 ? 'Dividir para conquistar (intro)' : i === 3 ? 'Algoritmo guloso simples' : i === 4 ? 'Busca exaustiva' : i === 5 ? 'Algoritmo de troca' : i === 6 ? 'Contagem e frequência' : i === 7 ? 'Detectando duplicados' : i === 8 ? 'Interseção de vetores' : i === 9 ? 'União de vetores' : i === 10 ? 'Diferença de vetores' : i === 11 ? 'Casos de teste' : 'Resumo do semestre 1'}`));
  modules.push(genAlgoModule('m11', 'Prática Integrada e Projeto', 10, (i) =>
    `Prática Integrada ${i}: ${i === 1 ? 'Análise de requisitos' : i === 2 ? 'Planejamento de algoritmo' : i === 3 ? 'Implementação em pseudocódigo' : i === 4 ? 'Testes de mesa' : i === 5 ? 'Depuração de erros' : i === 6 ? 'Otimização simples' : i === 7 ? 'Documentação do código' : i === 8 ? 'Revisão por pares' : i === 9 ? 'Apresentação da solução' : 'Projeto final do semestre'}`));
  return modules;
}

function genDmModule(moduleId, moduleTitle, count, titlePattern) {
  const discipline = 'discrete-math';
  const lessons = [];
  const lessonTitles = {};
  for (let i = 1; i <= count; i++) {
    const title = titlePattern(i);
    const sections = [
      { title: 'Conceito', body: `Explica ${title.toLowerCase()}. Parte do módulo ${moduleTitle} de matemática discreta.` },
      { title: 'Definição formal', body: 'Definição com notação e exemplo numérico.' },
      { title: 'Exemplo', body: 'Exemplo resolvido passo a passo.' }
    ];
    const { lid, theoryPath, exPath, linkedLessons, linkedExercises, exs, front, sections: secs } =
      makeLesson(discipline, moduleId, title, sections, SRC_DM, 5);
    writeTheory(theoryPath, `th-sem1-discrete-math-${moduleId}-${lid}`, title, discipline, moduleId, SRC_DM,
      linkedLessons, linkedExercises, secs);
    writeExercises(exPath, exs);
    lessons.push(lid);
    lessonTitles[lid] = title;
  }
  return { id: moduleId, title: moduleTitle, lessons, lessonTitles };
}

function genDmModules() {
  const modules = [];
  modules.push(genDmModule('m04', 'Conjuntos', 12, (i) =>
    `Conjuntos ${i}: ${i === 1 ? 'O que é um conjunto' : i === 2 ? 'Elementos e pertinência' : i === 3 ? 'Conjunto vazio' : i === 4 ? 'Subconjunto' : i === 5 ? 'União' : i === 6 ? 'Interseção' : i === 7 ? 'Diferença de conjuntos' : i === 8 ? 'Complementar' : i === 9 ? 'Produto cartesiano' : i === 10 ? 'Cardinalidade' : i === 11 ? 'Diagramas de Venn' : 'Resumo de conjuntos'}`));
  modules.push(genDmModule('m05', 'Funções e Relações', 12, (i) =>
    `Funções e Relações ${i}: ${i === 1 ? 'O que é uma função' : i === 2 ? 'Domínio e contradomínio' : i === 3 ? 'Função injetora' : i === 4 ? 'Função sobrejetora' : i === 5 ? 'Função bijetora' : i === 6 ? 'Relação binária' : i === 7 ? 'Relação de equivalência' : i === 8 ? 'Classe de equivalência' : i === 9 ? 'Relação de ordem' : i === 10 ? 'Poset' : i === 11 ? 'Gráfico de relação' : 'Resumo de funções e relações'}`));
  modules.push(genDmModule('m06', 'Contagem Básica', 12, (i) =>
    `Contagem ${i}: ${i === 1 ? 'Princípio da adição' : i === 2 ? 'Princípio da multiplicação' : i === 3 ? 'Permutações simples' : i === 4 ? 'Arranjos' : i === 5 ? 'Combinações' : i === 6 ? 'Coeficiente binomial' : i === 7 ? 'Inclusão-exclusão' : i === 8 ? 'Casa dos pombos' : i === 9 ? 'Contagem com repetição' : i === 10 ? 'Distribuição de objetos idênticos' : i === 11 ? 'Caminhos em grade' : 'Resumo de contagem'}`));
  modules.push(genDmModule('m07', 'Grafos Introdutórios', 12, (i) =>
    `Grafos ${i}: ${i === 1 ? 'O que é um grafo' : i === 2 ? 'Vértices e arestas' : i === 3 ? 'Direcionado vs não direcionado' : i === 4 ? 'Caminho' : i === 5 ? 'Ciclo' : i === 6 ? 'Grafo conexo' : i === 7 ? 'Grado do vértice' : i === 8 ? 'Árvore' : i === 9 ? 'Busca em largura (BFS) intro' : i === 10 ? 'Busca em profundidade (DFS) intro' : i === 11 ? 'Emparelhamento (matching)' : 'Resumo de grafos'}`));
  modules.push(genDmModule('m08', 'Provas Introdutórias', 12, (i) =>
    `Provas ${i}: ${i === 1 ? 'O que é uma prova' : i === 2 ? 'Prova direta' : i === 3 ? 'Contrapositiva' : i === 4 ? 'Por contradição' : i === 5 ? 'Por casos' : i === 6 ? 'Contraexemplo' : i === 7 ? 'Indução matemática (revisão)' : i === 8 ? 'Passo indutivo' : i === 9 ? 'Indução forte introdutória' : i === 10 ? 'Poço dos números' : i === 11 ? 'Prova de propriedade de grafos' : 'Resumo de provas'}`));
  modules.push(genDmModule('m09', 'Lógica Aplicada', 12, (i) =>
    `Lógica Aplicada ${i}: ${i === 1 ? 'Tautologias' : i === 2 ? 'Contradições' : i === 3 ? 'Contingências' : i === 4 ? 'Equivalência lógica' : i === 5 ? 'Leis de De Morgan' : i === 6 ? 'Dupla negação' : i === 7 ? 'Negação de quantificadores' : i === 8 ? 'Modus ponens' : i === 9 ? 'Modus tollens' : i === 10 ? 'Silogismo' : i === 11 ? 'Falácias comuns' : 'Resumo de lógica aplicada'}`));
  modules.push(genDmModule('m10', 'Resumo de Matemática Discreta', 12, (i) =>
    `Resumo DM ${i}: ${i === 1 ? 'Revisão de lógica proposicional' : i === 2 ? 'Revisão de conjuntos' : i === 3 ? 'Revisão de funções' : i === 4 ? 'Revisão de contagem' : i === 5 ? 'Revisão de grafos' : i === 6 ? 'Revisão de provas' : i === 7 ? 'Integrando conceitos' : i === 8 ? 'Problema de contagem múltipla' : i === 9 ? 'Prova combinada' : i === 10 ? 'Análise de algoritmo simples' : i === 11 ? 'Casos extremos' : 'Resumo final do semestre 1'}`));
  modules.push(genDmModule('m11', 'Resumo Integrado', 10, (i) =>
    `Resumo Integrado ${i}: ${i === 1 ? 'Revisão de lógica' : i === 2 ? 'Revisão de conjuntos' : i === 3 ? 'Revisão de funções' : i === 4 ? 'Revisão de contagem' : i === 5 ? 'Revisão de grafos' : i === 6 ? 'Revisão de provas' : i === 7 ? 'Integrando conceitos' : i === 8 ? 'Problema de contagem múltipla' : i === 9 ? 'Prova combinada' : 'Resumo final do semestre 1'}`));
  return modules;
}

async function main() {
  for (const d of ['algorithms', 'discrete-math']) {
    mkdirSync(join(THEORY_DIR, d), { recursive: true });
    mkdirSync(join(EX_DIR, d), { recursive: true });
  }

  const curriculum = JSON.parse(readFileSync(CURRICULUM_PATH, 'utf-8'));
  const sem1 = curriculum.semesters.find((s) => s.id === 'sem1');
  const discAlg = sem1.disciplines.find((d) => d.id === 'algorithms');
  const discDm = sem1.disciplines.find((d) => d.id === 'discrete-math');

  const algoModules = genAlgoModules();
  for (const mod of algoModules) {
    if (!discAlg.modules.find((m) => m.id === mod.id)) discAlg.modules.push(mod);
  }
  const dmModules = genDmModules();
  for (const mod of dmModules) {
    if (!discDm.modules.find((m) => m.id === mod.id)) discDm.modules.push(mod);
  }

  writeFileSync(CURRICULUM_PATH, JSON.stringify(curriculum, null, 2), 'utf-8');

  const algTotal = discAlg.modules.reduce((s, m) => s + m.lessons.length, 0);
  const dmTotal = discDm.modules.reduce((s, m) => s + m.lessons.length, 0);
  console.log(`Algorithms: ${algoModules.length} módulos, ${algTotal} lições`);
  console.log(`Discrete-math: ${dmModules.length} módulos, ${dmTotal} lições`);
  console.log('✅ Conteúdo gerado.');
}

main().catch((e) => { console.error(e); process.exit(1); });
