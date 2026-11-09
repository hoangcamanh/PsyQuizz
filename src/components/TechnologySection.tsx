'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/I18nContext';

export default function TechnologySection() {
  const { t } = useTranslation();

  const cards = [
    {
      id: 'bfi-44',
      name: t('landing.technology.bfiTitle'),
      description: t('landing.technology.bfiDesc'),
      borderColor: 'border-pink-500/40 hover:border-pink-500/80',
      glowColor: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]',
      renderIcon: () => (
        // Element 1: Atom Icon
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <Image
              src="/elements/tech-atom-white.png"
              alt="Big Five (BFI-44) Atom Element"
              width={96}
              height={96}
              className="object-contain w-auto h-auto max-w-[84px] max-h-[84px] drop-shadow-[0_0_18px_rgba(236,72,153,0.55)]"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'evidence-grounded-ai',
      name: t('landing.technology.aiTitle'),
      description: t('landing.technology.aiDesc'),
      borderColor: 'border-purple-500/40 hover:border-purple-500/80',
      glowColor: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]',
      renderIcon: () => (
        // Element 2: Hands Holding AI Globe Gear Icon
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <Image
              src="/elements/tech-ai-hands-white.png"
              alt="Evidence-Grounded AI Hands Element"
              width={96}
              height={96}
              className="object-contain w-auto h-auto max-w-[84px] max-h-[84px] drop-shadow-[0_0_18px_rgba(168,85,247,0.6)]"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'privacy-focused-assessments',
      name: t('landing.technology.privacyTitle'),
      description: t('landing.technology.privacyDesc'),
      borderColor: 'border-indigo-500/40 hover:border-indigo-500/80',
      glowColor: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]',
      renderIcon: () => (
        // Element 3: Decentralized Data Network Nodes Icon
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <Image
              src="/elements/tech-network-node-white.png"
              alt="Privacy-Focused Assessments Network Element"
              width={96}
              height={96}
              className="object-contain w-auto h-auto max-w-[82px] max-h-[82px] drop-shadow-[0_0_18px_rgba(99,102,241,0.6)]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="technology" className="pt-32 sm:pt-40 lg:pt-48 pb-32 sm:pb-40 lg:pb-48 px-4 sm:px-6 lg:px-8 relative z-20 bg-[#060210]">
      
      {/* Subtle Purple Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-950/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white glow-text">
            {t('landing.technology.heading')}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed pt-1">
            {t('landing.technology.description')}
          </p>
        </div>

        {/* 3 Large Cards with Perfectly Aligned Titles and Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`rounded-[32px] p-8 sm:p-12 bg-[#0c051a]/90 backdrop-blur-2xl border ${card.borderColor} transition-all duration-500 hover:-translate-y-2 ${card.glowColor} flex flex-col items-center text-center min-h-[400px] sm:min-h-[450px] justify-center group`}
            >
              {/* Element Icon */}
              <div className="flex items-center justify-center mb-5">
                {card.renderIcon()}
              </div>

              {/* Title with uniform height */}
              <div className="h-14 sm:h-16 flex items-center justify-center w-full mb-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {card.name}
                </h3>
              </div>

              {/* Description */}
              <div className="min-h-[100px] sm:min-h-[110px] flex items-start justify-center w-full">
                <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-xs">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
