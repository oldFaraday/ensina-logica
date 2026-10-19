---
id: th-sem1-discrete-math-m02-predicates-variables
title: Predicados e variáveis
discipline: discrete-math
module: m02
source:
  title: "Discrete Mathematics: An Open Introduction"
  authors: [Oscar Levin]
  url: https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html
  chapter: "0. Introduction and Preliminaries"
  section: "0.2 Mathematical Statements"
  access_date: 2026-10-19
  edition: 3rd Edition (2019)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-19
license: CC-BY-SA-4.0
derivation_type: translated
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-19
verification_method: manual_url_check
linked_lessons: [l14]
linked_exercises: [ex-sem1-discrete-math-m02-l14-variavel-livre, ex-sem1-discrete-math-m02-l14-predicado, ex-sem1-discrete-math-m02-l14-substituicao, ex-sem1-discrete-math-m02-l14-p7, ex-sem1-discrete-math-m02-l14-implicacao-livre, ex-sem1-discrete-math-m02-l14-connectivos]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [predicate, free variable, predicate logic]
original_excerpt: "For one thing, because this sentence has a free variable (that is, a variable that we have not specified anything about), it is not a statement. A sentence that contains variables is called a predicate."
---

## Ideia central

A lógica proposicional trata cada sentença atômica como um bloco fechado, com um único valor de verdade. A **lógica de predicados** amplia essa análise: olha para dentro da sentença e separa a **propriedade** que está sendo afirmada dos **objetos** aos quais ela se aplica. Assim, consegue representar afirmações como "todo primo maior que 2 é ímpar", que não podem ser analisadas apenas com conectivos.

## Definição

Uma **sentença** (*statement*) é uma frase declarativa que é verdadeira ou falsa. Já um **predicado** (*predicate*) é uma sentença que contém variáveis: ele ainda não tem valor de verdade definido, porque depende do valor que a variável receber. A variável que não foi especificada é chamada de **variável livre** (*free variable*).

A fonte exemplifica com o predicado $P(n)$, lido como "$n$ é primo". A frase $P(n) \rightarrow \neg P(n+7)$ parece uma implicação, mas não é uma sentença: como $n$ está livre, não se pode dizer ainda se ela é verdadeira ou falsa. Isso só acontece de duas maneiras: substituindo a variável por um valor específico ou **quantificando** a variável, isto é, dizendo a que conjunto de valores ela se refere.

A **lógica de predicados** (*predicate logic*) estende a lógica proposicional: os conectivos $\land$, $\lor$, $\rightarrow$, $\leftrightarrow$ e $\neg$ continuam valendo, mas agora podemos analisar as partes internas das proposições. A fonte destaca que tudo o que foi aprendido sobre equivalência lógica e deduções proposicionais continua aplicável.

## Exemplo resolvido

Considere o predicado $P(n)$: "$n$ é primo". A expressão $P(n)$ isolada não é uma proposição, pois depende de $n$. Ao substituir $n$ por $7$, obtemos $P(7)$: "$7$ é primo", que é uma proposição verdadeira. Ao substituir $n$ por $14$, obtemos $P(14)$: "$14$ é primo", que é uma proposição falsa.

O mesmo predicado pode ser usado na implicação $P(n) \rightarrow \neg P(n+7)$. Substituindo $n$ por um valor específico, a implicação vira uma proposição. A fonte observa que, para esse predicado, qualquer valor substituído em $n$ produz uma implicação verdadeira. Se, em vez de substituir, quantificarmos a variável, obtemos "para todo $n$, se $n$ é primo então $n+7$ não é primo", que é uma única proposição sobre todos os valores de $n$.

## Erros comuns

- **Achar que uma frase com variável livre já é proposição.** A fonte é explícita: como a sentença tem uma variável não especificada, ela **não** é uma statement; o valor de verdade só aparece após uma substituição ou quantificação.
- **Dizer que $P(n)$ é "verdadeiro" ou "falso" sem atribuir $n$.** O predicado não tem valor de verdade isolado; quem tem valor de verdade é a proposição obtida depois da substituição, como $P(7)$.
- **Confundir o predicado com a propriedade que ele descreve.** A fonte trata $P$ e $O$ como propriedades do argumento; a expressão $P(x)$ só se torna uma proposição quando $x$ recebe um valor ou é quantificado.
- **Pensar que a lógica de predicados abandona os conectivos.** A fonte afirma que a lógica de predicados **estende** a proposicional: os conectivos continuam sendo usados e as equivalências e deduções proposicionais seguem valendo.

## Resumo

- Sentença é uma frase declarativa com valor de verdade definido.
- Predicado é uma sentença com variáveis; isolado, não é proposição.
- Variável livre é a que ainda não foi especificada nem quantificada.
- Substituir a variável por um valor transforma o predicado em proposição.
- Quantificar a variável também produz uma proposição.
- A lógica de predicados estende a lógica proposicional, sem descartar seus conectivos.
