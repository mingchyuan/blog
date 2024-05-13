# 【3-4】Storing Audio

Text is composed of countable entities (characters): we can count the number of characters in text. Text is an example of **digital** data.

Audio is an example of **analog** data. Even if we are able to measure all its values in a period of time, we cannot store these in the computer's memory, as we would need an *infinite* number of memory locations.

## Sampling

**Sampling** means that we select only a *finite* number of points on the analog signal, measure their values, and record them.

### Sampling rate

It has been shown that a **sampling rate** of 40,000 samples per second is good enough to reproduce an audio signal.

## Quantization

It is simpler to use an unsigned number (a bit pattern) for each sample. **Quantization** refers to a process that rounds the value of a sample to the closest integer value.

## Encoding

The quantized sample values need to be encoded as bit patterns.

Some systems assign positive and negative values to samples, some just shift the curve to the positive part and assign only positive values. In other words, some systems use an unsigned integer to represent a sample, while others use signed integers to do so.

### Bit per sample

The system needs to decide how many bits should be allocated for each sample.

Although in the past only 8 bits were assigned to sound samples, today 16, 24, or even 32 bits per sample is normal. The number of bits per sample is sometimes referred to as the **bit depth**.

### Bit rate

If we call the bit depth or number of bits per sample $B$, the number of samples per second, $S$, we need to store $S \times B$ bits for each second of audio. This product is sometimes referred to as **bit rate**, $R$.

> [!example]
> if we use 40,000 samples per second and 16 bits per sample, the bit rate is
$$R = 40,000 × 16 = 640,000 \ ^\text{bits}/_\text{s} = 640 \ ^\text{Kb}/_\text{s}$$

---

> [!example]
> 台聯大-107-計算機概論-5：
>
> $Q:$
>
> We use 8K times per second sampling audio signal. 128 different levels present each sample. How many bytes are needed to store 2 minutes audio voice.
>
> $Sol:$
>
> 以二進位表示 128 個樣本至少需要
$$
\lceil \log_{2}{128} \rceil = 7 \text{ bits}
$$
> 2 分鐘的音檔大小為
$$
120 \text{ sec} \times 8000 \ ^\text{samples}/_\text{sec} \times 7 \ ^\text{bits}/_\text{sample}
$$

## Standards for sound encoding

Today the dominant standard for storing audio is **MP3** (short for MPEG Layer 3). This standard is a modification of the **MPEG** (Motion Picture Experts Group) compression method used for video. It uses 44,100 samples per second and 16 bits per sample. The result is a signal with a bit rate of 705,600 bits per second, which is compressed using a compression method that discards information that cannot be detected by the human ear. This is called lossy compression, as opposed to lossless compression: see [Chapter【15】][].

[Chapter【15】]: /資訊工程/計算機概論/ch15/【15】data-compression#audio-compressionmp3
