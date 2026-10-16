# Ensina Lógica

> **⚠️ Aviso de escopo:** Isso não substitui uma graduação. Conteúdo derivado de fontes abertas, traduzido/adaptado com IA, pode conter erros. [Reportar erro](https://github.com/oldfaraday/ensina-logica/issues)

Plataforma web **gamificada, estilo Duolingo**, para estudar o conteúdo de uma graduação em **Ciência da Computação (Bacharelado, 8 semestres)**, junto com uma **biblioteca de teoria densa** (nível livro-texto/notas de aula), com conteúdo **real, verificável e com fonte**.

## 🎯 Diferenciais

- **Teoria com fonte rastreável**: Cada unidade teórica cita autor, título, capítulo, URL, licença (SPDX) e data de acesso
- **Exercícios ligados à teoria**: Cada exercício referencia a unidade teórica de onde vem
- **Progresso persistente offline**: Salvo no `localStorage` do navegador, exportável/importável em JSON
- **Zero rastreamento**: Nenhum cookie, analytics, ou script de terceiros que colete dados
- **Roda no GitHub Pages**: Deploy automático via GitHub Actions, funciona em `https://oldfaraday.github.io/ensina-logica/`

## 📚 Escopo MVP

- **Mapa completo dos 8 semestres** como dados (JSON)
- **1º semestre end-to-end** (Algoritmos e Lógica de Programação + Matemática Discreta/Lógica) com lições, exercícios e teoria completos
- 2 disciplinas × 3 módulos cada = 6 módulos
- Cada módulo com pelo menos 1 unidade teórica, 3–5 lições e flashcards

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/oldfaraday/ensina-logica.git
cd ensina-logica

# Instale dependências (apenas para scripts de validação/teste)
npm install

# Baixe bibliotecas terceiras (KaTeX, highlight.js)
npm run download-libs

# Rode um servidor local (qualquer servidor estático)
npx serve .
# ou
python -m http.server 8000
# então abra http://localhost:8000
```

**Nota**: A aplicação é vanilla HTML/CSS/JS (ES Modules) — **não há build step**. Basta abrir `index.html` num servidor HTTP local (necessário para ES modules e fetch de dados JSON).

## 🌐 Publicar no GitHub Pages

1. Crie um repositório chamado `ensina-logica` no GitHub
2. Faça push da branch `main`
3. Vá em **Settings → Pages**
4. Em **Source**, selecione **GitHub Actions**
5. O workflow `.github/workflows/deploy-pages.yml` fará o deploy automático a cada push na `main`
6. Acesse `https://SEU_USUARIO.github.io/ensina-logica/`

### Checklist de publicação

- [ ] Repositório criado no GitHub
- [ ] Push da branch `main` feito
- [ ] GitHub Pages ativado (Source: GitHub Actions)
- [ ] Workflow de deploy rodou com sucesso (aba Actions)
- [ ] URL `https://SEU_USUARIO.github.io/ensina-logica/` carrega sem erros
- [ ] Navegação funciona: boas-vindas → semestre → disciplina → módulo → lição
- [ ] Tema claro/escuro alterna corretamente
- [ ] Progresso persiste ao recarregar a página

## 📁 Estrutura de pastas

```
ensina-logica/
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml    # Deploy GitHub Pages
│       └── validate.yml        # Validação: links, metadados, licenças, JSON schema
├── .specify/                   # Spec Kit artifacts (constitution, spec, plan, tasks)
├── lib/
│   ├── katex/                  # KaTeX 0.16.9 local (JS, CSS, fonts .woff2)
│   └── highlightjs/            # highlight.js 11.9.0 local (JS, themes)
├── locales/
│   └── pt-BR.json              # Textos da interface (i18n ready)
├── data/
│   ├── curriculum.json         # Mapa completo: 8 semestres → disciplinas → módulos → lições
│   ├── theory/                 # Unidades teóricas (1 arquivo por unidade)
│   │   ├── sem1/
│   │   │   ├── algorithms/
│   │   │   └── discrete-math/
│   │   └── _schema.json        # JSON Schema para validar unidades teóricas
│   └── exercises/              # Exercícios (1 arquivo por lição/conjunto)
│       ├── sem1/
│       │   ├── algorithms/
│       │   └── discrete-math/
│       └── _schema.json        # JSON Schema para validar exercícios
├── src/
│   ├── app.js                  # Entry point: roteamento, boot, store init
│   ├── router.js               # Hash router simples
│   ├── store/
│   │   ├── ProgressStore.js    # Abstração localStorage/IndexedDB
│   │   └── schema-version.js   # Migrações de schema_version
│   ├── gamification/
│   │   ├── xp.js               # Cálculo XP, níveis
│   │   ├── streak.js           # Streak + freeze semanal
│   │   ├── achievements.js     # Badges, critérios de desbloqueio
│   │   └── srs.js              # Revisão espaçada (intervalos 1/3/7/21)
│   ├── curriculum/
│   │   ├── loader.js           # Carrega curriculum.json + theory + exercises
│   │   ├── unlock.js           # Lógica de desbloqueio
│   │   └── progress.js         # Marca lição/módulo concluído
│   ├── theory/
│   │   ├── renderer.js         # Renderiza unidade teórica (KaTeX, highlight.js, atribuição)
│   │   ├── sidebar.js          # Índice lateral navegável
│   │   ├── annotations.js      # CRUD anotações por seção
│   │   └── search.js           # Busca full-text (indexado em memória)
│   ├── lesson/
│   │   ├── renderer.js         # Renderiza lição: resumo + exercícios
│   │   ├── exercise-types/     # Um arquivo por tipo
│   │   │   ├── multiple-choice.js
│   │   │   ├── true-false.js
│   │   │   ├── order-steps.js
│   │   │   ├── code-completion.js
│   │   │   └── flashcards.js
│   │   └── feedback.js         # Feedback ícone+texto+cor, explicação, retry
│   ├── ui/
│   │   ├── theme.js            # Claro/escuro + prefers-color-scheme
│   │   ├── toasts.js           # Notificações não-intrusivas
│   │   ├── modals.js           # Modais acessíveis (ARIA)
│   │   └── a11y.js             # Skip links, focus trap, live regions
│   └── i18n.js                 # Carrega locale, `t(key, params)`
├── scripts/
│   ├── validate.mjs            # Validação CI: links, metadados, licenças, schemas
│   ├── test-core.mjs           # Testes unitários lógica pura
│   └── download-libs.mjs       # Baixa KaTeX/highlight.js versões fixas para lib/
├── index.html                  # Shell único: header, main, footer, scripts type=module
├── 404.html                    # Redirect para #/ (GitHub Pages SPA)
├── .nojekyll                   # Desliga Jekyll no Pages
├── favicon.svg
├── README.md
├── LICENSE                     # MIT
├── CONTENT_LICENSE.md          # CC BY-SA 4.0 + regra prevalência fonte
├── ATTRIBUTIONS.md             # Fontes conteúdo + libs terceiras
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── .gitignore
├── .editorconfig
└── package.json                # Apenas para scripts Node (validate, test, download-libs)
```

## ➕ Como adicionar conteúdo

O conteúdo é **data-driven**: novos semestres, disciplinas, módulos, lições e exercícios entram como **arquivos de dados** (não mexem em código).

> 📖 Guia completo (regras de licença, contratos de front-matter/exercício e o fluxo
> "adicionar fonte → gerar unidade → verificar → publicar"): [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md).

### 1. Adicionar unidade teórica

Crie um arquivo Markdown em `data/theory/sem{X}/{discipline}/{theory-unit-id}.md` — **o nome do arquivo é o próprio `id` da unidade** (ex.: `th-sem1-algorithms-m01-intro.md`), pois o loader monta a URL a partir do `id`. O front-matter é obrigatório:

```markdown
---
id: "th-sem1-algorithms-m01-intro"
title: "O que é um Algoritmo"
discipline: "algorithms"
module: "m01"
source:
  title: "Programming Fundamentals"
  authors: ["Kenneth Leroy Busbee", "Dave Braunschweig"]
  url: "https://press.rebus.community/programmingfundamentals/chapter/program-design/"
  chapter: "I. Introduction to Programming"
  section: "Program Design"
  access_date: "2026-10-16"
  edition: "2nd Edition (2018)"
  license_url: "https://creativecommons.org/licenses/by-sa/4.0/"
  license_confirmed_at: "2026-10-16"
license: "CC-BY-SA-4.0"
derivation_type: "summarized"
language: "pt-BR"
verification_status: "verified_with_source"
linked_lessons: ["l01", "l02"]
linked_exercises: ["ex-sem1-algorithms-m01-l01-algoritmo", "ex-sem1-algorithms-m01-l01-pseudo"]
original_excerpt: "An algorithm is a finite sequence of well-defined instructions."
---
## O que é um Algoritmo

Um algoritmo é uma sequência finita de instruções bem-definidas...

## Propriedades

Finito, definido e eficaz.
```

**Campos obrigatórios**: todos acima. `verification_status` = `unverified` | `verified_with_source`. `derivation_type` = `original` | `translated` | `adapted` | `summarized`. `license` = identificador SPDX. No corpo, use `## ` para cada seção (o `#` é reservado ao título da unidade) e `$...$`/`$$...$$` para matemática.

### 2. Adicionar exercícios

Crie um arquivo JSON em `data/exercises/sem{X}/{discipline}/{module-id}-{lesson-id}.json` contendo **um array de 3–5 exercícios**:

```json
[
  {
    "id": "ex-sem1-algorithms-m01-l01-algoritmo",
    "theory_unit_id": "th-sem1-algorithms-m01-intro",
    "lesson_id": "l01",
    "type": "multiple-choice",
    "generated_by_ai": true,
    "prompt": "Qual das seguintes melhor define um algoritmo?",
    "options": [
      "Um programa de computador escrito em Python",
      "Uma sequência finita de instruções bem-definidas para resolver um problema",
      "Qualquer código que compila sem erros",
      "Uma fórmula matemática complexa"
    ],
    "correct": 1,
    "explanation": "Definição padrão (Busbee & Braunschweig, 2018, §Program Design): algoritmo é uma sequência finita de instruções bem-definidas...",
    "difficulty": "easy",
    "xp_base": 10
  }
]
```

**Tipos suportados**: `multiple-choice` | `true-false` | `order-steps` | `code-completion` | `flashcards`.

### 3. Atualizar currículo

Edite `data/curriculum.json` para adicionar a lição ao módulo correspondente.

### 4. Validar

```bash
npm run validate
npm test
```

O validador checa: schema do currículo, front-matter das unidades teóricas, licença permitida, URL da fonte acessível, `verification_status` não é `unverified` em produção, exercícios válidos, links internos, licenças proibidas, ATTRIBUTIONS.md sincronizado.

### 5. Atualizar ATTRIBUTIONS.md

Adicione a nova fonte na seção correspondente com: título, autores, edição, licença, URL da licença, data de conferência.

## 📜 Licenças

- **Código**: MIT (livre, até comercial, mantém copyright/licença)
- **Conteúdo próprio do projeto**: CC BY-SA 4.0 (atribuição + compartilhamento pela mesma licença)
- **Conteúdo derivado de terceiros**: a licença da fonte **prevalece** sobre a licença padrão do projeto
- **Bibliotecas terceiras**: KaTeX (MIT), highlight.js (BSD-3-Clause) — hospedadas localmente, versões fixas

## 🤝 Como contribuir

Veja [CONTRIBUTING.md](CONTRIBUTING.md) e [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 📋 Fontes aprovadas para o 1º semestre

| Fonte | Disciplina | Licença | Status |
|-------|------------|---------|--------|
| Mathematics for Computer Science (Lehman, Leighton, Meyer) — Spring 2018 | Matemática Discreta | CC BY-SA 3.0 | ✅ Derivação permitida |
| Discrete Mathematics: An Open Introduction (Oscar Levin) — 3ª ed. | Matemática Discreta | CC BY-SA 4.0 | ✅ Derivação permitida |
| Programming Fundamentals (Busbee & Braunschweig) — 2ª ed. | Algoritmos e Lógica | CC BY-SA 4.0 | ✅ Derivação permitida |
| An Open Guide to Data Structures and Algorithms (Bible & Moser) — 1ª ed. | Algoritmos (Big-O apenas) | CC BY 4.0 | ✅ Derivação permitida |

Fontes NC, ND, "todos os direitos reservados" ou licença incerta → **apenas link "Leitura recomendada"**.

## 🔗 Links úteis

- [Spec Kit](https://github.com/github/spec-kit) — Metodologia Spec-Driven Development
- [KaTeX](https://katex.org/) — Renderização matemática
- [highlight.js](https://highlightjs.org/) — Destaque de código