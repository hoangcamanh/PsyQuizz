'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/i18n/I18nContext';

export default function ExploreSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center">
      
      {/* Giant Rich Purple-Pink Gradient Earth Dome (Prominent, High Contrast, Centered) */}
      <div className="w-full flex justify-center pointer-events-none select-none overflow-hidden px-2 sm:px-4">
        <Image
          src="/elements/earth-globe-gradient.png"
          alt="Explore the World Within You Globe Dome"
          width={1440}
          height={430}
          className="w-full h-auto object-contain max-w-[1440px] min-w-[900px] lg:min-w-full mx-auto"
          priority
        />
      </div>

      {/* Centered Content Positioned Below the Dome */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 pt-8 sm:pt-12 md:pt-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#160f29] leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
          {t('landing.explore.heading')}
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
          {t('landing.explore.description')}
        </p>
      </div>

      {/* Extended whitespace before transition */}
      <div className="h-28 sm:h-40 md:h-56 lg:h-64 w-full" />

      {/* Enhanced, Taller & Richer Gradient Transition to dark base (#060210) */}
      <div
        className="w-full h-72 sm:h-96 md:h-[480px] lg:h-[580px] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6, 2, 16, 0) 0%, rgba(18, 7, 44, 0.08) 15%, rgba(24, 10, 56, 0.28) 32%, rgba(18, 7, 42, 0.56) 52%, rgba(12, 5, 28, 0.82) 74%, rgba(6, 2, 16, 0.96) 90%, #060210 100%)',
        }}
      />

    </section>
  );
}
