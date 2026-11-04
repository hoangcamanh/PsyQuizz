'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Radio, Fingerprint } from 'lucide-react';

export default function TechnologySection() {
  const cards = [
    {
      id: 'living-heritage',
      name: 'Living Heritage',
      description: 'Technology to preserve memories, stimulate memory and connect generations.',
      borderColor: 'border-pink-500/40 hover:border-pink-500/80',
      glowColor: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]',
      renderIcon: () => (
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Custom Living Heritage Loop Icon with gradient */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[3.5] fill-none">
              <defs>
                <linearGradient id="lh-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              <path
                d="M50 20 C65 20, 75 32, 75 48 C75 68, 50 82, 50 82 C50 82, 25 68, 25 48 C25 32, 35 20, 50 20 Z"
                stroke="url(#lh-grad)"
              />
              <circle cx="50" cy="46" r="10" stroke="url(#lh-grad)" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: 'adaia',
      name: 'ADAIA',
      description: 'Emotional Artificial Intelligence for individual support and well-being based on science.',
      borderColor: 'border-purple-500/40 hover:border-purple-500/80',
      glowColor: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]',
      renderIcon: () => (
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[3px] shadow-lg">
          <div className="w-full h-full rounded-[21px] bg-[#1a0a2f] flex items-center justify-center">
            <Brain className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-[1.5]" />
          </div>
        </div>
      ),
    },
    {
      id: 'neuroglint',
      name: 'NeuroGlint',
      description: 'Applied neuroscience to convert stimuli and behavior into strategic data.',
      borderColor: 'border-indigo-500/40 hover:border-indigo-500/80',
      glowColor: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]',
      renderIcon: () => (
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 stroke-[3.2] fill-none">
            <defs>
              <linearGradient id="ng-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <path
              d="M30 65 C20 55, 20 40, 32 30 C45 18, 65 20, 75 32 C82 40, 80 52, 72 60 C65 68, 55 70, 52 78 C50 82, 45 84, 42 80 C40 76, 42 70, 48 66"
              stroke="url(#ng-grad)"
            />
            {/* Concentric Signal Arcs */}
            <path d="M42 48 A10 10 0 0 1 58 48" stroke="url(#ng-grad)" />
            <path d="M36 42 A18 18 0 0 1 64 42" stroke="url(#ng-grad)" />
            <path d="M30 36 A26 26 0 0 1 70 36" stroke="url(#ng-grad)" />
          </svg>
          {/* Sparkle star top-left of NeuroGlint */}
          <Sparkles className="w-5 h-5 text-purple-300 absolute top-2 left-2 animate-pulse" />
        </div>
      ),
    },
  ];

  return (
    // Dark section matching Image 3
    <section id="technology" className="py-24 px-4 sm:px-6 lg:px-8 relative z-20 bg-[#060210]">
      
      {/* Subtle Purple Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-950/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title & Subtitle (Clean & minimal matching Image 3) */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white glow-text">
            Our technology
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
            We promote the future of health through disruptive solutions.
          </p>
        </div>

        {/* 3 Large Cards (Only element icon, title, and short text below - matching Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`rounded-[32px] p-8 sm:p-12 bg-[#0c051a]/90 backdrop-blur-2xl border ${card.borderColor} transition-all duration-500 hover:-translate-y-2 ${card.glowColor} flex flex-col items-center text-center space-y-6 min-h-[380px] sm:min-h-[420px] justify-center`}
            >
              {/* Element Icon */}
              <div className="flex items-center justify-center">
                {card.renderIcon()}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {card.name}
              </h3>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-xs">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
