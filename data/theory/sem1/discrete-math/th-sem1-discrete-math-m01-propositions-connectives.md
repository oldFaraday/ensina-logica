---
id: th-sem1-discrete-math-m01-propositions-connectives
title: Proposições, sentenças atômicas e conectivos
discipline: discrete-math
module: m01
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
linked_lessons: [l11]
linked_exercises: [ex-sem1-discrete-math-m01-l11-proposicao, ex-sem1-discrete-math-m01-l11-variavel-livre, ex-sem1-discrete-math-m01-l11-molecular, ex-sem1-discrete-math-m01-l11-implicacao, ex-sem1-discrete-math-m01-l11-disjuncao, ex-sem1-discrete-math-m01-l11-bicondicional]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [proposition, atomic statement, molecular statement]
original_excerpt: "A statement is any declarative sentence which is either true or false. A statement is atomic if it cannot be divided into smaller statements, otherwise it is called molecular."
---

## Ideia central

A lógica proposicional estuda **como as sentenças se combinam**. Para isso, ignora o conteúdo das frases e examina apenas o valor de verdade: cada parte é verdadeira ou falsa, e o conectivo determina o valor do todo. Por isso, afirmações de assuntos completamente diferentes podem ter exatamente a mesma forma lógica e se comportar do mesmo modo.

## Definição

Uma **sentença** (*statement*) é toda frase declarativa que é verdadeira ou falsa. Uma sentença é **atômica** quando não pode ser dividida em sentenças menores; caso contrário, ela é **molecular**. Perguntas, ordens e fragmentos não são sentenças; a frase "$3 + x = 12$", com $x$ livre, também não é, porque só passa a ter valor de verdade depois que $x$ recebe um valor.

A partir de sentenças atômicas construímos sentenças moleculares com **cinco conectivos**: conjunção ($P \land Q$, "P e Q"), disjunção ($P \lor Q$, "P ou Q"), implicação ($P \rightarrow Q$, "se P então Q"), bicondicional ($P \leftrightarrow Q$, "P se e somente se Q") e negação ($\neg P$, "não P"). Os quatro primeiros são **binários**, pois ligam duas sentenças; a negação é **unária**, pois se aplica a uma única sentença. O "ou" usado aqui é o **inclusivo**: $P \lor Q$ é verdadeira também quando $P$ e $Q$ são ambas verdadeiras.

As condições de verdade são: $P \land Q$ é verdadeira quando ambas as partes são verdadeiras; $P \lor Q$, quando ao menos uma é verdadeira; $P \rightarrow Q$, quando $P$ é falsa ou $Q$ é verdadeira; $P \leftrightarrow Q$, quando as duas têm o mesmo valor; e $\neg P$, quando $P$ é falsa. Na implicação, $P$ é a **hipótese** (antecedente) e $Q$ é a **conclusão** (consequente). O único caso em que ela é falsa é $P$ verdadeira e $Q$ falsa. O bicondicional equivale à conjunção $(P \rightarrow Q) \land (Q \rightarrow P)$.

## Exemplo resolvido

Classifique a frase "Os números de telefone nos EUA têm 10 dígitos e 42 é um quadrado perfeito".

A frase é declarativa, portanto é uma proposição. Como pode ser dividida em duas sentenças menores ligadas por "e", ela é **molecular**, do tipo conjunção. Podemos escrevê-la como $P \land Q$, com $P$ = "os números de telefone nos EUA têm 10 dígitos" e $Q$ = "42 é um quadrado perfeito". Para determinar o valor do todo, bastam os valores de $P$ e $Q$: o conteúdo das partes não importa.

## Erros comuns

- **Tratar perguntas ou ordens como proposições.** A fonte lista "Would you like some cake?" e "Go to your room!" entre os exemplos que **não** são sentenças.
- **Achar que a implicação só é verdadeira quando a hipótese é verdadeira.** A fonte explica que $P \rightarrow Q$ já é verdadeira quando $P$ é falsa, mesmo sem qualquer relação de causa entre as partes.
- **Ler o "ou" como exclusivo.** A fonte é explícita: para ela, $P \lor Q$ é verdadeira quando ambas as partes são verdadeiras.
- **Esquecer a variável livre.** A frase "$3 + x = 12$" só vira proposição quando $x$ recebe um valor; antes disso, não é nem verdadeira nem falsa.

> **Exemplo adicional (IA):** confundir a palavra "sentença" do dia a dia (qualquer frase) com a sentença lógica (declarativa, com valor de verdade) é uma confusão frequente. A fonte define o termo com precisão, mas não descreve essa confusão.

## Resumo

- Proposição é uma frase declarativa que é verdadeira ou falsa.
- Atômica = não pode ser dividida; molecular = construída com conectivos.
- Existem cinco conectivos: $\land$, $\lor$, $\rightarrow$, $\leftrightarrow$ e $\neg$.
- A implicação só é falsa com hipótese verdadeira e conclusão falsa.
- O "ou" da lógica proposicional é inclusivo, não exclusivo.
