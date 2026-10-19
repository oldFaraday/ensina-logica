---
id: th-sem1-algorithms-m03-for-loop
title: Laço for (contagem)
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee]
  url: https://press.rebus.community/programmingfundamentals/chapter/for-loop/
  chapter: "V. Loops"
  section: For Loop
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
linked_exercises: [ex-sem1-algorithms-m03-l08-for, ex-sem1-algorithms-m03-l08-code-for, ex-sem1-algorithms-m03-l08-trace]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [for loop, counting loop, loop variable]
original_excerpt: "A for loop is a control flow statement for specifying iteration, which allows code to be executed repeatedly. For loops are typically used when the number of iterations is known before entering the loop. Within the for control structure, there are four attributes to a properly working loop: Initializing the flag – done once, Test expression, Action or actions, Update of the flag."
---
## Ideia central

O laço **`for`** é um laço com **teste antes** (*pre-test*) projetado para **contagem**: usado quando o **número de iterações é conhecido antes** de entrar no laço. Ele tem **quatro atributos** (inicialização, teste, ação, atualização), com a particularidade de que a **inicialização e a atualização geralmente fazem parte da sintaxe do `for`** (diferente do `while`, onde a inicialização é externa). Como teste antes, a ação **pode não acontecer** (zero iterações).

## Definição

A fonte define o **`for`** como "uma instrução de fluxo de controle para especificar iteração... For loops are typically used when the number of iterations is known before entering the loop."

### Forma básica (contagem crescente)

```
para
    inicialização do valor inicial
    valor inicial é menor que o valor final
    algumas instruções ou ação
    ...
    incremente o valor inicial
```

Equivalente em `while`:

```
inicialização do valor inicial
enquanto o valor inicial for menor que o valor final
    algumas instruções ou ação
    ...
    incremente o valor inicial
```

Os **quatro atributos** (iguais ao `while`, mas a inicialização e atualização são parte da estrutura):
1. **Inicializar a flag — feita uma vez** (parte do cabeçalho do `for`).
2. **Expressão de teste** — comparação relacional (ex.: `contador < 5`).
3. **Ação ou ações** — corpo do laço.
4. **Atualizar a flag** — incremento/decremento (parte do cabeçalho do `for`).

Frase em inglês: "For x is 1; x less than 3; do the following actions; increment x; loop back to the test expression."

Como é **teste antes**, a ação **pode não acontecer** (se o valor inicial já falhar no teste).

### Exemplo da fonte

```
Para contador = 0, contador < 5, contador += 1
    Exibir "Eu amo sorvete!"
```

Os quatro atributos:
- Inicialização: `contador = 0` (feita uma vez).
- Teste: `contador < 5` (relacional menor que).
- Ação: uma linha de saída.
- Atualização: `contador += 1` (operador de incremento).

Indentação alinhada é prática padrão.

### Laços infinitos no `for`

Esquecer a atualização no cabeçalho causa laço infinito:

```
Para contador = 0, contador < 5
    Exibir "Eu amo sorvete!"
```

A inicialização está correta, mas **falta o passo de atualização**. O teste `contador < 5` será sempre verdadeiro.

## Exemplo resolvido

Somar números de 1 a 100 (fórmula de Gauss, mas com laço):

```pseudo
soma = 0
Para i = 1, i <= 100, i += 1
    soma = soma + i
Fim
Exibir soma   // 5050
```

- Inicialização: `i = 1` (uma vez).
- Teste: `i <= 100` (enquanto i for ≤ 100).
- Ação: `soma = soma + i`.
- Atualização: `i += 1` (a cada iteração).
- Executa exatamente 100 vezes (i = 1, 2, ..., 100).

Contagem regressiva (ex.: contagem regressiva de lançamento):

```pseudo
Para t = 10, t >= 1, t -= 1
    Exibir t
Fim
Exibir "Decolagem!"
```

- Teste usa `>=` (maior ou igual) para contagem decrescente.
- Atualização usa decremento `t -= 1`.

## Erros comuns

- **Esquecer a atualização no cabeçalho do `for`** → laço infinito. A fonte mostra exemplo exato: `For counter = 0, counter < 5` sem `counter += 1`.
- **Confundir `for` (contagem conhecida) com `while` (evento/condição desconhecida)**. A fonte: "For loops are typically used when the number of iterations is known before entering the loop."
- **Inicializar a variável de controle dentro do laço** (em linguagens onde o cabeçalho não permite declaração) — a variável deve ser inicializada **antes** ou **no cabeçalho**.
- **Modificar a variável de controle dentro do corpo do laço** além da atualização do cabeçalho → comportamento inesperado, contagem errada.
- **Teste com direção errada**: contagem crescente precisa de `<` ou `<=`; decrescente precisa de `>` ou `>=`. Usar `<` em contagem decrescente faz o laço não executar ou executar infinitamente (se houver decremento).
- **Achando que `for` em Python (`for i in range(5)`) funciona igual ao `for` estilo C** — a fonte descreve o `for` estilo C/C++/Java/JavaScript; Python usa iteradores. A fonte não cobre Python especificamente.

> **Exemplo adicional (IA):** usar `for` para iterar sobre coleções (arrays, listas) quando o número de iterações não é fixo previamente — em muitas linguagens modernas o `for` evoluiu para `for each` / `for...in` / `for...of`. A fonte foca no `for` de contagem clássico.

## Resumo

- `for` = laço de contagem, teste antes, usado quando **número de iterações é conhecido**.
- Quatro atributos: inicialização (uma vez), teste, ação, atualização — todos geralmente no cabeçalho.
- Sintaxe típica: `for (init; test; update) { body }` ou pseudocódigo `Para init, test, update`.
- Ação **pode não executar** (teste antes).
- Laço infinito se atualização for omitida no cabeçalho.
- Contagem crescente: `<` ou `<=` com incremento; decrescente: `>` ou `>=` com decremento.
- Indentação do corpo é prática padrão.