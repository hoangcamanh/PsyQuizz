'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function TechnologySection() {
  const cards = [
    {
      id: 'ipip-big-five',
      name: 'IPIP Big Five',
      description:
        'Explore five broad personality dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability. The assessment describes personality tendencies rather than diagnosing psychological conditions.',
      borderColor: 'border-pink-500/40 hover:border-pink-500/80',
      glowColor: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]',
      renderIcon: () => (
        // Icon 1: Human Psyche Profile with 5 radiating personality dimension nodes (O-C-E-A-N)
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 stroke-[3] fill-none">
            <defs>
              <linearGradient id="ipip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
            {/* Elegant Head & Brain Silhouette */}
            <path
              d="M32 78 C28 72 26 62 26 52 C26 36 37 24 53 24 C69 24 80 36 80 52 C80 64 72 74 62 77"
              stroke="url(#ipip-grad)"
              strokeLinecap="round"
            />
            {/* 5 Personality Dimension Nodes & Radar Constellation */}
            <circle cx="53" cy="35" r="3.5" fill="#2dd4bf" stroke="url(#ipip-grad)" strokeWidth="1.5" />
            <circle cx="68" cy="46" r="3.5" fill="#a855f7" stroke="url(#ipip-grad)" strokeWidth="1.5" />
            <circle cx="62" cy="62" r="3.5" fill="#ec4899" stroke="url(#ipip-grad)" strokeWidth="1.5" />
            <circle cx="44" cy="62" r="3.5" fill="#f43f5e" stroke="url(#ipip-grad)" strokeWidth="1.5" />
            <circle cx="38" cy="46" r="3.5" fill="#2dd4bf" stroke="url(#ipip-grad)" strokeWidth="1.5" />
            <polygon
              points="53,35 68,46 62,62 44,62 38,46"
              stroke="url(#ipip-grad)"
              strokeWidth="1.8"
              strokeDasharray="3 3"
              fill="rgba(168, 85, 247, 0.12)"
            />
            <circle cx="53" cy="50" r="2.5" fill="#ffffff" />
          </svg>
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
        // Icon 2: Futuristic AI Neural Brain in a luminous rounded squircle badge
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[3px] shadow-[0_0_25px_rgba(168,85,247,0.4)]">
          <div className="w-full h-full rounded-[21px] bg-[#1a0a2f] flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="w-13 h-13 sm:w-14 sm:h-14 stroke-[2] fill-none">
              <path
                d="M22 14 C17 14 13 18 13 23 C13 25.5 14.5 28 16 29 C15 32 17 35 20 35 C21 35 21.5 34.5 22 34"
                stroke="#ffffff"
                strokeLinecap="round"
              />
              <path
                d="M17 23 C19 23 20 21 22 21"
                stroke="#c084fc"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
              <path
                d="M26 14 C31 14 35 18 35 23 C35 25.5 33.5 28 32 29 C33 32 31 35 28 35 C27 35 26.5 34.5 26 34"
                stroke="#ffffff"
                strokeLinecap="round"
              />
              <path
                d="M31 23 C29 23 28 21 26 21"
                stroke="#f472b6"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
              <line x1="24" y1="12" x2="24" y2="36" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="18" r="2" fill="#2dd4bf" />
              <circle cx="24" cy="27" r="2" fill="#ec4899" />
              <circle cx="24" cy="33" r="1.5" fill="#a855f7" />
            </svg>
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
        // Icon 3: Cryptographic Zero-Knowledge Privacy Shield with Security Arc & Sparkle
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 stroke-[3] fill-none">
            <defs>
              <linearGradient id="anon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
            <path
              d="M50 20 L75 30 C75 58 50 78 50 78 C50 78 25 58 25 30 Z"
              stroke="url(#anon-grad)"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="42" r="5" stroke="url(#anon-grad)" strokeWidth="2.5" />
            <path
              d="M48 46 L46 56 C46 58 54 58 54 56 L52 46 Z"
              fill="url(#anon-grad)"
              stroke="url(#anon-grad)"
              strokeWidth="1"
            />
            <path
              d="M20 45 C18 52 18 60 22 68"
              stroke="url(#anon-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 4"
            />
            <path
              d="M80 45 C82 52 82 60 78 68"
              stroke="url(#anon-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 4"
            />
          </svg>
          <Sparkles className="w-5 h-5 text-teal-300 absolute top-2 right-2 animate-pulse" />
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
              className={`rounded-[32px] p-8 sm:p-10 bg-[#0c051a]/90 backdrop-blur-2xl border ${card.borderColor} transition-all duration-500 hover:-translate-y-2 ${card.glowColor} flex flex-col items-center text-center min-h-[380px] sm:min-h-[420px] justify-center`}
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
