# 魔珐星云项目推送到GitHub脚本 (PowerShell版本)
# 使用方法: .\push-to-github.ps1 YOUR_GITHUB_USERNAME

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

Write-Host "🚀 魔珐星云项目 GitHub 推送脚本" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$RepoName = "xingyun-exhibition-demo"

Write-Host "📝 GitHub用户名: $GitHubUsername" -ForegroundColor Green
Write-Host "📦 仓库名称: $RepoName" -ForegroundColor Green
Write-Host ""

# 检查是否已经有远程仓库
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Host "⚠️  检测到已存在的远程仓库" -ForegroundColor Yellow
    git remote -v
    $response = Read-Host "是否要删除并重新添加？(y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        git remote remove origin
        Write-Host "✅ 已删除旧的远程仓库" -ForegroundColor Green
    } else {
        Write-Host "❌ 取消操作" -ForegroundColor Red
        exit 1
    }
}

# 添加远程仓库
Write-Host "📡 添加远程仓库..." -ForegroundColor Cyan
git remote add origin "https://github.com/$GitHubUsername/$RepoName.git"

# 更新README中的用户名
Write-Host "📝 更新README中的仓库链接..." -ForegroundColor Cyan
(Get-Content README.md) -replace 'yourusername', $GitHubUsername | Set-Content README.md

# 提交更新
git add README.md DEPLOY_TO_GITHUB.md push-to-github.ps1 push-to-github.sh
git commit -m "docs: 更新仓库链接和推送脚本"

# 推送到GitHub
Write-Host "🚀 推送到GitHub..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 推送成功！" -ForegroundColor Green
    Write-Host "🌐 访问你的仓库: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 后续步骤：" -ForegroundColor Yellow
    Write-Host "1. 访问仓库页面查看代码"
    Write-Host "2. 在仓库Settings中配置环境变量"
    Write-Host "3. 邀请其他开发者协作"
    Write-Host "4. 开始接受Star和PR！"
} else {
    Write-Host ""
    Write-Host "❌ 推送失败！" -ForegroundColor Red
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "1. 仓库不存在 - 请先在GitHub创建仓库"
    Write-Host "2. 权限不足 - 检查GitHub登录状态"
    Write-Host "3. 网络问题 - 检查网络连接"
    Write-Host ""
    Write-Host "请参考 DEPLOY_TO_GITHUB.md 获取详细帮助" -ForegroundColor Cyan
}
