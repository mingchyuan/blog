# 【6-4】Network Layer

The **network layer** in the TCP/IP protocol suite is responsible for the *host-to-host* delivery of messages.

The network layer accepts a packet from a transport layer, encapsulates the packet in a **datagram**, and delivers the packet to the data-link layer.

## Services Provided by network layer

The network layer is located under the transport layer; this means that the network layer provides service to the transport layer.

### Packetizing

The first duty of the network layer is definitely **packetizing**: encapsulating the payload (data received from the upper layer) in a network-layer packet at the source and decapsulating the payload from the network-layer packet at the destination.

In other words, one duty of the network layer is to carry a payload from the source to the destination without changing it or using it. This is done in three steps:

1. The source network-layer protocol receives a packet from the transport-layer protocol, adds a header that contains the source and destination addresses and some other information that is required by the network-layer protocol.
2. The network layer protocol then logically delivers the packet to the network-layer protocol at the destination.
3. The destination host receives the network-layer packet, decapsulates the payload and delivers to the upper-layer protocol.

If the packet is fragmented at the source or at routers along the path, the network layer is responsible for waiting until all fragments arrive, reassembling them, and delivering them to the upper-layer protocol.

### Packet delivery

Packet delivery at the network layer is *unreliable* and *connectionless*.

#### Unreliable delivery

The delivery of packets at the network layer is unreliable. This means that the packets can be corrupted, lost, duplicated. In other words, the network layer provides a best-effort delivery, but there is no guarantee that a packet will reach the destination as we expect.

<mark>If we want to guarantee that the messages are not corrupted, we need to use the *TCP protocol* at the transport layer.</mark> If a payload at the transport layer is corrupted (because of unreliable delivery at the data-link layer), TCP drops the packet and requests resending of the data as we discussed in the previous section.

#### Connectionless delivery

It means that the network layer treats each packet independently (like the way the post office does with the letters).

In other words, there is no relationship between packets belonging to the same transport-layer payload. If a transport-layer packet results in four network-layer packets, <mark>there is no guarantee that the packets arrive in the same order as sent because each packet may follow a different path to reach the destination.</mark>

A transport-layer packet is divided into four network-layer packets. They are sent in order (1, 2, 3, 4), but they are received out of order (2, 4, 3, 1). The transport layer at the destination is responsible for holding packets until all of them arrive before putting them in order and delivering them to the application layer.

### Routing

The network layer is responsible for routing the packet from its source to the destination.

A physical network is a combination of networks (LANs and WANs) and routers that connect them. This means that there is more than one route from the source to the destination.

The network layer is responsible for finding the best one among these possible routes. The network layer needs to have some specific strategies for defining the best route. In the Internet today, this is done by running some routing protocols to help the routers coordinate their knowledge about the neighborhood and to come up with consistent tables to be used when a packet arrives.

## Network-layer protocols

### Internet Protocol Version 4 (IPv4)

#### IPv4 addressing

The identifier used in the IPv4 layer of the TCP/IP protocol suite to identify the connection of each device to the Internet is called the **Internet address** or **IP address**.

- An IPv4 address is a *32-bit address* that uniquely and universally defines the connection of a host or a router to the Internet.
- <mark>The IP address is the address of the connection, not the host or the router</mark>, because if the device is moved to another network, the IP address may be changed.
- IPv4 addresses are unique in the sense that each address defines one, and only one, connection to the Internet. If a device, such as a router, has several connections to the Internet, via several networks, it has several IPv4 addresses.
- IPv4 addresses are universal in the sense that the addressing system must be accepted by any host that wants to be connected to the Internet.

There are three common notations to show an IPv4 address:

- Binary notation (base $2$)
- Dotted-decimal notation (base $256 = 2^8$)
- Hexadecimal notation (base $16$)

```algorithm
\begin{algorithmic}
\State Binary           $\qquad\qquad\qquad$    10000001 00000011 00000111 00011110
\State Dotted decimal   $\qquad\ $              129 . 3 . 7 . 30
\State Hexadecimal      $\qquad\quad\ $         8003071E
\end{algorithmic}
```

A 32-bit IPv4 address is also hierarchical, but divided only into two parts.

- The first part of the address, called the *prefix*, defines the *network*
- The second part of the address, called the *suffix*, defines the *node* (connection of a device to the Internet).

The prefix length is $n$ bits and the suffix length is $(32 - n)$ bits. The prefix and suffix lengths depend on the site of the network (organization).

> [!example]
> 【台聯大】【112】【計算機概論】【7】  
> 【關務人員考試】【112】【計算機概論】【二、(一)】
>
> ---
>
> $Q:$
>
> 一個無階級 (classless) IP 位址為 157.177.187.135/30，哪些IP在相同的子網域 (subnet)？
>
> ---
>
> $Sol:$
>
> 在 Classful Addressing 中，
>
> |         | 網路位址位數 | 剩餘的位數 | 每個網路的主機數($2^n - 2$) |
> | :-----: | :----------: | :--------: | :-------------------------: |
> | Class A |      8       |     24     |         16,777,214          |
> | Class B |      16      |     16     |           65,534            |
> | Class C |      24      |     8      |             254             |
>
> 可能造成 IP 地址空間浪費。
>
> 例如，擁有 300 台裝置的組織不能使用 C 類 IP 地址，因為該類別最多只允許 254 台裝置。因此，該組織將不得不申請 B 類 IP 地址，而這類地址提供 65,534 個不重複的主機地址。但連線的裝置就只有 300 台，這會浪費 65,234 個 IP 地址空間。
>
> Classless Inter-Domain Routing (CIDR) 使用可變長度子網路遮罩，提供了更靈活和有效的 IP 地址配置方式。
>
> 157.177.187.135/*30* 表示前 30 位元為網路位址 (子網路遮罩：前 30 位元的值皆為 1，與 IP 做 AND 運算後可得到 Network ID)，後面 2 位元為主機位址。
>
> 將給定 IP 轉換成二進位：
>
> *10011101.10110001.10111011.100001*11
>
> 可以得知此組織使用
>
> *10011101.10110001.10111011.100001*00 至  
> *10011101.10110001.10111011.100001*11
>
> 也就是
>
> 157.177.187.132 至  
> 157.177.187.135

#### IPv4 datagram

Packets used by the IP are called **datagrams**.

A datagram is a variable-length packet consisting of two parts:

- Header
- Payload (data)

The header is 20 to 60 bytes in length and contains information essential to routing and
delivery.

### Internet Protocol Version 6 (IPv6)

> [!example]
> 【台聯大】【107】【計算機概論】【23】
>
> ---
>
> $Q:$
>
> Which of the statement(s) are correct in Computer Networks?
>
> ---
>
> $Ans:$
>
> **(A)** The length of an 1Pv6 address is 128 bits.
>
> **(B)** IPv6 does *not* use Broadcast type of address
>
> **(C)** Telnet can be used for file transfer, too.
>
> **(D)** Two colons (::) are used to denote continuous hexadecimal fields of zeros.  
> $\quad$ `但整個 ip 中只允許出現一次，否則會分不清零有幾個。`
>
> (E) Transferring a file by FTP uses ~UCP~ connections.  
> $\quad$ `使用 TCP.`

#### IPv6 addressing

To prevent the address depletion, IPv6 uses *128* bits to define any device connected to the
Internet. An address is represented as either

- Binary
- Colon-hexadecimal

```algorithm
\begin{algorithmic}
\State Binary (128 bits)             $\qquad\qquad\qquad\quad$  1111111011110111 $\qquad\dots\qquad$ 0001001101000101
\State Colon-hexadecimal (32 digits) $\qquad\ \ $               FEF7:5623:0017:A2B5:BC21:0243:7256:1345
\end{algorithmic}
```

The address in IPv6 actually defines three levels of hierarchy:

- Site (organization)
- Subnetwork
- Connection to the host

#### IPv6 datagram

A datagram in this version is also a variable-length packet consisting of two parts:

- Header
- Payload (data)

The header is 40 bytes. However, some extension headers are considered part of the payload in this version.

## 解決 IP 數量不足的辦法

- IPv6
- DHCP (Dynamic Host Configuration Protocol)

    負責<mark>動態分配 IP 位址</mark>，當網路中有任何一台電腦要連線時，才向 DHCP 伺服器要求一個 IP 位址，DHCP 伺服器會從資料庫中找出一個目前尚未被使用的 IP 位址提供給該電腦使用，使用完畢後電腦再將這個 IP 位址還給 DHCP 伺服器，提供給其他上線的電腦使用。

- NAT (Network Address Translation)

    當IP封包通過路由器或防火牆時，建立一個 Private IP 與 Public IP 的對應表格 (NAT table)，並且<mark>重寫封包內的傳送端 IP 位址與接收端 IP 位址。</mark>

    這種技術被普遍使用在有多台主機但只通過一個公有 IP 位址訪問網際網路的私有網路中。例如：

    $$
    \text{網際網路} - \text{NAT 伺服器 (140.115.50.33) } - \text{私有網路}
    \begin{cases}
    & \text{主機 A (192.168.1.1) } \\
    & \text{主機 B (192.168.1.2) } \\
    & \text{主機 C (192.168.1.3) } \\
    \end{cases}
    $$

    *IP 分享器*就一個使用 NAT 的實際例子：將 WAN port 的真實 IP (固定或動態皆可) 分享給 LAN port 的電腦使用。

> [!example]
> 【台聯大】【112】【計算機概論】【18】

## VPN

VPN (Virtual Private Network) 代表虛擬私人網路，會在電腦與 VPN 提供者所擁有的遠端伺服器之間建立數位連線，建立可加密個人資料的點對點通道、遮罩 IP 位址，使得在網際網路上能跨越網站封鎖和防火牆的限制。
