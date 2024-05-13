<style>
table:nth-of-type(1) thead,
table:nth-of-type(2) thead,
table:nth-of-type(3) thead {
    display: none;
}
</style>

# 【15】Data Compression

**Data compression** implies sending or storing a smaller number of bits.

In general these methods can be divided into two broad categories:

> [!figure]
$$
\begin{array}{c}  \text{Data compression} \\ \text{methods} \end{array}
\begin{cases}
    & \begin{array}{c}  \text{Lossless methods} \\ \text{(text or programs)} \end{array}
    & \begin{cases}
        & \text{Run-length} \\
        & \text{Huffman} \\
        & \text{Lempel Ziv}
    \end{cases} \\\\
    & \begin{array}{c}  \text{Lossy methods} \\ \text{(image, video, audio)} \end{array}
    & \begin{cases}
        & \text{JPEG} \\
        & \text{MPEG} \\
        & \text{MP3}
    \end{cases}
\end{cases}
$$

## Lossless Compression Methods

In **lossless data compression**, the integrity of the data is preserved. The original data and the data after *compression* and *decompression* are exactly the same because, in these methods, the compression and decompression algorithms are exact inverses of each other: no part of the data is lost in the process. Redundant data is removed in compression and added during decompression.

### Run-length encoding

The general idea behind this method is to replace consecutive repeating occurrences of a symbol by one occurrence of the symbol followed by the number of occurrences.

> [!example]
$$
\definecolor{red}{RGB}{227, 86, 111}
\begin{align}
    & \text{BBBBBBBBBAAAAAAAAAAAAAAAANMMMMMMMMMM} \\
    & \rightarrow
        \text{B}
        \textcolor{red}{09}
        \text{A}
        \textcolor{red}{16}
        \text{N}
        \textcolor{red}{01}
        \text{M}
        \textcolor{red}{10}
\end{align}
$$

---

> [!example]
> Let's say we have an image represented by mostly 0s and some 1s. In this case, we can reduce the number of bits by sending (or storing) <mark>the number of 0s occurring between two 1s.</mark>
$$
\definecolor{red}{RGB}{227, 86, 111}
\begin{align}
    & \text{00000000000000}
    \textcolor{red}{1}
    \text{0000}
    \textcolor{red}{11}
    \text{000000000000} \\
    & \rightarrow \text{fourteen 0s, four 0s, zero 0, twelve 0s} \\
    & \rightarrow \text{1110 0100 0000 1100}
\end{align}
$$
> Note that, given a 4-bit binary compression, if there are more than fifteen 0s, they are broken into two or more groups. If the first count is 1111, the receiver knows the next 4-bit pattern is a continuation of 0s.
$$
\begin{align}
    & \text{fifteen 0s}     & \rightarrow & \qquad \text{1111 0000} \\
    & \text{twenty-five 0s} & \rightarrow & \qquad \text{1111 1010}
\end{align}
$$

### Huffman coding

**Huffman coding** assigns shorter codes to symbols that occur more frequently and longer codes to those that occur less frequently.

It follows three basic steps:

1. Put the entire character set in a row. Each character is now a node at the lowest level of the tree.
2. <mark>Find the two nodes with the smallest weights and join them to form a third node</mark>, resulting in a simple two-level tree. The weight of the new node is the combined weights of the original two nodes. This node, one level up from the leaves, is eligible for combination with other nodes. Remember that the sum of the weights of the two nodes chosen must be smaller than the combination of any other possible choices.
3. Repeat step 2 until all of the nodes, on every level, are combined into a single tree.

Once the tree is complete, use it to assign codes to each character. First, assign a bit value to each branch. Starting from the root (top node), <mark>assign 0 to the left branch and 1 to the right branch</mark> and repeat this pattern at each node.

A character's code is found by starting at the root and following the branches that lead to that character. The code itself is the bit value of each branch on the path, taken in sequence.

> [!example]
>
> |           |     |     |     |     |     |
> | --------- | :-: | :-: | :-: | :-: | :-: |
> | Character |  A  |  B  |  C  |  D  |  E  |
> | Frequency | 17% | 12% | 12% | 27% | 32% |
>
> ```graphviz
> graph {
>     splines=line;
>     subgraph cluster_space {
>         graph[peripheries=0];
>         node [shape=none];
>         3 [label=""];
>         node [shape=circle, fixedsize=true];
>         1 [label="\n\n\n\n100"];
>         2 [label="\n\n\n\n41  "];
>         4 [label="\n\n\n\n  59"];
>         5 [label="\n\nA\n\n17"];
>         6 [label="\n\n\n\n24  "];
>         7 [label="\n\nD\n\n27"];
>         8 [label="\n\nE\n\n32"];
>         9 [label="\n\nB\n\n12"];
>         10 [label="\n\nC\n\n12"];
>         1 -- 2 [weight=2];
>         1 -- 4;
>         1 -- 3 [style=invis];
>         2 -- {5, 6};
>         3 -- {6, 7} [style=invis];
>         4 -- {7, 8};
>         6 -- {9, 10};
>         {rank=same; 5; 9; 10; 7; 8;}
>     }
> }
> ```
>
> Note that we moved the leaf nodes to make the tree look like a binary tree.
>
> ```graphviz
> graph {
>     splines=line;
>     subgraph cluster_space {
>         graph[peripheries=0];
>         node [shape=none];
>         3 [label=""];
>         node [shape=circle, fixedsize=true];
>         1 [label="\n\n\n\n  0                      1"];
>         2 [label="\n\n\n\n   0          1"];
>         4 [label="\n\n\n\n0         1   "];
>         6 [label="\n\n\n\n 0          1"];
>         5 [label="A"];
>         7 [label="D"];
>         8 [label="E"];
>         9 [label="B"];
>         10 [label="C"];
>         1 -- {2, 4};
>         2 -- {5, 6};
>         4 -- {7, 8};
>         6 -- {9, 10};
>         edge [style=invis];
>         1 -- 3;
>         3 -- {6, 7};
>     }
> }
> ```
>
> |           |     |     |     |     |     |
> | --------- | :-: | :-: | :-: | :-: | :-: |
> | Character |  A  |  B  |  C  |  D  |  E  |
> | Frequency | 17% | 12% | 12% | 27% | 32% |
> | Code      | 00  | 010 | 011 | 10  | 11  |

---

> [!example]
> 台聯大-107-計算機概論-26：
>
> $Q:$
>
> What is the length of the character after encoding by Huffman coding with the given frequencies?
>
> $Sol:$
>
> Code 不是唯一。從葉節點開始建立樹的時候，並沒有規定誰左誰右。
>
> |           |     |      |     |      |     |
> | --------- | :-: | :--: | :-: | :--: | :-: |
> | Character |  A  |  B   |  C  |  D   |  E  |
> | Frequency | 20  |  8   |  9  |  2   | 14  |
> | Code      |  1  | 0001 | 001 | 0000 | 01  |
> | *Bits*    |  1  |  4   |  3  |  4   |  2  |

---

### Lempel Ziv encoding

**Lempel Ziv (LZ) encoding**, named after its inventors (Abraham Lempel and Jacob Ziv), is an example of a category of algorithms called **dictionary-based encoding**.

*Simple version* of the LZ algorithm:

#### Compression

In this phase there are two concurrent events:

- Building an indexed dictionary

    <mark>The algorithm extracts the smallest substring that cannot be found in the dictionary from the remaining uncompressed string. It then stores a copy of this substring in the dictionary as a new entry and assigns it an index value.</mark>

- Compressing a string of symbols

    <mark>Compression occurs when the substring, except for the last character, is replaced with the index found in the dictionary. The process then inserts the index and the last character of the substring into the compressed string.</mark>

> [!example]
$$
\underline{B} \  
\underline{A} \  
\underline{AB} \  
\underline{ABB} \  
\underline{BA} \  
\underline{ABBB} \  
\underline{BAA}
\rightarrow B, A, 2B, 3B, 1A, 4B, 5A
$$
>
> |                   |     |     |      |       |      |        |       |
> | ----------------: | :-: | :-: | :--: | :---: | :--: | :----: | :---: |
> |     Parsed string |  B  |  A  | *A*B | *AB*B | *B*A | *ABB*B | *BA*A |
> |           *Index* |  1  |  2  |  3   |   4   |  5   |   6    |   7   |
> | Compressed string |  B  |  A  | *2*B | *3*B  | *1*A |  *4*B  | *5*A  |
>
> 可以像上表一樣從第一個讀取到的字元開始建立 index；也可以一開始就建立好所有字元的 index，例如初始就先建立 A = 1 與 B = 2
>
> |                   |     |     |      |          |
> | ----------------: | :-: | :-: | :--: | -------- |
> |     Parsed string |  A  |  B  | *A*B |          |
> |             Index |  1  |  2  |  3   | $\cdots$ |
> | Compressed string |  A  |  B  | *1*B |          |
>
> 實際上可以利用統一的標準，例如 ASCII Code，來建立每個字元的 index，後續再接著建立字典。

#### Decompression

Decompression is the *inverse* of the compression process.

The process extracts the substrings from the compressed string and tries to replace the indexes with the corresponding entry in the dictionary, which is empty at first and built up gradually.

> [!example]
$$
B, A, 2B, 3B, 1A, 4B, 5A \rightarrow
\underline{B} \  
\underline{A} \  
\underline{AB} \  
\underline{ABB} \  
\underline{BA} \  
\underline{ABBB} \  
\underline{BAA}
$$
>
> |                     |     |     |      |       |      |        |       |
> | ------------------: | :-: | :-: | :--: | :---: | :--: | :----: | :---: |
> |   Compressed string |  B  |  A  | *2*B | *3*B  | *1*A |  *4*B  | *5*A  |
> |             *Index* |  1  |  2  |  3   |   4   |  5   |   6    |   7   |
> | Uncompressed string |  B  |  A  | *A*B | *AB*B | *B*A | *ABB*B | *BA*A |

#### Other versions

The algorithm has gone through several versions:

- **Lempel Ziv Welch (LZW) encoding**, compresses even last character.
- LZ77
- LZ78

## Lossy Compression Methods

Loss of information is not acceptable in a text file or a program file.

It is, however, acceptable in an image, video, or audio file. The reason is that our eyes and ears cannot distinguish subtle changes. In such cases, we can use a **lossy data compression** method.

These methods are cheaper—they take less time and space when it comes to sending millions of bits per second for images and video.

> [!example]
> 台聯大-109-計算機概論-21：
>
> $Q:$
>
> In which data compression method, the received data need not be an exact copy of the original message.
>
> $Ans:$
>
> (A) MP3.
>
> (B) JPEG.
>
> (C) MPEG.
>
> (D) GIF.
>
> **(E)** all of the above.

### Image compression—JPEG encoding

**JPEG (Joint Photographic Experts Group)** encoding is used to compress pictures and graphics.

An image can be represented by a two-dimensional array (table) of picture elements (pixels).

- If the picture is *grayscale*, each pixel can be represented by an 8-bit integer, giving 256 levels of gray.
- If the picture is color, each pixel can be represented by 24 bits ($3 \times 8$ bits), with each 8 bits representing one of the colors in the *RBG color system*.

You can see why we need compression. A grayscale picture of $640 \times 480 = 307,200$ pixels is represented by $2,457,600$ bits, and a color picture is represented by $7,372,800$ bits.

In JPEG, a grayscale picture is divided into blocks of $8 \times 8$ pixel blocks.

$$
640 \times 480 \text{ pixels}^2
= \dfrac{640 \times 480 \text{ pixels}^2}{8 \times 8 ^{\text{ pixels}^2}/_\text{block}}
= 80 \times 60 \text{ blocks}
$$

The purpose of dividing the picture into blocks is to decrease the number of calculations because, as we will see shortly, the number of mathematical operations for each picture is the *square* of the number of units.

$$
\begin{cases}
& \text{For the entire image,}
& \begin{array}{l}
    &   & (640 \times 480)^2 \text{ operations} \\
    & = & 94,371,840,000 \text{ operations}
\end{array}
\\\\\\
& \text{If we use JPEG,}
& \begin{array}{l}
    &   & (8 \times 8)^2 {^\text{ operations}}/_\text{block} \times (80 \times 60) \text{ blocks} \\
    & = & 19,660,800 \text{ operations}
\end{array}
\end{cases}
$$

This decreases by $4800$ times the number of operations.

A simplified version of the process is shown in Figure.

> [!figure]
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     node [shape="rect"];
>     b [label="Blocked\nimage"];
>     subgraph cluster1 {
>         label="Three phases of JPEG";
>         d [label="DCT"];
>         q [label="Quantization"];
>         l [label="Lossless\ncompression"];
>         d -> q -> l;
>     }
>     c [label="Compressed\nimage"];
>     b -> d;
>     l -> c;
> }
> ```

#### Discrete cosine transform (DCT)

In this step, each *block* of 64 pixels goes through a transformation called the **discrete cosine transform (DCT)**. The transformation changes the 64 values so that the relative relationships between pixels are kept but the redundancies are revealed.

$P(x,\ y)$ defines one particular value in the picture block, while $T(m,\ n)$ defines one value in the transformed block.

- According to the formula, the value of <mark>$T(0,\ 0)$ is the average of the other values.</mark> This is called the *DC value* (direct current, borrowed from electrical engineering).
- The rest of the values, called *AC values*, in <mark>$T(m,\ n)$ represent changes in the pixel values.</mark>

> [!example]
>
> We have three blocks of uniform grayscale.
>
> ```graphviz
> digraph {
>     rankdir="LR";
>     node [shape="rect"];
> 
>     b [label="", style=filled, fillcolor="#202020", xlabel="Block"];
>     p [label="20 20 20 20 20 20 20 20\n20 20 20 20 20 20 20 20\n20 20 20 20 20 20 20 20\n20 20 20 20 20 20 20 20\n20 20 20 20 20 20 20 20\n20 20 20 20 20 20 20 20\n20 20 20 20 20 20 20 20\n20 20 20 20 20 20 20 20", xlabel="P(x, y)"];
>     t [label=" 160   0   0   0   0   0   0   0\r0   0   0   0   0   0   0   0\r0   0   0   0   0   0   0   0\r0   0   0   0   0   0   0   0\r0   0   0   0   0   0   0   0\r0   0   0   0   0   0   0   0\r0   0   0   0   0   0   0   0\r0   0   0   0   0   0   0   0\r", xlabel="T(m, n)"];
>     b -> p -> t [minlen=2];
> 
> 
>     b2 [label="", style=filled, fillcolor="#202020;0.5:#505050", xlabel="Block"];
>     p2 [label="20 20 20 20 50 50 50 50\n20 20 20 20 50 50 50 50\n20 20 20 20 50 50 50 50\n20 20 20 20 50 50 50 50\n20 20 20 20 50 50 50 50\n20 20 20 20 50 50 50 50\n20 20 20 20 50 50 50 50\n20 20 20 20 50 50 50 50", xlabel="P(x, y)"];
>     t2 [label="200  -100     0    39      0  -25   -1   22\r0        0      0      0      0      0     0     0\r0        0      0      0      0      0     0     0\r0        0      0      0      0      0     0     0\r0        0      0      0      0      0     0     0\r0        0      0      0      0      0     0     0\r0        0      0      0      0      0     0     0\r0        0      0      0      0      0     0     0\r", xlabel="T(m, n)"];
>     b2 -> p2 -> t2 [minlen=2];
> 
> 
>     b3 [label="", style=filled, fillcolor="#202020:#909090", xlabel="Block"];
>     p3 [label="20 30 40 50 60 70 80 90\n20 30 40 50 60 70 80 90\n20 30 40 50 60 70 80 90\n20 30 40 50 60 70 80 90\n20 30 40 50 60 70 80 90\n20 30 40 50 60 70 80 90\n20 30 40 50 60 70 80 90\n20 30 40 50 60 70 80 90", xlabel="P(x, y)"];
>     t3 [label="400 -146    0  -31   -1     3    -1   -8\r0       0     0     0     0     0     0     0\r0       0     0     0     0     0     0     0\r0       0     0     0     0     0     0     0\r0       0     0     0     0     0     0     0\r0       0     0     0     0     0     0     0\r0       0     0     0     0     0     0     0\r0       0     0     0     0     0     0     0\r", xlabel="T(m, n)"];
>     b3 -> p3 -> t3 [minlen=2];
> 
> 
>     edge [style=invis];
>     b -> b2 -> b3 [minlen=10];
>     {rank=same; b; b2; b3;}
> }
> ```

##### The discrete cosine transform

> [!figure]
$$
\begin{align}
T(m,\ n) = 0.25 & c(m) \ c(n)
\sum_{x=0}^{7} \sum_{y=0}^{7} P(x,\ y)
\cos \Bigg[ \dfrac{(2x + 1)m\pi}{16} \Bigg]
\cos \Bigg[ \dfrac{(2y + 1)n\pi}{16} \Bigg]
\\
& \text{where} \qquad\qquad\qquad
c(i) =
\begin{cases}
\dfrac{1}{\sqrt{2}}
& \text{if } i = 0
\\\\
\quad 1
& \text{otherwise}
\end{cases}
\end{align}
$$

##### The inverse discrete cosine transform

The inverse transform is used to create the $P(x,\ y)$ table from the $T(m,\ n)$ table.

> [!figure]
$$
\begin{align}
P(x,\ y) = 0.25 & c(x) \ c(y)
\sum_{m=0}^{7} \sum_{n=0}^{7} T(m,\ n)
\cos \Bigg[ \dfrac{(2m + 1)x\pi}{16} \Bigg]
\cos \Bigg[ \dfrac{(2n + 1)y\pi}{16} \Bigg]
\\
& \text{where} \qquad\qquad\qquad
c(i) =
\begin{cases}
\dfrac{1}{\sqrt{2}}
& \text{if } i = 0
\\\\
\quad 1
& \text{otherwise}
\end{cases}
\end{align}
$$

#### Quantization

After the T table is created, the values are quantized to reduce the number of bits needed for encoding. <mark>Quantization divides the number of bits by a constant and then drops the fraction.</mark> This reduces the required number of bits even more. In most implementations, a quantizing table (8 by 8) defines how to quantize each value. The divisor depends on the position of the value in the T table. This is done to optimize the number of bits and the number of 0s for each particular application.

Note that the only phase in the process that is not reversible is the quantizing phase. You lose some information here that is not recoverable. The only reason that <mark>JPEG is a lossy compression method is because of the quantization phase.</mark>

#### Compression

After quantization the values are read from the table, and redundant 0s are removed. However, to cluster the 0s together, the process reads the table diagonally in a [zigzag][] fashion rather than row by row or column by column. The reason is that if the picture does not have fine changes, the bottom right corner of the T table is all 0s. JPEG usually uses *run-length encoding* at the compression phase to compress the bit pattern resulting from the zigzag linearization.

[zigzag]: https://en.wikipedia.org/wiki/JPEG#Entropy_coding

### Video compression—MPEG encoding

**MPEG (Moving Picture Experts Group)** encoding is used to compress video.

A frame is a spatial combination of pixels, and a video is a temporal combination of frames that are sent one after another. Compressing video, then, means spatially compressing each frame and temporally compressing a set of frames.

#### Spatial compression

The **spatial compression** of each frame is done with JPEG, or a modification of it. Each frame is a picture that can be independently compressed.

#### Temporal compression

In **temporal compression**, redundant frames are removed. Because most of the consecutive frames are almost the same.

To temporally compress data, the MPEG method first divides frames into three categories:

- **I-frames**

    An **intracoded frame** (I-frame) is an *independent frame* that is not related to any other frame—that is, not to the frame sent before or to the frame sent after. They are present at regular intervals (for example, every ninth frame is an I-frame).

    An I-frame must appear periodically due to some sudden change in the frame that the previous and following frames cannot show. Also, when a video is broadcast, a viewer may tune in their receiver at any time. If there is only one I-frame at the beginning of the broadcast, the viewer who tunes in late will not receive a complete picture.

    I‑frames are independent of other frames and cannot be constructed from other frames.

- **P-frames**

    A **predicted frame** (P-frame) is related to the preceding I-frame or P‑frame.

    In other words, each P-frame contains only *the changes* from the preceding frame. The changes, however, cannot cover a big segment of the image. For example, for a fast-moving object, the new changes may not be recorded in a P-frame.

    P-frames can be constructed only from previous I- or P-frames. P‑frames carry much less information than other frame types and carry even fewer bits after compression.

- **B-frames**

    A **bidirectional frame** (B-frame) is relative to the preceding and following I-frame or P-frame. In other words, each B-frame is relative to the past and the future.

    Note that a B-frame is never related to another B-frame.

Note that for decoding, the decoding process should receive the P-frames before the B-frames.

### Audio compression—MP3

**MP3 (MPEG audio layer 3)** for audio compression.

Audio compression can be used for speech or music.

- For speech we need to compress a 64-kHz digitized signal
- For music we need to compress a 1.411-MHz signal.

Two categories of techniques are used for audio compression:

- Predictive encoding
- Perceptual encoding

#### Predictive encoding

In **predictive encoding**, the <mark>differences between samples are encoded instead of encoding all the sampled values.</mark> This type of compression is normally used for speech.

Several standards have been defined such as

- GSM (13 kbps)
- G.729 (8 kbps)
- G.723.3 (6.4 or 5.3 kbps).

#### Perceptual encoding: MP3

The most common compression technique used to create CD-quality audio is based on the **perceptual encoding** technique. This type of audio needs at least 1.411 Mbps, which cannot be sent over the Internet without compression.

**MP3 (MPEG audio layer 3)**, a part of the MPEG standard (discussed in the video compression section), uses this technique.

**Perceptual encoding** is based on the science of psychoacoustics, which is the study of how people perceive sound. The idea is based on flaws in our auditory system: <mark>some sounds can mask other sounds. Masking can happen in both frequency and time.</mark>

- In frequency masking, a loud sound in one frequency range can partially or totally mask a softer sound in another frequency range.
- In temporal masking, a loud sound can reduce the sensitivity of our hearing for a short time even after the sound has stopped.

MP3 uses these two phenomena, frequency and temporal masking, to compress audio signals. The technique analyzes and divides the audio spectrum into several groups.

- Zero bits are allocated to frequency ranges that are totally masked.
- A small number of bits are allocated to frequency ranges that are partially masked.
- A larger number of bits are allocated to frequency ranges that are not masked.

MP3 produces three data rates: 96 kbps, 128 kbps, and 160 kbps. The rate is based on the range of the frequencies in the original analog audio.

## Communication Errors

傳輸資料的過程中，可能會發生意外導致數據錯誤。若是發生在壓縮過後的檔案，就算只有 1 bit 發生錯誤，也可能會導致無法解壓縮。因此ㄧ些編碼技術被開發來檢測甚至更正錯誤。

### Parity Bits

奇偶校驗位可以分為：

- Odd parity
- Even parity

以 Odd parity 為例，我們設計一系統，每個正確的位元樣式都包含著奇數個 1。因此，若是某個位元樣式有著偶數個 1，就代表著錯誤發生了。若是應用在 ASCII Code 上，我們可以替每個字元加上一個額外的位元，使得該位元樣式含有奇數個 1。

> [!example]
> 台聯大-108-計算機概論-26：
>
> $Q:$
>
> An 8 bit datum appends 1 bit *odd parity checking* bit for error detection. Which of the following data must have at least one bit *error*?
>
> **(A)** 100100110
>
> (B) 011010011
>
> (C) 111100001
>
> **(D)** 010101010
>
> **(E)** 001100101

The straightforward use of parity bits is simple, but it has its limitations.

<mark>If a pattern originally has an odd number of 1s and suffers two errors, it will still have an odd number of 1s, and thus the parity system will not detect the errors.</mark> In fact, straightforward applications of parity bits fail to detect any even number of errors within a pattern.
