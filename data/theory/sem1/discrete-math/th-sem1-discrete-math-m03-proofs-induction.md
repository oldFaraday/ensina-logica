---
id: th-sem1-discrete-math-m03-proofs-induction
title: Provas e Indução
discipline: discrete-math
module: m03
source:
  title: Discrete Mathematics: An Open Introduction
  authors: [Oscar Levin]
  url: https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html
  chapter: 2. Sequences
  section: 2.5 Induction
  access_date: 2026-10-16
  edition: 3rd Edition (2019)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-16
license: CC-BY-SA-4.0
derivation_type: summarized
language: pt-BR
verification_status: verified_with_source
linked_lessons: [l16, l17, l18]
linked_exercises: [ex-sem1-discrete-math-m03-l16-prova-direta, ex-sem1-discrete-math-m03-l17-estrutura, ex-sem1-discrete-math-m03-l18-inducao-forte]
original_excerpt: "Mathematical induction is a proof technique, not unlike direct proof or proof by contradiction or combinatorial proof."
---

Esta unidade trata de como demonstrar que uma afirmação matemática é sempre verdadeira. Começamos pelos estilos clássicos de prova (direta, por contrapositiva, por contradição, por (contra)exemplo e por casos) e avançamos para a **indução matemática** e a **indução forte**, que se conectam à definição recursiva de objetos. O conteúdo baseia-se na Seção 2.5 (Induction) e na Seção 3.2 (Proofs), ambas de *Discrete Mathematics: An Open Introduction* (https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html).

## Prova direta e prova por contrapositiva

A forma mais simples de provar uma implicação $P \rightarrow Q$ é a **prova direta**:

> Assuma $P$. Explique, explique, …, explique. Portanto $Q$.

Para provar uma afirmação universal $\forall x (P(x) \rightarrow Q(x))$, fixamos um elemento $x$ **arbitrário** e deduzimos $Q(x)$ a partir de $P(x)$. Exemplo: para todo inteiro $n$, se $n$ é par então $n^2$ é par.

Lembre que $P \rightarrow Q$ é logicamente equivalente à sua **contrapositiva** $\neg Q \rightarrow \neg P$. A **prova por contrapositiva** assume $\neg Q$ e deduz $\neg P$:

> Assuma $\neg Q$. Explique, explique, … Portanto $\neg P$.

Como a contrapositiva é equivalente ao original, provar uma prova a outra. A **conversa** $Q \rightarrow P$ **não** é equivalente e precisa ser provada separadamente.

## Prova por contradição

Algumas afirmações não podem ser reescritas como implicações. A **prova por contradição** mostra que, se $\neg P$ levasse a uma contradição, então $\neg P$ seria falsa e $P$ verdadeira.

> Suponha que $P$ seja falsa (isto é, assuma $\neg P$). … chegamos a uma contradição. Logo $P$ é verdadeira.

Um exemplo clássico é a prova de que **existem infinitos primos**: supondo que haja um maior primo $p$, o número $N = p! + 1$ não é divisível por nenhum número menor ou igual a $p$, de modo que sua fatoração contém um primo maior que $p$ — contradição. Outro exemplo é a prova de que $\sqrt{2}$ é irracional.

## Prova por (contra)exemplo e por casos

Provar uma afirmação universal **nunca** pode ser feito com um único exemplo: para $\forall x P(x)$ a propriedade tem de valer para **todo** $x$. No entanto, afirmações **existenciais** podem ser provadas apresentando um exemplo.

Um único **contraexemplo** refuta uma afirmação universal. Por exemplo, a conjectura "para todo inteiro positivo $n$, $n^2 - n + 41$ é primo" é falsa, pois para $n = 41$ temos $41^2 = 1681$, que não é primo.

Na **prova por casos**, mostramos que a afirmação vale em todas as possibilidades. Para provar $P$, basta exibir casos $Q_1, Q_2, \dots, Q_n$, garantir que **pelo menos um** deles ocorre e provar $Q_i \rightarrow P$ para cada $i$.

## Indução matemática

A **indução matemática** é usada para provar afirmações sobre todos os naturais (ou todos os naturais a partir de um valor inicial). A estrutura formal é:

1. Declarar a afirmação: "Seja $P(n)$ a afirmação…".
2. **Caso base:** provar $P(0)$ (ou o primeiro valor relevante) diretamente.
3. **Passo indutivo:** provar que $P(k) \rightarrow P(k+1)$ para todo $k \ge 0$. Aqui assumimos $P(k)$ — a **hipótese indutiva** — e explicamos por que $P(k+1)$ também é verdadeira.

Conclui-se, então: "portanto, pelo princípio da indução matemática, $P(n)$ é verdadeira para todo $n \ge 0$".

A analogia é uma fileira de dominós: o caso base empurra o primeiro dominó; o passo indutivo garante que cada dominó derruba o seguinte. Se ambas as condições valem, todos caem.

Exemplos do texto: $1 + 2 + \cdots + n = \frac{n(n+1)}{2}$; $6^n - 1$ é múltiplo de $5$; e $n^2 < 2^n$ para todo inteiro $n \ge 5$.

**Cuidado:** a indução não é mágica. Um passo indutivo que só funciona a partir de $k \ge 2$ não se combina com um caso base que prova apenas $P(1)$. O "falso" argumento de que qualquer grupo de $n$ pessoas tem a mesma cor de olhos falha exatamente por isso: prova-se $P(1)$, mas $P(2)$ é falso.

## Indução forte e recursão

Na **indução forte**, a hipótese indutiva é mais generosa:

1. **Caso base:** provar $P(0)$.
2. **Passo indutivo:** assumir que $P(k)$ é verdadeira para **todo** $k < n$ e provar que $P(n)$ é verdadeira.

A indução forte é realmente mais forte: faz tudo o que a indução comum faz, e é útil quando reduzir o problema cria subproblemas de tamanhos variados. É o caso da prova de que uma barra retangular de $n$ quadradinhos exige sempre $n-1$ quebras: após a primeira quebra surgem barras de $a$ e $b$ quadradinhos, com $a + b = n$ e $a, b < n$, e a hipótese forte fornece $P(a)$ e $P(b)$. Como $1 + (a-1) + (b-1) = n-1$, conclui-se o resultado. Outro exemplo: todo natural maior que 1 é primo ou produto de primos.

A indução também se liga à **recursão**. Uma definição recursiva de sequência usa termos anteriores e exige um valor inicial; a indução faz o mesmo com afirmações, passando de casos anteriores para o próximo. Um exemplo é a sequência de Fibonacci:

$$F_0 = 0, \qquad F_1 = 1, \qquad F_n = F_{n-1} + F_{n-2}.$$
