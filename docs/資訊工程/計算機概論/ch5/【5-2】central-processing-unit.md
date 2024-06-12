# 【5-2】Central Processing Unit

The **central processing unit** (CPU) performs operations on data. In most architectures it has three parts:

> [!figure]
$$
\text{CPU }
\begin{cases}
    & \text{Arithmetic logic unit (ALU)} \\
    & \text{A set of registers} \\
    & \text{Control unit}
\end{cases}
$$

## Arithmetic logic unit (ALU)

The **arithmetic logic unit** (ALU) performs logic, shift, and arithmetic operations on data.

## Registers

Registers are fast stand-alone storage locations that hold data temporarily.

### Data registers

In the past computers had only a few data registers to hold the input data and the result of the operations.

Today, computers use dozens of registers inside the CPU to speed up their operations, because complex operations are done using hardware instead of software. These require several registers to hold the intermediate results.

### Instruction registers

Today computers store not only data, but also programs, in their memory.

The CPU is responsible for fetching instructions one by one from memory, storing them in the **instruction register**, decoding them, and executing them.

> [!example]
> 【台聯大】【111】【計算機概論】【21】
>
> ---
>
> $Q:$
>
> Which of the following is stored in the instruction register?
>
> ---
>
> $Ans:$
>
> An instruction.

### Program counter

Another common register in the CPU is the **program counter**. The program counter keeps track of the instruction currently being executed. After execution of the instruction, the counter is incremented to <mark>point to the address of the next instruction in memory.</mark>

## Control unit

The **control unit** controls the operation of each subsystem. Controlling is achieved through signals sent from the control unit to other subsystems.
