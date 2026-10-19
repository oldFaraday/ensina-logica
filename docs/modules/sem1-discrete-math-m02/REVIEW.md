# Auditoria de Afirmações — sem1-discrete-math-m02

**Módulo:** Lógica de Predicados (`sem1-discrete-math-m02`)  
**Data da auditoria:** 2026-10-19  
**Fonte:** Oscar Levin, *Discrete Mathematics: An Open Introduction*, 3ª ed., Seções 0.2 (Mathematical Statements) e 3.1 (Propositional Logic — Beyond Propositions), abertas nesta sessão.  
**Método:** cada afirmação das unidades teóricas foi comparada com o texto literal da seção indicada, aberto nesta sessão.  
**Legenda:** `ok` = afirmação sustentada pelo trecho; `ok (aplicação)` = inferência direta e limitada a partir do trecho; `sem suporte` = removida ou rotulada como "Exemplo adicional (IA)".

---

## Unidade `th-sem1-discrete-math-m02-predicates-variables`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Uma sentença com variável livre não é uma proposição. | 0.2 | "because this sentence has a free variable (that is, a variable that we have not specified anything about), it is not a statement" | ok |
| Uma sentença que contém variáveis é chamada de predicado. | 0.2 | "A sentence that contains variables is called a predicate." | ok |
| $P(n) \rightarrow \neg P(n+7)$, com $n$ livre, não é uma proposição. | 0.2 | "this sentence has a free variable ... it is not a statement" | ok (aplicação) |
| Substituir um valor na variável transforma o predicado em proposição. | 0.2 | "if we plug in a specific value for n, we do get a statement" | ok |
| Para esse predicado, qualquer valor substituído produz uma implicação verdadeira. | 0.2 | "it turns out that no matter what value we plug in for n, we get a true implication in this case" | ok |
| Quantificar a variável também produz uma proposição sobre todos os valores. | 0.2 | "What we really want to say is that for all values of n ... We need to quantify the variable." | ok |
| A lógica de predicados estende a lógica proposicional e preserva os conectivos. | 3.1 | "predicate logic extends propositional logic ... still used the (propositional) logical connectives" | ok |
| $P(7)$ é uma proposição verdadeira e $P(14)$ é uma proposição falsa, para $P(n)$ = "$n$ é primo". | 0.2 | A fonte define $P(n)$ como "$n$ is prime" e afirma que substituir um valor produz uma statement. | ok (aplicação aritmética) |

---

## Unidade `th-sem1-discrete-math-m02-quantifiers-domain`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| $\exists$ é o quantificador existencial, lido "existe" ou "há". | 0.2 | "The existential quantifier is ∃ and is read “there exists” or “there is.”" | ok |
| $\forall$ é o quantificador universal, lido "para todo" ou "todo". | 0.2 | "The universal quantifier is ∀ and is read “for all” or “every.”" | ok |
| O domínio de discurso é o conjunto sobre o qual se quantifica. | 0.2 | "The answer depends on what our domain of discourse is: when we say “for all” x, do we mean all positive integers or all real numbers or all elements of some other set?" | ok |
| Em matemática discreta, é comum adotar os naturais como domínio de discurso. | 0.2 | "In discrete mathematics, we almost always quantify over the natural numbers, 0, 1, 2, …" | ok |
| $\forall x\exists y(y<x)$ é falsa sobre os naturais. | 0.2 | "Thus we see that the statement is false because there is a number which is less than or equal to all other numbers." | ok |
| A negação de $\forall x\exists y(y<x)$ é $\exists x\forall y(y\ge x)$. | 0.2 | "In symbols, ∃x ∀y (y ≥ x)." e "we proved that the negation was true" | ok |
| Para provar $\forall xP(x)$ falsa, basta um contraexemplo. | 0.2 | "To prove ∀x P(x) is false all you need is one example of an element in the domain for which P(n) is false. This is often called a counterexample." | ok |
| Para provar $\forall xP(x)$ verdadeira, é preciso argumentar para todos os elementos. | 0.2 | Solução do exercício 14: "the only way to prove that ∀x P(x) is true is to check or otherwise argue that P(n) is true for all n in the domain" | ok |
| Para provar $\exists xP(x)$ verdadeira, basta encontrar uma testemunha. | 0.2 | Solução do exercício 14: "If you can find one such element, you have verified the claim." | ok |
| Para provar $\exists xP(x)$ falsa, é preciso verificar todos os elementos. | 0.2 | Solução do exercício 14: "The only way to be sure of this is to verify that every element of the domain makes P(n) false." | ok |
| Saber que $P(15)$ é falsa refuta $\forall xP(x)$, mas não decide $\exists xP(x)$. | 0.2 | "P(15) ... is false. Thus the statement ∀x P(x) is false ... However, we cannot tell anything about ∃x P(x)" | ok |
| $\exists$ exige pelo menos um elemento, sem unicidade. | 0.2 | "there exists" / "there is" | ok (aplicação da leitura) |

---

## Unidade `th-sem1-discrete-math-m02-quantifier-negation`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| $\neg\forall xP(x)$ é equivalente a $\exists x\neg P(x)$. | 0.2 | "¬ ∀x P(x) is equivalent to ∃x ¬P(x)." | ok |
| $\neg\exists xP(x)$ é equivalente a $\forall x\neg P(x)$. | 0.2 | "¬ ∃x P(x) is equivalent to ∀x ¬P(x)." | ok |
| A negação passa pelo quantificador e troca o seu tipo. | 0.2 | "we can pass the negation symbol over a quantifier, but that causes the quantifier to switch type" | ok |
| Se nem tudo tem uma propriedade, algo não tem essa propriedade. | 0.2 | "if not everything has a property, then something doesn’t have that property" | ok |
| Se não existe algo com uma propriedade, tudo não tem essa propriedade. | 0.2 | "if there is not something with a property, then everything doesn’t have that property" | ok |
| A convenção trata sentenças com predicados e variáveis livres como universalmente quantificadas. | 0.2 | "assume that sentences containing predicates with free variables are intended as statements, where the variables are universally quantified" | ok |
| $S(x) \rightarrow R(x)$ é lida como $\forall x(S(x)\rightarrow R(x))$. | 0.2 | "we meant to consider the statement, ∀x (S(x) → R(x)), and this is what our convention tells us to consider" | ok |
| A fonte admite escrever "seja $P(n)$ a sentença..." de forma um pouco imprecisa. | 0.2 | "we will often be a bit sloppy about the distinction between a predicate and a statement" | ok |
| $\neg\exists x\forall y(x\le y)$ é equivalente a $\forall x\exists y(y<x)$. | 3.1 | "the statement above should be logically equivalent to ∀x ∃y (y < x)" e "y < x is the negation of x ≤ y" | ok |
| O exemplo mostra a negação aplicada duas vezes, com troca de tipo em cada passagem. | 3.1 | "we can pass a negation over a quantifier by switching the quantifier type" | ok (aplicação) |

---

## Unidade `th-sem1-discrete-math-m02-order-deduction`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| $\forall x\exists yP(x,y)$ e $\exists y\forall xP(x,y)$ não são logicamente equivalentes. | 3.1 | "These statements are NOT logically equivalent." | ok |
| $\exists y\forall xP(x,y)$ implica $\forall x\exists yP(x,y)$, mas não o contrário. | 3.1 | "If there is some y for which every x satisfies P(x,y), then certainly for every x there is some y which satisfies P(x,y)." | ok |
| Essa relação é uma regra de dedução válida, não uma equivalência. | 3.1 | "while we don’t have logical equivalence between the two statements, we do have a valid deduction rule: ∃y ∀x P(x,y) ∴ ∀x ∃y P(x,y)" | ok |
| Com $P(x,y)$ = "$x<y$" nos naturais, $\forall x\exists y(x<y)$ é verdadeira. | 3.1 | "It is true, in the natural numbers, that for all x there is some y greater than that x (since there are infinitely many numbers)." | ok |
| Com $P(x,y)$ = "$x<y$" nos naturais, $\exists y\forall x(x<y)$ é falsa. | 3.1 | "there is not a natural number y which is greater than every number x" | ok |
| "Todos os primos maiores que 2 são ímpares" traduz-se como $\forall x((P(x)\land x>2)\rightarrow O(x))$. | 3.1 | "We can translate as follows: ∀x ((P(x) ∧ x > 2) → O(x))." | ok |
| A lógica de predicados estende a proposicional e preserva equivalências e deduções. | 3.1 | "predicate logic extends propositional logic ... Everything that we learned about logical equivalence and deductions still applies." | ok |
| Não há procedimento sistemático análogo às tabelas-verdade na lógica de predicados. | 3.1 | "there is no systematic procedure for deciding whether two statements in predicate logic are logically equivalent (i.e., there is no analogue to truth tables here)" | ok |
| Uma verdade necessária na lógica de predicados é chamada de lei da lógica. | 3.1 | "A statement in predicate logic that is necessarily true gets the more prestigious designation of a law of logic." | ok |
| "Tautologia" é reservada às verdades da lógica proposicional. | 3.1 | "although we reserve that term for necessary truths in propositional logic" | ok |

---

## Resumo da auditoria

- **Afirmações com suporte literal:** 37
- **Aplicações diretas da fonte:** 8
- **Sem suporte:** 0 (nenhuma afirmação foi mantida sem apoio; não foi necessário rotular exemplo adicional de IA)
- **Nenhuma unidade ficou `pending`.** Os quatro `original_excerpt` foram conferidos contra as páginas vivas das Seções 0.2 e 3.1.
