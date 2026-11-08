'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ASSESSMENTS, AssessmentData } from '@/config/assessments';

interface PurposeSectionProps {
  onSelectAssessment: (assessment: AssessmentData) => void;
}

export default function PurposeSection({
  onSelectAssessment,
}: PurposeSectionProps) {
  // 4 original elements with category integrated into clean normal text
  const items = [
    {
      assessment: ASSESSMENTS[0], // DASS-21
      iconSrc: '/elements/health-wellness.png',
      alt: 'DASS-21 Assessment Element',
      title: 'DASS-21',
      description:
        'Explore symptoms of depression, anxiety, and stress experienced over the past week.',
    },
    {
      assessment: ASSESSMENTS[1], // Big Five (BFI-44)
      iconSrc: '/elements/video-game.png',
      alt: 'Big Five (BFI-44) Assessment Element',
      title: 'Big Five (BFI-44)',
      description:
        'Discover your personality traits across five fundamental psychological dimensions.',
    },
    {
      assessment: ASSESSMENTS[2], // Eysenck Personality Test
      iconSrc: '/elements/omic-technologies.png',
      alt: 'Eysenck Personality Assessment Element',
      title: 'Eysenck Personality Test',
      description:
        'Evaluate core personality and temperament characteristics through a proven model.',
    },
    {
      assessment: ASSESSMENTS[3], // ADHD Screening
      iconSrc: '/elements/applied-research.png',
      alt: 'ADHD Screening Assessment Element',
      title: 'ADHD Screening',
      description:
        'Screen attention, focus, and behavioral concentration patterns effectively.',
    },
  ];

  return (
    <section
      id="assessments"
      className="pt-20 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      {/* Anchor for #about */}
      <span id="about" className="absolute -top-10 left-0" />

      {/* Giant Luminous White Container Card for Core Psychological Assessments */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto rounded-[36px] sm:rounded-[44px] md:rounded-[52px] bg-white/95 sm:bg-white/90 backdrop-blur-2xl text-[#242730] p-6 sm:p-12 lg:p-14 shadow-[0_25px_70px_-15px_rgba(103,75,190,0.15)] border border-white/80 relative z-10"
      >
        {/* Title & Subtitle: Ample padding ensuring descenders like 'g' are fully rendered */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ba85f8] via-[#7532cc] to-[#3a0d78] pt-1 pb-4 px-2 leading-normal inline-block overflow-visible">
            Core Psychological Assessments
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Discover more about your emotional well-being, personality, and behavior through four psychological assessments.
          </p>
        </div>

        {/* 4 Elements Grid with Horizontal Alignment across all 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group cursor-pointer h-full justify-between"
              onClick={() => onSelectAssessment(item.assessment)}
            >
              {/* 1. Element Icon Container */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={item.iconSrc}
                  alt={item.alt}
                  width={128}
                  height={128}
                  className="object-contain w-auto h-auto max-w-[90px] max-h-[90px] sm:max-w-[105px] sm:max-h-[105px] md:max-w-[115px] md:max-h-[115px]"
                />
              </div>

              {/* 2. Title (Black header) */}
              <div className="h-12 sm:h-14 flex items-center justify-center w-full px-1 mb-2 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#242730] tracking-tight group-hover:text-[#674BBE] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* 3. Detail (Clean paragraph text integrating the category, perfectly aligned) */}
              <div className="h-14 sm:h-16 flex items-center justify-center w-full px-2 mb-6 text-center">
                <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-[220px]">
                  {item.description}
                </p>
              </div>

              {/* 4. Test Button at Bottom */}
              <div className="mt-auto w-full flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAssessment(item.assessment);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0f0724] hover:bg-[#201040] text-white font-medium text-xs sm:text-sm border border-purple-500/40 hover:border-purple-400 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  Take the Test
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
