'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, RefreshCw, ChevronDown, ChevronUp, Star, Award, TrendingUp, Users } from 'lucide-react';
import { useState, useRef } from 'react';

interface ResultCategory {
  name: string;
  percentage: number;
  color: string;
  description: string;
  traits: string[];
  gradient: string;
}

interface MobileResultsDisplayProps {
  title: string;
  description: string;
  categories: ResultCategory[];
  overallScore: number;
  insights: string[];
  recommendations: string[];
  onShare?: () => void;
  onDownload?: () => void;
  onRetake?: () => void;
  userStats?: {
    testsCompleted: number;
    averageScore: number;
    rank: string;
    participants: number;
  };
}

export function MobileResultsDisplay({
  title,
  description,
  categories,
  overallScore,
  insights,
  recommendations,
  onShare,
  onDownload,
  onRetake,
  userStats
}: MobileResultsDisplayProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<'insights' | 'recommendations' | null>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  const topCategory = categories.reduce((prev, current) => 
    current.percentage > prev.percentage ? current : prev
  );

  return (
    <div className="min-h-screen bg-surface-900 pb-24">
      {/* Hero section with animated background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 px-4 pt-8 pb-12">
        {/* Aurora background effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(155, 127, 255, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 70% 80%, rgba(255, 107, 71, 0.25) 0%, transparent 50%),
                             radial-gradient(circle at 20% 70%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)`
          }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-glow-primary"
            >
              <Award size={32} className="text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-playfair font-bold text-aurora-white mb-2"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-surface-300 text-sm leading-relaxed max-w-sm mx-auto"
            >
              {description}
            </motion.p>
          </div>

          {/* Overall Score Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-surface-800/50"
              />
              <motion.circle
                cx="50" cy="50" r="40"
                stroke="url(#scoreGradient)"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (overallScore / 100) * 251.2 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                style={{ strokeDasharray: 251.2 }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(155, 127, 255)" />
                  <stop offset="100%" stopColor="rgb(0, 212, 255)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="text-3xl font-bold gradient-text-aurora"
                >
                  {overallScore}%
                </motion.div>
                <div className="text-xs text-surface-400 mt-1">Overall Score</div>
              </div>
            </div>
          </motion.div>

          {/* Primary Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-6"
          >
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${topCategory.gradient} text-white shadow-lg`}>
              <span>Primary Result: {topCategory.name}</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex space-x-3 justify-center"
          >
            {onShare && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShare}
                className="btn-glass flex items-center space-x-2 px-4 py-3"
              >
                <Share2 size={16} />
                <span>Share</span>
              </motion.button>
            )}
            {onDownload && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownload}
                className="btn-glass flex items-center space-x-2 px-4 py-3"
              >
                <Download size={16} />
                <span>Save</span>
              </motion.button>
            )}
            {onRetake && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetake}
                className="btn-primary flex items-center space-x-2 px-4 py-3"
              >
                <RefreshCw size={16} />
                <span>Retake</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* User Stats Section */}
      {userStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="px-4 mb-6"
        >
          <div className="bg-surface-800/25 backdrop-blur-lg border border-surface-700/40 rounded-2xl p-4">
            <h3 className="text-lg font-semibold text-aurora-white mb-3 flex items-center">
              <TrendingUp size={20} className="mr-2 text-primary-400" />
              Your Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">{userStats.testsCompleted}</div>
                <div className="text-xs text-surface-400">Tests Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-400">{userStats.averageScore}%</div>
                <div className="text-xs text-surface-400">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">{userStats.rank}</div>
                <div className="text-xs text-surface-400">Your Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success flex items-center justify-center">
                  <Users size={16} className="mr-1" />
                  {userStats.participants.toLocaleString()}
                </div>
                <div className="text-xs text-surface-400">Total Participants</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Breakdown */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold text-aurora-white mb-4">Results Breakdown</h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <div
                className="bg-surface-800/25 backdrop-blur-lg border border-surface-700/40 rounded-2xl p-4 cursor-pointer touch-target"
                onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-aurora-white">{category.name}</h4>
                      <span className="text-lg font-bold" style={{ color: category.color }}>
                        {category.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-800/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${category.color}, ${category.color}80)` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      />
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCategory === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-3 text-surface-400"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedCategory === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-surface-700/30 mt-4">
                        <p className="text-surface-300 text-sm mb-3 leading-relaxed">
                          {category.description}
                        </p>
                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold text-surface-200">Key Traits:</h5>
                          <div className="flex flex-wrap gap-2">
                            {category.traits.map((trait, traitIndex) => (
                              <motion.span
                                key={trait}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: traitIndex * 0.05 }}
                                className="px-2 py-1 bg-surface-800/50 rounded-lg text-xs text-surface-300"
                              >
                                {trait}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-surface-800/25 backdrop-blur-lg border border-surface-700/40 rounded-2xl p-4"
        >
          <button
            className="w-full flex items-center justify-between text-left touch-target"
            onClick={() => setExpandedSection(expandedSection === 'insights' ? null : 'insights')}
          >
            <h3 className="text-lg font-semibold text-aurora-white flex items-center">
              <Star size={20} className="mr-2 text-secondary-400" />
              Key Insights
            </h3>
            <motion.div
              animate={{ rotate: expandedSection === 'insights' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className="text-surface-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSection === 'insights' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-surface-800/30 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-surface-300 text-sm leading-relaxed">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Recommendations Section */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-surface-800/25 backdrop-blur-lg border border-surface-700/40 rounded-2xl p-4"
        >
          <button
            className="w-full flex items-center justify-between text-left touch-target"
            onClick={() => setExpandedSection(expandedSection === 'recommendations' ? null : 'recommendations')}
          >
            <h3 className="text-lg font-semibold text-aurora-white flex items-center">
              <TrendingUp size={20} className="mr-2 text-accent-400" />
              Recommendations
            </h3>
            <motion.div
              animate={{ rotate: expandedSection === 'recommendations' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className="text-surface-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSection === 'recommendations' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  {recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-xl"
                    >
                      <p className="text-aurora-white text-sm leading-relaxed">{recommendation}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}