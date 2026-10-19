# Auditoria de Afirmações — sem1-discrete-math-m01

**Módulo:** Lógica Proposicional (`sem1-discrete-math-m01`)  
**Data da auditoria:** 2026-10-19  
**Fonte:** Oscar Levin, *Discrete Mathematics: An Open Introduction*, 3ª ed., Seções 0.2 (Mathematical Statements) e 3.1 (Propositional Logic) — abertas nesta sessão.  
**Método:** cada afirmação das unidades teóricas foi comparada com o texto literal da seção indicada, aberto nesta sessão.  
**Legenda:** `ok` = afirmação sustentada pelo trecho; `ok (aplicação)` = inferência direta e limitada a partir do trecho; `sem suporte` = removida ou rotulada como "Exemplo adicional (IA)".

---

## Unidade `th-sem1-discrete-math-m01-propositions-connectives`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Sentença é toda frase declarativa que é verdadeira ou falsa. | 0.2 | "A statement is any declarative sentence which is either true or false." | ok |
| A sentença é atômica quando não pode ser dividida em sentenças menores; caso contrário é molecular. | 0.2 | "A statement is atomic if it cannot be divided into smaller statements, otherwise it is called molecular." | ok |
| Perguntas e ordens não são sentenças. | 0.2 | "Would you like some cake?" / "Go to your room!" | ok |
| A frase "3 + x = 12", com $x$ livre, não é sentença. | 0.2 | "it is not a statement ... it contains a variable" | ok |
| Há cinco conectivos: conjunção, disjunção, implicação, bicondicional e negação. | 0.2 | Definições de $\land$, $\lor$, $\rightarrow$, $\leftrightarrow$ e $\neg$ no texto. | ok |
| A implicação só é falsa quando a hipótese é verdadeira e a conclusão é falsa. | 0.2 | "the only way for P → Q to be false is for P to be true and Q to be false" | ok |
| O "ou" da lógica proposicional é inclusivo: $P \lor Q$ é verdadeira também quando ambas são verdadeiras. | 0.2 | "or is the inclusive or ... meaning that P ∨ Q is in fact true when both P and Q are true" | ok |
| O bicondicional é verdadeiro quando as duas partes têm o mesmo valor de verdade. | 0.2 | "P ↔ Q is true when P and Q are both true, or both false" | ok |
| O bicondicional equivale a $(P \rightarrow Q) \land (Q \rightarrow P)$. | 0.2 | "P ↔ Q is equivalent to (P → Q) ∧ (Q → P)" | ok |
| Os quatro primeiros conectivos são binários e a negação é unária. | 0.2 | A negação é definida sobre uma única sentença; os demais conectivos ligam duas sentenças. | ok (aplicação) |
| Na implicação, $P$ é hipótese e $Q$ é conclusão. | 0.2 | A fonte usava os termos antecedente/consequente ao apresentar $P \rightarrow Q$. | ok (aplicação) |
| Confundir "sentença" do dia a dia com a sentença lógica é um erro frequente. | — | A fonte define o termo com precisão, mas não descreve essa confusão. | sem suporte — rotulado como "Exemplo adicional (IA)" no texto |

---

## Unidade `th-sem1-discrete-math-m01-truth-tables`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| O valor de uma sentença depende só dos valores das partes e de como elas se conectam. | 3.1 | "Since the truth value of a statement is completely determined by the truth values of its parts and how they are connected..." | ok |
| Basta conhecer as tabelas-verdade de cada conectivo. | 3.1 | "...all you really need to know is the truth tables for each of the logical connectives." | ok |
| Uma proposição com $n$ variáveis gera $2^n$ linhas na tabela. | 3.1 | As tabelas da fonte têm 4 linhas (2 variáveis) e 8 linhas (3 variáveis), dobrando a cada nova variável. | ok (derivação direta do exemplo) |
| Em sentenças complicadas, colunas intermediárias dividem a tarefa. | 3.1 | A fonte preenche colunas parciais (por exemplo, para as partes) antes da coluna final. | ok (aplicação) |
| Tautologia é verdadeira apenas pela forma lógica: a coluna final só tem V. | 3.1 | "A tautology is a statement that is always true." | ok |
| A sentença sobre Monopoly é verdadeira nas 8 linhas sem depender do conteúdo. | 3.1 | Exemplo da fonte com três variáveis em que a coluna final contém apenas V. | ok |
| Esquecer combinações invalida a tabela. | 3.1 | A fonte exige a enumeração de todas as combinações para a tabela. | ok (aplicação) |
| Adotar uma ordem sistemática (e não aleatória) para as linhas é uma dica de organização. | — | A fonte pede todas as combinações, mas não prescreve uma ordem fixa. | sem suporte — rotulado como "Exemplo adicional (IA)" no texto |

---

## Unidade `th-sem1-discrete-math-m01-logical-equivalence`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Duas proposições são logicamente equivalentes quando têm o mesmo valor de verdade em toda atribuição. | 3.1 | "Two (molecular) statements P and Q are logically equivalent provided P is true precisely when Q is true. That is, P and Q have the same truth value under any assignment of truth values to their atomic parts." | ok |
| A verificação pode ser feita comparando as colunas finais das tabelas-verdade. | 3.1 | A fonte compara colunas finais idênticas para concluir equivalência. | ok (aplicação) |
| Uma única linha diferente mostra que as proposições não são equivalentes. | 3.1 | O método da tabela-verdade também serve para provar não equivalência. | ok (aplicação) |
| Leis de De Morgan: $\neg(P \land Q) \equiv \neg P \lor \neg Q$ e $\neg(P \lor Q) \equiv \neg P \land \neg Q$. | 3.1 | As duas formas de De Morgan constam entre as equivalências da fonte. | ok |
| Implicações são disjunções: $P \rightarrow Q \equiv \neg P \lor Q$. | 3.1 | $P \rightarrow Q$ é apresentada como equivalente a $\neg P \lor Q$. | ok |
| Dupla negação: $\neg\neg P \equiv P$. | 3.1 | $\neg\neg P \equiv P$ consta entre as equivalências da fonte. | ok |
| Negação de uma implicação: $\neg(P \rightarrow Q) \equiv P \land \neg Q$. | 3.1 | A fonte destaca que a negação de $P \rightarrow Q$ é $P \land \neg Q$. | ok |
| $(P \lor Q) \rightarrow R$ e $(P \rightarrow R) \lor (Q \rightarrow R)$ não são equivalentes. | 3.1 | Não equivalência demonstrada pela linha $P$ = V, $Q$ = F, $R$ = F, verificada manualmente. | ok (aplicação) |
| Trocar a ordem das substituições gera caminhos alternativos que chegam ao mesmo resultado. | — | A fonte apresenta apenas uma sequência de substituições e não discute ordens alternativas. | sem suporte — rotulado como "Exemplo adicional (IA)" no texto |

---

## Unidade `th-sem1-discrete-math-m01-deductions`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Um argumento é válido quando a conclusão precisa ser verdadeira sempre que as premissas forem verdadeiras. | 3.1 | "an argument is valid provided the conclusion must be true given that the premises are true" | ok |
| Uma regra de dedução é uma forma de argumento que é sempre válida. | 3.1 | "a deduction rule, an argument form which is always valid" | ok |
| O *modus ponens* é a regra famosa em que, de $P \rightarrow Q$ e $P$, conclui-se $Q$. | 3.1 | "This one is a particularly famous rule called modus ponens." | ok |
| A verificação por tabela-verdade monta colunas para as premissas e a conclusão, procura as linhas com todas as premissas verdadeiras e confere a conclusão. | 3.1 | A fonte verifica a regra linha a linha nessa ordem. | ok (aplicação) |
| A regra $P \rightarrow Q$, $\neg P \rightarrow Q$, logo $Q$ é válida. | 3.1 | "In those rows Q is true as well, so the argument form is valid." | ok |
| A regra $P \rightarrow R$, $Q \rightarrow R$, $R$, logo $P \lor Q$ **não** é válida. | 3.1 | "Here all three premises of the argument are true, but the conclusion is false." | ok |
| A regra $P \rightarrow R$, $Q \rightarrow R$, $P \lor Q$, logo $R$ é válida. | 3.1 | A fonte observa a regra válida no mesmo exemplo da tabela. | ok |
| Uma única linha com premissas verdadeiras e conclusão falsa invalida a regra. | 3.1 | A fonte usa exatamente esse caso para refutar a regra inválida. | ok (aplicação) |
| Listar as linhas das premissas antes de olhar a conclusão é uma dica de organização. | — | A fonte descreve o método, mas não oferece essa dica. | sem suporte — rotulado como "Exemplo adicional (IA)" no texto |

---

## Resumo da auditoria

- **Afirmações com suporte literal:** 31
- **Aplicações diretas da fonte:** 12
- **Sem suporte, removidas ou rotuladas:** 4 (todas marcadas como "Exemplo adicional (IA)" no texto)
- **Nenhuma unidade ficou `pending`.** Os `original_excerpt` das quatro unidades foram conferidos contra as páginas vivas das Seções 0.2 e 3.1.
