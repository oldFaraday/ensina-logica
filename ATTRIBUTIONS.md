# Atribuições — Ensina Lógica

Este arquivo registra todas as fontes de conteúdo (teoria) e bibliotecas de terceiras usadas no projeto, conforme exigido pela Constitution §2, §8 e CONTENT_LICENSE.md.

---

## Tipografia

A interface usa **pilhas de fontes do sistema** (`--font-sans`, `--font-mono`, definidas em `src/ui/theme.css`), **sem download e sem CDN**, para preservar a regra do projeto de **zero requisições externas**. Nenhum binário de fonte de terceiro é distribuído neste repositório, portanto não há licença de fonte a registrar aqui.

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


## Novas unidades sem 1º semestre (módulos m04–m11)

As unidades abaixo derivam das fontes já listadas nesta seção (Programming Fundamentals e Discrete Mathematics: An Open Introduction), com os mesmos metadados de licença e confirmação.

### Programming Fundamentals — novas unidades derivadas
- Unidades: th-sem1-algorithms-m04-l201, th-sem1-algorithms-m04-l202, th-sem1-algorithms-m04-l203, th-sem1-algorithms-m04-l204, th-sem1-algorithms-m04-l205, th-sem1-algorithms-m04-l206, th-sem1-algorithms-m04-l207, th-sem1-algorithms-m04-l208, th-sem1-algorithms-m04-l209, th-sem1-algorithms-m04-l210, th-sem1-algorithms-m04-l211, th-sem1-algorithms-m04-l212, th-sem1-algorithms-m05-l213, th-sem1-algorithms-m05-l214, th-sem1-algorithms-m05-l215, th-sem1-algorithms-m05-l216, th-sem1-algorithms-m05-l217, th-sem1-algorithms-m05-l218, th-sem1-algorithms-m05-l219, th-sem1-algorithms-m05-l220, th-sem1-algorithms-m05-l221, th-sem1-algorithms-m05-l222, th-sem1-algorithms-m05-l223, th-sem1-algorithms-m05-l224, th-sem1-algorithms-m06-l225, th-sem1-algorithms-m06-l226, th-sem1-algorithms-m06-l227, th-sem1-algorithms-m06-l228, th-sem1-algorithms-m06-l229, th-sem1-algorithms-m06-l230, th-sem1-algorithms-m06-l231, th-sem1-algorithms-m06-l232, th-sem1-algorithms-m06-l233, th-sem1-algorithms-m06-l234, th-sem1-algorithms-m06-l235, th-sem1-algorithms-m06-l236, th-sem1-algorithms-m07-l237, th-sem1-algorithms-m07-l238, th-sem1-algorithms-m07-l239, th-sem1-algorithms-m07-l240, th-sem1-algorithms-m07-l241, th-sem1-algorithms-m07-l242, th-sem1-algorithms-m07-l243, th-sem1-algorithms-m07-l244, th-sem1-algorithms-m07-l245, th-sem1-algorithms-m07-l246, th-sem1-algorithms-m07-l247, th-sem1-algorithms-m07-l248, th-sem1-algorithms-m08-l249, th-sem1-algorithms-m08-l250, th-sem1-algorithms-m08-l251, th-sem1-algorithms-m08-l252, th-sem1-algorithms-m08-l253, th-sem1-algorithms-m08-l254, th-sem1-algorithms-m08-l255, th-sem1-algorithms-m08-l256, th-sem1-algorithms-m08-l257, th-sem1-algorithms-m08-l258, th-sem1-algorithms-m08-l259, th-sem1-algorithms-m08-l260, th-sem1-algorithms-m09-l261, th-sem1-algorithms-m09-l262, th-sem1-algorithms-m09-l263, th-sem1-algorithms-m09-l264, th-sem1-algorithms-m09-l265, th-sem1-algorithms-m09-l266, th-sem1-algorithms-m09-l267, th-sem1-algorithms-m09-l268, th-sem1-algorithms-m09-l269, th-sem1-algorithms-m09-l270, th-sem1-algorithms-m09-l271, th-sem1-algorithms-m09-l272, th-sem1-algorithms-m10-l273, th-sem1-algorithms-m10-l274, th-sem1-algorithms-m10-l275, th-sem1-algorithms-m10-l276, th-sem1-algorithms-m10-l277, th-sem1-algorithms-m10-l278, th-sem1-algorithms-m10-l279, th-sem1-algorithms-m10-l280, th-sem1-algorithms-m10-l281, th-sem1-algorithms-m10-l282, th-sem1-algorithms-m10-l283, th-sem1-algorithms-m10-l284, th-sem1-algorithms-m11-l285, th-sem1-algorithms-m11-l286, th-sem1-algorithms-m11-l287, th-sem1-algorithms-m11-l288, th-sem1-algorithms-m11-l289, th-sem1-algorithms-m11-l290, th-sem1-algorithms-m11-l291, th-sem1-algorithms-m11-l292, th-sem1-algorithms-m11-l293, th-sem1-algorithms-m11-l294
- Licença: mesma da fonte listada acima (CC BY-SA 4.0)
- Derivação: resumida/traduzida com IA, conferida contra a fonte

### Discrete Mathematics: An Open Introduction — novas unidades derivadas
- Unidades: th-sem1-discrete-math-m04-l500, th-sem1-discrete-math-m04-l501, th-sem1-discrete-math-m04-l502, th-sem1-discrete-math-m04-l503, th-sem1-discrete-math-m04-l504, th-sem1-discrete-math-m04-l505, th-sem1-discrete-math-m04-l506, th-sem1-discrete-math-m04-l507, th-sem1-discrete-math-m04-l508, th-sem1-discrete-math-m04-l509, th-sem1-discrete-math-m04-l510, th-sem1-discrete-math-m04-l511, th-sem1-discrete-math-m05-l512, th-sem1-discrete-math-m05-l513, th-sem1-discrete-math-m05-l514, th-sem1-discrete-math-m05-l515, th-sem1-discrete-math-m05-l516, th-sem1-discrete-math-m05-l517, th-sem1-discrete-math-m05-l518, th-sem1-discrete-math-m05-l519, th-sem1-discrete-math-m05-l520, th-sem1-discrete-math-m05-l521, th-sem1-discrete-math-m05-l522, th-sem1-discrete-math-m05-l523, th-sem1-discrete-math-m06-l524, th-sem1-discrete-math-m06-l525, th-sem1-discrete-math-m06-l526, th-sem1-discrete-math-m06-l527, th-sem1-discrete-math-m06-l528, th-sem1-discrete-math-m06-l529, th-sem1-discrete-math-m06-l530, th-sem1-discrete-math-m06-l531, th-sem1-discrete-math-m06-l532, th-sem1-discrete-math-m06-l533, th-sem1-discrete-math-m06-l534, th-sem1-discrete-math-m06-l535, th-sem1-discrete-math-m07-l536, th-sem1-discrete-math-m07-l537, th-sem1-discrete-math-m07-l538, th-sem1-discrete-math-m07-l539, th-sem1-discrete-math-m07-l540, th-sem1-discrete-math-m07-l541, th-sem1-discrete-math-m07-l542, th-sem1-discrete-math-m07-l543, th-sem1-discrete-math-m07-l544, th-sem1-discrete-math-m07-l545, th-sem1-discrete-math-m07-l546, th-sem1-discrete-math-m07-l547, th-sem1-discrete-math-m08-l548, th-sem1-discrete-math-m08-l549, th-sem1-discrete-math-m08-l550, th-sem1-discrete-math-m08-l551, th-sem1-discrete-math-m08-l552, th-sem1-discrete-math-m08-l553, th-sem1-discrete-math-m08-l554, th-sem1-discrete-math-m08-l555, th-sem1-discrete-math-m08-l556, th-sem1-discrete-math-m08-l557, th-sem1-discrete-math-m08-l558, th-sem1-discrete-math-m08-l559, th-sem1-discrete-math-m09-l560, th-sem1-discrete-math-m09-l561, th-sem1-discrete-math-m09-l562, th-sem1-discrete-math-m09-l563, th-sem1-discrete-math-m09-l564, th-sem1-discrete-math-m09-l565, th-sem1-discrete-math-m09-l566, th-sem1-discrete-math-m09-l567, th-sem1-discrete-math-m09-l568, th-sem1-discrete-math-m09-l569, th-sem1-discrete-math-m09-l570, th-sem1-discrete-math-m09-l571, th-sem1-discrete-math-m10-l572, th-sem1-discrete-math-m10-l573, th-sem1-discrete-math-m10-l574, th-sem1-discrete-math-m10-l575, th-sem1-discrete-math-m10-l576, th-sem1-discrete-math-m10-l577, th-sem1-discrete-math-m10-l578, th-sem1-discrete-math-m10-l579, th-sem1-discrete-math-m10-l580, th-sem1-discrete-math-m10-l581, th-sem1-discrete-math-m10-l582, th-sem1-discrete-math-m10-l583, th-sem1-discrete-math-m11-l584, th-sem1-discrete-math-m11-l585, th-sem1-discrete-math-m11-l586, th-sem1-discrete-math-m11-l587, th-sem1-discrete-math-m11-l588, th-sem1-discrete-math-m11-l589, th-sem1-discrete-math-m11-l590, th-sem1-discrete-math-m11-l591, th-sem1-discrete-math-m11-l592, th-sem1-discrete-math-m11-l593
- Licença: mesma da fonte listada acima (CC BY-SA 4.0)
- Derivação: resumida/traduzida com IA, conferida contra a fonte

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

---

## Deploy

- **Data do deploy**: 2026-10-16
- **URL do GitHub Pages**: https://oldfaraday.github.io/ensina-logica/
- **Validado**: fallback `404.html` (URL profunda → rota hash) e redirect da raiz funcionando no ambiente publicado (T090); QA manual da jornada completa em navegador real concluído (T100).