# 【4-5】Header Files

Let is now consider dividing the calculator program ([【4-3】][]) into several source files, as it might be is each of the components were substantially bigger.

1. The `main` function would go in one file, which we will call `main.c`; `push`, `pop`,
2. and their variables go into a second file,
3. `stack.c`; `getop` goes into a third,
4. `getop.c`. Finally, `getch` and `ungetch` go into a fourth file,
5. `getch.c`; we separate them from the others because they would come from a separately-compiled library in a realistic program.

[【4-3】]:  /程式語言/C/C89/ch4/【4-3】external-variables
[【4-11】]: /程式語言/C/C89/ch4/【4-11】the-c-preprocessor

There is one more thing to worry about - the definitions and declarations shared among files. As much as possible, we want to centralize this, so that there is only one copy to get and keep right as the program evolves. Accordingly, we will place this common material in a *header file*, `calc.h`, which will be included as necessary. (The `#include` line is described in Section [【4-11】][].) The resulting program then looks like this:

$calc.h$

```c
#define NUMBER '0'
void push(double);
double pop(void);
int getop(char []);
int getch(void);
void ungetch(int);
```

$main.c$

```c
#include <stdio.h>
#include <stdlib.h>
#include "calc.h"
#define MAXOP 100
main() {
    ...
}
```

$stack.c$

```c
#include <stdio.h>
#include "calc.h"
#define MAXVAL 100
int sp = 0;
double val[MAXVAL];
void push(double) {
    ...
}
double pop(void) {
    ...
}
```

$getop.c$

```c
#include <stdio.h>
#include <ctype.h>
#include "calc.h"
getop() {
    ...
}
```

$getch.c$

```c
#include <stdio.h>
#define BUFSIZE 100
char buf[BUFSIZE];
int bufp = 0;
int getch(void) {
    ...
}
void ungetch(int) {
    ...
}
```

There is a tradeoff between the desire that each file have access only to the information it needs for its job and the practical reality that it is harder to maintain more header files. Up to some moderate program size, it is probably best to have one header file that contains everything that is to be shared between any two parts of the program; that is the decision we made here. For a much larger program, more organization and more headers would be needed.
