# 【16-5】Firewall

A **firewall** is a device (usually a router or a computer) installed between the internal network of an organization and the rest of the Internet. It is designed to forward some packets and filter (not forward) others.

For example,

- A firewall may filter all incoming packets destined for a specific host or a specific server such as HTTP.
- A firewall can be used to deny access to a specific host or a specific service in the organization.

## Packet-filter firewall

A firewall can be used as a packet filter.

It can forward or block packets based on the information in the *network-layer* and *transport-layer* headers:

- Source and destination IP addresses
- Source and destination port addresses
- Type of protocol (TCP or UDP)

A **packet-filter firewall** is a router that uses a filtering table to decide which packets must be discarded (not forwarded).

## Proxy firewall

The packet-filter firewall is based on the information available in the network-layer and transport-layer headers (IP and TCP/UDP).

However, sometimes we need to filter a message based on the information available in the message itself (at the *application layer*).

As an example, assume that an organization wants to implement the following policies regarding its web pages: only those Internet users who have previously established business relations with the company can have access; access to other users must be blocked. In this case, a packet-filter firewall is not feasible because it cannot distinguish between different packets arriving at TCP port 80 (HTTP). Testing must be done at the application level (using URLs).

One solution is to install a proxy computer (sometimes called an **application gateway**), which stands between the customer computer and the corporation computer.

When the user client process sends a message, <mark>the application gateway runs a server process to receive the request.</mark> The server opens the packet at the application level and finds out if the request is legitimate.

- If it is, the server acts as a client process and sends the message to the real server in the corporation.
- If it is not, the message is dropped and an error message is sent to the external user.

In this way, the requests of the external users are filtered based on the contents at the application layer.
