---
id: th-sem1-algorithms-m01-structured-programming
title: Programação estruturada e estruturas de controle
discipline: algorithms
module: m01
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/structured-programming/
  chapter: "IV. Conditions"
  section: Structured Programming
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
linked_lessons: [l19]
linked_exercises: [ex-sem1-algorithms-m01-l19-tres-categorias, ex-sem1-algorithms-m01-l19-ramificacao, ex-sem1-algorithms-m01-l19-selecao, ex-sem1-algorithms-m01-l19-zero-vezes, ex-sem1-algorithms-m01-l19-goto, ex-sem1-algorithms-m01-l19-historia, ex-sem1-algorithms-m01-challenge-iteracao, ex-sem1-algorithms-m01-challenge-dijkstra, ex-sem1-algorithms-m01-flash-structured, ex-sem1-algorithms-m01-flash-spaghetti]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [structured programming, control structures, spaghetti code]
original_excerpt: "Structured programming is a programming paradigm aimed at improving the clarity, quality, and development time of a computer program by making extensive use of the structured control flow constructs of selection (if/then/else) and repetition (while and for), block structures, and subroutines in contrast to using simple tests and jumps such as the go to statement, which can lead to “spaghetti code” that is potentially difficult to follow and maintain."
---

## Ideia central

**Programação estruturada** é um paradigma que busca melhorar a clareza, a qualidade e o tempo de desenvolvimento de um programa. Para isso, usa amplamente as construções estruturadas de controle de fluxo — seleção (if/then/else) e repetição (while e for) —, blocos e sub-rotinas, em vez de testes e saltos simples como o `go to`. O resultado esperado é um código mais fácil de seguir e manter.

## Definição

A fonte define programação estruturada como um paradigma "aimed at improving the clarity, quality, and development time of a computer program by making extensive use of the structured control flow constructs of selection (if/then/else) and repetition (while and for), block structures, and subroutines in contrast to using simple tests and jumps such as the go to statement, which can lead to 'spaghetti code' that is potentially difficult to follow and maintain."

Os mecanismos que permitem controlar o fluxo de execução são chamados **estruturas de controle** (control structures). A fonte lista **três categorias principais**:

1. **Sequência (sequence):** executar uma instrução e depois a próxima, na ordem listada. A maior parte das linhas de código é assim.
2. **Seleção (selection):** escolher entre dois ou mais fluxos. A escolha é decidida por uma pergunta, e a resposta determina qual caminho será executado.
3. **Iteração (iteration), também chamada de repetição:** executar um trecho de código várias vezes. O trecho pode não ser executado nenhuma vez (zero repetições), um número fixo de vezes ou indefinidamente até uma condição ser satisfeita.

Há ainda uma **quarta categoria**, que descreve código não estruturado:

- **Ramificação (branching):** estrutura não controlada que permite ao fluxo de execução saltar para outra parte do programa. É raramente usada em programação modular estruturada.

A fonte registra que o conceito começou no fim da década de 1960, com um artigo de Edsger Dijkstra. Ele propôs um método "go to less" que eliminava a necessidade da categoria de ramificação. O tema foi debatido por cerca de 20 anos; ao fim do século XX, quase todos os cientistas da computação estavam convencidos de que era útil aprender e aplicar os conceitos de programação estruturada.

## Exemplo resolvido

Classificando três descrições:

- "Executar a instrução A, depois a B, depois a C" → **sequência**.
- "Se a idade for maior que 17, seguir por um caminho; senão, por outro" → **seleção**.
- "Enquanto o contador for menor que 5, repetir a mensagem e incrementar o contador" → **iteração**.

A fonte usa os nomes *if then else* e *while* apenas como exemplos de estruturas das categorias seleção e iteração; a classificação não depende da sintaxe de uma linguagem específica.

## Erros comuns

Um erro comum é tratar a **ramificação** (`goto`) como uma quarta categoria "normal" da programação estruturada. A fonte a descreve como uma estrutura **não controlada**, raramente usada em programação modular estruturada, e associada a "spaghetti code". Outro erro é achar que a iteração sempre executa o trecho pelo menos uma vez: a fonte diz explicitamente que o código pode ser repetido **zero vezes**.

## Resumo

- Programação estruturada prioriza clareza, qualidade e tempo de desenvolvimento.
- As três categorias principais são sequência, seleção e iteração.
- Ramificação (`goto`) é uma quarta categoria não estruturada e raramente usada.
- A iteração pode executar o trecho zero, um número fixo ou indefinido de vezes.
- Dijkstra propôs o método "go to less" no fim da década de 1960; o tema foi debatido por cerca de 20 anos.
