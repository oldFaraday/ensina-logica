# Plano do Módulo: sem1-discrete-math-m01 — Lógica Proposicional

**Disciplina:** Matemática Discreta / Lógica (sem1/discrete-math)  
**Módulo:** m01  
**Título:** Lógica Proposicional  
**Versão da pipeline:** 1  
**Status:** Em execução (E0–E7) — módulo não piloto, sem pausa de aprovação

---

## 1. Objetivos de Aprendizagem (OBJ-1 a OBJ-6)

| ID | Objetivo (verbo mensurável) | Nível cognitivo alvo |
|----|------------------------------|----------------------|
| OBJ-1 | **Distinguir** proposições de frases que não são proposições (perguntas, ordens, fragmentos e sentenças com variável livre) e classificar proposições em atômicas ou moleculares | Reconhecer / Analisar |
| OBJ-2 | **Identificar** os cinco conectivos lógicos (∧, ∨, →, ↔, ¬) e **aplicar** suas condições de verdade, incluindo o caso em que a implicação é falsa | Reconhecer / Aplicar |
| OBJ-3 | **Construir** tabelas-verdade para proposições moleculares, com todas as combinações de valores e colunas intermediárias | Aplicar |
| OBJ-4 | **Reconhecer** tautologias pela coluna final da tabela-verdade e **analisar** o valor de verdade de uma proposição composta em cada linha | Analisar |
| OBJ-5 | **Aplicar** equivalências lógicas (De Morgan, implicação como disjunção, dupla negação e negação de implicação) para reescrever e simplificar proposições | Aplicar / Transferir |
| OBJ-6 | **Analisar** a validade de uma regra de dedução com tabela-verdade, identificando o *modus ponens* e um contraexemplo de regra inválida | Analisar / Transferir |

---

## 2. Pré-requisitos

- Nenhum pré-requisito formal de programação (módulo inaugural da disciplina de Matemática Discreta).
- Leitura básica de sentenças declarativas e do conceito intuitivo de "verdadeiro" e "falso".
- Aritmética elementar (usada apenas em exemplos, como "$3 + 7 = 12$").
- Nenhuma linguagem de programação é usada: o módulo trabalha só com notação lógica e tabelas.

---

## 3. Mapa: Objetivo → Seção da Fonte (com verificação de acesso)

| Objetivo | Fonte | Edição | Capítulo / Seção | URL da seção | Licença confirmada |
|----------|-------|--------|------------------|--------------|-------------------|
| OBJ-1, OBJ-2 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 0. Introduction and Preliminaries › **0.2 Mathematical Statements** › *Atomic and Molecular Statements*, *Implications*, *Logical Connectives*, *Truth Conditions for Connectives* | https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html | CC BY-SA 4.0 ✅ (página do livro: https://discrete.openmathbooks.org/dmoi3.html → seção "License") |
| OBJ-3, OBJ-4 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 3. Symbolic Logic and Proofs › **3.1 Propositional Logic** › *Truth Tables* | https://discrete.openmathbooks.org/dmoi3/sec_propositional.html | CC BY-SA 4.0 ✅ |
| OBJ-5 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 3. Symbolic Logic and Proofs › **3.1 Propositional Logic** › *Logical Equivalence* (De Morgan's Laws, Implications are Disjunctions, Double Negation, Negation of an Implication) | https://discrete.openmathbooks.org/dmoi3/sec_propositional.html | CC BY-SA 4.0 ✅ |
| OBJ-6 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 3. Symbolic Logic and Proofs › **3.1 Propositional Logic** › *Deductions* (modus ponens, verificação por tabela-verdade) | https://discrete.openmathbooks.org/dmoi3/sec_propositional.html | CC BY-SA 4.0 ✅ |

> **Verificação de acesso (2026-10-19):** as duas URLs de seção foram abertas nesta sessão e contêm os títulos, as definições e os exemplos citados. **Nenhuma seção ficou `pending`.**
>
> **Licença:** a página https://discrete.openmathbooks.org/dmoi3.html declara: *"Discrete Mathematics: An Open Introduction by Oscar Levin is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License."* Usar **somente a 3ª edição** (`dmoi3`); a 4ª edição é CC BY-NC-SA 4.0 e **não pode** ser derivada.

---

## 4. Lições (4 lições)

| Lição | ID | Título | Objetivos cobertos | Resumo do conteúdo |
|-------|-----|--------|---------------------|---------------------|
| 1 | `l11` | Proposições e conectivos | OBJ-1, OBJ-2 | O que é uma sentença (proposição); atômica vs. molecular; frases que não são proposições; os cinco conectivos e suas condições de verdade; hipótese e conclusão de uma implicação. |
| 2 | `l12` | Tabelas-verdade | OBJ-3, OBJ-4 | Como montar uma tabela-verdade; $2^n$ combinações; colunas intermediárias; leitura da coluna final; tautologia. |
| 3 | `l13` | Equivalências lógicas | OBJ-5 | Definição de equivalência lógica; verificação por tabelas idênticas; Leis de De Morgan; implicação como disjunção; dupla negação; negação de uma implicação; transformação sem tabela. |
| 4 | `l20` | Deduções válidas | OBJ-6 | Argumento válido; regra de dedução; *modus ponens*; verificação de validade por tabela-verdade; identificação de um contraexemplo para uma regra inválida. Integra os conceitos das lições anteriores. |

---

## 5. Fora de Escopo (não abordar neste módulo)

- Lógica de predicados, quantificadores (∀, ∃), variáveis livres e domínio de discurso — módulo `m02` (Lógica de Predicados).
- Métodos de prova, indução matemática e recursão — módulo `m03` (Provas e Indução).
- Álgebra booleana além das equivalências listadas na fonte, minimização de circuitos e mapas de Karnaugh.
- Sistemas de dedução natural, cálculo de sequentes e regras além do *modus ponens*.
- Algoritmos de SAT, tableaux semânticos e verificação automatizada de fórmulas.
- Sintaxe de linguagens de programação e operadores `&&`, `||`, `!` de código.
- Teoria de conjuntos e funções (0.3 e 0.4 da fonte).

---

## 6. Unidades Teóricas Planejadas (300–700 palavras cada)

| Unidade (ID) | Seção da fonte | Objetivos cobertos | Lições vinculadas |
|--------------|----------------|---------------------|-------------------|
| `th-sem1-discrete-math-m01-propositions-connectives` | 0.2 Mathematical Statements | OBJ-1, OBJ-2 | `l11` |
| `th-sem1-discrete-math-m01-truth-tables` | 3.1 Propositional Logic › Truth Tables | OBJ-3, OBJ-4 | `l12` |
| `th-sem1-discrete-math-m01-logical-equivalence` | 3.1 Propositional Logic › Logical Equivalence | OBJ-5 | `l13` |
| `th-sem1-discrete-math-m01-deductions` | 3.1 Propositional Logic › Deductions | OBJ-6 | `l20` |

> **Regra:** cada unidade terá `verification_status: verified_with_source` somente após capturar trecho literal (`original_excerpt` ≥ 15 palavras em inglês) e conferir contra a fonte aberta. Se a seção não abrir, fica `pending` e não gera exercícios.

---

## 7. Exercícios Existentes — **DESCARTADOS (Regra 5)**

> A unidade antiga (`th-sem1-discrete-math-m01-logic`) e os três arquivos atuais (`m01-l11.json`, `m01-l12.json`, `m01-l13.json`) **não contam** como verificados na pipeline v1. Serão **removidos e refeitos do zero** no template v1 (campos `objective_id`, `level`, `source_ref`, `answer_check` obrigatórios).

---

## 8. Regras Específicas para Este Módulo (aplicar em E4)

1. **Nenhum exercício usa linguagem de programação** — apenas notação lógica e tabelas-verdade.
2. Rampa de dificuldade por lição (respeitando E4 do CONTENT_PIPELINE):
   - `l11` (lição 1): 3 fáceis, 3 médios, **sem difícil**;
   - `l12`, `l13` e `l20`: 2 fáceis, 3 médios, 1 difícil.
3. Variedade: no máximo 2 exercícios seguidos do mesmo tipo; reconhecimento antes de produção.
4. Cada objetivo tem pelo menos 2 exercícios em níveis cognitivos diferentes (considerando lições + desafio + flashcards).
5. Desafio do módulo: 8 questões (2 fáceis, 4 médias, 2 difíceis) cobrindo OBJ-1 a OBJ-6.
6. Flashcards do módulo: 10 cards, com termos e definições da fonte.
7. Toda explicação cita a seção/capítulo da fonte (ex.: "Seção 0.2", "Seção 3.1") para satisfazer o validador.
8. Nenhuma conclusão é apresentada sem tabela-verdade ou equivalência já ensinada na unidade correspondente.

---

## 9. Execução E1–E7

- [ ] **E1** Criar `docs/modules/sem1-discrete-math-m01/SOURCES.md` com URL, edição, data de acesso, licença confirmada e trechos literais.
- [ ] **E2** Criar 4 unidades teóricas em `data/theory/sem1/discrete-math/`, 300–700 palavras, estrutura fixa, ≤3 termos novos, `original_excerpt` literal.
- [ ] **E3** Criar `docs/modules/sem1-discrete-math-m01/REVIEW.md` com tabela afirmação | seção | trecho de apoio | ok/sem suporte.
- [ ] **E4** Gerar exercícios: 4 arquivos de lição (6 cada), `m01-challenge.json` (8), `m01-flashcards.json` (10).
- [ ] **E5** Atualizar `data/glossary.json`, criar `LIBRARY.md` com ordem de leitura e tempos.
- [ ] **E6** Rodar os quatro portões e corrigir até passar.
- [ ] **E7** Atualizar `tasks.md`/`STATUS.md`, marcar `"pipeline_version": 1` **somente neste módulo**, um commit do módulo.

---

*Criado em 2026-10-19.*
