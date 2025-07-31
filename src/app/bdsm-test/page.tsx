import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Brain, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BDSM Test - Discover Your BDSM Personality | AiKinkLab',
  description: 'Take our comprehensive BDSM test to discover your dominant, submissive, or switch tendencies. Professional AI analysis with complete privacy.',
  keywords: 'BDSM test, dominant submissive test, kink test, BDSM personality, sexual preferences test',
  openGraph: {
    title: 'BDSM Test - Discover Your BDSM Personality',
    description: 'Professional BDSM personality test with AI-powered analysis.',
  },
};

const features = [
  {
    icon: Brain,
    title: 'AI驱动分析',
    description: '先进的人工智能算法分析你的回答，提供准确的个性评估',
  },
  {
    icon: Shield,
    title: '完全匿名',
    description: '无需注册，所有数据加密处理，绝对保护你的隐私',
  },
  {
    icon: Clock,
    title: '快速完成',
    description: '仅需15分钟即可完成测试，立即获得详细分析报告',
  },
  {
    icon: Users,
    title: '专业可信',
    description: '基于心理学研究，已有数万用户验证的可靠测试',
  },
];

const faqs = [
  {
    question: '什么是BDSM测试？',
    answer: 'BDSM测试是一种心理评估工具，帮助你了解自己在BDSM关系中的角色偏好，包括支配（Dominant）、服从（Submissive）、施虐（Sadist）、受虐（Masochist）等倾向。',
  },
  {
    question: '测试结果准确吗？',
    answer: '我们的测试基于心理学研究和大量用户数据训练的AI模型，具有很高的准确性。但请记住，这只是一个参考工具，真正的自我了解需要时间和实践。',
  },
  {
    question: '我的隐私会受到保护吗？',
    answer: '绝对会。我们不收集任何个人身份信息，所有测试数据都经过加密处理，且不会与第三方分享。你的隐私安全是我们的首要承诺。',
  },
  {
    question: '测试费用是多少？',
    answer: '基础测试完全免费。如果你想获得更详细的AI分析报告和个性化建议，可以选择我们的高级版本。',
  },
];

export default function BDSMTestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-warm-charcoal via-layered-charcoal to-warm-charcoal" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-6">
            专业的<span className="text-neon-magenta">BDSM测试</span>
          </h1>
          
          <p className="text-xl text-neutral-gray mb-8 max-w-3xl mx-auto leading-relaxed">
            通过我们科学验证的BDSM个性测试，深入了解你的支配、服从、施虐、受虐倾向。获得专业的AI分析报告，在安全私密的环境中探索真实的自己。
          </p>
          
          <Link href="/test" className="btn-primary group text-lg px-8 py-4">
            开始BDSM测试
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          
          <p className="text-sm text-neutral-gray mt-4">
            🔒 完全匿名 · 立即开始 · 无需注册
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-layered-charcoal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
              为什么选择我们的BDSM测试？
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              专业、准确、私密的BDSM个性分析工具
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.title} className="text-center fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="w-16 h-16 bg-neon-magenta/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-neon-magenta" />
                  </div>
                  <h3 className="text-xl font-semibold text-warm-off-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-gray">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
              常见问题
            </h2>
            <p className="text-lg text-neutral-gray">
              关于BDSM测试的一切你需要知道的
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-warm-off-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-gray leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-layered-charcoal/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
            准备好了解真实的自己吗？
          </h2>
          <p className="text-lg text-neutral-gray mb-8">
            立即开始你的BDSM个性探索之旅
          </p>
          <Link href="/test" className="btn-primary group text-lg px-8 py-4">
            开始免费测试
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
}