---
id: th-sem1-algorithms-m03-iteration-while
title: Iteração e laço while
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/iteration-control-structures/
  chapter: "V. Loops"
  section: Iteration Control Structures
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
linked_lessons: [l08]
linked_exercises: [ex-sem1-algorithms-m03-l08-do-while, ex-sem1-algorithms-m03-l08-for, ex-sem1-algorithms-m03-l08-while-quatro]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [iteration control structure, while loop, pre-test loop]
original_excerpt: "In iteration control structures, a statement or block is executed until the program reaches a certain state, or operations have been applied to every element of a collection. The basic attribute of an iteration control structure is to be able to repeat some lines of code. Within the while control structure there are four attributes to a properly working loop: Initializing the flag, Test expression, Action or actions, Update of the flag."
---
## Ideia central

A **iteração** (*iteration* ou repetição) permite executar um trecho de código várias vezes. O laço **`while`** é um laço com **teste antes** (*pre-test* ou *test before*): a condição é avaliada **antes** de cada iteração, então a ação **pode não acontecer nenhuma vez** (zero iterações). Para que um laço `while` funcione corretamente, ele precisa de **quatro atributos**: inicializar a flag, expressão de teste, ação(ões) e atualizar a flag. A **flag** é a variável de controle que sinaliza quando o laço deve parar.

## Definição

A fonte define **estrutura de controle de iteração** como aquela onde "uma instrução ou bloco é executado até que o programa atinja certo estado, ou operações tenham sido aplicadas a cada elemento de uma coleção". O atributo básico é "poder repetir algumas linhas de código".

### Laço `while` (teste antes)

A forma básica do `while` (pseudocódigo da fonte):

```
inicialização da flag
enquanto a resposta à pergunta for verdadeira faça
    algumas instruções ou ação
    ...
    atualize a flag
```

Em código:

```
inicialização da flag
enquanto a expressão for verdadeira faça
    algumas instruções ou ação
    ...
    atualize a flag
```

Os **quatro atributos** de um laço `while` que funciona:

1. **Inicializar a flag** — não é tecnicamente parte da estrutura, mas item necessário antes de iniciar o laço.
2. **Expressão de teste** — expressão booleana avaliada a cada iteração.
3. **Ação ou ações** — instruções a repetir.
4. **Atualizar a flag** — modificar a variável de controle para que o laço termine.

Como o teste vem **antes** da ação, a ação **pode não acontecer** (zero iterações). Por isso é chamado **teste antes** (*pre-test loop*).

### Conceito de flag (*flag concept*)

A fonte explica: "Flags são comumente usadas para controlar ou indicar o estado intermediário ou resultado de operações particulares." Qualquer variável ou constante pode ser uma flag; o valor armazenado transmite significado. "Olhar a flag implica comparar o valor na variável a outro valor usando um operador relacional." As estruturas de controle são "controladas" por uma expressão de teste (geralmente booleana), e o conceito de flag é fundamental para entender como todas funcionam.

### Laços infinitos

"Infinite loops are a bad thing." Ocorrem quando a expressão de teste **nunca se torna falsa** — geralmente porque a flag não é atualizada. Exemplo: inicializar `loop_response = 'y'` e testar `while loop_response == 'y'` sem nunca atualizar `loop_response` dentro do laço.

### Laços de contagem (*counting loops*)

Um uso comum do `while` é como laço de contagem, onde a flag é um contador:

```
contador = 0
enquanto contador < 5
    Exibir "Eu amo sorvete!"
    contador += 1
```

Os quatro atributos estão presentes: inicialização (0), teste (`contador < 5`), ação (exibir), atualização (`+= 1`). Executa exatamente 5 vezes (valores 0, 1, 2, 3, 4). Se a atualização faltar → laço infinito.

## Exemplo resolvido

Somar números de 1 a 10 usando `while`:

```pseudo
soma = 0
i = 1
Enquanto i <= 10
    soma = soma + i
    i = i + 1
Fim
Exibir soma   // 55
```

- **Inicialização**: `soma = 0`, `i = 1` (duas flags: acumulador e contador).
- **Teste**: `i <= 10` (booleano).
- **Ação**: `soma = soma + i`.
- **Atualização**: `i = i + 1`.
- Para quando `i` se torna 11 (teste falso).

## Erros comuns

- **Esquecer de inicializar a flag** antes do laço → comportamento indefinido.
- **Esquecer de atualizar a flag** dentro do laço → **laço infinito**. A fonte dá dois exemplos: (1) flag nunca atualizada; (2) atribuição `=` em vez de comparação `==` no teste (`while loop_response = 'y'`).
- **Colocar a atualização no lugar errado** (ex.: antes da ação quando deveria ser depois, ou vice-versa, alterando a contagem).
- **Teste `while` com condição que nunca é falsa** por erro lógico (ex.: `while true` sem `break` interno).
- **Confundir `while` (teste antes) com `do while` (teste depois)**: no `while`, a ação pode não executar; no `do while`, executa pelo menos uma vez.

> **Exemplo adicional (IA):** usar `while` para laço de contagem quando o número de iterações é conhecido; a fonte diz que `for` é mais adequado para contagem, mas `while` funciona.

## Resumo

- Iteração repete código; `while` é teste antes (pode executar 0 vezes).
- Quatro atributos obrigatórios: inicializar flag, teste, ação, atualizar flag.
- Flag = variável de controle; "olhar a flag" = comparar com operador relacional.
- Laço infinito = teste nunca fica falso (geralmente por falta de atualização).
- Laço de contagem usa contador como flag; `while` serve, mas `for` é mais idiomático para contagem.
- A inicialização da flag ocorre **antes** do laço; a atualização ocorre **dentro** do laço.