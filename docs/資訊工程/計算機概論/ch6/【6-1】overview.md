# 【6-1】Overview

> [!example]
> 【台聯大】【108】【計算機概論】【21】
>
> ---
>
> $Q:$
>
> Which of the following statements are/is correct in Computer Networks?
>
> ---
>
> $Ans:$
>
> (A) ~Bridge~ connects existing networks to form an internet.  
> $\quad$ `Bridge 連接兩個區域網路。而 Router 建立 network of networks，也就是 internet。`
>
> **(B)** Peer-to-peer is a means of performing interprocess communication over a network.
>
> (C) ~Tier-2~ ISPs are assigned the task of providing individual users access to the Internet.  
> $\quad$ `Tier-3 ISPs 提供網路服務給住宅與企業。`
>
> **(D)** Port number identifies the application to which a message arriving from the Internet should be given.
>
> (E) ~Ethernet~ is a means of implementing the Star network topology.  
> $\quad$ `Wireless Ethernet (WiFi, IEEE 802.11) 利用 AP 建立星狀網路。`

## Networks

A **network** is the interconnection of a set of devices capable of communication.

- A **local area network** (**LAN**) is usually privately owned and connects some hosts in a single office, building, or campus.
- A **wide area network** (**WAN**) has a wider geographical span, spanning a town, a state, a country, or even the world.
- Today, it is very rare to see a LAN or a WAN in isolation; they are connected to one another. When two or more networks are connected, they make an **internetwork**, or **internet**.

### Topology

Still another way of classifying networks is based on the **topology** of the network, which refers to the pattern in which the machines are connected.

Two of the more popular topologies are the

- *bus*, in which the machines are all connected to a common communication line called a bus.
- *star*, in which one machine serves as a central focal point to which all the others are connected.

Higher-speed revisions of Ethernet can behave logically like a bus topology while physically connected as a star topology.

The star configuration is also popular in *wireless* networks where communication is conducted by means of radio broadcast and the central machine, called the **access point (AP)**, serves as a focal point around which all communication is coordinated.

The difference between a bus network and a star network is not always obvious by the physical arrangement of equipment. The distinction is whether the machines in the network envision themselves as communicating directly with each other over a common bus or indirectly through an intermediary central machine.

### Intranet vs. Extranet

?> 資料來源：[internet, intranet, extranet], Microsoft Writing Style Guide

[internet, intranet, extranet]: https://learn.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/i/internet-intranet-extranet

- Use **internet** to refer to the worldwide collection of networks that use open protocols such as TCP/IP to communicate with one another.
- Use **intranet** to refer to a communications network based on web technology but that's available only to certain people, such as the employees of a company.
- Use **extranet** to refer to an extension of an intranet that uses internet protocols to give authorized outside users limited access to the intranet.

> [!example]
> 【台聯大】【111】【計算機概論】【8】
>
> ---
>
> $Q:$
>
> Which type of computer network allows third parties (such as vendors or customers) to access restricted information?
>
> ---
>
> $Ans:$
>
> Extranet.

---

> [!warning]
> 以下資料來源為 ChatGPT。

- 內部網 (**Intranet**)：

    - 內部網是一個私有網路，僅限於組織內部使用。
    - 它提供了一個安全的平台，用於組織內的通訊、資訊共享和資源存取。
    - 內部網通常用於內部員工之間的溝通，以及組織內部文檔、應用程式和數據的共享。

- 外部網 (**Extranet**)：

    - <mark>外部網是一個擴展的內部網路，允許組織的特定外部方（如供應商、客戶或合作夥伴）訪問部分內部網路資源。</mark>
    - 它提供了一個安全的平台，用於組織內部和外部方之間的通訊、協作和資訊共享。
    - 外部網通常用於與外部方之間的業務合作，例如與供應商的訂單處理、與客戶的客戶服務以及與合作夥伴的項目合作。

總之，內部網主要用於組織內部通訊和資訊共享，而外部網則擴展了這一概念，允許特定的外部方也能夠訪問組織的部分資源，從而實現更廣泛的業務合作和協作。

### The Internet

- At the top level, the *backbones* are large networks owned by some communication companies. The backbone networks are connected through some complex switching systems, called peering points.
- At the second level, there are smaller networks, called *provider networks*, that use the services of the backbones for a fee. The provider networks are connected to backbones and sometimes to other provider networks.
- The *customer networks* are networks at the edge of the Internet that actually use the services provided by the Internet. They pay fees to provider networks for receiving services.

Backbones and provider networks are also called **internet service providers** (**ISPs**).

- The backbones are often referred to as international ISPs.
- The provider networks are often referred to as national or regional ISPs.

---

The system of networks operated by the ISPs can be classified in a hierarchy according to the role they play in the overall Internet structure.

- At the top of this hierarchy are relatively few **tier-1 ISPs** that consist of very high-speed, high-capacity, *international WANs*. These networks are thought of as the backbone of the Internet.
- Connecting to the tier-1 ISPs are the **tier-2 ISPs** that tend to be more *regional* in scope and less potent in their capabilities.
- An **access ISP (tier-3 ISP)** is essentially an independent Internet, sometimes called an **intranet**, operated by a single authority that is in the business of supplying Internet access to individual homes and businesses.
- The devices that individual users connect to the access ISPs are known as **end systems** or **hosts**.

## TCP/IP protocol suite

**TCP/IP** (**Transmission Control Protocol/Internet Protocol**) is a protocol suite (a set of protocols organized in different layers) used in the Internet today. It is a hierarchical protocol made up of interactive modules, each of which provides a specific functionality. The term hierarchical means that each upper-level protocol is supported by the services provided by one or more lower-level protocols. The TCP/IP protocol suite is made of five layers:

> [!figure]
$$
\text{TCP/IP protocol suite }
\begin{cases}
& \text{Application layers} \\\\
& \text{Transport layers} \\\\
& \text{Network layers} \\\\
& \text{Data link layers} \\\\
& \text{Physical layers}
\end{cases}
$$

### Addressing and packet names

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=plaintext]
>     t [label="Source and Destination\nAddresses"];
>     node [shape=rect, fixedsize=true, width=2.5];
>     A1 [label="Application layer\n(message)"];
>     A2 [label="Application layer\n(message)"];
>     T1 [label="Transport layer\n(segment/user datagram)"];
>     T2 [label="Transport layer\n(segment/user datagram)"];
>     N1 [label="Network layer\n(datagram)"];
>     N2 [label="Network layer\n(datagram)"];
>     D1 [label="Data-link layer\n(frame)"];
>     D2 [label="Data-link layer\n(frame)"];
>     P1 [label="Physical layer\n(bit)"];
>     P2 [label="Physical layer\n(bit)"];
>     {rank=same; A1; A2}
>     {rank=same; T1; T2}
>     {rank=same; N1; N2}
>     {rank=same; D1; D2}
>     {rank=same; P1; P2}
>     A1 -> T1 -> N1 -> D1 -> P1 [style=invis];
>     A2 -> T2 -> N2 -> D2 -> P2 [style=invis];
>     t -> {A1, A2} [style=invis];
>     edge [dir=both, style=dashed, minlen=4];
>     A1 -> A2 [label="Names"];
>     T1 -> T2 [label="Port numbers"];
>     N1 -> N2 [label="Logical addresses\n(IP addresses)"];
>     D1 -> D2 [label="Link-layer addresses\n(MAC addresses)"];
> }
> ```

<p style="text-align: center">Addressing and packet names in the TCP/IP protocol suite</p>

- At the application layer, we normally use names to define the site that provides services, such as <a>someorg.com</a>, or the email address, such as <a>somebody&commat;coldmail.com</a>.
- At the transport layer, addresses are called **port numbers**, and these define the application-layer programs at the source and destination. Port numbers are local addresses that <mark>distinguish between several programs running at the same time.</mark>
- At the network-layer, the addresses are global, with the whole Internet as the scope. A network-layer address uniquely <mark>defines the connection of a device to the Internet.</mark>
- The link-layer addresses, sometimes called **MAC addresses**, are locally defined addresses, each of <mark>which defines a specific host or router in a network (LAN or WAN).</mark>

## Combining Networks

|       Layer       |      Device       |                                               簡易說明                                               |
| :---------------: | :---------------: | :--------------------------------------------------------------------------------------------------: |
| Application layer |                   |                                                                                                      |
|  Transport layer  |                   |                                                                                                      |
|   Network layer   |  Router (路由器)  |                             在數個網路的連接中處理 host 之間的傳輸路徑。                             |
|  Data link layer  |  Bridge (橋接器)  | 連接兩個區域網路，形成大型區域網路。各自區域網路的內部通訊並不會與其他區域網路產生衝撞 (collision)。 |
|                   |  Switch (交換器)  |                                  可以當作連接更多區域網路的橋接器。                                  |
|  Physical layer   | Repeater (中繼器) |        由於實體纜線有訊號衰減等問題，為了支援大型區域網路，因此使用中繼器作為「訊號放大器」。        |
|                   |   Hub (集線器)    |                          作為星狀拓樸的中央節點，可能也會提供中繼器的功能。                          |

### Hub

Sometimes a bus network is created by running links from each computer to a central location where they are connected to a device called a **hub**. This hub is little more than a very short bus. All it does is <mark>relay any signal it receives (with perhaps some amplification) back out to all the machines connected to it.</mark>

### Repeater

The simplest of these is the **repeater**, which is little more than a device that passes signals back and forth between the two original buses (<mark>usually with some form of amplification</mark>) without considering the meaning of the signals.

### Bridge

A **bridge** is similar to, but more complex than, a repeater. Like a repeater, it connects *two* buses, but it does not necessarily pass all messages across the connection. Instead, it looks at the destination address that accompanies each message and <mark>forwards a message across the connection only when that message is destined for a computer on the other side.</mark>

Thus, <mark>two machines residing on the same side of a bridge can exchange messages without interfering with communication taking place on the other side.</mark> A bridge produces a more efficient system than that produced by a repeater.

### Switch

A **switch** is essentially <mark>a bridge with multiple connections</mark>, allowing it to connect several buses rather than just two.

### Router

Sometimes, however, the networks to be connected have incompatible characteristics.

For instance, the characteristics of a WiFi network are not readily compatible with an Ethernet network. In these cases, the networks must be connected in a manner that builds a network of networks, known as an **internet**, in which the original networks maintain their individuality and continue to function as autonomous networks.

Note that the generic term *internet* is distinct from the *Internet*. The Internet, written with an uppercase I, refers to a particular, worldwide internet.

The connection between networks to form an internet is handled by devices known as **routers**, which are special purpose computers used for forwarding messages.

> [!figure]
$$
\begin{array}{c} \text{Internet} \\ \text{(worldwide)} \end{array}
\longleftrightarrow \text{internet}
\begin{cases}
& \text{Router} \longleftrightarrow
    \left[ \quad
    \begin{array}{c}
        \text{WiFi network} \\\\
        \begin{array}{c} \text{Access point} \\ \text{(AP)} \end{array}
        \begin{cases}
            & \text{host}_1 \\
            & \text{host}_2 \\
            & \quad \vdots
        \end{cases}
    \end{array}
     \quad \right] \\\\
& \text{Router} \longleftrightarrow
    \left[ \quad
    \begin{array}{c}
        \text{Ethernet network} \\\\
        \text{Any topology}
        \begin{cases}
            & \text{host}_1 \\
            & \text{host}_2 \\
            & \quad \vdots
        \end{cases}
    \end{array}
    \quad \right] \\\\
& \quad \vdots
\end{cases}
$$

The reason that routers are so named is that their purpose is to forward messages in their proper directions. This forwarding process is based on an internet-wide addressing system in which all the devices in an internet (including the machines in the original networks and the routers) are assigned unique addresses.

Thus, each machine in one of the original networks has two addresses:

- Its original local address within its own network.
- Its internet address.

A machine wanting to send a message to a machine in a distant network attaches the internet address of the destination to the message and directs the message to its local router. From there it is forwarded in the proper direction. For this forwarding purpose, each router maintains a **forwarding table** that contains the router's knowledge about the direction in which messages should be sent depending on their destination addresses.

### Gateway

The "point" at which one network is linked to an internet is often called a **gateway** because it serves as a passageway between the network and the outside world.

---

> [!warning]
> 以下資料來源為維基百科

閘道器可以根據不同的功能和層次進行分類，例如實體層閘道器、資料連結層閘道器、網路層閘道器、傳輸層閘道器、應用層閘道器等。家庭或小型企業網路中的閘道器通常用於連接區域網路和網際網路，實現內外網的通訊。它可以提供路由、防火牆、NAT、DHCP 等功能，保證網路的安全和穩定。

關於 NAT 與 DHCP 的說明，可以在 [解決 IP 數量不足的辦法][] 中查看。

[解決 IP 數量不足的辦法]: /資訊工程/計算機概論/ch6/【6-4】network-layer#解決-ip-數量不足的辦法

> [!example]
> 【台聯大】【111】【計算機概論】【9】
>
> ---
>
> $Q:$
>
> What is the device that connects internetworks and provides routing between different wide area networks?
>
> ---
>
> $Ans:$
>
> Gateway.
