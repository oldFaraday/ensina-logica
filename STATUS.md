# Status do Projeto — Ensina Lógica

**Última atualização**: 2026-10-16

---

## ✅ O que já foi feito

### Spec Kit & Documentação Base
- Constitution (`.specify/constitution.md`) — princípios fundamentais definidos
- Spec (`.specify/spec.md`) — especificação completa do produto (MVP, user journeys, critérios de aceitação)
- Plan (`.specify/plan.md`) — plano técnico detalhado (stack, estrutura, schemas, algoritmos, CI/CD, fontes aprovadas)
- Tasks (`.specify/tasks.md`) — 100 tarefas originais (11 fases, 8 user stories) + T101–T112 (correções fora do fluxo e verificação de conteúdo) + T113–T114 (Fundamentos visuais, Fase 4.5) + T115–T118 (correções do teste manual: modal/cliques, layout do topo, rota inicial, teste de interação) + T119 (tema escuro Opção B «Ameixa»); inclui **snapshot do progresso real** (2026-10-16)
- Design (`DESIGN.md`) — **identidade visual neo-brutalista** + catálogo de design tokens (fonte da verdade do CSS)

### Estrutura de Pastas Criada
```
ensina-logica/
├── .github/workflows/          # deploy-pages.yml, validate.yml
├── .specify/                   # constitution, spec, plan, tasks
├── lib/katex/                  # ✅ KaTeX 0.16.9 local (JS, CSS, fontes .woff2)
├── lib/highlightjs/            # ✅ highlight.js 11.9.0 local (JS, temas)
├── locales/pt-BR.json          # ✅ Completo - todas as strings da interface
├── data/
│   ├── curriculum.json         # ✅ Completo - mapa 8 semestres
│   ├── theory/sem1/algorithms/ # (0 arquivos - aguardando conteúdo)
│   ├── theory/sem1/discrete-math/ # (0 arquivos - aguardando conteúdo)
│   ├── theory/_schema.json     # ✅ Completo - JSON Schema unidades teóricas
│   ├── exercises/sem1/algorithms/ # (0 arquivos - aguardando conteúdo)
│   ├── exercises/sem1/discrete-math/ # (0 arquivos - aguardando conteúdo)
│   └── exercises/_schema.json  # ✅ Completo - JSON Schema exercícios
├── src/
│   ├── app.js                  # ✅ Completo - entry point, boot, router, store, theme
│   ├── router.js               # ✅ Completo - hash router com params/hooks
│   ├── i18n.js                 # ✅ Completo - loader + t(key, params)
│   ├── store/
│   │   ├── ProgressStore.js    # ✅ Completo - localStorage abstraction + schema migration
│   │   └── schema-version.js   # ✅ Completo - migrações v0→v1→v2, validação
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
│   ├── lesson/                 # (parcial: feedback + 3/5 tipos; falta renderer, code-completion, flashcards)
│   └── ui/
│       ├── theme.css           # ✅ Completo - tokens neo-brutalistas, light/dark, a11y, reduced-motion, toasts, modals
│       ├── theme.js            # ✅ Completo - theme toggle + prefers-color-scheme
│       ├── toasts.js           # ✅ Completo - notificações não-intrusivas
│       ├── modals.js           # ✅ Completo - modais acessíveis (ARIA)
│       └── a11y.js             # ✅ Completo - skip links, live regions, reduced-motion
├── scripts/
│   ├── validate.mjs            # ✅ Completo - validação CI (curriculum, theory, exercises, licenses, schema)
│   ├── test-core.mjs           # ✅ Completo - testes puros (XP, streak, SRS, unlock, progress, migração)
│   ├── test-imports.mjs        # ✅ Completo - importa todos os módulos de src/ (falha em erro)
│   ├── test-smoke.mjs          # ✅ Completo - smoke test do initApp (mock de DOM)
│   ├── test-dom.mjs            # ✅ Completo - integração jsdom (rota inicial #/ renderiza)
│   ├── test-i18n-dom.mjs       # ✅ Completo - integração jsdom (sem chaves de tradução cruas)
│   ├── test-onboarding-dom.mjs # ✅ Completo - integração jsdom (fluxo de boas-vindas/meta)
│   ├── test-contrast.mjs       # ✅ Completo - contraste WCAG AA dos design tokens (falha abaixo de AA)
│   ├── test-interaction-dom.mjs # ✅ Completo - cliques reais (jsdom): Continuar → semestre → disciplina → módulo, deep-link, guarda do overlay
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
├── AUDIT.md                    # ✅ Auditoria read-only (API do ProgressStore, 2026-10-16)
└── CHANGELOG.md                # ✅ Iniciado (unreleased)
```

### Código Implementado (Fases 1-4 COMPLETO)
- **Fase 1 (Setup)**: Estrutura, package.json, .gitignore, .editorconfig, .nojekyll, 404.html, index.html, favicon, README, licenças, atribuições, contributing, code of conduct, security, changelog, locales/pt-BR.json ✅
- **Fase 2 (Foundational)**: router.js, i18n.js, ProgressStore.js, schema-version.js, xp.js, streak.js, achievements.js, srs.js, theme.css, app.js, curriculum/loader.js, unlock.js, progress.js, data/curriculum.json, data/theory/_schema.json, data/exercises/_schema.json, scripts/validate.mjs, scripts/test-core.mjs, scripts/download-libs.mjs, .github/workflows/validate.yml, .github/workflows/deploy-pages.yml, src/ui/theme.js, toasts.js, modals.js, a11y.js ✅
- **Fase 3 (US1 - Onboarding & Semester View)**: renderDashboard, renderSemesterView, showWelcomeModal, bindDashboardEvents, updateDailyGoalUI, setDailyGoal, navegação completa, persistência daily_goal, locales completos, CSS completo para dashboard ✅
- **Fase 4 (US2 - Discipline & Module Navigation)**: renderDisciplineView, renderModuleView, navegação semestre→disciplina→módulo, lock icons, progress bars, lições com status ✅

### Correções e Testes (2026-10-16)
- **Bugfix rota inicial**: a área `<main>` ficava vazia porque `initA11y()` renomeava o id (`main` → `main-content`) antes de o router buscar por `getElementById('main')`. Router agora localiza `<main>` de forma robusta; a11y não renomeia mais o elemento nem duplica o skip link; toasts reutilizam o `#toast-container` do shell. Teste: `scripts/test-dom.mjs` (jsdom).
- **Chaves de tradução cruas corrigidas**: títulos de lições agora vêm do currículo (`data/curriculum.json` → `lessonTitles` por módulo) e há fallback localizado (`lesson.numbered`). Adicionadas chaves faltantes: `settings.data`, `a11y.toggleTheme`, `common.difficulty.*`, `lesson.numbered`. `t()` passa a respeitar `defaultValue`. Teste: `scripts/test-i18n-dom.mjs` (jsdom) percorre 9 rotas e falha se algum texto/atributo casar com o padrão de chave i18n crua.
- **Ícones do cabeçalho**: `aria-label` + `title` (tooltip) aplicados via i18n (`applyHeaderLabels()`), cobrindo tema, configurações e conquistas.
- **Onboarding / modal de boas-vindas**: passou a usar uma flag dedicada `preferences.onboarding_completed` (padrão `false`), em vez de depender de `stats.last_activity_date` (que o boot sobrescrevia). O modal aparece sempre que a flag é `false` e é gravada como `true` ao escolher a meta. Schema de progresso versionado em **v2** com migração (progresso antigo sem a flag é tratado como `false`). "Resetar progresso" mantém as preferências e a flag (não reabre o modal); limpar tudo (`clear`) reabre. Teste: `scripts/test-onboarding-dom.mjs` (jsdom, múltiplos "recarregamentos"). Migração coberta em `scripts/test-core.mjs`.
- `npm test` agora inclui os testes de DOM, i18n e onboarding (jsdom é devDependency).

### Fundamentos visuais / neo-brutalismo (2026-10-16) — Fase 4.5 (T113–T114)
- **Nova identidade neo-brutalista**: cores chapadas e saturadas (sem gradientes), bordas sólidas de 2–4px, sombras **duras** sem desfoque, cantos retos/quase retos, títulos pesados (800) e **monoespaçada** para código e rótulos.
- **`DESIGN.md` criado**: fonte da verdade dos *design tokens* (cores claro/escuro, tipografia, espaçamento, espessura de borda, sombras, alvo de toque) + princípios e revisão de telas.
- **`src/ui/theme.css` reescrito** usando **apenas tokens** (`var(--token)`); nenhum valor solto de cor/espaço/borda/sombra/raio. Tokens de cor do tema escuro sob `html[data-theme="dark"]` + fallback `@media (prefers-color-scheme: dark)` (pré-JS) — o teste garante que os dois blocos são idênticos.
- **Revisão das telas** (painel, semestre, disciplina, módulo, configurações, conquistas) nos temas **claro e escuro** e nas larguras **375 / 768 / 1280 px** (verificado no navegador com *harness* de iframes nessa largura). Correções aplicadas:
  - **Cabeçalho compacto** (padding reduzido; barra de XP fina com borda; ícones quadrados com borda e sombra dura).
  - **Botão "Voltar" com seta** (`←` via `::before`, sem alterar o rótulo traduzido).
  - **Próxima ação ("Continuar") com destaque forte**: botão amarelo (`--color-cta`), borda grossa e sombra dura, largura total.
  - **Cartões de XP, nível, streak e revisões com mais presença**: borda 4px, sombra dura, número grande em monoespaçada e *chip* colorido atrás do ícone.
  - **Foco visível distinto da borda**: `outline` na cor de foco com `outline-offset` (nunca se confunde com a borda).
  - **Estado nunca só por cor/sombra**: acerto/erro/bloqueado/concluído/selecionado sempre têm **ícone ou texto** (✅/❌, 🔒, "Bloqueado", "Em breve", "✓" no selecionado).
- **Zero requisições externas**: removido o `<link rel="preconnect" href="https://fonts.gstatic.com">` do `index.html`; decisão de **pilhas de fontes do sistema** (sem download/CDN) registrada em `DESIGN.md` e `ATTRIBUTIONS.md`.
- **Teste de contraste WCAG AA**: `scripts/test-contrast.mjs` lê os tokens de `theme.css`, calcula o contraste dos pares semânticos (texto ≥ 4.5, UI/borda/foco ≥ 3.0) e **falha (exit 1) abaixo de AA**; também valida a estrutura dos tokens (bordas 2–4px, alvo de toque ≥ 44px, sombras sem desfoque) e a igualdade do fallback escuro. Incluído em `npm test`.

### Correções do teste manual (2026-10-16) — T115–T118
- **Nada era clicável** → causa: o **modal de boas-vindas** era um `.modal-overlay` **invisível** (`opacity: 0`) que **não tinha a classe `.visible`** e, ainda assim, capturava o ponteiro (opacidade não remove o *hit-testing* de `position: fixed`). Correção dupla: (1) `showWelcomeModal()` passa a adicionar `.visible`; (2) blindagem no CSS — `.modal-overlay` tem `pointer-events: none` e só `.modal-overlay.visible` tem `pointer-events: auto`, de modo que um overlay invisível nunca mais bloqueia a página. Meta padrão (20 XP) pré-selecionada. Teste: `scripts/test-interaction-dom.mjs`.
- **"Barra vertical branca" abaixo de "Bom estudo!"** → a `.daily-goal-bar` colapsava a ~6px: `margin: 0 auto` **desliga o "stretch" do flex** e o conteúdo (fill a 0% + texto absoluto) não dava largura. Correção: `width: 100%` (com `max-width` e centralização mantidos) — agora renderiza 420×28.
- **"Duas linhas brancas duplicadas" no topo** → o cabeçalho tinha `border-bottom` **e** a `.xp-bar` tinha `border-top`, gerando duas linhas. Correção: removido o `border-top` da `.xp-bar` (a barra ficou com 28px e o *chip* "Nível 1 — 0/1000 XP" centralizado verticalmente à direita).
- **Deep-link/refresh voltava para o painel** → o `Router` registrava um listener de `load` e processava o hash **antes** de `setupRoutes()` (o boot é assíncrono), com a tabela de rotas vazia → caía no 404 e redirecionava para `#/`. Correção: guarda `started` no `Router` (listeners só agem após `startRouter()`). `#/settings` e `#/semester/sem1` agora abrem a própria tela no carregamento direto.
- **Teste de interação** (`scripts/test-interaction-dom.mjs`, em `npm test`): cliques reais (`click()`) em "Continuar" → "Entrar" (disciplina) → "Entrar" (módulo), verificando a rota **e** o `<h1>` da tela; deep-link em `#/settings` e `#/semester/sem1`; e guarda de CSS (`pointer-events`) para o overlay.

### Revisão do tema escuro — Opção B «Ameixa» (2026-10-16) — T119
- **Motivo**: o tema escuro anterior (fundo `#101014` quase preto + bordas/sombras brancas) ficou **agressivo e feio**.
- **Processo**: `DESIGN.md` §2.3 lista **três** propostas com todos os tokens em hex e a razão de contraste de cada par (texto ≥ 4.5 / UI ≥ 3.0), e `design-preview.html` (arquivo solto, **fora do app e sem link nele**) mostra as três lado a lado. A **Opção B «Ameixa»** foi escolhida.
- **Aplicado**: `src/ui/theme.css` (nos **dois** blocos escuros — `html[data-theme="dark"]` e o fallback `@media`) — fundo roxo escuro `#1E1A2E`, superfícies `#2A2440`/`#38304F`, bordas em creme `#F2DFC0`, **sombra dura rosa** `#FF6FB5`, foco ciano `#7FE3FF`; primária lilás `#9C8BFF`; **CTA amarela `#FFD400` mantida**. Tema **claro inalterado**.
- **`index.html`**: `theme-color` agora segue o tema do sistema (`#FBF7EC` no claro, `#1E1A2E` no escuro) via `<meta media="(prefers-color-scheme: …)">`.
- **Verificado**: `npm test` verde (contraste 76 ok/0 falhas; os blocos escuros continuam idênticos) e inspeção no navegador em claro e escuro (painel, semestre, modal de boas-vindas).

### Correções de tema (2026-10-16) — T120
- **Persistência**: os botões de tema (cabeçalho e Configurações) agora chamam `applyThemePreference()`, que grava a escolha em `progress.preferences.theme` (`progressStore.update()`). O boot já lia essa preferência — antes ela nunca era escrita, então o tema voltava para "automático" após recarregar. ✅
- **Botão do cabeçalho**: o `#theme-toggle` não tinha handler algum; agora **alterna claro ↔ escuro** (com base no tema efetivo, garantindo mudança visível) e persiste. O modo "automático" segue disponível em Configurações. A ligação é idempotente (guarda `data-bound`), para não duplicar listeners se o boot rodar mais de uma vez. ✅
- **Ícone de Configurações**: o `path` do SVG estava corrompido e não formava uma engrenagem; substituído pelo *gear* do Feather (traço). O botão de tema passou a mostrar **sol no claro / lua no escuro** (antes aparecia os dois juntos), com fallback pré-JS via `prefers-color-scheme`. ✅
- **Teste**: `scripts/test-theme-dom.mjs` (jsdom) simula **recarregamentos** reais (processos separados + localStorage em arquivo) e cobre: padrão "auto", persistência ao escolher "escuro" em Configurações, o botão do cabeçalho alternando o tema e a preferência sobrevivendo a dois reloads; incluído em `npm test`.

---

## ⏳ O que está pendente

### Fase 3: US1 - Onboarding & Semester View ✅ COMPLETO
- [x] Views: dashboard (#/), semester (#/semester/:semId) — **completo: app.js tem renderDashboard/renderSemesterView funcionais**
- [x] Wire navigation, persist daily_goal — **completo: navegação hash + persistência no localStorage**
- [x] Boas-vindas modal com meta diária (10/20/30/50 XP) — **corrigido: controlado por `preferences.onboarding_completed`**
- [x] Dashboard com stats: XP total, nível, streak, freezes, revisões
- [x] Barra de progresso de nível e meta diária
- [x] Cards de revisão do dia (SRS)
- [x] Semestre 1 com disciplinas, semestres 2-8 "Em breve"
- [x] Locales completos para todas as chaves usadas
- [x] CSS completo para dashboard, semester, discipline, module, settings, achievements
- [x] Modal de boas-vindas controlado por flag dedicada (`preferences.onboarding_completed`, schema v2) — aparece na primeira visita / após `clear`, e não reaparece após escolher a meta ou após reset.

### Fase 4: US2 - Discipline & Module Navigation ✅ COMPLETO
- [x] Views: discipline, module com lock icons — **completo: app.js tem renderDisciplineView/renderModuleView funcionais**
- [x] Unlock logic implementado ✅ (src/curriculum/unlock.js)
- [x] Navegação: semestre → disciplina → módulo → lição
- [x] Ícones de lock/unlock e barras de progresso por módulo
- [x] Lista de lições com status (concluída/pendente/bloqueada)
- [x] Botão "Iniciar" para lições desbloqueadas

### Fase 5: US3 - Lesson & Exercises (Core MVP) — 🚧 PARCIAL
- [x] `src/lesson/feedback.js` + 3 de 5 tipos de exercício (`multiple-choice`, `true-false`, `order-steps`)
- [ ] `src/lesson/renderer.js` + tipos `code-completion` e `flashcards`
- [ ] View: lesson (#/lesson/:lessonId) — **parcial: app.js tem renderLessonView placeholder**
- [ ] Ligar XP no fluxo, "Praticar mais", persistir tentativas, agendar SRS (módulos gamification já prontos)

### Fase 6: US4 - Theory Library (Core MVP) — 🚧 NÃO INICIADA
- [ ] `src/theory/renderer.js` (KaTeX, highlight.js, atribuição, ver original)
- [ ] `src/theory/sidebar.js`, `annotations.js`, `search.js`
- [ ] Views: theory (#/theory/:id), library index (#/library) — **parcial: app.js tem placeholders**

### Fase 7: US5 - Gamification Dashboard & Settings — 🚧 PARCIAL
- [x] Dashboard com XP bar, nível, streak + freeze, revisões do dia
- [x] Conquistas (renderAchievementsView) e Settings (meta diária, tema, export/import/reset; reset mantém preferências)
- [ ] Confetti (CSS, respects reduced-motion)
- [ ] aria-live assertivo para conquista/streak/meta (`announce()` existe; falta ligar)

### Fase 8: US6 - 1º Semestre Conteúdo (Data only)
- [ ] 6 theory units (3 algorithms + 3 discrete-math) com front-matter válido
- [ ] Exercícios para todas as lições (3-5 cada, generated_by_ai: true, verified)
- [ ] ATTRIBUTIONS.md atualizado
- [ ] validate.mjs passa

### Fase 9: US7 - Acessibilidade & Privacidade — 🚧 PARCIAL
- [x] Ícones do cabeçalho com aria-label/title; estado sempre ícone+texto+cor; `prefers-reduced-motion` no CSS
- [x] Contraste AA dos tokens verificado por `scripts/test-contrast.mjs` (claro/escuro)
- [ ] Auditoria completa: focus, tab order, skip links
- [x] Zero external requests: `<link rel="preconnect" href="https://fonts.gstatic.com">` removido do index.html (fontes por pilhas do sistema)

### Fase 10: US8 - Deploy & Repo Files — 🚧 PARCIAL
- [x] Workflows validados (validate.yml + deploy-pages.yml) e arquivos Definition of Done presentes
- [ ] Validar 404.html/redirect no Pages publicado
- [x] Publication checklist (README.md)

### Fase 11: Polish
- [x] Testes de edge cases de gamificação (streak/segunda, SRS cap, níveis XP) e suíte completa verde
- [ ] Documentation, cleanup (remover `console.log`), performance, security hardening (CSP)
- [ ] QA manual final (depende de US3/US4)

### Fase 13: Verificação de Conteúdo (novas tarefas em tasks.md) — 🚧 PENDENTE
- [ ] T109 Verificar acessibilidade da `source.url` no validate.mjs (HEAD)
- [ ] T110 Validar links internos (lesson/theory) no validate.mjs
- [ ] T111 Checar sincronização ATTRIBUTIONS.md ↔ fontes usadas
- [ ] T112 Garantir que unidade `pendente`/`unverified` não entra na trilha (spec AC-13)

---

## 🎯 Próxima Etapa

**Próxima fase: Fase 5 (US3 - Lesson & Exercises)** — concluir o núcleo do MVP. Já prontos: `feedback.js` e 3/5 tipos de exercício. Falta:

1. Criar `src/lesson/renderer.js` — renderiza lição: resumo teórico + lista de exercícios
2. Completar os tipos faltantes em `src/lesson/exercise-types/`:
   - `code-completion.js` — textarea com highlight.js, botão "Run" (`node --check` para JS), explanation
   - `flashcards.js` — flip card, marcar conhecido/desconhecido, revisão espaçada
3. Completar `renderLessonView` em `src/app.js` — carrega dados da lição e renderiza exercícios sequencialmente
4. Implementar XP na resposta correta (first try bonus, retry penalty, streak bonus) — lógica em `xp.js` já pronta
5. Implementar "Praticar mais" → exercícios extras da mesma unidade teórica (fila SRS)
6. Persistir tentativas de exercício (correct/incorrect/tentativas/xp_earned) no ProgressStore
7. Agendar SRS ao concluir lição (intervalos 1→3→7→21 dias)
8. Testes unitários dos 5 tipos de exercício + feedback (T042–T046)

**Paralelizáveis**: Fase 6 (US4 — Biblioteca Teórica, do zero) e Fase 8 (US6 — conteúdo do 1º semestre), junto com as verificações de conteúdo T109–T112.

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