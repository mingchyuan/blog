# 【5-5】Subsystem Interconnection

> [!figure]
$$
\begin{gather}
\text{CPU } \longleftrightarrow
&
\left\{ \quad
\begin{array}{c}
    \text{Data bus} \\\\
    \text{Address bus} \\\\
    \text{Control bus}
\end{array}
\quad \right\}
&
\longleftrightarrow \text{ Memory} \\
&
\begin{array}{c}
    \updownarrow \\
    \text{I/O Controller} \\
    \updownarrow \\
    \text{I/O devices}
\end{array}
&
\end{gather}
$$

## Connecting CPU and memory

### Data bus

The **data bus** is made of several connections, each carrying 1 bit at a time. The number of connections <mark>depends on the size of the *word*</mark> used by the computer.

If the word is 32 bits (4 bytes), we need a data bus with 32 connections so that all 32 bits of a word can be transmitted at the same time.

### Address bus

The **address bus** allows access to a particular word in memory. The number of connections in the address bus <mark>depends on the *address space* of the memory.</mark>

If the memory has $2^n$ words, the address bus needs to carry $n$ bits at a time. Therefore, it must have n connections.

### Control bus

The **control bus** carries communication between the CPU and memory. The number of connections used in the control bus <mark>depends on the *total number of control commands* a computer needs.</mark>

If a computer has $2^m$ control actions, we need $m$ connections for the control bus, because $m$ bits can define $2^m$ different operations.

## Connecting I/O devices

I/O devices are electromechanical, magnetic, or optical devices, whereas the CPU and memory are electronic devices. I/O devices also operate at a much slower speed than the CPU/ memory. There is a need for some sort of intermediary to handle this difference.

Input/output devices are therefore attached to the buses through **input/output controllers** or interfaces. There is one specific **controller** for each input/output device.

### Controllers

Controllers or interfaces bridge the gap between the nature of the I/O device and the CPU and memory.

The most common ones today are

- SCSI
- Fire-Wire
- USB
- HDMI

## Addressing input/output devices

The CPU usually uses the same bus to read data from or write data to main memory and I/O device. The only difference is the instruction.

There are two methods for handling the addressing of I/O devices:

- Isolated I/O
- Memory-mapped I/O

### Isolated I/O

In the **isolated I/O** method, the instructions used to read/write memory are totally different than the instructions used to read/write I/O devices.

The I/O addresses can overlap with memory addresses without any ambiguity because <mark>the instruction itself is different.</mark>

For example, the CPU can use a command

- `Read 101` to read from memory word 101
- `Input 101` to read from I/O device 101.

### Memory-mapped I/O

In the **memory-mapped I/O** method, <mark>the CPU treats each register in the I/O controller as a word in memory.</mark>

- The advantage of the memory-mapped configuration is a smaller number of instructions: all the memory instructions can be used by I/O devices.
- The disadvantage is that part of the memory address space is allocated to registers in I/O controllers.

> [!example]
> 【台聯大】【112】【計算機概論】【2】
>
> ---
>
> $Q:$
>
> 假設電腦的硬體設計使用記憶體對映輸入輸出來定址 (memory-mapped I/O addressing)。它的記憶體位址使用 10 個 bits。如果實體記憶體空間至多能使用 1000 個字 (words)，剩下的空間給 I/O 控制器 (controller) 使用，那麼假設每個控制器有 2 個暫存器 (register)，則此電腦總共可以存取幾個控制器？
>
> ---
>
> $Sol:$
$$
2^{10} - 1000 = 24 \text{ 個空位址}
$$
> 每個暫存器使用 1 個位址，所以此電腦可以存取 $24 \text{ 位址} \div 2 \ ^{\text{位址}}/_{\text{控制器}} = 12$ 個控制器。
