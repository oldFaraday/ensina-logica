---

description: "Task list template for feature implementation"
---

# Tasks: ensina-logica

**Input**: Design documents from `.specify/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

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

- [ ] T001 Create project folder structure per plan.md (lib/, locales/, data/, src/, scripts/, .github/workflows/)
- [ ] T002 Create package.json with Node scripts (validate, test, download-libs)
- [ ] T003 [P] Create .gitignore, .editorconfig, .nojekyll, 404.html
- [ ] T004 [P] Create favicon.svg and meta tags (Open Graph) in index.html shell
- [ ] T005 Create index.html shell with header, main, footer, ES module scripts
- [ ] T006 [P] Create locales/pt-BR.json with all UI strings (i18n ready)
- [ ] T007 [P] Create README.md (pt-BR): what is, screenshots, how to run, publish to Pages, folder structure, how to add content, scope notice, licenses, contribute
- [ ] T008 [P] Create LICENSE (MIT), CONTENT_LICENSE.md (CC BY-SA 4.0 + source precedence), ATTRIBUTIONS.md (sources + libs), CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Download KaTeX 0.16.9 (JS, CSS, .woff2 fonts) to lib/katex/ via scripts/download-libs.mjs
- [ ] T010 Download highlight.js 11.9.0 (JS, themes) to lib/highlightjs/ via scripts/download-libs.mjs
- [ ] T011 Create src/i18n.js — load locale, `t(key, params)` helper
- [ ] T012 Create src/router.js — hash-based router (`#/`) with route params
- [ ] T013 Create src/store/ProgressStore.js — localStorage abstraction with schema_version migration
- [ ] T014 Create src/store/schema-version.js — migration logic for progress schema
- [ ] T015 Create src/app.js — entry point: boot, router init, store init, theme init
- [ ] T016 Create data/curriculum.json — full 8-semester map (sem1 complete, sem2-8 "coming-soon")
- [ ] T017 Create data/theory/_schema.json — JSON Schema for theory unit front-matter validation
- [ ] T018 Create data/exercises/_schema.json — JSON Schema for exercise validation
- [ ] T019 Create scripts/validate.mjs — CI validation: curriculum schema, theory units (license, source URL HEAD, verification_status), exercises (theory_unit_id exists, generated_by_ai, code-completion has test_command), internal links, licenses, ATTRIBUTIONS.md sync, progress schema_version
- [ ] T020 Create scripts/test-core.mjs — pure logic tests: XP, streak, SRS, unlock, ProgressStore (save/load, export/import round-trip, migration)
- [ ] T021 Create .github/workflows/validate.yml — runs validate + test on push/PR
- [ ] T022 Create .github/workflows/deploy-pages.yml — deploy to GitHub Pages on push to main

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Onboarding & Semester View (Priority: P1) 🎯 MVP

**Goal**: User opens app, sees welcome screen with scope notice, picks daily XP goal, sees 1st semester with 2 disciplines

**Independent Test**: Open index.html → welcome modal shows, goal selector works, semester 1 card renders with 2 discipline cards

### Implementation for User Story 1

- [ ] T023 [US1] Create src/ui/theme.js — light/dark toggle, persists to localStorage, respects prefers-color-scheme
- [ ] T024 [US1] Create src/ui/a11y.js — skip links, focus trap, live regions, visible focus styles
- [ ] T025 [US1] Create src/ui/toasts.js — non-intrusive notifications (XP, streak, achievements)
- [ ] T026 [US1] Create src/ui/modals.js — accessible modals (ARIA), used for welcome & settings
- [ ] T027 [US1] Create src/curriculum/loader.js — loads curriculum.json + theory + exercises (async, cached)
- [ ] T028 [US1] Create src/curriculum/unlock.js — linear within discipline, free across disciplines same semester
- [ ] T029 [US1] Create src/curriculum/progress.js — mark lesson/module complete, calculate % semester
- [ ] T030 [US1] Create src/gamification/xp.js — BASE_XP=10, first-time +5, retry 50%, streak bonus min(streak,10)*2, level = floor(sqrt(xp/1000))+1
- [ ] T031 [US1] Create src/gamification/streak.js — daily streak, weekly freeze (1/week, auto-use, resets Monday)
- [ ] T032 [US1] Create src/gamification/achievements.js — badges: first-lesson, streak-7, module-1, 100-exercises, first-note, exported-progress
- [ ] T033 [US1] Create src/gamification/srs.js — intervals [1,3,7,21] days, schedule on lesson complete, due reviews filter
- [ ] T034 [US1] Create view: dashboard (#/) — welcome, daily goal selector (10/20/30/50), streak, XP, level, today's reviews, semester card
- [ ] T035 [US1] Create view: semester (#/semester/:semId) — discipline cards, sem2-8 show "Em breve" disabled
- [ ] T036 [US1] Wire dashboard → semester navigation, persist daily_goal to preferences

---

## Phase 4: User Story 2 - Discipline & Module Navigation (Priority: P1)

**Goal**: Navigate semester → discipline → module → lesson list with linear unlock per discipline

**Independent Test**: Click discipline → module list shows, module 1 unlocked, module 2 locked until module 1 lessons done

### Implementation for User Story 2

- [ ] T037 [US2] Create view: discipline (#/semester/:semId/discipline/:discId) — module list with lock icons
- [ ] T038 [US2] Create view: module (#/semester/:semId/discipline/:discId/module/:modId) — lesson list with completion status
- [ ] T039 [US2] Implement unlock logic in unlock.js: module 0 always open, module N requires all lessons in module N-1 completed
- [ ] T040 [US2] Show progress rings/bars per module and discipline
- [ ] T041 [US2] Persist completed lessons to ProgressStore, update UI reactively

---

## Phase 5: User Story 3 - Lesson & Exercises (Priority: P1) 🎯 MVP

**Goal**: Lesson screen with theory summary + 3-5 exercises (multiple types), immediate feedback with icon+text+color, XP award

**Independent Test**: Open lesson → shows summary + 3-5 exercises → answer → feedback shows icon+text+color + explanation → XP added → streak updated

### Tests for User Story 3 (OPTIONAL - only if tests requested)

- [ ] T042 [P] [US3] Unit test: multiple-choice exercise rendering + feedback
- [ ] T043 [P] [US3] Unit test: true-false exercise rendering + feedback
- [ ] T044 [P] [US3] Unit test: order-steps exercise rendering + feedback
- [ ] T045 [P] [US3] Unit test: code-completion exercise rendering + feedback
- [ ] T046 [P] [US3] Unit test: flashcards exercise rendering + feedback

### Implementation for User Story 3

- [ ] T047 [US3] Create src/lesson/renderer.js — renders lesson: theory summary + exercise list
- [ ] T048 [US3] Create src/lesson/exercise-types/multiple-choice.js — radio options, single correct, explanation
- [ ] T049 [US3] Create src/lesson/exercise-types/true-false.js — two buttons, explanation
- [ ] T050 [US3] Create src/lesson/exercise-types/order-steps.js — drag-and-drop or up/down buttons, explanation
- [ ] T051 [US3] Create src/lesson/exercise-types/code-completion.js — textarea with highlight.js, "Run" button (node --check for JS), explanation
- [ ] T052 [US3] Create src/lesson/exercise-types/flashcards.js — flip card, mark known/unknown, spaced repetition
- [ ] T053 [US3] Create src/lesson/feedback.js — icon+text+color (never color only), ARIA live for XP/streak/achievement
- [ ] T054 [US3] Create view: lesson (#/lesson/:lessonId) — loads lesson data, renders exercises sequentially
- [ ] T055 [US3] Implement XP calculation on correct answer (first try bonus, retry penalty, streak bonus)
- [ ] T056 [US3] Implement "Praticar mais" → opens extra exercises from same theory unit (SRS queue)
- [ ] T057 [US3] Persist exercise attempts (correct/incorrect/tentatives/xp_earned) to ProgressStore
- [ ] T058 [US3] Schedule SRS review on lesson complete (intervals 1→3→7→21 days)

---

## Phase 6: User Story 4 - Theory Library (Priority: P1) 🎯 MVP

**Goal**: Clean reading view with sidebar index, mark section read, annotations per section, full-text search, attribution header, "ver original" toggle, "praticar este trecho" button

**Independent Test**: Open theory unit → sidebar navigable → checkbox per section → textarea per section saves to localStorage → search finds text → attribution shows source/license → "ver original" shows side-by-side (if license allows) → "praticar" links to lessons

### Implementation for User Story 4

- [ ] T059 [US4] Create src/theory/renderer.js — renders theory markdown with KaTeX, highlight.js, attribution header, "ver original" toggle
- [ ] T060 [US4] Create src/theory/sidebar.js — collapsible module→section index, keyboard navigable, highlights current section
- [ ] T061 [US4] Create src/theory/annotations.js — CRUD per section (section-id → text), persists to localStorage
- [ ] T062 [US4] Create src/theory/search.js — in-memory full-text index (title, content, metadata), results with snippet highlight
- [ ] T063 [US4] Create view: theory (#/theory/:theoryUnitId) — loads unit, renders with sidebar, annotations, search
- [ ] T064 [US4] Create view: library index (#/library) — search input, all semesters expandable, filter by discipline
- [ ] T065 [US4] Implement "Ver original" — side-by-side original/translation when license permits (CC BY/CC BY-SA)
- [ ] T066 [US4] Implement "Praticar este trecho" — lists linked lessons/exercises, navigates to lesson
- [ ] T067 [US4] Persist "section read" checkboxes to ProgressStore.completed.theory_sections

---

## Phase 7: User Story 5 - Gamification Dashboard & Settings (Priority: P2)

**Goal**: Dashboard shows XP bar, level, streak with freeze counter, achievements gallery, daily goal progress with toast on complete, confetti (respects reduced-motion)

**Independent Test**: Complete exercises → XP bar fills → level up toast → streak increments → freeze shows 1/week → achievement unlocks toast → daily goal reached toast + confetti

### Implementation for User Story 5

- [ ] T068 [US5] Enhance dashboard: XP progress bar to next level, level badge, streak counter with freeze icon
- [ ] T069 [US5] Create view: achievements (#/achievements) — grid of badges, locked/unlocked state, criteria tooltip
- [ ] T070 [US5] Create view: settings (#/settings) — daily goal picker, theme toggle, export/import/reset progress
- [ ] T071 [US5] Implement export progress → downloads JSON with schema_version, timestamp
- [ ] T072 [US5] Implement import progress → validates schema_version, migrates if needed, overwrites localStorage
- [ ] T073 [US5] Implement reset progress → clears stats/completed/exercises/srs/achievements/annotations, keeps preferences
- [ ] T074 [US5] Confetti animation on daily goal reached (CSS only, respects prefers-reduced-motion)
- [ ] T075 [US5] ARIA live regions for: XP gain, streak change, achievement unlock, daily goal reached

---

## Phase 8: User Story 6 - 1st Semester Content (Priority: P1) 🎯 MVP

**Goal**: 2 disciplines × 3 modules each = 6 modules. Each module: ≥1 theory unit, 3-5 lessons, flashcards. Content from approved sources only.

**Independent Test**: All 6 modules load → each has theory unit with valid front-matter → each lesson has 3-5 exercises → exercises link to theory unit → sources in ATTRIBUTIONS.md

### Content Creation (Data Files Only - No Code)

- [ ] T076 [P] [US6] Create theory units for Algorithms (sem1/algorithms/): m01-intro.md, m02-variables.md, m03-control-flow.md (from approved sources: Busbee & Braunschweig 2nd ed, Open Guide to Data Structures Ch. Big-O)
- [ ] T077 [P] [US6] Create theory units for Discrete Math (sem1/discrete-math/): m01-logic.md, m02-predicate-logic.md, m03-proofs-induction.md (from approved sources: MCS Spring 2018, Levin 3rd ed)
- [ ] T078 [P] [US6] Create exercises for Algorithms lessons (3-5 per lesson, types varied, generated_by_ai: true, verified against source)
- [ ] T079 [P] [US6] Create exercises for Discrete Math lessons (3-5 per lesson, types varied, generated_by_ai: true, verified against source)
- [ ] T080 [US6] Update ATTRIBUTIONS.md with all theory unit sources + KaTeX + highlight.js
- [ ] T081 [US6] Run scripts/validate.mjs — confirm all theory units pass (license allowed, source URL accessible, verification_status=verified_with_source)

---

## Phase 9: User Story 7 - Accessibility & Privacy Polish (Priority: P2)

**Goal**: 100% keyboard navigable, WCAG AA contrast, prefers-reduced-motion respected, zero cookies/analytics/external scripts

**Independent Test**: Tab through entire app → visible focus everywhere → no color-only states → animations off when reduced-motion → no network requests to external domains on load

### Implementation for User Story 7

- [ ] T082 [US7] Audit all interactive elements: focus styles, tab order, skip links at top of each view
- [ ] T083 [US7] Verify contrast ratios (WCAG AA) for all text/background combinations in light/dark themes
- [ ] T084 [US7] Ensure all state indicators use icon + text + color (never color only): ✅/❌, streak 🔥, XP ⭐
- [ ] T085 [US7] Test prefers-reduced-motion: confetti disabled, transitions instant, no auto-playing animations
- [ ] T086 [US7] Verify zero external requests: all libs local, no CDN, no analytics, no cookies
- [ ] T087 [US7] Add aria-live="polite" for XP/toasts, aria-live="assertive" for achievements/streak milestones

---

## Phase 10: User Story 8 - Deploy & Repository Files (Priority: P1) 🎯 MVP

**Goal**: GitHub Pages deploy works, all required repo files exist, validation runs on push/PR

**Independent Test**: Push to main → Actions runs validate → deploy → site loads at https://oldfaraday.github.io/ensina-logica/

### Implementation for User Story 8

- [ ] T088 [US8] Verify .github/workflows/validate.yml runs npm run validate && npm test
- [ ] T089 [US8] Verify .github/workflows/deploy-pages.yml uploads artifact and deploys
- [ ] T090 [US8] Test 404.html redirect to #/ works on Pages (SPA fallback)
- [ ] T091 [US8] Confirm all Definition of Done files exist: README.md, LICENSE, CONTENT_LICENSE.md, ATTRIBUTIONS.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md, .gitignore, .editorconfig, .nojekyll, 404.html, favicon.svg, package.json
- [ ] T092 [US8] Create publication checklist (pt-BR): create repo, push, enable Pages, verify URL

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T093 [P] Documentation updates: inline code comments, architecture decisions in docs/
- [ ] T094 Code cleanup: remove console.log, consistent naming, remove dead code
- [ ] T095 Performance: lazy-load theory/exercise data, memoize search index, debounce search input
- [ ] T096 [P] Additional unit tests for edge cases in gamification (streak freeze Monday reset, SRS interval cap, XP level boundaries)
- [ ] T097 Security hardening: CSP meta tag, sanitize any user-generated content (annotations)
- [ ] T098 Run full validation suite (scripts/validate.mjs) and fix any issues
- [ ] T099 Run full test suite (scripts/test-core.mjs) and ensure 100% pure function coverage
- [ ] T100 Final manual QA: complete user journey from welcome → lesson → theory → settings → export/import

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

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Content rule**: No theory text invented. If source not accessed → unit stays `pendente` (not in trail, only in map as "em construção")
- **License rule**: Only CC0, CC BY, CC BY-SA sources allowed for derivation. NC/ND/all-rights-reserved → only "Leitura recomendada" link
- **AI exercises**: Must link to theory unit, answer/explanation verified against source, marked "gerados por IA", code exercises tested before commit