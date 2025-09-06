'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Share2, 
  Download, 
  BookOpen, 
  Heart, 
  Users, 
  Shield, 
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  Brain,
  Sparkles,
  Award,
  Eye,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { TestResults, KinkPersonalityType } from '@/data/kinkResults';

interface ResultsDisplayProps {
  results: TestResults;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const [shareText, setShareText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate anonymous share text
    const anonymousShare = `I just discovered I'm a ${results.personalityType.shortName}! Take the anonymous kink personality test at AIKinkLab to discover your profile. #KinkPersonality #SelfDiscovery`;
    setShareText(anonymousShare);
  }, [results]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Kink Personality: ${results.personalityType.name}`,
          text: shareText,
          url: window.location.origin
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const resultsData = {
      personalityType: results.personalityType.name,
      description: results.personalityType.description,
      traits: results.personalityType.traits,
      recommendations: results.recommendations,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kink-personality-${results.personalityType.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-primary-400';
    if (score >= 0.6) return 'text-accent-400';
    if (score >= 0.4) return 'text-white';
    return 'text-surface-400';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 0.8) return 'bg-gradient-to-r from-primary-500 to-primary-400';
    if (score >= 0.6) return 'bg-gradient-to-r from-accent-500 to-accent-400';
    if (score >= 0.4) return 'bg-gradient-to-r from-white to-surface-200';
    return 'bg-gradient-to-r from-surface-500 to-surface-400';
  };

  const getScoreWidth = (score: number) => {
    return `${Math.max(score * 100, 8)}%`;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Very High';
    if (score >= 0.6) return 'High';
    if (score >= 0.4) return 'Moderate';
    if (score >= 0.2) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
              <CheckCircle className="w-14 h-14 text-primary-400 animate-scale-in relative z-10" />
              <div className="absolute inset-0 bg-primary-500/30 rounded-full animate-ping"></div>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
              Your Personality
              <span className="block bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400 bg-clip-text text-transparent">
                Revealed
              </span>
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center space-x-3 bg-primary-500/10 backdrop-blur-sm border border-primary-500/30 rounded-2xl px-6 py-3">
                <Award className="w-5 h-5 text-primary-400" />
                <span className="text-primary-300 font-medium">
                  {Math.round(results.confidenceLevel * 100)}% Accuracy
                </span>
              </div>
              <div className="inline-flex items-center space-x-3 bg-accent-500/10 backdrop-blur-sm border border-accent-500/30 rounded-2xl px-6 py-3">
                <Brain className="w-5 h-5 text-accent-400" />
                <span className="text-accent-300 font-medium">
                  AI Analysis Complete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Result Card with Advanced Glassmorphism */}
        <div className="card-glass-intense relative group mb-12 animate-scale-bounce">
          {/* Enhanced ambient glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/12 via-transparent to-accent-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative text-center space-y-8">
            {/* Main personality type display */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-3 bg-surface-800/40 backdrop-blur-sm rounded-2xl px-6 py-3 border border-surface-700/50">
                <Sparkles className="w-5 h-5 text-primary-400 animate-pulse" />
                <span className="text-sm font-medium text-surface-300 uppercase tracking-wider">
                  Your Type
                </span>
              </div>
              
              <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
                {results.personalityType.name}
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="inline-flex items-center space-x-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/30 rounded-xl px-4 py-2">
                  <BarChart3 className="w-4 h-4 text-accent-400" />
                  <span className="text-accent-300 text-sm font-medium">
                    {results.personalityType.prevalence}% of population
                  </span>
                </div>
                <div className="inline-flex items-center space-x-2 bg-primary-500/10 backdrop-blur-sm border border-primary-500/30 rounded-xl px-4 py-2">
                  <Target className="w-4 h-4 text-primary-400" />
                  <span className="text-primary-300 text-sm font-medium">
                    {results.personalityType.shortName}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enhanced description */}
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-surface-200 leading-relaxed font-light">
                {results.personalityType.description}
              </p>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleShare}
                className="btn-secondary group flex items-center space-x-3"
              >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{copied ? 'Copied!' : 'Share Results'}</span>
                {copied && <CheckCircle className="w-4 h-4 text-success animate-scale-in" />}
              </button>
              
              <button
                onClick={handleDownload}
                className="btn-accent group flex items-center space-x-3"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Analysis</span>
              </button>
              
              <button
                onClick={() => setShowFullAnalysis(!showFullAnalysis)}
                className="btn-ghost group flex items-center space-x-3"
              >
                <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{showFullAnalysis ? 'Hide' : 'Show'} Full Analysis</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${showFullAnalysis ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Personality Analysis with Modern Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Enhanced Personality Scores with Data Visualization */}
          <div className="card-glass-intense space-y-8 animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary-500/20 animate-pulse-soft">
                <TrendingUp className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-playfair text-2xl text-white mb-1">
                  Personality Scores
                </h3>
                <p className="text-sm text-surface-400">AI-powered personality analysis</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {Object.entries(results.scores).map(([trait, score], index) => (
                <div key={trait} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${score >= 0.8 ? 'bg-primary-400' : score >= 0.6 ? 'bg-accent-400' : 'bg-surface-400'} animate-pulse`}></div>
                      <span className="text-surface-200 capitalize font-medium text-lg">
                        {trait.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-3 py-1.5 rounded-xl bg-surface-800/40 backdrop-blur-sm border ${getScoreColor(score)} font-medium`}>
                        {getScoreLabel(score)}
                      </span>
                      <span className={`text-lg font-bold w-14 text-right ${getScoreColor(score)}`}>
                        {Math.round(score * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-surface-800/50 rounded-full h-4 overflow-hidden backdrop-blur-sm shadow-inner">
                      <div
                        className={`h-4 rounded-full transition-all duration-1500 ease-out ${getScoreBarColor(score)} shadow-lg relative overflow-hidden`}
                        style={{ width: getScoreWidth(score) }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    </div>
                    {score >= 0.8 && (
                      <div className="absolute -right-1 -top-1 animate-bounce">
                        <div className="relative">
                          <Star className="w-5 h-5 text-primary-400" fill="currentColor" />
                          <div className="absolute inset-0 w-5 h-5 bg-primary-400 rounded-full animate-ping opacity-20"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-surface-500">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Key Traits with Modern Design */}
          <div className="card-glass-intense space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-500/20 to-accent-600/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-accent-500/20 animate-pulse-soft">
                <Star className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <h3 className="font-playfair text-2xl text-white mb-1">
                  Key Traits
                </h3>
                <p className="text-sm text-surface-400">Your dominant characteristics</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {results.personalityType.traits.slice(0, 8).map((trait, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-surface-800/20 backdrop-blur-sm border border-surface-700/30 hover:bg-surface-800/40 hover:border-accent-500/30 transition-all duration-400 group animate-fade-in-up interactive-hover"
                  style={{ animationDelay: `${(index * 100) + 300}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <span className="text-surface-200 group-hover:text-white transition-colors duration-300 font-medium flex-1">
                    {trait}
                  </span>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <CheckCircle className="w-5 h-5 text-accent-400 animate-scale-in" />
                    <div className="w-1 h-1 bg-accent-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {results.personalityType.traits.length > 8 && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => setShowFullAnalysis(true)}
                  className="text-sm text-surface-400 hover:text-primary-400 transition-colors duration-300 flex items-center space-x-2 mx-auto"
                >
                  <span>View {results.personalityType.traits.length - 8} more traits</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Compatibility Section */}
        <div className="card-glass-intense mb-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary-500/20">
              <Heart className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h3 className="font-playfair text-2xl text-white mb-1">
                Compatibility & Relationships
              </h3>
              <p className="text-sm text-surface-400">Find your ideal connections</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.personalityType.compatibility.map((match, index) => (
              <div key={index} className="bg-warm-charcoal/30 border border-neon-magenta/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-neon-magenta" />
                  <span className="text-warm-off-white font-medium text-sm">
                    {match.split(' - ')[0]}
                  </span>
                </div>
                <p className="text-neutral-gray text-xs">
                  {match.split(' - ')[1]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-layered-charcoal/50 border border-neutral-gray/20 rounded-2xl p-6">
            <h3 className="font-playfair text-xl text-warm-off-white mb-6 flex items-center">
              <BookOpen className="w-5 h-5 text-matte-gold mr-2" />
              Exploration Suggestions
            </h3>
            <div className="space-y-3">
              {results.personalityType.explorationSuggestions.slice(0, 6).map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <ArrowRight className="w-4 h-4 text-matte-gold mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-gray text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-glass-intense animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary-500/20">
                <Shield className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-playfair text-2xl text-white mb-1">
                  Safety & Communication
                </h3>
                <p className="text-sm text-surface-400">Essential guidelines for exploration</p>
              </div>
            </div>
            <div className="space-y-3">
              {results.personalityType.safetyConcerns.slice(0, 4).map((concern, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <AlertTriangle className="w-4 h-4 text-neon-magenta mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-gray text-sm">{concern}</span>
                </div>
              ))}
              {results.personalityType.communicationTips.slice(0, 2).map((tip, index) => (
                <div key={index + 100} className="flex items-start space-x-3">
                  <MessageCircle className="w-4 h-4 text-matte-gold mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-gray text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Analysis (Expandable) */}
        {showFullAnalysis && (
          <div className="bg-layered-charcoal/50 border border-neutral-gray/20 rounded-2xl p-8 mb-8 animate-fadeIn">
            <h3 className="font-playfair text-2xl text-warm-off-white mb-8 text-center">
              Detailed Personality Analysis
            </h3>
            
            <div className="prose prose-invert max-w-none">
              <div className="mb-8">
                <h4 className="text-xl text-neon-magenta mb-4">Full Description</h4>
                <p className="text-neutral-gray leading-relaxed">
                  {results.personalityType.detailedDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl text-matte-gold mb-4">Strengths</h4>
                  <ul className="space-y-2">
                    {results.personalityType.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-matte-gold mt-1 flex-shrink-0" />
                        <span className="text-neutral-gray text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl text-neon-magenta mb-4">Growth Areas</h4>
                  <ul className="space-y-2">
                    {results.personalityType.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-neon-magenta mt-1 flex-shrink-0" />
                        <span className="text-neutral-gray text-sm">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-neon-magenta/10 to-matte-gold/10 border border-neon-magenta/20 rounded-2xl p-8 text-center">
          <h3 className="font-playfair text-2xl text-warm-off-white mb-4">
            Continue Your Journey
          </h3>
          <p className="text-neutral-gray mb-6 max-w-2xl mx-auto">
            Your personality profile is just the beginning. Explore our educational resources, 
            connect with the community, and continue learning about yourself.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/lab"
              className="flex items-center space-x-2 px-6 py-3 bg-neon-magenta text-warm-off-white rounded-full hover:bg-neon-magenta/90 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Educational Content</span>
            </Link>
            
            <Link
              href="/test"
              className="flex items-center space-x-2 px-6 py-3 bg-matte-gold/20 border border-matte-gold text-matte-gold rounded-full hover:bg-matte-gold/30 transition-colors"
            >
              <span>Take Another Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-8 max-w-3xl mx-auto">
          <p className="text-xs text-neutral-gray leading-relaxed">
            <strong>Important:</strong> This test is for educational and self-discovery purposes only. 
            It is not a substitute for professional counseling or medical advice. Always prioritize 
            consent, communication, and safety in all intimate activities. Your results are completely 
            anonymous and are not stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}

// Default export for compatibility
export default ResultsDisplay;