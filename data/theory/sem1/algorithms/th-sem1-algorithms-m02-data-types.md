---
id: th-sem1-algorithms-m02-data-types
title: Tipos primitivos de dados
discipline: algorithms
module: m02
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/data-types/
  chapter: "II. Data and Operators"
  section: Data Types
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
linked_lessons: [l05]
linked_exercises: [ex-sem1-algorithms-m02-l05-inteiro, ex-sem1-algorithms-m02-l05-string, ex-sem1-algorithms-m02-l05-real, ex-sem1-algorithms-m02-l05-booleano, ex-sem1-algorithms-m02-l05-declaracoes, ex-sem1-algorithms-m02-l05-inteiro-real, ex-sem1-algorithms-m02-challenge-string, ex-sem1-algorithms-m02-flash-tipo, ex-sem1-algorithms-m02-flash-inteiro, ex-sem1-algorithms-m02-flash-float]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [data type, floating point, nothing data type]
original_excerpt: "A data type is a classification of data which tells the compiler or interpreter how the programmer intends to use the data."
---

## Ideia central

Um **tipo de dado** é uma classificação que informa ao compilador ou interpretador como o programador pretende usar o dado. Entender os tipos é parte central de projetar e escrever programas, porque cada tipo determina quais valores podem ser armazenados e quais operações fazem sentido.

## Definição

A fonte define tipo de dado como "a classification of data which tells the compiler or interpreter how the programmer intends to use the data". Os tipos comuns aparecem na tabela a seguir.

| Tipo | Representa | Exemplos |
| --- | --- | --- |
| inteiro (*integer*) | números inteiros | `-5`, `0`, `123` |
| ponto flutuante (*floating point* ou *real*) | números fracionários | `-87.5`, `0.0`, `3.14159` |
| string | sequência de caracteres | `"Hello world!"` |
| booleano (*Boolean*) | verdadeiro ou falso | `true`, `false` |
| nada (*nothing*) | ausência de dado | `null` |

O tipo **inteiro** representa números inteiros, sem parte fracionária. Os valores saltam de um para o outro: não há nada entre 6 e 7. A fonte observa que o inteiro é útil para contar e controlar o fluxo do programa, e que o processamento inteiro costuma ser mais rápido no processador do que o de ponto flutuante.

O tipo **ponto flutuante** representa números com parte fracionária. Ele é armazenado tecnicamente como dois valores inteiros — uma **mantissa** e um **expoente** — e oferece um equilíbrio entre alcance (*range*) e **precisão**. Quanto mais bytes de armazenamento, maiores podem ser a mantissa e o expoente, e maior a precisão.

O tipo **string** é uma sequência de caracteres, podendo ser uma constante literal ou uma variável. O tipo **booleano** representa os conceitos lógicos de verdadeiro e falso e é usado para controlar estruturas como `if` e `while`. O tipo **nada** permite indicar um valor ausente ou não inicializado, em vez de usar o valor zero; em muitas linguagens isso é feito com uma palavra reservada como `null` ou `None`.

## Exemplo resolvido

A fonte apresenta um pseudocódigo que declara uma variável de cada tipo e atribui valores:

```pseudo
Declare Integer i
Declare Real r
Declare String s
Declare Boolean b

Assign i = 1234567890
Assign r = 1.23456789012345
Assign s = "string"
Assign b = true
```

Cada declaração escolhe o tipo adequado ao valor que será guardado: um número inteiro para `i`, um número fracionário para `r`, uma sequência de caracteres para `s` e um valor lógico para `b`.

## Erros comuns

A fonte não apresenta uma lista de "erros comuns"; os itens abaixo são aplicações diretas das definições:

- **Guardar um número fracionário em um tipo inteiro.** O inteiro não tem parte fracionária; os valores saltam de um inteiro para o próximo.
- **Esperar precisão ilimitada de ponto flutuante.** A fonte descreve o ponto flutuante como uma aproximação, com um compromisso entre alcance e precisão.
- **Tratar uma string como se fosse um número.** String é uma sequência de caracteres; os caracteres `"123"` não são automaticamente o número `123`.

> **Exemplo adicional (IA) — verificar:** usar `null` para representar zero é um engano, pois a fonte define o tipo nada como ausência de dado, e não como o valor zero.

## Resumo

- Tipo de dado informa como o programador pretende usar o dado.
- Inteiro representa números inteiros, sem parte fracionária.
- Ponto flutuante representa números fracionários e troca alcance por precisão.
- String é uma sequência de caracteres; booleano representa verdadeiro ou falso.
- O tipo nada indica valor ausente ou não inicializado.
