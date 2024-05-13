# 【3-3】Storing Text

Although the length of the bit pattern depends on the number of symbols, the relationship is not linear: it is logarithmic.

- If we need $8$ symbols, the length is $3$ bits ($log_{2}8 = 3$).
- A bit pattern of $3$ bits can take $8$ different forms: 000, 001, 010, 011, 100, 101, 110, and 111.

## Codes

### ASCII

This code uses seven bits for each symbol. This means that $2^7 = 128$ different symbols can be defined in this code. Today ASCII is part of Unicode.

### Unicode

A coalition of hardware and software manufacturers have designed a code called Unicode that uses 32 bits and can therefore represent up to $2^{32} = 4,294,967,296$ symbols. Different sections of the code are allocated to symbols from different languages in the world. Some parts of the code are used for graphical and special symbols.

When the Unicode character set is combined with the **Unicode Transformation Format 8-bit (UTF-8)** encoding standard,

- The original ASCII characters can still be represented with 8 bits.
- The thousands of additional characters from such languages as Chinese, Japanese, and Hebrew can be represented by 16 bits.
- Beyond the characters required for all of the world's commonly-used languages, UTF-8 uses 24- or 32-bit patterns to represent more obscure Unicode symbols, leaving ample room for future expansion.

> [!example]
> 台聯大-108-計算機概論-15：
>
> $Q:$
>
> Estimate about how long it would take to transfer a 400-page novel encoded in Unicode at a transfer rate of 10 Mbps. Suppose each page contains 300 Chinese characters in average.
>
> $Sol:$
>
> Chinese can be represented by 16 bits.
$$
\begin{align}
\text{Size} & =
300 \ ^{\text{chars}}/_{\text{page}}
\times 400 \text{ pages}
\times 16 \ ^{\text{bits}}/_{\text{char}} \\
& = 192 \times 10^4 \text{ bits} \\\\
\text{Time} & =
\dfrac{192 \times 10^4 \text{ bits}}{10 \times 10^6 \ ^\text{bits}/_\text{sec}}
= 0.192 \ \text{sec}
\end{align}
$$
