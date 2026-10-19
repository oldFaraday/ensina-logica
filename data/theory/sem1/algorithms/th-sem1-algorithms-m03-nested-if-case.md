---
id: th-sem1-algorithms-m03-nested-if-case
title: Seleção múltipla: else if encadeado e case/switch
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee]
  url: https://press.rebus.community/programmingfundamentals/chapter/nested-if-then-else/
  chapter: "IV. Conditions"
  section: Nested If Then Else
  access_date: 2026-10-19
  edition: 2nd Edition (2018)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-19
license: CC-BY-SA-4.0
derivation_type: translated
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-19
verification_method: manual_url_check
linked_lessons: [l07]
linked_exercises: [ex-sem1-algorithms-m03-l07-ordem, ex-sem1-algorithms-m03-l07-relacionais, ex-sem1-algorithms-m03-l07-logicos]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [nested control structures, multiway selection, case control structure]
original_excerpt: "Two-way selection structures may be nested inside other two-way selection structures, resulting in multi-way selection. Nesting is a concept that places one item inside of another."
---
## Ideia central

Quando há mais de duas opções, usa-se **seleção múltipla** (*multiway selection*). Duas formas principais: **`else if` encadeado** (aninhamento de `if then else`) e a estrutura **`case`/`switch`**. O aninhamento (*nesting*) coloca uma estrutura de controle dentro de outra. O `case` compara um valor com constantes listadas; a maioria das linguagens exige tipos inteiros/caractere e não aceita intervalos — para intervalos, usa-se `if/else` encadeado com expressões booleanas compostas.

## Definição

### Estruturas de controle aninhadas (*nested control structures*)

A fonte define **aninhamento** (*nesting*) como "um conceito que coloca um item dentro de outro". Uma estrutura `if then else` pode conter outra `if then else` em sua ação verdadeira ou falsa:

```
se idade < 18
    você não pode votar
    se idade < 16
        você não pode dirigir
    senão
        você pode dirigir
senão
    você pode votar
    se idade < 21
        você não pode beber
    senão
        você pode beber
```

Isso permite misturar categorias de estruturas de controle (ex.: `if` dentro de `while`).

### Seleção múltipla (*multiway selection*)

O defeito da seleção de duas vias é permitir apenas duas escolhas. Para quatro ou mais opções, aninha-se `else if`:

```
se idade == 18
    você pode votar agora
senão se idade == 39
    você está na meia-idade
senão se idade == 65
    pode considerar aposentadoria
senão
    sua idade não tem importância
```

O último `senão` é o **caso padrão** (*default*): executado quando nenhum teste anterior corresponde.

### Estrutura `case` / `switch`

A fonte define **case** como "uma estrutura de controle que faz seleção múltipla" e **switch** como "uma estrutura que pode atuar como case". A lógica é de **igualdade**: o valor da variável é comparado aos valores listados (cases) em ordem, da esquerda para a direita. Se houver correspondência, executa a ação e o `break` sai da estrutura. Se não houver, passa ao próximo case. O `default` corresponde a qualquer valor não listado.

Exemplo em C/C++/Java/JavaScript/Swift:

```cpp
switch (idade) {
    case 18:  mensagem = "Pode votar."; break;
    case 39:  mensagem = "Meia-idade."; break;
    case 65:  mensagem = "Considere aposentadoria."; break;
    default:  mensagem = "Idade sem importância."; break;
}
```

**Limitações** (da fonte):
- A maioria das linguagens exige que os valores do `case` sejam da **família inteira** (inteiro ou caractere).
- **Não permitem intervalos** (ex.: `0 to 17`). Para intervalos, a implementação real usa `if/else` encadeado com expressões booleanas compostas:
  ```
  se idade > 0 e idade <= 17
      exibir "Não pode votar."
  senão se idade >= 18 e idade <= 64
      exibir "Anos de trabalho."
  senão
      exibir "Aposentadoria."
  ```
- Python **não suporta** `case`/`switch` nativamente; a solução é `if/elif/else`.

A fonte enfatiza: "Good structured programming methods... are more important than concentrating on the technical possibilities and capabilities of the language."

## Exemplo resolvido

Classificar nota (0–100) em conceitos usando `if/elif/else` (equivalente a `case`):

```pseudo
Se nota >= 90
    conceito = "A"
Senão se nota >= 80
    conceito = "B"
Senão se nota >= 70
    conceito = "C"
Senão se nota >= 60
    conceito = "D"
Senão
    conceito = "F"
Fim
```

- Testes em ordem decrescente garantem que apenas um bloco execute.
- O `senão` final captura notas < 60 (caso padrão).

Em linguagem com `switch` (apenas para valores discretos, ex.: menu de opções):

```pseudo
Caso opcao de
    1: Exibir "Incluir"
    2: Exibir "Alterar"
    3: Exibir "Excluir"
    4: Exibir "Sair"
    Padrão: Exibir "Opção inválida"
Fim
```

## Erros comuns

- **Esquecer o `break` no `switch`/`case`**: sem ele, o código "cai" para o próximo case (*fall-through*), executando múltiplas ações indesejadas.
- **Tentar usar intervalos no `case`** (ex.: `case 0 to 17:`) — a fonte alerta que a maioria das linguagens não permite; use `if/else` com `and`.
- **Ordem errada dos testes no `else if` encadeado**: testar `nota >= 60` antes de `nota >= 90` faria notas 90+ caírem no primeiro teste.
- **Omitir o `senão` final (default)**, deixando casos não previstos sem tratamento.
- **Usar `switch` em Python** — não existe; a fonte diz explicitamente: "Python does not support a case control structure."

> **Exemplo adicional (IA):** aninhar `if` desnecessariamente quando `else if` linear resolveria. A fonte mostra que o `else if` linear é apenas açúcar sintático para aninhamento, mas mais legível.

## Resumo

- **Aninhamento** (*nesting*): colocar uma estrutura dentro de outra; permite lógica complexa.
- **Seleção múltipla** (*multiway selection*): mais de duas opções; implementada via `else if` encadeado ou `case`/`switch`.
- **`else if` encadeado**: testado em ordem; primeiro verdadeiro executa; `senão` final = default.
- **`case`/`switch`**: compara valor com constantes listadas (igualdade); exige `break` para sair; limitações: só tipos inteiros/caractere, sem intervalos.
- Python não tem `switch`; use `if/elif/else`.
- Boas práticas de programação estruturada importam mais que recursos específicos da linguagem.