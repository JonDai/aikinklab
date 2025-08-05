import React, { ComponentType } from 'react';

export interface Article {
  slug: string;
  featured: boolean;
  title: string;
  description: string;
  keywords: string;
  publishedTime: string;
  author: string;
  tags: string[];
  readTime: string;
  image: {
    src: string;
    alt: string;
    caption: string;
  };
  content: JSX.Element;
}

export interface ArticleMetadata {
  slug: string;
  featured: boolean;
  title: string;
  description: string;
  keywords: string;
  publishedTime: string;
  author: string;
  tags: string[];
  readTime: string;
  image: {
    src: string;
    alt: string;
    caption: string;
  };
}

// 文章列表配置 - 只包含slug，用于动态加载
export const articleSlugs = [
  'what-is-my-kink-test',
  'how-to-safely-explore-kinks-for-beginners',
  'psychology-behind-common-kinks',
  'how-to-talk-about-kinks-with-your-partner',
  'am-i-dominant-or-submissive-guide',
];

// 动态加载文章元数据
export async function getArticleMetadata(slug: string): Promise<ArticleMetadata> {
  try {
    const { metadata } = await import(`./articles/${slug}/metadata`);
    return metadata;
  } catch (error) {
    throw new Error(`Failed to load metadata for article: ${slug}`);
  }
}

// 动态加载文章内容
export async function getArticleContent(slug: string): Promise<ComponentType> {
  try {
    const { ArticleContent } = await import(`./articles/${slug}/content`);
    return ArticleContent;
  } catch (error) {
    throw new Error(`Failed to load content for article: ${slug}`);
  }
}

// 获取完整的文章数据（元数据 + 内容）
export async function getArticle(slug: string): Promise<Article> {
  const metadata = await getArticleMetadata(slug);
  const ContentComponent = await getArticleContent(slug);
  
  return {
    ...metadata,
    content: React.createElement(ContentComponent),
  };
}

// 获取所有文章的元数据（用于列表页面）
export async function getAllArticlesMetadata(): Promise<ArticleMetadata[]> {
  const metadataPromises = articleSlugs.map(slug => getArticleMetadata(slug));
  return Promise.all(metadataPromises);
}

// 获取所有文章的完整数据
export async function getAllArticles(): Promise<Article[]> {
  const articlePromises = articleSlugs.map(slug => getArticle(slug));
  return Promise.all(articlePromises);
}

// 检查文章是否存在
export function articleExists(slug: string): boolean {
  return articleSlugs.includes(slug);
}