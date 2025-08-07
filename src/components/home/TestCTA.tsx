'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Trusted Users',
  },
  {
    icon: Clock,
    value: '15 min',
    label: 'Complete Test',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'User Rating',
  },
];

export function TestCTA() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/5 via-transparent to-matte-gold/5" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto mobile-container text-center">
        {/* Main content */}
        <div className="glass rounded-2xl mobile-card-spacing sm:p-8 md:p-12">
          <h2 className="font-playfair mobile-heading lg:text-5xl text-warm-off-white mb-4 sm:mb-6">
            Ready to Explore
            <span className="text-neon-magenta block sm:inline"> Your True Self?</span>
          </h2>
          
          <p className="mobile-text text-neutral-gray mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Our professional test will help you deeply understand your preferences and boundaries, providing scientific guidance for your personal growth
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center scale-in p-4 sm:p-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neon-magenta/10 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-neon-magenta" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-warm-off-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-gray">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* CTA Button */}
          <div className="mobile-button-stack sm:block mb-6">
            <Link href="/test" className="btn-primary group inline-flex items-center justify-center whitespace-nowrap text-lg px-8 py-4">
              Start Your Personality Test
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          
          {/* Trust message */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm text-neutral-gray">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-magenta rounded-full" />
              <span>Completely Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-magenta rounded-full" />
              <span>Data Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-magenta rounded-full" />
              <span>Never Shared</span>
            </div>
          </div>
        </div>
        
        {/* Secondary CTA */}
        <div className="mt-6 sm:mt-8">
          <p className="mobile-text text-neutral-gray mb-4">
            Want to learn more about BDSM?
          </p>
          <Link
            href="/bdsm-test"
            className="text-neon-magenta hover:text-hover-magenta transition-colors duration-200 font-medium mobile-text"
          >
            Explore our specialized BDSM test →
          </Link>
        </div>
      </div>
    </section>
  );
}