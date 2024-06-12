# 【16-4】Other Aspects of Security

> [!warning]
> 課本上並沒有本篇的 Figure 的表示方法，只是單純用 MathJax 取代畫圖。

We need to take care of other aspects of security, such as integrity, message and entity authentication, non-repudiation, and key management.

## Message integrity

There are occasions where we may not even need secrecy but instead must have integrity: the message should remain unchanged. For example, Somebody writes their will to distribute their estate.

### Message and message digest

To preserve the *integrity* of a message, the message is passed through an algorithm called a **cryptographic hash function**. The function creates a compressed image of the message, called a **digest**, that can be used <mark>like a fingerprint.</mark>

To check the integrity of a message or document, <mark>Receiver runs the cryptographic hash function again and compares the new digest with the previous one.</mark> If both are the same, Receiver is sure that the original message has not been changed.

> [!figure]
$$
\begin{gather}
\text{Sender: } & \\
& \text{hash}(\text{Message}_\text{s}) = \text{digest}_\text{s} \\\\
& \text{Message}_\text{s} \xrightarrow{\mbox{Insecure channel}} \text{Message}_\text{r} \\\\
& \text{digest}_\text{s} \xrightarrow{\mbox{Channel immune to change}} \text{digest}_\text{r} \\\\
\text{Receiver: } & \\
& \text{hash}(\text{Message}_\text{r}) = \text{digest}_\text{new} \\\\
& \text{Compare} (\text{digest}_\text{r},\ \text{digest}_\text{new})
\end{gather}
$$

The two pairs (document/fingerprint) and (message/message digest) are similar, with some differences.

- The document and fingerprint are physically linked together.
- The message and message digest can be unlinked (or sent separately), and, most importantly, the
<mark>message digest needs to be safe from change.</mark>

### Hash functions

Secure Hash Algorithm (SHA).

## Message authentication

A digest can be used to check the integrity of a message—that the message has not been changed.

To ensure the *integrity* of the message and the data *origin authentication*, we need to create a **message authentication code (MAC)**.

> [!figure]
$$
\begin{gather}
\text{Sender: } & \\
& \text{hash}(\text{Message}_\text{s},\ \text{key}_\text{secret}) = \text{MAC}_\text{s} \\\\
& (\text{Message}_\text{s} + \text{MAC}_\text{s}) \xrightarrow{\mbox{Insecure channel}} (\text{Message}_\text{r} + \text{MAC}_\text{r}) \\\\
\text{Receiver: } & \\
& \text{hash}(\text{Message}_\text{r},\ \text{key}_\text{secret}) = \text{MAC}_\text{new} \\\\
& \text{Compare}(\text{MAC}_\text{r},\ \text{MAC}_\text{new})
\end{gather}
$$

Note that there is no need to use two channels in this case. Both the message and the MAC can be sent on the same insecure channel.

A third party can see the message, but they cannot forge a new message to replace it because they do not possess the *secret key* between Sender and Receiver. They are unable to create the same MAC that Sender did.

?> A MAC provides message integrity and message authentication using a combination of a hash function and a secret key.

## Digital signature

Another way to provide message integrity and message authentication (and some more security services, as we will see shortly) is a digital signature.

- MAC uses a *secret key* to protect the digest.
- Digital signature uses a pair of *private–public keys*.

> [!figure]
$$
\begin{gather}
\text{Sender: } & \\
& \text{Signing(Message, Sender's private key)} = \text{(Message, Signature)} \\\\
\text{Receiver: } & \\
& \text{Verifying(Message, Signature, Sender's public key)}
\end{gather}
$$

?>
A cryptosystem uses the private and public keys of the *receiver*;  
a digital signature uses the private and public keys of the *sender*.

Note that we must not use our public key to sign the document because then anyone could forge our signature.

### Signing the digest

We said before that the asymmetric-key cryptosystems are very inefficient when dealing with long messages.

<mark>In a digital signature system, the messages are normally long, but we have to use asymmetric-key schemes. The solution is to sign a digest of the message, which is much shorter than the message.</mark>

> [!figure]
$$
\begin{gather}
\text{Sender: } & \\
& \text{hash(Message$_\text{s}$)} = \text{digest} \\
& \text{Signing(digest, Sender's private key)} = \text{Signature}_\text{s} \\\\
\text{Receiver: } & \\
& \text{hash(Message$_\text{r}$)} = \text{digest}_\text{new} \\
& \text{Verifying(digest$_\text{new}$, Signature$_\text{r}$, Sender's public key)}
\end{gather}
$$

### Services

- Message authentication

    A secure digital signature scheme, like a secure conventional signature (one that cannot be easily copied) can provide message authentication (also referred to as <mark>data-origin authentication</mark>).

- Message integrity

    The integrity of the message is preserved if we sign the message or the digest of the message because <mark>we cannot get the same digest if any part of the message is changed.</mark>

- Nonrepudiation

    People can create an established trusted party among themselves. Later in the chapter, we will see that a trusted party can solve many other problems concerning security services and key exchange.

- Confidentiality

    A digital signature does *not* provide confidential communication. If confidentiality is required, the message and the signature must be encrypted using either a symmetric-key or an asymmetric-key cipher.

> [!example]
> 【台聯大】【112】【計算機概論】【15】
>
> ---
>
> $Q:$
>
> 數位簽章 (Digital signature) 沒辦法直接提供什麼服務？
>
> ---
>
> $Ans:$
>
> 訊息的機密性 (Confidentiality)。

## Entity authentication

**Entity authentication** is a technique designed to let one party verify the identity of another party. The entity whose identity needs to be proven is called the **claimant**; the party that tries to verify the identity of the claimant is called the **verifier**.

### Entity vs. message authentication

1. &nbsp;
    - Data-origin authentication is required when an email is sent from Alice to Bob.
    - Entity authentication is required when Alice gets cash from an automatic teller machine (ATM).
2. &nbsp;
    - Message authentication simply authenticates *one message*; the process needs to be repeated for each new message.
    - Entity authentication authenticates the claimant for the *entire duration of a session*.

### Verification categories

In entity authentication, the claimant must identify him- or herself to the verifier. This can be done with one of three kinds of witnesses:

- **Something known**

    This is a secret known only by the claimant that can be checked by the verifier.

    Examples are a *password*, a PIN, a secret key, and a private key.

- **Something possessed**

    This is something that can prove the claimant's identity.

    Examples are a passport, a driver's license, an identification card, a credit card, and a smart card.

- **Something inherent**

    This is an inherent characteristic of the claimant.

    Examples are conventional signatures, fingerprints, voice, facial characteristics, retinal pattern, and handwriting.

In this section, we only discuss the first type of witness, something known, which is normally used for remote (online) entity authentication. The other two categories are normally used when the claimant is personally present.

### Challenge–response

In *password authentication*, the claimant proves her identity by demonstrating that she knows a secret, the password. However, <mark>because the claimant sends this secret, it is susceptible to interception by the adversary.</mark>

In **challenge–response authentication**, <mark>the claimant proves that she knows a secret without sending it.</mark> In other words, the claimant does not send the secret to the verifier; the verifier either has it or finds it.

The **challenge** is a time-varying value such as a random number or a timestamp that is sent by the verifier. The claimant applies a function to the challenge and sends the result, called a **response**, to the verifier. The response shows that the claimant knows the secret.

- Using a symmetric-key cipher
- Using an asymmetric-key cipher
- Using digital signatures

## Key management

We discuss

- How secret keys in symmetric-key cryptography are distributed and maintained.
- How public keys in asymmetric-key cryptography are distributed and maintained.

### Symmetric-key distribution

Somebody needs to exchange confidential messages with $N$ people, they need $N$ different keys.

What if $N$ people need to communicate with each other?

- $N(N - 1)$ keys is needed if we require that two people use $2$ keys for bidirectional communication;
- $\dfrac{N(N - 1)}{2}$ keys are needed if we allow a key to be used for both directions.

This is normally referred to as the $N^2$ problem because the number of required keys for $N$ entities is close to $N^2$.

#### Key distribution center: KDC

A practical solution is the use of a trusted third party, referred to as a **key-distribution center (KDC)**. <mark>To reduce the number of keys, each person establishes a shared secret key with the KDC.</mark> A secret key is established between the KDC and each member.

Now the question is how Alice can send a confidential message to Bob. The process is as follows:

1. Alice sends a request to the KDC stating that she needs a session (temporary) secret
key between herself and Bob.
2. The KDC informs Bob about Alice's request.
3. If Bob agrees, a session key is created between the two.

#### Multiple KDCs

We can divide the world into domains. Each domain can have one or more KDCs (for redundancy in case of failure).

- International KDC
- National KDCs
- Local KDCs

#### Session keys

A KDC creates a secret key for each member. This secret key can be used only between the member and the KDC, not between two members.

1. Alice sends a plaintext message to the KDC to obtain a symmetric session key between Bob and herself.

    > [!figure]
    $$\text{Alice} \xrightarrow{\mbox{(Alice, Bob)}} \text{KDC}$$

2. The KDC receives the message and creates what is called a **ticket**. The ticket is encrypted using Bob's key ($\text{K}_\text{B}$). The ticket contains the identities of Alice and Bob and the session key.

    > [!figure]
    $$ \text{ticket: } E_{\text{K}_\text{B}}\ (\text{Alice},\ \text{Bob},\ \text{K}_\text{session})$$

3. The ticket with a copy of the session key is sent to Alice.

    > [!figure]
    $$\text{KDC} \xrightarrow{\mbox{$E_{\text{K}_A} \Big[\text{K}_\text{session},\ E_{\text{K}_B}\ (\text{Alice},\ \text{Bob},\ \text{K}_\text{session}) \Big]$}} \text{Alice}$$

4. Alice receives the message, decrypts it, and extracts the session key. Alice sends the ticket to Bob. Bob opens the ticket and knows that Alice needs to send messages to him using the session key.

    > [!figure]
    $$
    \begin{gather}
    \text{Alice + } \text{K}_\text{session} \xrightarrow{\mbox{$E_{\text{K}_B}\ (\text{Alice},\ \text{Bob},\ \text{K}_\text{session})$}} \text{Bob}
    \end{gather}
    $$

### Public-key distribution

In asymmetric-key cryptography, people do not need to know a symmetric shared key.

If Alice wants to send a message to Bob, she only needs to know Bob's public key, which is open to the public and available to everyone.

#### Public announcement

The naive approach is to announce public keys publicly. This approach, however, is not secure; it is subject to forgery.

For example, Eve could make such a public announcement. Before Bob can react, damage could be done.

The approach is also vulnerable if Alice directly requests Bob's public key. Eve can intercept Bob's response and substitute her own forged public key for Bob's public key.

#### Certification authority

The common approach to distributing public keys is to create **public-key certificates**.

**Certification authority (CA)**, a federal or state organization that binds a public key to an entity and issues a certificate.
