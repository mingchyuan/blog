# 【1-2】Von Neumann Model

Computers built on the Turing universal machine store data in their memory.

Around 1944–1945, John von Neumann proposed that, <mark>since program and data are logically the same, programs should also be stored in the memory of a computer.</mark>

## Four subsystems

> [!figure]
> The Von Neumann model
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     compound=true;
>     newrank=true;
>     {
>         node [shape=rect, margin=0.2];
>         cu [label="Control unit"];
>         alu [label="Arithmetic/logic unit\n(ALU)"];
>         m [label="Memory"];
>   
>         i [label="Input\ndevice"];
>         o [label="Output\ndevice"];
>     }
>   
>     node [shape=none];
>     label = "Computer";
>     subgraph cluster0 {
>       label = "";
>       i;
>       o;
>       subgraph cluster1 {
>           label = "";
>           subgraph cluster2 {
>               label = "Central Processing Unit";
>               cu, alu;
>           }
>           subgraph cluster3 {
>               label="";
>               peripheries=0;
>               m;
>           }
>       }
>     }
>   
>     i -> alu [lhead=cluster1];
>     alu -> o [ltail=cluster1];
>   
>     alu -> m [ltail=cluster2, minlen=3, dir=both];
>     {rank=same; alu; cu; m;}
> 
>     "Input\ndata" -> i [lhead=cluster0];
>     o -> "Output\ndata" [ltail=cluster0];
> }
> ```

### Memory

Memory is the storage area. This is where programs and data are stored during processing.

### Arithmetic logic unit

The arithmetic logic unit (ALU) is where *calculation* and *logical operations* take place.

### Control unit

The control unit controls the operations of the memory, ALU, and the input/output subsystem.

### Input / output

The input subsystem accepts input data and the program from outside the computer, while the output subsystem sends the result of processing to the outside world.

## The stored program concept

The architecture of early computers in which only the data was stored in memory: the programs for their task were implemented by manipulating a set of switches or by changing the wiring system.

<mark>The memory of modern computers hosts both a program and its corresponding data.</mark> <mark>This implies that both the data and programs should have the same format, because they are stored in memory.</mark> In fact, they are stored as **binary** patterns in memory—a sequence of 0s and 1s.

> [!example]
> 台聯大-111-計算機概論-12：
>
> $Q:$
>
> What is the common term used to describe John Von Neumann's radically different computer concept based on a model conceived in 1946?
>
> $Ans:$
>
> Stored Program.

## Sequential execution of instructions

A program in the von Neumann model is made of a finite number of **instructions**.

In this model, the control unit fetches one instruction from memory, decodes it, then executes it. In other words, the instructions are executed one after another.

Of course, one instruction may request the control unit to jump to some previous or following instruction, but this does not mean that the instructions are not executed sequentially.
