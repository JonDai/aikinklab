'use client';

import { Brain, Sparkles, Zap, Target, Users } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'accent' | 'white';
}

export function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary-500/30 border-t-primary-500',
    accent: 'border-accent-500/30 border-t-accent-500',
    white: 'border-white/30 border-t-white'
  };

  return (
    <div 
      className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`}
      role="status"
      aria-label="Loading"
    />
  );
}

interface LoadingDotsProps {
  color?: 'primary' | 'accent' | 'white';
}

export function LoadingDots({ color = 'primary' }: LoadingDotsProps) {
  const colorClasses = {
    primary: 'bg-primary-400',
    accent: 'bg-accent-400',
    white: 'bg-white'
  };

  return (
    <div className="loading-dots" role="status" aria-label="Loading">
      <div className={`loading-dot ${colorClasses[color]}`} style={{ animationDelay: '0ms' }}></div>
      <div className={`loading-dot ${colorClasses[color]}`} style={{ animationDelay: '150ms' }}></div>
      <div className={`loading-dot ${colorClasses[color]}`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  animate?: boolean;
}

export function LoadingSkeleton({ className = '', animate = true }: LoadingSkeletonProps) {
  return (
    <div 
      className={`loading-skeleton ${animate ? 'animate-shimmer-slow' : ''} ${className}`}
      role="status" 
      aria-label="Loading content"
    />
  );
}

interface AnalysisLoadingProps {
  stage: 'processing' | 'analyzing' | 'generating' | 'complete';
  progress: number;
}

export function AnalysisLoading({ stage, progress }: AnalysisLoadingProps) {
  const stages = {
    processing: { icon: Brain, text: 'Processing responses', color: 'text-primary-400' },
    analyzing: { icon: Sparkles, text: 'Analyzing patterns', color: 'text-accent-400' },
    generating: { icon: Zap, text: 'Generating insights', color: 'text-primary-300' },
    complete: { icon: Target, text: 'Analysis complete', color: 'text-success' }
  };

  const currentStage = stages[stage];
  const IconComponent = currentStage.icon;

  return (
    <div className="bg-surface-800/20 backdrop-blur-xl border border-surface-700/30 rounded-3xl p-8 text-center animate-fade-in">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-surface-800/30 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
          <IconComponent className={`w-12 h-12 ${currentStage.color} animate-pulse relative z-10`} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/5 rounded-2xl animate-pulse"></div>
        </div>
        
        {/* Floating status indicators */}
        <div className="flex justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full animate-bounce ${currentStage.color.replace('text-', 'bg-')}`}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${currentStage.color.replace('text-', 'bg-')}`} style={{ animationDelay: '100ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${currentStage.color.replace('text-', 'bg-')}`} style={{ animationDelay: '200ms' }}></div>
        </div>
      </div>

      {/* Status text */}
      <div className="space-y-4 mb-8">
        <h3 className="font-playfair text-2xl text-white">
          {currentStage.text}
        </h3>
        <p className="text-surface-300 text-lg">
          Our AI is working on your personalized analysis...
        </p>
      </div>

      {/* Enhanced progress bar */}
      <div className="space-y-4">
        <div className="progress-modern h-4 bg-surface-800/50 backdrop-blur-sm">
          <div 
            className="progress-fill bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 shadow-glow-primary transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-surface-400">{Math.round(progress)}% Complete</span>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse"></div>
            <span className="text-surface-400">~{Math.ceil((100 - progress) * 0.15)} seconds remaining</span>
          </div>
        </div>
      </div>

      {/* Processing steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className={`flex items-center space-x-2 p-3 rounded-xl ${stage === 'processing' || stage === 'analyzing' || stage === 'generating' || stage === 'complete' ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-surface-800/20'} transition-all duration-300`}>
          <div className={`w-2 h-2 rounded-full ${stage === 'processing' || stage === 'analyzing' || stage === 'generating' || stage === 'complete' ? 'bg-primary-400 animate-pulse' : 'bg-surface-500'}`}></div>
          <span className={`text-xs font-medium ${stage === 'processing' || stage === 'analyzing' || stage === 'generating' || stage === 'complete' ? 'text-primary-300' : 'text-surface-400'}`}>
            Validate Responses
          </span>
        </div>
        
        <div className={`flex items-center space-x-2 p-3 rounded-xl ${stage === 'analyzing' || stage === 'generating' || stage === 'complete' ? 'bg-accent-500/10 border border-accent-500/20' : 'bg-surface-800/20'} transition-all duration-300`}>
          <div className={`w-2 h-2 rounded-full ${stage === 'analyzing' || stage === 'generating' || stage === 'complete' ? 'bg-accent-400 animate-pulse' : 'bg-surface-500'}`}></div>
          <span className={`text-xs font-medium ${stage === 'analyzing' || stage === 'generating' || stage === 'complete' ? 'text-accent-300' : 'text-surface-400'}`}>
            Pattern Analysis
          </span>
        </div>
        
        <div className={`flex items-center space-x-2 p-3 rounded-xl ${stage === 'generating' || stage === 'complete' ? 'bg-success/10 border border-success/20' : 'bg-surface-800/20'} transition-all duration-300`}>
          <div className={`w-2 h-2 rounded-full ${stage === 'generating' || stage === 'complete' ? 'bg-success animate-pulse' : 'bg-surface-500'}`}></div>
          <span className={`text-xs font-medium ${stage === 'generating' || stage === 'complete' ? 'text-success' : 'text-surface-400'}`}>
            Generate Profile
          </span>
        </div>
      </div>
    </div>
  );
}

interface TestLoadingProps {
  message?: string;
  submessage?: string;
}

export function TestLoading({ message = "Preparing Your Test", submessage = "Setting up your personalized assessment..." }: TestLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Enhanced loading animation */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-pulse mx-auto"></div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 w-32 h-32 -m-6 mx-auto">
            <div className="absolute w-3 h-3 bg-accent-400 rounded-full animate-spin" 
                 style={{ 
                   left: '50%', 
                   top: '0%', 
                   transformOrigin: '1.5px 64px',
                   animationDuration: '3s'
                 }}>
            </div>
            <div className="absolute w-2 h-2 bg-primary-300 rounded-full animate-spin" 
                 style={{ 
                   left: '100%', 
                   top: '50%', 
                   transformOrigin: '-62px 1px',
                   animationDuration: '2s',
                   animationDelay: '1s'
                 }}>
            </div>
          </div>
        </div>
        
        {/* Status content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white font-playfair">
            {message}
          </h3>
          <p className="text-surface-400 max-w-md mx-auto">
            {submessage}
          </p>
        </div>
        
        {/* Loading steps indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
}