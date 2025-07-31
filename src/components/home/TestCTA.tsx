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
    value: '15 Minutes',
    label: 'To Complete',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'User Rating',
  },
];

export function TestCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/5 via-transparent to-matte-gold/5" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main content */}
        <div className="bg-layered-charcoal/50 backdrop-blur-sm border border-neutral-gray/20 rounded-2xl p-8 md:p-12">
          <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
            Ready to Explore the Real You?
          </h2>
          
          <p className="text-lg text-neutral-gray mb-8 max-w-2xl mx-auto">
            Our professional test will help you gain deep insights into your preferences and boundaries, providing scientific guidance for your personal growth.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-neon-magenta/10 rounded-lg flex items-center justify-center mb-2">
                    <IconComponent className="w-6 h-6 text-neon-magenta" />
                  </div>
                  <div className="text-2xl font-bold text-warm-off-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-gray">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* CTA Button */}
          <Link href="/test" className="btn-primary group text-lg px-8 py-4">
            Start Your Kink Test
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          
          {/* Trust message */}
          <p className="text-sm text-neutral-gray mt-6">
            🔒 Completely Anonymous · Data Encrypted · Never Shared
          </p>
        </div>
        
        {/* Secondary CTA */}
        <div className="mt-8">
          <p className="text-neutral-gray mb-4">
            Want to learn more about BDSM?
          </p>
          <Link
            href="/bdsm-test"
            className="text-neon-magenta hover:text-hover-magenta transition-colors duration-200 font-medium"
          >
            Explore our BDSM-specific test →
          </Link>
        </div>
      </div>
    </section>
  );
}