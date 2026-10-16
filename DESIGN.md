# DESIGN — Identidade visual do Ensina Lógica

**Direção estética:** **neo-brutalista** — chapado, contrastado, honesto. Bordas grossas,
sombras duras, cores saturadas e cantos retos. Sem gradientes, sem sombras desfocadas,
sem ornamentos decorativos.

**Escopo:** este documento é a fonte da verdade dos *design tokens*. O CSS
(`src/ui/theme.css`) **não pode conter valores soltos** de cor, espaçamento, borda,
sombra, raio ou alvo de toque — tudo vem de `var(--token)`. O teste
`scripts/test-contrast.mjs` lê os tokens e falha se algum par de cores ficar abaixo de
**WCAG AA**.

---

## 1. Princípios

1. **Chapado e saturado.** Cores planas; gradientes proibidos. Cada cor é um token.
2. **Borda grossa e sombra dura.** Cartões, botões e campos têm borda sólida de
   **2–4 px** e sombra **sem desfoque**, deslocada.
3. **Reto.** Cantos com raio **0–4 px**. Sem pílulas arredondadas.
4. **Peso tipográfico.** Títulos pesados (800); rótulos e código em **monoespaçada**.
5. **Estado nunca só por cor.** Acerto, erro, bloqueado, concluído e selecionado sempre
   trazem **ícone ou texto** além da cor (e além da sombra).
6. **Foco visível e distinto.** O anel de foco usa uma cor que **não** é a da borda, com
   `outline-offset`, para nunca se confundir com a borda.
7. **Movimento contido.** O único movimento "de brinquedo" é o *press* dos botões
   (deslocamento + some a sombra). Ele é **desativado** com `prefers-reduced-motion`.

---

## 2. Cores

### 2.1 Tema claro — fundo creme

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#FBF7EC` | Fundo da página (creme) |
| `--color-surface` | `#FFFFFF` | Cartões, campos, chips |
| `--color-surface-2` | `#FFF3B0` | Superfície alternativa (amarelo pálido) |
| `--color-ink` | `#141414` | Texto principal |
| `--color-ink-muted` | `#52525B` | Texto secundário |
| `--color-border` | `#141414` | Bordas (quase preto) |
| `--color-primary` | `#1D4ED8` | Ação primária (azul) |
| `--color-primary-hover` | `#163FB0` | Hover da primária |
| `--color-primary-ink` | `#FFFFFF` | Texto sobre a primária |
| `--color-primary-soft` | `#DBE4FF` | Fundo suave da primária (badges) |
| `--color-accent` | `#FF3D8B` | Destaque (rosa) |
| `--color-accent-ink` | `#141414` | Texto sobre o destaque |
| `--color-cta` | `#FFD400` | Chamada para ação / próximo passo (amarelo) |
| `--color-cta-ink` | `#141414` | Texto sobre a CTA |
| `--color-success` | `#0B6B34` | Sucesso (texto) |
| `--color-success-ink` | `#FFFFFF` | Texto sobre sucesso |
| `--color-success-soft` | `#C9F2D8` | Fundo suave de sucesso |
| `--color-danger` | `#A81F1F` | Erro/perigo (texto) |
| `--color-danger-ink` | `#FFFFFF` | Texto sobre perigo |
| `--color-danger-soft` | `#FFD5D5` | Fundo suave de perigo |
| `--color-warning` | `#8A4B00` | Aviso (texto) |
| `--color-warning-ink` | `#FFFFFF` | Texto sobre aviso |
| `--color-warning-soft` | `#FFE2A8` | Fundo suave de aviso |
| `--color-focus` | `#D6006E` | Anel de foco (magenta, ≠ borda) |
| `--color-shadow` | `#141414` | Cor da sombra dura |
| `--color-overlay` | `rgba(20,20,20,0.6)` | Fundo de modal |

### 2.2 Tema escuro — Opção B «Ameixa» (aplicada)

Fundo **roxo escuro**, superfícies um tom mais claras, bordas em **creme levemente quente**
(não branco puro) e sombra dura **rosa** (`--color-shadow` = `--color-accent`). Escolhida entre
três propostas (ver §2.3) por ser a mais autoral e ainda assim confortável.

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#1E1A2E` | Fundo da página (roxo escuro) |
| `--color-surface` | `#2A2440` | Cartões, campos, chips |
| `--color-surface-2` | `#38304F` | Superfície alternativa |
| `--color-ink` | `#F3F0FA` | Texto principal |
| `--color-ink-muted` | `#B6AFCC` | Texto secundário |
| `--color-border` | `#F2DFC0` | Bordas (creme levemente quente) |
| `--color-primary` | `#9C8BFF` | Ação primária (lilás) |
| `--color-primary-hover` | `#B9ACFF` | Hover da primária |
| `--color-primary-ink` | `#120E1E` | Texto sobre a primária |
| `--color-primary-soft` | `#322A52` | Fundo suave da primária |
| `--color-accent` | `#FF6FB5` | Destaque (rosa) |
| `--color-accent-ink` | `#1A1020` | Texto sobre o destaque |
| `--color-cta` | `#FFD400` | CTA / próximo passo (amarelo — mantido) |
| `--color-cta-ink` | `#1A1305` | Texto sobre a CTA |
| `--color-success` | `#5FE3A0` | Sucesso |
| `--color-success-ink` | `#120E1E` | Texto sobre sucesso |
| `--color-success-soft` | `#143A2C` | Fundo suave de sucesso |
| `--color-danger` | `#FF8FA3` | Erro/perigo |
| `--color-danger-ink` | `#120E1E` | Texto sobre perigo |
| `--color-danger-soft` | `#471A2C` | Fundo suave de perigo |
| `--color-warning` | `#FFC65C` | Aviso |
| `--color-warning-ink` | `#120E1E` | Texto sobre aviso |
| `--color-warning-soft` | `#41290E` | Fundo suave de aviso |
| `--color-focus` | `#7FE3FF` | Anel de foco (ciano, ≠ borda e ≠ CTA) |
| `--color-shadow` | `#FF6FB5` | Cor da sombra dura (rosa — destaque) |
| `--color-overlay` | `rgba(12,9,22,0.72)` | Fundo de modal |

> Os tokens de cor do tema escuro aparecem **duas vezes** no CSS: sob
> `html[data-theme="dark"]` e no fallback `@media (prefers-color-scheme: dark)`
> (`:root:not([data-theme="light"])`) para evitar *flash* antes do JS. O teste de
> contraste **verifica que os dois blocos são idênticos**, para não haver deriva.

### 2.3 Propostas de paleta escura (revisão — ainda não aplicadas)

O tema escuro anterior (fundo `#101014` quase preto + bordas/sombras brancas `#EDEDF2`/`#F5F5F7`)
foi considerado **agressivo e feio**. As três propostas abaixo foram feitas para substituí-lo;
a **Opção B «Ameixa» foi a escolhida e já está aplicada** em §2.2 e em `src/ui/theme.css`
(o tema claro permanece intacto). As opções A e C ficam registradas como alternativas.

**Diretrizes seguidas**
- Fundo **cinza-azulado ou roxo escuro** — nunca preto puro.
- Superfícies (`surface`, `surface-2`) **um/dois tons mais claras** que o fundo.
- Borda em **tom claro levemente quente** (creme), não branco puro.
- Sombra dura em **cor de destaque** (amarelo/rosa) **ou em tom escuro**.
- Destaques **saturados** e o botão amarelo **“Continuar” preservado** (`--color-cta #FFD400`).
- **Tudo em WCAG AA** (texto ≥ 4.50, UI ≥ 3.00), verificado pelo mesmo método de
  `scripts/test-contrast.mjs`.

Compare as três lado a lado em **`design-preview.html`** (arquivo solto, fora do app).

#### Opção A — “Meia-noite azul” (azul-acinzentado · sombra amarela)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#1C2027` | Fundo (azul-acinzentado escuro) |
| `--color-surface` | `#262B34` | Cartões, campos, chips |
| `--color-surface-2` | `#333A47` | Superfície alternativa |
| `--color-ink` | `#F2F4F8` | Texto principal |
| `--color-ink-muted` | `#AEB8C7` | Texto secundário |
| `--color-border` | `#F4E9D0` | Bordas (creme levemente quente) |
| `--color-primary` | `#7FB2FF` | Ação primária (azul) |
| `--color-primary-hover` | `#A8C8FF` | Hover da primária |
| `--color-primary-ink` | `#0B0E14` | Texto sobre a primária |
| `--color-primary-soft` | `#24324E` | Fundo suave da primária |
| `--color-accent` | `#FF7AC2` | Destaque (rosa) |
| `--color-accent-ink` | `#16121A` | Texto sobre o destaque |
| `--color-cta` | `#FFD400` | CTA / próximo passo (amarelo — **mantido**) |
| `--color-cta-ink` | `#17130A` | Texto sobre a CTA |
| `--color-success` | `#5EE29A` | Sucesso |
| `--color-success-ink` | `#0B0E14` | Texto sobre sucesso |
| `--color-success-soft` | `#123A28` | Fundo suave de sucesso |
| `--color-danger` | `#FF8A8A` | Erro/perigo |
| `--color-danger-ink` | `#0B0E14` | Texto sobre perigo |
| `--color-danger-soft` | `#45171B` | Fundo suave de perigo |
| `--color-warning` | `#FFC24B` | Aviso |
| `--color-warning-ink` | `#0B0E14` | Texto sobre aviso |
| `--color-warning-soft` | `#3D2C0A` | Fundo suave de aviso |
| `--color-focus` | `#FF7AC2` | Anel de foco (rosa ≠ borda) |
| `--color-shadow` | `#FFD400` | Sombra dura **amarela** |
| `--color-overlay` | `rgba(10,12,18,0.72)` | Fundo de modal |

#### Opção B — “Ameixa” (roxo escuro · sombra rosa)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#1E1A2E` | Fundo (roxo escuro) |
| `--color-surface` | `#2A2440` | Cartões, campos, chips |
| `--color-surface-2` | `#38304F` | Superfície alternativa |
| `--color-ink` | `#F3F0FA` | Texto principal |
| `--color-ink-muted` | `#B6AFCC` | Texto secundário |
| `--color-border` | `#F2DFC0` | Bordas (creme levemente quente) |
| `--color-primary` | `#9C8BFF` | Ação primária (lilás) |
| `--color-primary-hover` | `#B9ACFF` | Hover da primária |
| `--color-primary-ink` | `#120E1E` | Texto sobre a primária |
| `--color-primary-soft` | `#322A52` | Fundo suave da primária |
| `--color-accent` | `#FF6FB5` | Destaque (rosa) |
| `--color-accent-ink` | `#1A1020` | Texto sobre o destaque |
| `--color-cta` | `#FFD400` | CTA / próximo passo (amarelo — **mantido**) |
| `--color-cta-ink` | `#1A1305` | Texto sobre a CTA |
| `--color-success` | `#5FE3A0` | Sucesso |
| `--color-success-ink` | `#120E1E` | Texto sobre sucesso |
| `--color-success-soft` | `#143A2C` | Fundo suave de sucesso |
| `--color-danger` | `#FF8FA3` | Erro/perigo |
| `--color-danger-ink` | `#120E1E` | Texto sobre perigo |
| `--color-danger-soft` | `#471A2C` | Fundo suave de perigo |
| `--color-warning` | `#FFC65C` | Aviso |
| `--color-warning-ink` | `#120E1E` | Texto sobre aviso |
| `--color-warning-soft` | `#41290E` | Fundo suave de aviso |
| `--color-focus` | `#7FE3FF` | Anel de foco (ciano ≠ borda) |
| `--color-shadow` | `#FF6FB5` | Sombra dura **rosa** |
| `--color-overlay` | `rgba(12,9,22,0.72)` | Fundo de modal |

#### Opção C — “Grafite quente” (carvão neutro · sombra escura)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#201D19` | Fundo (carvão quente) |
| `--color-surface` | `#2B2721` | Cartões, campos, chips |
| `--color-surface-2` | `#3A352D` | Superfície alternativa |
| `--color-ink` | `#F4F0E9` | Texto principal |
| `--color-ink-muted` | `#C0B7A8` | Texto secundário |
| `--color-border` | `#EADFC6` | Bordas (creme levemente quente) |
| `--color-primary` | `#66D9CE` | Ação primária (turquesa) |
| `--color-primary-hover` | `#8FE6DE` | Hover da primária |
| `--color-primary-ink` | `#0E1A19` | Texto sobre a primária |
| `--color-primary-soft` | `#163A37` | Fundo suave da primária |
| `--color-accent` | `#FF8A5B` | Destaque (coral) |
| `--color-accent-ink` | `#1E120A` | Texto sobre o destaque |
| `--color-cta` | `#FFD400` | CTA / próximo passo (amarelo — **mantido**) |
| `--color-cta-ink` | `#1A1405` | Texto sobre a CTA |
| `--color-success` | `#6FE0A0` | Sucesso |
| `--color-success-ink` | `#10201A` | Texto sobre sucesso |
| `--color-success-soft` | `#173A28` | Fundo suave de sucesso |
| `--color-danger` | `#FF8F7A` | Erro/perigo |
| `--color-danger-ink` | `#1E100A` | Texto sobre perigo |
| `--color-danger-soft` | `#431D14` | Fundo suave de perigo |
| `--color-warning` | `#FFCB61` | Aviso |
| `--color-warning-ink` | `#1A1305` | Texto sobre aviso |
| `--color-warning-soft` | `#3E2E0E` | Fundo suave de aviso |
| `--color-focus` | `#7FDFFF` | Anel de foco (ciano ≠ borda) |
| `--color-shadow` | `#14110D` | Sombra dura **escura** (discreta) |
| `--color-overlay` | `rgba(10,9,7,0.7)` | Fundo de modal |

#### Razões de contraste (todas ≥ AA)

| Par | Mín. | A | B | C |
|-----|:----:|:----:|:----:|:----:|
| `ink` / `bg` | 4.50 | 14.84 | 15.02 | 14.78 |
| `ink` / `surface` | 4.50 | 12.91 | 13.09 | 13.07 |
| `ink` / `surface-2` | 4.50 | 10.38 | 10.95 | 10.70 |
| `ink-muted` / `bg` | 4.50 | 8.15 | 8.04 | 8.46 |
| `ink-muted` / `surface` | 4.50 | 7.09 | 7.01 | 7.48 |
| `ink-muted` / `surface-2` | 4.50 | 5.71 | 5.86 | 6.13 |
| `primary-ink` / `primary` | 4.50 | 8.94 | 6.82 | 10.49 |
| `primary-ink` / `primary-hover` | 4.50 | 11.38 | 9.40 | 12.32 |
| `primary` / `primary-soft` | 4.50 | 5.92 | **4.75** | 7.31 |
| `accent-ink` / `accent` | 4.50 | 7.76 | 7.19 | 7.89 |
| `cta-ink` / `cta` | 4.50 | 12.94 | 12.88 | 12.80 |
| `success-ink` / `success` | 4.50 | 11.79 | 11.72 | 10.33 |
| `success` / `success-soft` | 4.50 | 7.72 | 7.77 | 7.68 |
| `danger-ink` / `danger` | 4.50 | 8.51 | 8.77 | 8.35 |
| `danger` / `danger-soft` | 4.50 | 6.65 | 6.69 | 6.64 |
| `warning-ink` / `warning` | 4.50 | 12.02 | 12.18 | 12.26 |
| `warning` / `warning-soft` | 4.50 | 8.36 | 8.71 | 8.72 |
| `border` / `bg` (UI) | 3.00 | 13.55 | 12.95 | 12.68 |
| `border` / `surface` (UI) | 3.00 | 11.79 | 11.29 | 11.22 |
| `focus` / `bg` (UI) | 3.00 | 6.86 | 11.54 | 11.11 |
| `focus` / `surface` (UI) | 3.00 | 5.97 | 10.06 | 9.83 |

**Observações**
- **A — Meia-noite azul:** mudança mais conservadora (mantém a família azul, agora sobre
  azul-acinzentado com borda creme). Sombra **amarela** dá o “pop” neo-brutalista; foco rosa.
- **B — Ameixa:** a mais autoral e colorida; sombra **rosa**. Atenção: `primary/primary-soft`
  fica em **4.75** (passa, mas é o menor valor das três) — pouca folga se a primária mudar.
- **C — Grafite quente:** a mais sóbria/neutra; sombra **escura** (sem cor), destaque turquesa
  e coral. Ótima legibilidade, visual menos “festivo”.
- Em todas, a **sombra (`--color-shadow`) é decorativa** e não entra nos pares de contraste do
  teste; ela foi escolhida para ser visível sobre o fundo (amarela/rosa chamam atenção; a escura
  no C aparece como entalhe profundo).
- Ao aplicar a escolhida: alterar **os dois blocos** do tema escuro em `src/ui/theme.css`
  (`html[data-theme="dark"]` **e** o fallback em `@media (prefers-color-scheme: dark)`), rodar
  `npm test` (o teste de contraste e o de paridade dos blocos travam regressões) e atualizar a
  seção 2.2 deste documento.

---

## 3. Tipografia

**Decisão sobre fontes:** usamos **pilhas de fontes do sistema** (sem download, sem CDN).
O projeto exige *zero requisições externas*; hospedar arquivos de fonte exigiria
versionar binários (`.woff2`) e suas licenças. Como a Constituição permite explicitamente
a alternativa "pilhas do sistema", essa é a escolha — registrada em `ATTRIBUTIONS.md`.

| Token | Valor |
|-------|-------|
| `--font-sans` | `system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |
| `--font-mono` | `ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `600` |
| `--font-weight-bold` | `800` |
| `--font-size-xs` | `0.75rem` |
| `--font-size-sm` | `0.875rem` |
| `--font-size-base` | `1rem` |
| `--font-size-lg` | `1.125rem` |
| `--font-size-xl` | `1.5rem` |
| `--font-size-2xl` | `2rem` |
| `--font-size-3xl` | `2.5rem` |
| `--line-height-tight` | `1.15` |
| `--line-height-base` | `1.5` |
| `--letter-spacing-label` | `0.08em` |

**Regras de uso**
- Títulos (`h1`, `h2`, `h3`, `.app-title`, `.stat-value`) → peso **800**.
- Rótulos (`.stat-label`, `.badge`, `.locked-label`, `.xp-text`, `label`) → **monoespaçada**,
  caixa alta e `--letter-spacing-label`.
- Código (`code`, `pre`) e campos de entrada → **monoespaçada**.

---

## 4. Espaçamento

| Token | Valor |
|-------|-------|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.5rem` |
| `--space-6` | `2rem` |
| `--space-7` | `3rem` |
| `--content-max` | `1200px` |

---

## 5. Bordas, raios e sombras

| Token | Valor |
|-------|-------|
| `--border-width-sm` | `2px` |
| `--border-width` | `3px` |
| `--border-width-lg` | `4px` |
| `--radius-none` | `0` |
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--shadow-hard-sm` | `2px 2px 0 0 var(--color-shadow)` |
| `--shadow-hard` | `4px 4px 0 0 var(--color-shadow)` |
| `--shadow-hard-lg` | `6px 6px 0 0 var(--color-shadow)` |

**Interação dos botões (press):** em repouso têm `--shadow-hard-sm`; ao passar o mouse
sobem 1 px (sombra maior); ao **clicar** descem (sombra some, deslocamento de 2 px). Com
`prefers-reduced-motion: reduce` o deslocamento é desativado (a cor/sombra continuam).

---

## 6. Alvos de toque

| Token | Valor | Regra |
|-------|-------|-------|
| `--touch-target` | `44px` | Altura/largura mínima de botões, ícones e campos |

---

## 7. Movimento

| Token | Valor |
|-------|-------|
| `--transition-fast` | `120ms` |
| `--transition-normal` | `200ms` |

Respeitar `prefers-reduced-motion`: transições e animações caem para ~0 e o efeito de
*press* é desativado.

---

## 8. Estado nunca só por cor

| Estado | Cor | Reforço não-cromático |
|--------|-----|-----------------------|
| Lição concluída | borda/`success` | ícone **✅** |
| Lição pendente | — | ícone **○** |
| Lição bloqueada | esmaecida | texto **Bloqueado** + **○** |
| Módulo bloqueado | esmaecida | ícone **🔒** |
| Disciplina "Em breve" | borda tracejada | texto **Em breve** / ícone **🔒** |
| Meta/tema selecionado | CTA | **✓** antes do rótulo |
| Conquista bloqueada | esmaecida | ícone **🔒** (via CSS `::after`) |
| Feedback de exercício | cor | **✅/❌** + texto (em `feedback.js`) |
| Toast | borda lateral | **✅/❌/🏆/⭐/ℹ️** (em `toasts.js`) |

---

## 9. Contraste (WCAG AA) e testes

`scripts/test-contrast.mjs`:
1. lê os tokens de `src/ui/theme.css` (`:root`, `[data-theme="dark"]` e o fallback do
   `@media`);
2. calcula a razão de contraste WCAG para pares semânticos;
3. exige **≥ 4.5** para pares de **texto** e **≥ 3.0** para **UI** (bordas/foco);
4. falha (exit 1) se qualquer par ficar abaixo de AA, e se os blocos escuros divergirem.

Pares verificados: `ink/bg`, `ink/surface`, `ink/surface-2`, `ink-muted/bg`,
`ink-muted/surface`, `ink-muted/surface-2`, `*-ink/*` (primária, accent, CTA, sucesso,
perigo, aviso), texto sobre `*-soft`, `border/bg`, `border/surface`, `focus/bg`,
`focus/surface`.

---

## 10. Revisão de telas (claro/escuro, 375/768/1280 px)

Telas revisadas: **painel (`#/`)**, **semestre**, **disciplina**, **módulo**,
**configurações** (e conquistas). Correções aplicadas:

- **Cabeçalho compacto** — padding reduzido, barra de XP fina com borda, ícones com borda e sombra.
- **Botão "Voltar" com seta** — seta adicionada via CSS (`::before`), sem alterar o rótulo traduzido.
- **Próxima ação ("Continuar")** — botão amarelo (`--color-cta`), borda grossa e sombra dura, largura total.
- **Cartões de XP, nível, streak (e revisões)** — borda 4 px, sombra dura, número grande em monoespaçada e "chip" colorido atrás do ícone.
- **Foco visível distinto da borda** — `outline` na cor de foco com `outline-offset`.
- **Contraste AA** — garantido pelo teste, nos dois temas.
