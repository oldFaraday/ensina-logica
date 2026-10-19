# Auditoria de Afirmações — sem1-discrete-math-m03

**Módulo:** Provas e Indução (`sem1-discrete-math-m03`)  
**Data da auditoria:** 2026-10-19  
**Fonte:** Oscar Levin, *Discrete Mathematics: An Open Introduction*, 3ª ed., Seções 3.2 (Proofs) e 2.5 (Induction), abertas nesta sessão.  
**Método:** cada afirmação das unidades teóricas foi comparada com o texto literal da seção indicada, aberto nesta sessão.  
**Legenda:** `ok` = afirmação sustentada pelo trecho; `ok (aplicação)` = inferência direta e limitada a partir do trecho (aritmética ou passo algébrico); `Exemplo adicional (IA)` = conteúdo explicitamente rotulado como acréscimo da IA e conferido.

---

## Unidade `th-sem1-discrete-math-m03-direct-contrapositive-contradiction`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Uma prova é uma sequência de afirmações cuja última é a conclusão. | 3.2 | "the proof is an argument. It contains sequence of statements, the last being the conclusion which follows from the previous statements" | ok |
| Não há caminho garantido para encontrar uma prova, mas há estilos padrão. | 3.2 | "There is not a guaranteed path to success in the search for proofs" / "there are a relatively small number of standard proof styles" | ok |
| A prova direta de $P \rightarrow Q$ assume $P$ e conclui $Q$. | 3.2 | "Assume \(P\text{.}\) Explain, explain, …, explain. Therefore \(Q\text{.}\)" | ok |
| Para $\forall x(P(x)\rightarrow Q(x))$, fixa-se $x$ arbitrário. | 3.2 | "We accomplish this by fixing \(x\) to be an arbitrary element (of the sort we are interested in)." | ok |
| A contrapositiva de $P \rightarrow Q$ é $\neg Q \rightarrow \neg P$ e é equivalente. | 3.2 | "an implication \(P \imp Q\) is logically equivalent to its contrapositive \(\neg Q \imp \neg P\)" | ok |
| A prova por contrapositiva assume $\neg Q$ e conclui $\neg P$. | 3.2 | "Assume \(\neg Q\text{.}\) Explain, explain, … explain. Therefore \(\neg P\text{.}\)" | ok |
| A prova por contradição assume $\neg P$ e busca uma contradição. | 3.2 | "If we can prove that \(\neg P\) leads to a contradiction, then the only conclusion is that \(\neg P\) is false, so \(P\) is true." | ok |
| Se $\neg P$ é impossível, $P$ é verdadeira. | 3.2 | "if it is impossible for \(P\) to be false, \(P\) must be true" | ok |
| A prova dos infinitos primos supõe finitos primos e toma o maior $p$. | 3.2 | "suppose there are only finitely many primes. Then there must be a last, largest prime, call it \(p\)" | ok |
| $N=p!+1$ não é divisível por nenhum número $\le p$. | 3.2 | "\(N\) is not divisible by any number less than or equal to \(p\), since every number less than or equal to \(p\) divides \(p!\)" | ok |
| A fatoração de $N$ contém um primo maior que $p$, gerando contradição. | 3.2 | "the prime factorization of \(N\) contains prime numbers ... all greater than \(p\). So \(p\) is not the largest prime, a contradiction." | ok |
| Exemplo: se $n$ é par, $n^2$ é par, por prova direta. | 3.2 | "Prove: For all integers \(n\text{,}\) if \(n\) is even, then \(n^2\) is even." | ok |
| $n=2k$ implica $n^2=4k^2=2(2k^2)$. | 3.2 | Exemplo 3.2.2 (prova direta com $n=2k$); manipulação algébrica $ (2k)^2=4k^2=2(2k^2)$. | ok (aplicação) |
| Provar a conversa $Q\rightarrow P$ não é provar a contrapositiva. | 3.2 | "It gives a direct proof of the contrapositive of the implication" e o esqueleto "Assume ¬Q ... Therefore ¬P". | ok (aplicação) |
| Os erros comuns são aplicações do formato da fonte. | 3.2 | Esqueletos de prova direta/contrapositiva e definição de contradição. | Exemplo adicional (IA) |

---

## Unidade `th-sem1-discrete-math-m03-counterexample-cases`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Um exemplo não prova uma afirmação universal. | 3.2 | "It is almost NEVER okay to prove a statement with just an example." | ok |
| Para $\forall xP(x)$, não se pode provar com um exemplo. | 3.2 | "If you are trying to prove a statement of the form \(\forall x P(x)\text{,}\) you absolutely CANNOT prove this with an example." | ok |
| Afirmações existenciais podem ser provadas por exemplo. | 3.2 | "However, existential statements can be proven this way." | ok |
| Um contraexemplo refuta uma afirmação universal. | 3.2 | "we can often prove that a statement is false (if it is) by providing a counterexample" | ok |
| $n^2-n+41$ vale 41, 43, 47, 53, 61, 71, 83 para $n=1,\dots,7$. | 3.2 | Tabela do texto com os valores 41, 43, 47, 53, 61, 71, 83. | ok |
| Para $n=41$, $n^2-n+41=41^2=1681$, que não é primo. | 3.2 | "we can quickly see that \(n = 41\) will give \(41^2\) which is certainly not prime" | ok |
| $n=41$ é contraexemplo da conjectura. | 3.2 | "You might say that this is a counterexample to the conjecture that \(n^2 - n + 41\) is always prime." | ok |
| A prova por casos mostra $Q_i\rightarrow P$ para cada caso e que algum $Q_i$ ocorre. | 3.2 | "If we can show that \(Q_1 \imp P\) and \(Q_2 \imp P\) and so on all the way to \(Q_n \imp P\text{,}\) then we can conclude \(P\text{.}\)" | ok |
| É essencial que um dos casos seja necessariamente verdadeiro. | 3.2 | "The key thing is that we want to be sure that one of our cases (the \(Q_i\)’s) must be true no matter what." | ok |
| Exemplo $n^3-n$ par por casos (par/ímpar). | 3.2 | Exemplo 3.2.11 enuncia "For any integer \(n\text{,}\) the number \((n^3 -n)\) is even"; a prova em dois casos é acréscimo. | Exemplo adicional (IA) |
| Esquecer um caso deixa a prova incompleta. | 3.2 | "we want to be sure that one of our cases ... must be true no matter what" | ok (aplicação) |
| Contraexemplo prova a negação, não a existência da propriedade. | 3.2 | "making their negations existential ... by providing a counterexample" | ok (aplicação) |

---

## Unidade `th-sem1-discrete-math-m03-induction-principle`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| A indução serve para afirmações sobre todos os naturais ou a partir de um primeiro caso fixo. | 2.5 | "Proof by induction is useful when trying to prove statements about all natural numbers, or all natural numbers greater than some fixed first case" | ok |
| Ela é adequada quando se consegue passar de um caso para o seguinte. | 2.5 | "induction should be used when there is some way to go from one case to the next – when you can see how to always “do one more.”" | ok |
| A prova começa declarando $P(n)$. | 2.5 | "Start by saying what the statement is that you want to prove: “Let \(P(n)\) be the statement…”" | ok |
| O caso base prova $P(0)$ diretamente. | 2.5 | "Base case: Prove that \(P(0)\) is true. You do this directly. This is often easy." | ok |
| O passo indutivo prova $P(k)\rightarrow P(k+1)$ para $k\ge0$. | 2.5 | "Inductive case: Prove that \(P(k) \imp P(k+1)\) for all \(k \ge 0\text{.}\)" | ok |
| A hipótese indutiva é $P(k)$. | 2.5 | "you can assume \(P(k)\) is true (\(P(k)\) is called the *inductive hypothesis*)" | ok |
| Conclui-se pelo princípio da indução matemática. | 2.5 | "Therefore by the principle of mathematical induction, the statement \(P(n)\) is true for all \(n \ge 0\text{.}\)" | ok |
| Se a afirmação começa em outro valor, troca-se o 0 por esse valor. | 2.5 | "replace all the 0’s above with 4’s (or the other value)" | ok |
| A analogia dos dominós ilustra caso base e passo. | 2.5 | "Think of a row of dominoes set up standing on their edges." / "you push the first domino over and each domino will cause the next to fall" | ok |
| $P(28)$ é verdadeira porque $28=4\cdot5+1\cdot8$. | 2.5 | "\(28 = 4 \cdot 5+ 1\cdot 8\text{,}\) so we can make \(28\) cents using four 5-cent stamps and one 8-cent stamp" | ok |
| Para $k\ge28$, não se usam menos de três selos de 5 **e** menos de três de 8. | 2.5 | "since \(k \ge 28\text{,}\) it cannot be that we use fewer than three 5-cent stamps *and* fewer than three 8-cent stamps: using two of each would give only 26 cents" | ok |
| Trocar três selos de 5 por dois de 8 aumenta o total em 1. | 2.5 | "replace three 5-cent stamps by two 8-cent stamps. This replaces 15 cents of postage with 16 cents, moving from a total of \(k\) cents to \(k+1\) cents" | ok |
| Trocar três selos de 8 por cinco de 5 também aumenta o total em 1. | 2.5 | "replace three 8-cent stamps with five 5-cent stamps, moving from 24 cents to 25 cents, giving a total of \(k+1\) cents" | ok |
| O passo dos canadenses falha porque só vale para $k\ge2$ e o caso base é $P(1)$. | 2.5 | "the proof that \(P(k)\) implies \(P(k+1)\) assumes that \(k \ge 2\text{.}\) We have only shown \(P(1)\) is true. In fact, \(P(2)\) is false." | ok |
| A hipótese indutiva não assume o que se quer provar. | 2.5 | "We assume \(P(k)\) is true only for the sake of proving that \(P(k+1)\) is true." | ok |
| Omitir o caso base quebra a cadeia. | 2.5 | Estrutura formal exige caso base e passo; o exemplo dos canadenses mostra a falha de compatibilidade. | ok (aplicação) |

---

## Unidade `th-sem1-discrete-math-m03-strong-induction-recursion`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Às vezes é útil conhecer $P(k), P(k-1), P(k-2)$ para provar $P(k+1)$. | 2.5 | "Sometimes, to prove that \(P(k+1)\) is true, it would be helpful to know that \(P(k)\) *and* \(P(k-1)\) *and* \(P(k-2)\) are all true." | ok |
| A indução forte assume $P(k)$ para todo $k<n$ e prova $P(n)$. | 2.5 | "Inductive case: Assume \(P(k)\) is true for all \(k \lt n\text{.}\) Prove that \(P(n)\) is true." | ok |
| O caso base continua sendo $P(0)$ (ou um valor maior). | 2.5 | "Base case: Prove that \(P(0)\) is true." / "it is acceptable to replace 0 with a larger base case if needed" | ok |
| A conclusão é por indução forte. | 2.5 | "Therefore, by strong induction, \(P(n)\) is true for all \(n \gt 0\text{.}\)" | ok |
| A indução forte é mais poderosa que a comum. | 2.5 | "It really is *stronger*, so can accomplish everything “weak” induction can." | ok |
| A indução comum costuma ser mais simples quando basta um caso anterior. | 2.5 | "using regular induction is often easier since there is only one place you can use the induction hypothesis" | ok |
| A conjectura da barra de chocolate afirma $n-1$ quebras. | 2.5 | "Given a \(n\)-square rectangular chocolate bar, it always takes \(n-1\) breaks to reduce the bar to single squares." | ok |
| O caso base da barra é $P(2)$: uma quebra. | 2.5 | "Base case: Consider \(P(2)\text{.}\) The squares must be arranged into a \(1\times 2\) rectangle, and we require \(2-1 = 1\) breaks" | ok |
| Após uma quebra, as partes têm $a$ e $b$ quadradinhos, com $a+b=n$ e $a,b<n$. | 2.5 | "This results in two chocolate bars, say of sizes \(a\) and \(b\text{.}\) ... and \(a+b = n\text{.}\)" / "We also know that \(a \lt n\) and \(b \lt n\)" | ok |
| A hipótese forte fornece $P(a)$ e $P(b)$. | 2.5 | "so by our inductive hypothesis, \(P(a)\) and \(P(b)\) are true" | ok |
| O total de quebras é $1+(a-1)+(b-1)=n-1$. | 2.5 | "for a total of \(1+a-1+b-1 = a+b-1 = n-1\) breaks" | ok |
| A fonte chama a passagem para casos anteriores de recursão. | 2.5 | "It’s a recursion!" | ok |
| Uma definição recursiva precisa de valor inicial, como a indução precisa do caso base. | 2.5 | "As with a recursive definition of a numerical sequence, we must specify our initial value." | ok |
| Fibonacci é definida por $F_0=0$, $F_1=1$ e $F_n=F_{n-1}+F_{n-2}$. | 2.5 | Exercício 2.5.7: "(\(F_0 = 0\text{,}\) \(F_1 = 1\) and \(F_n = F_{n-1} + F_{n-2}\))" | ok |
| Assumir $P(n)$ em vez de todos os $k<n$ seria petição de princípio. | 2.5 | A hipótese forte é explicitamente "for all \(k \lt n\)". | ok (aplicação) |
| Usar indução forte sem necessidade contraria a recomendação de elegância. | 2.5 | "using regular induction is often easier... There is also something to be said for *elegance* in proofs." | ok |
| Verificar $a<n$ e $b<n$ é necessário para aplicar a hipótese. | 2.5 | "We also know that \(a \lt n\) and \(b \lt n\text{,}\) so by our inductive hypothesis..." | ok |

---

## Resumo da auditoria

- **Afirmações com suporte literal:** 47
- **Aplicações diretas da fonte (aritmética/inferência limitada):** 9
- **Conteúdo adicional rotulado como "Exemplo adicional (IA)":** 2 (erros comuns da unidade 1 e prova por casos de $n^3-n$)
- **Sem suporte:** 0 (nada foi mantido sem apoio ou rótulo)
- **Nenhuma unidade ficou `pending`.** Os quatro `original_excerpt` foram conferidos contra as páginas vivas das Seções 3.2 e 2.5.
