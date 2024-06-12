# 【7-2】Evolution

- **Batch systems**

    Each program to be executed was called a job. A programmer who wished to execute a job sent a request to the operating room along with punched cards for the program and data.

- **Time-sharing systems**

    To use computer system resources efficiently, **multiprogramming** was introduced. The idea is to hold several jobs in memory at a time, and only assign a resource to a job that needs it on the condition that the resource is available. For example, when one program is using an input/output device, the CPU is free and can be used by another program.

    Multiprogramming brought the idea of **time sharing**: resources could be shared between different jobs, with each job being allocated a portion of time to use a resource.

    Multiprogramming, and eventually time sharing, improved the efficiency of computer systems tremendously. However, they required a more complex operating system. The operating system now had to do **scheduling**: allocating resources to different programs and deciding which program should use which resource, and when.

    During this era, the relationship between a computer and a user also changed. The user could directly interact with the system without going through an operator. A new term was also coined: **process**. A job is a program to be run, while a process is a program that is in memory and waiting for resources.

- **Personal systems**

    During this era, **single-user operating systems** such as DOS (Disk Operating System) were introduced.

- **Parallel systems**

    Multiple CPUs on the same machine. Each CPU can be used to serve one program or a part of a program, which means that many tasks can be accomplished in parallel instead of serially.

- **Distributed systems**

    A program can be run partially on one computer and partially on another if they are connected through an internetwork such as the Internet. In addition, resources can be distributed. A program may need files located in different parts of the world.

    例如：透過網路連接志願者的個人電腦進行資料傳輸，並利用閒置的計算能力以較小的成本達到如超級電腦般的效果。

    > [!example]
    > 【台聯大】【106】【計算機概論】【5】
    >
    > ---
    >
    > $Q:$
    >
    > What is the reason for building a Distributed System?
    >
    > ---
    >
    > $Ans:$
    >
    > Resource sharing, Speed up and Communication.

- **Real-time systems**

    A real-time system is expected to do a task within specific time constraints. They are used with real-time applications, which monitor, respond to, or control external processes or environments. Examples can be found in traffic control, patient monitoring, or military control systems.
