'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, HeartHandshake, PhoneCall, Sparkles, X, ShieldAlert } from 'lucide-react';

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Bottom-Left Floating Wellbeing / Support Button (Matching sparklingtech.es widget) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setShowCrisisModal(true)}
          className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-brand-purple via-pink-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-purple-900/50 hover:shadow-purple-600/70 hover:scale-110 active:scale-95 transition-all duration-300 border border-purple-300/40"
          title="Hỗ trợ & Đường dây nóng tâm lý"
          aria-label="Wellbeing & Crisis Support"
        >
          {/* Lotus / Peace / Heart Icon */}
          <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7 text-purple-100 group-hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-teal border-2 border-[#080314] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-teal border-2 border-[#080314]" />
        </button>
      </div>

      {/* Bottom-Right Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in duration-300">
          <button
            onClick={scrollToTop}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#180b38]/90 hover:bg-brand-purple text-gray-300 hover:text-white flex items-center justify-center shadow-xl border border-purple-700/50 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md"
            title="Lên đầu trang"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Support & Crisis Hotlines Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md bg-[#110729] border border-purple-800/70 rounded-3xl p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCrisisModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white bg-purple-950/40 hover:bg-purple-900/60"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Bạn đang cần lắng nghe?</h4>
                <p className="text-xs text-gray-400">Đường dây nóng hỗ trợ tâm lý miễn phí tại Việt Nam</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <a
                href="tel:0963061414"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/50 hover:bg-purple-900/40 transition-colors group"
              >
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-brand-teal">Đường dây nóng Ngày Mai</p>
                  <p className="text-xs text-gray-400">Hỗ trợ người trầm cảm và khủng hoảng tâm lý</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-brand-teal">
                  <PhoneCall className="w-4 h-4" />
                  <span>096 306 1414</span>
                </div>
              </a>

              <a
                href="tel:111"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/50 hover:bg-purple-900/40 transition-colors group"
              >
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-brand-teal">Tổng đài Quốc gia 111</p>
                  <p className="text-xs text-gray-400">Bảo vệ trẻ em và thanh thiếu niên 24/7</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-brand-teal">
                  <PhoneCall className="w-4 h-4" />
                  <span>111</span>
                </div>
              </a>
            </div>

            <p className="text-xs text-gray-400 text-center">
              PsyQuizz đồng hành cùng bạn trên hành trình chăm sóc sức khỏe tinh thần.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
