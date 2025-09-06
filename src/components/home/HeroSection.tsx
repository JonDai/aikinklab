'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Play, Users, Shield, Brain, Zap, Star, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const floatingElements = [
  { id: 1, icon: Zap, x: '10%', y: '20%', delay: 0, color: 'text-primary-400' },
  { id: 2, icon: Star, x: '85%', y: '15%', delay: 1000, color: 'text-accent-400' },
  { id: 3, icon: Award, x: '15%', y: '70%', delay: 2000, color: 'text-primary-300' },
  { id: 4, icon: Sparkles, x: '80%', y: '75%', delay: 1500, color: 'text-accent-300' },
];

const trustStats = [
  { value: '50,000+', label: 'Trusted Users', icon: Users },
  { value: '96%', label: 'Accuracy Rate', icon: Award },
  { value: '15 min', label: 'Complete Test', icon: Zap },
];

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
      {/* Enhanced Aurora dynamic background effects */}
      <div className="absolute inset-0">
        {/* Enhanced base gradient overlay with Aurora colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-900/60 via-primary-500/5 to-accent-500/3" />
        
        {/* Enhanced interactive Aurora ambient light effects */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-primary-500/30 via-primary-500/15 to-transparent rounded-full blur-3xl transition-all duration-1000 ease-out aurora-glow"
          style={{
            left: `${15 + mousePosition.x * 30}%`,
            top: `${20 + mousePosition.y * 20}%`,
            transform: `translate(-50%, -50%) scale(${1 + mousePosition.x * 0.2})`,
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-radial from-accent-500/25 via-accent-500/12 to-transparent rounded-full blur-3xl transition-all duration-1500 ease-out"
          style={{
            right: `${20 + mousePosition.x * 25}%`,
            bottom: `${25 + mousePosition.y * 25}%`,
            transform: `translate(50%, 50%) scale(${1 + mousePosition.y * 0.3})`,
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-radial from-secondary-500/15 via-secondary-500/8 to-transparent rounded-full blur-3xl transition-all duration-2000 ease-out animate-pulse-soft"
          style={{
            left: `${60 + mousePosition.y * 20}%`,
            top: `${60 + mousePosition.x * 15}%`,
            transform: `translate(-50%, -50%) scale(${1 + mousePosition.y * 0.25})`,
          }}
        />
        
        {/* Enhanced additional Aurora atmospheric elements */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-primary-600/15 via-primary-600/8 to-transparent rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-radial from-accent-600/12 via-accent-600/6 to-transparent rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/6 w-56 h-56 bg-gradient-radial from-secondary-600/10 via-secondary-600/5 to-transparent rounded-full blur-2xl animate-float-subtle" />
      </div>
      
      {/* Enhanced floating decorative elements */}
      {floatingElements.map((element) => {
        const IconComponent = element.icon;
        return (
          <div
            key={element.id}
            className={`absolute transition-all duration-700 ease-out hover:scale-125 ${element.color} opacity-60 hover:opacity-100`}
            style={{
              left: element.x,
              top: element.y,
              animationDelay: `${element.delay}ms`,
              transform: `translate(-50%, -50%) rotate(${mousePosition.x * 360}deg)`,
            }}
          >
            <IconComponent 
              size={24} 
              className="animate-pulse drop-shadow-lg" 
              style={{
                animationDuration: `${3 + Math.random() * 2}s`,
                filter: 'drop-shadow(0 0 8px currentColor)',
              }}
            />
          </div>
        );
      })}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Main content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center space-x-3 bg-surface-800/40 backdrop-blur-lg border border-primary-500/20 rounded-2xl px-6 py-3 mb-2 fade-in group hover:border-primary-500/40 transition-all duration-300">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-primary-400 animate-pulse" />
                <div className="absolute inset-0 w-5 h-5 text-primary-400 animate-ping opacity-30"></div>
              </div>
              <span className="text-sm font-medium text-surface-200 tracking-wide">AI-Powered Psychological Analysis</span>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Enhanced Main heading with Aurora gradient */}
            <div className="space-y-2">
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 fade-in leading-tight" style={{ animationDelay: '200ms' }}>
                Discover Your
                <span className="block bg-gradient-to-r from-primary-400 via-secondary-400 via-accent-400 to-primary-300 bg-clip-text text-transparent animate-shimmer bg-300% leading-tight drop-shadow-[0_0_20px_rgba(155,127,255,0.3)]">
                  Intimate Universe
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mx-auto lg:mx-0 fade-in animate-shimmer bg-200%" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl sm:text-2xl text-surface-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed fade-in font-light" style={{ animationDelay: '400ms' }}>
              Embark on a journey of self-discovery with our{' '}
              <span className="text-primary-300 font-medium">scientifically-validated</span>{' '}
              personality analysis. Understand your deepest desires in a{' '}
              <span className="text-accent-300 font-medium">completely private</span> environment.
            </p>
            
            {/* Enhanced Aurora CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12 fade-in" style={{ animationDelay: '600ms' }}>
              <Link href="/test" className="aurora-button group inline-flex items-center justify-center text-lg px-10 py-4 text-white shadow-glow-primary-lg transform hover:scale-105 relative overflow-hidden">
                <span className="relative z-10 mr-3 font-medium">Start Your Journey</span>
                <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer bg-200%"></div>
              </Link>
              <button className="btn-glass group inline-flex items-center justify-center text-lg px-8 py-4 hover:shadow-glow-accent">
                <Play className="w-5 h-5 mr-3 group-hover:scale-125 transition-all duration-300 text-accent-400" />
                <span className="text-surface-200 group-hover:text-white transition-colors">Watch Demo</span>
              </button>
            </div>
            
            {/* Enhanced Trust indicators with stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 fade-in" style={{ animationDelay: '800ms' }}>
              {trustStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="stat-card group">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <IconComponent className="w-4 h-4 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                      <div className="stat-value text-lg">{stat.value}</div>
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                );
              })}
            </div>
            
            {/* Privacy & Security badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 fade-in" style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center space-x-2 bg-surface-800/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-surface-700/30">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm text-surface-300">100% Anonymous</span>
              </div>
              <div className="flex items-center space-x-2 bg-surface-800/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-surface-700/30">
                <Brain className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-surface-300">Science-Based</span>
              </div>
              <div className="flex items-center space-x-2 bg-surface-800/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-surface-700/30">
                <Award className="w-4 h-4 text-accent-400" />
                <span className="text-sm text-surface-300">Expert Validated</span>
              </div>
            </div>
          </div>
          
          {/* Right column - Enhanced Interactive preview */}
          <div className="relative fade-in lg:pl-8" style={{ animationDelay: '1000ms' }}>
            {/* Main preview card */}
            <div className="card-modern relative overflow-hidden group">
              {/* Ambient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Mock test preview */}
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-semibold text-white">Live Test Preview</h3>
                  </div>
                  <div className="bg-surface-700/50 rounded-lg px-3 py-1">
                    <div className="text-sm text-surface-300">Question 1/80</div>
                  </div>
                </div>
                
                {/* Question section */}
                <div className="space-y-5">
                  <div className="relative">
                    <p className="text-lg text-surface-200 leading-relaxed mb-1">
                      In intimate relationships, you tend to:
                    </p>
                    <div className="text-sm text-surface-400 italic">
                      Choose the response that feels most authentic to you
                    </div>
                  </div>
                  
                  {/* Enhanced answer options */}
                  <div className="space-y-3">
                    {[
                      { text: 'Lead and guide your partner', selected: true },
                      { text: 'Follow your partner\'s lead', selected: false },
                      { text: 'Share control equally', selected: false },
                      { text: 'Adapt flexibly to the situation', selected: false }
                    ].map((option, index) => (
                      <div
                        key={index}
                        className={`quiz-option group cursor-pointer relative overflow-hidden ${option.selected ? 'selected' : ''}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`relative flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                            option.selected 
                              ? 'border-primary-400 bg-primary-400/20' 
                              : 'border-surface-500 group-hover:border-primary-400'
                          }`}>
                            {option.selected && (
                              <div className="absolute inset-1 bg-primary-400 rounded-full animate-scale-in"></div>
                            )}
                          </div>
                          <span className={`transition-colors duration-300 ${
                            option.selected 
                              ? 'text-white font-medium' 
                              : 'text-surface-300 group-hover:text-white'
                          }`}>
                            {option.text}
                          </span>
                        </div>
                        {option.selected && (
                          <div className="absolute inset-0 bg-primary-500/5 -z-10"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced progress section */}
                <div className="pt-6 border-t border-surface-700/50 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-400">Test Progress</span>
                    <span className="text-primary-400 font-medium">1.25%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill w-1/80 shadow-glow-primary"></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-surface-500">
                    <span>~14 minutes remaining</span>
                    <span className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse"></div>
                      <span>Auto-saved</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced floating stats */}
            <div className="absolute -top-6 -right-6 stat-card bg-primary-500/10 border-primary-500/30 backdrop-blur-lg animate-float">
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="w-4 h-4 text-primary-400" />
                <div className="stat-value">15 min</div>
              </div>
              <div className="stat-label">Average Time</div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 stat-card bg-accent-500/10 border-accent-500/30 backdrop-blur-lg animate-float-delayed">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-accent-400" />
                <div className="text-xl font-bold text-accent-400">50K+</div>
              </div>
              <div className="stat-label">Users Analyzed</div>
            </div>

            {/* Additional floating badge */}
            <div className="absolute top-1/3 -left-8 bg-surface-800/80 backdrop-blur-sm rounded-full p-3 border border-success/30 animate-pulse hidden lg:block">
              <Shield className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce fade-in" style={{ animationDelay: '2000ms' }}>
        <div className="flex flex-col items-center space-y-3 group cursor-pointer hover:scale-110 transition-transform duration-300">
          <div className="relative w-8 h-12 border-2 border-surface-500/50 rounded-full flex justify-center overflow-hidden group-hover:border-primary-400/70 transition-colors duration-300">
            <div className="w-1 h-4 bg-gradient-to-b from-primary-400 via-primary-300 to-transparent rounded-full mt-2 animate-pulse group-hover:animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-surface-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-surface-400 group-hover:text-surface-300 transition-colors duration-300 font-medium tracking-wide">Explore More</p>
            <div className="w-1 h-1 bg-surface-500 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default export for compatibility
export default HeroSection;