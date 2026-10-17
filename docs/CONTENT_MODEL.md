# Modelo de Conteúdo e Fluxo Editorial

Como adicionar conteúdo **verificável e com fonte** ao Ensina Lógica. O conteúdo
é *data-driven*: nada disso exige mudar código.

> **Regra de ouro:** nenhum texto teórico pode ser inventado. Se a fonte não foi
> acessada e conferida, a unidade fica `pendente` (`verification_status: pending`)
> ou `unverified` e **não aparece na trilha** — apenas no mapa como "em construção".

---

## 1. Regras de conteúdo e licença

Estas regras vêm da constituição do projeto e são **não negociáveis**:

1. **Só fontes aprovadas** — lista em `.specify/plan.md` §9 e no `README.md`.
2. **Licença permissiva confirmada na página da fonte** antes de derivar:
   - Permitidas para derivar: `CC0-1.0`, `CC-BY-3.0`, `CC-BY-4.0`, `CC-BY-SA-3.0`, `CC-BY-SA-4.0`, domínio público (`PUBLIC-DOMAIN`).
   - Proibidas para derivar (`apenas link "Leitura recomendada"`): `CC-BY-NC-*`, `CC-BY-ND-*`, `GFDL-1.3`, `MIT-OCW-NC-SA`, "todos os direitos reservados", licença incerta.
3. **Atribuição obrigatória** — cada unidade carrega os metadados da fonte, e a fonte entra no `ATTRIBUTIONS.md`.
4. **A licença da fonte prevalece** sobre a licença padrão do projeto (CC BY-SA 4.0).
5. **Exercícios gerados por IA** — sempre ligados a uma unidade teórica, com resposta e explicação conferidas contra a fonte, e exibidos como "gerados por IA".
6. **Nenhuma unidade é `verified_with_source` sem trecho original literal conferido contra a fonte** — `original_excerpt` no idioma da fonte (inglês), com **≥ 15 palavras**, mais `verified_at` e `verification_method`. O CI rejeita o contrário (ver §5).

---

## 2. Estrutura de arquivos

```
data/
├── curriculum.json                              # mapa dos 8 semestres (módulos → lições e → unidade teórica)
├── theory/
│   ├── _schema.json                             # contrato do front-matter
│   └── sem{N}/{discipline}/{theory-unit-id}.md  # 1 arquivo por unidade; nome = id
└── exercises/
    ├── _schema.json                             # contrato do exercício
    └── sem{N}/{discipline}/{module-id}-{lesson-id}.json  # 1 arquivo por lição (array)
```

Convenções de ID (validadas no CI):

| Item | Padrão | Exemplo |
|------|--------|---------|
| Unidade teórica | `th-sem{N}-{discipline}-{module}-{slug}` | `th-sem1-algorithms-m01-intro` |
| Exercício | `ex-sem{N}-{discipline}-{module}-{lesson}-{slug}` | `ex-sem1-algorithms-m01-l01-algoritmo` |
| Lição | `l{NN}` (único no currículo) | `l01` |

O `curriculum.json` liga cada módulo à sua unidade por meio do campo `theory`
(ex.: `"theory": "th-sem1-algorithms-m01-intro"`).

---

## 3. Fluxo: adicionar fonte → gerar unidade → verificar → publicar

### Passo 1 — Aprovar a fonte

- Confirme a licença **na própria página da fonte** e registre URL, autores,
  edição, capítulo/seção e data de conferência.
- Se a licença não for permissiva, use como "Leitura recomendada" (sem derivar).

### Passo 2 — Criar a unidade teórica

Crie `data/theory/sem{N}/{discipline}/{theory-unit-id}.md` com o front-matter abaixo.
Use `## ` para cada seção e `$...$` / `$$...$$` para matemática (KaTeX).

| Campo | Obrigatório | Observação |
|-------|-------------|------------|
| `id` | ✅ | `th-sem{N}-{discipline}-{module}-{slug}` |
| `title` | ✅ | 3–120 caracteres |
| `discipline` / `module` | ✅ | devem existir no `curriculum.json` |
| `source` (objeto) | ✅ | `title`, `authors[]`, `url`, `chapter`, `section`, `access_date`, `edition`, `license_url`, `license_confirmed_at` |
| `license` | ✅ | SPDX da **fonte** |
| `derivation_type` | ✅ | `original` \| `translated` \| `adapted` \| `summarized` |
| `language` | ✅ | `pt-BR` |
| `verification_status` | ✅ | `verified_with_source` \| `pending` \| `unverified` |
| `linked_lessons` | ✅ | lições do módulo |
| `linked_exercises` | ✅ | ids dos exercícios da unidade |
| `verified_at` | ✅ quando `verified_with_source` | data (`YYYY-MM-DD`) em que o trecho foi conferido na fonte |
| `verification_method` | ✅ quando `verified_with_source` | como foi conferido (ex.: `manual_url_check`) |
| `original_excerpt` | ✅ quando `verified_with_source` | trecho **literal** da fonte, **no idioma original (inglês)** e com **≥ 15 palavras**; habilita o alternador **"Ver original"** |

### Passo 3 — Criar os exercícios

Crie `data/exercises/sem{N}/{discipline}/{module-id}-{lesson-id}.json` com **um array de 3–5 exercícios**.

Campos comuns (obrigatórios): `id`, `theory_unit_id`, `lesson_id`, `type`,
`generated_by_ai` (`true`), `prompt` (10–500), `correct`, `explanation` (20–1000),
`difficulty` (`easy`\|`medium`\|`hard`), `xp_base` (5–50).

Tipos e formato de `correct`:

| `type` | Campos específicos | `correct` |
|--------|--------------------|-----------|
| `multiple-choice` | `options` (2–6) | índice inteiro da opção correta |
| `true-false` | `options: ["Verdadeiro","Falso"]` | `0` ou `1` |
| `order-steps` | `options` **já embaralhadas** | array de índices na ordem correta |
| `code-completion` | `starter_code`, `test_command`, `language` | string com a solução de referência |
| `flashcards` | `starter_code` (verso) | string (mesmo valor do verso) |

> `code-completion`: `test_command` é validado no CI; no navegador a sintaxe JS é
> checada em tempo real. Nunca inclua código que não seja executável/testado.

### Passo 4 — Atualizar o currículo

Adicione a lição ao módulo em `data/curriculum.json` (e o campo `theory` do módulo,
se for uma unidade nova).

### Passo 5 — Verificar (obrigatório)

```bash
npm run validate     # curriculo, front-matter, licenca, links internos, ATTRIBUTIONS, schema
npm test             # suites de DOM/conteudo/teoria/e2e
```

Com internet, para conferir se as URLs das fontes estão acessíveis:

```bash
CHECK_URLS=1 npm run validate
```

Para provar que cada `original_excerpt` existe mesmo na fonte viva (**manual, fora do CI**):

```bash
npm run verify-sources        # imprime "confere", "não confere" ou "sem acesso" por unidade
```

O validador **falha** (não apenas avisa) se:

- a licença estiver fora da lista permitida (CC0, CC BY, CC BY-SA, domínio público) ou a edição for proibida (ex.: Levin 4ª edição, NC);
- o `source.url` for genérico (homepage, sem caminho de capítulo/seção);
- uma unidade `verified_with_source` não tiver `original_excerpt` (inglês, ≥ 15 palavras, sem cara de texto gerado) ou não tiver `verified_at`/`verification_method`;
- o enunciado/explicação de um exercício casar com padrões de placeholder ("Questão N sobre", "Alternativa A", "Explicação da questão") ou a explicação não citar a seção/capítulo da fonte;
- o front-matter/link interno estiver errado, um exercício apontar para unidade/lição inexistente, ou o bloco gerado do `ATTRIBUTIONS.md` divergir das unidades reais.

### Passo 6 — Atribuição e publicação

- Adicione a fonte ao `ATTRIBUTIONS.md` (título, autores, edição, licença, URL da
  licença, data de conferência).
- Regenerar o bloco de unidades depois de adicionar/remover unidades:
  `node scripts/validate.mjs --update-attributions` (o CI **falha** se ele divergir).
- Faça commit seguindo o `CONTRIBUTING.md`; o workflow `.github/workflows/validate.yml`
  roda a validação a cada push/PR e o `deploy-pages.yml` publica no GitHub Pages.

---

## 4. Regra "pendente" (fonte não acessada)

Se você não conseguir acessar/confirmar a fonte:

1. Mantenha a unidade com `verification_status: pending` (ainda não conferida) ou `unverified` (conferida e não confirmada).
2. **Não** crie exercícios para ela.
3. O loader a exclui do índice da biblioteca e da trilha; a lição exibe "em
   construção". O validador avisa sobre exercícios ligados a unidades `unverified`.

Assim o app nunca apresenta teoria de memória como se tivesse fonte.
