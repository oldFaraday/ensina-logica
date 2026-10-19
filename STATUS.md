# Status do Projeto — Ensina Lógica

**Última atualização**: 2026-10-19

---

## ✅ O que já foi feito

### Spec Kit & Documentação Base
- Constitution (`.specify/constitution.md`) — princípios fundamentais definidos
- Spec (`.specify/spec.md`) — especificação completa do produto (MVP, user journeys, critérios de aceitação)
- Plan (`.specify/plan.md`) — plano técnico detalhado (stack, estrutura, schemas, algoritmos, CI/CD, fontes aprovadas)
- Tasks (`.specify/tasks.md`) — 100 tarefas originais (11 fases, 8 user stories) + T101–T112 (correções fora do fluxo e verificação de conteúdo) + T113–T114 (Fundamentos visuais, Fase 4.5) + T115–T118 (correções do teste manual: modal/cliques, layout do topo, rota inicial, teste de interação) + T119 (tema escuro Opção B «Ameixa») + T120 (persistência e botões de tema) + T121–T126 (Convergence) + T127–T129 (Fase 16 pós-QA: responsividade móvel, metas de XP 100/300/600/1000 e revisões no mesmo dia) + **T137–T141 (Fase 18: limpeza do conteúdo placeholder apontado pelo `CONTENT_AUDIT.md`)** + **T142–T147 (Fase 19: endurecimento da validação de conteúdo — anti-placeholder)** + **T148–T153 (Fase 20: correção do exercício "completar código" — lacunas inline — e auditoria dos 5 tipos de exercício)** + **T154–T157 (Fase 21: normalização conservadora da resposta + XP concedido uma única vez por exercício)** + **T158–T163 (Fase 21: infraestrutura da pipeline de conteúdo)** + **T164 (Fase 22: piloto `sem1-algorithms-m01` refeito com E0–E7)** + **T165 (Fase 22: `sem1-algorithms-m02` refeito com E0–E7)** + **T170–T173 (Fase 23: embaralhamento determinístico das alternativas)** + **T174–T180 (Fase 24: SRS por exercício e revisão exercício-a-exercício)**; inclui **snapshot do progresso real** (2026-10-16)
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
│   ├── theory/sem1/algorithms/ # ✅ 10 unidades reais (m01 com 4 capítulos, m02 com 5, m03 com 1), verificadas na fonte
│   ├── theory/sem1/discrete-math/ # ✅ 3 unidades reais (m01–m03), verificadas na fonte
│   ├── theory/_schema.json     # ✅ Completo - JSON Schema unidades teóricas (pending|unverified|verified_with_source; verified_at/verification_method)
│   ├── exercises/sem1/algorithms/ # ✅ 15 arquivos (m01: 4 lições + desafio + flashcards; m02: 3 lições + desafio + flashcards; m03: 4 lições), 99 exercícios
│   ├── exercises/sem1/discrete-math/ # ✅ 8 arquivos de lição (l11–l18)
│   └── exercises/_schema.json  # ✅ Completo - JSON Schema exercícios
├── src/
│   ├── app.js                  # ✅ Completo - entry point, boot, router, store, theme
│   ├── router.js               # ✅ Completo - hash router com params/hooks
│   ├── i18n.js                 # ✅ Completo - loader + t(key, params)
│   ├── store/
│   │   ├── ProgressStore.js    # ✅ Completo - localStorage abstraction + schema migration
│   │   └── schema-version.js   # ✅ Completo - migrações v0→v1→v2→v3→v4, validação
│   ├── gamification/
│   │   ├── xp.js               # ✅ Completo - XP, níveis, progresso
│   │   ├── streak.js           # ✅ Completo - streak + freeze semanal
│   │   ├── achievements.js     # ✅ Completo - 18 badges com critérios
│   │   └── srs.js              # ✅ Completo - SRS por exercício (0/1/3/7/21), upsert e revisão um-a-um (T174)
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
│   ├── validate.mjs            # ✅ Completo - validação CI (curriculum, theory, exercises, links, licenças/edições, ATTRIBUTIONS gerada)
│   ├── lib/content-rules.mjs   # ✅ Completo - regras anti-placeholder puras (URL genérica, trecho literal, licença/edição) usadas pelo validate e pelos testes
│   ├── test-validation.mjs     # ✅ Completo - testes das regras anti-placeholder (exemplos ruins são rejeitados)
│   ├── verify-sources.mjs      # ✅ Completo - verificação MANUAL (fora do CI): baixa cada fonte e confere o trecho ("confere"/"não confere"/"sem acesso")
│   ├── test-core.mjs           # ✅ Completo - testes puros (XP, streak, SRS por exercício, unlock, progress, migração v4)
│   ├── test-review-dom.mjs     # ✅ Completo - revisão por exercício (jsdom): migração, painel, sessão, retry, persistência, export/import (T179)
│   ├── test-imports.mjs        # ✅ Completo - importa todos os módulos de src/ (falha em erro)
│   ├── test-smoke.mjs          # ✅ Completo - smoke test do initApp (mock de DOM)
│   ├── test-dom.mjs            # ✅ Completo - integração jsdom (rota inicial #/ renderiza)
│   ├── test-i18n-dom.mjs       # ✅ Completo - integração jsdom (sem chaves de tradução cruas)
│   ├── test-onboarding-dom.mjs # ✅ Completo - integração jsdom (fluxo de boas-vindas/meta)
│   ├── test-contrast.mjs       # ✅ Completo - contraste WCAG AA dos design tokens (falha abaixo de AA)
│   ├── test-interaction-dom.mjs # ✅ Completo - cliques reais (jsdom): Continuar → semestre → disciplina → módulo, deep-link, guarda do overlay
│   ├── test-responsive.mjs    # ✅ Completo - responsividade móvel da Biblioteca Teórica (T127): contenção do grid, rolagem de pre/katex, coluna única
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
├── ATTRIBUTIONS.md             # ✅ Regerado a partir das 6 unidades reais (bloco gerado e conferido no CI) + fontes aprovadas sem unidades + libs terceiras
├── CONTRIBUTING.md             # ✅ Completo
├── CODE_OF_CONDUCT.md          # ✅ Completo (Contributor Covenant 2.1)
├── SECURITY.md                 # ✅ Completo
├── AUDIT.md                    # ✅ Auditoria read-only (API do ProgressStore, 2026-10-16)
└── CHANGELOG.md                # ✅ Iniciado (unreleased)
```

### Código Implementado (Fases 1-4 COMPLETO)
- **Fase 6 (US4 - Biblioteca Teórica)**: `src/theory/markdown.js` (renderer Markdown próprio, escapado, math `$..$`/`$$..$$` e código como placeholders), `assets.js` (KaTeX/highlight.js locais, lazy, zero CDN), `renderer.js` (atribuição, "ver original", seções com lida/anotações/"praticar"), `sidebar.js`, `annotations.js`, `search.js`; views `#/theory/:id` e `#/library` ligadas ✅ ; teste `scripts/test-theory-dom.mjs` (T059–T067) ✅
- **Fase 5 (US3 - Lesson & Exercises)**: `src/lesson/renderer.js` (resumo teórico + lista sequencial de exercícios, progresso, conclusão, "Praticar mais"); os 5 tipos em `src/lesson/exercise-types/` (`multiple-choice`, `true-false`, `order-steps`, `code-completion`, `flashcards`); view `#/lesson/:lessonId` ligada (carrega teoria + exercícios, marca tentativas, XP com first-time/retry/streak, SRS ao concluir, conquistas, aria-live, barra de XP do cabeçalho) ✅ ; teste `scripts/test-lesson-dom.mjs` (T042–T046) ✅
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
- **Ícone de Configurações**: o `path` do SVG estava corrompido e não formava uma engrenagem; substituído por um **gear sólido** (preenchido), coerente com os ícones sólidos de lua e estrela. O botão de tema passou a mostrar **apenas o sol no claro / apenas a lua no escuro** (antes apareciam os dois juntos no claro): as regras foram escritas com `.icon-btn` para vencer a especificidade de `.icon-btn svg { display: block }` (o seletor antigo `.icon-moon` perdia a disputa). Fallback pré-JS via `prefers-color-scheme`. ✅
- **Teste**: `scripts/test-theme-dom.mjs` (jsdom) simula **recarregamentos** reais (processos separados + localStorage em arquivo) e cobre: padrão "auto", persistência ao escolher "escuro" em Configurações, o botão do cabeçalho alternando o tema e a preferência sobrevivendo a dois reloads; incluído em `npm test`.

### Correções pós-QA manual (2026-10-16) — Fase 16 (T127–T129)
- **T127 — Responsividade móvel da Biblioteca Teórica** (`fix(ui)`, commit `2000f1c`): em `#/theory/:id` e `#/library` (~375px), blocos largos (fórmulas KaTeX em bloco, `<pre>`, tabelas, imagens) não estouram mais o viewport. `min-width:0` no grid `.theory-layout` e filhos (+ `max-width:100%` em `.theory-main`/`.theory-sidebar-host`/`.theory-unit`/`.theory-section`); `pre`/`pre code` e `.katex-display` rolam no próprio bloco; mídia/tabelas limitadas; `overflow-wrap`/`word-break` nos contêineres de texto; campos da biblioteca com `width:100%`; coluna única e índice lateral **depois** do conteúdo no celular (DOM reordenado; desktop mantém o índice à esquerda via `grid-column`); rede de segurança `html { overflow-x: clip; }`. CSS usando **apenas tokens** de `DESIGN.md`. Novo teste estático `scripts/test-responsive.mjs` (29 checagens) em `npm test`.
- **T128 — Metas de XP 100/300/600/1000 + destaque HARDCODE** (`feat(gamification)`, commit `e55704e`): a escala antiga `[10,20,30,50]` era batida com uma única lição (~60–83 XP). Novas metas **100/300/600/1000**, default **300** ("Moderado") pré-selecionado na modal de boas-vindas e em Configurações. A opção **1000**, quando ativa, mostra 👿 ao lado do texto e a legenda **HARDCORE** abaixo (decorativos, `aria-hidden`; estado nunca só por cor). i18n: `welcome.goals` (Leve/Moderado/Intenso/Hardcore) e `welcome.hardcore`. **Não** altera a fórmula de XP nem a lógica de níveis (`src/gamification/xp.js` intacto).
- **T129 — Revisões no mesmo dia** (`feat(srs)`, commit `6cd40fe`): errar um exercício passa a aparecer em **"Revisões pendentes"** no painel **no mesmo dia** (antes, só a revisão de lição ao concluir, no dia seguinte). `SRS_INTERVALS` passa a `[0,1,3,7,21]` (índice 0 = hoje). Nova fila `progress.review_queue` (uma entrada por `exercise_id`, upsert sem duplicar; conta `wrong_count`): acerto em revisão avança a escada, erro reinicia para hoje; acerto de exercício nunca errado não agenda nada. Concluir uma lição também agenda a revisão dela para hoje. O painel combina as duas filas (`getCombinedReviewItems`) e, sem pendências, mostra a próxima revisão futura (`dashboard.next_review_in`). Schema migrado para **v3** (adiciona `review_queue`, mantendo compatibilidade com progresso v2 importado). **Nunca** implementa vidas/bloqueio por erro. Testes: `scripts/test-core.mjs` (fila + migração v2→v3) e `scripts/test-e2e-dom.mjs` (errar → revisão no painel no mesmo dia).

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

### Fase 5: US3 - Lesson & Exercises (Core MVP) — ✅ COMPLETO
- [x] `src/lesson/renderer.js` + 5/5 tipos (`multiple-choice`, `true-false`, `order-steps`, `code-completion`, `flashcards`)
- [x] View: lesson (#/lesson/:lessonId) — resumo teórico + exercícios sequenciais, barra de progresso, conclusão
- [x] XP no fluxo (first-time bonus, retry penalty, streak bonus), "Praticar mais", tentativas persistidas, SRS ao concluir
- [x] Testes dos 5 tipos (`scripts/test-lesson-dom.mjs`, T042–T046)

### Fase 6: US4 - Theory Library (Core MVP) — ✅ COMPLETO
- [x] `src/theory/renderer.js` (Markdown próprio → HTML; KaTeX + highlight.js locais aplicados após montar; atribuição; "ver original"; seções com "lida"/anotações/"praticar")
- [x] `src/theory/markdown.js` (renderer Markdown sem dependência, escapado), `assets.js` (KaTeX/hljs lazy, sem CDN), `sidebar.js`, `annotations.js`, `search.js`
- [x] Views: theory (#/theory/:id) e library index (#/library) ligadas; teste `scripts/test-theory-dom.mjs` (T059–T067)

### Fase 7: US5 - Gamification Dashboard & Settings — ✅ COMPLETO
- [x] Dashboard com XP bar, nível, streak + freeze, revisões do dia
- [x] Conquistas (renderAchievementsView) e Settings (meta diária, tema, export/import/reset; reset mantém preferências)
- [x] Confetti (CSS, respects reduced-motion) — `src/ui/confetti.js` + teste `scripts/test-confetti-dom.mjs`
- [x] aria-live assertivo para conquista/streak/meta (polite para XP) ligado no fluxo de lição

### Fase 8: US6 - 1º Semestre Conteúdo (Data only) — ✅ COMPLETO
- [x] 6 teoria units (3 algorithms + 3 discrete-math) com front-matter válido, todas `verified_with_source`
- [x] Exercícios para todas as 18 lições (85 no total, 3–5 cada, `generated_by_ai: true`, conferidos contra a fonte)
- [x] ATTRIBUTIONS.md em sincronia (verificado por T111)
- [x] validate.mjs passa (0 erros) + teste de conteúdo `scripts/test-content-dom.mjs`
- [x] Fix: parser de front-matter aninhado (`source:`) do loader/validate + lições do discrete-math renumeradas (l11–l18) para não colidir com as de algorithms

### Fase 9: US7 - Acessibilidade & Privacidade — ✅ COMPLETO
- [x] Ícones do cabeçalho com aria-label/title; estado sempre ícone+texto+cor; `prefers-reduced-motion` no CSS
- [x] Contraste AA dos tokens verificado por `scripts/test-contrast.mjs` (claro/escuro)
- [x] Auditoria de foco/ordem de tabulação/skip links: `:focus-visible` global + `--touch-target` + skip link
- [x] Zero external requests: sem preconnect/fontes externas; KaTeX/highlight.js locais; CSP no index.html

### Fase 10: US8 - Deploy & Repo Files — 🚧 PARCIAL
- [x] Workflows validados (validate.yml + deploy-pages.yml) e arquivos Definition of Done presentes
- [ ] Validar 404.html/redirect no Pages publicado (requer deploy remoto)
- [x] Publication checklist (README.md)

### Fase 11: Polish
- [x] Testes de edge cases de gamificação (streak/segunda, SRS cap, níveis XP) e suíte completa verde
- [x] Documentation, cleanup (remover `console.log`) e security hardening (CSP no index.html + zero requisições externas)
- [ ] QA manual final (jornada completa) — requer navegador real

### Fase 13: Verificação de Conteúdo — ✅ COMPLETO
- [x] T109 Verificar acessibilidade da `source.url` no validate.mjs (HEAD, gated por `CHECK_URLS=1`)
- [x] T110 Validar links internos (lesson/theory) no validate.mjs
- [x] T111 Checar sincronização ATTRIBUTIONS.md ↔ fontes usadas
- [x] T112 Garantir que unidade `pendente`/`unverified` não entra na trilha (spec AC-13)

### Fase 14: Convergence — ✅ COMPLETO (T121–T125)
- [x] T121 Documentação do modelo de conteúdo corrigida (`docs/CONTENT_MODEL.md` + README alinhado com a convenção do loader)
- [x] T122 Teste end-to-end da jornada (`scripts/test-e2e-dom.mjs`) — AC-06 (export/import round-trip) ✅
- [x] T123 Biblioteca com filtro por disciplina e agrupamento por semestre
- [x] T124 Teste estático do `404.html` (`scripts/test-404.mjs`)
- [x] T125 Índice de busca memoizado (`WeakMap` em `src/theory/search.js`)
- [x] T093/T094/T095/T097 fechados junto: docs, cleanup (`console.log`), performance (debounce+memoização) e CSP/sanitize

### Fase 15: Convergence — ✅ COMPLETO (T126)
- [x] T126 Entrada "Biblioteca" no menu/cabeçalho global → `#/library` (AC-05, faltava o acesso por menu); coberto pelo teste e2e

### Fase 16: Correções pós-QA manual — ✅ COMPLETO (T127–T129)
- [x] T127 Responsividade móvel da Biblioteca Teórica (`#/theory/:id` e `#/library`) — teste estático `scripts/test-responsive.mjs`
- [x] T128 Metas de XP 100/300/600/1000 (default 300) com destaque **HARDCORE** na meta 1000 (modal + Configurações)
- [x] T129 Revisões no mesmo dia: fila de erros (`review_queue`) + revisão de lição vencendo hoje; schema v3; **sem** vidas/bloqueio por erro

### Fase 18: Limpeza do conteúdo placeholder — ✅ COMPLETO (T137–T141, 2026-10-17)
Limpeza conforme o `CONTENT_AUDIT.md` (sem gerar conteúdo novo).
- [x] T137 Removidas as **188 unidades teóricas placeholder** (`data/theory/sem1/**/…-m04…m11-*.md`) e os **940 exercícios placeholder** (`data/exercises/sem1/**/m04…m11-*.json`); mantidas as **6 unidades reais** e os **85 exercícios do MVP** (histórico preservado no git). `data/theory/`: 194 → **6** arquivos; exercícios: 206 → **18** arquivos.
- [x] T138 `data/curriculum.json`: 1º semestre restrito aos módulos reais **m01–m03** (algorithms e discrete-math); semestres **2–8** permanecem só como mapa (disciplinas e módulos, sem lições) e continuam como **"Em breve"**. Nenhuma tela, busca, glossário ou biblioteca lista conteúdo inexistente.
- [x] T139 `pending` adicionado aos valores permitidos de `verification_status` (`data/theory/_schema.json`, `docs/CONTENT_MODEL.md`, `README.md` e também `scripts/validate.mjs`).
- [x] T140 As 6 unidades reais reconferidas (URL específica do capítulo, edição e licença). Levin aponta para a **3ª edição** (`https://discrete.openmathbooks.org/dmoi3.html`, CC BY-SA 4.0) e os `original_excerpt` conferem nessa edição (não na 4ª, NC-SA); nenhuma unidade virou `pending`.
- [x] T141 `ATTRIBUTIONS.md` regerado a partir das unidades que realmente existem (6 unidades); MCS e Open Guide passam a constar como "aprovadas, ainda sem unidades derivadas".
- Verificação: `npm test` verde (**16 suítes**, inclui `scripts/test-content-dom.mjs`: 6 unidades / 18 lições / 85 exercícios) e `npm run validate` sem erros.

### Fase 19: Endurecimento da validação de conteúdo — ✅ COMPLETO (T142–T147, 2026-10-17)
Impede que o problema do `CONTENT_AUDIT.md` volte (unidade `verified_with_source` sem trecho original literal conferido contra a fonte). **Sem gerar conteúdo novo.**
- [x] T142 `scripts/lib/content-rules.mjs` (regras puras): `source.url` genérica (homepage sem capítulo/seção), `original_excerpt` no idioma da fonte (inglês), ≥ 15 palavras e sem cara de texto gerado, `verified_at` + `verification_method` obrigatórios em `verified_with_source`, licença permitida (CC0/CC BY/CC BY-SA/domínio público) e edição proibida (Levin 4ª, NC). `scripts/validate.mjs` passou a **falhar** (não só avisar) nesses casos e em exercícios com placeholder ("Questão N sobre", "Alternativa A", "Explicação da questão") ou explicação sem citar a seção/capítulo da fonte.
- [x] T143 `ATTRIBUTIONS.md`: o validador **gera** o bloco de unidades a partir de `data/theory/` e **falha** se divergir (antes passava com o arquivo desatualizado); marcadores `<!-- BEGIN/END GENERATED: theory-units -->` e regeneração com `node scripts/validate.mjs --update-attributions`. Também rejeita ids de unidades inexistentes no arquivo.
- [x] T144 `scripts/verify-sources.mjs` (manual, fora do CI; `npm run verify-sources`): baixa cada `source.url` e imprime **"confere"/"não confere"/"sem acesso"** por unidade.
- [x] T145 `scripts/test-validation.mjs` (em `npm test`): exemplos ruins (unidade placeholder, licença NC, trecho em português, edição Levin 4ª, trecho curto, exercício placeholder/sem citação) confirmados como rejeitados.
- [x] T146 Critério de aceitação (**AC-14** e **AC-15**) na spec, **Constitution §2** ("nenhuma unidade `verified_with_source` sem trecho original literal conferido contra a fonte" + `pending`), `README.md`, `docs/CONTENT_MODEL.md` e `data/theory/_schema.json` (`verified_at`/`verification_method`; licença com domínio público).
- [x] T147 As 6 unidades reais ganharam `verified_at: 2026-10-17` + `verification_method: manual_url_check`; o trecho de `th-sem1-discrete-math-m02-predicate-logic` foi estendido para um trecho literal ≥ 15 palavras (mesma seção 0.2) e a explicação do flashcard `ex-sem1-algorithms-m01-l01-flash` passou a citar o capítulo da fonte — satisfazendo as novas regras sem inventar conteúdo.
- Verificação: `npm test` verde (**17 suítes**, inclui `scripts/test-validation.mjs`) e `npm run validate` sem erros nem avisos; confirmado que o validador **falha** (exit 1) ao introduzir uma unidade inexistente no `ATTRIBUTIONS.md`.

### Fase 20: Correção do exercício "completar código" + auditoria dos tipos — ✅ COMPLETO (T148–T153, 2026-10-18)
**Bug corrigido**: a tela mostrava o **código inteiro** num `textarea` editável (com a lacuna `___` dentro) e a verificação comparava o **campo inteiro** com a resposta de **uma** lacuna — o aluno precisava apagar todo o código e digitar só a resposta (ex.: `(idade1 + idade2) / 2`) para acertar. Os testes passavam porque não simulavam o preenchimento.
- [x] T148 `src/lesson/exercise-types/code-completion.js` reescrito: o código agora é um bloco monoespaçado **fixo e não editável** (`<pre class="code-block">`) e cada `___` é um `<input class="code-blank">` inline. Suporta **várias lacunas**; `aria-label` "Lacuna N de M"; **Tab** percorre as lacunas; **Enter** verifica; a largura é fixa em CSS (`width: 10ch`), sem revelar o tamanho da resposta.
- [x] T149 Novo formato de dados: `code` (com `___`) + `blanks: [{ accepted_answers: [...] }]` (uma por `___`, na ordem). Verificação normaliza aspas tipográficas e remove todos os espaços, aceitando equivalências listadas (ex.: `(idade1 + idade2) / 2` ≡ `(idade2 + idade1) / 2`). O erro mostra a **resposta de referência** da(s) lacuna(s) errada(s) + explicação, **sem vidas/punição**; **sem `eval`** e sem executar código digitado.
- [x] T150 **8 exercícios migrados** (`sem1/algorithms/m01-l02, m02-l04, m02-l05, m02-l06, m03-l07, m03-l08, m03-l09, m03-l10`), sem alterar o conteúdo pedagógico (enunciado, código, explicação e dificuldade preservados).
- [x] T151 `data/exercises/_schema.json` + `scripts/validate.mjs` + `docs/CONTENT_MODEL.md`: `correct` deixou de ser obrigatório em `code-completion`; o validador **falha** se o número de `___` no `code` ≠ número de `blanks`, se alguma lacuna ficar sem `accepted_answers` válidos ou se o código não tiver lacuna.
- [x] T152 `scripts/test-lesson-dom.mjs`: testes de interação (jsdom, simulando digitação) — cada resposta aceita (inclusive variações de espaço/aspas) ⇒ correto; resposta errada ⇒ incorreto + referência; lacuna **vazia** ⇒ não correto; digitar o **código inteiro** na lacuna ⇒ não correto; Enter verifica; múltiplas lacunas com `aria-label` correto.
- [x] T153 Auditoria por interação dos demais tipos (o que a tela pede = o que a verificação compara): múltipla escolha, verdadeiro/falso, ordenar passos e flashcards. **Encontrados e corrigidos**: (a) `order-steps` destacava as posições usando a ordem **inicial** em vez da **atual**, contradizendo o resultado (marcava tudo como errado **mesmo no acerto**); (b) `order-steps.resetExercise` reabilitava setas inválidas; (c) `multiple-choice.resetExercise` tinha um `forEach` quebrado (não limpava os marcadores ✅/❌); (d) `true-false` tinha uma condição de teclado duplicada (cosmético).
- Verificação: `npm test` verde (**17 suítes**) e `npm run validate` sem erros; validação testada negativamente (falha com "3 lacunas `___` ≠ 2 `blanks`" e com "lacuna 2 sem `accepted_answers`"). Exercício resolvido no **navegador real** (`#/lesson/l02`): digitar `(idade2 + idade1) / 2` na lacuna e acionar Verificar ⇒ "✅ Correto! +27 XP"; resposta errada ⇒ "❌ Incorreto" com a resposta de referência e sem punição (Enter também verifica).

### Fase 21: Normalização conservadora + XP uma vez por exercício — ✅ COMPLETO (T154–T157, 2026-10-18)
**Bugs corrigidos**: (1) a normalização da lacuna removia **todos** os espaços, então respostas erradas como `notx` casavam com a aceita `not x` (idem `aandb` ≈ `a and b` e `"ab"` ≈ `"a b"`); (2) o XP podia ser **reconcedido** ao re-responder um exercício já acertado (dá para "farmar" XP).
- [x] T154 `normalizeBlankAnswer` (`src/lesson/exercise-types/code-completion.js`): uniformiza aspas tipográficas, **colapsa** espaços repetidos, remove espaços **apenas ao redor de operadores/pontuação** (`+ - * / % ( ) [ ] , : = < >`), **preserva ao menos um espaço entre palavras** (`not x` ≠ `notx`, `a and b` ≠ `aandb`) e **não altera o conteúdo entre aspas** (`"a b"` ≠ `"ab"`). Equivalências de formatação (`(a+b)/2` ≡ `( a + b ) / 2`) continuam aceitas.
- [x] T155 Testes (`scripts/test-lesson-dom.mjs`): colapso, espaço entre palavras, preservação de aspas e **respostas erradas que antes passavam** (`notx`, `aandb`, `print("ab")`); clicar "Verificar" 3× verifica **uma única vez**.
- [x] T156 XP uma vez por exercício: novo `calculateExerciseXP` (`src/gamification/xp.js`), usado em `src/app.js`. 1ª resposta correta = base + bônus de 1ª vez + streak; acerto depois de erro = valor reduzido (retry); **acertar de novo um exercício já creditado = 0**. `scripts/test-core.mjs` cobre os 4 casos (**72 asserções**).
- [x] T157 `docs/CONTENT_MODEL.md` atualizado com a regra de normalização conservadora.
- **Regra anterior**: o XP era concedido a **cada** resposta correta e qualquer tentativa após a 1ª valia o "retry" (metade da base + streak) — repetir o mesmo exercício rendia XP indefinidamente.
- **Regra da spec**: o XP do exercício é concedido **uma única vez**; a repetição vale menos ou zero (`spec.md`: "ao acertar"/"ao errar (re-tentativa com XP reduzido)" + SRS). **Divergiam** → corrigido (repetição agora vale **0**).
- **"+27" explicado**: `ex-sem1-algorithms-m01-l02-code` tem `xp_base: 20`; na 1ª resposta correta o app somou **+5** (bônus de 1ª vez) e **+2** (bônus de streak: 1 dia × 2 XP) → **27**. Com a correção, re-responder esse exercício passa a valer **0**.
- Verificação: `npm test` verde (**17 suítes**; 72 asserções no core) e `npm run validate` sem erros.

### Fase 21: Pipeline de conteúdo — ✅ INFRAESTRUTURA COMPLETA (T158–T163, 2026-10-19)
**Sem gerar conteúdo de módulo.** Cria o fluxo repetível para refazer um módulo por vez, com portões automáticos.
- `docs/CONTENT_PIPELINE.md` — regras invioláveis, etapas E0–E7 e regras de exercícios (texto aprovado, sem alterações).
- `data/exercises/_schema.json` — novos campos `objective_id`, `level` (`reconhecer`/`aplicar`/`analisar`/`transferir`), `source_ref` (`<theory_unit_id>#<seção>`) e `answer_check`. `data/theory/_schema.json` — `sections` e `new_terms` (máx. 3).
- `scripts/validate.mjs` — exige os quatro campos de exercício **somente** em módulos com `"pipeline_version": 1`; módulos antigos continuam válidos. `pipeline_version` só aceita `1`.
- `scripts/check-module.mjs` + `npm run check-module -- <id>` — falha em: objetivo sem 2 exercícios em níveis diferentes; lição fora de 5–7, >1 difícil, 1º não fácil ou >2 tipos seguidos; difícil na lição 1; desafio ≠ 8 questões; flashcards fora de 8–12; unidade fora de 300–900 palavras, >3 termos novos ou <3 exercícios ligados; `source_ref` inexistente; `answer_check` ausente; termo novo sem glossário; placeholder. Aceita id canônico (`sem1-algorithms-m01`), `sem1/algorithms/m01`, `algorithms/m01` e `--list`; id ambíguo falha com candidatos.
- Convenção de coleções: `{módulo}-challenge.json` (8 questões) e `{módulo}-flashcards.json` (8–12) ao lado dos arquivos de lição; documentada em `docs/CONTENT_MODEL.md`.
- `scripts/test-check-module.mjs` — 35 asserções, incluindo um módulo de controle válido e um exemplo ruim para **cada** rejeição; incluído em `npm test` (**18 suítes**).
- `.opencode/commands/content-module.md` — comando com `$ARGUMENTS` que lê `docs/CONTENT_PIPELINE.md`, resolve o id e executa E0–E7; lista os ids do `curriculum.json`.
- `.specify/spec.md` — **AC-16**: `pipeline_version: 1` só depois de `check-module`, `validate`, `test` e `verify-sources` passarem. `tasks.md` — T158–T163 (infra) + T164–T169 (tarefas-modelo por módulo do MVP).
- Verificação: `npm test` verde (**18 suítes**) e `npm run validate` sem erros. Nenhum módulo foi marcado com `pipeline_version: 1` e nenhum conteúdo novo foi gerado.

### Fase 22: Piloto da pipeline — `sem1-algorithms-m01` — ✅ COMPLETO (T164, 2026-10-19)
**Módulo piloto refeito do zero conforme `docs/CONTENT_PIPELINE.md` E0–E7.**
- **E0/E1:** `PLAN.md` (8 objetivos, 4 lições, 4 unidades) e `SOURCES.md` (4 capítulos abertos, edição, licença CC BY-SA 4.0 da página do livro, trechos literais).
- **E2:** 4 unidades novas — `program-design`, `pseudocode`, `flowcharts`, `structured-programming` — com estrutura fixa, 300–900 palavras, ≤3 termos novos e `original_excerpt`. Unidade antiga `th-sem1-algorithms-m01-intro` e os 3 arquivos antigos de exercício removidos (regra 5).
- **E3:** `REVIEW.md` com 47 afirmações sustentadas, 3 aplicações diretas e 2 itens sem suporte rotulados como "Exemplo adicional (IA)". A fonte **não** define "algoritmo" formalmente; OBJ-1 foi ajustado em vez de inventar definição.
- **E4:** 24 exercícios de lição (6 por lição), 8 no desafio (2F/4M/2D) e 10 flashcards; apenas pseudocódigo/fluxograma, sem Python ou outra linguagem; todos com `objective_id`, `level`, `source_ref` e `answer_check`.
- **E5:** 9 termos novos no glossário; `LIBRARY.md` com ordem de leitura e tempos; `src/curriculum/loader.js` passou a indexar `theories` (múltiplas unidades por módulo) e `src/app.js` escolhe a unidade pela lição.
- **E6:** `check-module` ✅ · `validate` ✅ (sem erros nem avisos) · `npm test` ✅ (18 suítes; 9 unidades, 19 lições, 96 exercícios de lição) · `verify-sources` ✅ (9/9).
- **E7:** `"pipeline_version": 1` aplicado **somente a este módulo**; commit único do módulo; sem pendências de conteúdo.
- **ID da 4ª lição:** `l19` (não `l04`, que já pertence ao m02); a ordem didática do módulo continua 1ª–4ª.

### Fase 22: Pipeline — `sem1-algorithms-m02` — ✅ COMPLETO (T165, 2026-10-19)
**Módulo sem1-algorithms-m02 (Variáveis e Tipos) refeito conforme `docs/CONTENT_PIPELINE.md` E0–E7.**
- **E0/E1:** `PLAN.md` (6 objetivos, 3 lições, 5 unidades) e `SOURCES.md` (6 capítulos abertos, edição 2ª de 2018, CC BY-SA 4.0, trechos literais).
- **E2:** 5 unidades novas — `constants-variables`, `identifier-names`, `data-types`, `expressions-operators`, `integer-division-modulus` — com estrutura fixa, 300–900 palavras, ≤3 termos novos e `original_excerpt`. Unidade antiga `th-sem1-algorithms-m02-variables` removida (regra 5).
- **E3:** `REVIEW.md` com a auditoria das afirmações contra os trechos das fontes; aplicações adicionais rotuladas como exemplo de IA.
- **E4:** 18 exercícios de lição (6 por lição; lição 1 sem difícil), 8 no desafio (2F/4M/2D) e 12 flashcards; apenas pseudocódigo neutro, sem sintaxe de linguagem; todos com `objective_id`, `level`, `source_ref` e `answer_check`.
- **E5:** 13 termos novos no glossário; `LIBRARY.md` com ordem de leitura, tempos e mapeamento "praticar este trecho".
- **E6:** `check-module` ✅ · `validate` ✅ (sem erros nem avisos) · `npm test` ✅ (18 suítes; 13 unidades, 19 lições, 99 exercícios de lição) · `verify-sources` ✅ (13/13).
- **E7:** `"pipeline_version": 1` aplicado **somente a este módulo** após os portões; commit único do módulo; sem pendências de conteúdo.

### Fase 22: Pipeline — `sem1-algorithms-m03` — ✅ COMPLETO (T166, 2026-10-19)
**Módulo sem1-algorithms-m03 (Controle de Fluxo) refeito conforme `docs/CONTENT_PIPELINE.md` E0–E7.**
- **E0/E1:** `PLAN.md` (5 objetivos, 4 lições, 11 unidades) e `SOURCES.md` (19 seções capturadas, edição 2ª de 2018, CC BY-SA 4.0, trechos literais).
- **E2:** 11 unidades novas — `structured-programming`, `if-then-else`, `relational-logical-operators`, `nested-if-case`, `iteration-while`, `do-while`, `for-loop`, `nested-loops`, `branching`, `modular-functions`, `params-return-scope` — com estrutura fixa, 300–900 palavras, ≤3 termos novos e `original_excerpt`. Unidade monolítica antiga `th-sem1-algorithms-m03-control-flow` removida (regra 5).
- **E3:** `REVIEW.md` com 47 afirmações auditadas contra a fonte, todas OK com rastreamento de seção.
- **E4:** 26 exercícios de lição (6 por lição; l07/l08/l09 com 6 cada, l10 com 6), 8 no desafio (2F/4M/2D) cobrindo OBJ-1 a OBJ-5, 10 flashcards; todos com `objective_id`, `level`, `source_ref` e `answer_check`. Corrigido: sequência de tipos em l10 (não mais >2 múltipla escolha seguidos); l07 com 3 exercícios ligados a `nested-if-case` (≥3 exigido).
- **E5:** ~20 termos novos no glossário (letras B, C, D, E, F, I, L, M, N, P, R, T, W); `LIBRARY.md` com ordem de leitura e tempos.
- **E6:** `check-module` ✅ · `validate` ✅ (sem erros nem avisos) · `npm test` ✅ (todos os testes verdes; timeout apenas ao final por duração) · `verify-sources` ⚠️ (12/23 confere, 11 não confere por bloqueio CloudFront 403 do site da fonte — verificação manual fora do CI; excerpts capturados em 2026-10-19 contra a fonte ao vivo na data).
- **E7:** `"pipeline_version": 1` aplicado **somente a este módulo** após os portões; `curriculum.json` atualizado com `theories[11]`; commit único do módulo (hash `b89eb71`); sem pendências de conteúdo.

### Fase 22: Correção de mojibake + portão de encoding + qualidade de múltipla escolha — ✅ COMPLETO (2026-10-19)
**Causa raiz:** a sessão anterior usou `Get-Content -Raw | Set-Content -Encoding utf8` no **Windows PowerShell 5.1**. O `Get-Content` decodificou os arquivos UTF-8 como ANSI/CP1252 e o `Set-Content` regravou o texto já corrompido em UTF-8 — dupla codificação (cada letra acentuada e cada travessão passaram a aparecer como duas ou três sequências de caracteres estranhos). O comando foi aplicado em `m01-l04.json` (depois renomeado para `m01-l19.json`) e em `m01-challenge.json`/`m01-flashcards.json` durante a troca `l04`→`l19`. `ReadAllText`/`WriteAllText` posteriores não repararam porque o texto já estava corrompido.
- **Arquivos corrigidos** (reversão determinística CP1252 → UTF-8, somente quando o resultado é UTF-8 válido e reduz os marcadores; regravação UTF-8 sem BOM):
  - `data/exercises/sem1/algorithms/m01-challenge.json` — 152 marcadores (129 de letra acentuada duplicada, 23 de pontuação duplicada).
  - `data/exercises/sem1/algorithms/m01-flashcards.json` — 153 marcadores (125 + 28).
  - `data/exercises/sem1/algorithms/m01-l19.json` — 158 marcadores (140 + 18).
  - Nenhum BOM, U+FFFD ou UTF-8 inválido nos três; JSON e contagens de itens preservados. Palavras conferidas contra os trechos das fontes: "são", "três", "capítulo", "lógica", "ramificação", "iteração" e o separador "›".
- **Portão de encoding:** novo `scripts/lib/text-encoding.mjs` (`encodingIssues`, `findProjectEncodingIssues`, `collectTextFiles`, `countMojibake`), chamado por `scripts/validate.mjs` e `scripts/check-module.mjs`. Varre `.json`, `.md`, `.js`, `.mjs`, `.html`, `.css`, `.yml` (ignora `node_modules`, `lib/`, `.git`) e **falha** com BOM, U+FFFD, UTF-8 inválido ou mojibake (incluindo maiúsculas acentuadas e o separador `›` corrompidos). `npm run validate` valida 400 arquivos de texto.
- **Regra inviolável** em `docs/CONTENT_PIPELINE.md`: todo arquivo é UTF-8 sem BOM; escrever apenas com a ferramenta de edição ou Node (`fs` em `'utf8'`); nunca com redirecionamento, `Set-Content` ou `Out-File` do PowerShell. `index.html` já declara `<meta charset="UTF-8">` e `.editorconfig` já tem `charset = utf-8`.
- **Qualidade de múltipla escolha** (`scripts/lib/module-rules.mjs` + `scripts/check-module.mjs`): falha se o índice da resposta correta se concentrar em **>40%** das questões ou se a opção correta for a **mais longa em >50%** delas. O m01 falhava nos dois critérios; as 15 questões foram rebalanceadas (distribuição final `{0:4, 1:4, 2:4, 3:3}`, máximo 26,7%; correta mais longa em **0/15**), preservando o texto das respostas corretas e reescrevendo apenas distratores quando necessário.
- **Desafio e flashcards:** `ex-sem1-algorithms-m01-challenge-design` aparece só em `m01-challenge.json` (`lesson_id: l01` é metadado de validação); não é rota do app. Conforme `docs/CONTENT_MODEL.md`, desafio e flashcards são coleções validadas pelo `check-module`, não lições — nenhuma ligação nova foi criada. Texto conferido renderizando as coleções com `src/lesson/renderer.js` em jsdom: todos os acentos esperados presentes e zero U+FFFD.
- **Verificação no app:** `#/lesson/l19` aberta no navegador real (`npx serve`), onboarding dispensado; enunciado e explicação exibem "três", "capítulo", "ramificação", "iteração" e "›" corretamente.
- **Portões:** `npm test` ✅ (18 suítes; 49 asserções de validação e 38 de `check-module`) · `npm run validate` ✅ · `npm run check-module -- sem1-algorithms-m01` ✅ (4 unidades, 24 exercícios de lição, 8 do desafio, 10 flashcards).

### Fase 23: Embaralhamento determinístico das alternativas — ✅ COMPLETO (T170–T173, 2026-10-19)
**Objetivo:** embaralhar a ordem das alternativas apenas na exibição, sem tocar na ordem dos dados nem na identidade usada pela correção.
- **T170 — exibição e correção:** novo `src/lesson/option-shuffle.js` (hash FNV-1a + permutação determinística). A permutação de base vem do **id do exercício** e a **tentativa** aplica uma rotação que garante ordem diferente a cada nova tentativa. `src/lesson/renderer.js` passa `attempt` e `src/app.js` calcula `_attempt = attempts + 1`. Cada `<label>`/radio carrega `data-original-index`/`value` com o **índice original**; a correção compara `selectedIndex` com `exercise.correct`, nunca com a posição exibida. Letras (A, B, C…), ordem do DOM, navegação por teclado (1–9/Enter) e `aria` seguem a ordem exibida.
- **T171 — opções dependentes de posição e schema:** o detector em `option-shuffle.js` fixa no fim (na ordem original) opções como "Todas as anteriores", "Nenhuma das alternativas acima", "Ambas", "A e B", "I, II e III". `shuffle` (booleano, opcional, padrão `true`) foi adicionado a `data/exercises/_schema.json`, ao `validate.mjs` (só múltipla escolha) e a `docs/CONTENT_MODEL.md`. `shuffle: false` preserva a ordem autoral.
- **T172 — check-module:** removida a verificação de **concentração da posição** da resposta correta (a posição autoral deixou de importar). Mantida a verificação de que a opção correta não é sistematicamente a mais longa. `scripts/test-check-module.mjs` atualizado para garantir que a concentração não é mais rejeitada.
- **T173 — auditoria e testes:** auditoria dos **68 exercícios de múltipla escolha** do repositório: **0** com opções dependentes de posição (nenhum precisou de ajuste de texto nem de `shuffle: false`) e **0** com "alternativa A"/"primeira opção" em enunciado, opção ou explicação. Novo `scripts/test-multiple-choice-dom.mjs` (em `npm test`): todos os exercícios × 5 tentativas (correta aceita, todos os distratores rejeitados), ordem estável na mesma tentativa e diferente na seguinte, fixas no fim, `shuffle:false`, teclado/ARIA e **1000 tentativas** com distribuição `250/250/250/250` (cada posição entre 15% e 35%).
- **Verificação:** `npm test` ✅ (19 suítes; 68 exercícios de múltipla escolha, 340 acertos e 1020 distratores nos testes) e `npm run validate` ✅ no patch isolado. No navegador real (`npx serve`, `#/lesson/l01`), a ordem variou entre tentativas (`3,1,0,2` → `1,0,2,3` e `1,2,0,3` → `2,0,3,1`), a resposta correta foi aceita e a explicação não citou letras/posições. Observação: a árvore de trabalho contém o `sem1-algorithms-m03` em andamento (fora desta tarefa), que motivou os avisos residuais de `validate` na árvore não commitada.

### Fase 24: SRS por exercício e revisão exercício-a-exercício — ✅ COMPLETO (T174–T180, 2026-10-19)
**Como era antes:** a revisão era **por lição** (`progress.srs_queue`): concluir a lição agendava uma entrada da lição (intervalos 0/1/3/7/21) e "Iniciar revisões" abria a lição **inteira** (`/lesson/:id`), mesmo que só um exercício tivesse sido errado. Havia ainda uma fila paralela `review_queue` (T129) já por exercício, mas a experiência principal continuava por lição. O painel misturava as duas filas (`getCombinedReviewItems`) e contava **lições**. A conclusão exigia percorrer todos os exercícios e não havia como refazer apenas os errados.

**Como ficou:**
- **Fonte única por exercício:** `progress.exercises[id]` guarda `last_result`, `first_try_correct`, `attempts`, `wrong_count`, `last_answered_at`, `srs_stage` e `due_date` (mais `correct`, `xp_earned` e `last_attempt_date`, usados por conquistas/meta diária). `recordExerciseAnswer()` faz **upsert por id** — erros repetidos atualizam o mesmo item e somam `wrong_count`, nunca duplicam.
- **Escada e regras:** primeira resposta correta → estágio 1 (amanhã); acerto em revisão vencida → 1→3→7→21 dias; erro → estágio 0 (hoje) + `wrong_count++`; acerto antes do vencimento mantém a agenda. Acerto de exercício nunca respondido não cria entrada de revisão.
- **Sessão de revisão (`#/review`):** abre só os exercícios vencidos, **um por vez**, no tipo correto, com link "ver a teoria" para a seção do `source_ref` (`#/theory/<id>?section=<seção>`, nova aba) e resumo final ("Você acertou X de Y; 1 exercício volta amanhã/hoje"). Os cards do painel usam `/review?start=<exerciseId>`.
- **Lição sem exigir 100%:** a conclusão mostra "Você acertou X de Y", o XP da sessão e o botão **"Refazer só os que errei (N)"**, que remonta apenas os ids errados (com aviso de modo retry). Sem vidas nem bloqueio por erro; o XP continua sendo concedido **uma única vez** por exercício.
- **Painel:** conta **exercícios** e mostra "N exercício(s) para revisar".
- **Schema v4:** a migração converte a `review_queue` (por exercício) para `progress.exercises`, **descarta `srs_queue`** (revisões por lição, que não informam quais exercícios errar) e zera `review_queue`. XP, nível, streak, conquistas, seções lidas e anotações são preservados; importar JSON antigo passa pela migração. No boot, `pruneInvalidExerciseProgress()` remove ids órfãos **silenciosamente** (módulos refeitos).
- **Testes:** `scripts/test-core.mjs` reescrito para o SRS por exercício + migração v3→v4; novo `scripts/test-review-dom.mjs` (migração/órfãos, contador do painel, sessão um-a-um com teoria/resumo, resultado/retry da lição, erro repetido = 1 item, `?start`, acerto avança estágio e sai da fila, persistência após reload e export/import preservando registros); `test-lesson-dom.mjs` e `test-e2e-dom.mjs` atualizados. `npm test` ✅ (20 suítes) e `npm run validate` ✅; app aberto no navegador para errar exercícios de propósito.

---

## 🎯 Próxima Etapa

**✅ Converged (2026-10-16), conteúdo limpo (2026-10-17), "completar código" + XP corrigidos (2026-10-18), pipeline de conteúdo criada (2026-10-19), piloto m01 e módulo m02 refeitos (2026-10-19), SRS por exercício (2026-10-19).** A implementação satisfaz `spec.md` (AC-01…AC-17), `plan.md`, `tasks.md` e a constitution (`.specify/constitution.md`). T164 e T165 concluídas; restam os módulos T166–T169.

**Converge — 2ª rodada:** avaliados os 15 critérios de aceitação (AC-01…AC-15) e as seções 3–10 da spec, decisões do plan e princípios da constitution. **0 findings actionable** — nenhuma tarefa nova anexada (a Fase 15 já havia coberto o único item: T126, acesso à biblioteca pelo menu). AC-10 (deploy publicado) e T100 (QA manual em navegador) não são lacunas de código.

**Implement executado em 2026-10-16** — T121–T126 concluídas (docs do modelo de conteúdo, teste e2e da jornada, filtro da biblioteca, teste do 404, memoização da busca, entrada "Biblioteca" no menu) e também T093/T094/T095/T097. `npm test` verde (**16 suítes**) e `npm run validate` sem erros.

**Correções pós-QA (2026-10-16)** — T127–T129 concluídas (responsividade móvel da biblioteca, metas de XP 100/300/600/1000 com destaque HARDCODE, revisões no mesmo dia via fila de erros + revisão de lição). `npm test` verde (**16 suítes**, +1 com `scripts/test-responsive.mjs`) e `npm run validate` sem erros (schema **v3**).

**Limpeza do conteúdo placeholder (2026-10-17)** — T137–T141 concluídas a partir do `CONTENT_AUDIT.md`: removidas 188 unidades e 940 exercícios placeholder; currículo do 1º semestre restrito a m01–m03; `pending` adicionado a `verification_status`; as 6 unidades reais reconferidas na 3ª edição (Levin) e na fonte (Programming Fundamentals); `ATTRIBUTIONS.md` regerado. `npm test` verde (**16 suítes**) e `npm run validate` sem erros.

**Endurecimento da validação (2026-10-17)** — T142–T147 concluídas para que o problema do `CONTENT_AUDIT.md` não se repita: regras anti-placeholder em `scripts/lib/content-rules.mjs` (URL genérica, trecho literal em inglês ≥ 15 palavras, `verified_at`/`verification_method`, licença/edição proibida, exercícios placeholder/sem citação), `ATTRIBUTIONS.md` com bloco **gerado** e comparação estrita, `scripts/verify-sources.mjs` manual e `scripts/test-validation.mjs` no `npm test`. `npm test` verde (**17 suítes**) e `npm run validate` sem erros nem avisos.

**Correção do "completar código" (2026-10-18)** — T148–T153: o código passou a ser **fixo** (não editável) com **campos inline** por lacuna; a verificação compara só as lacunas com `accepted_answers` (normalizando espaços e aspas) e, no erro, mostra a resposta de referência sem punir. 8 exercícios migrados; schema, `docs/CONTENT_MODEL.md` e `validate.mjs` atualizados (nº de `___` = nº de lacunas; nenhuma lacuna sem resposta aceita); testes de interação cobrem acerto/erro/vazio/código-inteiro-na-lacuna e audits dos 4 outros tipos (com 4 bugs de interface encontrados e corrigidos: destaque do "ordenar passos", reset de "ordenar passos" e "múltipla escolha", tecla duplicada em "verdadeiro/falso"). Exercício resolvido no navegador real. `npm test` verde (**17 suítes**) e `npm run validate` sem erros.

**Normalização + XP uma vez (2026-10-18)** — T154–T157: a normalização deixou de **remover todos** os espaços (o que aceitava erros como `notx` ≈ `not x` e `"ab"` ≈ `"a b"`); agora colapsa espaços, limpa só o entorno de operadores/pontuação, preserva espaço entre palavras e não toca no conteúdo entre aspas. O XP passou a ser concedido **uma única vez por exercício** (`calculateExerciseXP`): repetir um exercício já acertado vale **0** (antes dava para "farmar" retry XP). `npm test` verde (**17 suítes**; 72 no core) e `npm run validate` sem erros.

Restam apenas itens que exigem ambiente externo:
1. **T090 / Deploy (Fase 10)** — validar o fallback `404.html` e o redirect no GitHub Pages **publicado** (o teste estático `scripts/test-404.mjs` já cobre a lógica offline).
2. **T100 / QA manual (Fase 11)** — jornada real em navegador (a jornada automatizada está em `scripts/test-e2e-dom.mjs`).
3. Ao publicar, atualizar `ATTRIBUTIONS.md`/CHANGELOG com a data do deploy.

Verificação automatizada: `npm test` (20 suítes) e `npm run validate`. Com rede: `CHECK_URLS=1 npm run validate` valida as URLs das fontes e `npm run verify-sources` confere cada trecho contra a fonte viva.

---

## 📚 Decisões de Fontes Aprovadas (conforme `.specify/plan.md` Seção 9)

### ✅ Aprovadas para Derivação (cópia, tradução, adaptação permitidas)

| # | Fonte | Disciplina/Cobertura | Edição/Versão | Licença | URL Licença | Data Conferência | Restrições |
|---|-------|---------------------|---------------|---------|-------------|------------------|------------|
| 1 | **Mathematics for Computer Science** (Lehman, Leighton, Meyer) | Matemática Discreta: lógica, provas, indução, grafos, probabilidade, teoria dos números | Spring 2018 (MIT 6.042) — **somente esta edição** | **CC BY-SA 3.0** | https://courses.csail.mit.edu/6.042/spring18/mcs.pdf (front matter) | 2026-10-15 | Usar só esta edição; OCW 2015 e LibreTexts são NC |
| 8 | **Discrete Mathematics: An Open Introduction** (Oscar Levin) | Matemática Discreta: lógica, conjuntos, funções, contagem, grafos, provas | **3ª edição** (2019, `dmoi3.html`) — **não usar 4ª (NC-SA)** | **CC BY-SA 4.0** | https://discrete.openmathbooks.org/dmoi3.html | 2026-10-17 | 3ª ed. apenas (URLs `.../dmoi3/...`) |
| 10 | **Programming Fundamentals** (Busbee & Braunschweig) | Algoritmos e Lógica: variáveis, controle, funções, pseudocode, flowcharts | **2ª edição** (2018), Rebus/Pressbooks | **CC BY-SA 4.0** | https://press.rebus.community/programmingfundamentals/front-matter/preface/ | 2026-10-17 | Conferir licença por capítulo/imagem — "exceto onde indicado" |
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

2. **Regra de validação**: `scripts/validate.mjs` (regras puras em `scripts/lib/content-rules.mjs`) **rejeita** licença fora de `ALLOWED_LICENSES = ['CC0-1.0', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0', 'PUBLIC-DOMAIN']`, edição proibida (ex.: Levin 4ª, NC), `source.url` genérica, unidade `verified_with_source` sem `original_excerpt` literal (inglês, ≥ 15 palavras) / `verified_at` / `verification_method`, exercício com placeholder ou explicação sem citar a fonte, e `ATTRIBUTIONS.md` divergente do bloco gerado.

3. **Constitution §2**: Nenhum texto teórico inventado. Se a fonte não for acessada → unidade fica `verification_status: "pending"` (não conferida) ou `"unverified"` (conferida e não confirmada) e não aparece na trilha (só no mapa como "em construção"). **Nenhuma** unidade é `verified_with_source` sem trecho original literal conferido contra a fonte (AC-14).

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