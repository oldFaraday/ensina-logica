---

description: "Task list template for feature implementation"
---

# Tasks: ensina-logica

**Input**: Design documents from `.specify/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Status snapshot (2026-10-16)**: Fases 1–4 concluídas + Fundamentos visuais (T113–T114) + correções fora do fluxo (T101–T108, T115–T120) + tema escuro Opção B (T119). Próxima fase: **Fase 5 (US3 — Lições/Exercícios)**. Ver seção "Progresso real do projeto" no fim.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project folder structure per plan.md (lib/, locales/, data/, src/, scripts/, .github/workflows/)
- [x] T002 Create package.json with Node scripts (validate, test, download-libs)
- [x] T003 [P] Create .gitignore, .editorconfig, .nojekyll, 404.html
- [x] T004 [P] Create favicon.svg and meta tags (Open Graph) in index.html shell
- [x] T005 Create index.html shell with header, main, footer, ES module scripts
- [x] T006 [P] Create locales/pt-BR.json with all UI strings (i18n ready)
- [x] T007 [P] Create README.md (pt-BR): what is, screenshots, how to run, publish to Pages, folder structure, how to add content, scope notice, licenses, contribute
- [x] T008 [P] Create LICENSE (MIT), CONTENT_LICENSE.md (CC BY-SA 4.0 + source precedence), ATTRIBUTIONS.md (sources + libs), CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Download KaTeX 0.16.9 (JS, CSS, .woff2 fonts) to lib/katex/ via scripts/download-libs.mjs
- [x] T010 Download highlight.js 11.9.0 (JS, themes) to lib/highlightjs/ via scripts/download-libs.mjs
- [x] T011 Create src/i18n.js — load locale, `t(key, params)` helper
- [x] T012 Create src/router.js — hash-based router (`#/`) with route params
- [x] T013 Create src/store/ProgressStore.js — localStorage abstraction with schema_version migration
- [x] T014 Create src/store/schema-version.js — migration logic for progress schema
- [x] T015 Create src/app.js — entry point: boot, router init, store init, theme init
- [x] T016 Create data/curriculum.json — full 8-semester map (sem1 complete, sem2-8 "coming-soon")
- [x] T017 Create data/theory/_schema.json — JSON Schema for theory unit front-matter validation
- [x] T018 Create data/exercises/_schema.json — JSON Schema for exercise validation
- [x] T019 Create scripts/validate.mjs — CI validation: curriculum schema, theory units (license, source URL HEAD, verification_status), exercises (theory_unit_id exists, generated_by_ai, code-completion has test_command), internal links, licenses, ATTRIBUTIONS.md sync, progress schema_version — ✅ parcial: falta HEAD da URL, links internos e sync ATTRIBUTIONS (ver T109–T111)
- [x] T020 Create scripts/test-core.mjs — pure logic tests: XP, streak, SRS, unlock, ProgressStore (save/load, export/import round-trip, migration) — ✅ inclui migração v0→v1→v2
- [x] T021 Create .github/workflows/validate.yml — runs validate + test on push/PR
- [x] T022 Create .github/workflows/deploy-pages.yml — deploy to GitHub Pages on push to main

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Onboarding & Semester View (Priority: P1) 🎯 MVP

**Goal**: User opens app, sees welcome screen with scope notice, picks daily XP goal, sees 1st semester with 2 disciplines

**Independent Test**: Open index.html → welcome modal shows, goal selector works, semester 1 card renders with 2 discipline cards

### Implementation for User Story 1

- [x] T023 [US1] Create src/ui/theme.js — light/dark toggle, persists to localStorage, respects prefers-color-scheme
- [x] T024 [US1] Create src/ui/a11y.js — skip links, focus trap, live regions, visible focus styles
- [x] T025 [US1] Create src/ui/toasts.js — non-intrusive notifications (XP, streak, achievements)
- [x] T026 [US1] Create src/ui/modals.js — accessible modals (ARIA), used for welcome & settings
- [x] T027 [US1] Create src/curriculum/loader.js — loads curriculum.json + theory + exercises (async, cached)
- [x] T028 [US1] Create src/curriculum/unlock.js — linear within discipline, free across disciplines same semester
- [x] T029 [US1] Create src/curriculum/progress.js — mark lesson/module complete, calculate % semester
- [x] T030 [US1] Create src/gamification/xp.js — BASE_XP=10, first-time +5, retry 50%, streak bonus min(streak,10)*2, level = floor(sqrt(xp/1000))+1
- [x] T031 [US1] Create src/gamification/streak.js — daily streak, weekly freeze (1/week, auto-use, resets Monday)
- [x] T032 [US1] Create src/gamification/achievements.js — badges: first-lesson, streak-7, module-1, 100-exercises, first-note, exported-progress
- [x] T033 [US1] Create src/gamification/srs.js — intervals [1,3,7,21] days, schedule on lesson complete, due reviews filter
- [x] T034 [US1] Create view: dashboard (#/) — welcome, daily goal selector (10/20/30/50), streak, XP, level, today's reviews, semester card
- [x] T035 [US1] Create view: semester (#/semester/:semId) — discipline cards, sem2-8 show "Em breve" disabled
- [x] T036 [US1] Wire dashboard → semester navigation, persist daily_goal to preferences

---

## Phase 4: User Story 2 - Discipline & Module Navigation (Priority: P1)

**Goal**: Navigate semester → discipline → module → lesson list with linear unlock per discipline

**Independent Test**: Click discipline → module list shows, module 1 unlocked, module 2 locked until module 1 lessons done

### Implementation for User Story 2

- [x] T037 [US2] Create view: discipline (#/semester/:semId/discipline/:discId) — module list with lock icons
- [x] T038 [US2] Create view: module (#/semester/:semId/discipline/:discId/module/:modId) — lesson list with completion status
- [x] T039 [US2] Implement unlock logic in unlock.js: module 0 always open, module N requires all lessons in module N-1 completed
- [x] T040 [US2] Show progress rings/bars per module and discipline
- [x] T041 [US2] Persist completed lessons to ProgressStore, update UI reactively — ✅ funções prontas (progress.js + ProgressStore); wire no fluxo de lição depende de T054–T058

---

## Phase 4.5: Fundamentos visuais (Design tokens neo-brutalistas)

**Purpose**: Estabelecer a identidade visual neo-brutalista e centralizar tudo em tokens **antes** das telas de lição/exercício. Detalhes em `DESIGN.md`.

- [x] T113 [UI] Fundamentos visuais: criar `DESIGN.md`; centralizar tokens (cores claro/escuro, tipografia, espaçamento, espessura de borda, sombras duras, alvo de toque) em `src/ui/theme.css`; aplicar estética neo-brutalista (bordas 2–4px, sombras duras sem desfoque, sem gradientes, cantos retos, títulos pesados, monoespaçada para código/rótulos, fontes por pilhas do sistema); revisar painel/semestre/disciplina/módulo/configurações nos temas claro/escuro e em 375/768/1280px (cabeçalho compacto, botão Voltar com seta, destaque forte de "Continuar", cartões de XP/nível/streak com presença, foco visível distinto da borda); nunca indicar estado só por cor/sombra (ícone ou texto sempre)
- [x] T114 [test] Teste de contraste WCAG AA (`scripts/test-contrast.mjs`) lendo os tokens de `src/ui/theme.css` e falhando abaixo de AA; incluído em `npm test`

---

## Phase 5: User Story 3 - Lesson & Exercises (Priority: P1) 🎯 MVP

**Goal**: Lesson screen with theory summary + 3-5 exercises (multiple types), immediate feedback with icon+text+color, XP award

**Independent Test**: Open lesson → shows summary + 3-5 exercises → answer → feedback shows icon+text+color + explanation → XP added → streak updated

### Tests for User Story 3 (OPTIONAL - only if tests requested)

- [x] T042 [P] [US3] Unit test: multiple-choice exercise rendering + feedback — `scripts/test-lesson-dom.mjs`
- [x] T043 [P] [US3] Unit test: true-false exercise rendering + feedback — `scripts/test-lesson-dom.mjs`
- [x] T044 [P] [US3] Unit test: order-steps exercise rendering + feedback — `scripts/test-lesson-dom.mjs`
- [x] T045 [P] [US3] Unit test: code-completion exercise rendering + feedback — `scripts/test-lesson-dom.mjs`
- [x] T046 [P] [US3] Unit test: flashcards exercise rendering + feedback — `scripts/test-lesson-dom.mjs`

### Implementation for User Story 3

- [x] T047 [US3] Create src/lesson/renderer.js — renders lesson: theory summary + exercise list
- [x] T048 [US3] Create src/lesson/exercise-types/multiple-choice.js — radio options, single correct, explanation
- [x] T049 [US3] Create src/lesson/exercise-types/true-false.js — two buttons, explanation
- [x] T050 [US3] Create src/lesson/exercise-types/order-steps.js — drag-and-drop or up/down buttons, explanation
- [x] T051 [US3] Create src/lesson/exercise-types/code-completion.js — textarea with highlight.js, "Run"/"Verificar" button (checagem de sintaxe JS no navegador; `test_command` validado no CI), explanation
- [x] T052 [US3] Create src/lesson/exercise-types/flashcards.js — flip card, mark known/unknown, spaced repetition
- [x] T053 [US3] Create src/lesson/feedback.js — icon+text+color (never color only), ARIA live for XP/streak/achievement
- [x] T054 [US3] Create view: lesson (#/lesson/:lessonId) — loads lesson data, renders exercises sequentially
- [x] T055 [US3] Implement XP calculation on correct answer (first try bonus, retry penalty, streak bonus)
- [x] T056 [US3] Implement "Praticar mais" → opens extra exercises from same theory unit (SRS queue)
- [x] T057 [US3] Persist exercise attempts (correct/incorrect/tentatives/xp_earned) to ProgressStore
- [x] T058 [US3] Schedule SRS review on lesson complete (intervals 1→3→7→21 days)

---

## Phase 6: User Story 4 - Theory Library (Priority: P1) 🎯 MVP

**Goal**: Clean reading view with sidebar index, mark section read, annotations per section, full-text search, attribution header, "ver original" toggle, "praticar este trecho" button

**Independent Test**: Open theory unit → sidebar navigable → checkbox per section → textarea per section saves to localStorage → search finds text → attribution shows source/license → "ver original" shows side-by-side (if license allows) → "praticar" links to lessons

### Implementation for User Story 4

- [x] T059 [US4] Create src/theory/renderer.js — renders theory markdown with KaTeX, highlight.js, attribution header, "ver original" toggle
- [x] T060 [US4] Create src/theory/sidebar.js — collapsible module→section index, keyboard navigable, highlights current section
- [x] T061 [US4] Create src/theory/annotations.js — CRUD per section (section-id → text), persists to localStorage
- [x] T062 [US4] Create src/theory/search.js — in-memory full-text index (title, content, metadata), results with snippet highlight
- [x] T063 [US4] Create view: theory (#/theory/:theoryUnitId) — loads unit, renders with sidebar, annotations, search
- [x] T064 [US4] Create view: library index (#/library) — search input, all semesters expandable, filter by discipline
- [x] T065 [US4] Implement "Ver original" — side-by-side original/translation when license permits (CC BY/CC BY-SA)
- [x] T066 [US4] Implement "Praticar este trecho" — lists linked lessons/exercises, navigates to lesson
- [x] T067 [US4] Persist "section read" checkboxes to ProgressStore.completed.theory_sections

---

## Phase 7: User Story 5 - Gamification Dashboard & Settings (Priority: P2)

**Goal**: Dashboard shows XP bar, level, streak with freeze counter, achievements gallery, daily goal progress with toast on complete, confetti (respects reduced-motion)

**Independent Test**: Complete exercises → XP bar fills → level up toast → streak increments → freeze shows 1/week → achievement unlocks toast → daily goal reached toast + confetti

### Implementation for User Story 5

- [x] T068 [US5] Enhance dashboard: XP progress bar to next level, level badge, streak counter with freeze icon
- [x] T069 [US5] Create view: achievements (#/achievements) — grid of badges, locked/unlocked state, criteria tooltip
- [x] T070 [US5] Create view: settings (#/settings) — daily goal picker, theme toggle, export/import/reset progress
- [x] T071 [US5] Implement export progress → downloads JSON with schema_version, timestamp
- [x] T072 [US5] Implement import progress → validates schema_version, migrates if needed, overwrites localStorage
- [x] T073 [US5] Implement reset progress → clears stats/completed/exercises/srs/achievements/annotations, keeps preferences
- [x] T074 [US5] Confetti animation on daily goal reached (CSS only, respects prefers-reduced-motion) — `src/ui/confetti.js` + teste `scripts/test-confetti-dom.mjs`
- [x] T075 [US5] ARIA live regions for: XP gain, streak change, achievement unlock, daily goal reached — ligados em `handleExerciseAnswer`/`checkAndAnnounceAchievements`/`checkDailyGoalReached` (polite para XP; assertive para conquista/streak/meta)

---

## Phase 8: User Story 6 - 1st Semester Content (Priority: P1) 🎯 MVP

**Goal**: 2 disciplines × 3 modules each = 6 modules. Each module: ≥1 theory unit, 3-5 lessons, flashcards. Content from approved sources only.

**Independent Test**: All 6 modules load → each has theory unit with valid front-matter → each lesson has 3-5 exercises → exercises link to theory unit → sources in ATTRIBUTIONS.md

### Content Creation (Data Files Only - No Code)

- [x] T076 [P] [US6] Create theory units for Algorithms (sem1/algorithms/) — convenção do loader: arquivo nomeado com o id completo (`th-sem1-algorithms-m01-intro.md`, `-m02-variables.md`, `-m03-control-flow.md`) — derivadas de Busbee & Braunschweig 2nd ed (CC BY-SA 4.0)
- [x] T077 [P] [US6] Create theory units for Discrete Math (sem1/discrete-math/) — arquivos `th-sem1-discrete-math-m01-logic.md`, `-m02-predicate-logic.md`, `-m03-proofs-induction.md` — derivadas de Levin 3rd ed (CC BY-SA 4.0)
- [x] T078 [P] [US6] Create exercises for Algorithms lessons (3–5 per lesson, types varied, generated_by_ai: true, verified against source) — 48 exercícios em 10 arquivos
- [x] T079 [P] [US6] Create exercises for Discrete Math lessons (3–5 per lesson, types varied, generated_by_ai: true, verified against source) — 37 exercícios em 8 arquivos
- [x] T080 [US6] Update ATTRIBUTIONS.md with all theory unit sources + KaTeX + highlight.js — já listados; sync verificada por T111
- [x] T081 [US6] Run scripts/validate.mjs — confirm all theory units pass (license allowed, source URL accessible, verification_status=verified_with_source) — 6 unidades + 18 arquivos + 85 exercícios, 0 erros

---

## Phase 9: User Story 7 - Accessibility & Privacy Polish (Priority: P2)

**Goal**: 100% keyboard navigable, WCAG AA contrast, prefers-reduced-motion respected, zero cookies/analytics/external scripts

**Independent Test**: Tab through entire app → visible focus everywhere → no color-only states → animations off when reduced-motion → no network requests to external domains on load

### Implementation for User Story 7

- [x] T082 [US7] Audit all interactive elements: focus styles, tab order, skip links at top of each view — `:focus-visible` global + skip link no shell; alvos de toque `var(--touch-target)` em botões/opções
- [x] T083 [US7] Verify contrast ratios (WCAG AA) for all text/background combinations in light/dark themes — `scripts/test-contrast.mjs`
- [x] T084 [US7] Ensure all state indicators use icon + text + color (never color only): ✅/❌, streak 🔥, XP ⭐
- [x] T085 [US7] Test prefers-reduced-motion: confetti disabled, transitions instant, no auto-playing animations — `theme.css` + `scripts/test-confetti-dom.mjs`
- [x] T086 [US7] Verify zero external requests: all libs local, no CDN, no analytics, no cookies — `preconnect`/fonts externos ausentes; KaTeX/highlight.js locais; CSP adicionada em index.html
- [x] T087 [US7] Add aria-live="polite" for XP/toasts, aria-live="assertive" for achievements/streak milestones

---

## Phase 10: User Story 8 - Deploy & Repository Files (Priority: P1) 🎯 MVP

**Goal**: GitHub Pages deploy works, all required repo files exist, validation runs on push/PR

**Independent Test**: Push to main → Actions runs validate → deploy → site loads at https://oldfaraday.github.io/ensina-logica/

### Implementation for User Story 8

- [x] T088 [US8] Verify .github/workflows/validate.yml runs npm run validate && npm test
- [x] T089 [US8] Verify .github/workflows/deploy-pages.yml uploads artifact and deploys
- [ ] T090 [US8] Test 404.html redirect to #/ works on Pages (SPA fallback) — 404.html existe; falta validar no site publicado
- [x] T091 [US8] Confirm all Definition of Done files exist: README.md, LICENSE, CONTENT_LICENSE.md, ATTRIBUTIONS.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md, .gitignore, .editorconfig, .nojekyll, 404.html, favicon.svg, package.json
- [x] T092 [US8] Create publication checklist (pt-BR): create repo, push, enable Pages, verify URL — ✅ em README.md ("Checklist de publicação")

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T093 [P] Documentation updates: inline code comments, architecture decisions in docs/ — ✅ `docs/CONTENT_MODEL.md` + README alinhado (ver T121)
- [x] T094 Code cleanup: remove console.log, consistent naming, remove dead code — ✅ `console.log` removido de src/app.js
- [x] T095 Performance: lazy-load theory/exercise data, memoize search index, debounce search input — ✅ dados sob demanda + cacheados; busca com debounce e haystack memoizado (`WeakMap`)
- [x] T096 [P] Additional unit tests for edge cases in gamification (streak freeze Monday reset, SRS interval cap, XP level boundaries) — ✅ coberto em scripts/test-core.mjs
- [x] T097 Security hardening: CSP meta tag, sanitize any user-generated content (annotations) — ✅ CSP no index.html; anotações escapadas (`escapeHtml`) ao renderizar
- [x] T098 Run full validation suite (scripts/validate.mjs) and fix any issues — ✅ passa (2 avisos esperados: sem conteúdo ainda)
- [x] T099 Run full test suite (scripts/test-core.mjs) and ensure 100% pure function coverage — ✅ `npm test` verde (core + smoke + imports + dom + i18n + onboarding)
- [ ] T100 Final manual QA: complete user journey from welcome → lesson → theory → settings → export/import — ✅ jornada automatizada em `scripts/test-e2e-dom.mjs` (AC-06); QA manual em navegador real ainda pendente

---

## Phase 12: Correções e Endurecimento fora do fluxo (concluídas)

**Purpose**: Correções feitas fora do fluxo original das user stories (boot, roteador, store, i18n, onboarding) e infra de testes. Referência de commits no git.

- [x] T101 [fix] Rota inicial `#/` renderiza conteúdo: router localiza `<main>` de forma robusta; `a11y` não renomeia mais o elemento nem duplica o skip link; toasts reutilizam `#toast-container` — commit `2f183af`; teste `scripts/test-dom.mjs`
- [x] T102 [fix] i18n: títulos de lições vêm do currículo (`data/curriculum.json` → `lessonTitles`), chaves faltantes adicionadas, `t()` respeita `defaultValue` (nunca vaza chave crua) — commit `9fee4da`; teste `scripts/test-i18n-dom.mjs`
- [x] T103 [a11y] Ícones do cabeçalho com `aria-label` + `title` (tooltip) via i18n (`applyHeaderLabels()`): tema, configurações, conquistas
- [x] T104 [store/schema] Migração de schema v0→v1→v2 com `preferences.onboarding_completed` (default `false`); dados antigos sem a flag → `false`
- [x] T105 [onboarding] Modal de boas-vindas controlado por flag dedicada (não por `last_activity_date`); grava a meta + flag ao escolher; `reset` mantém, `clear` reabre — teste `scripts/test-onboarding-dom.mjs`
- [x] T106 [infra] Testes em Node + jsdom (devDependency): `test-imports.mjs`, `test-smoke.mjs`, `test-dom.mjs`, `test-i18n-dom.mjs`, `test-onboarding-dom.mjs`; `npm test` ampliado
- [x] T107 [store] Correções de API do ProgressStore (`save()` público), import/export e correções de rota/infinite loop — commits `8b8c154`, `657c566`, `d416024`
- [x] T108 [ui] Novo favicon.svg e metas do shell atualizadas — commit `db8e078`
- [x] T115 [fix] Modal de boas-vindas bloqueava TODOS os cliques: o overlay invisível (`opacity: 0`) ainda capturava o ponteiro. Agora `.modal-overlay` só recebe cliques quando `.visible` (`pointer-events: none`/`auto`) e `showWelcomeModal()` adiciona `.visible`; meta padrão (20 XP) pré-selecionada — teste `scripts/test-interaction-dom.mjs`
- [x] T116 [fix] Layout do topo: `.daily-goal-bar` com `width: 100%` (antes colapsava a ~6px por margens automáticas + conteúdo absoluto, virando uma "barra vertical") e `.xp-bar` sem `border-top` (que duplicava a linha do cabeçalho)
- [x] T117 [fix] Router: guarda `started` — o router não lê mais o hash antes de `setupRoutes()`/`startRouter()`. Deep-link/refresh em `#/settings` ou `#/semester/sem1` agora abre a própria tela (antes o evento `load` rodava com a tabela de rotas vazia, caía no 404 e redirecionava para `#/`)
- [x] T118 [test] Teste de interação (jsdom) com cliques reais: "Continuar" → semestre → "Entrar" (disciplina) → "Entrar" (módulo), deep-link e guarda de `pointer-events` do overlay; incluído em `npm test`
- [x] T119 [design] Tema escuro refeito para a **Opção B «Ameixa»** (roxo escuro, superfícies mais claras, bordas em creme quente, sombra dura **rosa**, foco ciano; CTA amarela mantida) — escolhida entre 3 propostas em `DESIGN.md` §2.3 e `design-preview.html` (arquivo solto, sem link no app); aplicada nos dois blocos escuros de `src/ui/theme.css`; `index.html` com `theme-color` por `prefers-color-scheme`; contraste AA mantido
- [x] T120 [fix] Tema: (a) a escolha agora **persiste** — `applyThemePreference()` grava `progress.preferences.theme` via `progressStore.update()`, então sobrevive ao reload; (b) o botão `#theme-toggle` do cabeçalho ganhou handler (**alterna claro ↔ escuro**, com o modo "automático" em Configurações), com ligação idempotente; (c) ícone de Configurações trocado por um **gear sólido** (preenchido), coerente com os demais ícones (antes era um path corrompido), e o botão de tema mostra **apenas o sol no claro / apenas a lua no escuro** — as regras usam `.icon-btn` para vencer a especificidade de `.icon-btn svg { display: block }`; teste `scripts/test-theme-dom.mjs` (persistência entre reloads, botões e especificidade dos ícones) em `npm test`

---

## Phase 13: Verificação de Conteúdo e Conformidade (novas tarefas)

**Purpose**: Tarefas de verificação que faltavam para garantir as regras da Constitution §2 (apenas fontes aprovadas; fonte inacessível → `pendente`, nunca inventar) e do plan.md §7.

- [x] T109 [verify] Em scripts/validate.mjs, verificar acessibilidade de `source.url` (HEAD/rede) e sinalizar quando indisponível — implementado, gated por `CHECK_URLS=1` (evita rede no CI offline)
- [x] T110 [verify] Em scripts/validate.mjs, validar links internos (`#/lesson/x`, `#/theory/y`) contra o curriculum e os arquivos de dados existentes
- [x] T111 [verify] Em scripts/validate.mjs, checar sincronização ATTRIBUTIONS.md ↔ fontes efetivamente usadas nas unidades/exercícios
- [x] T112 [verify] Garantir a regra "pendente": unidade com `verification_status: unverified` (ou fonte não acessada) **não entra na trilha** — loader filtra o índice de teorias e a view de lição exibe "em construção"; exercícios ligados a unidade `unverified` são sinalizados pelo validate (teste `scripts/test-content-dom.mjs`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-10)**: All depend on Foundational phase completion
  - US1 (Onboarding) can start after Foundational
  - US2 (Navigation) depends on US1 (needs curriculum loader)
  - US3 (Lessons) depends on US2 (needs module/lesson routing)
  - US4 (Theory) can start after Foundational (independent view)
  - US5 (Gamification UI) depends on US1+US3 (needs XP/streak data)
  - US6 (Content) can start after Phase 2 (data files only)
  - US7 (A11y/Privacy) can run in parallel throughout
  - US8 (Deploy) depends on all code complete
- **Polish (Phase 11)**: Depends on all desired user stories being complete
- **Phase 13 (Verificação de conteúdo)**: Pode rodar junto com US6 (Fase 8)

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational - No dependencies on other stories
- **US2 (P1)**: Can start after US1 (needs curriculum data loaded)
- **US3 (P1)**: Can start after US2 (needs lesson routing) - Core MVP
- **US4 (P1)**: Can start after Foundational - Core MVP (parallel with US3)
- **US5 (P2)**: Can start after US1+US3 - Enhances MVP
- **US6 (P1)**: Data creation - Can start after Phase 2 - Core MVP
- **US7 (P2)**: Cross-cutting - Can run throughout
- **US8 (P1)**: Deploy - After all code complete

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before views
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, US1, US4, US6 can start in parallel
- US3 and US4 can run in parallel after US2
- US7 (A11y) can run throughout
- All [P] tasks within a story can run in parallel

---

## Parallel Example: User Story 3 (Lessons)

```bash
# Launch all exercise type implementations together:
Task: "Create multiple-choice exercise type in src/lesson/exercise-types/multiple-choice.js"
Task: "Create true-false exercise type in src/lesson/exercise-types/true-false.js"
Task: "Create order-steps exercise type in src/lesson/exercise-types/order-steps.js"
Task: "Create code-completion exercise type in src/lesson/exercise-types/code-completion.js"
Task: "Create flashcards exercise type in src/lesson/exercise-types/flashcards.js"
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3, 4, 6, 8 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: US1 (Onboarding + Dashboard + Semester)
4. Complete Phase 4: US2 (Discipline + Module navigation)
5. Complete Phase 5: US3 (Lessons + Exercises) + Phase 6: US4 (Theory Library) in parallel
6. Complete Phase 8: US6 (1st Semester Content - data files)
7. Complete Phase 10: US8 (Deploy + Repo files)
8. **STOP and VALIDATE**: Test full user journey independently
9. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Deploy/Demo (welcome + semester view)
3. Add US2 → Test independently → Deploy/Demo (navigation works)
4. Add US3 + US4 → Test independently → Deploy/Demo (lessons + theory work)
5. Add US6 → Content complete
6. Add US5 + US7 → Polish
7. Add US8 → Deploy works
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (Onboarding) + US5 (Gamification UI)
   - Developer B: US2 (Navigation) + US3 (Lessons)
   - Developer C: US4 (Theory Library) + US6 (Content creation)
   - Developer D: US7 (A11y/Privacy audit) + US8 (Deploy/Repo files)
3. Stories complete and integrate independently

---

## Progresso real do projeto (snapshot 2026-10-16, atualizado)

Comparação do tasks.md com o estado real do repositório.

**(a) O que falta por fase**
- **Fase 5 (US3 – Lições/Exercícios)**: ✅ concluída (T042–T058).
- **Fase 6 (US4 – Biblioteca Teórica)**: ✅ concluída (T059–T067).
- **Fase 7 (US5 – Gamificação/Settings)**: ✅ concluída (T068–T075).
- **Fase 8 (US6 – Conteúdo sem1)**: ✅ concluída — 6 unidades teóricas, 85 exercícios em 18 lições (T076–T081).
- **Fase 9 (US7 – A11y/Privacidade)**: ✅ concluída (T082–T087).
- **Fase 10 (US8 – Deploy)**: workflows e arquivos prontos; falta validar 404/redirect no Pages publicado (T090) — requer deploy real.
- **Fase 11 (Polish)**: cleanup + CSP feitos; falta QA manual final (T100) — requer navegador real.
- **Fase 13 (Verificação de conteúdo)**: ✅ concluída (T109–T112).

**(b) Próxima fase a executar**: nenhuma no código — faltam apenas **T100 (QA manual)** e **T090 (validação do deploy publicado)**, que exigem navegador/ambiente externo.

**(c) Tarefas de conteúdo teórico e de exercícios, e a regra das fontes**
- **Teoria**: T076–T077 (unidades) + T059 (renderer). **Exercícios**: T078–T079 (dados) + T047–T058.
- A regra de **só usar fontes aprovadas** está explícita em T076/T077 e nos Notes (Content/License rules) + Constitution §2.
- Regra **`pendente`** (Constitution §2, spec AC-13): implementada e verificável em T109–T112.
- Conteúdo derivado de: Busbee & Braunschweig (algorithms, CC BY-SA 4.0) e Levin 3rd ed (discrete-math, CC BY-SA 4.0), ambos com `verification_status: verified_with_source`.

---

## Phase 17: Encerramento do MVP e organização do repositório (2026-10-16)

**Purpose**: Fechamento de verificação, registro do deploy e faxina de documentação/artefatos.

- [x] T130 [verify][deploy] Fechar T090: validar fallback SPA no Pages publicado — ✅ Validado: 404 redireciona e deep links renderizam.
- [x] T131 [verify][qa] Fechar T100: QA manual final (jornada completa no site publicado) — ✅ Validado: onboarding, metas, tema, navegação e export.
- [x] T132 [docs] Registrar data de deploy e release 1.0.0 (CHANGELOG, ATTRIBUTIONS, STATUS) — ✅ Feito: CHANGELOG [1.0.0] - 2026-10-16 e ATTRIBUTIONS.md seção Deploy atualizados.
- [ ] T133 [chore] Organizar a casa: remover AUDIT.md, design-preview.html, .python-version, spec-kit/
- [ ] T134 [docs] Corrigir documentação (branch main→master, SRS [0,1,3,7,21], árvore de pastas, license_url)
- [ ] T135 [chore] Ajustar .gitignore e arquivos do GitHub (REQUIRED_FILES, issue/PR templates)
- [ ] T136 [test][optional] Guarda anti-drift da documentação (scripts/test-docs.mjs)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Content rule**: No theory text invented. If source not accessed → unit stays `pendente` (not in trail, only in map as "em construção") — ver também T112
- **License rule**: Only CC0, CC BY, CC BY-SA sources allowed for derivation. NC/ND/all-rights-reserved → only "Leitura recomendada" link
- **AI exercises**: Must link to theory unit, answer/explanation verified against source, marked "gerados por IA", code exercises tested before commit

---

## Phase 14: Convergence (2026-10-16)

Avaliação do código atual contra `spec.md`, `plan.md`, `tasks.md` e a Constitution (`.specify/constitution.md`; a cópia em `.specify/memory/constitution.md` é template vazio → governança ignorada com segurança). **Append-only:** nenhuma tarefa existente foi alterada, renumerada ou removida.

- [x] T121 [Convergence] Corrigir a documentação do modelo de conteúdo: o README documenta `data/theory/sem{X}/{discipline}/{module-id}.md` e exercício como **objeto único**, mas o loader lê `{theory-unit-id}.md` e um **array** de exercícios por lição. Alinhar o README e criar `docs/CONTENT_MODEL.md` com o fluxo "adicionar fonte → gerar unidade → verificar → publicar" per spec §10 / T093 (contradicts) — HIGH ✅
- [x] T122 [Convergence] Adicionar teste end-to-end (jsdom) da jornada welcome → lição → teoria → configurações → export/import, cobrindo AC-06 e AC-11 per T100 / AC-06 (missing) — MEDIUM ✅ `scripts/test-e2e-dom.mjs`
- [x] T123 [Convergence] Biblioteca (`#/library`): adicionar filtro por disciplina e agrupamento/expansão por semestre per spec §4 / T064 (partial) — MEDIUM ✅
- [x] T124 [Convergence] Adicionar teste estático do `404.html` (fallback SPA → `#/`) e registrar a validação no Pages publicado per AC-10 / T090 (partial) — MEDIUM ✅ `scripts/test-404.mjs` (validação no Pages publicado segue pendente)
- [x] T125 [Convergence] Memoizar o índice de busca (haystack normalizado) em `src/theory/search.js` per T095 (partial) — LOW ✅

---

## Phase 15: Convergence (2026-10-16)

Avaliação do código atual contra `spec.md`, `plan.md`, `tasks.md` e a Constitution (`.specify/constitution.md`; a cópia em `.specify/memory/constitution.md` é template vazio → governança ignorada com segurança). **Append-only:** nenhuma tarefa existente foi alterada, renumerada ou removida.

- [x] T126 [Convergence] Expor a entrada "Biblioteca" no menu/cabeçalho global apontando para `#/library` (hoje o índice só é alcançável voltando de uma unidade teórica) per spec §4 / AC-05 (missing) — HIGH ✅ (ícone no header + `library.nav`; coberto em `scripts/test-e2e-dom.mjs`)

---

## Phase 16: Correções pós-QA manual (2026-10-16)

**Purpose**: Correções pontuais encontradas no QA manual da Parte 3 (responsividade) e ajustes de gamificação/SRS aprovados. **Append-only**: a partir de T127.

- [x] T127 [fix][ui] Responsividade móvel da Biblioteca Teórica (`#/theory/:id` e `#/library`, ~375px): (a) impedir o "blowout" do grid (`.theory-layout` e filhos com `min-width:0`; `.theory-main`/`.theory-sidebar-host`/`.theory-unit`/`.theory-section` com `min-width:0; max-width:100%`); (b) `pre`/`pre code` e `.katex-display` rolam no próprio bloco (`overflow-x:auto`, `max-width:100%`); (c) `img/svg/video/canvas` e tabelas limitados; (d) `overflow-wrap`/`word-break` nos contêineres de texto; (e) campos de busca/filtro com `width:100%`; (f) `@media (max-width:767px)` com coluna única, paddings menores e índice lateral **depois** do conteúdo (DOM reordenado; desktop mantém o índice à esquerda via `grid-column`); (g) rede de segurança `html { overflow-x: clip; }`. CSS usando **apenas tokens** de `DESIGN.md`. Teste estático `scripts/test-responsive.mjs` (em `npm test`) — commit `fix(ui): responsividade móvel da biblioteca` ✅
- [x] T128 [feat][gamification] Metas de XP 100/300/600/1000 (antes `[10,20,30,50]`, batidas com uma única lição): default **300** ("Moderado" pré-selecionado). `src/app.js` centraliza `DAILY_GOALS`/`DEFAULT_DAILY_GOAL`/`renderGoalOption()`/`bindGoalOptions()`; cada meta é um `.goal-option` (flex column) e a **1000** exibe 👿 (`aria-hidden`) ao lado do texto e a legenda **HARDCORE** abaixo (visível só quando `.active`, com `min-height` reservado) — na modal de boas-vindas **e** em Configurações. i18n: `welcome.goals` com 100/300/600/1000 (Leve/Moderado/Intenso/Hardcore) e `welcome.hardcore`; o rótulo traduzido passa a ser exibido (nome acessível inclui o nível). Defaults 300 também em `schema-version.js`/`ProgressStore`. Testes: e2e (Configurações) e onboarding (modal) cobrem metas + HARDCODE; mocks atualizados — commit `feat(gamification): metas de XP 100/300/600/1000 com destaque HARDCODE` ✅
- [x] T129 [feat][srs] Revisões no **mesmo dia** (fila de erros + revisão de lição): `SRS_INTERVALS` passa a `[0,1,3,7,21]` (índice 0 = hoje) e a revisão de lição (`scheduleReview`, ao concluir) vence **hoje**. Nova fila `progress.review_queue` (uma entrada por `exercise_id`, upsert **sem duplicar**; conta `wrong_count`): `recordWrongExercise` (vence hoje), `processExerciseReview` (acerto avança a escada, erro reinicia no índice 0/hoje; acerto de exercício nunca errado **não** agenda) e `getDueExerciseReviews`. `handleExerciseAnswer` grava a resposta e alimenta a fila; o painel combina as duas filas (`getCombinedReviewItems`) em **"Revisões pendentes"** e, sem pendências, mostra a próxima revisão futura (`dashboard.next_review_in`). **Nunca** implementa vidas/bloqueio por erro (mantém o invariante). Schema **v3**: a migração adiciona `review_queue: []` (progresso v2 importado continua válido; `validateProgress` não exige a chave). Testes: `scripts/test-core.mjs` (fila + migração v2→v3) e `scripts/test-e2e-dom.mjs` (errar → revisões no painel no mesmo dia). — commit `feat(srs): revisões no mesmo dia` ✅

---

## Phase 18: Limpeza do conteúdo placeholder (2026-10-17)

**Purpose**: Remover o conteúdo placeholder apontado pelo `CONTENT_AUDIT.md` — as unidades `m04`–`m11` do 1º semestre e os exercícios das lições `l201+` — mantendo somente as 6 unidades reais e os 85 exercícios do MVP. **Append-only**: a partir de T137. Não gerar conteúdo novo.

- [x] T137 [chore][content] Remover as 188 unidades teóricas placeholder (`data/theory/sem1/{algorithms,discrete-math}/…-m04…m11-*.md`) e os 940 exercícios placeholder (`data/exercises/sem1/**/m04…m11-*.json`); manter as 6 unidades reais e os 85 exercícios do MVP (histórico preservado no git) — ✅ `data/theory/` 194→6, exercícios 206→18 arquivos
- [x] T138 [fix][data] `data/curriculum.json`: 1º semestre restrito aos módulos reais `m01`–`m03` (algorithms e discrete-math); semestres 2–8 só como mapa (disciplinas e módulos, sem lições) e seguem como "Em breve". Nenhuma tela, busca, glossário ou biblioteca lista conteúdo inexistente — ✅
- [x] T139 [feat][schema] Adicionar `pending` aos valores permitidos de `verification_status` (`data/theory/_schema.json`, `docs/CONTENT_MODEL.md`, `README.md` e `scripts/validate.mjs`) — ✅
- [x] T140 [verify][content] Reconferir as 6 unidades reais (URL específica do capítulo, edição e licença). Levin aponta para a 3ª edição (`https://discrete.openmathbooks.org/dmoi3.html`, CC BY-SA 4.0) e os `original_excerpt` conferem nessa edição (não na 4ª, NC-SA); nenhuma unidade virou `pending` — ✅
- [x] T141 [docs] Regerar `ATTRIBUTIONS.md` a partir das unidades que realmente existem (MCS e Open Guide passam a "aprovadas, ainda sem unidades derivadas") — ✅
- Verificação: `npm test` verde (16 suítes; `scripts/test-content-dom.mjs` = 6 unidades / 18 lições / 85 exercícios) e `npm run validate` sem erros.

**Nota (pendência, fora do escopo desta limpeza):** `scripts/generate-content.mjs` é o gerador que produziu os placeholders removidos; segue no repositório (não é referenciado por script/teste/CI) e recomenda-se removê-lo numa próxima limpeza.

---

## Phase 19: Endurecer a validação de conteúdo (2026-10-17)

**Purpose**: Impedir que o problema do `CONTENT_AUDIT.md` (unidades `verified_with_source` sem trecho literal conferido, URLs genéricas, licenças/edições proibidas, exercícios placeholder) volte. **Append-only**: a partir de T142.

- [x] T142 [feat][validation] `scripts/lib/content-rules.mjs` (regras puras e testáveis): URL genérica (homepage sem capítulo/seção), `original_excerpt` no idioma da fonte (inglês), ≥ 15 palavras e sem cara de texto gerado, `verified_at` + `verification_method` obrigatórios em `verified_with_source`, licença permitida (CC0/CC BY/CC BY-SA/domínio público) e edição proibida (Levin 4ª, NC). `scripts/validate.mjs` passa a **falhar** (não apenas avisar) nesses casos e nos exercícios com placeholder ("Questão N sobre", "Alternativa A", "Explicação da questão") ou explicação sem citar a seção/capítulo da fonte.
- [x] T143 [fix][validation] `ATTRIBUTIONS.md`: o validador **gera** o bloco de unidades a partir de `data/theory/` e **falha** se o arquivo divergir (antes a checagem passava mesmo com o arquivo desatualizado). Marcadores `<!-- BEGIN/END GENERATED: theory-units -->`; regenerar com `node scripts/validate.mjs --update-attributions`. Também rejeita ids de unidades inexistentes no arquivo.
- [x] T144 [feat][tooling] `scripts/verify-sources.mjs` (manual, fora do CI; `npm run verify-sources`): baixa cada `source.url` e imprime "confere"/"não confere"/"sem acesso" para cada `original_excerpt`.
- [x] T145 [test][validation] `scripts/test-validation.mjs` (em `npm test`): asserções com exemplos ruins (unidade placeholder, licença NC, trecho em português, edição Levin 4ª, trecho curto, exercício placeholder/sem citação) confirmando que as regras os rejeitam; helpers e bloco gerado cobertos.
- [x] T146 [docs] Critério de aceitação nas specs (AC-14, AC-15), Constitution §2 (`pending` + "nenhuma unidade `verified_with_source` sem trecho original literal conferido contra a fonte"), `README.md`, `docs/CONTENT_MODEL.md` e `data/theory/_schema.json` (`verified_at`/`verification_method`; enum de licença com domínio público).
- [x] T147 [data][content] As 6 unidades reais ganharam `verified_at: 2026-10-17` + `verification_method: manual_url_check`; o trecho de `th-sem1-discrete-math-m02-predicate-logic` foi estendido para um trecho literal ≥ 15 palavras (mesma seção 0.2) e a explicação do flashcard `ex-sem1-algorithms-m01-l01-flash` passou a citar o capítulo da fonte — satisfazendo as novas regras sem inventar conteúdo.
- Verificação: `npm test` verde (17 suítes; inclui `scripts/test-validation.mjs`) e `npm run validate` sem erros nem avisos. Também confirmado que o validador **falha** (exit 1) quando `ATTRIBUTIONS.md` recebe uma unidade inexistente.

---

## Phase 20: Corrigir "completar código" (lacunas inline) + auditar os tipos (2026-10-18)

**Purpose**: Corrigir o bug em que a tela mostrava o **código inteiro** num `textarea` editável, mas a verificação comparava o **campo inteiro** com a resposta de **uma** lacuna — obrigando o aluno a apagar o código. Agora o código é **fixo** e cada `___` é um **campo inline**. **Append-only**: a partir de T148.

- [x] T148 [fix][ui] `src/lesson/exercise-types/code-completion.js` reescrito: o código vira um bloco monoespaçado **não editável** (`<pre class="code-block">`) e cada `___` vira um `<input class="code-blank">` na própria linha. Suporta **várias lacunas**; `aria-label` "Lacuna N de M"; **Tab** percorre as lacunas; **Enter** verifica; a largura é fixa em CSS (`width: 10ch`), sem revelar o tamanho da resposta.
- [x] T149 [fix][data] Novo formato de dados: `code` (código com `___`) + `blanks: [{ accepted_answers: [...] }]` (uma por `___`, na ordem). A verificação normaliza aspas tipográficas e remove todos os espaços (`normalizeBlankAnswer`), aceitando equivalências listadas (ex.: `(idade1 + idade2) / 2` ≡ `(idade2 + idade1) / 2`). Erro mostra a resposta de referência da(s) lacuna(s) errada(s) + explicação; **sem vidas/punição**; **sem `eval`** e sem executar código digitado. Removidos `starter_code`/`test_command`/`correct` do tipo `code-completion`.
- [x] T150 [data][content] Migrados **8** exercícios (`data/exercises/sem1/algorithms/m01-l02, m02-l04, m02-l05, m02-l06, m03-l07, m03-l08, m03-l09, m03-l10`), sem alterar o conteúdo pedagógico (enunciado, código, explicação e dificuldade preservados).
- [x] T151 [feat][validation] `data/exercises/_schema.json` + `scripts/validate.mjs` + `docs/CONTENT_MODEL.md`: `correct` deixou de ser obrigatório para `code-completion`; a validação **falha** se o número de `___` no `code` ≠ número de `blanks`, se alguma lacuna ficar sem `accepted_answers` válidos ou se o código não tiver lacuna. `blanks[].accepted_answers` exige ≥ 1 string não vazia.
- [x] T152 [test][jsdom] `scripts/test-lesson-dom.mjs`: interação real — cada resposta aceita (inclusive variações de espaço/aspas) ⇒ correto; resposta errada ⇒ incorreto + referência; lacuna vazia ⇒ não correto; digitar o código inteiro na lacuna ⇒ não correto; Enter verifica; múltiplas lacunas com `aria-label` correto.
- [x] T153 [fix][audit] Auditoria por interação dos outros tipos (o que a tela pede = o que a verificação compara): múltipla escolha (índice escolhido), verdadeiro/falso (valor do botão), ordenar passos (ordem **atual** do DOM) e flashcards (autoavaliação). **Encontrados e corrigidos**: (a) `order-steps` destacava posições usando a ordem **inicial** em vez da atual, contradizendo o resultado (marcava tudo como errado mesmo no acerto); (b) `order-steps.resetExercise` reabilitava setas inválidas; (c) `multiple-choice.resetExercise` tinha um `forEach` quebrado (não limpava os marcadores ✅/❌); (d) `true-false` tinha uma condição de teclado duplicada (cosmético).
- Verificação: `npm test` verde (**17 suítes**) e `npm run validate` sem erros; validação conferida negativamente (falha com "3 lacunas `___` ≠ 2 `blanks`" e com "lacuna 2 sem `accepted_answers`"). Exercício resolvido no **navegador real** (`#/lesson/l02`): digitar `(idade2 + idade1) / 2` na lacuna e acionar Verificar ⇒ "✅ Correto! +27 XP"; resposta errada ⇒ "❌ Incorreto" com a resposta de referência e sem punição (Enter também verifica).

---

## Phase 21: Normalização conservadora da resposta + XP uma vez por exercício (2026-10-18)

**Purpose**: (1) a normalização da lacuna removia **todos** os espaços, então respostas erradas como `notx` casavam com `not x` (`aandb` ≈ `a and b`, `"ab"` ≈ `"a b"`); (2) o XP podia ser **reconcedido** ao re-responder um exercício já acertado. **Append-only**: a partir de T154.

- [x] T154 [fix][lesson] `normalizeBlankAnswer` (`src/lesson/exercise-types/code-completion.js`): uniformiza aspas tipográficas, **colapsa** espaços repetidos, remove espaços **apenas ao redor de operadores/pontuação** (`+ - * / % ( ) [ ] , : = < >`), **preserva ao menos um espaço entre duas palavras** (`not x` ≠ `notx`; `a and b` ≠ `aandb`) e **não altera o conteúdo entre aspas** (`"a b"` ≠ `"ab"`). Equivalências de formatação continuam aceitas (`(a+b)/2` ≡ `( a + b ) / 2`); a normalização só toca trechos fora de aspas.
- [x] T155 [test][jsdom] `scripts/test-lesson-dom.mjs`: casos de colapso, espaço entre palavras, preservação de aspas e **respostas erradas que antes passavam** (`notx` vs `not x`, `aandb` vs `a and b`, `print("ab")` vs `print("a b")`); clicar "Verificar" 3× verifica **uma única vez** (guard `answered`).
- [x] T156 [fix][xp] XP **concedido uma única vez por exercício**: novo `calculateExerciseXP({ exercise, previous, isCorrect, streak })` em `src/gamification/xp.js`, usado no callback de XP do `src/app.js`. 1ª resposta correta = base + bônus de 1ª vez + streak; acerto depois de erro = valor reduzido (retry); **acertar de novo um exercício já creditado (`correct` ou `xp_earned > 0`) = 0**. `scripts/test-core.mjs` cobre os 4 casos (72 asserções).
- [x] T157 [docs] `docs/CONTENT_MODEL.md` atualizado com a regra de normalização conservadora; `STATUS.md` com a Fase 21.
- **Regra anterior (divergente)**: o XP era concedido a **cada** resposta correta; qualquer tentativa após a 1ª valia o "retry" (metade da base + bônus de streak) — repetir o mesmo exercício rendia XP indefinidamente ("farmar").
- **Regra da spec**: o XP do exercício é concedido **uma única vez**; a repetição vale menos ou zero (`spec.md`: "ao acertar: XP"; "ao errar: sem vidas, pode tentar de novo com XP reduzido"; SRS com XP reduzido). **Divergiam** → corrigido: a repetição de um exercício já creditado agora vale **0**.
- **"+27"**: `ex-sem1-algorithms-m01-l02-code` tem `xp_base: 20`; na 1ª resposta correta o app somou **+5** (bônus de 1ª vez) e **+2** (bônus de streak: 1 dia × 2 XP) → **27**. Com a correção, re-responder esse exercício passa a valer **0**.
- Verificação: `npm test` verde (**17 suítes**; 72 asserções no core) e `npm run validate` sem erros.

---

## Phase 21: Pipeline de conteúdo (2026-10-19)

**Purpose**: criar a pipeline repetível de conteúdo **por módulo** (teoria, exercícios, desafio, flashcards e biblioteca), sem gerar conteúdo de módulo nesta fase. A Fase 21 histórica (normalização/XP) permanece registrada acima; os IDs abaixo continuam a numeração em **T158** para não colidir. Referência: `docs/CONTENT_PIPELINE.md`.

- [x] T158 [docs][pipeline] Criar `docs/CONTENT_PIPELINE.md` com as regras invioláveis, etapas E0–E7 e regras dos exercícios (texto aprovado, sem alterações).
- [x] T159 [feat][schema] Adicionar `objective_id`, `level`, `source_ref` e `answer_check` ao `data/exercises/_schema.json` e `new_terms`/`sections` ao `data/theory/_schema.json`; `scripts/validate.mjs` exige os quatro campos de exercício **somente** em módulos com `"pipeline_version": 1` (módulos antigos seguem válidos).
- [x] T160 [feat][tooling] Criar `scripts/check-module.mjs` + `npm run check-module -- <id>`: falha em objetivo sem 2 exercícios em níveis diferentes, lição fora de 5–7 / >1 difícil / 1º não fácil / >2 tipos seguidos, difícil na lição 1, desafio ≠ 8, flashcards fora de 8–12, unidade fora de 300–900 palavras / >3 termos novos / <3 exercícios ligados, `source_ref` inexistente, `answer_check` ausente, termo novo sem glossário e padrões de placeholder.
- [x] T161 [test][pipeline] Criar `scripts/test-check-module.mjs` (em `npm test`) com módulo de controle válido e exemplos ruins que confirmam **cada** rejeição do check-module.
- [x] T162 [docs][command] Criar `.opencode/commands/content-module.md` (formato de comando do opencode com `$ARGUMENTS`) que lê `docs/CONTENT_PIPELINE.md`, resolve o id e executa E0–E7; lista os ids de módulo do `data/curriculum.json`.
- [x] T163 [spec][acceptance] Acrescentar à `.specify/spec.md` o critério **AC-16**: um módulo só recebe `pipeline_version: 1` depois que `check-module`, `validate`, `test` e `verify-sources` passam.
- [x] T164 [content-module] `sem1-algorithms-m01` — executar E0–E7 (PLAN → SOURCES → teoria → REVIEW → exercícios/desafio/flashcards → biblioteca/glossário → portões → fechamento).
- [x] T165 [content-module] `sem1-algorithms-m02` — executar E0–E7.
- [ ] T166 [content-module] `sem1-algorithms-m03` — executar E0–E7.
- [ ] T167 [content-module] `sem1-discrete-math-m01` — executar E0–E7.
- [ ] T168 [content-module] `sem1-discrete-math-m02` — executar E0–E7.
- [ ] T169 [content-module] `sem1-discrete-math-m03` — executar E0–E7.

### Tarefa-modelo por módulo (repetir para cada id acima)

Para cada módulo, em uma sessão e um commit:

1. [ ] **E0** `docs/modules/<id>/PLAN.md` com 4–6 objetivos `OBJ-n`, pré-requisitos, mapa objetivo → seção/edição/licença, 3–4 lições e fora de escopo. No piloto, parar e pedir aprovação.
2. [ ] **E1** `docs/modules/<id>/SOURCES.md` com URL, edição, data de acesso, licença confirmada e trechos literais.
3. [ ] **E2** unidades em `data/theory/` (300–700 palavras, até 900; estrutura fixa; ≤3 termos novos; `original_excerpt` literal).
4. [ ] **E3** `docs/modules/<id>/REVIEW.md` (afirmação | seção | trecho de apoio | ok/sem suporte).
5. [ ] **E4** exercícios de lição (5–7), `{módulo}-challenge.json` (8) e `{módulo}-flashcards.json` (8–12), todos com `objective_id`, `level`, `source_ref` e `answer_check`.
6. [ ] **E5** ordem de leitura/tempo, "praticar este trecho" e termos novos no `data/glossary.json`.
7. [ ] **E6** `npm run check-module -- <id>`, `npm run validate`, `npm test`, `npm run verify-sources` — todos verdes.
8. [ ] **E7** atualizar `tasks.md`/`STATUS.md`, marcar `"pipeline_version": 1` **só neste módulo**, commit do módulo, hash e pendências.

**Regra de promoção**: nenhum módulo recebe `pipeline_version: 1` antes dos quatro portões do E6 passarem. Quando os 6 módulos do MVP estiverem refeitos, a exigência dos novos campos passa a valer para todo módulo.

---

## Conclusão T164 — sem1-algorithms-m01 (2026-10-19)

**Pipeline E0–E7 concluída** para o módulo piloto sem1-algorithms-m01 (Introdução a Algoritmos).

- **E0:** `docs/modules/sem1-algorithms-m01/PLAN.md` aprovado com 8 objetivos, 4 lições e 4 unidades teóricas planejadas.
- **E1:** `SOURCES.md` com as 4 URLs de capítulo abertas em 2026-10-19, edição 2ª (2018), licença CC BY-SA 4.0 declarada na página do livro (com "exceto onde indicado") e trechos literais.
- **E2:** 4 unidades novas em `data/theory/sem1/algorithms/` (program-design, pseudocode, flowcharts, structured-programming); a unidade antiga `th-sem1-algorithms-m01-intro` e os 3 arquivos antigos de exercício foram removidos.
- **E3:** `REVIEW.md` com 47 afirmações sustentadas, 3 aplicações diretas e 2 itens sem suporte rotulados como "Exemplo adicional (IA)".
- **E4:** 24 exercícios de lição (6 por lição), 8 no desafio e 10 flashcards; somente pseudocódigo/fluxograma, sem linguagem de programação; todos com `objective_id`, `level`, `source_ref` e `answer_check`.
- **E5:** 9 termos novos no `data/glossary.json`; `LIBRARY.md` com ordem de leitura, tempos estimados e mapeamento "praticar este trecho". O loader passou a aceitar `theories` (múltiplas unidades por módulo) e a escolher a unidade pela lição.
- **E6:** os quatro portões passaram:
  - `npm run check-module -- sem1-algorithms-m01` ✅
  - `npm run validate` ✅ (sem erros nem avisos)
  - `npm test` ✅ (18 suítes; 9 unidades, 19 lições, 96 exercícios de lição)
  - `npm run verify-sources` ✅ (9/9 unidades conferem)
- **E7:** módulo marcado com `"pipeline_version": 1` **somente após** os portões; um commit do módulo; nenhuma pendência de conteúdo.

**Decisão de ID:** a 4ª lição usa `l19` porque `l04`–`l18` já pertencem a outros módulos do semestre; a ordem didática do módulo continua 1ª–4ª.

---

## Conclusão T165 — sem1-algorithms-m02 (2026-10-19)

**Pipeline E0–E7 concluída** para o módulo sem1-algorithms-m02 (Variáveis e Tipos).

- **E0:** `docs/modules/sem1-algorithms-m02/PLAN.md` com 6 objetivos, 3 lições e 5 unidades teóricas planejadas; módulo não piloto, sem pausa de aprovação.
- **E1:** `SOURCES.md` com as 6 URLs de capítulo abertas em 2026-10-19, edição 2ª (2018), licença CC BY-SA 4.0 confirmada no rodapé dos capítulos e trechos literais.
- **E2:** 5 unidades novas em `data/theory/sem1/algorithms/` (constants-variables, identifier-names, data-types, expressions-operators, integer-division-modulus); a unidade antiga `th-sem1-algorithms-m02-variables` foi removida (regra 5).
- **E3:** `REVIEW.md` com as afirmações do módulo confrontadas com os trechos das fontes e itens sem suporte rotulados como exemplo adicional.
- **E4:** 18 exercícios de lição (6 por lição; lição 1 sem difícil), 8 no desafio (2 fáceis/4 médios/2 difíceis) e 12 flashcards; pseudocódigo neutro, sem sintaxe de linguagem; todos com `objective_id`, `level`, `source_ref` e `answer_check`.
- **E5:** 13 termos novos no `data/glossary.json`; `LIBRARY.md` com ordem de leitura, tempos estimados e mapeamento "praticar este trecho".
- **E6:** os quatro portões passaram:
  - `npm run check-module -- sem1-algorithms-m02` ✅
  - `npm run validate` ✅ (sem erros nem avisos)
  - `npm test` ✅ (18 suítes; 13 unidades, 19 lições, 99 exercícios de lição)
  - `npm run verify-sources` ✅ (13/13 unidades conferem)
- **E7:** módulo marcado com `"pipeline_version": 1` **somente após** os portões; um commit do módulo; nenhuma pendência de conteúdo.

**Decisão de escopo:** o módulo usa apenas pseudocódigo neutro e mantém fora de escopo sintaxe de linguagens, conversão de tipos, operadores relacionais/lógicos e escopo de variáveis.

---

## Phase 23: Embaralhamento determinístico das alternativas (2026-10-19)

**Purpose**: embaralhar a ordem das alternativas apenas na exibição, mantendo a identidade da resposta e a ordem dos arquivos de dados.

- [x] T170 [feat][lesson] `src/lesson/option-shuffle.js` + `src/lesson/exercise-types/multiple-choice.js`: permutação determinística por (id do exercício, tentativa); `data-original-index`/`value` guardam o índice original; a correção compara a identidade; letras, DOM, teclado (1–9/Enter) e ARIA seguem a ordem exibida. `src/app.js` passa `_attempt = attempts + 1`.
- [x] T171 [feat][schema] Opções dependentes de posição ("Todas as anteriores", "Nenhuma das anteriores", "Ambas", "A e B", "I, II e III") fixadas no fim; campo opcional `shuffle: false` em `data/exercises/_schema.json`, `scripts/validate.mjs` e `docs/CONTENT_MODEL.md`.
- [x] T172 [fix][tooling] `scripts/lib/module-rules.mjs`: removida a checagem de concentração da posição da resposta correta; mantida a checagem de "correta sistematicamente mais longa". `scripts/test-check-module.mjs` atualizado.
- [x] T173 [test][audit] Auditoria dos 68 exercícios de múltipla escolha (0 dependentes de posição, 0 referências a letras/posições em enunciados/explicações). Novo `scripts/test-multiple-choice-dom.mjs` cobre todos os exercícios × tentativas, estabilidade, opções fixas, `shuffle:false`, teclado/ARIA e 1000 tentativas com cada posição entre 15% e 35%. `npm test` (19 suítes) e `npm run validate` verdes no patch isolado.
