'use client';

import { Brain, Shield, Target, Zap } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Personalized Questions',
    description: 'Answer carefully designed questions to explore your preferences, boundaries, and curiosities. Each question is psychologically validated to ensure accurate results.',
    step: '01',
  },
  {
    icon: Brain,
    title: 'AI Deep Analysis',
    description: 'Our advanced AI algorithms analyze your response patterns, identifying potential personality traits and preference tendencies to provide scientific insights.',
    step: '02',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Receive a detailed personal report including your key traits, compatibility analysis, and personal growth recommendations to help you better understand yourself.',
    step: '03',
  },
  {
    icon: Shield,
    title: 'Privacy Protection',
    description: 'All data is encrypted and never shared with third parties. Your privacy is our top priority, with guaranteed data security.',
    step: '04',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-layered-charcoal/30">
      <div className="max-w-7xl mx-auto mobile-container">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-playfair mobile-heading lg:text-5xl text-warm-off-white mb-4">
            How Our Test
            <span className="text-neon-magenta block sm:inline"> Works</span>
          </h2>
          <p className="mobile-text text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            We combine scientific methodology with AI technology to provide you with a deep self-discovery experience
          </p>
        </div>
        
        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.step}
                className="relative group fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-neon-magenta rounded-full flex items-center justify-center text-warm-off-white font-bold text-sm sm:text-lg z-10 shadow-lg">
                  {step.step}
                </div>
                
                {/* Card */}
                <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-card mobile-card-spacing sm:p-6 h-full transition-all duration-300 group-hover:border-neon-magenta/50 group-hover:shadow-glow">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neon-magenta/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-magenta/20 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-neon-magenta" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-semibold text-warm-off-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-gray leading-relaxed mobile-text-optimize">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-neon-magenta/50 to-transparent" />
                )}
                
                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-neon-magenta/50 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="mobile-text text-neutral-gray mb-6">
            Ready to start your journey of self-discovery?
          </p>
          <div className="mobile-button-stack sm:block">
            <a href="/test" className="btn-primary text-lg">
              Start Test Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}