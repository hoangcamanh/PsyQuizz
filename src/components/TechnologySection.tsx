'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Shield, UserCheck, ArrowRight } from 'lucide-react';

interface TechnologySectionProps {
  onStartAssessment: () => void;
}

export default function TechnologySection({ onStartAssessment }: TechnologySectionProps) {
  const cards = [
    {
      id: 'living-heritage',
      name: 'IPIP Big Five',
      badge: 'Thang đo Chuẩn hóa',
      tagline: 'Mô hình 5 Yếu tố Nhân cách Quốc tế',
      description:
        'Hệ thống đánh giá tính cách dựa trên kho mục đề quốc tế IPIP (International Personality Item Pool). Đo lường khách quan 5 nét nhân cách: Cởi mở, Tận tâm, Hướng ngoại, Dễ chịu và Nhạy cảm cảm xúc.',
      iconColor: 'from-purple-500 to-indigo-600',
      borderColor: 'hover:border-purple-500/60',
      glowColor: 'group-hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]',
      icon: UserCheck,
      details: ['50 mục đề chuẩn', 'Xử lý in-memory', 'Đánh giá phi lâm sàng'],
    },
    {
      id: 'adaia',
      name: 'Verified RAG Assistant',
      badge: 'Trí tuệ Nhân tạo Chuẩn y văn',
      tagline: 'Trợ lý Giải thích Tâm lý Đối chiếu Nguồn',
      description:
        'Sử dụng mô hình Google Gemini được điều hướng qua quy trình RAG (Retrieval-Augmented Generation) nghiêm ngặt. Chỉ giải thích dựa trên y văn đã được kiểm duyệt, đính kèm số DOI/trích dẫn và từ chối tuyệt đối việc tự chẩn đoán bệnh lý.',
      iconColor: 'from-pink-500 to-purple-600',
      borderColor: 'hover:border-pink-500/60',
      glowColor: 'group-hover:shadow-[0_0_35px_rgba(236,72,153,0.35)]',
      icon: Brain,
      details: ['Google Gemini 2.5', 'Trích dẫn y văn thật', 'Bộ lọc phòng ngừa khủng hoảng'],
    },
    {
      id: 'neuroglint',
      name: 'Anonymous Engine',
      badge: 'Bảo mật Cấp cao',
      tagline: 'Kiến trúc Tính toán Cục bộ Không Thu thập Danh tính',
      description:
        'Toàn bộ quá trình tính điểm thang đo diễn ra 100% trong trình duyệt máy khách (Client-Side Execution). Không yêu cầu email hay số điện thoại để làm bài, bảo vệ tuyệt đối sự an tâm của bạn theo Luật số 91/2025/QH15.',
      iconColor: 'from-teal-400 to-emerald-600',
      borderColor: 'hover:border-teal-500/60',
      glowColor: 'group-hover:shadow-[0_0_35px_rgba(20,172,148,0.35)]',
      icon: Shield,
      details: ['Zero Cloud Leak', 'Tuân thủ Luật 91/2025', 'Tùy chọn xóa dữ liệu 1 chạm'],
    },
  ];

  return (
    <section id="technology" className="py-24 px-4 sm:px-6 lg:px-8 relative z-20">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header (Matching Screenshot 3) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            <span>Core Architecture</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white glow-text">
            Our technology
          </h2>

          <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            We promote the future of health through disruptive solutions.
          </p>
          <p className="text-sm text-gray-400">
            (Chúng tôi thúc đẩy tương lai của sức khỏe tinh thần bằng các giải pháp đột phá, an toàn và có cơ sở khoa học)
          </p>
        </div>

        {/* 3 Large Glassmorphism Cards (Matching Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`group relative rounded-[32px] p-8 sm:p-10 bg-[#100724]/75 backdrop-blur-2xl border border-purple-900/40 ${card.borderColor} transition-all duration-500 hover:-translate-y-2.5 ${card.glowColor} flex flex-col justify-between`}
              >
                {/* Glowing Corner Aura */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/20 transition-colors" />

                <div>
                  {/* Card Icon Header in Squircle Container */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-[24px] bg-gradient-to-br ${card.iconColor} p-[2px] shadow-lg transition-transform duration-300 group-hover:scale-105`}>
                      <div className="w-full h-full rounded-[22px] bg-[#0c051d] flex items-center justify-center text-white">
                        <Icon className="w-9 h-9 text-purple-200 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 border border-purple-500/30 text-purple-300">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-colors">
                    {card.name}
                  </h3>
                  <h4 className="text-xs sm:text-sm font-semibold text-brand-teal mb-4">
                    {card.tagline}
                  </h4>

                  {/* Description */}
                  <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed font-normal mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Feature Chips & Footer Action */}
                <div className="pt-6 border-t border-purple-900/40 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {card.details.map((detail) => (
                      <span
                        key={detail}
                        className="px-2.5 py-1 rounded-lg text-xs bg-purple-950/60 border border-purple-900/60 text-purple-300 font-medium"
                      >
                        ✓ {detail}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onStartAssessment}
                    className="w-full pt-2 flex items-center justify-between text-xs sm:text-sm font-semibold text-purple-300 group-hover:text-brand-teal transition-colors"
                  >
                    <span>Khám phá tính năng</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
