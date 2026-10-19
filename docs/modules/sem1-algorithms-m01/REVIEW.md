# Auditoria de Afirmações — sem1-algorithms-m01

**Módulo:** Introdução a Algoritmos (`sem1-algorithms-m01`)  
**Data da auditoria:** 2026-10-19  
**Método:** cada afirmação das unidades teóricas foi comparada com o texto literal da seção indicada, aberto nesta sessão.  
**Legenda:** `ok` = afirmação sustentada pelo trecho; `ok (aplicação)` = inferência direta e limitada a partir do trecho; `sem suporte` = removida ou rotulada como "Exemplo adicional (IA)".

---

## Unidade `th-sem1-algorithms-m01-program-design`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Design de programa são as etapas feitas antes de codificar em uma linguagem específica. | Overview | "Program design consists of the steps a programmer should do before they start coding the program in a specific language." | ok |
| Etapas bem documentadas tornam o programa mais fácil de manter. | Overview | "These steps when properly documented will make the completed program easier for other programmers to maintain in the future." | ok |
| Há três grandes áreas: entender o programa, usar ferramentas de design e desenvolver dados de teste. | Overview | "There are three broad areas of activity: Understanding the Program, Using Design Tools to Create a Model, Develop Test Data." | ok |
| O modelo IPO decompõe o propósito em Inputs, Processing e Outputs. | Understanding the Program | "Understanding the purpose of a program usually involves understanding its: Inputs, Processing, Outputs." | ok |
| A abordagem IPO funciona bem para iniciantes. | Understanding the Program | "This IPO approach works very well for beginning programmers." | ok |
| A fonte sugere visualizar o programa em execução (monitor, teclado, processamento). | Understanding the Program | "Sometimes, it might help to visualize the program running on the computer. You can imagine what the monitor will look like, what the user must enter on the keyboard and what processing or manipulations will be done." | ok |
| Dados de teste são valores de entrada com saídas previstas. | Develop Test Data | "Test data consists of the programmer providing some input values and predicting the outputs." | ok |
| Pular a etapa de design é um mau hábito citado pela fonte. | Using Design Tools to Create a Model | "Many students develop poor habits and skipping this step is one of them." | ok |
| O pseudocódigo é a primeira ferramenta de modelagem e documenta a lógica/algoritmo de cada função. | Using Design Tools to Create a Model | "The first modeling tool you will usually learn is pseudocode. You will document the logic or algorithm of each function in your program." | ok |
| A fonte **não** define "algoritmo" formalmente; usa o termo como a lógica documentada. | Using Design Tools to Create a Model | O texto usa "the logic or algorithm of each function" e não apresenta definição isolada. | ok (limitação registrada) |
| Começar pela sintaxe antes de conhecer entradas/processamento/saídas é um erro frequente. | — | Não há trecho que trate desse erro especificamente. | sem suporte — rotulado como "Exemplo adicional (IA)" no texto |
| Listas de exemplo (dois números; somar e dividir) aplicam o modelo IPO. | Understanding the Program | A fonte orienta listar entradas, processamento e saídas; o exemplo concreto é aplicação do modelo. | ok (aplicação) |

---

## Unidade `th-sem1-algorithms-m01-pseudocode`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Pseudocódigo é uma descrição informal de alto nível do princípio de funcionamento de um programa ou algoritmo. | Overview | "Pseudocode is an informal high-level description of the operating principle of a computer program or other algorithm." | ok |
| Pseudocódigo é um método de projetar ou planejar um programa. | Discussion | "Pseudocode is one method of designing or planning a program." | ok |
| *Pseudo* significa falso; pseudocódigo significa "código falso"; melhor tradução: falso ou imitação. | Discussion | "Pseudo means false, thus pseudocode means false code. A better translation would be the word fake or imitation." | ok |
| Ele imita código real, mas NÃO é código real. | Discussion | "It looks like (imitates) real code but it is NOT real code." | ok |
| Usa declarações em inglês para descrever o que o programa deve realizar. | Discussion | "It uses English statements to describe what a program is to accomplish." | ok |
| Não existe compilador que traduza pseudocódigo para linguagem de máquina. | Discussion | "It is fake because no compiler exists that will translate the pseudocode to any machine language." | ok |
| Pseudocódigo documenta o design do programa/módulo (o algoritmo). | Discussion | "Pseudocode is used for documenting the program or module design (also known as the algorithm)." | ok |
| Depois do design, o pseudocódigo é convertido em código da linguagem, respeitando a sintaxe. | Discussion | "After developing the program design, we use the pseudocode to write code in a language (like C++, Java, Python, etc.) where you must follow the rules of the language (syntax)..." | ok |
| Pseudocódigo normalmente não inclui listas de identificadores de variáveis nem dados de teste. | Discussion | "Pseudocode usually does not include other items produced during programming design such as identifier lists for variables or test data." | ok |
| O esboço das duas idades segue Entrada → Processamento → Saída. | Discussion › Outline using Pseudocode | "Input ... Processing ... Output ..." com o cálculo "adding the two ages together and dividing by two". | ok |

---

## Unidade `th-sem1-algorithms-m01-flowcharts`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Fluxograma é um diagrama que representa um algoritmo, fluxo de trabalho ou processo. | Overview | "A flowchart is a type of diagram that represents an algorithm, workflow or process." | ok |
| Os passos aparecem como caixas e a ordem é dada por setas. | Overview | "The flowchart shows the steps as boxes of various kinds, and their order by connecting the boxes with arrows." | ok |
| Fluxogramas são usados para analisar, projetar, documentar ou gerenciar processos/programas. | Overview | "Flowcharts are used in analyzing, designing, documenting or managing a process or program in various fields." | ok |
| Terminal = retângulos arredondados que indicam início e fim. | Simple Flowcharting Symbols › Terminal | "The rounded rectangles, or terminal points, indicate the flowchart’s starting and ending points." | ok |
| O fluxo padrão é da esquerda para a direita e de cima para baixo. | Simple Flowcharting Symbols › Flow Lines | "The default flow is left to right and top to bottom (the same way you read English)." | ok |
| Setas costumam ser desenhadas apenas quando o fluxo contraria o padrão. | Simple Flowcharting Symbols › Flow Lines | "To save time arrowheads are often only drawn when the flow lines go contrary the normal." | ok |
| Entrada/Saída = paralelogramos. | Simple Flowcharting Symbols › Input/Output | "The parallelograms designate input or output operations." | ok |
| Processo = retângulo (cálculo ou atribuição). | Simple Flowcharting Symbols › Process | "The rectangle depicts a process such as a mathematical computation, or a variable assignment." | ok |
| Decisão = losango com pergunta de verdadeiro/falso. | Simple Flowcharting Symbols › Decision | "The diamond is used to represent the true/false statement being tested in a decision symbol." | ok |
| A estrutura de sequência executa uma instrução após a outra. | Simple Examples › Sequence Control Structures | "It also illustrates the sequence control structure where nothing unusual happens. Just do one instruction after another in the sequence listed." | ok |
| O exemplo de conversão subtrai 32, multiplica por 5 e divide por 9. | Simple Examples › Sequence Control Structures | "calculate the Celsius by subtracting 32 from the Fahrenheit temperature then multiply the result by 5 then divide the result by 9." | ok |
| Trocar os símbolos é um erro comum. | — | A fonte define cada símbolo, mas não chama a troca de "erro comum". | sem suporte — rotulado como "Exemplo adicional (IA)" no texto |

---

## Unidade `th-sem1-algorithms-m01-structured-programming`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Programação estruturada melhora clareza, qualidade e tempo de desenvolvimento. | Overview | "Structured programming is a programming paradigm aimed at improving the clarity, quality, and development time of a computer program..." | ok |
| Usa seleção (if/then/else), repetição (while e for), blocos e sub-rotinas, em vez de saltos como `go to`. | Overview | "...by making extensive use of the structured control flow constructs of selection (if/then/else) and repetition (while and for), block structures, and subroutines in contrast to using simple tests and jumps such as the go to statement..." | ok |
| O `go to` pode levar a "spaghetti code" difícil de seguir e manter. | Overview | "...which can lead to “spaghetti code” that is potentially difficult to follow and maintain." | ok |
| Estruturas de controle são os mecanismos que controlam o fluxo de execução. | Discussion | "The mechanisms that allow us to control the flow of execution are called control structures." | ok |
| As três categorias principais são sequência, seleção e iteração. | Discussion | "There are three main categories of control structures: Sequence ... Selection ... Iteration ..." | ok |
| Sequência executa uma instrução após a outra, na ordem listada. | Discussion | "Simply do one instruction then the next and the next. Just do them in a given sequence or in the order listed." | ok |
| Seleção escolhe entre dois ou mais fluxos a partir de uma pergunta. | Discussion | "This is where you select or choose between two or more flows. The choice is decided by asking some sort of question." | ok |
| Iteração repete código; pode executar zero vezes, um número fixo ou indefinidamente. | Discussion | "The code might not be executed at all (repeat it zero times), executed a fixed number of times or executed indefinitely until some condition has been met." | ok |
| Ramificação é uma quarta categoria, não controlada e raramente usada. | Discussion | "A fourth category describes unstructured code. Branching – An uncontrolled structure... This category is rarely used in modular structured programming." | ok |
| Todas as linguagens têm as três primeiras categorias; a maioria tem if then else e while. | Discussion | "All languages have the first three categories... Most have the if then else structure... and the while structure..." | ok |
| O conceito começou no fim dos anos 1960 com um artigo de Dijkstra. | Discussion | "The concept of structured programming started in the late 1960’s with an article by Edsger Dijkstra." | ok |
| Dijkstra propôs o método "go to less", eliminando a necessidade da ramificação. | Discussion | "He proposed a “go to less” method of planning programming logic that eliminated the need for the branching category of control structures." | ok |
| O tema foi debatido por cerca de 20 anos; ao fim do século XX quase todos estavam convencidos. | Discussion | "The topic was debated for about 20 years. But ultimately – “By the end of the 20th century nearly all computer scientists were convinced...”" | ok |
| Tratar o `goto` como quarta categoria "normal" é um erro. | Discussion | A fonte chama a ramificação de "uncontrolled" e "rarely used"; a classificação como erro é aplicação direta. | ok (aplicação) |
| A iteração sempre executa ao menos uma vez. | Discussion | A fonte afirma o contrário: "might not be executed at all (repeat it zero times)". | ok (erro refutado pela fonte) |

---

## Resumo da auditoria

- **Afirmações com suporte literal:** 47
- **Aplicações diretas da fonte:** 3
- **Sem suporte, removidas ou rotuladas:** 2 (ambas marcadas como "Exemplo adicional (IA)" no texto)
- **Limitação registrada:** a fonte não define "algoritmo" formalmente; o texto não inventa definição.
- **Nenhuma unidade ficou `pending`.**
