# 【5-9】Pointers vs. Multi-dimensional Arrays

Newcomers to C are sometimes confused about the difference between a two-dimensional array and an array of pointers, such as `name` in the example above. Given the definitions

```c
int a[10][20];
int *b[10];
```

then `a[3][4]` and `b[3][4]` are both syntactically legal references to a single `int`.

- But `a` is a true two-dimensional array: 200 `int`-sized locations have been set aside, and the conventional rectangular subscript calculation $20 * row + col$ is used to find the element `a[row, col]`.
- For `b`, however, the definition only allocates 10 pointers and does not initialize them; initialization must be done explicitly, either statically or with code. Assuming that each element of `b` does point to a twenty-element array, then there will be 200 `int`s set aside, plus ten cells for the pointers. <mark>The important advantage of the pointer array is that the rows of the array may be of different lengths.</mark> That is, each element of `b` need not point to a twenty-element vector; some may point to two elements, some to fifty, and some to none at all.

Although we have phrased this discussion in terms of integers, by far the most frequent use of arrays of pointers is to store character strings of diverse lengths, as in the function `month_name`. Compare the declaration and picture for an array of pointers:

```c
char *name[] = { "Illegal month", "Jan", "Feb", "Mar" };
```

> [!figure]
>
> ```graphviz
> digraph {
>     rankdir=LR;
>     node [shape=record, margin="0.2"];
>     pa [label="<0> &#9679; | <1> &#9679; | <2> &#9679; | <3> &#9679;", fontsize=8];
> 
>     node [shape=rect, margin="0.2, 0.1"];
>     s1 [label="Illegal month\\0"];
>     s2 [label="Jan\\0"];
>     s3 [label="Feb\\0"];
>     s4 [label="Mar\\0"];
> 
>     node [shape=plaintext];
>     "name:";
> 
>     { rank=same; s1; s2; s3; s4; }
>     { rank=same; pa; "name:"; }
> 
>     edge [headclip=false, tailclip=false]
>     pa:0:c -> s1:w;
>     pa:1:c -> s2:w;
>     pa:2:c -> s3:w;
>     pa:3:c -> s4:w;
> 
>     edge [style=invis];
>     s1 -> s2 -> s3 -> s4;
> }
> ```

with those for a two-dimensional array:

```c
char aname[][15] = { "Illegal month", "Jan", "Feb", "Mar" };
```

> [!figure]
>
> ```graphviz
> digraph {
>     node [shape=record, width=4, fixedsize=true];
>     a [label="<0> Illegal month\\0 | <1> Jan\\0 | <2> Feb\\0 | <3> Mar\\0 "];
>     m [label="<0> 0 | <15> 15 | <30> 30 | <45> 45", color=white];
> 
>     a -> m [style=invis];
>     m:0:c -> a:0:sw;
>     m:15:c -> a:1:sw;
>     m:30:c -> a:2:sw;
>     m:45:c -> a:3:sw;
> }
> ```
