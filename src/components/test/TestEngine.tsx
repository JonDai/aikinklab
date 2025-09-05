'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Save, Play } from 'lucide-react';
import { kinkTestQuestions, TestQuestion } from '@/data/kinkTest';
import { calculateKinkPersonality } from '@/data/kinkResults';

interface TestEngineProps {
  onComplete?: (results: any) => void;
  showPreview?: boolean;
}

interface TestResponse {
  questionId: string;
  answer: string | number;
  timestamp: Date;
  responseTime: number;
}

interface TestSession {
  id: string;
  startTime: Date;
  currentQuestionIndex: number;
  responses: TestResponse[];
  lastSaved: Date;
  completed: boolean;
}

export function TestEngine({ onComplete, showPreview = false }: TestEngineProps) {
  const router = useRouter();
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [showResults, setShowResults] = useState(false);

  // Initialize test session
  useEffect(() => {
    const savedSession = localStorage.getItem('kink-test-session');
    if (savedSession) {
      const parsedSession: TestSession = JSON.parse(savedSession);
      setSession(parsedSession);
      setCurrentQuestionIndex(parsedSession.currentQuestionIndex);
      
      // Load previous answer if exists
      const currentResponse = parsedSession.responses.find(
        r => r.questionId === kinkTestQuestions[parsedSession.currentQuestionIndex]?.id
      );
      if (currentResponse) {
        setSelectedAnswer(currentResponse.answer);
      }
    } else {
      // Create new session
      const newSession: TestSession = {
        id: generateSessionId(),
        startTime: new Date(),
        currentQuestionIndex: 0,
        responses: [],
        lastSaved: new Date(),
        completed: false
      };
      setSession(newSession);
      localStorage.setItem('kink-test-session', JSON.stringify(newSession));
    }
    setQuestionStartTime(new Date());
  }, []);

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  };

  const saveProgress = useCallback(() => {
    if (session) {
      const updatedSession = { ...session, lastSaved: new Date() };
      setSession(updatedSession);
      localStorage.setItem('kink-test-session', JSON.stringify(updatedSession));
    }
  }, [session]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(saveProgress, 30000);
    return () => clearInterval(interval);
  }, [saveProgress]);

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    if (!selectedAnswer || !session) return;

    setIsLoading(true);

    const currentQuestion = kinkTestQuestions[currentQuestionIndex];
    const responseTime = Date.now() - questionStartTime.getTime();

    const newResponse: TestResponse = {
      questionId: currentQuestion.id,
      answer: selectedAnswer,
      timestamp: new Date(),
      responseTime
    };

    // Update responses
    const updatedResponses = session.responses.filter(r => r.questionId !== currentQuestion.id);
    updatedResponses.push(newResponse);

    const updatedSession: TestSession = {
      ...session,
      responses: updatedResponses,
      currentQuestionIndex: currentQuestionIndex + 1,
      lastSaved: new Date()
    };

    if (currentQuestionIndex >= kinkTestQuestions.length - 1) {
      // Test completed
      updatedSession.completed = true;
      setSession(updatedSession);
      localStorage.setItem('kink-test-session', JSON.stringify(updatedSession));
      
      // Calculate results
      const responses = updatedResponses.reduce((acc, response) => {
        acc[response.questionId] = response.answer;
        return acc;
      }, {} as Record<string, any>);

      const results = calculateKinkPersonality(responses);
      
      if (onComplete) {
        onComplete(results);
      } else {
        // Navigate to results page
        const resultId = generateSessionId();
        localStorage.setItem(`result_${resultId}`, JSON.stringify({
          results,
          session: updatedSession,
          timestamp: new Date()
        }));
        
        router.push(`/results/${resultId}`);
      }
    } else {
      // Move to next question
      setSession(updatedSession);
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setQuestionStartTime(new Date());
      localStorage.setItem('kink-test-session', JSON.stringify(updatedSession));
    }

    setIsLoading(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0 && session) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      
      // Load previous answer
      const previousResponse = session.responses.find(
        r => r.questionId === kinkTestQuestions[newIndex].id
      );
      setSelectedAnswer(previousResponse?.answer || '');
      
      const updatedSession = { ...session, currentQuestionIndex: newIndex };
      setSession(updatedSession);
      localStorage.setItem('kink-test-session', JSON.stringify(updatedSession));
    }
  };

  if (!session || !kinkTestQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-magenta"></div>
      </div>
    );
  }

  const currentQuestion = kinkTestQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / kinkTestQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex >= kinkTestQuestions.length - 1;

  if (showResults || session.completed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-neon-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-neon-magenta animate-pulse" />
          </div>
          <h2 className="font-playfair text-h2 text-warm-off-white mb-4">
            Analysis Complete!
          </h2>
          <p className="text-neutral-gray mb-6">
            Our AI is analyzing your {session.responses.length} responses to create your comprehensive personality profile...
          </p>
          <div className="w-full bg-layered-charcoal rounded-full h-3 mb-4">
            <div className="bg-gradient-to-r from-neon-magenta to-matte-gold h-3 rounded-full animate-pulse" style={{ width: '100%' }} />
          </div>
          <p className="text-sm text-neutral-gray">
            This usually takes 10-15 seconds for optimal accuracy
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-gray">
                Question {currentQuestionIndex + 1} of {kinkTestQuestions.length}
              </span>
              <button
                onClick={saveProgress}
                className="flex items-center space-x-1 text-xs text-neutral-gray hover:text-warm-off-white transition-colors"
              >
                <Save className="w-3 h-3" />
                <span>Auto-saved</span>
              </button>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-gray mb-1">
                {Math.round(progress)}% Complete
              </div>
              <div className="text-xs text-matte-gold">
                ~{Math.ceil((kinkTestQuestions.length - currentQuestionIndex - 1) * 0.5)} min remaining
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="w-full bg-layered-charcoal rounded-full h-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-neon-magenta to-matte-gold h-3 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-neon-magenta/10 border border-neon-magenta/20">
              <div className="w-2 h-2 bg-neon-magenta rounded-full mr-2"></div>
              <span className="text-xs text-neon-magenta capitalize">
                {currentQuestion.category.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-layered-charcoal to-warm-charcoal border border-neutral-gray/20 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl backdrop-blur-sm">
          {/* Question Header */}
          <div className="text-center mb-8">
            <h2 className="font-playfair text-2xl md:text-3xl text-warm-off-white mb-4 leading-relaxed">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-neutral-gray text-sm md:text-base max-w-2xl mx-auto">
                {currentQuestion.description}
              </p>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options?.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group hover:scale-[1.02] ${
                  selectedAnswer === option.id
                    ? 'border-neon-magenta bg-neon-magenta/10 shadow-lg shadow-neon-magenta/20'
                    : 'border-neutral-gray/30 bg-layered-charcoal/50 hover:border-neon-magenta/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 mt-1 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                    selectedAnswer === option.id
                      ? 'border-neon-magenta bg-neon-magenta'
                      : 'border-neutral-gray group-hover:border-neon-magenta/50'
                  }`}>
                    {selectedAnswer === option.id && (
                      <div className="w-2 h-2 bg-warm-off-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-warm-off-white text-lg mb-1">
                      {option.text}
                    </div>
                    {option.description && (
                      <div className="text-neutral-gray text-sm">
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {currentQuestion.type === 'scale' && currentQuestion.scaleConfig && (
              <div className="py-8">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-neutral-gray">{currentQuestion.scaleConfig.minLabel}</span>
                  <span className="text-sm text-neutral-gray">{currentQuestion.scaleConfig.maxLabel}</span>
                </div>
                <div className="flex justify-center space-x-4">
                  {Array.from({ length: currentQuestion.scaleConfig.max - currentQuestion.scaleConfig.min + 1 }, (_, i) => {
                    const value = currentQuestion.scaleConfig!.min + i;
                    return (
                      <button
                        key={value}
                        onClick={() => handleAnswerSelect(value)}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                          selectedAnswer === value
                            ? 'border-neon-magenta bg-neon-magenta text-warm-off-white'
                            : 'border-neutral-gray text-neutral-gray hover:border-neon-magenta/50 hover:text-warm-off-white'
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentQuestion.type === 'binary' && currentQuestion.options?.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-[1.02] ${
                  selectedAnswer === option.id
                    ? 'border-neon-magenta bg-neon-magenta/10 shadow-lg shadow-neon-magenta/20'
                    : 'border-neutral-gray/30 bg-layered-charcoal/50 hover:border-neon-magenta/50'
                }`}
              >
                <div className="text-warm-off-white text-lg mb-2">{option.text}</div>
                {option.description && (
                  <div className="text-neutral-gray text-sm">{option.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              currentQuestionIndex === 0
                ? 'text-neutral-gray/50 cursor-not-allowed'
                : 'text-warm-off-white hover:text-neon-magenta hover:bg-neon-magenta/10'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={saveProgress}
              className="px-4 py-2 text-sm text-neutral-gray hover:text-warm-off-white transition-colors"
            >
              Save Progress
            </button>
            
            <button
              onClick={handleNext}
              disabled={!selectedAnswer || isLoading}
              className={`flex items-center space-x-2 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 ${
                !selectedAnswer || isLoading
                  ? 'bg-neutral-gray/20 text-neutral-gray cursor-not-allowed'
                  : 'bg-gradient-to-r from-neon-magenta to-matte-gold text-warm-off-white hover:shadow-lg hover:shadow-neon-magenta/20 hover:scale-105'
              }`}
            >
              <span>
                {isLoading 
                  ? 'Processing...' 
                  : isLastQuestion 
                    ? 'Complete Test' 
                    : 'Next Question'
                }
              </span>
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-warm-off-white"></div>
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8 max-w-2xl mx-auto">
          <p className="text-sm text-neutral-gray leading-relaxed">
            Your responses are completely anonymous and encrypted. Answer honestly for the most accurate analysis. 
            You can save your progress and return anytime.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-neutral-gray">
            <span>🔒 100% Anonymous</span>
            <span>💾 Auto-saved</span>
            <span>🧠 AI-Powered Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}