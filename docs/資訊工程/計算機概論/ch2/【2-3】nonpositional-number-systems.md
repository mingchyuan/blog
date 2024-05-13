# 【2-3】Nonpositional Number Systems

Although nonpositional number systems are not used in computers, we give a short review here for comparison with positional number systems.

A nonpositional number system still uses a limited number of symbols in which each symbol has a value. However, the position a symbol occupies in the number normally bears no relation to its value—the value of each symbol is fixed. To find the value of a number, we add the value of all symbols present in the representation. In this system, a number is represented as:

$$
S_{K-1} \dots S_2 \ S_1 \ S_0 \ . \ S_{-1} \ S_{-2} \dots S_{-L}
$$

and has the value of:

$$
\begin{align}
n = \pm \ ( & S_{K-1} + \dots + S_1 + S_0 \\\\
            & + S_{-1} + S_{-2} + \dots +  + S_{-L} )
\end{align}
$$

The **Roman number system** is a good example of a nonpositional number system. This number system has a set of symbols $S = \{ I, V, X, L, C, D, M \}$.

| Symbol | $I$ | $V$ | $X$ | $L$ | $C$ | $D$ | $M$  |
| ------ | --- | --- | --- | --- | --- | --- | ---- |
| Value  | 1   | 5   | 10  | 50  | 100 | 500 | 1000 |

To find the value of a number, we need to add the value of symbols subject to specific rules:

1. When a symbol with a smaller value is placed after a symbol having an equal or larger value, the values are added.
2. When a symbol with a smaller value is placed before a symbol having a larger value, the smaller value is subtracted from the larger one.
3. A symbol $S_1$ cannot come before another symbol $S_2$ if $S_1 \leq 10 \times S_2$. For example, $I$ or $V$ cannot come before $C$.
4. For large numbers a bar is placed above any of the six symbols (all symbols except $I$) to express multiplication by 1000. For example, $\overline{V} = 5000$ and $\overline{M} = 1000000$.
5. Although Romans used the word *nulla* (nothing) to convey the concept of zero, the Roman numerals lack a zero digit in their system.

The following shows some Roman numbers and their values:

| Roman Numeral | Calculation       | Decimal Value |
| ------------- | ----------------- | ------------- |
| $III$         | $1+1+1$           | $3$           |
| $IV$          | $5-1$             | $4$           |
| $VIII$        | $5+1+1+1$         | $8$           |
| $XVIII$       | $10+5+1+1+1$      | $18$          |
| $XIX$         | $10+(10-1)$       | $19$          |
| $LXXII$       | $50+10+10+1+1$    | $72$          |
| $CI$          | $100+1$           | $101$         |
| $MMVII$       | $1000+1000+5+1+1$ | $2007$        |
| $MDC$         | $1000+500+100$    | $1600$        |
