---
id: th-sem1-algorithms-m01-program-design
title: Design de programa e modelo IPO
discipline: algorithms
module: m01
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/program-design/
  chapter: "I. Introduction to Programming"
  section: Program Design
  access_date: 2026-10-19
  edition: 2nd Edition (2018)
  license_url: https://press.rebus.community/programmingfundamentals/
  license_deed_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_note: "CC BY-SA 4.0 declarada na página do livro, exceto onde indicado; nenhuma imagem da fonte foi derivada."
  license_confirmed_at: 2026-10-19
license: CC-BY-SA-4.0
derivation_type: translated
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-19
verification_method: manual_url_check
linked_lessons: [l01]
linked_exercises: [ex-sem1-algorithms-m01-l01-design, ex-sem1-algorithms-m01-l01-tres-areas, ex-sem1-algorithms-m01-l01-ipo, ex-sem1-algorithms-m01-l01-ordem-areas, ex-sem1-algorithms-m01-l01-identificar-ipo, ex-sem1-algorithms-m01-l01-flash-design, ex-sem1-algorithms-m01-challenge-design, ex-sem1-algorithms-m01-challenge-areas, ex-sem1-algorithms-m01-flash-design, ex-sem1-algorithms-m01-flash-ipo, ex-sem1-algorithms-m01-flash-test-data]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [program design, IPO, test data]
original_excerpt: "Program design consists of the steps a programmer should do before they start coding the program in a specific language."
---

## Ideia central

Antes de escrever código em uma linguagem específica, o programador faz o **design do programa**: entende o que o programa deve fazer, cria um modelo da lógica e prepara dados de teste. Essas etapas, quando bem documentadas, tornam o programa mais fácil de manter. A fonte organiza o design em três grandes áreas de atividade: entender o programa, usar ferramentas de design para criar um modelo e desenvolver dados de teste.

## Definição

**Design de programa** (program design) é o conjunto de etapas que o programador realiza antes de começar a codificar o programa em uma linguagem específica. A fonte não apresenta uma definição formal separada de "algoritmo"; usa o termo como a lógica ou o design documentado do programa — por exemplo, ao dizer que o pseudocódigo documenta "the logic or algorithm of each function".

Para **entender o programa**, a fonte recomenda o modelo **IPO**: **Inputs** (entradas), **Processing** (processamento) e **Outputs** (saídas). Entender o propósito de um programa normalmente envolve entender o que o usuário fornece, o que é calculado ou manipulado e o que aparece como resultado. A fonte sugere até visualizar o programa em execução: o que aparece no monitor, o que o usuário digita no teclado e quais transformações acontecem.

As três áreas de atividade são:

1. **Entender o programa** — identificar entradas, processamento e saídas.
2. **Usar ferramentas de design para criar um modelo** — por exemplo, pseudocódigo e fluxograma.
3. **Desenvolver dados de teste** — fornecer valores de entrada e prever as saídas.

## Exemplo resolvido

Aplicando o modelo IPO a um programa simples, o programador faz três listas antes de codificar:

- **Entradas:** quais dados o usuário digita (por exemplo, dois números).
- **Processamento:** qual operação o computador realiza com esses dados (por exemplo, somar e dividir).
- **Saídas:** o que o programa exibe na tela (por exemplo, o resultado).

A fonte observa que essa abordagem IPO funciona muito bem para iniciantes e que, com o tempo, o programa pode ser dividido em módulos ou funções; nesse caso, cada função tem seu próprio trecho de lógica documentado.

## Erros comuns

Um erro que a própria fonte aponta é **pular a etapa de design**: "Many students develop poor habits and skipping this step is one of them." Entender a lógica e planejar o algoritmo no papel antes de codificar é descrito como um conceito muito importante.

**Exemplo adicional (IA):** outro erro frequente é começar pela sintaxe da linguagem antes de saber quais são as entradas, o processamento e as saídas. A fonte não trata especificamente desse erro; ele é apresentado aqui apenas como aplicação do modelo IPO.

## Resumo

- Design de programa é o que se faz **antes** de codificar.
- A fonte organiza o design em três áreas: entender, modelar e testar.
- O modelo **IPO** decompõe o propósito do programa em entradas, processamento e saídas.
- Dados de teste são valores de entrada acompanhados das saídas previstas.
- Pular o design é um mau hábito que a fonte critica explicitamente.
