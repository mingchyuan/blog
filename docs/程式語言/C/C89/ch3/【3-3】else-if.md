# 【3-3】Else-If

The construction

```algorithm
\begin{algorithmic}
\State if (expression)
\State $\qquad$statement
\State else if (expression)
\State $\qquad$statement
\State else if (expression)
\State $\qquad$statement
\State else if (expression)
\State $\qquad$statement
\State else
\State $\qquad$statement
\end{algorithmic}
```

occurs so often that it is worth a brief separate discussion.

This sequence of `if` statements is the most general way of writing a multi-way decision. <mark>The $expressions$ are evaluated in order; if an $expression$ is true, the $statement$ associated with it is executed, and this terminates the whole chain.</mark> As always, the code for each $statement$ is either a single statement, or a group of them in braces.

The last `else` part handles the "none of the above" or default case where none of the other conditions is satisfied. Sometimes there is no explicit action for the default; in that case the trailing

```algorithm
\begin{algorithmic}
\State else
\State $\qquad$statement
\end{algorithmic}
```

can be omitted, or it may be used for error checking to catch an "impossible" condition.

> [!example]
> To illustrate a three-way decision, here is a binary search function that decides if a particular value `x` occurs in the sorted array `v`. The elements of `v` must be in increasing order. The function returns the position (a number between $0$ and $n-1$) if `x` occurs in `v`, and $-1$ if not.
>
> Binary search first compares the input value `x` to the middle element of the array `v`. If `x` is less than the middle value, searching focuses on the lower half of the table, otherwise on the upper half. In either case, the next step is to compare `x` to the middle element of the selected half. This process of dividing the range in two continues until the value is found or the range is empty.
>
> ```c
> /* binsearch: find x in v[0] <= v[1] <= ... <= v[n-1] */
> int binsearch(int x, int v[], int n)
> {
>     int low, high, mid;
>     low = 0;
>     high = n - 1;
>
>     while (low <= high) {
>         mid = (low + high) / 2;
>
>         if (x < v[mid]) {
>             high = mid + 1;
>         } else if (x > v[mid]) {
>             low = mid + 1;
>         } else { /* found match */
>             return mid;
>         }
>     }
>
>     return -1; /* no match */
> }
> ```
>
> The fundamental decision is whether `x` is less than, greater than, or equal to the middle element `v[mid]` at each step; this is a natural for `else-if`.
