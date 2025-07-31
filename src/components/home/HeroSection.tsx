'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-charcoal via-layered-charcoal to-warm-charcoal" />
      
      {/* Ambient light effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-matte-gold/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-layered-charcoal/50 backdrop-blur-sm border border-neutral-gray/20 rounded-pill px-4 py-2 mb-8 fade-in">
          <Sparkles className="w-4 h-4 text-neon-magenta" />
          <span className="text-sm text-neutral-gray">Powered by Advanced AI Analytics</span>
        </div>
        
        {/* Main heading */}
        <h1 className="font-playfair text-h1 text-warm-off-white mb-6 fade-in" style={{ animationDelay: '200ms' }}>
          Discover Your
          <span className="text-neon-magenta"> Inner Desires</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-neutral-gray mb-8 max-w-2xl mx-auto leading-relaxed fade-in" style={{ animationDelay: '400ms' }}>
          Explore the real you in a private, secure space. Our AI analyst provides deep, personalized insights to help you understand your innermost cravings.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in" style={{ animationDelay: '600ms' }}>
          <Link href="/test" className="btn-primary group">
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link href="/about" className="btn-secondary">
            Learn About Our Method
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-neutral-gray fade-in" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-magenta rounded-full" />
            <span>Completely Anonymous</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-magenta rounded-full" />
            <span>Scientifically Validated</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-magenta rounded-full" />
            <span>Professional Analysis</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neutral-gray/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neutral-gray/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}