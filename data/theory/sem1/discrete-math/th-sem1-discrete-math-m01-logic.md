---
id: th-sem1-discrete-math-m01-logic
title: Lógica Proposicional
discipline: discrete-math
module: m01
source:
  title: Discrete Mathematics: An Open Introduction
  authors: [Oscar Levin]
  url: https://discrete.openmathbooks.org/dmoi3/sec_propositional.html
  chapter: 3. Symbolic Logic and Proofs
  section: 3.1 Propositional Logic
  access_date: 2026-10-16
  edition: 3rd Edition (2019)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-16
license: CC-BY-SA-4.0
derivation_type: summarized
language: pt-BR
verification_status: verified_with_source
linked_lessons: [l11, l12, l13]
linked_exercises: [ex-sem1-discrete-math-m01-l11-proposicao, ex-sem1-discrete-math-m01-l12-tabela-verdade]
original_excerpt: "Two (molecular) statements P and Q are logically equivalent provided P is true precisely when Q is true."
---

Esta unidade reúne os fundamentos da lógica proposicional: o que são proposições, como os conectivos determinam valores de verdade, como as tabelas-verdade organizam todos os casos possíveis e como reconhecer proposições logicamente equivalentes. O texto segue a Seção 3.1 (tabelas-verdade, equivalências e deduções) e a Seção 0.2 (definição dos conectivos e suas condições de verdade) de *Discrete Mathematics: An Open Introduction*.

## Proposições e conectivos

Uma **proposição** (ou sentença) é qualquer sentença declarativa que é verdadeira ou falsa. Uma proposição é **atômica** quando não pode ser dividida em proposições menores; caso contrário, é chamada **molecular**.

Nem toda frase é uma proposição. Perguntas ("Que dia é hoje?"), ordens ("Some dois números.") e sentenças com variável livre — como $3 + x = 12$ — não têm valor de verdade definido e, por isso, não são proposições.

A partir de proposições atômicas construímos proposições moleculares usando cinco conectivos:

- $P \land Q$: conjunção, lida como "P e Q".
- $P \lor Q$: disjunção, lida como "P ou Q" (o *ou* é inclusivo).
- $P \rightarrow Q$: implicação (condicional), lida como "se P então Q".
- $P \iff Q$: bicondicional, lida como "P se e somente se Q".
- $\neg P$: negação, lida como "não P".

O valor de verdade de uma proposição molecular depende apenas do conectivo e dos valores de verdade das partes:

- $P \land Q$ é verdadeira quando $P$ e $Q$ são ambas verdadeiras.
- $P \lor Q$ é verdadeira quando $P$ ou $Q$ (ou ambas) são verdadeiras.
- $P \rightarrow Q$ é verdadeira quando $P$ é falsa ou $Q$ é verdadeira.
- $P \iff Q$ é verdadeira quando $P$ e $Q$ têm o mesmo valor de verdade.
- $\neg P$ é verdadeira quando $P$ é falsa.

Em uma implicação $P \rightarrow Q$, chamamos $P$ de **hipótese** (antecedente) e $Q$ de **conclusão** (consequente). A única maneira de a implicação ser falsa é a hipótese ser verdadeira **e** a conclusão ser falsa.

## Tabelas-verdade

Para decidir quando uma proposição molecular é verdadeira, montamos uma **tabela-verdade**: em cada linha listamos uma combinação possível de valores V/F para as variáveis e registramos o valor da proposição. Para afirmações complicadas, primeiro preenchemos colunas com as partes intermediárias, o que divide a tarefa em pedaços menores.

A tabela de cada conectivo repete as condições de verdade acima:

| $P$ | $Q$ | $P \land Q$ | $P \lor Q$ | $P \rightarrow Q$ | $P \iff Q$ |
| --- | --- | --- | --- | --- | --- |
| V | V | V | V | V | V |
| V | F | F | V | F | F |
| F | V | F | V | V | F |
| F | F | F | F | V | V |

A negação tem a seguinte tabela:

| $P$ | $\neg P$ |
| --- | --- |
| V | F |
| F | V |

Uma proposição com $n$ variáveis gera $2^n$ linhas, pois há exatamente $2^n$ combinações de valores. Com duas variáveis, portanto, há $4$ linhas; com três, $8$.

Uma **tautologia** é uma afirmação verdadeira apenas com base em sua forma lógica: sua coluna final contém somente V. Por exemplo, $(P \rightarrow Q) \lor (Q \rightarrow R)$ é uma tautologia, e não precisamos saber o que $P$, $Q$ e $R$ significam para concluir isso.

## Equivalências lógicas

Duas proposições moleculares $P$ e $Q$ são **logicamente equivalentes** quando $P$ é verdadeira exatamente quando $Q$ é verdadeira, isto é, quando têm o mesmo valor de verdade em toda atribuição de valores às partes atômicas.

Para verificar uma equivalência, fazemos uma tabela-verdade para cada proposição e comparamos as colunas finais: se forem idênticas, as proposições são equivalentes. Este método também serve para mostrar que duas proposições **não** são equivalentes (basta uma linha em que os valores difiram).

Toda implicação pode ser reescrita como uma disjunção, como mostram as colunas coincidentes de $P \rightarrow Q$ e $\neg P \lor Q$:

$$P \rightarrow Q \equiv \neg P \lor Q$$

Reconhecer equivalências é útil porque reformular uma afirmação pode revelar como prová-la ou refutá-la.

## Leis de De Morgan, dupla negação e negação de implicação

As equivalências a seguir permitem simplificar proposições sem escrever tabelas-verdade completas.

**Leis de De Morgan:**

$$\neg(P \land Q) \equiv \neg P \lor \neg Q$$

$$\neg(P \lor Q) \equiv \neg P \land \neg Q$$

Ou seja, ao distribuir uma negação sobre uma conjunção obtemos uma disjunção (e vice-versa), negando cada parte.

**Dupla negação:**

$$\neg\neg P \equiv P$$

**Negação de uma implicação:**

$$\neg(P \rightarrow Q) \equiv P \land \neg Q$$

Note que a negação de uma implicação **não** é uma implicação: é uma conjunção. Ela é verdadeira exatamente quando a hipótese é verdadeira e a conclusão é falsa.

## Deduções válidas

Um argumento é **válido** quando a conclusão precisa ser verdadeira sempre que as premissas forem verdadeiras. Uma **regra de dedução** é uma forma de argumento sempre válida. A mais famosa é o *modus ponens*:

|  | $P \rightarrow Q$ |
| --- | --- |
|  | $P$ |
| $\therefore$ | $Q$ |

Usando a tabela-verdade de $P \rightarrow Q$ vemos: nos casos em que as duas premissas ($P \rightarrow Q$ e $P$) são verdadeiras, a conclusão $Q$ também é verdadeira. É assim que se verifica a validade de uma regra de dedução: procuramos as linhas em que **todas** as premissas são verdadeiras e conferimos se, nelas, a conclusão também é verdadeira.
