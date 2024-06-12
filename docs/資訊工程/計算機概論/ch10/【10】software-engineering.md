# 【10】Software Engineering

## Development process models

The development process in the software lifecycle involves four phases:

- Analysis
- Design
- Implementation
- Testing

There are several models for the development process. We discuss the two most common here:

- The **waterfall model**

    In this model, the development process flows in only one direction. This means that <mark>a phase cannot be started until the previous phase is completed.</mark>

    > [!example]
    > 【台聯大】【108】【計算機概論】【5】
    >
    > ---
    >
    > $Q:$
    >
    > Which of the following software engineering methodologies is the most *rigid*?
    >
    > ---
    >
    > $Ans:$
    >
    > Waterfall model.

- The **incremental model**

    In the incremental model, software is developed in a series of steps.

    The developers first complete a simplified version of the whole system. This version represents the entire system but does not include the details.

    In the second version, more details are added, while some are left unfinished, and the system is tested again. If there is a problem, the developers know that the problem is with the new functionality. They do not add more functionality until the existing system works properly. This process continues until all required functionality has been added.

## Analysis Phase

The development process starts with the **analysis phase**. This phase results in a specification document that <mark>shows what the software will do</mark> without specifying how it will be done.

- Procedure-oriented analysis
    - Data flow diagrams
    - Entity–relationship diagrams
    - State diagrams
- Object-oriented analysis

    使用 **Unified Modeling Language (UML)** 來完成以下分析：

    <p>
    <ul>
        <li>Use-case diagrams</li>
        <li>Class diagrams</li>
        <li>State chart</li>
    </ul>
    </p>

    > [!example]
    > 【台聯大】【108】【計算機概論】【6】
    >
    > ---
    >
    > $Q:$
    >
    > Which of the following is a notational system for representing object-oriented designs?
    >
    > ---
    >
    > $Ans:$
    >
    > UML.

## Design Phase

The **design phase** <mark>defines how the system will accomplish what was defined in the analysis phase.</mark> In the design phase, all components of the system are defined.

- Procedure-oriented design
    - Structure charts
    - **Modularity**

    Modularity means breaking a large project into smaller parts that can be understood and handled easily. In other words, modularity means dividing a large task into small tasks that can communicate with each other.

    There are two main concerns when a system is divided into modules:

        - **Coupling**

            Coupling is a measure of how tightly two modules are bound to each other. The more tightly coupled, the less independent they are. Since the objective is to <mark>make modules as independent as possible</mark>, we want them to be *loosely coupled*. There are at least three reasons why loose coupling is desirable.

            - Loosely coupled modules are more likely to be reusable.
            - Loosely coupled modules are less likely to create errors in related modules.
            - When the system needs to be modified, loosely coupled modules allow us to modify only modules that need to be changed without affecting modules that do not need to change.

        - **Cohesion**

            Another issue in modularity is cohesion. Cohesion is a measure of how closely the modules in a system are related. We need to have maximum possible cohesion between modules in a software system.

- Object-oriented design

    In object-oriented design, the design phase continues by elaborating the details of classes.

## Implementation Phase

In the waterfall model, after the design phase is completed, the **implementation phase** can start. In this phase the programmers

- write the code for the modules in procedure-oriented design.
- write the program units to implement classes in object-oriented design.

There are several issues to mention in each case.

- Choice of language
- Software quality
    - Operability
        - Accuracy
        - Efficiency
        - Reliability
        - Security
        - Timeliness
        - Usability
    - Maintainability
        - Changeability
        - Correctability
        - Flexibility
        - Testability
    - Transferability
        - Reusability
        - Interoperability
        - Portability

## Testing Phase

The goal of the **testing phase** is to find errors, which means that a good testing strategy is the one that finds most errors. There are two types of testing:

- **Glass-box**

    Glass-box testing (or **white-box testing**) is based on knowing the internal structure of the software.

    Glass-box testing that uses the structure of the software is required to guarantee that at least the following four criteria are met:

    <ul>
        <li>All independent paths in every module are tested at least once.</li>
        <li>All the decision constructs (two-way and multiway) are tested on each branch.</li>
        <li>Each loop construct is tested.</li>
        <li>All data structures are tested.</li>
    </ul>

    Several testing methodologies have been designed in the past. We briefly discuss two of them:

    <p>
    <ul>
        <li><strong>Basis path testing</strong></li>
        <li><strong>Control structure testing</strong></li>
    </ul>
    </p>

    > [!example]
    > 【台聯大】【109】【計算機概論】【23】
    >
    > ---
    >
    > $Q:$
    >
    > Which of the following is a white box (glass box) testing in software engineering?
    >
    > ---
    >
    > $Ans:$
    >
    > Basis path testing.

- **Black-box**

    Black-box testing gets its name from the concept of testing software without knowing what is inside it and without knowing how it works.

    Several methods are used in black-box testing, discussed below.

    - **Exhaustive testing**
    - **Random testing**
    - **Boundary-value testing**

## Documentation

- User documentation

    To run the software system properly, the users need documentation, traditionally called a *user guide*, that shows how to use the software step by step.

- System documentation

    System documentation defines the software itself. It should be written so that the software can be maintained and modified by people other than the original developers. System documentation should exist for all four phases of system development.

- Technical documentation

    Technical documentation describe the installation and the servicing of the software system.

    - Installation documentation defines how the software should be installed on each computer.
    - Service documentation defines how the system should be maintained and updated if necessary.
