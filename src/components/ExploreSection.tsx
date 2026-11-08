'use client';

import React from 'react';
import Image from 'next/image';

export default function ExploreSection() {
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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-4 sm:pt-6 md:pt-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#160f29] leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
          Explore the World Within You.
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
          Understand your emotions, discover your personality, and gain meaningful insights through research-informed psychological assessments.
        </p>
      </div>

      {/* Kéo dài background / khoảng trắng vừa vặn rồi mới đến gradient */}
      <div className="h-20 sm:h-32 md:h-44 lg:h-52 w-full" />

      {/* Gradient chuyển tiếp mượt mà với phần nền đen dưới (#060210) */}
      <div
        className="w-full h-36 sm:h-48 md:h-60 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6, 2, 16, 0) 0%, rgba(6, 2, 16, 0.05) 20%, rgba(6, 2, 16, 0.2) 40%, rgba(6, 2, 16, 0.5) 65%, rgba(6, 2, 16, 0.85) 85%, #060210 100%)',
        }}
      />

    </section>
  );
}
