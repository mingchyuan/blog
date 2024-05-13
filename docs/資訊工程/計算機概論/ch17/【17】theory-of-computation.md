# 【17】Theory of Computation

## Simple Language

We can define a computer language with only three statements:

- Increment statement
- Decrement statement
- Loop statement

In this language, the only data type we use is nonnegative integers. There is no need for any other data type, because the goal of the chapter is merely to demonstrate some ideas in computation theory.

```algorithm
\begin{algorithm}
\caption{Increment statement}
\begin{algorithmic}

\State incr(X)

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Decrement statement}
\begin{algorithmic}

\State decr(X)

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Loop statement}
\begin{algorithmic}

\While {X}
    \State decr(X)
    \State Body of the loop
\EndWhile

\end{algorithmic}
\end{algorithm}
```

### The power of the simple language

We show how we can simulate several statements found in some popular languages.

#### Macros in Simple Language

We call each simulation a **macro** and use it in other simulations without the need to repeat code.

```algorithm
\begin{algorithm}
\caption{Macro X $\gets$ 0}
\begin{algorithmic}

\While {X}
    \State decr(X)
\EndWhile


\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Macro X $\gets$ n}
\begin{algorithmic}

\State X $\gets$ 0
\State incr(X)
\State incr(X)
\State $\dots$
\State incr(X)
\State \Comment {$\ $The statement incr(X) is repeated n times.}

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Macro Y $\gets$ X}
\begin{algorithmic}

\State Y $\gets$ 0
\While {X}
    \State decr(X)
    \State incr(Y)
\EndWhile

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Macro Y $\gets$ Y + X}
\begin{algorithmic}

\While {X}
    \State decr(X)
    \State incr(Y)
\EndWhile

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Macro Y $\gets$ Y $\times$ X}
\begin{algorithmic}

\State TEMP $\gets$ Y
\State Y $\gets$ 0
\While {X}
    \State decr(X)
    \State Y $\gets$ Y + TEMP
\EndWhile

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Y $\gets$ $Y^X$}
\begin{algorithmic}

\State TEMP $\gets$ Y
\State Y $\gets$ 1
\While {X}
    \State decr(X)
    \State Y $\gets$ Y $\times$ TEMP
\EndWhile

\end{algorithmic}
\end{algorithm}
```

This macro simulates the decision-making (`if`) statement of modern languages. <mark>In this macro, the variable X has
only one of the two values 0 or 1.</mark>

```algorithm
\begin{algorithm}
\caption{Macro if X then A}
\begin{algorithmic}

\While {X}
    \State decr(X)
    \State A
\EndWhile

\end{algorithmic}
\end{algorithm}
```

It is obvious that we need more macros to make Simple Language compatible with contemporary languages. Creating other macros is possible, although not trivial.

## The Turing Machine

A Turing machine is made of three components:

- A tape
- A controller
- A read/write head

> [!example]
> 台聯大-107-計算機概論-25：
>
> $Q:$
>
> Which of the following a Turing machine consists of?

---

> [!example]
> 台聯大-112-計算機概論-17：
>
> $Q:$
>
> 一個圖靈機 (Turing machine) 的指令，(i, j, k, s, d)：代表目前在狀態 i 且讀到符號 (symbol) j，則寫符號 k 到紙帶 (tape) 上，改變狀態為 s，往 d 的方向移動讀寫頭。狀態 1 是一開始的初始狀態。
>
> 下列是此圖靈機的指令：
>
> (1, 1, 1, 2, 左)  
> (2, b, 0, 3, 左)  
> (3, b, 1, 4, 右)  
> (4, 0, 1, 4, 右)
>
> 如果資料紙帶上的資料是如下：(b 代表空白資料，紙帶的兩端是空白的)
> $$\dots b1b \dots$$
>
> 讀寫頭一開始是在紙帶上資料 1 的位置，則執行完的結果，紙帶資料會變成什麼？
>
> $Sol:$
$$
\begin{align}
& 狀態 1 \quad \dots b\underline{1}b \dots  & \xrightarrow{\mbox{(1, 1, 1, 2, 左)}}  && 狀態 2 \quad & \dots \underline{b}1b \dots \\
& 狀態 2 \quad \dots \underline{b}1b \dots  & \xrightarrow{\mbox{(2, b, 0, 3, 左)}}  && 狀態 3 \quad & \dots \underline{b}01b \dots \\
& 狀態 3 \quad \dots \underline{b}01b \dots & \xrightarrow{\mbox{(3, b, 1, 4, 右)}}  && 狀態 4 \quad & \dots b1\underline{0}1b \dots \\
& 狀態 4 \quad \dots b1\underline{0}1b \dots & \xrightarrow{\mbox{(4, 0, 1, 4, 右)}} && 狀態 4 \quad & \dots b11\underline{1}b \dots \\
\end{align}
$$

---

> [!example]
> 台聯大-108-計算機概論-9：
>
> $Q:$
>
> What action is performed by the Turing machine described below?
>
> $Ans:$
>
> | Current<br />state | Current<br />cell content | Value<br />to write | Direction<br />to move | New<br />state |
> | :----------------: | :-----------------------: | :-----------------: | :--------------------: | :------------: |
> |       START        |             *             |          *          |          left          |       X        |
> |         X          |             1             |          0          |          left          |       X        |
> |         X          |             0             |          0          |         right          |       Y        |
> |         Y          |             0             |          0          |         right          |       Y        |
> |         Y          |             *             |          *          |        no move         |      HALT      |
>
> **(A)** It replaces any string of consecutive 1s to the left of an \* with 0s.
>
> (B) It leaves the tape unchanged.
>
> (C) It places an \* at the left end of any string of consecutive 1s appearing to the left of an \*.
>
> (D) It complements the string of 0s and 1s appearing to the left of an \*.  

## Gödel Numbers

TODO

## The Halting Problem

TODO

## The Complexity of Problems

We often want to know how *long* it takes for the computer to solve that problem. In other words, how complex is the program?

The complexity of a program can be measured in several different ways, such as its run time, the memory it needs, and so on. One approach is the program's run time—how long does the program take to run?

One way to measure the complexity of a solvable problem is to find the number of operations executed by the computer when it runs the program. In this way, the complexity measure is independent of the speed of the computer that runs the program. This measure of complexity can depend on the number of inputs.

### Big-O notation

With the speed of computers today, we are not as concerned with exact numbers as with general orders of magnitude.

The notation $O(n)$ means a program does $n$ operations for $n$ inputs, while the notation $O(n^2)$ means a program does $n^2$ operations for $n$ inputs.

> [!example]
> Assuming 1 million inputs and computer executes one instruction in one microsecond ( $10^6 \ {^\mbox{instructions}}/_\mbox{second}$ ).
$$
n = 1,000,000
$$
>
> |    Complexity     |               Time                |
> | :---------------: | :-------------------------------: |
> | $O(\log_{10}{n})$ |            $6 \ \mu s$            |
> |      $O(n)$       |   $1,000,000 \ \mu s = 1 \ sec$   |
> |     $O(n^2)$      | $10^{12} \ \mu s \approx 277 \ h$ |

---

[4 次方的級數和公式]: https://www.quora.com/What-is-the-formula-for-the-sum-of-the-first-N-4th-powers-How-do-you-derive-it

> [!example]
> 台聯大-106-計算機概論-14：
>
> $Q:$
>
> What is the time complexity (Big-O) in following program segment?
>
> $Sol:$
>
> !> 請參考離散數學課程，不曉得哪裡寫錯了。使用 [4 次方的級數和公式][] 應該也是 $O(n^5)$，但公告答案是 $O(n^4)$。
>
> ```c
> r = 0;                               // t1 (Times for each execution of each line.)
> for (i = 1; i < M; i++)              // t2
>     for (j = 1; j < i * i; j++)      // t3
>         if (j % i == 0)              // t4
>             for (k = 0; k < j ; k++) // t5
>                 r++;                 // t6
> ```
>
> $t_1$ 到 $t_6$ 都是 $\Theta(1)$，因此不管該行指派了幾個變數值或是判斷做了幾次，都當作 1 方便計算
$$
\begin{align}
T(M) & =
t_1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    t_2 + \displaystyle\sum_{j=1}^{i^2} \big(
        t_3 + t_4 + \displaystyle\sum_{k=0}^{j-1} (
            t_5 + t_6
        )
    \big)
\Big) \\
& =
1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    1 + \displaystyle\sum_{j=1}^{i^2} \big(
        2 + \displaystyle\sum_{k=0}^{j-1} 2
    \big)
\Big) \\
& =
1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    1 + \displaystyle\sum_{j=1}^{i^2} \big(
        2 + 2j
    \big)
\Big) \\
& =
1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    1 + \displaystyle\sum_{j=1}^{i^2} 2 + \displaystyle\sum_{j=1}^{i^2} 2j
\Big) \\
& =
1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    1 + 2i^2 + (2 + 4 + 6 + \cdots + 2i^2)
\Big) \\
& =
1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    1 + 2i^2 + \dfrac{i^2 \times (2 + 2i^2)}{2}
\Big) \\
& =
1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    1 + 2i^2 + (i^2 + i^4)
\Big) \\
& =
1 +
\displaystyle\sum_{i=1}^{M-1} \Big(
    1 + 3i^2 + i^4
\Big) \\
T(M) & \leq
\displaystyle\sum_{i=1}^{M-1} \Big(
    i^4 + 3i^4 + i^4
\Big) \\
& = 5
\displaystyle\sum_{i=1}^{M-1} \Big(
    i^4
\Big) \\
& = 5(1^4 + 2^4 + \cdots + (M-1)^4)
\leq
5 \big( (M-1)(M-1)^4 \big) = 5M^5 + \cdots \\\\
& \text{Therefore, } T(M) \text{ is } O(n^5)
\end{align}
$$

### Comparison of three notation

?> 參考資料：  
<a>Discrete Mathematics and Its Applications, 8th Edition</a>  
[演算法課程](http://debussy.im.nuu.edu.tw/sjchen/Algorithm/97Spring/Course02.pdf) by 國立聯合大學 資訊管理學系 陳士杰

- Big O notation
- Big Theta notation
- Big Omega notation

| Notation                      | Description                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| $f(x) = O\Big(g(x)\Big)$      | 對相當大的 $x$，函數值 $f(x)$ 能找到一個與 $g(x)$ 有關的*上界* (最差的情況)。                          |
| $f(x) = \Theta\Big(g(x)\Big)$ | 同時提供函數的上界與下界。此時，$f(x) = O\Big(g(x)\Big)$ 且 $f(x) = \Omega\Big(g(x)\Big)$ |
| $f(x) = \Omega\Big(g(x)\Big)$ | 對相當大的 $x$，函數值 $f(x)$ 能找到一個與 $g(x)$ 有關的*下界*。                          |

> [!example]
> 台聯大-108-計算機概論-10：
>
> $Q:$
>
> Which of the following is the most precise classification of a problem X?
>
> $Ans:$
>
> (A) X is in $O(n^2)$.
>
> **(B)** X is in $\Theta(n^2)$.
>
> (C) X is in NP. (nondeterministic polynomial time)
>
> (D) X is in P. (polynomial time)

---

> [!example]
>
> $Q:$
>
> If a program has time complexity $T(n) = T(\dfrac{n}{2}) + n^2$. What is the solution of $T(n)$?
>
> $Sol:$
$$
\begin{align}
T(n)
& = T(\dfrac{n}{2}) + n^2 \\
& = \Big( T(\dfrac{n}{4}) + (\dfrac{n}{2})^2 \Big) + n^2 \\
& = \Big( T(\dfrac{n}{8}) + (\dfrac{n}{4})^2 \Big) + (\dfrac{n}{2})^2 + n^2 \\
& = n^2 + (\dfrac{n}{2})^2 + (\dfrac{n}{4})^2 + (\dfrac{n}{8})^2 + \cdots \\
& = n^2(1 + \dfrac{1}{2^2} + \dfrac{1}{2^4} + \dfrac{1}{2^6} + \cdots)
\end{align}
$$
> 其中 $(1 + \dfrac{1}{2^2} + \dfrac{1}{2^4} + \dfrac{1}{2^6} + \cdots)$ 為無窮等比級數之和，將 $a_1 = 1,\ r = \dfrac{1}{4}$ 代入求和公式可得
$$
\begin{align}
\lim\limits_{n \to \infty} S_n
& = \lim\limits_{n \to \infty} \dfrac{a_1(1 - r^n)}{1 - r} \\
& = \lim\limits_{n \to \infty} \dfrac{1 - (\frac{1}{4})^n}{1 - \frac{1}{4}} \\
& = \dfrac{4}{3}
\end{align}
$$
> 因此
$$
T(n) = \dfrac{4}{3} n^2
$$
> 根據 Big O 定義，We say that $f(x)$ is $O\Big(g(x)\Big)$ if there are constants $C$ and $k$ such that
$$
\left| f(x) \right| \leq C \left| g(x) \right|, \text{ whenever } x > k.
$$
可以很快地估算出當 $C = \dfrac{4}{3}$ 且 $k$ 為任意一常數時，$\left| T(n) \right| \leq \dfrac{4}{3} \left| n^2 \right|$，因此 $T(n)$ 是 $O(n^2)$。

---

> [!example]
> 台聯大-108-計算機概論-17：
>
> $Q:$
>
> If a program has time complexity $T(n) = T(\dfrac{n}{2}) + \Theta(n^2)$. What is the solution of $T(n)$?
>
> $Sol:$
$$
\begin{align}
T(n)
& = T(\dfrac{n}{2}) + \Theta(n^2) \\
& = T(\dfrac{n}{4}) + \Theta\Big((\dfrac{n}{2})^2\Big) + \Theta(n^2) \\
& = T(\dfrac{n}{4}) + \Theta(\dfrac{n^2}{4}) + \Theta(n^2) & (1)
\end{align}
$$
>
> ---
>
> 根據 Big Theta 定義，$g(x)$ 同時是上界與下界。而根據上下界的定義，可以將 $g(x)$ 中的常數倍數提出去，例如
$$
\begin{gather}
\text{若 } f(x) \text{ 是 } O(\dfrac{x^2}{4}) \text{，表示} \\\\
\left| f(x) \right| \leq C_1 \left| \dfrac{x^2}{4} \right|
= C_2 \left| x^2 \right|
, \quad C_2 = \dfrac{C_1}{4} \\\\
\text{則 } f(x) \text{ 也是 } O(x^2) \\\\
\text{同理，若} f(x) \text{ 是 } \Omega(\dfrac{x^2}{4}) \text{，則 } f(x) \text{ 也是 } \Omega(x^2)
\end{gather}
$$
>
> ---
>
> 因此 $(1)$ 式中， $\Theta(\dfrac{n^2}{4})$ 可以簡化成 $\Theta(n^2)$，所以
$$
\begin{align}
T(n)
& = T(\dfrac{n}{4}) + \Theta(\dfrac{n^2}{4}) + \Theta(n^2) && (1) \\
& = T(\dfrac{n}{4}) + \Theta(n^2) + \Theta(n^2) \\
& = T(\dfrac{n}{4}) + 2 \cdot \Theta(n^2) \\
& = T(\dfrac{n}{8}) + 3 \cdot \Theta(n^2) \\
& \qquad \vdots \\
& = T(\dfrac{n}{2^x}) + x \cdot \Theta(n^2) && \text{令 } 2^x = n \text{ 則 } x = \log_2{n} \\
& = T(\dfrac{n}{n}) + (\log_2{n}) \cdot \Theta(n^2) \\
& = T(1) + \Theta(n^2 \log_2{n})
\end{align}
$$

## P versus NP problem

> [!figure]
$$
\text{Problems }
\begin{cases}
& \text{Unsolvable} \\\\
& \text{Solvable}
    & \begin{cases}
    & \text{Polynomial} \\
    & \small\text{存在多項式時間複雜度的演算法來「解決」問題} \\\\
    & \text{Nonpolynomial } \\
    & \begin{array}{l} e.g. \small\text{ 指數級、階乘級} \\ \small\text{理論上可以解決，但實務上難以處理} \end{array} \\\\
    & \text{NP problem} \quad
        \begin{cases}
            & \text{NP-complete}
        \end{cases} \\
    & \begin{array}{l} \small\text{存在多項式時間複雜度的演算法來「驗證」問題} \\ \small\text{但不確定 NP} = \small\text{P？還是 NP} \neq \text{P？} \end{array}
    \end{cases}
\end{cases}
$$

要解決問題或是驗證答案往往是不一樣的難度。

例如排序的複雜度是：$O(n \log n)$，但驗證一個數列是否為排序好的只需要 $O(n)$ 就可以辦到。

驗證答案的難度 $\leq$ 算出答案的難度

### P

If a program has a complexity of $O(log_n),\ O(n),\ O(n^2),\ O(n^3),\ O(n^4), \text{ or } O(n^k),$ where $k$ is a constant, it is called *polynomial*. With the speed of computers today, we can get solutions to **polynomial problems** with a reasonable number of inputs, for example 1000 to 1 million.

---

We say that a problem is a **polynomial problem** if the problem is in $O(f(n))$, where the expression $f(n)$ is either a polynomial itself or bounded by a polynomial. The collection of all polynomial problems is represented by **P**.

---

P 問題可以在最壞狀況下被多項式時間內的算法解決。

### Non polynomial problems

If a program has a complexity that is greater than a polynomial—for example, $O(10^n) \text{ or } O(n!)$—it can be solved if the number of inputs is very small, such as fewer than 100. If the number of inputs is large, one could sit in front of the computer for months to see the result of a **nonpolynomial problem**.

---

Problems that are *outside the class P* are characterized as having extremely long execution times, even for inputs of moderate size. For example, a problem is $\Theta(2^n)$. An algorithm whose complexity is identified by an exponential expression is said to require *exponential time*. The ability to answer these questions has been shown to require exponential time, so even a computer ultimately fails to produce answers in a timely manner as the questions become more involved.

理論上可以解決這些不屬於 P 的問題 (例如指數級)，但從實際角度來看，因為時間複雜度過於巨大，這些問題被認為是難以處理 (intractable) 的。

### NP

A problem that can be solved in polynomial time by a *nondeterministic algorithm* ($e.g.$ A lucky guess.) is called a **nondeterministic polynomial problem**, or an **NP problem** for short.

Note that all the problems in <mark>P are also in NP</mark>, because any (deterministic) algorithm can have a nondeterministic instruction added to it without affecting its performance.

<mark>Whether all of the NP problems are also in P is an open question.</mark>

---

NP 問題代表的是：不確定(可能可以，也可能不可以)在多項式時間是否可被解決，但確定可以在最壞狀況下被多項式時間內的算法驗證。

---

> [!example]
> 台聯大-108-計算機概論-25：
>
> $Q:$
>
> Which of the following questions have/has been answered by researchers?
>
> $Ans:$
>
> **(A)** What is the time complexity of the problem of sorting a list?
>
> ~(B)~ Is NP contained in P?  
> $\quad$ `目前還不曉得 NP 是否被包含於 P 中。`
>
> **(C)** Is P contained in NP?
>
> **(D)** Are all the problems in NP solvable?
>
> **(E)** Are all the problems in P solvable?

### NP-C

Efforts to resolve the question of whether the class NP is, in fact, the same as the class P have led to the discovery of a class of problems within the class NP known as the **NP-complete problems**.

<mark>NP-complete problems have the property that a polynomial time solution for any one of them would provide a polynomial time solution for all the other problems in NP as well.</mark> That is, if a (deterministic) algorithm can be found that solves one of the NP-complete problems in polynomial time, then that algorithm can be extended to solve any other problem in NP in polynomial time. In turn, the class NP would be the same as the class P.

## Boolean Logic

### Functional Completeness

A set of logical connectives is called **functionally complete** if every boolean expression is equivalent to one involving *only* these connectives.

- The set $\{\neg,\ \lor,\ \land\}$ is functionally complete.
- The sets $\{\neg,\ \lor\}$ and $\{ \neg,\ \land\}$ are functionally complete.
- $\{\text{NAND}\}$ and $\{NOR\}$ are functionally complete.

$$
\begin{cases}
x \text{ NAND } y & = \neg (x \land y) \\\\
x \text{ NOR }  y & = \neg (x \lor y)
\end{cases}
$$

---

考慮有哪一些布林運算子 (boolean operators) 或 digital gates 是必要的。是不是可以使用更少的，甚至只用一個運算子來表達？

在命題邏輯 (propositional logic) 中，有一些常見的運算子，例如： $\text{not},\ \text{and},\ \text{or},\ \text{xor},\ \text{implies},\ \dots$ 等等。這些通常被稱為 truth functions 或 logical connectives。它們接受數個布林值為輸入，並回傳一個布林值。

> [!example]
> 有兩個 input 的 $\text{and}$ 運算子會回傳 true 若且唯若兩個 input 皆為 true。

命題表達式 (propositional expressions) 由兩個布林常數 (true 和 false)、變數以及遵循特定語法規則的邏輯連接詞所構成。

Truth functions 是 total functions，也就是說，對於每一種可能的布林輸入組合，該函數都會回傳唯一的輸出。

由於所有輸入僅有兩個可能的值 (true 或 false)，一個具有 $k$ 個輸入的 truth function，可以通過指定 $2^k$ 個輸入組合來完全地描述。
也就是使用真值表 (truth table) 來表示 truth function。

考慮有一個 truth function $C$：

| $x$ | $y$ | $z$ | $C(x,\ y,\ z)$ |                                                           |
| :-: | :-: | :-: | :------------: | :-------------------------------------------------------: |
|  F  |  F  |  F  |      *T*       | $\text{case}_1 \equiv (\neg x \land \neg y \land \neg z)$ |
|  F  |  F  |  T  |       F        |                                                           |
|  F  |  T  |  F  |      *T*       |   $\text{case}_2 \equiv (\neg x \land y \land \neg z)$    |
|  F  |  T  |  T  |       F        |                                                           |
|  T  |  F  |  F  |       F        |                                                           |
|  T  |  F  |  T  |      *T*       |      $\text{case}_3 \equiv (x \land \neg y \land z)$      |
|  T  |  T  |  F  |       F        |                                                           |
|  T  |  T  |  T  |       F        |                                                           |

我們可以推導出一個等價的命題公式

$$
\begin{align}
C(x,\ y,\ z) & \equiv \text{case}_1 \lor \text{case}_2 \lor \text{case}_3 \\
             & \equiv (\neg x \land \neg y \land \neg z) \lor (\neg x \land y \land \neg z) \lor (x \land \neg y \land z)
\end{align}
$$

可以看出，不管 $C$ 有多少輸入，也不管 $C$ 含有哪些 logical connective，最終可以只使用 $\{\neg,\ \lor,\ \land\}$ 來寫出邏輯等價的表達式。也就是<mark>使用集合 $\{\neg,\ \lor,\ \land\}$ 可以定義任何的 truth function。</mark>

因此，我們稱集合 $\{\neg,\ \lor,\ \land\}$ 是 **functionally complete** 的。

若要了解其他符合 functionally complete 的集合，如

- $\{\neg,\ \lor\}$
- $\{ \neg,\ \land\}$
- $\{\text{NAND}\}$
- $\{NOR\}$

?> 可以參考以下資料：  
[Computing Theory][] [&sect;Boolean Logic][] by [Prof. Yuh-Dauh Lyuu, National Taiwan University][]  
[Functionally Complete Sets of Operators][] by College of Natural Sciences, The University of Texas at Austin

[Computing Theory]: https://www.csie.ntu.edu.tw/~lyuu/complexity.html
[&sect;Boolean Logic]: https://www.csie.ntu.edu.tw/~lyuu/complexity/2022/20220930.pdf
[Prof. Yuh-Dauh Lyuu, National Taiwan University]: https://www.csie.ntu.edu.tw/~lyuu/
[Functionally Complete Sets of Operators]: https://www.youtube.com/watch?v=1IJBNYqXpxw

> [!example]
> 相關考題：台聯大-111-計算機概論-1
