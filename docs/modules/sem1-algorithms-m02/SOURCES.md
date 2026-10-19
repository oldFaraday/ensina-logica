# Captura de Fontes — sem1-algorithms-m02

**Módulo:** Variáveis e Tipos (`sem1-algorithms-m02`)  
**Fonte:** *Programming Fundamentals — A Modular Structured Approach*, 2ª edição (2018)  
**Autores:** Kenneth Leroy Busbee e Dave Braunschweig  
**Editora/Plataforma:** Rebus Community / Pressbooks  
**URL do livro:** https://press.rebus.community/programmingfundamentals/  
**Data de acesso:** 2026-10-19  
**Licença confirmada:** CC BY-SA 4.0 — declarada no rodapé de cada capítulo: *"Programming Fundamentals Copyright © 2018 by Authors and Contributors is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License, except where otherwise noted."*  
**URL da licença:** https://creativecommons.org/licenses/by-sa/4.0/  
**Restrição:** a cláusula *"except where otherwise noted"* vale para imagens/figuras e contribuições específicas. **Neste módulo derivamos apenas texto;** nenhuma imagem é copiada ou adaptada.

> **Verificação de acesso:** todas as URLs de seção abaixo foram abertas nesta sessão (2026-10-19) e continham os títulos e trechos registrados. **Nenhuma seção ficou `pending`.**

---

## 1. Constants and Variables

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/constants-and-variables/
- **Capítulo:** II. Data and Operators › Constants and Variables
- **Seções internas usadas:** *Overview*, *Discussion* › *Understanding Constants*, *Defining Constants and Variables*, *Key Terms*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m02-constants-variables` (OBJ-1)

### Trechos literais usados

> "A constant is a data item whose value cannot change during the program’s execution. Thus, as its name implies – the value is constant."

> "A variable is a data item whose value can change during the program’s execution. Thus, as its name implies – the value can vary."

> "Constants are used in two ways. They are: 1. literal constant 2. defined constant"

> "A literal constant is a value you type into your program wherever it is needed."

> "In addition to literal constants, most textbooks refer to symbolic constants or named constants as a constant represented by a name. Many programming languages use ALL CAPS to define named constants."

> "Technically, Python does not support named constants, meaning that it is possible (but never good practice) to change the value of a constant later."

> "Named constants must be assigned a value when they are defined. Variables do not have to be assigned initial values. Variables once defined may be assigned a value within the instructions of the program."

**Observação:** a fonte usa `PI = 3.14159`, `21`, `12.34`, `'A'`, `"Hello world!"`, `false` e `null` como exemplos. A unidade reproduz apenas os exemplos textuais, sem copiar tabelas de linguagens.

---

## 2. Identifier Names

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/identifier-names/
- **Capítulo:** II. Data and Operators › Identifier Names
- **Seções internas usadas:** *Overview*, *Discussion* › *Technical to Language*, *Good Programming Techniques*, *Industry Rules*, *Key Terms*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m02-identifier-names` (OBJ-2)

### Trechos literais usados

> "Within programming a variety of items are given descriptive names to make the code more meaningful to us as humans. These names are called “Identifier Names”."

> "These names follow a set of rules that are imposed by: 1. the language’s technical limitations 2. good programming practices 3. common industry standards for the language"

> "Use only allowable characters (in many languages the first character must be alphabetic or underscore, can continue with alphanumeric or underscore)"

> "Can’t use reserved words"

> "Meaningful identifier names make your code easier for another to understand. After all what does “p” mean? Is it pi, price, pennies, etc."

> "To avoid the problem altogether, we teach students to be case consistent. Use an identifier name only one way and spell it (upper and lower case) the same way every time within your program."

> "camelCase – each word is capitalized except the first word, with no intervening spaces"

> "PascalCase – each word is capitalized including the first word, with no intervening spaces"

> "snake_case – each word is lowercase with underscores separating words"

> "Do not start with an underscore (used for technical programming)"

> "CONSTANTS IN ALL UPPER CASE (often UPPER_SNAKE_CASE)."

---

## 3. Data Types

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/data-types/
- **Capítulo:** II. Data and Operators › Data Types
- **Seções internas usadas:** *Overview*, *Discussion*, *Pseudocode*, *Output*, *Key Terms*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m02-data-types` (OBJ-3)

### Trechos literais usados

> "A data type is a classification of data which tells the compiler or interpreter how the programmer intends to use the data."

> "Most programming languages support various types of data, including integer, real, character or string, and Boolean."

> "A major part of understanding how to design and code programs is centered in understanding the types of data that we want to manipulate and how to manipulate that data."

> "The common data types usually exist in most programming languages and act or behave similarly from language to language. Additional complex and/or composite data types may exist and vary from language to language."

> "integer | whole numbers | -5, 0, 123"

> "floating point (real) | fractional numbers | -87.5, 0.0, 3.14159"

> "string | A sequence of characters | \"Hello world!\""

> "Boolean | logical true or false | true, false"

> "nothing | no data | null"

> "Declare Integer i / Declare Real r / Declare String s / Declare Boolean b"

> "Assign i = 1234567890 / Assign r = 1.23456789012345 / Assign s = \"string\" / Assign b = true"

### Subcapítulos usados para detalhar os tipos (todos abertos em 2026-10-19)

- **Integer Data Type:** https://press.rebus.community/programmingfundamentals/chapter/integer-data-type/
  > "The integer data type basically represents whole numbers (no fractional parts). The integer values jump from one value to another. There is nothing between 6 and 7."

  > "the integer data type is often used to control program flow by counting, thus the need for a data type that jumps from one value to another."

- **Floating-Point Data Type:** https://press.rebus.community/programmingfundamentals/chapter/floating-point-data-type/
  > "A floating-point data type uses a formulaic representation of real numbers as an approximation so as to support a trade-off between range and precision."

  > "The floating-point family of data types represents number values with fractional parts. They are technically stored as two integer values: a mantissa and an exponent."

- **String Data Type:** https://press.rebus.community/programmingfundamentals/chapter/string-data-type/
  > "A string data type is traditionally a sequence of characters, either as a literal constant or as some kind of variable."

  > "The character data type represents individual or single characters."

- **Boolean Data Type:** https://press.rebus.community/programmingfundamentals/chapter/boolean-data-type/
  > "A Boolean data type has one of two possible values (usually denoted true and false), intended to represent the two truth values of logic and Boolean algebra."

  > "The Boolean data type is also known as the logical data type and represents the concepts of true and false."

- **Nothing Data Type:** https://press.rebus.community/programmingfundamentals/chapter/nothing-data-type/
  > "A nothing data type is a feature of some programming languages which allow the setting of a special value to indicate a missing or uninitialized value rather than using the value 0 (zero)."

---

## 4. Assignment

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/assignment/
- **Capítulo:** II. Data and Operators › Assignment
- **Seções internas usadas:** *Overview*, *Discussion*, *Key Terms*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m02-expressions-operators` (OBJ-4)

### Trechos literais usados

> "An assignment statement sets and/or re-sets the value stored in the storage location(s) denoted by a variable name; in other words, it copies a value into the variable."

> "The assignment operator allows us to change the value of a modifiable data object (for beginning programmers this typically means a variable)."

> "Within most programming languages the symbol used for assignment is the equal symbol. But bite your tongue, when you see the = symbol you need to start thinking: assignment."

> "The assignment operator has two operands. The one to the left of the operator is usually an identifier name for a variable. The one to the right of the operator is a value."

> "The value 21 is moved to the memory location for the variable named: age. Another way to say it: age is assigned the value 21."

> "The item to the right of the assignment operator is an expression. The expression will be evaluated and the answer is 14. The value 14 would be assigned to the variable named: total_cousins."

> "The expression to the right of the assignment operator contains some identifier names. The program would fetch the values stored in those variables; add them together and get a value of 44; then assign the 44 to the total_students variable."

---

## 5. Order of Operations

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/order-of-operations/
- **Capítulo:** II. Data and Operators › Order of Operations
- **Seções internas usadas:** *Overview*, *Discussion* › *An Expression Example with Evaluation*, *Operator Precedence Chart*, *Key Terms*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m02-expressions-operators` (OBJ-5)

### Trechos literais usados

> "The order of operations (or operator precedence) is a collection of rules that reflect conventions about which procedures to perform first in order to evaluate a given mathematical expression."

> "the symbols of + meaning addition and * meaning multiplication are our operators"

> "the values 2, 3, 4 and 5 are our operands"

> "precedence says that multiplication is higher than addition"

> "thus, we evaluate the 3 * 4 to get 12"

> "the associativity rules say that addition goes left to right, thus we evaluate the 2 +12 to get 14"

> "finally, we evaluate the 14 + 5 to get 19; which is the value of the expression"

> "Parentheses would change the outcome. (2 + 3) * (4 + 5) evaluates to 45."

> "Parentheses would change the outcome. (2 + 3) * 4 + 5 evaluates to 25."

> "Order of Operations: Parentheses; Exponents; Multiplication / Division; Addition / Subtraction"

> "A valid expression consists of operand(s) and operator(s) that are put together properly."

---

## 6. Arithmetic Operators

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/arithmetic-operators/
- **Capítulo:** II. Data and Operators › Arithmetic Operators
- **Seções internas usadas:** *Overview*, *Discussion*, *Arithmetic Assignment Operators*, *Pseudocode*, *Output*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m02-expressions-operators` (OBJ-5)

### Trechos literais usados

> "The basic arithmetic operations are addition, subtraction, multiplication, and division. Arithmetic is performed according to an order of operations."

> "An operator performs an action on one or more operands. The common arithmetic operators are: Addition +; Subtraction -; Multiplication *; Division /; Modulus (associated with integers) %"

> "These arithmetic operators are binary that is they have two operands. The operands may be either constants or variables."

> "These operators work as you have learned them throughout your life with the exception of division and modulus."

> "Many programming languages support a combination of the assignment (=) and arithmetic operators (+, -, *, /, %)."

---

## 7. Integer Division and Modulus

- **URL:** https://press.rebus.community/programmingfundamentals/chapter/integer-division-and-modulus/
- **Capítulo:** II. Data and Operators › Integer Division and Modulus
- **Seções internas usadas:** *Overview*, *Discussion*, *Key Terms*
- **Licença confirmada na página:** CC BY-SA 4.0 (rodapé), exceto onde indicado
- **Uso no módulo:** unidade `th-sem1-algorithms-m02-integer-division-modulus` (OBJ-6)

### Trechos literais usados

> "In integer division and modulus, the dividend is divided by the divisor into an integer quotient and a remainder. The integer quotient operation is referred to as integer division, and the integer remainder operation is the modulus."

> "Because both operands are of the integer data type the evaluation of the expression (or answer) would be 2 with no fractional part (it gets thrown away)."

> "What is modulus? It’s the other part of the answer for integer division. It’s the remainder."

> "In many programming languages, the symbol for the modulus operator is the percent sign (%)."

> "Thus, the answer or value of this expression is 3 or the remainder part of integer division."

> "Many compilers require that you have integer operands on both sides of the modulus operator or you will get a compiler error."

> "6 / 24 which is different from 6 % 24"

> "Six divided by 24 is zero. This is different from: What is the remainder of 6 divided by 24? Six, the remainder part is given by modulus."

---

## 8. Uso e limites

- **Derivação:** tradução/adaptação para pt-BR, com `original_excerpt` literal em inglês em cada unidade.
- **Não derivado:** imagens, diagramas e figuras das páginas; capítulos fora do escopo (Data Type Conversions, Unary Operations, Lvalue and Rvalue, Scope, Arrays, String Functions).
- **Atribuição:** registrada em `ATTRIBUTIONS.md` e no front-matter de cada unidade.
- **Conferência manual:** `npm run verify-sources` deve imprimir "confere" para as cinco unidades do módulo.
