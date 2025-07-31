import type { Metadata } from 'next';
import { Shield, Brain, Heart, Users, Award, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Our Midnight Radio Philosophy | AiKinkLab',
  description: 'Learn about AiKinkLab\'s mission to provide safe, professional, and private kink exploration through AI technology.',
  keywords: 'about aikinklab, kink testing, AI analysis, sexual wellness, privacy',
};

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'We are committed to absolute user privacy. All data is encrypted and never shared with third parties. Your secrets are always safe.',
  },
  {
    icon: Brain,
    title: 'Scientific Rigor',
    description: 'Based on psychological research and AI technology, we provide scientific and accurate personality analysis to help users achieve reliable self-awareness.',
  },
  {
    icon: Heart,
    title: 'Non-Judgmental Environment',
    description: 'We create a completely non-judgmental space where everyone can freely explore their inner desires and true needs.',
  },
  {
    icon: Users,
    title: 'Professional Support',
    description: 'Our team consists of psychology experts, AI engineers, and sexologists to provide users with professional guidance and support.',
  },
];

const stats = [
  {
    number: '50,000+',
    label: 'Users Trust Us',
    description: 'Over 50,000 users have explored themselves through our platform.',
  },
  {
    number: '99.9%',
    label: 'Privacy Protection',
    description: 'A perfect privacy protection record with zero data breach incidents.',
  },
  {
    number: '4.9/5',
    label: 'User Satisfaction',
    description: 'Average user rating for our test accuracy and service quality.',
  },
  {
    number: '24/7',
    label: 'Technical Support',
    description: 'Round-the-clock technical support and user service.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden mb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/5 via-transparent to-matte-gold/5" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-6">
            Our <span className="text-neon-magenta">Midnight Radio</span> Philosophy
          </h1>
          
          <p className="text-xl text-neutral-gray leading-relaxed max-w-3xl mx-auto">
            In the private hours of the late night, when the world falls silent, we create a safe space for you—like a midnight radio station, broadcasting authentic voices in the dark, allowing you to honestly confront your deepest desires.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-h2 text-warm-off-white mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-neutral-gray leading-relaxed">
                <p>
                  AiKinkLab was born from a simple yet profound belief: everyone has the right to explore their personality and desires in a safe and private environment. We believe that true self-awareness is the cornerstone of personal growth and happy relationships.
                </p>
                <p>
                  By combining cutting-edge AI technology with rigorous psychological research, we provide users with scientific, accurate, and personalized analysis reports. We are more than just a testing platform; we are a professional community that supports personal exploration and growth.
                </p>
                <p>
                  We are committed to creating a private and safe space for every user, like a midnight radio station, allowing you to honestly face yourself and bravely explore your true inner needs.
                </p>
              </div>
            </div>
            
            <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-matte-gold mr-3" />
                <h3 className="text-xl font-semibold text-warm-off-white">
                  Our Commitment
                </h3>
              </div>
              <ul className="space-y-3 text-neutral-gray">
                <li className="flex items-start">
                  <Lock className="w-5 h-5 text-neon-magenta mr-3 mt-0.5 flex-shrink-0" />
                  <span>Absolute privacy protection and data security</span>
                </li>
                <li className="flex items-start">
                  <Brain className="w-5 h-5 text-neon-magenta mr-3 mt-0.5 flex-shrink-0" />
                  <span>Accurate analysis based on scientific research</span>
                </li>
                <li className="flex items-start">
                  <Heart className="w-5 h-5 text-neon-magenta mr-3 mt-0.5 flex-shrink-0" />
                  <span>A non-judgmental and inclusive exploration environment</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-neon-magenta mr-3 mt-0.5 flex-shrink-0" />
                  <span>Continuous support from a professional team</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-layered-charcoal/30 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              These values guide our every decision and action.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-neon-magenta/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-neon-magenta" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-warm-off-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-neutral-gray leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
              The Data Speaks
            </h2>
            <p className="text-lg text-neutral-gray">
              Our results and the trust of our users.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-neon-magenta mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-warm-off-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-neutral-gray">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-layered-charcoal/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-h2 text-warm-off-white mb-6">
            我们的AI技术如何运作
          </h2>
          
          <div className="text-neutral-gray leading-relaxed space-y-4 mb-8">
            <p>
              我们的AI分析系统基于深度学习和自然语言处理技术，结合了心理学、性学和行为科学的最新研究成果。
              系统通过分析用户的回答模式、选择偏好和反应时间，构建出多维度的个性画像。
            </p>
            <p>
              我们的算法经过数万个真实案例的训练和验证，能够识别出细微的个性特征和潜在倾向。
              同时，我们持续优化模型，确保分析结果的准确性和相关性。
            </p>
            <p>
              最重要的是，我们的技术设计始终将用户隐私放在首位。
              所有数据处理都在加密环境中进行，个人信息永远不会被存储或分享。
            </p>
          </div>
          
          <a href="/test" className="btn-primary">
            体验我们的AI分析
          </a>
        </div>
      </section>
    </div>
  );
}