'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Clock, Users, Star } from 'lucide-react';
import { useState } from 'react';

interface MobileTestCardProps {
  title: string;
  description: string;
  duration: string;
  participants: string;
  rating: number;
  imageUrl?: string;
  gradient?: string;
  onStart: () => void;
  isPopular?: boolean;
  isNew?: boolean;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export function MobileTestCard({
  title,
  description,
  duration,
  participants,
  rating,
  imageUrl,
  gradient = 'from-primary-500/20 to-secondary-500/20',
  onStart,
  isPopular = false,
  isNew = false,
  difficulty = 'Beginner'
}: MobileTestCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/20 border-success/30';
      case 'Intermediate': return 'text-warning bg-warning/20 border-warning/30';
      case 'Advanced': return 'text-error bg-error/20 border-error/30';
      default: return 'text-surface-300 bg-surface-800/30 border-surface-700/40';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Badges */}
      <div className="absolute -top-2 -right-2 z-10 flex space-x-2">
        {isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="px-3 py-1 bg-accent-500 text-surface-900 text-xs font-bold rounded-full shadow-glow-accent"
          >
            NEW
          </motion.div>
        )}
        {isPopular && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="px-3 py-1 bg-secondary-500 text-white text-xs font-bold rounded-full shadow-glow-secondary flex items-center space-x-1"
          >
            <Star size={12} fill="currentColor" />
            <span>HOT</span>
          </motion.div>
        )}
      </div>

      {/* Main card */}
      <motion.div
        className={`aurora-card relative overflow-hidden bg-gradient-to-br ${gradient} backdrop-blur-xl border border-surface-700/40 rounded-3xl p-6 cursor-pointer`}
        whileTap={{ scale: 0.98 }}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
        onClick={onStart}
        style={{
          WebkitTapHighlightColor: 'rgba(155, 127, 255, 0.1)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-transparent to-accent-400/30" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(155, 127, 255, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 107, 71, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)`
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header with difficulty badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-playfair font-bold text-aurora-white mb-2 leading-tight">
                {title}
              </h3>
              <p className="text-surface-300 text-sm leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
            <div className={`ml-4 px-2 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center space-x-6 mb-6 text-surface-400 text-sm">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-primary-400" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-accent-400" />
              <span>{participants}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={16} className="text-secondary-400" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Action button */}
          <motion.div
            className="flex items-center justify-between p-4 bg-surface-800/30 backdrop-blur-sm rounded-2xl border border-surface-700/30 group hover:bg-surface-800/50 transition-all duration-300"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-aurora-white font-medium">Start Test</span>
            <motion.div
              className="flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full group-hover:bg-primary-400 transition-colors duration-300"
              animate={isPressed ? { scale: 0.9 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ChevronRight size={16} />
            </motion.div>
          </motion.div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Touch ripple effect */}
        <motion.div
          className="absolute inset-0 bg-primary-500/20 rounded-3xl opacity-0"
          animate={isPressed ? { 
            opacity: [0, 0.3, 0],
            scale: [0.8, 1.1, 1]
          } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Skeleton loader for mobile test cards
export function MobileTestCardSkeleton() {
  return (
    <div className="bg-surface-800/25 backdrop-blur-lg border border-surface-700/40 rounded-3xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-surface-700/50 rounded-lg mb-2 w-3/4" />
          <div className="h-4 bg-surface-700/30 rounded-md w-full mb-1" />
          <div className="h-4 bg-surface-700/30 rounded-md w-2/3" />
        </div>
        <div className="ml-4 w-16 h-6 bg-surface-700/50 rounded-lg" />
      </div>
      
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-surface-700/50 rounded" />
          <div className="w-12 h-3 bg-surface-700/30 rounded" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-surface-700/50 rounded" />
          <div className="w-8 h-3 bg-surface-700/30 rounded" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-surface-700/50 rounded" />
          <div className="w-6 h-3 bg-surface-700/30 rounded" />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-surface-800/30 rounded-2xl">
        <div className="w-20 h-4 bg-surface-700/50 rounded" />
        <div className="w-8 h-8 bg-surface-700/50 rounded-full" />
      </div>
    </div>
  );
}

// Grid container for mobile test cards
export function MobileTestGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 px-4 pb-24 md:pb-8">
      <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}