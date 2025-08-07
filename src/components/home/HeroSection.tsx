'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Play, Users, Shield, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

const floatingElements = [
  { id: 1, x: '10%', y: '20%', delay: 0 },
  { id: 2, x: '85%', y: '15%', delay: 1000 },
  { id: 3, x: '15%', y: '70%', delay: 2000 },
  { id: 4, x: '80%', y: '75%', delay: 1500 },
];

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-charcoal via-layered-charcoal to-warm-charcoal" />
      
      {/* Interactive ambient light effects */}
      <div 
        className="absolute w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: `${20 + mousePosition.x * 0.02}%`,
          top: `${25 + mousePosition.y * 0.02}%`,
        }}
      />
      <div 
        className="absolute w-96 h-96 bg-matte-gold/5 rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          right: `${25 + mousePosition.x * 0.015}%`,
          bottom: `${25 + mousePosition.y * 0.015}%`,
        }}
      />
      
      {/* Floating decorative elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute w-2 h-2 bg-neon-magenta/30 rounded-full animate-pulse"
          style={{
            left: element.x,
            top: element.y,
            animationDelay: `${element.delay}ms`,
            animationDuration: '3s',
          }}
        />
      ))}
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Main content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-layered-charcoal/50 backdrop-blur-sm border border-neutral-gray/20 rounded-pill px-4 py-2 mb-6 fade-in">
              <Sparkles className="w-4 h-4 text-neon-magenta" />
              <span className="text-sm text-neutral-gray">AI-Powered Deep Psychological Analysis</span>
            </div>
            
            {/* Main heading */}
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-warm-off-white mb-6 fade-in leading-tight" style={{ animationDelay: '200ms' }}>
              Discover Your
              <span className="text-neon-magenta block lg:inline"> Inner Desires</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-gray mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed fade-in" style={{ animationDelay: '400ms' }}>
              Explore your authentic self in a private, secure space. Our AI analyst provides deep personalized insights to help you understand your innermost desires.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8 fade-in" style={{ animationDelay: '600ms' }}>
              <Link href="/test" className="btn-primary group inline-flex items-center justify-center whitespace-nowrap text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <button className="btn-secondary inline-flex items-center justify-center whitespace-nowrap group">
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Watch Introduction
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-neutral-gray fade-in" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-neon-magenta" />
                <span>Completely Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-neon-magenta" />
                <span>Scientifically Validated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-neon-magenta" />
                <span>Professional Analysis</span>
              </div>
            </div>
          </div>
          
          {/* Right column - Interactive preview */}
          <div className="relative fade-in" style={{ animationDelay: '1000ms' }}>
            <div className="relative bg-layered-charcoal/30 backdrop-blur-sm border border-neutral-gray/20 rounded-2xl p-6 sm:p-8">
              {/* Mock test preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-warm-off-white">Test Preview</h3>
                  <div className="text-sm text-neutral-gray">Question 1/25</div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-warm-off-white leading-relaxed">
                    In intimate relationships, you tend to:
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      'Lead and guide your partner',
                      'Follow your partner\'s lead',
                      'Share control equally',
                      'Adapt flexibly to the situation'
                    ].map((option, index) => (
                      <div
                        key={index}
                        className="quiz-option group cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-neutral-gray rounded-full group-hover:border-neon-magenta transition-colors duration-200" />
                          <span className="text-neutral-gray group-hover:text-warm-off-white transition-colors duration-200">
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-neutral-gray/20">
                  <div className="w-full bg-layered-charcoal rounded-full h-2">
                    <div className="bg-neon-magenta h-2 rounded-full w-1/4 transition-all duration-300"></div>
                  </div>
                  <p className="text-xs text-neutral-gray mt-2">Progress: 4%</p>
                </div>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-neon-magenta/10 backdrop-blur-sm border border-neon-magenta/20 rounded-lg p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-neon-magenta">15 min</div>
                <div className="text-xs text-neutral-gray">Complete Test</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-matte-gold/10 backdrop-blur-sm border border-matte-gold/20 rounded-lg p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-matte-gold">10,000+</div>
                <div className="text-xs text-neutral-gray">Trusted Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neutral-gray/30 rounded-full flex justify-center relative">
          <div className="w-1 h-3 bg-gradient-to-b from-neon-magenta to-transparent rounded-full mt-2 animate-pulse" />
        </div>
        <p className="text-xs text-neutral-gray/70 mt-2 text-center">Scroll down</p>
      </div>
    </section>
  );
}