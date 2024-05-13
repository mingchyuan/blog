# 【9-1】Evolution

## Machine languages

In the earliest days of computers, the only programming languages available were **machine languages**. Each computer had its own machine language, which was made of streams of 0s and 1s.

?> The only language understood by a computer is machine language.

Although a program written in machine language truly represents how data is manipulated by the computer, it has at least two drawbacks.

- First, it is machine-dependent. The machine language of one computer is different than the machine language of another computer if they use different hardware.
- Second, it is very tedious to write programs in this language and very difficult to find errors.

## Assembly languages

The next evolution in programming came with the idea of

- Replacing binary code for instruction
- Addresses with symbols or mnemonics.

Because they used symbols, these languages were first known as **symbolic languages**. The set of these mnemonic languages were later referred to as **assembly languages**.

## High-level languages

Although assembly languages greatly improved programming efficiency, they still required programmers to concentrate on the hardware they were using. Working with symbolic languages was also very tedious, because each machine instruction had to be individually coded.

The desire to improve programmer efficiency and to change the focus from the computer to the problem being solved led to the development of **high-level languages**.

High-level languages are portable to many different computers, allowing the programmer to concentrate on the application rather than the intricacies of the computer's organization. They are designed to relieve the programmer from the details of assembly language.

High-level languages share one characteristic with symbolic languages: they must be converted to machine language. This process is called

- **Interpretation**
- **Compilation**
