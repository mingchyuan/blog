# 【4-1】Logic Operations

?> 每個 Logical connective (logical operator) 都有數個符號可以表示，在 [Logical connective][] 維基百科中有列表可以查看這些符號。

[Logical connective]: https://en.wikipedia.org/wiki/Logical_connective

A bit can take one of the two values:

- 0
- 1

If we interpret 0 as the value *false* and 1 as the value *true*, we can apply the operations defined in **Boolean algebra** to manipulate bits.

## Truth table

A **truth table** defines the values of output for each possible input or inputs. Note that the output of each operator is always one bit, but the input can be one or two bits.

NOT operation at the bit level:

|  x  | NOT x |
| :-: | :---: |
|  0  |   1   |
|  1  |   0   |

AND, OR, XOR operations at the bit level:

|  x  |  y  | x AND y | x OR y | x XOR y |
| :-: | :-: | :-----: | :----: | :-----: |
|  0  |  0  |    0    |   0    |    0    |
|  0  |  1  |    0    |   1    |    1    |
|  1  |  0  |    0    |   1    |    1    |
|  1  |  1  |    1    |   1    |    0    |

## Logic operations at pattern level

The same four operators (NOT, AND, OR, and XOR) can be applied to an n-bit pattern.

NOT operators applied to bit patterns:

| Operation | Bit pattern     | Description |
| --------: | --------------- | :---------- |
|       NOT | 1 0 0 1 1 0 0 0 | Input       |
|           | 0 1 1 0 0 1 1 1 | Output      |

AND operators applied to bit patterns:

| Operation | Bit pattern     | Description |
| --------: | --------------- | :---------- |
|           | 1 0 0 1 1 0 0 0 | Input 1     |
|       AND | 0 0 1 0 1 0 1 0 | Input 2     |
|           | 0 0 0 0 1 0 0 0 | Output      |

OR operators applied to bit patterns:

| Operation | Bit pattern     | Description |
| --------: | --------------- | :---------- |
|           | 1 0 0 1 1 0 0 1 | Input 1     |
|        OR | 0 0 1 0 1 1 1 0 | Input 2     |
|           | 1 0 1 1 1 1 1 1 | Output      |

XOR operators applied to bit patterns:

| Operation | Bit pattern     | Description |
| --------: | --------------- | :---------- |
|           | 1 0 0 1 1 0 0 1 | Input 1     |
|       XOR | 0 0 1 0 1 1 1 0 | Input 2     |
|           | 1 0 1 1 0 1 1 1 | Output      |

> [!example]
> 【台聯大】【108】【計算機概論】【13】
>
> ---
>
> $Q:$
>
> Given x = 143 and x XOR y = 63. What is y?
>
> ---
>
> $Sol:$
>
> ```text
>      1 0 0 0 1 1 1 1 = x = 143
> XOR  1 0 1 1 0 0 0 0 = y = 176
> --------------------
>      0 0 1 1 1 1 1 1 = 63
> ```

### Applications

#### NOT

One's complement operation.

#### AND

*Unset (force to 0)* specific bits in a bit pattern. The second input in this case is called a **mask**.

- The 0-bits in the mask unset the corresponding bits in the first input
- The 1-bits in the mask leave the corresponding bits in the first input unchanged.

#### OR

*Set (force to 1)* specific bits in a bit pattern. Again we can use a mask, but a different one.

- The 1-bits in the mask set the corresponding bits in the first input
- The 0-bits in the mask leave the corresponding bits in the first input unchanged.

#### XOR

*Flip (complement)* specific bits in a bit pattern. Again we can use a mask, but a different one.

- The 1-bits in the mask flip the corresponding bits in the first input
- The 0-bits in the mask leave the corresponding bits in the first input unchanged.

## Logic gate

| Type |                                                    Distinctive shape                                                    |
| :--: | :---------------------------------------------------------------------------------------------------------------------: |
| NOT  | ![NOT](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/NOT_ANSI_Labelled.svg/120px-NOT_ANSI_Labelled.svg.png) |
| AND  | ![AND](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/AND_ANSI_Labelled.svg/120px-AND_ANSI_Labelled.svg.png) |
|  OR  |  ![OR](https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/OR_ANSI_Labelled.svg/120px-OR_ANSI_Labelled.svg.png)   |
| XOR  | ![XOR](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/XOR_ANSI_Labelled.svg/120px-XOR_ANSI_Labelled.svg.png) |

> [!example]
> 【台聯大】【112】【計算機概論】【9】
>
> ---
>
> $Q:$
>
> 問邏輯線路圖 ($a \land (\neg b)$) 的功能為何？
>
> ---
>
> $Sol:$
>
> 寫出真值表：
>
> | $a$ | $b$ | $\neg b$ | $a \land (\neg b)$ |
> | :-: | :-: | :------: | :----------------: |
> |  0  |  0  |    1     |         0          |
> |  0  |  1  |    0     |         0          |
> |  1  |  0  |    1     |         1          |
> |  1  |  1  |    0     |         0          |
>
> 可以看出選項「1-bit 的大於比較器，即如果 $a > b$ 則輸出 1，反之輸出 0。」是符合此真值表的。

### Half adder

半加器的功能是將兩個一位元二進位數相加。它有兩個輸出：

- 和：記作 S (Sum)
- 進位：記作 C (Carry)

下圖是一個最簡單的半加器設計，使用一個 XOR 來產生 S，一個 AND 來產生 C。

<img alt="half adder" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Half_Adder.svg/1920px-Half_Adder.svg.png" width="50%">

半加器的真值表如下：

| $A$ | $B$ | $C$ | $S$ |
| :-: | :-: | :-: | :-: |
|  0  |  0  |  0  |  0  |
|  0  |  1  |  0  |  1  |
|  1  |  0  |  0  |  1  |
|  1  |  1  |  1  |  0  |

> [!example]
> 【台聯大】【111】【計算機概論】【14】
>
> ---
>
> $Q:$
>
> Which gate produces the carry portion of two binary digits in a half adder?
>
> ---
>
> $Ans:$
>
> AND. (只有遇到 $1 + 1$ 的時候才會進位。)

### Full adder

與半加器不同之處在於全加器還能接收一個低位進位輸入訊號 $C_{in}$。

<img alt="full adder" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Full-adder_logic_diagram.svg/1920px-Full-adder_logic_diagram.svg.png" width="50%">

| $A$ | $B$ | $C_{in}$ | $C_{out}$ | $S$ |
| :-: | :-: | :------: | :-------: | :-: |
|  0  |  0  |    0     |     0     |  0  |
|  0  |  1  |    0     |     0     |  1  |
|  1  |  0  |    0     |     0     |  1  |
|  1  |  1  |    0     |     1     |  0  |
|  0  |  0  |    1     |     0     |  1  |
|  0  |  1  |    1     |     1     |  0  |
|  1  |  0  |    1     |     1     |  0  |
|  1  |  1  |    1     |     1     |  1  |
