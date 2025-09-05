'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { ResultsDisplay } from '@/components/results/ResultsDisplay';
import { kinkPersonalityTypes } from '@/data/kinkResults';
import type { TestResults } from '@/data/kinkResults';

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [results, setResults] = useState<TestResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load results from localStorage
    const loadResults = () => {
      try {
        const savedResults = localStorage.getItem(`result_${params.id}`);
        if (savedResults) {
          const parsedData = JSON.parse(savedResults);
          setResults(parsedData.results);
        } else {
          // Generate mock results for demo purposes
          const mockResults: TestResults = {
            personalityType: kinkPersonalityTypes[0], // Caring Dominant
            scores: {
              dominance: 0.75,
              submission: 0.35,
              sadism: 0.45,
              masochism: 0.25,
              switch: 0.60,
              vanilla: 0.30,
              rope: 0.55,
              degradation: 0.20,
              praise: 0.80,
              control: 0.70,
              service: 0.40,
              bratty: 0.15,
              caregiver: 0.85,
              pet: 0.25,
              exhibitionist: 0.35,
              voyeur: 0.40
            },
            secondaryTypes: [kinkPersonalityTypes[3]], // Versatile Switch
            confidenceLevel: 0.87,
            detailedAnalysis: {
              primaryTraits: [],
              powerDynamicsAnalysis: 'You show strong leadership tendencies balanced with caring nurturing instincts.',
              physicalPreferences: 'Moderate intensity with focus on emotional connection and trust-building.',
              psychologicalAspects: 'High emotional intelligence with strong empathy for partner needs.',
              communicationStyle: 'Direct but compassionate, excellent at both expressing needs and listening.',
              experienceLevel: 'Developing experience with strong foundational understanding.',
              relationshipStyle: 'Seeks deep, committed relationships with clear communication and mutual growth.'
            },
            recommendations: {
              educational: [
                'Explore books on ethical dominance and consent',
                'Learn about different types of aftercare',
                'Study communication techniques for power exchange'
              ],
              practical: [
                'Practice negotiation skills with partners',
                'Explore different forms of control and guidance',
                'Try various aftercare approaches'
              ],
              safety: [
                'Establish clear safewords and check-in protocols',
                'Learn to recognize signs of partner distress',
                'Practice emotional regulation techniques'
              ],
              communication: [
                'Express your caring nature clearly',
                'Ask for feedback on your dominant style',
                'Learn to receive vulnerability from others'
              ],
              exploration: [
                'Try different types of gentle dominance',
                'Explore service receiving dynamics',
                'Experiment with teaching and mentoring roles'
              ]
            },
            nextSteps: [
              'Read our comprehensive guide on caring dominance',
              'Connect with experienced community members',
              'Practice communication skills with partners',
              'Explore educational workshops and resources'
            ]
          };
          setResults(mockResults);
        }
      } catch (err) {
        setError('Failed to load test results');
        console.error('Error loading results:', err);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-magenta mb-4"></div>
          <p className="text-neutral-gray">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-playfair text-warm-off-white mb-4">
            Results Not Found
          </h1>
          <p className="text-neutral-gray mb-6">
            We couldn&apos;t find your test results. This might be because:
          </p>
          <ul className="text-neutral-gray text-left mb-6 space-y-2">
            <li>• The results have expired (results are stored for 30 days)</li>
            <li>• The link is incorrect or incomplete</li>
            <li>• Your browser data was cleared</li>
          </ul>
          <div className="space-y-4">
            <a
              href="/test"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Take the Test Again</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <ResultsDisplay results={results} />;
}