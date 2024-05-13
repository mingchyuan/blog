# 【5-4】Input/Output Subsystem

## Nonstorage devices

- Keyboard
- Monitor
- Printer

## Storage devices

**Storage devices**, although classified as I/O devices, can store large amounts of information to be retrieved at a later time. Their contents are *nonvolatile*.

### Magnetic storage devices

Magnetic storage devices use magnetization to store bits of data. If a location is magnetized, it represents 1, if not magnetized, it represents 0.

#### Magnetic disks

A magnetic disk consists of one or more disks stacked on top of each other.

Information is stored on and retrieved from the surface of the disk using a *read/write head* for each magnetized surface of the disk.

- Surface organization:  
    - To organize data stored on the disk, each surface is divided into **tracks**, and each track is divided into **sectors**.
    - The tracks are separated by an *intertrack gap*, and the sectors are separated by an *intersector gap*.
- Data access:  
    - A magnetic disk is considered a *random access* device.
    - The smallest storage area that can be accessed at one time is a sector. A block of data can be stored in one or more sectors.
- Performance:  
    - The **rotational speed** defines how fast the disk is spinning.
    - The **seek time** defines the time to move the read/write head to the desired track where the data is stored.
    - The **transfer time** defines the time to move data from the disk to the CPU/memory.

#### Magnetic tape

Magnetic tape is mounted on two reels and uses a read/write head that reads or writes information when the tape is passed through it.

- Surface organization:  
    - The width of the tape is divided into nine tracks, each location on a track storing 1 bit of information.
    - Nine vertical locations can store 8 bits of information related to a byte plus 1 bit for error detection.
- Data access:  
    - A magnetic tape is considered a *sequential access* device.
    - To retrieve a specific block on the tape, we need to pass through all the previous blocks.
- Performance:  
    - Magnetic tape is slower than a magnetic disk.

### Optical storage devices

- CD-ROMs
- CD-R (Recordable)
    - Sometimes called write once, read many (WORM).
- CD-RW (Rewritable)
    - Sometimes called erasable optical disk.
- DVD
