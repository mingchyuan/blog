# 【2-2】Positional Number Systems

## Conversion

### Any base to decimal

In a **positional number system**, the position a symbol occupies in the number determines the value it represents. In this system, a number represented as:

$$
\pm \ ( S_{K-1} \dots S_2 \ S_1 \ S_0 \ . \ S_{-1} \ S_{-2} \dots S_{-L} )_b
$$

has the value of:

$$
\begin{align}
n = \pm \ ( & S_{K-1} \times b^{K-1} + \dots + S_1 \times b^{1} + S_0 \times b^{0} \\\\
            & + S_{-1} \times b^{-1} + S_{-2} \times b^{-2} + \dots +  + S_{-L} \times b^{-L} )
\end{align}
$$

- $S$ is the set of symbols
- &#8203;$b$ is the **base** (or **radix**), which is equal to the total number of the symbols in the set $S$
    - The **binary** system (base 2)
    $$
    \begin{gather}
    b = 2 \\
    S = \{0, 1\}
    \end{gather}
    $$
    - The **octal** system (base 8)
    $$
    \begin{gather}
    b = 8 \\
    S = \{0, 1, 2, 3, 4, 5, 6, 7\}
    \end{gather}
    $$
    - The **decimal** system (base 10)
    $$
    \begin{gather}
    b = 10 \\
    S = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}
    \end{gather}
    $$
    - The **hexadecimal** system (base 16)
    $$
    \begin{gather}
    b = 16 \\
    S = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, \\
          A, B, C, D, E, F\}
    \end{gather}
    $$
- &#8203;$S_K$ and $S_L$ are symbols in the *whole* and *fraction parts of the number*.

Note that we have used an expression that can be extended from the right or from the left. In other words, the power of b can be $0$ to $K-1$ in one direction and $-1$ to $-L$ in the other direction.

The terms with non negative powers of b are related to the integral part of the number, while the terms with negative power of b are related to the fractional part of the number.

The $\pm$ sign shows that the number can be either positive or negative.

> [!example]
$$
\begin{align}
  & \quad (101.11)_2 \\
= & \quad 1 \times 2^2 + 0 \times 2^{1} + 1 \times 2^0 + 1 \times 2^{-1} + 1 \times 2^{-2} \\
= & \quad 4 + 0 + 1 + \frac{1}{2} + \dfrac{1}{4} \\
= & \quad (5.75)_{10}
\end{align}
$$

### Decimal to any base

We can convert a decimal number to its equivalent in any base. We need two procedures, one for the *integral part* and one for the *fractional part*.

#### Converting the integral part

- $Q$ : Quotients
- $R$ : Remainders
- $S$ : Source (decimal)
- $D$ : Destination
- $D_i$ : Destination digit

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=plaintext];
>     e1 [label=""];
>     e2 [label=""];
> 
>     node [shape=rect];
>     q3 [label="Q"];
>     q2 [label="Q"];
>     q1 [label="Q"];
>     d3 [label=<D<font point-size="8"><sub>K-1</sub></font>>];
>     d2 [label=<D<font point-size="8"><sub>2</sub></font>>];
>     d1 [label=<D<font point-size="8"><sub>1</sub></font>>];
>     d0 [label=<D<font point-size="8"><sub>0</sub></font>>];
> 
>     e1 -> S [style=invis];
>     e2 -> q3 [style=invis];
>     e2 -> e1 [dir=back, minlen=6, label="Divide by b"];
> 
>     0 -> q3 [dir=back];
>     q3 -> q2 [dir=back, style=dashed];
>     q2 -> q1 [dir=back];
>     q1 -> S [dir=back];
> 
>     S -> d0 [label="  R"];
>     q1 -> d1 [label="  R"];
>     q2 -> d2 [label="  R"];
>     q3 -> d3 [label="  R"];
> 
>     {rank=same; e1; e2;}
>     {rank=same; 0; q3; q2; q1; S;}
>     {rank=same; d3; d2; d1; d0;}
> }
> ```

> [!example]
> Convert $(126)_{10}$ to its equivalent in the *octal* system.
> $$ b = 8 $$
>
> ```graphviz
> digraph {
>     node [shape=rect];
>     q2 [label="1"];
>     q1 [label="15"];
>     d2 [label="1"];
>     d1 [label="7"];
>     d0 [label="6"];
>     S [label="126"];
> 
>     0 -> q2 [dir=back];
>     q2 -> q1 [dir=back];
>     q1 -> S [dir=back, label="&#247;8"];
> 
>     S -> d0;
>     q1 -> d1;
>     q2 -> d2;
> 
>     {rank=same; 0; q2; q1; S;}
>     {rank=same; d2; d1; d0;}
> }
> ```
>
> $$ (126)_{10} = (176)_8 $$

#### Converting the fractional part

- $F$ : Fractional part
- $I$ : Integral part
- $S$ : Source (decimal)
- $D$ : Destination
- $D_i$ : Destination digit

> [!figure]
>
> ```graphviz
>
> digraph {
>     node [shape=plaintext];
>     e1 [label=""];
>     e2 [label=""];
> 
>     node [shape=rect];
>     f1 [label="F"];
>     f2 [label="F"];
>     f3 [label="F"];
>     d1 [label=<D<font point-size="8"><sub>-1</sub></font>>];
>     d2 [label=<D<font point-size="8"><sub>-2</sub></font>>];
>     d3 [label=<D<font point-size="8"><sub>-3</sub></font>>];
>     dL [label=<D<font point-size="8"><sub>-L</sub></font>>];
> 
>     e1 -> S [style=invis];
>     e2 -> f3 [style=invis];
>     e1 -> e2 [minlen=6, label="Multiply by b"];
> 
>     S -> f1;
>     f1 -> f2;
>     f2 -> f3 [style=dashed];
>     f3 -> 0;
> 
>     S -> d1 [label="  I"];
>     f1 -> d2 [label="  I"];
>     f2 -> d3 [label="  I"];
>     f3 -> dL [label="  I"];
> 
>     {rank=same; e1; e2;}
>     {rank=same; 0; S; f1; f2; f3;}
>     {rank=same; d1; d2; d3; dL;}
> }
> ```

> [!example]
> Convert $(0.634)_{10}$ to *octal* using a maximum of *four* digits.
> $$ b = 8 $$
>
> ```graphviz
> digraph {
>     node [shape=rect];
>     S [label="0.634"];
>     f1 [label="0.072"];
>     f2 [label="0.576"];
>     f3 [label="0.608"];
>     f4 [label="0.864"];
>     d1 [label="5"];
>     d2 [label="0"];
>     d3 [label="4"];
>     d4 [label="4"];
> 
>     S -> f1 [label="&times;8"];
>     f1 -> f2;
>     f2 -> f3;
>     f3 -> f4;
> 
>     S -> d1 [label="  I"];
>     f1 -> d2 [label="  I"];
>     f2 -> d3 [label="  I"];
>     f3 -> d4 [label="  I"];
> 
>     {rank=same; S; f1; f2; f3; f4;}
>     {rank=same; d1; d2; d3; d4;}
> }
> ```
>
> $$ (0.634)_{10} = (0.5044)_8 $$

### Binary ↔ Octal ↔ Hexadecimal

> [!example]
> $$ (100001001110)_2 = (4116)_8 = (84E)_{16} $$
>
> ```text
>   4     1     1     6     Octal
> ┌───┐ ┌───┐ ┌───┐ ┌───┐
> 1 0 0 0 0 1 0 0 1 1 1 0   Binary
> └─────┘ └─────┘ └─────┘
>    8       4       E      Hexadecimal
> ```

## Maximum Value

The maximum value of an integer with K digits is

$$
N_{\text{max}} = b^K - 1
$$

> [!example]
$$
\begin{align}
(d_{4} \ d_{3} \ d_{2} \ d_{1} \ d_{0})_{10} \qquad & K = 5, \ N_{\text{max}} = 10^5 - 1 = 99999 \\\\
                (d_{2} \ d_{1} \ d_{0})_{10} \qquad & K = 3, \ N_{\text{max}} = 8^3 - 1 = 511
\end{align}
$$

## Number of digits

We often need to know the number of digits before converting a number from decimal to other bases.

In a positional number system with base b, we can always find the number of digits of an integer using the relation $K = \lceil \log_{b}{N} \rceil$, in which $\lceil x \rceil$ means the smallest integer greater than or equal to x (it is also called the ceiling of x), and N is the decimal value of the integer.

For example, we can find the required number of bits in the decimal number 234 in all four systems as follows:

- In decimal: $K_d = \lceil \log_{10}{234} \rceil = \lceil 2.37 \rceil = 3$, which is obvious.

?>
$$
\begin{gather}
2 = \log_{10}{100} < \log_{10}{234} < \log_{10}{1000} = 3 \\\\
\lceil \log_{10}{234} \rceil = 3
\end{gather}
$$

- In binary: $K_b = \lceil \log_{2}{234} \rceil = \lceil 7.8 \rceil = 8$. This is true because $234 = (11101010)_2$

?>
$$
\begin{gather}
7 = \log_{2}{128} < \log_{2}{234} < \log_{2}{256} = 8 \\\\
\lceil \log_{2}{234} \rceil = 8
\end{gather}
$$

- In octal: $K_o = \lceil \log_{8}{234} \rceil = \lceil 2.62 \rceil = 3$. This is true because $234 = (352)_8$

?>
$$
\begin{gather}
2 = \log_{8}{64} < \log_{8}{234} < \log_{8}{512} = 3 \\\\
\lceil \log_{8}{234} \rceil = 3
\end{gather}
$$

- In hexadecimal $K_h = \lceil \log_{16}{234} \rceil = \lceil 1.96 \rceil = 2$. This is true because $234 = (EA)_{16}$

?>
$$
\begin{gather}
1 = \log_{16}{16} < \log_{16}{234} < \log_{16}{256} = 2 \\\\
\lceil \log_{16}{234} \rceil = 2
\end{gather}
$$

> [!example]
> 【台聯大】【107】【計算機概論】【7】
>
> ---
>
> $Q:$
>
> If the computer has 32 data registers ($R_0$ to $R_{31}$), 2000 words in memory, and 16 different instructions. What is the minimum size of an instruction in bits if a typical instruction use the following format: `add R0 R2`
>
> ---
>
> $Sol:$
>
> 共有 16 種指令，我們需要給每個指令一個編號來辨別是在使用哪個指令，而這個編號需要
$$
\lceil \log_{2}{16} \rceil = 4 \text{ bits}
$$
> 同理，計算需要用多少 bit 來替暫存器編號
$$
\lceil \log_{2}{32} \rceil = 5 \text{ bits}
$$
> `add R0 R2` 使用 1 個指令 `add` ，還需要知道 2 個暫存器的位址
$$
4 + 5 + 5 = 14 \text{ bits}
$$
