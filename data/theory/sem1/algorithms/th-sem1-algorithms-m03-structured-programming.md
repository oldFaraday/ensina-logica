---
id: th-sem1-algorithms-m03-structured-programming
title: Estruturas de controle e programação estruturada
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/structured-programming/
  chapter: "IV. Conditions"
  section: Structured Programming
  access_date: 2026-10-19
  edition: 2nd Edition (2018)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-19
license: CC-BY-SA-4.0
derivation_type: translated
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-19
verification_method: manual_url_check
linked_lessons: [l07]
linked_exercises: [ex-sem1-algorithms-m03-l07-if-else, ex-sem1-algorithms-m03-l07-classificar, ex-sem1-algorithms-m03-l07-spaghetti]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [control structures, structured programming, spaghetti code]
original_excerpt: "The mechanisms that allow us to control the flow of execution are called control structures. There are three main categories of control structures: Sequence, Selection, Iteration."
---
## Ideia central

Controlar o fluxo de execução significa decidir quais linhas de código serão executadas e quantas vezes. Os mecanismos que permitem esse controle são as **estruturas de controle**, que se dividem em três categorias principais: **sequência**, **seleção** e **iteração**. A programação estruturada é um paradigma que evita saltos incondicionais (`goto`) e organiza o código usando apenas essas três estruturas, prevenindo o "código espaguete" difícil de manter.

## Definição

A fonte define **estruturas de controle** (*control structures*) como "os mecanismos que nos permitem controlar o fluxo de execução dentro de um programa". Existem três categorias principais:

1. **Sequência** (*sequence*): executa instruções na ordem listada, uma após a outra. A maioria das linhas de código pertence a esta categoria.
2. **Seleção** (*selection*): escolhe entre dois ou mais caminhos alternativos com base em uma pergunta (expressão booleana). A resposta determina qual caminho (quais linhas de código) será executado.
3. **Iteração** (*iteration*), também chamada repetição: permite que um trecho de código seja executado várias vezes — zero, um número fixo ou indefinidamente até que uma condição seja atendida.

Uma quarta categoria, **ramificação** (*branching*), descreve estruturas não estruturadas que permitem saltos livres no programa (ex.: `goto`); ela é raramente usada na programação modular estruturada.

A **programação estruturada** (*structured programming*) surgiu no final dos anos 1960 com Edsger Dijkstra, que propôs um método "sem goto" para planejar a lógica de programas. No final do século XX, praticamente todos os cientistas da computação concordavam que aprender e aplicar esses conceitos é útil.

Todas as linguagens de alto nível possuem as três primeiras categorias. A maioria tem a estrutura `if then else` (seleção) e `while` (iteração); após essas duas, há variações por linguagem.

## Exemplo resolvido

Considere o fluxo de um programa simples que verifica se um número é par:

```pseudo
Receber numero          // Sequência
Se numero % 2 == 0      // Seleção: pergunta booleana
    Exibir "Par"
Senão
    Exibir "Ímpar"
Fim
Exibir "Fim do programa" // Sequência
```

- As linhas de recepção e exibição final são **sequência**.
- O `se/senão` é **seleção** (duas vias).
- Se o programa pedisse vários números em laço, isso seria **iteração**.

## Erros comuns

- **Usar `goto` ou saltos livres** para controlar o fluxo. A fonte classifica isso como "branching" e afirma que a programação estruturada evita essa categoria por gerar "spaghetti code" (código espaguete) difícil de seguir e manter.
- **Confundir seleção com iteração**. Seleção escolhe *um* caminho entre alternativas (executa uma vez); iteração *repete* um trecho várias vezes.
- **Achar que toda linguagem tem as mesmas estruturas**. A fonte alerta: após `if then else` e `while`, há "geralmente variações de linguagem".

> **Exemplo adicional (IA):** tentar simular um `switch`/`case` em Python (que não o possui nativamente) usando apenas `if/elif/else` não é um erro, mas a fonte observa que a implementação em código segue a abordagem de `if then else` aninhado.

## Resumo

- Estruturas de controle controlam o fluxo de execução.
- Três categorias: sequência, seleção, iteração.
- Programação estruturada evita `goto` (ramificação) e usa apenas as três categorias.
- Toda linguagem tem sequência, seleção e iteração; a maioria tem `if then else` e `while`.
- O termo "spaghetti code" refere-se a código não estruturado e difícil de manter.