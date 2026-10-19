# Captura de Fontes — sem1-algorithms-m03

> Módulo: Controle de Fluxo | Disciplina: algorithms | Semestre: 1
> Fonte: *Programming Fundamentals*, 2ª ed. (2018), Busbee & Braunschweig
> Licença: CC BY-SA 4.0 | URL da licença: https://creativecommons.org/licenses/by-sa/4.0/
> Data de acesso: 2026-10-19
> Edição confirmada: 2ª edição (2018), Rebus Community / Pressbooks

---

## 1. Structured Programming (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/structured-programming/

**Trechos literais:**
- "The mechanisms that allow us to control the flow of execution are called control structures."
- "There are three main categories of control structures: Sequence, Selection, Iteration."
- "Sequence – Very boring. Simply do one instruction then the next and the next."
- "Selection – This is where you select or choose between two or more flows. The choice is decided by asking some sort of question."
- "Iteration – Also known as repetition, it allows some code (one to many lines) to be executed (or repeated) several times."
- "Branching – An uncontrolled structure that allows the flow of execution to jump to a different part of the program."
- "All high-level programming languages have control structures. All languages have the first three categories... Most have the if then else structure... and the while structure."

---

## 2. Selection Control Structures (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/selection-control-structures/

**Trechos literais:**
- "In selection control structures, conditional statements are features of a programming language which perform different computations or actions depending on whether a programmer-specified Boolean condition evaluates to true or false."
- "The basic attribute of a selection control structure is to be able to select between two or more alternate paths. This is described as either two-way selection or multi-way selection."
- "The if then else control structure is a two-way selection."
- "The case control structure is a multi-way selection. Case control structures compare a given value with specified constants and take action according to the first expression to match."

---

## 3. If Then Else (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/if-then-else/

**Trechos literais:**
- "The if–then–else construct, sometimes called if-then, is a two-way selection structure common across many programming languages."
- "Asking a question that has a true or false answer controls the if then else structure."
- "In most languages, the question (called a test expression) is a Boolean expression."
- "Because the question (your room is clean) has only two possible answers (true or false) the actions are mutually exclusive. Either the child 1) goes outside and plays or 2) sits on a chair for five minutes. One of the actions is executed; never both of the actions."
- "Often the programmer will want to do something only if the expression is true, that is with no false action. The lack of a false action is also referred to as a 'null else'."

---

## 4. Relational Operators (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/relational-operators/

**Trechos literais:**
- "A relational operator is a programming language construct or operator that tests or defines some kind of relation between two entities."
- "The relational operators are often used to create a test expression that controls program flow. This type of expression is also known as a Boolean expression because they create a Boolean answer or value when evaluated."
- "There are six common relational operators that give a Boolean value by comparing (showing the relationship) between two operands: <, >, <=, >=, ==, != or <>"
- "Note: Be careful. In math you are familiar with using the symbol = to mean equal and ≠ to mean not equal. In many programming languages the ≠ is not used and the = symbol means assignment."

---

## 5. Assignment vs Equality (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/assignment-vs-equality/

**Trechos literais:**
- "Assignment sets and/or re-sets the value stored in the storage location denoted by a variable name. Equality is a relational operator that tests or defines the relationship between two entities."
- "Within various languages, we have the potential added confusion of the equals symbol = as an operator that does not represent the normal math meaning of equality that we have used for most of our life. The equals symbol typically means: assignment."
- "To get the equality concept of math we often use two equal symbols to represent the relational operator of equality."
- "If (pig = 'y') ... The test expression of the control structure will always be true because the expression is an assignment (not the relational operator of ==)."
- "Don't get caught using assignment for equality."

---

## 6. Logical Operators (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/logical-operators/

**Trechos literais:**
- "A logical operator is a symbol or word used to connect two or more expressions such that the value of the compound expression produced depends only on that of the original expressions and on the meaning of the operator. Common logical operators include AND, OR, and NOT."
- "The logical operators are often used to help create a test expression that controls program flow. This type of expression is also known as a Boolean expression because they create a Boolean answer or value when evaluated."
- "There are three common logical operators that give a Boolean value by manipulating other Boolean operand(s)."
- Truth tables for AND, OR, NOT showing: false && false = false, false && true = false, true && false = false, true && true = true; false || false = false, false || true = true, true || false = true, true || true = true; !false = true, !true = false.
- "Most programming languages recognize any non-zero value as true."

---

## 7. Nested If Then Else (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/nested-if-then-else/

**Trechos literais:**
- "Two-way selection structures may be nested inside other two-way selection structures, resulting in multi-way selection."
- "Nesting is a concept that places one item inside of another."
- "One of the drawbacks of two-way selection is that we can only consider two choices. But what do you do if you have more than two choices?"
- Multiway selection example with `if age equal to 18 / else if age equal to 39 / else if age equal to 65 / else`.
- "The last item is referred to as the default."

---

## 8. Case Control Structure (IV. Conditions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/case-control-structure/

**Trechos literais:**
- "A case or switch statement is a type of selection control mechanism used to allow the value of a variable or expression to change the control flow of program execution via a multiway branch."
- "The logic of the case is one of equality wherein the value in the variable age is compared to the listed values in order from left to right."
- "Many programming languages require the listed values for the case control structure be of the integer family of data types. This basically means either an integer or character data type."
- "Most programming languages do not allow ranges of values for case-like structures."
- "Using the case control structure when using non-integer family or ranges of values is allowed when designing a program and documenting that design with pseudocode or flowcharting. However, the implementation in most languages would follow a nested if then else approach with complex Boolean expressions."

---

## 9. Iteration Control Structures (V. Loops)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/iteration-control-structures/

**Trechos literais:**
- "In iteration control structures, a statement or block is executed until the program reaches a certain state, or operations have been applied to every element of a collection."
- "The basic attribute of an iteration control structure is to be able to repeat some lines of code. The visual display of iteration creates a circular loop pattern when flowcharted, thus the word 'loop' is associated with iteration control structures."
- "Iteration can be accomplished with test before loops, test after loops, and counting loops."

---

## 10. While Loop (V. Loops)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/while-loop/

**Trechos literais:**
- "A while loop is a control flow statement that allows code to be executed repeatedly based on a given Boolean condition. The while loop can be thought of as a repeating if statement."
- "Within the while control structure there are four attributes to a properly working loop. They are: Initializing the flag, Test expression, Action or actions, Update of the flag."
- "The initialization of the flag is not technically part of the control structure, but a necessary item to occur before the loop is started."
- "Because this is a test before loop the action might not happen. It is called a test before loop because the test comes before the action. It is also sometimes called a pre-test loop."
- "Infinite loops are a bad thing. ... if this does not happen, then the program is in an infinite loop."
- "Missing the flag update usually causes an infinite loop."
- "A counting loop is designed to execute the action a set of given number of times."

---

## 11. Do While Loop (V. Loops)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/do-while-loop/

**Trechos literais:**
- "A do while loop is a control flow statement that executes a block of code at least once, and then repeatedly executes the block, or not, depending on a given boolean condition at the end of the block."
- "Within the do while control structure there are three attributes of a properly working loop. They are: Action or actions, Update of the flag, Test expression."
- "Notice, because this is a test after loop the action will always happen at least once. It is called a test after loop because the test comes after the action. It is also sometimes called a post-test loop."
- "The Pascal language has a repeat until loop, which continues to run until the control expression is true (and then terminates) — whereas a 'while' loop runs while the control expression is true (and terminates once the expression becomes false)."

---

## 12. Flag Concept (V. Loops)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/flag-concept/

**Trechos literais:**
- "Flags are commonly used to control or to indicate the intermediate state or outcome of particular operations."
- "Computer programming uses the concept of a flag in the same way that physical flags are used. A flag is anything that signals some information to the person looking at it."
- "Any variable or constant that holds data can be used as a flag. You can think of the storage location as a flagpole. The value stored within the variable conveys some meaning and you can think of it as being the flag."
- "Control structures are 'controlled' by using a test expression which is usually a Boolean expression. Thus, the flag concept of 'looking' at the value in the variable and comparing it to another value is fundamental to understanding how all control structures work."

---

## 13. For Loop (V. Loops)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/for-loop/

**Trechos literais:**
- "A for loop is a control flow statement for specifying iteration, which allows code to be executed repeatedly. A for loop has two parts: a header specifying the iteration, and a body which is executed once per iteration."
- "For loops are typically used when the number of iterations is known before entering the loop."
- "Within the for control structure, there are four attributes to a properly working loop. They are: Initializing the flag – done once, Test expression, Action or actions, Update of the flag."
- "The initialization of the flag is not technically part of the while control structure, but it is usually part of the for control structure."
- "Because this is a test before loop the action might not happen. It is called a test before loop because the test comes before the action. It is also sometimes called a pre-test loop."

---

## 14. Branching Statements (V. Loops)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/branching-statements/

**Trechos literais:**
- "A branch is an instruction in a computer program that can cause a computer to begin executing a different instruction sequence and thus deviate from its default behavior of executing instructions in order."
- "Common branching statements include break, continue, return, and goto."
- "The break is used in one of two ways; with a switch to make it act like a case structure or as part of a looping process to break out of the loop."
- "The following gives the appearance that the loop will execute 8 times, but the break statement causes it to stop during the fifth iteration."
- "The continue statement causes it not to print number 4."
- "The return statement exits a function and returns to the statement where the function was called."
- "The goto structure is typically not accepted in good structured programming."

---

## 15. Nested For Loops (V. Loops)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/nested-for-loops/

**Trechos literais:**
- "Nested for loops places one for loop inside another for loop. The inner loop is repeated for each iteration of the outer loop."
- "Nesting is a concept that places one item inside of another."
- "Many complex logic problems require using nested control structures. By nesting control structures (or placing one inside another) we can accomplish almost any complex logic problem."
- Example pseudocode: "For row = 1, row <= 3, row += 1 / For column = 1, column <= 3, column += 1 / Output row * column"

---

## 16. Modular Programming (III. Functions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/modular-programming/

**Trechos literais:**
- "Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality."
- "One of the most important concepts of programming is the ability to group some lines of code into a unit that can be included in our program. ... We are going to use the term function for that is what they are called in most of the predominant programming languages of today."
- "Functions are important because they allow us to take large complicated programs and to divide them into smaller manageable pieces. Because the function is a smaller piece of the overall program, we can concentrate on what we want it to do and test it to make sure it works properly."
- "Generally, functions fall into two categories: Program Control – Functions used to simply sub-divide and control the program. Specific Task – Functions designed to be used with several programs."
- "The data items passed (or communicated) are called parameters. Thus the wording: parameter passing."

---

## 17. Parameters and Arguments (III. Functions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/parameters-and-arguments/

**Trechos literais:**
- "A parameter is a special kind of variable used in a function to refer to one of the pieces of data provided as input to the function. These pieces of data are the values of the arguments with which the function is going to be called/invoked."
- "The parameter values, called arguments, are passed to the function when the function is called."
- "If the CalculateCelsius function is called passing in the value 100, as in CalculateCelsius(100), the parameter is fahrenheit and the argument is 100. The terms parameter and argument are often used interchangeably. However, parameter refers to the variable identifier (fahrenheit) while argument refers to the variable value (100)."
- "Functions may have no parameters or multiple parameters."
- "Note that the arguments are passed positionally."

---

## 18. Return Statement (III. Functions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/return-statement/

**Trechos literais:**
- "A return statement causes execution to leave the current function and resume at the point in the code immediately after where the function was called. Return statements in many languages allow a function to specify a return value to be passed back to the code that called the function."
- "The return statement exits a function and returns to the statement where the function was called."
- "Most programming languages support either zero or one return value from a function."
- "Note that functions are independent, and each function must declare its own variables. While both functions have a variable named fahrenheit, they are not the same variable. Each variable refers to a different location in memory."

---

## 19. Scope (III. Functions)
**URL:** https://press.rebus.community/programmingfundamentals/chapter/scope/

**Trechos literais:**
- "The scope of an identifier name binding – an association of a name to an entity, such as a variable – is the region of a computer program where the binding is valid: where the name can be used to refer to the entity."
- "Scope is the area of the program where an item (be it variable, constant, function, etc.) that has an identifier name is recognized."
- "Global scope (and by extension global data storage) occurs when a variable is defined 'outside of a function'. ... technically it is available only from the point of definition to the end of the program source code."
- "Local scope (and by extension local data storage) occurs when a variable is defined 'inside of a function'. ... technically it is available only from the point of definition to the end of the function."
- "Scope is an important concept for modularization. Program control functions may use global scope for variables and constants placing them near the top of the program before any functions. Specific task functions use only local scope variables by passing data as needed into the function with parameter passing and creating local variables and constants as needed."
- "This closed communications model that passes all data into and out of a function creates an important predecessor concept for encapsulation which is used in object-oriented programming."