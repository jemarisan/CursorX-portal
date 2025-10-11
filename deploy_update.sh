#!/bin/bash

# CursorX 更新部署脚本
# 用于自动化部署更新到 GitHub Pages

set -e

# 检查参数
if [ -z "$1" ]; then
    echo "❌ 错误：请指定版本号"
    echo "用法：./deploy_update.sh <version>"
    echo "示例：./deploy_update.sh 1.0.0"
    exit 1
fi

VERSION=$1
DMG_FILE="downloads/CursorX-$VERSION.dmg"

echo "🚀 开始部署 CursorX v$VERSION 更新..."
echo ""

# 检查 DMG 文件是否存在
if [ ! -f "$DMG_FILE" ]; then
    echo "❌ 错误：未找到 DMG 文件"
    echo "📍 路径：$DMG_FILE"
    echo "💡 请先运行 create_dmg.sh 创建安装包"
    exit 1
fi

# 获取文件大小
FILE_SIZE=$(ls -l "$DMG_FILE" | awk '{print $5}')
FILE_SIZE_MB=$(echo "scale=2; $FILE_SIZE / 1024 / 1024" | bc)

echo "📦 文件信息："
echo "  文件：$DMG_FILE"
echo "  大小：$FILE_SIZE 字节 ($FILE_SIZE_MB MB)"
echo ""

# 检查 Git 状态
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 检测到未提交的更改"
    git status --short
    echo ""
fi

# 询问是否继续
read -p "是否继续部署？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 部署已取消"
    exit 1
fi

# 添加文件到 Git
echo "📁 添加文件到 Git..."
git add appcast.xml
git add "$DMG_FILE"
git add downloads/README.md

# 提交更改
echo "💾 提交更改..."
git commit -m "发布 CursorX v$VERSION 更新

- 添加 v$VERSION 安装包
- 更新 appcast.xml
- 文件大小: $FILE_SIZE_MB MB"

# 推送到远程
echo "🌐 推送到 GitHub..."
git push origin main || git push origin master

echo ""
echo "✅ 部署完成！"
echo ""
echo "📋 下一步操作："
echo "1. 等待 GitHub Pages 部署完成（1-2 分钟）"
echo "2. 验证文件可访问性："
echo "   curl -I https://cursorx.app/appcast.xml"
echo "   curl -I https://cursorx.app/downloads/CursorX-$VERSION.dmg"
echo "3. 在应用中测试更新功能"
echo ""
echo "🔗 GitHub Pages 部署状态："
echo "   https://github.com/YOUR_USERNAME/CursorX-portal/actions"
echo ""
