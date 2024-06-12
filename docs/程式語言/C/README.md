# C 語言學習資源

## 參考書籍

- 《The C Programming Language, 2nd Edition》by Brian W. Kernighan, Dennis M. Ritchie. (1988).

> Preface: This Second Edition of The C Programming Language describes C as defined by the ANSI standard.  

?> ANSI C ( also known as C89 )

## 網路資源

- [C reference][]
- [C 語言入門][] by 李根逸博士 (Dr. Ken-Yi Feis Lee)
- [「你所不知道的 C 語言」系列講座][] by jserv

[C 語言入門]: https://feis.studio/#/c
[C reference]: https://en.cppreference.com/w/c
[「你所不知道的 C 語言」系列講座]: https://hackmd.io/@sysprog/c-prog/%2F%40sysprog%2Fc-programming

### 規格書

[HTML versions of the C and C++ standards](https://port70.net/%7Ensz/c/)

?> 語言規格:  
   K&R C → C89/C90 → C99 → C11 → C17/C18 → C2x

ISO 的出版書是需要付費購買的。但同時也有提供免費的草案，可以從 [ISO/IEC 9899 - Revision of the C standard][] 底下找到。

| Revision | ISO publication   | Similar draft                            |
| -------- | ----------------- | ---------------------------------------- |
| C17      | ISO/IEC 9899:2018 | [N2310][] [2018-11-11] (early C2x draft) |
| C11      | ISO/IEC 9899:2011 | [N1570][] [2011-04-12]                   |
| C99      | ISO/IEC 9899:1999 | [N1256][] [2007-09-07]                   |

[ISO/IEC 9899 - Revision of the C standard]: https://www.open-std.org/jtc1/sc22/wg14/www/projects#9899
[N2310]: https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2310.pdf
[N1570]: https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
[N1256]: https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf

## 環境設置

?> 詳細說明請查看官方教學 [Using GCC with MinGW][]。

- 安裝編輯器 [VS Code][]
- 延伸模組 [C/C++][]
- 通過 [MSYS2][] 平台來取得 MinGW-w64。
    - 安裝 [MSYS2][]
    - 執行 MSYS2 UCRT64
    - 輸入指令來安裝 [MinGW-w64][] ( created to support the GCC compiler on Windows systems. )

        ```bash
        pacman -S mingw-w64-ucrt-x86_64-gcc
        ```

    - 確認版本

        ```bash
        # C Compiler
        gcc --version

        # C++ Compiler
        g++ --version

        # GDB ( GNU Debugger )
        gdb --version
        ```

[Using GCC with MinGW]: https://code.visualstudio.com/docs/cpp/config-mingw
[VS Code]: https://code.visualstudio.com/
[C/C++]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
[MSYS2]: https://www.msys2.org/
[MinGW-w64]: https://www.mingw-w64.org/

### 其他 VS Code 模組

- [C/C++ Extension Pack][] ( CMake, CMake Tools )

[C/C++ Extension Pack]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack

## 設定檔

走完官方教學流程一遍後，在專案資料夾中會發現 .vscode 資料夾中，存放著下列三個設定檔。

- `c_cpp_properties.json` ( compiler path and IntelliSense settings )
- `tasks.json` ( build instructions )
- `launch.json` ( debugger settings )

### Configurations

?> 詳細說明請查看官方教學 [C/C++ configurations][]。

在 VS Code 中使用 `Ctrl+Shift+P` 叫出命令面板後，搜尋：

- **C/C++: Edit Configurations (UI)** 或
- **C/C++: Edit Configurations (JSON)**

執行後便會產生 `.vscode\c_cpp_properties.json` 檔案。主要設定 Compiler 路徑以及 IntelliSense 要使用哪個版本的 C。

[C/C++ configurations]: https://code.visualstudio.com/docs/cpp/config-msvc#_cc-configurations

### Build instructions

?> 詳細說明請查看官方教學 [Run helloworld.cpp][]，範例雖然是 c++，但不影響使用方式。

- 打開任一 .c 檔案，例如 `main.c`
- 點擊右上角工具列的 &#9655; 按鈕旁的下拉選單
- 選擇 `執行 C/C++ 檔案`
- 於命令列中，選擇 `C/C++: gcc.exe 建置及偵錯使用中的檔案`
- 在首次選擇完 Compiler 後，系統就會建立 `.vscode\tasks.json`，並將剛剛選擇的 Compiler 設定為預設值。關於 `tasks.json` 的變數說明可以查看 [Variables Reference][]

[Run helloworld.cpp]: https://code.visualstudio.com/docs/cpp/config-msvc#_run-helloworldcpp
[Variables Reference]: https://code.visualstudio.com/docs/editor/variables-reference

### Debugger settings

?> 詳細說明請查看官方教學 [Debug helloworld.cpp][]，範例雖然是 c++，但不影響使用方式。

[Debug helloworld.cpp]: https://code.visualstudio.com/docs/cpp/config-msvc#_debug-helloworldcpp

- 打開任一 .c 檔案，例如 `main.c`
- 點擊右上角工具列的 &#9655; 按鈕旁的齒輪圖示 ( &#9881; )
- 於命令列中，選擇 `C/C++: gcc.exe 建置及偵錯使用中的檔案`
- 接著系統就會建立 `.vscode\launch.json`。關於 `launch.json` 的變數說明可以查看 [Variables Reference][]
- 關於 debugger 的教學可以查看 [Explore the debugger][]

[Explore the debugger]: https://code.visualstudio.com/docs/cpp/config-msvc#_explore-the-debugger

## 使用過往版本的編譯器

The C Programming Language, 2nd Edition 可以說是作者為了 ANSI C ( C89 ) 提供的 guide。因此，在學習該書時，也希望能用 C89 來編譯程式。記得要在 `c_cpp_properties.json` 中設定成 `"cStandard": "c89",` ，這樣在編輯程式碼時，IntelliSense 才會以 C89 的標準來告知有無產生問題。

首先，查看 `gcc` 指令說明：

```bash
gcc --help
```

接著會列出一串關於 `gcc` 指令選項的說明，其中找到兩個需要的選項，分別設定 C 的標準版本與輸出檔案：

```text
-std=<standard>          Assume that the input sources are for <standard>.
-o <file>                Place the output into <file>.
```

`-std=<standard>` 的完整說明可以參考 [std][]。

[std]: https://gcc.gnu.org/onlinedocs/gcc/C-Dialect-Options.html#index-std-1

當我們寫了個 `main.c` ：

```c
// main.c

#include <stdio.h>

int main() {
    for (size_t i = 0; i < 3; i++) {
        printf("hello, world\n");
    }

    return 0;
}

```

使用 C89 來編譯，並設定輸出檔名為 `main` ：

```bash
gcc -std=c89 -o main main.c
```

結果發生 compile error：

```text
.\main.c:1:1: error: C++ style comments are not allowed in ISO C90
    1 | // main.c
      | ^
.\main.c:1:1: note: (this will be reported only once per input file)
.\main.c: In function 'main':
.\main.c:6:5: error: 'for' loop initial declarations are only allowed in C99 or C11 mode
    6 |     for (size_t i = 0; i < 3; i++) {
      |     ^~~
.\main.c:6:5: note: use option '-std=c99', '-std=gnu99', '-std=c11' or '-std=gnu11' to compile your code
```

很清楚地得知：

- `//` 註解在 C89/C90 是不支援的
- for 迴圈的初始宣告是 C99 才開始支援的

因此，動手修改 `main.c`：

```c
/* main.c */

#include <stdio.h>

int main() {
    size_t i;
    
    for (i = 0; i < 3; i++) {
        printf("hello, world\n");
    }

    return 0;
}
```

編譯並執行：

```bash
gcc -std=c89 -o main main.c
.\main.exe
```

執行程式後得到：

```text
hello, world
hello, world
hello, world
```

前面提到過 `tasks.json` 是設定 build instructions，因此可以直接把 `-std=c89` 加入設定中：

```json
// tasks.json

"args": [
    "-std=c89",
    "-fdiagnostics-color=always",
    "-g",
    "${file}",
    "-o",
    "${fileDirname}\\${fileBasenameNoExtension}.exe"
],
```

## 進階應用課程

- jserv 的 [Linux 核心設計/實作][]

[Linux 核心設計/實作]: https://wiki.csie.ncku.edu.tw/linux/schedule
