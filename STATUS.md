# Status do Projeto — Ensina Lógica

**Última atualização**: 2026-10-15

---

## ✅ O que já foi feito

### Spec Kit & Documentação Base
- Constitution (`.specify/constitution.md`) — princípios fundamentais definidos
- Spec (`.specify/spec.md`) — especificação completa do produto (MVP, user journeys, critérios de aceitação)
- Plan (`.specify/plan.md`) — plano técnico detalhado (stack, estrutura, schemas, algoritmos, CI/CD, fontes aprovadas)
- Tasks (`.specify/tasks.md`) — lista de 100 tarefas organizadas por 11 fases e 8 user stories

### Estrutura de Pastas Criada
```
ensina-logica/
├── .github/workflows/          # deploy-pages.yml, validate.yml
├── .specify/                   # constitution, spec, plan, tasks
├── lib/katex/                  # (vazio - aguardando download)
├── lib/highlightjs/            # (vazio - aguardando download)
├── locales/pt-BR.json          # ✅ Completo - todas as strings da interface
├── data/
│   ├── curriculum.json         # ✅ Completo - mapa 8 semestres
│   ├── theory/sem1/algorithms/ # (vazio - aguardando conteúdo)
│   ├── theory/sem1/discrete-math/ # (vazio - aguardando conteúdo)
│   ├── theory/_schema.json     # ✅ Completo - JSON Schema unidades teóricas
│   ├── exercises/sem1/algorithms/ # (vazio - aguardando conteúdo)
│   ├── exercises/sem1/discrete-math/ # (vazio - aguardando conteúdo)
│   └── exercises/_schema.json  # ✅ Completo - JSON Schema exercícios
├── src/
│   ├── app.js                  # ✅ Completo - entry point, boot, router, store, theme
│   ├── router.js               # ✅ Completo - hash router com params/hooks
│   ├── i18n.js                 # ✅ Completo - loader + t(key, params)
│   ├── store/
│   │   ├── ProgressStore.js    # ✅ Completo - localStorage abstraction + schema migration
│   │   └── schema-version.js   # ✅ Completo - migrações v0→v1, validação
│   ├── gamification/
│   │   ├── xp.js               # ✅ Completo - XP, níveis, progresso
│   │   ├── streak.js           # ✅ Completo - streak + freeze semanal
│   │   ├── achievements.js     # ✅ Completo - 18 badges com critérios
│   │   └── srs.js              # ✅ Completo - intervalos 1/3/7/21
│   ├── curriculum/
│   │   ├── loader.js           # ✅ Completo - carrega curriculum/theory/exercises
│   │   ├── unlock.js           # ✅ Completo - lógica de desbloqueio linear/livre
│   │   └── progress.js         # ✅ Completo - marca lição/módulo, calcula %
│   ├── theory/                 # (pendente: renderer, sidebar, annotations, search)
│   ├── lesson/                 # (pendente: renderer, 5 exercise types, feedback)
│   └── ui/
│       ├── theme.css           # ✅ Completo - light/dark, a11y, reduced-motion, toasts, modals
│       ├── theme.js            # ✅ Completo - theme toggle + prefers-color-scheme
│       ├── toasts.js           # ✅ Completo - notificações não-intrusivas
│       ├── modals.js           # ✅ Completo - modais acessíveis (ARIA)
│       └── a11y.js             # ✅ Completo - skip links, live regions, reduced-motion
├── scripts/
│   ├── validate.mjs            # ✅ Completo - validação CI (curriculum, theory, exercises, licenses)
│   ├── test-core.mjs           # ✅ Completo - testes puros (XP, streak, SRS, unlock, progress)
│   └── download-libs.mjs       # ✅ Completo - baixa KaTeX/highlight.js para lib/
├── index.html                  # ✅ Completo - shell com header, main, footer, skip links
├── 404.html                    # ✅ Completo - SPA redirect para GitHub Pages
├── .nojekyll                   # ✅ Criado
├── favicon.svg                 # ✅ Criado
├── package.json                # ✅ Completo - scripts validate/test/download-libs
├── .gitignore                  # ✅ Completo
├── .editorconfig               # ✅ Completo
├── README.md                   # ✅ Completo - pt-BR com instruções
├── LICENSE                     # ✅ MIT
├── CONTENT_LICENSE.md          # ✅ CC BY-SA 4.0 + regra prevalência fonte
├── ATTRIBUTIONS.md             # ✅ Fontes aprovadas + libs terceiras documentadas
├── CONTRIBUTING.md             # ✅ Completo
├── CODE_OF_CONDUCT.md          # ✅ Completo (Contributor Covenant 2.1)
├── SECURITY.md                 # ✅ Completo
└── CHANGELOG.md                # ✅ Iniciado (unreleased)
```

### Código Implementado (Fases 1-2 COMPLETO)
- **Fase 1 (Setup)**: Estrutura, package.json, .gitignore, .editorconfig, .nojekyll, 404.html, index.html, favicon, README, licenças, atribuições, contributing, code of conduct, security, changelog, locales/pt-BR.json ✅
- **Fase 2 (Foundational)**: router.js, i18n.js, ProgressStore.js, schema-version.js, xp.js, streak.js, achievements.js, srs.js, theme.css, app.js, curriculum/loader.js, unlock.js, progress.js, data/curriculum.json, data/theory/_schema.json, data/exercises/_schema.json, scripts/validate.mjs, scripts/test-core.mjs, scripts/download-libs.mjs, .github/workflows/validate.yml, .github/workflows/deploy-pages.yml, src/ui/theme.js, toasts.js, modals.js, a11y.js ✅

---

## ⏳ O que está pendente

### Fase 3: US1 - Onboarding & Semester View
- [ ] Views: dashboard (#/), semester (#/semester/:semId) — **parcial: app.js tem renderDashboard/renderSemesterView placeholders**
- [ ] Wire navigation, persist daily_goal — **parcial: app.js tem navegação básica**

### Fase 4: US2 - Discipline & Module Navigation
- [ ] Views: discipline, module com lock icons — **parcial: app.js tem renderDisciplineView/renderModuleView placeholders**
- [ ] Unlock logic implementado ✅ (src/curriculum/unlock.js)

### Fase 5: US3 - Lesson & Exercises (Core MVP)
- [ ] `src/lesson/renderer.js` + 5 exercise types + feedback.js
- [ ] View: lesson (#/lesson/:lessonId) — **parcial: app.js tem renderLessonView placeholder**
- [ ] XP calculation, SRS scheduling, persist attempts ✅ (módulos gamification prontos)

### Fase 6: US4 - Theory Library (Core MVP)
- [ ] `src/theory/renderer.js` (KaTeX, highlight.js, atribuição, ver original)
- [ ] `src/theory/sidebar.js`, `annotations.js`, `search.js`
- [ ] Views: theory (#/theory/:id), library index (#/library) — **parcial: app.js tem placeholders**

### Fase 7: US5 - Gamification Dashboard & Settings
- [ ] Dashboard enhanced: XP bar, level, streak, achievements gallery — **parcial: app.js tem dashboard UI**
- [ ] Settings: daily goal, theme, export/import/reset progress — **parcial: app.js tem renderSettingsView**
- [ ] Confetti (CSS, respects reduced-motion)

### Fase 8: US6 - 1º Semestre Conteúdo (Data only)
- [ ] 6 theory units (3 algorithms + 3 discrete-math) com front-matter válido
- [ ] Exercícios para todas as lições (3-5 cada, generated_by_ai: true, verified)
- [ ] ATTRIBUTIONS.md atualizado
- [ ] validate.mjs passa

### Fase 9: US7 - Acessibilidade & Privacidade
- [ ] Auditoria completa: focus, tab order, skip links, contraste AA
- [ ] Zero external requests verification

### Fase 10: US8 - Deploy & Repo Files
- [ ] Validar workflows, 404.html redirect, todos arquivos Definition of Done
- [ ] Publication checklist

### Fase 11: Polish
- [ ] Documentation, cleanup, performance, edge case tests, security hardening

---

## 🎯 Próxima Etapa

**Iniciar Fase 3 (US1 - Onboarding & Semester View)** — completar as views do dashboard e semestre:
1. Finalizar `renderDashboard` em `src/app.js` (já tem base)
2. Finalizar `renderSemesterView` em `src/app.js` (já tem base)
3. Implementar navegação completa e persistência de `daily_goal`
4. Testar fluxo: boas-vindas → meta diária → semestre → disciplina

---

## 📚 Decisões de Fontes Aprovadas (conforme `.specify/plan.md` Seção 9)

### ✅ Aprovadas para Derivação (cópia, tradução, adaptação permitidas)

| # | Fonte | Disciplina/Cobertura | Edição/Versão | Licença | URL Licença | Data Conferência | Restrições |
|---|-------|---------------------|---------------|---------|-------------|------------------|------------|
| 1 | **Mathematics for Computer Science** (Lehman, Leighton, Meyer) | Matemática Discreta: lógica, provas, indução, grafos, probabilidade, teoria dos números | Spring 2018 (MIT 6.042) — **somente esta edição** | **CC BY-SA 3.0** | https://courses.csail.mit.edu/6.042/spring18/mcs.pdf (front matter) | 2026-10-15 | Usar só esta edição; OCW 2015 e LibreTexts são NC |
| 8 | **Discrete Mathematics: An Open Introduction** (Oscar Levin) | Matemática Discreta: lógica, conjuntos, funções, contagem, grafos, provas | **3ª edição** (2019) — **não usar 4ª (NC)** | **CC BY-SA 4.0** | https://discrete.openmathbooks.org/ (rodapé "License") | 2026-10-15 | 3ª ed. apenas |
| 10 | **Programming Fundamentals** (Busbee & Braunschweig) | Algoritmos e Lógica: variáveis, controle, funções, pseudocode, flowcharts | **2ª edição** (2018), Rebus/Pressbooks | **CC BY-SA 4.0** | https://press.rebus.community/programmingfundamentals/front-matter/preface/ | 2026-10-15 | Conferir licença por capítulo/imagem — "exceto onde indicado" |
| 12 | **An Open Guide to Data Structures and Algorithms** (Bible & Moser) | Algoritmos: **somente capítulo Big-O/complexidade** no MVP | **1ª edição** (2023), PALNI Press | **CC BY 4.0** | https://pressbooks.palni.org/anopenguidetodatastructuresandalgorithms/ (rodapé) | 2026-10-15 | MVP: só Big-O; demais → 2º sem |

### ⚠️ Só Link "Leitura Recomendada" (licença não permissiva para derivação)

| # | Fonte | Licença | Motivo |
|---|-------|---------|--------|
| 4 | OpenStax Introduction to Python Programming | CC BY-NC-SA 4.0 | NC (não comercial) |
| 5 | How to Think Like a Computer Scientist (Runestone) | GNU FDL | Não CC BY-SA |
| 6 | MIT 6.0001 (OCW) | CC BY-NC-SA 4.0 | NC (não comercial) |
| 7 | CS50 (Harvard) | Licença custom | Não permissiva |
| 9 | Book of Proof (Hammack) | CC BY-ND 4.0 | ND (sem derivações) |
| 11 | Computer Science 20 — Saskatchewan | CC BY-SA 4.0 declarada | Nível introdutório, licença a confirmar na página do livro |

### 📅 Fora do MVP (semestres posteriores, licenças a confirmar)

| # | Fonte | Semestre Alvo | Licença (a confirmar) | Observação |
|---|-------|---------------|----------------------|------------|
| 2 | Open Data Structures (Pat Morin) | 2º sem (Estruturas de Dados I) | CC BY 2.5 Canadá | Confirmar em opendatastructures.org |
| 3 | Algorithms (Jeff Erickson) | 4º sem (Projeto e Análise) | CC BY 4.0 (livro 2019) / CC BY-NC-SA 4.0 (notas site) | Separar livro das notas |
| 13 | Algorithms and Data Structures With Applications to Graphics and Geometry | Fora do MVP | CC BY 3.0 (confirmar) | Global Text Project / ecampusontario.ca |

---

## 📝 Observações Importantes

1. **Lista de fontes aprovadas**: Salva em **`.specify/plan.md` (Seção 9)** e replicada em **`ATTRIBUTIONS.md`** com detalhes completos (URL da licença, data de conferência, restrições, unidades derivadas mapeadas).

2. **Regra de validação**: `scripts/validate.mjs` (a criar) deve rejeitar qualquer unidade teórica cuja `source.license` não esteja em `ALLOWED_LICENSES = ['CC0-1.0', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0']` e `FORBIDDEN_LICENSES = ['CC-BY-NC-*', 'CC-BY-ND-*', 'GFDL-1.3', 'MIT-OCW-NC-SA']`.

3. **Constitution §2**: Nenhum texto teórico inventado. Se fonte não acessada → unidade fica `verification_status: "unverified"` e não aparece na trilha (só no mapa como "em construção").

4. **Constitution §8**: Bibliotecas terceiras **apenas se essenciais**, hospedadas localmente, versão fixa, creditadas em ATTRIBUTIONS.md. KaTeX 0.16.9 (MIT) e highlight.js 11.9.0 (BSD-3) já definidos no Plan.

5. **Stack**: Vanilla ES Modules, hash routing (#/), localStorage + ProgressStore abstraction, KaTeX + highlight.js local, GitHub Pages deploy via Actions.

6. **Commits**: Fase atual = "Setup + Foundational core". Próximo commit será "feat: foundational core modules (router, store, gamification, i18n, theme)".

---

## 🔄 Próximos Commits Planejados

| Fase | Commit Sugerido |
|------|-----------------|
| Setup completo | `chore: project structure, configs, docs, licenses, i18n` |
| Foundational core | `feat: core modules (router, store, gamification, i18n, theme)` |
| Foundational data/CI | `feat: curriculum schemas, validation, tests, CI/CD, lib downloads` |
| US1 Onboarding | `feat: onboarding, dashboard, semester view` |
| US2 Navigation | `feat: discipline/module navigation with unlock logic` |
| US3 Lessons | `feat: lesson renderer + 5 exercise types + feedback` |
| US4 Theory | `feat: theory library with sidebar, annotations, search, ver original` |
| US5 Gamification UI | `feat: achievements gallery, settings, export/import, confetti` |
| US6 Content | `content: 1st semester theory units + exercises (6 modules)` |
| US7 A11y/Privacy | `fix: accessibility audit, contrast, reduced-motion, zero external` |
| US8 Deploy | `ci: validate workflows, 404 redirect, repo files checklist` |
| Polish | `chore: cleanup, docs, performance, edge case tests` |