---
description: Executa a pipeline de conteúdo (docs/CONTENT_PIPELINE.md) para um módulo, com portões automáticos
---

## Entrada

```text
$ARGUMENTS
```

O argumento é o **id do módulo**. Use o id canônico (`sem<semestre>-<disciplina>-<módulo>`) ou as formas `sem1/algorithms/m01` e `algorithms/m01` quando não houver ambiguidade. Se o argumento estiver vazio, liste os módulos abaixo e pare.

## Antes de qualquer coisa

1. Leia **`docs/CONTENT_PIPELINE.md`** por inteiro. Ele é a fonte da verdade deste comando.
2. Leia `docs/CONTENT_MODEL.md`, `data/curriculum.json`, o `PLAN.md` do módulo (se existir) e as fontes aprovadas em `ATTRIBUTIONS.md` / `.specify/plan.md` §9.
3. Resolva o id. Se for ambíguo, pare e mostre os candidatos. **Não altere outros módulos.**

## Execução

Siga as etapas **E0 a E7** do documento, nesta ordem:

- **E0 — Plano**: crie/atualize `docs/modules/<id-canônico>/PLAN.md` (4 a 6 objetivos `OBJ-1`…, pré-requisitos, mapa objetivo → seção da fonte, 3 a 4 lições e fora de escopo). **No primeiro módulo (piloto), PARE aqui e peça aprovação do usuário.** Se houver seção da fonte em `pending`, marque e pare antes de escrever teoria.
- **E1 — Captura**: registre em `docs/modules/<id-canônico>/SOURCES.md` URL, edição, data de acesso, licença confirmada e trechos literais.
- **E2 — Teoria**: uma unidade por conceito em `data/theory/`, 300–700 palavras (máx. 900), estrutura fixa, no máximo 3 termos novos, `original_excerpt` literal e "ver original".
- **E3 — Auditoria**: crie `docs/modules/<id-canônico>/REVIEW.md` com a tabela afirmação | seção | trecho de apoio | ok/sem suporte. Remova ou rotule o que não tiver suporte.
- **E4 — Exercícios**: agora os **exercícios de lição** (`data/exercises/sem{N}/{disciplina}/{módulo}-{lição}.json`, array), o **desafio do módulo** (`{módulo}-challenge.json`, exatamente 8 questões) e os **flashcards do módulo** (`{módulo}-flashcards.json`, 8 a 12). Todos com `generated_by_ai: true`, `objective_id`, `level`, `source_ref` (`<theory_unit_id>#<seção>`) e `answer_check`. Respeite a rampa, a variedade e a lição 1 sem difícil.
- **E5 — Biblioteca/glossário**: ordem de leitura, tempo estimado, "praticar este trecho" e termos novos no `data/glossary.json` com definição da fonte.
- **E6 — Portões**: rode, nesta ordem e corrigindo até passar:
  ```bash
  npm run check-module -- <id-canônico>
  npm run validate
  npm test
  npm run verify-sources
  ```
- **E7 — Fechamento**: atualize `tasks.md` e `STATUS.md`, marque `"pipeline_version": 1` **somente** no módulo em `data/curriculum.json`, faça **um commit do módulo**, mostre o hash e liste o que ficou `pending`.

## Limites

- Nunca marque `human_reviewed`; isso é exclusivo do usuário.
- Nunca invente texto de fonte não aberta nesta sessão.
- Não marque `pipeline_version: 1` antes dos quatro portões passarem.
- Não gere conteúdo de mais de um módulo por sessão.

## IDs de módulo existentes em `data/curriculum.json`

Semestre 1 (com lições):
- `sem1-algorithms-m01`
- `sem1-algorithms-m02`
- `sem1-algorithms-m03`
- `sem1-discrete-math-m01`
- `sem1-discrete-math-m02`
- `sem1-discrete-math-m03`

Semestres 2–8 (mapa "Em breve", ainda sem lições):
- `sem2-data-structures-1-m01`, `sem2-data-structures-1-m02`, `sem2-data-structures-1-m03`
- `sem2-computer-architecture-m01`, `sem2-computer-architecture-m02`, `sem2-computer-architecture-m03`
- `sem3-data-structures-2-m01`, `sem3-data-structures-2-m02`, `sem3-data-structures-2-m03`
- `sem3-operating-systems-m01`, `sem3-operating-systems-m02`, `sem3-operating-systems-m03`
- `sem4-algorithms-analysis-m01`, `sem4-algorithms-analysis-m02`, `sem4-algorithms-analysis-m03`
- `sem4-databases-m01`, `sem4-databases-m02`, `sem4-databases-m03`
- `sem5-computer-networks-m01`, `sem5-computer-networks-m02`, `sem5-computer-networks-m03`
- `sem5-software-engineering-m01`, `sem5-software-engineering-m02`, `sem5-software-engineering-m03`
- `sem6-compilers-m01`, `sem6-compilers-m02`, `sem6-compilers-m03`
- `sem6-distributed-systems-m01`, `sem6-distributed-systems-m02`, `sem6-distributed-systems-m03`
- `sem7-ai-ml-m01`, `sem7-ai-ml-m02`, `sem7-ai-ml-m03`
- `sem7-security-m01`, `sem7-security-m02`, `sem7-security-m03`
- `sem8-capstone-m01`, `sem8-capstone-m02`, `sem8-capstone-m03`
- `sem8-electives-m01`, `sem8-electives-m02`, `sem8-electives-m03`

Para conferir a lista viva: `npm run check-module -- --list`.
