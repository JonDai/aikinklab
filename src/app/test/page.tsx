'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

// Mock test questions - in a real app, these would come from an API
const testQuestions = [
  {
    id: 1,
    question: 'In an intimate relationship, you are more inclined to:',
    options: [
      { id: 'a', text: 'Lead and guide your partner', value: 'dominant' },
      { id: 'b', text: 'Follow your partner\'s lead', value: 'submissive' },
      { id: 'c', text: 'Adjust flexibly according to the situation', value: 'switch' },
      { id: 'd', text: 'Maintain equal interaction', value: 'vanilla' },
    ],
  },
  {
    id: 2,
    question: 'When faced with new experiences, your reaction is usually:',
    options: [
      { id: 'a', text: 'Excitedly and proactively try', value: 'adventurous' },
      { id: 'b', text: 'Cautiously observe and learn', value: 'cautious' },
      { id: 'c', text: 'Need your partner\'s encouragement', value: 'guided' },
      { id: 'd', text: 'Tend to avoid risks', value: 'conservative' },
    ],
  },
  {
    id: 3,
    question: 'When setting boundaries, what do you consider most important?',
    options: [
      { id: 'a', text: 'Clearly expressing your own needs', value: 'assertive' },
      { id: 'b', text: 'Respecting the other person\'s feelings', value: 'empathetic' },
      { id: 'c', text: 'Finding a balance for both parties', value: 'balanced' },
      { id: 'd', text: 'Avoiding conflict and controversy', value: 'harmonious' },
    ],
  },
  {
    id: 4,
    question: 'What is your view on power exchange?',
    options: [
      { id: 'a', text: 'It is a deep expression of trust', value: 'trust-based' },
      { id: 'b', text: 'It is a way to explore oneself', value: 'self-discovery' },
      { id: 'c', text: 'It requires caution and a gradual approach', value: 'gradual' },
      { id: 'd', text: 'This is not an area I am interested in', value: 'uninterested' },
    ],
  },
  {
    id: 5,
    question: 'In intimate interactions, what do you value most?',
    options: [
      { id: 'a', text: 'Deep emotional connection', value: 'emotional' },
      { id: 'b', text: 'Physical sensory experience', value: 'physical' },
      { id: 'c', text: 'Psychological stimulation and challenge', value: 'psychological' },
      { id: 'd', text: 'A sense of security and comfort', value: 'comfort' },
    ],
  },
];

export default function TestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [testQuestions[currentQuestion].id]: selectedOption
    }));
    
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption('');
    } else {
      // Test completed
      setIsCompleted(true);
      // In a real app, you would send answers to API and get results
      setTimeout(() => {
        const resultId = generateResultId();
        router.push(`/results/${resultId}`);
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Load previous answer
      const prevAnswer = answers[testQuestions[currentQuestion - 1].id];
      setSelectedOption(prevAnswer || '');
    }
  };

  const generateResultId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-neon-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-neon-magenta" />
          </div>
          <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
            Test Complete!
          </h2>
          <p className="text-neutral-gray mb-6">
            We are analyzing your answers and will generate your personalized analysis report soon...
          </p>
          <div className="w-full bg-layered-charcoal rounded-full h-2">
            <div className="bg-neon-magenta h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  const question = testQuestions[currentQuestion];

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-neutral-gray">
              Question {currentQuestion + 1} / {testQuestions.length}
            </span>
            <span className="text-sm text-neutral-gray">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-layered-charcoal rounded-full h-2">
            <div 
              className="bg-neon-magenta h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-layered-charcoal border border-neutral-gray/20 rounded-2xl p-8 mb-8 fade-in">
          <h2 className="font-playfair text-2xl text-warm-off-white mb-8 text-center">
            {question.question}
          </h2>
          
          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full text-left quiz-option ${
                  selectedOption === option.id ? 'selected' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-4 flex-shrink-0 ${
                    selectedOption === option.id 
                      ? 'border-neon-magenta bg-neon-magenta' 
                      : 'border-neutral-gray'
                  }`}>
                    {selectedOption === option.id && (
                      <div className="w-2 h-2 bg-warm-off-white rounded-full m-auto mt-0.5" />
                    )}
                  </div>
                  <span className="text-warm-off-white">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-pill transition-all duration-200 ${
              currentQuestion === 0
                ? 'text-neutral-gray cursor-not-allowed'
                : 'text-warm-off-white hover:text-neon-magenta'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`flex items-center space-x-2 px-6 py-3 rounded-pill transition-all duration-200 ${
              !selectedOption
                ? 'bg-neutral-gray/20 text-neutral-gray cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            <span>{currentQuestion === testQuestions.length - 1 ? 'Complete Test' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-neutral-gray">
            Please answer each question honestly, as this will help us provide you with a more accurate analysis.
          </p>
        </div>
      </div>
    </div>
  );
}