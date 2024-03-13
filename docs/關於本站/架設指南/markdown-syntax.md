?>　這是一篇說明 Markdown 語法的文章，你可以查看[原始檔案][]。

?> 以下使用 [vscode][] + [markdownlint][] 修改內容，並統整文件風格，供自己未來參考。

?> 為了提升瀏覽體驗，本站有使用一些 [docsify plugin][]。所以本站文章在其他 markdown editor 的呈現方式會與網頁上大相逕庭。

[原始檔案]:        https://github.com/othree/markdown-syntax-zhtw/blob/master/syntax.md
[vscode]:         https://code.visualstudio.com/
[markdownlint]:   https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint
[docsify plugin]: #docsify-plugin

# Markdown Syntax

![Markdown](https://markdown.tw/images/208x128.png)

**NOTE:**  
This is Traditional Chinese Edition Document of Markdown Syntax.  
If you are seeking for English Edition Document. Please refer to [Markdown: Syntax][eng-doc].

[eng-doc]: http://daringfireball.net/projects/markdown/syntax

**注意：**這份文件是用 Markdown 寫的，你可以[看看它的原始檔][src]。  

[src]: https://raw.githubusercontent.com/mingchyuan/blog/main/docs/關於本站/架設指南/markdown-syntax.md

---

## 概述

### 設計理念

Markdown 的目標是實現「易讀易寫」。

不過最需要強調的便是它的可讀性。一份使用 Markdown 格式撰寫的文件應該可以直接以純文字發佈，並且看起來不會像是由許多標籤或是格式指令所構成。Markdown 語法受到一些既有 text-to-HTML 格式的影響，包括

- [Setext][1]
- [atx][2]
- [Textile][3]
- [reStructuredText][4]
- [Grutatext][5]
- [EtText][6]

[1]: http://docutils.sourceforge.net/mirror/setext.html
[2]: http://www.aaronsw.com/2002/atx/
[3]: http://textism.com/tools/textile/
[4]: http://docutils.sourceforge.net/rst.html
[5]: http://www.triptico.com/software/grutatxt.html
[6]: http://ettext.taint.org/doc/

然而最大靈感來源其實是純文字的電子郵件格式。

因此 Markdown 的語法全由標點符號所組成，並經過嚴謹慎選，是為了讓它們看起來就像所要表達的意思。像是在文字兩旁加上星號，看起來就像 `*強調*` 。Markdown 的清單看起來，嗯，就是清單。假如你有使用過電子郵件，區塊引言看起來就真的像是引用一段文字。

### 行內 HTML

Markdown 的語法有個主要的目的：用來作為一種網路內容的**寫作**用語言。

Markdown 不是要來取代 HTML，甚至也沒有要和它相似，它的語法種類不多，只和 HTML 的一部分有關係，重點**不是**要創造一種更容易寫作 HTML 文件的語法，我認為 HTML 已經很容易寫了，Markdown 的重點在於，它能讓文件更容易閱讀、編寫。HTML 是一種**發佈**的格式，Markdown 是一種**編寫**的格式，因此，Markdown 的格式語法只涵蓋純文字可以涵蓋的範圍。

不在 Markdown 涵蓋範圍之外的標籤，都可以直接在文件裡面用 HTML 撰寫。不需要額外標註這是 HTML 或是 Markdown；只要直接加標籤就可以了。

只有區塊元素──比如 `<div>` 、 `<table>` 、 `<pre>` 、 `<p>` 等標籤，必須在前後加上空行，以利與內容區隔。而且這些元素的開始與結尾標籤，不可以用 tab 或是空白來縮排。Markdown 的產生器有智慧型判斷，可以避免在區塊標籤前後加上沒有必要的 `<p>` 標籤。

舉例來說，在 Markdown 文件裡加上一段 HTML 表格：

```markdown
This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.
```

請注意，Markdown 語法在 HTML 區塊標籤中將不會被進行處理。例如，你無法在 HTML 區塊內使用 Markdown 形式的 `*強調*` 。

HTML 的區段標籤如 `<span>` 、 `<cite>` 、 `<del>` 則不受限制，可以在 Markdown 的段落、清單或是標題裡任意使用。依照個人習慣，甚至可以不用 Markdown 格式，而採用 HTML 標籤來格式化。舉例說明：如果比較喜歡 HTML 的 `<a>` 或 `<img>` 標籤，可以直接使用這些標籤，而不用 Markdown 提供的連結或是影像標示語法。

HTML 區段標籤和區塊標籤不同，在區段標籤的範圍內，Markdown 的語法是有效的。

### 特殊字元自動轉換

Markdown 可以使用 HTML 實體，例如，在文件中插入一個著作權的符號 &copy;，你可以這樣寫：

```markdown
&copy;
```

?> See also: [HTML character entity][]

[HTML character entity]: https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references

## 區塊元素

### 段落和換行

一個段落是由一個以上相連接的行句組成，而一個以上的空行則會切分出不同的段落（ 空行的定義是顯示上看起來像是空行，便會被視為空行。比方說，若某一行只包含空白和 tab，則該行也會被視為空行 ），一般的段落不需要用空白或斷行縮排。

「一個以上相連接的行句組成」這句話其實暗示了 Markdown 允許段落內的強迫斷行，這個特性和其他大部分的 text-to-HTML 格式不一樣（ 包括 MovableType 的「Convert Line Breaks」選項 ），其它的格式會把每個斷行都轉成 `<br />` 標籤。

<mark>如果你**真的**想要插入 `<br />` 標籤的話，在行尾加上兩個以上的空白，然後按 enter。<mark>

是的，這確實需要花比較多功夫來插入 `<br />` ，但是「每個換行都轉換為 `<br />` 」的方法在 Markdown 中並不適合，Markdown 中 email 式的[區塊引言][bq]和多段落的[清單][l]在使用換行來排版的時候，不但更好用，還更好閱讀。

[bq]: #區塊引言
[l]:  #清單

### 標題

Markdown 支援兩種標題的語法，<mark>[atx][2]</mark> 和 [Setext][1] 形式。

<!-- tabs:start -->

#### ****atx****

atx 形式是在行首插入 1 到 6 個 `#`，對應到標題 1 到 6 階，例如：

```markdown
# This is an H1

## This is an H2

###### This is an H6
```

你可以選擇性地「關閉」atx 樣式的標題，這純粹只是美觀用的，若是覺得這樣看起來比較舒適，你就可以在行尾加上 `#` ，而行尾的 `#` 數量也不用和開頭一樣（ 行首的井字數量決定標題的階數 ）：

```markdown
# This is an H1 #

## This is an H2 ##

### This is an H3 ######
```

#### **Setext**

Setext 形式是用底線的形式，利用 `=`（ 最高階標題 ）和 `-`（ 第二階標題 ），例如：

```markdown
This is an H1
=============

This is an H2
-------------
```

任何數量的 `=` 和 `-` 都可以有效果。

<!-- tabs:end -->

### 區塊引言

Markdown 使用 email 形式的區塊引言，如果你很熟悉如何在 email 信件中引言，你就知道怎麼在 Markdown 文件中建立一個區塊引言，那會看起來像是你強迫斷行，然後在每行的最前面加上 `>` ：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>  
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.
```

<!-- tab:預覽 -->

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>  
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

<!-- tabs:end -->

Markdown 也允許你只在整個段落的第一行最前面加上 `>` ：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.
```

<!-- tab:預覽 -->

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

<!-- tabs:end -->

區塊引言可以有階層（ 例如：引言內的引言 ），只要根據層數加上不同數量的 `>` ：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.
```

<!-- tab:預覽 -->

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

<!-- tabs:end -->

引言的區塊內也可以使用其他的 Markdown 語法，包括標題、清單、程式碼區塊等：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
> ## This is a h2 header
>  
> ### This is a h3 header
>  
> 1. This is the first list item.
> 2. This is the second list item.
>  
> Here's some example code:
>  
> ```cpp
> std::cout << "Hello World!";
> ```
```

<!-- tab:預覽 -->

> ## This is a h2 header
>  
> ### This is a h3 header
>  
> 1. This is the first list item.
> 2. This is the second list item.
>  
> Here's some example code:
>  
> ```cpp
> std::cout << "Hello World!";
> ```

<!-- tabs:end -->

### 清單

Markdown 支援有序清單和無序清單。

無序清單使用星號（ `*` ）、加號（ `+` ）或是減號（ `-` ）作為清單標記：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- Red
- Green
- Blue
```

<!-- tab:預覽 -->

- Red
- Green
- Blue

<!-- tabs:end -->

有序清單則使用數字接著一個英文句點：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
1. Bird
2. McHale
3. Parish
```

<!-- tab:預覽 -->

1. Bird
2. McHale
3. Parish

<!-- tabs:end -->

很重要的一點是，你在清單標記上使用的數字並不會影響輸出的 HTML 結果，上面的清單所產生的 HTML 標記為：

```html
<ol>
    <li>Bird</li>
    <li>McHale</li>
    <li>Parish</li>
</ol>
```

如果你的清單標記寫成，也會得到完全相同的 HTML 輸出：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
1. Bird
1. McHale
1. Parish
```

<!-- tab:預覽 -->

1. Bird
1. McHale
1. Parish

<!-- tabs:end -->

依照環境，Markdown 可能有支援有序清單的 start 屬性：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
3. Bird
4. McHale
5. Parish
```

<!-- tab:預覽 -->

3. Bird
4. McHale
5. Parish

<!-- tab:html -->

```html
<ol start="3">
    <li>Bird</li>
    <li>McHale</li>
    <li>Parish</li>
</ol>
```

<!-- tabs:end -->

清單項目標記通常是放在最左邊，但是其實也可以縮排，最多三個空白，項目標記後面則一定要接著至少一個空白或 tab。

要讓清單看起來更漂亮，你可以把內容用固定的縮排整理好：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
  viverra nec, fringilla in, laoreet vitae, risus.
- Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
  Suspendisse id sem consectetuer libero luctus adipiscing.
```

<!-- tab:預覽 -->

- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
  viverra nec, fringilla in, laoreet vitae, risus.
- Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
  Suspendisse id sem consectetuer libero luctus adipiscing.

<!-- tabs:end -->

但是如果你很懶，那也不一定需要縮排：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
- Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
```

<!-- tab:預覽 -->

- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
- Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.

<!-- tabs:end -->

如果清單項目間用空行分開，Markdown 會把項目的內容在輸出時用 `<p>` 標籤包起來。以下示範差異：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- Bird
- Magic
```

<!-- tab:預覽 -->

- Bird
- Magic

<!-- tab:html -->

```html
<ul>
    <li>Bird</li>
    <li>Magic</li>
</ul>
```

<!-- tabs:end -->

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- Bird

- Magic
```

<!-- tab:預覽 -->

- Bird

- Magic

<!-- tab:html -->

```html
<ul>
    <li><p>Bird</p></li>
    <li><p>Magic</p></li>
</ul>
```

<!-- tabs:end -->

清單項目可以包含多個段落：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
1. This is a list item with two paragraphs. Lorem ipsum dolor
   sit amet, consectetuer adipiscing elit. Aliquam hendrerit
   mi posuere lectus.

   Vestibulum enim wisi, viverra nec, fringilla in, laoreet
   vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
   sit amet velit.

2. Suspendisse id sem consectetuer libero luctus adipiscing.
```

<!-- tab:預覽 -->

1. This is a list item with two paragraphs. Lorem ipsum dolor
   sit amet, consectetuer adipiscing elit. Aliquam hendrerit
   mi posuere lectus.

   Vestibulum enim wisi, viverra nec, fringilla in, laoreet
   vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
   sit amet velit.

2. Suspendisse id sem consectetuer libero luctus adipiscing.

<!-- tabs:end -->

如果你每行都有縮排，看起來會看好很多。當然，再次地，如果你很懶惰，Markdown 也允許：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- This is a list item with two paragraphs.

  This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

- Another item in the same list.
```

<!-- tab:預覽 -->

- This is a list item with two paragraphs.

  This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

- Another item in the same list.

<!-- tabs:end -->

如果要在清單項目內放進引言，那 `>` 就需要縮排：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- A list item with a blockquote:

  > This is a blockquote
  > inside a list item.
```

<!-- tab:預覽 -->

- A list item with a blockquote:

  > This is a blockquote
  > inside a list item.

<!-- tabs:end -->

如果要放程式碼區塊的話，該區塊就需要縮排：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
- A list item with a code block:

    ```code
    <code goes here>
    ```

```

<!-- tab:預覽 -->

- A list item with a code block:

    ```code
    <code goes here>
    ```

<!-- tabs:end -->

當然，項目清單很可能會不小心產生，像是下面這樣的寫法：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
1986. What a great season.
```

<!-- tab:預覽 -->

1986. What a great season.

<!-- tab:html -->

```html
<ol start="1986"><li>What a great season.</li></ol>
```

<!-- tabs:end -->

換句話說，也就是在行首出現**數字-句點-空白**，要避免這樣的狀況，你可以在句點前面加上**反斜線**（ `\` ）。

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
1986\. What a great season.
```

<!-- tab:預覽 -->

1986\. What a great season.

<!-- tab:html -->

```html
<p>1986. What a great season.</p>
```

<!-- tabs:end -->

### 程式碼區塊

和程式相關的寫作或是標籤語言原始碼通常會有已經排版好的程式碼區塊，通常這些區塊我們並不希望它以一般段落文件的方式去排版，而是照原來的樣子顯示，Markdown 會用 `<pre>` 和 `<code>` 標籤來把程式碼區塊包起來。

Markdown 有兩種方式建立程式碼區塊，<mark> Fenced Code Blocks </mark>和縮排：

<!-- tabs:start -->

#### ****Fenced Code Blocks****

使用**至少 3 個反引號** `` ` `` 框住程式碼，並且加上程式語言名稱，用來 highlight 語法：

<!-- tabs:start -->

<!-- tab:markdown -->

````markdown
```cpp
std::cout << "Hello World!";
```
````

<!-- tab:預覽 -->

```cpp
std::cout << "Hello World!";
```

<!-- tabs:end -->

若程式碼中有 `` ` `` ，可以在外層使用更多引號：

<!-- tabs:start -->

<!-- tab:markdown -->

`````markdown
````markdown
```cpp
std::cout << "Hello World!";
```
````
`````

<!-- tab:預覽 -->

````markdown
```cpp
std::cout << "Hello World!";
```
````

<!-- tabs:end -->

#### **縮排**

只要簡單地縮排 4 個**空白**或是 1 個 tab 就可以建立程式碼區塊，例如，下面的輸入：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
This is a normal paragraph:

    This is a code block.
```

<!-- tab:預覽 -->

This is a normal paragraph:

    This is a code block.

<!-- tab:html -->

```html
<p>This is a normal paragraph:</p>

<pre>
    <code>This is a code block.</code>
</pre>
```

<!-- tabs:end -->

<!-- tabs:end -->

### 分隔線

你可以在一行中用三個或以上的星號、減號、底線來建立一個分隔線，行內不能有其他東西。你也可以在星號中間插入空白。下面每種寫法都可以建立分隔線：

```markdown

---

- - -

---------------------------------------

***

* * *

*****
```

---

## 區段元素

### 連結

Markdown 支援兩種形式的連結語法： 行內和參考兩種形式。

不管是哪一種，連結的文字都是用 [方括號] 來標記。

要建立一個**行內形式**的連結，只要在方塊括號後面馬上接著括號並插入網址連結即可，如果你還想要加上連結的 title 文字，只要在網址後面，用雙引號把 title 文字包起來即可，例如：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
[This is an example inline link.](http://example.com/ "Title")

[This link has no title attribute.](http://example.net/)
```

<!-- tab:預覽 -->

[This is an example inline link.](http://example.com/ "Title")

[This link has no title attribute.](http://example.net/)

<!-- tab:html -->

```html
<p><a href="http://example.com/" title="Title">This is  an example inline link.</a></p>

<p><a href="http://example.net/">This link has no title attribute.</a></p>
```

<!-- tabs:end -->

也可以使用相對路徑或某個元素的 id：

```markdown
[About Us](/about) 
[docsify plugin](#docsify-plugin)
```

**參考形式**的連結使用另外一個方括號接在連結文字的括號後面，而在第二個方括號裡面要填入用以辨識連結的標籤：

```markdown
This is [an example][id] reference-style link.
```

接著，在文件的任意處，你可以把這個標籤的連結內容定義出來：

```markdown
[id]: http://example.com/  "Optional Title Here"
```

網址太長的話，你也可以把 title 屬性放到下一行，也可以加一些縮排，這樣會比較好看：

```markdown
[id]: http://example.com/longish/path/to/resource/here
      "Optional Title Here"
```

網址定義只有在產生連結的時候用到，並不會直接出現在文件之中。

連結辨識標籤可以有字母、數字、空白和標點符號，但是並**不區分大小寫**，因此下面兩個連結是一樣的：

```markdown
[link text][a]
[link text][A]
```

**預設的連結標籤**功能讓你可以省略指定連結標籤，這種情形下，連結標籤和連結文字會視為相同，要用預設連結標籤只要在連結文字後面加上一個空的方括號，如果你要讓 "Google Maps" 連結到 google.com/maps，你可以簡化成：

```markdown
[Google Maps][]
```

然後定義連結內容：

```markdown
[Google Maps]: https://www.google.com/maps
```

由於連結文字可能包含空白，所以這種簡化的標籤內也可以包含多個文字。

連結的定義可以放在文件中的任何一個地方，我比較偏好直接放在連結出現段落的後面，你也可以把它放在文件最後面，就像是註解一樣。

下面是一個參考式連結的範例：

```markdown
I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"
```

如果改成用連結名稱的方式寫：

```markdown
I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

[google]: http://google.com/        "Google"
[yahoo]:  http://search.yahoo.com/  "Yahoo Search"
[msn]:    http://search.msn.com/    "MSN Search"
```

使用 Markdown 的參考式連結，不在於它比較好寫，而是它比較好讀。可以讓文件更像是瀏覽器最後產生的結果，讓你可以把一些標記相關的資訊移到段落文字之外，你就可以增加連結而不讓文章的閱讀感覺被打斷。

### 強調

Markdown 使用星號（ `*` ）和底線（ `_` ）作為標記強調字詞的符號。

- 被 `*` 或 `_` 包圍的字詞會被轉成 `<em>` ，瀏覽器預設為斜體字
- 被 `**` 或 `__` 包起來則會被轉成 `<strong>` ，瀏覽器預設為粗體字

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
```

<!-- tab:預覽 -->

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

<!-- tab:html -->

```html
<em>single asterisks</em>

<em>single underscores</em>

<strong>double asterisks</strong>

<strong>double underscores</strong>
```

<!-- tabs:end -->

你可以隨便用你喜歡的樣式，唯一的限制是，你用什麼符號開啟標籤，就要用什麼符號結束。

強調也可以直接插在文字中間：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
un**frigging**believable
```

<!-- tab:預覽 -->

un**frigging**believable

<!-- tabs:end -->

但是如果 `*` 和 `_` 兩邊都有空白的話，它們就只會被當成普通的符號。也可以在文字前後直接利用反斜線插入普通的星號或底線：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
1 * 2 * 3  
\*this text is surrounded by literal asterisks\*
```

<!-- tab:預覽 -->

1 * 2 * 3  
\*this text is surrounded by literal asterisks\*

<!-- tabs:end -->

### 程式碼

如果要標記一小段行內程式碼，你可以用反引號把它包起來（ `` ` `` ），例如：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
Use the `printf()` function.
```

<!-- tab:預覽 -->

Use the `printf()` function.

<!-- tab:html -->

```html
<p>Use the <code>printf()</code> function.</p>
```

<!-- tabs:end -->

如果要在程式碼區段內插入反引號，你可以用多個反引號來開啟和結束程式碼區段：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
``There is a literal backtick (`) here.``
```

<!-- tab:預覽 -->

``There is a literal backtick (`) here.``

<!-- tab:html -->

```html
<p><code>There is a literal backtick (`) here.</code></p>
```

<!-- tabs:end -->

### 圖片

很明顯地，要在純文字應用中設計一個「自然」的語法來插入圖片是有一定難度的。

Markdown 使用一種和連結很相似的語法來標記圖片，同樣也允許兩種樣式： 行內和參考。

**行內形式**的圖片的語法看起來像是：

```markdown
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")
```

詳細敘述如下：

- 一個驚嘆號 `!`
- 接著一對方括號，裡面放上圖片的替代文字
- 接著一對普通括號，裡面放上圖片的網址，最後還可以用引號包住並加上選擇性的 "title" 文字。

**參考形式**的圖片語法則長得像這樣：

```markdown
![Alt text][id]
```

「id」是圖片參考的名稱，圖片參考的定義方式則和連結參考一樣：

```markdown
[id]: url/to/image  "Optional title attribute"
```

到目前為止，Markdown 還沒有辦法指定圖片的寬高，如果你需要的話，你可以使用普通的 `<img>` 標籤。

```html
<img src="/img/contact.png" alt="image" width="300" height="auto">
```

---

## 其它

### 自動連結

Markdown 支援比較簡短的自動連結形式來處理網址和電子郵件信箱，只要是用角括號包起來，Markdown 就會自動把它轉成連結，連結的文字就和連結位置一樣，例如：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
<http://example.com/>

<address@example.com>
```

<!-- tab:預覽 -->

<http://example.com/>

<address@example.com>

<!-- tab:html -->

```html
<p><a href="http://example.com/">http://example.com/</a></p>

<p><a href="mailto:address@example.com">address@example.com</a></p>
```

<!-- tabs:end -->

### 跳脫字元

Markdown 可以利用反斜線來插入一些在語法中有其它意義的符號，例如：

如果你想要用星號加在文字旁邊的方式來做出強調效果（ 但不用 `<em>` 標籤 ），你可以在星號的前面加上反斜線：

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
\*literal asterisks\*
```

<!-- tab:預覽 -->

\*literal asterisks\*

<!-- tabs:end -->

Markdown 支援在下面這些符號前面加上反斜線來幫助插入普通的符號：

```markdown
\   反斜線
`   反引號
*   星號
_   底線
{}  大括號
[]  方括號
()  括號
#   井字號
+   加號
-   減號
.   英文句點
!   驚嘆號
```

## docsify plugin

### docsify-tabs

<https://jhildenbiddle.github.io/docsify-tabs/#/>

設定：

```js
window.$docsify = {
    tabs: {
        persist: false,
        sync: false,
        theme: 'material',
        tabComments: true,
        tabHeadings: true,
    },
};
```

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
<!-- tabs:start -->

<!-- tab:English -->

Hello!

<!-- tab:French -->

Bonjour!

<!-- tab:Italian -->

Ciao!

<!-- tabs:end -->
```

<!-- tab:預覽 -->

<!-- tabs:start -->

<!-- tab:English -->

Hello!

<!-- tab:French -->

Bonjour!

<!-- tab:Italian -->

Ciao!

<!-- tabs:end -->

<!-- tabs:end -->

### docsify-plugin-flexible-alerts

<https://github.com/fzankl/docsify-plugin-flexible-alerts>

設定：

```js
window.$docsify = {
    'flexible-alerts': {
        style: 'flat',

        example: {
            label: 'Example',

            // 使用 Font Awesome
            icon: 'fa-solid fa-list',
        },
    },
};
```

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
> [!note|label:title of note]
…

> [!example]
…

>[!warning|label:warning text]
…

>[!tip]
…
```

<!-- tab:預覽 -->

> [!note|label:title of note]
…

> [!example]
…

>[!warning|label:warning text]
…

>[!tip]
…

<!-- tabs:end -->

### docsify-accordion

<https://github.com/isaozler/docsify-accordion>

<!-- tabs:start -->

<!-- tab:markdown -->

```markdown
+ Question 1? +

  Answer 1

+ Question 2? +

  Answer 2
```

<!-- tab:預覽 -->

+ Question 1? +

  Answer 1

+ Question 2? +

  Answer 2

<!-- tabs:end -->