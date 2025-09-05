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
  MessageCircle
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
    if (score >= 0.8) return 'text-neon-magenta';
    if (score >= 0.6) return 'text-matte-gold';
    if (score >= 0.4) return 'text-warm-off-white';
    return 'text-neutral-gray';
  };

  const getScoreWidth = (score: number) => {
    return `${Math.max(score * 100, 5)}%`;
  };

  return (
    <div className="min-h-screen py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-neon-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-neon-magenta" />
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl text-warm-off-white mb-4">
            Your Kink Personality
          </h1>
          <div className="inline-flex items-center px-4 py-2 bg-neon-magenta/10 border border-neon-magenta/20 rounded-full">
            <Star className="w-4 h-4 text-neon-magenta mr-2" />
            <span className="text-neon-magenta font-medium">
              {Math.round(results.confidenceLevel * 100)}% Confidence
            </span>
          </div>
        </div>

        {/* Main Result Card */}
        <div className="bg-gradient-to-br from-layered-charcoal to-warm-charcoal border border-neutral-gray/20 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-off-white mb-4">
              {results.personalityType.name}
            </h2>
            <div className="inline-flex items-center px-4 py-2 bg-matte-gold/10 border border-matte-gold/20 rounded-full mb-6">
              <span className="text-matte-gold text-sm font-medium">
                Found in {results.personalityType.prevalence}% of population
              </span>
            </div>
            <p className="text-lg md:text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">
              {results.personalityType.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-6 py-3 bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta rounded-full hover:bg-neon-magenta/20 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Share Anonymously'}</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-6 py-3 bg-matte-gold/10 border border-matte-gold/20 text-matte-gold rounded-full hover:bg-matte-gold/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Results</span>
            </button>
            
            <button
              onClick={() => setShowFullAnalysis(!showFullAnalysis)}
              className="flex items-center space-x-2 px-6 py-3 bg-warm-off-white/10 border border-warm-off-white/20 text-warm-off-white rounded-full hover:bg-warm-off-white/20 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Full Analysis</span>
            </button>
          </div>
        </div>

        {/* Personality Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-layered-charcoal/50 border border-neutral-gray/20 rounded-2xl p-6">
            <h3 className="font-playfair text-xl text-warm-off-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 text-neon-magenta mr-2" />
              Personality Scores
            </h3>
            <div className="space-y-4">
              {Object.entries(results.scores).map(([trait, score]) => (
                <div key={trait} className="flex items-center justify-between">
                  <span className="text-neutral-gray capitalize text-sm">
                    {trait.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex items-center space-x-3 flex-1 ml-4">
                    <div className="flex-1 bg-warm-charcoal rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          score >= 0.8 ? 'bg-neon-magenta' :
                          score >= 0.6 ? 'bg-matte-gold' :
                          score >= 0.4 ? 'bg-warm-off-white' : 'bg-neutral-gray'
                        }`}
                        style={{ width: getScoreWidth(score) }}
                      />
                    </div>
                    <span className={`text-xs w-8 text-right ${getScoreColor(score)}`}>
                      {Math.round(score * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Traits */}
          <div className="bg-layered-charcoal/50 border border-neutral-gray/20 rounded-2xl p-6">
            <h3 className="font-playfair text-xl text-warm-off-white mb-6 flex items-center">
              <Star className="w-5 h-5 text-matte-gold mr-2" />
              Key Traits
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {results.personalityType.traits.slice(0, 8).map((trait, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neon-magenta rounded-full flex-shrink-0"></div>
                  <span className="text-neutral-gray text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compatibility Section */}
        <div className="bg-layered-charcoal/50 border border-neutral-gray/20 rounded-2xl p-6 mb-8">
          <h3 className="font-playfair text-xl text-warm-off-white mb-6 flex items-center">
            <Heart className="w-5 h-5 text-neon-magenta mr-2" />
            Compatibility & Relationships
          </h3>
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

          <div className="bg-layered-charcoal/50 border border-neutral-gray/20 rounded-2xl p-6">
            <h3 className="font-playfair text-xl text-warm-off-white mb-6 flex items-center">
              <Shield className="w-5 h-5 text-neon-magenta mr-2" />
              Safety & Communication
            </h3>
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