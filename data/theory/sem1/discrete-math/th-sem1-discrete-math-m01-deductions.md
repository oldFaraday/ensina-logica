---
id: th-sem1-discrete-math-m01-deductions
title: Deduções válidas e modus ponens
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
linked_lessons: [l20]
linked_exercises: [ex-sem1-discrete-math-m01-l20-validade, ex-sem1-discrete-math-m01-l20-modus-ponens, ex-sem1-discrete-math-m01-l20-premissas, ex-sem1-discrete-math-m01-l20-passos, ex-sem1-discrete-math-m01-l20-regra-exemplo, ex-sem1-discrete-math-m01-l20-contraexemplo]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [deduction rule, modus ponens, valid argument]
original_excerpt: "This is an example of a deduction rule, an argument form which is always valid. This one is a particularly famous rule called modus ponens."
---

## Ideia central

Um argumento é **válido** quando a conclusão não pode ser falsa se todas as premissas forem verdadeiras. Uma forma de argumento sempre válida chama-se **regra de dedução**. A mais conhecida é o *modus ponens*, que a partir de $P \rightarrow Q$ e $P$ conclui $Q$. Como a validade depende apenas da forma, tabelas-verdade permitem verificar uma regra linha por linha.

## Definição

Um argumento tem **premissas** e uma **conclusão**. Ele é **válido** quando a conclusão precisa ser verdadeira sempre que as premissas forem verdadeiras. Uma **regra de dedução** é uma forma de argumento que é sempre válida.

O *modus ponens* tem a forma:

| | $P \rightarrow Q$ |
| --- | --- |
| | $P$ |
| $\therefore$ | $Q$ |

A verificação por tabela-verdade segue três passos: montamos uma coluna para cada premissa e para a conclusão; localizamos as linhas em que **todas** as premissas são verdadeiras; e conferimos se, nessas linhas, a conclusão também é verdadeira. Se existir alguma linha com todas as premissas verdadeiras e a conclusão falsa, a regra **não** é válida.

## Exemplo resolvido

Considere a regra $P \rightarrow Q$, $\neg P \rightarrow Q$, logo $Q$:

| $P$ | $Q$ | $P \rightarrow Q$ | $\neg P$ | $\neg P \rightarrow Q$ |
| --- | --- | --- | --- | --- |
| V | V | V | F | V |
| V | F | F | F | V |
| F | V | V | V | V |
| F | F | V | V | F |

As duas premissas são verdadeiras ao mesmo tempo apenas nas linhas 1 e 3. Nelas, a conclusão $Q$ também é verdadeira, então a regra é válida.

Já a regra $P \rightarrow R$, $Q \rightarrow R$, $R$, logo $P \lor Q$ **não** é válida. Tomando $P$ = F, $Q$ = F e $R$ = V, as três premissas são verdadeiras, mas a conclusão $P \lor Q$ é falsa. Nessa mesma tabela, porém, percebemos uma regra válida: se $P \rightarrow R$, $Q \rightarrow R$ e $P \lor Q$ são verdadeiras, então $R$ é verdadeira.

## Erros comuns

- **Olhar só as linhas em que a conclusão é verdadeira.** O que importa são as linhas em que **todas as premissas** são verdadeiras; é nelas que a conclusão precisa valer.
- **Achar que toda conclusão verdadeira torna o argumento válido.** A validade olha para a relação entre premissas e conclusão, não para o valor isolado da conclusão.
- **Esquecer uma premissa.** A verificação exige considerar simultaneamente **todas** as premissas; basta uma linha com todas verdadeiras e conclusão falsa para invalidar a regra.
- **Confundir validade com verdade das premissas.** A regra pode ser válida mesmo que as premissas sejam falsas no mundo real; o que se testa é a forma.

> **Exemplo adicional (IA):** ao verificar uma regra à mão, listar as linhas das premissas antes de olhar a conclusão ajuda a evitar a tentação de "procurar" apenas os casos favoráveis. A fonte descreve o método, mas não oferece essa dica de organização.

## Resumo

- Argumento válido: conclusão verdadeira sempre que todas as premissas forem verdadeiras.
- Regra de dedução é uma forma de argumento sempre válida.
- *Modus ponens*: de $P \rightarrow Q$ e $P$ conclui-se $Q$.
- Uma única linha com premissas verdadeiras e conclusão falsa invalida a regra.
