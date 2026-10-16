# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere a [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado
- Estrutura inicial do projeto com Spec Kit
- Constitution, Spec, Plan, Tasks
- Estrutura de pastas completa
- package.json, .gitignore, .editorconfig, .nojekyll, 404.html
- index.html shell com header, main, footer, tema, i18n
- locales/pt-BR.json com todas as strings da interface
- README.md, LICENSE (MIT), CONTENT_LICENSE.md, ATTRIBUTIONS.md
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
- Favicon SVG

### Corrigido
- **T127 — Responsividade móvel da Biblioteca Teórica** (`fix(ui)`): em `#/theory/:id` e `#/library`, blocos largos (fórmulas KaTeX em bloco, `<pre>`, `<table>`, imagens) não estouram mais o viewport no celular. `src/ui/theme.css`: `min-width:0` no grid `.theory-layout` e seus filhos (+ `max-width:100%` em `.theory-main`/`.theory-sidebar-host`/`.theory-unit`/`.theory-section`); `pre`/`pre code` e `.katex-display` rolam dentro do próprio bloco; mídia/tabelas limitadas; `overflow-wrap`/`word-break` nos contêineres de texto; campos da biblioteca com `width:100%`; coluna única e índice lateral **depois** do conteúdo no celular (DOM reordenado, desktop inalterado); rede de segurança `html { overflow-x: clip; }`. Novo teste estático `scripts/test-responsive.mjs` em `npm test`.

### Alterado
- **T128 — Metas de XP 100/300/600/1000 + destaque HARDCODE** (`feat(gamification)`): a escala antiga `[10,20,30,50]` era batida com uma única lição (~60–83 XP). Novas metas **100/300/600/1000**, default **300** ("Moderado") pré-selecionado na modal de boas-vindas e em Configurações. A opção **1000**, quando selecionada, mostra 👿 ao lado do texto e a legenda **HARDCORE** abaixo (decorativos, `aria-hidden`; estado nunca só por cor). i18n: `welcome.goals` atualizado e nova chave `welcome.hardcore`; o rótulo traduzido é exibido no botão (nome acessível inclui o nível). **Não** altera a fórmula de XP nem a lógica de níveis.
- **T129 — Revisões no mesmo dia** (`feat(srs)`): ao errar um exercício, ele passa a aparecer em **"Revisões pendentes"** no painel já **no mesmo dia** (antes só revisões de lição ao concluir, no dia seguinte). `SRS_INTERVALS` passa a `[0,1,3,7,21]` (índice 0 = hoje). Nova fila `progress.review_queue` (uma entrada por exercício, sem duplicar; conta erros): acerto em revisão avança a escada, erro reinicia para hoje; acerto de exercício nunca errado não agenda nada. Concluir uma lição também agenda a revisão dela para hoje. Schema migrado para **v3** (adiciona `review_queue`, mantendo compatibilidade com progresso v2 importado). **Não** introduz vidas nem bloqueio por erro. i18n: nova chave `dashboard.next_review_in`. Testes: `scripts/test-core.mjs` (fila + migração) e `scripts/test-e2e-dom.mjs` (errar → revisão no painel no mesmo dia).

### Planejado (MVP)
- Phase 1: Setup completo
- Phase 2: Foundational (router, store, curriculum loader, validação, testes, CI/CD)
- Phase 3: US1 - Onboarding & Semester View
- Phase 4: US2 - Discipline & Module Navigation
- Phase 5: US3 - Lesson & Exercises (5 tipos)
- Phase 6: US4 - Theory Library
- Phase 7: US5 - Gamification Dashboard & Settings
- Phase 8: US6 - 1º Semestre Conteúdo (6 módulos, teoria + exercícios)
- Phase 9: US7 - Acessibilidade & Privacidade
- Phase 10: US8 - Deploy & Repo Files
- Phase 11: Polish

---

## Convenções

- **Adicionado** para novas funcionalidades
- **Alterado** para mudanças em funcionalidades existentes
- **Removido** para funcionalidades removidas
- **Corrigido** para correções de bugs
- **Segurança** para vulnerabilidades corrigidas

## Links

- [Repositório](https://github.com/oldfaraday/ensina-logica)
- [Issues](https://github.com/oldfaraday/ensina-logica/issues)
- [GitHub Pages](https://oldfaraday.github.io/ensina-logica/)