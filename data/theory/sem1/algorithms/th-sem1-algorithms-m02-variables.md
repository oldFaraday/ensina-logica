---
id: th-sem1-algorithms-m02-variables
title: Variáveis e Tipos de Dados
discipline: algorithms
module: m02
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/data-types/
  chapter: "II. Data and Operators"
  section: Data Types
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
linked_lessons: [l04, l05, l06]
linked_exercises: [ex-sem1-algorithms-m02-l04-var-const, ex-sem1-algorithms-m02-l04-literal, ex-sem1-algorithms-m02-l04-identificador, ex-sem1-algorithms-m02-l04-code, ex-sem1-algorithms-m02-l04-flash, ex-sem1-algorithms-m02-l05-tipos, ex-sem1-algorithms-m02-l05-inteiro, ex-sem1-algorithms-m02-l05-string-bool, ex-sem1-algorithms-m02-l05-flash, ex-sem1-algorithms-m02-l05-code, ex-sem1-algorithms-m02-l06-precedencia, ex-sem1-algorithms-m02-l06-mod, ex-sem1-algorithms-m02-l06-atribuicao, ex-sem1-algorithms-m02-l06-code, ex-sem1-algorithms-m02-l06-flash]
original_excerpt: "A data type is a classification of data which tells the compiler or interpreter how the programmer intends to use the data."
---

Um **tipo de dado** diz ao compilador ou interpretador como o programador pretende usar um valor. Esta unidade trata de como armazenar dados em variáveis e constantes, dos tipos primitivos mais comuns e de como combiná-los em expressões usando operadores.

## Constantes e variáveis

- Uma **variável** é um item de dado cujo valor **pode mudar** durante a execução do programa.
- Uma **constante** é um item de dado cujo valor **não pode mudar** durante a execução.

Uma constante pode ser **literal** (um valor digitado diretamente no código, como `21`, `12.34`, `"Hello world!"` ou `false`) ou **nomeada** (um valor associado a um nome, muitas vezes escrito em MAIÚSCULAS):

```text
PI = 3.14159   # constante nomeada (em Python é possível alterar, mas não é boa prática)
raio = 2.0     # variável (o valor pode mudar)
```

Constantes nomeadas devem receber um valor no momento em que são definidas. Variáveis não precisam ser inicializadas imediatamente; podem receber um valor ao longo do programa.

## Nomes de identificadores

Os nomes dados a variáveis, constantes, funções etc. são **identificadores** e seguem regras técnicas e de estilo:

- Use apenas caracteres permitidos; em muitas linguagens o primeiro caractere deve ser uma letra ou `_`.
- Não use **palavras reservadas** da linguagem (como `if` ou `while`).
- Escolha nomes **significativos** (`preco`, e não `p`) e seja **consistente** com maiúsculas e minúsculas.

Estilos comuns de escrita são `camelCase`, `PascalCase` e `snake_case`. Por convenção, constantes costumam ser escritas em CAIXA ALTA (por exemplo `PI`).

## Tipos primitivos de dados

Os tipos primitivos mais comuns, presentes na maioria das linguagens, são:

| Tipo | Representa | Exemplos |
| --- | --- | --- |
| inteiro (*integer*) | números inteiros | `-5`, `0`, `123` |
| ponto flutuante (*real*) | números fracionários | `-87.5`, `3.14159` |
| string | sequência de caracteres | `"Hello world!"` |
| booleano | verdadeiro ou falso | `true`, `false` |
| nada (*nothing*) | ausência de dado | `null` |

O tipo **inteiro** representa números inteiros, sem parte fracionária: não existe nada entre 6 e 7, e os valores "saltam" de um para o outro. O tipo **ponto flutuante** usa uma representação com **mantissa** e **expoente** e oferece um equilíbrio entre alcance (*range*) e **precisão**. Já o tipo **string** é a sequência de caracteres, e o tipo **booleano** representa os conceitos lógicos de verdadeiro e falso, usados para controlar estruturas como `if` e `while`.

## Atribuição e expressões

Uma **atribuição** guarda um valor em uma variável. Em muitas linguagens o símbolo é o `=`, que significa "atribuir", e **não** igualdade matemática:

```pseudo
idade = 21
total_primos = 4 + 3 + 5 + 2
```

Uma **expressão** é uma sequência válida de operandos e operadores que se reduz a um único valor. Os operadores aritméticos básicos são `+` (soma), `-` (subtração), `*` (multiplicação), `/` (divisão) e `%` (módulo).

## Ordem das operações e divisão inteira

A **ordem das operações** (precedência) define o que é calculado primeiro:

1. Parênteses
2. Expoentes
3. Multiplicação / Divisão
4. Adição / Subtração

Assim, `2 + 3 * 4 + 5` vale `19`, porque `3 * 4` é calculado antes de `2 + 12 + 5`. Os parênteses mudam o resultado: `(2 + 3) * 4 + 5` vale `25`.

Quando **ambos os operandos são inteiros**, a divisão pode se comportar como **divisão inteira**, descartando a parte fracionária: `11 / 4` resulta em `2`. O **módulo** (`%`) devolve o **resto** dessa divisão: `11 % 4` resulta em `3`.

```pseudo
11 / 4   -> 2   (divisão inteira: quociente, sem a parte fracionária)
11 % 4   -> 3   (módulo: resto da divisão inteira)
```

Muitos compiladores exigem operandos inteiros nos dois lados do operador de módulo.
