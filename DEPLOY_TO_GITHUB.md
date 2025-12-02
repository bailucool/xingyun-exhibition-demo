# 推送到GitHub指南

本文档说明如何将项目推送到你的GitHub仓库。

## 📝 前提条件

1. 拥有GitHub账号
2. 已安装Git
3. 已配置Git用户信息

```bash
# 配置Git用户信息（如果还没配置）
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

## 🚀 推送步骤

### 方式一：使用GitHub CLI（推荐）

```bash
# 1. 安装GitHub CLI（如果还没安装）
# Windows: winget install GitHub.cli
# Mac: brew install gh
# Linux: 参考 https://github.com/cli/cli#installation

# 2. 登录GitHub
gh auth login

# 3. 创建仓库并推送
gh repo create xingyun-exhibition-demo --public --source=. --remote=origin --push
```

### 方式二：手动创建仓库

#### 步骤1：在GitHub创建新仓库

1. 访问 https://github.com/new
2. 仓库名称：`xingyun-exhibition-demo`
3. 描述：`魔珐星云3D数字人展厅智能导览系统 - 完整示例项目`
4. 选择 Public（公开）
5. 不要勾选"Initialize this repository with a README"
6. 点击"Create repository"

#### 步骤2：推送本地代码

```bash
# 1. 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/xingyun-exhibition-demo.git

# 2. 推送代码
git branch -M main
git push -u origin main
```

### 方式三：使用SSH（更安全）

```bash
# 1. 生成SSH密钥（如果还没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 添加SSH密钥到GitHub
# 复制公钥内容
cat ~/.ssh/id_ed25519.pub
# 访问 https://github.com/settings/keys 添加

# 3. 添加远程仓库（SSH方式）
git remote add origin git@github.com:YOUR_USERNAME/xingyun-exhibition-demo.git

# 4. 推送代码
git branch -M main
git push -u origin main
```

## ✅ 验证推送成功

推送成功后，访问你的仓库地址：
```
https://github.com/YOUR_USERNAME/xingyun-exhibition-demo
```

你应该能看到：
- ✅ 所有项目文件
- ✅ README.md显示在首页
- ✅ 24个文件已提交

## 📝 后续操作

### 1. 更新README中的仓库链接

编辑 `README.md`，将所有 `yourusername` 替换为你的实际GitHub用户名：

```bash
# 使用sed命令批量替换（Linux/Mac）
sed -i 's/yourusername/YOUR_USERNAME/g' README.md

# Windows PowerShell
(Get-Content README.md) -replace 'yourusername', 'YOUR_USERNAME' | Set-Content README.md
```

### 2. 提交更新

```bash
git add README.md
git commit -m "docs: 更新仓库链接"
git push
```

### 3. 配置GitHub Pages（可选）

如果想要在线演示：

1. 进入仓库 Settings → Pages
2. Source选择 "GitHub Actions"
3. 创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_XINGYUN_APP_ID: ${{ secrets.VITE_XINGYUN_APP_ID }}
          VITE_XINGYUN_APP_SECRET: ${{ secrets.VITE_XINGYUN_APP_SECRET }}
          
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. 在仓库Settings → Secrets添加环境变量

## 🎉 完成！

现在你的项目已经成功推送到GitHub，可以：
- 📢 分享给其他开发者
- 🌟 获得Star支持
- 🤝 接受Pull Request贡献
- 📝 在Issues中讨论问题

## 📞 需要帮助？

如果推送过程中遇到问题：

1. 检查Git配置：`git config --list`
2. 检查远程仓库：`git remote -v`
3. 查看Git状态：`git status`
4. 查看提交历史：`git log`

常见错误解决：
- **Permission denied**: 检查SSH密钥或使用HTTPS
- **Repository not found**: 确认仓库名称和用户名正确
- **Authentication failed**: 重新登录或生成Personal Access Token

---

**祝推送顺利！** 🚀
