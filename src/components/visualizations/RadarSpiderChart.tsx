'use client';

import React from 'react';
import { DimensionResult } from '@/data/assessments/types';

interface RadarSpiderChartProps {
  scores: Record<string, DimensionResult>;
  locale?: string;
  className?: string;
}

export default function RadarSpiderChart({
  scores,
  locale = 'vi',
  className = ''
}: RadarSpiderChartProps) {
  // Ordered Big Five OCEAN dimensions
  const oceanKeys = [
    { key: 'openness', labelVi: 'Cởi Mở (Openness)', labelEn: 'Openness', short: 'O', color: '#06b6d4' },
    { key: 'conscientiousness', labelVi: 'Tận Tâm (Conscientiousness)', labelEn: 'Conscientiousness', short: 'C', color: '#10b981' },
    { key: 'extraversion', labelVi: 'Hướng Ngoại (Extraversion)', labelEn: 'Extraversion', short: 'E', color: '#f59e0b' },
    { key: 'agreeableness', labelVi: 'Hài Hòa (Agreeableness)', labelEn: 'Agreeableness', short: 'A', color: '#8b5cf6' },
    { key: 'neuroticism', labelVi: 'Nhạy Cảm (Neuroticism)', labelEn: 'Neuroticism', short: 'N', color: '#ec4899' }
  ];

  // SVG parameters
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 115;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Calculate polygon coordinates for each level
  const totalAxes = oceanKeys.length;
  const angleStep = (2 * Math.PI) / totalAxes;
  const startAngle = -Math.PI / 2; // Start from top (12 o'clock)

  const getCoordinates = (index: number, ratio: number) => {
    const angle = startAngle + index * angleStep;
    return {
      x: cx + maxRadius * ratio * Math.cos(angle),
      y: cy + maxRadius * ratio * Math.sin(angle)
    };
  };

  // User score values normalized (0 to 1)
  const userPoints = oceanKeys.map((item, idx) => {
    const dim = scores[item.key];
    const scoreVal = dim?.score ?? 0;
    const maxVal = dim?.maxScore ?? 50;
    const ratio = Math.max(0.12, Math.min(1.0, scoreVal / maxVal));
    return {
      ...getCoordinates(idx, ratio),
      ratio,
      score: scoreVal,
      max: maxVal,
      dim
    };
  });

  const polygonPath = userPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <div className={`p-6 rounded-3xl bg-gradient-to-br from-[#12072b]/90 to-[#090317]/90 border border-purple-500/20 shadow-xl ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
            <span>{locale === 'vi' ? 'Biểu Đồ Mạng Nhện Tính Cách (OCEAN Radar)' : 'OCEAN Personality Radar Map'}</span>
          </h3>
          <p className="text-xs text-gray-400">
            {locale === 'vi'
              ? 'Mô hình ngũ giác trực quan hóa 5 chiều nhân cách chuẩn hóa quốc tế'
              : 'Pentagon spider graph mapping 5 globally validated personality traits'}
          </p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
          BFI-44 Normative
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* SVG Spider Chart */}
        <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] shrink-0 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <defs>
              <radialGradient id="radarRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="polyStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Concentric Grid Polygons */}
            {levels.map((lvl, lIdx) => {
              const gridPoints = oceanKeys.map((_, i) => {
                const c = getCoordinates(i, lvl);
                return `${c.x.toFixed(1)},${c.y.toFixed(1)}`;
              }).join(' ');
              return (
                <polygon
                  key={lIdx}
                  points={gridPoints}
                  fill={lIdx === levels.length - 1 ? 'rgba(255, 255, 255, 0.02)' : 'none'}
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth={lIdx === levels.length - 1 ? '1.5' : '1'}
                  strokeDasharray={lIdx < levels.length - 1 ? '3 3' : undefined}
                />
              );
            })}

            {/* Axis Lines radiating from center */}
            {oceanKeys.map((_, idx) => {
              const outer = getCoordinates(idx, 1.0);
              return (
                <line
                  key={idx}
                  x1={cx}
                  y1={cy}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* User Filled Data Polygon Area */}
            <path
              d={polygonPath}
              fill="url(#radarRadial)"
              stroke="url(#polyStroke)"
              strokeWidth="2.5"
              className="transition-all duration-700 ease-out"
            />

            {/* Data Vertex Dots and Labels */}
            {userPoints.map((pt, idx) => {
              const item = oceanKeys[idx];
              const outerLabelCoord = getCoordinates(idx, 1.28);
              const percent = Math.round(pt.ratio * 100);

              return (
                <g key={idx}>
                  {/* Glow dot at user score */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill={item.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="animate-pulse"
                  />

                  {/* Outer Axis Label */}
                  <text
                    x={outerLabelCoord.x}
                    y={outerLabelCoord.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-bold text-[11px] fill-white"
                  >
                    {item.short} ({percent}%)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend & Breakdown Details */}
        <div className="flex-1 w-full space-y-2.5">
          {oceanKeys.map((item, idx) => {
            const dim = scores[item.key];
            const scoreVal = dim?.score ?? 0;
            const maxVal = dim?.maxScore ?? 50;
            const percent = Math.round((scoreVal / maxVal) * 100);

            return (
              <div
                key={item.key}
                className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-black text-black"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.short}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-white block truncate">
                      {locale === 'vi' ? item.labelVi : item.labelEn}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {dim?.levelLabel || `${scoreVal}/${maxVal}`}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-extrabold text-sm text-white">{percent}%</span>
                  <div className="w-16 h-1.5 rounded-full bg-white/10 mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
