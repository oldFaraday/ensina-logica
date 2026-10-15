# Licença de Conteúdo — Ensina Lógica

## Conteúdo Próprio do Projeto

**CC BY-SA 4.0** — Creative Commons Attribution-ShareAlike 4.0 International

Você é livre para:
- **Compartilhar** — copiar e redistribuir o material em qualquer suporte ou formato
- **Adaptar** — remixar, transformar e criar a partir do material para qualquer fim, até mesmo comercial

Sob as seguintes condições:
- **Atribuição** — Você deve dar o crédito apropriado, fornecer um link para a licença e indicar se mudanças foram feitas. Você pode fazê-lo de qualquer maneira razoável, mas não de forma que sugira que o licenciante o apoia ou aprova o seu uso.
- **CompartilhaIgual** — Se você remixar, transformar ou criar a partir do material, deve distribuir suas contribuições sob a mesma licença do original.
- **Sem restrições adicionais** — Você não pode aplicar termos legais ou medidas tecnológicas que restrinjam legalmente outros de fazerem algo que a licença permita.

Texto completo: https://creativecommons.org/licenses/by-sa/4.0/legalcode

---

## Conteúdo Derivado de Terceiros — Regra de Prevalência

**A licença da fonte original prevalece sobre a licença padrão do projeto (CC BY-SA 4.0).**

Cada unidade teórica derivada carrega metadados obrigatórios incluindo:
- `source.license` — Identificador SPDX da licença da fonte
- `source.url` — URL onde a licença pode ser verificada na página da própria fonte
- `derivation_type` — `translated` | `adapted` | `summarized` | `original`

### Fontes aprovadas para derivação (licença confirmada na página da fonte)

| Fonte | Licença | URL da licença |
|-------|---------|----------------|
| Mathematics for Computer Science (Lehman, Leighton, Meyer) — Spring 2018 | CC BY-SA 3.0 | https://courses.csail.mit.edu/6.042/spring18/mcs.pdf |
| Discrete Mathematics: An Open Introduction (Oscar Levin) — 3ª ed. | CC BY-SA 4.0 | https://discrete.openmathbooks.org/ |
| Programming Fundamentals (Busbee & Braunschweig) — 2ª ed. | CC BY-SA 4.0 | https://press.rebus.community/programmingfundamentals/front-matter/preface/ |
| An Open Guide to Data Structures and Algorithms (Bible & Moser) — 1ª ed. | CC BY 4.0 | https://pressbooks.palni.org/anopenguidetodatastructuresandalgorithms/ |

### Fontes apenas para link "Leitura recomendada" (não permissivas para derivação)

| Fonte | Licença | Motivo |
|-------|---------|--------|
| OpenStax Introduction to Python Programming | CC BY-NC-SA 4.0 | NC (não comercial) |
| How to Think Like a Computer Scientist (Runestone) | GNU FDL | Não CC BY-SA |
| MIT 6.0001 (OCW) | CC BY-NC-SA 4.0 | NC (não comercial) |
| CS50 (Harvard) | Licença custom | Não permissiva |
| Book of Proof (Hammack) | CC BY-ND 4.0 | ND (sem derivações) |

---

## Atribuição na Interface

Cada unidade teórica exibe no cabeçalho:
- Autor(es)
- Título da fonte
- Capítulo/Seção
- URL da fonte
- Licença (SPDX)
- Data de acesso
- Tipo de derivação
- Badge de status de verificação (`não verificado` | `conferido com a fonte`)
- Alternador "Ver original" (quando a licença da fonte permite)

Arquivo consolidado: `ATTRIBUTIONS.md`

---

## Exercícios Gerados por IA

- Obrigatoriamente ligados a uma unidade teórica (`theory_unit_id`)
- Resposta correta e explicação conferidas contra a fonte
- Marcados como **"gerados por IA"** na interface
- Exercícios de código **devem ser executados/testados antes de entrar** no repositório
- Licença: herdam a licença da unidade teórica a que estão ligados