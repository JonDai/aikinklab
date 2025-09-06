'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MobileProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  title?: string;
  description?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onStepClick?: (step: number) => void;
  showStepNumbers?: boolean;
  variant?: 'linear' | 'circular' | 'mini';
  showNavigation?: boolean;
  isComplete?: boolean;
}

export function MobileProgressIndicator({
  currentStep,
  totalSteps,
  title,
  description,
  onPrevious,
  onNext,
  onStepClick,
  showStepNumbers = false,
  variant = 'linear',
  showNavigation = true,
  isComplete = false
}: MobileProgressIndicatorProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const progress = Math.min((currentStep / totalSteps) * 100, 100);
  const canGoBack = currentStep > 1 && onPrevious;
  const canGoNext = currentStep < totalSteps && onNext;

  // Handle swipe gestures
  const minSwipeDistance = 50;

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canGoNext) {
      onNext?.();
    }
    if (isRightSwipe && canGoBack) {
      onPrevious?.();
    }
  };

  if (variant === 'circular') {
    return <CircularProgress progress={progress} currentStep={currentStep} totalSteps={totalSteps} isComplete={isComplete} />;
  }

  if (variant === 'mini') {
    return <MiniProgress progress={progress} currentStep={currentStep} totalSteps={totalSteps} />;
  }

  return (
    <div className="bg-surface-900/95 backdrop-blur-xl border-b border-surface-700/40 sticky top-0 z-40 safe-area-pt">
      <div className="px-4 py-4">
        {/* Header with title */}
        {(title || description) && (
          <div className="mb-4 text-center">
            {title && (
              <h2 className="text-lg font-playfair font-bold text-aurora-white mb-1">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-surface-400">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Progress bar container */}
        <div 
          className="relative mb-4"
          onTouchStart={onTouchStartHandler}
          onTouchMove={onTouchMoveHandler}
          onTouchEnd={onTouchEndHandler}
        >
          {/* Background track */}
          <div className="h-2 bg-surface-800/50 rounded-full overflow-hidden">
            {/* Progress fill with Aurora gradient */}
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 via-accent-400 to-secondary-500 rounded-full relative"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-slow" 
                   style={{ backgroundSize: '200% 100%' }} />
            </motion.div>
          </div>

          {/* Step indicators */}
          {showStepNumbers && (
            <div className="flex justify-between mt-3">
              {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCurrentStep = stepNumber === currentStep;
                const isCompletedStep = stepNumber < currentStep || isComplete;
                
                return (
                  <motion.button
                    key={stepNumber}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 touch-target ${
                      isCurrentStep
                        ? 'bg-primary-500 text-white shadow-glow-primary scale-110'
                        : isCompletedStep
                        ? 'bg-success text-white'
                        : 'bg-surface-800/50 text-surface-400 hover:bg-surface-700/50'
                    }`}
                    onClick={() => onStepClick?.(stepNumber)}
                    whileTap={{ scale: 0.9 }}
                    disabled={!onStepClick}
                  >
                    <AnimatePresence mode="wait">
                      {isCompletedStep && stepNumber !== currentStep ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={14} />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="number"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {stepNumber}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step counter and navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Step counter */}
            <div className="text-sm">
              <span className="text-primary-400 font-bold">{currentStep}</span>
              <span className="text-surface-500"> / {totalSteps}</span>
            </div>

            {/* Progress percentage */}
            <div className="text-xs text-surface-400 bg-surface-800/30 px-2 py-1 rounded-full">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Navigation buttons */}
          {showNavigation && (
            <div className="flex items-center space-x-2">
              <motion.button
                className={`p-2 rounded-xl transition-all duration-300 touch-target ${
                  canGoBack
                    ? 'bg-surface-800/50 text-surface-300 hover:bg-surface-700/50 hover:text-aurora-white active:bg-surface-700/70'
                    : 'bg-surface-800/20 text-surface-600 cursor-not-allowed'
                }`}
                onClick={onPrevious}
                disabled={!canGoBack}
                whileTap={{ scale: canGoBack ? 0.9 : 1 }}
                whileHover={{ scale: canGoBack ? 1.05 : 1 }}
              >
                <ChevronLeft size={20} />
              </motion.button>

              <motion.button
                className={`p-2 rounded-xl transition-all duration-300 touch-target ${
                  canGoNext
                    ? 'bg-primary-500 text-white hover:bg-primary-400 shadow-glow-primary/50 active:bg-primary-600'
                    : 'bg-surface-800/20 text-surface-600 cursor-not-allowed'
                }`}
                onClick={onNext}
                disabled={!canGoNext}
                whileTap={{ scale: canGoNext ? 0.9 : 1 }}
                whileHover={{ scale: canGoNext ? 1.05 : 1 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Swipe hint */}
        {(canGoBack || canGoNext) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-3"
          >
            <p className="text-xs text-surface-500">
              Swipe left/right to navigate
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Circular progress variant
function CircularProgress({ 
  progress, 
  currentStep, 
  totalSteps, 
  isComplete 
}: { 
  progress: number; 
  currentStep: number; 
  totalSteps: number;
  isComplete: boolean;
}) {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-surface-800/50"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#progressGradient)"
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              strokeDasharray,
            }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(155, 127, 255)" />
              <stop offset="50%" stopColor="rgb(0, 212, 255)" />
              <stop offset="100%" stopColor="rgb(255, 107, 71)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {isComplete ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="text-success"
              >
                <Check size={24} />
              </motion.div>
            ) : (
              <>
                <div className="text-lg font-bold text-primary-400">{currentStep}</div>
                <div className="text-xs text-surface-500">/{totalSteps}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini progress variant
function MiniProgress({ 
  progress, 
  currentStep, 
  totalSteps 
}: { 
  progress: number; 
  currentStep: number; 
  totalSteps: number;
}) {
  return (
    <div className="flex items-center space-x-3 px-4 py-2">
      <div className="flex-1 h-1.5 bg-surface-800/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-surface-400 font-medium min-w-[3rem] text-right">
        {currentStep}/{totalSteps}
      </div>
    </div>
  );
}