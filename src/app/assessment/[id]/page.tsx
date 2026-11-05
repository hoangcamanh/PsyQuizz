'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WaveBackground from '@/components/WaveBackground';
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
      <div className="min-h-screen bg-[#080314] text-white flex flex-col justify-between selection:bg-brand-purple selection:text-white relative">
        <Header onOpenAuth={() => {}} onOpenTest={() => router.push('/')} />
        <main className="flex-1 flex items-center justify-center p-6 text-center z-10">
          <div className="p-8 rounded-2xl bg-[#0d0818] border border-white/15 max-w-md space-y-4 shadow-2xl">
            <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Chưa tìm thấy bài đánh giá</h2>
            <p className="text-gray-400 text-sm">
              Bài trắc nghiệm với mã &ldquo;{assessmentId}&rdquo; hiện đang được chuẩn bị dữ liệu.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-semibold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Về trang chủ
            </Link>
          </div>
        </main>
        <Footer onOpenTest={() => router.push('/')} />
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
    <div className="min-h-screen bg-[#080314] text-white flex flex-col justify-between selection:bg-brand-purple selection:text-white relative overflow-hidden">
      
      {/* 1:1 Silky Wave WebGL Background matching homepage */}
      <WaveBackground />

      {/* Dark overlay & cosmic ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/45" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-purple-600/30 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-pink-500/25 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      {/* Main Header */}
      <div className="relative z-20">
        <Header onOpenAuth={() => {}} onOpenTest={() => router.push('/')} />
      </div>

      {/* Main Questionnaire Runner Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 relative z-10 flex flex-col justify-center">
        {!isCompleted ? (
          /* ================= QUESTIONNAIRE CARD ================= */
          <div className="w-full rounded-2xl bg-[#0d0818] border border-white/15 text-white shadow-2xl shadow-black overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-white/10 bg-[#090512] flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider block">
                  {assessment.code} • Đánh giá khoa học
                </span>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {assessment.name}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-full font-mono font-bold">
                  {currentIndex + 1} / {totalQuestions}
                </span>
                <button
                  onClick={handleReset}
                  title="Làm lại từ đầu"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Câu hỏi #{currentQuestion.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white min-h-[56px] flex items-center leading-relaxed">
                  &ldquo;{currentQuestion.text}&rdquo;
                </h2>
              </div>

              {/* Options */}
              <div className={`grid gap-3 pt-2 ${
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
                      className={`text-left p-4 rounded-xl border transition-all flex sm:flex-col sm:items-center sm:text-center items-start gap-2.5 ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-200'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <span className={`text-xs ${isSelected ? 'font-bold text-black' : 'text-gray-300'}`}>
                        {opt.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Jump Dots */}
              <div className="pt-4 flex flex-wrap gap-1 justify-center max-h-24 overflow-y-auto border-t border-white/5">
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-6 h-6 rounded text-[11px] font-semibold transition-all ${
                        isCurrent
                          ? 'bg-white text-black'
                          : isAnswered
                          ? 'bg-purple-900/60 border border-purple-500/50 text-purple-200'
                          : 'bg-white/5 text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Controls */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#090512] flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              {answeredCount === totalQuestions ? (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 animate-bounce"
                >
                  <CheckCircle2 className="w-4 h-4" /> Xem Kết Quả Phân Tích
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === totalQuestions - 1}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* ================= RESULTS CARD ================= */
          results && (
            <div className="w-full rounded-2xl bg-[#0d0818] border border-white/15 text-white shadow-2xl shadow-black overflow-hidden flex flex-col space-y-6 p-6 sm:p-8 animate-in fade-in duration-300">
              
              {/* Header */}
              <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider block">
                    Báo cáo kết quả {assessment.code}
                  </span>
                  <h1 className="text-2xl font-bold text-white">
                    {results.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {results.summary}
                  </p>
                </div>

                {results.actionGuide?.levelBadge && (
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white self-start sm:self-auto">
                    {results.actionGuide.levelBadge}
                  </div>
                )}
              </div>

              {/* Dimension Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {Object.values(results.scores).map((dim) => {
                  const percent = Math.min(100, Math.round((dim.score / dim.maxScore) * 100));
                  return (
                    <div
                      key={dim.id}
                      className="p-4 rounded-xl bg-[#140b26] border border-white/10 space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold text-white">{dim.name}</h3>
                          {dim.levelLabel && (
                            <span 
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                              style={{
                                color: dim.levelColor || '#a855f7',
                                borderColor: `${dim.levelColor || '#a855f7'}40`,
                                backgroundColor: `${dim.levelColor || '#a855f7'}15`
                              }}
                            >
                              {dim.levelLabel}
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-extrabold text-white">{dim.score}</span>
                          <span className="text-[11px] text-gray-400">/ {dim.maxScore}</span>
                          {dim.averageScore !== undefined && (
                            <span className="text-[11px] text-brand-teal ml-auto font-mono">
                              ĐTB: {dim.averageScore}/5.0
                            </span>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: dim.levelColor || '#a855f7'
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-300 leading-relaxed pt-2 border-t border-white/5">
                        {dim.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* NotebookLM Section (For BFI-44) */}
              {assessment.notebookLmUrl && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-brand-purple/20 border border-purple-500/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-purple-900/50 text-brand-purple-light border border-purple-700/50">
                        <BookOpen className="w-5 h-5 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Tra cứu Sổ tay NotebookLM (Google)
                        </h3>
                        <p className="text-[11px] text-gray-300">
                          Hỏi đáp chuyên sâu dựa trên các tài liệu khoa học về {assessment.code}.
                        </p>
                      </div>
                    </div>

                    <a
                      href={assessment.notebookLmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold transition-all whitespace-nowrap shadow"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Mở Sổ Tay NotebookLM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {assessment.notebookLmPrompts && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider block">
                        Gợi ý câu hỏi mẫu (Bấm để copy):
                      </span>
                      <div className="space-y-1.5">
                        {assessment.notebookLmPrompts.map((prompt, i) => (
                          <div
                            key={i}
                            onClick={() => handleCopyPrompt(prompt)}
                            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400 cursor-pointer transition-all flex items-center justify-between gap-2 text-xs text-gray-200 hover:text-white"
                          >
                            <span>&ldquo;{prompt}&rdquo;</span>
                            <span className="shrink-0 text-gray-400">
                              {copiedPrompt === prompt ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action plan guidance (For DASS-21) */}
              {results.actionGuide && !assessment.notebookLmUrl && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h3 className="text-xs font-bold text-white">
                    {results.actionGuide.levelTitle}
                  </h3>
                  <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside">
                    {results.actionGuide.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>

                  {results.actionGuide.emergencyNote && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-200 text-xs flex items-start gap-2">
                      <PhoneCall className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Kênh hỗ trợ khẩn cấp:</strong> {results.actionGuide.emergencyNote}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Làm lại bài test
                </button>

                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-semibold transition-colors"
                >
                  Về trang chủ
                </Link>
              </div>

            </div>
          )
        )}
      </main>

      {/* Main Footer */}
      <div className="relative z-20">
        <Footer onOpenTest={() => router.push('/')} />
      </div>

    </div>
  );
}
