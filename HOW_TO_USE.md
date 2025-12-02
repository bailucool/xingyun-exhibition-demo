# 如何使用本项目

## 🎯 项目已准备就绪！

恭喜！完整的魔珐星云3D数字人项目代码已经生成并提交到本地Git仓库。

## 📍 当前状态

✅ **项目位置：** `xingyun-exhibition-demo/`
✅ **Git状态：** 已初始化，3次提交完成
✅ **文件数量：** 28个文件
✅ **代码行数：** 2500+ 行

## 🚀 接下来的步骤

### 步骤1：推送到你的GitHub（必需）

你需要将项目推送到你的GitHub账号。有三种方式：

#### 方式A：使用自动化脚本（推荐）

**Windows用户：**
```powershell
cd xingyun-exhibition-demo
.\push-to-github.ps1 YOUR_GITHUB_USERNAME
```

**Linux/Mac用户：**
```bash
cd xingyun-exhibition-demo
chmod +x push-to-github.sh
./push-to-github.sh YOUR_GITHUB_USERNAME
```

将 `YOUR_GITHUB_USERNAME` 替换为你的实际GitHub用户名。

#### 方式B：使用GitHub CLI

```bash
cd xingyun-exhibition-demo
gh auth login
gh repo create xingyun-exhibition-demo --public --source=. --remote=origin --push
```

#### 方式C：手动推送

1. 在GitHub创建新仓库：https://github.com/new
   - 仓库名：`xingyun-exhibition-demo`
   - 类型：Public
   - 不要勾选"Initialize with README"

2. 推送代码：
```bash
cd xingyun-exhibition-demo
git remote add origin https://github.com/YOUR_USERNAME/xingyun-exhibition-demo.git
git branch -M main
git push -u origin main
```

### 步骤2：更新文章中的GitHub链接

推送成功后，你需要更新原文章中的GitHub仓库链接：

**原链接：**
```
https://github.com/yourusername/xingyun-exhibition-demo
```

**替换为：**
```
https://github.com/YOUR_ACTUAL_USERNAME/xingyun-exhibition-demo
```

在文章的以下位置更新：
1. "完整代码库开源"章节
2. README.md中的所有链接
3. 其他提到仓库地址的地方

### 步骤3：本地测试项目（可选）

如果你想在本地运行项目：

```bash
cd xingyun-exhibition-demo

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.development

# 编辑 .env.development，填入你的魔珐星云凭证
# VITE_XINGYUN_APP_ID=your_app_id
# VITE_XINGYUN_APP_SECRET=your_app_secret

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 查看效果。

### 步骤4：获取魔珐星云凭证

1. 访问 https://xingyun3d.com
2. 注册并登录开发者中心
3. 创建应用
4. 获取 AppID 和 AppSecret
5. 配置到 `.env.development` 文件

## 📂 项目结构说明

```
xingyun-exhibition-demo/
├── src/                    # 源代码
│   ├── components/        # Vue组件（5个）
│   ├── config/           # 配置文件
│   ├── stores/           # 状态管理
│   ├── utils/            # 工具类
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── docs/                  # 文档
│   ├── deployment.md     # 部署指南
│   └── troubleshooting.md # 问题解决
├── README.md             # 项目说明
├── package.json          # 依赖配置
└── vite.config.ts        # 构建配置
```

## 📝 重要文件说明

| 文件 | 作用 | 是否需要修改 |
|------|------|-------------|
| `.env.example` | 环境变量示例 | ❌ 不需要 |
| `.env.development` | 开发环境配置 | ✅ 需要填入凭证 |
| `src/config/xingyun.config.ts` | SDK配置 | ⚠️ 可选调整 |
| `README.md` | 项目说明 | ✅ 需要更新链接 |
| `package.json` | 依赖管理 | ❌ 不需要 |

## 🎓 学习建议

如果你想学习代码实现：

1. **先看文档**
   - README.md - 项目概览
   - PROJECT_SUMMARY.md - 项目总结
   - docs/deployment.md - 部署指南

2. **再看代码**
   - src/config/xingyun.config.ts - SDK配置
   - src/stores/avatar.ts - 状态管理
   - src/components/AvatarView.vue - 核心组件

3. **最后实践**
   - 本地运行项目
   - 修改代码测试
   - 部署到生产环境

## 🐛 遇到问题？

1. **查看文档**
   - docs/troubleshooting.md - 常见问题
   - DEPLOY_TO_GITHUB.md - GitHub推送指南

2. **检查配置**
   - 环境变量是否正确
   - 依赖是否安装完整
   - Git状态是否正常

3. **获取帮助**
   - 提交GitHub Issue
   - 查看项目文档
   - 联系作者

## ✅ 检查清单

推送到GitHub前，确认：

- [ ] 已在GitHub创建仓库（如果手动推送）
- [ ] 已配置Git用户信息
- [ ] 已选择推送方式
- [ ] 已准备好GitHub用户名

推送成功后，确认：

- [ ] 能访问GitHub仓库页面
- [ ] 所有文件都已上传
- [ ] README正确显示
- [ ] 已更新文章中的链接

## 🎉 完成！

按照以上步骤操作后，你将拥有：

✅ 一个完整的开源项目
✅ 可运行的示例代码
✅ 详细的项目文档
✅ 可分享的GitHub链接

现在你可以：
- 📢 在文章中分享项目链接
- 🌟 邀请读者给项目Star
- 🤝 接受其他开发者的PR
- 📚 作为学习和参考资料

---

**祝你使用愉快！** 🚀

有任何问题，请查看 `PROJECT_SUMMARY.md` 或提交Issue。
