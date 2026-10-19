---
id: th-sem1-algorithms-m03-branching
title: Comandos de desvio: break, continue, return
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee]
  url: https://press.rebus.community/programmingfundamentals/chapter/branching-statements/
  chapter: "V. Loops"
  section: Branching Statements
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
linked_lessons: [l09]
linked_exercises: [ex-sem1-algorithms-m03-l09-continue, ex-sem1-algorithms-m03-l09-break, ex-sem1-algorithms-m03-l09-code-break]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [branching statements, break, continue]
original_excerpt: "A branch is an instruction in a computer program that can cause a computer to begin executing a different instruction sequence and thus deviate from its default behavior of executing instructions in order. Common branching statements include break, continue, return, and goto. The break is used in one of two ways; with a switch to make it act like a case structure or as part of a looping process to break out of the loop."
---
## Ideia central

**Comandos de desvio** (*branching statements*) alteram o fluxo normal de execução sequencial, fazendo o programa "pular" para outra parte. Os principais são: **`break`** (sai da estrutura atual — laço ou `switch`), **`continue`** (pula para a próxima iteração do laço, sem sair dele), **`return`** (sai da função, voltando ao ponto de chamada), e **`goto`** (salto livre, evitado na programação estruturada). A função `exit` também é tratada como desvio por encerrar o programa prematuramente.

## Definição

A fonte define **branching statement** como "uma instrução em um programa de computador que pode fazer o computador começar a executar uma sequência de instruções diferente e assim desviar-se de seu comportamento padrão de executar instruções em ordem."

### `break`

Usado de duas formas:
1. Com `switch`/`case` para fazer a estrutura agir como `case` (sair após o case correspondente).
2. **Dentro de um laço** para **sair do laço imediatamente** (*break out of the loop*).

Exemplo da fonte (laço parece executar 8 vezes, mas `break` para na 5ª iteração):

```
contador = 0
Enquanto contador < 8
    Exibir contador
    Se contador == 4
        break
    contador += 1
```

Saída: `0 1 2 3 4` (para quando `contador` chega a 4).

### `continue`

**Encerra apenas a iteração atual** e vai para a próxima iteração do laço (não sai do laço).

Exemplo da fonte (parece imprimir 8 vezes, mas `continue` faz não imprimir o 4):

```
Para contador = 0, contador < 8, contador += 1
    Se contador == 4
        continue
    Exibir contador
```

Saída: `0 1 2 3 5 6 7` (pula 4, mas continua o laço).

### `return`

"A instrução `return` sai de uma função e retorna à instrução onde a função foi chamada." Pode opcionalmente retornar um valor.

```
Funcao FazAlgo
    instrucoes
Return <valor opcional>
```

### `goto`

"Estrutura `goto` tipicamente não é aceita na boa programação estruturada." Permite criar um rótulo (`label:`) e saltar para ele com `goto label;`. A fonte desaconselha.

### `exit`

Embora tecnicamente uma **função pré-definida**, é coberta aqui por uso comum. Exemplo: abrir arquivo, testar se abriu; se não, `exit` encerra o programa e retorna código inteiro ao sistema operacional.

## Exemplo resolvido

Buscar o primeiro número par em uma lista e parar:

```pseudo
Para i = 0, i < tamanho_lista, i += 1
    Se lista[i] % 2 == 0
        Exibir "Primeiro par encontrado: " + lista[i]
        break   // sai do laço imediatamente
    Fim
Fim
Exibir "Busca finalizada"
```

- Sem `break`, o laço continuaria verificando o resto da lista desnecessariamente.
- `break` sai **apenas do laço**; o `Exibir "Busca finalizada"` executa.

Pular números múltiplos de 3 ao imprimir 1 a 10:

```pseudo
Para i = 1, i <= 10, i += 1
    Se i % 3 == 0
        continue   // pula o resto desta iteração
    Fim
    Exibir i
Fim
```

Saída: `1 2 4 5 7 8 10` (3, 6, 9 pulados). O laço continua até 10.

Função que valida entrada e retorna valor ou encerra:

```pseudo
Funcao LerIdadePositiva
    faça
        Exibir "Idade: "
        Ler idade
        Se idade < 0
            Exibir "Idade inválida."
        Fim
    enquanto idade < 0
    Return idade
Fim
```

- `return` sai da função e devolve `idade` para quem chamou.

## Erros comuns

- **Confundir `break` com `continue`**: `break` **sai da estrutura**; `continue` **só pula a iteração atual**. A fonte define: `break` = "termina a estrutura existente"; `continue` = "interrompe a iteração atual para começar a próxima."
- **Usar `break` fora de laço ou `switch`** — erro de sintaxe na maioria das linguagens.
- **Usar `continue` fora de laço** — erro de sintaxe.
- **Esquecer `break` no `switch`/`case`** → *fall-through* (executa cases seguintes indesejadamente).
- **Usar `goto`** — a fonte diz: "typically not accepted in good structured programming." Cria código difícil de seguir (spaghetti code).
- **`return` sem valor em função que deve retornar valor** (ou vice-versa) — a fonte: "Most programming languages support either zero or one return value."

> **Exemplo adicional (IA):** `break` em laços aninhados sai apenas do **laço mais interno**; para sair de vários níveis, precisa de rótulos (em linguagens que suportam, como Java `break label;`) ou flags. A fonte não trata de laços aninhados com `break`.

## Resumo

- `break`: **sai da estrutura** (laço ou `switch`) imediatamente.
- `continue`: **pula para a próxima iteração** do laço (não sai do laço).
- `return`: **sai da função**, volta ao ponto de chamada, pode devolver valor.
- `goto`: salto livre; **evitado** na programação estruturada.
- `exit`: função que encerra o programa prematuramente (ex.: erro ao abrir arquivo).
- `break` em laços aninhados afeta apenas o laço mais interno.
- Esses comandos são "branching statements" — desviam o fluxo sequencial padrão.