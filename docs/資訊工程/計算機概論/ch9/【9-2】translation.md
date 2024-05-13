# 【9-2】Translation

Programs today are normally written in one of the high-level languages. To run the program on a computer, the program needs to be translated into the machine language of the computer on which it will run.

- The program in a high-level language is called the **source program**.
- The translated program in machine language is called the **object program**.
- Two methods are used for translation:
    - **Compilation**
    - **Interpretation**

## Compilation

A **compiler** normally translates the whole source program into the object program.

## Interpretation

Some computer languages use an **interpreter** to translate the source program into the object program. Interpretation refers to the process of translating each line of the source program into the corresponding line of the object program and executing the line.

However, we need to be aware of two trends in interpretation:

- That used by some languages before Java.
- The interpretation used by Java.

### First approach to interpretation

Some interpreted languages prior to Java (such as BASIC and APL) used a kind of interpretation process that we refer to as the first approach to interpretation, for the lack of any other name.

In this type of interpretation,

- <mark>Each line of the source program is translated into the machine language of the computer being used and executed immediately.</mark>
- <mark>If there are any errors in translation and execution, the process displays a message and the rest of the process is aborted. The program needs to be corrected and be interpreted and executed again from the beginning.</mark>

This first approach was considered to be a slow process, which is why most languages use compilation instead of interpretation.

### Second approach to interpretation

With the advent of Java, a new kind of interpretation process was introduced. The Java language is designed to <mark>be portable to any computer.</mark> To achieve portability, the translation of the source program to object program is done in two steps:

- Compilation

    A Java source program is first compiled to create **Java bytecode**, which looks like code in a machine language, but is not the object code for any specific computer: it is the object code for a virtual machine, called the **Java Virtual Machine** or **JVM**.

- Interpretation

    The bytecode then can be *compiled* or *interpreted* by any computer that runs a JVM emulator—that is, the computer that runs the bytecode needs only a JVM emulator, not the Java compiler.

## Translation process

Compilation and interpretation differ in that the first translates the whole source code before executing it, while the second translates and executes the source code a line at a time.

Both methods, however, follow the same translation process shown in Figure.

> [!figure]
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     node [shape=note];
>     s [label="Source\nfile"];
>     o [label="Object\nfile"];
>     node [shape=rect];
>     la [label="Lexical\nanalyzer"];
>     sya [label="Syntax\nanalyzer"];
>     sea [label="Semantic\nanalyzer"];
>     cg [label="Code\ngenerator"];
>     {rank=same; sya; sea;}
>     {rank=same; la; cg;}
>     {rank=same; s; o;}
>     s -> la [label="Symbols"];
>     la -> sya [label="Tokens"];
>     sya:e -> sea:e [label="    Instructions"];
>     sea -> cg [label="Codable\ninstructions"];
>     cg -> o [label="Code"];
> }
> ```

- **Lexical analyzer**

    A lexical analyzer reads the source code, symbol by symbol, and creates a list of tokens in the source language.

    For example, the five *symbols* `w`, `h`, `i`, `l`, `e` are read and grouped together as the token `while` in the C, C+ +, or Java languages.

- **Syntax analyzer**

    The syntax analyzer parses a set of tokens to find instructions.

    For example, the *tokens* `x`, `=`, `0` are used by the syntax analyzer to create the assignment statement in the C language `x = 0`.

- **Semantic analyzer**

    The semantic analyzer checks the sentences created by the syntax analyzer to be sure that they contain no ambiguity.

- **Code generator**

    After unambiguous instructions are created by the semantic analyzer, each instruction is converted to a set of machine language instructions for the computer on which the program will run. This is done by the code generator.

---

The manner in which a particular string conforms to a set of syntax diagrams can be represented in a pictorial form by a **parse tree**.

The process of parsing a program is essentially that of constructing a parse tree for the source program. Indeed, <mark>a parse tree represents the parser's interpretation of the program's grammatical composition.</mark>

For this reason, the syntax rules describing a program's grammatical structure must not allow two distinct parse trees for one string, since this would lead to ambiguities within the parser. A grammar that does allow two distinct parse trees for one string is said to be an **ambiguous grammar**.

> [!example]
> 台聯大-108-計算機概論-22：
>
> $Q:$
>
> Which of the following statements are/is correct in Programming Languages?
>
> $Ans:$
>
> **(A)** Most machine languages are based on the Imperative (指令式) paradigm.
>
> ~(B)~ In the process of translating a program, executing the program is one of the key steps.  
> $\quad$ `編譯或直譯一個程式的過程並不需要執行該程式。`
>
> **(C)** Polymorphism (多型) is the provision of a single interface to entities of different types.
>
> **(D)** The scope of a variable is the portion of the program in which the variable can be accessed.
>
> ~(E)~ Parse tree is not constructed by a typical compiler.  
> $\quad$ `分析原始碼的語法需要建立 parse tree`
