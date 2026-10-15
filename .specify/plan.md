# Plan — ensina-logica

## 1. Stack Tecnológico

| Camada | Escolha | Justificativa |
|--------|---------|---------------|
| **HTML/CSS/JS** | Vanilla ES Modules | Sem build, roda direto no GitHub Pages, zero dependências runtime |
| **Roteamento** | Hash-based (`#/`) + `History.pushState` fallback | Funciona em subcaminho Pages sem servidor |
| **Matemática** | **KaTeX 0.16.9** (local, `.js` + `.css` + fonts `.woff2`) | Rápido, leve, licença MIT, renderização client-side |
| **Code Highlight** | **highlight.js 11.9.0** (local, `.js` + tema `.css`) | Muitas linguagens, licença BSD-3, sem build |
| **Persistência** | `localStorage` + camada `ProgressStore` (abstração para IndexedDB futuro) | Simples, síncrono, migração via `schema_version` |
| **i18n** | `locales/pt-BR.json` (chave-valor plano) | Fácil de estender, carrega assíncrono |
| **Validação** | Script Node (`scripts/validate.mjs`) | Checa links, metadados obrigatórios, licenças permitidas, JSON schema |
| **Testes** | `scripts/test-core.mjs` (Node, sem framework) | Lógica pura: XP, streak, SRS, desbloqueio, progress store |
| **CI/CD** | GitHub Actions: `deploy-pages.yml` + `validate.yml` | Deploy automático + validação a cada push/PR |

### Bibliotecas de Terceiros (Hospedadas Localmente)

| Biblioteca | Versão | Licença | Arquivos Incluídos | Pasta Destino |
|------------|--------|---------|-------------------|---------------|
| KaTeX | 0.16.9 | MIT | `katex.min.js`, `katex.min.css`, `fonts/*.woff2` | `lib/katex/` |
| highlight.js | 11.9.0 | BSD-3-Clause | `highlight.min.js`, `themes/github-dark.min.css`, `themes/github.min.css` | `lib/highlightjs/` |

> **Nota:** Versões fixas acima. Antes de adicionar qualquer outra biblioteca, confirmar licença permissiva (MIT/BSD/Apache-2.0) e registrar em `ATTRIBUTIONS.md`.

---

## 2. Estrutura de Pastas (Repositório)

```
ensina-logica/
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml      # Deploy GitHub Pages
│       └── validate.yml          # Validação: links, metadados, licenças, JSON schema
├── .specify/
│   ├── constitution.md           # Princípios (já criado)
│   ├── spec.md                   # Especificação produto (já criado)
│   └── plan.md                   # ESTE ARQUIVO
├── lib/
│   ├── katex/                    # KaTeX 0.16.9 local
│   └── highlightjs/              # highlight.js 11.9.0 local
├── locales/
│   └── pt-BR.json                # Textos da interface (i18n)
├── data/
│   ├── curriculum.json           # Mapa completo: 8 semestres → disciplinas → módulos → lições
│   ├── theory/                   # Unidades teóricas (1 arquivo por unidade)
│   │   ├── sem1/
│   │   │   ├── algorithms/
│   │   │   │   ├── m01-intro.md
│   │   │   │   ├── m02-variables.md
│   │   │   │   └── ...
│   │   │   └── discrete-math/
│   │   │       ├── m01-logic.md
│   │   │       └── ...
│   │   └── _schema.json          # JSON Schema para validar unidades teóricas
│   └── exercises/                # Exercícios (1 arquivo por lição/conjunto)
│       ├── sem1/
│       │   ├── algorithms/
│       │   └── discrete-math/
│       └── _schema.json          # JSON Schema para validar exercícios
├── src/
│   ├── app.js                    # Entry point: roteamento, boot, store init
│   ├── router.js                 # Hash router simples
│   ├── store/
│   │   ├── ProgressStore.js      # Abstração localStorage/IndexedDB
│   │   └── schema-version.js     # Migrações de schema_version
│   ├── gamification/
│   │   ├── xp.js                 # Cálculo XP, níveis
│   │   ├── streak.js             # Streak + freeze semanal
│   │   ├── achievements.js       # Badges, critérios de desbloqueio
│   │   └── srs.js                # Revisão espaçada (intervalos 1/3/7/21)
│   ├── curriculum/
│   │   ├── loader.js             # Carrega curriculum.json + theory + exercises
│   │   ├── unlock.js             # Lógica de desbloqueio (linear disciplina, livre semestre)
│   │   └── progress.js           # Marca lição/módulo concluído, calcula % semestre
│   ├── theory/
│   │   ├── renderer.js           # Renderiza unidade teórica (KaTeX, highlight.js, atribuição, ver original)
│   │   ├── sidebar.js            # Índice lateral navegável
│   │   ├── annotations.js        # CRUD anotações por seção (localStorage)
│   │   └── search.js             # Busca full-text (indexado em memória)
│   ├── lesson/
│   │   ├── renderer.js           # Renderiza lição: resumo + exercícios
│   │   ├── exercise-types/       # Um arquivo por tipo
│   │   │   ├── multiple-choice.js
│   │   │   ├── true-false.js
│   │   │   ├── order-steps.js
│   │   │   ├── code-completion.js
│   │   │   └── flashcards.js
│   │   └── feedback.js           # Feedback ícone+texto+cor, explicação, retry
│   ├── ui/
│   │   ├── theme.js              # Claro/escuro + prefers-color-scheme
│   │   ├── toasts.js             # Notificações não-intrusivas
│   │   ├── modals.js             # Modais acessíveis (ARIA)
│   │   └── a11y.js               # Skip links, focus trap, live regions
│   └── i18n.js                   # Carrega locale, `t(key, params)`
├── scripts/
│   ├── validate.mjs              # Validação CI: links, metadados, licenças, schemas
│   ├── test-core.mjs             # Testes unitários lógica pura (XP, streak, SRS, unlock, store)
│   └── download-libs.mjs         # Baixa KaTeX/highlight.js versões fixas para lib/
├── index.html                    # Shell único: header, main, footer, scripts type=module
├── 404.html                      # Redirect para #/ (GitHub Pages SPA)
├── .nojekyll                     # Desliga Jekyll no Pages
├── favicon.svg
├── README.md
├── LICENSE                       # MIT
├── CONTENT_LICENSE.md            # CC BY-SA 4.0 + regra prevalência fonte
├── ATTRIBUTIONS.md               # Fontes conteúdo + libs terceiras
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── .gitignore
├── .editorconfig
└── package.json                  # Apenas para scripts Node (validate, test, download-libs)
```

---

## 3. Modelos de Dados (JSON Schemas)

### 3.1 `data/curriculum.json` — Mapa do Curso

```json
{
  "version": "1.0.0",
  "semesters": [
    {
      "id": "sem1",
      "number": 1,
      "title": "1º Semestre",
      "disciplines": [
        {
          "id": "algorithms",
          "title": "Algoritmos e Lógica de Programação",
          "modules": [
            { "id": "m01", "title": "Introdução a Algoritmos", "lessons": ["l01", "l02", "l03"] },
            { "id": "m02", "title": "Variáveis e Tipos", "lessons": ["l04", "l05", "l06"] },
            { "id": "m03", "title": "Controle de Fluxo", "lessons": ["l07", "l08", "l09", "l10"] }
          ]
        },
        {
          "id": "discrete-math",
          "title": "Matemática Discreta / Lógica",
          "modules": [
            { "id": "m01", "title": "Lógica Proposicional", "lessons": ["l01", "l02", "l03"] },
            { "id": "m02", "title": "Lógica de Predicados", "lessons": ["l04", "l05"] },
            { "id": "m03", "title": "Provas e Indução", "lessons": ["l06", "l07", "l08"] }
          ]
        }
      ]
    },
    { "id": "sem2", "number": 2, "title": "2º Semestre", "disciplines": [ ... ] },
    ...
    { "id": "sem8", "number": 8, "title": "8º Semestre", "disciplines": [ ... ] }
  ]
}
```

> Semestres 2–8 têm estrutura idêntica mas `modules[].lessons = []` e flag `"status": "coming-soon"` no semestre.

### 3.2 Unidade Teórica (`data/theory/sem1/algorithms/m01-intro.md`)

```markdown
---
id: "th-sem1-algorithms-m01-intro"
title: "O que é um Algoritmo"
discipline: "algorithms"
module: "m01"
source:
  title: "Mathematics for Computer Science"
  authors: ["Eric Lehman", "F. Thomson Leighton", "Albert R. Meyer"]
  url: "https://courses.csail.mit.edu/6.042/spring18/mcs.pdf"
  chapter: "Chapter 1: What is a Proof?"
  section: "1.1"
  access_date: "2026-10-15"
license: "CC-BY-SA-4.0"
derivation_type: "translated"
language: "pt-BR"
verification_status: "verified_with_source"
linked_lessons: ["l01", "l02"]
linked_exercises: ["ex-sem1-algorithms-m01-l01", "ex-sem1-algorithms-m01-l02"]
original_excerpt: |
  An algorithm is a finite sequence of well-defined instructions...
---
# O que é um Algoritmo

Um algoritmo é uma sequência finita de instruções bem-definidas...
```

**Campos obrigatórios:** todos acima. `verification_status` = `unverified` | `verified_with_source`. `derivation_type` = `original` | `translated` | `adapted` | `summarized`. `license` = identificador SPDX.

### 3.3 Exercício (`data/exercises/sem1/algorithms/m01-l01.json`)

```json
{
  "id": "ex-sem1-algorithms-m01-l01",
  "theory_unit_id": "th-sem1-algorithms-m01-intro",
  "lesson_id": "l01",
  "type": "multiple-choice",
  "generated_by_ai": true,
  "prompt": "Qual das seguintes melhor define um algoritmo?",
  "options": [
    "Um programa de computador escrito em Python",
    "Uma sequência finita de instruções bem-definidas para resolver um problema",
    "Qualquer código que compila sem erros",
    "Uma fórmula matemática complexa"
  ],
  "correct": 1,
  "explanation": "Definição padrão (Lehman et al., 2018, §1.1): algoritmo é uma sequência finita de instruções bem-definidas...",
  "difficulty": "easy",
  "xp_base": 10
}
```

**Tipos suportados:** `multiple-choice` | `true-false` | `order-steps` | `code-completion` | `flashcards`.

### 3.4 Progresso do Usuário (`localStorage` key: `ensina-logica-progress`)

```json
{
  "schema_version": 1,
  "updated_at": "2026-10-15T14:30:00Z",
  "preferences": {
    "daily_xp_goal": 20,
    "theme": "auto"
  },
  "stats": {
    "total_xp": 1250,
    "level": 2,
    "current_streak": 5,
    "freezes_remaining": 1,
    "last_activity_date": "2026-10-15"
  },
  "completed": {
    "lessons": ["l01", "l02", "l03"],
    "theory_sections": ["th-sem1-algorithms-m01-intro"]
  },
  "exercises": {
    "ex-sem1-algorithms-m01-l01": { "attempts": 1, "correct": true, "xp_earned": 15 },
    "ex-sem1-algorithms-m01-l02": { "attempts": 2, "correct": true, "xp_earned": 10 }
  },
  "srs_queue": [
    { "lesson_id": "l01", "due_date": "2026-10-16", "interval": 1 },
    { "lesson_id": "l02", "due_date": "2026-10-18", "interval": 3 }
  ],
  "achievements": ["first-lesson", "streak-3", "module-1-complete"],
  "annotations": {
    "th-sem1-algorithms-m01-intro": {
      "section-1": "Anotação pessoal sobre definição...",
      "section-2": ""
    }
  }
}
```

---

## 4. Algoritmos-Chave

### 4.1 XP e Níveis (`src/gamification/xp.js`)

```js
// Base XP por exercício
const BASE_XP = 10;
const FIRST_TIME_BONUS = 5;
const RETRY_PENALTY = 0.5; // 50% do XP base

// Nível = floor(sqrt(total_xp / 1000)) + 1  (aprox: 1000, 4000, 9000, 16000...)
function xpForLevel(level) { return (level - 1) ** 2 * 1000; }
function levelFromXP(xp) { return Math.floor(Math.sqrt(xp / 1000)) + 1; }

function calculateXP(exercise, isFirstAttempt, isRetry, streakBonus) {
  let xp = BASE_XP;
  if (isFirstAttempt) xp += FIRST_TIME_BONUS;
  if (isRetry) xp = Math.round(xp * RETRY_PENALTY);
  xp += streakBonus; // streakBonus = min(streak, 10) * 2
  return xp;
}
```

### 4.2 Streak com Freeze Semanal (`src/gamification/streak.js`)

```js
function updateStreak(progress, today = new Date()) {
  const last = progress.stats.last_activity_date ? new Date(progress.stats.last_activity_date) : null;
  const diffDays = last ? Math.floor((today - last) / (1000*60*60*24)) : 999;

  if (diffDays === 0) return; // já contou hoje
  if (diffDays === 1) {
    progress.stats.current_streak += 1;
  } else if (diffDays > 1) {
    // Verifica freeze
    if (progress.stats.freezes_remaining > 0 && diffDays <= 2) {
      progress.stats.freezes_remaining -= 1;
      // streak mantido
    } else {
      progress.stats.current_streak = 1;
    }
  }

  // Recarrega freeze toda segunda-feira (dia 1)
  const lastFreezeReset = progress.stats.last_freeze_reset ? new Date(progress.stats.last_freeze_reset) : null;
  const mondayThisWeek = getMondayOfWeek(today);
  if (!lastFreezeReset || lastFreezeReset < mondayThisWeek) {
    progress.stats.freezes_remaining = 1;
    progress.stats.last_freeze_reset = mondayThisWeek.toISOString();
  }

  progress.stats.last_activity_date = today.toISOString();
}
```

### 4.3 SRS Simplificado (`src/gamification/srs.js`)

```js
const INTERVALS = [1, 3, 7, 21]; // dias

function scheduleReview(progress, lessonId) {
  const existing = progress.srs_queue.find(q => q.lesson_id === lessonId);
  const intervalIdx = existing ? Math.min(existing.interval_index + 1, INTERVALS.length - 1) : 0;
  const due = new Date();
  due.setDate(due.getDate() + INTERVALS[intervalIdx]);

  if (existing) {
    existing.due_date = due.toISOString();
    existing.interval_index = intervalIdx;
  } else {
    progress.srs_queue.push({ lesson_id: lessonId, due_date: due.toISOString(), interval_index: intervalIdx });
  }
}

function getDueReviews(progress, today = new Date()) {
  return progress.srs_queue.filter(q => new Date(q.due_date) <= today);
}
```

### 4.4 Desbloqueio (`src/curriculum/unlock.js`)

```js
function isModuleUnlocked(curriculum, progress, semesterId, disciplineId, moduleId) {
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  const disc = sem.disciplines.find(d => d.id === disciplineId);
  const modIdx = disc.modules.findIndex(m => m.id === moduleId);
  if (modIdx === 0) return true; // primeiro módulo sempre aberto

  const prevModule = disc.modules[modIdx - 1];
  return prevModule.lessons.every(lessonId => progress.completed.lessons.includes(lessonId));
}

function getAvailableDisciplines(curriculum, progress, semesterId) {
  // Livres entre disciplinas do mesmo semestre (MVP: todas do semestre atual)
  const sem = curriculum.semesters.find(s => s.id === semesterId);
  return sem.disciplines; // sem filtro no MVP
}
```

---

## 5. Roteamento (Hash-based)

| Rota | View |
|------|------|
| `#/` | Dashboard (boas-vindas, meta diária, streak, revisões do dia, semestre atual) |
| `#/semester/:semId` | Cards de disciplinas do semestre |
| `#/semester/:semId/discipline/:discId` | Lista de módulos da disciplina |
| `#/semester/:semId/discipline/:discId/module/:modId` | Lista de lições do módulo |
| `#/lesson/:lessonId` | Lição completa (resumo + exercícios) |
| `#/theory/:theoryUnitId` | Biblioteca: unidade teórica |
| `#/library` | Índice geral da biblioteca (busca, todos semestres) |
| `#/settings` | Meta diária, tema, exportar/importar/resetar progresso |
| `#/achievements` | Galeria de conquistas |

**Fallback:** `404.html` → `window.location.href = '/ensina-logica/#/' + window.location.hash.slice(1)`.

---

## 6. Validação (`scripts/validate.mjs`)

Executa no CI (`validate.yml`) e localmente (`npm run validate`):

1. **Curriculum schema** → valida `data/curriculum.json` contra JSON Schema.
2. **Theory units** → cada `.md` em `data/theory/` tem front-matter válido, `license` em lista permitida, `source.url` acessível (HEAD request), `verification_status` não é `unverified` em produção.
3. **Exercises** → cada `.json` em `data/exercises/` válido, `theory_unit_id` existe, `generated_by_ai` boolean, se `type === "code-completion"` → tem campo `test_command` (ex.: `node --check`).
4. **Links internos** → `#/lesson/x`, `#/theory/y` existem no curriculum/data.
5. **Licenças** → nenhuma unidade usa fonte NC/ND/"all rights reserved" sem ser só link recomendado.
6. **Atribuições** → `ATTRIBUTIONS.md` sincronizado com metadados das unidades.
7. **JSON Schema version** → `progress.schema_version` compatível com migrações.

---

## 7. Testes (`scripts/test-core.mjs`)

Testes puros (Node, sem DOM), cobrem:

| Módulo | Casos |
|--------|-------|
| `xp.js` | Base, first-time, retry, streak bonus, level boundaries |
| `streak.js` | Consecutive days, gap 1 day (no freeze), gap 2 days (freeze used), gap 3 days (streak reset), Monday freeze reset |
| `srs.js` | Schedule first, repeat intervals 1→3→7→21, due today filter |
| `unlock.js` | First module open, second locked until first complete, cross-discipline free |
| `ProgressStore` | Save/load, export/import round-trip, schema migration v1→v2 |

**Meta:** 100% cobertura das funções puras. Roda em `validate.yml` e `npm test`.

---

## 8. CI/CD (GitHub Actions)

### `.github/workflows/validate.yml`
```yaml
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run validate
      - run: npm test
```

### `.github/workflows/deploy-pages.yml`
```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with: { path: '.' }
      - uses: actions/deploy-pages@v4
```

---

## 9. Fontes Aprovadas para o 1º Semestre (CONFIRMADAS — 2026-10-15)

> **Regra do Specify §9:** "Antes de usar qualquer fonte no 1º semestre, o Plan deve apresentar a lista de fontes candidatas com a licença confirmada na página de cada uma, para aprovação do usuário."
>
> **Confirmado pelo usuário.** Cada entrada abaixo inclui: edição exata, licença confirmada na **página do próprio livro** (URL onde a licença aparece), data de conferência, e restrições de uso.

### ✅ Aprovadas para Derivação (cópia, tradução, adaptação permitidas — com ressalvas)

| # | Fonte | Disciplina/Cobertura | Edição/Versão | Licença Confirmada | URL da Licença (página do livro) | Data Conferência | Restrições |
|---|-------|----------------------|---------------|-------------------|----------------------------------|------------------|------------|
| 1 | **Mathematics for Computer Science** (Lehman, Leighton, Meyer) | Matemática Discreta: lógica, provas, indução, grafos, probabilidade, teoria dos números | Edição Spring 2018 (MIT 6.042) — **somente esta edição**; PDF em `courses.csail.mit.edu/6.042/spring18/mcs.pdf` | **CC BY-SA 3.0** | https://courses.csail.mit.edu/6.042/spring18/mcs.pdf (front matter do PDF) | 2026-10-15 | Usar só esta edição; OCW 2015 e LibreTexts são NC |
| 8 | **Discrete Mathematics: An Open Introduction** (Oscar Levin) | Matemática Discreta: lógica, conjuntos, funções, contagem, grafos, provas | **3ª edição** (2019) — **não usar 4ª edição (NC)**; site: `discrete.openmathbooks.org` | **CC BY-SA 4.0** | https://discrete.openmathbooks.org/ (rodapé "License") | 2026-10-15 | 3ª ed. apenas |
| 10 | **Programming Fundamentals: A Modular Structured Approach** (Busbee & Braunschweig, 2ª ed.) | Algoritmos e Lógica: variáveis, controle, funções, pseudocode, flowcharts, exemplos em Python/JS/Java/C++ | **2ª edição** (2018), Rebus/Pressbooks — linguagem neutra, foco em lógica modular | **CC BY-SA 4.0** | https://press.rebus.community/programmingfundamentals/front-matter/preface/ (seção "The Creative Commons (CC) Attribution-ShareAlike license applies...") | 2026-10-15 | **Conferir licença por capítulo/imagem** — a licença vale "exceto onde indicado" |
| 12 | **An Open Guide to Data Structures and Algorithms** (Bible & Moser, 2023) | Algoritmos: **somente capítulo de Big-O e complexidade** no MVP; restante (recursão, ordenação, busca, listas, pilhas, filas, hash, árvores, grafos, DP) reservado para 2º semestre | **1ª edição** (2023), PALNI Press — `pressbooks.palni.org/anopenguidetodatastructuresandalgorithms/` | **CC BY 4.0** | https://pressbooks.palni.org/anopenguidetodatastructuresandalgorithms/ (rodapé "License") | 2026-10-15 | MVP: só capítulo Big-O/complexidade; demais → 2º sem |

### ⚠️ Só Link Recomendado (licença não permissiva para derivação)

| # | Fonte | Motivo | Uso Permitido |
|---|-------|--------|---------------|
| 4 | **OpenStax Introduction to Python Programming** | Página oficial declara **CC BY-NC-SA 4.0** — https://openstax.org/books/introduction-python-programming/pages/preface | Apenas link "Leitura recomendada"; **não usar o texto como entrada para a IA** |
| 5 | **How to Think Like a Computer Scientist** (Runestone) | Licença **GNU FDL** (não CC BY-SA) | Apenas link "Leitura recomendada" |
| 6 | **MIT 6.0001** (OCW) | **CC BY-NC-SA 4.0** | Apenas link "Leitura recomendada" |
| 7 | **CS50** (Harvard) | Licença custom, não permissiva | Apenas link "Leitura recomendada" |
| 9 | **Book of Proof** (Hammack) | **CC BY-ND 4.0** (sem derivações) | Apenas link "Leitura recomendada" |
| 11 | **Computer Science 20 — Saskatchewan** (Dan Schellenberg) | Licença CC BY-SA 4.0 declarada no repo, mas **nível introdutório (ensino médio/1º ano)**; só usar se você me mostrar a **página do próprio livro** com a versão exata da licença e o nível justificar | Apenas link "Leitura recomendada" por enquanto |

### 📅 Fora do MVP (semestres posteriores, licenças a confirmar na página original)

| # | Fonte | Semestre Alvo | Licença (a confirmar na página do livro) | Observação |
|---|-------|---------------|------------------------------------------|------------|
| 2 | **Open Data Structures** (Pat Morin) | 2º sem (Estruturas de Dados I) | **CC BY 2.5 Canadá** — confirmar em `opendatastructures.org` | Confirmar edição exata antes de usar |
| 3 | **Algorithms** (Jeff Erickson) | 4º sem (Projeto e Análise de Algoritmos) | **CC BY 4.0** — **somente livro 2019 (PDF `Algorithms-JeffE.pdf`)**; notas de aula do site são **CC BY-NC-SA 4.0** | Separar livro das notas; confirmar na página do livro |
| 13 | **Algorithms and Data Structures With Applications to Graphics and Geometry** (Nievergelt & Hinrichs, 2011) | Fora do MVP (gráficos/geometria computacional) | **CC BY 3.0** — **confirmar na página original** (Global Text Project / `ecampusontario.ca`), pois uma fonte cita BY-SA | Registrar como CC BY 3.0 após confirmação |

---

### Regras de Validação para `scripts/validate.mjs`

O validador deve **rejeitar** qualquer unidade teórica cuja `source.license` não esteja na lista permitida:

```js
const ALLOWED_LICENSES = [
  'CC0-1.0',
  'CC-BY-3.0', 'CC-BY-4.0',
  'CC-BY-SA-3.0', 'CC-BY-SA-4.0',
  // Domínio público: sem identificador SPDX padrão, tratar como caso especial
];

// Licenças EXPLICITAMENTE PROIBIDAS para derivação:
const FORBIDDEN_LICENSES = [
  'CC-BY-NC-4.0', 'CC-BY-NC-SA-4.0', 'CC-BY-NC-ND-4.0',
  'CC-BY-ND-4.0',
  'GFDL-1.3', // GNU FDL
  'MIT-OCW-NC-SA', // alias interno para MIT OCW padrão
];
```

> **Em cada unidade**, os metadados `source` devem conter: `edition`, `license_url`, `license_confirmed_at` (ISO date). O `validate.mjs` checa se a `license_url` responde 200 e se o texto da licença bate com o SPDX declarado.

## 10. Próximos Passos (Após Aprovação das Fontes)

1. **Tasks** → `specify tasks` (gera lista de tarefas atômicas)
2. **Implement** → `specify implement` (executa tarefas: cria arquivos, código, dados)
3. **Converge** → `specify converge` (repete até "Converged": valida, testa, ajusta)
4. **Commits por fase** (conforme autorizado): `constitution`, `spec`, `plan`, `tasks`, `implement`, `converge`, `repo-files`
5. **Checklist de publicação** → você cria repo, push, ativa Pages, confere URL

---

**Aprova o Plan técnico (exceto a lista de fontes, que precisa da sua validação na coluna "Licença")? Responda "aprovado" e depois me diga quais fontes da tabela acima são aprovadas para derivação.**