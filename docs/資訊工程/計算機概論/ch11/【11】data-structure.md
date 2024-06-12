# 【11】Data Structure

## Arrays

An **array** is a sequenced collection of elements, of the same data type.

The **index** indicates the ordinal number of the element, counting from the beginning of the array. The elements of the array are individually addressed through their subscripts.

### Memory layout

The indexes in a one-dimensional array directly define the relative positions of the element in actual memory.

A two-dimensional array, however, represents rows and columns. How each element is stored in memory depends on the computer.

- Most computers use **row-major storage**, in which an entire row of an array is stored in memory before the next row.
- However, a computer may store the array using **column-major storage**, in which the entire column is stored before the next column.

> [!example]
> We have stored the two-dimensional array `s` in the memory. The array is $100 \times 4$ (100 rows and 4 columns). Show the address of the element `s[5][3]` assuming that the element `s[1][1]` is stored in the memory location with address 1000 and each element occupies only one memory location. The computer uses *row-major storage*.
$$
\begin{align}
\text{address}_{s[5][3]} & = \text{address}_{s[1][1]} +
\Big[4 \ ^\text{elements}/_\text{row} \times (5 - 1) \text{rows} + (3 - 1) \text{elements}\Big] \times 1 \ ^\text{memory location}/_\text{element} \\
& = 1000 + \Big[ 4 \times 4 + 2 \Big] \times 1 \\
& = 1018
\end{align}
$$

## Records

A **record** is a collection of related elements, possibly of different types, having a single name.

Each element in a record is called a **field**. A field is the smallest element of named data that has meaning. A field has a type, and exists in memory. Fields can be assigned values, which in turn can be accessed for selection or manipulation. A field differs from a variable primarily in that it is part of a record.

The following shows an array of records in c.

<!-- tabs:start -->

<!-- tab:main.c -->

```c
#include <stdio.h>

struct student {
    unsigned int id;
    char name[20];
    char grade;
};

int main()
{
    struct student classA[] = {
        {.id = 1001, .name = "J. Aron", .grade = 'A'},
        {.id = 1002, .name = "F. Bus", .grade = 'F'}
    };
    
    int i;
    for (i = 0; i < (sizeof classA / sizeof(classA[0])); i++) {
        printf("%6s %d\n"
                "%6s %s\n"
                "%6s %c\n"
                "---------------\n",
                "id:", classA[i].id,
                "name:", classA[i].name,
                "grade:", classA[i].grade);
    }
    
    return 0;
}
```

<!-- tab:print -->

```text
   id: 1001
 name: J. Aron
grade: A
---------------
   id: 1002
 name: F. Bus
grade: F
---------------
```

<!-- tabs:end -->

## Linked Lists

> [!example]
> 【台聯大】【109】【計算機概論】【17】

A **linked list** is a collection of data in which each element contains the location of the next element—that is, each element contains two parts:

- The **data** part holds the value information: the data to be processed.
- The **link** is used to chain the data together, and contains a **pointer** (an address) that identifies the next element in the list.

```c
struct node {
    int data;
    struct node *next;
};
```

In addition, a pointer variable identifies the first element in the list. The name of the list is the same as the name of this pointer variable.

The link in the last element contains a **null pointer**, indicating the end of the list.

### Arrays vs. linked lists

- The elements of an **array** are stored one after another *in the memory without a gap* in between: the list is contiguous.
- The nodes of a **linked list** can be stored *in the memory with gaps* between them: the link part of the node "glues" the items together.

    In other words, the computer has the option to store them contiguously or spread the nodes through the whole memory.

    This has an advantage: insertion and deletion in a linked list is much easier. The only thing that needs to be changed is the pointer to the address of the next element. However, this comes with an overhead: each node of a linked list has an extra field, the address of the next node in memory.

### Operations on linked lists

#### Searching a linked list

The search algorithm for a linked list can only be *sequential* because the nodes in a linked list have no specific names (unlike the elements in an array) that can be found using a binary search.

However, since nodes in a linked list have no names, we use two pointers, `pre` (for previous) and `cur` (for current). <mark>At the beginning of the search, the `pre` pointer is null and the `cur` pointer points to the first node.</mark> The search algorithm moves the two pointers together towards the end of the list.

> [!example]
> 【台聯大】【106】【計算機概論】【22】
>
> ---
>
> $Q:$
>
> Choose the following items that are correct regarding Data Structure?
>
> ---
>
> $Ans:$
>
> **(A)** In two-dimensional arrays, the data is organized linearly in one direction.
>
> (B) A ~record~ is a collection of data in which each element contains the location of the next element.  
> $\quad$ `linked list.`
>
> **(C)** In linked list, the last element contains a null pointer, indicating the end of the list.
>
> (D) There are two pointers `pre` (for previous) and `cur` (current) in linked list. At the beginning of the search, ~both~ the `pre` pointier and the `cur` pointer point to the first node.  
> $\quad$ `pre is null at the beginning of the search.`
>
> **(E)** Before deleting a node in a linked list, we apply the search algorithm. Deletion is simpler than insertion: only two cases, deleting the first node and deleting any other node.
