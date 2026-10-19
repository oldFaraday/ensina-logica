# Plano do Módulo: sem1-algorithms-m03 — Controle de Fluxo

> **Módulo**: 3º do 1º semestre — Algoritmos e Lógica de Programação
> **Disciplina**: algorithms
> **Pipeline version**: 1
> **Fonte principal**: *Programming Fundamentals*, 2ª ed. (Busbee & Braunschweig), CC BY-SA 4.0
> **URL base**: https://press.rebus.community/programmingfundamentals/

---

## 1. Objetivos do módulo (4–6, verbos mensuráveis)

| ID | Objetivo | Verbo | Nível cognitivo |
|----|----------|-------|-----------------|
| OBJ-1 | **Definir** os três tipos de estruturas de controle (sequência, seleção, iteração) e identificar qual se aplica a um dado problema. | definir | reconhecer |
| OBJ-2 | **Construir** condicionais `if/else` e `if/else if/else` corretas usando operadores relacionais (`<`, `>`, `<=`, `>=`, `==`, `!=`) e lógicos (`and`, `or`, `not`). | construir | aplicar |
| OBJ-3 | **Aplicar** laços `while`, `do-while` e `for` respeitando os quatro atributos (inicialização, teste, ação, atualização) e evitar laços infinitos. | aplicar | aplicar |
| OBJ-4 | **Analisar** laços aninhados e comandos de desvio (`break`, `continue`) para prever o fluxo de execução e o número de iterações. | analisar | analisar |
| OBJ-5 | **Definir** função, parâmetro, argumento, `return` e escopo (global vs. local) e **aplicar** a comunicação por parâmetros em funções de tarefa específica. | definir, aplicar | reconhecer, aplicar |

---

## 2. Pré-requisitos

- Módulo `sem1-algorithms-m01` (Introdução a Algoritmos): design de programa, pseudocódigo, fluxogramas, programação estruturada básica.
- Módulo `sem1-algorithms-m02` (Variáveis e Tipos): constantes, variáveis, identificadores, tipos primitivos, expressões e operadores aritméticos, divisão inteira e módulo.
- Conhecimento básico de lógica booleana (verdadeiro/falso) — coberto em Matemática Discreta `sem1-discrete-math-m01`.

---

## 3. Mapa Objetivo → Seção da Fonte (URL específica, edição, licença)

> Todas as seções estão na **2ª edição (2018)** do *Programming Fundamentals*, licença **CC BY-SA 4.0** confirmada em https://creativecommons.org/licenses/by-sa/4.0/ (acesso 2026-10-19). A licença vale "exceto onde indicado" no rodapé de cada capítulo.

| Objetivo | Seção do livro (capítulo › seção) | URL da seção |
|----------|-----------------------------------|--------------|
| OBJ-1 | IV. Conditions › **Structured Programming** | https://press.rebus.community/programmingfundamentals/chapter/structured-programming/ |
| OBJ-1 | IV. Conditions › **Selection Control Structures** | https://press.rebus.community/programmingfundamentals/chapter/selection-control-structures/ |
| OBJ-2 | IV. Conditions › **If Then Else** | https://press.rebus.community/programmingfundamentals/chapter/if-then-else/ |
| OBJ-2 | IV. Conditions › **Relational Operators** | https://press.rebus.community/programmingfundamentals/chapter/relational-operators/ |
| OBJ-2 | IV. Conditions › **Assignment vs Equality** | https://press.rebus.community/programmingfundamentals/chapter/assignment-vs-equality/ |
| OBJ-2 | IV. Conditions › **Logical Operators** | https://press.rebus.community/programmingfundamentals/chapter/logical-operators/ |
| OBJ-2 | IV. Conditions › **Nested If Then Else** | https://press.rebus.community/programmingfundamentals/chapter/nested-if-then-else/ |
| OBJ-3 | V. Loops › **Iteration Control Structures** | https://press.rebus.community/programmingfundamentals/chapter/iteration-control-structures/ |
| OBJ-3 | V. Loops › **While Loop** | https://press.rebus.community/programmingfundamentals/chapter/while-loop/ |
| OBJ-3 | V. Loops › **Do While Loop** | https://press.rebus.community/programmingfundamentals/chapter/do-while-loop/ |
| OBJ-3 | V. Loops › **Flag Concept** | https://press.rebus.community/programmingfundamentals/chapter/flag-concept/ |
| OBJ-3 | V. Loops › **For Loop** | https://press.rebus.community/programmingfundamentals/chapter/for-loop/ |
| OBJ-4 | V. Loops › **Nested For Loops** | https://press.rebus.community/programmingfundamentals/chapter/nested-for-loops/ |
| OBJ-4 | V. Loops › **Branching Statements** | https://press.rebus.community/programmingfundamentals/chapter/branching-statements/ |
| OBJ-5 | III. Functions › **Modular Programming** | https://press.rebus.community/programmingfundamentals/chapter/modular-programming/ |
| OBJ-5 | III. Functions › **Parameters and Arguments** | https://press.rebus.community/programmingfundamentals/chapter/parameters-and-arguments/ |
| OBJ-5 | III. Functions › **Return Statement** | https://press.rebus.community/programmingfundamentals/chapter/return-statement/ |
| OBJ-5 | III. Functions › **Scope** | https://press.rebus.community/programmingfundamentals/chapter/scope/ |

---

## 4. Lições (3–4) com objetivos cada

| Lição | Título | Objetivos cobertos | Unidades teóricas planejadas (uma por conceito) |
|-------|--------|-------------------|------------------------------------------------|
| **l07** | Condicionais (se/senão) | OBJ-1, OBJ-2 | 1. Seleção e if/else (Structured Programming + If Then Else)<br>2. Operadores relacionais e lógicos (Relational Operators + Logical Operators + Assignment vs Equality)<br>3. Seleção múltipla / `else if` (Nested If Then Else + Case Control Structure) |
| **l08** | Laços de repetição | OBJ-1, OBJ-3 | 4. Iteração e laço `while` (Iteration Control Structures + While Loop + Flag Concept)<br>5. Laço `do-while` (Do While Loop)<br>6. Laço `for` de contagem (For Loop) |
| **l09** | Laços aninhados e controle | OBJ-4 | 7. Laços aninhados (Nested For Loops)<br>8. Comandos de desvio: `break`, `continue` (Branching Statements) |
| **l10** | Funções e procedimentos | OBJ-5 | 9. Programação modular e funções (Modular Programming)<br>10. Parâmetros, argumentos e `return` (Parameters and Arguments + Return Statement)<br>11. Escopo: global vs. local (Scope) |

> **Total de unidades teóricas planejadas: 11** (uma por conceito principal).

---

## 5. Fora de escopo (não abordado neste módulo)

- Arrays/listas, structs, classes/objetos (módulos posteriores).
- Recursão (abordada em Matemática Discreta `sem1-discrete-math-m03` e em Estruturas de Dados II).
- Passagem por referência vs. valor em detalhe (`Call by Value vs. Call by Reference` — apenas menção).
- Laços `foreach` / iteradores de coleções (sintaxe específica de linguagem).
- Tratamento de exceções (`try/catch`).
- Programação concorrente/paralela.
- Otimização de laços (unrolling, cache) — tópico de Análise de Algoritmos (4º semestre).
- Padrões de design de funções (Strategy, Template Method) — Engenharia de Software (5º semestre).

---

## 6. Observações para a pipeline

- **E1 Captura**: abrir cada URL da tabela acima e registrar trechos literais em `SOURCES.md`.
- **E2 Teoria**: criar 11 unidades em `data/theory/sem1/algorithms/` seguindo o padrão `th-sem1-algorithms-m03-<slug>.md` (ex.: `th-sem1-algorithms-m03-selection-if-else.md`).
- **E3 Auditoria**: gerar `REVIEW.md` com tabela afirmação | seção | trecho | ok/sem suporte.
- **E4 Exercícios**:
  - Lições: 6 exercícios cada (rampa: 2 fáceis, 2 médios, 1 médio-alto, 1 difícil — exceto l07: 3 fáceis, 3 médios, sem difícil).
  - Desafio do módulo: `m03-challenge.json` com 8 questões (2 fáceis, 4 médias, 2 difíceis) cobrindo OBJ-1 a OBJ-5.
  - Flashcards: `m03-flashcards.json` com 8–12 cards.
- **E5 Biblioteca/glossário**: ordem de leitura, tempo estimado, "praticar este trecho" e termos no `data/glossary.json`.
- **E6 Portões**: rodar `npm run check-module -- sem1-algorithms-m03`, `npm run validate`, `npm test`, `npm run verify-sources`.
- **E7 Fechamento**: atualizar `curriculum.json` com `pipeline_version: 1` e array `theories` listando as 11 unidades, commit único.