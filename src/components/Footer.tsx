'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, PhoneCall, AlertCircle } from 'lucide-react';

interface FooterProps {
  onOpenTest?: () => void;
}

export default function Footer({ onOpenTest }: FooterProps) {
  return (
    <footer className="w-full relative z-20">
      
      {/* Upward Parabolic Arc Transition */}
      <div className="relative w-full overflow-hidden leading-none z-30 -mb-[1px]">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-24 sm:h-36 md:h-48 lg:h-60 block"
        >
          <defs>
            <linearGradient id="parabola-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14AC94" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#674BBE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="1" />
              <stop offset="75%" stopColor="#EC4899" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.5" />
            </linearGradient>
            <filter id="parabola-filter" x="-10%" y="-20%" width="120%" height="150%">
              <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor="#a855f7" floodOpacity="0.6" />
            </filter>
          </defs>
          {/* Filled footer body underneath the parabola */}
          <path
            d="M 0,200 Q 720,0 1440,200 L 1440,200 L 0,200 Z"
            fill="#04010a"
          />
          {/* Glowing parabolic stroke line */}
          <path
            d="M 0,200 Q 720,0 1440,200"
            fill="none"
            stroke="url(#parabola-glow)"
            strokeWidth="3"
            filter="url(#parabola-filter)"
          />
        </svg>
      </div>

      {/* Main Footer Body — Centered, cohesive layout */}
      <div className="w-full bg-[#04010a] text-gray-400 pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-t border-purple-950/40">
        <div className="max-w-5xl mx-auto">
          
          {/* Grid Layout: Columns brought closer together and centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 pb-12 border-b border-purple-900/30">
            
            {/* Col 1: Brand & Mission */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative h-11 w-44">
                <Image
                  src="/logo-white.png"
                  alt="PsyQuizz Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              
              <p className="text-sm text-purple-300 font-medium italic">
                Know Your Mind. Discover Yourself.
              </p>
              
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-normal">
                PsyQuizz is a psychological self-assessment and self-discovery platform designed to make research-informed psychological information more accessible to young adults.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-brand-teal font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0 text-brand-teal" />
                <span>Privacy-First &amp; Client-Side Security</span>
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
                  {onOpenTest ? (
                    <button
                      onClick={onOpenTest}
                      className="hover:text-white transition-colors text-left"
                    >
                      Take a Test
                    </button>
                  ) : (
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Take a Test
                    </span>
                  )}
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Resources */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  {onOpenTest ? (
                    <button
                      onClick={onOpenTest}
                      className="hover:text-white transition-colors text-left"
                    >
                      Assessments
                    </button>
                  ) : (
                    <span className="hover:text-white transition-colors cursor-pointer">
                      Assessments
                    </span>
                  )}
                </li>
                <li>
                  <a
                    href="https://ipip.ori.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>References</span>
                    <ExternalLink className="w-3 h-3 text-brand-teal" />
                  </a>
                </li>
                <li>
                  <Link href="#helplines" className="hover:text-white transition-colors">
                    Mental Health
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Support & Helplines (Vietnam) */}
            <div id="helplines" className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Support &amp; Helplines</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                If you need psychological support, consider contacting an appropriate professional or support service.
              </p>
              
              <div className="space-y-2.5 pt-1">
                <a
                  href="tel:0963061414"
                  className="flex flex-col p-2.5 rounded-xl bg-purple-950/30 border border-purple-900/40 hover:bg-purple-900/30 transition-colors text-xs text-purple-200"
                >
                  <span className="font-semibold text-white">Ngày Mai Psychological Support</span>
                  <span className="font-bold text-brand-teal flex items-center gap-1 mt-0.5">
                    <PhoneCall className="w-3 h-3" /> 096 306 1414
                  </span>
                </a>

                <a
                  href="tel:111"
                  className="flex flex-col p-2.5 rounded-xl bg-purple-950/30 border border-purple-900/40 hover:bg-purple-900/30 transition-colors text-xs text-purple-200"
                >
                  <span className="font-semibold text-white">National Child Protection Hotline</span>
                  <span className="font-bold text-brand-teal flex items-center gap-1 mt-0.5">
                    <PhoneCall className="w-3 h-3" /> 111
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">For children and child protection concerns.</span>
                </a>

                <p className="text-[11px] text-gray-400 pt-1">
                  For an immediate medical emergency in Vietnam, call <strong className="text-pink-400 font-bold">115</strong>.
                </p>
              </div>
            </div>

          </div>

          {/* Important Notice */}
          <div className="my-8 p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 text-[11px] sm:text-xs text-gray-400 leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-purple-300">Important Notice:</strong> PsyQuizz provides psychological self-assessment tools and educational information. It does not provide medical diagnoses, psychiatric treatment, or professional psychotherapy. Assessment results should not be interpreted as clinical diagnoses.
            </div>
          </div>

          {/* Bottom Copyright & Legal / Privacy (Removed "Built to support self-understanding" and heart icon) */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              © 2026 PsyQuizz. University Entrepreneurship Project — Group 10.
            </p>
            <div className="flex items-center gap-4">
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Use</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
