---
id: th-sem1-algorithms-m03-relational-logical-operators
title: Operadores relacionais e lógicos
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/relational-operators/
  chapter: "IV. Conditions"
  section: Relational Operators
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
linked_exercises: [ex-sem1-algorithms-m03-l07-relacionais, ex-sem1-algorithms-m03-l07-atribuicao-igualdade, ex-sem1-algorithms-m03-l07-logicos]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [relational operator, logical operator, Boolean expression]
original_excerpt: "A relational operator is a programming language construct or operator that tests or defines some kind of relation between two entities. The relational operators are often used to create a test expression that controls program flow. This type of expression is also known as a Boolean expression because they create a Boolean answer or value when evaluated."
---
## Ideia central

Operadores **relacionais** comparam dois operandos e produzem um valor **booleano** (verdadeiro/falso), servindo como base das expressões de teste que controlam seleção e iteração. Operadores **lógicos** (`and`, `or`, `not`) combinam expressões booleanas para formar condições compostas. Cuidado: em programação, `=` costuma ser **atribuição**, e igualdade se escreve `==`.

## Definição

### Operadores relacionais

A fonte define **operador relacional** como "um construtor ou operador de linguagem de programação que testa ou define algum tipo de relação entre duas entidades". São seis os operadores comuns que produzem valor booleano comparando dois operandos:

| Operador | Significado |
|----------|-------------|
| `<`      | menor que |
| `>`      | maior que |
| `<=`     | menor ou igual a |
| `>=`     | maior ou igual a |
| `==`     | igualdade (igual a) |
| `!=` ou `<>` | desigualdade (diferente de) |

Se os operandos forem de tipos diferentes, ocorre **promoção implícita** para o mesmo tipo. Esses operadores criam **expressões de teste** (*test expressions*) que controlam o fluxo do programa — também chamadas **expressões booleanas** (*Boolean expressions*) porque geram resposta booleana ao serem avaliadas.

### Atribuição vs. Igualdade

A fonte alerta: "In math you are familiar with using the symbol = to mean equal... In many programming languages the ≠ is not used and the = symbol means assignment." O símbolo `=` normalmente é **atribuição**; para igualdade usa-se `==`. Exemplo perigoso:

```
Se (pig = 'y')   // Atribui 'y' a pig, depois avalia pig (não-zero → verdadeiro)
    // Sempre executa este ramo!
Senão
    // Nunca executa
```

O correto é `pig == 'y'`. "Don't get caught using assignment for equality."

### Operadores lógicos

A fonte define **operador lógico** como "um símbolo ou palavra usado para conectar duas ou mais expressões de forma que o valor da expressão composta produzida dependa apenas das expressões originais e do significado do operador". Há três operadores comuns:

| Operador | Símbolos comuns | Descrição |
|----------|-----------------|-----------|
| AND      | `&&`, `and`     | Verdadeiro se **ambos** operandos são verdadeiros |
| OR       | `\|\|`, `or`    | Verdadeiro se **pelo menos um** operando é verdadeiro |
| NOT      | `!`, `not`      | Inverte o valor lógico |

**Tabelas-verdade** (da fonte):

- **AND**: `false && false = false`, `false && true = false`, `true && false = false`, `true && true = true`
- **OR**: `false || false = false`, `false || true = true`, `true || false = true`, `true || true = true`
- **NOT**: `!false = true`, `!true = false`

A fonte nota: "Most programming languages recognize any non-zero value as true." Por isso `6 > 4 && 8` é válido (8 é não-zero → verdadeiro).

**Precedência**: operadores relacionais são avaliados antes dos lógicos. Parênteses tornam a lógica clara: `(6 > 4) && (2 <= 14)`.

## Exemplo resolvido

Verificar se uma pessoa pode dirigir: idade ≥ 18 **E** tem habilitação.

```pseudo
Se idade >= 18 E tem_habilitacao = verdadeiro
    Exibir "Pode dirigir"
Senão
    Exibir "Não pode dirigir"
Fim
```

- `idade >= 18`: operador relacional `>=` → booleano.
- `tem_habilitacao = verdadeiro`: comparação de igualdade (ou apenas `tem_habilitacao` se for booleano).
- `E` (`and`/`&&`): operador lógico combinando os dois.
- A expressão toda é uma **expressão booleana** que controla o `se`.

Outro exemplo: verificar se número está fora do intervalo 1–100:

```pseudo
Se numero < 1 OU numero > 100
    Exibir "Fora do intervalo"
Fim
```

## Erros comuns

- **Usar `=` (atribuição) em vez de `==` (igualdade)** na condição. A fonte dedica uma seção inteira a isso: o teste `if (pig = 'y')` *sempre* será verdadeiro porque atribui e depois avalia o valor atribuído.
- **Esquecer que `!=` e `<>` são equivalentes** para desigualdade; a fonte lista ambos.
- **Confundir precedência**: `6 > 4 && 2 <= 14` avalia os relacionais primeiro; parênteses evitam ambiguidades.
- **Assumir que `and`/`or` em Python funcionam exatamente como `&&`/`||` em C/Java**: a lógica é a mesma, mas Python retorna o último valor avaliado (short-circuit), não necessariamente `True`/`False`.
- **Testar múltiplas condições com `or` achando que basta uma variável**: `idade == 18 or 39` está errado; correto é `idade == 18 or idade == 39`.

> **Exemplo adicional (IA):** escrever `if x > 5 and < 10` (sintaxe inválida na maioria das linguagens); correto: `if x > 5 and x < 10`. A fonte não trata desse erro específico.

## Resumo

- Operadores relacionais (`<`, `>`, `<=`, `>=`, `==`, `!=`) comparam dois operandos → booleano.
- `=` é atribuição; `==` é igualdade. Confundi-los faz o teste sempre ser verdadeiro.
- Operadores lógicos (`and`/`&&`, `or`/`||`, `not`/`!`) combinam booleanos.
- Tabelas-verdade definem o resultado de cada combinação.
- Qualquer valor não-zero é tratado como verdadeiro na maioria das linguagens.
- Precedência: relacionais antes de lógicos; use parênteses para clareza.