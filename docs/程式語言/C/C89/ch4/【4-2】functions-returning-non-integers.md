# 【4-2】Functions Returning Non-integers

So far our examples of functions have returned either no value (`void`) or an `int`. What if a function must return some other type? many numerical functions like `sqrt`, `sin`, and `cos` return `double`; other specialized functions return other types.

## Function definition

To illustrate how to deal with this, let us write and use the function `atof(s)`, which converts the string `s` to its double-precision floating-point equivalent. `atof` if an extension of `atoi`, which we showed versions of in Chapters 2 and 3. It handles an optional sign and decimal point, and the presence or absence of either part or fractional part. Our version is *not* a high-quality input conversion routine; that would take more space than we care to use. The standard library includes an `atof`; the header `<stdlib.h>` declares it.

First, `atof` itself must declare the type of value it returns, since it is not `int`. The type name precedes the function name:

```c
#include <ctype.h>

/* atof: convert string s to double */
double atof(char s[])
{
    double val, power;
    int i, sign;

    for (i = 0; isspace(s[i]); i++) { /* skip white space */
        ;
    }

    sign = (s[i] == '-') ? -1 : 1;
    if (s[i] == '+' || s[i] == '-') {
        i++;
    }

    for (val = 0.0; isdigit(s[i]); i++) {
        val = 10.0 * val + (s[i] - '0');
    }

    if (s[i] == '.') {
        i++;
    }

    for (power = 1.0; isdigit(s[i]); i++) {
        val = 10.0 * val + (s[i] - '0');
        power *= 10;
    }

    return sign * val / power;
}
```

## Function declaration

Second, and just as important, <mark>the calling routine must know that `atof` returns a non-int value.</mark>

One way to ensure this is to declare `atof` explicitly in the calling routine.

The declaration is shown in this primitive calculator (barely adequate for check-book balancing), which reads one number per line, optionally preceded with a sign, and adds them up, printing the running sum after each input:

```c
#include <stdio.h>

#define MAXLINE 100

/* rudimentary calculator */
int main()
{
    double sum, atof(char []);
    char line[MAXLINE];
    int getline(char line[], int max);

    sum = 0;

    while (getline(line, MAXLINE) > 0) {
        printf("\t%g\n", sum += atof(line));
    }

    return 0;
}

/* getline: get line into s, return length */
int getline(char s[], int lim)
{
    int c, i;

    i = 0;
    while (--lim > 0 && (c = getchar()) != EOF && c != '\n') {
        s[i++] = c;
    }

    if (c == '\n') {
        s[i++] = c;
    }

    s[i] = '\0';

    return i;
}
```

The declaration

```c
double sum, atof(char []);
```

says that `sum` is a `double` variable, and that `atof` is a function that takes one `char[]` argument and returns a `double`.

- The function `atof` must be declared and defined consistently. If `atof` itself and the call to it in main have inconsistent types in the same source file, the error will be detected by the compiler.
- But if (as is more likely) `atof` were compiled separately, the mismatch would not be detected, `atof` would return a `double` that `main` would treat as an `int`, and meaningless answers would result.

In the light of what we have said about how declarations must match definitions, this might seem surprising. The reason a mismatch can happen is that if there is *no* **function prototype**, <mark>a function is implicitly declared by its first appearance in an expression</mark>, such as

```c
sum += atof(line)
```

> [!attention]
> If a name that has not been previously declared occurs in an expression and is followed by a left parentheses, it is declared by context to be a function name, the function is assumed to return an `int`, and nothing is assumed about its arguments.

Furthermore, if a function declaration does not include arguments, as in

```c
double atof();
```

that too is taken to mean that <mark>nothing is to be assumed about the arguments of `atof`; all parameter checking is turned off.</mark>

This special meaning of the empty argument list is intended to permit older C programs to compile with new compilers. But it's a bad idea to use it with new C programs.

- If the function takes arguments, declare them
- <mark>If it takes no arguments, use `void`</mark>

    ```c
    int foo(void);
    ```

Given `atof`, properly declared, we could write `atoi` (convert a string to `int`) in terms of it:

```c
/* atoi: convert string s to integer using atof */
int atoi(char s[])
{
    double atof(char s[]);

    return (int) atof(s);
}
```

Notice the structure of the declarations and the return statement. The value of the expression in

```algorithm
\begin{algorithmic}
\State return expression;
\end{algorithmic}
```

is converted to the type of the function before the return is taken.

Therefore, the value of `atof`, a `double`, is converted automatically to `int` when it appears in this `return`, since the function `atoi` returns an `int`.

- This operation does potentionally discard information, however, so some compilers warn of it.
- The cast states explicitly that the operation is intended, and suppresses any warning.
