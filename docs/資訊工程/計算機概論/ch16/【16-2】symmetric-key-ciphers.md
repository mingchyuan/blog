<style>
table:nth-of-type(1) thead {
    display: none;
}
</style>

# 【16-2】Symmetric-key ciphers

*Confidentiality* can be achieved using ciphers.

> [!figure]
> General idea of a symmetric-key cipher
>
> ```graphviz
> digraph {
>     newrank=true;
>     splines=line;
>     subgraph cluster1 {
>         node [shape=note];
>         p1 [label="Plaintext"];
>         c1 [label="Ciphertext"];
>         node [shape=rect];
>         ea [label="Encryption\nalgorithm"];
>         k1 [label="Shared\nsecret key"];
>         p1 -> ea -> c1;
>         ea -> k1 [dir=back];
>     }
>     subgraph cluster2 {
>         node [shape=note];
>         p2 [label="Plaintext"];
>         c2 [label="Ciphertext"];
>         node [shape=rect];
>         da [label="Decryption\nalgorithm"];
>         k2 [label="Shared\nsecret key"];
>         p2 -> da -> c2;
>         k2 -> da;
>     }
>     c1 -> c2 [label="Insecure channel", minlen=12];
>     k1:e -> k2:w [dir=none, style=dashed, label="Secure key-exchange channel"];
>     {rank=same; p1; p2;}
>     {rank=same; ea; da; k1; k2;}
>     {rank=same; c1; c2;}
> }
> ```

$$
\begin{gather}
P \text{ is plaintext, } C \text{ is ciphertext, } k \text{ is Key} \\\\
\text{Encryption: } C = E_k(P) \\
\text{Decryption: } P = D_k(C)
\end{gather}
$$

The encryption and decryption algorithms are *inverses* of each other.

$$
D_k(E_k(x)) = E_k(D_k(x)) = x
$$

## Stream and block ciphers

The literature divides the symmetric ciphers into two broad categories:

- Stream ciphers
- Block ciphers

### Stream cipher

In a **stream cipher**, encryption and decryption are done one symbol (such as a character or a bit) at a time. We have a plaintext stream, a ciphertext stream, and a key stream.

$$
\begin{gather}
P = P_1P_2P_3 \ldots \quad
k = (k_1,\ k_1,\ k_2,\ \ldots) \quad
C = C_1C_2C_3 \ldots \\\\
C_i = E_{k_i}(P_i)
\end{gather}
$$

### Block ciphers

In a **block cipher**, a group of plaintext symbols of size $m$ ($m > 1$) are encrypted together, creating a group of ciphertext of the same size. Based on the definition, in a block cipher, <mark>a single key is used to encrypt the whole block even if the key is made of multiple values.</mark> In a block cipher, a ciphertext block depends on the whole plaintext block.

### Combination

In practice, blocks of plaintext are encrypted individually, but they use a stream of keys to encrypt the whole message block by block. In other words, the cipher is a block cipher when looking at the individual blocks, but it is a stream cipher when looking at the whole message, considering each block as a single unit. Each block uses a different key that may be generated before or during the encryption process.

## Traditional symmetric-key ciphers

<mark>Traditional ciphers belong to the past.</mark> We can divide traditional ciphers into

- Substitution ciphers
    - Monoalphabetic ciphers
    - Polyalphabetic ciphers
- Transposition ciphers

### Substitution ciphers

A **substitution cipher** <mark>replaces one symbol with another.</mark>

> [!example]
> 【台聯大】【112】【計算機概論】【16】
>
> ---
>
> $Q:$
>
> 某種替換式加密 (Substitution cipher) 方法如下，$E(\text{A}) = \text{C},\ E(\text{B}) = \text{D},\ \dots,\ E(\text{Y}) = \text{A},\ E(\text{Z}) = \text{B}$，若密文 $C = \text{EJCVIRV}$，則明文 $P$ 為何？
>
> ---
>
> $Sol:$
>
> $$\because D(\text{E}) = \text{C},\ D(\text{J}) = \text{G},\ \dots$$
> $$\therefore P = D(\text{EJCVIRV}) = \text{CHATGPT}$$

#### Monoalphabetic ciphers

In a **monoalphabetic cipher**, a character (or a symbol) in the plaintext is always changed to the same character (or symbol) in the ciphertext regardless of its position in the text.

The relationship between letters in the plaintext and the ciphertext is one-to-one.

> [!example]
> The simplest monoalphabetic cipher is the *additive* cipher (or *shift* cipher).
>
> We assign numerical values to each letter:
>
> |           |     |     |         |     |
> | --------- | :-: | :-: | :-----: | :-: |
> | Character |  a  |  b  | $\dots$ |  z  |
> | Value     |  0  |  1  | $\dots$ | 25  |
>
> - The encryption algorithm adds the key to the plaintext character.
> - The decryption algorithm subtracts the key from the ciphertext character.
>
> Use the additive cipher with $key = 15$ to encrypt the message "hello".
$$
\begin{gather}
E_k(x) = (x + key) \bmod 26 \\\\
\text{h} = 7, \quad E_k(7) = (7 + 15) \bmod 26 = 22 = \text{w}, \ etc. \\\\
\text{hello} \ \xrightarrow{\mbox{encryption}} \ \text{wtaad}
\end{gather}
$$

#### Polyalphabetic ciphers

In a **polyalphabetic cipher**, each occurrence of a character may have a different substitute.

The relationship between a character in the plaintext to a character in the ciphertext is one-to-many.

Polyalphabetic ciphers have the advantage of hiding the letter frequency of the underlying language, so someone cannot use single-letter frequency statistics to break the ciphertext.

Let us discuss a simple polyalphabetic cipher called the **autokey cipher**.

<mark>The subkeys ( $k_i$ ) are automatically created from the plaintext cipher characters during the encryption process.</mark>

$$
\begin{gather}
k = (k_1,\ P_1,\ P_2,\ \ldots) \\
P = P_1P_2P_3 \ldots
\xrightarrow{\mbox{encryption}}
C = C_1C_2C_3 \ldots
\end{gather}
$$

The first subkey $k_1$ is a predetermined value secretly.

### Transposition ciphers

A **transposition cipher** does not substitute one symbol for another; instead it <mark>changes the location of the symbols.</mark>

## Modern symmetric-key ciphers

The traditional symmetric-key ciphers that we have studied so far are *character-oriented ciphers*. With the advent of the computer, we need *bit-oriented ciphers*.

This is because the information to be encrypted is not just text; it can also consist of numbers, graphics, audio, and video data. It is convenient to convert these types of data into a stream of bits, to encrypt the stream, and then to send the encrypted stream.

A modern cipher can be either a block cipher or a stream cipher.

### Modern block ciphers

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=rect, margin=0.2];
>     p1 [label="n-bit plaintext"];
>     p2 [label="n-bit plaintext"];
>     c1 [label="n-bit ciphertext"];
>     c2 [label="n-bit ciphertext"];
>     e [label="Encryption"];
>     d [label="Decryption"];
>     p1 -> e -> c1;
>     p2 -> d [dir=back];
>     d -> c2 [dir=back];
>     e -> d [minlen=4, dir=both, label="k-bit key"];
>     {rank=same; p1; p2;}
>     {rank=same; e; d;}
>     {rank=same; c1; c2;}
> }
> ```

- If the message has fewer than n bits, padding must be added to make it an n-bit block
- If the message has more than n bits, it should be divided into n-bit blocks and the appropriate padding must be added to the last block if necessary.

The common values for n are 64, 128, 256, and 512 bits.

### Modern stream ciphers

The differences between modern stream ciphers and modern block ciphers are similar to the differences between traditional stream and traditional block ciphers.

In a **modern stream cipher**, encryption and decryption are done r bits at a time. We have a plaintext bit stream $P = P_n \ldots P_2 P_1$, a ciphertext bit stream $C = C_n \ldots C_2 C_1$, and a key bit stream $K = k_n \ldots k_2 k_1$, in which $P_i,\ C_i,$ and $k_i$ are r-bit words. Encryption is $C_i = E(k_i,\ P_i)$, and decryption is $P_i = D(k_i,\ C_i)$.

The simplest and the most secure type of synchronous stream cipher is called the **one-time pad**.

The encryption and decryption algorithms each use a single *exclusive-OR* operation. Based on properties of the exclusive-OR operation, the encryption and decryption algorithms are *inverses* of each other.

> [!figure]
>
> ```graphviz
> digraph {
>     splines=ortho;
>     subgraph cluster_space {
>         margin=15;
>         peripheries=0;
>         node [shape=rect, margin=0.2];
>         r [label="Random sequence\nbit generator"];
>         node [shape=circle];
>         e [label="\n\n+\n\nEncryption", fixedsize=true];
>         d [label="\n\n+\n\nDecryption", fixedsize=true];
>         node [shape=plaintext];
>         p1 [label="Pi"];
>         p2 [label="Pi"];
>         c [label="\n\nCi\n\nInsecure channel", fixedsize=true];
>         k [label="\nki\nSecure key-exchange channel", fixedsize=true];
>         {rank=same; e; d; p1; p2; c;}
>         r -> k;
>         p1 -> e [xlabel="1 bit      ", minlen=3];
>         e -> c [minlen=4];
>         c -> d [minlen=4];
>         d -> p2 [xlabel="1 bit", minlen=3];
>         edge [style=dashed]
>         k -> e [xlabel="1 bit"];
>         k -> d [xlabel="1 bit"];
>     }
> }
> ```

There is no relationship between the plaintext and ciphertext. The ciphertext is a true random stream of bits even if the plaintext contains some patterns.

All possible random key streams would be $2^n$ if the size of the plaintext is $n$ bits.

+ How can the sender and the receiver share a one-time pad key each time they want to communicate? +

    One of the common alternatives is called a *feedback shift register (FSR)*
