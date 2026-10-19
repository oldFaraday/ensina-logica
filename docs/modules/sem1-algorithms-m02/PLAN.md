# Plano do Módulo: sem1-algorithms-m02 — Variáveis e Tipos

**Disciplina:** Algoritmos e Lógica de Programação (sem1/algorithms)  
**Módulo:** m02  
**Título:** Variáveis e Tipos  
**Versão da pipeline:** 1  
**Status:** E0 concluído — prosseguir para E1 (módulo não piloto)

---

## 1. Objetivos de Aprendizagem (OBJ-1 a OBJ-6)

| ID | Objetivo (verbo mensurável) | Nível cognitivo alvo |
|----|------------------------------|----------------------|
| OBJ-1 | **Definir** constante e variável e **distinguir** constante literal de constante nomeada | Reconhecer |
| OBJ-2 | **Aplicar** as regras técnicas e as boas práticas de nomes de identificadores (caracteres permitidos, palavras reservadas, nome significativo e consistência de caixa) | Aplicar |
| OBJ-3 | **Classificar** valores nos tipos de dado comuns (inteiro, ponto flutuante, string, booleano e nada) e **justificar** a escolha do tipo | Analisar |
| OBJ-4 | **Interpretar** a atribuição como cópia de um valor para uma variável, distinguindo o símbolo `=` de igualdade matemática | Aplicar |
| OBJ-5 | **Avaliar** expressões aritméticas simples usando precedência, associatividade e parênteses | Aplicar |
| OBJ-6 | **Calcular** quociente inteiro e resto com divisão inteira e módulo, interpretando cada parte do resultado | Analisar |

---

## 2. Pré-requisitos

- Módulo `sem1-algorithms-m01` concluído: design de programa, modelo IPO, pseudocódigo e fluxogramas.
- Operações aritméticas básicas do ensino fundamental (soma, subtração, multiplicação e divisão).
- Noção intuitiva de que um programa armazena valores para usá-los depois.

---

## 3. Mapa: Objetivo → Seção da Fonte (com verificação de acesso)

| Objetivo | Fonte | Edição | Capítulo / Seção | URL da seção | Licença confirmada |
|----------|-------|--------|------------------|--------------|-------------------|
| OBJ-1 | Programming Fundamentals | 2ª ed. (2018) | II. Data and Operators › **Constants and Variables** | https://press.rebus.community/programmingfundamentals/chapter/constants-and-variables/ | CC BY-SA 4.0 ✅ |
| OBJ-2 | Programming Fundamentals | 2ª ed. (2018) | II. Data and Operators › **Identifier Names** | https://press.rebus.community/programmingfundamentals/chapter/identifier-names/ | CC BY-SA 4.0 ✅ |
| OBJ-3 | Programming Fundamentals | 2ª ed. (2018) | II. Data and Operators › **Data Types**, **Integer Data Type**, **Floating-Point Data Type**, **String Data Type**, **Boolean Data Type**, **Nothing Data Type** | https://press.rebus.community/programmingfundamentals/chapter/data-types/ | CC BY-SA 4.0 ✅ |
| OBJ-4 | Programming Fundamentals | 2ª ed. (2018) | II. Data and Operators › **Assignment** | https://press.rebus.community/programmingfundamentals/chapter/assignment/ | CC BY-SA 4.0 ✅ |
| OBJ-5 | Programming Fundamentals | 2ª ed. (2018) | II. Data and Operators › **Order of Operations**, **Arithmetic Operators** | https://press.rebus.community/programmingfundamentals/chapter/order-of-operations/ | CC BY-SA 4.0 ✅ |
| OBJ-6 | Programming Fundamentals | 2ª ed. (2018) | II. Data and Operators › **Integer Division and Modulus** | https://press.rebus.community/programmingfundamentals/chapter/integer-division-and-modulus/ | CC BY-SA 4.0 ✅ |

> **Verificação de acesso (2026-10-19):** todas as URLs acima foram abertas nesta sessão e continham os títulos e trechos registrados em `SOURCES.md`. **Nenhuma seção ficou `pending`.**

> **Licença:** a página do livro em https://press.rebus.community/programmingfundamentals/ declara CC BY-SA 4.0 com a ressalva "except where otherwise noted". Neste módulo derivamos apenas texto; nenhuma imagem ou figura é copiada ou adaptada.

---

## 4. Lições (3 lições)

| Lição | ID | Título | Objetivos cobertos | Resumo do conteúdo |
|-------|-----|--------|---------------------|---------------------|
| 1 | `l04` | Variáveis e constantes | OBJ-1, OBJ-2 | Constante (literal e nomeada) e variável; atribuição de valor na definição; boas práticas e regras de nomes de identificadores. |
| 2 | `l05` | Tipos primitivos de dados | OBJ-3 | Tipo de dado como classificação; inteiro, ponto flutuante, string, booleano e nada; escolha do tipo adequado a cada valor. |
| 3 | `l06` | Expressões e operadores | OBJ-4, OBJ-5, OBJ-6 | Atribuição versus igualdade; operadores aritméticos; precedência e associatividade; divisão inteira e módulo. |

> A lição 1 (primeira do módulo) não terá exercício difícil: 3 fáceis e 3 médios. As lições 2 e 3 seguem 2 fáceis, 3 médios e 1 difícil. A lição 3 integra os conceitos das anteriores ao avaliar expressões que usam variáveis, tipos e operadores.

---

## 5. Fora de Escopo (não abordar neste módulo)

- Sintaxe de linguagens específicas (C++, C#, Java, JavaScript, Python, Swift) — os exemplos serão em pseudocódigo neutro.
- Conversão explícita entre tipos (*casting*) e promoção automática — capítulo *Data Type Conversions*.
- Operadores relacionais (`<`, `>`, `==`), lógicos (`and`, `or`, `not`), unários e de incremento/decremento — módulos seguintes.
- Escopo de variáveis, parâmetros, funções e sub-rotinas — módulo `m03` e capítulo *Scope*.
- Vetores, strings como estruturas indexadas e funções de string — capítulos *Arrays* e *String Functions*.
- Representação binária detalhada (bits, complemento de um, overflow) — capítulos *Integer Data Type* (apenas a ideia geral é usada) e *Integer Overflow*.
- Atribuição composta (`+=`, `-=`, `*=`, `/=`, `%=`) — mencionada apenas como equivalente, sem exigir sintaxe.

---

## 6. Unidades Teóricas Planejadas (300–700 palavras cada)

| Unidade (ID) | Capítulo/Fonte | Objetivos cobertos | Lições vinculadas |
|--------------|----------------|---------------------|-------------------|
| `th-sem1-algorithms-m02-constants-variables` | Constants and Variables | OBJ-1 | l04 |
| `th-sem1-algorithms-m02-identifier-names` | Identifier Names | OBJ-2 | l04 |
| `th-sem1-algorithms-m02-data-types` | Data Types (+ capítulos de cada tipo) | OBJ-3 | l05 |
| `th-sem1-algorithms-m02-expressions-operators` | Assignment, Order of Operations, Arithmetic Operators | OBJ-4, OBJ-5 | l06 |
| `th-sem1-algorithms-m02-integer-division-modulus` | Integer Division and Modulus | OBJ-6 | l06 |

> **Regra:** cada unidade só recebe `verification_status: verified_with_source` após capturar um `original_excerpt` literal (≥ 15 palavras, em inglês) e conferi-lo contra a fonte aberta nesta sessão. Se uma seção não abrir, ela fica `pending` e não gera exercícios.

---

## 7. Conteúdo Existente — **DESCARTADO (Regra 5)**

> A unidade antiga `th-sem1-algorithms-m02-variables` e os exercícios antigos `m02-l04.json`, `m02-l05.json` e `m02-l06.json` **não contam como verificados** na pipeline v1. Serão removidos e refeitos do zero, com os campos `objective_id`, `level`, `source_ref` e `answer_check`. O histórico do git preserva a versão anterior.

---

## 8. Regras Específicas para Este Módulo (aplicar em E4)

1. Exercícios e exemplos usam **pseudocódigo neutro**; nenhuma linguagem específica é exigida.
2. Em `code-completion`, `language: "pseudocode"` e `accepted_answers` listam apenas expressões equivalentes e válidas no pseudocódigo da fonte.
3. Cálculos aritméticos são conferidos em Python 3.12 e a saída é registrada em `answer_check`; o código do exercício continua em pseudocódigo.
4. A lição 1 (`l04`) tem 3 fáceis e 3 médios, sem difícil; as lições `l05` e `l06` têm 2 fáceis, 3 médios e 1 difícil.
5. Variedade: no máximo 2 exercícios seguidos do mesmo tipo; reconhecimento antes de produção.
6. Desafio do módulo: 8 questões (2 fáceis, 4 médias, 2 difíceis) cobrindo OBJ-1 a OBJ-6.
7. Flashcards do módulo: 8 a 12 cards com termos e definições da fonte.
8. Todo exercício (lição, desafio e flashcard) tem `generated_by_ai: true`, `objective_id`, `level`, `source_ref` e `answer_check`.

---

## 9. Execução E1–E7

- [ ] **E1** `docs/modules/sem1-algorithms-m02/SOURCES.md` com URL, edição, data de acesso, licença e trechos literais.
- [ ] **E2** 5 unidades teóricas em `data/theory/sem1/algorithms/`, 300–700 palavras, estrutura fixa, ≤ 3 termos novos, `original_excerpt` literal.
- [ ] **E3** `docs/modules/sem1-algorithms-m02/REVIEW.md` com tabela afirmação | seção | trecho de apoio | ok/sem suporte.
- [ ] **E4** Exercícios: 6 por lição (`m02-l04.json`, `m02-l05.json`, `m02-l06.json`), `m02-challenge.json` (8) e `m02-flashcards.json` (10–12).
- [ ] **E5** `LIBRARY.md`, ordem de leitura, tempo estimado, "praticar este trecho" e termos novos no `data/glossary.json`.
- [ ] **E6** Rodar `check-module`, `validate`, `test` e `verify-sources` até passarem.
- [ ] **E7** Atualizar `tasks.md`/`STATUS.md`, marcar `"pipeline_version": 1` só neste módulo e fazer um commit do módulo.

---

*Criado em 2026-10-19 (E0).*
