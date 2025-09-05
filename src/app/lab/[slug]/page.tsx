import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getArticle, getArticleMetadata, articleExists, articleSlugs } from '@/content/lab';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!articleExists(params.slug)) {
    return {
      title: 'Article Not Found - AIKinkLab',
      description: 'The requested article could not be found.'
    };
  }

  const article = await getArticleMetadata(params.slug);

  return {
    title: `${article.title} - AIKinkLab`,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: 'AIKinkLab Team' }],
    creator: 'AIKinkLab',
    publisher: 'AIKinkLab',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `/lab/${params.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime || article.publishedTime,
      authors: ['AIKinkLab Team'],
      siteName: 'AIKinkLab',
      url: `https://www.aikinklab.com/lab/${params.slug}`,
      images: [
        {
          url: article.image.src.startsWith('/') ? `https://www.aikinklab.com${article.image.src}` : article.image.src,
          width: 1200,
          height: 630,
          alt: article.image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      creator: '@aikinklab',
      images: [article.image.src.startsWith('/') ? `https://www.aikinklab.com${article.image.src}` : article.image.src],
    },
  };
}

export async function generateStaticParams() {
  return articleSlugs.map((slug) => ({
    slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  if (!articleExists(params.slug)) {
    notFound();
  }

  const article = await getArticle(params.slug);

  // Enhanced structured data for the article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://www.aikinklab.com/lab/${params.slug}`,
    headline: article.title,
    alternativeHeadline: article.description,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: article.image.src.startsWith('/') ? `https://www.aikinklab.com${article.image.src}` : article.image.src,
      caption: article.image.caption,
      alt: article.image.alt,
      width: 800,
      height: 600
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Organization',
      name: 'AIKinkLab Team',
      url: 'https://www.aikinklab.com/about',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aikinklab.com/images/logo.png'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIKinkLab',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aikinklab.com/images/logo.png',
        width: 200,
        height: 60
      },
      url: 'https://www.aikinklab.com'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.aikinklab.com/lab/${params.slug}`,
      url: `https://www.aikinklab.com/lab/${params.slug}`
    },
    url: `https://www.aikinklab.com/lab/${params.slug}`,
    keywords: article.keywords.split(',').map(k => k.trim()),
    articleSection: 'Kink Education',
    articleBody: article.description,
    wordCount: article.content?.toString().split(' ').length || 1000,
    timeRequired: article.readTime,
    inLanguage: 'en-US',
    genre: 'Educational Content',
    about: {
      '@type': 'Thing',
      name: 'Kink and BDSM Education',
      description: 'Educational content about kink, BDSM, and sexual wellness'
    },
    audience: {
      '@type': 'PeopleAudience',
      audienceType: 'Adults interested in sexual wellness and self-discovery'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/lab" className="inline-flex items-center text-neutral-gray hover:text-warm-off-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to The Lab
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-neutral-gray mb-4">
              <div className="flex items-center space-x-1">
                <Tag className="w-4 h-4" />
                <span>{article.tags[0]}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
            <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-neutral-gray leading-relaxed">
              {article.description}
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none mx-auto">
            {article.content}
          </div>
        </article>
        </div>
      </div>
    </>
  );
}