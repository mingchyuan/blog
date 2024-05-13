# 【3-2】If-Else

The `if-else` statement is used to express decisions. Formally the syntax is

```algorithm
\begin{algorithmic}
\State if (expression)
\State $\qquad$statement1
\State else
\State $\qquad$statement2
\end{algorithmic}
```

where the `else` part is optional.

The $expression$ is evaluated:

- If it is true (that is, if $expression$ has a non-zero value), $statement_1$ is executed.
- If it is false ($expression$ is zero) and if there is an `else` part, $statement_2$ is executed instead.

> [C89 &sect;3.6.4.1 The if statement][]
>
> ```algorithm
> \begin{algorithmic}
> \State if ( expression ) statement1
> \State $\qquad$
> \State if ( expression ) statement1 else statement2
> \end{algorithmic}
> ```
>
> In both forms, $statement_1$ is executed if the expression compares unequal to 0.
>
> In the else form, $statement_2$ is executed if the expression compares equal to 0. If $statement_1$ is reached via a label, $statement_2$ is not executed.

[C89 &sect;3.6.4.1 The if statement]: https://port70.net/~nsz/c/c89/c89-draft.html#3.6.4.1

Since an `if` tests the numeric value of an expression, certain coding shortcuts are possible. The most obvious is writing

```c
if (expression)
```

instead of

```c
if (expression != 0)
```

Sometimes this is natural and clear; at other times it can be cryptic.

Because the `else` part of an `if-else` is optional, there is an ambiguity when an else if omitted from a nested `if` sequence. <mark>This is resolved by associating the `else` with the closest previous `else`-less `if`.</mark>

> [C89 &sect;3.6.4.1 The if statement][]
>
> An `else` is associated with the lexically immediately preceding `else`-less `if` that is in the same block (but not in an enclosed block).

> [!example]
>
> ```c
> if (n > 0)
>     if (a > b)
>         z = a;
>     else
>         z = b;
> ```
>
> the `else` goes to the inner `if`, as we have shown by indentation. If that isn't what you want, braces must be used to force the proper association:
>
> ```c
> if (n > 0) {
>     if (a > b)
>         z = a;
> } else
>     z = b;
> ```

The ambiguity is especially pernicious in situations like this:

> [!example]
>
> ```c
> if (n > 0)
>     for (i = 0; i < n; i++)
>         if (s[i] > 0) {
>             printf("...");
>             return i;
>         }
> else /* WRONG */
>     printf("error -- n is negative\n");
> ```
>
> The indentation shows unequivocally what you want, but the compiler doesn't get the message, and associates the `else` with the inner `if`. This kind of bug can be hard to find; it's a good idea to use braces when there are nested `if`s.

By the way, notice that there is a semicolon after `z = a` in

```c
if (a > b)
    z = a;
else
    z = b;
```

This is because grammatically, a $statement$ follows the `if`, and an expression statement like `z = a;` is always terminated by a semicolon.
