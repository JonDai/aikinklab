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
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedTime,
      authors: ['AIKinkLab Team'],
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

  return (
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
  );
}