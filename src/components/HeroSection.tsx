'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Sprout, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onOpenTest: () => void;
  onExploreMore: () => void;
}

export default function HeroSection({ onOpenTest, onExploreMore }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      
      {/* Background Animated Wavy Streaks & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Violet radial glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-900/25 rounded-full blur-[140px] animate-pulse-glow" />
        
        {/* Pink/Magenta accent glow */}
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-pink-600/15 rounded-full blur-[130px] animate-float" />
        
        {/* Teal grounding glow */}
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[140px]" />

        {/* Subtle wavy cosmic stream lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M -100 250 C 300 120, 650 480, 1100 200 C 1300 80, 1500 220, 1600 300"
            fill="none"
            stroke="url(#gradient-wave-1)"
            strokeWidth="2.5"
            strokeDasharray="6 8"
          />
          <path
            d="M -150 450 C 250 320, 700 680, 1150 380 C 1350 260, 1550 400, 1650 480"
            fill="none"
            stroke="url(#gradient-wave-2)"
            strokeWidth="1.8"
          />
          <defs>
            <linearGradient id="gradient-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#674BBE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#14AC94" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gradient-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A70D6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#674BBE" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#14AC94" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headlines & Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 text-left space-y-6 sm:space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-purple-950/50">
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Khoa học Tâm lý & Trí tuệ Nhân tạo Chuẩn mực</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Technology and science to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-teal-300 glow-text">
              understand your inner mind
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl font-normal leading-relaxed">
            Chúng tôi phát triển nền tảng tự khám phá tâm lý chuẩn hóa, kết hợp khoa học nhân cách, 
            trợ lý AI đối chiếu y văn (Verified RAG) và triết lý bảo mật tuyệt đối dành cho người trẻ Việt Nam.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            {/* Primary Pill Button with glowing border */}
            <button
              onClick={onOpenTest}
              className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group bg-gradient-to-r from-brand-purple via-pink-500 to-brand-teal hover:from-purple-500 hover:to-teal-400 transition-all duration-300 shadow-glow-purple hover:shadow-[0_0_45px_rgba(168,85,247,0.7)] active:scale-95"
            >
              <span className="px-7 py-3.5 rounded-full bg-[#0d0622] group-hover:bg-[#150a36] text-white font-semibold text-sm sm:text-base flex items-center gap-3 transition-colors duration-200">
                <span>Our assessments</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            {/* Secondary Button */}
            <button
              onClick={onExploreMore}
              className="px-6 py-3.5 rounded-full border border-purple-800/60 hover:border-purple-500 text-gray-300 hover:text-white font-medium text-sm sm:text-base bg-purple-950/20 hover:bg-purple-950/40 backdrop-blur-md transition-all duration-200"
            >
              Tìm hiểu quy trình
            </button>
          </div>

          {/* Quick Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              <span>100% Ẩn danh & Xử lý cục bộ</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-pink-400" />
              <span>Thang đo IPIP Big Five chuẩn hóa</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-purple-400" />
              <span>Phi chẩn đoán & Hướng đến giáo dục</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Spectacular 3D Interactive Orbital System (Image 1 Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px]"
        >
          {/* Main Orbit Stage */}
          <div className="relative w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] flex items-center justify-center">
            
            {/* Center Nebula Glow */}
            <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-brand-purple/40 to-pink-500/30 blur-[60px] animate-pulse-glow" />

            {/* Elliptical Tilted Orbit Ring */}
            <div
              className="absolute w-[300px] sm:w-[390px] h-[200px] sm:h-[260px] rounded-[50%] border-2 border-dashed border-purple-400/40 shadow-[0_0_25px_rgba(147,51,234,0.3)] pointer-events-none"
              style={{
                transform: 'rotate(-25deg)',
              }}
            />

            {/* Second Inner Accent Ring */}
            <div
              className="absolute w-[260px] sm:w-[340px] h-[160px] sm:h-[210px] rounded-[50%] border border-teal-400/30 pointer-events-none"
              style={{
                transform: 'rotate(-25deg)',
              }}
            />

            {/* Twinkling Star Sparkles */}
            <span className="absolute top-10 right-16 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse" />
            <span className="absolute bottom-16 left-12 w-2 h-2 rounded-full bg-pink-300 shadow-[0_0_10px_#f472b6] animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full bg-teal-200 shadow-[0_0_8px_#99f6e4] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Node 1: Top Purple Bubble (Self-Discovery / Human Profile) */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute top-2 right-12 sm:right-16 group cursor-pointer"
              onClick={onOpenTest}
            >
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 p-1 rounded-full bg-gradient-to-br from-purple-500/80 via-purple-700/60 to-purple-900/40 backdrop-blur-xl shadow-[0_0_35px_rgba(168,85,247,0.65)] border border-purple-300/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#180b38] flex items-center justify-center text-purple-300 group-hover:text-white transition-colors">
                  <Sprout className="w-7 h-7 sm:w-8 sm:h-8 text-brand-teal animate-pulse" />
                </div>
                {/* Glowing Outer Halo */}
                <div className="absolute inset-0 rounded-full border border-purple-400/60 animate-ping pointer-events-none opacity-40" style={{ animationDuration: '3s' }} />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-200 opacity-90 group-hover:opacity-100">
                Self-Discovery
              </span>
            </motion.div>

            {/* Node 2: Right Neon Pink Bubble (Verified AI / Brain) */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 group cursor-pointer"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-1 rounded-full bg-gradient-to-br from-pink-500/80 via-fuchsia-600/60 to-purple-900/40 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,0.7)] border border-pink-300/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#20092c] flex items-center justify-center text-pink-300 group-hover:text-white transition-colors">
                  <Brain className="w-8 h-8 sm:w-9 sm:h-9 text-pink-400" />
                </div>
                <div className="absolute inset-0 rounded-full border border-pink-400/60 animate-ping pointer-events-none opacity-30" style={{ animationDuration: '4s' }} />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-200 opacity-90 group-hover:opacity-100">
                Verified RAG AI
              </span>
            </motion.div>

            {/* Node 3: Bottom Left Teal Bubble (Anonymous Engine / Privacy) */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-4 left-6 sm:left-10 group cursor-pointer"
            >
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 p-1 rounded-full bg-gradient-to-br from-teal-400/80 via-emerald-600/60 to-purple-900/40 backdrop-blur-xl shadow-[0_0_35px_rgba(20,172,148,0.65)] border border-teal-300/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#061e22] flex items-center justify-center text-teal-300 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-brand-teal" />
                </div>
                <div className="absolute inset-0 rounded-full border border-teal-400/60 animate-ping pointer-events-none opacity-30" style={{ animationDuration: '3.5s' }} />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-200 opacity-90 group-hover:opacity-100">
                Privacy Engine
              </span>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
