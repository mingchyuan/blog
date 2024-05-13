# 【13】File Structure

## Introduction

> [!figure]
$$
\text{Files}
\begin{cases}
& \text{Sequential access}
    & \begin{cases}
        & \text{Sequential file}
    \end{cases} \\\\\\
& \text{Random access}
    & \begin{cases}
        & \text{Indexed file} \\\\
        & \text{Hashed file}
    \end{cases}
\end{cases}
$$

<mark>A file is a collection of data records</mark> in which each record consists of one or more fields.

When we design a file, the important issue is how we will retrieve information ( a specific record) from the file. Sometimes we need to process records one after another, whereas sometimes we need to access a specific record quickly without retrieving the preceding records. The access method determines how records can be retrieved:

- Sequentially
- Randomly

### Sequential access

If we need to access a file sequentially—that is, one record after another, from beginning to end—we use a **sequential file** structure.

### Random access

If we need to access a specific record without having to retrieve all records before it, we use a file structure that allows **random access**. Two file structures allow this:

- **Indexed files**
- **Hashed files**

## Sequential Files

A sequential file is one in which records can only be accessed one after another from beginning to end. Records are stored one after another in auxiliary storage, such as tape or disk, and there is an EOF (end-of-file) marker after the last record.

The operating system has no information about the record addresses, it only knows where the whole file is stored. The only thing known to the operating system is that the records are sequential.

### Updating sequential files

#### Files involved in updating

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=note];
>     labelloc="c";
>     subgraph cluster1 {
>         label="Transaction file";
>         color=white;
>         tf [label="Transaction\nrecord"];
>     }
>     subgraph cluster2 {
>         label="Old master file";
>         color=white;
>         of [label="Old master\nrecord"];
>     }
>     ef [label="Error report file"];
>     node [shape=rect];
>     up [label="Update\nprogram"];
>     subgraph cluster3 {
>         labelloc="b";
>         label="New master file";
>         color=white;
>         nf [label="New master\nrecord"];
>     }
>     {rank=same; up; ef;}
>     tf -> up;
>     of -> up;
>     up -> ef;
>     up -> nf;
> }
> ```

- **New master file**:

    The new permanent data file or, as it is commonly known, the new master file, contains the most current data.

- **Old master file**:

    The old master file is the permanent file that should be updated. Even after updating, the old master file is normally kept for reference.

- **Transaction file**:

    The third file is the transaction file. <mark>This contains the changes to be applied to the master file.</mark>

    There are three basic types of changes in all file updates.

    <ul>
        <li><em>(A) Add transactions</em> contain data about a new record to be added to the master file. </li>
        <li><em>(D) Delete transactions</em> identify records to be deleted from the file.</li>
        <li><em>(C) Change transactions</em> contain revisions to specific records in the file.</li>
    </ul>

    To process any of these transactions, we need a **key**. A key is one or more fields that uniquely identify the data in the file. For example, in a file of students, the key could be student ID. In an employee file, the key could be social security number.

- **Error report file**:

    The fourth file needed in an update program is an error report file. It is very rare that an update process does not produce at least one error. When an error occurs, we need to report it. The error report contains a listing of all errors discovered during the update process and is presented for corrective action. The next section describes some cases that can cause errors.

#### Processing file updates

To make the updating process efficient, all files are sorted on the same key.

The update process requires that we compare the keys on the transaction and master files and, assuming that there are no errors, follow one of three actions:

1. If the transaction file key is less than the master file key and the transaction is an add (A), add the transaction to the new master.
2. If the transaction file key is equal to the master file key, either:
    - Change the contents of the master file data if the transaction is a change (C).
    - Remove the data from the master file if the transaction is a deletion (D).
3. If the transaction file key is greater than the master file key, write the old master file record to the new master file.
4. Several cases may create an error and be reported in the error file:
    - If the transaction defines adding a record that already exists in the old master file (same key values).
    - If the transaction defines deleting or changing a record that does not exist in the old master file.

## Indexed files

To access a record in a f﻿ile randomly, we need to know the address of the record.

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=plaintext];
>     Key; Record;
>     node [shape=record];
>     index [label=" {Key | &#8942;} | {Address | &#8942;} ", xlabel="Index"];
>     f [label=" {Address | &#8942;} | {Records | &#8942;} ", xlabel="File"];
>     Key -> index;
>     index -> f [label="   Address"];
>     f -> Record;
> }
> ```

An **indexed file** is made of

- A **data file**, which is a sequential file.
- An **index**.

    The index itself is a very small file with only two fields:

    <ul>
        <li>The <em>key</em> of the sequential file.</li>
        <li>The <em>address</em> of the corresponding record on the disk.</li>
    </ul>

    The index is sorted based on the key values of the data files.

Accessing a record in the file requires these steps:

1. The entire index file is loaded into main memory (the file is small and uses little memory).
2. The index entries are searched, using an efficient search algorithm such as a binary search, to find the desired key.
3. The address of the record is retrieved.
4. Using the address, the data record is retrieved and passed to the user.

### Inverted files

One of the advantages of indexed files is that we can have <mark>more than one index</mark>, each with a different key.

For example, an employee file can be retrieved based on either social security number or last name. This type of indexed file is usually called an **inverted file**.

## Hashed Files

- In an indexed file, the index maps the key to the address.
- A **hashed file** uses a *mathematical function* to accomplish this mapping. The user gives the key, the function maps the key to the address and passes it to the operating system, and the record is retrieved.

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=plaintext];
>     Key; Record;
>     node [shape=rect];
>     m [label="Address = HashFunction (Key)", xlabel="Mapping", margin=0.2];
>     node [shape=record];
>     f [label=" {Address | &#8942;} | {Records | &#8942;} ", xlabel="File"];
>     Key -> m;
>     m -> f [label="   Address"];
>     f -> Record;
> }
> ```

<mark>The hashed file eliminates the need for an extra file (the index).</mark> In an indexed file, we must keep the index on file in the disk, and when we need to process the data file, we must first load the index into memory, search it to find the address of the data record, and then access the data file to access the record.

In a hashed file, finding the address is done through the use of a function, so there is no need for an index and all of the overhead associated with it.

However, we will see that hashed files have their own drawbacks.

### Hashing methods

#### Direct hashing

In **direct hashing**, the key is the data file address without any algorithmic manipulation. The file must therefore contain a record for every possible key.

It guarantees that there are no *synonyms* or *collisions*

```algorithm
\begin{algorithm}
\caption{Hash function}
\begin{algorithmic}
\State Address $\gets$ Key
\end{algorithmic}
\end{algorithm}
```

Although this is the ideal method, its application is very limited.

For example, if the identifier is nine digits, we need a huge file with 999 999 999 records, but we would use fewer than 100.

#### Modulo division hashing

Also known as **division remainder hashing**, the **modulo division** method divides the key by the file size and uses the remainder plus 1 for the address.

```algorithm
\begin{algorithm}
\caption{Hash function}
\begin{algorithmic}
\State Address $\gets \text{Key} \bmod \text{(list size)} + 1$
\end{algorithmic}
\end{algorithm}
```

Although this algorithm works with any list size, a list size that is a *prime number* produces fewer collisions than other list sizes.

#### Digit extraction hashing

Using **digit extraction hashing**, selected digits are extracted from the key and used as the address.

#### Other hashing methods

Other popular methods exist, such as

- Midsquare method
- Folding methods
- Rotational method
- Pseudorandom method

### Collision

Generally, the population of keys for a hashed list is greater than the number of records in the data file.

There is a possibility that more than one key will hash to the same address in the file. We call the set of keys that hash to the same address in our list **synonyms**.

> [!example]
$$
\begin{cases}
123013 \bmod 307 + 1 = 214 \\
151564 \bmod 307 + 1 = 214 \\
\end{cases}
$$

A **collision** is the event that occurs when a hashing algorithm produces an address for an insertion key but that address is already occupied.

The address produced by the hashing algorithm is known as the **home address**. The part of the file that contains all the home addresses is known as the **prime area**.

When two keys collide at a home address, we must resolve the collision by placing one of the keys and its data in another location, outside the prime area.

#### Collision resolution

##### Open addressing

The first collision resolution method, **open addressing resolution**, resolves collisions in the prime area. When a collision occurs, the prime area addresses are searched for an open or unoccupied record where the new data can be placed.

One simple strategy for data that cannot be stored in the home address is to store it in the next address (home address + 1).

##### Linked list resolution

A major disadvantage of open addressing is that each collision resolution increases the probability of future collisions. This disadvantage is eliminated in another approach to collision resolution, **linked list resolution**. In this method, the first record is stored in the home address, but contains a pointer to the second record.

##### Bucket hashing

Another approach to handling the problem of collisions is to hash to **buckets**. A bucket is a node that can accommodate more than one record. The disadvantage of this method is that there may be a lot of wasted (unoccupied) locations.

## Directories

- Directories in the UNIX operating system
    - Special directories
        - Root directory
        - Home directory
        - Working directory
        - Parent directory
    - Paths and pathnames
        - Absolute pathname
        - Relative pathname

## Text vs. binary

- **Text files**

    A text file is a file of *characters*. It cannot contain integers, floating-point numbers, or any other data structures in their internal memory format. To store these data types, they must be converted to their character equivalent formats.

- **Binary files**

    A binary file is a collection of data stored in the internal format of the computer. In this definition, data can be an integer (including other data types represented as unsigned integers, such as image, audio, or video), a floating-point number, or any other structured data (except a file).

    Unlike text files, binary files contain data that is meaningful only if it is properly interpreted by a program.
