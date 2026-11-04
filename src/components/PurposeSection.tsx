'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PurposeSectionProps {
  onLearnMore: () => void;
}

export default function PurposeSection({ onLearnMore }: PurposeSectionProps) {
  const pillars = [
    {
      title: 'Psychological Assessments',
      description: 'Explore your personality traits and emotional experiences through structured psychological questionnaires.',
      iconSrc: '/elements/health-wellness.png',
      alt: 'Psychological Assessments icon',
    },
    {
      title: 'Clear, Meaningful Results',
      description: 'Understand what your assessment scores represent, with accessible explanations and clearly stated limitations.',
      iconSrc: '/elements/video-game.png',
      alt: 'Clear, Meaningful Results icon',
    },
    {
      title: 'Research-Informed Insights',
      description: 'Access psychological information supported by established research and reputable academic sources.',
      iconSrc: '/elements/applied-research.png',
      alt: 'Research-Informed Insights icon',
    },
    {
      title: 'Privacy by Design',
      description: 'PsyQuizz is designed to minimize unnecessary collection of personal information and give users greater control over their assessment data.',
      iconSrc: '/elements/omic-technologies.png',
      alt: 'Privacy by Design icon',
    },
  ];

  return (
    // Outer section with luminous, light pastel gradient matching Image 1:
    // Left: Soft periwinkle/lavender (#c4beff), Middle: Bright white (#ffffff), Right: Soft pastel pink (#f8b5db)
    <section
      id="about"
      className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #c7c0ff 0%, #e2dfff 20%, #ffffff 50%, #fcd6ed 80%, #f6aada 100%)',
      }}
    >
      {/* Subtle ambient light glows matching Image 1 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/35 rounded-full blur-3xl pointer-events-none" />

      {/* Giant Luminous White / Faded Card (Matching Image 1 & 4) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto rounded-[36px] sm:rounded-[44px] md:rounded-[52px] bg-white/95 sm:bg-white/90 backdrop-blur-2xl text-[#242730] p-8 sm:p-14 lg:p-20 shadow-[0_25px_70px_-15px_rgba(103,75,190,0.15)] border border-white/80 relative z-10"
      >
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 sm:mb-20">
          {/* Ombre Title: Light violet to Dark purple (Left to Right) */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ba85f8] via-[#7532cc] to-[#3a0d78]">
            Self-Discovery Made Simple
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed">
            Explore psychological concepts and learn more about yourself through accessible assessments and clear explanations.
          </p>
        </div>

        {/* 4 Elements Grid with Perfectly Aligned Titles and Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              {/* Direct Image Element (Fixed height container for identical vertical alignment) */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={pillar.iconSrc}
                  alt={pillar.alt}
                  width={84}
                  height={84}
                  className="object-contain w-auto h-auto max-w-[80px] max-h-[80px]"
                />
              </div>

              {/* Title with uniform height & flex centering so 1-line and 2-line titles align on the exact same baseline */}
              <div className="h-14 sm:h-16 flex items-center justify-center w-full px-1 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-[#242730] tracking-tight group-hover:text-[#674BBE] transition-colors leading-snug">
                  {pillar.title}
                </h3>
              </div>

              {/* Description with uniform min-height and top alignment so all descriptions start and sit evenly */}
              <div className="min-h-[84px] sm:min-h-[96px] flex items-start justify-center w-full">
                <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed max-w-[220px]">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Centered Button (CTA: Learn More About Us) */}
        <div className="text-center pt-16 sm:pt-20">
          <button
            onClick={onLearnMore}
            className="px-8 py-3.5 rounded-2xl bg-black hover:bg-[#150a28] text-white font-semibold text-sm sm:text-base border border-purple-500/50 hover:border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all duration-300 active:scale-95"
          >
            Learn More About Us
          </button>
        </div>

      </motion.div>
    </section>
  );
}
