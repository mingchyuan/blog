# 【2-3】Constants

## Integer constant

- An **integer constant** like `1234` is an `int`
- A `long` constant is written with a terminal `l` (ell) or `L`, as in `123456789L`
- An integer constant too big to fit into an `int` will also be taken as a `long`
- Unsigned constants are written with a terminal `u` or `U`, and the suffix `ul` or `UL` indicates `unsigned long`

```c
/* If INT_MAX is 2147483647 */

1234;       /* (int)1234 */
2147483648; /* (unsigned long)2147483648UL */
1234L;      /* (long)1234L */
```

### Octal and hexadecimal

The value of an integer can be specified in octal or hexadecimal instead of decimal. A leading `0` (zero) on an integer constant means octal; a leading `0x` or `0X` means hexadecimal.

For example:

```c
int d = 31;   /* decimal */
int o = 037;  /* octal */
int x = 0x1f; /* hexadecimal */
int X = 0X1F; /* hexadecimal */
```

Octal and hexadecimal constants may also be followed by `L` to make them `long` and `U` to make them `unsigned`:

```c
0XFUL; /* an unsigned long constant with value 15 decimal */
```

## Character constant

A **character constant** is an *integer*, written as one character within single quotes, such as `'x'`.

The value of a character constant is the numeric value of the character in the machine's character set.

> [!example]
> In the [ASCII character set][] the character constant `'0'` has the value $48$, which is unrelated to the numeric value 0. If we write `'0'` instead of a numeric value like 48 that depends on the character set, the program is independent of the particular value and easier to read.

[ASCII character set]: https://www.ascii-code.com/

Character constants participate in numeric operations just as any other integers, although they are most often used in comparisons with other characters.

### Escape sequence

Certain characters can be represented in character and string constants by escape sequences like `\n` (newline); these sequences look like two characters, but represent only one. In addition, an arbitrary byte-sized bit pattern can be specified by

```c
'\ooo'
```

where *ooo* is one to three octal digits ($0$...$7$) or by

```c
'\xhh'
```

where *hh* is one or more hexadecimal digits ($0$...$9$, $a$...$f$, $A$...$F$).

So we might write

```c
#define VTAB '\013' /* ASCII vertical tab */
#define BELL '\007' /* ASCII bell character */
```

or, in hexadecimal,

```c
#define VTAB '\xb' /* ASCII vertical tab */
#define BELL '\x7' /* ASCII bell character */
```

The complete set of escape sequences is

| Escape sequence | Description            | Escape sequence | Description        |
| --------------- | ---------------------- | --------------- | ------------------ |
| \a              | alert (bell) character | \\              | backslash          |
| \b              | backspace              | \?              | question mark      |
| \f              | formfeed               | \'              | single quote       |
| \n              | newline                | \"              | double quote       |
| \r              | carriage return        | \ooo            | octal number       |
| \t              | horizontal tab         | \xhh            | hexadecimal number |
| \v              | vertical tab           |                 |                    |

The character constant `'\0'` represents the character with value $0$, the **null character**. `'\0'` is often written instead of 0 to emphasize the character nature of some expression, but the numeric value is just 0.

## Floating-point constant

**Floating-point constant**s contain a decimal point (`123.4`) or an exponent (`1e-2`) or both; their type is `double`, unless suffixed. The suffixes `f` or `F` indicate a `float` constant; `l` or `L` indicate a `long double`.

```c
123.4;  /* (double)(123.4) */
1e-2;   /* (double)(0.01) */
123.4F; /* (float)(123.4F) */
123.4L; /* (long double)(123.4L) */
```

## Enumeration constant

There is one other kind of constant, the **enumeration constant**. <mark>An enumeration is a list of constant integer values</mark>, as in

```c
enum boolean { NO, YES };
```

The first name in an `enum` has value $0$, the next $1$, and so on, unless explicit values are specified. If not all values are specified, unspecified values continue the progression from the last specified value, as the second of these examples:

> [C89 &sect;3.5.2.2 Enumeration specifiers][]
>
> Each subsequent enumerator with no `=` defines its enumeration constant as the value of the constant expression obtained by adding 1 to the value of the previous enumeration constant.

[C89 &sect;3.5.2.2 Enumeration specifiers]: https://port70.net/~nsz/c/c89/c89-draft.html#3.5.2.2

```c
enum escapes { BELL = '\a', BACKSPACE = '\b', TAB = '\t',
               NEWLINE = '\n', VTAB = '\v', RETURN = '\r' };

enum months { JAN = 1, FEB, MAR, APR, MAY, JUN,
              JUL, AUG, SEP, OCT, NOV, DEC };
                /* FEB = 2, MAR = 3, etc. */
```

- <mark>Names in different enumerations must be distinct.</mark>
- <mark>Values need not be distinct in the same enumeration.</mark>

Enumerations provide a convenient way to associate constant values with names, an alternative to `#define` with the advantage that the values can be generated for you:

<!-- tabs:start -->

<!-- tab:define -->

```c
#define MON  1
#define TUE  2
#define WED  3
#define THU  4
#define FRI  5
#define SAT  6
#define SUN  7
```

<!-- tab:enum -->

```c
enum days { MON=1, TUE, WED, THU, FRI, SAT, SUN };
```

<!-- tabs:end -->

Although variables of `enum` types may be declared, compilers need not check that what you store in such a variable is a valid value for the enumeration.

Nevertheless, enumeration variables offer the chance of checking and so are often better than `#define`s.

```c
enum colors { RED, GREEN, BLUE };

int main()
{
    enum colors c = RED;

    /*
     * No compile error occurs
     * 編譯器不會檢查指派的整數值是否有符合 enum 定義。
     * 考慮在程式執行時，指派數個整數變數相加的值給一個 enum 變數，
     * 該值可能是任何數值，因此賦予定義外的整數值並不會發生編譯錯誤。
     */
    enum colors c1 = 5;

    /* 
     * Compile error
     * 但編譯器會檢查 type。
     */
    enum colors c2 = "a";

    return 0;
}
```

In addition, a debugger may be able to print values of enumeration variables in their symbolic form.

## Constant expression

A constant expression is an expression that involves only constants. <mark>Such expressions may be evaluated at during compilation rather than run-time</mark>, and accordingly may be used in any place that a constant can occur, as in

```c
#define MAXLINE 1000
char line[MAXLINE + 1];
```

or

```c
#define LEAP 1 /* in leap years */
int days[31 + 28 + LEAP + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31];
```

## String constant

A **string constant**, or **string literal**, is a sequence of zero or more characters surrounded by double quotes, as in

```c
"I am a string"
```

or

```c
"" /* the empty string */
```

The quotes are not part of the string, but serve only to delimit it.

The same escape sequences used in character constants apply in strings; `\"` represents the double-quote character.

<mark>String constants can be concatenated at compile time:</mark>

```c
"hello, " "world"
```

is equivalent to

```c
"hello, world"
```

This is useful for splitting up long strings across several source lines.

> [!note]
> Technically, <mark>a string constant is an array of characters.</mark> <mark>The internal representation of a string has a null character `'\0'` at the end</mark>, so the physical storage required is one more than the number of characters written between the quotes.
>
> ```c
> char str[13] = "hello, world";
> ```
>
> ```graphviz
> digraph {
>         node [shape=none];
>     {
>         node [shape=none];
>         str [label="str"];
>     }
>     {
>         node [shape=record];
>         hw [label="<0> h|e|l|l|o|,| |w|o|r|l|d|<12> \\0"];
>     }
>     {rank=same; str; hw;}
>     "str[0]" -> hw:0;
>     "str[12]" -> hw:12;
> }
> ```

This representation means that there is no limit to how long a string can be, but programs must scan a string completely to determine its length. The standard
library function `strlen(s)` returns the length of its character string argument `s`, excluding the terminal `'\0'`. Here is our version:

```c
/* strlen: return length of s */
int strlen(char s[])
{
    int i = 0;

    while (s[i] != '\0') {
        ++i;
    }
    
    return i;
}
```

`strlen` and other string functions are declared in the standard header [<string.h>][].

[<string.h>]: https://en.cppreference.com/w/c/string/byte#String_examination

Be careful to distinguish between a character constant and a string that contains a single character:

> [!example]
> `'x'` is *not* the same as `"x"`.
>
> - The former (`'x'`) is an *integer*, used to produce the numeric value of the letter x in the machine's character set.
> - The latter (`"x"`) is *an array of characters* that contains one character (the letter x) and a `'\0'`.
