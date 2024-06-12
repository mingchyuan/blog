# 【16-3】Asymmetric-key ciphers

*Confidentiality* can be achieved using ciphers.

Symmetric- and **asymmetric-key ciphers** will exist in parallel and continue to serve the community. We actually believe that they are complements of each other; the advantages of one can compensate for the disadvantages of the other.

The conceptual differences between the two systems are based on how these systems keep a secret.

- In symmetric-key cryptography, <mark>the secret must be shared between two persons.</mark>
- In asymmetric-key cryptography, <mark>the secret is personal (unshared); each person creates and keeps his or her own secret.</mark>

In a community of $n$ people,

- $\dfrac{n(n - 1)}{2}$ shared secrets are needed for symmetric-key cryptography.
- $n$ personal secrets are needed in asymmetric-key cryptography.

?>
Symmetric-key cryptography is based on sharing secrecy;  
asymmetric-key cryptography is based on personal secrecy.

There are some other aspects of security besides encipherment that need asymmetrickey cryptography. These include **authentication** and **digital signatures**.

Whenever an application is based on a personal secret, we need to use asymmetric-key cryptography.

?>
In symmetric-key cryptography, symbols are permuted or substituted;  
in asymmetric-key cryptography, numbers are manipulated.

In asymmetric-key cryptography, the plaintext and ciphertext are numbers; encryption and decryption are mathematical functions that are applied to numbers to create other numbers.

Asymmetric-key cryptography uses two separate keys:

- **private key**
- **public key**

(We use the term *secret key* only for symmetric-key cryptography.)

> [!example]
> If Alice locks the padlock with Bob's public key, then only Bob's private key can unlock it.

## General idea

> [!figure]
>
> ```graphviz
> digraph {
>     newrank=true;
>     node [shape=plaintext];
>     tp [label="To public"];
>     subgraph clusterA {
>         label="Alice&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
>         node [shape=note];
>         p1 [label="Plaintext"];
>         c1 [label="Ciphertext"];
>         node [shape=rect];
>         e [label="Encryption"];
>         p1 -> e -> c1;
>         {rank=same; p1; e; c1;}
>     }
>     subgraph clusterB {
>         label="Bob";
>         node [shape=note];
>         p2 [label="Plaintext"];
>         c2 [label="Ciphertext"];
>         node [shape=rect];
>         d [label="Decryption"];
>         kg [label="Key-generation\nprocedure"]
>         c2 -> d -> p2;
>         kg -> d [label="  Private key"];
>         {rank=same; p2; d; c2;}
>     }
>     c1:e -> c2 [xlabel="\n\nInsecure \nchannel ", minlen=2];
>     kg -> tp [minlen=8, label="Public-key distribution channel"];
>     tp -> e [label="  Public key"];
>     {rank=same; c1; c2;}
>     {rank=same; tp; kg;}
> }
> ```

Although the public-key distribution channel is not required to provide secrecy, it must provide authentication and integrity.

### Plaintext/ciphertext

Unlike in symmetric-key cryptography, <mark>plaintext and ciphertext in asymmetric-key cryptography are treated as integers.</mark> The message must be encoded as an integer (or a set of integers) before encryption; the integer (or the set of integers) must be decoded into the message after decryption.

Asymmetric-key cryptography is normally used to encrypt or decrypt *small pieces of information*, such as the cipher key for a symmetric-key cryptography.

In other words, asymmetric-key cryptography is normally used for ancillary goals instead of message encipherment. However, these ancillary goals play a very important role in cryptography today.

### Encryption/decryption

Encryption and decryption in asymmetric-key cryptography are mathematical functions applied over the numbers representing the plaintext and ciphertext.

- The ciphertext can be thought of as $C = f(K_{\text{public}},\ P)$.
- The plaintext can be thought of as $P = g(K_{\text{private}},\ C)$.

The decryption function $f$ is used only for encryption; the decryption function $g$ is used only for decryption.

### Need for both

There is a very important fact that is sometimes misunderstood: the advent of asymmetric-key (public-key) cryptography does not eliminate the need for symmetric-key (secret-key) cryptography.

The reason is that asymmetric-key cryptography, which uses mathematical functions for encryption and decryption, is *much slower* than symmetric-key cryptography.

For encipherment of large messages, symmetric-key cryptography is still needed.

On the other hand, the speed of symmetric-key cryptography does not eliminate the need for asymmetric-key cryptography. Asymmetric-key cryptography is still needed for authentication, digital signatures, and secret-key exchanges.

## RSA cryptosystem

One of the common public-key algorithms is the **RSA cryptosystem**.

RSA uses two exponents,

- $e$ is public
- $d$ is private

$$
\begin{gather}
P \text{ is plaintext} \quad C \text{ is ciphertext} \\\\
C = P^e \bmod n \\
P = C^d \bmod n
\end{gather}
$$

The modulus $n$, a very large number, is created during the key generation process.

### Procedure

1. Bob chooses two large prime numbers, $p$ and $q$, and calculates $n = p \times q$ and $\varphi(n) = (p - 1) \times (q - 1)$.
2. Bob then selects $e$ and $d$ such that $(e \times d ) \bmod \varphi(n) = 1$.
3. Bob advertises $(n, e)$ to the community as the public key; Bob keeps $(n, d)$ as the private key.

Anyone can encrypt a message and send the ciphertext to Bob, using $C = P^e \bmod n$; only Bob can decrypt the message, using $P = C^d \bmod n$.

> [!example]
> 【台聯大】【107】【計算機概論】【15】
>
> ---
>
> $Q:$
>
> Which of the following is the ciphertext of p = 11 and q = 5 and choose e = 7. Apply RSA algorithm where plaintext message = 12?
>
> ---
>
> $Sol:$
$$
\begin{gather}
n = p \times q = 55 \\
C = 12^{7} \bmod 55 \\\\
23 \equiv 12^{7} \pmod{55} \\
C = 23
\end{gather}
$$

### Applications

Although RSA can be used to encrypt and decrypt actual messages, it is very slow if the message is long. RSA, therefore, is useful for short messages.

In particular, we will see that RSA is used in **digital signatures** and other cryptosystems that often need to encrypt a small message without having access to a symmetric key. RSA is also used for **authentication**, as we will see later in the chapter.
