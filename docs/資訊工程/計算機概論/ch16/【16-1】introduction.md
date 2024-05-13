# 【16-1】Introduction

> [!figure]
$$
\text{Security Attacks} \quad
\begin{cases}
& \text{Threat to confidentiality}
    & \begin{cases}
    & \text{Snooping} \\
    & \text{Traffic analysis}
    \end{cases} \\\\
& \text{Threat to integrity}
    & \begin{cases}
    & \text{Modification} \\
    & \text{Masquerading} \\
    & \text{Replaying} \\
    & \text{Repudiation}
    \end{cases} \\\\
& \text{Threat to availability}
    & \begin{cases}
    & \text{Denial of service}
    \end{cases}
\end{cases}
$$

## Security goals

- **Confidentiality**

    Confidentiality not only applies to the storage of information, it also applies to the transmission of information.

- **Integrity**

    Information needs to be changed constantly. In a bank, when a customer deposits or withdraws money, the balance of their account needs to be changed. Integrity means that changes need to be done only by authorized entities and through authorized mechanisms.

- **Availability**

    The information created and stored by an organization needs to be available to authorized entities.

## Attacks

- Attacks threatening *confidentiality*

    - **Snooping (窺視)**:

        Unauthorized access to or interception of data.

    - **Traffic analysis (流量分析)**:

        Although encipherment of data may make it nonintelligible for the intercepter, they can obtain some other type of information by monitoring online traffic.

- Attacks threatening *integrity*

    - **Modification (修改)**:

        After intercepting or accessing information, the attacker modifies the information to make it beneficial to them.

    - **Masquerading (冒名頂替)** or **spoofing**:

        Happens when the attacker impersonates somebody else.

    - **Replaying (重播)**:

        The attacker obtains a copy of a message sent by a user and later tries to replay it.

    - **Repudiation (否認)**:

        It is performed by one of the two parties in the communication: the sender or the receiver.

        - The sender of the message might later deny that they have sent the message.
        - The receiver of the message might later deny that they have received the message.

- Attacks threatening *availability*

    - **Denial of service (DoS, 阻絕服務)**:

        It may slow down or totally interrupt the service of a system. The attacker can use several strategies to achieve this.

        - They might send so many bogus requests to a server that the server crashes because of the heavy load.
        - The attacker might intercept and delete a server's response to a client, making the client believe that the server is not responding.
        - The attacker may also intercept requests from the clients, causing the clients to send requests many times and overload the system.

### Attack via network connections

- **Malware (MALicious softWARE, 惡意軟體)**:

    - **Virus (病毒)**:

        Infects a computer by inserting itself into programs that already reside in the machine. Then, when the "host" program is executed, the virus is also executed.

    - **Worm (蠕蟲)**:

        An autonomous program that transfers itself through a network, taking up residence in computers and forwarding copies of itself to other computers.

    - **Trojan horse (特洛伊木馬)**:

        Enters a computer system disguised as a desirable program, such as a game or useful utility package, that is willingly imported by the victim.

    - **Spyware (間諜軟體)** or **sniffing software**:

        Collects information about activities at the computer on which it resides and reports that information back to the instigator of the attack.

- **Phishing (網路釣魚)**

    A technique of obtaining information explicitly by simply asking for it. The term phishing is a play on the word *fishing* because the process involved is to cast numerous "lines" in hopes that someone will "take the bait."

- **Distributed denial of service (DDoS, 分散式阻斷服務)**

    **DoS** attack requires the generation of a large number of messages in a short period of time in order to overwhelm the targeted server.

    To accomplish this, an attacker usually plants software on numerous unsuspecting computers that will generate messages when a signal is given. Then, when the signal is given, all of these computers (sometimes called a **botnet, 殭屍網路**) swamp the target with messages.

    When the work of generating <mark>the attacks is distributed over many hosts</mark>, this is known as a distributed denial of service (DDoS) attack.

- **Spam (垃圾郵件)**

    Unwanted junk email.

> [!example]
> 台聯大-111-計算機概論-18：
>
> $Q:$
>
> What is the common practice of sending fraudulent messages to trick recipients into releasing sensitive information or installing malicious software on their system?
>
> $Ans:$
>
> Phishing.

## Services and techniques

- Cryptography
    - Symmetric-key encipherment
    - Asymmetric-key encipherment
    - Hashing
- Steganography

**Cryptography** means concealing the contents of a message by enciphering; **steganography** means concealing the message itself by covering it with something else.

> [!example]
> 相關考題：台聯大-109-計算機概論-25
