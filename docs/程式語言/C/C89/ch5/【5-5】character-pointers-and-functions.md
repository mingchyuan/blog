# 【5-5】Character Pointers and Functions

A **string constant**, written as

```c
"I am a string"
```

is an array of characters. In the internal representation, the array is terminated with the null character `'\0'` so that programs can find the end. The length in storage is thus one more than the number of characters between the double quotes.

Perhaps the most common occurrence of string constants is as arguments to functions, as in

```c
printf("hello, world\n");
```

When a character string like this appears in a program, access to it is through a character pointer; `printf` receives a pointer to the beginning of the character array. That is, a string constant is accessed by a pointer to its first element.

String constants need not be function arguments. If `pmessage` is declared as

```c
char *pmessage;
```

then the statement

```c
pmessage = "now is the time";
```

assigns to `pmessage` a pointer to the character array. <mark>This is *not* a string copy; only pointers are involved.</mark> <mark>C does not provide any operators for processing an entire string of characters as a unit.</mark>

## Difference between char array and char pointer

There is an important difference between these definitions:

```c
char amessage[] = "now is the time"; /* an array */
char *pmessage = "now is the time";  /* a pointer */
```

- `amessage` is an array, just big enough to hold the sequence of characters and `'\0'` that initializes it. Individual characters within the array may be changed but `amessage` will <mark>always refer to the same storage.</mark>
- On the other hand, `pmessage` is a pointer, initialized to point to a string constant; <mark>the pointer may subsequently be modified to point elsewhere, but the result is undefined if you try to modify the string contents.</mark>

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=plaintext];
>     "pmessage:" -> "amessage:" [style=invis];
>     node [shape=rect];
>     p [label="&#9679;", fontsize=8;];
>     node [margin="0.3, 0.1"]
>     s1 [label="now is the time\\0"];
>     s2 [label="now is the time\\0"];
>     edge [headclip=false, tailclip=false]
>     p:c -> s1:w [minlen=2];
>     {rank=same; "pmessage:"; p; s1;}
>     {rank=same; "amessage:"; s2;}
> }
> ```

We will illustrate more aspects of pointers and arrays by studying versions of two useful functions adapted from the standard library.

> [!example]
> The first function is `strcpy(s, t)`, which copies the string `t` to the string `s`. It would be nice just to say `s = t` but this copies the pointer, not the characters. To copy the characters, we need a loop. The array version first:
>
> ```c
> /* strcpy: copy t to s; array subscript version */
> void strcpy(char *s, char *t)
> {
>     int i;
> 
>     i = 0;
>     while ((s[i] = t[i]) != '\0') {
>         i++;
>     }
> }
> ```
>
> For contrast, here is a version of `strcpy` with pointers:
>
> ```c
> /* strcpy: copy t to s; pointer version */
> void strcpy(char *s, char *t)
> {
>     while ((*s = *t) != '\0') {
>         s++;
>         t++;
>     }
> }
> ```
>
> Because arguments are passed by value, `strcpy` can use the parameters `s` and `t` in any way it pleases. Here they are conveniently initialized pointers, which are marched along the arrays a character at a time, until the `'\0'` that terminates `t` has been copied into `s`.
>
> In practice, `strcpy` would not be written as we showed it above. Experienced C programmers would prefer
>
> ```c
> /* strcpy: copy t to s; pointer version 2 */
> void strcpy(char *s, char *t)
> {
>     while ((*s++ = *t++) != '\0') {
>         ;
>     }
> }
> ```
>
> This moves the increment of `s` and `t` into the test part of the loop. The value of `*t++` is the character that `t` pointed to before `t` was incremented; the postfix `++` doesn't change `t` until after this character has been fetched. In the same way, the character is stored into the old `s` position before `s` is incremented. This character is also the value that is compared against `'\0'` to control the loop. The net effect is that characters are copied from `t` to `s`, up and including the terminating `'\0'`.
>
> As the final abbreviation, observe that a comparison against `'\0'` is redundant, since the question is merely whether the expression is zero. So the function would likely be written as
>
> ```c
> /* strcpy: copy t to s; pointer version 3 */
> void strcpy(char *s, char *t)
> {
>     while (*s++ = *t++) {
>         ;
>     }
> }
> ```
>
> Although this may seem cryptic at first sight, the notational convenience is considerable, and the idiom should be mastered, because you will see it frequently in C programs.
>
> The `strcpy` in the standard library (`<string.h>`) returns the target string as its function value.

> [!example]
> The second routine that we will examine is `strcmp(s, t)`, which compares the character strings `s` and `t`, and returns negative, zero or positive if `s` is lexicographically less than, equal to, or greater than `t`. The value is obtained by subtracting the characters at the first position where `s` and `t` disagree.
>
> ```c
> /* strcmp: return <0 if s<t, 0 if s==t, >0 if s>t */
> int strcmp(char *s, char *t)
> {
>     int i;
> 
>     for (i = 0; s[i] == t[i]; i++) {
>         if (s[i] == '\0') {
>             return 0;
>         }
>     }
>
>     return s[i] - t[i];
> }
> ```
>
> The pointer version of `strcmp`:
>
> ```c
> /* strcmp: return <0 if s<t, 0 if s==t, >0 if s>t */
> int strcmp(char *s, char *t)
> {
>     for ( ; *s == *t; s++, t++) {
>         if (*s == '\0') {
>             return 0;
>         }
>     }
>
>     return *s - *t;
> }
> ```

Since `++` and `--` are either prefix or postfix operators, other combinations of `*` and `++` and `--` occur, although less frequently. For example,

```c
*--p
```

decrements `p` before fetching the character that `p` points to. In fact, the pair of expressions

```c
*p++ = val; /* push val onto stack */
val = *--p; /* pop top of stack into val */
```

!> [勘誤][]: `val = *--p;` decrements `p` first, then stores the value pointed to by the new (decremented) `p` into `val`.

?> 應該要改成 postfix `val = *p--;`，先指派值給 `val` 後再遞減指標：

> [!example]
>
> ```c
> #include <stdio.h>
> 
> int main()
> {
>     int stack[5] = {0, 1, 2, 3, 4};
>     int val;
>     int *p = &stack[4];
> 
>     printf("top = %d\n", *p);
>     printf("pop()\n");
> 
>     val = *p--;
> 
>     printf("val = %d\n", val);
>     printf("top = %d\n", *p);
> 
>     return 0;
> }
> ```

[勘誤]: https://users.cs.utah.edu/~aburtsev/238P/2018fall/discussions/discussion02-c-basics-ptrs-code/kernigham-and-richie-C-book-errata.txt

are the standard idiom for pushing and popping a stack; see Section 4.3.
The header `<string.h>` contains declarations for the functions mentioned in this section, plus a variety of other string-handling functions from the standard library.
