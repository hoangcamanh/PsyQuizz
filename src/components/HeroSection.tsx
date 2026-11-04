'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WaveBackground from './WaveBackground';

interface HeroSectionProps {
  onOpenTest: () => void;
  onExploreMore?: () => void;
}

const ORBIT_STARS = [
  { color: 'blue', scale: 0.55, dur: 10, begin: 0, twinkleDur: 2.4, twinkleDelay: 0 },
  { color: 'purple', scale: 0.4, dur: 13, begin: -1.625, twinkleDur: 3.1, twinkleDelay: -0.8 },
  { color: 'pink', scale: 0.62, dur: 16, begin: -4, twinkleDur: 2, twinkleDelay: -1.4 },
  { color: 'blue', scale: 0.35, dur: 11, begin: -4.125, twinkleDur: 2.8, twinkleDelay: -2 },
  { color: 'pink', scale: 0.46, dur: 14, begin: -7, twinkleDur: 3.4, twinkleDelay: -0.4 },
  { color: 'purple', scale: 0.5, dur: 12, begin: -7.5, twinkleDur: 2.2, twinkleDelay: -1.1 },
  { color: 'blue', scale: 0.42, dur: 15, begin: -11.25, twinkleDur: 2.6, twinkleDelay: -1.8 },
  { color: 'pink', scale: 0.38, dur: 9, begin: -7.875, twinkleDur: 3, twinkleDelay: -0.2 },
];

const ORBIT_BUBBLES = [
  {
    id: 'patrimonio-vivo',
    name: 'Patrimonio Vivo',
    logo: '/orbit/logopv.png',
    color: '#c084fc',
    delay: 0,
  },
  {
    id: 'adaia',
    name: 'ADAIA',
    logo: '/orbit/ADAIA_logo_1.png',
    color: '#ec4899',
    delay: -14,
  },
  {
    id: 'neuroglint',
    name: 'NeuroGlint',
    logo: '/orbit/NeuroglintBlanco_corto.png',
    color: '#6366f1',
    delay: -28,
  },
];

export default function HeroSection({ onOpenTest }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-6 pb-20 bg-[#080314]">
      
      {/* 1:1 Silky Wave WebGL Background (matching sparklingtech.es) */}
      <WaveBackground />

      {/* Ambient background glows for deep cosmic atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-pink-600/10 rounded-full blur-[130px]" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headlines & Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 text-left space-y-5 sm:space-y-6"
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Understand Yourself, One Insight at a Time.
          </h1>

          {/* Subheadline */}
          <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-teal-200">
            Explore your mind. Discover more about yourself.
          </h2>

          {/* Description Paragraph */}
          <p className="text-base sm:text-lg text-gray-300 max-w-xl font-normal leading-relaxed">
            PsyQuizz brings psychological self-assessments and research-informed explanations together in one accessible platform. Explore your personality and emotional well-being through a thoughtful, privacy-conscious experience.
          </p>

          {/* Primary Action Button (Primary CTA: Take a Test) */}
          <div className="pt-3">
            <button
              onClick={onOpenTest}
              className="px-8 py-3.5 rounded-2xl border-2 border-purple-500/70 hover:border-purple-400 text-white font-semibold text-base bg-[#0f0724]/80 hover:bg-[#1a0c3b] shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] transition-all duration-300 active:scale-95"
            >
              Take a Test
            </button>
          </div>
        </motion.div>

        {/* Right Column: Exact Sparklingtech 3D Orbit & Traveling Glass Bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px]"
        >
          <div className="hero-orbit">
            <div className="hero-orbit-scaler">
              
              {/* SVG Orbit Ellipse & Twinkling Traveling Stars */}
              <svg
                className="hero-orbit-svg"
                width="440"
                height="280"
                viewBox="0 0 440 280"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient id="hero-ellipse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="30%" stopColor="#818cf8" />
                    <stop offset="55%" stopColor="#c084fc" />
                    <stop offset="80%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>

                {/* Tilted Ellipse Track */}
                <path
                  id="hero-ellipse"
                  className="hero-ellipse-path"
                  d="M 417.34 68.18 A 210 95 -20 1 1 417.05 67.41 Z"
                />

                {/* 8 Traveling & Twinkling 4-Point Stars */}
                {ORBIT_STARS.map((star, idx) => (
                  <g
                    key={idx}
                    className={`hero-track-star hero-track-star--${star.color}`}
                    style={{
                      animationDuration: `${star.twinkleDur}s`,
                      animationDelay: `${star.twinkleDelay}s`,
                    }}
                  >
                    <animateMotion
                      dur={`${star.dur}s`}
                      begin={`${star.begin}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#hero-ellipse" xlinkHref="#hero-ellipse" />
                    </animateMotion>
                    <path
                      d="M12 0C12 4.2 4.2 12 0 12C4.2 12 12 19.8 12 24C12 19.8 19.8 12 24 12C19.8 12 12 4.2 12 0Z"
                      transform={`scale(${star.scale}) translate(-12,-12)`}
                    />
                  </g>
                ))}
              </svg>

              {/* 3 Floating Glass Glowing Bubbles traveling continuously on the Orbit */}
              {ORBIT_BUBBLES.map((bubble) => {
                const restOffset = `${((-bubble.delay % 42) / 42) * 100}%`;
                return (
                  <div
                    key={bubble.id}
                    onClick={onOpenTest}
                    className="hero-bubble-wrap cursor-pointer"
                    style={
                      {
                        '--bubble-color': bubble.color,
                        '--rest-offset': restOffset,
                        animationDelay: `${bubble.delay}s`,
                      } as React.CSSProperties
                    }
                    title={bubble.name}
                  >
                    <span className="hero-bubble">
                      <span className="hero-bubble-glow" aria-hidden="true" />
                      <span className="hero-bubble-glass">
                        <span className="hero-bubble-rim" aria-hidden="true" />
                        <img src={bubble.logo} alt={bubble.name} />
                      </span>
                    </span>
                  </div>
                );
              })}

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
