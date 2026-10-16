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

### 2.2 Tema escuro — fundo quase preto, bordas e sombras claras

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#101014` | Fundo da página |
| `--color-surface` | `#1B1B22` | Cartões, campos, chips |
| `--color-surface-2` | `#26262F` | Superfície alternativa |
| `--color-ink` | `#F5F5F7` | Texto principal |
| `--color-ink-muted` | `#B9B9C4` | Texto secundário |
| `--color-border` | `#EDEDF2` | Bordas claras |
| `--color-primary` | `#8FB0FF` | Ação primária |
| `--color-primary-hover` | `#B4C9FF` | Hover da primária |
| `--color-primary-ink` | `#0B0B0F` | Texto sobre a primária |
| `--color-primary-soft` | `#1E2A4A` | Fundo suave da primária |
| `--color-accent` | `#FF7AC2` | Destaque |
| `--color-accent-ink` | `#0B0B0F` | Texto sobre o destaque |
| `--color-cta` | `#FFD400` | CTA / próximo passo |
| `--color-cta-ink` | `#0B0B0F` | Texto sobre a CTA |
| `--color-success` | `#5EE29A` | Sucesso |
| `--color-success-ink` | `#0B0B0F` | Texto sobre sucesso |
| `--color-success-soft` | `#123A26` | Fundo suave de sucesso |
| `--color-danger` | `#FF8A8A` | Erro/perigo |
| `--color-danger-ink` | `#0B0B0F` | Texto sobre perigo |
| `--color-danger-soft` | `#44171B` | Fundo suave de perigo |
| `--color-warning` | `#FFC24B` | Aviso |
| `--color-warning-ink` | `#0B0B0F` | Texto sobre aviso |
| `--color-warning-soft` | `#3D2A08` | Fundo suave de aviso |
| `--color-focus` | `#FFD400` | Anel de foco (amarelo, ≠ borda) |
| `--color-shadow` | `#F5F5F7` | Cor da sombra dura (clara) |
| `--color-overlay` | `rgba(0,0,0,0.7)` | Fundo de modal |

> Os tokens de cor do tema escuro aparecem **duas vezes** no CSS: sob
> `html[data-theme="dark"]` e no fallback `@media (prefers-color-scheme: dark)`
> (`:root:not([data-theme="light"])`) para evitar *flash* antes do JS. O teste de
> contraste **verifica que os dois blocos são idênticos**, para não haver deriva.

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
