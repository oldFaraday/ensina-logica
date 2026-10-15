# Atribuições — Ensina Lógica

Este arquivo registra todas as fontes de conteúdo (teoria) e bibliotecas de terceiras usadas no projeto, conforme exigido pela Constitution §2, §8 e CONTENT_LICENSE.md.

---

## Fontes de Conteúdo (Teoria)

### 1. Mathematics for Computer Science
- **Autores**: Eric Lehman, F. Thomson Leighton, Albert R. Meyer
- **Edição**: Spring 2018 (MIT 6.042) — **somente esta edição**
- **URL**: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
- **Licença**: CC BY-SA 3.0
- **URL da licença**: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf (front matter do PDF)
- **Data de conferência**: 2026-10-15
- **Cobertura**: Matemática Discreta — lógica, provas, indução, grafos, probabilidade, teoria dos números
- **Restrições**: Usar só esta edição; OCW 2015 e LibreTexts são NC
- **Unidades derivadas**: `th-sem1-discrete-math-m01-logic`, `th-sem1-discrete-math-m02-predicate-logic`, `th-sem1-discrete-math-m03-proofs-induction`

### 2. Discrete Mathematics: An Open Introduction
- **Autor**: Oscar Levin
- **Edição**: 3ª edição (2019) — **não usar 4ª edição (NC)**
- **URL**: https://discrete.openmathbooks.org/
- **Licença**: CC BY-SA 4.0
- **URL da licença**: https://discrete.openmathbooks.org/ (rodapé "License")
- **Data de conferência**: 2026-10-15
- **Cobertura**: Matemática Discreta — lógica, conjuntos, funções, contagem, grafos, provas
- **Restrições**: 3ª ed. apenas
- **Unidades derivadas**: `th-sem1-discrete-math-m01-logic` (complementar), `th-sem1-discrete-math-m02-predicate-logic` (complementar)

### 3. Programming Fundamentals: A Modular Structured Approach
- **Autores**: Kenneth Leroy Busbee, Dave Braunschweig
- **Edição**: 2ª edição (2018), Rebus/Pressbooks
- **URL**: https://press.rebus.community/programmingfundamentals/
- **Licença**: CC BY-SA 4.0
- **URL da licença**: https://press.rebus.community/programmingfundamentals/front-matter/preface/ (seção "The Creative Commons (CC) Attribution-ShareAlike license applies...")
- **Data de conferência**: 2026-10-15
- **Cobertura**: Algoritmos e Lógica — variáveis, controle, funções, pseudocode, flowcharts, exemplos em Python/JS/Java/C++
- **Restrições**: Conferir licença por capítulo/imagem — a licença vale "exceto onde indicado"
- **Unidades derivadas**: `th-sem1-algorithms-m01-intro`, `th-sem1-algorithms-m02-variables`, `th-sem1-algorithms-m03-control-flow`

### 4. An Open Guide to Data Structures and Algorithms
- **Autores**: Paul Bible, Robert Moser
- **Edição**: 1ª edição (2023), PALNI Press
- **URL**: https://pressbooks.palni.org/anopenguidetodatastructuresandalgorithms/
- **Licença**: CC BY 4.0
- **URL da licença**: https://pressbooks.palni.org/anopenguidetodatastructuresandalgorithms/ (rodapé "License")
- **Data de conferência**: 2026-10-15
- **Cobertura**: Algoritmos — **somente capítulo de Big-O e complexidade** no MVP
- **Restrições**: MVP: só capítulo Big-O/complexidade; demais → 2º sem
- **Unidades derivadas**: `th-sem1-algorithms-m01-intro` (seção Big-O)

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
- `original_excerpt` (quando licença permite)

O script `scripts/validate.mjs` sincroniza este arquivo com os metadados das unidades.