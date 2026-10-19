# Captura de Fontes — sem1-discrete-math-m02

**Módulo:** Lógica de Predicados (`sem1-discrete-math-m02`)  
**Fonte:** *Discrete Mathematics: An Open Introduction*  
**Autor:** Oscar Levin  
**Edição:** 3ª edição (2019) — **somente a 3ª edição** (`dmoi3`)  
**Editora/Plataforma:** OpenMathBooks (livro aberto; PreTeXt)  
**URL do livro:** https://discrete.openmathbooks.org/dmoi3.html  
**Data de acesso:** 2026-10-19  
**Licença confirmada:** CC BY-SA 4.0 — declarada na página do livro: *"Discrete Mathematics: An Open Introduction by Oscar Levin is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License."*  
**URL da licença:** https://creativecommons.org/licenses/by-sa/4.0/  
**Restrição crítica:** a **4ª edição** é CC BY-NC-SA 4.0 (não comercial) e **não pode** ser derivada. Todas as URLs deste módulo usam o caminho `dmoi3`.

> **Verificação de acesso:** as duas URLs de seção foram abertas nesta sessão (2026-10-19) e continham os títulos e os trechos abaixo. Nenhuma seção ficou `pending`.

---

## 1. 0.2 Mathematical Statements › Predicates and Quantifiers

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html
- **Capítulo:** 0. Introduction and Preliminaries › 0.2 Mathematical Statements
- **Seções internas usadas:** *Predicates and Quantifiers*, *Implicit Quantifiers*; exercícios 12, 14 e 16 (soluções)
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidades `th-sem1-discrete-math-m02-predicates-variables` (OBJ-1), `th-sem1-discrete-math-m02-quantifiers-domain` (OBJ-2) e `th-sem1-discrete-math-m02-quantifier-negation` (OBJ-3, OBJ-4)

### Trechos literais usados

> "For one thing, because this sentence has a free variable (that is, a variable that we have not specified anything about), it is not a statement. A sentence that contains variables is called a predicate."

> "Now, if we plug in a specific value for n, we do get a statement. In fact, it turns out that no matter what value we plug in for n, we get a true implication in this case."

> "What we really want to say is that for all values of n, if n is prime, then n+7 is not. We need to quantify the variable."

> "Although there are many types of quantifiers in English (e.g., many, few, most, etc.) in mathematics we, for the most part, stick to two: existential and universal."

> "The existential quantifier is ∃ and is read “there exists” or “there is.”"

> "The universal quantifier is ∀ and is read “for all” or “every.”"

> "You would read this, “for every x there is some y such that y is less than x.” Is this true? The answer depends on what our domain of discourse is: when we say “for all” x, do we mean all positive integers or all real numbers or all elements of some other set?"

> "Usually this information is implied. In discrete mathematics, we almost always quantify over the natural numbers, 0, 1, 2, …, so let’s take that for our domain of discourse here."

> "For the statement to be true, we need it to be the case that no matter what natural number we select, there is always some natural number that is strictly smaller."

> "Thus we see that the statement is false because there is a number which is less than or equal to all other numbers. In symbols, ∃x ∀y (y ≥ x)."

> "To show that the original statement is false, we proved that the negation was true."

> "¬ ∀x P(x) is equivalent to ∃x ¬P(x)."

> "¬ ∃x P(x) is equivalent to ∀x ¬P(x)."

> "Essentially, we can pass the negation symbol over a quantifier, but that causes the quantifier to switch type. This should not be surprising: if not everything has a property, then something doesn’t have that property. And if there is not something with a property, then everything doesn’t have that property."

> "An example of such a convention is to assume that sentences containing predicates with free variables are intended as statements, where the variables are universally quantified."

> "This is neither true nor false, as it is not a statement. But come on! We all know that we meant to consider the statement, ∀x (S(x) → R(x)), and this is what our convention tells us to consider."

> "Similarly, we will often be a bit sloppy about the distinction between a predicate and a statement."

> "To prove ∀x P(x) is false all you need is one example of an element in the domain for which P(n) is false. This is often called a counterexample."

> "P(15) is the statement “4⋅15+1 is even”, which is false. Thus the statement ∀x P(x) is false (for example, 15 is a counterexample). However, we cannot tell anything about ∃x P(x) since we do not know the truth value of P(x) for other elements of the domain of discourse."

> "No number is both even and odd." — exercício 16; solução: "¬ ∃x (E(x) ∧ O(x))."

> "There is prime number that is even." — exercício 16; solução: "∃x(P(x) ∧ E(x)) (where P(x) means “x is prime”)."

---

## 2. 3.1 Propositional Logic › Beyond Propositions

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_propositional.html
- **Capítulo:** 3. Symbolic Logic and Proofs › 3.1 Propositional Logic
- **Seção interna usada:** *Beyond Propositions* (Exemplos 3.1.8 e 3.1.9)
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidades `th-sem1-discrete-math-m02-quantifier-negation` (OBJ-3, OBJ-4) e `th-sem1-discrete-math-m02-order-deduction` (OBJ-4, OBJ-5)

### Trechos literais usados

> "As we saw in Section 0.2, not every statement can be analyzed using logical connectives alone."

> "To write this statement symbolically, we must use quantifiers."

> "These are not propositions, since their truth value depends on the input x. Better to think of P and O as denoting properties of their input. The technical term for these is predicates and when we study them in logic, we need to use predicate logic."

> "It is important to stress that predicate logic extends propositional logic (much in the way quantum mechanics extends classical mechanics). You will notice that our statement above still used the (propositional) logical connectives. Everything that we learned about logical equivalence and deductions still applies."

> "A full treatment of predicate logic is beyond the scope of this text. One reason is that there is no systematic procedure for deciding whether two statements in predicate logic are logically equivalent (i.e., there is no analogue to truth tables here)."

> "Suppose we claim that there is no smallest number. We can translate this into symbols as ¬ ∃x ∀y (x ≤ y)."

> "However, we know how negation interacts with quantifiers: we can pass a negation over a quantifier by switching the quantifier type (between universal and existential). So the statement above should be logically equivalent to ∀x ∃y (y < x)."

> "Notice that y < x is the negation of x ≤ y."

> "These statements are NOT logically equivalent. To see this, we should provide an interpretation of the predicate P(x,y) which makes one of the statements true and the other false."

> "Let P(x,y) be the predicate x < y. It is true, in the natural numbers, that for all x there is some y greater than that x (since there are infinitely many numbers). However, there is not a natural number y which is greater than every number x."

> "If there is some y for which every x satisfies P(x,y), then certainly for every x there is some y which satisfies P(x,y)."

> "In other words, while we don’t have logical equivalence between the two statements, we do have a valid deduction rule: ∃y ∀x P(x,y) ∴ ∀x ∃y P(x,y)."

> "A statement in predicate logic that is necessarily true gets the more prestigious designation of a law of logic."

---

## 3. Uso e limites

- **Derivação:** tradução/adaptação para pt-BR, com `original_excerpt` literal em inglês em cada unidade.
- **Não derivado:** exercícios da fonte em sua formulação original, figuras, tabelas de valores de predicados e os demais exemplos fora do escopo.
- **Atribuição:** registrada em `ATTRIBUTIONS.md` e no front-matter de cada unidade.
- **Conferência manual:** `npm run verify-sources` deve imprimir "confere" para as quatro unidades deste módulo.
