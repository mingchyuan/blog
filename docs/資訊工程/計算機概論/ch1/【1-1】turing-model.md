# 【1-1】Turing Model

> [!example]
> 台聯大-109-計算機概論-1：
>
> $Q:$
>
> Which award is considered as the Nobel Prize in computer science?
>
> $Ans:$
>
> Turing Award.

## Data processors

Before discussing the Turing model, let us define a computer as a data processor. Using this definition, a computer acts as a black box that accepts input data, processes the data, and creates output data.

> [!figure]
> A single-purpose computing machine
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     {
>         node [shape=none, margin=0.1];
>         i [label="Input data"];
>         o [label="Output data"];
>     }
>     {
>         node [shape=rect, margin=0.2];
>         c [label="Computer"];
>     }
>     i -> c -> o;
> }
> ```

Another problem with this model is that it does not specify the type of processing, or whether more than one type of processing is possible.

In other words, it is not clear how many types or sets of operations a machine based on this model can perform.  

+ Is it a specific-purpose machine or a general-purpose machine? +

    This model could represent a specific-purpose computer (or processor) that is designed to do a single job,
    such as controlling the temperature of a building or controlling the fuel usage in a car.

    However, computers, as the term is used today, are general-purpose machines. They can do many different types of tasks.

## Turing model

The idea of a universal computational device was first described by Alan Turing in 1936. He proposed that all computation could be performed by a special kind of a machine, now called a **Turing machine**.

### Programmable data processors

The Turing model is a better model for a general-purpose computer. This model adds an extra element to the specific computing machine: the **program**. A program is *a set of instructions* that tells the computer what to do with data.

> [!figure]
> A computer based on the Turing model: programmable data processor
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     {
>         node [shape=none, margin=0.1];
>         i [label="Input data"];
>         o [label="Output data"];
>     }
>     {
>         node [shape=rect, margin=0.2];
>         rank=same;
>         c [label="Computer"];
>         p [label="Program", style=filled, fillcolor="#e3566fcc"];
>     }
>     i -> c -> o;
>     p -> c [color="#e3566f"];
> }
> ```

In the Turing model, the output data depends on the combination of two factors:

- **input data**
- **program**

With the same input data, we can generate different output if we change the program. Similarly, with the same program, we can generate different outputs if we change the input data. Finally, if the input data and the program remain the same, the output should be the same.

#### Same program, different input data

Although the program is the same, the outputs are different, because different input data is processed.

> [!figure]
> The same program, different data
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     {
>         node [shape=rect, margin=0.1];
>         i2 [label="14, 6, 8, 12\nInput data", shape=none];
>         o2 [label="6, 8, 12, 14\nOutput data", shape=none];
>   
>         i1 [label="3, 12, 8, 22\nInput data", shape=none];
>         o1 [label="3, 8, 12, 22\nOutput data", shape=none];
>     }
>     {
>         rank=same;
>         node [shape=rect, margin=0.2];
>         c1 [label="Computer"];
>         p1 [label="sort", xlabel="Program  \n\n", style=filled, fillcolor="#e3566fcc"];
>   
>         c2 [label="Computer"];
>         p2 [label="sort", xlabel="Program  \n\n", style=filled, fillcolor="#e3566fcc"];
>     }
>   
>     i1 -> c1 -> o1;
>     p1 -> c1 [color="#e3566f"];
>   
>     i2 -> c2 -> o2;
>     p2 -> c2 [color="#e3566f"];
> }
> ```

#### Same input data, different programs

Each program makes the computer perform different operations on the input data.

> [!figure]
> The same data, different programs
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     {
>         node [shape=rect, margin=0.1];
>   
>         i3 [label="3, 12, 8, 22\nInput data", shape=none];
>         o3 [label="3\nOutput data", shape=none];
>   
>         i2 [label="3, 12, 8, 22\nInput data", shape=none];
>         o2 [label="45\nOutput data", shape=none];
>   
>         i1 [label="3, 12, 8, 22\nInput data", shape=none];
>         o1 [label="3, 8, 12, 22\nOutput data", shape=none];
>     }
>   
>     {
>         rank=same;
>         node [shape=rect, margin=0.2];
>         c1 [label="Computer"];
>         p1 [label="sort", xlabel="Program  \n\n", style=filled, fillcolor="#e3566fcc"];
>   
>         c2 [label="Computer"];
>         p2 [label="Add", xlabel="Program  \n\n", style=filled, fillcolor="#56b5e3cc"];
>   
>         c3 [label="Computer"];
>         p3 [label="Find\nsmallest", xlabel="Program  \n\n", style=filled, fillcolor="#42b983cc"];
>     }
>   
>     i1 -> c1 -> o1;
>     p1 -> c1 [color="#e3566f"];
>   
>     i2 -> c2 -> o2;
>     p2 -> c2 [color="#56b5e3"];
>   
>     i3 -> c3 -> o3;
>     p3 -> c3 [color="#42b983"];
> }
> ```

#### Same input data, same program

We expect the same result each time if both input data and the program are the same, of course. In other words, when the same program is run with the same input data, we expect the same output.

### The universal turing machine

A **universal Turing machine**, a machine that can do any computation if the appropriate program is provided, was the first description of a modern computer.

It can be proved that a very powerful computer and a universal Turing machine can compute the same thing. We need only provide the data and the program—the description of how to do the computation—to either machine. In fact, a universal Turing machine is capable of computing anything that is computable.
