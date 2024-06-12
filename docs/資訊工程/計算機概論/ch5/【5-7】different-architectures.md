# 【5-7】Different Architectures

Two philosophies of CPU architecture:

- One is that a CPU should be designed to execute a minimal set of machine instructions. This approach leads to what is called a reduced instruction set computer (RISC).

    The argument in favor of <mark>RISC architecture is that such a machine is efficient, fast, and less expensive to manufacture.</mark>

- On the other hand, others argue in favor of CPUs with the ability to execute a large number of complex instructions, even though many of them are technically redundant. The result of this approach is known as a complex instruction set computer (CISC).

    The argument in favor of CISC architecture is that the more complex CPU can better cope with the ever-increasing complexities of today's software. <mark>With CISC, programs can exploit a powerful, rich set of instructions</mark>, many of which would require a multi-instruction sequence in a RISC design.

## RISC

RISC (pronounced risk) stands for **reduced instruction set computer**. The strategy behind RISC architecture is to have a small set of instructions that do a minimum number of simple operations. Complex instructions are simulated using a subset of simple instructions.

> [!example]
> 【台聯大】【107】【計算機概論】【22】
>
> ---
>
> $Q:$
>
> Which of the statement(s) are correct in *RISC* architecture?
>
> ---
>
> $Ans:$
>
> **(A)** The advance is power efficient than CISC.
>
> (B) The Personal Computer is designed following this architecture.  
> $\quad$ `個人電腦，如 intel x86 使用 CISC。`
>
> (C) The architecture is aimed at ~increasing the time of execution of instructions~.
>
> (D) The processor has a ~more complicated~ design than CISC.  
> $\quad$ `更精簡。`
>
> **(E)** The architecture was the first to implement pipelining.

## CISC

CISC (pronounced sisk) stands for **complex instruction set computer**. The strategy behind CISC architectures is to have a large set of instructions, including complex ones.

The complexity of the instruction set makes the circuitry of the CPU and the control unit very complicated.

The designers of CISC architectures have come up with a solution to reduce this complexity: programming is done on two levels.

- An instruction in machine language is not executed directly by the CPU—the CPU performs only simple operations, called *microoperations*.
- A complex instruction is transformed into a set of these simple operations and then executed by the CPU. This necessitates the addition of a special memory called *micromemory* that holds the set of operations for each complex instruction in the instruction set.

The type of programming that uses microoperations is called *microprogramming*.

## Pipelining

<style>
.mermaid:nth-of-type(1) .lineWrapper {
    display: none;
}

.mermaid:nth-of-type(1) .lineWrapper:last-of-type {
    display: revert;
}
</style>

> [!figure]
>
> ```mermaid
> timeline
>     title No pipelining
>     section Instruction 1
>     Fetch
>     Decode
>     Execute
>     section Instruction 2
>     Fetch
>     Decode
>     Execute
> ```
>
> ```mermaid
> %%{init: { 'timeline': {'disableMulticolor': true}}}%%
> timeline
>     title Pipelining
>     0 : Fetch
>     1 : Decode : Fetch
>     2 : Execute : Decode : Fetch
>     3 : Fetch : Execute : Decode
>     4 : Decode : Fetch : Execute
>     5 : Execute : Decode : Fetch
> ```

Modern computers use a technique called **pipelining** to improve the *throughput* (the total number of instructions performed in each period of time). The idea is that <mark>if the control unit can do two or three of these phases simultaneously</mark>, the next instruction can start before the previous one is finished.

Of course, pipelining is not as easy as this. There are some problems, such as when a jump instruction is encountered.

## Parallel processing

Traditionally a computer had a single control unit, a single arithmetic logic unit, and a single memory unit.

With the evolution in technology and the drop in the cost of computer hardware, today we can have a single computer with multiple control units, multiple arithmetic logic units and multiple memory units.

A general view of **parallel processing** is given by the taxonomy proposed by M. J. Flynn. This taxonomy divides the computer's organization (in term of processing data) into four categories.

- single instruction-stream, single data-stream (**SISD**) organization  
    - Represents a computer that has one control unit, one arithmetic logic unit, and one memory units.
    - The instructions are executed sequentially and each instruction may access one or more data items in the data stream.
- single instruction-stream, multiple data-stream (**SIMD**) organization  
    - Represents a computer that has one control unit, multiple processing units, and multiple memory units.
    - All processor units receive the same instruction from the control unit, but operate on different items of data.
- multiple instruction-stream, single data-stream (**MISD**) organization
    - Several instructions belonging to several instruction streams simultaneously operate on the same data stream.
    - It has never been implemented.
- multiple instruction-stream, multiple data-stream (**MIMD**) organization
    - Several instructions belonging to several instruction streams simultaneously operate on several data streams (each instruction on one data stream).
    - In this architecture several tasks can be performed simultaneously. The architecture can use a single shared memory or multiple memory sections.
According to Flynn, parallel processing may occur in the data stream, the instruction stream, or both.
