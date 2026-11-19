'use client';

import React from 'react';
import { DimensionResult } from '@/data/assessments/types';

interface SingleGaugeProps {
  name: string;
  score: number;
  maxScore: number;
  levelLabel?: string;
  levelColor?: string;
  description?: string;
  subLabel?: string;
}

export function SingleGaugeMeter({
  name,
  score,
  maxScore,
  levelLabel,
  levelColor = '#10b981',
  description,
  subLabel
}: SingleGaugeProps) {
  const percent = Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));

  // Arc math: 180 degrees from -180 to 0 (semi-circle on top)
  const radius = 78;
  const strokeWidth = 14;
  const cx = 110;
  const cy = 100;
  const circumference = Math.PI * radius; // Half-circle perimeter
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  // Needle angle (-180deg to 0deg)
  const needleAngle = -180 + (percent / 100) * 180;

  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col items-center text-center space-y-3">
      <div className="flex items-center justify-between w-full">
        <h4 className="font-bold text-sm text-white truncate">{name}</h4>
        {levelLabel && (
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
            style={{
              color: levelColor,
              borderColor: `${levelColor}40`,
              backgroundColor: `${levelColor}15`
            }}
          >
            {levelLabel}
          </span>
        )}
      </div>

      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-[220px] h-[125px] flex items-end justify-center overflow-hidden">
        <svg viewBox="0 0 220 120" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="30%" stopColor="#eab308" />
              <stop offset="65%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Background Track (Muted Grey Arc) */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Color Spectrum Background Track */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Active Filled Progress Arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={levelColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
            filter="url(#gaugeShadow)"
          />

          {/* Rotating Needle */}
          <g
            transform={`rotate(${needleAngle} ${cx} ${cy})`}
            className="transition-transform duration-700 ease-out"
          >
            {/* Needle Body */}
            <line
              x1={cx}
              y1={cy}
              x2={cx + radius - 6}
              y2={cy}
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={cx + radius - 6} cy={cy} r="3" fill={levelColor} />
          </g>

          {/* Pivot Pin Center */}
          <circle cx={cx} cy={cy} r="7" fill="#140b26" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="3" fill={levelColor} />
        </svg>

        {/* Center Digital Score Display */}
        <div className="absolute bottom-0 text-center">
          <div className="flex items-baseline justify-center gap-1 font-mono">
            <span className="text-2xl font-black text-white">{score}</span>
            <span className="text-[11px] text-gray-400">/{maxScore}</span>
          </div>
        </div>
      </div>

      {/* Subtext info */}
      <div className="w-full text-center space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 px-3">
          <span className="text-emerald-400 font-bold">Thấp / Chuẩn</span>
          <span className="text-amber-400 font-bold">Vừa</span>
          <span className="text-rose-400 font-bold">Nghiêm trọng</span>
        </div>
        {description && (
          <p className="text-[11px] text-gray-400 line-clamp-2 pt-1 border-t border-white/5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

interface GaugeMeterChartProps {
  assessmentId: string;
  scores: Record<string, DimensionResult>;
  locale?: string;
  className?: string;
}

export default function GaugeMeterChart({
  assessmentId,
  scores,
  locale = 'vi',
  className = ''
}: GaugeMeterChartProps) {
  const isDass = assessmentId === 'dass-21';
  const isAdhd = assessmentId === 'adhd';

  // For DASS-21, render Stress, Anxiety, Depression
  if (isDass) {
    const dep = scores.depression;
    const anx = scores.anxiety;
    const str = scores.stress;

    return (
      <div className={`p-6 rounded-3xl bg-gradient-to-br from-[#12072b]/90 to-[#090317]/90 border border-purple-500/20 shadow-xl space-y-5 ${className}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
              <span>{locale === 'vi' ? 'Thang Đo Mức Độ Sức Khỏe Tinh Thần (DASS-21 Gauge)' : 'Mental Health Gauge Meters (DASS-21)'}</span>
            </h3>
            <p className="text-xs text-gray-400">
              {locale === 'vi'
                ? 'Đồng hồ trực quan hoá mức độ Căng thẳng, Lo âu và Trầm cảm theo thang chuẩn hóa Lovibond'
                : 'Visual severity meters measuring Stress, Anxiety, and Depression'}
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
            DASS-21 Lovibond
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {str && (
            <SingleGaugeMeter
              name={str.name}
              score={str.score}
              maxScore={str.maxScore}
              levelLabel={str.levelLabel}
              levelColor={str.levelColor}
              description={str.description}
            />
          )}
          {anx && (
            <SingleGaugeMeter
              name={anx.name}
              score={anx.score}
              maxScore={anx.maxScore}
              levelLabel={anx.levelLabel}
              levelColor={anx.levelColor}
              description={anx.description}
            />
          )}
          {dep && (
            <SingleGaugeMeter
              name={dep.name}
              score={dep.score}
              maxScore={dep.maxScore}
              levelLabel={dep.levelLabel}
              levelColor={dep.levelColor}
              description={dep.description}
            />
          )}
        </div>
      </div>
    );
  }

  // For ADHD, render Part A screener, Inattention, Hyperactivity
  if (isAdhd) {
    const partA = scores.partA;
    const inatt = scores.inattention;
    const hyper = scores.hyperactivity;

    return (
      <div className={`p-6 rounded-3xl bg-gradient-to-br from-[#12072b]/90 to-[#090317]/90 border border-purple-500/20 shadow-xl space-y-5 ${className}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{locale === 'vi' ? 'Thang Đo Nguy Cơ Thiếu Chú Ý & Tăng Động (ADHD Meter)' : 'Executive Function Meters (ASRS v1.1)'}</span>
            </h3>
            <p className="text-xs text-gray-400">
              {locale === 'vi'
                ? 'Đồng hồ trực quan hoá chỉ số sàng lọc ASRS v1.1 của Tổ chức Y tế Thế giới (WHO)'
                : 'WHO ASRS v1.1 screener probability & symptom dimensions'}
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
            WHO ASRS v1.1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {partA && (
            <SingleGaugeMeter
              name={partA.name}
              score={partA.score}
              maxScore={partA.maxScore}
              levelLabel={partA.levelLabel}
              levelColor={partA.levelColor}
              description={partA.description}
            />
          )}
          {inatt && (
            <SingleGaugeMeter
              name={inatt.name}
              score={inatt.score}
              maxScore={inatt.maxScore}
              levelLabel={inatt.levelLabel}
              levelColor={inatt.levelColor}
              description={inatt.description}
            />
          )}
          {hyper && (
            <SingleGaugeMeter
              name={hyper.name}
              score={hyper.score}
              maxScore={hyper.maxScore}
              levelLabel={hyper.levelLabel}
              levelColor={hyper.levelColor}
              description={hyper.description}
            />
          )}
        </div>
      </div>
    );
  }

  return null;
}
