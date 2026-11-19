'use client';

import React from 'react';
import { DimensionResult } from '@/data/assessments/types';

interface QuadrantPlaneChartProps {
  scores: Record<string, DimensionResult>;
  locale?: string;
  className?: string;
}

export default function QuadrantPlaneChart({
  scores,
  locale = 'vi',
  className = ''
}: QuadrantPlaneChartProps) {
  // Eysenck Extraversion & Neuroticism scores (0 - 24, mid = 12)
  const extDim = scores.extraversion || scores.e;
  const neuDim = scores.neuroticism || scores.n;

  const extScore = extDim?.score ?? 12;
  const neuScore = neuDim?.score ?? 12;

  // Plane sizing (340 x 340)
  const size = 340;
  const padding = 36;
  const innerSize = size - padding * 2;
  const mid = size / 2;

  // Convert scores (0-24) to SVG pixels:
  // X: 0 => padding, 12 => mid, 24 => size - padding
  const userX = padding + (Math.max(0, Math.min(24, extScore)) / 24) * innerSize;
  // Y: inverted in SVG. 0 => size - padding, 12 => mid, 24 => padding
  const userY = size - (padding + (Math.max(0, Math.min(24, neuScore)) / 24) * innerSize);

  // Quadrant classification
  const isExt = extScore >= 12;
  const isNeu = neuScore >= 12;

  let currentQuadrant: 'choleric' | 'melancholic' | 'phlegmatic' | 'sanguine' = 'choleric';
  if (isExt && isNeu) currentQuadrant = 'choleric';
  else if (!isExt && isNeu) currentQuadrant = 'melancholic';
  else if (!isExt && !isNeu) currentQuadrant = 'phlegmatic';
  else currentQuadrant = 'sanguine';

  return (
    <div className={`p-6 rounded-3xl bg-gradient-to-br from-[#12072b]/90 to-[#090317]/90 border border-purple-500/20 shadow-xl ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{locale === 'vi' ? 'Hệ Tọa Độ 4 Khí Chất Eysenck (2D Temperament Plane)' : 'Eysenck 2D Temperament Plane'}</span>
          </h3>
          <p className="text-xs text-gray-400">
            {locale === 'vi'
              ? 'Định vị vị trí hệ thần kinh của bạn qua trục Hướng Ngoại (E) và Cảm Xúc (N)'
              : 'Mapping neuro-temperament via Extraversion (E) and Neuroticism (N) axes'}
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
            E: {extScore}/24
          </span>
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
            N: {neuScore}/24
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* SVG 2D Plane */}
        <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] shrink-0">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible drop-shadow-2xl">
            <defs>
              {/* Glowing filters */}
              <filter id="glowMarker" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background Quadrant Boxes */}
            {/* Top-Right: Choleric (Nóng nảy) */}
            <rect
              x={mid}
              y={padding}
              width={innerSize / 2}
              height={innerSize / 2}
              fill={currentQuadrant === 'choleric' ? 'rgba(239, 68, 68, 0.16)' : 'rgba(239, 68, 68, 0.05)'}
              stroke={currentQuadrant === 'choleric' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.04)'}
              strokeWidth="1.5"
              rx="12"
            />
            {/* Top-Left: Melancholic (Ưu tư / U sầu) */}
            <rect
              x={padding}
              y={padding}
              width={innerSize / 2}
              height={innerSize / 2}
              fill={currentQuadrant === 'melancholic' ? 'rgba(168, 85, 247, 0.16)' : 'rgba(168, 85, 247, 0.05)'}
              stroke={currentQuadrant === 'melancholic' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 255, 255, 0.04)'}
              strokeWidth="1.5"
              rx="12"
            />
            {/* Bottom-Left: Phlegmatic (Điềm tĩnh / Điềm đạm) */}
            <rect
              x={padding}
              y={mid}
              width={innerSize / 2}
              height={innerSize / 2}
              fill={currentQuadrant === 'phlegmatic' ? 'rgba(20, 184, 166, 0.16)' : 'rgba(20, 184, 166, 0.05)'}
              stroke={currentQuadrant === 'phlegmatic' ? 'rgba(20, 184, 166, 0.5)' : 'rgba(255, 255, 255, 0.04)'}
              strokeWidth="1.5"
              rx="12"
            />
            {/* Bottom-Right: Sanguine (Linh hoạt / Hoạt bát) */}
            <rect
              x={mid}
              y={mid}
              width={innerSize / 2}
              height={innerSize / 2}
              fill={currentQuadrant === 'sanguine' ? 'rgba(245, 158, 11, 0.16)' : 'rgba(245, 158, 11, 0.05)'}
              stroke={currentQuadrant === 'sanguine' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(255, 255, 255, 0.04)'}
              strokeWidth="1.5"
              rx="12"
            />

            {/* Subtle Grid Lines */}
            <line x1={padding} y1={mid} x2={size - padding} y2={mid} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.8" />
            <line x1={mid} y1={padding} x2={mid} y2={size - padding} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.8" />

            {/* Axis Center Cross Marker */}
            <circle cx={mid} cy={mid} r="3" fill="#ffffff" opacity="0.6" />

            {/* Quadrant Name Labels inside corners */}
            <text x={mid + innerSize / 4} y={padding + 22} textAnchor="middle" className="text-[10px] font-bold fill-rose-300">
              CHOLERIC
            </text>
            <text x={mid + innerSize / 4} y={padding + 34} textAnchor="middle" className="text-[8.5px] fill-rose-400/80 font-mono">
              (Nóng Nảy)
            </text>

            <text x={padding + innerSize / 4} y={padding + 22} textAnchor="middle" className="text-[10px] font-bold fill-purple-300">
              MELANCHOLIC
            </text>
            <text x={padding + innerSize / 4} y={padding + 34} textAnchor="middle" className="text-[8.5px] fill-purple-400/80 font-mono">
              (Ưu Tư / U Sầu)
            </text>

            <text x={padding + innerSize / 4} y={mid + innerSize / 4 - 4} textAnchor="middle" className="text-[10px] font-bold fill-teal-300">
              PHLEGMATIC
            </text>
            <text x={padding + innerSize / 4} y={mid + innerSize / 4 + 8} textAnchor="middle" className="text-[8.5px] fill-teal-400/80 font-mono">
              (Điềm Tĩnh)
            </text>

            <text x={mid + innerSize / 4} y={mid + innerSize / 4 - 4} textAnchor="middle" className="text-[10px] font-bold fill-amber-300">
              SANGUINE
            </text>
            <text x={mid + innerSize / 4} y={mid + innerSize / 4 + 8} textAnchor="middle" className="text-[8.5px] fill-amber-400/80 font-mono">
              (Linh Hoạt / Hoạt Bát)
            </text>

            {/* Outer Axis End Titles */}
            <text x={size - padding + 6} y={mid + 3} dominantBaseline="central" className="text-[9px] font-mono fill-gray-400 font-bold">
              +E (24)
            </text>
            <text x={padding - 6} y={mid + 3} textAnchor="end" dominantBaseline="central" className="text-[9px] font-mono fill-gray-400 font-bold">
              -E (0)
            </text>
            <text x={mid} y={padding - 10} textAnchor="middle" className="text-[9px] font-mono fill-gray-400 font-bold">
              +N Cảm Xúc (24)
            </text>
            <text x={mid} y={size - padding + 15} textAnchor="middle" className="text-[9px] font-mono fill-gray-400 font-bold">
              -N Ổn Định (0)
            </text>

            {/* Radar / Echo Waves from user point */}
            <circle
              cx={userX}
              cy={userY}
              r="14"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              opacity="0.4"
              className="animate-ping"
              style={{ transformOrigin: `${userX}px ${userY}px`, animationDuration: '2.5s' }}
            />

            {/* User Point Glow Shadow */}
            <circle
              cx={userX}
              cy={userY}
              r="8"
              fill="#38bdf8"
              filter="url(#glowMarker)"
              opacity="0.8"
            />

            {/* Inner Core Point */}
            <circle
              cx={userX}
              cy={userY}
              r="5"
              fill="#ffffff"
              stroke="#0284c7"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Quadrant Legend & Scientific Explanation */}
        <div className="flex-1 w-full space-y-3">
          {[
            {
              id: 'choleric',
              title: locale === 'vi' ? 'Khí Chất Nóng Nảy (Choleric)' : 'Choleric Temperament',
              sub: locale === 'vi' ? 'Hướng ngoại cao (E ≥ 12) + Cảm xúc kích thích (N ≥ 12)' : 'High E + High N',
              desc: locale === 'vi' ? 'Phản ứng nhanh, quyết đoán, giàu nhiệt huyết, dễ bùng nổ khi gặp rào cản.' : 'Dynamic, driven, responsive, high emotional energy.',
              color: '#ef4444',
              isActive: currentQuadrant === 'choleric'
            },
            {
              id: 'sanguine',
              title: locale === 'vi' ? 'Khí Chất Linh Hoạt (Sanguine)' : 'Sanguine Temperament',
              sub: locale === 'vi' ? 'Hướng ngoại cao (E ≥ 12) + Cảm xúc ổn định (N < 12)' : 'High E + Low N',
              desc: locale === 'vi' ? 'Cởi mở, lạc quan, giỏi giao thiệp, yêu thích sự mới mẻ và kết nối xã hội.' : 'Outgoing, optimistic, adaptable, sociably energized.',
              color: '#f59e0b',
              isActive: currentQuadrant === 'sanguine'
            },
            {
              id: 'melancholic',
              title: locale === 'vi' ? 'Khí Chất Ưu Tư (Melancholic)' : 'Melancholic Temperament',
              sub: locale === 'vi' ? 'Hướng nội (E < 12) + Cảm xúc nhạy bén (N ≥ 12)' : 'Low E + High N',
              desc: locale === 'vi' ? 'Nhạy cảm, sâu sắc, cầu toàn, suy tư thấu đáo, giàu thấu cảm và trí tưởng tượng.' : 'Deep, reflective, conscientious, sensitive to detail.',
              color: '#a855f7',
              isActive: currentQuadrant === 'melancholic'
            },
            {
              id: 'phlegmatic',
              title: locale === 'vi' ? 'Khí Chất Điềm Tĩnh (Phlegmatic)' : 'Phlegmatic Temperament',
              sub: locale === 'vi' ? 'Hướng nội (E < 12) + Cảm xúc vững vàng (N < 12)' : 'Low E + Low N',
              desc: locale === 'vi' ? 'Bình thản, kiên nhẫn, đáng tin cậy, xử lý tình huống ổn định dưới áp lực.' : 'Calm, steady, dependable, balanced nervous system.',
              color: '#14b8a6',
              isActive: currentQuadrant === 'phlegmatic'
            }
          ].map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all text-xs ${
                item.isActive
                  ? 'bg-white/10 border-brand-teal shadow-lg shadow-teal-500/10 scale-[1.01]'
                  : 'bg-white/[0.03] border-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={`font-bold ${item.isActive ? 'text-white' : 'text-gray-300'}`}>
                    {item.title}
                  </span>
                </div>
                {item.isActive && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-teal/20 text-brand-teal border border-brand-teal/40 font-mono text-[10px] font-bold">
                    {locale === 'vi' ? 'VỊ TRÍ CỦA BẠN' : 'YOUR POSITION'}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1 pl-5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
