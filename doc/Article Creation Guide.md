# 新增文章完整步骤指南

本指南提供了在AIKinkLab项目中创建新文章的完整步骤，确保避免常见错误并保证图片正常访问。 

## 步骤概览

### 1. 创建文章目录结构
```bash
mkdir -p src/content/articles/[article-slug]
```

### 2. 创建metadata.ts文件
在 `src/content/articles/[article-slug]/metadata.ts` 中创建文章元数据：

```typescript
export const metadata = {
  slug: 'article-slug', // 必须与目录名一致
  featured: true, // 是否为精选文章
  title: 'Article Title', // SEO优化的标题
  description: 'Article description for SEO', // 150-160字符的描述
  keywords: 'keyword1, keyword2, keyword3', // SEO关键词
  publishedTime: '2024-12-30T10:00:00Z', // ISO格式时间
  author: 'AIKinkLab Team',
  tags: ['Tag1', 'Tag2'], // 文章标签
  readTime: 'X min read', // 预估阅读时间
  image: {
    src: '/images/articles/article-image.svg', // 本地SVG图片路径
    alt: 'Descriptive alt text for accessibility',
    caption: 'Image caption for context'
  }
};

export type ArticleMetadata = typeof metadata;
```

### 3. 创建content.tsx文件
在 `src/content/articles/[article-slug]/content.tsx` 中创建文章内容：

```typescript
import React from 'react';

export const ArticleContent: React.FC = () => {
  return (
    <div className="prose prose-invert max-w-none">
      {/* 文章内容 */}
      <h2>Section Title</h2>
      <p>Article content...</p>
      
      {/* 内部链接示例 */}
      <a href="/lab/other-article" className="text-fuchsia-400 hover:text-fuchsia-300">
        Related Article
      </a>
      
      {/* 外部权威链接示例 */}
      <a 
        href="https://example.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-fuchsia-400 hover:text-fuchsia-300"
      >
        External Source
      </a>
    </div>
  );
};
```

**重要：必须使用 `export const ArticleContent` 而不是 `export default`**

### 4. 创建文章图片

#### 4.1 确保图片目录存在
```bash
mkdir -p public/images/articles
```

#### 4.2 创建SVG图片
- **必须使用SVG格式**（矢量格式，可缩放，文件小）
- 遵循项目设计规范（Midnight Radio主题）
- 使用项目色彩方案：
  - 主背景：`#1A1A1A` (Warm Charcoal)
  - 次要背景：`#2C2C2C` (Layered Charcoal)
  - 核心强调色：`#D946EF` (Neon Magenta)
  - 悬停强调色：`#E879F9` (Hover Magenta)
  - 奢华强调色：`#C0A062` (Matte Gold)
  - 主文本：`#F5F5F5` (Warm Off-white)

#### 4.3 SVG图片模板
```svg
<svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D946EF;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#E879F9;stop-opacity:0.6" />
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="800" height="400" fill="#1A1A1A"/>
  
  <!-- 抽象形状和设计元素 -->
  <!-- 根据文章主题自定义 -->
  
</svg>
```

### 5. 更新文章列表
在 `src/content/lab.tsx` 中添加新文章的slug：

```typescript
const articleSlugs = [
  'existing-article-1',
  'existing-article-2',
  'new-article-slug', // 添加新文章slug
];
```

### 6. 验证和测试

#### 6.1 启动开发服务器
```bash
npm run dev
```

#### 6.2 检查页面访问
- 访问 `http://localhost:3000/lab` 确认文章出现在列表中
- 访问 `http://localhost:3000/lab/[article-slug]` 确认文章页面正常
- 检查图片是否正常显示
- 检查控制台是否有错误

## 常见错误及解决方案

### 错误1："Unsupported Server Component type: undefined"
**原因：** content.tsx使用了 `export default` 而不是 `export const ArticleContent`
**解决：** 改为使用命名导出 `export const ArticleContent`

### 错误2：文章不在Lab页面显示
**原因：** 忘记在 `src/content/lab.tsx` 的 `articleSlugs` 数组中添加新文章slug
**解决：** 在数组中添加新文章的slug

### 错误3：图片无法显示
**原因：** 图片路径错误或图片文件不存在
**解决：** 
- 确保图片文件存在于 `public/images/articles/` 目录
- 检查metadata.ts中的图片路径是否正确
- 使用SVG格式而不是PNG/JPG

### 错误4：编译错误
**原因：** TypeScript语法错误或导入错误
**解决：** 
- 检查所有导入语句
- 确保React组件语法正确
- 检查TypeScript类型定义

### 错误5：ESLint错误 - 未转义的实体字符
**错误：** `react/no-unescaped-entities` - 撇号和引号未转义
**解决：** 将未转义的字符替换为HTML实体：
- 将 `'` 替换为 `&apos;`
- 将 `"` 替换为 `&quot;`
- JSX内容中的所有撇号和引号都需要转义
- 运行 `npm run build` 验证所有错误在部署前已修复

## 图片最佳实践

1. **格式选择：** 始终使用SVG格式
2. **尺寸规范：** 推荐800x400像素的viewBox
3. **色彩方案：** 严格遵循Midnight Radio设计规范
4. **文件命名：** 使用kebab-case，与文章slug保持一致
5. **可访问性：** 提供有意义的alt文本
6. **性能优化：** SVG文件应保持简洁，避免过于复杂的路径

## SEO优化检查清单

- [ ] 标题包含目标关键词且少于60字符
- [ ] 描述包含关键词且在150-160字符之间
- [ ] 包含相关的内部链接
- [ ] 包含权威的外部链接
- [ ] 图片有描述性的alt文本
- [ ] 内容结构清晰，使用适当的标题层级
- [ ] 关键词密度适中，避免关键词堆砌

## 完成后验证

1. 文章在 `/lab` 页面正确显示
2. 文章页面 `/lab/[slug]` 可正常访问
3. 图片正常加载和显示
4. 没有控制台错误
5. 响应式设计在不同设备上正常工作
6. SEO元数据正确设置

遵循这个指南可以确保新文章的创建过程顺利，避免常见的技术问题。