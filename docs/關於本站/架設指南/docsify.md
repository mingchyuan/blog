# docsify

?> 詳細說明請查看[官方文件][]。

不需要靜態的 HTML 文件，就能生成文檔網站。在運作時，會直接轉換 Markdown 文件並在瀏覽器中呈現。

[官方文件]: https://docsify.js.org/#/?id=docsify

## 安裝 docsify

1. 安裝 [Node.js](https://nodejs.org/en)。並檢查 npm ( node 套件管理器 ) 版本：

    ```bash
    npm -v
    ```

2. 安裝 `docsify-cli` ：

    ```bash
    npm i docsify-cli -g
    ```

3. 先替網站建立一個資料夾，例如 `D:\blog`。並在該資料夾中初始化：

    ```bash
    docsify init ./docs
    ```

4. 啟用本地預覽，<http://localhost:3000>：

    ```bash
    docsify serve docs
    ```

## 基本檔案介紹

初始化後，在 `./docs` 中會產生以下檔案：

- `index.html` ：作為入口文件。
- `README.md` ：作為首頁。
- `.nojekyll` ：防止 GitHub Pages 忽略以下劃線開頭的檔案。

## 目錄樹

資料夾檔案結構與對應網址可以參考 <https://docsify.js.org/#/more-pages?id=more-pages>

## 側邊欄

設定:

```html
<!-- index.html -->
    
<script>
    window.$docsify = {
        // _sidebar.md
        loadSidebar: true,

        // 側邊欄標題
        name: 'Blog',
    }
</script>
```

更詳細資訊請參考 <https://docsify.js.org/#/more-pages?id=sidebar>

## Plugins

本站使用以下 plugins：

- [Full text search](https://docsify.js.org/#/plugins?id=full-text-search)
- [docsify-fontawesome](https://github.com/erickjx/docsify-fontawesome)
- [docsify-plugin-flexible-alerts](https://github.com/fzankl/docsify-plugin-flexible-alerts)
- [PrismJS](https://docsify.js.org/#/language-highlight?id=language-highlighting)
- [Zoom image](https://docsify.js.org/#/plugins?id=zoom-image)
- [docsify-latex with MathJax](https://scruel.github.io/docsify-latex/#/?id=with-mathjax)
- [Graphviz](https://graphviz.org/)
    - [認識 docsify 文件好幫手 graphviz，簡單畫出簡易的關聯表](https://medium.com/unalai/認識-docsify-文件好幫手-graphviz-簡單畫出簡易的關聯表-33c34c552a5a)
    - [Viz-js](https://viz-js.com/)
- [mermaid-docsify](https://github.com/Leward/mermaid-docsify)
- [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/#/)
- [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC)
- [docsify-copy-code](https://github.com/jperasmus/docsify-copy-code)
- [docsify-pagination](https://github.com/imyelo/docsify-pagination)
- [docsify-accordion](https://github.com/isaozler/docsify-accordion)
- [docsify-scroll-to-top](https://github.com/zhengxiangqi/docsify-scroll-to-top)
- [docsify-progress](https://cdn.jsdelivr.net/npm/docsify-progress@latest/dist/progress.min.js)
- [docsify-sidebar-collapse](https://github.com/iPeng6/docsify-sidebar-collapse)
- [@mingchyuanko/docsify-plugin-giscus](https://github.com/mingchyuan/docsify-plugin-giscus)
- [@mingchyuanko/docsify-plugin-page-toc](https://github.com/mingchyuan/docsify-plugin-page-toc)
- [@mingchyuanko/docsify-plugin-sidebar](https://github.com/mingchyuan/docsify-plugin-sidebar)
- [@mingchyuanko/docsify-theme](https://github.com/mingchyuan/docsify-theme)
