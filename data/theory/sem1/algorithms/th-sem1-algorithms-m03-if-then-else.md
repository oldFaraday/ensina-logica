---
id: th-sem1-algorithms-m03-if-then-else
title: Seleção de duas vias: if then else
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee]
  url: https://press.rebus.community/programmingfundamentals/chapter/if-then-else/
  chapter: "IV. Conditions"
  section: If Then Else
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
linked_exercises: [ex-sem1-algorithms-m03-l07-if-else, ex-sem1-algorithms-m03-l07-mutuamente, ex-sem1-algorithms-m03-l07-code]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [if then else, mutually exclusive, null else]
original_excerpt: "The if–then–else construct, sometimes called if-then, is a two-way selection structure common across many programming languages. Asking a question that has a true or false answer controls the if then else structure."
---
## Ideia central

A estrutura **if then else** (se/senão) é uma **seleção de duas vias** presente em praticamente todas as linguagens de alto nível. Uma pergunta com resposta **verdadeiro/falso** (expressão booleana) controla qual das duas ações será executada. As duas ações são **mutuamente exclusivas**: apenas uma delas ocorre, nunca as duas. Quando não há ação para o caso falso, usa-se o "senão vazio" (*null else*), que pode ser omitido na forma curta.

## Definição

A fonte define o **if then else** como "uma estrutura de seleção de duas vias comum em muitas linguagens de programação". A estrutura básica é:

```
Se (condição booleana) Então
    (consequente)
Senão
    (alternativa)
Fim Se
```

Em muitas linguagens, a palavra reservada `then` é omitida, e o "é verdadeiro" é inferido:

```
se expressão
    ação verdadeira
senão
    ação falsa
```

Como a pergunta (expressão de teste) tem **apenas duas respostas possíveis** (verdadeiro ou falso), as ações são **mutuamente exclusivas** (*mutually exclusive*): uma é executada, a outra nunca.

**Senão vazio** (*null else*): quando o programador quer agir apenas se a expressão for verdadeira, sem ação para o caso falso, a estrutura fica:

```
se expressão
    ação verdadeira
senão
    não fazer nada
```

Como o "senão não fazer nada" é implícito, costuma-se escrever apenas:

```
se expressão
    ação verdadeira
```

## Exemplo resolvido

Verificar se uma pessoa pode votar (idade ≥ 18):

```pseudo
Se idade >= 18
    Exibir "Você pode votar."
Senão
    Exibir "Você não pode votar."
Fim
```

- Condição: `idade >= 18` (expressão booleana).
- Se verdadeiro: exibe "Você pode votar."
- Se falso: exibe "Você não pode votar."
- Apenas **uma** das duas mensagens aparece — são mutuamente exclusivas.

Exemplo com senão vazio: avisar apenas se a temperatura estiver alta:

```pseudo
Se temperatura > 35
    Exibir "Alerta: temperatura elevada!"
Fim
```

Nada acontece se a condição for falsa.

## Erros comuns

- **Esquecer que as ações são mutuamente exclusivas** e esperar que ambas executem. A fonte é clara: "One of the actions is executed; never both of the actions."
- **Omitir o `senão` quando há ação para o caso falso**, criando lógica incorreta.
- **Confundir a sintaxe entre linguagens**: algumas usam `then`, outras não; algumas usam chaves `{}`, outras usam indentação. A fonte mostra quatro formas equivalentes.
- **Usar atribuição (`=`) em vez de igualdade (`==`)** na condição — tratado em detalhe na unidade "Operadores relacionais e lógicos".

> **Exemplo adicional (IA):** aninhar muitos `if/else` sem indentação clara torna o código ilegível. A fonte não trata de estilo, mas o problema é consequência direta da estrutura.

## Resumo

- `if then else` é seleção de duas vias controlada por expressão booleana.
- As duas ações são mutuamente exclusivas: uma executa, a outra não.
- Forma curta (sem `senão`) serve quando não há ação para o caso falso ("null else").
- Sintaxe varia entre linguagens (`if/else`, `if/elif/else`, chaves vs. indentação), mas a lógica é a mesma.