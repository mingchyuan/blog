# 【12】Abstract Data Types

Although several **simple ADTs,** such as integer, real, character, pointer, and so on, have been implemented and are available for use in most languages, many useful **complex ADTs** are not. As we will see in this chapter, we need a list ADT, a stack ADT, a queue ADT, and so on.

With an ADT, users are not concerned with *how* the task is done, but rather with *what* it can do.

The concept of abstraction means:

1. We know what a data type can do.
2. How it is done is hidden.

## Stacks

> [!example]
> 台聯大-109-計算機概論-15：
>
> $Q:$
>
> A stack is initially empty, then the following commands are performed:
>
> `push 5`  
> `push 7`  
> `pop`  
> `push 10`  
> `push 5`  
> `pop`
>
> Which of the following is the correct stack after those commands (assume the top of the stack is on the left)?
>
> $Ans:$
>
> (10, 5).

A **stack** is a restricted linear list in which all additions and deletions are made at one end, the *top*.

Stacks are known as a **last in, first out** (**LIFO**) data structure.

### Push operation

The **push** operation inserts an item at the top of the stack.

### Pop operation

The **pop** operation deletes the item at the top of the stack.

### Stack implementation

Stack ADT can be implemented using either an array or a linked list.

The following example demonstrates the implementation of a stack using an array.

<!-- tabs:start -->

<!-- tab:main.c -->

```c
#include <stdio.h>

#define false 0
#define true 1
#define LENGTH 3

int push(int value);
int pop();
void printStack(int s[], int length);

int stack[LENGTH];
int *top = &stack[-1];

int main()
{
    push(5);
    push(10);
    push(15);
    push(20);
    pop();
    push(25);
    return 0;
}

int push(int value)
{
    int index = top - stack + 1;
    if (index < LENGTH) {

        *++top = value;  /* stack[index] = value; top++; */

        printf("push(%2d), ", value);
        printStack(stack, LENGTH);
        return true;
    }

    printf("push(%2d) fail!, stack is full. ", value);
    printStack(stack, LENGTH);
    return false;
}

int pop()
{
    printf("pop(): %d\n", *top);
    return *top--;
}

void printStack(int s[], int length)
{
    printf("stack: ");
    int i;
    for (i = 0; i < length; i++) {
        printf("%2d ", s[i]);
    }
    printf(", value of top: %2d\n", *top);
}
```

<!-- tab:print -->

```text
push( 5), stack:  5  0  0 , value of top:  5
push(10), stack:  5 10  0 , value of top: 10
push(15), stack:  5 10 15 , value of top: 15
push(20) fail!, stack is full. stack:  5 10 15 , value of top: 15
pop(): 15
push(25), stack:  5 10 25 , value of top: 25
```

<!-- tabs:end -->

## Queues

> [!example]
> 台聯大-109-計算機概論-16：
>
> $Q:$
>
> A queue performs the following commands (in pseudo-code):
>
> `enqueue 4, 6, 8, 3, 1`  
> `dequeue three elements`  
> `enqueue 3, 1, 5, 6`  
> `dequeue two elements`
>
> What number is now at the front of the queue?
>
> $Ans:$
>
> 3.

A **queue** is a linear list in which data can only be inserted at one end, called the *rear*, and deleted from the other end, called the *front*.

A queue is a **first in, first out** (**FIFO**) structure.

### Enqueue operation

The **enqueue** operation inserts an item at the *rear* of the queue.

### Dequeue operation

The **dequeue** operation deletes the item at the *front* of the queue.

### Queue implementation

> [!example]
> 台聯大-108-計算機概論-27:
>
> $Q:$
>
> Which of the following data structures are/is usually used to implement a queue?
>
> $Ans:$
>
> **(A)** Array
>
> ~(B)~ Tree
>
> **(C)** Circular list
>
> ~(D)~ Graph
>
> **(E)** Linked list

A queue ADT can be implemented using either an array or a linked list.

The following example demonstrates the implementation of a queue using a linked list.

<!-- tabs:start -->

<!-- tab:main.c -->

```c
#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node *next;
};

struct node *front = NULL;
struct node *rear = NULL;

void enqueue(int element);
int dequeue();

int main()
{
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("%d, ", dequeue());
    printf("%d, ", dequeue());
    printf("%d, ", dequeue());
    printf("%d ", dequeue());
    return 0;
}

void enqueue(int element)
{
    struct node *new_node = (struct node*)malloc(sizeof(struct node));
    new_node->data = element;
    new_node->next = NULL;
    if (front == NULL && rear == NULL) {
        front = rear = new_node;
        return;
    }
    rear->next = new_node;
    rear = new_node;
}

int dequeue()
{
    if (front == NULL) {
        printf("Queue is empty: ");
        return -1;
    }
    struct node *temp = front;
    int element = temp->data;
    if (front == rear) {
        front = rear = NULL;
    } else {
        front = front->next;
    }
    free(temp);
    return element;
}
```

<!-- tab:print -->

```text
10, 20, 30, Queue is empty: -1
```

<!-- tabs:end -->

## General Linear Lists

A general linear list is a list in which operations, such as insertion and deletion, can be done anywhere in the list—at the beginning, in the middle, or at the end.

We define a **general linear list** as a collection of elements with the following properties:

- The elements are of the *same* type.
- The elements are arranged sequentially, which means that there is a first element and a last element.
- Each element except the first has a unique predecessor, each element except the last has a unique successor.
- Each element is a *record* with a *key field*.
- The elements <mark>are sorted based on the key value.</mark>

> [!example]
> 台聯大-109-計算機概論-8：
>
> $Q:$
>
> Which of the following statement is *False*?
>
> $Ans:$
>
> (A) An array is a random-access structure.
>
> (B) A sequential list is a random-access structure.
>
> **(C)** A linked list is a ~random-access~ structure.  
> $\quad$ `Sequential access.`
>
> (D) A stack is not a random-access structure.
>
> ---
>
> List ADT is divided by 2 types (實作方式):
>
> - Sequential list:
>
>     - Array structure—store elements in a contiguous memory.
>     - Direct or random access method.
>     - Static storage capacity. (編譯階段時設置固定大小)
>     - Binary search and linear search.
>
> - Linked list
>
>     - Linked structure—store elements anywhere in memory and linked by a reference/pointer.
>     - Sequential access method.
>     - Dynamic storage capacity. (執行階段時能變更大小)
>     - Linear search.
>
> 參考資料：
>
> - [List ADT Part I – Sequential List][]
> - A Comprehensive Introduction to Object-Oriented Programming with Java, C. Thomas Wu

[List ADT Part I – Sequential List]: https://slideplayer.com/slide/17649507/

## Trees

A **tree** consists of

- A finite set of elements, called **nodes** (or vertices)
- A finite set of directed lines, called **arcs**, that connect pairs of the nodes.

If the tree is not empty, one of the nodes, called the **root**, has no incoming arcs. The other nodes in a tree can be reached from the root by following a unique **path**, which is a sequence of consecutive arcs.

Tree structures are normally drawn upside down with the root at the top.

We can divide the vertices in a tree into three categories:

|   Type of node    | Incoming arc | Outgoing arc |
| :---------------: | :----------: | :----------: |
|     **Root**      |      0       |  0 or more   |
|     **Leaf**      |      1       |      0       |
| **Internal node** |      1       |  1 or more   |

> [!figure]
>
> ```graphviz
> digraph {
>     A -> B [weight=2];
>     A -> E;
>     A -> F [weight=2];
>     B -> C [weight=2];
>     B -> D;
>     F -> G;
>     F -> H;
>     F -> I;
>     n [margin="0.2, 0.1", shape="rect", label="A: root\lB and F: internal nodes\lC, D, E, G, H, and I: leaves\l"];
> }
> ```

- A node that is directly accessible (through a single arc) from a given node is called the **child**.
- The node from which the child is directly accessible is called a **parent**.
- Nodes with a common parent are called **siblings**.
- **Descendents** of a node are all nodes that can be reached by that node.
- A node from which all descendents can be reached is called an **ancestor**.
- Each node in a tree may have a **subtree**. The subtree of each node includes one of its children and all descendents of that child.

We often refer to the number of nodes in the longest path <mark>from the root to a leaf</mark> as the **depth** of the tree. In other words, the depth of a tree is the number of horizontal layers within it. The depth of the root node is 0.

> **Level** is the same as depth.
>
> <a>Discrete Mathematics and Its Applications, 8th Edition</a>
>
> The level of a vertex v in a rooted tree is the length of the unique path from the root to this vertex. The level of the root is defined to be zero.
>
> <a>Discrete Mathematics with Applications, 5th Edition</a>
>
> The level of a vertex is the number of edges along the unique path between it and the root.

> [!example]
> 台聯大-109-計算機概論-18：
>
> $Q:$
>
> Which of the formulas gives the maximum number of nodes in the Nth level of a binary tree?
>
> $Sol:$
>
> |  level   | 該 level 的節點數量 |   $a_n$   |
> | :------: | :---------------: | :-------: |
> |    0     |        $1$        |   $a_1$   |
> |    1     |       $2^1$       |   $a_2$   |
> |    2     |       $2^2$       |   $a_3$   |
> | $\vdots$ |     $\vdots$      | $\vdots$  |
> |    N     |       $2^N$       | $a_{N+1}$ |
>
> level 0 只有 root 一個節點。因為是 binary tree，所以可以寫成一個公比 $r = 2$ 的等比數列。
$$
\{ 1,\ 2^1,\ 2^2,\ \dots,\ 2^N \}
$$
>
> 根據等比級數求和公式：
$$
S_n =
\begin{cases}
na_1,\ r = 1 \\\\
\dfrac{a_1(1 - r^n)}{1 - r},\ r \neq 1
\end{cases}
$$
>
> 因 level 是從 0 開始，所以 Nth level 在數列中是第 N + 1 項。
>
> 將 $n = N + 1$ 與 $r = 2$ 代入公式可以得到：
$$
Ans: \qquad
S_{N+1} = 2^{N+1} - 1
$$
>
> 相關考題：
>
> 台聯大-106-計算機概論-16，其中 $r = 3$，求 $S_7 \ (\text{height} = 6)$

In a tree data structure, the number of edges <mark>from the leaf node to the particular node</mark> in the longest path is known as the **height** of that node. In the tree, the height of the root node is called height of tree. The tree height of all leaf nodes is 0.

## Binary trees

A **binary tree** is a tree in which no node can have more than two subtrees. In other words, a node can have zero, one, or two subtrees. These subtrees are designated as the **left subtree** and the **right subtree**. Figure shows a binary tree with its two subtrees. Note that each subtree is itself a binary tree.

> [!figure]
>
> ```graphviz
> digraph {
>     n [shape=none, label=""];
>     subgraph cluster1{
>         label="left subtree    ";
>         B; C; D;
>     }
>     subgraph cluster2{
>         label="       right subtree";
>         E; n; F;
>     }
>     A -> B;
>     A -> E;
>     B -> C [weight=2];
>     B -> D;
>     E -> n [style=invis];
>     E -> F [weight=2];
> }
> ```

### Recursive definition of binary trees

?> A binary tree is either empty or consists of a node, root, with two subtrees, in which each subtree is also a binary tree.

Empty binary tree sometimes called a null binary tree.

### Binary tree traversals

A binary tree traversal requires that each node of the tree be processed once and only once in a predetermined sequence.

#### Depth-first traversals

Given that a binary tree consists of a root, a left subtree, and a right subtree, we can define six different **depth-first traversal** sequences. Computer scientists have assigned standard names to three of these sequences in the literature: the other three are unnamed but are easily derived.

- **Preorder traversal**:

    <ol>
        <li><em>root</em></li>
        <li>left subtree</li>
        <li>right subtree</li>
    </ol>

    The prefix *pre* indicates that the root node is processed before the subtrees.

- **Inorder traversal**:

    <ol>
        <li>left subtree</li>
        <li><em>root</em></li>
        <li>right subtree</li>
    </ol>

    The prefix *in* indicates that the root node is processed between the subtrees.

- **Postorder traversal**:

    <ol>
        <li>left subtree</li>
        <li>right subtree</li>
        <li><em>root</em></li>
    </ol>

    The prefix *post* indicates that the root is processed after the subtrees.

> [!example]
> Expression trees:
>
> An arithmetic expression can be represented in three different formats: infix, postfix, and prefix.
>
> ```graphviz
> digraph {
>     "*"; "-"; "+"; 1; 2; 4; 5;
>     "*" -> "-";
>     "*" -> "+";
>     "-" -> 1 [weight=2];
>     "-" -> 2;
>     "+" -> 4;
>     "+" -> 5 [weight=2];
> }
> ```
>
> ```algorithm
> \begin{algorithmic}
> \State Preorder:    $\qquad\ \ $    $* \ - \ 1 \ 2 \ + \ 4 \ 5$
> \State Inorder:     $\qquad\quad$   $(1 \ - \ 2) \ * \ (4 \ + \ 5)$
> \State Postorder:   $\qquad$        $1 \ 2 \ - \ 4 \ 5 \ + \ *$
> \end{algorithmic}
> ```

---

Note that <mark>only the infix notation needs parentheses.</mark>

> [!example]
> 相關考題：台聯大-106-計算機概論-17 (選項 C 的中序沒有加上括號，猜想因此有疑義而更正答案)

---

關於 postorder 的算數運算式可以參考 C89 [【4-3】External Variables](/程式語言/C/C89/ch4/【4-3】external-variables) 中的 Reverse Polish notation 的 pseudo code，利用 stack 來計算數值。

> [!example]
> 相關考題：台聯大-112-計算機概論-14

---

> [!example]
> 台聯大-112-計算機概論-13：
>
> $Q:$
>
> 對一個二元樹以 postorder traversal 的結果是 FECHGDBA；以 inorder traversal 的結果是 FECABHDG。則 preorder traversal 的結果為何？
>
> $Sol:$
>
> 先<mark>從後序走訪找最後，再到中序走訪分左右</mark>，反覆執行。
>
> 首先，可以從後序走訪找出根
>
> postorder: FECHGDB*A*
>
> 接著在中序可以看出左右子樹的節點
>
> inorder: <ruby>(FEC)<rt>左子樹</rt></ruby>*A*<ruby>(BHDG)<rt>右子樹</rt></ruby>
>
> 再回到後序走訪中，對子樹重複執行前述動作
>
> postorder: (FE<ruby>*C*<rt>根</rt></ruby>)(HGD<ruby>*B*<rt>根</rt></ruby>)A
>
> inorder: $\big[$<ruby>(FE)<rt>左子樹</rt></ruby>   *C*   <ruby>( )<rt>右子樹</rt></ruby>$\big]$ A $\big[$<ruby>( )<rt>左子樹</rt></ruby>   *B*   <ruby>(HDG)<rt>右子樹</rt></ruby>$\big]$
>
> 最終可以建構出以下二元樹
>
> ```graphviz
> digraph {
>     A -> C;
>     A -> B;
>     C -> E;
>     n1 [label="", shape=none];
>     C -> n1 [style=invis];
>     B -> n1 [style=invis];
>     B -> D;
>     E -> F;
>     n2 [label="", shape=none];
>     E -> n2 [style=invis];
>     D -> H;
>     D -> G;
> }
> ```
>
> 因此，preorder traversal 的結果為 ACEFBDHG

#### Breadth-first traversals

In **breadth-first traversal** of a binary tree we process all the children of a node before proceeding with the next generation.

> [!example]
>
> ```graphviz
> digraph {
>     A; B; E; C; D;
>     n [shape=none, label=""];
>     F;
>     A -> B;
>     A -> E;
>     B -> C [weight=2];
>     B -> D;
>     E -> n [style=invis];
>     E -> F [weight=2];
> }
> ```
>
> ```algorithm
> \begin{algorithmic}
> \State $A \ B \ E \ C \ D \ F$
> \end{algorithmic}
> ```

#### Binary search trees

A **binary search tree** (**BST**) is a binary tree with one extra property: the key value of each node is greater than the key values of all nodes in each left subtree and smaller than the value of all nodes in each right subtree.

> [!figure]
>
> ```graphviz
> digraph {
>     splines=line;
>     K;
>     node [shape=triangle]
>     l [label="All < K\n\n"];
>     r [label="All > K\n\n"];
>     K -> l:n;
>     K -> r:n;
> }
> ```

?> An *inorder traversal* of a BST creates a list that is sorted in ascending order.

> [!example]
> 台聯大-112-計算機概論-10：
>
> 根據不同的順序來建構二元搜尋樹，會得到不同深度 (根到某個節點的距離) 的樹。
>
> 例如：(41, 7, 31, 25) 會建構出深度 3 的 BST
>
> ```graphviz
> digraph {
>     node [shape=ellipse];
>     41 -> 7;
>     n1 [shape=none, label=""];
>     41 -> n1 [style=invis];
>     n2 [shape=none, label=""];
>     7 -> n2 [style=invis];
>     7 -> 31;
>     31 -> 25;
>     n3 [shape=none, label=""];
>     31 -> n3 [style=invis];
> }
> ```
>
> 例如：(25, 41, 7, 31) 會建構出深度 2 的 BST
>
> ```graphviz
> digraph {
>     node [shape=ellipse];
>     25 -> 7;
>     25 -> 41;
>     41 -> 31;
>     n1 [shape=none, label=""];
>     41 -> n1 [style=invis];
> }
> ```

### BST implementation

BSTs can be implemented using either arrays or linked lists. However, linked list structures are more common and more efficient.

```c
struct node {
    int key;
    struct node *left, *right;
};
```

## Graphs

A **graph** is an ADT made of a set of nodes, called **vertices**, and set of lines connecting the vertices, called **edges** or **arcs**.

Whereas a tree defines a hierarchical structure in which a node can have only one single parent, each node in a graph can have one or more parents.

Graphs may be either directed or undirected. In a **directed graph**, or **digraph**, each edge, which connects two vertices, has a direction (shown in the figure by an arrowhead) from one vertex to the other. In an **undirected graph**, there is no direction.

The vertices in a graph can represent objects or concepts and the edges or arcs can represent a relationship between those objects or concepts. If a graph is directed, the relations are one-way: if a graph is undirected, the relation is two-way.

> [!figure]
>
> ```graphviz
> digraph {
>     label="Directed graph";
>     A -> B;
>     B -> {C, E};
>     C -> {D, E};
>     E -> {D, F};
>     {rank=same; B; E;}
>     {rank=same; C; D;}
> }
> ```
>
> ```graphviz
> graph {
>     label="Undirected graph";
>     A -- B;
>     B -- {C, E};
>     C -- {D, E};
>     E -- {D, F};
>     {rank=same; B; E;}
>     {rank=same; C; D;}
> }
> ```
