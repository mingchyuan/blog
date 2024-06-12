# 【7-3】Components

> [!figure]
$$
\text{OS }
\begin{cases}
& \begin{array}{c} \text{Memory} \\ \text{manager} \end{array} \quad
\begin{cases}
    & \text{Monoprogramming} \\\\
    & \begin{array}{c} \text{Multi-} \\ \text{programming} \end{array}
    \begin{cases}
        \begin{array}{c} & \text{Nonswapping} \end{array}
        \begin{cases}
            & \begin{array}{c}
                \text{Partitioning}
                \left\{ \ \begin{array}{c} \small\text{事先分割記憶體成可變長度的區域} \\ \small\text{需處理新程式取代舊程式產生的洞} \end{array} \ \right\}
            \end{array} \\\\
            & \begin{array}{c}
                \text{Paging}
                 \left\{ \ \begin{array}{c} \small\text{除了記憶體被分割為 frames} \\ \small\text{也將程式分割為 pages} \\ \small\text{整個程式儲存在不連續的記憶體空間} \end{array} \ \right\}
            \end{array}
        \end{cases} \\\\
        \begin{array}{c}
            \text{Swapping} \\ \small\text{(Virtual memory)}
        \end{array}
        \begin{cases}
            & \begin{array}{c} \text{Demand} \\ \text{paging} \end{array}
            \left\{ \ \begin{array}{c} \small\text{載入 page 至記憶體並執行} \\ \small\text{再以另一 page 取代後執行} \\ \small\text{不一定要同 frame} \end{array} \ \right\} \\\\
            & \begin{array}{c} \text{Demand} \\ \text{segmentation} \end{array}
            \left\{ \ \begin{array}{c} \small\text{模組較符合人類思考} \\ \small\text{例如主程式與副程式} \\ \small\text{將程式分割成 segments} \end{array} \ \right\}
        \end{cases}
    \end{cases}
\end{cases} \\\\\\
& \begin{array}{c} \text{Process} \\ \text{manager} \end{array} \quad
\begin{cases}
    & \begin{array}{c} \text{Program} \\ \small\text{(儲存在硬碟的程式)} \end{array}
    \longleftrightarrow
    \begin{array}{c} \text{Job} \\ \small\text{(被選擇要執行的程式)} \end{array}
    \longleftrightarrow
    \begin{array}{c} \text{Process} \\ \small\text{(正在執行的程式)} \end{array} \\\\
    & \begin{array}{c} \text{Job} \\ \text{scheduler} \end{array} \quad
    \begin{cases}
        & \begin{array}{c} \text{Hold} \\ \small\text{(Job)} \end{array}
        \xrightarrow{\text{載入記憶體中} \quad}
        \begin{array}{c} \text{Ready} \\ \small\text{(Process)} \end{array} \\\\
        & \begin{array}{c} \text{Running} \\ \small\text{(Process)} \end{array}
        \xrightarrow{\text{行程執行完畢} \quad}
        \begin{array}{c} \text{Terminated} \\ \small\text{(Job)} \end{array}
    \end{cases} \\\\
    & \begin{array}{c} \text{Process} \\ \text{scheduler} \end{array} \quad
    \begin{cases}
        & \begin{array}{c} \text{Ready} \longleftrightarrow \text{Running} \\ \small\text{(分配 CPU 時間片段給行程使用)} \end{array} \\\\
        & \text{Running} \xrightarrow{\text{行程需要 I/O 資源} \quad} \text{Waiting} \xrightarrow{\text{I/O 動作完成} \quad} \text{Ready}
    \end{cases} \\\\
    & \begin{array}{c}
        \text{Queues} \\
        \left( \ \begin{array}{c} \small\text{程式不只一個} \\ \small\text{彼此競爭資源} \end{array} \ \right)
    \end{array} \quad
    \begin{cases}
        & \begin{array}{l} \text{Job queue} \\ \small\text{(排隊等待配置記憶體的 Job)} \end{array} \\\\
        & \begin{array}{l} \text{Ready queue} \\ \small\text{(排隊等待 CPU 的 Process)} \end{array} \\\\
        & \begin{array}{l} \text{I/O queue} \\ \small\text{(排隊等待使用 I/O 的 Process)} \end{array}
    \end{cases} \\\\
    & \text{Deadlock & Starvation}
\end{cases} \\\\\\
& \text{Device manager} \\\\
& \text{File manager} \\\\
& \text{User interface / Shell}
\end{cases}
$$

## User interface

Each operating system has a **user interface**, a program that accepts requests from users (processes) and interprets them for the rest of the operating system.

A user interface in some operating systems, such as UNIX, is called a **shell**. In others, it is called a window to denote that it is menu driven and has a **GUI** (**graphical user interface**) component.

## Memory manager

Memory allocation must be managed to prevent applications from running out of memory. Operating systems can be divided into two broad categories of memory management:

- Monoprogramming
- Multiprogramming

### Monoprogramming

In **monoprogramming**, most of the memory capacity is dedicated to a single program (we consider the data to be processed by a program as part of the program): only a small part is needed to hold the operating system.

In this configuration, the whole program is in memory for execution. When the program finishes running, the program area is occupied by another program.

> [!figure]
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     nodesep=0;
>     node [shape=plaintext];
>     ml [label="Memory"];
>     node [shape=record, margin=0.2];
>     m [label=" Operating\nsystem | \nProgram\n&nbsp; "];
>     {rank=same; m; ml;}
> }
> ```

However, there are several problems with this technique:

- The program must fit into memory. If the size of memory is less than the size of the program, the program cannot be run.
- When one program is being run, no other program can be executed. A program, during its execution, often needs to receive data from input devices and needs to send data to output devices. Input/output devices are slow compared with the CPU, so <mark>when the input/output operations are being carried out, the CPU is idle.</mark> It cannot serve another program because this program is not in memory. This is a very inefficient use of memory and CPU time.

### Multiprogramming

In **multiprogramming**, more than one program is in memory at the same time, and they are executed concurrently, with the CPU switching rapidly between the programs.

> [!figure]
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     nodesep=0;
>     node [shape=plaintext];
>     ml [label="Memory"];
>     node [shape=record, margin=0.2];
>     m [label=" Operating\nsystem | Program 1 | Program 2 | Program 3 "];
>     {rank=same; m; ml;}
> }
> ```

Categories of multiprogramming:

- Nonswapping:

    <mark>The program remains in memory for the duration of execution.</mark>

    - Partitioning
    - Paging

- *Swapping*:

    <mark>During execution, the program can be swapped between memory and disk one or more times.</mark>

    - Demand paging
    - Demand segmentation

    > [!example]
    > 【台聯大】【109】【計算機概論】【3】
    >
    > ---
    >
    > $Q:$
    >
    > Which of the following is *not true* in memory management?
    >
    > ---
    >
    > $Ans:$
    >
    > (A) Demand segmentation uses swapping.
    >
    > (B) In monoprogramming, most of the memory capacity is dedicated to a single program.
    >
    > **(C)** The paging approach uses the technique of virtual memory.  
    > $\quad$ <code>Demand paging 與 Demand segmentation 才會使用到虛擬記憶體。</code>
    >
    > (D) In demand paging, a program is divided into equally sized pages.
    >
    > (E) Partitioning is a multiprogramming approach.

#### Partitioning

The first technique used in multiprogramming is called **partitioning**. In this scheme, <mark>memory is divided into variable-length sections. Each section or partition holds one program. The CPU switches between programs.</mark>

It starts with one program, executing some instructions <mark>until it either encounters an input/output operation or the time allocated for that program has expired.</mark> The CPU then saves the address of the memory location where the last instruction was executed and moves to the next program. The same procedure is repeated with the second program. After all the programs have been served, the CPU moves back to the first program. Priority levels can also be used to control the amount of CPU time allocated to each program.

With this technique, each program is entirely in memory and occupying contiguous locations. Partitioning improves the efficiency of the CPU, but there are still some issues:

- The size of the partitions has to be determined beforehand by the memory manager. If partition sizes are small, some programs cannot be loaded into memory. If partition sizes are large, there might be some "*holes*" (unused locations) in memory.
- Even if partitioning is perfect when the computer is started, there may be some holes after completed programs are replaced by new ones.
- When there are many holes, the memory manager can compact the partitions to remove the holes and create new partitions, but this creates extra overhead on the system.

##### Fragmentation

?> 參考資料：<a>Operating System Concepts, 10th Edition</a>

- External fragmentation:

    將記憶體分割成不同長度的區塊給 process 使用，新舊程式交替使用記憶體後，記憶體中的 process 間會產生ㄧ些小空間。而這些小空間加起來可能可以存放一個新的 process，但因為記憶體位置不連續，因此無法將新 process 存入記憶體中並執行。

- Internal fragmentation:

    在分割記憶體策略中，若有一個洞可以讓新的 process 使用，但會剩下 2 bytes 的洞，這時追蹤這個極小的洞耗費成本就太高了。因此採用分割固定大小的區塊避免此問題，這時當 process 以區塊為單位使用記憶體時，在區塊內多少都會有用不到的小空間。

判斷是 external 還是 internal，可以依據這些碎片空間是在「分割給 process 使用的空間」外部還是內部。

As processes are loaded and removed from memory, the free memory space is broken into little pieces. **External fragmentation** exists when there is enough total memory space to satisfy a request but the available spaces are not contiguous: storage is fragmented into a large number of small holes.

This fragmentation problem can be severe. In the worst case, we could have a block of free (or wasted) memory between every two processes. If all these small pieces of memory were in one big free block instead, we might be able to run several more processes.

Memory fragmentation can be internal as well as external.

Consider a *multiple-partition allocation scheme* with a *hole* of 18,464 bytes. Suppose that the next process requests 18,462 bytes. If we allocate exactly the requested block, we are left with a *hole* of 2 bytes. <mark>The overhead to keep track of this hole will be substantially larger than the hole itself.</mark>

The general approach to avoiding this problem is to <mark>break the physical memory into fixed-sized blocks</mark> and allocate memory in units based on block size. With this approach, the memory allocated to a process may be slightly larger than the requested memory. **Internal fragmentation**—unused memory that is internal to a partition.

One solution to the problem of external fragmentation is **compaction**. The goal is to shuffle the memory contents so as to place all free memory together in one large block.

> [!example]
> 【台聯大】【107】【計算機概論】【10】
>
> ---
>
> $Q:$
>
> Which of the following is correct if the memory allocated to a process is a little larger than the process?
>
> ---
>
> $Ans:$
>
> Internal fragmentation occurs.

#### Paging

**Paging** improves the efficiency of partitioning. In paging,

- Memory is divided into equally sized sections called **frames**.
- Programs are also divided, into equally sized sections called **pages**.

<mark>The size of a page and a frame is usually the same</mark> and equal to the size of the block used by the system to retrieve information from a storage device.

A page is loaded into a frame in memory. If a program has three pages, it occupies three frames in memory. With this technique, the program does not have to be contiguous in memory: <mark>two consecutive pages can occupy *noncontiguous* frames in memory.</mark>

The advantage of paging over partitioning is that two programs, each using three noncontiguous frames, can be replaced by one program that needs six frames. There is no need for the new program to wait until six contiguous frames are free before being loaded into memory.

Paging improves efficiency to some extent, but the whole program still needs to be in memory before being executed. This means that a program that needs six frames, for example, cannot be loaded into memory if there are currently only four unoccupied frames.

> [!example]
> 【台聯大】【112】【計算機概論】【3】  
> 【三等考試】【111】【計算機概論】【三、(一)】
>
> ---
>
> $Q:$
>
> 電腦的作業系統使用虛擬記憶體來管理記憶體，假設每個分頁 (page) 大小為 4 KB，總共有邏輯位址 (logical address) 空間共 256 分頁，而此電腦的實體記憶體總共只有 64 框 (frame)。則此電腦的邏輯位址、實體位址 (physical address) 分別是多少 bits？
>
> ---
>
> $Sol:$
>
> - 邏輯位址空間: $$4 \text{ KB} \times 256 = 2^2 \times 2^{10} \times 2^8 \text{ Bytes} = 2^{20} \text{ Bytes}$$
> - 實體位址空間: $$4 \text{ KB} \times 64 = 2^2 \times 2^{10} \times 2^6 \text{ Bytes} = 2^{18} \text{ Bytes}$$
>
> 假設每個位址能儲存 $1$ Byte 的資料 (也就是 [word][] 為 1 Byte)。則邏輯位址需要 $20$ bits 來定址；實體位址需要 $18$ bits。

[word]: /資訊工程/計算機概論/ch5/【5-3】main-memory

---

##### Logical vs. Physical Address Space

?> 參考資料：<a>Operating System Concepts, 10th Edition</a>

- An address generated by the CPU is commonly referred to as a **logical address** (**virtual address**).
- An address seen by the memory unit—that is, the one loaded into the *memory-address register* of the memory—is commonly referred to as a **physical address**.

Binding addresses at either compile or load time generates identical logical and physical addresses. However, <mark>the execution-time address-binding scheme results in differing logical and physical addresses.</mark>

- The set of all logical addresses generated by a program is a **logical address space**.
- The set of all physical addresses corresponding to these logical addresses is a **physical address space**.

The run-time mapping from virtual to physical addresses is done by a hardware device called the **memory-management unit (MMU)**.

> [!figure]
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     node [shape=rect];
>     "CPU" -> "MMU" [label="logical\naddress"];
>     "MMU" -> "physical\nmemory" [label="physical\naddress"];
> }
> ```

##### Translation Look-Aside Buffer

?> 參考資料：<a>Operating System Concepts, 10th Edition</a>

MMU 使用 page table 來處理 logical address 與 physical address 之間的對映。

新型電腦的 page table 通常都很大，不適合存在暫存器中，因此保存在記憶體中。但這會產生一個問題，為了存取 physical address，必須先存取一次在記憶體中的 page table 找到對映關係，才能存取該 physical address。這樣導致存取一個 word 需要做兩次的記憶體存取，速度慢上了一倍。

為了解決這個問題，建立一個了一個快取儲存常用的位址，這個快取稱為 **translation look-aside buffer** (**TLB**)。

TLB 只保存了一點點 page table 中的項目，如果在 TLB 中沒找到對映關係，也就是發生了 TLB miss，這時才會去 page table 尋找對映關係，並把這個資訊加入 TLB 中。

> [!example]
> 【台聯大】【106】【計算機概論】【25】
>
> ---
>
> $Q:$
>
> Which of the following statements are correct regarding Memory management?
>
> ---
>
> $Ans:$
>
> **(A)** The purpose of timing sharing is to increase user responsiveness.  
> $\quad$ `分時系統快速頻繁地切換行程，提高系統對於用戶操作的反應速度，達到即時的效果。`
>
> **(B)** Paging avoids the problem of external fragmentation of memory in a multi-programming environment.
>
> (C) Compaction could be used to solve problems caused by ~internal fragmentation~.  
> $\quad$ `Compaction 是用來解決 external fragmentation，聚集不連續、零散的記憶體。`
>
> (D) ~The physical memory~ implements the translation of a program's address space to physical addresses.  
> $\quad$ `memory-management unit (MMU) 會負責把程式用 CPU 產生的 logical address space 對映至 physical address space。`
>
> (E) When TLB (Translation Look-aside Buffer) cannot find the information the CPU is looking for, ~the OS will be awaken to load the correct TLB in the disc~.  
> $\quad$ `TLB miss 就只能去記憶體中的 page table 找對映關係，並將找到的對應關係加入 TLB 中。`

#### Demand paging

*Paging* does not require that the program be in contiguous memory locations, but it does require that the entire program be in memory for execution. **Demand paging** has removed this last restriction.

In demand paging the <mark>program is divided into pages, but the pages can be loaded into memory one by one, executed, and replaced by another page.</mark>

In other words, memory can hold pages from multiple programs at the same time. In addition, consecutive pages from the same program do not have to be loaded into the same frame—a page can be loaded into any free frame.

> [!example]
> 【台聯大】【107】【計算機概論】【19】
>
> ---
>
> $Q:$
>
> Which is the concept using by virtual memory when a process is copied into main memory from the secondary memory according to the requirement?
>
> ---
>
> $Ans:$
>
> Demand paging and Demand segmentation.

#### Demand segmentation

A technique similar to paging is segmentation.

In paging, a program is divided into equally sized pages, which is not the way a programmer thinks—a programmer thinks in terms of *modules*. As we will see in later chapters, a program is usually made up of a main program and subprograms.

In **demand segmentation**, the program is divided into **segments** that match the programmer's view. These are loaded into memory, executed, and replaced by another module from the same or a different program.

Since segments in memory are of equal size, part of a segment may remain empty.

#### Demand paging and segmentation

Demand paging and segmentation can be combined to further improve the efficiency of the system.

A segment may be too large to fit any available free space in memory. Memory can be divided into frames, and a module can be divided into pages. The pages of a module can then be loaded into memory one by one and executed.

### Virtual memory

Demand paging and demand segmentation mean that, when a program is being executed, part of the program is in memory and part is on disk.

> [!example]
> A memory size of 10 MB can execute ten programs, each of size 3 MB, for a total of 30 MB. At any moment, 10 MB of the ten programs are in memory and 20 MB are on disk. There is therefore an actual memory size of 10 MB, but a virtual memory size of 30 MB.

## Process manager

- **Program**:

    A program is a nonactive set of instructions <mark>stored on disk</mark> (or tape).

- **Job**:

    A program becomes a job from the moment <mark>it is selected for execution</mark> until it has finished running and becomes a program again.

    During this time a job may or may not be executed.

    <ul>
        <li>It may be located on disk waiting to be loaded to memory.</li>
        <li>It may be loaded into memory and waiting for execution by the CPU.</li>
        <li>It may be on disk or in memory waiting for an input/output event</li>
        <li>It may be in memory while being executed by the CPU.</li>
    </ul>

    The program is a job in all of these situations. When a job has finished executing (either normally or abnormally), it becomes a program and once again resides on the disk. The operating system no longer governs the program.

    Note that every job is a program, but not every program is a job.

- **Process**:

    A process is a program in execution. It is a program that has started but has not finished. In other words, a process is a job that is being run in memory. It has been selected among other waiting jobs and loaded into memory.

    A process may be executing or it may be waiting for CPU time. <mark>As long as the job is in memory, it is a process.</mark>

    Note that every process is a job, but not every job is a process.

> [!figure]
>
> ```graphviz
> digraph {
>     compound=true;
>     node [shape=rect, style=rounded, margin="0.3, 0.1"];
>     subgraph cluster1 {
>         label = "Program";
>         fontname="times-bold";
>         s0 [label="Inactive on the disk"];
>         subgraph cluster2 {
>             label = "Job";
>             fontname="times-bold";
>             s1 [label="Hold"];
>             s5 [label="Terminated"];
>             {rank=same; s1; s5;}
>             subgraph cluster3 {
>                 margin=30;
>                 label = "Process";
>                 fontname="times-bold";
>                 s2 [label="Ready"];
>                 s3 [label="Waiting"];
>                 s4 [label="Running"];
>                 {rank=same; s2; s4;}
>             }
>         }
>     }
> 
>     s0:sw -> s1;
>     s0:se -> s5 [dir=back];
>     s1 -> s2;
>     s2 -> s3:w [dir=back];
>     s3:e -> s4 [dir=back];
>     s2:ne -> s4:nw [minlen=4];
>     s4:sw -> s2:se;
>     s4 -> s5;
> }
> ```

1. A program becomes a job when selected by the operating system and brought to the **hold state**.
2. It remains in this state until it can be loaded into memory. When there is memory space available to load the program totally or partially, the job moves to the **ready state**.
3. It now becomes a process. It remains in memory and in this state <mark>until the CPU can execute it</mark>, moving to the **running state** at this time. When in the running state, one of three things can happen:
    - The process executes until it needs I/O resources, then goes into the **waiting state** and <mark>waits until I/O is complete.</mark>
    - <mark>The process exhausts its allocated time slot</mark>, then goes directly to the **ready state**.
    - The process terminates, then goes into the **terminated state** and is no longer a process.

A process can move between the running, waiting, and ready states many times before it goes to the terminated state.

Note that the diagram can be much more complex if the system uses virtual memory and swaps programs in and out of main memory.

> [!example]
> 【台聯大】【112】【計算機概論】【5】
>
> ---
>
> $Q:$
>
> Process 的三種狀態變化。

### Schedulers

To move a job or process from one state to another, the process manager uses two **schedulers**:

- **Job scheduler**

    The job scheduler moves a job

    <ul>
        <li>from the <em>hold</em> state to the <em>ready</em> state.</li>
        <li>from the <em>running</em> state to the <em>terminated</em> state.</li>
    </ul>

    In other words, a job scheduler is responsible for <mark>creating a process from a job and terminating a process.</mark>

- **Process scheduler**

    The process scheduler <mark>moves a process from one state to another.</mark>

    <ul>
        <li>It moves a process from the <em>running</em> state to the <em>waiting</em> state when the process is waiting for some event to happen.</li>
        <li>It moves the process from the <em>waiting</em> state to the <em>ready</em> state when the event has occurred.</li>
        <li>It moves a process from the <em>running</em> state to the <em>ready</em> state if the process' time allotment has expired.</li>
        <li>When the CPU is ready to run the process, the process scheduler moves the process from the <em>ready</em> state to the <em>running</em> state.</li>
    </ul>

    ---

    <p class="warn">參考資料：<a>Operating System Concepts, 10th Edition</a></p>

    The tasks associated with coordinating the execution of processes are handled by the **scheduler** and **dispatcher** within the operating system's kernel.

    The scheduler maintains a record of the processes present in the computer system, introduces new processes to this pool, and removes completed processes from the pool. Thus, when a user requests the execution of an application, it is the scheduler that adds the execution of that application to the pool of current processes.

    To keep track of all the processes, the scheduler maintains a block of information in main memory called the **process table**. Each time the execution of a program is requested, the scheduler creates a new entry for that process in the process table. This entry contains such information as

    <p>
    <ul>
        <li>the memory area assigned to the process (obtained from the memory manager),</li>
        <li>the priority of the process,</li>
        <li>and whether the process is ready or waiting.</li>
    </ul>
    </p>

    > [!example]
    > 【台聯大】【108】【計算機概論】【1】
    >
    > ---
    >
    > $Q:$
    >
    > Which of the following items of information would *not* be contained in an operating system's *process table*?
    >
    > ---
    >
    > $Ans:$
    >
    > (A) The location of the memory area assigned to the process.
    >
    > (B) The priority of each process.
    >
    > (C) Whether the process is ready or waiting.
    >
    > **(D)** The machine language instructions being executed by the process.  
    > $\quad$ <code>追蹤行程，但不需要知道該行程執行什麼指令。</code>

- Other schedulers

#### Scheduling Criteria

?> 參考資料：<a>Operating System Concepts, 10th Edition</a>

Different CPU-scheduling algorithms have different properties, and the choice
of a particular algorithm may favor one class of processes over another. In
choosing which algorithm to use in a particular situation, we must consider
the properties of the various algorithms.

Many criteria have been suggested for comparing CPU-scheduling algorithms.
Which characteristics are used for comparison can make a substantial
difference in which algorithm is judged to be best. The criteria include the
following:

- **CPU utilization**

    We want to keep the CPU as busy as possible. Conceptually, CPU utilization can range from 0 to 100 percent.

    In a real system, it should range from 40 percent (for a lightly loaded system) to 90 percent (for a heavily loaded system).

- **Throughput**

    If the CPU is busy executing processes, then work is being done. One measure of work is <mark>the number of processes that are completed per time unit</mark>, called throughput.

    For long processes, this rate may be one process over several seconds; for short transactions, it may be tens of processes per second.

- **Turnaround time**

    From the point of view of a particular process, the important criterion is how long it takes to execute that process. The interval from the time of submission of a process to the time of completion is the turnaround time. <mark>Turnaround time is the sum of the periods spent waiting in the ready queue, executing on the CPU, and doing I/O.</mark>

    > [!example]
    > 【台聯大】【107】【計算機概論】【30】
    >
    > ---
    >
    > $Q:$
    >
    > Which of following item(s) is *incorrect* about CPU Processing?
    >
    > ---
    >
    > $Ans:$
    >
    > (A) The processes that are stored in main memory and are ready and waiting to execute will be keep on a list called ready queue.
    >
    > (B) In priority scheduling algorithm the process with highest priority allocate CPU.
    >
    > (C) A process can move to a different classified ready queue in multilevel feedback scheduling algorithm.
    >
    > **(D)** ~User~ level thread can be scheduled by the kernel.  
    > $\quad$ <code>However, support for threads may be provided either at the user level, for user threads, or by the kernel, for kernel threads.</code>
    >
    > (E) The interval time from a process submit and complete time is called  turnaround time.

- **Waiting time**

    The CPU-scheduling algorithm does not affect the amount of time during which a process executes or does I/O. It affects only the amount of time that a process spends waiting in the ready queue. <mark>Waiting time is the sum of the periods spent waiting in the *ready queue*.</mark>

- **Response time**

    In an interactive system, turnaround time may not be the best criterion. Often, a process can produce some output fairly early and can continue computing new results while previous results are being output to the user. Thus, another measure is the time from the submission of a request until the first response is produced. This measure, called response time, is the time it takes to start responding, not the time it takes to output the response.

It is desirable to maximize CPU utilization and throughput and to minimize turnaround time, waiting time, and response time. In most cases, we optimize the average measure. However, under some circumstances, we prefer to optimize the minimum or maximum values rather than the average. For example, to guarantee that all users get good service, we may want to minimize the maximum response time.

#### Scheduling Algorithms

?> 參考資料：<a>Operating System Concepts, 10th Edition</a>

- **First-Come, First-Served Scheduling** (先來先做)

    Note also that the FCFS scheduling algorithm is *nonpreemptive* (不可搶先). Once the CPU has been allocated to a process, that process keeps the CPU until it releases the CPU, either by terminating or by requesting I/O.

- **Shortest-Job-First Scheduling** (最短的工作先做)

- **Round-Robin Scheduling** (依序循環)

    The round-robin (RR) scheduling algorithm is similar to FCFS scheduling, but *preemption* is added to enable the system to switch between processes

- **Priority Scheduling**

- **Multilevel Queue Scheduling**

- **Multilevel Feedback Queue Scheduling**

> [!example]
> 【台聯大】【106】【計算機概論】【23】
>
> ---
>
> $Q:$
>
> Choose the following items that are correct regarding CPU scheduling?
>
> ---
>
> $Ans:$
>
> (A) In a time sharing system, the most suitable criterion for CPU scheduling is to ~maximize the CPU utilization~.  
> $\quad$ `應該是 waiting time (在 ready queue 中等待 CPU 的時間，與 waiting state 無關)，畢竟分時系統讓 CPU 頻繁切換於各行程之間。`
>
> **(B)** A round robin scheduling algorithm should be preemptive.  
>
> **(C)** If a process is terminated with some exit value in the UNIX operating system, the system call `wait()` in the parent process can be used to obtain the value.  
>
> (D) The shortest-job-first algorithm can be implemented for the ~short-term~ CPU scheduling.  
> $\quad$ `SJF經常使用在長程排班。`
>
> (E) Processes in the waiting status will wait for the ~CPU~ resources.  
> $\quad$ `I/O`

---

### Queuing

In reality, there are many jobs and many processes competing with each other for computer resources. For example,

- When some jobs are in memory, others must wait until space is available.
- When a process is running using the CPU, others must wait until the CPU is free.

To handle multiple processes and jobs, the process manager uses **queues** (waiting lists).

A *job control block* or *process control block* is associated with each job or process. This is a block of memory that stores information about that job or process. The process manager stores the job or process control block in the queues instead of the job or process itself. <mark>The job or process itself remains in memory or disk, as it is too big to be duplicated in a queue</mark>: the job control block or process control block is the representative of the waiting job or process.

An operating system can have several queues. For example,

- The **job queue** holds the jobs that are waiting for memory.
- The **ready queue** holds the processes that are in memory, ready to be run and waiting for the CPU.
- The **I/O queue** holds the processes that are waiting for an I/O device (there can be several I/O queues, one for each input/output device).

The process manager can have different policies for selecting the next job or process from a queue: it could be

- First in, first out (FIFO)
- Shortest length first
- Highest priority first
- $etc.$

### Process synchronization

The whole idea behind process management is to synchronize different processes with different resources.

Whenever resources can be used by more than one user (or process, in this case), we can have two problematic situations:

- **Deadlock**
- **Starvation**

#### Deadlock

Files in most systems are not sharable—when in use
by one process, a file cannot be used by another process. If there is no provision in this
situation to force a process to release a file, **deadlock** is created.

> [!figure]
>
>```graphviz
> digraph {
>     rankdir="LR";
>     node [shape=note];
>     file1;
>     file2;
>     node [shape=circle];
>     A;
>     B;
>     {rank=same; A; B;}
>     file1:n -> A [style=dashed, label="Is assigned to"];
>     A -> file2:n [label="Has requested"];
>     file2:s -> B [style=dashed, label="Is assigned to"];
>     B -> file1:s [label="Has requested"];
>     
>     A -> B [style=invis, minlen=4];
> }
> ```

Deadlock occurs if the operating system allows a process to start running without first checking to see if the required resources are ready, and allows a process to hold a resource as long as it wants.

There should be some provision in the system to prevent deadlock.

1. One solution is not to allow a process to start running until the required resources are free, but we will see later that this creates another problem (*Starvation*).
2. The second solution is to limit the time a process can hold a resource

There are four *necessary conditions* for deadlock as shown below:

- Mutual exclusion: <mark>Only one process can hold a resource.</mark>
- Resource holding: <mark>A process holds a resource even though it cannot use it until other resources are available.</mark>
- No preemption: <mark>The operating system cannot temporarily reallocate a resource.</mark>
- Circular waiting: <mark>All processes and resources involved form a loop.</mark>

> [!example]
> 【台聯大】【112】【計算機概論】【19】
>
> ---
>
> $Q:$
>
> 死結的必要條件有哪些？

All four conditions are required for deadlock to occur. However, these conditions are only necessary preconditions, and are not sufficient to cause deadlock of themselves—they must be present for deadlock, but they might not be enough to cause it. If one of these conditions is missing, deadlock cannot occur. This gives us a method for preventing or avoiding deadlock: do not allow one of these conditions to happen.

##### Resource-Allocation Graph

?> 參考資料：<a>Operating System Concepts, 10th Edition</a>

- If the graph contains no cycles, then no thread in the system is deadlocked.
- If the graph does contain a cycle, then a deadlock *may* exist.
    - If each resource type has exactly one instance, then a cycle implies that a deadlock has occurred.
    - If the cycle involves only a set of resource types, each of which has only a single instance, then a deadlock has occurred.
    - If each resource type has several instances, then a cycle does not necessarily imply that a deadlock has occurred.

> [!example]
> 【台聯大】【106】【計算機概論】【24】
>
> ---
>
> $Q:$
>
> Choose the following items that are *not* correct regarding deadlock.
>
> ---
>
> $Ans:$
>
> **(A)** In case that there exists a cycle in resource-allocation graph, it will always in deadlock situation.  
> $\quad$ `四種必要條件同時出現，才會發生死結。`
>
> **(B)** A computer has 9 tapes drives, with n process competing for them. Each process may need at most 3 drives at the same time. 3 is the maximum value of n that keeps the system deadlock free.  
> $\quad$ `舉反例，只要兩個行程就可以造成死結了。例如，A行程需要 t1, t2, t3；B行程需要 t2, t3, t4，此時 A 與 B 若分別取得 t2 跟 t3，就會導致死結。`
>
> ~**(C)**~ If there is a cycle of resource allocation graph for a system with single instance resource, it will be in a deadlock state.  
> $\quad$ `每個資源都只有一個實例，加上有循環產生，應該會發生死結才對。但沒人對此題提出疑義。`
>
> **(D)** If a system is not in the safe state, it will be in a deadlock state.  
> $\quad$ `分為安全、不安全以及死結狀態。不安全狀態才「有可能」發生死結。`
>
> (E) There are 4 necessary conditions for a deadlock: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Waiting. It will be deadlock free if one of the above necessary conditions is not established

##### Safe State

?> 參考資料：<a>Operating System Concepts, 10th Edition</a>

- A **safe state** is not a deadlocked state.
- A **deadlocked state** is an unsafe state.
- Not all **unsafe states** are deadlocks. An unsafe state *may* lead to a deadlock.

#### Starvation

**Starvation** is the opposite of deadlock. It can happen when the operating system puts too many resource restrictions on a process.

<mark>For example, imagine an operating system that specifies that a process must have possession of its required resources before it can be run.</mark>

Imagine that

1. Process $A$ needs two files, $\text{File}_1$ and $\text{File}_2$.
2. $\text{File}_1$ is being used by process $B$.
3. $\text{File}_2$ is being used by process $E$.
4. Process $B$ terminates first and releases $\text{File}_1$.
5. Process $A$ cannot be started, because $\text{File}_2$ is still not available.
6. At this moment, process $C$, which needs only $\text{File}_1$, is allowed to run.
7. Now process $E$ terminates and releases $\text{File}_2$, but process $A$ still cannot run because $\text{File}_1$ is unavailable.

## Device manager

The **device manager**, or **input/output manager**, is responsible for access to input/output devices. There are limitations on the number and speed of input/output devices in a computer system. Because these devices are slower in speed compared with the CPU and memory, when a process accesses an input/output device, the device is not available to other processes for a period of time. The device manager is responsible for the efficient use of input/output devices.

We can briefly list the responsibilities of a device manager:

- The device manager monitors every input/output device constantly to ensure that the device is functioning properly. The manager also needs to know when a device has finished serving one process and is ready to serve the next process in the queue.
- The device manager maintains a queue for each input/output device or one or more queues for similar input/output devices. For example, if there are two fast printers in the system, the manager can have one queue for each or one queue for both.
- The device manager controls the different policies for accessing input/output devices.
For example, it may use FIFO for one device and shortest length first for another.

## File manager

Operating systems today use a **file manager** to control access to files.

Here is a brief list of the responsibilities of a file manager:

- The file manager controls access to files. Access is permitted only by permitted applications and/or users, and the type of access can vary. For example,
    - A process (or a user that calls a process) may be allowed to read from a file but is not allowed to write to it (that is, change it).
    - Another process may be allowed to execute a file and a process, but not allowed to read its contents, and so on.
- The file manager supervises the creation, deletion, and modification of files.
- The file manager can control the naming of files.
- The file manager supervises the storage of files: how they are stored, where they are stored, and so on.
- The file manager is responsible for archiving and backups.
