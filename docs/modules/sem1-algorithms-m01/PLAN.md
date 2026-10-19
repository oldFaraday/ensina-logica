# Plano do Módulo: sem1-algorithms-m01 — Introdução a Algoritmos

**Disciplina:** Algoritmos e Lógica de Programação (sem1/algorithms)  
**Módulo:** m01  
**Título:** Introdução a Algoritmos  
**Versão da pipeline:** 1  
**Status:** Aprovado — prosseguir para E1

---

## 1. Objetivos de Aprendizagem (OBJ-1 a OBJ-8)

| ID | Objetivo (verbo mensurável) | Nível cognitivo alvo |
|----|------------------------------|----------------------|
| OBJ-1 | **Definir** design de programa e modelo IPO (Entrada, Processamento, Saída); reconhecer que a fonte usa "algoritmo" como a lógica documentada do programa | Reconhecer |
| OBJ-2 | **Identificar** as três áreas de atividade do design de programa (entender, modelar, testar) | Reconhecer |
| OBJ-3 | **Diferenciar** pseudocódigo de código real (reconhecer que "pseudo" = falso, não compilável) | Reconhecer |
| OBJ-4 | **Completar** pseudocódigo simples seguindo o modelo IPO (entrada, processamento, saída) | Aplicar |
| OBJ-5 | **Identificar** os quatro símbolos básicos de fluxograma (terminal, processo, entrada/saída, decisão) | Reconhecer |
| OBJ-6 | **Interpretar e ordenar** os passos de um fluxograma simples | Aplicar |
| OBJ-7 | **Classificar** exemplos em sequência, seleção ou iteração | Analisar |
| OBJ-8 | **Reconhecer** por que o `goto` (ramificação) é evitado em programação estruturada | Reconhecer |

---

## 2. Pré-requisitos

- Nenhum pré-requisito formal (módulo inaugural do 1º semestre).
- Familiaridade básica com uso de computador (teclado, mouse, navegação web).
- Conceitos de matemática do ensino médio (operações aritméticas, variáveis simples).

---

## 3. Mapa: Objetivo → Seção da Fonte (com verificação de acesso)

| Objetivo | Fonte | Edição | Capítulo / Seção | URL da seção | Licença confirmada |
|----------|-------|--------|------------------|--------------|-------------------|
| OBJ-1, OBJ-2 | Programming Fundamentals | 2ª ed. (2018) | I. Introduction to Programming › **Program Design** › *Overview*, *Understanding the Program*, *Using Design Tools to Create a Model*, *Develop Test Data* | https://press.rebus.community/programmingfundamentals/chapter/program-design/ | CC BY-SA 4.0 ✅ (página do livro: https://press.rebus.community/programmingfundamentals/ → "About this Book" → "Re-use and Customization" declara CC BY-SA; nota: "exceto onde indicado") |
| OBJ-3, OBJ-4 | Programming Fundamentals | 2ª ed. (2018) | I. Introduction to Programming › **Pseudocode** › *Overview*, *Discussion* (inclui definição de "pseudo" = falso, exemplo IPO de duas idades) | https://press.rebus.community/programmingfundamentals/chapter/pseudocode/ | CC BY-SA 4.0 ✅ |
| OBJ-5, OBJ-6 | Programming Fundamentals | 2ª ed. (2018) | I. Introduction to Programming › **Flowcharts** › *Simple Flowcharting Symbols* (terminal, processo, entrada/saída, decisão), *Simple Examples* | https://press.rebus.community/programmingfundamentals/chapter/flowcharts/ | CC BY-SA 4.0 ✅ |
| OBJ-7, OBJ-8 | Programming Fundamentals | 2ª ed. (2018) | IV. Conditions › **Structured Programming** › *Overview*, *Discussion* (três categorias: sequência, seleção, iteração; menção a Dijkstra, artigo "go to less", fim do séc. XX) | https://press.rebus.community/programmingfundamentals/chapter/structured-programming/ | CC BY-SA 4.0 ✅ |

> **Verificação de acesso (2026-10-19):** Todas as 4 URLs abrem e contêm os títulos citados. **Correção após abrir a fonte:** o capítulo *Program Design* **não** traz uma definição formal isolada de "algoritmo"; usa o termo como a lógica/design documentado do programa ("document the logic or algorithm of each function"). Por isso OBJ-1 foi ajustado para não inventar definição e a unidade registra essa limitação. O modelo IPO (Inputs, Processing, Outputs) está explícito em *Understanding the Program*; o capítulo *Structured Programming* cita Dijkstra ("go to less", fim do séc. XX). **Nenhuma seção pending.**

> **Licença:** A página do livro em https://press.rebus.community/programmingfundamentals/ (seção "About this Book" → "Re-use and Customization") declara CC BY-SA 4.0 com a ressalva "exceto onde indicado". Imagens/figuras dentro dos capítulos podem ter licença diferente; não derivaremos imagens, apenas texto.

---

## 4. Lições (4 lições)

| Lição | ID | Título | Objetivos cobertos | Resumo do conteúdo |
|-------|-----|--------|---------------------|---------------------|
| 1 | `l01` | Design de programa e modelo IPO | OBJ-1, OBJ-2 | Design antes de codificar; modelo IPO (Entrada, Processamento, Saída); três áreas do design (entender, modelar, testar); "algoritmo" como lógica documentada (sem definição formal na fonte); importância de planejar. |
| 2 | `l02` | Pseudocódigo | OBJ-3, OBJ-4 | Pseudocódigo: definição, "pseudo" = falso, imita código mas não é compilável; estrutura IPO no pseudocódigo (exemplo das duas idades). |
| 3 | `l03` | Fluxogramas | OBJ-5, OBJ-6 | Quatro símbolos básicos (terminal, processo, entrada/saída, decisão), fluxo padrão esquerda→direita, cima→baixo; interpretar e ordenar passos. |
| 4 | `l19` | Estruturas de controle básicas | OBJ-7, OBJ-8 | Programação estruturada: três categorias (sequência, seleção, iteração); seleção = escolher caminho (if/else como nomes dos conceitos); iteração = repetição (while/for como nomes); ramificação (goto) = não estruturada, gera spaghetti code; Dijkstra e consenso histórico. |

---

## 5. Fora de Escopo (não abordar neste módulo)

- Sintaxe de linguagens específicas (C++, Python, Java, etc.) — o foco é pseudocódigo e fluxograma independentes de linguagem.
- Funções/procedimentos, modularização, hierarquia de módulos (ver módulo m03, lição l10).
- Tipos de dados, variáveis, constantes, operadores (ver módulo m02).
- Laços `for`/`do-while` detalhados, laços aninhados, `break`/`continue` (ver módulo m03).
- Estruturas de seleção multi-via (`switch`/`case`), operadores lógicos compostos (ver módulo m03).
- Testes de software, IDEs, controle de versão, Hello World (capítulos *Software Testing*, *IDE*, *Version Control*, *Hello World* da fonte).
- Ciclo de vida de desenvolvimento de sistemas (SDLC) — apenas contexto no capítulo *Systems Development Life Cycle*.
- Qualidade de programa (confiabilidade, robustez, etc.) — capítulo *Program Quality*.

---

## 6. Unidades Teóricas Planejadas (1 por capítulo da fonte, 300–700 palavras cada)

| Unidade (ID) | Capítulo/Fonte | Objetivos cobertos | Lições vinculadas |
|--------------|----------------|---------------------|-------------------|
| `th-sem1-algorithms-m01-program-design` | Program Design | OBJ-1, OBJ-2 | l01 |
| `th-sem1-algorithms-m01-pseudocode` | Pseudocode | OBJ-3, OBJ-4 | l02 |
| `th-sem1-algorithms-m01-flowcharts` | Flowcharts | OBJ-5, OBJ-6 | l03 |
| `th-sem1-algorithms-m01-structured-programming` | Structured Programming | OBJ-7, OBJ-8 | l19 |

> **Regra:** Cada unidade terá `verification_status: verified_with_source` somente após capturar trecho literal (original_excerpt ≥ 15 palavras em inglês) e conferir contra a fonte aberta. Se a seção não abrir, ficará `pending` e não gerará exercícios.

---

## 7. Exercícios Existentes — **DESCARTADOS (Regra 5)**

> A unidade antiga (`th-sem1-algorithms-m01-intro`) e todos os exercícios atuais (`m01-l01.json`, `m01-l02.json`, `m01-l03.json`) **não contam como verificados** na pipeline v1. Serão **removidos e refeitos do zero** no template v1 (campos `objective_id`, `level`, `source_ref`, `answer_check` obrigatórios).  
> **Pendência atualizada:** "Remover unidade antiga e exercícios antigos; refazer tudo no template v1".

---

## 8. Regras Específicas para Este Módulo (aplicar em E4)

1. **Nenhum exercício usa Python ou outra linguagem de programação** — apenas pseudocódigo e fluxograma.
2. Em exercícios `code-completion`: o `code` será pseudocódigo (ex.: `media = ___`), `language: "pseudocode"`, `accepted_answers` cobrindo variações equivalentes (ex.: `["(idade1 + idade2) / 2", "(idade2 + idade1) / 2"]`).
3. `answer_check` de cada exercício deve declarar como a resposta foi conferida contra o texto da fonte (ex.: `Conferido contra capítulo Pseudocode, seção Discussion, exemplo das duas idades`).
4. Lição 4 (`l19`): "if/else" e "while" aparecem **apenas como nomes dos conceitos** de seleção e iteração, sem sintaxe de linguagem.
5. Rampa de dificuldade por lição (respeitando E4 do CONTENT_PIPELINE):
   - l01: 3 fáceis, 3 médios (sem difícil)
   - l02, l03, l19: 2 fáceis, 3 médios, 1 difícil
6. Variedade: máx. 2 exercícios seguidos do mesmo tipo; reconhecimento antes de produção.
7. Desafio do módulo: 8 questões (2 fáceis, 4 médias, 2 difíceis) cobrindo OBJ-1 a OBJ-8.
8. Flashcards do módulo: 8 a 12 cards, termos e definições da fonte.

---

## 9. Execução E1–E7 — concluída

- [x] **E1** Criar `docs/modules/sem1-algorithms-m01/SOURCES.md` com URL, edição, data de acesso, licença confirmada e trechos literais de cada seção.
- [x] **E2** Criar 4 unidades teóricas em `data/theory/sem1/algorithms/` (uma por capítulo), 300–700 palavras, estrutura fixa, ≤3 termos novos, `original_excerpt` literal, "ver original".
- [x] **E3** Criar `docs/modules/sem1-algorithms-m01/REVIEW.md` com tabela afirmação | seção | trecho de apoio | ok/sem suporte. Remover/rotular o sem suporte.
- [x] **E4** Gerar exercícios:
    - 4 arquivos de lição: `m01-l01.json`, `m01-l02.json`, `m01-l03.json`, `m01-l19.json` (arrays com 6 exercícios cada, campos v1)
    - `m01-challenge.json` (exatamente 8 questões, 2F/4M/2D)
    - `m01-flashcards.json` (8 a 12 flashcards)
- [x] **E5** Atualizar `data/glossary.json` com termos novos (definição da fonte), ordem de leitura, tempo estimado, "praticar este trecho".
- [x] **E6** Rodar portões (corrigir até passar):
    ```bash
    npm run check-module -- sem1-algorithms-m01
    npm run validate
    npm test
    npm run verify-sources
    ```
- [x] **E7** Atualizar `tasks.md` e `STATUS.md`, marcar `"pipeline_version": 1` no módulo em `data/curriculum.json`, **um commit do módulo**, mostrar hash, listar o que ficou `pending`.

**Resultado:** os quatro portões passaram; `"pipeline_version": 1` aplicado só ao m01; um commit único do módulo (hash no relatório final). Nenhuma pendência de conteúdo.

---

*Atualizado em 2026-10-19 após execução completa de E1–E7.*