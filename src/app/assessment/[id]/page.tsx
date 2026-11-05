'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  ShieldAlert, 
  PhoneCall, 
  Sparkles, 
  ExternalLink,
  BookOpen, 
  Clock, 
  FileCheck,
  ChevronLeft,
  Copy,
  Check
} from 'lucide-react';
import { getAssessmentById } from '@/data/assessments';

export default function AssessmentRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params?.id as string;
  const assessment = useMemo(() => getAssessmentById(assessmentId), [assessmentId]);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  if (!assessment) {
    return (
      <div className="min-h-screen bg-[#080314] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="p-6 rounded-3xl bg-[#120729] border border-purple-800/40 max-w-md space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Chưa tìm thấy bài đánh giá</h2>
          <p className="text-gray-400 text-sm">
            Bài trắc nghiệm với mã &ldquo;{assessmentId}&rdquo; hiện đang được chuẩn bị dữ liệu.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold text-sm transition-all shadow-lg shadow-purple-950"
          >
            <ArrowLeft className="w-4 h-4" /> Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const questions = assessment.questions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 180);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(prev => prev + 1);
  };

  const handleFinish = () => {
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const results = useMemo(() => {
    if (!isCompleted) return null;
    return assessment.calculateResults(answers);
  }, [assessment, answers, isCompleted]);

  return (
    <div className="min-h-screen bg-[#080314] text-white flex flex-col selection:bg-brand-purple selection:text-white">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-[#080314]/90 backdrop-blur-md border-b border-purple-900/40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Trang chủ
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-xs sm:text-sm font-semibold text-purple-300">
            {assessment.code}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-purple-950/40 px-3 py-1.5 rounded-full border border-purple-800/40">
            <Clock className="w-3.5 h-3.5 text-brand-teal" />
            <span>Thời lượng: {assessment.duration}</span>
          </div>
          <button
            onClick={handleReset}
            title="Làm lại từ đầu"
            className="p-2 rounded-full text-gray-400 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {!isCompleted ? (
          /* ================= QUESTIONNAIRE RUNNER ================= */
          <div className="w-full space-y-6">
            
            {/* Header info */}
            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-brand-purple-light text-xs font-bold uppercase tracking-wider">
                <span>{assessment.code} • Đánh giá khoa học</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {assessment.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {assessment.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 bg-[#120729] p-3 sm:p-4 rounded-2xl border border-purple-900/40">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300 font-medium">
                  Câu hỏi <strong className="text-white text-sm">{currentIndex + 1}</strong> / {totalQuestions}
                </span>
                <span className="text-brand-teal font-bold">{progressPercent}% Hoàn thành</span>
              </div>
              <div className="w-full h-2 rounded-full bg-purple-950 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-purple via-pink-500 to-brand-teal transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-[#100727] border border-purple-800/50 rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-950/60 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-900/50 text-purple-300 border border-purple-700/50">
                  Câu {currentIndex + 1}
                </span>
                <span className="text-xs text-gray-500 font-mono">#{currentQuestion.id}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white min-h-[64px] flex items-center leading-relaxed">
                &ldquo;{currentQuestion.text}&rdquo;
              </h2>

              {/* Options Selector */}
              <div className={`grid gap-2.5 mt-8 ${
                assessment.options.length <= 4 
                  ? 'grid-cols-1 sm:grid-cols-2' 
                  : 'grid-cols-1 sm:grid-cols-5'
              }`}>
                {assessment.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`text-left p-4 rounded-2xl border transition-all flex sm:flex-col sm:items-center sm:text-center items-start gap-3 group relative ${
                        isSelected
                          ? 'bg-gradient-to-r sm:bg-gradient-to-b from-brand-purple/50 to-pink-900/50 border-pink-500 shadow-lg shadow-purple-900/40 ring-1 ring-pink-500'
                          : 'bg-purple-950/30 border-purple-900/50 hover:bg-purple-900/40 hover:border-purple-700/60'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-br from-pink-500 to-brand-purple text-white shadow-md'
                            : 'bg-purple-900/40 text-purple-300 group-hover:bg-purple-800/60'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-xs sm:text-[13px] font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-5 py-2.5 rounded-full border border-purple-900 text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-950/60 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Câu trước
              </button>

              {answeredCount === totalQuestions ? (
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-teal-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 animate-bounce"
                >
                  <CheckCircle2 className="w-4 h-4" /> Xem Kết Quả Phân Tích
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentIndex === totalQuestions - 1}
                  className="px-5 py-2.5 rounded-full bg-purple-900/60 hover:bg-purple-800 text-sm font-medium text-white disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5"
                >
                  Câu tiếp theo <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick-Jump dots */}
            <div className="pt-4 flex flex-wrap gap-1.5 justify-center max-h-32 overflow-y-auto">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-brand-purple text-white ring-2 ring-purple-400'
                        : isAnswered
                        ? 'bg-emerald-950/60 border border-emerald-600/60 text-emerald-300'
                        : 'bg-purple-950/40 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ================= DETAILED RESULTS DASHBOARD ================= */
          results && (
            <div className="w-full space-y-8 animate-in fade-in duration-300">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-br from-[#1b0a3d] via-[#120729] to-[#0a031a] border border-purple-800/60 rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/50 pb-6 mb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-900/50 border border-purple-700/50 text-purple-300 mb-2">
                      <FileCheck className="w-3.5 h-3.5 text-brand-teal" /> Báo cáo kết quả {assessment.code}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {results.title}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                      {results.summary}
                    </p>
                  </div>

                  {results.actionGuide?.levelBadge && (
                    <div className="bg-purple-950/60 border border-purple-800/50 px-5 py-3 rounded-2xl flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-full animate-ping" style={{ backgroundColor: results.actionGuide.levelColor }} />
                      <div>
                        <p className="text-xs text-gray-400">Đánh giá chung:</p>
                        <p className="text-base font-bold text-white">{results.actionGuide.levelBadge}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dimension Cards Grid */}
                <div className={`grid gap-4 ${
                  Object.keys(results.scores).length === 3 
                    ? 'grid-cols-1 md:grid-cols-3' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {Object.values(results.scores).map((dim) => {
                    const percent = Math.min(100, Math.round((dim.score / dim.maxScore) * 100));
                    return (
                      <div
                        key={dim.id}
                        className="bg-[#120729]/90 border border-purple-900/50 rounded-2xl p-5 space-y-3 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-gray-300">{dim.name}</h3>
                            {dim.levelLabel && (
                              <span
                                className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                                style={{
                                  backgroundColor: `${dim.levelColor || '#A855F7'}15`,
                                  borderColor: `${dim.levelColor || '#A855F7'}50`,
                                  color: dim.levelColor || '#A855F7'
                                }}
                              >
                                {dim.levelLabel}
                              </span>
                            )}
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-white">{dim.score}</span>
                            <span className="text-xs text-gray-500 font-medium">/ {dim.maxScore} điểm</span>
                            {dim.averageScore !== undefined && (
                              <span className="text-xs text-brand-teal ml-auto font-mono">
                                ĐTB: {dim.averageScore}/5.0
                              </span>
                            )}
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-2 rounded-full bg-purple-950 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${percent}%`,
                                backgroundColor: dim.levelColor || '#A855F7'
                              }}
                            />
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-purple-900/30">
                          {dim.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* NotebookLM Dedicated Hub (For BFI-44 or any assessment with notebookLmUrl) */}
              {assessment.notebookLmUrl && (
                <div className="bg-gradient-to-br from-[#1c0e3d] to-[#120729] border border-brand-purple/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-brand-purple/30 border border-brand-purple text-brand-purple-light">
                        <BookOpen className="w-6 h-6 text-teal-300" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                          Sổ Tay Nghiên Cứu NotebookLM (Google)
                        </h2>
                        <p className="text-xs text-gray-300">
                          Được tổng hợp từ các tài liệu khoa học chính thống về {assessment.code}.
                        </p>
                      </div>
                    </div>

                    <a
                      href={assessment.notebookLmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-teal text-white font-bold text-sm shadow-lg shadow-purple-950 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Mở Sổ Tay NotebookLM</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {assessment.notebookLmPrompts && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        💡 Gợi ý câu hỏi bạn có thể copy và hỏi Trợ lý ảo trong NotebookLM:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {assessment.notebookLmPrompts.map((prompt, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleCopyPrompt(prompt)}
                            className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 hover:border-brand-teal/60 cursor-pointer transition-all flex items-center justify-between gap-2 group"
                          >
                            <span className="text-xs text-gray-200 group-hover:text-white leading-relaxed">
                              &ldquo;{prompt}&rdquo;
                            </span>
                            <button
                              type="button"
                              className="text-gray-400 group-hover:text-brand-teal shrink-0 p-1 rounded"
                              title="Copy câu hỏi"
                            >
                              {copiedPrompt === prompt ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Plan Guidance (For DASS-21) */}
              {results.actionGuide && !assessment.notebookLmUrl && (
                <div className="bg-[#100727] border border-purple-900/50 rounded-3xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {results.actionGuide.levelTitle}
                  </h2>
                  <div className="space-y-3">
                    {results.actionGuide.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-950/40 border border-purple-900/40 text-sm text-gray-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>

                  {results.actionGuide.emergencyNote && (
                    <div className="p-4 rounded-2xl bg-red-950/30 border border-red-800/50 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                      <PhoneCall className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <strong className="block text-white font-bold mb-1">
                          Kênh Hỗ Trợ Khẩn Cấp (Bảo mật & Miễn phí):
                        </strong>
                        <p>{results.actionGuide.emergencyNote}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-800 text-gray-300 hover:text-white hover:bg-purple-950/50 text-sm font-semibold transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Làm lại bài test
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-900/70 hover:bg-purple-800 text-white text-sm font-semibold transition-all"
                >
                  Về trang chủ <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          )
        )}
      </main>
    </div>
  );
}
