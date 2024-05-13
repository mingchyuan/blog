# 【9-3】Programming Paradigms

> [!example]
> 台聯大-106-計算機概論-20：
>
> $Q:$
>
> Choose the following items that are correct regarding Programming Language?
>
> $Ans:$
>
> **(A)** C++, Java, C#, and Python are Object-Oriented Paradigm.
>
> ~(B)~ ~The functional paradigm is also called a~ procedural paradigm, some typical programming languages are FORTRAN, BASIC and COBOL.
>
> ~(C)~ Windows is designed by Object-Oriented Programming, the main features is that each object ~cannot~ be reused.  
> $\quad$ `Windows 使用 C, C++ and assembly language.`
>
> ~(D)~ LISP is a functional paradigm, program is treated as a combination of several basic functions.  
> $\quad$ `LISP 程式由 function 與 expression 所組合，且不一定是基本函數，也可以是使用者自訂的函數。`
>
> ~(E)~ PROLOG (PROgramming LOGic) is belong to ~functional paradigm~, is developed by Alain Colmerauer and Philippe Roussel to deal with the natural language.  
> $\quad$ `Declarative paradigm`

We divide computer languages into four paradigms:

## Procedural (imperative)

- FORTRAN (FORmula TRANslation)
- COBOL (COmmon Business-Oriented Language)
- BASIC
- C
- Pascal
- Ada

## Object-oriented

- Smalltalk
- C++
- Visual Basic
- C#
- Java

> [!example]
> 台聯大-106-計算機概論-26：
>
> $Q:$
>
> Which of the following statements are correct regarding *Template*.
>
> $Ans:$
>
> **(A)** Initially, the concept of templates was not included in some languages, such as Java.
> $\quad$
>
> **(B)** Templates allows functions and classes to operate with generic types.
>
> ~(C)~ Templates does ~not~ allows a function or class to work on many different data types without being rewritten for each one.
>
> **(D)** The C++ Standard Library provides many useful functions within a framework of connected templates.
>
> **(E)** Function templates, class templates, and variable template are three types of templates.

### Classes

### Methods

### Inheritance

### Polymorphism

Polymorphism means "many forms".

**Polymorphism** (多型) in the object-oriented paradigm means that we can define several operations with the same name that can do different things in related classes.

For example, assume that we define two classes, `Rectangle` and `Circle`, both inherited from the class `GeometricalShape`. We define two operations both named `getArea`, one in `Rectangle` and one in `Circle`, that calculate the area of a rectangle or a circle. <mark>The two operations have the same name (`getArea`) but do different things, as calculating the area of a rectangle and the area of a circle need different operands and operations.</mark>

```java
// Superclass (parent)
class GeometricalShape {
   // Method (Member function)
   public double getArea() {
      // Polymorphism (多型): 三個 class 都同樣有 getArea() 這個方法，但做的事情卻完全不一樣。
   }
}

// Subclass (child), inherited from GeometricalShapes
class Rectangle extends GeometricalShape { // 
   // Property (Member variable)
   private double width;
   private double height;

   // Override (覆寫父類別的 method)
   public double getArea() {
      return width * height;
   }
}

// Subclass (child), inherited from GeometricalShapes
class Circle extends GeometricalShape {
   // Property (Member variable)
   private double centerX;
   private double centerY;
   private double radius;

   // Constructor
   public Circle(double radius) {
      this.radius = radius;
   }

   // Overload (多載：定義多個名稱相同但參數不同的 method)
   public Circle(double centerX, double centerY, double radius) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.radius = radius;
   }

   // Override (覆寫父類別的 method)
   public double getArea() {
      return Math.PI * radius;
   }
}
```

## Functional

### LISP (LISt Programming)

It is a list-processing programming language in which everything is considered a *list*.

### Scheme

The **LISP** language suffered from a lack of standardization. After a while, there were different versions of LISP everywhere;. The de facto standard is the one developed by MIT in the early 1970s called **Scheme**.

There are two basic procedures for taking lists apart:

- `car`: returns the first element of a list.
- `cdr`: returns the remainder of the list.

[An Introduction to Scheme and its Implementation](https://www.cs.utexas.edu/ftp/garbage/cs345/schintro-v14/schintro_toc.html)

> [!example]
> 台聯大-112-計算機概論-4、三等考試-111-計算機概論-二、(一)：
>
> 因為不熟 Scheme，所以將程式重新排版方便了解：
>
> ```scheme
> ; Procedure name:   mystery
> ; Formal parameter: input-list
> (define (mystery input-list)
>     ; Selection statement
>     (cond
>         ((null?  input-list)
>             0   ; return 0 if input-list is null
>         )
>         (else
>             ; Prefix Expressions
>             ; car: 取出第一個元素
>             ; cdr: 去除第一個元素，回傳剩餘的 list
>             (+ 1 (mystery (cdr  input-list)))
>         )
>     )
> )
> ```
>
> $Q:$
>
> `(mystery (list 4 5 6))` 結果為何？
>
> $Sol:$
$$
\begin{align}
   & (mystery\ (list\ 4\ 5\ 6)) \\
=\ & 1 + (mystery\ (list\ 5\ 6)) \\
=\ & 1 + 1 + (mystery\ (list\ 6)) \\
=\ & 1 + 1 + 1 + (mystery\ (list)) \\
=\ & 1 + 1 + 1 + 0 = 3
\end{align}
$$

## Declarative

- Prolog (PROgramming in LOGic)
