# 【4-3】Arithmetic Operations

There are more efficient procedures for multiplication and division, such as Booth procedures, but these are beyond the
scope of this book. For this reason, we only discuss *addition* and *subtraction* of integers here.

## Arithmetic operations on integers

### Two's complement integers

One of the advantages of two's complement representation is that there is no difference between addition and subtraction.

When the subtraction operation is encountered, the computer simply changes it to an addition operation, but makes two's complement of the second number. In other words:

$$
\begin{cases}
A + B \\
A − B \leftrightarrow A + (\overline{B} + 1) \text{ where } ((\overline{B} + 1)) \text{ means the two's complement of B}
\end{cases}
$$

> [!example]
> TODO

### Sign-and-magnitude integers

1. If the operation is subtraction, we change the sign of the second integer ( $B$ ). This means we now only have to worry about the addition of two signed integers.
2. We apply the XOR operation to the two signs.
3. If the signs are the same,
    $$
    R_M = \pm ( A_M + B_M ) \text{ and } R_S = A_S
    $$
    where the subscript $M$ means magnitude and subscript $S$ means sign. When we add the two magnitudes, an *overflow* may occur.
4. If the signs are different,
    $$
    \begin{align}
    R_M & = \pm ( A_M - B_M ) \\
        & = \pm ( A_M + (\overline{B_M} + 1) )
    \end{align}
    $$
    The sign of the result is the sign of the integer with larger magnitude.

    - It can be shown that if $A_M \geq B_M$, there is an overflow and the result is a positive number. Therefore, if there is an overflow, we discard the overflow and let the sign of the result be the sign of $A$.
    - It can be shown that if $A_M < B_M$, there is no overflow, but the result is a negative number. So if there is no overflow, we make the two's complement of the result and let the sign of the result be the sign of $B$.

> [!example]
> TODO

## Arithmetic operations on reals

1. If any of the two numbers ( $A$ or $B$ ) is zero, we let the result be $0$ and stop.
2. If the operation is subtraction, we change the sign of the second number ( $B$ ) to simulate addition.
3. We denormalize both numbers by including the hidden 1 in the mantissa and incrementing the exponents. The mantissa is now is treated as an integer.
4. We then align the exponents, which means that we increment the lower exponent and shift the corresponding mantissa until both have the same exponent.

    For example, if we have:

    $$ 1.11101 \times 2^4 + 1.01 \times 2^2 $$

    we need to make both exponents 4:

    $$ 1.11101 \times 2^4 + 0.0101 \times 2^4 $$
5. Now, we treat the combination of the sign and mantissa of each number as an integer in sign-and-magnitude format.
6. Finally, we normalized the number again to $1.000111 \times 2^5$.

> [!example]
> TODO
