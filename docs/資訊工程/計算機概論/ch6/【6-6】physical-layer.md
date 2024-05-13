# 【6-6】Physical Layer

The role of the **physical layer** is to transfer the bits received from the data-link layer and convert them to electromagnetic signals for transmission. After the bits are converted to signals, the signals are delivered to the transmission media.

## Data and signals

At the physical layer, the communication is *node-to-node*, but the nodes exchange electromagnetic signals.

One of the major functions of the physical layer is to route bits between nodes. However, bits, as the representation of two possible values stored in the memory of a node (host, router, or switch), cannot be sent directly to the transmission medium (wire or air); the bits need to be changed to signals before transmission. So <mark>the main duty of the physical layer is to efficiently convert these bits into electromagnetic signals.</mark>

### Analog and Digital

Data can be analog or digital.

- **Analog data** refers to information that is continuous.

    Analog data, such as the sounds made by a human voice, take on continuous values. When someone speaks, an analog wave is created in the air.

    This can be captured by a microphone and

    - converted to an **analog signal**.
    - *sampled* and converted to a **digital signal**.

- **Digital data** take on discrete values.

    For example, data are stored in computer memory in the form of 0s and 1s. They can be

    - converted to a **digital signal**
    - *modulated* into an **analog signal** for transmission across a medium

## Digital transmission

- Digital–to–digital conversion
- Analog-to-digital conversion

## Analog transmission

- Digital-to-analog conversion
- Analog-to-analog conversion
