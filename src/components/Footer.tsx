'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, PhoneCall, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/i18n/I18nContext';

interface FooterProps {
  onOpenTest?: () => void;
}

export default function Footer({ onOpenTest }: FooterProps) {
  const { t } = useTranslation();

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

      {/* Main Footer Body — Centered, cohesive layout with larger typography */}
      <div className="w-full bg-[#04010a] text-gray-300 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-t border-purple-950/40">
        <div className="max-w-6xl mx-auto">
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 pb-12 border-b border-purple-900/30">
            
            {/* Col 1: Brand & Mission */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative h-12 w-48">
                <Image
                  src="/logo-white.png"
                  alt="PsyQuizz Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              
              <p className="text-base sm:text-lg text-purple-300 font-medium italic">
                {t('common.footer.tagline')}
              </p>
              
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md font-normal">
                {t('common.footer.description')}
              </p>
            </div>

            {/* Col 2: Platform Links */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {t('common.footer.platform')}
              </h4>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  <Link href="#top" className="hover:text-white transition-colors">
                    {t('common.footer.home')}
                  </Link>
                </li>
                <li>
                  {onOpenTest ? (
                    <button
                      onClick={onOpenTest}
                      className="hover:text-white transition-colors text-left"
                    >
                      {t('common.footer.takeTest')}
                    </button>
                  ) : (
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {t('common.footer.takeTest')}
                    </span>
                  )}
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    {t('common.footer.aboutUs')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Resources */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {t('common.footer.resources')}
              </h4>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  {onOpenTest ? (
                    <button
                      onClick={onOpenTest}
                      className="hover:text-white transition-colors text-left"
                    >
                      {t('common.footer.assessments')}
                    </button>
                  ) : (
                    <span className="hover:text-white transition-colors cursor-pointer">
                      {t('common.footer.assessments')}
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
                    <span>{t('common.footer.references')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-teal" />
                  </a>
                </li>
                <li>
                  <Link href="#helplines" className="hover:text-white transition-colors">
                    {t('common.footer.mentalHealth')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Support & Helplines (Vietnam) */}
            <div id="helplines" className="md:col-span-3 space-y-4">
              <h4 className="text-sm sm:text-base font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>{t('common.footer.helplines')}</span>
              </h4>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {t('common.footer.helplinesText')}
              </p>
              
              <div className="space-y-4 pt-1">
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">
                    {t('common.footer.helplineNgayMai')}
                  </div>
                  <a
                    href="tel:0963061414"
                    className="text-brand-teal hover:underline font-bold text-sm sm:text-base tracking-wide inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-teal" />
                    <span>096 306 1414</span>
                  </a>
                </div>

                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">
                    {t('common.footer.helplineChild')}
                  </div>
                  <a
                    href="tel:111"
                    className="text-brand-teal hover:underline font-bold text-sm sm:text-base tracking-wide inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-teal" />
                    <span>111</span>
                  </a>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-snug">
                    {t('common.footer.helplineChildSub')}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 pt-2 border-t border-purple-900/30">
                  {t('common.footer.emergencyNotice')}
                </p>
              </div>
            </div>

          </div>

          {/* Important Notice — Completely out of the box, left-aligned with larger readable font size */}
          <div className="my-8 text-left text-sm sm:text-base text-gray-300 leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-purple-300 font-semibold">{t('common.footer.disclaimerTitle')}:</strong>{' '}
              <span>{t('common.footer.disclaimerText')}</span>
            </div>
          </div>

          {/* Bottom Copyright & Legal / Privacy */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base text-gray-400">
            <p>
              {t('common.footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">{t('common.footer.privacyPolicy')}</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">{t('common.footer.termsOfUse')}</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
