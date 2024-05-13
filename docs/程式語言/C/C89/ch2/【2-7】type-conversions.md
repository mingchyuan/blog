# 【2-7】Type Conversions

When an operator has operands of different types, they are converted to a common type according to a small number of rules. In general, <mark>the only automatic conversions are those that convert a "narrower" operand into a "wider" one without losing information</mark>, such as converting an integer into floating point in an expression like `f + i`.

Expressions that don't make sense, like using a `float` as a subscript, are disallowed:

```c
int array[5] = {1, 2, 3, 4, 5};
float index = 2.5;

/* 
 * Compile error
 * Attempting to use a float as a subscript
 */
array[index] = 10.0;
printf("%d\n", array[index]);
```

Expressions that might lose information, like assigning a longer integer type to a shorter, or a floating-point type to an integer, may draw a warning, but they are not illegal:

```c
int i = 256;
float f = 3.16f;

printf("%d\n", (unsigned char)i); /* 0 */
printf("%d\n", (int)f);           /* 3 */
```

## Character conversions

A `char` is just a *small integer*, so `char`s may be freely used in arithmetic expressions. This permits considerable flexibility in certain kinds of character transformations.

> [!example]
> One is exemplified by this naive implementation of the function `atoi`, which converts a string of digits into its numeric equivalent.
>
> ```c
> /* atoi: convert s to integer */
> int atoi(char s[])
> {
>     int i, n;
>     n = 0;
> 
>     for (i = 0; s[i] >= '0' && s[i] <= '9'; ++i) {
>         n = 10 * n + (s[i] - '0');
>     }
> 
>     return n;
> }
> ```
>
> As we discussed in Chapter 1, the expression
>
> ```c
> s[i] - '0'
> ```
>
> gives the numeric value of the character stored in `s[i]`, because the values of `'0'`, `'1'`, etc., form a contiguous increasing sequence.

> [!example]
> Another example of `char` to `int` conversion is the function `lower`, which maps a single character to lower case for the [ASCII character set][]. If the character is not an upper case letter, `lower` returns it unchanged.
>
> [ASCII character set]: https://www.ascii-code.com/
>
> ```c
> /* lower: convert c to lower case; ASCII only */
> int lower(int c)
> {
>     if (c >= 'A' && c <= 'Z') {
>         return c + 'a' - 'A';
>     } else {
>         return c;
>     }
> }
> ```
>
> This works for ASCII because corresponding upper case and lower case letters are a fixed distance apart as numeric values and each alphabet is contiguous -- there is nothing but letters between `A` and `Z`. This latter observation is not true of the EBCDIC character set, however, so this code would convert more than just letters in EBCDIC.

### Plain char

There is one subtle point about the conversion of characters to integers.

?> The language does not specify whether variables of type `char` are `signed` or `unsigned` quantities.  

> [C89 &sect;3.1.2.5 Types][]
>
> An object declared as type `char` is large enough to store any member of the basic execution character set.
>
> If a member of the required source character set enumerated in [&sect;2.2.1 Character sets](https://port70.net/~nsz/c/c89/c89-draft.html#2.2.1) is stored in a `char` object, its value is guaranteed to be positive.
>
> If other quantities are stored in a `char` object, the behavior is *implementation-defined*: <mark>the values are treated as either signed or nonnegative integers.</mark>
>
> There are three character types, designated as
>
> - `char`
> - `signed char`
> - `unsigned char`

> [C89 &sect;3.2.1.1 Characters and integers][]
>
> As discussed earlier, whether a "plain" `char` is treated as signed is *implementation-defined*.

> [Character types][]
>
> `char` - type for character representation. Equivalent to either `signed char` or `unsigned char` (which one is *implementation-defined* and may be controlled by a compiler commandline switch), but
>
> <mark>`char` is a distinct type, different from both `signed char` and `unsigned char`.</mark>

[C89 &sect;3.1.2.5 Types]: https://port70.net/~nsz/c/c89/c89-draft.html#3.1.2.5
[C89 &sect;3.2.1.1 Characters and integers]: https://port70.net/~nsz/c/c89/c89-draft.html#3.2.1.1
[Character types]: https://en.cppreference.com/w/c/language/arithmetic_types#Character_types

When a `char` is converted to an `int`, can it ever produce a negative integer? The answer varies from machine to machine, reflecting differences in architecture. On some machines a `char` whose leftmost bit is 1 will be converted to a negative integer ("sign extension"). On others, a `char` is promoted to an int by adding zeros at the left end, and thus is always positive.

```c
signed char sc = 255;    /* range: -128 ~ 127 */
unsigned char uc = 255;  /* range:    0 ~ 255 */
char c = 255;            /* signed or unsigned, depends on machine */

printf("%d\n", sc);      /* -1 */
printf("%d\n", uc);      /* 255 */
printf("%d\n", (int)c);  /* -1 or 255, depending on the machine's implementation of char */
```

The definition of C guarantees that any character in the *machine's standard printing character set* (e.g. [ASCII printable characters][]) will never be negative, so these characters will always be positive quantities in expressions.

[ASCII printable characters]: https://www.ascii-code.com/characters/printable-characters

But arbitrary bit patterns stored in character variables may appear to be negative on some machines, yet positive on others. <mark>For portability, specify `signed` or `unsigned` if non-character data is to be stored in `char` variables.</mark>

### Character handling <ctype.h>

The standard header `<ctype.h>`, described in Appendix B, defines a family of functions that provide tests and conversions that are independent of character set.

> [!example]
> For example, the function `tolower` is a portable replacement for the function `lower` shown above. Similarly, the test
>
> ```c
> c >= '0' && c <= '9'
> ```
>
> can be replaced by
>
> ```c
> isdigit(c)
> ```

We will use the `<ctype.h>` functions from now on.

?> See also: [C89 &sect;4.3 CHARACTER HANDLING <ctype.h>][]

[C89 &sect;4.3 CHARACTER HANDLING <ctype.h>]: https://port70.net/~nsz/c/c89/c89-draft.html#4.3

## Implicit arithmetic conversions

**Implicit** arithmetic conversions work much as expected. <mark>In general, if an operator like `+` or `*` that takes two operands (a binary operator) has operands of different types, the "lower" type is promoted to the "higher" type before the operation proceeds.</mark>

The result is of the integer type. Section 6 of Appendix A states the conversion rules precisely. If there are no `unsigned` operands, however, the following informal set of rules will suffice:

- If either operand is `long double`, convert the other to `long double`
- Otherwise, if either operand is `double`, convert the other to `double`
- Otherwise, if either operand is `float`, convert the other to `float`
- Otherwise, convert `char` and `short` to `int`
- Then, if either operand is `long`, convert the other to `long`

Notice that `float`s in an expression are *not* automatically converted to `double`; this is a change from the original definition.

In general, mathematical functions like those in `<math.h>` will use *double precision*.

> [!note]
> The main reason for using `float` is to save storage in large arrays, or, less often, to save time on machines where double-precision arithmetic is particularly expensive.

> [C89 &sect;3.2.1.5 Usual arithmetic conversions][]
>
> Many binary operators that expect operands of arithmetic type cause conversions and yield result types in a similar way. The purpose is to yield a common type, which is also the type of the result.
>
> This pattern is called the usual arithmetic conversions:
>
> - First, if either operand has type `long double`, the other operand is converted to `long double`
> - Otherwise, if either operand has type `double`, the other operand is converted to `double`
> - Otherwise, if either operand has type `float`, the other operand is converted to `float`
> - Otherwise, the integral promotions are performed on both operands
>
> Then the following rules are applied:
>
> - If either operand has type `unsigned long int`, the other operand is converted to `unsigned long int`
> - Otherwise, if one operand has type `long int` and the other has type `unsigned int`
>     - if a `long int` can represent all values of an `unsigned int`, the operand of type `unsigned int` is converted to `long int`
>     - if a `long int` cannot represent all the values of an `unsigned int`, both operands are converted to `unsigned long int`
> - Otherwise, if either operand has type `long int`, the other operand is converted to `long int`
> - Otherwise, if either operand has type `unsigned int`, the other operand is converted to `unsigned int`
> - Otherwise, both operands have type `int`
>
> The values of operands and of the results of expressions may be represented in greater precision and range than that required by the type; <mark>the types are not changed thereby.</mark>

[C89 &sect;3.2.1.5 Usual arithmetic conversions]: https://port70.net/~nsz/c/c89/c89-draft.html#3.2.1.5

### Unsigned operands

Conversion rules are more complicated when `unsigned` operands are involved. The problem is that comparisons between signed and unsigned values are *machine-dependent*, because they depend on the sizes of the various integer types.

For example, suppose that `int` is 16 bits and `long` is 32 bits.

- Then `-1L < 1U`, because `1U`, which is an `unsigned int`, is promoted to a `signed long`
- But `-1L > 1UL` because `-1L` is promoted to `unsigned long` and thus appears to be a large positive number (`ULONG_MAX`)

?> See also: [Signed number representations][]

[Signed number representations]: https://en.wikipedia.org/wiki/Signed_number_representations

### In assignment

Conversions take place across assignments; the value of the right side is converted to the type of the left, which is the type of the result.

A character is converted to an integer, either by sign extension or not, as described above.

Longer integers are converted to shorter ones or to `char`s by dropping the excess high-order bits. Thus in

```c
int i;
char c;
i = c;
c = i;
```

the value of `c` is unchanged. This is true whether or not sign extension is involved. Reversing the order of assignments might lose information, however.

If `x` is `float` and `i` is `int`, then `x = i` and `i = x` both cause conversions; `float` to `int` causes truncation of any fractional part. When a `double` is converted to `float`, whether the value is rounded or truncated is *implementation dependent*.

### In function call without prototype

Since an argument of a function call is an expression, type conversion also takes place when arguments are passed to functions.

In the absence of a function prototype,

- `char` and `short` become `int`
- `float` becomes `double`

This is why we have declared function arguments to be `int` and `double` even when the function is called with `char` and `float`.

## Explicit type conversions

Finally, **explicit** type conversions can be forced ("coerced") in any expression, with a *unary operator* called a **cast**. In the construction

```algorithm
\begin{algorithmic}
\State (type name) expression
\end{algorithmic}
```

the $expression$ is converted to the named type by the conversion rules above. The precise meaning of a cast is as if the $expression$ were assigned to a variable of the specified type, which is then used in place of the whole construction.

For example, the library routine `sqrt` expects a `double` argument, and will produce nonsense if inadvertently handled something else. (`sqrt` is declared in `<math.h>`.) So if `n` is an integer, we can use

```c
sqrt((double) n)
```

to convert the value of `n` to `double` before passing it to `sqrt`. Note that the cast produces the *value* of `n` in the proper type; <mark>`n` itself is not altered.</mark> The cast operator has the same high precedence as other unary operators, as summarized in the table at the end of this chapter.

<mark>If arguments are declared by a function prototype, as the normally should be, the declaration causes automatic coercion of any arguments when the function is called.</mark> Thus, given a function prototype for `sqrt`:

```c
double sqrt(double)
```

the call

```c
root2 = sqrt(2)
```

coerces the integer `2` into the `double` value `2.0` without any need for a cast.

The standard library includes a portable implementation of a pseudo-random number generator and a function for initializing the seed; the former illustrates a cast:

```c
unsigned long int next = 1;

/* rand: return pseudo-random integer on 0..32767 */
int rand(void)
{
    next = next * 1103515245 + 12345;
    return (unsigned int)(next / 65536) % 32768;
}

/* srand: set seed for rand() */
void srand(unsigned int seed)
{
    next = seed;
}
```
