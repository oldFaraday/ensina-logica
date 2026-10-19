---
id: th-sem1-discrete-math-m01-truth-tables
title: Tabelas-verdade e tautologias
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
linked_lessons: [l12]
linked_exercises: [ex-sem1-discrete-math-m01-l12-linhas, ex-sem1-discrete-math-m01-l12-tres-variaveis, ex-sem1-discrete-math-m01-l12-negacao-disjuncao, ex-sem1-discrete-math-m01-l12-passos, ex-sem1-discrete-math-m01-l12-tautologia, ex-sem1-discrete-math-m01-l12-monopoly]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [tautology, logical form]
original_excerpt: "Since the truth value of a statement is completely determined by the truth values of its parts and how they are connected, all you really need to know is the truth tables for each of the logical connectives."
---

## Ideia central

O valor de verdade de uma sentença composta depende apenas do conectivo e dos valores de verdade das partes. Por isso, para decidir quando ela é verdadeira, basta considerar todas as combinações possíveis de verdadeiro e falso. A **tabela-verdade** organiza essas combinações linha por linha e mostra, em uma coluna final, o valor da sentença em cada caso.

## Definição

Em cada linha da tabela, listamos uma combinação possível de V e F para as variáveis sentenciais e registramos se a sentença analisada é verdadeira ou falsa naquele caso. Fazemos isso para **todas** as combinações: uma proposição com $n$ variáveis gera $2^n$ linhas. Para três variáveis, por exemplo, a tabela precisa de 8 linhas.

Para sentenças complicadas, primeiro preenchemos colunas com as partes intermediárias, o que divide a tarefa em pedaços menores. Cada conectivo tem sua própria tabela, que apenas repete as condições de verdade já conhecidas.

Uma **tautologia** é uma sentença verdadeira com base apenas em sua **forma lógica**: a coluna final contém somente V, independentemente do significado das partes. Tautologias são sempre verdadeiras, mas não dizem nada sobre o mundo.

## Exemplo resolvido

A tabela de $\neg P \lor Q$ usa uma coluna intermediária para $\neg P$:

| $P$ | $Q$ | $\neg P$ | $\neg P \lor Q$ |
| --- | --- | --- | --- |
| V | V | F | V |
| V | F | F | F |
| F | V | V | V |
| F | F | V | V |

Atenção ao escopo: a sentença é $\neg P \lor Q$, e **não** $\neg(P \lor Q)$ — a negação se aplica somente a $P$.

Agora a sentença $(P \rightarrow Q) \lor (Q \rightarrow R)$, com 8 linhas:

| $P$ | $Q$ | $R$ | $P \rightarrow Q$ | $Q \rightarrow R$ | $(P \rightarrow Q) \lor (Q \rightarrow R)$ |
| --- | --- | --- | --- | --- | --- |
| V | V | V | V | V | V |
| V | V | F | V | F | V |
| V | F | V | F | V | V |
| V | F | F | F | V | V |
| F | V | V | V | V | V |
| F | V | F | V | F | V |
| F | F | V | V | V | V |
| F | F | F | V | V | V |

Como a coluna final contém apenas V, a sentença é uma tautologia.

## Erros comuns

- **Esquecer combinações.** Uma tabela incompleta não decide nada; com três variáveis são necessárias 8 linhas.
- **Confundir o escopo da negação.** $\neg P \lor Q$ não é o mesmo que $\neg(P \lor Q)$: no primeiro caso a negação pertence apenas a $P$.
- **Ler a coluna errada.** O que interessa é a coluna final da sentença; colunas intermediárias servem apenas de apoio.
- **Achar que uma tautologia depende do conteúdo.** A fonte mostra que a sentença sobre Monopoly é verdadeira nas 8 linhas sem que seja necessário saber nada sobre o jogo.

> **Exemplo adicional (IA):** montar as linhas sem uma ordem sistemática (por exemplo, alternar valores aleatoriamente) aumenta a chance de repetir ou omitir combinações. A fonte não prescreve uma ordem fixa, mas pede que todas as combinações apareçam.

## Resumo

- Tabela-verdade lista todas as combinações de V e F e o valor resultante.
- Com $n$ variáveis, há $2^n$ linhas.
- Colunas intermediárias facilitam o preenchimento da coluna final.
- Tautologia é verdadeira apenas pela forma lógica: coluna final só com V.
