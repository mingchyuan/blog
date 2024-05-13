# 【6-5】Data-Link Layer

## Nodes and links

Although communication at the application, transport, and network layers is end-to-end, communication at the **data-link layer** is *node-to-node*.

LANs and WANs are connected by routers. It is customary to refer to the two end hosts and the routers as **nodes** and the networks in between as **links**.

## Local area networks (LANs)

### Wired LANS: Ethernet

The bits, however, are not sent one by one, a group of bits are packaged together and are referred to as a **frame**. A frame does not carry only data from the sender to the destination. It also carries some information such as the source address (48 bits), the destination address (48 bits), the type of data, the actual data, and some other control bits as a guard to help checking the integrity of data during transition.

The Ethernet LAN was developed in the 1970s by Robert Metcalfe and David Boggs. Since then, it has gone through five generations:

- Standard Ethernet (10 Mbps)
- Fast Ethernet (100 Mbps)
- Gigabit Ethernet (1 Gbps)
- 10 Gigabit Ethernet (10 Gbps)
- 100 Gigabit Ethernet (100 Gbps)

As an introduction to the protocol concept, let us consider the problem of coordinating the transmission of messages among computers in a network. Without rules governing this communication, all the computers might insist on transmitting messages at the same time or fail to assist other machines when that assistance is required.

In a bus network based on the Ethernet standards, the right to transmit messages is controlled by the *protocol* known as **Carrier Sense, Multiple Access with Collision Detection (CSMA/CD)**.

This protocol dictates that each message be broadcast to all the machines on the bus. Each machine monitors all the messages but keeps only those addressed to itself. To transmit a message, a machine waits until the bus is silent, and at this time it begins transmitting while continuing to monitor the bus. If another machine also begins transmitting, both machines detect the clash and pause for a brief, independently random period of time before trying to transmit again.

> [!example]
> 台聯大-108-計算機概論-3：
>
> $Q:$
>
> Which of the following is a protocol for controlling the right to transmit a message in a network?
>
> $Ans:$
>
> CSMA/CD.

### Wireless LANs

#### Wireless Ethernet (WiFi, IEEE 802.11)

Note that <mark>CSMA/CD is not compatible with wireless star networks in which all machines communicate through a central AP.</mark> This is because a machine may be unable to detect that its transmissions are colliding with those of another.

For example,

- The machine may not hear the other because its own signal drowns out that of the other machine.
- Another cause might be that the signals from the different machines are blocked from each other by objects or distance even though they can all communicate with the central AP (a condition known as the *hidden terminal problem*).

The result is that wireless networks adopt the policy of trying to avoid collisions rather than trying to detect them. Such policies are classified as **Carrier Sense, Multiple Access with Collision Avoidance (CSMA/CA)**, many of which are standardized by IEEE within the protocols defined in **IEEE 802.11** and commonly referred to as **WiFi**.

We emphasize that collision avoidance protocols are designed to avoid collisions and may not eliminate them completely. When collisions do occur, messages must be retransmitted.

> [!example]
> 台聯大-112-計算機概論-12：
>
> IEEE 802.11
>
> - 因為隱藏節點等原因，所以*不支援*衝撞偵測 (*Collision Detection*)。而是使用衝撞避免 (**Collision Avoidance**)。
> - 使用要求傳送 (Request to Send, **RTS**) 和允許傳送 (Clear to Send, **CTS**) 訊框 (Frame) 來預約無線通道的一段時間。
>     - 如果兩個或以上的節點偵測到閒置的連結且同時間去嘗試發送要求傳送 (RTS) 訊框，他們的要求傳送 (RTS) 訊框會彼此衝撞。
>     - 所以一段時間後，當節點沒收到允許傳送 (CTS) 訊框，他們會發現衝撞發生了。
>     - 每個節點會等待隨機一段時間後再嘗試一次。等待的時間長度是由指數後退演算法 (**exponential backoff algorithm**) 來決定。
> - 將訊框分為幾種優先權不同的等級，每種優先權等級的訊框等待再傳送前都必須等待一段固定大小的時間，也就是訊框間隔 (Inter-Frame Space, **IFS**)，分為 SIFS、PIFS、DIFS、EIFS，其中 SIFS > PIFS > DIFS > EIFS，優先權等級越高的訊框其訊框間隔愈短，因此使用傳輸媒介的機會就很大。
> - 網路配置向量 (Net Allocation Vector, **NAV**), 透過 RTS/CTS 訊框中告知的持續時間來預測未來流量。
>
> 詳細請參考[國立清華大學開放式課程][] - [計算機網路概論][] - [第3R講 IEEE 802.11 無線區域網路 (Wireless LAN)][]。

[國立清華大學開放式課程]: https://ocw.nthu.edu.tw/ocw/index.php
[計算機網路概論]: https://ocw.nthu.edu.tw/ocw/index.php?page=course&cid=291&
[第3R講 IEEE 802.11 無線區域網路 (Wireless LAN)]: https://ocw.nthu.edu.tw/ocw/upload/291/news/第03講_黃能富教授%20IEEE%20802.11%20無線區域網路.pdf

#### Bluetooth

## Wide area networks (WANs)

### Wired WANs

- Point-to-point wireless WANs
- Dial-up service
- Digital subscriber line (DSL)
    - ADSL
    - VDSL
    - HDSL
    - SDSL
- Cable network
- Switched wired WANs

### Wireless WANs

- WiMax
- Cellular telephony network
- Satellite networks
