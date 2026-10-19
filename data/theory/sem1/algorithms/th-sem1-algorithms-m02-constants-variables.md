---
id: th-sem1-algorithms-m02-constants-variables
title: Constantes e variáveis
discipline: algorithms
module: m02
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/constants-and-variables/
  chapter: "II. Data and Operators"
  section: Constants and Variables
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
linked_lessons: [l04]
linked_exercises: [ex-sem1-algorithms-m02-l04-const-var, ex-sem1-algorithms-m02-l04-literal, ex-sem1-algorithms-m02-l04-definicao, ex-sem1-algorithms-m02-l04-constante-nomeada, ex-sem1-algorithms-m02-challenge-constante, ex-sem1-algorithms-m02-flash-constante, ex-sem1-algorithms-m02-flash-variavel, ex-sem1-algorithms-m02-flash-literal, ex-sem1-algorithms-m02-flash-nomeada]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [constant, variable]
original_excerpt: "A constant is a data item whose value cannot change during the program’s execution. Thus, as its name implies – the value is constant."
---

## Ideia central

Uma **constante** é um item de dado cujo valor não pode mudar durante a execução do programa. Uma **variável** é um item de dado cujo valor pode mudar durante essa execução. A diferença entre as duas está, portanto, na possibilidade de alteração do valor enquanto o programa roda.

## Definição

A fonte define constante como "a data item whose value cannot change during the program’s execution" e variável como "a data item whose value can change during the program’s execution". O nome já indica o comportamento: o valor de uma constante permanece constante; o de uma variável pode variar.

As constantes aparecem de duas formas. A **constante literal** é um valor digitado no programa onde ele é necessário, como `21`, `12.34`, `'A'`, `"Hello world!"`, `false` ou `null`. A **constante nomeada** (também chamada de constante simbólica) é um valor representado por um nome. Muitas linguagens usam letras maiúsculas para definir constantes nomeadas, como em `PI = 3.14159`.

As regras de definição diferem: constantes nomeadas precisam receber um valor quando são definidas; variáveis não precisam receber um valor inicial. Uma variável definida pode receber um valor depois, no meio das instruções do programa. A fonte também observa que Python, tecnicamente, não oferece suporte a constantes nomeadas: é possível alterar o valor depois, embora isso nunca seja uma boa prática.

## Exemplo resolvido

Considere uma constante nomeada e uma variável:

```pseudo
PI = 3.14159        # constante nomeada: recebe valor na definição
valor = 3           # variável: pode receber outro valor depois
valor = 7           # nova atribuição à mesma variável
```

`PI` representa sempre `3.14159` durante a execução e, por convenção, é escrito em maiúsculas. `valor` começa com `3`, mas pode ser alterado para `7`; essa mudança é justamente o que caracteriza uma variável.

## Erros comuns

A fonte não apresenta uma lista de "erros comuns", mas suas regras permitem reconhecer dois enganos frequentes:

- **Definir uma constante nomeada sem valor.** A fonte afirma que constantes nomeadas precisam receber um valor no momento da definição; variáveis é que podem ficar sem valor inicial.
- **Achar que o nome em maiúsculas torna o valor imutável em qualquer linguagem.** Em Python, a alteração é tecnicamente possível, mas a fonte a classifica como prática ruim.

> **Exemplo adicional (IA) — verificar:** tratar `PI` como uma variável comum e reatribuir seu valor é um exemplo de uso que contraria a convenção de constantes nomeadas, ainda que a linguagem permita a operação.

## Resumo

- Constante: valor que não muda durante a execução do programa.
- Variável: valor que pode mudar durante a execução.
- Constante literal é um valor escrito diretamente no código.
- Constante nomeada é um valor associado a um nome, muitas vezes em maiúsculas.
- Constantes nomeadas recebem valor na definição; variáveis podem receber valor depois.
