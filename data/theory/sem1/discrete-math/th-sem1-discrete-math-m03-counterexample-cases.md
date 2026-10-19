---
id: th-sem1-discrete-math-m03-counterexample-cases
title: Contraexemplo e prova por casos
discipline: discrete-math
module: m03
source:
  title: "Discrete Mathematics: An Open Introduction"
  authors: [Oscar Levin]
  url: https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html
  chapter: "3. Symbolic Logic and Proofs"
  section: "3.2 Proofs"
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
linked_lessons: [l16]
linked_exercises: [ex-sem1-discrete-math-m03-l16-contraexemplo-universal, ex-sem1-discrete-math-m03-l16-por-casos, ex-sem1-discrete-math-m03-l16-contraexemplo-41, ex-sem1-discrete-math-m03-c03-contraexemplo]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [proof by cases, conjecture]
original_excerpt: "It is almost NEVER okay to prove a statement with just an example. Certainly none of the statements proved above can be proved through an example."
---

## Ideia central

O valor de verdade de uma afirmação depende da sua forma. Uma afirmação **universal** diz que uma propriedade vale para todos os elementos do domínio; uma afirmação **existencial** diz que vale para pelo menos um. Essa diferença muda radicalmente o que serve como prova: um único exemplo pode confirmar uma afirmação existencial, mas nunca demonstra uma afirmação universal. Por outro lado, um único caso que falhe destrói a afirmação universal.

## Definição

A fonte é enfática ao tratar de afirmações universais:

> É quase NUNCA aceitável provar uma afirmação apenas com um exemplo.

Se a afirmação tem a forma $\forall x\,P(x)$, não se pode prová-la exibindo um valor de $x$ para o qual $P(x)$ é verdadeira. É preciso argumentar que a propriedade vale para todo elemento do domínio.

Um **contraexemplo** é um elemento do domínio para o qual $P(x)$ é falsa. Ele é suficiente para provar que $\forall x\,P(x)$ é falsa, pois a negação de uma afirmação universal é existencial: basta que exista um elemento que falhe.

Já uma afirmação existencial $\exists x\,P(x)$ pode ser provada por exemplo: encontra-se um elemento que satisfaz $P$ e a existência está estabelecida.

A **prova por casos** trata de situações em que se quer provar $P$, sabe-se que pelo menos um entre $Q_1, Q_2, \dots, Q_n$ ocorre e se mostra que cada $Q_i$ implica $P$. Se todos os casos implicam $P$ e pelo menos um deles necessariamente ocorre, então $P$ é verdadeira. A fonte destaca que o ponto essencial é garantir que um dos casos sempre se aplique.

## Exemplo resolvido

A fonte investiga a expressão $n^2 - n + 41$ para $n = 1, 2, 3, 4, 5, 6, 7$ e obtém $41, 43, 47, 53, 61, 71, 83$ — todos primos. Seria tentador conjeturar que $n^2 - n + 41$ é primo para todo inteiro positivo $n$. Porém, para $n = 41$:

$$41^2 - 41 + 41 = 41^2 = 1681,$$

que não é primo. Logo $n = 41$ é um **contraexemplo** e refuta a conjectura. O exemplo ilustra por que sete casos favoráveis não bastam: a afirmação era universal, e um único caso desfavorável a derruba.

*Exemplo adicional (IA):* para ilustrar a prova por casos, considere que $n^3 - n$ é par para todo inteiro $n$. Se $n$ é par, então $n = 2k$ e $n^3 - n = n(n^2 - 1)$ é par. Se $n$ é ímpar, então $n - 1$ e $n + 1$ são pares, e o produto $n(n-1)(n+1)$ é par. Os dois casos cobrem todos os inteiros, logo a afirmação vale sempre.

## Erros comuns

- **Provar uma afirmação universal com um exemplo.** A fonte diz que, para $\forall x\,P(x)$, isso é absolutamente insuficiente; o exemplo pode até ser verdadeiro e a afirmação universal continuar falsa.
- **Esquecer de cobrir todos os casos.** A prova por casos só conclui $P$ se pelo menos um dos casos $Q_i$ ocorrer necessariamente; casos que não esgotam as possibilidades deixam brechas.
- **Confundir contraexemplo com prova da existência.** O contraexemplo prova a **negação** da afirmação universal. Uma afirmação existencial é provada exibindo um elemento que satisfaça a propriedade, não um que a negue.

## Resumo

- Um exemplo não prova $\forall x\,P(x)$; no máximo ilustra.
- Um contraexemplo basta para refutar $\forall x\,P(x)$.
- Uma afirmação existencial pode ser provada por um exemplo (testemunha).
- Na prova por casos, cada caso deve implicar $P$ e os casos devem cobrir todas as possibilidades.
- A conjectura $n^2 - n + 41$ falha em $n = 41$, pois $41^2$ não é primo.
