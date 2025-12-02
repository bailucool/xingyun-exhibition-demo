#!/bin/bash

# 魔珐星云项目推送到GitHub脚本
# 使用方法: ./push-to-github.sh YOUR_GITHUB_USERNAME

echo "🚀 魔珐星云项目 GitHub 推送脚本"
echo "================================"

# 检查是否提供了GitHub用户名
if [ -z "$1" ]; then
    echo "❌ 错误：请提供GitHub用户名"
    echo "使用方法: ./push-to-github.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="xingyun-exhibition-demo"

echo "📝 GitHub用户名: $GITHUB_USERNAME"
echo "📦 仓库名称: $REPO_NAME"
echo ""

# 检查是否已经有远程仓库
if git remote | grep -q "origin"; then
    echo "⚠️  检测到已存在的远程仓库"
    git remote -v
    read -p "是否要删除并重新添加？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
        echo "✅ 已删除旧的远程仓库"
    else
        echo "❌ 取消操作"
        exit 1
    fi
fi

# 添加远程仓库
echo "📡 添加远程仓库..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# 更新README中的用户名
echo "📝 更新README中的仓库链接..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/yourusername/$GITHUB_USERNAME/g" README.md
else
    # Linux
    sed -i "s/yourusername/$GITHUB_USERNAME/g" README.md
fi

# 提交更新
git add README.md DEPLOY_TO_GITHUB.md push-to-github.sh
git commit -m "docs: 更新仓库链接和推送脚本"

# 推送到GitHub
echo "🚀 推送到GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo "🌐 访问你的仓库: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "📝 后续步骤："
    echo "1. 访问仓库页面查看代码"
    echo "2. 在仓库Settings中配置环境变量"
    echo "3. 邀请其他开发者协作"
    echo "4. 开始接受Star和PR！"
else
    echo ""
    echo "❌ 推送失败！"
    echo "可能的原因："
    echo "1. 仓库不存在 - 请先在GitHub创建仓库"
    echo "2. 权限不足 - 检查GitHub登录状态"
    echo "3. 网络问题 - 检查网络连接"
    echo ""
    echo "请参考 DEPLOY_TO_GITHUB.md 获取详细帮助"
fi
