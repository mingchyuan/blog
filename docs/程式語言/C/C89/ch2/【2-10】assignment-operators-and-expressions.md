# 【2-10】Assignment Operators and Expressions

An expression such as

```c
i = i + 2
```

in which the variable on the left side is repeated immediately on the right, can be written in the compressed form

```c
i += 2
```

The operator `+=` is called an assignment operator.

Most binary operators (operators like + that have a left and right operand) have a corresponding assignment operator `op=`, where `op` is one of

```c
+ - * / % << >> & ^ |
```

If $expr_1$ and $expr_2$ are expressions, then

```algorithm
\begin{algorithmic}
\State expr1 op= expr2
\end{algorithmic}
```

is equivalent to

```algorithm
\begin{algorithmic}
\State expr1 = (expr1) op (expr2)
\end{algorithmic}
```

except that $expr_1$ is computed only once. Notice the parentheses around $expr_2$:

```c
x *= y + 1
```

means

```c
x = x * (y + 1)
```

rather than

```c
x = x * y + 1
```

> [!example]
>
> As an example, the function `bitcount` counts the number of 1-bits in its integer argument.
>
> ```c
> /* bitcount: count 1 bits in x */
> int bitcount(unsigned x)
> {
>     int b;
>
>     for (b = 0; x != 0; x >>= 1) {
>         if (x & 01) b++;
>     }
>
>     return b;
> }
> ```
>
> Declaring the argument `x` to be an `unsigned` ensures that when it is right-shifted, vacated bits will be filled with zeros, not sign bits, regardless of the machine the program is run on.

## Advantage

Quite apart from conciseness, assignment operators have the advantage that they correspond better to the way people think.

We say "add 2 to `i`" or "increment `i` by 2", not "take `i`, add 2, then put the result back in `i`". Thus the expression `i += 2` is preferable to `i = i + 2`.

In addition, for a complicated expression like

```c
yyval[yypv[p3 + p4] + yypv[p1]] += 2
```

the assignment operator makes the code easier to understand, since the reader doesn't have to check painstakingly that two long expressions are indeed the same, or to wonder why they're not.

And an assignment operator may even help a compiler to produce efficient code.

?> See also: [Why are shortcuts like x += y considered good practice?][]

[Why are shortcuts like x += y considered good practice?]: https://softwareengineering.stackexchange.com/questions/134118/why-are-shortcuts-like-x-y-considered-good-practice

## Value of assignment expression

We have already seen that the assignment statement has a value and can occur in expressions; the most common example is

```c
while ((c = getchar()) != EOF)
    ...
```

The other assignment operators (`+=`, `-=`, etc.) can also occur in expressions, although this is less frequent.

In all such expressions,

- the type of an assignment expression is the type of its left operand
- the value is the value after the assignment

```c
int y;
printf("%d", y = 10); /* print 10 */
```

> [C89 &sect;3.3.16 Assignment operators][]
>
> An assignment operator stores a value in the object designated by the left operand.
>
> - An assignment expression has the value of the left operand after the assignment, but is not an lvalue.
> - The type of an assignment expression is the type of the left operand unless the left operand has qualified type, in which case it is the unqualified version of the type of the left operand.
>
> The side effect of updating the stored value of the left operand shall occur between the previous and the next sequence point.
>
> The order of evaluation of the operands is unspecified.

> [C89 &sect;A.7 INDEX 24][]
>
> - **lvalue**: comes originally from the assignment expression E1 = E2 , in which the left operand E1 must be a (modifiable) lvalue. It is perhaps better considered as representing an object "**locator value**."
> - **rvalue**: is in this Standard described as the "value of an expression."
>
> An obvious example of an lvalue is an identifier of an object.

> 【A-5】 Objects and Lvalues
>
> - An **Object** is a named region of storage
> - An **lvalue** is an expression referring to an object
>
> An obvious example of an lvalue expression is an identifier with suitable type and storage class.

[C89 &sect;3.3.16 Assignment operators]: https://port70.net/~nsz/c/c89/c89-draft.html#3.3.16
[C89 &sect;A.7 INDEX 24]: https://port70.net/~nsz/c/c89/c89-draft.html#24

```c
int a = 4;
int b = 9;
/*
 * automatic storage duration, int type
 * x 有明確的記憶體位址，所以是 lvalue
 * 而 (a + b) 並沒有明確指定是如何儲存在記憶體位址中，所以是 rvalue
 */
auto int x = a + b;
```
