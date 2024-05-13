# 【4-2】Shift Operations

## Logical shift operations

A **logical shift operation** is applied to a pattern that does *not* represent a *signed* number.

### Simple shift

> [!figure]
>
> ```graphviz
> digraph {
>     label="Simple right shift";
>     node [shape=plaintext];
>     0 [label="0 &emsp;&emsp;"];
>     l [label="Lost"];
>     node [shape=rect];
>     r1 [label=""];
>     r2 [label=""];
>     r3 [label=""];
>     edge [tailclip=false];
>     0 -> r1:c;
>     r1:c -> r2:c;
>     r2:c -> r3:c;
>     r3:c -> l;
>     {rank=same; 0; r1; r2; r3; l;}
> }
> ```
>
> ```graphviz
> digraph {
>     label="Simple left shift";
>     node [shape=plaintext];
>     l [label="Lost"];
>     0 [label="&emsp;&emsp; 0"];
>     node [shape=rect];
>     r1 [label=""];
>     r2 [label=""];
>     r3 [label=""];
>     edge [headclip=false];
>     l -> r1:c [dir=back];
>     r1:c -> r2:c [dir=back];
>     r2:c -> r3:c [dir=back];
>     r3:c -> 0 [dir=back];
>     {rank=same; 0; r1; r2; r3; l;}
> }
> ```

### Circular shift

> [!figure]
>
> ```graphviz
> digraph {
>     label="Circular right shift";
>     splines = ortho;
>     node [shape=rect];
>     r1 [label=""];
>     r2 [label=""];
>     r3 [label=""];
>     edge [tailclip=false];
>     r1:c -> r2:c;
>     r2:c -> r3:c;
>     r3:c -> r1:c;
>     {rank=same; r1; r2; r3;}
> }
> ```
>
> ```graphviz
> digraph {
>     label="Circular left shift";
>     splines = ortho;
>     node [shape=rect];
>     r1 [label=""];
>     r2 [label=""];
>     r3 [label=""];
>     edge [headclip=false];
>     r1:c -> r2:c [dir=back];
>     r2:c -> r3:c [dir=back];
>     r3:c -> r1:c [dir=back];
>     {rank=same; r1; r2; r3;}
> }
> ```

## Arithmetic shift operations

**Arithmetic shift operations** assume that the bit pattern is a signed integer in *two's complement format*.

<mark>Arithmetic right shift is used to divide an integer by two, while arithmetic left shift is used to multiply an integer by two.</mark> These operations should not change the sign (leftmost) bit. An arithmetic right shift retains the sign bit, but also copies it into the next right bit, so that the sign is preserved. An arithmetic left shift discards the sign bit and accepts the bit to the left of the sign bit as the sign. If the new sign bit is the same as the previous one, the operation is successful, otherwise an *overflow* or *underflow* has occurred and the result is not valid.

> [!figure]
>
> ```graphviz
> digraph {
>     label="Arithmetic right shift";
>     node [shape=plaintext];
>     l [label="Lost"];
>     node [shape=rect];
>     r1 [label=""];
>     r2 [label=""];
>     r3 [label=""];
>     r1:_ -> r1:w;
>     edge [tailclip=false];
>     r1:c -> r2:c;
>     r2:c -> r3:c;
>     r3:c -> l;
>     {rank=same; r1; r2; r3; l;}
> }
> ```
>
> ```graphviz
> digraph {
>     label="Arithmetic left shift";
>     node [shape=plaintext];
>     l [label="Lost"];
>     0 [label="&emsp; 0"];
>     node [shape=rect];
>     r1 [label=""];
>     r2 [label=""];
>     r3 [label=""];
>     edge [headclip=false];
>     l -> r1:c [dir=back];
>     r1:c -> r2:c [dir=back];
>     r2:c -> r3:c [dir=back];
>     r3:c -> 0 [dir=back];
>     {rank=same; l; r1; r2; r3; 0;}
> }
> ```
