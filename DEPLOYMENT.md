# CursorX 官网部署指南

## 部署方案：GitHub Pages + Cloudflare

### 成本：完全免费

## 部署步骤

### 1. GitHub 仓库设置

1. 将代码推送到 GitHub 仓库
```bash
git add .
git commit -m "Initial commit with deployment configuration"
git push origin main
```

2. 在 GitHub 仓库中启用 Pages
   - 进入仓库 Settings
   - 找到 Pages 选项
   - Source 选择 "GitHub Actions"
   - 等待第一次部署完成

### 2. Cloudflare 配置

1. 添加域名到 Cloudflare
   - 访问 [Cloudflare.com](https://cloudflare.com)
   - 添加站点 `cursorx.app`
   - 选择 Free 计划

2. 更新 DNS 记录
   - 在域名注册商处将 DNS 服务器改为：
     ```
     ns1.cloudflare.com
     ns2.cloudflare.com
     ```

3. 在 Cloudflare 中配置 DNS
   - CNAME: `www` → `您的用户名.github.io` (代理开启)
   - A: `@` → `185.199.108.153` (代理开启)

4. 启用 SSL/TLS
   - SSL/TLS → Overview → Full (strict)

5. 性能优化
   - Speed → Optimization → 启用 Auto Minify
   - Caching → Configuration → Standard
   - Rules → Page Rules → `cursorx.app/*` → Cache Everything

### 3. 验证部署

- GitHub Pages: `https://您的用户名.github.io/CursorX-portal`
- 自定义域名: `https://cursorx.app`

## 文件说明

- `.github/workflows/deploy.yml` - GitHub Actions 自动部署配置
- `CNAME` - 自定义域名配置
- `sitemap.xml` - 搜索引擎站点地图
- `robots.txt` - 搜索引擎爬虫规则
- `package.json` - 项目依赖管理（可选）

## SEO 优化

- 完整的 Meta 标签
- Open Graph 和 Twitter Card 支持
- 结构化数据（Schema.org）
- 移动端友好
- 快速加载速度

## 维护

- 代码推送自动触发部署
- Cloudflare 提供全球 CDN 加速
- 自动 HTTPS 证书更新
- 99.9% 可用性保证

## 故障排除

### GitHub Pages 404 错误
- 检查 `index.html` 是否在根目录
- 确认 CNAME 文件内容正确
- 查看 GitHub Actions 部署日志

### Cloudflare 错误
- 等待 DNS 传播（最多 24 小时）
- 检查 DNS 记录配置
- 确认 SSL 模式设置

### HTTPS 不工作
- 在 Cloudflare 中检查 SSL 设置
- 确保选择 Full (strict) 模式
- 等待证书生效（最多 24 小时）
