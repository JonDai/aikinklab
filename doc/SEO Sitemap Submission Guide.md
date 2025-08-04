# SEO站点地图提交指南

## 概述

本指南将帮助您将网站的站点地图提交给主要搜索引擎，以提高网站的搜索引擎可见性和索引效率。

## 生成的文件

### 1. 静态站点地图
- **文件位置**: `/public/sitemap.xml`
- **访问URL**: `https://aikinklab.com/sitemap.xml`
- **用途**: 手动维护的XML站点地图

### 2. 动态站点地图生成器
- **文件位置**: `/src/app/sitemap.ts`
- **访问URL**: `https://aikinklab.com/sitemap.xml`
- **用途**: Next.js自动生成的站点地图，会自动包含新文章

### 3. Robots.txt
- **文件位置**: `/public/robots.txt`
- **访问URL**: `https://aikinklab.com/robots.txt`
- **用途**: 指导搜索引擎爬虫如何抓取网站

## 提交到Google Search Console

### 步骤1: 验证网站所有权
1. 访问 [Google Search Console](https://search.google.com/search-console/)
2. 点击"添加资源"
3. 选择"网址前缀"并输入 `https://aikinklab.com`
4. 选择验证方法（推荐HTML文件上传或DNS记录）

### 步骤2: 提交站点地图
1. 在Google Search Console中选择您的网站
2. 在左侧菜单中点击"站点地图"
3. 在"添加新的站点地图"中输入: `sitemap.xml`
4. 点击"提交"

### 步骤3: 监控索引状态
- 在"站点地图"页面查看提交状态
- 在"覆盖率"页面查看索引页面数量
- 在"效果"页面查看搜索表现

## 提交到其他搜索引擎

### Bing Webmaster Tools
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. 添加并验证网站
3. 在"站点地图"部分提交 `https://aikinklab.com/sitemap.xml`

### Yandex Webmaster
1. 访问 [Yandex Webmaster](https://webmaster.yandex.com/)
2. 添加并验证网站
3. 在"索引"→"站点地图"中提交sitemap

## 站点地图内容说明

### 包含的页面类型
1. **主页** (`/`) - 最高优先级 (1.0)
2. **测试页面** (`/test`, `/bdsm-test`) - 高优先级 (0.9)
3. **实验室页面** (`/lab`) - 高优先级 (0.8)
4. **文章页面** (`/lab/*`) - 中等优先级 (0.7)
5. **信息页面** (`/about`, `/contact`) - 中等优先级 (0.5)
6. **法律页面** (`/privacy-policy`, `/terms`) - 低优先级 (0.3)

### 排除的页面
- `/results/*` - 动态结果页面（在robots.txt中禁止抓取）

## 更新频率设置

- **主页**: 每周更新
- **测试页面**: 每月更新
- **实验室页面**: 每周更新
- **文章页面**: 每月更新
- **信息页面**: 每月更新
- **法律页面**: 每年更新

## 验证和测试

### 本地测试
```bash
# 启动开发服务器
npm run dev

# 访问站点地图
open http://localhost:3001/sitemap.xml

# 访问robots.txt
open http://localhost:3001/robots.txt
```

### 在线验证工具
1. [Google站点地图测试工具](https://www.google.com/webmasters/tools/sitemap-list)
2. [XML站点地图验证器](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
3. [Robots.txt测试工具](https://www.google.com/webmasters/tools/robots-testing-tool)

## 最佳实践

### 1. 定期更新
- 添加新文章时，动态sitemap会自动更新
- 静态sitemap需要手动维护
- 建议使用动态sitemap (`/src/app/sitemap.ts`)

### 2. 监控性能
- 定期检查Google Search Console中的索引状态
- 关注爬取错误和索引覆盖率
- 监控搜索表现数据

### 3. 优化策略
- 确保所有重要页面都包含在sitemap中
- 设置合适的优先级和更新频率
- 保持URL结构清晰和一致

## 故障排除

### 常见问题
1. **sitemap无法访问**: 检查文件路径和服务器配置
2. **Google未索引页面**: 检查robots.txt和页面质量
3. **重复内容**: 确保URL规范化和canonical标签

### 联系支持
如果遇到技术问题，请查看:
- [Google Search Console帮助](https://support.google.com/webmasters/)
- [Next.js站点地图文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

---

**注意**: 搜索引擎索引需要时间，通常在提交后几天到几周内才能看到效果。请耐心等待并定期监控索引状态。