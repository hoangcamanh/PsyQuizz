'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TechnologySection() {
  const cards = [
    {
      id: 'bfi-44',
      name: 'Big Five (BFI-44)',
      description:
        'Explore five broad personality dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (Emotional Stability) using the Big Five Inventory (BFI-44). The assessment describes personality tendencies rather than diagnosing psychological conditions.',
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
      name: 'Evidence-Grounded AI',
      description:
        'Our planned AI assistant uses Google Gemini and a reviewed psychological knowledge base to help explain assessment results and psychological concepts with supporting references.',
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
      name: 'Privacy-Focused Assessments',
      description:
        'Basic assessments are designed to work without mandatory personal registration. Local processing and optional secure data storage help reduce unnecessary exposure of sensitive responses.',
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
    // Dark section matching Image 3 with accurate PsyQuizz technology content
    <section id="technology" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-20 bg-[#060210]">
      
      {/* Subtle Purple Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-950/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white glow-text">
            Technology That Supports Self-Understanding
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed pt-1">
            PsyQuizz combines psychological assessment methods with privacy-conscious web technology and a planned evidence-grounded AI assistant.
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
              className={`rounded-[32px] p-8 sm:p-10 bg-[#0c051a]/90 backdrop-blur-2xl border ${card.borderColor} transition-all duration-500 hover:-translate-y-2 ${card.glowColor} flex flex-col items-center text-center min-h-[380px] sm:min-h-[420px] justify-center group`}
            >
              {/* Harmonious & Appropriate Element Icon */}
              <div className="flex items-center justify-center mb-5">
                {card.renderIcon()}
              </div>

              {/* Title with uniform height so all 3 card titles align horizontally */}
              <div className="h-14 sm:h-16 flex items-center justify-center w-full mb-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {card.name}
                </h3>
              </div>

              {/* Description with uniform min-height and top alignment */}
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
