# Constitution — ensina-logica

## Princípios Fundamentais

### 1. Stack Vanilla — Sem Build, Sem Framework
- HTML, CSS e JavaScript puros (ES Modules).
- Nada de bundlers, transpiladores ou frameworks no runtime.
- Scripts de desenvolvimento (validadores, geradores) são permitidos como ferramentas auxiliares opcionais (Node), mas não são necessários para rodar o site.

### 2. Conteúdo com Fonte e Licença — Zero Invenção
- **Nenhum texto teórico é escrito a partir da memória.** Toda unidade deriva de uma fonte real, acessada e verificada.
- **Só é permitido copiar, traduzir ou adaptar conteúdo de fontes com licença permissiva** (domínio público, CC0, CC BY, CC BY-SA), **confirmada na página da própria fonte**. Fontes NC, ND, "todos os direitos reservados" ou com licença não confirmada só podem aparecer como link de "leitura recomendada", sem copiar o texto.
- **Se a fonte não puder ser acessada, a unidade fica marcada como `pendente` e nunca é preenchida de memória.**
- Cada unidade de conteúdo carrega metadados obrigatórios: `id`, `title`, `discipline/module`, `source` (title, authors, URL, chapter/section, access_date), `license` (SPDX ou nome oficial), `derivation_type` (`original` | `translated` | `adapted` | `summarized`), `language`, `verification_status` (`pending` | `unverified` | `verified_with_source`), `linked_lessons[]`, `linked_exercises[]`.
- **Nenhuma unidade pode ser `verified_with_source` sem um trecho original literal conferido contra a fonte.** Isso exige `original_excerpt` no idioma da fonte (inglês), com **≥ 15 palavras**, e os campos `verified_at` (data `YYYY-MM-DD`) e `verification_method`. O CI (`scripts/validate.mjs`) **rejeita** placeholders, trechos gerados/traduzidos no lugar do original, `source.url` genérica (homepage sem capítulo/seção), licenças fora de CC0/CC BY/CC BY-SA/domínio público e edições proibidas (ex.: Levin 4ª edição, NC). A conferência do trecho contra a fonte viva é feita manualmente por `scripts/verify-sources.mjs` (fora do CI).

### 3. IA como Ferramenta, Não Autor
- Traduções/adaptações por IA mantêm referência ao original; quando a licença permite, o trecho original fica disponível via alternador "ver original".
- Exercícios gerados por IA: ligados a uma unidade teórica, com resposta/explicação conferidas contra a fonte, marcados como "gerados por IA", e (se código) executados/testados antes de entrar.
- Atribuição sempre visível: autor, fonte, licença, link, indicação de tradução por IA.

### 4. Licenças — Código ≠ Conteúdo
- **Código:** MIT (livre, até comercial, mantém copyright/licença).
- **Conteúdo próprio do projeto:** CC BY-SA 4.0 (atribuição + compartilhamento pela mesma licença).
- **Conteúdo derivado de terceiros:** a licença da fonte **prevalece** sobre a licença padrão do projeto. Metadados e atribuição na interface refletem a licença da fonte.

### 5. Acessibilidade por Padrão
- Navegação 100% por teclado, foco visível, skip links.
- Contraste WCAG AA mínimo.
- Respeita `prefers-reduced-motion` (animações desligadas/alternativas).
- **Nunca só cor** para indicar estado (acerto/erro, XP, streak): sempre ícone + texto + cor.
- ARIA live regions para anúncios de XP, streak, conquistas.
- Paleta segura para daltônicos (opção futura).

### 6. Privacidade — Zero Rastreamento
- **Nenhum cookie**, nenhum analytics, nenhum script de terceiros que colete dados.
- Progresso salvo apenas no dispositivo do usuário (`localStorage` no MVP, com camada de abstração para trocar por IndexedDB no futuro).
- Exportar/importar progresso em JSON versionado (campo `schema_version` para migrações).

### 7. GitHub Pages — Caminhos Relativos, Hash Routing
- Funciona em `https://oldfaraday.github.io/ensina-logica/` (subcaminho).
- **Somente caminhos relativos** (nada de `/absoluto`).
- Roteamento por hash (`#/`).
- Inclui `404.html` e `.nojekyll`.
- Workflow GitHub Actions para deploy no Pages + validação a cada push/PR (links quebrados, metadados obrigatórios, licenças permitidas).

### 8. Bibliotecas de Terceiros — Locais, Fixas, Atribuídas
- Bibliotecas externas **apenas se essenciais** (ex.: KaTeX para matemática, highlight.js para destaque de código).
- **Hospedadas localmente no repositório** (sem CDN em tempo de execução), com **versão fixa** (ex.: `katex@0.16.9`, `highlight.js@11.9.0`).
- Inclui arquivos de fonte do KaTeX (`.woff2`, `.ttf`) com caminhos relativos.
- Nome, versão e licença de cada biblioteca registrados no arquivo de atribuições (`ATTRIBUTIONS.md` ou `NOTICE`).
- Nenhuma biblioteca é adicionada sem confirmação prévia de licença permissiva (MIT, BSD, Apache-2.0, etc.).

### 9. Dados de Currículo — Estrutura Expansível
- Mapa completo dos 8 semestres como dados (JSON/Markdown com front-matter), mesmo que só o 1º semestre tenha conteúdo completo no MVP.
- Novas unidades, lições e exercícios entram como **arquivos de dados** (não mexem em código).
- Estrutura: `semester → discipline → module → lesson → theory_unit / exercise`.

### 10. Gamificação — Duolingo Style (MVP)
- XP, níveis, streak diário **com congelamento para dias de folga**, conquistas, revisão espaçada, metas diárias.
- **Sem vidas/erros**.
- Progresso desbloqueia linearmente **dentro da disciplina**; livre **entre disciplinas do mesmo semestre**.

### 11. Biblioteca Teórica — Leitura Focada
- Página limpa, índice lateral navegável, marcar seção como lida, **anotações por seção**, busca full-text.
- Cada unidade mostra: atribuição da fonte, alternador "ver original" (quando licença permite), botão "praticar este trecho" → exercícios ligados.

### 12. Internacionalização Preparada
- Textos da interface **separados do código** (arquivos de locale, ex.: `locales/pt-BR.json`), para facilitar tradução futura.

### 13. Aviso de Escopo
- Interface e README deixam claro: **não substitui uma graduação**; conteúdo derivado de fontes abertas, traduzido/adaptado com IA, pode conter erros.
- Link simples para reportar erro (GitHub Issues).

---

*Esta constituição governa todas as decisões de arquitetura, conteúdo e processo do projeto. Qualquer exceção requer aprovação explícita e registro no CHANGELOG.*