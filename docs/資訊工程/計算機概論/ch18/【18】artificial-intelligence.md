# 【18】Artificial Intelligence

## Introduction

If the interrogator cannot definitely tell which set has come from the computer and which from the human, the computer has passed the **Turing test** for intelligent behavior.

An **intelligent agent** is a system that perceives its environment, learns from it, and interacts with it intelligently. Intelligent agents can be divided into two broad categories:

- Software agents
- Physical agents (robot)

Two languages are specifically designed for AI:

- LISP
- PROLOG

## Knowledge Representation

If an artificial agent is supposed to solve some problems related to the real world, it needs to be able to represent knowledge somehow.

Facts are represented as data structures that can be manipulated by programs stored inside the computer. In this section, we describe four common methods for representing knowledge:

- Semantic networks
- Frames
- Predicate logic
- Rule-based systems

### Semantic networks

A **semantic network** uses *directed graphs* to represent knowledge.

Semantic networks use

- Vertices to represent concepts.

    A concept can be thought of as a set or a subset.

- Edges to represent the relation between two concepts.

    - An edge can define a subclass relation—the edge is directed from the subclass to its superclass.
    - An edge can also define an instance relation—the edge is directed from the instance to the set to which it belongs.
    - An edge can also define an attribute of an object (color, size, …).
    - An edge can define a property of an object, such as possessing another object.
    - One of the most important relations that can be well defined in a semantic network is inheritance.

A simple semantic network:

> [!figure]
>
> ```graphviz
> digraph {
>     splines=line;
>     node [shape=plaintext];
>     Animal -> Reptile [dir=back, xlabel="Subclass   "];
>     Animal -> Mammal [dir=back, label=" Subclass"];
>     Mammal -> Head [label="has"];
>     Mammal -> Dog [dir=back, label="   Subclass"];
>     Dog -> Roxy [dir=back, xlabel=" Instance"];
>     Dog -> Ringo [dir=back, label=" Instance"];
>     Ringo -> Male [label="Is"];
>     Roxy -> Female [label="Is"];
>     {rank=same; Reptile; Mammal; Head;}
>     {rank=same; Roxy; Ringo; Male; Female;}
> }
> ```

### Frames

Frames are closely related to semantic networks.

- In semantic networks, a *graph* is used to represent knowledge
- In frames, *data structures (records)* are used to represent the same knowledge.

One advantage of frames over semantic networks is that programs can handle frames more easily than semantic networks.

### Propositional logic

**Propositional logic** is a language <mark>made up from a set of sentences</mark> that can be used to carry out logical reasoning about the world.

#### Operators

| Operators  |   Description   |
| :--------: | :-------------: |
|   $\neg$   |       not       |
|   $\lor$   |       or        |
|  $\land$   |       and       |
| $\implies$ | if $\dots$ then |
|   $\iff$   | if and only if  |

Truth table:

| $A$ | $\neg A$ |
| :-: | :------: |
|  F  |    T     |
|  T  |    F     |

| $A$ | $B$ | $A \lor B$ | $A \land B$ | $A \implies B$ | $A \iff B$ |
| :-: | :-: | :--------: | :---------: | :------------: | :--------: |
|  F  |  F  |     F      |      F      |       T        |     T      |
|  F  |  T  |     T      |      F      |       T        |     F      |
|  T  |  F  |     T      |      F      |       F        |     F      |
|  T  |  T  |     T      |      T      |       T        |     T      |

#### Sentence

A sentence in this language is defined recursively as shown below:

1. An uppercase letter, such as $A,\ B,\ S, \text{ or } T$, that represents a statement in a natural languages, is a sentence.
2. Any of the two constant values (`true` and `false`) is a sentence.
3. If $P$ is a sentence, then $\neg P$ is a sentence.
4. If $P$ and $Q$ are sentences, then $P \lor Q,\ P \land Q,\ P \implies Q, \text{ and } P \iff Q$ are sentences.

> [!example]
> The following are sentences in propositional language:
$$
\begin{align}
S & = \text{Today is Sunday.} \\
M & = \text{Today is Monday.} \\
S \lor M & = \text{Today is Sunday or Monday.} \\\\
R & = \text{It is raining.} \\
\neg R & = \text{It is not raining.} \\\\
D & = \text{Dog is a mammal.} \\
C & = \text{Cat is a mammal.} \\
D \implies C & = \text{If a dog is a mammal then a cat is a mammal.}
\end{align}
$$

#### Deduction

In AI we need to create new facts from the existing facts.

In propositional logic, the process is called **deduction**. Given two presumably true sentences, we can deduce a new true sentence. The first two sentences are called **premisses**: the deduced sentence is called the **conclusion**. The whole is called an **argument**.

> [!example]
$$
\begin{align}
\text{Premiss 1}  & : \text{Either he is at home or at the office.} \\
\text{Premiss 2}  & : \text{He is not at home.} \\
\text{Conclusion} & : \text{Therefore, he is at the office.}
\end{align}
$$
> If we use
$$
\begin{align}
H & = \text{He is at home.} \\
O & = \text{He is at office.} \\
\vdash & : \text{therefore}
\end{align}
$$
> then we can show the above argument as:
$$
\{ H \lor O, \neg H \} \vdash O
$$

The question is how we can prove if a deductive argument is *valid*. A valid deductive argument is an argument whose conclusions follow necessarily from its premisses. In other words, <mark>in a valid deductive argument, it is impossible for the conclusion to be false while its premisses all are true.</mark>

One way to do this is to create a *truth table* for the premisses and the conclusion. A conclusion is invalid if we can find a *counterexample case*: <mark>a case in which both premisses are true, but the conclusion is false.</mark>

> [!example]
>
> |     |     |  Premiss   | Premiss  | Conclusion |
> | :-: | :-: | :--------: | :------: | :--------: |
> | $H$ | $O$ | $H \lor O$ | $\neg H$ |    $O$     |
> |  F  |  F  |     F      |    T     |     F      |
> |  F  |  T  |    *T*     |   *T*    |    *T*     |
> |  T  |  F  |     T      |    F     |     F      |
> |  T  |  T  |     T      |    F     |     T      |
>
> The only row to be checked is the second row. This row does not show a counterexample, so the argument is *valid*.

There are however arguments that are not logically valid.

> [!example]
$$
\begin{align}
\text{Premiss 1}  & : \text{If she is rich, she has a car.} \\
\text{Premiss 2}  & : \text{She has a car.} \\
\text{Conclusion} & : \text{Therefore, she is rich.}
\end{align}
$$
$$
\begin{align}
R & = \text{She is rich.} \\
C & = \text{She has a car.}
\end{align}
$$
> The argument $\{ R \implies C, C \} \vdash R$ is not valid because a counterexample can be found:
>
> |     |     |    Premiss     | Premiss | Conclusion |
> | :-: | :-: | :------------: | :-----: | :--------: |
> | $R$ | $C$ | $R \implies C$ |   $C$   |    $R$     |
> |  F  |  F  |       T        |    F    |     F      |
> |  F  |  T  |      *T*       |   *T*   |    *F*     |
> |  T  |  F  |       F        |    F    |     T      |
> |  T  |  T  |      *T*       |   *T*   |    *T*     |
>
> Here row 2 and row 4 need to be checked. Although row 4 is ok, row 2 shows a counterexample (two true premisses result in a false conclusion). The argument is therefore *invalid*.

?> An argument is valid if no counterexample can be found.

### Predicate logic

In propositional logic, a symbol that represents a sentence is atomic: it cannot be broken up to find information about its components. For example, consider the sentences:

$$
\begin{align}
P_1 & : \text{Linda is Mary's mother} \\
P_2 & : \text{Mary is Anne's mother} \\
\end{align}
$$

We can combine these two sentences in many ways to create other sentences, but we cannot extract any relation between Linda and Anne. For example, we cannot infer from the above two sentences that Linda is the grandmother of Anne. To do so, we need **predicate logic**: the logic that defines the relation between the parts in a proposition.

In predicate logic, a sentence is divided into a predicate and arguments.

For example, each of the following propositions can be written as predicates with two arguments:

$$
\begin{align}
P_1 & : \text{Linda is Mary's mother} & \text{becomes} \qquad & \text{mother(Linda, Mary)} \\
P_2 & : \text{Mary is Anne's mother}  & \text{becomes} \qquad & \text{mother(Mary, Anne)} \\
\end{align}
$$

The relationship of motherhood in each of the above sentences is defined by the predicate $mother$. If the object $Mary$ in both sentences refers to the same person, we can infer a new relation between $Linda$ and $Anne$:

$$
\text{grandmother(Linda, Anne)}
$$

This is the whole purpose of predicate logic.

#### Sentence

A sentence in predicate language is defined as follows:

1. A predicate with n arguments such as $\text{predicate_name}(\text{argument}_\text{1},\ \dots, \text{argument}_\text{n})$
is a sentence. The $\text{predicate_name}$ relates arguments to each other. Each argument
can be:
    1. A constant, such as human, animal, John, Mary.
    2. A variable, such as x, y, and z.
    3. A function such as mother (Anne). Note that a function is a predicate that is used as an argument: a function returns an object that can takes the place of an argument.
2. Any of the two constant values (true and false) is a sentence.
3. If $P$ is a sentence, then $\neg P$ is a sentence.
4. If $P$ and $Q$ are sentences, then $P \lor Q,\ P \land Q,\ P \implies Q, \text{ and } P \iff Q$ are sentences.

> [!example]
$$
\begin{align}
& \text{John works for Ann's sister}      & \text{becomes} \qquad & \text{works}\Big(\text{John, sister(Ann)}\Big) \\
& \text{John's father loves Ann's sister} & \text{becomes} \qquad & \text{loves}\Big(\text{father(John), sister(Ann)}\Big) \\
\end{align}
$$

#### Quantifiers

Predicate logic allows us to use **quantifiers**. Two quantifiers are common in predicate logic:

- $\forall$, which is read as "for all", is called the <em>universal quantifier</em>: it states that something is true for every object that its variable represents.
- $\exists$, which is read as "there exists", is called the <em>existential quantifier</em>: it states that something is true for one or more objects that its variable represents.

> [!example]
$$
\begin{align}
\text{All men are mortals}  \qquad & \forall x\big[\text{man}(x) \implies \text{mortal}(x)\big] \\\\
\text{Frogs are green}      \qquad & \forall x\big[\text{frog}(x) \implies \text{green}(x)\big] \\\\
\text{Some flowers are red} \qquad & \exists x\big[\text{flower}(x) \land \text{red}(x)\big] \\\\
\text{John has a book}      \qquad & \exists x\big[\text{book}(x) \land \text{has}(\text{John},\ x)\big] \\\\
\text{No frog is yellow}    \qquad & \forall x\big[\text{frog}(x) \implies \neg \text{yellow}(x)\big] \\
                                   & \text{ or as } \quad \neg\exists x\big[\text{frog}(x) \land \text{yellow}(x)\big]
\end{align}
$$

#### Deduction

In predicate logic, if there is no quantifier, the verification of an argument is the same as that which we discussed in propositional logic. However, the verification becomes more complicated if there are quantifiers.

For example, the following argument is completely valid:

$$
\begin{align}
\text{Premiss 1}  & : \text{All men are mortals.} \\
\text{Premiss 2}  & : \text{Socrates is a man.} \\
\text{Conclusion} & : \text{Therefore, Socrates is mortal.}
\end{align}
$$

Verification of this simple argument is not difficult. We can write this argument as:

$$
\forall x\big[\text{man}(x) \implies \text{mortal}(x)\big], \text{ man(Socrates)} \vdash \text{mortal(Socrates)}
$$

Since the first premises talks about all men, we can replace one instance of the class man ( $Socrates$, 蘇格拉底 ) in that premiss to get the following argument:

$$
\text{man(Socrates)} \implies \text{mortal(Socrates)}, \text{ man(Socrates)} \vdash \text{mortal(Socrates)}
$$

which is reduced to

$$
M_1 \implies M_2,\ M_1 \vdash M_2
$$

The result is an argument in propositional logic and can be easily validated.

However, there are many arguments in predicate logic that cannot be validated so easily. We need a set of systematic proofs that are beyond the scope of this book.

#### Beyond predicate logic

There have been further developments in logic to include the need of logical reasoning. Some examples of these include

- **High-order logic**
- **Default logic**
- **Modal logic**
- **Temporal logic**

Their discussion is beyond the scope of this book.

### Rule-based systems

A **rule-based system** represents knowledge using a set of rules that can be used to deduce new facts from known facts. The rules express what is true if specific conditions are met. A rule-based database is a set of $\text{if } \dots \text{ then } \dots$ statements in the form

$$
\text{If } A \text{ then } B \qquad \text{or} \qquad A \implies B
$$

in which A is called the **antecedent** and B is called the **consequent**. Note that in a rule-based system, each rule is handled independently without any connection to other rules.

#### Components

A rule-based system is made up of three components:

- Interpreter (or inference engine)

    The knowledge base component in a rule-based system is a database (repository) of rules. It contains a set of pre-established rules that can be used to draw conclusions from the given facts.

- Knowledge base

    The database of facts contains a set of conditions that are used by the rules in the knowledge base.

- Fact database

    The interpreter (inference engine) is a processor or controller—a program, for example—that combines rules and facts. Interpreters are of two types:

    - Forward chaining
    - Backward chaining

## Expert Systems

**Expert systems** use the knowledge representation languages discussed in the previous section to perform tasks that normally need human expertise. They can be used in situations in which that expertise is in short supply, expensive, or unavailable when required.

For example, in medicine, an expert system can narrow down a set of symptoms to a likely subset of causes, a task normally carried out by a doctor.

- Extracting knowledge
- Extracting facts
- Architecture

## Perception

- Image processing
- Language understanding

## Reasoning

有了所有有限狀態的集合、改變狀態的規則以及從初始狀態到目標狀態的算法，就能組合出一個生產系統，應用在人工智慧領域。

The development of reasoning abilities within a machine has been a topic of research for many years. One of the results of this research is the recognition that there is a large class of reasoning problems with common characteristics. These common characteristics are isolated in an abstract entity known as a **production system**, which consists of three main components:

1. **Collection of states**

    Each state is a situation that might occur in the application environment. The beginning state is called the **start state** (initial state); the desired state (or states) is called the **goal state**.

2. **Collection of productions (rules or moves)**

    A **production** is an operation that can be performed in the application environment to <mark>move from one state to another.</mark> Each production might be associated with preconditions; that is, conditions might exist that must be present in the environment before a production can be applied.

3. **Control system**

    The control system consists of <mark>the logic that solves the problem of moving from the start state to the goal state.</mark> At each step in the process, the control system must decide which of those productions whose preconditions are satisfied should be applied next.

> [!example]
> 台聯大-108-計算機概論-30：
>
> $Q:$
>
> Which of the following components are/is in the production system for AI reasoning?
>
> $Ans:$
>
> **(A)** A control system.  
> $\quad$ `控制從開始狀態移動到目標撞到，也就是演算法。`
>
> **(B)** A collection of states.  
> $\quad$ `需要列出所有有限狀態的集合。`
>
> (C) An inference engine.
>
> **(D)** A collection of productions.  
> $\quad$ `需要制定改變狀態規則。`
>
> (E) A search tree.
