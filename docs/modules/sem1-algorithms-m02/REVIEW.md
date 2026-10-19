# Auditoria de Afirmações — sem1-algorithms-m02

**Módulo:** Variáveis e Tipos (`sem1-algorithms-m02`)  
**Data da auditoria:** 2026-10-19  
**Método:** cada afirmação das unidades teóricas foi comparada com o texto literal da seção indicada, aberto nesta sessão.  
**Legenda:** `ok` = afirmação sustentada pelo trecho; `ok (aplicação)` = inferência direta e limitada a partir do trecho; `sem suporte` = removida ou rotulada como "Exemplo adicional (IA)".

---

## Unidade `th-sem1-algorithms-m02-constants-variables`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Constante é um item de dado cujo valor não pode mudar durante a execução. | Constants and Variables › Overview / Understanding Constants | "A constant is a data item whose value cannot change during the program’s execution." | ok |
| Variável é um item de dado cujo valor pode mudar durante a execução. | Constants and Variables › Overview / Understanding Constants | "A variable is a data item whose value can change during the program’s execution." | ok |
| A diferença entre constante e variável está na possibilidade de alteração do valor. | Constants and Variables › Understanding Constants | Os dois trechos anteriores contrastam "cannot change" e "can change". | ok (aplicação) |
| Constante literal é um valor digitado no programa onde ele é necessário. | Constants and Variables › Understanding Constants | "A literal constant is a value you type into your program wherever it is needed." | ok |
| Exemplos de constantes literais incluem `21`, `12.34`, `'A'`, `"Hello world!"`, `false` e `null`. | Constants and Variables › Understanding Constants | A lista de exemplos da fonte contém exatamente esses valores. | ok |
| Constante nomeada é um valor representado por um nome; muitas linguagens usam maiúsculas. | Constants and Variables › Understanding Constants | "most textbooks refer to symbolic constants or named constants as a constant represented by a name. Many programming languages use ALL CAPS to define named constants." | ok |
| Constantes nomeadas precisam receber valor na definição. | Constants and Variables › Defining Constants and Variables | "Named constants must be assigned a value when they are defined." | ok |
| Variáveis não precisam receber valor inicial e podem receber valor depois. | Constants and Variables › Defining Constants and Variables | "Variables do not have to be assigned initial values. Variables once defined may be assigned a value within the instructions of the program." | ok |
| Python não oferece suporte técnico a constantes nomeadas; alterar o valor é possível, mas nunca é boa prática. | Constants and Variables › Understanding Constants | "Technically, Python does not support named constants, meaning that it is possible (but never good practice) to change the value of a constant later." | ok |
| `PI` representa sempre `3.14159` durante a execução. | Constants and Variables › Defining Constants and Variables | A fonte usa `PI = 3.14159` como exemplo de constante nomeada e define constante como valor que não muda. | ok (aplicação) |
| `valor` pode começar com `3` e ser alterado para `7`. | Constants and Variables › Defining Constants and Variables | A fonte afirma que variáveis podem ser definidas sem valor inicial e receber valor nas instruções. | ok (aplicação) |
| Reatribuir `PI` contraria a convenção de constantes nomeadas. | Constants and Variables › Understanding Constants | A fonte chama a alteração de constante em Python de "never good practice". | ok |
| Começar um identificador com dígito é um erro. | — | Não há trecho neste capítulo; o item está rotulado como "Exemplo adicional (IA)" na unidade de identificadores. | sem suporte (rotulado) |

---

## Unidade `th-sem1-algorithms-m02-identifier-names`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Vários itens recebem nomes descritivos para tornar o código mais significativo; esses nomes são os nomes de identificadores. | Identifier Names › Overview | "Within programming a variety of items are given descriptive names to make the code more meaningful to us as humans. These names are called “Identifier Names”." | ok |
| Constantes, variáveis, definições de tipo e funções são identificados por um nome quando declarados ou definidos. | Identifier Names › Overview | "Constants, variables, type definitions, functions, etc. when declared or defined are identified by a name." | ok |
| As regras vêm das limitações técnicas da linguagem, das boas práticas e dos padrões da indústria. | Identifier Names › Overview | "These names follow a set of rules that are imposed by: 1. the language’s technical limitations 2. good programming practices 3. common industry standards for the language" | ok |
| Em muitas linguagens, o primeiro caractere deve ser alfabético ou sublinhado; os seguintes podem ser alfanuméricos ou sublinhado. | Identifier Names › Technical to Language | "Use only allowable characters (in many languages the first character must be alphabetic or underscore, can continue with alphanumeric or underscore)" | ok |
| Não se pode usar palavras reservadas. | Identifier Names › Technical to Language | "Can’t use reserved words" | ok |
| Existe um limite de comprimento do nome, que pode variar por linguagem e compilador. | Identifier Names › Technical to Language | "Length limit ... often is compiler dependent and may vary from compiler to compiler for the same language." | ok |
| Nomes significativos tornam o código mais fácil de entender; nomes crípticos devem ser evitados. | Identifier Names › Good Programming Techniques | "Meaningful identifier names make your code easier for another to understand. ... Thus do not use cryptic ... identifier names." | ok |
| É preciso ser consistente com maiúsculas e minúsculas. | Identifier Names › Good Programming Techniques | "we teach students to be case consistent. Use an identifier name only one way and spell it (upper and lower case) the same way every time within your program." | ok |
| `camelCase`, `PascalCase` e `snake_case` são estilos comuns de escrita. | Identifier Names › Industry Rules | A fonte define os três estilos com essas descrições. | ok |
| Não se deve começar com sublinhado, e constantes ficam em maiúsculas. | Identifier Names › Industry Rules | "Do not start with an underscore (used for technical programming)"; "CONSTANTS IN ALL UPPER CASE (often UPPER_SNAKE_CASE)." | ok |
| `preco_produto` é mais significativo que `p`. | Identifier Names › Good Programming Techniques | A fonte pergunta o que `p` significa (pi, preço, centavos) e recomenda nomes significativos. | ok (aplicação) |
| O mesmo nome pode ser escrito `precoProduto` em camelCase ou `PrecoProduto` em PascalCase. | Identifier Names › Industry Rules | As definições de camelCase e PascalCase da fonte sustentam a aplicação. | ok (aplicação) |
| `2total` contraria a regra técnica de muitas linguagens. | — | A fonte exige primeiro caractere alfabético ou sublinhado em muitas linguagens; o exemplo concreto está rotulado como "Exemplo adicional (IA)". | ok (aplicação, rotulado) |

---

## Unidade `th-sem1-algorithms-m02-data-types`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Tipo de dado é uma classificação que informa ao compilador ou interpretador como o programador pretende usar o dado. | Data Types › Overview | "A data type is a classification of data which tells the compiler or interpreter how the programmer intends to use the data." | ok |
| Os tipos comuns incluem inteiro, real, caractere/string e booleano. | Data Types › Overview | "Most programming languages support various types of data, including integer, real, character or string, and Boolean." | ok |
| A tabela de tipos (inteiro, ponto flutuante, string, booleano, nada) e seus exemplos corresponde à fonte. | Data Types › Discussion | A tabela da fonte lista "integer | whole numbers | -5, 0, 123", "floating point (real) | fractional numbers | -87.5, 0.0, 3.14159", "string | A sequence of characters | \"Hello world!\"", "Boolean | logical true or false | true, false", "nothing | no data | null". | ok |
| O inteiro representa números inteiros, sem parte fracionária, e os valores saltam de um para o outro. | Integer Data Type › Discussion | "The integer data type basically represents whole numbers (no fractional parts). The integer values jump from one value to another. There is nothing between 6 and 7." | ok |
| O inteiro é usado para contar e controlar o fluxo do programa; o processamento inteiro costuma ser mais rápido. | Integer Data Type › Discussion | "the integer data type is often used to control program flow by counting"; "integer processing is significantly faster within the CPU than is floating point processing." | ok |
| Ponto flutuante representa números fracionários e é armazenado como mantissa e expoente. | Floating-Point Data Type › Overview / Discussion | "The floating-point family of data types represents number values with fractional parts. They are technically stored as two integer values: a mantissa and an exponent." | ok |
| Ponto flutuante oferece um compromisso entre alcance e precisão; mais bytes aumentam a precisão. | Floating-Point Data Type › Overview / Discussion | "support a trade-off between range and precision"; "The more bytes of storage the larger the mantissa and exponent, thus more precision." | ok |
| String é uma sequência de caracteres, como constante literal ou variável. | String Data Type › Overview | "A string data type is traditionally a sequence of characters, either as a literal constant or as some kind of variable." | ok |
| Booleano representa verdadeiro ou falso e é usado para controlar estruturas como `if` e `while`. | Boolean Data Type › Discussion | "represents the concepts of true and false"; "it is used to control programming structures (if then else, while loops, etc.)" | ok |
| O tipo nada indica valor ausente ou não inicializado em vez de zero. | Nothing Data Type › Overview | "allow the setting of a special value to indicate a missing or uninitialized value rather than using the value 0 (zero)." | ok |
| O pseudocódigo com `Declare Integer/Real/String/Boolean` e as atribuições corresponde à fonte. | Data Types › Pseudocode | O bloco de pseudocódigo da fonte contém essas declarações e atribuições. | ok |
| Guardar fracionário em inteiro perde a parte fracionária. | Integer Data Type › Discussion | "whole numbers (no fractional parts)... There is nothing between 6 and 7." | ok (aplicação) |
| Ponto flutuante é uma aproximação, não precisão ilimitada. | Floating-Point Data Type › Overview | "uses a formulaic representation of real numbers as an approximation so as to support a trade-off between range and precision." | ok |
| `"123"` não é automaticamente o número `123`. | — | A definição de string como sequência de caracteres sustenta a distinção; o exemplo é aplicação direta. | ok (aplicação) |
| Usar `null` para representar zero é um engano. | Nothing Data Type › Overview | A fonte diz "rather than using the value 0 (zero)"; o item está rotulado como "Exemplo adicional (IA)". | ok (aplicação, rotulado) |

---

## Unidade `th-sem1-algorithms-m02-expressions-operators`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Atribuição define ou redefine o valor armazenado em uma variável; em outras palavras, copia um valor para a variável. | Assignment › Overview | "An assignment statement sets and/or re-sets the value stored in the storage location(s) denoted by a variable name; in other words, it copies a value into the variable." | ok |
| O símbolo `=` significa atribuição, não igualdade matemática. | Assignment › Discussion | "when you see the = symbol you need to start thinking: assignment." | ok |
| A atribuição tem dois operandos: à esquerda, geralmente uma variável; à direita, um valor. | Assignment › Discussion | "The assignment operator has two operands. The one to the left of the operator is usually an identifier name for a variable. The one to the right of the operator is a value." | ok |
| Os operadores aritméticos básicos são `+`, `-`, `*`, `/` e `%`. | Arithmetic Operators › Discussion | A tabela da fonte lista Addition `+`, Subtraction `-`, Multiplication `*`, Division `/`, Modulus `%`. | ok |
| Os operadores aritméticos são binários e seus operandos podem ser constantes ou variáveis. | Arithmetic Operators › Discussion | "These arithmetic operators are binary that is they have two operands. The operands may be either constants or variables." | ok |
| `idade + 1` tem um operador e dois operandos; se `idade` vale 14, a expressão vale 15. | Arithmetic Operators › Discussion | "This expression consists of one operator (addition) which has two operands... If age had a value of 14 then the expression would evaluate (or be equal to) 15." | ok |
| A ordem das operações é: parênteses, expoentes, multiplicação/divisão, adição/subtração. | Order of Operations › Operator Precedence Chart | A lista da fonte contém "Parentheses; Exponents; Multiplication / Division; Addition / Subtraction". | ok |
| A associatividade define a ordem entre operadores de mesma precedência; a adição vai da esquerda para a direita. | Order of Operations › Discussion / Key Terms | "the associativity rules say that addition goes left to right"; "associativity: Determines the order in which the operators of the same precedence are allowed to manipulate the operands." | ok |
| As regras de precedência podem variar entre linguagens; deve-se consultar a tabela da linguagem. | Order of Operations › Operator Precedence Chart | "Precedence rules may vary from one programming language to another. You should refer to the reference sheet..." | ok |
| `2 + 3 * 4 + 5` é avaliado como `19`, passo a passo. | Order of Operations › An Expression Example with Evaluation | A fonte mostra `3 * 4 = 12`, `2 + 12 = 14`, `14 + 5 = 19`. | ok |
| `(2 + 3) * 4 + 5` vale `25` e `(2 + 3) * (4 + 5)` vale `45`. | Order of Operations › An Expression Example with Evaluation | "Parentheses would change the outcome. (2 + 3) * (4 + 5) evaluates to 45." e "(2 + 3) * 4 + 5 evaluates to 25." | ok |
| `total_cousins = 4 + 3 + 5 + 2` avalia a expressão como `14` e atribui `14` à variável. | Assignment › Discussion | "The expression will be evaluated and the answer is 14. The value 14 would be assigned to the variable named: total_cousins." | ok |
| Ler `=` como igualdade é um erro. | Assignment › Discussion | A fonte manda pensar em atribuição ao ver `=`. | ok |
| Ignorar a precedência produz resultado diferente. | Order of Operations › Discussion | A fonte mostra que a multiplicação é feita antes da adição e que os parênteses mudam o resultado. | ok |
| A expressão pode conter nomes de variáveis, cujos valores são buscados antes do cálculo. | Assignment › Discussion | "The program would fetch the values stored in those variables; add them together..." | ok |

---

## Unidade `th-sem1-algorithms-m02-integer-division-modulus`

| Afirmação | Seção | Trecho de apoio | Status |
|-----------|-------|-----------------|--------|
| Na divisão inteira e no módulo, o dividendo é dividido pelo divisor em um quociente inteiro e um resto. | Integer Division and Modulus › Overview | "In integer division and modulus, the dividend is divided by the divisor into an integer quotient and a remainder." | ok |
| A divisão inteira devolve o quociente; o módulo devolve o resto. | Integer Division and Modulus › Overview | "The integer quotient operation is referred to as integer division, and the integer remainder operation is the modulus." | ok |
| Quando os dois operandos são inteiros, a parte fracionária é descartada. | Integer Division and Modulus › Discussion | "Because both operands are of the integer data type the evaluation of the expression (or answer) would be 2 with no fractional part (it gets thrown away)." | ok |
| O símbolo do módulo em muitas linguagens é `%`. | Integer Division and Modulus › Discussion | "In many programming languages, the symbol for the modulus operator is the percent sign (%)." | ok |
| Muitos compiladores exigem operandos inteiros dos dois lados do módulo. | Integer Division and Modulus › Discussion | "Many compilers require that you have integer operands on both sides of the modulus operator or you will get a compiler error." | ok |
| `11 / 4` resulta em `2`. | Integer Division and Modulus › Discussion | "the evaluation of the expression (or answer) would be 2 with no fractional part". | ok |
| `11 % 4` resulta em `3`. | Integer Division and Modulus › Discussion | "Thus, the answer or value of this expression is 3 or the remainder part of integer division." | ok |
| A analogia das 11 moedas para 4 crianças resulta em 2 moedas para cada uma e 3 sobrando. | Integer Division and Modulus › Discussion | "I have 11 dollar coins to distribute equally to my 4 children. How many do they each get? The answer is 2, with me still having 3 left over". | ok |
| `6 / 24` resulta em `0` e `6 % 24` resulta em `6`. | Integer Division and Modulus › Discussion | "Six divided by 24 is zero. This is different from: What is the remainder of 6 divided by 24? Six". | ok |
| Usar ponto flutuante no módulo pode gerar erro de compilação. | Integer Division and Modulus › Discussion | "Many compilers require that you have integer operands on both sides of the modulus operator or you will get a compiler error." | ok |
| Confundir `6 / 24` com `6 % 24` é um erro. | Integer Division and Modulus › Discussion | A fonte introduz o caso com "Don’t let the following items confuse you." | ok |
| Esperar parte fracionária da divisão inteira é um erro. | Integer Division and Modulus › Discussion | A fonte afirma que a parte fracionária "gets thrown away". | ok |

---

## Resumo da auditoria

- **Afirmações com suporte literal:** 55
- **Aplicações diretas da fonte:** 13
- **Sem suporte:** 1 item (`2total`), rotulado como "Exemplo adicional (IA)" na unidade de identificadores.
- **Nenhuma unidade ficou `pending`.**
- **Nenhuma imagem ou figura da fonte foi derivada.**
