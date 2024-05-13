# 【8】Algorithms

## Three Constructs

Computer scientists have defined three constructs for a structured program or algorithm. The idea is that a program must be made of a combination of only these three constructs:

- **Sequence**
- **Decision**
- **Repetition**

It has been proven there is no need for any other constructs. Using only these constructs makes a program or an algorithm easy to understand, debug, or change.

## A More Formal Definition

- Well-Defined
- Unambiguous steps
- Produce a result
- Terminate in a finite time

## Basic Algorithms

### Summation

```algorithm
\begin{algorithm}
\caption{Summation}
\begin{algorithmic}

\State $sum \gets 0$
\While {more integers to add}
    \State $current \gets next\_integer$
    \State $sum \gets sum + current$
\EndWhile
\Return $sum$

\end{algorithmic}
\end{algorithm}
```

### Product

```algorithm
\begin{algorithm}
\caption{Product}
\begin{algorithmic}

\State $product \gets 1$
\While {more integers to multiply}
    \State $current \gets next\_integer$
    \State $product \gets product \times current$
\EndWhile
\Return $product$

\end{algorithmic}
\end{algorithm}
```

### Smallest and largest

```algorithm
\begin{algorithm}
\caption{FindSmallest}
\begin{algorithmic}

\State $smallest \gets \infty$
\While {more integers to check}
\State $current \gets next\_integer$
    \If {$current < smallest$}
        \State $smallest \gets current$
    \EndIF
\EndWhile
\Return $smallest$

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{FindLargest}
\begin{algorithmic}

\State $largest \gets -\infty$
\While {more integers to check}
\State $current \gets next\_integer$
    \If {$current > largest$}
        \State $largest \gets current$
    \EndIF
\EndWhile
\Return $largest$

\end{algorithmic}
\end{algorithm}
```

## Sorting

### Time complexity of sorting algorithms

> [!warning]
> 資料來源：[維基百科](https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_sorts)

|   Algorithm    | Time Complexity (Worst) |
| :------------: | :---------------------: |
| Selection Sort |        $O(n^2)$         |
|  Bubble sort   |        $O(n^2)$         |
| Insertion sort |        $O(n^2)$         |
|   Quick sort   |        $O(n^2)$         |
|   Merge sort   |      $O(n\log{n})$      |
|   Heap sort    |      $O(n\log{n})$      |

> [!example]
> 台聯大-108-計算機概論-28：
>
> $Q:$
>
> Which of the following sorting algorithms have/has worst case time complexity $O(n\log{n})$?

---

> [!example]
> 台聯大-107-計算機概論-24：
>
> $Q:$
>
> Which of the statement(s) are correct in complexity of algorithm $O(n^2)$?
>
> (A) merge sort  
> $\qquad O(n\log{n})$
>
> (B) linear search  
> $\qquad O(n)$
>
> (C) binary search  
> $\qquad O(\log_{2}{n})$
>
> **(D)** bubble sort
>
> **(E)** selection sort

### Selection sort

> [!figure]
>
> ```graphviz
> digraph {
>     splines=line;
>     nodesep=0;
>     node [shape=rect];
>     i [label="Swap the smallest among jth to nth\nnumbers with jth number", margin="0.3 0"]
>     node [shape=record];
>     a [label=" <1> 1 | <s> &emsp;...&emsp; | <i> i | <j> j | <us> &emsp;...&emsp; | <n> n "];
>     node [shape=plaintext];
>     s [label="Sorted"];
>     a:1 -> s:nw [dir=back];
>     a:i -> s:ne [dir=back];
>     u [label="Unsorted"];
>     {rank=same; s; u;}
>     u:nw -> a:j;
>     u:ne -> a:n;
>     i -> a:us [minlen=2];
>     "wall" -> a:j:nw;
>     edge [style=invis];
>     s -> a:s;
>     u -> a:us;
> }
> ```

```algorithm
\begin{algorithm}
\caption{Selection sort}
\begin{algorithmic}

\State Place the wall at the leftmost part of the list
\While {more passes to follow}
    \State Find smallest element in unsorted list
    \State Swap smallest element with first element of unsorted list
    \State Move the wall one element to the left
\EndWhile
\State Returned: sorted list

\end{algorithmic}
\end{algorithm}
```

```algorithm
\begin{algorithm}
\caption{Selection sort}
\begin{algorithmic}

\For {$i \gets 1$ to $n$}
    \State $min \gets i$
    \For {$j \gets i + 1$ to $n$}
        \If {$a[j] < a[min]$}
            \State $min \gets j$
        \EndIf
    \EndFor
    \State Swap $a[i]$ and $a[min]$
\EndFor

\end{algorithmic}
\end{algorithm}
```

### Bubble sort

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=record, fixedsize=true, width=3];
>     a [label=" <1> 1 | <2> 2 | <d> ... | <n1> n-1 | <n> n "];
>     a2 [label=" <1> 1 | <2> 2 | <d> ... | <n1> n-1 | <n> n "];
>     a3 [label=" <1> 1 | <2> 2 | <d> ... | <n1> n-1 | <n> n "];
>     a:1:n -> a:2:n -> a:d:n -> a:n1:n [dir=none, label="loop 1: the largest number"];
>     a:n1:n -> a:n:n;
>     a2:1:n -> a2:2:n -> a2:d:n [dir=none, label="loop 2: the 2nd largest number"];
>     a2:d:n -> a2:n1:n;
>     a3:1:n -> a3:2:n [label="loop n-1"];
>     node [shape=plaintext];
>     edge [style=invis];
>     a -> a2 [minlen = 2];
>     a2 -> "&#8942;" -> a3 [minlen = 1];
> }
> ```

```algorithm
\begin{algorithm}
\caption{Bubble sort}
\begin{algorithmic}

\For {$i \gets 1$ to $n - 1$}
    \For {$j \gets 1$ to $n - i$}
        \If {$a[j] > a[j + 1]$}
            \State $temp \gets a[j]$
            \State $a[j] \gets a[j + 1]$
            \State $a[j + 1] \gets temp$
        \EndIf
    \EndFor
\EndFor
\State 

\end{algorithmic}
\end{algorithm}
```

### Insertion sort

> [!figure]
>
> ```graphviz
> digraph {
>     splines=line;
>     nodesep=0;
>     node [shape=rect];
>     i [label="Insert first element of unsorted section\nat appropriate place in sorted section", margin="0.3 0"]
>     node [shape=record];
>     a [label=" <1> 1 | <s> &emsp;...&emsp; | <i> i | <j> j | <us> &emsp;...&emsp; | <n> n "];
>     node [shape=plaintext];
>     s [label="Sorted"];
>     a:1 -> s:nw [dir=back];
>     a:i -> s:ne [dir=back];
>     u [label="Unsorted"];
>     {rank=same; s; u;}
>     u:nw -> a:j;
>     u:ne -> a:n;
>     "wall" -> a:j:nw;
>     a:j -> a:s;
>     edge [style=invis];
>     s -> a:s;
>     u -> a:us;
> }
> ```

```algorithm
\begin{algorithm}
\caption{Insertion sort}
\begin{algorithmic}

\For {$j \gets 2$ to $n$}
    \State $key \gets a[j]$
    \State $i \gets j - 1$
    \While {$i > 0$ and $a[i] > key$}
        \State $a[i + 1] \gets a[i]$
        \State $i \gets i - 1$
    \EndWhile
    \State $a[i + 1] \gets key$
\EndFor

\end{algorithmic}
\end{algorithm}
```

### Quick sort

Quicksort is a divide-and-conquer algorithm.

```algorithm
\begin{algorithm}
\caption{$quicksort(array)$}
\begin{algorithmic}

\State $less[\ ]$, $greater[\ ]$
\If {$array.length > 1$}
    \State select $pivot$ from $array$
    \While {there are items left in $array$}
        \If {$item < pivot$}
            \State put $item$ into $less[\ ]$
        \Else
            \State put $item$ into $greater[\ ]$
        \EndIf
    \EndWhile
    \State $quicksort(less[\ ])$
    \State $quicksort(greater[\ ])$
\EndIf

\end{algorithmic}
\end{algorithm}
```

![Quick sort](https://upload.wikimedia.org/wikipedia/commons/9/9c/Quicksort-example.gif)

### Merge sort

An example of merge sort. First, divide the list into the smallest unit (1 element), then compare each element with the adjacent list to sort and merge the two adjacent lists. Finally, all the elements are sorted and merged.

![Merge sort](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

### Other sorting algorithms

The three sorting algorithms discussed here are the least efficient sorting algorithms. The reasons for discussing these sorting algorithms:

- They are the simplest algorithms to understand and analyze.
- They are the foundation of more efficient algorithms such as
    - Heap sort
    - Shell sort
    - Bucket sort
    - Radix sort

One algorithm may be more efficient for a list that is partially sorted, whereas another algorithm may be more efficient for a list that is completely unsorted.

## Searching

### Sequential search

```algorithm
\begin{algorithm}
\caption{Sequential search}
\begin{algorithmic}

\For {$i \gets 1$ to $n$}
    \If {$a[i] = key$}
        \Return $i$
    \EndIf
\EndFor
\Return $-1$

\end{algorithmic}
\end{algorithm}
```

### Binary search

The sequential search algorithm is very slow. If we have a list of a million elements, we must do a million comparisons in the worst case.

- If the list is not sorted, sequential search algorithm is the only solution.
- <mark>If the list is sorted</mark>, however, we can use a more efficient algorithm called **binary search**.

```algorithm
\begin{algorithm}
\caption{Binary search}
\begin{algorithmic}

\State $left \gets 1$
\State $right \gets n$
\While {$left \leq right$}
    \State $middle \gets \lfloor \dfrac{(left + right)}{2} \rfloor$
    \If {$key < a[middle]$}
        \State $right \gets middle - 1$
    \ElseIf {$key > a[middle]$}
        \State $left \gets middle + 1$
    \Else
        \Return $middle$
    \EndIf
\EndWhile
\Return $-1$

\end{algorithmic}
\end{algorithm}
```

> [!example]
> 台聯大-106-計算機概論-2：
>
> $Q:$
>
> A so-called algorithm is to make a big problem, which breaks into many small problems; if these small problems are resolved, then the original big problem will be solved.
>
> $Ans:$
>
> Binary Search, Merge Sort and Quick Sort are all divide-and-conquer algorithm.

## Subalgorithms

The principles of structured programming, however, require that an algorithm be broken into small units called **subalgorithms**. Each subalgorithm is in turn divided into smaller subalgorithms.

A good example is the algorithm for the *selection sort*. Finding the smallest integer in the unsorted sublist is an independent task that can be considered as a subalgorithm. The algorithm `SelectionSort` calls the subalgorithm `FindSmallest` in each iteration.

## Recursion

In general, there are two approaches to writing algorithms for solving a problem.

- **Iteration**
- **Recursion**

Recursion is a process in which an algorithm calls itself.

> [!example]
> 台聯大-109-計算機概論-9：
>
> $Q:$
>
> Recursion is memory-intensive because:
>
> $Ans:$
>
> Previous function calls are still open when the function calls itself and the activation records of these previous calls still occupy space on the call stack.

To study a simple example, consider the calculation of a factorial ( $n!$ ).

### Iterative definition

$$
Factorial(n) =
\begin{cases}
    1 & \text{if } n = 0 \\
    n \times (n - 1) \times (n - 2) \ \cdots \ 3 \times 2 \times 1 & \text{if } n > 0
\end{cases}
$$

### Iterative solution

```algorithm
\begin{algorithm}
\caption{Factorial(n)}
\begin{algorithmic}

\State $f \gets 1$
\State $i \gets 1$
\While {$i \leq n$}
    \State $f \gets f \times i$
    \State $i \gets i + 1$
\EndWhile
\Return f

\end{algorithmic}
\end{algorithm}
```

### Recursive definition

$$
Factorial(n) =
\begin{cases}
    1 & \text{if } n = 0 \\
    n \times Factorial(n - 1) & \text{if } n > 0
\end{cases}
$$

### Recursive solution

```algorithm
\begin{algorithm}
\caption{Factorial(n)}
\begin{algorithmic}

\If {$n = 0$}
    \Return 1
\Else
    \Return Factorial(n - 1)
\EndIf

\end{algorithmic}
\end{algorithm}
```
