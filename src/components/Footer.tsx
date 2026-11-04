'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#060210] border-t border-purple-900/30 text-gray-400 py-16 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-purple-900/30">
        
        {/* Col 1: Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="relative h-10 w-44">
            <Image
              src="/logo-white.png"
              alt="PsyQuizz Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            Nền tảng tự khám phá tâm lý chuẩn hóa và giải thích trí tuệ nhân tạo đối chiếu y văn. 
            Đồng hành cùng thanh niên Việt Nam thấu hiểu nội tâm một cách khoa học, an toàn và bảo mật tuyệt đối.
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-teal font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Tuân thủ Luật Bảo vệ Dữ liệu Cá nhân số 91/2025/QH15</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Khám phá</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#top" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-white transition-colors">
                Về chúng tôi (About Us)
              </Link>
            </li>
            <li>
              <Link href="#technology" className="hover:text-white transition-colors">
                Công nghệ & Thang đo (Technology)
              </Link>
            </li>
            <li>
              <a
                href="https://ipip.ori.org/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Kho mục đề IPIP Big Five</span>
                <span className="text-[10px] text-brand-teal">↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Medical Disclaimer & Hotlines */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Miễn trừ Y tế Quan trọng</span>
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            PsyQuizz không phải là dịch vụ y tế hay chẩn đoán lâm sàng. Nếu bạn đang trải qua khủng hoảng tâm lý nghiêm trọng, hãy liên hệ:
          </p>
          <div className="space-y-1 text-xs">
            <p className="text-purple-300 font-semibold">
              • Đường dây nóng Ngày Mai: <span className="text-white">096 306 1414</span>
            </p>
            <p className="text-purple-300 font-semibold">
              • Tổng đài Quốc gia Bảo vệ Trẻ em: <span className="text-white">111</span>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>
          © 2026 PsyQuizz — Dự án Khởi nghiệp Đại học (Group 10). Mọi quyền được bảo lưu.
        </p>
        <div className="flex items-center gap-2">
          <span>Thiết kế vì sức khỏe tinh thần</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
        </div>
      </div>
    </footer>
  );
}
