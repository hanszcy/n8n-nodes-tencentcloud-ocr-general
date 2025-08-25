# 发布指南

本指南将帮助你将n8n节点发布到npm和n8n社区。

## 准备工作

### 1. 注册npm账号

如果你还没有npm账号，请先注册：
```bash
npm adduser
```

### 2. 登录npm

```bash
npm login
```

### 3. 准备GitHub仓库

确保你的代码已经推送到GitHub，并且仓库是公开的。

## 发布步骤

### 1. 本地发布

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 发布到npm
npm publish
```

### 2. 使用发布脚本

```bash
# 给脚本执行权限
chmod +x scripts/publish.sh

# 运行发布脚本
./scripts/publish.sh
```

### 3. 自动发布（推荐）

使用GitHub Actions自动发布：

1. 在GitHub仓库设置中添加NPM_TOKEN密钥
2. 创建新的版本标签：
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. GitHub Actions会自动构建和发布

## 版本管理

### 语义化版本

遵循语义化版本规范：
- **主版本号**：不兼容的API修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

### 更新版本

```bash
# 更新package.json中的版本号
npm version patch  # 修订号+1
npm version minor  # 次版本号+1
npm version major  # 主版本号+1
```

## 提交到n8n社区

### 1. 创建Pull Request

1. Fork [n8n-community/nodes](https://github.com/n8n-community/nodes) 仓库
2. 创建新分支
3. 添加你的节点
4. 提交Pull Request

### 2. 节点要求

确保你的节点符合n8n社区的要求：

- [ ] 使用TypeScript
- [ ] 包含完整的类型定义
- [ ] 通过所有测试
- [ ] 包含适当的文档
- [ ] 遵循n8n编码规范

### 3. 测试

在提交之前，确保：

```bash
# 运行lint检查
npm run lint

# 运行测试
npm test

# 检查构建
npm run build
```

## 发布后

### 1. 验证发布

检查npm包是否正确发布：
```bash
npm view n8n-nodes-tencentcloud-ocr-general
```

### 2. 更新文档

- 更新README.md
- 添加使用示例
- 更新变更日志

### 3. 推广

- 在n8n社区论坛分享
- 在GitHub上添加标签
- 创建演示视频或截图

## 常见问题

### Q: 发布失败怎么办？

A: 检查以下几点：
- 包名是否已被占用
- 版本号是否正确
- 是否已登录npm
- 网络连接是否正常

### Q: 如何更新已发布的包？

A: 更新版本号后重新发布：
```bash
npm version patch
npm publish
```

### Q: 如何撤销发布？

A: 使用npm unpublish（注意：只能在发布后72小时内撤销）：
```bash
npm unpublish n8n-nodes-tencentcloud-ocr-general@1.0.0
```

## 最佳实践

1. **测试充分**：发布前确保所有功能正常工作
2. **文档完整**：提供清晰的使用说明和示例
3. **版本管理**：使用语义化版本号
4. **持续集成**：使用GitHub Actions自动化发布流程
5. **社区参与**：积极参与n8n社区讨论

## 获取帮助

如果遇到问题，可以：

- 查看[n8n节点开发文档](https://docs.n8n.io/integrations/creating-nodes/)
- 在[n8n社区论坛](https://community.n8n.io/)寻求帮助
- 提交GitHub Issue

## 许可证

确保你的包使用合适的开源许可证，推荐使用MIT许可证。
