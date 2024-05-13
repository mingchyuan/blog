# 【2-1】Variable Names

## Restrictions

There are some restrictions on the names of variables and symbolic constants.

Names are made up of

- **letters**: one of

    ```text
    _ a b c d e f g h i j k l m
    n o p q r s t u v w x y z
    A B C D E F G H I J K L M
    N O P Q R S T U V W X Y Z
    ```

    <mark>The first character must be a letter.</mark>

    The `_` (underscore) counts as a letter; it is sometimes useful for improving the readability of long variable names:

    ```c
    int a_very_long_name;
    ```

    > [!attention]
    > Don't begin variable names with `_` (underscore), however, since library routines often use such names.

- **digits**: one of

    ```c
    0 1 2 3 4 5 6 7 8 9
    ```

## Uppercase and lowercase

Upper and lower case letters are distinct, so `x` and `X` are two different names.

Traditional C practice is to use

- lower case for variable names:

    ```c
    int area = length * width;
    ```

- upper case for symbolic **constants**:

    ```c
    const double PI = 3.14;
    ```

## Significance

- Internal name:  
    At least the first 31 characters are significant.

- External name:  
    The standard guarantees uniqueness only for 6 characters and a single case.

> [!example]
> Let's say we only have 6 significant characters.
>
> ```c
> a_very_long_name
> 
> a_very_long_name_thats_too_similar
> ```
>
> Look different, but the first 16 characters are the same. Since only 6 are significant, those are the same variable.

> [C89 &sect;3.1.2 Identifiers][]
>
> <mark>There is no specific limit on the maximum length of an identifier.</mark>
>
> "*Implementation limits*"
>
> The implementation shall treat at least the first 31 characters of an internal name (a macro name or an identifier that does not have external linkage) as significant.
>
> Corresponding lower-case and upper-case letters are different.
>
> The implementation may further restrict the significance of an external name (an identifier that has external linkage) to 6 characters and may ignore distinctions of alphabetical case for such names.
>
> These limitations on identifiers are all *implementation-defined*.
>
> Any identifiers that differ in a significant character are different identifiers. If two identifiers differ in a non-significant character, the behavior is *undefined*.

> [C89 &sect;3.9.1 External names][]
>
> Restriction of the significance of an external name to fewer than 31 characters or to only one case is an obsolescent feature that is a concession to existing implementations.

[C89 &sect;3.1.2 Identifiers]: https://port70.net/~nsz/c/c89/c89-draft.html#3.1.2
[C89 &sect;3.9.1 External names]: https://port70.net/~nsz/c/c89/c89-draft.html#3.9.1

## Keywords

Keywords like `if`, `else`, `int`, `float`, etc., are reserved: you can't use them as variable names. They must be in lower case.

?> See also: [C keywords][]

[C keywords]: https://en.cppreference.com/w/c/keyword

## Variable naming

It's wise to choose variable names that are related to the purpose of the variable, and that are unlikely to get mixed up typographically. We tend to use short names for local variables, especially loop indices, and longer names for external variables.
