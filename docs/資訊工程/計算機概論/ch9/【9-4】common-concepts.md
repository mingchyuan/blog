# 【9-4】Common Concepts

## Identifiers

**Identifiers** is the name of objects.

For example, each piece of data in a computer is stored at a unique address. If there were no identifiers to represent data locations symbolically, we would have to know and use data addresses to manipulate them.

## Data types

A **data type** defines a set of values and a set of operations that can be applied to those
values. The set of values for each type is known as the *domain* for the type.

Most languages define two categories of data types:

- Simple types

    A **simple type** (sometimes called an atomic type, fundamental type, scalar type, or built-in type) is a data type that cannot be broken into smaller data types. For example,

    - Integer
    - Real
    - Character
    - Boolean

- Composite types

    A **composite type** is a set of elements in which each element is a simple type or a composite type (that is, a recursive definition). For example,

    - Array: A set of elements each of the same type.
    - Record: A set of elements in which the element can be of different types.

## Variables

**Variables** are names for memory locations.

## Literals

A **literal** is a predetermined value used in a program.

For example, if a sales tax is 8 percent:

```c
cost = price * 1.08;
```

`1.08` is used as a literal.

## Constants

The use of literals is not considered good programming practice unless we are sure that the value of the literal will not change with time (such as the value of $\pi$ in geometry).

However, most literals may change value with time. For example, if a sales tax is 8 percent this year, it may not be the same next year.

For this reason, most programming languages defined **constants**. A constant, like a variable, is a named location that can store a value, but the value cannot be changed after it has been defined at the beginning of the program.

However, if next year we want to use the program again, we can change just one line at the beginning of the program, the value of the constant.

```c
const float taxMultiplier = 1.08;
…
cost = price * taxMultiplier;
```

## Expressions

An **expression** is a sequence of operands and operators that reduces to a single value. For example, the following is an expression with a value of 13:

```c
2 * 5 + 3
```

- **Operator**
    - Arithmetic operators
    - Relational operators
    - Logical operators
- **Operand**

## Statements

A **statement** causes an action to be performed by the program. It translates directly into one or more executable computer instructions.

- **Assignment statements**
- **Compound statements** (*block*)
- **Control statements**
    - **Selection statements**
    - **Iteration statements**

## Subprograms

- **Pass by value**
- **Pass by reference**
