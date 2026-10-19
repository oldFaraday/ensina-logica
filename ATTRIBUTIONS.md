# Atribuições — Ensina Lógica

Este arquivo registra todas as fontes de conteúdo (teoria) e bibliotecas de terceiros usadas no projeto, conforme exigido pela Constitution §2, §8 e CONTENT_LICENSE.md.

> **Sincronizado com o conteúdo real.** Hoje o projeto tem **6 unidades teóricas verificadas** (1º semestre, módulos `m01`–`m03` de cada disciplina). As fontes aprovadas que ainda não possuem unidades derivadas aparecem na seção "Fontes aprovadas (ainda sem unidades derivadas)". Este arquivo é verificado por `scripts/validate.mjs` (T111).

---

## Tipografia

A interface usa **pilhas de fontes do sistema** (`--font-sans`, `--font-mono`, definidas em `src/ui/theme.css`), **sem download e sem CDN**, para preservar a regra do projeto de **zero requisições externas**. Nenhum binário de fonte de terceiro é distribuído neste repositório, portanto não há licença de fonte a registrar aqui.

---

## Unidades publicadas (bloco gerado)

> Bloco gerado automaticamente a partir de `data/theory/` por `scripts/validate.mjs`.
> **Não editar à mão.** Rode `node scripts/validate.mjs --update-attributions` para regenerar.
> O CI falha se este bloco divergir das unidades reais.

<!-- BEGIN GENERATED: theory-units -->
| Unidade | Fonte | Capítulo › Seção |
| --- | --- | --- |
| `th-sem1-algorithms-m01-flowcharts` | Programming Fundamentals | I. Introduction to Programming › Flowcharts |
| `th-sem1-algorithms-m01-program-design` | Programming Fundamentals | I. Introduction to Programming › Program Design |
| `th-sem1-algorithms-m01-pseudocode` | Programming Fundamentals | I. Introduction to Programming › Pseudocode |
| `th-sem1-algorithms-m01-structured-programming` | Programming Fundamentals | IV. Conditions › Structured Programming |
| `th-sem1-algorithms-m02-constants-variables` | Programming Fundamentals | II. Data and Operators › Constants and Variables |
| `th-sem1-algorithms-m02-data-types` | Programming Fundamentals | II. Data and Operators › Data Types |
| `th-sem1-algorithms-m02-expressions-operators` | Programming Fundamentals | II. Data and Operators › Order of Operations |
| `th-sem1-algorithms-m02-identifier-names` | Programming Fundamentals | II. Data and Operators › Identifier Names |
| `th-sem1-algorithms-m02-integer-division-modulus` | Programming Fundamentals | II. Data and Operators › Integer Division and Modulus |
| `th-sem1-algorithms-m03-control-flow` | Programming Fundamentals | IV. Conditions › Structured Programming |
| `th-sem1-discrete-math-m01-logic` | Discrete Mathematics: An Open Introduction | 3. Symbolic Logic and Proofs › 3.1 Propositional Logic |
| `th-sem1-discrete-math-m02-predicate-logic` | Discrete Mathematics: An Open Introduction | 0. Introduction and Preliminaries › 0.2 Mathematical Statements |
| `th-sem1-discrete-math-m03-proofs-induction` | Discrete Mathematics: An Open Introduction | 2. Sequences › 2.5 Induction |
<!-- END GENERATED: theory-units -->

---

## Fontes de Conteúdo (Teoria) — com unidades publicadas

### 1. Programming Fundamentals

- **Autores**: Kenneth Leroy Busbee, Dave Braunschweig
- **Edição**: 2ª edição (2018), Rebus Community / Pressbooks — **somente esta edição**
- **URL do livro**: https://press.rebus.community/programmingfundamentals/
- **Licença**: CC BY-SA 4.0
- **URL da licença**: https://creativecommons.org/licenses/by-sa/4.0/
- **Data de conferência**: 2026-10-17
- **Cobertura**: Algoritmos e Lógica — design de programa, tipos de dados e controle de fluxo
- **Restrições**: Conferir licença por capítulo/imagem — a licença vale "exceto onde indicado"
- **Unidades derivadas**: ver o "bloco gerado" no topo deste arquivo

### 2. Discrete Mathematics: An Open Introduction

- **Autor**: Oscar Levin
- **Edição**: 3ª edição (2019) — **usar apenas a 3ª edição** (`dmoi3`). A 4ª edição é **CC BY-NC-SA 4.0 (não comercial)** e **não pode** ser derivada.
- **URL da edição**: https://discrete.openmathbooks.org/dmoi3.html
- **Licença**: CC BY-SA 4.0
- **URL da licença**: https://creativecommons.org/licenses/by-sa/4.0/
- **Data de conferência**: 2026-10-17
- **Cobertura**: Matemática Discreta — lógica proposicional, predicados e indução
- **Restrições**: 3ª edição apenas (URLs `.../dmoi3/...`)
- **Unidades derivadas**: ver o "bloco gerado" no topo deste arquivo

---

## Fontes aprovadas (ainda sem unidades derivadas)

Estas fontes estão aprovadas para derivação, mas **nenhuma unidade do repositório deriva delas hoje**. Serão usadas em módulos futuros.

### 3. Mathematics for Computer Science

- **Autores**: Eric Lehman, F. Thomson Leighton, Albert R. Meyer
- **Edição**: Spring 2018 (MIT 6.042) — **somente esta edição**
- **URL**: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
- **Licença**: CC BY-SA 3.0
- **URL da licença**: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf (front matter do PDF)
- **Data de conferência**: 2026-10-15
- **Cobertura planejada**: Matemática Discreta — lógica, provas, indução, grafos, probabilidade, teoria dos números
- **Restrições**: Usar só esta edição; OCW 2015 e LibreTexts são NC
- **Unidades derivadas**: nenhuma

### 4. An Open Guide to Data Structures and Algorithms

- **Autores**: Paul Bible, Robert Moser
- **Edição**: 1ª edição (2023), PALNI Press
- **URL**: https://pressbooks.palni.org/anopenguidetodatastructuresandalgorithms/
- **Licença**: CC BY 4.0
- **URL da licença**: https://creativecommons.org/licenses/by/4.0/
- **Data de conferência**: 2026-10-15
- **Cobertura planejada**: Algoritmos — capítulo de Big-O e complexidade (a partir do 2º semestre)
- **Restrições**: Derivar somente o capítulo de Big-O/complexidade
- **Unidades derivadas**: nenhuma

---

## Fontes Apenas para "Leitura Recomendada" (Não Derivadas)

| Fonte | Licença | Motivo | URL |
|-------|---------|--------|-----|
| OpenStax Introduction to Python Programming | CC BY-NC-SA 4.0 | NC (não comercial) | https://openstax.org/books/introduction-python-programming/pages/preface |
| How to Think Like a Computer Scientist (Runestone) | GNU FDL | Não CC BY-SA | https://runestone.academy/ |
| MIT 6.0001 (OCW) | CC BY-NC-SA 4.0 | NC (não comercial) | https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2020/ |
| CS50 (Harvard) | Licença custom | Não permissiva | https://cs50.harvard.edu/ |
| Book of Proof (Hammack) | CC BY-ND 4.0 | ND (sem derivações) | https://people.vcu.edu/~rhammack/BookOfProof/ |
| Computer Science 20 — Saskatchewan (Dan Schellenberg) | CC BY-SA 4.0 declarada | Nível introdutório (ensino médio), licença a confirmar na página do livro | https://github.com/dschellenberg/CS20-Course |

---

## Bibliotecas de Terceiros (Hospedadas Localmente)

### KaTeX

- **Versão**: 0.16.9
- **Licença**: MIT
- **Arquivos incluídos**: `katex.min.js`, `katex.min.css`, `fonts/*.woff2`
- **Pasta**: `lib/katex/`
- **URL oficial**: https://katex.org/
- **Repositório**: https://github.com/KaTeX/KaTeX

### highlight.js

- **Versão**: 11.9.0
- **Licença**: BSD-3-Clause
- **Arquivos incluídos**: `highlight.min.js`, `themes/github.min.css`, `themes/github-dark.min.css`
- **Pasta**: `lib/highlightjs/`
- **URL oficial**: https://highlightjs.org/
- **Repositório**: https://github.com/highlightjs/highlight.js

---

## Metadados de Atribuição por Unidade

Cada unidade teórica em `data/theory/` carrega no front-matter:
- `source.title`, `source.authors`, `source.url`, `source.chapter`, `source.section`, `source.access_date`
- `license` (SPDX)
- `derivation_type`
- `verification_status`
- `verified_at`, `verification_method` (obrigatórios quando `verification_status: verified_with_source`)
- `original_excerpt` (trecho literal da fonte; obrigatório quando `verified_with_source`)

O script `scripts/validate.mjs` **gera** o bloco de unidades deste arquivo e **falha** se ele divergir das unidades reais.

---

## Deploy

- **Data do deploy**: 2026-10-16
- **URL do GitHub Pages**: https://oldfaraday.github.io/ensina-logica/
- **Validado**: fallback `404.html` (URL profunda → rota hash) e redirect da raiz funcionando no ambiente publicado (T090); QA manual da jornada completa em navegador real concluído (T100).
