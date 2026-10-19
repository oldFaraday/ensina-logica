# Specify — ensina-logica

## Visão Geral

Uma plataforma web **gamificada, estilo Duolingo**, para estudar o conteúdo de uma graduação em **Ciência da Computação (Bacharelado, 8 semestres)**, junto com uma **biblioteca de teoria densa** (nível livro-texto/notas de aula), com conteúdo **real, verificável e com fonte**.

- **Público:** estudantes autodidatas, calouros, quem quer revisar fundamentos.
- **Diferencial:** teoria com fonte rastreável, exercícios ligados à teoria, progresso persistente offline, zero rastreamento, roda no GitHub Pages.
- **Escopo MVP:** mapa completo dos 8 semestres como dados; **1º semestre end-to-end** (Algoritmos e Lógica de Programação + Matemática Discreta/Lógica) com lições, exercícios e teoria completos.
- **Tamanho mínimo do 1º semestre:** 2 disciplinas × 3 módulos cada = 6 módulos. Cada módulo com **pelo menos 1 unidade teórica, 3–5 lições e flashcards**. Se o conteúdo real disponível for menor, o app **funciona mesmo assim** e a diferença é registrada no CHANGELOG/docs.

## Identidade Visual (neo-brutalista)

- **Direção:** neo-brutalista — chapado, contrastado, honesto. Detalhes em `DESIGN.md`.
- **Bordas:** sólidas e grossas (2–4 px) em cartões, botões e campos.
- **Sombras:** duras, sem desfoque, deslocadas; botões têm efeito de "apertar" ao clicar, **desativado** com `prefers-reduced-motion`.
- **Cores:** planas e saturadas, **sem gradientes**. Tema claro com fundo **creme**; tema escuro com fundo **quase preto** e bordas/sombras claras.
- **Cantos:** retos ou quase retos (raio 0–4 px).
- **Tipografia:** títulos pesados (800); **monoespaçada** para código e rótulos. Fontes por **pilhas do sistema** (sem download, sem CDN) para preservar "zero requisições externas".
- **Centralização:** todas as cores, tipografia, espaçamentos, espessuras, sombras e alvos de toque são **tokens CSS** (`src/ui/theme.css`); **nenhum valor solto**.
- **Contraste:** pares de cor verificados por `scripts/test-contrast.mjs` (falha abaixo de **WCAG AA**).
- **Estado nunca só por cor:** acerto/erro/bloqueado/concluído/selecionado sempre incluem **ícone ou texto**.

---

## Jornada do Usuário (MVP)

### 1. Primeira visita
- Tela de boas-vindas explica: "Isso não substitui uma graduação. Conteúdo derivado de fontes abertas, traduzido/adaptado com IA, pode conter erros."
- Escolhe meta diária (XP alvo: 10 / 20 / 30 / 50).
- Inicia no **1º semestre**, duas disciplinas disponíveis: *Algoritmos e Lógica de Programação* e *Matemática Discreta/Lógica*.

### 2. Navegação da trilha
- Visão de **semestre** → cards de disciplinas.
- Dentro da disciplina: **módulos lineares** (módulo 1 → 2 → 3...). Só avança ao concluir o anterior (conclusão = todas as lições do módulo marcadas como "dominadas").
- **Livre entre disciplinas do mesmo semestre**: pode alternar a qualquer momento.
- Semestres 2–8: visíveis no mapa como **"Em breve"** (sem links quebrados, sem lições vazias). Não são clicáveis no MVP; servem apenas para mostrar o roadmap do curso.

### 3. Lição (unidade atômica de prática)
- Uma lição = 1 tela focada em **um conceito** (ex.: "Laço `while`", "Tabela-verdade de `E` lógico").
- Componentes da lição:
  - **Resumo teórico curto** (2–3 parágrafos) com link "ler na biblioteca" → abre a unidade teórica correspondente.
  - **3–5 exercícios** variados (múltipla escolha, V/F, ordenar passos, completar código, flashcards).
  - Feedback imediato: **ícone + texto + cor** (nunca só cor). Explicação da resposta correta com referência à teoria.
  - Ao acertar: ganha **XP** (base 10 XP, bônus por streak, bônus por primeira vez).
  - Ao errar: sem penalidade de "vidas"; vê explicação, pode tentar de novo (XP reduzido na re-tentativa).
  - Botão **"Praticar mais"** → abre exercícios extras da mesma unidade teórica (revisão espaçada).

### 4. Biblioteca Teórica (leitura profunda)
- Acessível via menu lateral ou link "ler na biblioteca" de qualquer lição.
- **Página de leitura limpa**: texto central, índice lateral navegável (módulo → seções).
- **Marcar seção como lida** (checkbox por seção, não parágrafo).
- **Anotações por seção**: campo de texto salvo localmente, vinculado à seção.
- **Busca full-text** (título, conteúdo, metadados).
- **Cabeçalho da unidade** sempre mostra:
  - Atribuição completa: autor, título da fonte, capítulo/seção, URL, licença (SPDX), data de acesso.
  - **Alternador "Ver original"** (quando licença da fonte permite): mostra o trecho original lado a lado com a tradução.
  - **Botão "Praticar este trecho"** → abre lista de lições/exercícios ligados a essa unidade teórica.
- Badge de status de verificação: `não verificado` | `conferido com a fonte`.

### 5. Gamificação
- **XP**: base por exercício (10), bônus primeira vez (+5), bônus streak (ver abaixo).
- **Níveis**: cada nível = 1000 XP (ajustável). Mostra barra de progresso para próximo nível.
- **Streak diário**: conta dias consecutivos com ≥ 1 exercício concluído.
  - **Congelamento (streak freeze)**: 1 por semana, ativado automaticamente se usuário não abre o app num dia. Recarrega toda segunda-feira. Mostra contador de freezes disponíveis.
- **Conquistas (badges)**: exemplos — "Primeira lição", "Streak 7 dias", "Módulo 1 concluído", "100 exercícios", "Primeira anotação", "Exportou progresso".
- **Revisão espaçada (SRS simplificado)**: o SRS é **por exercício**. A primeira resposta correta agenda a revisão para o dia seguinte; acertos em revisões vencidas avançam a escada **1 → 3 → 7 → 21 dias**; um erro reinicia o exercício (estágio 0, vence hoje) e soma `wrong_count`. Erros repetidos atualizam o **mesmo** item (nunca duplicam). A sessão de revisão abre só os exercícios vencidos, **um por vez**, no tipo correto, com link "ver a teoria" para a seção do `source_ref` e resumo final ("Acertou X de Y; …"). Exercícios de revisão sem XP creditado valem XP reduzido (5). O painel mostra "N exercícios para revisar".
- **Conclusão da lição sem exigir 100%**: ao responder todos os exercícios, o aluno vê "Você acertou X de Y" e pode concluir mesmo com erros. O botão **"Refazer só os que errei (N)"** remonta apenas os exercícios errados. Não há vidas, bloqueio por erro nem XP duplicado.
- **Metas diárias**: usuário escolhe XP alvo/dia. Barra de progresso no topo. Notificação (toast) ao atingir. Confete discreto (respeita `prefers-reduced-motion`).

### 6. Progresso & Persistência
- Salvo automaticamente no `localStorage` (camada de abstração `ProgressStore` para trocar por IndexedDB no futuro).
- Dados: XP total, nível, streak atual, freezes restantes, último acesso, metas, lições concluídas, exercícios respondidos (certos/errados/tentativas, `last_result`, `first_try_correct`, `wrong_count`, `srs_stage`, `due_date`), anotações, seções marcadas como lidas, conquistas desbloqueadas. `review_queue`/`srs_queue` são legados vazios a partir do schema v4.
- **Exportar progresso** → baixa arquivo `progresso-ensina-logica-<data>.json` com `schema_version`.
- **Importar progresso** → valida `schema_version`, migra se necessário, sobrescreve localStorage.
- **Resetar progresso** → limpa tudo, mantém preferências (meta diária, tema).

### 7. Acessibilidade & Privacidade
- 100% teclado: foco visível, skip links, ordem lógica.
- Contraste AA, `prefers-reduced-motion` desliga animações/confete.
- **Nunca só cor**: acerto = ✅ verde + "Correto!", erro = ❌ vermelho + "Incorreto".
- ARIA live regions para anúncios: "+10 XP", "Streak 5 dias!", "Conquista desbloqueada".
- **Zero cookies, zero analytics, zero scripts externos**. Tudo roda no navegador do usuário.

### 8. Visual & Idioma
- Tema claro/escuro: respeita `prefers-color-scheme`, toggle manual persiste no localStorage.
- **Interface em pt-BR** (textos em `locales/pt-BR.json` para i18n futuro).
- Sem mascote no MVP.

### 9. Fontes & Licenças (regras de conteúdo)
- **Nenhum texto teórico inventado**. Se não acessou a fonte → unidade fica `pendente` (não aparece na trilha, só no mapa como "em construção").
- Fontes permitidas para derivar: domínio público, CC0, CC BY, CC BY-SA — **licença confirmada na página da fonte**.
- Fontes NC, ND, "todos os direitos reservados", licença incerta → **apenas link "Leitura recomendada"**.
- Cada unidade derivada carrega metadados obrigatórios (ver Constitution §2).
- **Licença da fonte prevalece** sobre licença padrão do projeto (CC BY-SA 4.0).
- Atribuição visível na unidade teórica e no arquivo consolidado `ATTRIBUTIONS.md`.
- Bibliotecas terceiras (KaTeX, highlight.js) hospedadas localmente, versão fixa, creditadas em `ATTRIBUTIONS.md`.
- **Exercícios gerados por IA:** obrigatoriamente ligados a uma unidade teórica, com **resposta correta e explicação conferidas contra a fonte**, marcados como **"gerados por IA"** na interface. Exercícios de código **devem ser executados/testados antes de entrar** no repositório.
- **Antes de usar qualquer fonte no 1º semestre, o Plan deve apresentar a lista de fontes candidatas com a licença confirmada na página de cada uma, para aprovação do usuário.** Nenhuma fonte entra sem essa validação.

### 10. Entregáveis do Repositório (Definition of Done)
O projeto só está "pronto" quando existirem:
- Aplicação funcionando localmente (`index.html`) e no GitHub Pages (`https://oldfaraday.github.io/ensina-logica/`).
- `README.md` pt-BR: o que é, screenshots/descrição, como rodar, como publicar no Pages, estrutura de pastas, **como adicionar conteúdo**, aviso de escopo, licenças, como contribuir.
- `LICENSE` (MIT), `CONTENT_LICENSE.md` (CC BY-SA 4.0 + regra de prevalência da fonte).
- `ATTRIBUTIONS.md` (todas as fontes de conteúdo + bibliotecas terceiras).
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` (curto), `CHANGELOG.md`.
- `.github/workflows/`: deploy Pages + validação (links, metadados, licenças).
- `.gitignore`, `.editorconfig`, `.nojekyll`, `404.html`, favicon, meta tags (Open Graph).
- Documentação do modelo de conteúdo e fluxo "adicionar fonte → gerar unidade → verificar → publicar".
- **Checklist de publicação** em pt-BR: criar repo, push, ativar Pages, conferir URL.

---

## Fora do Escopo (MVP)
- Backend, sincronização na nuvem, contas de usuário.
- Fórum, social, leaderboards.
- Geração de PDF/certificado.
- Outros idiomas de interface (preparado, não implementado).
- Modo daltônico (preparado, não implementado).
- Service Worker / offline completo (opcional futuro).
- Disciplinas dos semestres 2–8 com conteúdo completo (apenas mapa de dados).

---

## Critérios de Aceitação (MVP)

| ID | Critério |
|----|----------|
| AC-01 | Abre `index.html` no navegador → carrega sem erros, mostra boas-vindas, meta diária, 1º semestre com 2 disciplinas. |
| AC-02 | Navega: semestre → disciplina → módulo → lição. Módulos lineares dentro da disciplina; livre entre disciplinas do mesmo semestre. |
| AC-03 | Lição mostra resumo teórico + 3–5 exercícios (múltipla escolha, V/F, ordenar, completar código, flashcards). Feedback com ícone+texto+cor + explicação. |
| AC-04 | XP, nível, streak com freeze, conquistas, revisão espaçada, meta diária funcionando e persistindo no localStorage. |
| AC-05 | Biblioteca abre do menu e do link "ler na biblioteca". Índice lateral, marcar seção lida, anotações por seção, busca, atribuição, "ver original" (quando permitido), "praticar este trecho". |
| AC-06 | Exportar/importar progresso JSON versionado funciona (round-trip). |
| AC-07 | Tema claro/escuro toggle + `prefers-color-scheme`. |
| AC-08 | 100% navegável por teclado, contraste AA, `prefers-reduced-motion` respeitado, ARIA live para XP/streak/conquistas. |
| AC-09 | Zero cookies, zero analytics, zero scripts externos. |
| AC-10 | Deploy no GitHub Pages via Actions funciona; validação roda a cada push/PR. |
| AC-11 | Todos os arquivos de repositório listados em "Entregáveis" existem e estão corretos. |
| AC-12 | Mapa dos 8 semestres existe como dados (mesmo que só 1º tenha conteúdo). |
| AC-13 | Unidades teóricas têm metadados obrigatórios; fontes confirmadas; `pendente` onde fonte não acessada. |
| AC-14 | Nenhuma unidade pode ser `verified_with_source` sem um **trecho original literal conferido contra a fonte**: `original_excerpt` no idioma da fonte (inglês), com **≥ 15 palavras**, mais `verified_at` e `verification_method`. |
| AC-15 | O validador de CI (`scripts/validate.mjs`) **rejeita**: URL de fonte genérica (homepage sem capítulo/seção), trecho placeholder/gerado ou em português, licença fora de CC0/CC BY/CC BY-SA/domínio público, edição proibida (Levin 4ª, NC), exercício com enunciado/explicação de placeholder ou explicação sem citar a fonte, e `ATTRIBUTIONS.md` cujo bloco gerado difira das unidades reais. |
| AC-16 | Um módulo só recebe `"pipeline_version": 1` em `data/curriculum.json` depois que **`npm run check-module -- <id>`, `npm run validate`, `npm test` e `npm run verify-sources`** passam. Antes disso os campos `objective_id`, `level`, `source_ref` e `answer_check` não são exigidos (módulos antigos seguem válidos). |
| AC-17 | O SRS é **por exercício** (`progress.exercises[id].srs_stage/due_date/wrong_count`), com upsert sem duplicar. Concluir a lição não exige acerto total e mostra "Você acertou X de Y" + "Refazer só os que errei (N)". A rota `#/review` abre somente exercícios vencidos, um por vez, no tipo correto, com link para a teoria do `source_ref` e resumo final. O painel conta exercícios ("N exercícios para revisar"). Schema v4 migra a fila antiga por exercício, descarta revisões por lição e o boot remove ids órfãos silenciosamente. XP, nível, streak, conquistas, seções lidas e anotações são preservados, inclusive em export/import. |