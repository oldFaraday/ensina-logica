---
id: th-sem1-algorithms-m03-nested-loops
title: Laços aninhados
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee]
  url: https://press.rebus.community/programmingfundamentals/chapter/nested-for-loops/
  chapter: "V. Loops"
  section: Nested For Loops
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
linked_exercises: [ex-sem1-algorithms-m03-l09-aninhados, ex-sem1-algorithms-m03-l09-ordem, ex-sem1-algorithms-m03-l09-code-continue]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [nested for loops, nested control structures, complex logic]
original_excerpt: "Nested for loops places one for loop inside another for loop. The inner loop is repeated for each iteration of the outer loop. Many complex logic problems require using nested control structures. By nesting control structures (or placing one inside another) we can accomplish almost any complex logic problem."
---
## Ideia central

**Laços aninhados** (*nested loops*) colocam um laço dentro de outro: o **laço interno** é repetido **por completo a cada iteração do laço externo**. Isso resolve problemas de **lógica complexa** (*complex logic*) que envolvem duas ou mais dimensões, como uma tabuada (linhas × colunas) ou processamento de matrizes. O aninhamento (*nesting*) é o conceito geral de "colocar um item dentro de outro" e se aplica a qualquer categoria de estrutura de controle (`if` dentro de `while`, `for` dentro de `if`, etc.).

## Definição

A fonte define **`nested for loops`** como "coloca um laço `for` dentro de outro laço `for`. O laço interno é repetido por completo a cada iteração do laço externo."

### Estruturas de controle aninhadas (*nested control structures*)

O aninhamento é "um conceito que coloca um item dentro de outro". Exemplo com `if` aninhado (da fonte):

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

O mesmo princípio vale para laços: um `for` (externo) contém outro `for` (interno) em seu corpo.

### Exemplo: tabuada (multiplication table)

Pseudocódigo da fonte para parte de uma tabuada 3×3:

```
Para linha = 1, linha <= 3, linha += 1
    Para coluna = 1, coluna <= 3, coluna += 1
        Exibir linha * coluna
        Exibir "\t"   // tabulação
    Exibir "\n"       // quebra de linha
```

**Execução**:
- Laço externo (`linha`) roda 3 vezes (1, 2, 3).
- Para **cada** valor de `linha`, o laço interno (`coluna`) roda **3 vezes completas** (1, 2, 3).
- Total de iterações do corpo interno: 3 × 3 = 9.
- Saída (com tabulação):
  ```
  1   2   3
  2   4   6
  3   6   9
  ```
- A quebra de linha (`\n`) ocorre **após** o laço interno terminar, ainda dentro do externo.

A fonte observa que as respostas podem ser vistas como "uma coleção de células (cada célula com exatamente seis espaços de largura)".

## Exemplo resolvido

Imprimir coordenadas de uma grade 2×4 (x de 1 a 2, y de 1 a 4):

```pseudo
Para x = 1, x <= 2, x += 1
    Para y = 1, y <= 4, y += 1
        Exibir "(" + x + ", " + y + ")"
    Fim
    Exibir ""  // linha em branco entre colunas de x
Fim
```

**Saída**:
```
(1, 1) (1, 2) (1, 3) (1, 4)

(2, 1) (2, 2) (2, 3) (2, 4)
```

- Externo (`x`): 2 iterações.
- Interno (`y`): 4 iterações por iteração de `x` → 8 iterações totais do corpo interno.
- A quebra de linha ocorre no final de cada iteração do externo.

## Erros comuns

- **Confundir a ordem dos laços**: achar que o externo roda por completo para cada iteração do interno. A fonte é clara: "The inner loop is repeated for each iteration of the outer loop."
- **Esquecer a quebra de linha/formatacao** fora do laço interno mas dentro do externo → saída tudo em uma linha.
- **Usar a mesma variável de controle** nos dois laços (ex.: `i` em ambos) → o interno sobrescreve o externo, quebrando a contagem.
- **Achar que aninhamento só vale para `for`** — a fonte mostra `if` dentro de `if`, e diz: "Nesting could have an if then else within a while loop. Thus, the concept of nesting allows the mixing of the different categories of control structures."
- **Laços aninhados desnecessários** quando um laço único com aritmética resolveria (ex.: achatar matriz 2D em 1D). A fonte não trata de otimização, mas é um erro de design.

> **Exemplo adicional (IA):** variável do laço interno "vazando" para fora do escopo (em linguagens sem escopo de bloco, como JavaScript `var` ou Python). A fonte não trata de escopo aqui (há unidade separada).

## Resumo

- Laços aninhados: um laço dentro de outro; o **interno repete por completo a cada iteração do externo**.
- Aninhamento (*nesting*) = colocar uma estrutura dentro de outra; vale para qualquer categoria (`if`, `while`, `for`).
- Tabuada/grade/matrizes são casos típicos: linhas (externo) × colunas (interno).
- Pseudocódigo: `Para externo ... Para interno ... Ação Fim Fim`.
- Quebra de linha/sepatação vai **após o laço interno, dentro do externo**.
- Variáveis de controle **devem ser distintas** para cada nível.
- "Many complex logic problems require using nested control structures."