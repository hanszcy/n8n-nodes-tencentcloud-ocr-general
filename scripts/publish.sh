#!/bin/bash

# n8n节点发布脚本
echo "🚀 开始发布n8n节点..."

# 检查是否已登录npm
if ! npm whoami; then
    echo "❌ 请先登录npm: npm login"
    exit 1
fi

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ 有未提交的更改，请先提交"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 运行测试
echo "🧪 运行测试..."
npm test

# 检查构建结果
if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist目录不存在"
    exit 1
fi

# 发布到npm
echo "📤 发布到npm..."
npm publish

echo "✅ 发布完成！"
echo "🔗 包地址: https://www.npmjs.com/package/n8n-nodes-tencentcloud-ocr-general"
