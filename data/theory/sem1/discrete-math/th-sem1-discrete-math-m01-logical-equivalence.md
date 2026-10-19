---
id: th-sem1-discrete-math-m01-logical-equivalence
title: Equivalências lógicas
discipline: discrete-math
module: m01
source:
  title: "Discrete Mathematics: An Open Introduction"
  authors: [Oscar Levin]
  url: https://discrete.openmathbooks.org/dmoi3/sec_propositional.html
  chapter: "3. Symbolic Logic and Proofs"
  section: "3.1 Propositional Logic"
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
linked_lessons: [l13]
linked_exercises: [ex-sem1-discrete-math-m01-l13-implicacao-disjuncao, ex-sem1-discrete-math-m01-l13-de-morgan, ex-sem1-discrete-math-m01-l13-negacao-implicacao, ex-sem1-discrete-math-m01-l13-passos, ex-sem1-discrete-math-m01-l13-nao-equivalentes, ex-sem1-discrete-math-m01-l13-simplificar]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [logical equivalence, De Morgan's laws, double negation]
original_excerpt: "Two (molecular) statements P and Q are logically equivalent provided P is true precisely when Q is true. That is, P and Q have the same truth value under any assignment of truth values to their atomic parts."
---

## Ideia central

Dizer que duas proposições são **logicamente equivalentes** é dizer que elas têm sempre o mesmo valor de verdade: em qualquer combinação de valores das partes atômicas, ou ambas são verdadeiras, ou ambas são falsas. Reconhecer equivalências é útil porque reformular uma afirmação pode revelar como prová-la ou refutá-la, e permite simplificar uma proposição sem construir tabelas enormes.

## Definição

Duas proposições moleculares $P$ e $Q$ são **logicamente equivalentes** quando $P$ é verdadeira precisamente quando $Q$ é verdadeira; isto é, quando têm o mesmo valor de verdade em toda atribuição de valores às partes atômicas.

Para verificar uma equivalência, fazemos uma tabela-verdade para cada proposição e comparamos as **colunas finais**: se forem idênticas, as proposições são equivalentes. O método também serve para mostrar que duas proposições **não** são equivalentes — basta uma linha em que os valores difiram. Alternativamente, podemos encadear substituições por proposições equivalentes.

As equivalências usadas neste módulo vêm diretamente da fonte:

- **Leis de De Morgan:** $\neg(P \land Q) \equiv \neg P \lor \neg Q$ e $\neg(P \lor Q) \equiv \neg P \land \neg Q$.
- **Implicações são disjunções:** $P \rightarrow Q \equiv \neg P \lor Q$.
- **Dupla negação:** $\neg\neg P \equiv P$.
- **Negação de uma implicação:** $\neg(P \rightarrow Q) \equiv P \land \neg Q$.

## Exemplo resolvido

Vamos provar que $\neg(P \rightarrow Q) \equiv P \land \neg Q$ **sem** tabela-verdade, transformando a primeira proposição passo a passo:

$$\neg(P \rightarrow Q) \equiv \neg(\neg P \lor Q) \equiv \neg\neg P \land \neg Q \equiv P \land \neg Q.$$

O primeiro passo troca a implicação pela disjunção equivalente; o segundo aplica De Morgan; o terceiro usa a dupla negação. O resultado mostra que a **negação de uma implicação é uma conjunção**, e não uma implicação: ela é verdadeira exatamente quando a hipótese é verdadeira e a conclusão é falsa.

Também podemos constatar a não equivalência: $(P \lor Q) \rightarrow R$ e $(P \rightarrow R) \lor (Q \rightarrow R)$ **não** são equivalentes, pois na linha $P$ = V, $Q$ = F, $R$ = F a primeira é falsa enquanto a segunda é verdadeira.

## Erros comuns

- **Concluir equivalência só porque algumas linhas coincidem.** A equivalência exige que **todas** as linhas coincidam; a fonte lembra que o método da tabela-verdade também serve para provar que duas proposições **não** são equivalentes.
- **Tratar a negação de uma implicação como outra implicação.** A negação de $P \rightarrow Q$ é a conjunção $P \land \neg Q$; a fonte destaca esse ponto em um quadro próprio.
- **Aplicar De Morgan sem trocar o conectivo.** A negação de uma conjunção vira disjunção (e vice-versa), com a negação distribuída para cada parte.
- **Ignorar o escopo dos parênteses.** Em $\neg(P \lor Q)$, a negação atinge a disjunção inteira; sem parênteses, o significado seria outro.

> **Exemplo adicional (IA):** quando há muitas equivalências possíveis, trocar a ordem das substituições pode gerar caminhos diferentes, mas o resultado final equivalente deve ser o mesmo. A fonte apresenta apenas uma sequência de substituições e não discute ordens alternativas.

## Resumo

- Equivalentes = mesmo valor de verdade em todas as atribuições.
- A verificação pode ser feita por colunas finais idênticas ou por substituições encadeadas.
- De Morgan permite negar conjunções e disjunções distribuindo a negação e trocando o conectivo.
- $P \rightarrow Q \equiv \neg P \lor Q$ e $\neg(P \rightarrow Q) \equiv P \land \neg Q$.
- $\neg\neg P \equiv P$.
