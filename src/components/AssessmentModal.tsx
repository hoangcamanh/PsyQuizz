'use client';

import React, { useState } from 'react';
import { X, Clock, FileText, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFullTest: () => void;
}

export default function AssessmentModal({
  isOpen,
  onClose,
  onStartFullTest,
}: AssessmentModalProps) {
  const [sampleAnswer, setSampleAnswer] = useState<number | null>(4);
  const [selectedForm, setSelectedForm] = useState<'standard' | 'short'>('short');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0f0724] border border-purple-800/60 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl shadow-purple-950/80 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-brand-purple-light text-xs font-semibold">
            <span>Mô hình Khoa học Chuẩn hóa</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            IPIP Big Five Personality Assessment
          </h3>
          <p className="text-sm text-gray-300">
            Khám phá 5 chiều kích nhân cách cốt lõi giúp bạn thấu hiểu điểm mạnh, xu hướng cảm xúc và định hướng học tập/nghề nghiệp.
          </p>
        </div>

        {/* Assessment Specs Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#160b33] border border-purple-900/50 mb-6 text-center">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-teal" /> Thời lượng
            </span>
            <p className="text-sm sm:text-base font-bold text-white">
              {selectedForm === 'short' ? '3 - 5 phút' : '7 - 10 phút'}
            </p>
          </div>
          <div className="space-y-1 border-x border-purple-900/50">
            <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <FileText className="w-3.5 h-3.5 text-pink-400" /> Số câu hỏi
            </span>
            <p className="text-sm sm:text-base font-bold text-white">
              {selectedForm === 'short' ? '20 câu ngắn' : '50 câu chuẩn'}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Bản quyền
            </span>
            <p className="text-sm sm:text-base font-bold text-teal-300">
              Public Domain (IPIP)
            </p>
          </div>
        </div>

        {/* Form Selector Toggle */}
        <div className="flex gap-2 p-1.5 rounded-xl bg-purple-950/50 border border-purple-900/60 mb-6">
          <button
            onClick={() => setSelectedForm('short')}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedForm === 'short'
                ? 'bg-gradient-to-r from-brand-purple to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Bản Tinh gọn (20 câu - Đề xuất)
          </button>
          <button
            onClick={() => setSelectedForm('standard')}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedForm === 'standard'
                ? 'bg-gradient-to-r from-brand-purple to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Bản Tiêu chuẩn (50 câu đầy đủ)
          </button>
        </div>

        {/* Interactive Sample Question */}
        <div className="p-5 rounded-2xl bg-[#140a30] border border-purple-800/40 mb-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-purple-300 font-semibold">
            <span>CÂU HỎI MẪU TRẢI NGHIỆM</span>
            <span>Thang đo 5 mức độ Likert</span>
          </div>

          <p className="text-base sm:text-lg font-medium text-white">
            &ldquo;Tôi thường là người chủ động bắt chuyện và kết nối khi tham gia một nhóm mới.&rdquo;
          </p>

          <div className="grid grid-cols-5 gap-2 pt-2">
            {[
              { val: 1, label: 'Rất không đúng' },
              { val: 2, label: 'Không đúng' },
              { val: 3, label: 'Trung lập' },
              { val: 4, label: 'Đúng' },
              { val: 5, label: 'Rất đúng' },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setSampleAnswer(opt.val)}
                className={`py-3 px-1 rounded-xl text-center flex flex-col items-center gap-1.5 transition-all ${
                  sampleAnswer === opt.val
                    ? 'bg-gradient-to-b from-brand-purple to-pink-600 text-white border-2 border-white shadow-lg shadow-purple-900/50'
                    : 'bg-purple-950/40 text-gray-300 border border-purple-900/40 hover:bg-purple-900/50'
                }`}
              >
                <span className="text-sm font-bold">{opt.val}</span>
                <span className="text-[10px] hidden sm:block text-gray-200">{opt.label}</span>
              </button>
            ))}
          </div>

          {sampleAnswer && (
            <p className="text-xs text-brand-teal flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã chọn: Điểm mẫu sẽ phản ánh vào chiều kích <strong>Hướng ngoại (Extraversion)</strong>.</span>
            </p>
          )}
        </div>

        {/* Explicit Non-Diagnostic Safeguard Alert */}
        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 flex items-start gap-2.5 mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Lưu ý phi chẩn đoán:</strong> Kết quả nhằm mục đích khám phá bản thân và giáo dục tâm lý, 
            không có giá trị thay thế chẩn đoán tâm thần học hay trị liệu chuyên sâu.
          </span>
        </div>

        {/* Start Action */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/3 py-3 rounded-full border border-purple-800 text-gray-300 hover:text-white font-semibold text-sm transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onClose();
              onStartFullTest();
            }}
            className="w-2/3 py-3 rounded-full bg-gradient-to-r from-brand-purple via-pink-600 to-brand-teal text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Bắt đầu làm bài ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
