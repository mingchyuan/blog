# 【3-5】Storing Images

Images are stored in computers using two different techniques:

> [!figure]
$$
\text{Images }
\begin{cases}
    & \text{Raster graphics} \\
    & \text{Vector graphics}
\end{cases}
$$

## Raster graphics

Raster graphics (or bitmap graphics) is used when we need to store an analog image such as
a photograph.

A photograph consists of analog data, similar to audio information: the difference is that the intensity (color) of data varies in space instead of in time. This means that data must be sampled. However, sampling in this case is normally called **scanning**. The samples are called **pixels** (which stands for picture elements). In other words, the whole image is divided into small pixels where each pixel is assumed to have a single intensity value.

### Resolution

Just like audio sampling, in image scanning we need to decide how many pixels we need to record for each square or linear inch. The scanning rate in image processing is called **resolution**.

### Color depth

The number of bits used to represent a pixel, its **color depth**, depends on how a pixel's color is handled by different encoding techniques.

#### True-Color

One of the techniques used to encode a pixel is called **True-Color**, which uses $24$ bits to encode a pixel. In this technique, each of the three primary colors (*RGB*) are represented by eight bits. Since an 8-bit pattern can represent a number between 0 to 255 in this technique, each color is represented by three decimal numbers between 0 to 255.

Note that the True-Color scheme can encode $2^{24}$ or $16,776,216$ colors.

#### Indexed color

The True-Color scheme uses more than 16 million colors. Many applications do not need such a large range of colors.

The **indexed color**—or **palette color**—scheme uses only a portion of these colors. In this scheme each application selects a few (normally 256) colors from the large set of colors and indexes them, assigning a number between 0 and 255 to each selected color.

The index color scheme normally uses 256 indexes, which needs only $8$ bits to store the same pixel.

### Standards for image encoding

- **JPEG** (Joint Photographic Experts Group) uses the True-Color scheme, but compresses the image to reduce the number of bits (see Chapter 15).
- **GIF** (Graphic Interchange Format), on the other hand, uses the indexed color scheme.

## Vector graphics

Raster graphics has two disadvantages:

- The file size is big.
- Rescaling is troublesome.

The **vector graphic** image encoding method, however, does not store the bit patterns for each pixel. An image is decomposed into a combination of geometrical shapes such as lines, squares, or circles. Each geometrical shape is represented by a mathematical formula.

When the image is to be displayed or printed, the size of the image is given to the system as an input. The system rescales the image to the new size and uses the same formulae to draw the image. In this case, each time an image is drawn, the formulae are reevaluated. For this reason, vector graphics are also called *geometric modeling* or *object-oriented graphics*.

Vector graphics is not suitable for storing the subtleties of photographic images. JPEG or GIF raster graphics provide much better and more vivid pictures.

Vector graphics is suitable for applications that use mainly geometric primitives to create images. It is used in applications such as FLASH, and to create TrueType (Microsoft, Apple) and PostScript ( Adobe) fonts. Computer-aided design (CAD) also uses vector graphics for engineering drawings.
