---
id: th-sem1-discrete-math-m03-induction-principle
title: Indução matemática
discipline: discrete-math
module: m03
source:
  title: "Discrete Mathematics: An Open Introduction"
  authors: [Oscar Levin]
  url: https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html
  chapter: "2. Sequences"
  section: "2.5 Induction"
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
linked_lessons: [l17]
linked_exercises: [ex-sem1-discrete-math-m03-l17-caso-base, ex-sem1-discrete-math-m03-l17-hipotese, ex-sem1-discrete-math-m03-l17-estrutura, ex-sem1-discrete-math-m03-l17-soma-base, ex-sem1-discrete-math-m03-l17-soma-passo, ex-sem1-discrete-math-m03-l17-divisibilidade, ex-sem1-discrete-math-m03-l18-canadenses, ex-sem1-discrete-math-m03-c02-inducao, ex-sem1-discrete-math-m03-c04-soma-impar, ex-sem1-discrete-math-m03-c07-divisibilidade, ex-sem1-discrete-math-m03-f06-hipotese, ex-sem1-discrete-math-m03-f07-partes, ex-sem1-discrete-math-m03-f08-caso-base]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [mathematical induction, inductive hypothesis]
original_excerpt: "Proof by induction is useful when trying to prove statements about all natural numbers, or all natural numbers greater than some fixed first case (like 28 in the example above), and in some other situations too."
---

## Ideia central

A **indução matemática** é uma técnica de prova usada para afirmações sobre todos os números naturais, ou sobre todos os naturais a partir de um primeiro valor fixo. A fonte a compara a outros estilos de prova e destaca que ela é apropriada quando existe uma maneira de passar de um caso para o seguinte — quando se consegue sempre "fazer mais um". Em vez de atacar diretamente o caso $n$, a indução mostra como o caso seguinte depende do anterior.

## Definição

A estrutura formal começa declarando a afirmação que se quer provar: "Seja $P(n)$ a afirmação…". Para provar que $P(n)$ vale para todo $n \ge 0$, é preciso estabelecer dois fatos:

1. **Caso base:** provar $P(0)$ diretamente. A fonte observa que isso costuma ser fácil.
2. **Passo indutivo:** provar que $P(k) \rightarrow P(k+1)$ para todo $k \ge 0$. Como se trata de uma implicação, pode-se assumir $P(k)$ — a **hipótese indutiva** — e explicar por que $P(k+1)$ também é verdadeira.

Conclui-se então: "Portanto, pelo princípio da indução matemática, $P(n)$ é verdadeira para todo $n \ge 0$." Se a afirmação só valer a partir de um valor maior, como $n \ge 4$, basta substituir o $0$ do caso base e do passo por esse valor.

A fonte usa a imagem de uma fileira de dominós: o caso base empurra o primeiro dominó; o passo indutivo garante que um dominó derrubado derruba o próximo. Com as duas condições, todos caem.

## Exemplo resolvido

A fonte prova que qualquer valor de postagem maior ou igual a 28 centavos pode ser formado com selos de 5 e de 8 centavos. Seja $P(n)$: "é possível formar exatamente $n$ centavos".

**Caso base:** $28 = 4 \cdot 5 + 1 \cdot 8$, então $P(28)$ é verdadeira.

**Passo indutivo:** suponha $P(k)$ verdadeira para um $k \ge 28$ arbitrário. Como $k \ge 28$, não é possível usar menos de três selos de 5 centavos **e** menos de três selos de 8 centavos ao mesmo tempo: dois de cada dariam apenas 26 centavos. Se a representação de $k$ usa pelo menos três selos de 5 centavos, troque três selos de 5 por dois de 8; a postagem passa de 15 para 16 centavos, aumentando o total em 1. Se usa pelo menos três selos de 8 centavos, troque três de 8 por cinco de 5; a postagem passa de 24 para 25 centavos, também aumentando o total em 1. Em qualquer caso, $P(k+1)$ é verdadeira.

**Conclusão:** pelo princípio da indução matemática, $P(n)$ vale para todo $n \ge 28$.

## Erros comuns

- **Omitir o caso base.** O passo indutivo sozinho só diz que um caso verdadeiro arrasta o seguinte; sem um primeiro caso verdadeiro, a cadeia não começa.
- **Usar um caso base incompatível com o passo.** A fonte mostra uma prova incorreta de que todos os canadenses têm a mesma cor de olhos: o passo funciona apenas para $k \ge 2$, mas só se provou $P(1)$; de fato, $P(2)$ é falsa.
- **Achar que a hipótese indutiva assume o que se quer provar.** A fonte esclarece que $P(k)$ é assumida apenas para demonstrar $P(k+1)$; não se está assumindo $P(n)$.
- **Esquecer de declarar $P(n)$.** Sem dizer qual é a afirmação, não fica claro o que o caso base prova nem o que o passo deve concluir.

## Resumo

- Indução serve para afirmações sobre todos os naturais ou a partir de um valor inicial.
- O caso base prova a afirmação no primeiro valor.
- O passo indutivo assume $P(k)$ e prova $P(k+1)$.
- A hipótese indutiva é $P(k)$, usada apenas para chegar a $P(k+1)$.
- Se a afirmação começa em $n = 4$, o caso base e o passo começam em 4.
- O exemplo dos selos prova $P(n)$ para todo $n \ge 28$ por indução.
