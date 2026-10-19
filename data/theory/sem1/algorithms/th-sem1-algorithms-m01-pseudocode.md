---
id: th-sem1-algorithms-m01-pseudocode
title: Pseudocódigo
discipline: algorithms
module: m01
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/pseudocode/
  chapter: "I. Introduction to Programming"
  section: Pseudocode
  access_date: 2026-10-19
  edition: 2nd Edition (2018)
  license_url: https://press.rebus.community/programmingfundamentals/
  license_deed_url: https://creativecommons.org/licenses/by-sa/4.0/
  license_note: "CC BY-SA 4.0 declarada na página do livro, exceto onde indicado; nenhuma imagem da fonte foi derivada."
  license_confirmed_at: 2026-10-19
license: CC-BY-SA-4.0
derivation_type: translated
language: pt-BR
verification_status: verified_with_source
verified_at: 2026-10-19
verification_method: manual_url_check
linked_lessons: [l02]
linked_exercises: [ex-sem1-algorithms-m01-l02-pseudo-real, ex-sem1-algorithms-m01-l02-significado, ex-sem1-algorithms-m01-l02-ordem-ipo, ex-sem1-algorithms-m01-l02-media, ex-sem1-algorithms-m01-l02-compilador, ex-sem1-algorithms-m01-l02-completo, ex-sem1-algorithms-m01-challenge-pseudo, ex-sem1-algorithms-m01-challenge-media, ex-sem1-algorithms-m01-flash-pseudocode, ex-sem1-algorithms-m01-flash-pseudo]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [pseudocode, pseudo]
original_excerpt: "Pseudocode is an informal high-level description of the operating principle of a computer program or other algorithm."
---

## Ideia central

**Pseudocódigo** é uma descrição informal de alto nível do princípio de funcionamento de um programa ou algoritmo. Ele imita código, mas não é código real: usa declarações em linguagem natural para descrever o que o programa deve realizar. Por isso, serve para documentar o design antes de escrever a versão em uma linguagem de programação.

## Definição

A fonte define pseudocódigo como "an informal high-level description of the operating principle of a computer program or other algorithm". A palavra *pseudo* significa **falso**: pseudocódigo quer dizer "código falso", e uma tradução melhor seria "imitação". Ele se parece com código real, mas **não é** código real.

O motivo é objetivo: **não existe compilador** que traduza pseudocódigo para linguagem de máquina. Ele é usado para documentar o design do programa ou do módulo — também chamado de algoritmo. Depois do design, o pseudocódigo é convertido em código de uma linguagem (como C++, Java ou Python), respeitando a sintaxe dessa linguagem. O pseudocódigo normalmente não inclui outros itens do design, como listas de identificadores de variáveis ou dados de teste.

## Exemplo resolvido

A fonte apresenta o esboço de um programa que lê as idades de duas pessoas, calcula a média e exibe a resposta:

```pseudo
Entrada
    exibir mensagem pedindo a primeira idade
    ler a primeira idade do teclado
    exibir mensagem pedindo a segunda idade
    ler a segunda idade do teclado
Processamento
    calcular a resposta somando as duas idades e dividindo por dois
Saída
    exibir a resposta na tela
    pausar para o usuário ver a resposta
```

Observe a ordem **Entrada → Processamento → Saída**, a mesma estrutura IPO usada no design. O pseudocódigo descreve a lógica sem se comprometer com a sintaxe de uma linguagem.

## Erros comuns

A fonte alerta que pseudocódigo **não é código real**. Um erro comum é acreditar que ele será compilado automaticamente; isso não acontece, porque não há compilador para ele. Outro erro é tentar exigir do pseudocódigo a sintaxe rígida de uma linguagem específica: ele usa declarações em linguagem natural justamente para planejar a lógica antes da codificação.

A fonte também lembra que pseudocódigo normalmente **não inclui** listas de identificadores de variáveis nem dados de teste; esses são outros produtos do design.

## Resumo

- Pseudocódigo é uma descrição informal e de alto nível.
- *Pseudo* significa falso; pseudocódigo é uma imitação de código.
- Não existe compilador que traduza pseudocódigo para linguagem de máquina.
- Ele documenta a lógica/design do programa (o algoritmo).
- O esboço segue a ordem Entrada → Processamento → Saída.
