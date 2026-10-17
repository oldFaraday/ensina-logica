---
id: th-sem1-discrete-math-m02-predicate-logic
title: Lógica de Predicados
discipline: discrete-math
module: m02
source:
  title: Discrete Mathematics: An Open Introduction
  authors: [Oscar Levin]
  url: https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html
  chapter: 0. Introduction and Preliminaries
  section: 0.2 Mathematical Statements
  access_date: 2026-10-17
  edition: 3rd Edition (2019)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-17
license: CC-BY-SA-4.0
derivation_type: summarized
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-17
verification_method: manual_url_check
linked_lessons: [l14, l15]
linked_exercises: [ex-sem1-discrete-math-m02-l14-quantificador-universal, ex-sem1-discrete-math-m02-l15-variavel-livre]
original_excerpt: "For one thing, because this sentence has a free variable (that is, a variable that we have not specified anything about), it is not a statement. A sentence that contains variables is called a predicate."
---

Nem toda afirmação pode ser analisada apenas com conectivos. Frases como "todo primo maior que 2 é ímpar" dependem de **variáveis** e de **propriedades** dessas variáveis. Esta unidade estuda a lógica de predicados: os quantificadores universal e existencial, o domínio de discurso, a negação de quantificadores e o escopo das variáveis. O texto baseia-se na Seção 0.2 (Predicados e Quantificadores) e na Seção 3.1 (Beyond Propositions / Além das proposições) de *Discrete Mathematics: An Open Introduction*.

## Predicados e variáveis

Considere a sentença $P(n)$, lida como "$n$ é primo". Ela não é uma proposição, porque contém uma variável **livre**: dependendo do valor de $n$, ela será verdadeira ou falsa, mas, isolada, não é nem uma coisa nem outra.

Uma sentença que contém variáveis é chamada de **predicado**. Ao substituir um valor específico para a variável, o predicado se torna uma proposição. Por exemplo, $P(7)$ ("7 é primo") é uma proposição verdadeira.

A lógica de predicados **estende** a lógica proposicional: os conectivos ($\land$, $\lor$, $\rightarrow$, $\iff$, $\neg$) continuam valendo, mas agora podemos olhar para dentro das proposições atômicas e analisar suas partes.

## Quantificadores universal e existencial

Existem dois quantificadores fundamentais em matemática:

- O quantificador existencial é $\exists$, lido "existe" ou "há". Por exemplo, $\exists x (x < 0)$ afirma que existe um número menor que $0$.
- O quantificador universal é $\forall$, lido "para todo" ou "todo". Por exemplo, $\forall x (x \ge 0)$ afirma que todo número é maior ou igual a $0$.

Um predicado com variável livre é uma sentença incompleta; uma forma de torná-lo uma proposição é **quantificar** a variável. Assim, "para todo $n$, se $n$ é primo então $n+7$ não é primo" captura o que queríamos dizer com $P(n) \rightarrow \neg P(n+7)$.

## Domínio de discurso e negação de quantificadores

O valor de verdade de uma afirmação quantificada depende do **domínio de discurso**: o conjunto de elementos sobre os quais quantificamos. Em matemática discreta, geralmente quantificamos sobre os números naturais $0, 1, 2, \dots$

Considere $\forall x \exists y (y < x)$, lida como "para todo $x$ existe um $y$ menor que $x$". Sobre os naturais, ela é **falsa**: quando $x = 0$ não há natural $y$ menor que $0$ (o valor $y = -1$ não pertence ao domínio). Para mostrar que a afirmação é falsa, provamos que sua negação é verdadeira.

A negação interage com os quantificadores trocando o tipo de quantificador:

$$\neg \forall x P(x) \equiv \exists x \neg P(x)$$

$$\neg \exists x P(x) \equiv \forall x \neg P(x)$$

Em palavras: se **não** é verdade que tudo tem a propriedade, então **algo** não tem essa propriedade; e se **não** existe algo com a propriedade, então **tudo** não tem essa propriedade.

## Variáveis livres, ligadas e escopo

Uma variável é **livre** quando não está sob o alcance de um quantificador. Uma sentença com variável livre não é proposição; quantificar a variável a **captura** (liga), transformando a sentença em proposição.

Por exemplo, a sentença $P(n) \rightarrow \neg P(n+7)$ tem $n$ livre. Ao quantificá-la, obtemos a proposição

$$\forall n (P(n) \rightarrow \neg P(n+7)),$$

cuja leitura é "para todo $n$, se $n$ é primo então $n+7$ não é primo". O quantificador define o **escopo** da variável: os elementos aos quais ele se aplica.

## Quantificadores implícitos e ordem dos quantificadores

Por convenção, muitas vezes relaxamos a notação: sentenças com predicados e variáveis livres são interpretadas como **universalmente quantificadas**. Assim, ao escrever $S(x) \rightarrow R(x)$ ("se $x$ é um quadrado, então $x$ é um retângulo"), entendemos, de fato,

$$\forall x (S(x) \rightarrow R(x)).$$

Atenção à **ordem** dos quantificadores. As afirmações

$$\forall x \exists y P(x,y) \qquad \text{e} \qquad \exists y \forall x P(x,y)$$

**não** são logicamente equivalentes: a ordem altera o significado. Além disso, na lógica de predicados não existe um procedimento sistemático análogo às tabelas-verdade para decidir se duas sentenças são equivalentes; é preciso raciocinar caso a caso.
