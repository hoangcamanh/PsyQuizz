'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, ExternalLink, PhoneCall, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full relative z-20">
      
      {/* Upward Parabolic Arc Transition (Cong lên hình cung parabol) */}
      <div className="relative w-full overflow-hidden leading-none z-30 -mb-[1px]">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-20 md:h-24 block"
        >
          <defs>
            <linearGradient id="parabola-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14AC94" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#674BBE" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#A855F7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Filled footer body underneath the parabola */}
          <path
            d="M 0,90 Q 720,0 1440,90 L 1440,90 L 0,90 Z"
            fill="#04010a"
          />
          {/* Glowing parabolic stroke line */}
          <path
            d="M 0,90 Q 720,0 1440,90"
            fill="none"
            stroke="url(#parabola-glow)"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Main Footer Body (Pure English, Highly Professional) */}
      <div className="w-full bg-[#04010a] text-gray-400 pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-t border-purple-950/40">
        <div className="max-w-7xl mx-auto">
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-purple-900/30">
            
            {/* Col 1: Brand & Mission */}
            <div className="md:col-span-4 space-y-4">
              <div className="relative h-11 w-44">
                <Image
                  src="/logo-white.png"
                  alt="PsyQuizz Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              
              <p className="text-sm text-gray-300 font-medium">
                Understand Yourself, One Insight at a Time.
              </p>
              
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-normal">
                PsyQuizz is a privacy-first psychological self-assessment and AI explanation platform, 
                combining validated psychometrics with evidence-grounded research for young adults.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-brand-teal font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0 text-brand-teal" />
                <span>Compliant with Vietnam Law No. 91/2025/QH15</span>
              </div>
            </div>

            {/* Col 2: Platform Links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="#top" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    Technology with Purpose
                  </Link>
                </li>
                <li>
                  <Link href="#technology" className="hover:text-white transition-colors">
                    Our Technology
                  </Link>
                </li>
                <li>
                  <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    IPIP Big Five Core
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 3: Science & Literature */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Scientific Grounding
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://ipip.ori.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>IPIP Question Pool</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-teal" />
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Verified RAG Architecture
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    WHO AI Health Guidance
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Client-Side Compute Engine
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4: Crisis & Helplines (Vietnam) */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Support Helplines</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                If you are experiencing acute emotional distress, please reach out to dedicated crisis resources:
              </p>
              <div className="space-y-2 pt-1">
                <a
                  href="tel:0963061414"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/30 border border-purple-900/40 hover:bg-purple-900/30 transition-colors text-xs text-purple-200"
                >
                  <span>Ngay Mai Hotline</span>
                  <span className="font-semibold text-brand-teal flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> 096 306 1414
                  </span>
                </a>
                <a
                  href="tel:111"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/30 border border-purple-900/40 hover:bg-purple-900/30 transition-colors text-xs text-purple-200"
                >
                  <span>National Child Helpline</span>
                  <span className="font-semibold text-brand-teal flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> 111
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* Non-Diagnostic Disclaimer Box */}
          <div className="my-8 p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 text-[11px] sm:text-xs text-gray-400 leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-purple-300">Non-Diagnostic &amp; Educational Notice:</strong> PsyQuizz provides 
              science-informed self-discovery instruments and educational AI explanations. PsyQuizz is not a medical 
              diagnostic system, psychiatric service, or substitute for professional psychotherapy.
            </div>
          </div>

          {/* Bottom Copyright & Credits */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              © 2026 PsyQuizz. University Entrepreneurship Project (Group 10). All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Exploration</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-gray-400">
                <span>Built for mental well-being</span>
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
