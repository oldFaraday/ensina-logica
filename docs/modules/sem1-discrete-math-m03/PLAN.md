# Plano do Módulo: sem1-discrete-math-m03 — Provas e Indução

**Disciplina:** Matemática Discreta / Lógica (sem1/discrete-math)  
**Módulo:** m03  
**Título:** Provas e Indução  
**Versão da pipeline:** 1  
**Status:** Em execução (E0–E7) — módulo não piloto, sem pausa de aprovação  
**Fonte aprovada:** Oscar Levin, *Discrete Mathematics: An Open Introduction*, 3ª edição (2019), Seções 3.2 (Proofs) e 2.5 (Induction).

---

## 1. Objetivos de Aprendizagem (OBJ-1 a OBJ-5)

| ID | Objetivo (verbo mensurável) | Nível cognitivo alvo |
|----|------------------------------|----------------------|
| OBJ-1 | **Distinguir** prova direta, prova por contrapositiva e prova por contradição, identificando o que se assume e o que se conclui em cada método | Reconhecer / Analisar |
| OBJ-2 | **Aplicar** contraexemplo e prova por casos e **explicar** por que um exemplo isolado não prova uma afirmação universal | Reconhecer / Aplicar |
| OBJ-3 | **Construir** uma prova por indução matemática, declarando a afirmação $P(n)$, o caso base e o passo indutivo com a hipótese indutiva | Reconhecer / Aplicar |
| OBJ-4 | **Aplicar** indução a somas, divisibilidade e desigualdades, escolhendo e verificando o caso base adequado | Aplicar / Analisar |
| OBJ-5 | **Analisar** provas indutivas incorretas e **aplicar** indução forte em problemas que se reduzem a casos menores, relacionando-a à recursão | Analisar / Transferir |

---

## 2. Pré-requisitos

- Lógica proposicional: proposições, conectivos, implicação, contrapositiva, negação e valor de verdade (módulo `sem1-discrete-math-m01`).
- Lógica de predicados: quantificadores, domínio de discurso e negação de quantificadores (módulo `sem1-discrete-math-m02`).
- Aritmética elementar: paridade, divisibilidade, números primos e operações com expressões algébricas.
- Leitura de igualdades e desigualdades com números naturais e inteiros.
- Nenhuma linguagem de programação é usada no módulo.

---

## 3. Mapa: Objetivo → Seção da Fonte (com verificação de acesso)

| Objetivo | Fonte | Edição | Capítulo / Seção | URL da seção | Licença confirmada |
|----------|-------|--------|------------------|--------------|-------------------|
| OBJ-1 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 3. Symbolic Logic and Proofs › **3.2 Proofs** › *Direct Proof*, *Proof by Contrapositive*, *Proof by Contradiction* | https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html | CC BY-SA 4.0 ✅ (página do livro: https://discrete.openmathbooks.org/dmoi3.html → seção "License") |
| OBJ-2 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 3.2 Proofs › *Proof by (counter) Example*, *Proof by Cases* | https://discrete.openmathbooks.org/dmoi3/sec_logic-proofs.html | CC BY-SA 4.0 ✅ |
| OBJ-3 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 2. Sequences › **2.5 Induction** › *Stamps*, *Formalizing Proofs* | https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html | CC BY-SA 4.0 ✅ |
| OBJ-4 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 2.5 Induction › *Examples* (Exemplos 2.5.1–2.5.3 e aviso sobre provas incorretas) | https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html | CC BY-SA 4.0 ✅ |
| OBJ-5 | *Discrete Mathematics: An Open Introduction* (Oscar Levin) | 3ª ed. (2019) — **dmoi3** | 2.5 Induction › *Strong Induction* (barra de chocolate e fatoração em primos); relação com recursão em *Stamps* | https://discrete.openmathbooks.org/dmoi3/sec_seq-induction.html | CC BY-SA 4.0 ✅ |

> **Verificação de acesso (2026-10-19):** as duas URLs de seção e a página do livro foram abertas nesta sessão. As seções contêm os títulos, as definições e os exemplos citados. **Nenhuma seção ficou `pending`.**
>
> **Licença:** a página https://discrete.openmathbooks.org/dmoi3.html declara: *"Discrete Mathematics: An Open Introduction by Oscar Levin is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License."* Usar **somente a 3ª edição** (`dmoi3`); a 4ª edição é CC BY-NC-SA 4.0 e **não pode** ser derivada.
>
> **URL da licença:** https://creativecommons.org/licenses/by-sa/4.0/

---

## 4. Lições (3 lições)

| Lição | ID | Título | Objetivos cobertos | Resumo do conteúdo |
|-------|-----|--------|---------------------|---------------------|
| 1 | `l16` | Métodos de prova | OBJ-1, OBJ-2 | Prova direta de implicações; prova por contrapositiva; prova por contradição (infinitos primos); por que um exemplo não prova uma afirmação universal; contraexemplo; prova por casos. |
| 2 | `l17` | Indução matemática | OBJ-3, OBJ-4 | Estrutura formal da indução; caso base e passo indutivo com hipótese indutiva; exemplo dos selos de 5 e 8 centavos; somas, divisibilidade e desigualdades; aviso sobre provas indutivas incorretas. |
| 3 | `l18` | Indução forte e recursão | OBJ-5 (integra OBJ-1 a OBJ-4) | Quando a hipótese $P(k)$ não basta; estrutura da indução forte; barra de chocolate com $n-1$ quebras; fatoração em primos; relação entre indução, definição recursiva e caso base. |

> **IDs das lições:** `l16`, `l17` e `l18` já pertencem a este módulo no currículo. Não é necessário criar novas lições.

---

## 5. Fora de Escopo (não abordar neste módulo)

- Lógica proposicional, tabelas-verdade, equivalências e deduções como conteúdo novo — módulo `m01`.
- Predicados, quantificadores e tradução de sentenças quantificadas como conteúdo novo — módulo `m02`.
- Prova combinatória, princípio da casa dos pombos como método autônomo e contagem — fora das seções usadas.
- Indução transfinita, boa ordenação como axioma formal, indução estrutural e teoria de conjuntos.
- Sequências recursivas, recorrências lineares e técnica da raiz característica (Seção 2.4) — apenas a menção à recursão feita na Seção 2.5.
- Cálculo diferencial, limite, derivada e o "princípio da pista de corrida" além da analogia citada pela fonte.
- Sintaxe de linguagens de programação, código executável e complexidade de algoritmos.

---

## 6. Unidades Teóricas Planejadas (300–900 palavras cada)

| Unidade (ID) | Seção da fonte | Objetivos cobertos | Lições vinculadas |
|--------------|----------------|---------------------|-------------------|
| `th-sem1-discrete-math-m03-direct-contrapositive-contradiction` | 3.2 Proofs › *Direct Proof*, *Proof by Contrapositive*, *Proof by Contradiction* | OBJ-1 | `l16` |
| `th-sem1-discrete-math-m03-counterexample-cases` | 3.2 Proofs › *Proof by (counter) Example*, *Proof by Cases* | OBJ-2 | `l16` |
| `th-sem1-discrete-math-m03-induction-principle` | 2.5 Induction › *Stamps*, *Formalizing Proofs*, *Examples* | OBJ-3, OBJ-4 | `l17` |
| `th-sem1-discrete-math-m03-strong-induction-recursion` | 2.5 Induction › *Strong Induction* (e menção à recursão em *Stamps*) | OBJ-5 | `l18` |

> **Regra:** cada unidade terá `verification_status: verified_with_source` somente após capturar trecho literal (`original_excerpt` ≥ 15 palavras em inglês) e conferir contra a fonte aberta. Se a seção não abrir, fica `pending` e não gera exercícios.

---

## 7. Estrutura de Exercícios e Avaliação (aplicar em E4)

1. **Nenhum exercício usa linguagem de programação** — apenas notação lógica, texto e aritmética.
2. Rampa de dificuldade por lição:
   - `l16` (lição 1): 3 fáceis, 3 médios, **sem difícil**;
   - `l17` e `l18`: 2 fáceis, 3 médios, 1 difícil.
3. Variedade: no máximo 2 exercícios seguidos do mesmo tipo; reconhecimento antes de produção.
4. Cada objetivo tem pelo menos 2 exercícios em níveis cognitivos diferentes (considerando lições + desafio + flashcards).
5. Desafio do módulo: 8 questões (2 fáceis, 4 médias, 2 difíceis) cobrindo OBJ-1 a OBJ-5.
6. Flashcards do módulo: 10 cards, com termos e definições da fonte.
7. Toda explicação cita a seção/capítulo da fonte (ex.: "Seção 3.2", "Seção 2.5") para satisfazer o validador.
8. Nenhuma conclusão é apresentada sem definição, exemplo ou regra já ensinada na unidade correspondente.

---

## 8. Execução E1–E7

- [x] **E1** Criar `docs/modules/sem1-discrete-math-m03/SOURCES.md` com URL, edição, data de acesso, licença confirmada e trechos literais.
- [x] **E2** Criar 4 unidades teóricas em `data/theory/sem1/discrete-math/`, 300–900 palavras, estrutura fixa, ≤3 termos novos, `original_excerpt` literal.
- [x] **E3** Criar `docs/modules/sem1-discrete-math-m03/REVIEW.md` com tabela afirmação | seção | trecho de apoio | ok/sem suporte.
- [x] **E4** Gerar exercícios: 3 arquivos de lição (6 cada), `m03-challenge.json` (8), `m03-flashcards.json` (10).
- [x] **E5** Atualizar `data/glossary.json`, criar `LIBRARY.md` com ordem de leitura e tempos.
- [x] **E6** Rodar os quatro portões e corrigir até passar.
- [x] **E7** Atualizar `.specify/tasks.md`/`STATUS.md`, marcar `"pipeline_version": 1` **somente neste módulo**, um commit do módulo.

---

*Criado em 2026-10-19.*
