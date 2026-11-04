'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Gamepad2, Dna, FileText } from 'lucide-react';

interface PurposeSectionProps {
  onLearnMore: () => void;
}

export default function PurposeSection({ onLearnMore }: PurposeSectionProps) {
  const pillars = [
    {
      title: 'Health & Wellness',
      description: 'Immersive technologies, neuroscience and artificial intelligence to improve quality of life.',
      icon: Brain,
    },
    {
      title: 'Video game',
      description: 'Gamified experiences based on the study of user behavior, oriented towards research.',
      icon: Gamepad2,
    },
    {
      title: 'Omic technologies',
      description: 'Omic approaches to optimize crops and processes, analyzing their impact on well-being.',
      icon: Dna,
    },
    {
      title: 'Applied research',
      description: 'Rigorous science converted into useful knowledge and practical solutions with real impact.',
      icon: FileText,
    },
  ];

  return (
    // Outer section with vibrant pink-purple background (matching Image 4)
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-20 bg-gradient-to-b from-[#080314] via-[#521748] to-[#12051f]"
    >
      {/* Ambient soft glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-[150px] pointer-events-none" />

      {/* Giant Luminous White/Faded Card (Matching Image 4) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto rounded-[36px] sm:rounded-[48px] bg-white/95 sm:bg-white/90 backdrop-blur-2xl text-[#242730] p-8 sm:p-14 lg:p-20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden"
      >
        {/* Title & Subtitle (Clean & minimal, Image 4) */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#674BBE]">
            Technology with purpose
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed">
            We develop innovative solutions that combine science, technology and social commitment to transform lives.
          </p>
        </div>

        {/* 4 Minimal Elements Grid (Matching Image 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                {/* Minimalist Outline Icon */}
                <div className="w-16 h-16 flex items-center justify-center text-[#242730] group-hover:text-[#674BBE] transition-colors duration-300">
                  <Icon className="w-12 h-12 stroke-[1.6]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#242730] tracking-tight">
                  {pillar.title}
                </h3>

                {/* Minimalist Description */}
                <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Centered Button (Matching Image 4: 'Learn more about us') */}
        <div className="text-center pt-16 sm:pt-20">
          <button
            onClick={onLearnMore}
            className="px-8 py-3.5 rounded-2xl bg-black hover:bg-[#150a28] text-white font-semibold text-sm sm:text-base border border-purple-500/50 hover:border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all duration-300 active:scale-95"
          >
            Learn more about us
          </button>
        </div>

      </motion.div>
    </section>
  );
}
