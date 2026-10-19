# Captura de Fontes — sem1-discrete-math-m01

**Módulo:** Lógica Proposicional (`sem1-discrete-math-m01`)  
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

## 1. 0.2 Mathematical Statements

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html
- **Capítulo:** 0. Introduction and Preliminaries › 0.2 Mathematical Statements
- **Seções internas usadas:** *Atomic and Molecular Statements*, *Implications*, *Logical Connectives*, *Truth Conditions for Connectives*
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidade `th-sem1-discrete-math-m01-propositions-connectives` (OBJ-1, OBJ-2)

### Trechos literais usados

> "A statement is any declarative sentence which is either true or false. A statement is atomic if it cannot be divided into smaller statements, otherwise it is called molecular."

> "The reason the sentence “3 + x = 12” is not a statement is that it contains a variable. Depending on what x is, the sentence is either true or false, but right now it is neither."

> "You can build more complicated (molecular) statements out of simpler (atomic or molecular) ones using logical connectives."

> "which truth value the molecular statement achieves is completely determined by the type of connective and the truth values of the parts. We do not need to know what the parts actually say, only whether those parts are true or false."

> "The first four are called binary connectives (because they connect two statements) while “not” is an example of a unary connective (since it applies to a single statement)."

> "P ∧ Q is read “P and Q,” and called a conjunction."

> "P ∨ Q is read “P or Q,” and called a disjunction."

> "P → Q is read “if P then Q,” and called an implication or conditional."

> "P ↔ Q is read “P if and only if Q,” and called a biconditional."

> "¬P is read “not P,” and called a negation."

> "P ∧ Q is true when both P and Q are true."

> "P ∨ Q is true when P or Q or both are true."

> "P → Q is true when P is false or Q is true or both."

> "P ↔ Q is true when P and Q are both true, or both false."

> "¬P is true when P is false."

> "Note that for us, or is the inclusive or (and not the sometimes used exclusive or) meaning that P ∨ Q is in fact true when both P and Q are true."

> "P is the hypothesis (or antecedent). Q is the conclusion (or consequent)."

> "An implication is true provided P is false or Q is true (or both), and false otherwise. In particular, the only way for P → Q to be false is for P to be true and Q to be false."

> "P ↔ Q is logically equivalent to (P → Q) ∧ (Q → P)."

---

## 2. 3.1 Propositional Logic › Truth Tables

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_propositional.html
- **Capítulo:** 3. Symbolic Logic and Proofs › 3.1 Propositional Logic
- **Seção interna usada:** *Truth Tables*
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidade `th-sem1-discrete-math-m01-truth-tables` (OBJ-3, OBJ-4)

### Trechos literais usados

> "A proposition is simply a statement. Propositional logic studies the ways statements can interact with each other."

> "It is important to remember that propositional logic does not really care about the content of the statements."

> "The idea is this: on each row, we list a possible combination of T's and F's (for true and false) for each of the sentential variables, and then mark down whether the statement in question is true or false in that case."

> "For complicated statements, we will first fill in values for each part of the statement, as a way of breaking up our task into smaller, more manageable pieces."

> "Since the truth value of a statement is completely determined by the truth values of its parts and how they are connected, all you really need to know is the truth tables for each of the logical connectives."

> "Make a truth table for the statement ¬P ∨ Q."

> "Note that this statement is not ¬(P ∨ Q), the negation belongs to P alone."

> "The truth table needs to contain 8 rows in order to account for every possible combination of truth and falsity among the three statements."

> "The statement about monopoly is an example of a tautology, a statement which is true on the basis of its logical form alone."

> "Notice that in each of the eight possible cases, the statement in question is true."

---

## 3. 3.1 Propositional Logic › Logical Equivalence

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_propositional.html
- **Capítulo:** 3. Symbolic Logic and Proofs › 3.1 Propositional Logic
- **Seção interna usada:** *Logical Equivalence*
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidade `th-sem1-discrete-math-m01-logical-equivalence` (OBJ-5)

### Trechos literais usados

> "Two (molecular) statements P and Q are logically equivalent provided P is true precisely when Q is true. That is, P and Q have the same truth value under any assignment of truth values to their atomic parts."

> "To verify that two statements are logically equivalent, you can make a truth table for each and check whether the columns for the two statements are identical."

> "¬(P ∧ Q) is logically equivalent to ¬P ∨ ¬Q."

> "¬(P ∨ Q) is logically equivalent to ¬P ∧ ¬Q."

> "P → Q is logically equivalent to ¬P ∨ Q."

> "¬¬P is logically equivalent to P."

> "The negation of an implication is a conjunction: ¬(P → Q) is logically equivalent to P ∧ ¬Q. That is, the only way for an implication to be false is for the hypothesis to be true AND the conclusion to be false."

> "To verify that two statements are logically equivalent, you can use truth tables or a sequence of logically equivalent replacements. The truth table method, although cumbersome, has the advantage that it can verify that two statements are NOT logically equivalent."

> "We want to start with one of the statements, and transform it into the other through a sequence of logically equivalent statements."

---

## 4. 3.1 Propositional Logic › Deductions

- **URL:** https://discrete.openmathbooks.org/dmoi3/sec_propositional.html
- **Capítulo:** 3. Symbolic Logic and Proofs › 3.1 Propositional Logic
- **Seção interna usada:** *Deductions*
- **Licença confirmada na página do livro:** CC BY-SA 4.0
- **Uso no módulo:** unidade `th-sem1-discrete-math-m01-deductions` (OBJ-6)

### Trechos literais usados

> "This is an example of a deduction rule, an argument form which is always valid. This one is a particularly famous rule called modus ponens."

> "Remember that an argument is valid provided the conclusion must be true given that the premises are true."

> "The premises in this case are P → Q and P. Which rows of the truth table correspond to both of these being true? P is true in the first two rows, and of those, only the first row has P → Q true as well. And lo-and-behold, in this one case, Q is also true."

> "Now look at all the rows for which both P → Q and ¬P → Q are true. This happens only in rows 1 and 3. Hey! In those rows Q is true as well, so the argument form is valid."

> "Look at the second to last row. Here all three premises of the argument are true, but the conclusion is false. Thus this is not a valid deduction rule."

> "While we have the truth table in front of us, look at rows 1, 3, and 5. These are the only rows in which all of the statements P → R, Q → R, and P ∨ Q are true. It also happens that R is true in these rows as well. Thus we have discovered a new deduction rule we know is valid."

---

## 5. Uso e limites

- **Derivação:** tradução/adaptação para pt-BR, com `original_excerpt` literal em inglês em cada unidade.
- **Não derivado:** exercícios da fonte, figuras, exemplos com quantificadores (fora do escopo, módulo `m02`) e a seção *Beyond Propositions*.
- **Atribuição:** registrada em `ATTRIBUTIONS.md` e no front-matter de cada unidade.
- **Conferência manual:** `npm run verify-sources` deve imprimir "confere" para as quatro unidades.
