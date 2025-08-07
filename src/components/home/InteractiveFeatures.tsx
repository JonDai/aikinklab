'use client';

import { useState } from 'react';
import { Brain, Heart, Shield, Zap, ChevronRight, Star } from 'lucide-react';

const features = [
  {
    id: 'ai-analysis',
    icon: Brain,
    title: 'AI Deep Analysis',
    description: 'Advanced machine learning algorithms analyze your response patterns',
    details: [
      'Psychology-based question design',
      'Multi-dimensional personality trait identification',
      'Personalized report generation',
      'Continuously learning optimization algorithms'
    ],
    color: 'neon-magenta',
    bgGradient: 'from-neon-magenta/10 to-neon-magenta/5'
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy Protection',
    description: 'End-to-end encryption, never revealing personal information',
    details: [
      'Local encrypted data storage',
      'Anonymization processing technology',
      'Never shared with third parties',
      'Users can delete data anytime'
    ],
    color: 'matte-gold',
    bgGradient: 'from-matte-gold/10 to-matte-gold/5'
  },
  {
    id: 'personalized',
    icon: Heart,
    title: 'Personalized Insights',
    description: 'Tailored deep psychological analysis reports just for you',
    details: [
      'Detailed personality trait analysis',
      'Relationship compatibility assessment',
      'Personal growth recommendations',
      'Behavioral pattern interpretation'
    ],
    color: 'neon-magenta',
    bgGradient: 'from-neon-magenta/10 to-neon-magenta/5'
  },
  {
    id: 'instant',
    icon: Zap,
    title: 'Instant Results',
    description: 'Get professional analysis reports immediately after completing the test',
    details: [
      'Real-time data processing',
      'Instant report generation',
      'Multiple export format options',
      'Long-term tracking functionality'
    ],
    color: 'matte-gold',
    bgGradient: 'from-matte-gold/10 to-matte-gold/5'
  }
];

export function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState('ai-analysis');
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const currentFeature = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-layered-charcoal/50 to-warm-charcoal" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-warm-off-white mb-6">
            Why Choose Our
            <span className="text-neon-magenta"> AI Test</span>
          </h2>
          <p className="text-lg text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            Combining the latest artificial intelligence technology with psychological research to provide you with an unprecedented self-exploration experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Feature tabs */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature === feature.id;
              const isHovered = hoveredFeature === feature.id;
              
              return (
                <div
                  key={feature.id}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                    isActive 
                      ? feature.color === 'neon-magenta' 
                        ? 'border-neon-magenta/50 bg-gradient-to-r from-neon-magenta/10 to-neon-magenta/5'
                        : 'border-matte-gold/50 bg-gradient-to-r from-matte-gold/10 to-matte-gold/5'
                      : 'border-neutral-gray/20 bg-layered-charcoal/30 hover:border-neutral-gray/40'
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? feature.color === 'neon-magenta' 
                          ? 'bg-neon-magenta/20' 
                          : 'bg-matte-gold/20'
                        : 'bg-layered-charcoal group-hover:bg-neutral-gray/10'
                    }`}>
                      <IconComponent className={`w-6 h-6 transition-colors duration-300 ${
                        isActive 
                          ? feature.color === 'neon-magenta' 
                            ? 'text-neon-magenta' 
                            : 'text-matte-gold'
                          : 'text-neutral-gray group-hover:text-warm-off-white'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                        isActive ? 'text-warm-off-white' : 'text-neutral-gray group-hover:text-warm-off-white'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isActive ? 'text-neutral-gray' : 'text-neutral-gray/70 group-hover:text-neutral-gray'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                    
                    <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                      isActive 
                        ? feature.color === 'neon-magenta' 
                          ? 'text-neon-magenta rotate-90' 
                          : 'text-matte-gold rotate-90'
                        : 'text-neutral-gray/50 group-hover:text-neutral-gray'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side - Feature details */}
          <div className="lg:sticky lg:top-8">
            <div className={`bg-gradient-to-br ${currentFeature.bgGradient} backdrop-blur-sm border ${
              currentFeature.color === 'neon-magenta' ? 'border-neon-magenta/20' : 'border-matte-gold/20'
            } rounded-2xl p-8`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-16 h-16 ${
                  currentFeature.color === 'neon-magenta' ? 'bg-neon-magenta/20' : 'bg-matte-gold/20'
                } rounded-xl flex items-center justify-center`}>
                  <currentFeature.icon className={`w-8 h-8 ${
                    currentFeature.color === 'neon-magenta' ? 'text-neon-magenta' : 'text-matte-gold'
                  }`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-warm-off-white">
                    {currentFeature.title}
                  </h3>
                  <p className="text-neutral-gray">
                    {currentFeature.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-warm-off-white mb-4">
                  Core Features:
                </h4>
                {currentFeature.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-2 h-2 ${
                      currentFeature.color === 'neon-magenta' ? 'bg-neon-magenta' : 'bg-matte-gold'
                    } rounded-full mt-2 flex-shrink-0`} />
                    <p className="text-neutral-gray leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Call to action */}
              <div className="mt-8 pt-6 border-t border-neutral-gray/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-matte-gold fill-current" />
                    ))}
                    <span className="text-sm text-neutral-gray ml-2">
                      User Satisfaction 4.9/5
                    </span>
                  </div>
                  <button className={`${
                    currentFeature.color === 'neon-magenta' ? 'text-neon-magenta' : 'text-matte-gold'
                  } hover:text-warm-off-white transition-colors duration-200 font-medium`}>
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}