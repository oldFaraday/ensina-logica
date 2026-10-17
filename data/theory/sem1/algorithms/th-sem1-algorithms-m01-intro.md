---
id: th-sem1-algorithms-m01-intro
title: Introdução a Algoritmos
discipline: algorithms
module: m01
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/program-design/
  chapter: "I. Introduction to Programming"
  section: Program Design
  access_date: 2026-10-17
  edition: 2nd Edition (2018)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-17
license: CC-BY-SA-4.0
derivation_type: summarized
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-17
verification_method: manual_url_check
linked_lessons: [l01, l02, l03]
linked_exercises: [ex-sem1-algorithms-m01-l01-algoritmo, ex-sem1-algorithms-m01-l01-pseudo, ex-sem1-algorithms-m01-l01-ipo, ex-sem1-algorithms-m01-l01-ordem, ex-sem1-algorithms-m01-l01-flash, ex-sem1-algorithms-m01-l02-simbolos, ex-sem1-algorithms-m01-l02-terminal, ex-sem1-algorithms-m01-l02-ordem-pseudo, ex-sem1-algorithms-m01-l02-code, ex-sem1-algorithms-m01-l03-tres, ex-sem1-algorithms-m01-l03-selecao, ex-sem1-algorithms-m01-l03-fluxo-if, ex-sem1-algorithms-m01-l03-ordem]
original_excerpt: "Program design consists of the steps a programmer should do before they start coding the program in a specific language."
---

Um **algoritmo** é uma sequência finita e ordenada de passos que descreve como resolver um problema ou realizar uma tarefa. Antes de escrever código em uma linguagem, é preciso planejar esse algoritmo. Esta unidade apresenta o que é o design de um programa, as principais ferramentas para documentar a lógica (pseudocódigo e fluxogramas) e as estruturas de controle que organizam qualquer algoritmo estruturado.

## Entender o programa: o modelo IPO

A primeira atividade do design de um programa é **entender o que ele deve fazer**. Para programas simples, isso costuma se resumir ao modelo **IPO**:

- **Entrada (Input)**: quais dados o programa recebe.
- **Processamento (Processing)**: que cálculo ou manipulação é feita com esses dados.
- **Saída (Output)**: o que o programa exibe ou devolve.

Também ajuda imaginar o programa em execução: o que aparece no monitor, o que o usuário digita no teclado e quais transformações acontecem entre a entrada e a saída.

## Planejar com ferramentas de design

Depois de entender o problema, o programador cria um **modelo** da lógica antes de codificar. O capítulo *Program Design* descreve três grandes áreas de atividade:

1. Entender o programa (IPO).
2. Usar ferramentas de design para criar um modelo.
3. Desenvolver **dados de teste** (entradas previstas e as saídas esperadas).

Planejar a lógica no papel antes de codificar é uma etapa muito importante; pular essa etapa é um dos maus hábitos mais comuns de quem está começando.

## Pseudocódigo

**Pseudocódigo** é uma descrição em linguagem natural dos passos de um algoritmo. A palavra *pseudo* significa "falso": o pseudocódigo imita código, mas **não é** código real — não existe compilador que o traduza para linguagem de máquina. Ele serve para documentar o design (a lógica ou algoritmo) antes de codificar.

```pseudo
Entrada
    exibir mensagem pedindo a primeira idade
    ler a primeira idade
    exibir mensagem pedindo a segunda idade
    ler a segunda idade
Processamento
    calcular a média somando as duas idades e dividindo por dois
Saída
    exibir a média
    pausar para o usuário ver a resposta
```

## Fluxogramas

Um **fluxograma** representa o algoritmo por meio de caixas ligadas por setas (*flow lines*). Os símbolos mais comuns são:

- **Terminal** (retângulo arredondado): início e fim.
- **Processo** (retângulo): um cálculo ou uma atribuição.
- **Entrada/Saída** (paralelogramo): ler ou exibir dados.
- **Decisão** (losango): uma pergunta de verdadeiro/falso.

O fluxo padrão é da esquerda para a direita e de cima para baixo. Fluxogramas e pseudocódigo são as duas ferramentas que todo programador deve saber usar; elas documentam a sequência, a seleção e a repetição.

## Estruturas de controle básicas

Programação estruturada organiza a lógica em três categorias de **estruturas de controle**:

- **Sequência**: executar uma instrução após a outra, na ordem listada (a maior parte do código).
- **Seleção**: escolher entre dois ou mais caminhos a partir de uma condição (por exemplo, `if/else`).
- **Iteração (repetição)**: executar o mesmo trecho várias vezes (por exemplo, `while` e `for`).

Uma quarta categoria, a **ramificação** (como o `goto`), permite saltar livremente pelo programa e é evitada por gerar *spaghetti code* — código difícil de ler e manter. A ideia de programação estruturada surgiu no fim da década de 1960 e hoje é consenso entre programadores.
