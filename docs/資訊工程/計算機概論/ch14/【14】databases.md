<style>
article.markdown-section .alert {
    text-align: center;
}

article.markdown-section .alert table {
    display: inline-table;
}

article.markdown-section .alert pre {
    text-align: left;
}

article.markdown-section .alert div.label {
    display: inline-block;
    margin: 0 0.5rem;
}
</style>

# 【14】Databases

## Database architecture

- **Internal level**

    The internal level determines where data is actually stored on the storage devices. This level deals with low-level access methods and how bytes are transferred to and from storage devices.

- **Conceptual level**

    The conceptual level defines the logical view of the data.

- **External level**

    The external level interacts directly with the user (end users or application programs). It changes the data coming from the conceptual level to a format and view that is familiar to the users.

## Database Models

- Hierarchical database model (obsolete)
- Network database model (obsolete)
- Relational database model

    In the **relational model**, data is organized in two-dimensional tables called relations.

    > [!figure]
    >
    > ```graphviz
    > digraph {
    >     node [shape=record];
    >     d [xlabel="DEPARTMENT", label=" { No | <1> &#8942; } | { Name | &#8942; } "];
    >     p [xlabel="PROFESSORS", label=" { ID | &#8942; } | { Name | &#8942; } | { <3> Dept-No | &#8942; } | { Courses | <4> &#8942; } "];
    >     c [xlabel="COURSES", label=" { <1> No | <21> &#8942; } | { Dept-No | &#8942; } | { Prof-ID | &#8942; } | { Unit | &#8942; } "];
    >     s [xlabel="STUDENTS", label=" { ID | &#8942; } | { Name | &#8942; } | { <3> Courses | &#8942; } "];
    >     edge [style=dashed, dir=none];
    >     d:1 -> p:3;
    >     p:4:s -> c:1:n;
    >     c:21:s -> s:3:n;
    > }
    > ```

## Relational Database Model

In the **relational database management system** (**RDBMS**), the data is represented as a set of relations.

### Relation

A **relation**, in appearance, is a two-dimensional table.

The RDBMS organizes the data so that its external view is a set of relations or tables. This does not mean that data are stored as tables: the physical storage of the data is independent of the way in which the data is logically organized.

> [!figure]
>
> ```graphviz
> digraph{
>     node [shape=record];
>     c [xlabel="COURSES", label=" { <a1> No | CIS15 | CIS17 | CIS19 | CIS51 } | { <a2> Coursse--Name | Intro to C | Intro to Java | UNIX | Networking } | { <a3> Unit | <t1> 5 | <t2> 5 | <t3> 4 | <t4> 5 } "];
>     node [shape=plaintext];
>     a [label="Attributes"];
>     t [label="Tuples"];
>     e [label=""];
>     a -> c:a1;
>     a -> c:a2;
>     a -> c:a3;
>     t:e -> c:t1:e;
>     t:e -> c:t2:e;
>     t:e -> c:t3:e;
>     c:t4:e -> t:e [dir=back];
> }
> ```

A relation in an RDBMS has the following features:

- **Name**

    Each relation in a relational database should have a name that is unique among other relations.

- **Attributes**

    Each column in a relation is called an attribute.

    The attributes are the column headings in the table in Figure. Each attribute gives meaning to the data stored under it. Each column in the table must have a name that is unique in the scope of the relation.

    The total number of attributes for a relation is called the *degree* of the relation. For example, in Figure, the relation has a degree of 3.

    Note that the attribute names are not stored in the database: the conceptual level uses the attributes to give meaning to each column.

- **Tuples**

    Each row in a relation is called a tuple. A tuple defines a collection of attribute values.

    The total number of rows in a relation is called the *cardinality* of the relation. Note that the cardinality of a relation changes when tuples are added or deleted. This makes the database dynamic.

## Structured Query Language

Structured Query Language (**SQL**) is the language for use on relational databases.

It is a declarative rather than procedural language, which means that users declare what they want without having to write a step-by-step procedure.

### Insert

The **insert operation** is a *unary operation*—that is, it is applied to a single relation. The operation inserts a new tuple into the relation. The insert operation uses the following format:

```sql
insert into RELATION-NAME values (..., ..., ...)
```

> [!example]
>
> ```sql
> insert into COURSES values ("CIS52", "TCP/IP" , 6)
> ```
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS19 | UNIX          |  4   |
> | CIS51 | Networking    |  5   |
>
> <div class="label">$\rightarrow$</div>
>
> <div class="label">COURSES</div>
>
> | No      | Coursse-Name  | Unit |
> | ------- | ------------- | ---- |
> | CIS15   | Intro to C    |  5   |
> | CIS17   | Intro to Java |  5   |
> | CIS19   | UNIX          |  4   |
> | CIS51   | Networking    |  5   |
> | *CIS52* | *TCP/IP*      | *6*  |

### Delete

The **delete operation** is also a *unary operation*. The operation deletes a tuple defined by a criterion from the relation. The delete operation uses the following format:

```sql
delete from RELATION-NAME where criteria
```

> [!example]
>
> ```sql
> delete from COURSES where No = "CIS19"
> ```
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS19 | UNIX          |  4   |
> | CIS51 | Networking    |  5   |
> | CIS52 | TCP/IP        |  6   |
>
> <div class="label">$\rightarrow$</div>
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS51 | Networking    |  5   |
> | CIS52 | TCP/IP        |  6   |

### Update

The **update operation** is also a *unary operation* that is applied to a single relation. The operation changes the value of some attributes of a tuple. The update operation uses the following format:

```sql
update RELATION-NAME
set attribute1 = value1, attribute2 = value2, ...
where criteria
```

> [!example]
>
> ```sql
> update COURSES
> set Unit = 6
> where No = "CIS51"
> ```
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS19 | UNIX          |  4   |
> | CIS51 | Networking    |  5   |
> | CIS52 | TCP/IP        |  6   |
>
> <div class="label">$\rightarrow$</div>
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS19 | UNIX          |  4   |
> | CIS51 | Networking    | *6*  |
> | CIS52 | TCP/IP        |  6   |

### Select

The **select operation** is a *unary operation*—that is, is applied to a single relation—and <mark>creates another relation.</mark> The tuples (rows) in the resulting relation are a subset of the tuples in the original relation. The select operation uses some criteria to select some of the tuples from the original relation. The select operation uses the following format:

```sql
select *
from RELATION-NAME
where criteria
```

The asterisk (`*`) signifies that all attributes are chosen.

> [!example]
>
> ```sql
> select *
> from COURSES
> where Unit = 5
> ```
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS19 | UNIX          |  4   |
> | CIS51 | Networking    |  5   |
> | CIS52 | TCP/IP        |  6   |
>
> <div class="label">$\rightarrow$</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS51 | Networking    |  5   |

### Project

The **project operation** is also a *unary operation*, and <mark>creates another relation.</mark> The attributes (columns) in the resulting relation are a subset of the attributes in the original relation. The project operation creates a relation in which each tuple has fewer attributes. The number of tuples (rows) in this operation remains the same. The project operation uses the following format:

```sql
select attribute-list
from RELATION-NAME
```

> [!example]
>
> ```sql
> select No, Unit
> from COURSES
> ```
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS19 | UNIX          |  4   |
> | CIS51 | Networking    |  5   |
> | CIS52 | TCP/IP        |  6   |
>
> <div class="label">$\rightarrow$</div>
>
> | No    | Unit |
> | ----- | ---- |
> | CIS15 |  5   |
> | CIS17 |  5   |
> | CIS19 |  4   |
> | CIS51 |  5   |
> | CIS52 |  6   |

### Join

The **join operation** is a *binary operation*—it takes two relations and combines them based
on common attributes. The join operation uses the following format:

```sql
select attribute-list
from RELATION1, RELATION2
where criteria
```

> [!example]
>
> ```sql
> select No, Course-name, Unit, Professor
> from COURSES, TAUGHT-BY
> where COURSE.No = TAUGHT-BY.No;
> ```
>
> <div class="label">COURSES</div>
>
> | No    | Coursse-Name  | Unit |
> | ----- | ------------- | ---- |
> | CIS15 | Intro to C    |  5   |
> | CIS17 | Intro to Java |  5   |
> | CIS19 | UNIX          |  4   |
> | CIS51 | Networking    |  5   |
> | CIS52 | TCP/IP        |  6   |
>
> <div class="label">TAUGHT-BY</div>
>
> | No    | Professor |
> | ----- | --------- |
> | CIS15 | Lee       |
> | CIS17 | Lu        |
> | CIS19 | Walter    |
> | CIS51 | Lu        |
> | CIS52 | Lee       |
>
> $\downarrow$
>
> | No    | Coursse-Name  | Unit | Professor |
> | ----- | ------------- | ---- | --------- |
> | CIS15 | Intro to C    |  5   | Lee       |
> | CIS17 | Intro to Java |  5   | Lu        |
> | CIS19 | UNIX          |  4   | Walter    |
> | CIS51 | Networking    |  5   | Lu        |
> | CIS52 | TCP/IP        |  6   | Lee       |

---

> [!example]
> <p style="text-align: left;">台聯大-108-計算機概論-7：</p>
>
> <p style="text-align: left;">$Q:$</p>
>
> <p style="text-align: left;">Given the two relations X and Y below</p>
>
> <div class="label">X</div>
>
> | A   | B   |
> | --- | --- |
> | 7   | s   |
> | 2   | z   |
>
> <div class="label">Y</div>
>
> | C   | D   |
> | --- | --- |
> | t   | 3   |
> | r   | 2   |
>
> <p style="text-align: left;">what value would be retrieved by executing the following SQL statement?</p>
>
> ```sql
> select Y.C 
> from X, Y 
> where X.A < Y.D 
> ```
>
> <p style="text-align: left;">$Ans:$</p>
>
> <p style="text-align: left;">t.</p>

### Union

The **union operation** is also a *binary operation*, taking two relations and <mark>creating a new relation.</mark> However, there is a restriction on the two relations: they must have the same attributes. The union operation, as defined in set theory, creates a new relation in which each tuple is either in the first relation, in the second, or in both. The union operation uses the following format:

```sql
select *
from RELATION1
union
select *
from RELATION2
```

> [!example]
>
> ```sql
> select *
> from CIS15-Roster
> union
> select *
> from CIS52-Roster
> ```
>
> <div class="label">CIS15-Roster</div>
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |
> | 345-89-6580 | Anne   | Green  |
> | 459-98-6789 | Ted    | Purple |
>
> <div class="label">CIS52-Roster</div>
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |
> | 342-88-9999 | Rich   | White  |
>
> $\downarrow$
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |
> | 342-88-9999 | Rich   | White  |
> | 345-89-6580 | Anne   | Green  |
> | 459-98-6789 | Ted    | Purple |

### Intersection

The **intersection operation** is also a *binary operation*, taking two relations and <mark>creating a new relation.</mark> Like the union operation, the two relations must have the same attributes. The intersection operation, as defined in set theory, creates a new relation in which each tuple is a member in both relations. The intersection operation uses the following format:

```sql
select *
from RELATION1
intersection
select *
from RELATION2
```

> [!example]
>
> ```sql
> select *
> from CIS15-Roster
> intersection
> select *
> from CIS52-Roster
> ```
>
> <div class="label">CIS15-Roster</div>
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |
> | 345-89-6580 | Anne   | Green  |
> | 459-98-6789 | Ted    | Purple |
>
> <div class="label">CIS52-Roster</div>
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |
> | 342-88-9999 | Rich   | White  |
>
> $\downarrow$
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |

### Difference

The **difference operation** is also a *binary operation*, taking two relations and <mark>creating a new relation.</mark> Like the union operation, the two relations must have the same attributes. The tuples in the resulting relation are those that are in the first relation but not the second. The difference operation uses the following format:

```sql
select *
from RELATION1
minus
select *
from RELATION2
```

> [!example]
>
> ```sql
> select *
> from CIS15-Roster
> minus
> select *
> from CIS52-Roster
> ```
>
> <div class="label">CIS15-Roster</div>
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |
> | 345-89-6580 | Anne   | Green  |
> | 459-98-6789 | Ted    | Purple |
>
> <div class="label">CIS52-Roster</div>
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 145-67-6754 | John   | Brown  |
> | 232-56-5690 | George | Yellow |
> | 342-88-9999 | Rich   | White  |
>
> $\downarrow$
>
> | Student-ID  | F-Name | L-Name |
> | ----------- | ------ | ------ |
> | 345-89-6580 | Anne   | Green  |
> | 459-98-6789 | Ted    | Purple |

### Combination of statements

The SQL language allows us to combine the forgoing statements to extract more complex information from a database.

## Database Design

### Entity–relation model (ERM)

The database designer creates an **entity–relationship (E-R) diagram** to show the entities for which information needs to be stored and the relationship between those entities.

> [!figure]
>
> ```mermaid
> erDiagram
>     COURSE {
>         string No
>         string Name
>         int Unit
>     }
>     STUDENT {
>         string S-ID
>         string Name
>         string Address
>     }
>     PROFESSOR {
>         string P-ID
>         string Name
>         string Address
>     }
>     STUDENT ||--o{ COURSE : takes
>     PROFESSOR ||--o{ COURSE : teaches
> ```

### From E-R diagrams to relations

- Relations for entity sets
- Relations for relationship sets
- Normalization

### Other Database Models

- Distributed databases
- Object-oriented databases

## Maintaining database integrity

A major role of the **database management system (DBMS)** is to maintain the database's integrity by guarding against problems such as operations that for some reason are only partially completed or different operations that might interact inadvertently to cause inaccurate information in the database.

> [!example]
> <p style="text-align: left;">台聯大-108-計算機概論-8</p>
>
> <p style="text-align: left;">$Q:$</p>
>
> <p style="text-align: left;">Which of the following features within a DBMS is <em>not</em> provided to maintain database integrity?</p>
>
> <p style="text-align: left;">
> <strong>(A)</strong> Concurrent transaction processing.
> </p>
>
> <p style="text-align: left;">
> (B) Log.
> </p>
>
> <p style="text-align: left;">
> (C) Locking protocol.
> </p>
>
> <p style="text-align: left;">
> (D) Commit point.
> </p>

### The Commit/Rollback Protocol

The point at which all the steps in a transaction have been recorded in the *log* is called the **commit point**.

If problems should arise before a transaction has reached its commit point, the DBMS might find itself with a partially executed transaction that cannot be completed. In this case, the log can be used to **roll back (undo)** the activities actually performed by the transaction.

### Locking

Most large database management systems contain a scheduler to coordinate time-sharing among transactions.

To guard against such anomalies as the incorrect summary problem and the lost update problem, these schedulers incorporate a **locking protocol** in which the items within a database that are currently being used by some transaction are marked as such.

These marks are called locks; marked items are said to be locked. Two types of locks are common

- **Shared locks** correspond to shared access

    If a transaction is not going to alter a data item, then it requires shared access, meaning that other transactions are also allowed to view the data.

- **Exclusive locks** correspond to exclusive access

    However, if the transaction is going to alter the item, it must have exclusive access, meaning that it must be the only transaction with access to that data.
