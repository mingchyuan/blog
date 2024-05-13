# 【6-3】Transport Layer

The **transport layer** in the TCP/IP suite is located between the application layer and the network layer. It provides services to the application layer and receives services from the network layer. The transport layer acts as a liaison between a client program and a server program, a process-to-process connection.

> [!example]
> 台聯大-108-計算機概論-4：
>
> $Q:$
>
> Which layer of the TCP/IP hierarchy chops messages into units whose size is compatible with the Internet?
>
> $Ans:$
>
> Transport layer.

## Transport-layer services

### Process-to-process communication

The first duty of a transport-layer protocol is to provide **process-to-process communication**.

A **process** is an application-layer entity (running program) that uses the services of the transport layer.

- The **network layer** is responsible for communication at the computer level (**host-to-host communication**). A network-layer protocol can deliver the message only to the destination computer.
- However, this is an incomplete delivery. The message still needs to be handed to the correct process. This is where a transport-layer protocol takes over. <mark>A transport-layer protocol is responsible for delivery of the message to the appropriate process.</mark>

### Addressing: port numbers

Although there are a few ways to achieve process-to-process communication, the most common is through the client–server paradigm.

A remote computer can run several server programs at the same time, just as several local computers can run one or more client programs at the same time. For communication, we must define the local host, local process, remote host, and remote process.

- The local host and the remote host are defined using IP addresses.
- To define the processes, we need second identifiers, called **port numbers**. In the TCP/IP protocol suite, the port numbers are integers between 0 and 65 535 (16 bits).
    - The client program defines itself with a port number, called the *ephemeral port number*. The word ephemeral means short-lived and is used because the life of a client is normally short. An ephemeral port number is recommended to be greater than 1023 for some client/server programs to work properly.
    - The server process must also define itself with a port number. This port number, however, cannot be chosen randomly. TCP/IP has decided to use universal port numbers for servers; these are called *well-known port numbers*. Every client process knows the well-known port number of the corresponding server process.

## Transport-layer protocols

### User Datagram Protocol (UDP)

The **User Datagram Protocol** (**UDP**) is a *connectionless*, *unreliable* transport protocol. It does not add anything to the services of network layer except for providing process-to-process communication instead of host-to-host communication.

UDP is a very simple protocol using a minimum of overhead. If a process wants to send a small message and does not care much about reliability, it can use UDP. Sending a small message using UDP takes much less interaction between the sender and receiver than using TCP.

#### User datagrams

UDP packets, called **user datagrams**, have a fixed-size header of 8 bytes. The total length needs to be less because a UDP user datagram is <mark>stored in an IP datagram</mark> with the total length of 65,535 bytes.

### Transmission Control Protocol (TCP)

**Transmission Control Protocol** (**TCP**) is a *connection-oriented*, *reliable* protocol.

TCP explicitly defines

- connection establishment
- data transfer
- connection teardown phases

to provide a connection-oriented service.

TCP uses sequence numbers to define the order of the segments. The sequence number is related to the number of bytes in each segment. In this way, if a segment is lost, the receiver holds the others until the lost one is reset by the sender.

#### Segments

At the transport layer, TCP groups a number of bytes together into a packet called a **segment**. TCP adds a header to each segment (for control purposes) and delivers the segment to the network layer for transmission. The segments <mark>are encapsulated in an IP datagram</mark>.
