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