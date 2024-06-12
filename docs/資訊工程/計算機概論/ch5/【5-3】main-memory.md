# 【5-3】Main Memory

**Main memory** is the second major subsystem in a computer.

It consists of a collection of storage locations, each with a unique identifier, called an **address**.

Data is transferred to and from memory in groups of bits called **word**s. A word can be a group of 8 bits, 16 bits, 32 bits, or 64 bits (and growing).

If the word is 8 bits, it is referred to as a **byte**. The term "byte" is so common in computer science that sometimes a 16-bit word is referred to as a 2-byte word, or a 32-bit word is referred to as a 4-byte word.

> [!example]
> 【台聯大】【111】【計算機概論】【16】
>
> ---
>
> $Q:$
>
> Which unit of binary storage has a size that is processor-dependent?
>
> ---
>
> $Ans:$
>
> word.

## Address space

To access a word in memory requires an identifier. Although programmers use a name to identify a word (or a collection of words), at the hardware level each word is identified by an address.

The total number of uniquely identifiable locations in memory is called the **address space**. For example, a memory with 64 kilobytes and a word size of 1 byte has an address space that ranges from 0 to 65 535.

The units used to refer to memory:

| Unit     | Exact Number of Bytes |
| -------- | --------------------- |
| kilobyte | $2^{10}$ (1024) bytes |
| megabyte | $2^{20}$ bytes        |
| gigabyte | $2^{30}$ bytes        |
| terabyte | $2^{40}$ bytes        |

### Addresses as bit patterns

Because computers operate by storing numbers as bit patterns, a memory address is also represented as a bit pattern.

So if a computer has 64 kilobytes ( $2^{16}$ ) of memory with a word size of 1 byte, we need a bit pattern of 16 bits to define an address.

- The first location is referred to as address 0000000000000000 (address 0)
- The last location is referred to as address 1111111111111111 (address 65535)

In general, if a computer has $N$ words of memory, we need an unsigned integer of size $log_{2}N$ bits to refer to each memory location.

> [!example]
> A computer has 32 MB (megabytes) of memory. How many bits are needed to address any single byte in memory?
>
> The memory address space is 32 MB, or $2^{25}$ ( $2^5 \times 2^{20}$ ). This means that we need $log_{2}2^{25} = 25$ bits, to address each byte.

---

> [!example]
> A computer has 128 MB of memory. Each word in this computer is eight bytes. How many bits are needed to address any single word in memory?
>
> The memory address space is 128 MB, which means $2^{27}$. However, each word is eight ( $2^3$ ) bytes, which means that we have $2^{24}$ words. This means that we need $log_{2}2^{24} = 24$ bits, <mark>to address each word.</mark>

## Memory types

> [!figure]
$$
\text{Memory }
\begin{cases}
    & \text{RAM}
    & \begin{cases}
        & \text{SRAM} \\
        & \text{DRAM}
    \end{cases} \\\\
    & \text{ROM}
    & \begin{cases}
        & \text{ROM} \\
        & \text{PROM} \\
        & \text{EPROM} \\
        & \text{EEPROM}
    \end{cases}
\end{cases}
$$

### RAM

**Random access memory** (RAM) makes up most of the main memory in a computer.

In a *random access* device, a data item can be accessed randomly—using the address of the memory location—<mark>without the need to access all data items located before it.</mark>

However, the term is confusing, because ROM can also be accessed randomly. What distinguishes RAM from ROM is that <mark>RAM can be read from and written to.</mark>

Another characteristic of RAM is that it is *volatile*: the information (program or data) is lost if the computer is powered down.

### SRAM

**Static RAM** (SRAM) technology

- Uses traditional flip-flop gates to hold data.
- Data is stored as long as the power is on.
- There is no need to refresh memory locations.

### DRAM

**Dynamic RAM** (DRAM) technology

- Uses capacitors, electrical devices that can store energy, for data storage.
    - If a capacitor is charged, the state is 1.
    - If it is discharged, the state is 0.
- Because a capacitor loses some of its charge with time, DRAM memory cells need to be refreshed periodically.

### ROM

The contents of **read-only memory** (ROM) are written by the manufacturer, and <mark>the CPU can read from, but not write to, ROM.</mark>

Its advantage is that it is *nonvolatile*—its contents are not lost if you turn off the computer.

Normally, it is used for programs or data that must not be erased or changed even if you turn off the computer. For example, some computers come with ROM that holds the boot program that runs when we switch on the computer.

### PROM

One variation of ROM is **programmable read-only memory** (PROM).

- This type of memory is blank when the computer is shipped.
- The user of the computer, with some special equipment, can store programs on it.
- When programs are stored, it behaves like ROM and cannot be overwritten.

### EPROM

A variation of PROM is **erasable programmable read-only memory** (EPROM).

- It can be programmed by the user, but can also be erased with a special device that applies ultraviolet light.
- To erase EPROM memory *requires physical removal* and reinstallation of the EPROM.

### EEPROM

A variation of EPROM is **electrically erasable programmable read-only memory** (EEPROM).

- EEPROM can be programmed and erased using electronic impulses *without being removed* from the computer.

## Memory hierarchy

- Use a very small amount of costly high-speed memory where speed is crucial. The *registers* inside the CPU are of this type.
- Use a moderate amount of medium-speed memory to store data that is accessed often. *Cache memory*, discussed next, is of this type.
- Use a large amount of low-speed memory for data that is accessed less often. *Main memory* is of this type.

## Cache memory

**Cache memory** is faster than main memory but slower than the CPU and its registers. Cache memory, which is normally small in size, is placed between the CPU and main memory.

Cache memory at any time contains a copy of a portion of main memory. When the CPU needs to access a word in main memory, it follows this procedure:

1. The CPU checks the cache.
2. If the word is there, it copies the word: if not, the CPU accesses main memory and copies a block of memory starting with the desired word. This block replaces the previous contents of cache memory.
3. The CPU accesses the cache and copies the word.

It has been observed that most computers typically spend 80 percent of their time accessing only 20 percent of the data. Cache memory, with its high speed, can hold this 20 percent to make access faster at least 80 percent of the time.

> [!example]
> 【台聯大】【107】【計算機概論】【20】
>
> ---
>
> $Q:$
>
> In computer system hardware, which of following item is *the fastest* and most expensive form of storage and comparatively small?
>
> ---
>
> $Ans:$
>
> Register $>$ Cache (L1-L3: SRAM, L4: DRAM) $>$ Main memory (DRAM) $>$ Disk
