# GitHub Pages

## Git

?> 詳細說明請查看[官方文件][]。

使用 Git 把文件上傳至 GitHub 上。

[官方文件]: https://git-scm.com/book/zh-tw/v2

```bash
cd blog

# 初始化
git init

# 追蹤所有檔案
git add -A

# 提交
git commit -m "Initial commit"

# 建立分支
git branch -M main

# 在 github 上建立 blog repository 後，並設為遠端版本庫
git remote add origin https://github.com/mingchyuan/blog.git

# 將完成的提交推送到遠端伺服器上
git push -u origin main
```

### Git 教學

- [在 VS Code 啟用 Git？介紹 Git 版面基本操作](https://pythonviz.com/git/use-git-in-vs-code-basic-operations/)
- [為你自己學 Git](https://gitbook.tw/)
- [30 天精通 Git 版本控管](https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/README.md)

### 關於 Git Commit Message

- [Git Commit Message 這樣寫會更好，替專案引入規範與範例](https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html)
- [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)
- [Commitizen — 產生簡潔統一的 commit](https://medium.com/@Hsu.Yang-Min/commitizen-%E7%94%A2%E7%94%9F%E7%B0%A1%E6%BD%94%E7%B5%B1%E4%B8%80%E7%9A%84-commit-3b49c40ec515)

## 部署至 GitHub Pages

`blog` repository → `Settings` → `Pages`

接著選擇 `main` branch 和 `/docs` folder，存檔後即可在上方獲得部署網址。
