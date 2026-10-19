---
id: th-sem1-algorithms-m01-flowcharts
title: Fluxogramas
discipline: algorithms
module: m01
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/flowcharts/
  chapter: "I. Introduction to Programming"
  section: Flowcharts
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
linked_lessons: [l03]
linked_exercises: [ex-sem1-algorithms-m01-l03-decisao, ex-sem1-algorithms-m01-l03-terminal, ex-sem1-algorithms-m01-l03-entrada-saida, ex-sem1-algorithms-m01-l03-ordem-fluxo, ex-sem1-algorithms-m01-l03-simbolo-certo, ex-sem1-algorithms-m01-l03-decisao-ordem, ex-sem1-algorithms-m01-challenge-simbolo, ex-sem1-algorithms-m01-challenge-sequencia, ex-sem1-algorithms-m01-flash-flowchart, ex-sem1-algorithms-m01-flash-terminal, ex-sem1-algorithms-m01-flash-decision]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [flowchart, terminal, decision symbol]
original_excerpt: "The flowchart shows the steps as boxes of various kinds, and their order by connecting the boxes with arrows."
---

## Ideia central

Um **fluxograma** (flowchart) é um diagrama que representa um algoritmo, fluxo de trabalho ou processo. Ele mostra os passos como caixas de vários tipos e indica a ordem ligando essas caixas com setas. É uma representação visual do modelo de solução de um problema.

## Definição

A fonte define: "A flowchart is a type of diagram that represents an algorithm, workflow or process." Os passos aparecem como caixas e a ordem é dada pelas setas que as conectam. O fluxograma é usado para analisar, projetar, documentar ou gerenciar processos e programas em diversas áreas.

Os **símbolos básicos** são:

- **Terminal:** retângulos arredondados que indicam os pontos de **início e fim** do fluxograma.
- **Linhas de fluxo (flow lines):** linhas (às vezes com setas) que conectam os símbolos. O fluxo padrão é **da esquerda para a direita e de cima para baixo**, como se lê em inglês; por isso, as setas costumam ser desenhadas apenas quando o fluxo vai contra o padrão.
- **Entrada/Saída (input/output):** paralelogramos que designam operações de entrada ou saída.
- **Processo (process):** retângulo que representa um processo, como um cálculo matemático ou uma atribuição de variável.
- **Decisão (decision):** losango que representa a pergunta de verdadeiro/falso testada em uma decisão.

## Exemplo resolvido

A fonte usa um programa de conversão de temperatura para ilustrar a **estrutura de sequência**: nada de incomum acontece, apenas uma instrução após a outra na ordem listada.

```pseudo
início
    exibir mensagem pedindo a temperatura em Fahrenheit
    ler a temperatura do teclado
    calcular Celsius subtraindo 32 da temperatura Fahrenheit,
    multiplicando o resultado por 5 e dividindo por 9
    exibir o Celsius com uma mensagem apropriada
    pausar para o usuário ver a resposta
fim
```

No fluxograma, esse esboço vira: terminal de início → entrada da temperatura → processo de conversão → saída do resultado → terminal de fim. A ordem dos símbolos corresponde à ordem das instruções.

## Erros comuns

A fonte associa cada forma a uma função específica. **Exemplo adicional (IA):** trocar os símbolos — usar retângulo para entrada/saída ou paralelogramo para processo — muda o significado do diagrama; a fonte não chama isso explicitamente de "erro comum", mas a troca contraria a definição de cada símbolo.

Um erro que a fonte sustenta diretamente é desenhar setas em todos os trechos: como o fluxo padrão já é esquerda→direita e cima→baixo, as setas são necessárias principalmente quando o fluxo contraria esse padrão.

## Resumo

- Fluxograma representa algoritmo, fluxo de trabalho ou processo por caixas e setas.
- Terminal = início e fim; processo = retângulo; entrada/saída = paralelogramo; decisão = losango.
- O fluxo padrão é da esquerda para a direita e de cima para baixo.
- A estrutura de sequência executa uma instrução após a outra.
- O fluxograma documenta visualmente o modelo antes da codificação.
