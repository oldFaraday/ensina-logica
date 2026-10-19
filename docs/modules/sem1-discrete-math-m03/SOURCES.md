# Captura de Fontes — sem1-discrete-math-m03

**Módulo:** Provas e Indução (`sem1-discrete-math-m03`)  
**Fonte:** *Discrete Mathematics: An Open Introduction*  
**Autor:** Oscar Levin  
**Edição:** 3ª edição (2019) — **somente a 3ª edição** (`dmoi3`)  
**Editora/Plataforma:** OpenMathBooks (livro aberto; PreTeXt)  
**URL do livro:** https://discrete.openmathbooks.org/dmoi3.html  
**Data de acesso:** 2026-10-19  
**Licença confirmada:** CC BY-SA 4.0 — declarada na página do livro: *"Discrete Mathematics: An Open Introduction by Oscar Levin is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License."*  
**URL da licença:** https://creativecommons.org/licenses/by-sa/4.0/  
**Restrição crítica:** a **4ª edição** é CC BY-NC-SA 4.0 (não comercial) e **não pode** ser derivada. Todas as URLs deste módulo usam o caminho `dmoi3`.

> **Verificação de acesso:** as duas URLs de seção e a página do livro foram abertas nesta sessão (2026-10-19) e continham os títulos e os trechos abaixo. Nenhuma seção ficou `pending`.

---

## 1. 3.2 Proofs

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html
- **Capítulo:** 3. Symbolic Logic and Proofs › 3.2 Proofs
- **Seções internas usadas:** *Direct Proof*, *Proof by Contrapositive*, *Proof by Contradiction*, *Proof by (counter) Example*, *Proof by Cases*; Teorema 3.2.1 (infinitos primos), Exemplos 3.2.2, 3.2.4, 3.2.6, 3.2.9, 3.2.10 e 3.2.11
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidades `th-sem1-discrete-math-m03-direct-contrapositive-contradiction` (OBJ-1) e `th-sem1-discrete-math-m03-counterexample-cases` (OBJ-2)

### Trechos literais usados

> "Anyone who doesn’t believe there is creativity in mathematics clearly has not tried to write proofs."

> "Writing proofs is a bit of an art."

> "This proof is an example of a proof by contradiction, one of the standard styles of mathematical proof."

> "First and foremost, the proof is an argument. It contains sequence of statements, the last being the conclusion which follows from the previous statements."

> "The simplest (from a logic perspective) style of proof is a direct proof."

> "Direct proofs are especially useful when proving implications."

> "Assume \(P\text{.}\) Explain, explain, …, explain. Therefore \(Q\text{.}\)"

> "We accomplish this by fixing \(x\) to be an arbitrary element (of the sort we are interested in)."

> "Recall that an implication \(P \imp Q\) is logically equivalent to its contrapositive \(\neg Q \imp \neg P\text{.}\)"

> "This is all that proof by contrapositive does. It gives a direct proof of the contrapositive of the implication."

> "Assume \(\neg Q\text{.}\) Explain, explain, … explain. Therefore \(\neg P\text{.}\)"

> "If we can prove that \(\neg P\) leads to a contradiction, then the only conclusion is that \(\neg P\) is false, so \(P\) is true."

> "It is almost NEVER okay to prove a statement with just an example."

> "If you are trying to prove a statement of the form \(\forall x P(x)\text{,}\) you absolutely CANNOT prove this with an example."

> "However, existential statements can be proven this way."

> "Since so many statements in mathematics are universal, making their negations existential, we can often prove that a statement is false (if it is) by providing a counterexample."

> "The idea is to prove that \(P\) is true by proving that \(Q \imp P\) and \(\neg Q \imp P\) for some statement \(Q\text{.}\)"

> "Suppose we want to prove \(P\text{.}\) We know that at least one of the statements \(Q_1, Q_2, \ldots, Q_n\) is true. If we can show that \(Q_1 \imp P\) and \(Q_2 \imp P\) and so on all the way to \(Q_n \imp P\text{,}\) then we can conclude \(P\text{.}\)"

> "The key thing is that we want to be sure that one of our cases (the \(Q_i\)’s) must be true no matter what."

> "In fact, we can quickly see that \(n = 41\) will give \(41^2\) which is certainly not prime."

> "You might say that this is a counterexample to the conjecture that \(n^2 - n + 41\) is always prime."

---

## 2. 2.5 Induction

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html
- **Capítulo:** 2. Sequences › 2.5 Induction
- **Seções internas usadas:** *Stamps*, *Formalizing Proofs*, *Examples* (Exemplos 2.5.1–2.5.3 e o aviso sobre a prova incorreta), *Strong Induction* (Conjectura 2.5.4, prova da barra de chocolate e Exemplo 2.5.5)
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidades `th-sem1-discrete-math-m03-induction-principle` (OBJ-3, OBJ-4) e `th-sem1-discrete-math-m03-strong-induction-recursion` (OBJ-5)

### Trechos literais usados

> "Mathematical induction is a proof technique, not unlike direct proof or proof by contradiction or combinatorial proof."

> "Proof by induction is useful when trying to prove statements about all natural numbers, or all natural numbers greater than some fixed first case (like 28 in the example above), and in some other situations too."

> "In particular, induction should be used when there is some way to go from one case to the next – when you can see how to always “do one more.”"

> "Start by saying what the statement is that you want to prove: “Let \(P(n)\) be the statement…”"

> "Base case: Prove that \(P(0)\) is true. You do this directly. This is often easy."

> "Inductive case: Prove that \(P(k) \imp P(k+1)\) for all \(k \ge 0\text{.}\)"

> "This is the proof of an if … then … statement, so you can assume \(P(k)\) is true (\(P(k)\) is called the *inductive hypothesis*)."

> "You must then explain why \(P(k+1)\) is also true, given that assumption."

> "Therefore by the principle of mathematical induction, the statement \(P(n)\) is true for all \(n \ge 0\text{.}\)"

> "Sometimes the statement \(P(n)\) will only be true for values of \(n \ge 4\text{,}\) for example, or some other value. In such cases, replace all the 0’s above with 4’s (or the other value)."

> "Think of a row of dominoes set up standing on their edges."

> "If both of these conditions are met, you push the first domino over and each domino will cause the next to fall, then all the dominoes will fall."

> "The problem is that the proof that \(P(k)\) implies \(P(k+1)\) assumes that \(k \ge 2\text{.}\) We have only shown \(P(1)\) is true. In fact, \(P(2)\) is false."

> "Sometimes, to prove that \(P(k+1)\) is true, it would be helpful to know that \(P(k)\) *and* \(P(k-1)\) *and* \(P(k-2)\) are all true."

> "It makes sense to prove this by induction because after breaking the bar once, you are left with *smaller* chocolate bars."

> "We can inductively assume we already know how to deal with these smaller bars."

> "So we really need to assume that our conjecture is true for all cases less than \(k+1\text{.}\)"

> "Base case: Prove that \(P(0)\) is true."

> "Inductive case: Assume \(P(k)\) is true for all \(k \lt n\text{.}\) Prove that \(P(n)\) is true."

> "Therefore, by strong induction, \(P(n)\) is true for all \(n \gt 0\text{.}\)"

> "It really is *stronger*, so can accomplish everything “weak” induction can."

> "That said, using regular induction is often easier since there is only one place you can use the induction hypothesis."

> "It’s a recursion!"

> "As with a recursive definition of a numerical sequence, we must specify our initial value."

---

## 3. Uso e limites

- **Derivação:** tradução/adaptação para pt-BR, com `original_excerpt` literal em inglês em cada unidade.
- **Não derivado:** exercícios da fonte em sua formulação original, figuras, tabelas de valores e os demais exemplos fora do escopo.
- **Atribuição:** registrada em `ATTRIBUTIONS.md` e no front-matter de cada unidade.
- **Conferência manual:** `npm run verify-sources` deve imprimir "confere" para as quatro unidades deste módulo.
