# 【1-3】Computer Components

We can think of a computer as being made up of three components:

> [!figure]
$$
\text{Computer }
\begin{cases}
    & \text{Computer hardware} \\
    & \text{Data} \\
    & \text{Computer software}
\end{cases}
$$

## Computer hardware

Computer hardware today has four components under the von Neumann model, although we can have different types of memory, different types of input/output subsystems, and so on.

We discuss computer hardware in more detail in [Chapter【5】][].

[Chapter【5】]: /資訊工程/計算機概論/ch5/【5-1】introduction

## Data

The von Neumann model clearly defines a computer as a data processing machine that accepts the input data, processes it, and outputs the result.

### Storing data

The von Neumann model does not define how data must be stored in a computer. If a computer is an electronic device, the best way to store data is in the form of an electrical signal, specifically its presence or absence. This implies that a computer can store data in one of two states.

In [Chapter【3】][], we will learn how to store different types of data as a **binary pattern**, a sequence of 0s and 1s.

In [Chapter【4】][], we show how data is manipulated, as a binary pattern,
inside a computer.

[Chapter【3】]: /資訊工程/計算機概論/ch3/【3-1】data-types
[Chapter【4】]: /資訊工程/計算機概論/ch4/【4-1】logic-operations

### Organizing data

Although data should be stored only in one form inside a computer, a binary pattern, data outside a computer can take many forms. In addition, computers (and the notion of data processing) have created a new field of study known as *data organization*, which asks the question: can we organize our data into different entities and formats before storing them
inside a computer? Today, data is not treated as a flat sequence of information. Instead, data is organized into small units, small units are organized into larger units, and so on.

We will look at data from this point of view in Chapters【11】–【14】.

## Computer software

The main feature of the **Turing** or **von Neumann models** is the concept of the **program**.

Although early computers did not store the program in the computer's memory, they did use the concept of programs. Programming those early computers meant changing the wiring systems or turning a set of switches on or off. Programming was therefore a task done by an operator or engineer before the actual data processing began.

### Programs must be stored

In the von Neumann model programs are stored in the computer's memory. Not only do we need memory to hold data, but we also need memory to hold the program.

> [!figure]
>
> ```graphviz
> graph {
>     rankdir="LR";
>     node [shape=record, margin=0.2];
>     m [label=" Program | Data "];
>     label = "memory";
> }
> ```

### A sequence of instructions

Another requirement of the model is that the program must consist of a sequence of instructions. Each instruction operates on one or more data items. Thus, an instruction can change the effect of a previous instruction.

For example, Figure shows a program that inputs two numbers, adds them, and prints the result. This program consists of four individual instructions.

> [!figure]
>
> ```algorithm
> \begin{algorithmic}
> \State 1. Input the first number into memory.
> \State 2. Input the second number into memory.
> \State 3. Add the two together and store the result in memory.
> \State 4. Output the result.
> \end{algorithmic}
> ```

We might ask why a program must be composed of instructions. The answer is **reusability**. Today, computers do millions of tasks. If the program for each task was an independent entity without anything in common with other programs, programming would be difficult.

The Turing and von Neumann models make programming easier by defining the different instructions that can be used by computers. A programmer can then combine these instructions to make any number of programs. Each program can be a different combination of different instructions.

### Algorithms

A programmer must not only learn the task performed by each instruction, but also learn how to combine these instructions to do a particular task.

Looking at this issue differently, a programmer must first solve the problem in a step-by-step manner, then try to find the appropriate instruction (or series of instructions) to implement those steps. This step-by-step solution is called an **algorithm**.

Algorithms play a very important role in computer science and are discussed in [Chapter【8】][].

[Chapter【8】]: /資訊工程/計算機概論/ch8/【8】algorithms

### Languages

At the beginning of the computer age there was only one computer language, **machine language**. Programmers wrote instructions (using binary patterns) to solve a problem.

However, as programs became larger, writing long programs using these patterns became tedious. Computer scientists came up with the idea of using symbols to represent binary patterns, just as people use symbols (words) for commands in daily life. Of course, the symbols used in daily life are different from those used in computers. So the concept of **computer languages** was born.

A natural language such as English is rich and has many rules to combine words correctly: a computer language, on the other hand, has a more limited number of symbols and also a limited number of words.

We will study computer languages in [Chapter【9】][].

[Chapter【9】]: /資訊工程/計算機概論/ch9/【9-1】evolution

### Software engineering

Something that was not defined in the von Neumann model is **software engineering**, which is the <mark>design and writing of structured programs.</mark> Today it is not acceptable just to write a program that does a task: the program must follow strict rules and principles.

We discuss these principles, collectively known as software engineering, in [Chapter【10】][].

[Chapter【10】]: /資訊工程/計算機概論/ch10/【10】software-engineering

### Operating systems

During the evolution of computers, scientists became aware that <mark>there was a series of instructions common to all programs.</mark>

For example, instructions to tell a computer where to receive data and where to send data are needed by almost all programs. It is more efficient to write these instructions only once for the use of all programs. Thus the concept of the operating system emerged.

An operating system originally worked as a manager to facilitate access to the computer's components by a program, although today operating systems do much more.

We will learn about them in [Chapter【7】][].

[Chapter【7】]: /資訊工程/計算機概論/ch7/【7-1】introduction
