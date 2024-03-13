# VS Code

?> 詳細說明請查看[官方文件][]。

[Visual Studio Code][] 是一個輕量化的原始碼編輯器，且提供各式各樣強大的擴充模組。

[Visual Studio Code]: https://code.visualstudio.com/
[官方文件]:            https://code.visualstudio.com/docs

## 基本設定

官方文件 [settings][] 有提供詳細的解說。

[settings]: https://code.visualstudio.com/docs/getstarted/settings

### 字型

- [Cascadia Code][]：  
    微軟為了 Windows Terminal 設計的字體，已內建在 Windows 11 中。支援連字功能，有助於閱讀與編寫程式。

- [Noto Sans TC][]：  
    Google 開發的開源字型。提高中文的支援度與易讀性。

[Cascadia Code]: https://github.com/microsoft/cascadia-code
[Noto Sans TC]:  https://fonts.google.com/noto/specimen/Noto+Sans+TC

```json
// settings.json

{
    // 後三個字型為預設字型
    "editor.fontFamily": "'Cascadia Code', 'Noto Sans TC', Consolas, 'Courier New', monospace",
    // 啟用連字
    "editor.fontLigatures": true,
}
```

## 延伸模組

### 語言套件

[Chinese (Traditional) Language Pack for Visual Studio Code][]：  
中文 (繁體) 語言套件，讓 VS Code 提供本地化的使用者介面。

[Chinese (Traditional) Language Pack for Visual Studio Code]: https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hant

### Markdown 模組

Markdown 允許人們使用易讀易寫的純文字格式來編寫文件，然後將其轉換為有效的 HTML 文件進行發佈。

[markdownlint][]：  
依照規則，統一 Markdown 原始碼的撰寫風格。可以在設定中修改或關閉規則，例如：

```json
// settings.json

"markdownlint.config": {
    // https://github.com/DavidAnson/markdownlint/blob/v0.29.0/doc/Rules.md
    "MD007": {
        "indent": 4,
    },
    "MD028": false,
    "MD033": false,
    "MD041": false,
},
```

[Markdown Table][]：  
簡單快速地建立與修改表格。

[Markdown Preview Enhanced][]：  
提供許多 Markdown 本身以外的功能。例如，數學、渲染圖形、目錄、導入文件或文檔導出等。單純在 VS Code 上預覽及輸出 PDF 文件是一個不錯的選擇，但不太適合搭配 docsify，除非有支援同樣功能的 docsify-plugin。

[markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint
[Markdown Table]: https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable
[Markdown Preview Enhanced]: https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced

### Mermaid 模組

使用 [Mermaid][] 在 Markdown 文件中建立視覺化圖表。官方的線上編輯器 [Mermaid Live Editor][] 有提供各種圖表的簡單範例。

[Markdown Preview Mermaid Support][]：  
在 VS Code 內建的 Markdown 預覽功能中，一併預覽 Mermaid 圖表。

[Mermaid Markdown Syntax Highlighting][]：  
替 Mermaid 語法上色。

[Mermaid]:             http://mermaid.js.org/intro/
[Mermaid Live Editor]: https://mermaid.live/

[Markdown Preview Mermaid Support]:     https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid
[Mermaid Markdown Syntax Highlighting]: https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting

### LaTeX 模組

VS Code 在 [v1.58][] 後，內建的 Markdown 預覽功能開始支援 KaTeX 來渲染數學方程式。

[v1.58]: https://github.com/microsoft/vscode-docs/blob/vnext/release-notes/v1_58.md#math-formula-rendering-in-the-markdown-preview

?> 不安裝 [LaTeX Workshop][] 其實對後續使用 docsify 的影響不大。主要是需要此模組提供的 Autocomplete、格式化文件以及偵錯的功能，方便寫數學方程式。

安裝 [LaTeX Workshop][] 後，就可以在 VS Code 中使用 $\LaTeX$ 排版功能。[使用 VS Code 撰寫中文 LaTeX 文件][] 此文提供詳細圖文解說。

[LaTeX Workshop]: https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop
[使用 VS Code 撰寫中文 LaTeX 文件]: https://kaibaoom.tw/posts/notes/vscode-latex/

#### 前置作業

- 安裝 [MikTex][] 並更新套件
- 安裝 [Perl][] ，並設定 Perl 環境變數：

    `開始選單右鍵` → `系統` → `系統資訊` → `進階系統設定`  
    `進階` → `環境變數` → `系統變數` → `編輯 Path` → `新增 C:\Strawberry\perl\bin`

[MikTex]: https://miktex.org/download
[Perl]: https://strawberryperl.com/

#### 設定 LaTeX Workshop

`VS Code 設定` → `搜尋 Latex-workshop > latex: Recipes` → `在 settings.json 內編輯`

把設定中的

```json
{
    "name": "latexmk (xelatex)",
    "tools": [
        "xelatexmk"
    ]
},
```

移到最上方，形成

```json
"latex-workshop.latex.recipes": [
    {
        "name": "latexmk (xelatex)",
        "tools": [
            "xelatexmk"
        ]
    },
    {
        "name": "latexmk",
        "tools": [
            "latexmk"
        ]
    },
    {
        "name": "latexmk (latexmkrc)",
        "tools": [
            "latexmk_rconly"
        ]
    },
    …
],
```

#### 使用 LaTeX

在 VS Code 中新增副檔名為 `.tex` 的檔案，就能開始編寫 $\LaTeX$ 了，存檔後便能預覽其 PDF 文件。若需要教學，可以查看 [LaTeX Wikibooks][] 、 [Overleaf guides][] ，其中數學方程式可參考 [LaTeX Wikibooks/Mathematics][] 章節以及 [MathJax basic tutorial and quick reference][] 。

[LaTeX Wikibooks]: https://en.wikibooks.org/wiki/LaTeX
[Overleaf guides]: https://www.overleaf.com/learn
[MathJax basic tutorial and quick reference]: https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
[LaTeX Wikibooks/Mathematics]: https://en.wikibooks.org/wiki/LaTeX/Mathematics

建立以下資料夾與檔案：

```text
.
└── latex
    ├── main.tex
    ├── numbers.tex
    └── NotoSansTC-Regular.ttf
```

<!-- tabs:start -->

<!-- tab:main.tex -->

```latex
% main.tex

\documentclass[12pt]{article}
\usepackage{xeCJK}
\usepackage{amsfonts}
\usepackage{amsmath}
\setCJKmainfont{NotoSansTC-Regular.ttf}
\setCJKmonofont{NotoSansTC-Regular.ttf}
\title{\LaTeX \ Test Document}
\author{Nobody}
\begin{document}
\maketitle
\input{numbers.tex}
\end{document}
```

<!-- tab:numbers.tex -->

```latex
% numbers.tex

$$
     \texttt{Complex: } \mathbb{C} =
     \begin{cases}
          & \texttt{Real: } \mathbb{R} =
          \begin{cases}
               & \texttt{Rational: } \mathbb{Q} =
               \begin{cases}
                    & \texttt{Integers: } \mathbb{Z} =
                    \begin{cases}
                         & \texttt{Natural: } \mathbb{N}
                         \\
                         & \texttt{Negative integers}
                    \end{cases}
                    \\\\
                    & \texttt{Non-Integers} =
                    \begin{cases}
                         & \texttt{Finite decimal}
                         \\
                         & \texttt{Repeating decimal}
                    \end{cases}
               \end{cases}
               \\\\
               & \texttt{Irrational: } \mathbb{Q}^C \ \texttt{(Non-Repeating decimal)}
          \end{cases}
          \\
          & \texttt{Imaginary}
     \end{cases}
$$
```

<!-- tab:預覽 -->

$$
     \texttt{Complex: } \mathbb{C} =
     \begin{cases}
          & \texttt{Real: } \mathbb{R} =
          \begin{cases}
               & \texttt{Rational: } \mathbb{Q} =
               \begin{cases}
                    & \texttt{Integers: } \mathbb{Z} =
                    \begin{cases}
                         & \texttt{Natural: } \mathbb{N}
                         \\
                         & \texttt{Negative integers}
                    \end{cases}
                    \\\\
                    & \texttt{Non-Integers} =
                    \begin{cases}
                         & \texttt{Finite decimal}
                         \\
                         & \texttt{Repeating decimal}
                    \end{cases}
               \end{cases}
               \\\\
               & \texttt{Irrational: } \mathbb{Q}^C \ \texttt{(Non-Repeating decimal)}
          \end{cases}
          \\
          & \texttt{Imaginary}
     \end{cases}
$$

<!-- tabs:end -->

### Git 模組

[Git Extension Pack][]：  
打包了各種好用的 Git 模組。

[Git Extension Pack]: https://marketplace.visualstudio.com/items?itemName=donjayamanne.git-extension-pack

### 其他模組

[Code Spell Checker][]：  
提供拼字檢查功能。

[Code Spell Checker]: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
