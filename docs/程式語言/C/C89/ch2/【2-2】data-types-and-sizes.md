# 【2-2】Data Types and Sizes

## Basic data types

There are only a few basic data types in C:

- `char`  
    a single byte, capable of holding one character in the local character set.

- `int`  
    an integer, typically reflecting the natural size of integers on the host machine.

- `float`  
    single-precision floating point.

- `double`  
    double-precision floating point.

## Qualifiers

$$
\texttt{Qualifiers}
\begin{cases}
    & \texttt{Size}
    & \begin{cases}
        & \texttt{short} \\
        & \texttt{long}
    \end{cases}
    \\\\
    & \texttt{Signed}
    & \begin{cases}
        & \texttt{signed} \\
        & \texttt{unsigned}
    \end{cases}
\end{cases}
$$

### Size

In addition, there are a number of qualifiers that can be applied to these basic types.

#### Integer types

`short` and `long` apply to integers:

```c
short int sh;
long int counter;
```

The word `int` can be omitted in such declarations, and typically it is:

```c
short sh;
long counter;
```

The intent is that `short` and `long` should provide different lengths of integers where practical; `int` will normally be the natural size for a particular machine. `short` is often 16 bits long, and `int` either 16 or 32 bits.

<mark>Each compiler is free to choose appropriate sizes for its own hardware</mark>, subject only to the the restriction that `short`s and `int`s are at least 16 bits.

> [Integer types][]
>
> Besides the minimal bit counts, the C Standard guarantees that:
>
> 1 $==$ `sizeof(char)` $\leq$ `sizeof(short)` $\leq$ `sizeof(int)` $\leq$ `sizeof(long)`

[Integer types]: https://en.cppreference.com/w/c/language/arithmetic_types#Integer_types

#### Real floating types

As with integers, the sizes of floating-point objects are *implementation-defined*.

- `float`: single-precision floating-point
- `double`: double-precision floating-point
- `long double`: extended-precision floating-point

These three types could represent one, two or three distinct sizes.

?> See also: [Real floating types][]

[Real floating types]: https://en.cppreference.com/w/c/language/arithmetic_types#Real_floating_types

### Signed

The qualifier `signed` or `unsigned` may be applied to `char` or any integer.

`unsigned` numbers are always positive or zero, and obey the laws of arithmetic modulo $2^n$, where $n$ is the number of bits in the type.

> [!example]
> So, for instance, if `char`s are 8 bits,
>
> - `unsigned char` variables have values between $0$ and $255$.
> - `signed char` variables have values between $-128$ and $127$ (in a two's complement machine).

- Plain `char`s are signed or unsigned is *machine-dependent*
- Printable characters are always positive, e.g. [ASCII printable characters][]

?> See also: [【2-7】Type Conversions - Plain char][]

[ASCII printable characters]: https://www.ascii-code.com/characters/printable-characters
[【2-7】Type Conversions - Plain char]: /程式語言/C/C89/ch2/【2-7】type-conversions?id=plain-char

## Numerical limits

Actual (as opposed to guaranteed minimal) ranges are available in the library headers [<limits.h>][] and [<float.h>][].

[<limits.h>]: https://en.cppreference.com/w/c/types/limits
[<float.h>]: https://en.cppreference.com/w/c/types/limits#Limits_of_floating-point_types

```c
#include <limits.h>
#include <stdio.h>

int main()
{
    /* char */
    printf("Size of char %d\n", CHAR_BIT);
    printf("Size of char Min %d\n", CHAR_MIN);
    printf("Size of char Max %d\n", CHAR_MAX);
    printf("Size of unsigned char %u\n", UCHAR_MAX);

    /* int */
    printf("Size of int min %d\n", INT_MIN);
    printf("Size of int max %d\n", INT_MAX);
    printf("Size of unsigned int %u\n", UINT_MAX);

    /* long */
    printf("Size of long min %ld\n", LONG_MIN);
    printf("Size of long max %ld\n", LONG_MAX);
    printf("Size of unsigned long %lu\n", ULONG_MAX);

    /* short */
    printf("Size of short min %d\n", SHRT_MIN);
    printf("Size of short max %d\n", SHRT_MAX);
    printf("Size of unsigned short %u\n", USHRT_MAX);

    return 0;
}
```

?> See also: [C89 &sect;2.2.4.2 Numerical limits][]

[C89 &sect;2.2.4.2 Numerical limits]: https://port70.net/~nsz/c/c89/c89-draft.html#2.2.4.2
