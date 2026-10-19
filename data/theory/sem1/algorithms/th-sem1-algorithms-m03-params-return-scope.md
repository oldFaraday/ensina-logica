---
id: th-sem1-algorithms-m03-params-return-scope
title: Parâmetros, argumentos, retorno e escopo
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Dave Braunschweig, Kenneth Leroy Busbee]
  url: https://press.rebus.community/programmingfundamentals/chapter/parameters-and-arguments/
  chapter: "III. Functions"
  section: Parameters and Arguments
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
linked_lessons: [l10]
linked_exercises: [ex-sem1-algorithms-m03-l10-param-arg, ex-sem1-algorithms-m03-l10-return, ex-sem1-algorithms-m03-l10-code]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [parameter, argument, scope]
original_excerpt: "A parameter is a special kind of variable used in a function to refer to one of the pieces of data provided as input to the function. These pieces of data are the values of the arguments with which the function is going to be called/invoked. An ordered list of parameters is usually included in the definition of a function."
---
## Ideia central

Uma função recebe dados de entrada via **parâmetros** (identificadores na definição) e valores reais chamados **argumentos** (valores na chamada). O comando **`return`** encerra a função, volta ao ponto de chamada e pode devolver **um valor**. O **escopo** (*scope*) define onde um identificador é reconhecido: **global** (fora de funções, do ponto de definição até o fim) ou **local** (dentro de função, só durante sua execução). Funções de tarefa específica usam modelo fechado: entram dados por parâmetros, saem por `return` — predecessor do encapsulamento.

## Definição

### Parâmetro vs. Argumento

A fonte define **parâmetro** (*parameter*) como "um tipo especial de variável usado em uma função para se referir a um dos pedaços de dados fornecidos como entrada à função." **Argumento** (*argument*) é "um valor fornecido como entrada a uma função."

- **Parâmetro** = identificador (variável) na **definição** da função.
- **Argumento** = valor **concreto** passado na **chamada**.

Exemplo da fonte:
```
Funcao CalcularCelsius (Real fahrenheit)
    Declare Real celsius
    Atribuir celsius = (fahrenheit - 32) * 5 / 9
Return Real celsius
```
Se chamado `CalcularCelsius(100)`: **parâmetro** = `fahrenheit`; **argumento** = `100`.

"Os termos parâmetro e argumento são frequentemente usados de forma intercambiável. No entanto, parâmetro refere-se ao identificador da variável (fahrenheit) enquanto argumento refere-se ao valor da variável (100)."

Funções podem ter **múltiplos parâmetros** (ordem posicional importa):
```
Funcao ExibirResultado (Real fahrenheit, Real celsius)
    Exibir fahrenheit + "°F = " + celsius + "°C"
Fim
```
Chamada `ExibirResultado(98.6, 37.0)`: 1º argumento → 1º parâmetro (`fahrenheit`=98.6), 2º → 2º (`celsius`=37.0). Inverter a ordem (`ExibirResultado(37.0, 98.6)`) produz saída incorreta.

Algumas linguagens (Python) suportam **parâmetros nomeados** — ordem ignorada quando nomes são usados.

### Comando `return`

A fonte define **`return`** como "uma estrutura de controle de ramificação que faz uma função saltar de volta para a função que a chamou."

- Encerra a função **imediatamente**.
- Retoma execução **logo após a chamada**.
- A maioria das linguagens suporta **zero ou um valor de retorno**.
- Funções sem retorno são chamadas de **sub-rotinas** em linguagens antigas.
- O valor de retorno é passado **por posição**, não por nome. Exemplo da fonte: `GetFahrenheit` retorna `fahrenheit`; `GetTemperature` retorna `temperature` — ambos funcionam igual porque a posição é a mesma.
- Variáveis com mesmo nome em funções diferentes **são variáveis diferentes** (locais a cada função): "Each variable refers to a different location in memory."

### Escopo (*scope*)

A fonte define **escopo** como "a área do programa onde um item (variável, constante, função, etc.) que tem um nome identificador é reconhecido."

| Tipo | Onde definido | Disponibilidade | Armazenamento |
|------|---------------|-----------------|---------------|
| **Global** | Fora de qualquer função | Do ponto de definição até o fim do código fonte | Área de dados (*data area*) do código objeto |
| **Local** | Dentro de uma função | Do ponto de definição até o fim da função | Pilha (*stack*) — criada na entrada, liberada na saída |

- Parâmetros são **variáveis locais** (passagem estabelece como locais).
- Variáveis/constantes locais costumam ficar no topo da função.
- **Modelo de comunicação fechado**: funções de tarefa específica usam **apenas variáveis locais**, recebem dados por parâmetros, devolvem por `return`. Isso é "predecessor importante para encapsulamento" (OO).

## Exemplo resolvido

Função que calcula fatorial (recursiva, para ilustrar escopo local e retorno):

```pseudo
Funcao Fatorial (Inteiro n) Retorna Inteiro
    Se n <= 1
        Return 1
    Fim
    Return n * Fatorial(n - 1)
Fim

Funcao Main
    Declare Inteiro resultado
    Atribuir resultado = Fatorial(5)  // argumento 5
    Exibir "5! = " + resultado        // 120
Fim
```

- `n` é **parâmetro** (definição); `5` é **argumento** (chamada).
- Cada chamada recursiva cria **novo `n` local** na pilha.
- `return` devolve valor para a chamada anterior.
- `resultado` em `Main` é **local a `Main`**; `n` em `Fatorial` é **local a `Fatorial`** — não colidem.

Exemplo de escopo global vs. local:

```pseudo
Inteiro contador_global = 0   // escopo global

Funcao Incrementar
    Inteiro contador_local = 0  // escopo local
    contador_local += 1
    contador_global += 1
    Exibir "Local: " + contador_local + ", Global: " + contador_global
Fim

Funcao Main
    Chamar Incrementar()  // Local: 1, Global: 1
    Chamar Incrementar()  // Local: 1, Global: 2
    // contador_local não acessível aqui
Fim
```

- `contador_global`: disponível em todo programa (do ponto de definição em diante).
- `contador_local`: reinicia a 0 a cada chamada; morre ao fim da função.

## Erros comuns

- **Confundir parâmetro com argumento**: achar que são a mesma coisa. A fonte distingue explicitamente: parâmetro = identificador; argumento = valor.
- **Inverter ordem dos argumentos** na chamada de função com múltiplos parâmetros posicionais → valores trocados, lógica errada.
- **Esquecer `return`** em função que deve devolver valor → retorno indefinido/zero/erro.
- **Usar variável global onde variável local bastaria** — viola modelo fechado de comunicação, dificulta reuso e testes.
- **Achar que variável com mesmo nome em funções diferentes é a mesma** — a fonte: "While both functions have a variable named fahrenheit, they are not the same variable. Each variable refers to a different location in memory."
- **Acessar variável local fora da função** — fora do escopo, não existe.
- **Definir variável global depois de funções que a usam** — tecnicamente só disponível do ponto de definição em diante; por convenção, globais ficam no topo.

> **Exemplo adicional (IA):** em Python, `def f(x=[]):` (lista mutável como default) cria armadilha: o default é avaliado uma vez na definição, compartilhado entre chamadas. A fonte não trata de defaults mutáveis.

## Resumo

- **Parâmetro** = variável na definição; **Argumento** = valor na chamada.
- Ordem posicional importa (exceto parâmetros nomeados em Python).
- `return` encerra função, volta ao chamador, pode devolver **um valor**.
- Variáveis de mesmo nome em funções diferentes são **distintas** (locais).
- **Escopo global**: fora de funções, disponível da definição ao fim.
- **Escopo local**: dentro de função, disponível da definição ao fim da função; armazenada na pilha.
- **Modelo fechado**: tarefa específica usa só locais + parâmetros + return → predecessor do encapsulamento OO.
- Parâmetros são variáveis locais estabelecidas pela passagem.