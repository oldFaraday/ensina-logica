# Contribuindo para Ensina Lógica

Obrigado por considerar contribuir! Este projeto segue a metodologia **Spec-Driven Development** com o [Spec Kit](https://github.com/github/spec-kit).

## 📋 Antes de começar

1. Leia a [Constitution](.specify/constitution.md) — ela governa todas as decisões de arquitetura, conteúdo e processo
2. Leia a [Spec](.specify/spec.md) — especificação do produto
3. Leia o [Plan](.specify/plan.md) — plano técnico detalhado
3. Verifique se a issue/PR está alinhada com o escopo do MVP

## 🎯 Tipos de contribuição bem-vindos

### Conteúdo (Data-driven — sem mexer em código)
- Adicionar unidades teóricas em `data/theory/` (seguindo o schema e regras de licença)
- Adicionar exercícios em `data/exercises/` (ligados a unidade teórica, verificados contra fonte)
- Atualizar `data/curriculum.json` para novas lições/módulos
- Atualizar `ATTRIBUTIONS.md` com novas fontes

### Código
- Correções de bugs na lógica de gamificação, navegação, renderização
- Melhorias de acessibilidade (WCAG AA, teclado, ARIA)
- Otimizações de performance (lazy loading, memoização)
- Testes unitários para lógica pura

### Documentação
- Melhorias no README, guias de contribuição
- Documentação do modelo de dados e fluxo "adicionar fonte → gerar unidade → verificar → publicar"

## ✅ Checklist antes de abrir PR

- [ ] `npm run validate` passa (links, metadados, licenças, schemas)
- [ ] `npm test` passa (100% cobertura funções puras: XP, streak, SRS, unlock, ProgressStore)
- [ ] Se adicionou conteúdo: fonte tem licença permissiva confirmada na página da fonte
- [ ] Se adicionou conteúdo: unidade tem `verification_status: verified_with_source`
- [ ] Se adicionou exercício: `generated_by_ai: true`, resposta/explicação conferidas, código testado
- [ ] Código segue vanilla ES Modules, sem build step
- [ ] Nenhuma dependência externa adicionada sem aprovação prévia de licença
- [ ] Commits atômicos, mensagens claras

## 🔄 Fluxo de trabalho

1. **Issues**: Use templates (bug, feature, content)
2. **Branch**: `feature/descricao-curta` ou `fix/descricao-curta`
3. **Commits**: Convencionais (`feat:`, `fix:`, `docs:`, `content:`)
4. **PR**: Referencie a issue, descreva mudanças, inclua screenshots se UI
5. **Review**: CI roda validate + test automaticamente
6. **Merge**: Squash and merge na `main` → deploy automático no Pages

## 📝 Padrões de código

- **JavaScript**: ES Modules, vanilla, sem build
- **CSS**: Variáveis customizadas para temas, mobile-first
- **HTML**: Semântico, acessível (ARIA quando necessário)
- **Dados**: JSON/Markdown com front-matter, validados por JSON Schema
- **Testes**: Node puro (`scripts/test-core.mjs`), sem framework

## 🚫 O que NÃO aceitamos no MVP

- Backend, sincronização na nuvem, contas de usuário
- Fórum, social, leaderboards
- Geração de PDF/certificado
- Outros idiomas de interface (preparado, não implementado)
- Modo daltônico (preparado, não implementado)
- Service Worker / offline completo
- Disciplinas dos semestres 2–8 com conteúdo completo (apenas mapa de dados)
- Frameworks, bundlers, transpiladores no runtime
- Cookies, analytics, scripts externos que coletam dados

## 📞 Dúvidas?

Abra uma issue com label `question` ou inicie uma Discussion.