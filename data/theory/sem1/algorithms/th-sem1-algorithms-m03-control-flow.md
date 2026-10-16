---
id: th-sem1-algorithms-m03-control-flow
title: Controle de Fluxo
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/structured-programming/
  chapter: "IV. Conditions"
  section: Structured Programming
  access_date: 2026-10-16
  edition: 2nd Edition (2018)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_confirmed_at: 2026-10-16
license: CC-BY-SA-4.0
derivation_type: summarized
language: pt-BR
verification_status: verified_with_source
linked_lessons: [l07, l08, l09, l10]
linked_exercises: [ex-sem1-algorithms-m03-l07-if-else, ex-sem1-algorithms-m03-l07-mutuamente, ex-sem1-algorithms-m03-l07-relacionais, ex-sem1-algorithms-m03-l07-code, ex-sem1-algorithms-m03-l07-ordem, ex-sem1-algorithms-m03-l08-while-quatro, ex-sem1-algorithms-m03-l08-do-while, ex-sem1-algorithms-m03-l08-for, ex-sem1-algorithms-m03-l08-infinite, ex-sem1-algorithms-m03-l08-code, ex-sem1-algorithms-m03-l09-aninhados, ex-sem1-algorithms-m03-l09-break, ex-sem1-algorithms-m03-l09-continue, ex-sem1-algorithms-m03-l09-code, ex-sem1-algorithms-m03-l09-ordem, ex-sem1-algorithms-m03-l10-modular, ex-sem1-algorithms-m03-l10-param-arg, ex-sem1-algorithms-m03-l10-return, ex-sem1-algorithms-m03-l10-code, ex-sem1-algorithms-m03-l10-flash]
original_excerpt: "The mechanisms that allow us to control the flow of execution are called control structures."
---

**Controlar o fluxo de execução** significa decidir quais linhas de código serão executadas e quantas vezes. Os mecanismos que permitem esse controle são as **estruturas de controle**, que se dividem em sequência, seleção e iteração. Esta unidade aprofunda a seleção (condicionais), a iteração (laços), os laços aninhados com comandos de desvio e as funções.

## Seleção: if then else

Uma **estrutura de seleção** escolhe entre caminhos alternativos a partir de uma condição **booleana**. A forma mais comum é o **if then else** (se/senão), uma **seleção de duas vias**:

```pseudo
Se idade > 17
    Exibir "Você pode votar."
Senão
    Exibir "Você não pode votar."
Fim
```

As duas ações são **mutuamente exclusivas**: apenas uma delas é executada, nunca as duas. Quando não há ação para o caso falso, o "senão vazio" pode ser omitido. Para mais de duas opções usa-se **seleção múltipla** (um `senão se` encadeado) ou a estrutura **case/switch**. Em muitas linguagens a estrutura `case` só aceita valores do tipo inteiro ou caractere; intervalos são implementados com `if/else` encadeado.

## Operadores relacionais e lógicos

Os **operadores relacionais** comparam dois operandos e produzem um valor booleano: `<`, `>`, `<=`, `>=`, `==` (igualdade) e `!=` (diferença). Cuidado: em programação o `=` normalmente é **atribuição**, e a igualdade se escreve com dois sinais (`==`).

Os **operadores lógicos** combinam expressões booleanas:

| x | y | x and y | x or y |
| --- | --- | --- | --- |
| falso | falso | falso | falso |
| falso | verdadeiro | falso | verdadeiro |
| verdadeiro | falso | falso | verdadeiro |
| verdadeiro | verdadeiro | verdadeiro | verdadeiro |

O operador `not` inverte o valor lógico (verdadeiro vira falso e vice-versa). Grande parte das linguagens trata qualquer valor diferente de zero como verdadeiro.

## Iteração: while, do while e for

Uma **estrutura de iteração** (ou laço) repete um trecho de código. Um laço que funciona corretamente precisa de quatro atributos:

1. **Inicializar** a flag (variável de controle).
2. **Expressão de teste** (booleana).
3. **Ação(ões)** a repetir.
4. **Atualizar** a flag.

- **while**: laço com teste **antes** (*pre-test*). A ação **pode não acontecer** nenhuma vez.
- **do while / repeat until**: laço com teste **depois** (*post-test*). A ação acontece **pelo menos uma vez**.
- **for**: laço de contagem, usado quando o **número de repetições é conhecido** antes de entrar no laço.

```pseudo
contador = 0
Enquanto contador < 5
    Exibir "I love ice cream!"
    contador += 1
Fim
```

Se a flag nunca for atualizada, o teste pode permanecer verdadeiro para sempre e gerar um **laço infinito**.

## Laços aninhados e comandos de desvio

Em um **laço aninhado**, um laço é colocado dentro de outro: o laço **interno** é repetido por completo a cada iteração do laço **externo**. Isso resolve problemas de lógica complexa, como uma tabuada (linhas × colunas):

```pseudo
Para linha de 1 até 3
    Para coluna de 1 até 3
        Exibir linha * coluna
    Fim
Fim
```

Os **comandos de desvio** (*branching*) alteram esse fluxo:

- **break**: encerra a estrutura (sai do laço) imediatamente.
- **continue**: encerra apenas a **iteração atual** e vai para a próxima.
- **return**: sai de uma **função**, voltando para quem a chamou.
- **goto**: salto livre pelo programa, evitado na programação estruturada.

## Funções, parâmetros, retorno e escopo

A **programação modular** divide o programa em unidades independentes chamadas **funções** (também chamadas de sub-rotinas ou procedimentos). Elas permitem concentrar-se em uma parte pequena do problema e testá-la separadamente. As funções se dividem em **controle de programa** (subdividem o programa) e **tarefa específica** (reutilizáveis em vários programas).

Uma função pode receber dados por **parâmetros**. O **parâmetro** é o identificador (variável) declarado na definição da função; o **argumento** é o valor concreto passado na chamada. Por exemplo, em `CalcularCelsius(100)`, o parâmetro é `fahrenheit` e o argumento é `100`.

O comando **return** encerra a função e devolve a execução ao ponto onde ela foi chamada, podendo levar de volta **um valor**. O tipo **void** indica que a função não devolve valor.

O **escopo** é a região do programa onde um identificador é reconhecido:

- **Escopo global**: variável definida **fora** de qualquer função; disponível do ponto de definição até o fim do código.
- **Escopo local**: variável definida **dentro** de uma função; existe apenas durante a execução daquela função.

Isso é importante para a modularização: funções de tarefa específica devem usar apenas variáveis locais e receber dados por parâmetros, num *modelo fechado de comunicação* — predecessor do conceito de encapsulamento.
