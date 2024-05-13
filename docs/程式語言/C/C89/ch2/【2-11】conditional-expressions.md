# 【2-11】Conditional Expressions

The statements

```c
if (a > b) {
    z = a;
} else {
    z = b;
}
```

compute in `z` the maximum of `a` and `b`.

The **conditional expression**, written with the ternary operator `?:`, provides an alternate way to write this and similar constructions. In the expression

```algorithm
\begin{algorithmic}
\State expr1 ? expr2 : expr3
\end{algorithmic}
```

the expression $expr_1$ is evaluated first. If it is non-zero (true), then the expression $expr_2$ is evaluated, and that is the value of the conditional expression. Otherwise $expr_3$ is evaluated, and that is the value. Only one of $expr_2$ and $expr_3$ is evaluated.

> [C89 &sect;3.3.15 Conditional operator][]
>
> The first operand is evaluated; there is a sequence point after its evaluation.
>
> - The second operand is evaluated only if the first compares unequal to 0;
> - the third operand is evaluated only if the first compares equal to 0;
> - the value of the second or third operand (whichever is evaluated) is the result.
>
> A conditional expression does not yield an lvalue.

[C89 &sect;3.3.15 Conditional operator]: https://port70.net/~nsz/c/c89/c89-draft.html#3.3.15

Thus to set `z` to the maximum of `a` and `b`,

```c
/* z = max(a, b) */
z = (a > b) ? a : b;
```

It should be noted that the conditional expression is indeed an expression, and it can be used wherever any other expression can be.

Parentheses are not necessary around the first expression of a conditional expression, since the precedence of `?:` is very low, just above assignment. They are advisable anyway, however, since they make the condition part of the expression easier to see.

The conditional expression often leads to succinct code.

> [!example]
> This loop prints `n` elements of an array, 10 per line, with each column separated by one blank, and with each line (including the last) terminated by a newline.
>
> ```c
> for (i = 0; i < n; i++) {
>     printf("%6d%c", a[i], (i % 10 == 9 || i == n - 1) ? '\n' : ' ');
> }
> ```
>
> A newline is printed after every tenth element, and after the `n`-th. All other elements are followed by one blank. This might look tricky, but it's more compact than the equivalent `if-else`.

> [!example]
> Another good example is
>
> ```c
> printf("You have %d item%s.\n", n, n == 1 ? "" : "s");
> ```

## Conversion rules

If $expr_2$ and $expr_3$ are of different types, the type of the result is determined by the conversion rules discussed earlier in this chapter. For example, if `f` is a `float` and `n` an `int`, then the expression

```c
(n > 0) ? f : n
```

is of type `float` regardless of whether `n` is positive.

> [C89 &sect;3.3.15 Conditional operator][]
>
> - If both the second and third operands have arithmetic type, the usual arithmetic conversions are performed to bring them to a common type and the result has that type.
> - If both the operands have structure or union type, the result has that type.
> - If both operands have void type, the result has void type.
> - If both the second and third operands are pointers or one is a null pointer constant and the other is a pointer, the result type is a pointer to a type qualified with all the type qualifiers of the types pointed-to by both operands.
> - Furthermore, if both operands are pointers to compatible types or differently qualified versions of a compatible type, the result has the composite type; if one operand is a null pointer constant, the result has the type of the other operand; otherwise, one operand is a pointer to void or a qualified version of void, in which case the other operand is converted to type pointer to void, and the result has that type.
