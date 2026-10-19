# Plano do Módulo: sem1-discrete-math-m02 — Lógica de Predicados

**Disciplina:** Matemática Discreta / Lógica (sem1/discrete-math)  
**Módulo:** m02  
**Título:** Lógica de Predicados  
**Versão da pipeline:** 1  
**Status:** Em execução (E0–E7) — módulo não piloto, sem pausa de aprovação  
**Fonte aprovada:** Oscar Levin, *Discrete Mathematics: An Open Introduction*, 3ª edição (2019), seções 0.2 e 3.1.

---

## 1. Objetivos de Aprendizagem (OBJ-1 a OBJ-5)

| ID | Objetivo (verbo mensurável) | Nível cognitivo alvo |
|----|------------------------------|----------------------|
| OBJ-1 | **Distinguir** proposições de predicados com variável livre e **aplicar** a substituição de um valor na variável para obter uma proposição | Reconhecer / Aplicar |
| OBJ-2 | **Identificar** os quantificadores universal ($\forall$) e existencial ($\exists$) e **avaliar** o valor de verdade de uma afirmação quantificada em um domínio de discurso, usando testemunha ou contraexemplo | Reconhecer / Aplicar / Analisar |
| OBJ-3 | **Aplicar** as regras de negação de quantificadores, passando a negação pelo quantificador e trocando seu tipo | Aplicar / Analisar |
| OBJ-4 | **Reconhecer** a convenção de quantificação implícita e **analisar** o efeito da ordem dos quantificadores em afirmações aninhadas | Reconhecer / Analisar |
| OBJ-5 | **Traduzir** sentenças matemáticas para a lógica de predicados e **analisar** a validade de uma dedução entre afirmações quantificadas, reconhecendo os limites do método de tabelas-verdade | Aplicar / Analisar / Transferir |

---

## 2. Pré-requisitos

- Lógica proposicional: proposições, conectivos ($\land$, $\lor$, $\rightarrow$, $\leftrightarrow$, $\neg$), valor de verdade e implicação (módulo `sem1-discrete-math-m01`).
- Leitura de sentenças matemáticas simples com igualdade e desigualdade.
- Noções elementares de conjuntos numéricos, em especial os números naturais $0, 1, 2, \dots$ usados como domínio de discurso padrão na fonte.
- Nenhuma linguagem de programação é usada no módulo.

---

## 3. Mapa: Objetivo → Seção da Fonte (com verificação de acesso)

| Objetivo | Fonte | Edição | Capítulo / Seção | URL da seção | Licença confirmada |
|----------|-------|--------|------------------|--------------|-------------------|
| OBJ-1 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 0. Introduction and Preliminaries › **0.2 Mathematical Statements** › *Predicates and Quantifiers* | https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html | CC BY-SA 4.0 ✅ (página do livro: https://discrete.openmathbooks.org/dmoi3.html → seção "License") |
| OBJ-2 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 0.2 Mathematical Statements › *Predicates and Quantifiers* | https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html | CC BY-SA 4.0 ✅ |
| OBJ-3 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 0.2 Mathematical Statements › *Predicates and Quantifiers* (negação de quantificadores); 3.1 Propositional Logic › *Beyond Propositions* (Exemplo 3.1.8) | https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html e https://discrete.openmathbooks.org/dmoi3/sec_propositional.html | CC BY-SA 4.0 ✅ |
| OBJ-4 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 0.2 Mathematical Statements › *Implicit Quantifiers*; 3.1 Propositional Logic › *Beyond Propositions* (Exemplo 3.1.9) | https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html e https://discrete.openmathbooks.org/dmoi3/sec_propositional.html | CC BY-SA 4.0 ✅ |
| OBJ-5 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 3.1 Propositional Logic › *Beyond Propositions*; 0.2 Mathematical Statements (tradução com quantificadores e contraexemplo) | https://discrete.openmathbooks.org/dmoi3/sec_propositional.html e https://discrete.openmathbooks.org/dmoi3/sec_intro-statements.html | CC BY-SA 4.0 ✅ |

> **Verificação de acesso (2026-10-19):** as duas URLs de seção foram abertas nesta sessão e contêm os títulos, as definições e os exemplos citados. **Nenhuma seção ficou `pending`.**
>
> **Licença:** a página https://discrete.openmathbooks.org/dmoi3.html declara: *"Discrete Mathematics: An Open Introduction by Oscar Levin is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License."* Usar **somente a 3ª edição** (`dmoi3`); a 4ª edição é CC BY-NC-SA 4.0 e **não pode** ser derivada.

---

## 4. Lições (4 lições)

| Lição | ID | Título | Objetivos cobertos | Resumo do conteúdo |
|-------|-----|--------|---------------------|---------------------|
| 1 | `l14` | Predicados e variáveis | OBJ-1 | Por que uma sentença com variável livre não é proposição; o que é um predicado; como substituir um valor ou quantificar para obter uma proposição; por que a lógica de predicados estende a proposicional. |
| 2 | `l15` | Quantificadores e domínio | OBJ-2 | Quantificador universal e existencial; domínio de discurso; avaliação de verdade com todos os elementos, testemunha e contraexemplo; o exemplo $\forall x\exists y(y<x)$ sobre os naturais. |
| 3 | `l21` | Negação e quantificação implícita | OBJ-3, OBJ-4 | Negação de $\forall$ e $\exists$; passagem da negação pelo quantificador; negação de "não existe menor número"; convenção de quantificação universal implícita para predicados com variável livre. |
| 4 | `l22` | Ordem, tradução e dedução | OBJ-4, OBJ-5 | Ordem dos quantificadores e a dedução válida de $\exists y\forall xP(x,y)$ para $\forall x\exists yP(x,y)$; tradução de sentenças matemáticas; ausência de tabela-verdade análoga na lógica de predicados; integração dos conceitos anteriores. |

> **IDs das lições:** `l14` e `l15` já pertencem a este módulo no currículo; as novas lições usam `l21` e `l22`, pois `l16`–`l20` já pertencem a outros módulos do semestre. A ordem didática do módulo continua 1ª–4ª.

---

## 5. Fora de Escopo (não abordar neste módulo)

- Lógica proposicional, tabelas-verdade e equivalências proposicionais como conteúdo novo — módulo `m01`.
- Métodos de prova formais, indução matemática e recursão — módulo `m03`.
- Sintaxe formal de predicados de primeira ordem, regras de formação, semântica de estruturas e teoria de modelos.
- Sistemas completos de dedução natural, quantificador de unicidade ($\exists!$), quantificadores generalizados ("muitos", "poucos") e lógica de ordem superior.
- Algoritmos de decisão, unificação, resolução e verificação automatizada de fórmulas.
- Teoria de conjuntos, funções e cardinalidade (seções 0.3 e 0.4 da fonte).
- Sintaxe de linguagens de programação e operadores lógicos de código.

---

## 6. Unidades Teóricas Planejadas (300–900 palavras cada)

| Unidade (ID) | Seção da fonte | Objetivos cobertos | Lições vinculadas |
|--------------|----------------|---------------------|-------------------|
| `th-sem1-discrete-math-m02-predicates-variables` | 0.2 Mathematical Statements › *Predicates and Quantifiers* | OBJ-1 | `l14` |
| `th-sem1-discrete-math-m02-quantifiers-domain` | 0.2 Mathematical Statements › *Predicates and Quantifiers* | OBJ-2 | `l15` |
| `th-sem1-discrete-math-m02-quantifier-negation` | 0.2 Mathematical Statements › *Predicates and Quantifiers*; 3.1 Propositional Logic › *Beyond Propositions* | OBJ-3, OBJ-4 | `l21` |
| `th-sem1-discrete-math-m02-order-deduction` | 3.1 Propositional Logic › *Beyond Propositions*; 0.2 Mathematical Statements | OBJ-4, OBJ-5 | `l22` |

> **Regra:** cada unidade terá `verification_status: verified_with_source` somente após capturar trecho literal (`original_excerpt` ≥ 15 palavras em inglês) e conferir contra a fonte aberta. Se a seção não abrir, fica `pending` e não gera exercícios.

---

## 7. Estrutura de Exercícios e Avaliação (aplicar em E4)

1. **Nenhum exercício usa linguagem de programação** — apenas notação lógica, texto e tabelas simples.
2. Rampa de dificuldade por lição:
   - `l14` (lição 1): 3 fáceis, 3 médios, **sem difícil**;
   - `l15`, `l21` e `l22`: 2 fáceis, 3 médios, 1 difícil.
3. Variedade: no máximo 2 exercícios seguidos do mesmo tipo; reconhecimento antes de produção.
4. Cada objetivo tem pelo menos 2 exercícios em níveis cognitivos diferentes (considerando lições + desafio + flashcards).
5. Desafio do módulo: 8 questões (2 fáceis, 4 médias, 2 difíceis) cobrindo OBJ-1 a OBJ-5.
6. Flashcards do módulo: 10 cards, com termos e definições da fonte.
7. Toda explicação cita a seção/capítulo da fonte (ex.: "Seção 0.2", "Seção 3.1") para satisfazer o validador.
8. Nenhuma conclusão é apresentada sem definição, exemplo ou regra já ensinada na unidade correspondente.

---

## 8. Execução E1–E7

- [ ] **E1** Criar `docs/modules/sem1-discrete-math-m02/SOURCES.md` com URL, edição, data de acesso, licença confirmada e trechos literais.
- [ ] **E2** Criar 4 unidades teóricas em `data/theory/sem1/discrete-math/`, 300–900 palavras, estrutura fixa, ≤3 termos novos, `original_excerpt` literal.
- [ ] **E3** Criar `docs/modules/sem1-discrete-math-m02/REVIEW.md` com tabela afirmação | seção | trecho de apoio | ok/sem suporte.
- [ ] **E4** Gerar exercícios: 4 arquivos de lição (6 cada), `m02-challenge.json` (8), `m02-flashcards.json` (10).
- [ ] **E5** Atualizar `data/glossary.json`, criar `LIBRARY.md` com ordem de leitura e tempos.
- [ ] **E6** Rodar os quatro portões e corrigir até passar.
- [ ] **E7** Atualizar `tasks.md`/`STATUS.md`, marcar `"pipeline_version": 1` **somente neste módulo**, um commit do módulo.

---

*Criado em 2026-10-19.*
