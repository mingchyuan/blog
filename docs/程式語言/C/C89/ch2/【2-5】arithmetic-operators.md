# 【2-5】Arithmetic Operators

The binary arithmetic operators are `+`, `-`, `*`, `/`, and the modulus operator `%`.

<mark>Integer division truncates any fractional part.</mark>

## Modulus operator

The expression

```c
x % y
```

produces the remainder when `x` is divided by `y`, and thus is zero when `y` divides `x` exactly.

> [!example]
> A year is a leap year if it is divisible by 4 but not by 100, except that years divisible by 400 are leap years. Therefore
>
> ```c
> if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
>     printf("%d is a leap year\n", year);
> } else {
>     printf("%d is not a leap year\n", year);
> }
> ```

- The `%` operator *cannot* be applied to a `float` or `double`.
- The direction of truncation for `/` and the sign of the result for `%` are *machine-dependent* for *negative operands*, as is the action taken on *overflow* or *underflow*.

## Precedence

The *binary* `+` and `-` operators have the same precedence, which is lower than the precedence of `*`, `/` and `%`, which is in turn lower than *unary* `+` and `-`. Arithmetic operators associate left to right.

?> See also: [【2-12】Precedence and Order of Evaluation][]

[【2-12】Precedence and Order of Evaluation]: /程式語言/C/C89/ch2/【2-12】precedence-and-order-of-evaluation
