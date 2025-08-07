'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Download, Lock, Star, ArrowRight, RefreshCw } from 'lucide-react';

// Mock result data - in a real app, this would come from an API based on the ID
const mockResult = {
  id: 'abc123',
  primaryType: 'Switch',
  secondaryType: 'Rope Enthusiast',
  compatibility: 85,
  traits: [
    { name: 'Adaptability', score: 92, description: 'You can flexibly adapt to different roles and situations.' },
    { name: 'Communication', score: 88, description: 'You are good at expressing your needs and listening to your partner.' },
    { name: 'Curiosity', score: 76, description: 'You are open and curious about new experiences.' },
    { name: 'Emotional Depth', score: 84, description: 'You value emotional connection and psychological interaction.' },
  ],
  freeInsights: [
    'You exhibit balanced personality traits, able to both lead and follow.',
    'You are open to new experiences, but you carefully assess risks.',
    'Communication and trust are extremely important to you.',
  ],
  lockedContent: {
    detailedAnalysis: true,
    compatibilityGuide: true,
    personalGrowthPlan: true,
    relationshipAdvice: true,
  },
};

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [showPaywall, setShowPaywall] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My AiKinkLab Test Results',
          text: `I just completed the AiKinkLab personality test and discovered a lot of interesting insights about myself!`,
          url: window.location.href,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleUnlock = () => {
    setShowPaywall(true);
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-h1 text-warm-off-white mb-4">
            Your Personality Analysis Report
          </h1>
          <p className="text-lg text-neutral-gray">
            Personalized insights based on deep AI analysis
          </p>
        </div>

        {/* Primary Result */}
        <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-2xl p-8 mb-8 text-center">
          <div className="w-20 h-20 bg-neon-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-neon-magenta" />
          </div>
          
          <h2 className="font-playfair text-h2 text-warm-off-white mb-2">
            {mockResult.primaryType}
          </h2>
          
          <p className="text-lg text-neon-magenta mb-4">
            {mockResult.secondaryType}
          </p>
          
          <div className="bg-warm-charcoal rounded-card p-4 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-gray">Overall Compatibility</span>
              <span className="text-neon-magenta font-bold">{mockResult.compatibility}%</span>
            </div>
            <div className="w-full bg-layered-charcoal rounded-full h-2">
              <div 
                className="bg-neon-magenta h-2 rounded-full"
                style={{ width: `${mockResult.compatibility}%` }}
              />
            </div>
          </div>
        </div>

        {/* Traits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {mockResult.traits.map((trait, index) => (
            <div
              key={trait.name}
              className="bg-layered-charcoal border border-neutral-gray/20 rounded-card p-6 fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-warm-off-white">
                  {trait.name}
                </h3>
                <span className="text-neon-magenta font-bold">
                  {trait.score}%
                </span>
              </div>
              
              <div className="w-full bg-warm-charcoal rounded-full h-2 mb-3">
                <div 
                  className="bg-neon-magenta h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${trait.score}%` }}
                />
              </div>
              
              <p className="text-neutral-gray text-sm">
                {trait.description}
              </p>
            </div>
          ))}
        </div>

        {/* Free Insights */}
        <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-warm-off-white mb-6">
            Key Insights
          </h3>
          
          <div className="space-y-4">
            {mockResult.freeInsights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-neon-magenta rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-neutral-gray">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Content Preview */}
        <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-layered-charcoal z-10" />
          
          <h3 className="text-xl font-semibold text-warm-off-white mb-6">
            Unlock Full Analysis Report
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 opacity-50">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-neutral-gray" />
              <span className="text-neutral-gray">Detailed Personality Analysis (5000 words)</span>
            </div>
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-neutral-gray" />
              <span className="text-neutral-gray">Compatibility Guide</span>
            </div>
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-neutral-gray" />
              <span className="text-neutral-gray">Personal Growth Plan</span>
            </div>
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-neutral-gray" />
              <span className="text-neutral-gray">Relationship Advice</span>
            </div>
          </div>
          
          <div className="relative z-20">
            <button
              onClick={handleUnlock}
              className="btn-primary group"
            >
              Unlock Full Report - ¥29
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="btn-secondary flex items-center space-x-2"
          >
            {isSharing ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
            <span>Share Results</span>
          </button>
          
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <p className="text-neutral-gray mb-4">
            Want to understand yourself more deeply?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test" className="btn-secondary">
              Retake Test
            </Link>
            <Link href="/lab" className="btn-secondary">
              Read Related Articles
            </Link>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-warm-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-2xl p-8 max-w-md w-full">
            <h3 className="font-playfair text-2xl text-warm-off-white mb-4 text-center">
              Unlock Full Analysis
            </h3>
            
            <p className="text-neutral-gray mb-6 text-center">
              Get a detailed AI analysis report, including personalized advice and growth guidance.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-warm-off-white">Full Analysis Report</span>
                <span className="text-neon-magenta font-bold">¥29</span>
              </div>
              <div className="text-sm text-neutral-gray">
                • 5000-word detailed analysis<br/>
                • Personalized advice<br/>
                • Compatibility guide<br/>
                • Lifetime access
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPaywall(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button className="btn-primary flex-1">
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}