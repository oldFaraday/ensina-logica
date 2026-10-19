---
id: th-sem1-algorithms-m03-modular-functions
title: Programação modular e funções
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/modular-programming/
  chapter: "III. Functions"
  section: Modular Programming
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
linked_exercises: [ex-sem1-algorithms-m03-l10-modular, ex-sem1-algorithms-m03-l10-scope-global, ex-sem1-algorithms-m03-l10-modelo-fechado]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [modular programming, function, parameter passing]
original_excerpt: "Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality. Functions are important because they allow us to take large complicated programs and to divide them into smaller manageable pieces."
---
## Ideia central

A **programação modular** (*modular programming*) divide um programa grande em **funções** (*functions*) — unidades independentes e intercambiáveis, cada uma responsável por um aspecto da funcionalidade. Funções permitem concentrar-se em uma parte pequena, testá-la isoladamente e reutilizá-la. Existem dois tipos: **controle de programa** (subdividem o programa atual, únicas para ele) e **tarefa específica** (reutilizáveis em vários programas, comunicam dados via **parâmetros**).

## Definição

A fonte define **programação modular** como "uma técnica de design de software que enfatiza separar a funcionalidade de um programa em módulos independentes e intercambiáveis, de forma que cada um contenha tudo o que é necessário para executar apenas um aspecto da funcionalidade desejada."

### Conceito de modularização

"Um dos conceitos mais importantes da programação é a capacidade de agrupar algumas linhas de código em uma unidade que pode ser incluída em nosso programa." Nomes originais: sub-programa, macro, sub-rotina, procedimento, módulo e **função** (termo usado nas linguagens predominantes hoje).

**Funções são importantes porque permitem pegar programas grandes e complicados e dividi-los em pedaços menores e gerenciáveis.** Como a função é menor, podemos concentrar no que ela deve fazer e testá-la para garantir que funciona.

### Duas categorias de funções

| Categoria | Descrição | Comunicação |
|-----------|-----------|-------------|
| **Controle de programa** (*Program Control*) | Subdividem e controlam o programa. Únicas ao programa. Outro programa pode ter funções com mesmo nome, mas conteúdo diferente. | Normalmente **não comunicam** informações entre si; usam área comum de armazenamento de variáveis (globais). |
| **Tarefa específica** (*Specific Task*) | Projetadas para uso em vários programas. Realizam uma tarefa específica (blocos de construção). Já codificadas e testadas. | **Comunicam dados** entre quem chama e a função chamada. Itens de dados passados são chamados **parâmetros** (*parameter passing*). |

### Quatro opções de comunicação de dados (parâmetros)

1. Sem entrada, sem saída
2. Sem entrada, com saída
3. Com entrada, com saída
4. Com entrada, sem saída

### Função `main` (controle de programa)

Em muitas linguagens, o programa principal é uma função especial chamada `main` — onde a execução começa e termina. Geralmente a primeira função definida, após includes, protótipos, constantes/variáveis globais.

### Função de tarefa específica (layout geral)

Linguagens estaticamente tipadas (C++, C#, Java):
```
<tipo retorno> nome_funcao(<tipo> <nome_parametro>) {
    // linhas de código
    return <valor>;
}
```

Linguagens dinamicamente tipadas (JavaScript, Python):
```
function nome_funcao(<nome_parametro>) {
    // linhas de código
    return <valor>;
}
def nome_funcao(<nome_parametro>):
    # linhas de código
    return <valor>
```

Chamada: usa o nome da função e parênteses com argumentos. Controle passa para a função; ao terminar, retorna ao ponto de chamada.

## Exemplo resolvido

Programa que converte Fahrenheit para Celsius usando função de tarefa específica:

```pseudo
Funcao Main
    Declare Real fahrenheit, celsius
    Exibir "Digite temperatura em Fahrenheit: "
    Ler fahrenheit
    Atribuir celsius = CalcularCelsius(fahrenheit)
    Chamar ExibirResultado(fahrenheit, celsius)
Fim

Funcao CalcularCelsius (Real fahrenheit) Retorna Real
    Declare Real celsius
    Atribuir celsius = (fahrenheit - 32) * 5 / 9
    Return celsius
Fim

Funcao ExibirResultado (Real fahrenheit, Real celsius)
    Exibir fahrenheit + "°F = " + celsius + "°C"
Fim
```

- `Main`: controle de programa.
- `CalcularCelsius`: tarefa específica (entrada `fahrenheit`, saída `celsius`).
- `ExibirResultado`: tarefa específica (duas entradas, sem saída).
- Comunicação via **parâmetros** (passagem de dados).

## Erros comuns

- **Não modularizar** (escrever tudo em `main`). A fonte cita: "Many students develop poor habits and skipping this step is one of them" (referindo-se ao design, mas aplica-se a modularizar).
- **Misturar controle de programa com tarefa específica**: funções de tarefa específica devem ser genéricas e reutilizáveis; se tiverem lógica específica do programa, não servem para outros programas.
- **Funções de tarefa específica usando variáveis globais** para comunicação. A fonte diz que elas "são construídas de forma que dados possam ser comunicados... via parâmetros" — o modelo correto é passagem de parâmetros, não globais.
- **Não testar funções isoladamente** antes de integrar. A fonte: "we can concentrate on what we want it to do and test it to make sure it works properly."
- **Confundir definição, chamada e declaração (protótipo)**. A fonte lista as três atividades: definir, chamar, declarar (protótipo — específico de C/C++).

> **Exemplo adicional (IA):** criar funções longas que fazem várias tarefas (violam responsabilidade única). A fonte não define "responsabilidade única", mas "each contains everything necessary to execute only one aspect" implica isso.

## Resumo

- Programação modular = dividir programa em funções independentes.
- Função = unidade de código agrupada (sub-rotina, procedimento, módulo).
- Dois tipos: **controle de programa** (específicas, usam globais) e **tarefa específica** (reutilizáveis, usam parâmetros).
- `main` = ponto de entrada/saída do programa.
- Comunicação via **parâmetros** (passagem de dados): 4 opções (in/out/both/none).
- Funções permitem testar partes isoladamente e reutilizar código (tarefa específica).
- Definir, chamar e (em algumas linguagens) declarar/prototipar são passos necessários.