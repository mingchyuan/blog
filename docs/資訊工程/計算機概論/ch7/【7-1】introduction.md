# 【7-1】Introduction

> [!figure]
$$
\begin{cases}
& \text{Hardware} \\\\
& \text{Software }
    \begin{cases}
    & \text{Operating system } \\\\
    & \text{Application programs }
    \end{cases}
\end{cases}
$$

> [!example]
> 台聯大-111-計算機概論-7：
>
> *Virtual machine* is able to provide the set of services and resources created by the system software and made available by the users.

## Operating system

Some common definitions:

- An operating system is an interface between the hardware of a computer and the user (programs or humans).
- An operating system is a program (or a set of programs) that facilitates the execution of other programs.
- An operating system supervising the activity of each component in the computer system. The operating system checks that hardware and software resources are used efficiently, and when there is a conflict in using a resource, the operating system mediates to solve it.

Two major design goals of an operating system are:

- Efficient use of hardware.
- Easy use of resources.

## Bootstrap process

Operating system is responsible for loading other programs into memory for execution. However, the operating system itself is a program that needs to be loaded into the memory and be run. How is this dilemma solved?

The solution adopted today is a two-stage process.

1. A very small section of memory is made of *ROM* and holds a small program called the **bootstrap** program. When the computer is turned on, the CPU counter is set to the first instruction of this bootstrap program and executes the instructions in this program.
2. This program is only responsible for loading the operating system itself, or that part of it required to start up the computer, into *RAM* memory. When loading is done, the program counter in the CPU is set to the first instruction of the operating system in RAM and the operating system is executed.

> [!example]
> 台聯大-107-計算機概論-8：
>
> $Q:$
>
> Which of the following is the first stage of the modern operation system be loaded into the memory and run it?
>
> $Ans:$
>
> Bootstrap program in ROM.
