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

// Article list configuration - contains only slugs for dynamic loading
export const articleSlugs = [
  'what-is-my-kink-test',
  'how-to-safely-explore-kinks-for-beginners',
  'psychology-behind-common-kinks',
  'how-to-talk-about-kinks-with-your-partner',
  'am-i-dominant-or-submissive-guide',
];

// Dynamically load article metadata
export async function getArticleMetadata(slug: string): Promise<ArticleMetadata> {
  try {
    const { metadata } = await import(`./articles/${slug}/metadata`);
    return metadata;
  } catch (error) {
    throw new Error(`Failed to load metadata for article: ${slug}`);
  }
}

// Dynamically load article content
export async function getArticleContent(slug: string): Promise<ComponentType> {
  try {
    const { ArticleContent } = await import(`./articles/${slug}/content`);
    return ArticleContent;
  } catch (error) {
    throw new Error(`Failed to load content for article: ${slug}`);
  }
}

// Get complete article data (metadata + content)
export async function getArticle(slug: string): Promise<Article> {
  const metadata = await getArticleMetadata(slug);
  const ContentComponent = await getArticleContent(slug);
  
  return {
    ...metadata,
    content: React.createElement(ContentComponent),
  };
}

// Get metadata for all articles (for list pages)
export async function getAllArticlesMetadata(): Promise<ArticleMetadata[]> {
  const metadataPromises = articleSlugs.map(slug => getArticleMetadata(slug));
  return Promise.all(metadataPromises);
}

// Get complete data for all articles
export async function getAllArticles(): Promise<Article[]> {
  const articlePromises = articleSlugs.map(slug => getArticle(slug));
  return Promise.all(articlePromises);
}

// Check if article exists
export function articleExists(slug: string): boolean {
  return articleSlugs.includes(slug);
}