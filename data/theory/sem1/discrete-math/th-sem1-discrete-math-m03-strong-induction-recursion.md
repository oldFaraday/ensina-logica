---
id: th-sem1-discrete-math-m03-strong-induction-recursion
title: Indução forte e recursão
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
linked_lessons: [l18]
linked_exercises: [ex-sem1-discrete-math-m03-l18-inducao-forte, ex-sem1-discrete-math-m03-l18-forte-basta, ex-sem1-discrete-math-m03-l18-estrutura-forte, ex-sem1-discrete-math-m03-l18-chocolate-porque, ex-sem1-discrete-math-m03-l18-chocolate-passo, ex-sem1-discrete-math-m03-c06-chocolate, ex-sem1-discrete-math-m03-f09-forte, ex-sem1-discrete-math-m03-f10-chocolate]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [strong induction]
original_excerpt: "Sometimes, to prove that P(k+1) is true, it would be helpful to know that P(k) and P(k-1) and P(k-2) are all true."
---

## Ideia central

Na indução comum, o passo indutivo usa apenas $P(k)$ para provar $P(k+1)$. Há problemas, porém, em que a redução natural leva a **vários** casos menores, não a um único caso imediatamente anterior. Nesse momento, saber que $P(k)$ vale não basta: seria útil conhecer $P(k)$, $P(k-1)$, $P(k-2)$ e assim por diante. A **indução forte** permite exatamente isso, colocando todos os casos menores à disposição na hipótese indutiva.

## Definição

A estrutura da prova por indução forte também começa declarando $P(n)$. Depois, estabelecem-se dois fatos:

1. **Caso base:** provar $P(0)$ — ou um valor inicial maior, se a afirmação só valer a partir dele.
2. **Passo indutivo:** assumir que $P(k)$ é verdadeira para **todo** $k < n$ e provar que $P(n)$ é verdadeira.

Conclui-se: "Portanto, por indução forte, $P(n)$ é verdadeira para todo $n > 0$." A diferença em relação à indução comum está na hipótese: em vez de assumir um único $P(k)$, assume-se a afirmação para todos os valores menores que $n$.

A fonte observa que a indução forte é realmente mais forte: ela consegue tudo o que a indução comum consegue. Ainda assim, usar a indução comum costuma ser mais simples quando basta um único caso anterior, e há elegância em usar a ferramenta mais simples possível.

## Exemplo resolvido

A fonte prova a **Conjectura 2.5.4**: uma barra retangular de chocolate com $n$ quadradinhos sempre exige $n-1$ quebras para virar $n$ quadradinhos separados.

Seja $P(n)$: "uma barra de $n$ quadradinhos exige $n-1$ quebras".

**Caso base:** para $n = 2$, a barra é um retângulo $1 \times 2$ e uma quebra a separa em dois quadradinhos; $2 - 1 = 1$.

**Passo indutivo:** fixe $n \ge 2$ e assuma $P(k)$ verdadeira para todo $k < n$. Considere uma barra de $n$ quadradinhos e faça uma quebra ao longo de uma linha ou coluna. Isso produz duas barras, com $a$ e $b$ quadradinhos, onde $a + b = n$. Como $a < n$ e $b < n$, a hipótese forte garante $P(a)$ e $P(b)$: a barra de $a$ quadradinhos exige $a-1$ quebras e a de $b$ exige $b-1$. Acrescentando a quebra inicial, o total é

$$1 + (a-1) + (b-1) = a + b - 1 = n - 1.$$

Logo $P(n)$ é verdadeira. Por indução forte, a conjectura vale para todo $n \ge 2$.

## Indução e recursão

A fonte chama a atenção para a semelhança com a **recursão**. No problema dos selos, depois de mostrar como passar de $k$ para $k+1$, ela pergunta como se sabe que $k$ é possível e responde: porque se pode voltar a $k-1$, e assim por diante — "É uma recursão!". Assim como uma definição recursiva de sequência precisa de um valor inicial, a indução precisa do caso base. A sequência de Fibonacci, por exemplo, é definida por $F_0 = 0$, $F_1 = 1$ e $F_n = F_{n-1} + F_{n-2}$; a indução forte é a ferramenta natural para provar propriedades dessa sequência, porque cada termo depende de dois anteriores.

## Erros comuns

- **Esquecer o caso base.** A hipótese forte não substitui o primeiro caso; sem ele, a cadeia de reduções não tem onde terminar.
- **Assumir $P(n)$ em vez de todos os casos menores.** A hipótese da indução forte é $P(k)$ para todo $k < n$; assumir $P(n)$ seria petição de princípio.
- **Usar indução forte sem necessidade.** A fonte lembra que a indução comum é frequentemente mais fácil e mais elegante quando um único caso anterior basta.
- **Não verificar que as partes são menores.** No exemplo da barra, a hipótese forte só se aplica porque $a < n$ e $b < n$, o que decorre de $a + b = n$ com $a, b \ge 1$.

## Resumo

- A indução forte assume $P(k)$ para todo $k < n$ e prova $P(n)$.
- O caso base continua obrigatório.
- Ela é útil quando a redução gera subproblemas de tamanhos variados.
- A barra de chocolate exige $n-1$ quebras; após uma quebra, $a+b=n$ e $a,b<n$.
- A indução forte é mais poderosa que a comum, mas nem sempre é a mais simples.
- Indução e recursão compartilham a ideia de caso base e passagem para casos menores.
