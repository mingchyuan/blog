# 【6-2】Application Layer

## Providing services

The application layer is somehow different from other layers in that it is the highest layer in the suite. The protocols in this layer do not provide services to any other protocol in the suite; they only receive services from the protocols in the transport layer.

The application layer is the only layer that <mark>provides services to the Internet user.</mark>

## Application-layer paradigms

### Client–server

The traditional paradigm is called the **client–server paradigm**.

In this paradigm, the service provider is an application program, called the *server process*; it runs continuously, waiting for another application program, called the *client process*, to make a connection through the Internet and ask for service.

Several traditional services are still using this paradigm, including

- World Wide Web (WWW)
- HyperText Transfer Protocol (HTTP)
- File transfer protocol (FTP)
- Secure shell (SSH)
- Email

### Peer-to-peer

A new paradigm, called the **peer-to-peer paradigm** (often abbreviated **P2P paradigm**).

In this paradigm, there is no need for a server process to be running all the time and waiting for the client processes to connect. The responsibility is shared between peers. A computer connected to the Internet can provide service at one time and receive service at another time. A computer can even provide and receive services at the same time.

## Standard client–server applications

### World Wide Web

#### Web client (browser)

Each browser usually consists of three parts:

- The *controller* receives input from the keyboard or the mouse and uses the client programs to access the document.
- The *client protocol* can be one of the protocols described later, such as HTTP or FTP.
- After the document has been accessed, the controller uses one of the *interpreters* to display the document on the screen. The interpreter can be HyperText Markup Language (HTML), Java, or JavaScript, depending on the type of document.

#### Web server

The web page is stored at the server. Each time a request arrives, the corresponding document is sent to the client.

#### Uniform resource locator (URL)

We need four identifiers to define the web page.

- **Protocol**: The first identifier is the abbreviation for the client–server program that we need in order to access the web page.
- **Host**: The host identifier can be the IP address of the server or the unique name given to the server.
- **Port**: The port, a 16-bit integer, is normally predefined for the client–server application.
- **Path**: The path identifies the location and the name of the file in the underlying operating system. The format of this identifier normally depends on the operating system.

To combine these four pieces together, the **uniform resource locator** (**URL**) has been designed; it uses three different separators between the four pieces as shown below:

```algorithm
\begin{algorithmic}
    \State protocol://host/path        $\qquad\qquad\ $    Used most of the time
    \State protocol://host:port/path   $\qquad\thinspace$  Used when port number is needed
\end{algorithmic}
```

### HyperText Transfer Protocol (HTTP)

The **HyperText Transfer Protocol** (**HTTP**) is a protocol that is used to define how the client–server programs can be written to <mark>retrieve web pages from the Web.</mark>

An HTTP client sends a request; an HTTP server returns a response. The server uses the port number 80; the client uses a temporary port number.

> [!example]
> 台聯大-106-計算機概論-9：
>
> $Q:$
>
> What kind of communication protocol is used in *Web-Based* Mail?
>
> $Ans:$
>
> HTTP.

### File Transfer Protocol (FTP)

**File Transfer Protocol** (**FTP**) is the standard protocol provided by TCP/IP for copying a file from one host to another.

Some problems must be dealt with first. For example,

- Two systems may use different file name conventions.
- Two systems may have different ways to represent data.
- Two systems may have different directory structures.

The client has three components:

- Userinterface
- Client control process
- Client data transfer process

The server has two components:

- The server control process
- The server data transfer process

The control connection is made between the control processes. The data connection is made betweenthe data transfer processes.

<mark>Separation of commands and data transfer makes FTP more efficient.</mark>

- The *control connection* uses very simple rules of communication. We need to transfer only a line of command or a line of response at a time.
- The *data connection*, on the other hand, needs more complex rules due to the variety of data types transferred.

#### Lifetimes of two connections

The two connections in FTP have different lifetimes.

- The *control connection* remains connected during the entire interactive FTP session.
- The *data connection* is opened and then closed for each file transfer activity. It opens each time commands that involve transferring files are used, and it closes when the file is transferred.

In other words, when a user starts an FTP session, the control connection opens. While the control connection is open, the data connection can be opened and closed multiple times if several files are transferred.

### Electronic mail (SMTP)

**Electronic mail** (or **email**) allows users to exchange messages.

Email is considered a one-way transaction. It is neither feasible nor logical for someone to run a server program and wait until someone sends an email to him.

This means that the idea of client/server programming should be implemented in another way: using some *intermediate computers* (*servers*). The users run only client programs when they want and the intermediate servers apply the client/server paradigm.

> [!example]
> 台聯大-107-計算機概論-29：
>
> $Q:$
>
> Which of following item(s) is correct about Computer Networks?
>
> $Ans:$
>
> **(A)** SMTP uses the TCP port 25.
>
> ~(B)~ An email client has to know the MAC address of its initial SMTP server.  
> $\quad$ `MAC address 是在 Transport layer 處理的。`
>
> ~(C)~ SMTP defines message encryption.  
> $\quad$ `負責傳輸而非加密。`
>
> **(D)** SMTPS is based on the SMTP connections secured by SSL.
>
> **(E)** **Simple mail transfer protocol (SMTP)** uses TCP as the transport layer protocol for electronic mail transfer.

#### Architecture

A simple email from Alice to Bob takes nine different steps. Alice and Bob use three different agents:

- A **User Agent** (**UA**)
- A **Mail Transfer Agent** (**MTA**): An **SMTP** program that transfers a message across the Internet.
    - Client
    - Server
- A **Message Access Agent** (**MAA**)
    - Client
    - Server

When Alice needs to send a message to Bob,

| Step                                                                                                                        | Path                               |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Alice prepares the email message using a User Agent (UA) program.                                                           | UA                                 |
| Alice sends the message to her mail server                                                                                  | UA → MTA client → MTA server       |
| The mail server at Alice's site stores the message<br /> in a queue awaiting delivery.                                      | MTA server → queue → MTA client    |
| The message is transmitted over the Internet<br /> from Alice's site to Bob's site using a Mail Transfer Agent (MTA).       | MTA client → Internet → MTA server |
| At Bob's site, the MTA receives the message from Alice's site.                                                              |                                    |
| Bob's MTA places the message in a queue for delivery to Bob's user agent.                                                   | MTA server → queue → MAA server    |
| The User Agent at Bob's site allows Bob to read the received message.                                                       |                                    |
| Bob uses a Message Access Agent (MAA) client<br /> to retrieve the message from an MAA server running on the second server. | MAA server → MAA client            |
| Bob accesses and reads the message retrieved by the MAA client.                                                             | MAA client → UA                    |

Bob needs another pair of client–server programs: message access programs.

- This is because an MTA client–server program is a *push* program: the client pushes the message to the server.
- Bob needs a *pull* program. The client needs to pull the message from the server.

### TELNET

One of the original remote logging protocols is **TELNET**, which is an abbreviation for *TErminaL NETwork*.

Although TELNET requires a logging name and password, it is vulnerable to hacking because it sends all data including the password in *plaintext* (not encrypted). A hacker can eavesdrop and obtain the logging name and password. Because of this security issue, the use of TELNET has diminished in favor of another protocol, **Secure Shell** (**SSH**), which we describe in the next section.

> [!example]
> 台聯大-111-計算機概論-11：
>
> $Q:$
>
> What type of computer application is designed to facilitate the exchange of messages and files on a network?
>
> $Ans:$
>
> Bulletin Board System

批踢踢實業坊 (PTT) 就是一個台灣的電子佈告欄 (Bulletin Board System, BSS)，採用 Telnet BBS 技術運作。

### Secure Shell (SSH)

Although **Secure Shell** (**SSH**) is a secure application program that can be used today for several purposes such as remote logging and file transfer, it was originally designed to replace TELNET.

There are two versions of SSH: SSH-1 and SSH-2, which are totally incompatible. The first version, SSH-1, is now deprecated because of security flaws in it. The current version is called SSH-2.

### Domain Name System (DNS)

To identify an entity, TCP/IP protocols use the IP address, which uniquely identifies the connection of a host to the Internet. However, people prefer to use names instead of numeric addresses. Therefore, the Internet needs to have a directory system that can map a name to an address.

Since the Internet is so huge today, a central directory system cannot hold all the mapping. In addition, if the central computer fails, the whole communication network will collapse. A better solution is to distribute the information among many computers in the world. In this method, the host that needs mapping can contact the closest computer holding the needed information.

Figure shows how TCP/IP uses a DNS client and a DNS server to map a name to an address:

> [!figure]
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     splines=line;
>     node [shape=plaintext];
>     u [label="User"];
>     nl [label="Network layer"];
>     node [shape=rect];
>     f [label="File\ntransfer\nclient", fixedsize=true, width=1, height=1];
>     dc [label="DNS\nclient", fixedsize=true, height=1];
>     ds [label="DNS\nserver", fixedsize=true, height=1];
>     {rank=same; u; f; nl;}
>     u -> f [label="Host  \nname  ", minlen=2];
>     f -> dc [label="Host name"];
>     dc -> ds [label="Query"];
>     ds -> dc [label="\n\nResponse"];
>     dc -> f [label="\n\nIP address"];
>     f -> nl [label="IP   \naddress   ", minlen=2];
> }
> ```

#### Name space

The names must be unique because the addresses are unique.

A **name space** can map each address to a unique name and is normally organized hierarchically. In a *hierarchical name space*, each name is made of several parts. The first part can define the nature of the organization, the second part can define the name of an organization, the third part can define departments in the organization, and so on.

#### DNS in the Internet

In the Internet, the **domain name space** (tree) was originally divided into three different sections:

- **Generic domai**  
    $e.g.$ `.com`, `.edu`, `.gov`, `.org`, ...
- **Country domai**  
    $e.g.$ `.tw`, `.us`, `.jp`, ...
- **Inverse domain**  
    However, due to the rapid growth of the Internet, it became extremely difficult to keep track of the inverse domains, which could be used to find the name of a host when given the IP address. *The inverse domains are now deprecated*

## Peer-to-peer paradigm

- Internet users that are ready to share their resources become peers and form a network. When a peer in the network has a file to share, it makes it available to the rest of the peers.
- An interested peer can connect itself to the computer where the file is stored and download it. After a peer downloads a file, it can make it available for other peers to download.
- As more peers join and download that file, more copies of the file become available to the group.

Since lists of peers may grow and shrink, the question is how the paradigm keeps track of loyal peers and the location of the files. To answer this question, we first need to divide the P2P networks into two categories:

- Centralized
- Decentralized

### Centralized networks

In a centralized P2P network,

- The directory system listing of the peers and what they offer uses the *client–server* paradigm
- The storing and downloading of the files are done using the *peer-to-peer* paradigm

For this reason, a centralized P2P network is sometimes referred to as a hybrid P2P network.

### Decentralized network

A decentralized P2P network does not depend on a centralized directory system. In this model, peers arrange themselves into an overlay network, which is a logical network made on top of the physical network. Depending on how the nodes in the overlay network are linked, a decentralized P2P network is classified as either

- Unstructured  
    In an unstructured P2P network, the nodes are linked randomly. A search in an unstructured P2P is not very efficient because a query to find a file must be flooded through the network, which produces significant traffic and still the query may not be resolved.
- Structured  
    A structured network uses a predefined set of rules to link nodes so that a query can be effectively and efficiently resolved. The most common technique used for this purpose is the *Distributed Hash Table* (DHT).
