---
id: th-sem1-algorithms-m03-do-while
title: Laço do-while (teste depois)
discipline: algorithms
module: m03
source:
  title: Programming Fundamentals
  authors: [Kenneth Leroy Busbee, Dave Braunschweig]
  url: https://press.rebus.community/programmingfundamentals/chapter/do-while-loop/
  chapter: "V. Loops"
  section: Do While Loop
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
linked_exercises: [ex-sem1-algorithms-m03-l08-do-while, ex-sem1-algorithms-m03-l08-code-for, ex-sem1-algorithms-m03-l08-do-while-code]
sections: [ideia-central, definicao, exemplo-resolvido, erros-comuns, resumo]
new_terms: [do while loop, post-test loop, repeat until]
original_excerpt: "A do while loop is a control flow statement that executes a block of code at least once, and then repeatedly executes the block, or not, depending on a given boolean condition at the end of the block. Within the do while control structure there are three attributes of a properly working loop: Action or actions, Update of the flag, Test expression."
---
## Ideia central

O laço **`do while`** (ou `repeat until`) é um laço com **teste depois** (*post-test* ou *test after*): a ação é executada **pelo menos uma vez** antes de a condição ser verificada. Ele tem **três atributos**: ação(ões), atualização da flag e expressão de teste. A forma `repeat until` (usada em Pascal) continua enquanto a condição for **falsa** e para quando se torna **verdadeira** — o inverso do `do while`.

## Definição

A fonte define o **`do while`** como "uma instrução de fluxo de controle que executa um bloco de código pelo menos uma vez, e então repete o bloco, ou não, dependendo de uma condição booleana dada no final do bloco."

### Forma básica (`do while`)

```
faça
    algumas instruções ou ação
    ...
    atualize a flag
enquanto a expressão for verdadeira
```

Os **três atributos** de um laço `do while` que funciona:
1. **Ação ou ações** — executadas primeiro.
2. **Atualização da flag** — modifica a variável de controle.
3. **Expressão de teste** — avaliada **depois** da ação.

Frase em inglês: "You do the action while the expression is true" (Você faz a ação enquanto a expressão for verdadeira). Quando a expressão se torna falsa, o laço para. Como o teste vem **depois**, a ação **sempre acontece pelo menos uma vez**.

### Forma `repeat until` (Pascal)

```
repita
    algumas instruções ou ação
    ...
    atualize a flag
até que a expressão se torne verdadeira
```

Três atributos idênticos. Frase: "You repeat the action until the expression becomes true" (Você repete a ação até que a expressão se torne verdadeira). O laço roda enquanto a condição for **falsa**; para quando ela se torna **verdadeira**. Também é **teste depois** — ação pelo menos uma vez.

### Exemplo da fonte (validação de entrada)

```
faça
    Exibir "Qual sua idade? "
    Ler idade_usuario
    Exibir "Qual a idade do seu amigo? "
    Ler idade_amigo
    Exibir "Juntas suas idades somam: "
    Exibir idade_usuario + idade_amigo
    Exibir "Quer tentar de novo? s ou n "
    Ler resposta_laço
enquanto resposta_laço == 's'
```

- Ação: 6 linhas (pedir dados, somar, exibir, perguntar se repete).
- Atualização da flag: ler `resposta_laço`.
- Teste: comparação de igualdade `resposta_laço == 's'`.
- Tipo: **laço controlado por evento** (*event controlled loop*) — o usuário decide se repete.

### Laços infinitos em `do while`

Assim como no `while`, esquecer de atualizar a flag causa laço infinito. Exemplo da fonte: inicializar `resposta_laço = 's'` antes do laço e nunca atualizá-la dentro → teste sempre verdadeiro. Também: usar atribuição `=` no teste (`while resposta_laço = 's'`) faz o teste sempre atribuir `'s'` e avaliar como verdadeiro.

## Exemplo resolvido

Menu que garante execução pelo menos uma vez:

```pseudo
faça
    Exibir "1. Incluir"
    Exibir "2. Listar"
    Exibir "3. Sair"
    Exibir "Escolha: "
    Ler opcao
    Se opcao == 1
        // incluir
    Senão se opcao == 2
        // listar
    Fim
enquanto opcao != 3
```

- Ação (exibir menu, ler opção, processar) executa **pelo menos uma vez**.
- Atualização da flag: `Ler opcao` (a própria leitura atualiza).
- Teste: `opcao != 3` — continua enquanto não for 3.
- Se o usuário digitar 3 na primeira vez, o menu foi exibido uma vez e o programa sai.

## Erros comuns

- **Confundir `do while` com `while`**: no `do while` a ação **sempre** executa ao menos uma vez; no `while`, pode não executar. Escolher o errado muda a lógica (ex.: validar entrada — `do while` garante que o usuário veja o prompt).
- **Esquecer a atualização da flag** → laço infinito.
- **Usar atribuição `=` no teste** em vez de `==` → laço infinito (a fonte mostra os dois casos).
- **Inverter a lógica no `repeat until`**: `repeat until` para quando a condição é **verdadeira**; `do while` continua enquanto é **verdadeira**. A fonte explica: `repeat until` "continua até que a expressão de controle seja verdadeira (e então termina) — enquanto `while` roda enquanto a expressão for verdadeira."
- **Não indentar** o corpo do laço; a fonte diz: "Using indentation with the alignment of the loop actions and flag update is the normal industry practice."

> **Exemplo adicional (IA):** em Python não existe `do while` nativo; o padrão idiomático é `while True:` com `break` interno. A fonte não trata de Python especificamente.

## Resumo

- `do while` = teste depois (*post-test*); ação executa **pelo menos uma vez**.
- Três atributos: ação, atualização da flag, teste.
- `repeat until` (Pascal) = variante que roda enquanto falso, para quando verdadeiro.
- Laço controlado por evento: usuário decide continuar (ex.: "quer tentar de novo?").
- Laço infinito se flag não for atualizada ou se houver atribuição no teste.
- Indentação alinhada das ações e atualização é prática padrão.