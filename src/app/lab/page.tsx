import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { getAllArticlesMetadata } from '@/content/lab';

export const metadata: Metadata = {
  title: 'The Lab - Kink Education & BDSM Knowledge | AIKinkLab',
  description: 'Explore our comprehensive collection of articles on kink education, BDSM knowledge, and sexual wellness. Expert insights and educational content from AIKinkLab.',
  keywords: 'kink education, BDSM knowledge, sexual wellness, kink articles, BDSM guide, how to safely explore kinks, psychology behind kinks, talk about kinks with partner',
};



const categories = [
  'All',
  'Beginner Guides',
  'Deep Dives',
  'Communication',
  'Safety Practices',
  'Tool Guides',
];

export default async function LabPage() {
  const articles = await getAllArticlesMetadata();
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
            The Lab
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            Explore a treasure trove of kink education and BDSM knowledge. Our team of experts provides scientific, professional, and practical content to help you learn and grow safely in this space.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-layered-charcoal border border-neutral-gray/20 rounded-card pl-10 pr-4 py-3 text-warm-off-white placeholder-neutral-gray focus:border-neon-magenta focus:outline-none transition-colors duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
            <select className="bg-layered-charcoal border border-neutral-gray/20 rounded-card pl-10 pr-8 py-3 text-warm-off-white focus:border-neon-magenta focus:outline-none transition-colors duration-200 appearance-none">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-warm-off-white mb-8">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.filter(article => article.featured).map((article, index) => (
              <article
                key={article.slug}
                className="bg-layered-charcoal border border-neutral-gray/20 rounded-card overflow-hidden hover:border-neon-magenta/50 transition-all duration-300 group fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-neon-magenta bg-neon-magenta/10 px-2 py-1 rounded-pill">
                      {article.tags[0]}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-neutral-gray">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publishedTime).toLocaleDateString('en-US')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-warm-off-white mb-3 group-hover:text-neon-magenta transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-neutral-gray leading-relaxed mb-4">
                    {article.description}
                  </p>
                  
                  <Link
                    href={`/lab/${article.slug}`}
                    className="inline-flex items-center text-neon-magenta hover:text-hover-magenta transition-colors duration-200 font-medium"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-semibold text-warm-off-white mb-8">
            All Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <article
                key={article.slug}
                className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 hover:border-neon-magenta/50 transition-all duration-300 group fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-neon-magenta bg-neon-magenta/10 px-2 py-1 rounded-pill">
                    {article.tags[0]}
                  </span>
                  <span className="text-xs text-neutral-gray">
                    {article.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-warm-off-white mb-2 group-hover:text-neon-magenta transition-colors duration-200">
                  {article.title}
                </h3>
                
                <p className="text-neutral-gray text-sm leading-relaxed mb-4">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-gray">
                    {new Date(article.publishedTime).toLocaleDateString('en-US')}
                  </span>
                  <Link
                    href={`/lab/${article.slug}`}
                    className="text-neon-magenta hover:text-hover-magenta transition-colors duration-200 text-sm font-medium"
                  >
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}