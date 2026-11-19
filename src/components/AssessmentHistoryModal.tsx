'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  History, 
  Trash2, 
  Calendar, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { 
  AssessmentHistoryRecord, 
  getAssessmentHistory, 
  deleteAssessmentFromHistory, 
  clearAllAssessmentHistory 
} from '@/lib/assessmentHistory';
import { useTranslation } from '@/i18n/I18nContext';

interface AssessmentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord?: (record: AssessmentHistoryRecord) => void;
}

export default function AssessmentHistoryModal({
  isOpen,
  onClose,
  onSelectRecord
}: AssessmentHistoryModalProps) {
  const { locale, t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<AssessmentHistoryRecord[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'dass-21' | 'bfi-44' | 'eysenck' | 'adhd'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load history on open & listen to reactive storage events
  const refreshHistory = () => {
    setHistory(getAssessmentHistory());
  };

  useEffect(() => {
    if (isOpen) {
      refreshHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('psyquizz_history_updated', refreshHistory);
    return () => window.removeEventListener('psyquizz_history_updated', refreshHistory);
  }, []);

  const filteredHistory = useMemo(() => {
    if (activeFilter === 'all') return history;
    return history.filter((item) => item.assessmentId === activeFilter);
  }, [history, activeFilter]);

  // Extract DASS-21 chronology for Line Chart (sorted from oldest to newest)
  const dassHistoryChronological = useMemo(() => {
    return history
      .filter((item) => item.assessmentId === 'dass-21' && item.dassMetrics)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [history]);

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAssessmentFromHistory(id);
    refreshHistory();
  };

  const handleClearAll = () => {
    if (window.confirm(locale === 'vi' ? 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài?' : 'Are you sure you want to clear all history?')) {
      clearAllAssessmentHistory();
      refreshHistory();
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[99999] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 py-8 sm:py-12 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[58rem] my-auto bg-[#0d071e] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[86vh] [scrollbar-width:thin]"
      >
        
        {/* Modal Header */}
        <div className="px-7 py-5 bg-[#140b28] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <History className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{locale === 'vi' ? 'Lịch Sử Đánh Giá & Theo Dõi Tiến Trình' : 'Assessment History & Health Tracking'}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-mono">
                  {history.length}
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {locale === 'vi' ? 'Lưu trữ an toàn cục bộ (Privacy-first) trên trình duyệt của bạn' : 'Secure privacy-first local storage on this browser'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                title={locale === 'vi' ? 'Xóa toàn bộ' : 'Clear all'}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{locale === 'vi' ? 'Xóa Hết' : 'Clear All'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="px-7 py-3 bg-[#0a0417] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-semibold scrollbar-none">
          {[
            { id: 'all', labelVi: 'Tất Cả', labelEn: 'All Tests', count: history.length },
            { id: 'dass-21', labelVi: 'DASS-21 (Sức khỏe tâm thần)', labelEn: 'DASS-21', count: history.filter(h => h.assessmentId === 'dass-21').length },
            { id: 'bfi-44', labelVi: 'Big Five (BFI-44)', labelEn: 'Big Five', count: history.filter(h => h.assessmentId === 'bfi-44').length },
            { id: 'eysenck', labelVi: 'Khí Chất (EPI-57)', labelEn: 'Eysenck', count: history.filter(h => h.assessmentId === 'eysenck').length },
            { id: 'adhd', labelVi: 'ADHD (ASRS v1.1)', labelEn: 'ADHD', count: history.filter(h => h.assessmentId === 'adhd').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{locale === 'vi' ? tab.labelVi : tab.labelEn}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-gray-300 font-mono">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-7 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* ============================================================== */}
          {/* SPECIAL: DASS-21 LONGITUDINAL LINE CHART TRACKING */}
          {/* ============================================================== */}
          {dassHistoryChronological.length >= 2 && (activeFilter === 'all' || activeFilter === 'dass-21') && (
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#150a30] to-[#0d051f] border border-rose-500/30 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-400" />
                    <span>
                      {locale === 'vi'
                        ? 'Đồ Thị Theo Dõi Sức Khỏe Tinh Thần Qua Từng Lần Test'
                        : 'Longitudinal Mental Health Tracking Timeline'}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    {locale === 'vi'
                      ? 'Biểu đồ đường trực quan theo dõi biến thiên Căng thẳng, Lo âu và Trầm cảm'
                      : 'Trend lines tracking Stress, Anxiety, and Depression changes over time'}
                  </p>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1 text-rose-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span>Stress</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Anxiety</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Depression</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Line Chart */}
              {(() => {
                const chartHeight = 180;
                const chartWidth = 560;
                const paddingX = 40;
                const paddingY = 25;
                const plotWidth = chartWidth - paddingX * 2;
                const plotHeight = chartHeight - paddingY * 2;
                const maxScore = 42; // Standard DASS-21 scale maximum

                const n = dassHistoryChronological.length;
                const getX = (idx: number) => paddingX + (idx / (n - 1)) * plotWidth;
                const getY = (val: number) => chartHeight - paddingY - (Math.min(maxScore, Math.max(0, val)) / maxScore) * plotHeight;

                // Points for each dimension
                const stressPoints = dassHistoryChronological.map((item, idx) => ({
                  x: getX(idx),
                  y: getY(item.dassMetrics?.stress ?? 0),
                  val: item.dassMetrics?.stress ?? 0,
                  date: new Date(item.timestamp).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { month: 'numeric', day: 'numeric' })
                }));

                const anxietyPoints = dassHistoryChronological.map((item, idx) => ({
                  x: getX(idx),
                  y: getY(item.dassMetrics?.anxiety ?? 0),
                  val: item.dassMetrics?.anxiety ?? 0
                }));

                const depressionPoints = dassHistoryChronological.map((item, idx) => ({
                  x: getX(idx),
                  y: getY(item.dassMetrics?.depression ?? 0),
                  val: item.dassMetrics?.depression ?? 0
                }));

                const makePath = (pts: { x: number; y: number }[]) =>
                  pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

                // Trend insight calculation (compare latest with first)
                const firstStress = dassHistoryChronological[0].dassMetrics?.stress ?? 0;
                const latestStress = dassHistoryChronological[n - 1].dassMetrics?.stress ?? 0;
                const stressDiff = latestStress - firstStress;

                return (
                  <div className="space-y-3">
                    <div className="w-full overflow-x-auto">
                      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
                        {/* Reference Bands (Normal: 0-14, Mild-Mod: 15-25, Severe: 26-42) */}
                        <line x1={paddingX} y1={getY(14)} x2={chartWidth - paddingX} y2={getY(14)} stroke="rgba(16, 185, 129, 0.2)" strokeDasharray="4 4" strokeWidth="1" />
                        <line x1={paddingX} y1={getY(25)} x2={chartWidth - paddingX} y2={getY(25)} stroke="rgba(239, 68, 68, 0.2)" strokeDasharray="4 4" strokeWidth="1" />

                        {/* Y-Axis Labels */}
                        <text x={paddingX - 8} y={getY(0)} textAnchor="end" dominantBaseline="central" className="text-[9px] fill-gray-500 font-mono">0</text>
                        <text x={paddingX - 8} y={getY(14)} textAnchor="end" dominantBaseline="central" className="text-[9px] fill-emerald-500/80 font-mono">14 (Chuẩn)</text>
                        <text x={paddingX - 8} y={getY(25)} textAnchor="end" dominantBaseline="central" className="text-[9px] fill-rose-500/80 font-mono">25 (Cảnh báo)</text>
                        <text x={paddingX - 8} y={getY(42)} textAnchor="end" dominantBaseline="central" className="text-[9px] fill-gray-500 font-mono">42</text>

                        {/* Line: Depression */}
                        <path d={makePath(depressionPoints)} fill="none" stroke="#a855f7" strokeWidth="2.5" className="transition-all duration-500" />
                        {/* Line: Anxiety */}
                        <path d={makePath(anxietyPoints)} fill="none" stroke="#f59e0b" strokeWidth="2.5" className="transition-all duration-500" />
                        {/* Line: Stress */}
                        <path d={makePath(stressPoints)} fill="none" stroke="#f43f5e" strokeWidth="2.5" className="transition-all duration-500" />

                        {/* Vertex Dots & Tooltips */}
                        {stressPoints.map((pt, i) => (
                          <g key={`stress-${i}`}>
                            <circle cx={pt.x} cy={pt.y} r="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                            <text x={pt.x} y={chartHeight - 6} textAnchor="middle" className="text-[9px] fill-gray-400 font-mono">
                              {pt.date}
                            </text>
                          </g>
                        ))}

                        {anxietyPoints.map((pt, i) => (
                          <circle key={`anx-${i}`} cx={pt.x} cy={pt.y} r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                        ))}

                        {depressionPoints.map((pt, i) => (
                          <circle key={`dep-${i}`} cx={pt.x} cy={pt.y} r="3.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
                        ))}
                      </svg>
                    </div>

                    {/* Trend Feedback Pill */}
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs">
                      {stressDiff <= 0 ? (
                        <>
                          <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-gray-300">
                            {locale === 'vi'
                              ? `Mức độ Căng thẳng của bạn giảm ${Math.abs(stressDiff)} điểm so với mốc đo ban đầu. Bài tập thở và thói quen đang phát huy tác dụng tích cực!`
                              : `Your Stress score has decreased by ${Math.abs(stressDiff)} points compared to baseline. Keep practicing grounding routines!`}
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-gray-300">
                            {locale === 'vi'
                              ? `Chỉ số Căng thẳng tăng nhẹ +${stressDiff} điểm so với lần trước. Hãy chú ý nghỉ ngơi và ưu tiên bài tập thở xoa dịu thần kinh.`
                              : `Stress level increased by +${stressDiff} points. Prioritize sleep hygiene and calming sensory habits.`}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ============================================================== */}
          {/* HISTORY RECORDS LIST */}
          {/* ============================================================== */}
          {filteredHistory.length === 0 ? (
            <div className="p-12 sm:p-14 text-center rounded-3xl bg-white/[0.02] border border-white/5 space-y-3.5">
              <Clock className="w-10 h-10 text-gray-500 mx-auto" />
              <h4 className="text-base sm:text-lg font-bold text-gray-200">
                {locale === 'vi' ? 'Chưa Có Lịch Sử Đánh Giá Nào' : 'No Assessment History Found'}
              </h4>
              <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
                {locale === 'vi'
                  ? 'Khi bạn hoàn thành bất kỳ bài trắc nghiệm tâm lý nào (BFI-44, EPI-57, DASS-21, ASRS v1.1), kết quả sẽ được tự động lưu tại đây để tiện theo dõi.'
                  : 'Complete an assessment to automatically track and review your progress here.'}
              </p>
              <Link
                href="/#assessments"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all mt-3 cursor-pointer"
              >
                <span>{locale === 'vi' ? 'Làm Bài Test Ngay' : 'Take a Test Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((record) => {
                const dateFormatted = new Date(record.timestamp).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={record.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-all space-y-3.5 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono text-[11px] font-bold">
                          {record.code}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-white">
                          {record.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{dateFormatted}</span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteItem(record.id, e)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title={locale === 'vi' ? 'Xóa bản ghi này' : 'Delete this record'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {record.summary}
                    </p>

                    {/* Dimension Scores Snapshot Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5">
                      {Object.values(record.scores).map((dim) => (
                        <div
                          key={dim.id}
                          className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/5 text-[11px] flex items-center gap-1.5 font-mono"
                        >
                          <span className="text-gray-400">{dim.name}:</span>
                          <span className="font-bold text-white">{dim.score}/{dim.maxScore}</span>
                          {dim.levelLabel && (
                            <span
                              className="text-[10px] font-bold"
                              style={{ color: dim.levelColor || '#a855f7' }}
                            >
                              ({dim.levelLabel})
                            </span>
                          )}
                        </div>
                      ))}

                      {/* Action Link: Retake or View */}
                      <Link
                        href={`/assessment/${record.assessmentId}`}
                        onClick={onClose}
                        className="ml-auto text-xs text-brand-teal hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>{locale === 'vi' ? 'Làm lại bài' : 'Retake'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#140b28] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>
            {locale === 'vi' ? 'Dữ liệu được lưu trữ ẩn danh trên thiết bị của bạn' : 'Data is stored anonymously on your device'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs transition-colors cursor-pointer"
          >
            {locale === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
