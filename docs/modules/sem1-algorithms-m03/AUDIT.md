# Auditoria de fontes — sem1-algorithms-m03 (Controle de Fluxo)

**Data:** 2026-10-19
**Escopo:** as 11 unidades teóricas do módulo `sem1-algorithms-m03`.
**Comando:** `npm run verify-sources -- sem1-algorithms-m03` (filtro por id de módulo).
**Fonte:** *Programming Fundamentals*, Kenneth Leroy Busbee / Dave Braunschweig, 2ª ed. (2018), `press.rebus.community`.
**Estado do módulo:** `"pipeline_version": 1` em `data/curriculum.json`, com 11 unidades em `theories`.

## Resultado geral

| Métrica | Valor |
|---------|-------|
| Unidades `verified_with_source` | 11 |
| `confere` | 0 |
| `não confere` | **11** |
| `sem acesso` | 0 |

Todas as 11 unidades têm `verification_status: verified_with_source`, `verified_at: 2026-10-19` e `verification_method: manual_url_check`.

> **Classificação:** o resultado é **"não confere"** (HTTP 200), não "sem acesso". Uma requisição com `User-Agent` simples recebe **HTTP 403** (CloudFront), mas o script usa cabeçalhos de navegador e obtém **HTTP 200**; portanto o texto da fonte foi baixado e o trecho foi comparado. A justificativa anterior de "bloqueio CloudFront 403" não se aplica a esta execução.

## Unidade por unidade

| # | Unidade | URL | Resultado | Motivo (observado na fonte) | Recomendação |
|---|---------|-----|-----------|------------------------------|--------------|
| 1 | `th-sem1-algorithms-m03-branching` | https://press.rebus.community/programmingfundamentals/chapter/branching-statements/ | não confere | As 3 frases existem na página, mas a 3ª está depois do título *Discussion* e de um parágrafo intermediário — trecho **não contíguo**. | Refazer pela pipeline (E1/E2): capturar trecho contíguo da seção. |
| 2 | `th-sem1-algorithms-m03-do-while` | https://press.rebus.community/programmingfundamentals/chapter/do-while-loop/ | não confere | A fonte escreve "…three attributes of a properly working loop. **They are: Action or actions / Update of the flag / Test expression**"; o excerpt **condensou a lista em uma única frase** — não literal. | Refazer pela pipeline (E1/E2). |
| 3 | `th-sem1-algorithms-m03-for-loop` | https://press.rebus.community/programmingfundamentals/chapter/for-loop/ | não confere | "Within the for control structure, there are four attributes… They are: Initializing the flag – done once, Test expression, Action or actions, Update of the flag" foi **condensado em frase única**; além disso as frases vêm de blocos separados do artigo. | Refazer pela pipeline (E1/E2). |
| 4 | `th-sem1-algorithms-m03-if-then-else` | https://press.rebus.community/programmingfundamentals/chapter/if-then-else/ | não confere | A 1ª frase existe; a 2ª está depois de um bloco de sintaxe e do título *Discussion* — trecho **não contíguo**. | Refazer pela pipeline (E1/E2). |
| 5 | `th-sem1-algorithms-m03-iteration-while` | https://press.rebus.community/programmingfundamentals/chapter/iteration-control-structures/ | não confere | As duas primeiras frases existem; a 3ª ("Within the while control structure there are four attributes…") **não existe na página citada** (termos "properly working loop" / "initializing the flag" ausentes; o conteúdo parece ser da página *The While Loop*). | Refazer pela pipeline (E1/E2) com trecho da própria página ou corrigir a URL. Se não houver trecho literal ≥ 15 palavras, **rebaixar para `unverified`**. |
| 6 | `th-sem1-algorithms-m03-modular-functions` | https://press.rebus.community/programmingfundamentals/chapter/modular-programming/ | não confere | As duas frases existem, mas a 2ª está na seção *Concept of Modularization*, separada da introdução — trecho **não contíguo**. | Refazer pela pipeline (E1/E2). |
| 7 | `th-sem1-algorithms-m03-nested-if-case` | https://press.rebus.community/programmingfundamentals/chapter/nested-if-then-else/ | não confere | As duas frases existem, mas a 2ª está em *Discussion*, separada por parágrafo — trecho **não contíguo**. | Refazer pela pipeline (E1/E2). |
| 8 | `th-sem1-algorithms-m03-nested-loops` | https://press.rebus.community/programmingfundamentals/chapter/nested-for-loops/ | não confere | Frases 1–2 na introdução e 3–4 em *Discussion > Nested control structures* — trecho **não contíguo**. | Refazer pela pipeline (E1/E2). |
| 9 | `th-sem1-algorithms-m03-params-return-scope` | https://press.rebus.community/programmingfundamentals/chapter/parameters-and-arguments/ | não confere | O começo confere, mas o excerpt **insere um ponto final** onde a fonte continua a frase ("…definition of a function, so that, each time…") — pontuação não literal. | Refazer pela pipeline (E1/E2), terminando o trecho onde a fonte termina. |
| 10 | `th-sem1-algorithms-m03-relational-logical-operators` | https://press.rebus.community/programmingfundamentals/chapter/relational-operators/ | não confere | A 1ª frase existe; as frases 2–3 estão em *Discussion*, separadas por um exemplo — trecho **não contíguo**. | Refazer pela pipeline (E1/E2). |
| 11 | `th-sem1-algorithms-m03-structured-programming` | https://press.rebus.community/programmingfundamentals/chapter/structured-programming/ | não confere | A fonte apresenta a categoria como lista ("Sequence – very boring… Selection – … Iteration – …"); o excerpt **condensou a lista** em "Sequence, Selection, Iteration." — não literal. | Refazer pela pipeline (E1/E2). |

## Leitura dos resultados

- **Nenhum caso é "sem acesso":** todas as URLs respondem HTTP 200 com os cabeçalhos do script.
- **Padrão dominante (9 de 11):** o `original_excerpt` **justapõe frases não contíguas** do artigo (introdução + *Discussion*), o que viola a regra de trecho literal contíguo. O conteúdo pedagógico existe na fonte, mas o trecho como está não é literal.
- **Condensação de lista (2 de 11: `do-while` e `structured-programming`; e parcialmente `for-loop`):** a fonte traz lista/definição em itens e o excerpt a transformou em prosa — não literal.
- **Frase inexistente na página citada (1 de 11: `iteration-while`):** a terceira frase do excerpt não consta da URL indicada.

## Recomendação

Para **todas as 11 unidades**, a recomendação é **refazer pela pipeline** (E1–E2 + E3), capturando `original_excerpt` **contíguo, literal e ≥ 15 palavras** da própria seção citada. Como isso exige abrir a fonte e revisar cada trecho (e pode alterar a unidade), **nada foi alterado nesta auditoria** — nem unidades, nem exercícios.

Apenas para `th-sem1-algorithms-m03-iteration-while` acrescenta-se a alternativa de **rebaixar para `verification_status: unverified`** caso não exista trecho literal ≥ 15 palavras na página citada (a 3ª frase atual não é da página).

Enquanto isso não for feito, as 11 unidades permanecem `verified_with_source` **por herança** (foram marcadas antes do endurecimento da regra de trecho literal), mas `npm run verify-sources` continuará saindo com código 1 para o módulo `sem1-algorithms-m03`. Nenhum outro módulo é afetado quando o comando é filtrado por id.
