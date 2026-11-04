'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Gamepad2, Dna, FileCheck, ArrowUpRight } from 'lucide-react';

interface PurposeSectionProps {
  onLearnMore: () => void;
}

export default function PurposeSection({ onLearnMore }: PurposeSectionProps) {
  const pillars = [
    {
      title: 'Health & Wellness',
      subVN: 'Sức khỏe & Tâm lý',
      description:
        'Thấu hiểu bản thân thông qua khoa học tâm lý chuẩn hóa và công nghệ AI nhân văn nhằm nâng cao chất lượng cuộc sống tinh thần.',
      icon: HeartPulse,
    },
    {
      title: 'Interactive Experience',
      subVN: 'Trải nghiệm Tương tác',
      description:
        'Giao diện trắc nghiệm mượt mà, phản hồi trực quan theo thời gian thực và xử lý hoàn toàn cục bộ trong trình duyệt.',
      icon: Gamepad2,
    },
    {
      title: 'Verified RAG AI',
      subVN: 'Trí tuệ Nhân tạo Chuẩn y văn',
      description:
        'Hệ thống AI đối chiếu tài liệu khoa học được bình duyệt, trích dẫn nguồn minh bạch và tuyệt đối tuân thủ ranh giới phi chẩn đoán.',
      icon: Dna,
    },
    {
      title: 'Applied Research',
      subVN: 'Khoa học Ứng dụng & Quyền riêng tư',
      description:
        'Chuyển hóa tri thức tâm lý học thực chứng thành công cụ thiết thực, tuân thủ Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15.',
      icon: FileCheck,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-20">
      
      {/* Giant Luminous Contrast Card (Matching Screenshot 2) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-[#ebe4fc] via-[#ffffff] to-[#fdecf7] text-[#242730] p-8 sm:p-14 lg:p-20 shadow-[0_25px_60px_-15px_rgba(103,75,190,0.3)] relative overflow-hidden"
      >
        
        {/* Subtle decorative background accent lights */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-purple-200/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-pink-200/50 blur-3xl pointer-events-none" />

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#674BBE] via-[#8A70D6] to-[#ec4899]">
            Technology with purpose
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed">
            We develop innovative solutions that combine science, technology and social commitment to transform lives.
          </p>
          <p className="text-sm text-gray-500 italic">
            (Chúng tôi kiến tạo giải pháp kết hợp khoa học tâm lý, công nghệ và cam kết xã hội để thay đổi cuộc sống tích cực hơn)
          </p>
        </div>

        {/* 4 Pillars Grid with Minimalist Outline Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white/70 hover:bg-white transition-all duration-300 border border-purple-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1.5"
              >
                {/* Outline Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#f4f0fc] group-hover:bg-[#674BBE] flex items-center justify-center text-[#242730] group-hover:text-white mb-6 transition-all duration-300 shadow-sm">
                  <Icon className="w-8 h-8 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#242730] group-hover:text-[#674BBE] transition-colors">
                  {pillar.title}
                </h3>
                <span className="text-xs font-semibold text-brand-purple mb-3">
                  {pillar.subVN}
                </span>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Centered Button (Matching Screenshot 2: "Learn more about us") */}
        <div className="text-center pt-14 sm:pt-18 relative z-10">
          <button
            onClick={onLearnMore}
            className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group bg-gradient-to-r from-brand-purple via-pink-500 to-brand-teal hover:from-purple-600 hover:to-teal-500 shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 hover:scale-[1.03] transition-all duration-300 active:scale-95"
          >
            <span className="px-8 py-3.5 rounded-full bg-[#0a0518] text-white font-semibold text-sm sm:text-base flex items-center gap-2 group-hover:bg-[#12082b] transition-colors">
              <span>Learn more about us</span>
              <ArrowUpRight className="w-4 h-4 text-purple-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

      </motion.div>
    </section>
  );
}
