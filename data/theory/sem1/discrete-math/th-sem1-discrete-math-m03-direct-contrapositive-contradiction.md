---
id: th-sem1-discrete-math-m03-direct-contrapositive-contradiction
title: Prova direta, contrapositiva e contradição
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
linked_exercises: [ex-sem1-discrete-math-m03-l16-prova-direta, ex-sem1-discrete-math-m03-l16-contrapositiva, ex-sem1-discrete-math-m03-l16-contradicao, ex-sem1-discrete-math-m03-c01-metodo, ex-sem1-discrete-math-m03-c05-contradicao]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [direct proof, proof by contrapositive, proof by contradiction]
original_excerpt: "The simplest (from a logic perspective) style of proof is a direct proof. Often all that is required to prove something is a systematic explanation of what everything means."
---

## Ideia central

Uma prova matemática é um argumento: uma sequência de afirmações cuja última é a **conclusão**, que decorre das anteriores. A fonte compara a escrita de provas a uma arte e observa que não há caminho garantido para encontrá-las, mas há alguns estilos padrão que aparecem repetidamente. Conhecer esses estilos ajuda a entender provas prontas e a organizar as suas.

## Definição

Na **prova direta** de uma implicação $P \rightarrow Q$, assume-se $P$ e explica-se, passo a passo, por que $Q$ deve valer:

> Assuma $P$. Explique, explique, …, explique. Portanto $Q$.

Para provar uma afirmação universal da forma $\forall x\,(P(x) \rightarrow Q(x))$, fixa-se um elemento $x$ **arbitrário** do domínio e deduz-se $Q(x)$ a partir de $P(x)$. Como $x$ não recebeu nenhuma propriedade especial, o resultado vale para todos.

A **prova por contrapositiva** usa o fato de que $P \rightarrow Q$ é logicamente equivalente a $\neg Q \rightarrow \neg P$. Em vez de assumir $P$, assume-se $\neg Q$ e conclui-se $\neg P$. A fonte resume:

> Assuma $\neg Q$. Explique, explique, … explique. Portanto $\neg P$.

Isso é suficiente porque a contrapositiva é equivalente à implicação original.

A **prova por contradição** é usada quando a afirmação não se reescreve facilmente como implicação. Para provar $P$, assume-se $\neg P$ e mostra-se que essa suposição leva a uma contradição. Se $\neg P$ é impossível, então $P$ é verdadeira. A fonte aplica o método para provar que existem infinitos primos: supõe que há finitos primos, toma o maior deles $p$ e considera $N = p! + 1$. Como todo número menor ou igual a $p$ divide $p!$, nenhum deles divide $N$; logo a fatoração de $N$ contém um primo maior que $p$, contrariando a escolha de $p$.

## Exemplo resolvido

A fonte prova por **prova direta** que, para todo inteiro $n$, se $n$ é par, então $n^2$ é par. Fixamos um inteiro arbitrário $n$ e assumimos que $n$ é par. Então existe um inteiro $k$ tal que $n = 2k$. Elevando ao quadrado:

$$n^2 = (2k)^2 = 4k^2 = 2(2k^2).$$

Como $2k^2$ é inteiro, $n^2$ é o dobro de um inteiro e, portanto, é par. O argumento não usou nenhuma informação particular sobre $n$ além da paridade; por isso vale para todo inteiro.

## Erros comuns

*Exemplo adicional (IA): os itens abaixo aplicam o formato descrito na fonte a tropeços típicos; não são uma lista do autor.*

- **Provar a conversa em vez da contrapositiva.** A contrapositiva de $P \rightarrow Q$ é $\neg Q \rightarrow \neg P$, e não $Q \rightarrow P$. A fonte usa a contrapositiva justamente porque ela é equivalente à implicação original.
- **Assumir a conclusão na prova direta.** O formato começa assumindo $P$, não $Q$. Assumir $Q$ e deduzir $P$ prova a conversa, que é outra afirmação.
- **Não fixar um elemento arbitrário.** Ao provar $\forall x\,(P(x) \rightarrow Q(x))$, o elemento $x$ precisa ser arbitrário; usar um caso particular não cobre os demais.
- **Afirmar uma contradição sem mostrá-la.** Na prova por contradição, é preciso encadear a hipótese $\neg P$ até uma conclusão impossível, como a fonte faz com o maior primo $p$.

## Resumo

- Prova direta de $P \rightarrow Q$: assumir $P$ e deduzir $Q$.
- Prova por contrapositiva: assumir $\neg Q$ e deduzir $\neg P$, pois a contrapositiva é equivalente.
- Prova por contradição: assumir $\neg P$ e chegar a uma contradição.
- Em afirmações universais, o elemento usado na prova direta deve ser arbitrário.
- A prova dos infinitos primos é o exemplo de contradição apresentado pela fonte.
