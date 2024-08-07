# 【2-12】Precedence and Order of Evaluation

Table 2.1 summarizes the rules for precedence and associativity of all operators, including those that we have not yet discussed. <mark>Operators on the same line have the same precedence; rows are in order of decreasing precedence</mark>.

- Unary `&` `+`, `-`, and `*` have higher precedence than the binary forms.
- `*`, `/`, and `%` all have the same precedence, which is higher than that of binary `+` and `-`.
- Chapter 3 discusses `,` (comma operator).
- Chapter 4 discusses `()` (refers to function call).
- Chapter 5 discusses `*` (indirection through a pointer) and `&` (address of an object).
- Chapter 6 discusses `->` and `.` are used to access members of structures, along with `sizeof` (size of an object).

| Operators                                                | Associativity |
| -------------------------------------------------------- | ------------- |
| `()` `[]` `->` `.`                                       | left to right |
| `!` `~` `++` `--` `+` `-` `*` `(type)` `sizeof`          | right to left |
| `*` `/` `%`                                              | left to right |
| `+` `-`                                                  | left to right |
| `<<` `>>`                                                | left to right |
| `<` `<=` `>` `>=`                                        | left to right |
| `==` `!=`                                                | left to right |
| `&`                                                      | left to right |
| `^`                                                      | left to right |
| `\|`                                                     | left to right |
| `&&`                                                     | left to right |
| `\|\|`                                                   | left to right |
| `?:`                                                     | right to left |
| `=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` `\|=` `<<=` `>>=` | right to left |
| `,`                                                      | left to right |

<p style="text-align: center;">Table 2.1: Precedence and Associativity of Operators</p>

Note that the precedence of the bitwise operators `&`, `^`, and `|` falls below `==` and `!=`. This implies that bit-testing expressions like

```c
if ((x & MASK) == 0) {
    ...
}
```

must be fully parenthesized to give proper results.

C, like most languages, does not specify the order in which the operands of an operator are evaluated. (The exceptions are `&&`, `||`, `?:`, and `,`.) For example, in a statement like

```c
x = f() + g();
```

`f` may be evaluated before `g` or vice versa; thus if either `f` or `g` alters a variable on which the other depends, `x` can depend on the order of evaluation. Intermediate results can be stored in temporary variables to ensure a particular sequence.

Similarly, the order in which function arguments are evaluated is not specified, so the statement

```c
printf("%d %d\n", ++n, power(2, n)); /* WRONG */
```

can produce different results with different compilers, depending on whether `n` is incremented before `power` is called. The solution, of course, is to write

```c
++n;
printf("%d %d\n", n, power(2, n));
```

Function calls, nested assignment statements, and increment and decrement operators cause "side effects" - some variable is changed as a by-product of the evaluation of an expression. In any expression involving side effects, there can be subtle dependencies on the order in which variables taking part in the expression are updated. One unhappy situation is typified by the statement

```c
a[i] = i++;
```

The question is whether the subscript is the old value of `i` or the new. Compilers can interpret this in different ways, and generate different answers depending on their interpretation. The standard intentionally leaves most such matters unspecified. When side effects (assignment to variables) take place within an expression is left to the discretion of the compiler, since the best order depends strongly on machine architecture. (The standard does specify that all side effects on arguments take effect before a function is called, but that would not help in the call to `printf` above.)

The moral is that writing code that depends on order of evaluation is a bad programming practice in any language. Naturally, it is necessary to know what things to avoid, but if you don't know *how* they are done on various machines, you won't be tempted to take advantage of a particular implementation.
