# Pipeline de conteúdo por módulo (v1)

Objetivo: produzir, para UM módulo por vez, teoria, exercícios, flashcards e biblioteca fiéis às fontes aprovadas, de forma repetível. Um módulo por sessão, um commit por módulo.

## Regras invioláveis

1. Só vale fonte da lista de fontes aprovadas do projeto, na edição e licença aprovadas.
2. Todo texto teórico deriva de uma seção da fonte ABERTA nesta sessão. Se a seção não abrir, marque pending e não escreva nada sobre ela. Nunca preencha de memória.
3. Nada de afirmação além da fonte. Conteúdo adicional da IA (exemplo, analogia) leva o rótulo "Exemplo adicional (IA)" e precisa ser verificado.
4. Você nunca marca human_reviewed. Esse valor é do usuário.
5. Antes de gerar, remova o conteúdo antigo DESTE módulo (o histórico do git guarda). Não reaproveite texto antigo sem passar pelos mesmos controles.
6. Não altere outros módulos.
7. Todo arquivo é UTF-8 sem BOM. Escreva arquivos só com a ferramenta de edição ou com Node (fs em 'utf8'); nunca com redirecionamento, Set-Content ou Out-File do PowerShell.

## Etapas

E0. Plano: escreva docs/modules/<id>/PLAN.md com: objetivos (4 a 6, com verbos mensuráveis: definir, identificar, aplicar, analisar, construir), pré-requisitos, mapa objetivo -> seção da fonte (URL específica, edição, URL da página da licença), lições (3 a 4) com os objetivos de cada uma e o que fica fora do escopo. No piloto, PARE aqui e peça aprovação. Nos módulos seguintes, siga, a menos que haja seção pending.

E1. Captura: abra cada seção e registre em docs/modules/<id>/SOURCES.md a URL, a edição, a data de acesso, a licença confirmada e os trechos literais usados.

E2. Teoria: uma unidade por conceito principal em data/theory/.
- 300 a 700 palavras em português (até 900 se necessário; senão divida).
- Estrutura fixa: Ideia central (2 a 3 frases), Definição fiel à fonte, Exemplo resolvido, Erros comuns, Resumo (3 a 5 itens).
- No máximo 3 termos novos por unidade.
- Traduza a partir do trecho aberto. Guarde o original_excerpt literal (15 palavras ou mais) e o "ver original". "Erros comuns" só vem da fonte; se a fonte não trata, use "Exemplo adicional (IA)".

E3. Auditoria de afirmações: escreva docs/modules/<id>/REVIEW.md com uma tabela: afirmação | seção | trecho de apoio | ok ou sem suporte. Remova ou rotule tudo que estiver sem suporte.

E4. Exercícios (regras abaixo).

E5. Biblioteca e glossário: ordem de leitura, tempo estimado, "praticar este trecho" levando aos exercícios da seção (e a volta), e termos novos no glossário com a definição tirada da fonte.

E6. Portões automáticos: npm run check-module <id>, npm run validate, npm test e npm run verify-sources. Corrija até passarem.

E7. Fechamento: atualize tasks.md e STATUS.md, marque "pipeline_version": 1 no módulo em curriculum.json, faça o commit, mostre o hash e liste o que ficou pending.

## Regras dos exercícios (progressão de dificuldade)

- Uma lição tem 6 exercícios (5 a 7), de 5 a 7 minutos.
- Rampa na lição: 1º fácil (vitória rápida), 2º fácil, 3º e 4º médios, 5º médio-alto, 6º desafio.
- Lição 1: 3 fáceis e 3 médios, sem difícil. Demais lições: 2 fáceis, 3 médios e 1 difícil.
- Progressão entre lições: a última lição integra conceitos das anteriores.
- Níveis: reconhecer, aplicar, analisar, transferir. Cada objetivo tem pelo menos 2 exercícios em níveis diferentes.
- Variedade: no máximo 2 exercícios seguidos do mesmo tipo; reconhecimento (verdadeiro/falso, múltipla escolha) antes de produção (completar código, ordenar passos).
- Distratores: erros comuns plausíveis, nunca respostas absurdas.
- Explicação em 2 a 3 frases, tom encorajador: por que a certa é certa, por que o erro comum falha, e a seção da fonte.
- 1 dica opcional por exercício, sem custo.
- O desafio usa só o conteúdo das unidades do módulo. Se o aluno precisar de algo que não foi ensinado, o exercício está errado.
- Desafio do módulo: 8 questões (2 fáceis, 4 médias, 2 difíceis), cobrindo todos os objetivos.
- Flashcards: 8 a 12, com termos e definições da fonte.
- Todo exercício tem: generated_by_ai true, objective_id, level, source_ref e answer_check.
- Código: execute em Python antes e registre a saída no answer_check. Em "completar código", accepted_answers só contém código válido e equivalente (sem respostas que não sejam código correto).
- Errar nunca bloqueia (sem vidas); os erros alimentam a revisão espaçada.

## Metas de dificuldade (de projeto, a validar com o uso)

Fácil: cerca de 90% de acerto. Médio: cerca de 75%. Difícil: cerca de 50%.

## Verificação humana (só o usuário)

Conferir 3 trechos traduzidos contra o original, resolver 5 exercícios (errando 1 de propósito) e avaliar a sensação de dificuldade. Só depois disso o status human_reviewed pode ser usado, e somente por ordem do usuário.
