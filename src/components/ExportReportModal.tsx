'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, Printer, X, ShieldCheck, Calendar, Hash, FileText } from 'lucide-react';
import { DimensionResult } from '@/data/assessments/types';
import AssessmentVisualizer from './visualizations/AssessmentVisualizer';

interface ExportReportModalProps {
  assessment: {
    id: string;
    code: string;
    name: string;
    subtitle: string;
    disclaimer: string;
  };
  results: {
    title: string;
    summary: string;
    scores: Record<string, DimensionResult>;
    actionGuide?: {
      levelTitle: string;
      levelBadge: string;
      levelColor: string;
      recommendations: string[];
      emergencyNote?: string;
      riskTier?: 'green' | 'yellow' | 'red';
    };
  };
  locale?: string;
  anonymousKey?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportReportModal({
  assessment,
  results,
  locale = 'vi',
  anonymousKey = 'PQ-ANON-USER',
  isOpen,
  onClose
}: ExportReportModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const currentDate = new Date().toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[99999] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 py-8 sm:py-12 print:p-0 print:bg-white print:overflow-visible animate-in fade-in duration-200"
    >
      {/* Container Dialog */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl my-auto bg-[#0c061a] border border-white/20 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black print:rounded-none max-h-[86vh] flex flex-col [scrollbar-width:thin]"
      >
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="px-6 py-4 bg-[#140b2a] border-b border-white/10 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-teal" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              {locale === 'vi' ? 'Bản Xem Trước Báo Cáo PDF' : 'PDF Report Preview'}
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-extrabold text-xs shadow-lg flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{locale === 'vi' ? 'Lưu PDF / In Ngay' : 'Save as PDF / Print'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= PRINTABLE REPORT BODY ================= */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-8 bg-[#090414] text-white print:bg-white print:text-black">
          
          {/* Header with PsyQuizz Branding */}
          <div className="border-b-2 border-purple-500/30 print:border-purple-600 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white text-base print:bg-purple-700">
                  Ψ
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white print:text-purple-900">
                  PsyQuizz
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 print:border-teal-700 print:text-teal-800 font-mono font-bold">
                  Certified Psychometrics
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-200 print:text-black pt-1">
                {locale === 'vi' ? 'BÁO CÁO KẾT QUẢ ĐÁNH GIÁ TÂM LÝ KHOA HỌC' : 'SCIENTIFIC PSYCHOMETRIC EVALUATION REPORT'}
              </h1>
              <p className="text-xs text-gray-400 print:text-gray-600">
                {assessment.name} ({assessment.code})
              </p>
            </div>

            {/* Metadata Badges */}
            <div className="space-y-1.5 text-xs text-gray-400 print:text-gray-700 font-mono sm:text-right shrink-0">
              <div className="flex items-center sm:justify-end gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400 print:text-purple-700" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Hash className="w-3.5 h-3.5 text-teal-400 print:text-teal-700" />
                <span>ID: {anonymousKey}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Diagnosis Title & Summary */}
          <div className="p-5 rounded-2xl bg-white/[0.04] print:bg-purple-50 border border-white/10 print:border-purple-200 space-y-2">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-purple-300 print:text-purple-800 block">
              {locale === 'vi' ? 'KẾT QUẢ TỔNG QUAN' : 'EXECUTIVE SUMMARY'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white print:text-purple-950">
              {results.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 print:text-gray-800 leading-relaxed">
              {results.summary}
            </p>
          </div>

          {/* Section 2: Visual Chart Representation */}
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-teal-300 print:text-teal-800 block">
              {locale === 'vi' ? 'BIỂU ĐỒ TRỰC QUAN HÓA CHUYÊN SÂU' : 'DEEP PSYCHOMETRIC VISUALIZATION'}
            </span>
            <div className="print:invert-0 print:border print:border-gray-300 rounded-3xl overflow-hidden">
              <AssessmentVisualizer
                assessmentId={assessment.id}
                scores={results.scores}
                locale={locale}
              />
            </div>
          </div>

          {/* Section 3: Detailed Score Table */}
          <div className="space-y-3">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-purple-300 print:text-purple-800 block">
              {locale === 'vi' ? 'CHI TIẾT ĐIỂM SỐ CÁC THANG ĐO' : 'DIMENSION SCORE BREAKDOWN'}
            </span>
            <div className="overflow-x-auto rounded-2xl border border-white/10 print:border-gray-300">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-white/5 print:bg-gray-100 text-gray-300 print:text-black font-mono font-bold">
                  <tr>
                    <th className="p-3 border-b border-white/10 print:border-gray-300">Thang đo / Dimension</th>
                    <th className="p-3 border-b border-white/10 print:border-gray-300 text-center">Điểm / Score</th>
                    <th className="p-3 border-b border-white/10 print:border-gray-300 text-center">Phân tầng / Level</th>
                    <th className="p-3 border-b border-white/10 print:border-gray-300">Đặc trưng nhận diện</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-gray-200">
                  {Object.values(results.scores).map((dim) => (
                    <tr key={dim.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-white print:text-black">{dim.name}</td>
                      <td className="p-3 text-center font-mono font-bold text-teal-300 print:text-teal-900">
                        {dim.score} / {dim.maxScore}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block"
                          style={{
                            color: dim.levelColor || '#a855f7',
                            borderColor: `${dim.levelColor || '#a855f7'}40`,
                            backgroundColor: `${dim.levelColor || '#a855f7'}15`
                          }}
                        >
                          {dim.levelLabel || 'Tiêu chuẩn'}
                        </span>
                      </td>
                      <td className="p-3 text-gray-300 print:text-gray-700 leading-relaxed text-[11px]">
                        {dim.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Action Guide & Recommendations */}
          {results.actionGuide && results.actionGuide.recommendations?.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-amber-300 print:text-amber-800 block">
                {locale === 'vi' ? 'KHUYẾN NGHỊ HÀNH ĐỘNG KHOA HỌC' : 'SCIENTIFIC RECOMMENDATIONS'}
              </span>
              <div className="p-4 rounded-2xl bg-white/[0.03] print:bg-gray-50 border border-white/10 print:border-gray-300 space-y-2 text-xs">
                <ul className="space-y-2 text-gray-300 print:text-gray-800 list-disc list-inside">
                  {results.actionGuide.recommendations.map((rec, rIdx) => (
                    <li key={rIdx} className="leading-relaxed">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section 5: Medical Disclaimer & Footer */}
          <div className="pt-6 border-t border-white/10 print:border-gray-300 space-y-2 text-[10px] text-gray-400 print:text-gray-600 leading-relaxed">
            <p className="font-bold flex items-center gap-1.5 text-gray-300 print:text-black">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal print:text-teal-800" />
              <span>{locale === 'vi' ? 'Khuyến Cáo Đạo Đức & Miễn Trừ Y Khoa:' : 'Ethical & Clinical Disclaimer:'}</span>
            </p>
            <p>
              {assessment.disclaimer} {locale === 'vi'
                ? 'Báo cáo này được tự động tạo dựa trên câu trả lời tự tường trình của người tham gia. Kết quả mang tính chất tham vấn tâm lý học thuật và định hướng nâng cao nhận thức bản thân, không thay thế cho kết luận chẩn đoán lâm sàng của bác sĩ tâm thần hoặc chuyên gia tâm lý có chứng chỉ hành nghề.'
                : 'This report is generated based on self-reported answers for educational and self-reflection purposes. It does not constitute formal psychiatric or clinical diagnosis.'}
            </p>
            <div className="pt-2 flex items-center justify-between font-mono text-[9px] text-gray-500 print:text-gray-400">
              <span>PsyQuizz Privacy-First Platform • https://psyquizz.com</span>
              <span>Report Security Hash: {Date.now().toString(36).toUpperCase()}</span>
            </div>
          </div>

        </div>

        {/* Bottom Modal Actions (Hidden when printing) */}
        <div className="px-6 py-4 bg-[#140b2a] border-t border-white/10 flex items-center justify-between print:hidden">
          <span className="text-xs text-gray-400">
            {locale === 'vi' ? 'Tip: Chọn "Save as PDF" trong hộp thoại in để lưu file' : 'Tip: Select "Save as PDF" to download file'}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
            >
              {locale === 'vi' ? 'Đóng' : 'Close'}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{locale === 'vi' ? 'Tải Báo Cáo PDF' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
