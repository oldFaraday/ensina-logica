# AUDIT — ProgressStore

**Data**: 2026-10-16
**Último commit**: `d416024` — "Smoke teste fail"
**Arquivo analisado**: `src/store/ProgressStore.js`
**Escopo da busca de chamadas**: `src/` (singleton `progressStore`)

---

## 1. Métodos públicos expostos por `ProgressStore`

| # | Método | Assinatura | Descrição |
|---|--------|------------|-----------|
| 1 | `constructor` | `constructor()` | Inicializa cache/flag interno |
| 2 | `init` | `async init()` | Carrega do localStorage + migra schema |
| 3 | `get` | `get()` | Retorna o progresso em cache |
| 4 | `getPath` | `getPath(path)` | Lê via notação de ponto (`'stats.total_xp'`) |
| 5 | `setPath` | `setPath(path, value)` | Escreve via notação de ponto |
| 6 | `update` | `update(updates)` | Deep merge de objeto parcial + salva |
| 7 | `save` | `save()` | Persiste o cache no localStorage (wrapper público de `_save`) |
| 8 | `subscribe` | `subscribe(listener)` | Assina mudanças; retorna função de unsubscribe |
| 9 | `export` | `export()` | Serializa progresso em JSON string |
| 10 | `import` | `import(jsonString)` | Valida + importa JSON string |
| 11 | `reset` | `reset()` | Reseta progresso mantendo preferências |
| 12 | `clear` | `clear()` | Limpa tudo (inclui preferências) |
| 13 | `isInitialized` | `isInitialized()` | Retorna `true` se já inicializado |

**Membros privados (prefixo `_`, não fazem parte da API pública):**
`_save`, `_saveAndNotify`, `_deepMerge`, `_notify`.

> Observação: o método público `save()` foi adicionado no último commit (`d416024`) como wrapper de `_save()`.

---

## 2. Chamadas à store em `src/`

Todas as chamadas em `src/` ocorrem em `src/app.js` e são feitas sobre o singleton importado `progressStore`. Nenhuma chamada foi encontrada em outros arquivos de `src/`.

| # | Arquivo | Linha | Chamada | Método existe? |
|---|---------|-------|---------|----------------|
| 1 | `src/app.js` | 38 | `progressStore.init()` | ✅ Sim |
| 2 | `src/app.js` | 94 | `progressStore.save()` | ✅ Sim |
| 3 | `src/app.js` | 621 | `progressStore.update({ preferences: { daily_xp_goal: goal } })` | ✅ Sim |
| 4 | `src/app.js` | 643 | `progressStore.export()` | ✅ Sim |
| 5 | `src/app.js` | 663 | `progressStore.import(text)` | ✅ Sim |
| 6 | `src/app.js` | 665 | `progressStore.get()` | ✅ Sim |
| 7 | `src/app.js` | 684 | `progressStore.reset()` | ✅ Sim |
| 8 | `src/app.js` | 685 | `progressStore.get()` | ✅ Sim |
| 9 | `src/app.js` | 757 | `progressStore.update({ preferences: { daily_xp_goal: selectedGoal } })` | ✅ Sim |

**Resultado**: 9 chamadas encontradas, **9 com métodos existentes, 0 inexistentes**.

> A linha 8 de `src/app.js` (`import { progressStore } from './store/ProgressStore.js';`) é a importação do singleton, não uma chamada — por isso não está listada.

---

## 3. Métodos públicos definidos mas NÃO usados em `src/`

Estes existem na classe, mas nenhuma chamada a eles foi localizada no código-fonte de `src/`:

- `getPath(path)`
- `setPath(path, value)`
- `subscribe(listener)`
- `clear()`
- `isInitialized()`

---

## Notas da investigação

- O nome da instância é `progressStore` (não `store`). A busca pelo padrão literal `store.` não retorna resultados; por isso a varredura foi feita sobre `progressStore.` e sobre os nomes de método (`get`, `update`, `save`, etc.).
- Acessos diretos a `AppState.progress.*` (ex.: `AppState.progress.preferences`) **não** são chamadas à store e foram ignorados nesta auditoria.
- Nenhuma correção foi aplicada. Auditoria somente leitura.
