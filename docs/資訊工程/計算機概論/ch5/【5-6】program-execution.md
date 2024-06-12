# 【5-6】Program Execution

## Machine cycle

The CPU uses repeating machine cycles to execute instructions in the program, one by one, from beginning to end.

> [!figure]
$$
\text{A machine cycle }
\begin{cases}
& \text{Fetch} \\
& \text{Decode} \\
& \text{Execute}
\end{cases}
$$

### Fetch

In the **fetch** phase, the control unit orders the system to copy the next instruction into the *instruction register* in the CPU. The address of the instruction to be copied is held in the *program counter register*. After copying, the program counter is incremented to refer to the next instruction in memory.

### Decode

The second phase in the cycle is the **decode** phase. When the instruction is in the instruction register, it is decoded by the control unit. The result of this decode step is the binary code for some operation that the system will perform.

### Execute

After the instruction is decoded, the control unit sends the task order to a component in the CPU.

For example, the control unit can tell the system to load (read) a data item from memory, or the CPU can tell the ALU to add the contents of two input registers and put the result in an output register. This is the **execute** phase.

## Benchmarking

When shopping for a personal computer, you will find that clock speeds are often used to compare machines. A computer's **clock** is a circuit, called an oscillator, which generates pulses that are used to coordinate the machine's activities—<mark>the faster this oscillating circuit generates pulses, the faster the machine performs its *machine cycle*.</mark>

Clock speeds are measured in hertz (abbreviated as Hz) with <mark>one Hz equal to one cycle (or pulse) per second.</mark>

Unfortunately, different CPU designs might perform different amounts of work in one clock cycle, and thus clock speed alone fails to be relevant in comparing machines with different CPUs.

If you are comparing a machine based on an Intel processor to one based on ARM, it would be more meaningful to compare performance by means of **benchmarking**, which is <mark>the process of comparing the performance of different machines when executing the same program, known as a benchmark.</mark>

> [!example]
> 【台聯大】【111】【計算機概論】【17】
>
> ---
>
> $Q:$
>
> Which are useful for measuring the performance of one machine against another, and evaluating the sensitivity of an algorithm to variations in input on a particular machine?
>
> ---
>
> $Ans:$
>
> benchmark.

## Input/output operation

Commands are required to <mark>transfer data from I/O devices to the CPU and memory.</mark> Because I/O devices operate at much slower speeds than the CPU, the operation of the CPU must be somehow *synchronized* with the I/O devices.

Three methods have been devised for this synchronization:

> [!figure]
$$
\text{Synchronization }
\begin{cases}
& \text{Programmed I/O} \\
& \small\text{(CPU 等待 I/O 設備)} \\\\
& \text{Interrupt-driven I/O} \\
& \small\text{(I/O 設備準備好後會傳送中斷訊號給 CPU)} \\\\
& \text{Direct memory access (DMA)} \\
& \small\text{(不須經過 CPU，高速 I/O (硬碟) 直接傳輸資料給記憶體)}
\end{cases}
$$

### Programmed I/O

In the **programmed I/O** method, synchronization is very primitive: <mark>the CPU waits for the I/O device.</mark>

When the CPU encounters an I/O instruction, it does nothing else until the data transfer is complete.

### Interrupt-driven I/O

In the **interrupt-driven I/O** method

- The CPU informs the I/O device that a transfer is going to happen, but it does not test the status of the I/O device continuously.
- <mark>The I/O device informs (interrupts) the CPU when it is ready.</mark>
- During this time, the CPU can do other jobs such as running other programs or transferring data from or to other I/O devices.

> [!example]
> 【台聯大】【111】【計算機概論】【6】
>
> ---
>
> $Q:$
>
> What should be transmitted to the processor to alert the computer that an input/output operation has been completed?
>
> ---
>
> $Ans:$
>
> Interrupt Signal.

### Direct memory access (DMA)

The third method used for transferring data is **direct memory access** (DMA).

<mark>This method transfers a large block of data between a high-speed I/O device ( $e.g.$ disk ) and memory directly without passing it through the CPU.</mark> This requires a DMA controller that relieves the CPU of some of its functions. The DMA controller has registers to hold a block of data before and after memory transfer.

Using this method for an I/O operation,

- The CPU sends a message to the DMA, then becomes available for other tasks. The message contains
    - The type of transfer (input or output)
    - The beginning address of the memory location
    - The number of bytes to be transferred  
- When ready to transfer data, the DMA controller informs the CPU that it needs to take control of the buses. The CPU stops using the buses and lets the controller use them. After data transfer directly between the DMA and memory, the CPU continues its normal operation.

Note that, in this method, the CPU is idle for a time. However, the duration of this idle period is very short compared to other methods—the CPU is idle only during the data transfer between the DMA and memory, not while the device prepares the data.
