import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Lab - Kink Education & BDSM Knowledge | AiKinkLab',
  description: 'Explore our comprehensive collection of articles on kink education, BDSM knowledge, and sexual wellness. Expert insights and educational content.',
  keywords: 'kink education, BDSM knowledge, sexual wellness, kink articles, BDSM guide',
};

// Mock data for articles - in a real app, this would come from a CMS or API
const featuredArticles = [
  {
    id: 1,
    title: 'BDSM入门指南：安全、理智、知情同意的原则',
    excerpt: '了解BDSM的基本原则和安全实践，为初学者提供全面的入门指导。',
    category: '入门指南',
    readTime: '8分钟',
    publishDate: '2024-01-15',
    slug: 'bdsm-beginner-guide',
    featured: true,
  },
  {
    id: 2,
    title: '探索支配与服从：理解权力交换的心理学',
    excerpt: '深入分析支配与服从关系中的心理动机和情感需求。',
    category: '心理学',
    readTime: '12分钟',
    publishDate: '2024-01-10',
    slug: 'dominance-submission-psychology',
    featured: true,
  },
  {
    id: 3,
    title: '建立健康的Kink关系：沟通与界限设定',
    excerpt: '学习如何在Kink关系中建立有效沟通和明确界限。',
    category: '关系指导',
    readTime: '10分钟',
    publishDate: '2024-01-05',
    slug: 'healthy-kink-relationships',
    featured: false,
  },
];

const categories = [
  '全部',
  '入门指南',
  '心理学',
  '关系指导',
  '安全实践',
  '工具介绍',
];

export default function LabPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
            实验室
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            探索Kink教育和BDSM知识的宝库。我们的专家团队为你提供科学、专业、实用的内容，帮助你在这个领域中安全地学习和成长。
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
            <input
              type="text"
              placeholder="搜索文章..."
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
            精选文章
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.filter(article => article.featured).map((article, index) => (
              <article
                key={article.id}
                className="bg-layered-charcoal border border-neutral-gray/20 rounded-card overflow-hidden hover:border-neon-magenta/50 transition-all duration-300 group fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-neon-magenta bg-neon-magenta/10 px-2 py-1 rounded-pill">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-neutral-gray">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publishDate).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-warm-off-white mb-3 group-hover:text-neon-magenta transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-neutral-gray leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  
                  <Link
                    href={`/lab/${article.slug}`}
                    className="inline-flex items-center text-neon-magenta hover:text-hover-magenta transition-colors duration-200 font-medium"
                  >
                    阅读全文
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
            所有文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <article
                key={article.id}
                className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 hover:border-neon-magenta/50 transition-all duration-300 group fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-neon-magenta bg-neon-magenta/10 px-2 py-1 rounded-pill">
                    {article.category}
                  </span>
                  <span className="text-xs text-neutral-gray">
                    {article.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-warm-off-white mb-2 group-hover:text-neon-magenta transition-colors duration-200">
                  {article.title}
                </h3>
                
                <p className="text-neutral-gray text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-gray">
                    {new Date(article.publishDate).toLocaleDateString('zh-CN')}
                  </span>
                  <Link
                    href={`/lab/${article.slug}`}
                    className="text-neon-magenta hover:text-hover-magenta transition-colors duration-200 text-sm font-medium"
                  >
                    阅读 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            加载更多文章
          </button>
        </div>
      </div>
    </div>
  );
}