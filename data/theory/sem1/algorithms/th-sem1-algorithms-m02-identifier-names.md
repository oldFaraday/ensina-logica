---
id: th-sem1-algorithms-m02-identifier-names
title: Nomes de identificadores
discipline: algorithms
module: m02
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/identifier-names/
  chapter: "II. Data and Operators"
  section: Identifier Names
  access_date: 2026-10-19
  edition: 2nd Edition (2018)
  license_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_deed_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_note: "CC BY-SA 4.0 declarada na página do livro, exceto onde indicado; nenhuma imagem da fonte foi derivada."
  license_confirmed_at: 2026-10-19
license: CC-BY-SA-4.0
derivation_type: translated
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-19
verification_method: manual_url_check
linked_lessons: [l04]
linked_exercises: [ex-sem1-algorithms-m02-l04-ident-significativo, ex-sem1-algorithms-m02-l04-reservada, ex-sem1-algorithms-m02-challenge-identificador, ex-sem1-algorithms-m02-flash-identificador]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [identifier name, reserved word, camel case]
original_excerpt: "Meaningful identifier names make your code easier for another to understand. After all what does “p” mean? Is it pi, price, pennies, etc."
---

## Ideia central

Em programação, vários itens recebem nomes descritivos para tornar o código mais significativo para quem lê. Esses nomes são os **nomes de identificadores** (em inglês, *identifier names*). Constantes, variáveis, definições de tipo e funções são identificados por um nome quando são declarados ou definidos.

## Definição

A fonte explica que os nomes seguem três grupos de regras: as limitações técnicas da linguagem, as boas práticas de programação e os padrões comuns da indústria.

No grupo técnico, três regras aparecem em quase todas as linguagens: usar apenas caracteres permitidos (em muitas linguagens, o primeiro caractere deve ser alfabético ou sublinhado, e os seguintes podem ser alfanuméricos ou sublinhado); não usar **palavras reservadas**; e respeitar o limite de comprimento do nome. Esses detalhes variam de linguagem para linguagem e até entre compiladores.

No grupo das boas práticas, o nome deve ser **significativo** e a caixa deve ser **consistente**. A pergunta que a fonte faz é direta: o que significa `p`? Pode ser pi, preço, centavos — o leitor não sabe. Por isso, nomes crípticos devem ser evitados.

No grupo dos padrões da indústria, a fonte cita três estilos de escrita: `camelCase` (cada palavra começa com maiúscula, exceto a primeira, sem espaços), `PascalCase` (cada palavra começa com maiúscula, inclusive a primeira) e `snake_case` (palavras em minúsculas separadas por sublinhado). A fonte também recomenda não começar com sublinhado e escrever constantes em maiúsculas, muitas vezes em `UPPER_SNAKE_CASE`.

## Exemplo resolvido

Suponha que um programa guarde o preço de um produto. Comparando dois nomes:

```pseudo
p = 19.90                 # nome críptico: não indica o que é
preco_produto = 19.90     # nome significativo em snake_case
```

O segundo nome é mais fácil de entender por outra pessoa. Se a linguagem adotar `camelCase`, o mesmo nome poderia ser escrito `precoProduto`; se adotar `PascalCase`, `PrecoProduto`. O importante é escolher um estilo e usá-lo de forma consistente no programa.

## Erros comuns

A fonte não lista "erros comuns" com esse rótulo, mas as regras permitem identificar enganos:

- **Usar uma palavra reservada como nome.** A fonte afirma que palavras reservadas já têm significado na linguagem e não podem ser usadas pelo programador como identificador.
- **Misturar maiúsculas e minúsculas no mesmo nome.** Em linguagens sensíveis à caixa, `pig` e `Pig` podem ser identificadores diferentes; a recomendação é ser consistente.
- **Escolher um nome críptico.** Nomes como `p` não comunicam se o valor é pi, preço ou centavos.

> **Exemplo adicional (IA) — verificar:** começar um identificador com um dígito, como `2total`, contraria a regra técnica citada pela fonte para muitas linguagens.

## Resumo

- Nomes de identificadores tornam o código mais significativo para humanos.
- As regras vêm da linguagem, das boas práticas e dos padrões da indústria.
- Use apenas caracteres permitidos e evite palavras reservadas.
- Prefira nomes significativos e mantenha a caixa consistente.
- `camelCase`, `PascalCase` e `snake_case` são estilos comuns; constantes costumam ficar em maiúsculas.
