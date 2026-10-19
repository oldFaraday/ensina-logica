---
id: th-sem1-algorithms-m02-expressions-operators
title: Atribuição e expressões aritméticas
discipline: algorithms
module: m02
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/order-of-operations/
  chapter: "II. Data and Operators"
  section: Order of Operations
  access_date: 2026-10-19
  edition: 2nd Edition (2018)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_deed_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_note: "CC BY-SA 4.0 declarada na página do livro, exceto onde indicado; nenhuma imagem da fonte foi derivada."
  license_confirmed_at: 2026-10-19
license: CC-BY-SA-4.0
derivation_type: translated
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-19
verification_method: manual_url_check
linked_lessons: [l06]
linked_exercises: [ex-sem1-algorithms-m02-l06-atribuicao, ex-sem1-algorithms-m02-l06-precedencia, ex-sem1-algorithms-m02-l06-expressao, ex-sem1-algorithms-m02-l06-soma-variaveis, ex-sem1-algorithms-m02-challenge-parenteses, ex-sem1-algorithms-m02-challenge-ordem-atribuicao, ex-sem1-algorithms-m02-challenge-precedencia-mista, ex-sem1-algorithms-m02-flash-atribuicao, ex-sem1-algorithms-m02-flash-expressao, ex-sem1-algorithms-m02-flash-precedencia]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [assignment, expression, precedence]
original_excerpt: "The order of operations (or operator precedence) is a collection of rules that reflect conventions about which procedures to perform first in order to evaluate a given mathematical expression."
---

## Ideia central

Uma **atribuição** guarda um valor em uma variável. Do lado direito do símbolo `=` pode haver um valor simples ou uma **expressão**, que é avaliada antes de o resultado ser copiado para a variável. Quando a expressão tem vários operadores, a **precedência** e a associatividade determinam a ordem de avaliação.

## Definição

A fonte define atribuição como uma instrução que "sets and/or re-sets the value stored in the storage location(s) denoted by a variable name; in other words, it copies a value into the variable". O símbolo usado na maioria das linguagens é o `=`. A fonte é enfática: ao ver `=`, pense em **atribuição**, não em igualdade matemática. O operador tem dois operandos: à esquerda, geralmente o nome de uma variável; à direita, um valor ou uma expressão.

Os operadores aritméticos básicos são:

| Ação | Símbolo |
| --- | --- |
| Adição | `+` |
| Subtração | `-` |
| Multiplicação | `*` |
| Divisão | `/` |
| Módulo (associado a inteiros) | `%` |

Esses operadores são binários: têm dois operandos, que podem ser constantes ou variáveis. A expressão `idade + 1`, por exemplo, tem um operador (adição) e dois operandos: a variável `idade` e a constante literal `1`. Se `idade` valer 14, a expressão é avaliada como 15.

A **ordem das operações** (ou precedência de operadores) é o conjunto de regras que define o que é calculado primeiro. A fonte apresenta esta ordem: parênteses; expoentes; multiplicação e divisão; adição e subtração. A associatividade indica a ordem quando os operadores têm a mesma precedência; a adição, por exemplo, é avaliada da esquerda para a direita. A fonte alerta que as regras podem variar entre linguagens e que se deve consultar a tabela da linguagem usada.

## Exemplo resolvido

A fonte avalia a expressão `2 + 3 * 4 + 5` passo a passo:

1. A multiplicação tem precedência maior que a adição, então `3 * 4` vale `12`.
2. A expressão fica `2 + 12 + 5`.
3. A associatividade manda somar da esquerda para a direita: `2 + 12` vale `14`.
4. Por fim, `14 + 5` vale `19`.

Os parênteses mudam o resultado: `(2 + 3) * 4 + 5` vale `25`, e `(2 + 3) * (4 + 5)` vale `45`.

Uma atribuição pode usar esse resultado:

```pseudo
total_cousins = 4 + 3 + 5 + 2
```

A expressão à direita é avaliada como `14`; o valor `14` é então atribuído à variável `total_cousins`.

## Erros comuns

- **Ler `=` como igualdade.** A fonte diz explicitamente que, ao ver o símbolo, o programador deve pensar em atribuição. Em `age = 21`, o valor 21 é copiado para `age`.
- **Ignorar a precedência.** Sem parênteses, `2 + 3 * 4` não é `(2 + 3) * 4`; a multiplicação é feita antes.
- **Achar que todos os operandos precisam ser constantes.** A fonte mostra que a expressão pode conter nomes de variáveis, cujos valores são buscados antes do cálculo.

## Resumo

- Atribuição copia um valor para uma variável; `=` não significa igualdade.
- O lado direito do `=` pode ser um valor ou uma expressão.
- Os operadores aritméticos básicos são `+`, `-`, `*`, `/` e `%`.
- A ordem é: parênteses, expoentes, multiplicação/divisão, adição/subtração.
- Parênteses alteram a ordem de avaliação e, portanto, o resultado.
