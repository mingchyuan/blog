# 【2-4】Declarations

All variables must be declared before use, although certain declarations can be made implicitly by content. A declaration specifies a type, and contains a list of one or more variables of that type, as in

```c
int lower, upper, step;
char c, line[1000];
```

Variables can be distributed among declarations in any fashion; the lists above could well be written as

```c
int lower;
int upper;
int step;
char c;
char line[1000];
```

The latter form takes more space, but is convenient for adding a comment to each declaration for subsequent modifications.

## Initialization

A variable may also be initialized in its declaration. If the name is followed by an equals sign and an expression, the expression serves as an initializer, as in

```c
char esc = '\\';
int i = 0;
int limit = MAXLINE + 1;
float eps = 1.0e-5;
```

- If the variable in question is *not automatic*, <mark>the initialization is done once only, conceptionally before the program starts executing</mark>, and the initializer must be a constant expression.

- An explicitly initialized *automatic* variable is <mark>initialized each time the function or block it is in is entered</mark>; the initializer may be any expression.

- External and static variables are initialized to zero by default. Automatic variables for which is no explicit initializer have undefined (i.e., garbage) values.

> [C89 &sect;3.1.2.4 Storage durations of objects][]
>
> An object has a storage duration that determines its lifetime. There are two storage durations:
>
> - static
>  
> An object declared with external or internal linkage, or with the storage-class specifier `static` has **static storage duration**. For such an object, storage is reserved and its stored value is initialized only once, prior to program startup. The object exists and retains its last-stored value throughout the execution of the entire program.
>
> - automatic
>  
> An object declared with no linkage and without the storage-class specifier `static` has **automatic storage duration**. Storage is guaranteed to be reserved for a new instance of such an object on each normal entry into the block in which it is declared, or on a jump from outside the block to a label in the block or in an enclosed block.

[C89 &sect;3.1.2.4 Storage durations of objects]: https://port70.net/~nsz/c/c89/c89-draft.html#3.1.2.4

## Const qualifier

The qualifier `const` can be applied to the declaration of any variable to specify that its value will not be changed. For an array, the `const` qualifier says that the elements will not be altered.

```c
const double e = 2.71828182845905;
const char msg[] = "warning: ";
```

The `const` declaration can also be used with array arguments, <mark>to indicate that the function does not change that array</mark>:

```c
int strlen(const char[]);
```

The result is *implementation-defined* if an attempt is made to change a `const`.
