# Captura de Fontes — sem1-algorithms-m01

**Módulo:** Introdução a Algoritmos (`sem1-algorithms-m01`)  
**Fonte:** *Programming Fundamentals — A Modular Structured Approach*, 2ª edição (2018)  
**Autores:** Kenneth Leroy Busbee e Dave Braunschweig  
**Editora/Plataforma:** Rebus Community / Pressbooks  
**URL do livro:** https://press.rebus.community/programmingfundamentals/  
**Data de acesso:** 2026-10-19  
**Licença confirmada:** CC BY-SA 4.0 — declarada no rodapé de cada capítulo: *"Programming Fundamentals Copyright © 2018 by Authors and Contributors is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License, except where otherwise noted."*  
**URL da licença:** https://creativecommons.org/licenses/by-sa/4.0/  
**Restrição:** A cláusula *"except where otherwise noted"* vale para imagens/figuras e contribuições específicas. **Neste módulo derivamos apenas texto;** nenhuma imagem é copiada ou adaptada.

> **Verificação de acesso:** as quatro URLs de seção foram abertas nesta sessão (2026-10-19) e continham os títulos e trechos abaixo. Nenhuma seção ficou `pending`.

---

## 1. Program Design

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/program-design/
- **Capítulo:** I. Introduction to Programming › Program Design
- **Seções internas usadas:** *Overview*, *Understanding the Program*, *Using Design Tools to Create a Model*, *Develop Test Data*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m01-program-design` (OBJ-1, OBJ-2)

### Trechos literais usados

> "Program design consists of the steps a programmer should do before they start coding the program in a specific language."

> "These steps when properly documented will make the completed program easier for other programmers to maintain in the future."

> "There are three broad areas of activity: Understanding the Program, Using Design Tools to Create a Model, Develop Test Data."

> "Understanding the purpose of a program usually involves understanding its: Inputs, Processing, Outputs."

> "This IPO approach works very well for beginning programmers."

> "Understanding the logic and planning the algorithm on paper before you start to code is a very important concept. Many students develop poor habits and skipping this step is one of them."

> "Test data consists of the programmer providing some input values and predicting the outputs."

> "The first modeling tool you will usually learn is pseudocode. You will document the logic or algorithm of each function in your program."

**Observação sobre "algoritmo":** esta seção **não** oferece uma definição formal isolada de "algoritmo". Ela usa o termo como a lógica/design documentado do programa ("document the logic or algorithm of each function"). A unidade trata o termo exatamente assim e **não inventa** uma definição de dicionário.

---

## 2. Pseudocode

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/pseudocode/
- **Capítulo:** I. Introduction to Programming › Pseudocode
- **Seções internas usadas:** *Overview*, *Discussion*, *Outline using Pseudocode*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m01-pseudocode` (OBJ-3, OBJ-4)

### Trechos literais usados

> "Pseudocode is an informal high-level description of the operating principle of a computer program or other algorithm."

> "Pseudocode is one method of designing or planning a program. Pseudo means false, thus pseudocode means false code. A better translation would be the word fake or imitation."

> "It looks like (imitates) real code but it is NOT real code. It uses English statements to describe what a program is to accomplish."

> "It is fake because no compiler exists that will translate the pseudocode to any machine language."

> "Pseudocode is used for documenting the program or module design (also known as the algorithm)."

> "The following outline of a simple program illustrates pseudocode. We want to be able to enter the ages of two people and have the computer calculate their average age and display the answer."

> "Input — display a message asking the user to enter the first age; get the first age from the keyboard; display a message asking the user to enter the second age; get the second age from the keyboard."

> "Processing — calculate the answer by adding the two ages together and dividing by two."

> "Output — display the answer on the screen; pause so the user can see the answer."

> "Pseudocode usually does not include other items produced during programming design such as identifier lists for variables or test data."

---

## 3. Flowcharts

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/flowcharts/
- **Capítulo:** I. Introduction to Programming › Flowcharts
- **Seções internas usadas:** *Overview*, *Simple Flowcharting Symbols*, *Simple Examples*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m01-flowcharts` (OBJ-5, OBJ-6)

### Trechos literais usados

> "A flowchart is a type of diagram that represents an algorithm, workflow or process."

> "The flowchart shows the steps as boxes of various kinds, and their order by connecting the boxes with arrows."

> "The rounded rectangles, or terminal points, indicate the flowchart’s starting and ending points."

> "The default flow is left to right and top to bottom (the same way you read English)."

> "The parallelograms designate input or output operations."

> "The rectangle depicts a process such as a mathematical computation, or a variable assignment."

> "The diamond is used to represent the true/false statement being tested in a decision symbol."

> "It also illustrates the sequence control structure where nothing unusual happens. Just do one instruction after another in the sequence listed."

> "calculate the Celsius by subtracting 32 from the Fahrenheit temperature then multiply the result by 5 then divide the result by 9."

---

## 4. Structured Programming

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/structured-programming/
- **Capítulo:** IV. Conditions › Structured Programming
- **Seções internas usadas:** *Overview*, *Discussion*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m01-structured-programming` (OBJ-7, OBJ-8)

### Trechos literais usados

> "Structured programming is a programming paradigm aimed at improving the clarity, quality, and development time of a computer program by making extensive use of the structured control flow constructs of selection (if/then/else) and repetition (while and for), block structures, and subroutines in contrast to using simple tests and jumps such as the go to statement, which can lead to “spaghetti code” that is potentially difficult to follow and maintain."

> "The mechanisms that allow us to control the flow of execution are called control structures."

> "There are three main categories of control structures: Sequence – Very boring. Simply do one instruction then the next and the next. Just do them in a given sequence or in the order listed. Most lines of code are this."

> "Selection – This is where you select or choose between two or more flows. The choice is decided by asking some sort of question. The answer determines the path (or which lines of code) will be executed."

> "Iteration – Also known as repetition, it allows some code (one to many lines) to be executed (or repeated) several times. The code might not be executed at all (repeat it zero times), executed a fixed number of times or executed indefinitely until some condition has been met."

> "Branching – An uncontrolled structure that allows the flow of execution to jump to a different part of the program. This category is rarely used in modular structured programming."

> "All languages have the first three categories of control structures (sequence, selection, and iteration). Most have the if then else structure (which belongs to the selection category) and the while structure (which belongs to the iteration category)."

> "The concept of structured programming started in the late 1960’s with an article by Edsger Dijkstra. He proposed a “go to less” method of planning programming logic that eliminated the need for the branching category of control structures."

> "The topic was debated for about 20 years. But ultimately – “By the end of the 20th century nearly all computer scientists were convinced that it is useful to learn and apply the concepts of structured programming.”"

---

## 5. Uso e limites

- **Derivação:** tradução/adaptação para pt-BR, com `original_excerpt` literal em inglês em cada unidade.
- **Não derivado:** imagens, diagramas e figuras das páginas; capítulos fora do escopo (Software Testing, IDE, Version Control, Hello World, Program Quality, SDLC).
- **Atribuição:** registrada em `ATTRIBUTIONS.md` e no front-matter de cada unidade.
- **Conferência manual:** `npm run verify-sources` deve imprimir "confere" para as quatro unidades.
