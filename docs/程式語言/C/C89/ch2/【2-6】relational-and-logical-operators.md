# 【2-6】Relational and Logical Operators

## Relational operators

The **relational operators** are

`>` `>=` `<` `<=`

They all have the same precedence. Just below them in precedence are the equality operators:

`==` `!=`

Relational operators have lower precedence than arithmetic operators, so an expression like `i < lim - 1` is taken as `i < (lim - 1)`, as would be expected.

## Logical operators

### Logical AND and OR

More interesting are the **logical operators** `&&` and `||`. Expressions connected by `&&` or `||` are evaluated left to right, and <mark>evaluation stops as soon as the truth or falsehood of the result is known.</mark> Most C programs rely on these properties.

> [!example]
> Here is a loop from the input function `getline` that we wrote in Chapter 1:
>
> ```c
> for (i = 0; i < lim - 1 && (c = getchar()) != '\n' && c != EOF; ++i) {
>     s[i] = c;
> }
> ```
>
> Before reading a new character it is necessary to check that there is room to store it in the array `s`, so the test `i < lim - 1` *must* be made first. Moreover, if this test fails, we must not go on and read another character.
>
> Similarly, it would be unfortunate if `c` were tested against `EOF` before `getchar` is called; therefore the call and assignment must occur before the character in `c` is tested.
>
> The precedence of `&&` is higher than that of `||,` and both are lower than relational and equality operators, so expressions like
>
> ```c
> i < lim - 1 && (c = getchar()) != '\n' && c != EOF
> ```
>
> need no extra parentheses. But since the precedence of `!=` is higher than assignment, parentheses are needed in
>
> ```c
> (c = getchar()) != '\n'
> ```
>
> to achieve the desired result of assignment to `c` and then comparison with `'\n'`.

### Logical NOT

By definition, the numeric value of a relational or logical expression is

- `1` if the relation is `true`
- `0` if the relation is `false`

The **unary negation operator** `!` converts a non-zero operand into 0, and a zero operand in 1. A common use of `!` is in constructions like

```c
if (!valid)
```

rather than

```c
if (valid == 0)
```

It's hard to generalize about which form is better. Constructions like `!valid` read nicely ("if not valid"), but more complicated ones can be hard to understand.

## Value of relational expressions and logical expressions

Relational expressions like `i > j` and logical expressions connected by `&&` and `||` are defined to have value:

- 1 if true
- 0 if false

Thus the assignment

```c
d = c >= '0' && c <= '9'
```

sets `d` to 1 if `c` is a digit, and 0 if not.

However, functions like `isdigit` *may return any non-zero value for true.*

?> In the test part of `if`, `while`, `for`, etc., `true` just means *non-zero*, so this makes no difference.

> [C89 &sect;3.3.8 Relational operators][]
>
> Each of the operators `<` (less than), `>` (greater than), `<=` (less than or equal to), and `>=` (greater than or equal to) shall yield
>
> - 1 if the specified relation is true and
> - 0 if it is false.
>
> The result has type int.
>
> The expression `a < b < c` is *not* interpreted as in ordinary mathematics.
>
> As the syntax indicates, it means `(a < b) < c` ; in other words, "if `a` is less than `b` compare `1` to `c` ; otherwise compare `0` to `c` ."

> [C89 &sect;3.3.13 Logical AND operator][]
>
> The `&&` operator shall yield
>
> - 1 if both of its operands compare unequal to 0,
> - otherwise it yields 0.
>
> The result has type `int`.

> [C89 &sect;3.3.14 Logical OR operator][]
> The `||` operator shall yield
>
> - 1 if either of its operands compare unequal to 0,
> - otherwise it yields 0.
>
> The result has type `int`.

[C89 &sect;3.3.8 Relational operators]: https://port70.net/~nsz/c/c89/c89-draft.html#3.3.8
[C89 &sect;3.3.13 Logical AND operator]: https://port70.net/~nsz/c/c89/c89-draft.html#3.3.13
[C89 &sect;3.3.14 Logical OR operator]: https://port70.net/~nsz/c/c89/c89-draft.html#3.3.14
