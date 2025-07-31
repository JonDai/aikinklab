'use client';

import { Brain, Shield, Target, Zap } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Personalized Questions',
    description: 'Answer carefully crafted questions to explore your preferences, boundaries, and curiosities. Each question is psychologically validated.',
    step: '01',
  },
  {
    icon: Brain,
    title: 'AI Deep Analysis',
    description: 'Our advanced AI algorithms analyze your response patterns to identify underlying personality traits and preference tendencies.',
    step: '02',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Receive a detailed personal report, including your primary traits, compatibility analysis, and personal growth suggestions.',
    step: '03',
  },
  {
    icon: Shield,
    title: 'Privacy Protection',
    description: 'All data is encrypted and never shared with third parties. Your privacy is our top priority.',
    step: '04',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-layered-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
            How Our Test Works
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            We combine scientific methodology with AI technology to provide a deep self-discovery experience.
          </p>
        </div>
        
        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.step}
                className="relative group fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-neon-magenta rounded-full flex items-center justify-center text-warm-off-white font-bold text-lg z-10">
                  {step.step}
                </div>
                
                {/* Card */}
                <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 h-full transition-all duration-300 group-hover:border-neon-magenta/50 group-hover:shadow-glow">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-neon-magenta/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-magenta/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-neon-magenta" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-warm-off-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-neon-magenta/50 to-transparent" />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-neutral-gray mb-6">
            Ready to begin your journey of self-discovery?
          </p>
          <a href="/test" className="btn-primary">
            Start the Test Now
          </a>
        </div>
      </div>
    </section>
  );
}