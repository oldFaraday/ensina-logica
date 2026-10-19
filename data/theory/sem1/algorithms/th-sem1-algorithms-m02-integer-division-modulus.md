---
id: th-sem1-algorithms-m02-integer-division-modulus
title: Divisão inteira e módulo
discipline: algorithms
module: m02
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/integer-division-and-modulus/
  chapter: "II. Data and Operators"
  section: Integer Division and Modulus
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
linked_exercises: [ex-sem1-algorithms-m02-l06-divisao-inteira, ex-sem1-algorithms-m02-l06-quociente-resto, ex-sem1-algorithms-m02-challenge-modulo, ex-sem1-algorithms-m02-challenge-quociente-resto, ex-sem1-algorithms-m02-flash-modulo]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [integer division, modulus]
original_excerpt: "In integer division and modulus, the dividend is divided by the divisor into an integer quotient and a remainder."
---

## Ideia central

Na **divisão inteira**, o dividendo é dividido pelo divisor e o resultado é um quociente inteiro, sem a parte fracionária. O **módulo** é a outra parte desse mesmo cálculo: o resto da divisão. Juntos, quociente e resto descrevem o resultado de dividir dois inteiros.

## Definição

A fonte define: "In integer division and modulus, the dividend is divided by the divisor into an integer quotient and a remainder. The integer quotient operation is referred to as integer division, and the integer remainder operation is the modulus."

A divisão que produz parte fracionária é chamada de **divisão de ponto flutuante**. Quando os dois operandos são do tipo inteiro, a divisão pode se comportar de modo diferente, dependendo da linguagem, e é chamada de **divisão inteira**. A parte fracionária é descartada: a resposta é o quociente inteiro.

O módulo é o resto. Em muitas linguagens, o símbolo do operador de módulo é o sinal de porcentagem (`%`). A fonte observa que muitos compiladores exigem operandos inteiros dos dois lados do operador de módulo; usar ponto flutuante pode gerar erro de compilação.

## Exemplo resolvido

Considere `11 / 4` e `11 % 4`.

```pseudo
11 / 4   -> 2   (divisão inteira: quociente, sem a parte fracionária)
11 % 4   -> 3   (módulo: resto da divisão inteira)
```

A leitura é a mesma da escola: "onze dividido por quatro é dois, com resto três". O quociente inteiro é `2`; o resto é `3`. A fonte usa a analogia de distribuir 11 moedas entre 4 crianças: cada uma recebe 2 moedas e sobram 3.

A fonte também chama a atenção para um caso que costuma confundir:

```pseudo
6 / 24   -> 0   (quantas vezes 24 cabe em 6: zero)
6 % 24   -> 6   (o resto de 6 dividido por 24: seis)
```

## Erros comuns

- **Usar ponto flutuante no módulo.** A fonte avisa que muitos compiladores exigem operandos inteiros dos dois lados do `%`; caso contrário, ocorre erro de compilação.
- **Confundir `6 / 24` com `6 % 24`.** A divisão inteira dá `0`, porque 24 não cabe em 6; o módulo dá `6`, porque todo o valor sobra.
- **Esperar parte fracionária da divisão inteira.** Quando ambos os operandos são inteiros, a parte fracionária é descartada.

## Resumo

- Divisão inteira devolve o quociente inteiro, sem parte fracionária.
- Módulo devolve o resto da divisão inteira.
- `11 / 4` resulta em `2`; `11 % 4` resulta em `3`.
- `6 / 24` resulta em `0`; `6 % 24` resulta em `6`.
- Muitos compiladores exigem operandos inteiros no operador de módulo.
