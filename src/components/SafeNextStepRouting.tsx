'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { trackLiveEvent } from '@/lib/realtimeAnalytics';
import { 
  Heart, 
  Wind, 
  Moon, 
  Clock, 
  ShoppingBag, 
  PhoneCall, 
  Calendar, 
  ShieldAlert, 
  ExternalLink, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  BookOpen, 
  Flame, 
  Coffee, 
  Headphones, 
  X, 
  ChevronRight,
  HeartHandshake,
  Sun,
  Zap,
  Target,
  Brain,
  Layers,
  Compass,
  Smile,
  Shield,
  Activity,
  Feather,
  Sliders,
  Check,
  LucideIcon
} from 'lucide-react';
import { DimensionResult } from '@/data/assessments/types';
import { useTranslation } from '@/i18n/I18nContext';

interface SafeNextStepRoutingProps {
  scores?: Record<string, DimensionResult>;
  actionGuide?: {
    levelTitle: string;
    levelBadge: string;
    levelColor: string;
    recommendations: string[];
    emergencyNote?: string;
    riskTier?: 'green' | 'yellow' | 'red';
  };
  assessmentTitle?: string;
  assessmentId?: string;
}

interface BreathPhase {
  nameVi: string;
  nameEn: string;
  duration: number;
  type: 'inhale' | 'hold' | 'exhale' | 'hold-empty';
  instructionVi: string;
  instructionEn: string;
}

interface AdaptationPoint {
  bold: string;
  text: string;
}

interface AdaptationCard {
  titleVi: string;
  titleEn: string;
  badgeVi: string;
  badgeEn: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  pointsVi: AdaptationPoint[];
  pointsEn: AdaptationPoint[];
}

interface AffiliateProductItem {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  category: string;
  desc: string;
  benefit: string;
  tag: string;
  link: string;
}

interface PersonalizedProfileData {
  badgeVi: string;
  badgeEn: string;
  badgeColor: string;
  titleVi: string;
  titleEn: string;
  exercise: {
    id: string;
    nameVi: string;
    nameEn: string;
    descVi: string;
    descEn: string;
    icon: LucideIcon;
    phases: BreathPhase[];
  };
  cards: [AdaptationCard, AdaptationCard];
  productsHeaderVi: string;
  productsHeaderEn: string;
  products: AffiliateProductItem[];
}

export default function SafeNextStepRouting({
  scores,
  actionGuide,
  assessmentTitle,
  assessmentId
}: SafeNextStepRoutingProps) {
  const { locale } = useTranslation();
  const isVi = locale === 'vi';

  // -------------------------------------------------------------
  // 1. DYNAMIC PROFILE SUBGROUP INFERENCE ENGINE
  // -------------------------------------------------------------
  const subGroupKey = useMemo<string>(() => {
    const id = (assessmentId || '').toLowerCase();
    const title = (assessmentTitle || '').toLowerCase();
    const scoreEntries = Object.entries(scores || {});

    // === ASSESSMENT 1: ADHD SCREENING (ASRS v1.1) ===
    if (
      id === 'adhd' || 
      title.includes('adhd') || 
      title.includes('asrs') ||
      scoreEntries.some(([k]) => k.toLowerCase().includes('inatt') || k.toLowerCase().includes('hyper'))
    ) {
      const inatt = scores?.inattention?.score ?? 0;
      const hyper = scores?.hyperactivity?.score ?? 0;
      const partA = scores?.screeningPartA?.score ?? 0;

      if (inatt >= 18 && hyper >= 18) return 'adhd-combined';
      if (hyper > inatt && hyper >= 16) return 'adhd-hyperactivity';
      if (inatt >= 16 || partA >= 4) return 'adhd-inattention';
      return 'adhd-stable';
    }

    // === ASSESSMENT 2: EYSENCK PERSONALITY INVENTORY (EPI) ===
    if (
      id === 'eysenck' || 
      title.includes('eysenck') || 
      title.includes('khí chất') ||
      (scoreEntries.some(([k]) => k.toLowerCase() === 'extraversion') && scoreEntries.some(([k]) => k.toLowerCase() === 'lie'))
    ) {
      const ext = scores?.extraversion?.score ?? 0;
      const neu = scores?.neuroticism?.score ?? 0;
      const isExt = ext > 12;
      const isNeu = neu > 12;

      if (isExt && isNeu) return 'eysenck-choleric';
      if (isExt && !isNeu) return 'eysenck-sanguine';
      if (!isExt && isNeu) return 'eysenck-melancholic';
      return 'eysenck-phlegmatic';
    }

    // === ASSESSMENT 3: BIG FIVE (BFI-44) ===
    if (
      id === 'bfi-44' || 
      title.includes('bfi') || 
      title.includes('big five') || 
      title.includes('nhân cách') ||
      scoreEntries.some(([k]) => k.toLowerCase() === 'openness')
    ) {
      const extAvg = scores?.extraversion?.averageScore ?? (scores?.extraversion?.score ? scores.extraversion.score / 8 : 3);
      const neuAvg = scores?.neuroticism?.averageScore ?? (scores?.neuroticism?.score ? scores.neuroticism.score / 8 : 3);
      const conAvg = scores?.conscientiousness?.averageScore ?? (scores?.conscientiousness?.score ? scores.conscientiousness.score / 9 : 3);
      const agrAvg = scores?.agreeableness?.averageScore ?? (scores?.agreeableness?.score ? scores.agreeableness.score / 9 : 3);
      const opeAvg = scores?.openness?.averageScore ?? (scores?.openness?.score ? scores.openness.score / 10 : 3);

      // Prioritize the most salient extreme trait
      if (neuAvg >= 3.6) return 'bfi-neurotic';
      if (extAvg <= 2.6) return 'bfi-introvert';
      if (conAvg <= 2.8) return 'bfi-unstructured';
      if (agrAvg >= 4.1) return 'bfi-agreeable-boundary';
      if (opeAvg >= 3.9) return 'bfi-open-creative';
      if (extAvg >= 3.8) return 'bfi-extrovert';
      return 'bfi-introvert';
    }

    // === ASSESSMENT 4: DASS-21 (DEPRESSION, ANXIETY, STRESS) ===
    let depPriority = 0;
    let anxPriority = 0;
    let strPriority = 0;

    for (const [key, dim] of scoreEntries) {
      const k = key.toLowerCase();
      const lbl = (dim.levelLabel || '').toLowerCase();
      let weight = 1;
      if (lbl.includes('rất nặng') || lbl.includes('extremely severe')) weight = 4;
      else if (lbl.includes('nặng') || lbl.includes('severe')) weight = 3;
      else if (lbl.includes('vừa') || lbl.includes('moderate')) weight = 2;

      const ratio = dim.maxScore ? (dim.score / dim.maxScore) : 0;
      const val = weight * 10 + ratio;

      if (k.includes('depress') || k.includes('trầm cảm')) depPriority = val;
      else if (k.includes('anx') || k.includes('lo âu')) anxPriority = val;
      else if (k.includes('stress') || k.includes('căng thẳng')) strPriority = val;
    }

    // Check for high triad
    if (depPriority >= 30 && anxPriority >= 30 && strPriority >= 30) {
      return 'dass-comorbid';
    }
    if (anxPriority > depPriority && anxPriority > strPriority && anxPriority >= 15) {
      return 'dass-anxiety';
    }
    if (depPriority > anxPriority && depPriority > strPriority && depPriority >= 15) {
      return 'dass-depression';
    }
    if (strPriority >= 15) {
      return 'dass-stress';
    }
    return 'dass-balanced';
  }, [assessmentId, assessmentTitle, scores]);

  // Deduce Risk Tier dynamically
  const riskTier = useMemo<'green' | 'yellow' | 'red'>(() => {
    if (actionGuide?.riskTier) return actionGuide.riskTier;

    const scoreList = Object.values(scores || {});
    const isSevere = scoreList.some((s) => {
      const lbl = (s.levelLabel || '').toLowerCase();
      return (
        lbl.includes('rất nặng') ||
        lbl.includes('nặng') ||
        lbl.includes('severe') ||
        lbl.includes('extremely severe')
      );
    });
    if (isSevere) return 'red';

    const isModerate = scoreList.some((s) => {
      const lbl = (s.levelLabel || '').toLowerCase();
      return (
        lbl.includes('vừa') ||
        lbl.includes('moderate') ||
        lbl.includes('cao') ||
        lbl.includes('high') ||
        lbl.includes('elevated')
      );
    });
    if (isModerate) return 'yellow';

    return 'green';
  }, [actionGuide, scores]);

  // -------------------------------------------------------------
  // 2. MASTER PERSONALIZED ROUTING MATRIX (ALL 4 ASSESSMENTS)
  // -------------------------------------------------------------
  const profileData = useMemo<PersonalizedProfileData>(() => {
    switch (subGroupKey) {
      // =========================================================
      // GROUP 1: DASS-21 SUBGROUPS
      // =========================================================
      case 'dass-anxiety':
        return {
          badgeVi: '🌿 Cắt Cơn Lo Âu & Điều Hòa Amygdala',
          badgeEn: '🌿 Anxiety Downregulation & Amygdala Reset',
          badgeColor: '#f59e0b',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Tâm trí Lo âu & Bất an',
          titleEn: 'Evidence-Based Nervous System Downregulation for Anxiety',
          exercise: {
            id: 'box-breathing',
            nameVi: 'Kỹ thuật Thở Hộp Box Breathing 4-4-4-4 (Đặc nhiệm Navy SEAL)',
            nameEn: '4-4-4-4 Box Breathing Technique (Navy SEAL Protocol)',
            descVi: 'Ngắt phản xạ hoảng sợ của hạch hạnh nhân (Amygdala) và tái lập quyền điều hành bình tĩnh của vỏ não trước trán.',
            descEn: 'Disrupts acute sympathetic panic loops and resets prefrontal cognitive control in 4 equal quadrants.',
            icon: Shield,
            phases: [
              { nameVi: 'Hít vào', nameEn: 'Inhale', duration: 4, type: 'inhale', instructionVi: 'Hít sâu êm dịu bằng mũi trong 4 giây...', instructionEn: 'Inhale smoothly through your nose for 4 seconds...' },
              { nameVi: 'Giữ hơi', nameEn: 'Hold', duration: 4, type: 'hold', instructionVi: 'Giữ căng nhẹ lồng ngực trong 4 giây...', instructionEn: 'Hold air steadily in your chest for 4 seconds...' },
              { nameVi: 'Thở ra', nameEn: 'Exhale', duration: 4, type: 'exhale', instructionVi: 'Thở từ từ bằng miệng giải phóng áp lực trong 4 giây...', instructionEn: 'Exhale smoothly through your mouth for 4 seconds...' },
              { nameVi: 'Nín thở', nameEn: 'Empty', duration: 4, type: 'hold-empty', instructionVi: 'Nín thở tĩnh lặng, buông lỏng hoàn toàn trong 4 giây...', instructionEn: 'Rest quietly in empty stillness for 4 seconds...' }
            ]
          },
          cards: [
            {
              titleVi: 'Kỹ thuật "Khoanh vùng Giờ Lo âu" (Worry Window)',
              titleEn: 'Worry Window Protocol (Cognitive Containment)',
              badgeVi: 'Ngắt vòng lặp suy diễn',
              badgeEn: 'Stops Rumination Spirals',
              icon: Clock,
              iconColor: 'text-amber-300',
              iconBg: 'bg-amber-500/20 border-amber-500/30',
              pointsVi: [
                { bold: 'Cố định 15 phút mỗi chiều:', text: 'Đặt khung giờ cố định (ví dụ 16:30–16:45) chỉ để viết tất cả các nỗi lo và kịch bản bất an ra giấy.' },
                { bold: 'Trì hoãn lo âu ngoài giờ:', text: 'Khi nỗi sợ ập đến bất chợt, tự nhủ: "Tôi ghi nhận điều này và sẽ suy nghĩ kỹ về nó vào đúng 16:30".' },
                { bold: 'Bộ lọc kiểm soát 2 cột:', text: 'Chia đôi tờ giấy: Điều tôi kiểm soát được (lên 1 hành động) vs Điều nằm ngoài kiểm soát (thực hành buông bỏ).' }
              ],
              pointsEn: [
                { bold: 'Designate 15m daily:', text: 'Schedule a fixed 15-min window (e.g., 4:30–4:45 PM) purely to journal anxieties and worst-case worries.' },
                { bold: 'Postpone off-hours spirals:', text: 'When worry pops up outside your window, mentally say: "Noted, I will process this at 4:30 PM".' },
                { bold: '2-Column Control Audit:', text: 'Categorize what you can influence (plan 1 action) vs what is outside your control (practice mindful release).' }
              ]
            },
            {
              titleVi: 'Giảm tải Kích thích Cảm giác & Cắt Giảm Caffeine',
              titleEn: 'Sensory Downregulation & Caffeine Curfew',
              badgeVi: 'Hạ nhạy cảm hạch hạnh nhân',
              badgeEn: 'Calming Hypervigilance',
              icon: ShieldAlert,
              iconColor: 'text-emerald-300',
              iconBg: 'bg-emerald-500/20 border-emerald-500/30',
              pointsVi: [
                { bold: 'Giới nghiêm Caffeine sau 12:00:', text: 'Caffeine khóa thụ thể Adenosine, làm tim đập nhanh mô phỏng gần như y hệt cơn hoảng loạn tiềm thức.' },
                { bold: 'Kỹ thuật neo giác quan 5-4-3-2-1:', text: 'Khi thấy ngực thắt lại: gọi tên 5 vật nhìn thấy, 4 thứ chạm được, 3 âm thanh, 2 mùi hương, 1 vị nếm.' },
                { bold: 'Chườm lạnh dây thần kinh phế vị:', text: 'Rửa mặt bằng nước mát hoặc áp túi lạnh sau gáy 30 giây để kích hoạt phản xạ lặn hạ nhịp tim cấp tốc.' }
              ],
              pointsEn: [
                { bold: 'No caffeine past 12:00 PM:', text: 'Caffeine blocks adenosine receptors, accelerating heartbeat and mimicking subclinical panic sensations.' },
                { bold: '5-4-3-2-1 Sensory Grounding:', text: 'Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste to pull mind out of cognitive panic.' },
                { bold: 'Vagus cold compress:', text: 'Splashing cool water on your face or applying a cold pack to your neck resets acute heart rate via the diving reflex.' }
              ]
            }
          ],
          productsHeaderVi: 'Góc Xoa Dịu Hệ Thần Kinh & Cắt Cơn Bồn Chồn',
          productsHeaderEn: 'Nervous System Calming & Grounding Aids',
          products: [
            { id: 'tea-chamomile', icon: Coffee, color: '#f59e0b', title: isVi ? 'Trà Thảo Mộc Hoa Cúc & Lavender' : 'Chamomile & Lavender Herbal Tea', category: isVi ? 'Xoa Dịu Hệ Thần Kinh' : 'Nervous System Soothing', desc: isVi ? 'Hợp chất Apigenin tự nhiên gắn kết thụ thể GABA trong não, hạ mức cortisol và kích thích cảm giác bình an.' : 'Natural apigenin flavonoids bind to GABA receptors, dampening cortisol and promoting restful pre-sleep calmness.', benefit: isVi ? 'Giảm 28% lo âu thoáng qua & cải thiện độ sâu giấc ngủ' : 'Reduces situational anxiety & boosts deep sleep latency', tag: isVi ? 'Lựa chọn số 1' : 'Top Choice', link: 'https://shopee.vn/search?keyword=tra%20hoa%20cuc%20lavender' },
            { id: 'weighted-blanket', icon: Shield, color: '#6366f1', title: isVi ? 'Chăn Trọng Lực Giảm Lo Âu (Weighted Blanket)' : 'Deep Pressure Touch Weighted Blanket', category: isVi ? 'Liệu Pháp Tiếp Xúc Sâu' : 'Sensory Compression Therapy', desc: isVi ? 'Trọng lượng phân bổ đều tạo hiệu ứng ôm bọc tự nhiên (DPT), kích thích giải phóng serotonin và làm dịu phản ứng giật mình.' : 'Evenly distributed pressure stimulates deep touch receptors, promoting serotonin release and quieting hypervigilance.', benefit: isVi ? 'Cắt cơn hồi hộp ban đêm & mang lại cảm giác an toàn tuyệt đối' : 'Soothes nocturnal restlessness and restores psychological safety', tag: isVi ? 'Khuyên dùng' : 'Recommended', link: 'https://shopee.vn/search?keyword=chan%20trong%20luc' },
            { id: 'book-untethered', icon: BookOpen, color: '#8b5cf6', title: isVi ? 'Sách "Cởi Trói Linh Hồn" & "Dám Bị Ghét"' : '"The Untethered Soul" & "The Courage to Be Disliked"', category: isVi ? 'Tâm Lý Học Nhận Thức' : 'Cognitive Insight', desc: isVi ? 'Phương pháp quan sát những tiếng nói lo lắng bên trong mà không đồng nhất bản thân với nỗi sợ hãi.' : 'Mindful frameworks to observe anxious mental dialogue without confusing internal fears for personal truth.', benefit: isVi ? 'Giải tỏa nỗi sợ bị phán xét & làm chủ tâm trí' : 'Overcomes fear of external judgment and builds inner calm', tag: isVi ? 'Sách gối đầu giường' : 'Essential Read', link: 'https://tiki.vn/search?q=coi+troi+linh+hon' },
            { id: 'theta-binaural', icon: Headphones, color: '#14b8a6', title: isVi ? 'Sóng Não Theta & Tiếng Mưa Pink Noise' : 'Theta Wave & Pink Noise Soundscape', category: isVi ? 'Âm Thanh Trị Liệu' : 'Acoustic Sound Therapy', desc: isVi ? 'Dải tần số âm thanh Theta giúp kéo não bộ đang ở tần số Beta hoảng loạn về trạng thái bình yên sâu.' : 'Gentle acoustic frequencies guide rapid beta stress rhythms into deep, restorative theta brainwaves.', benefit: isVi ? 'Xoa dịu tim đập nhanh chỉ sau 10 phút lắng nghe' : 'Calms rapid pulse within 10 minutes of active listening', tag: isVi ? 'Miễn phí' : 'Free Access', link: 'https://www.youtube.com/results?search_query=theta+waves+anxiety+relief' }
          ]
        };

      case 'dass-depression':
        return {
          badgeVi: '☀️ Kích Hoạt Hành Vi & Tái Tạo Dopamine',
          badgeEn: '☀️ Behavioral Activation & Dopamine Spark',
          badgeColor: '#ec4899',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Tái tạo Năng lượng & Động lực',
          titleEn: 'Evidence-Based Behavioral Activation & Energy Recovery',
          exercise: {
            id: 'coherent-breathing',
            nameVi: 'Nhịp Thở Năng Lượng & Mở Rộng Lồng Ngực 5-2-5 (Coherent Breathing)',
            nameEn: '5-2-5 Energizing Coherent Breathwork',
            descVi: 'Tăng cường lưu thông oxy lên não, giải phóng cảm giác đè nén ở ngực và đánh thức năng lượng cơ thể.',
            descEn: 'Elevates cerebral blood oxygenation, clearing chest heaviness and gently activating vital physical energy.',
            icon: Sun,
            phases: [
              { nameVi: 'Hít sâu', nameEn: 'Inhale', duration: 5, type: 'inhale', instructionVi: 'Hít sâu mở rộng khoang ngực, đón nhận sinh khí mới trong 5 giây...', instructionEn: 'Inhale deeply expanding your chest, welcoming fresh vitality for 5s...' },
              { nameVi: 'Giữ nhẹ', nameEn: 'Pause', duration: 2, type: 'hold', instructionVi: 'Giữ nhẹ kết nối tâm trí tĩnh tại trong 2 giây...', instructionEn: 'Pause gently holding mindful connection for 2 seconds...' },
              { nameVi: 'Thở thanh lọc', nameEn: 'Exhale', duration: 5, type: 'exhale', instructionVi: 'Thở sạch giải tỏa mọi trì trệ ra ngoài trong 5 giây...', instructionEn: 'Exhale fully releasing stagnation and heaviness for 5 seconds...' }
            ]
          },
          cards: [
            {
              titleVi: 'Kích hoạt Hành vi Vi mô (Quy tắc 2 Phút Tối thiểu)',
              titleEn: 'Behavioral Activation (2-Minute Micro-Action Rule)',
              badgeVi: 'Tái tạo Dopamine tự nhiên',
              badgeEn: 'Dopamine Loop Kickstart',
              icon: Target,
              iconColor: 'text-amber-300',
              iconBg: 'bg-amber-500/20 border-amber-500/30',
              pointsVi: [
                { bold: 'Hành động trước, cảm hứng theo sau:', text: 'Đừng chờ có động lực mới bắt đầu. Não bộ chỉ tiết dopamine sau khi nhìn thấy bằng chứng hành động đầu tiên.' },
                { bold: 'Quy tắc cam kết 2 phút:', text: 'Chỉ cam kết làm việc nhỏ nhất có thể: mở cửa sổ, gấp góc chăn, hoặc rửa 1 chiếc cốc. Hết 2 phút có quyền dừng lại.' },
                { bold: 'Nhật ký ghi nhận vi mô (Micro-wins):', text: 'Ghi lại 3 điều nhỏ đã hoàn thành trong ngày thay vì dằn vặt những việc chưa làm, giúp tái lập cảm giác có quyền tự quyết.' }
              ],
              pointsEn: [
                { bold: 'Action precedes motivation:', text: 'Never wait to feel like doing something. Neural dopamine loops ignite only after observing physical motion.' },
                { bold: '2-minute micro-commitment:', text: 'Commit to the smallest conceivable step: open a window, make 1 bed corner, wash 1 cup. Stop guilt-free at 2 mins.' },
                { bold: 'Log micro-wins:', text: 'Jot down 3 humble things accomplished today instead of fixating on backlogs, rebuilding sense of agency.' }
              ]
            },
            {
              titleVi: 'Liệu pháp Ánh sáng Sớm & Vận động Hai bên (Bilateral)',
              titleEn: 'Morning Circadian Sunlight & Bilateral Walk',
              badgeVi: 'Đồng bộ Serotonin sinh học',
              badgeEn: 'Circadian Mood Regulation',
              icon: Sun,
              iconColor: 'text-yellow-300',
              iconBg: 'bg-yellow-500/20 border-yellow-500/30',
              pointsVi: [
                { bold: 'Tắm nắng sáng 15 phút:', text: 'Đón ánh sáng mặt trời tự nhiên trong vòng 30 phút sau khi thức dậy kích thích tế bào hạch võng mạc tiết Serotonin và đặt lại đồng hồ sinh học.' },
                { bold: 'Đi bộ bước đều 15 phút ngoài trời:', text: 'Nhịp vận động hai bên (Bilateral stimulation) làm dịu hoạt động quá mức của mạng lưới mặc định (DMN) gây u sầu.' },
                { bold: 'Duy trì khung giờ thức dậy cố định:', text: 'Giữ giờ thức dậy chênh lệch không quá 30 phút giữa ngày làm việc và cuối tuần để bảo vệ nhịp nội tiết tố vỏ thượng thận.' }
              ],
              pointsEn: [
                { bold: '15m morning sunlight:', text: 'View natural sunlight within 30 mins of waking to trigger retinal ganglion cells, boosting daytime serotonin.' },
                { bold: '15m outdoor bilateral walk:', text: 'Rhythmic bilateral walking quiets hyperactive default mode network (DMN) rumination and physical lethargy.' },
                { bold: 'Consistent wake-up anchor:', text: 'Keep wake-up time consistent within 30 mins across weekdays and weekends to anchor circadian endocrine rhythm.' }
              ]
            }
          ],
          productsHeaderVi: 'Góc Đánh Thức Năng Lượng & Kích Hoạt Động Lực',
          productsHeaderEn: 'Circadian Energy & Behavioral Spark Aids',
          products: [
            { id: 'sad-lamp', icon: Sun, color: '#f59e0b', title: isVi ? 'Đèn Liệu Pháp Ánh Sáng Mặt Trời (SAD Lamp 10,000 Lux)' : '10,000 Lux Circadian Light Therapy Lamp', category: isVi ? 'Liệu Pháp Quang Học' : 'Circadian Phototherapy', desc: isVi ? 'Mô phỏng ánh sáng mặt trời tự nhiên không chứa tia UV, kích thích tế bào võng mạc tiết Serotonin và xua tan u uất.' : 'Emits UV-free daylight-spectrum luminosity, stimulating retinal cells to synthesize daytime serotonin and lift mood.', benefit: isVi ? 'Cải thiện mức năng lượng buổi sáng & giảm uể oải' : 'Boosts morning alertness and curbs seasonal depressive fatigue', tag: isVi ? 'Hiệu quả cao' : 'High Efficacy', link: 'https://shopee.vn/search?keyword=den%20quang%20tri%20lieu%20sad%20lamp' },
            { id: 'citrus-oil', icon: Flame, color: '#ea580c', title: isVi ? 'Tinh Dầu Vỏ Cam Ngọt (Sweet Orange) & Bạc Hà' : 'Sweet Orange & Peppermint Essential Oil', category: isVi ? 'Hương Thơm Kích Hoạt Thần Kinh' : 'Invigorating Aromatherapy', desc: isVi ? 'Hợp chất Limonene trong cam ngọt kích hoạt thụ thể khứu giác chuyển tín hiệu phấn chấn trực tiếp lên hệ viền não bộ.' : 'Natural limonene terpenes invigorate olfactory nerves, sending uplifting emotional signals to the brain limbic system.', benefit: isVi ? 'Xua tan cảm giác thờ ơ, u ám trong không gian phòng' : 'Disperses apathy and freshens mental energy', tag: isVi ? 'Khuyên dùng' : 'Recommended', link: 'https://shopee.vn/search?keyword=tinh%20dau%20cam%20ngot' },
            { id: 'book-compassion', icon: BookOpen, color: '#ec4899', title: isVi ? 'Sách "Tự Trắc Ẩn (Self-Compassion)" & "Hiểu Về Trái Tim"' : '"Self-Compassion" by Kristin Neff & "Understanding the Heart"', category: isVi ? 'Thấu Cảm Bản Thân' : 'Empathetic Healing', desc: isVi ? 'Hướng dẫn dừng dằn vặt bản thân, chuyển đổi kẻ chỉ trích nội tâm thành một người bạn thấu hiểu đầy lòng trắc ẩn.' : 'Guides you to disarm the inner critic and cultivate unconditional gentleness toward your vulnerable moments.', benefit: isVi ? 'Chữa lành cảm giác tự ti, vô dụng và kiệt quệ tinh thần' : 'Heals self-blame and emotional numbness', tag: isVi ? 'Chữa lành' : 'Healing Read', link: 'https://tiki.vn/search?q=tu+trac+an+kristin+neff' },
            { id: 'gratitude-journal', icon: Sparkles, color: '#10b981', title: isVi ? 'Sổ Tay Nhật Ký Biết Ơn 5 Phút (Five Minute Journal)' : 'The 5-Minute Daily Gratitude & Micro-Wins Journal', category: isVi ? 'Tâm Lý Học Tích Cực' : 'Positive Psychology', desc: isVi ? 'Thiết kế câu hỏi tối giản không gây áp lực, giúp não bộ tái thiết lập khả năng nhận diện những điều tốt đẹp vi mô.' : 'Low-friction structured prompts designed to gently retrain depressed neural circuits toward micro-gratitude.', benefit: isVi ? 'Tạo lập chuỗi thành tựu nhỏ và tái tạo niềm hy vọng' : 'Builds consistent micro-accomplishments and restores hope', tag: isVi ? 'Bán chạy nhất' : 'Best Seller', link: 'https://shopee.vn/search?keyword=five%20minute%20journal' }
          ]
        };

      // =========================================================
      // GROUP 2: ADHD SCREENING (ASRS v1.1) SUBGROUPS
      // =========================================================
      case 'adhd-inattention':
      case 'adhd-combined':
        return {
          badgeVi: '⚡ Tối Ưu Não Bộ ADHD & Chống Xao Nhãng',
          badgeEn: '⚡ Executive Scaffold & Focus Protection',
          badgeColor: '#06b6d4',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Não bộ Thiếu Chú Ý & ADHD',
          titleEn: 'Executive Function Scaffolding & Focus Optimization',
          exercise: {
            id: 'anchor-breathing',
            nameVi: 'Kỹ thuật Thở Neo Chú Ý 3-3-3 (Anchor Breath Reset)',
            nameEn: '3-3-3 Attention Anchor Breath Reset',
            descVi: 'Thiết kế nhịp ngắn tốc độ cao dành cho não bộ ADHD: kéo sự chú ý đang nhảy nhót quay về điểm neo xúc giác hiện tại.',
            descEn: 'Fast-cycle grounding rhythm designed for ADHD minds: anchors drifting attention back to tangible sensory presence.',
            icon: Zap,
            phases: [
              { nameVi: 'Hít neo', nameEn: 'Inhale', duration: 3, type: 'inhale', instructionVi: 'Hít vào, dồn trọn vẹn sự chú ý vào luồng khí đầu mũi trong 3 giây...', instructionEn: 'Inhale, placing sharp focus on the air sensation at your nostrils for 3s...' },
              { nameVi: 'Giữ nhận diện', nameEn: 'Hold', duration: 3, type: 'hold', instructionVi: 'Giữ hơi nhận diện cơ thể đang ngồi vững vàng trong 3 giây...', instructionEn: 'Hold air, sensing your physical grounding for 3 seconds...' },
              { nameVi: 'Thở xả tạp niệm', nameEn: 'Exhale', duration: 3, type: 'exhale', instructionVi: 'Thở dứt khoát đẩy mọi luồng suy nghĩ tản mác ra ngoài trong 3 giây...', instructionEn: 'Exhale decisively, blowing away wandering thoughts for 3 seconds...' }
            ]
          },
          cards: [
            {
              titleVi: 'Hệ Thống Não Bộ Ngoại Vi (External Brain System)',
              titleEn: 'External Brain System (Working Memory Scaffold)',
              badgeVi: 'Bảo vệ trí nhớ đệm',
              badgeEn: 'Working Memory Protection',
              icon: Brain,
              iconColor: 'text-cyan-300',
              iconBg: 'bg-cyan-500/20 border-cyan-500/30',
              pointsVi: [
                { bold: 'Trực quan hóa tuyệt đối:', text: '"Nếu không nhìn thấy, nó không tồn tại" (Out of sight, out of mind). Dán post-it hoặc dùng bảng Kanban trực quan ngay trước bàn làm việc.' },
                { bold: 'Nguyên tắc tối đa 3 thẻ In-Progress:', text: 'Không bao giờ để quá 3 việc đang dang dở cùng lúc để tránh làm sụp đổ dung lượng trí nhớ làm việc (Working Memory).' },
                { bold: 'Giảm ma sát khởi động từ tối hôm trước:', text: 'Bày sẵn tài liệu, mở sẵn file cần làm từ đêm trước để sáng hôm sau vào việc mà không tốn ý chí khởi động.' }
              ],
              pointsEn: [
                { bold: 'Radical visual cues:', text: '"Out of sight, out of mind." Keep primary tasks on physical sticky notes or a visual kanban board in direct line of sight.' },
                { bold: 'Max 3 in-progress rule:', text: 'Never allow more than 3 active tasks simultaneously to prevent executive working memory overload and paralysis.' },
                { bold: 'Zero-friction staging:', text: 'Stage work files, clothes, and workspace the night before so morning task initiation requires zero executive effort.' }
              ]
            },
            {
              titleVi: 'Chiến lược Kích hoạt Dopamine Sạch (Micro-Sprint 15m)',
              titleEn: 'Clean Dopamine Pacing (15m Micro-Sprint & Doubling)',
              badgeVi: 'Phá vỡ chứng "Mù thời gian"',
              badgeEn: 'Curing Time Blindness',
              icon: Zap,
              iconColor: 'text-amber-300',
              iconBg: 'bg-amber-500/20 border-amber-500/30',
              pointsVi: [
                { bold: 'Cuộc đua Micro-Sprint 15 phút:', text: 'Não ADHD ghét cam kết 60 phút nhưng hào hứng với thử thách ngắn 15 phút bấm giờ xem giải quyết được bao nhiêu chi tiết.' },
                { bold: 'Hiệu ứng Body Doubling:', text: 'Ngồi làm việc cùng phòng với bạn bè hoặc bật video "Study with me" để sự hiện diện của người khác kích thích sự tập trung thụ động.' },
                { bold: 'Âm thanh Brown Noise đơn điệu:', text: 'Dải tần số Brown Noise trầm ấm giúp triệt tiêu tiếng ồn trắng và tiếng nói nhỏ luyên thuyên bên trong đầu.' }
              ],
              pointsEn: [
                { bold: '15-minute timer sprint:', text: 'ADHD brains resist 60-min blocks but thrive on gamified 15-min visual sprints racing against the clock.' },
                { bold: 'Body Doubling effect:', text: 'Work alongside a colleague or play silent "Study With Me" video streams to harness passive social accountability.' },
                { bold: 'Brown Noise immersion:', text: 'Continuous deep brown noise dampens chaotic internal mental chatter far better than lyrical playlists.' }
              ]
            }
          ],
          productsHeaderVi: 'Công Cụ Hỗ Trợ Não Bộ Đa Dạng Thần Kinh & Tập Trung',
          productsHeaderEn: 'ADHD Focus & Neurodivergent Living Aids',
          products: [
            { id: 'visual-timer', icon: Clock, color: '#ef4444', title: isVi ? 'Đồng Hồ Đếm Ngược Trực Quan Đĩa Màu (Visual Timer)' : '60-Minute Visual Countdown Rainbow Timer', category: isVi ? 'Công Cụ Chống Mù Thời Gian' : 'Time-Blindness Aid', desc: isVi ? 'Hiển thị lượng thời gian trôi qua bằng đĩa màu trực quan, giúp não bộ ADHD "nhìn thấy" thời gian và tập trung hoàn thành việc.' : 'Displays elapsed time as a disappearing colored disc, allowing ADHD minds to physically conceptualize time passing.', benefit: isVi ? 'Chấm dứt tê liệt khởi động việc & chống trễ hẹn hiệu quả' : 'Cures executive task paralysis and eliminates accidental late starts', tag: isVi ? 'Thiết yếu cho ADHD' : 'ADHD Essential', link: 'https://shopee.vn/search?keyword=dong%20ho%20visual%20timer' },
            { id: 'fidget-tool', icon: Zap, color: '#3b82f6', title: isVi ? 'Đồ Bấm Giải Tỏa Bồn Chồn (Fidget Cube & Infinity Cube)' : 'Tactile Fidget Cube & Alloy Infinity Cube', category: isVi ? 'Giải Phóng Năng Lượng Tay Chân' : 'Tactile Restlessness Outlet', desc: isVi ? 'Tạo kênh xả dopamine cho đôi tay bồn chồn ngọ nguậy, giúp não bộ duy trì sự tập trung thính giác trong các buổi học/họp.' : 'Gives restless fingers a quiet kinetic outlet, freeing prefrontal bandwidth to sustain auditory focus in meetings.', benefit: isVi ? 'Giảm 50% thói quen rung đùi, cắn móng tay khi căng thẳng' : 'Reduces leg bouncing and nail-biting during focus sessions', tag: isVi ? 'Khuyên dùng' : 'Top Rated', link: 'https://shopee.vn/search?keyword=fidget%20cube' },
            { id: 'anc-headphones', icon: Headphones, color: '#6366f1', title: isVi ? 'Tai Nghe Chống Ồn Chủ Động (Active Noise Cancelling)' : 'Over-Ear Active Noise-Cancelling (ANC) Headphones', category: isVi ? 'Triệt Tiêu Âm Thanh Xao Nhãng' : 'Sensory Isolation Shield', desc: isVi ? 'Tạo không gian cách ly âm thanh tuyệt đối khỏi tiếng gõ bàn phím, tiếng nói chuyện xung quanh để bảo vệ trạng thái dòng chảy (Flow).' : 'Creates an impenetrable acoustic sanctuary, shielding fragile ADHD attention from environmental distractions.', benefit: isVi ? 'Duy trì trạng thái làm việc sâu (Deep Work) liên tục' : 'Protects deep work flow from unexpected office interruptions', tag: isVi ? 'Đầu tư xứng đáng' : 'Best Investment', link: 'https://shopee.vn/search?keyword=tai%20nghe%20chong%20on%20anc' },
            { id: 'book-adhd', icon: BookOpen, color: '#10b981', title: isVi ? 'Sách "Hiểu Về ADHD Ở Người Lớn" & "Chiến Thắng Cơn Trì Hoãn"' : '"Driven to Distraction" & "Atomic Habits"', category: isVi ? 'Chiến Lược Chức Năng Điều Hành' : 'Executive Strategy', desc: isVi ? 'Cơ sở thần kinh học hành vi giải thích tại sao bạn trì hoãn và các bí quyết tổ chức cuộc sống không dựa vào ý chí suông.' : 'Neurobehavioral science explaining ADHD friction and actionable frameworks to structure life with ease.', benefit: isVi ? 'Thấu hiểu bản thân & biến khác biệt thành sức mạnh sáng tạo' : 'Transforms neurodivergent traits into creative superpowers', tag: isVi ? 'Sách nền tảng' : 'Must Read', link: 'https://tiki.vn/search?q=driven+to+distraction' }
          ]
        };

      case 'adhd-hyperactivity':
        return {
          badgeVi: '🔥 Xả Bồn Chồn Cơ Thể & Điều Tiết Xung Động',
          badgeEn: '🔥 Hyperactivity Somatic Release & Impulse Pacing',
          badgeColor: '#f97316',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Tăng Động & Bồn Chồn Vận Động',
          titleEn: 'Somatic Energy Grounding & Impulsivity Modulation',
          exercise: {
            id: 'somatic-release-breath',
            nameVi: 'Kỹ thuật Thở Xả Năng Lượng Thể Chất 4-4 (Somatic Discharge)',
            nameEn: '4-4 Somatic Release & Tension Purge Breath',
            descVi: 'Kết hợp hít thở dứt khoát với thả lỏng cơ tay chân giúp giải phóng năng lượng bồn chồn ứ đọng.',
            descEn: 'Combines dynamic breathing with somatic muscle relaxation to purge motor restlessness.',
            icon: Activity,
            phases: [
              { nameVi: 'Hít gồng cơ', nameEn: 'Inhale & Flex', duration: 4, type: 'inhale', instructionVi: 'Hít sâu đồng thời siết nhẹ bàn tay và cơ bắp trong 4 giây...', instructionEn: 'Inhale deeply while gently tensing fists and muscles for 4 seconds...' },
              { nameVi: 'Thở buông thả', nameEn: 'Exhale & Release', duration: 4, type: 'exhale', instructionVi: 'Thở mạnh bằng miệng, thả lỏng toàn bộ cơ thể rơi tự do trong 4 giây...', instructionEn: 'Exhale forcefully, dropping all muscular tension completely for 4 seconds...' }
            ]
          },
          cards: [
            {
              titleVi: 'Kênh Vận Động Xúc Giác & Bàn Làm Việc Đứng',
              titleEn: 'Dynamic Ergonomics & Tactile Motor Outlets',
              badgeVi: 'Chuyển hóa bồn chồn',
              badgeEn: 'Motor Channeling',
              icon: Target,
              iconColor: 'text-orange-300',
              iconBg: 'bg-orange-500/20 border-orange-500/30',
              pointsVi: [
                { bold: 'Bàn nâng hạ đứng làm việc (Standing Desk):', text: 'Cho phép cơ thể đung đưa, chuyển trọng tâm chân linh hoạt giúp não bộ tỉnh táo hơn gấp đôi khi ngồi lì.' },
                { bold: 'Con lăn bàn chân dưới gầm bàn:', text: 'Đặt con lăn hoặc bóng mát-xa dưới chân để đôi chân có kênh vận động vô thức mà không làm phiền người xung quanh.' },
                { bold: 'Vận động cường độ cao ngắt quãng (HIIT):', text: '10 phút nhảy dây hoặc chống đẩy trước giờ làm việc giúp tiêu hao bớt năng lượng xung động dư thừa.' }
              ],
              pointsEn: [
                { bold: 'Active Standing Desk:', text: 'Alternating between sitting and standing lets body sway naturally, boosting executive alertness.' },
                { bold: 'Under-desk foot rocker:', text: 'Roll an acupressure foot ball quietly under your desk to channel sub-threshold kinetic urges.' },
                { bold: 'Pre-work micro HIIT:', text: '10 mins of brisk jumping rope or push-ups burns excess kinetic motor drive before cognitive focus.' }
              ]
            },
            {
              titleVi: 'Quy tắc "Khoảng Dừng 5 Giây" Chống Quyết Định Xung Động',
              titleEn: '5-Second Impulse Buffer & Communication Pacing',
              badgeVi: 'Làm chậm phản ứng tự động',
              badgeEn: 'Impulse Brake',
              icon: Shield,
              iconColor: 'text-rose-300',
              iconBg: 'bg-rose-500/20 border-rose-500/30',
              pointsVi: [
                { bold: 'Đếm chậm 5 giây trước khi nói chen:', text: 'Khi có thôi thúc cắt lời người khác, hít 1 hơi và đếm thầm 5-4-3-2-1 để tiền trán kịp đánh giá tính cấp thiết.' },
                { bold: 'Khóa giỏ hàng 24 giờ khi mua sắm online:', text: 'Không bấm thanh toán ngay; đưa vào danh sách chờ 24h để dopamine lắng xuống tránh hối hận.' },
                { bold: 'Sổ tay ghi chú cắt cơn ngắt lời:', text: 'Để sẵn 1 mẩu giấy cạnh bàn; khi nảy sinh ý tưởng muốn nói ngay, viết nhanh từ khóa ra giấy rồi đợi đối phương nói xong.' }
              ],
              pointsEn: [
                { bold: '5-second conversational pause:', text: 'Before interjecting, count silently 5-4-3-2-1 to give your frontal cortex a window to evaluate priority.' },
                { bold: '24-hour e-commerce shopping delay:', text: 'Never click buy instantly; quarantine items in your cart for 24h until impulse dopamine normalizes.' },
                { bold: 'Interruption notepad:', text: 'Keep a pocket notepad; write down sudden ideas immediately so you can wait politely for your turn.' }
              ]
            }
          ],
          productsHeaderVi: 'Dụng Cụ Giải Tỏa Bồn Chồn Thể Chất & Kiểm Soát Xung Động',
          productsHeaderEn: 'Kinetic Outlets & Impulse Regulation Aids',
          products: [
            { id: 'fidget-gear', icon: Zap, color: '#f97316', title: isVi ? 'Con Quay Bánh Răng Kim Loại (Fidget Spinner Hợp Kim)' : 'Alloy Mechanical Gear Fidget Spinner', category: isVi ? 'Xả Bồn Chồn Bàn Tay' : 'Tactile Kinetic Tool', desc: isVi ? 'Vòng bi êm ái quay liên tục tạo xúc giác ổn định, giúp tay xả bồn chồn mà mắt và tai vẫn tập trung theo dõi bài giảng/cuộc họp.' : 'Heavy alloy precision bearings spin silently, satisfying physical kinetic urge while listening.', benefit: isVi ? 'Chấm dứt thói quen bấm bút, gõ bàn gây ồn' : 'Replaces pen clicking and desk tapping with quiet motion', tag: isVi ? 'Xả năng lượng' : 'Kinetic Choice', link: 'https://shopee.vn/search?keyword=con%20quay%20fidget%20spinner' },
            { id: 'acupressure-mat', icon: Activity, color: '#10b981', title: isVi ? 'Thảm Gai Bấm Huyệt Chân Đứng Làm Việc' : 'Acupressure Standing Foot Mat', category: isVi ? 'Kích Hoạt Thần Kinh Xúc Giác' : 'Proprioceptive Stimulation', desc: isVi ? 'Đặt dưới bàn làm việc để kích thích huyệt đạo gan bàn chân, giúp cơ thể tiếp đất (Grounding) và giảm cảm giác bồn chồn chân.' : 'Stimulates foot plantar receptors, delivering grounding proprioceptive feedback to calm hyperactive legs.', benefit: isVi ? 'Tăng lưu thông máu & kích hoạt sự tỉnh táo tự nhiên' : 'Enhances blood flow and natural physiological alertness', tag: isVi ? 'Khuyên dùng' : 'Ergonomic', link: 'https://shopee.vn/search?keyword=tham%20bam%20huyet%20chan' },
            { id: 'book-adhd-body', icon: BookOpen, color: '#8b5cf6', title: isVi ? 'Sách "Bộ Não Của Người ADHD" & "Kỷ Luật Tự Giác"' : '"Taking Charge of Adult ADHD" by Dr. Russell Barkley', category: isVi ? 'Cẩm Nang Lâm Sàng' : 'Clinical Wisdom', desc: isVi ? 'Hướng dẫn từ chuyên gia hàng đầu thế giới về cách điều tiết xung động và bảo vệ các mối quan hệ khỏi sự vội vã.' : 'World-renowned authority Dr. Barkley explains behavioral scaffolding to master impulsive emotional tendencies.', benefit: isVi ? 'Học cách làm chủ phản ứng thần kinh bẩm sinh' : 'Master your biological emotional reflexes effectively', tag: isVi ? 'Cẩm nang cốt lõi' : 'Core Handbook', link: 'https://tiki.vn/search?q=russell+barkley' },
            { id: 'brown-noise', icon: Headphones, color: '#06b6d4', title: isVi ? 'Âm Thanh Brown Noise Tần Số Trầm Chống Xao Nhãng' : 'Deep Brown Noise Acoustic Flow', category: isVi ? 'Âm Thanh Trị Liệu' : 'Sound Therapy', desc: isVi ? 'Dải âm trầm đều đặn như tiếng động cơ máy bay giúp xoa dịu tiếng ồn xung động bên trong não bộ.' : 'Heavy low-frequency continuous resonance that quiets restless ADHD brain hyperactivity.', benefit: isVi ? 'Làm dịu tâm trí gấp gáp chỉ sau 5 phút' : 'Soothes restless rushing thoughts within 5 minutes', tag: isVi ? 'Miễn phí' : 'Free Access', link: 'https://www.youtube.com/results?search_query=brown+noise+for+adhd' }
          ]
        };

      // =========================================================
      // GROUP 3: EYSENCK CLASSIC TEMPERAMENTS
      // =========================================================
      case 'eysenck-choleric':
        return {
          badgeVi: '🔥 Khí Chất Nóng Nảy (Choleric - Nhiệt Huyết & Quyết Đoán)',
          badgeEn: '🔥 Choleric Temperament (Dynamic & Assertive)',
          badgeColor: '#f59e0b',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Khí chất Nóng nảy & Năng lượng Cao',
          titleEn: 'Temperament Optimization for Choleric Leadership & Impulse Calming',
          exercise: {
            id: 'choleric-cooling-breath',
            nameVi: 'Kỹ thuật Thở Chậm Hạ Hỏa 4-6 (Cooling Pacing Breath)',
            nameEn: '4-6 Autonomic Cooling & Deceleration Breath',
            descVi: 'Kéo dài nhịp thở ra gấp rưỡi để hạ kích thích thần kinh giao cảm, làm dịu cơn nôn nóng bốc hỏa tức thì.',
            descEn: 'Extends exhalation by 1.5x to rapidly tone down sympathetic arousal and cool situational impatience.',
            icon: Flame,
            phases: [
              { nameVi: 'Hít định tâm', nameEn: 'Inhale', duration: 4, type: 'inhale', instructionVi: 'Hít vào êm dịu, nhận biết ngọn lửa năng lượng bên trong trong 4 giây...', instructionEn: 'Inhale gently, noticing internal dynamic drive for 4 seconds...' },
              { nameVi: 'Thở hạ hỏa', nameEn: 'Exhale Long', duration: 6, type: 'exhale', instructionVi: 'Thở ra chậm rãi, xả bỏ mọi sự nôn nóng và bực bội trong 6 giây...', instructionEn: 'Exhale slowly, diffusing impatience and heat out of your body for 6 seconds...' }
            ]
          },
          cards: [
            {
              titleVi: 'Khoảng Dừng 10 Giây & Giao Tiếp Đa Chiều',
              titleEn: 'The 10-Second Strategic Pause & Empathetic Hearing',
              badgeVi: 'Hạ nhiệt xung đột',
              badgeEn: 'De-escalation mastery',
              icon: Clock,
              iconColor: 'text-amber-300',
              iconBg: 'bg-amber-500/20 border-amber-500/30',
              pointsVi: [
                { bold: 'Khoảng dừng vàng 10 giây:', text: 'Trước khi phản bác trong cuộc tranh luận, nhấp 1 ngụm nước ấm để cho thùy trán kiểm soát lời nói thay vì để cái tôi bộc phát.' },
                { bold: 'Chuyển hóa năng lượng bùng nổ vào mục tiêu lớn:', text: 'Khí chất Choleric sinh ra để dẫn dắt; hãy dồn sự quyết liệt vào việc chinh phục thử thách thay vì tiêu hao vào va chạm vụn vặt.' },
                { bold: 'Học cách lắng nghe trọn vẹn không ngắt lời:', text: 'Để đối phương nói hết câu trước khi đưa ra giải pháp, giúp xây dựng sự tôn trọng và đồng thuận bền vững.' }
              ],
              pointsEn: [
                { bold: '10-second golden pause:', text: 'Sip warm water before refuting in heated debates, allowing prefrontal empathy to guide dynamic assertiveness.' },
                { bold: 'Channel fiery energy into bold visions:', text: 'Cholerics excel at breakthroughs; direct fire toward conquering ambitious milestones rather than petty friction.' },
                { bold: 'Active listening without interruption:', text: 'Let teammates finish speaking before proposing tactical solutions, forging lasting team loyalty.' }
              ]
            },
            {
              titleVi: 'Giải Tỏa Thể Lực & Thể Thao Sức Bền',
              titleEn: 'Physical Discharge & Endurance Conditioning',
              badgeVi: 'Cân bằng hóc môn',
              badgeEn: 'Adrenaline Balance',
              icon: Activity,
              iconColor: 'text-rose-300',
              iconBg: 'bg-rose-500/20 border-rose-500/30',
              pointsVi: [
                { bold: 'Võ thuật đối kháng hoặc Boxing:', text: 'Các môn thể thao đối kháng tạo kênh giải tỏa Adrenaline và Cortisol thặng dư một cách an toàn và kỷ luật.' },
                { bold: 'Chạy bộ đường dài (Zone 2 Cardio):', text: 'Chạy chậm duy trì nhịp tim ổn định 45 phút giúp rèn luyện sự kiên nhẫn và bình thản trước các trở ngại.' },
                { bold: 'Thói quen tắm nước mát cuối ngày:', text: 'Hạ thân nhiệt và làm dịu hệ cơ bắp căng cứng sau một ngày làm việc với cường độ cao.' }
              ],
              pointsEn: [
                { bold: 'Combat arts or boxing:', text: 'Provides a disciplined, controlled outlet to discharge surplus adrenal arousal safely.' },
                { bold: 'Zone 2 aerobic endurance:', text: '45 mins of steady running conditions physiological patience and mental equanimity under sustained friction.' },
                { bold: 'Cool shower unwinding ritual:', text: 'Lowers core body temperature and releases muscular tension accumulated during high-drive sprints.' }
              ]
            }
          ],
          productsHeaderVi: 'Dụng Cụ Điều Tiết Năng Lượng & Rèn Luyện Bản Lĩnh Khí Chất',
          productsHeaderEn: 'Choleric Energy Modulation & Dynamic Leadership Tools',
          products: [
            { id: 'bóng-massage', icon: Activity, color: '#f59e0b', title: isVi ? 'Bóng Massage Gai Bóp Tay Xả Căng Thẳng' : 'High-Density Grip & Stress Release Ball', category: isVi ? 'Xả Năng Lượng Bàn Tay' : 'Stress Release Aid', desc: isVi ? 'Chất liệu cao su đàn hồi cao giúp bàn tay siết xả năng lượng dồn nén khi gặp tình huống bực bội hoặc họp căng thẳng.' : 'High-resilience grip ball to channel tense autonomic surges during high-pressure meetings.', benefit: isVi ? 'Hạ cơn nóng giận tức thì mà vẫn giữ phong thái lịch thiệp' : 'Diffuses acute situational frustration smoothly', tag: isVi ? 'Hạ nhiệt tức thì' : 'Immediate Relief', link: 'https://shopee.vn/search?keyword=bong%20bop%20xa%20stress' },
            { id: 'tea-lotus', icon: Coffee, color: '#10b981', title: isVi ? 'Trà Tâm Sen & Lạc Tiên Thanh Nhiệt Thần Kinh' : 'Lotus Seed & Mint Cooling Herbal Tea', category: isVi ? 'Thảo Mộc Thanh Nhiệt' : 'Cooling Botanicals', desc: isVi ? 'Giúp thanh lọc nhiệt lượng cơ thể, ổn định huyết áp và xoa dịu cảm giác bốc hỏa cho người mang khí chất nóng nảy.' : 'Traditional cooling botanicals that balance blood pressure and ease internal somatic heat.', benefit: isVi ? 'Giúp ngủ ngon sâu giấc sau những ngày làm việc quyết liệt' : 'Promotes restorative sleep after intense competitive days', tag: isVi ? 'Khuyên dùng' : 'Recommended', link: 'https://shopee.vn/search?keyword=tra%20tam%20sen' },
            { id: 'book-thinking-fast', icon: BookOpen, color: '#8b5cf6', title: isVi ? 'Sách "Tư Duy Nhanh Và Chậm" (Daniel Kahneman)' : '"Thinking, Fast and Slow" by Daniel Kahneman', category: isVi ? 'Kinh Điển Hành Vi' : 'Behavioral Science', desc: isVi ? 'Hiểu rõ bẫy của Hệ thống 1 (phản xạ cảm xúc nhanh) và kích hoạt Hệ thống 2 (suy xét logic thấu đáo).' : 'Uncovers biases of fast impulsive System 1 thinking and teaches mastery of deliberative System 2 logic.', benefit: isVi ? 'Tránh các sai lầm nóng vội trong kinh doanh và quan hệ' : 'Prevents impulsive missteps in negotiations and relationships', tag: isVi ? 'Sách nền tảng' : 'Foundational', link: 'https://tiki.vn/search?q=tu+duy+nhanh+va+cham' },
            { id: 'sound-waterfall', icon: Headphones, color: '#06b6d4', title: isVi ? 'Âm Thanh Thác Nước Tự Nhiên (Cascade Soundscape)' : 'Mountain Waterfall Natural Acoustic Ambience', category: isVi ? 'Âm Thanh Trị Liệu' : 'Sound Ambience', desc: isVi ? 'Âm thanh dòng nước cuộn mát lành giúp hạ nhiệt độ tâm trí, mang lại cảm giác thanh thản sảng khoái.' : 'Rushing mountain stream acoustics that mentally refresh and cool down an overheated nervous system.', benefit: isVi ? 'Cân bằng tâm trạng chỉ sau 10 phút lắng nghe' : 'Restores mental composure within 10 minutes', tag: isVi ? 'Miễn phí' : 'Free Access', link: 'https://www.youtube.com/results?search_query=waterfall+sound+relaxation' }
          ]
        };

      case 'eysenck-sanguine':
        return {
          badgeVi: '✨ Khí Chất Hoạt Bát (Sanguine - Lạc Quan & Ấm Áp)',
          badgeEn: '✨ Sanguine Temperament (Sociable & Enthusiastic)',
          badgeColor: '#10b981',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Khí chất Hoạt bát & Giao tế',
          titleEn: 'Temperament Optimization for Sanguine Creativity & Sustained Focus',
          exercise: {
            id: 'sanguine-focus-breath',
            nameVi: 'Kỹ thuật Thở Định Tâm Đơn Nhiệm 4-4-4 (Centering Breath)',
            nameEn: '4-4-4 Focused Single-Task Centering Breath',
            descVi: 'Tập trung tâm trí đang bay bổng quay lại một điểm trọng tâm duy nhất, giúp theo đuổi mục tiêu bền bỉ.',
            descEn: 'Gathers spontaneous, scattered enthusiasm into laser focus on one strategic execution priority.',
            icon: Sparkles,
            phases: [
              { nameVi: 'Hít định tâm', nameEn: 'Inhale Focus', duration: 4, type: 'inhale', instructionVi: 'Hít vào sâu, gom mọi sự hứng khởi vào mục tiêu hiện tại trong 4 giây...', instructionEn: 'Inhale deeply, gathering your enthusiasm into the present task for 4s...' },
              { nameVi: 'Giữ hội tụ', nameEn: 'Hold Still', duration: 4, type: 'hold', instructionVi: 'Giữ tĩnh lặng nhận diện cam kết hoàn thành việc trong 4 giây...', instructionEn: 'Hold stillness, anchoring commitment to completion for 4 seconds...' },
              { nameVi: 'Thở thanh thản', nameEn: 'Exhale Calm', duration: 4, type: 'exhale', instructionVi: 'Thở ra chậm rãi, xả bỏ cảm giác cả thèm chóng chán trong 4 giây...', instructionEn: 'Exhale calmly, letting go of impulsive distractions for 4 seconds...' }
            ]
          },
          cards: [
            {
              titleVi: 'Gắn Cấu Trúc Kỷ Luật Vào Cảm Hứng (Structured Momentum)',
              titleEn: 'Pairing Spontaneous Drive with Execution Scaffolds',
              badgeVi: 'Chống cả thèm chóng chán',
              badgeEn: 'Finishing Mastery',
              icon: Layers,
              iconColor: 'text-emerald-300',
              iconBg: 'bg-emerald-500/20 border-emerald-500/30',
              pointsVi: [
                { bold: 'Nguyên tắc hoàn tất trước khi mở mới:', text: 'Khí chất Sanguine thích khởi đầu dự án mới nhưng ngại dọn dẹp chi tiết cuối; chỉ nhận việc mới khi việc cũ đã xong 100%.' },
                { bold: 'Hợp tác với người đồng hành nguyên tắc:', text: 'Kết nối với những đồng sự có khí chất Điềm đạm (Phlegmatic) hoặc Melancholic để họ hỗ trợ kiểm tra chi tiết.' },
                { bold: 'Bảo vệ khoảng lặng tĩnh tâm giữa các cuộc vui:', text: 'Dành ít nhất 1 giờ mỗi ngày hoàn toàn một mình để nạp lại năng lượng tư duy sâu.' }
              ],
              pointsEn: [
                { bold: 'Finish-before-start discipline:', text: 'Sanguines love starting projects; mandate that active tasks reach 100% completion before embarking on new ideas.' },
                { bold: 'Complementary teaming:', text: 'Partner with conscientious Phlegmatic or Melancholic collaborators to ground and organize logistical follow-through.' },
                { bold: 'Protect quiet daily solitude:', text: 'Carve out at least 1 hour of quiet alone time daily amidst rich social calendars to sustain deep reflection.' }
              ]
            },
            {
              titleVi: 'Quản Lý Năng Lượng Giao Tế & Tránh Phân Tán',
              titleEn: 'Selective Social Engagement & Habit Tracking',
              badgeVi: 'Tập trung nguồn lực',
              badgeEn: 'Resource Allocation',
              icon: Target,
              iconColor: 'text-teal-300',
              iconBg: 'bg-teal-500/20 border-teal-500/30',
              pointsVi: [
                { bold: 'Bộ lọc cam kết "3 Lần Cân Nhắc":', text: 'Trước khi nhận lời tham gia một sự kiện hoặc lời mời, đợi 24h để xem sự hào hứng có còn thực chất không.' },
                { bold: 'Bảng theo dõi thói quen trực quan (Habit Tracker):', text: 'Đánh dấu streak từng ngày để biến việc duy trì kỷ luật thành một trò chơi thú vị đầy màu sắc.' },
                { bold: 'Nuôi dưỡng các mối quan hệ chiều sâu:', text: 'Bên cạnh hàng trăm người quen xã giao, hãy đầu tư thời gian chất lượng cho 3–5 tri kỷ thực sự.' }
              ],
              pointsEn: [
                { bold: '3-Filter Commitment Rule:', text: 'Wait 24 hours before accepting invitations to verify whether spontaneous excitement represents authentic priority.' },
                { bold: 'Visual Habit Streak Tracker:', text: 'Gamify daily consistency with a visual habit tracker to engage your love for vibrant progress markers.' },
                { bold: 'Invest in relational depth:', text: 'Beyond having hundreds of pleasant acquaintances, nurture deep vulnerability with 3–5 core lifelong friends.' }
              ]
            }
          ],
          productsHeaderVi: 'Dụng Cụ Duy Trì Kỷ Luật & Khai Thừa Sức Mạnh Khí Chất Hoạt Bát',
          productsHeaderEn: 'Sanguine Habit Discipline & Creative Focus Aids',
          products: [
            { id: 'habit-journal', icon: Layers, color: '#10b981', title: isVi ? 'Sổ Lập Kế Hoạch Mục Tiêu & Theo Dõi Thói Quen' : 'Vibrant Goal-Setting & Habit Streak Planner', category: isVi ? 'Quy Hoạch Kỷ Luật' : 'Productivity Tool', desc: isVi ? 'Thiết kế bố cục trực quan sinh động giúp người hoạt bát biến các ý tưởng bộc phát thành kế hoạch hành động cụ thể từng tuần.' : 'Visually structured planner designed to translate spontaneous creativity into disciplined weekly execution.', benefit: isVi ? 'Giúp kiên trì theo đuổi mục tiêu dài hạn đến cùng' : 'Anchors long-term follow-through on visionary goals', tag: isVi ? 'Bán chạy nhất' : 'Best Seller', link: 'https://shopee.vn/search?keyword=so%20planner%20muc%20tieu' },
            { id: 'cube-timer', icon: Clock, color: '#3b82f6', title: isVi ? 'Đồng Hồ Khối Pomodoro Xoay Đa Năng' : 'Hexagonal Gravity Flip Pomodoro Focus Timer', category: isVi ? 'Hỗ Trợ Tập Trung' : 'Focus Aid', desc: isVi ? 'Chỉ cần xoay mặt số là bắt đầu đếm giờ; tiện lợi, thú vị và loại bỏ hoàn toàn cảm giác gò bó khô khan khi làm việc.' : 'Fun gravity-flip timer that turns tedious work blocks into an engaging, gamified rhythm effortlessly.', benefit: isVi ? 'Duy trì sự tập trung đơn nhiệm suốt 25 phút' : 'Sustains single-task focus for 25 continuous minutes', tag: isVi ? 'Khuyên dùng' : 'Recommended', link: 'https://shopee.vn/search?keyword=dong%20ho%20pomodoro%20xoay' },
            { id: 'book-atomic', icon: BookOpen, color: '#f59e0b', title: isVi ? 'Sách "Thay Đổi Tí Hon, Hiệu Quả Bất Ngờ (Atomic Habits)"' : '"Atomic Habits" by James Clear', category: isVi ? 'Kỹ Năng Hành Vi' : 'Behavioral Science', desc: isVi ? 'Chiến lược xây dựng thói quen tốt và từ bỏ thói quen xấu thông qua các thay đổi vi mô 1% mỗi ngày.' : 'Actionable framework to build good habits and break distractions via tiny 1% daily adjustments.', benefit: isVi ? 'Xây dựng kỷ luật tự thân mà không cần dựa vào ý chí gượng ép' : 'Builds frictionless discipline without relying on fleeting willpower', tag: isVi ? 'Phải đọc' : 'Essential', link: 'https://tiki.vn/search?q=atomic+habits' },
            { id: 'candle-citrus', icon: Flame, color: '#ec4899', title: isVi ? 'Nến Thơm Hương Cam Quýt & Hoa Nhài Phấn Chấn' : 'Uplifting Citrus & Jasmine Soy Scented Candle', category: isVi ? 'Hương Thơm Sáng Tạo' : 'Aromatherapy', desc: isVi ? 'Hương thơm tươi mới rạng rỡ mang lại bầu không khí tràn đầy sức sống cho góc làm việc sáng tạo.' : 'Radiant sweet floral notes that spark inspiration and maintain joyful mental alertness.', benefit: isVi ? 'Nạp lại năng lượng tinh thần sảng khoái' : 'Replenishes bright creative enthusiasm', tag: isVi ? 'Thơm ngát' : 'Vibrant Scent', link: 'https://shopee.vn/search?keyword=nen%20thom%20cam%20ngot' }
          ]
        };

      case 'eysenck-melancholic':
        return {
          badgeVi: '🌊 Khí Chất U Sầu (Melancholic - Sâu Sắc & Thấu Cảm)',
          badgeEn: '🌊 Melancholic Temperament (Thoughtful & Sensitive)',
          badgeColor: '#8b5cf6',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Khí chất Sâu sắc & Tinh tế',
          titleEn: 'Temperament Optimization for Melancholic Insight & Self-Gentleness',
          exercise: {
            id: 'melancholic-nurture-breath',
            nameVi: 'Kỹ thuật Thở Nuôi Dưỡng Trái Tim 5-5 (Self-Gentleness Breath)',
            nameEn: '5-5 Heart Coherence & Self-Compassion Breath',
            descVi: 'Điều hòa nhịp biến thiên tim (HRV), xoa dịu những lời phán xét cầu toàn khắt khe bên trong và mang lại sự bình an.',
            descEn: 'Harmonizes HRV rhythm, soothing hyper-critical perfectionism and wrapping the mind in unconditional gentleness.',
            icon: Compass,
            phases: [
              { nameVi: 'Hít thấu cảm', nameEn: 'Inhale Gentleness', duration: 5, type: 'inhale', instructionVi: 'Hít vào êm dịu, ôm ấp mọi cảm xúc tinh tế của chính mình trong 5 giây...', instructionEn: 'Inhale gently, embracing your sensitive emotions with warmth for 5 seconds...' },
              { nameVi: 'Thở buông bỏ', nameEn: 'Exhale Perfectionism', duration: 5, type: 'exhale', instructionVi: 'Thở ra chậm rãi, xả bỏ áp lực phải trở nên hoàn hảo trong 5 giây...', instructionEn: 'Exhale slowly, releasing the burden of needing everything to be flawless for 5s...' }
            ]
          },
          cards: [
            {
              titleVi: 'Giải Phóng Tiêu Chuẩn Cầu Toàn Độc Hại',
              titleEn: 'Dismantling Toxic Perfectionism & The "Good Enough" Standard',
              badgeVi: 'Bao dung với chính mình',
              badgeEn: 'Radical Self-Compassion',
              icon: Feather,
              iconColor: 'text-purple-300',
              iconBg: 'bg-purple-500/20 border-purple-500/30',
              pointsVi: [
                { bold: 'Nguyên tắc "Đủ tốt" (Good Enough 80%):', text: 'Nhận diện rằng 80% đối với tiêu chuẩn khắt khe của bạn đã là xuất sắc với thế giới bên ngoài; hãy bàn giao việc thay vì trau chuốt vô tận.' },
                { bold: 'Nhận diện tiếng nói tự chỉ trích:', text: 'Khi cảm thấy tội lỗi hoặc chưa hài lòng, hãy tự hỏi: "Nếu bạn thân nhất gặp chuyện này, tôi có phán xét họ tàn nhẫn như vậy không?"' },
                { bold: 'Viết ra những điều nhỏ đã làm tốt:', text: 'Ghi lại 3 vẻ đẹp hoặc hành động nhỏ bạn đã trọn vẹn trong ngày để cân bằng lại xu hướng chỉ chăm chăm nhìn vào thiếu sót.' }
              ],
              pointsEn: [
                { bold: 'The 80% "Good Enough" Rule:', text: 'Recognize that 80% of your exacting standard is already extraordinary to the world; ship work rather than polishing infinitely.' },
                { bold: 'Interrogate the Inner Critic:', text: 'When guilt stirs, ask: "Would I judge my dearest friend this harshly if they were in my shoes right now?"' },
                { bold: 'Celebrate daily micro-beauty:', text: 'Journal 3 instances of quiet beauty or graceful acts to counterbalance subconscious hyper-focus on flaws.' }
              ]
            },
            {
              titleVi: 'Bảo Vệ Không Gian Cảm Xúc & Tránh Quá Tải',
              titleEn: 'Emotional Boundaries & Creative Solitude',
              badgeVi: 'Nuôi dưỡng nội tâm',
              badgeEn: 'Soul Nourishment',
              icon: Moon,
              iconColor: 'text-indigo-300',
              iconBg: 'bg-indigo-500/20 border-indigo-500/30',
              pointsVi: [
                { bold: 'Tạo lập "Góc thiền định" tại nhà:', text: 'Dành riêng một góc yên tĩnh với ánh sáng ấm, sách và nến thơm để thả lỏng hoàn toàn sau khi tiếp xúc xã hội.' },
                { bold: 'Hạn chế tiếp nhận tin tức tiêu cực (News Detox):', text: 'Tâm trí nhạy cảm dễ bị ô nhiễm cảm xúc bởi tin tức giật gân; hãy tắt thông báo tin tức sau 20:00.' },
                { bold: 'Chuyển hóa chiều sâu nội tâm vào nghệ thuật:', text: 'Viết lách, vẽ tranh, chơi đàn hoặc làm vườn là những kênh chuyển hóa cảm xúc u buồn thành các tác phẩm tuyệt mỹ.' }
              ],
              pointsEn: [
                { bold: 'Sanctuary Corner at home:', text: 'Dedicate a quiet alcove with warm lighting and books to fully decompress after relational engagements.' },
                { bold: 'Evening News & Media Detox:', text: 'Sensitive neurology easily absorbs collective distress; disable alarmist notifications after 8:00 PM.' },
                { bold: 'Sublimate melancholy into art:', text: 'Writing, painting, music, or gardening channeled deep sensitivities into profound creative masterpieces.' }
              ]
            }
          ],
          productsHeaderVi: 'Dụng Cụ Chăm Sóc Tâm Hồn Nhạy Cảm & Không Gian Tĩnh Lặng',
          productsHeaderEn: 'Melancholic Soul Sanctuary & Reflective Creative Tools',
          products: [
            { id: 'book-quiet-mel', icon: BookOpen, color: '#8b5cf6', title: isVi ? 'Sách "Trầm Lặng" & "Hiểu Về Trái Tim"' : '"Quiet: The Power of Introverts" & "The Gifts of Imperfection"', category: isVi ? 'Tâm Lý Học Chiều Sâu' : 'Depth Psychology', desc: isVi ? 'Tôn vinh giá trị của tâm hồn sâu sắc, giúp bạn chuyển đổi sự tự ti về tính cách nhạy cảm thành lòng tự hào chân thật.' : 'Honors the immense worth of sensitive intuition, transforming self-doubt into authentic quiet pride.', benefit: isVi ? 'Chữa lành cảm giác lạc lõng giữa thế giới ồn ào' : 'Validates inner depth in an over-stimulating world', tag: isVi ? 'Kinh điển' : 'Classic Read', link: 'https://tiki.vn/search?q=tram+lang+susan+cain' },
            { id: 'candle-frankincense', icon: Flame, color: '#10b981', title: isVi ? 'Nến Thơm Hương Trầm & Gỗ Đàn Hương Thanh Tịnh' : 'Frankincense & Sandalwood Meditative Candle', category: isVi ? 'Không Gian An Yên' : 'Sanctuary Ambiance', desc: isVi ? 'Hương thơm thảo mộc trầm lắng tạo nên một bầu không khí thiền vị, an toàn cho những giờ phút chiêm nghiệm nội tâm.' : 'Deep woody sacred aromas that craft an acoustic sanctuary for reflective reading and journaling.', benefit: isVi ? 'Xoa dịu nỗi buồn man mác và giúp tâm trí thanh tịnh' : 'Soothes tender melancholic moods and centers the spirit', tag: isVi ? 'Thư giãn sâu' : 'Deep Peace', link: 'https://shopee.vn/search?keyword=nen%20thom%20go%20dan%20huong' },
            { id: 'leather-journal', icon: Layers, color: '#f59e0b', title: isVi ? 'Sổ Tay Nhật Ký Bìa Da Thủ Công Giấy Cổ Điển' : 'Handcrafted Vintage Leather Soul Journal', category: isVi ? 'Nhật Ký Cảm Xúc' : 'Soul Journaling', desc: isVi ? 'Chất giấy dày dặn ấm áp giúp bạn tự do gửi gắm những dòng thơ, suy ngẫm sâu sắc và ghi lại hành trình cuộc đời.' : 'Warm textured pages inviting you to pour out poetry, deep observations, and intimate life milestones.', benefit: isVi ? 'Kênh xả cảm xúc riêng tư và thiêng liêng nhất' : 'A private, sacred haven for your deepest musings', tag: isVi ? 'Khuyên dùng' : 'Handmade', link: 'https://shopee.vn/search?keyword=so%20tay%20bia%20da%20vintage' },
            { id: 'sound-chopin', icon: Headphones, color: '#ec4899', title: isVi ? 'Tuyển Tập Piano Cổ Điển Chopin & Nhạc Không Lời Êm Dịu' : 'Nocturnes Piano & Gentle Classical Soundscape', category: isVi ? 'Âm Nhạc Chữa Lành' : 'Classical Healing', desc: isVi ? 'Những giai điệu piano du dương thanh tao nâng đỡ những tâm hồn tinh tế sau một ngày mệt nhoài.' : 'Timeless nocturne melodies that gently cradle sensitive neurology after demanding days.', benefit: isVi ? 'Xoa dịu hệ thần kinh và đưa vào giấc ngủ êm đềm' : 'Calms overstimulated nerves and eases you into rest', tag: isVi ? 'Miễn phí' : 'Free Access', link: 'https://www.youtube.com/results?search_query=chopin+nocturnes+for+relaxation' }
          ]
        };

      case 'eysenck-phlegmatic':
        return {
          badgeVi: '🌱 Khí Chất Điềm Đạm (Phlegmatic - Kiên Định & Đáng Tin Cậy)',
          badgeEn: '🌱 Phlegmatic Temperament (Calm & Steadfast)',
          badgeColor: '#0ea5e9',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Khí chất Điềm đạm & Kiên nhẫn',
          titleEn: 'Temperament Optimization for Phlegmatic Steadiness & Proactive Vitality',
          exercise: {
            id: 'phlegmatic-vitality-breath',
            nameVi: 'Kỹ thuật Thở Đánh Thức Năng Lượng Đột Phá 6-2-4 (Vitality Breath)',
            nameEn: '6-2-4 Proactive Vitality & Awakening Breath',
            descVi: 'Tăng cường oxy kích hoạt hệ thần kinh trung ương, phá vỡ sức ỳ tâm lý và đánh thức sự chủ động bứt phá.',
            descEn: 'Boosts cerebral oxygenation to dissolve comfortable inertia and kindle proactive initiative.',
            icon: Zap,
            phases: [
              { nameVi: 'Hít kích hoạt', nameEn: 'Inhale Power', duration: 6, type: 'inhale', instructionVi: 'Hít sâu dồn năng lượng hành động căng tràn lồng ngực trong 6 giây...', instructionEn: 'Inhale deeply filling your chest with decisive forward momentum for 6s...' },
              { nameVi: 'Giữ nén', nameEn: 'Hold Power', duration: 2, type: 'hold', instructionVi: 'Giữ nén năng lượng sẵn sàng bứt phá trong 2 giây...', instructionEn: 'Hold power, sensing ready ignition for 2 seconds...' },
              { nameVi: 'Thở dứt khoát', nameEn: 'Exhale Drive', duration: 4, type: 'exhale', instructionVi: 'Thở dứt khoát đẩy lùi sự ngần ngại và thụ động trong 4 giây...', instructionEn: 'Exhale decisively, blowing away passive hesitation for 4 seconds...' }
            ]
          },
          cards: [
            {
              titleVi: 'Phá Vỡ Vùng An Toàn Bằng Bước Đi Nhỏ (Micro-Challenges)',
              titleEn: 'Expanding Comfort Zones via Micro-Challenges',
              badgeVi: 'Kích hoạt sự chủ động',
              badgeEn: 'Proactive Action',
              icon: Target,
              iconColor: 'text-sky-300',
              iconBg: 'bg-sky-500/20 border-sky-500/30',
              pointsVi: [
                { bold: 'Quy tắc 5 giây Mel Robbins:', text: 'Khi nảy ra một ý tưởng hoặc cơ hội cần lên tiếng, hãy đếm ngược 5-4-3-2-1 và bước tới hành động ngay trước khi não kịp tìm cớ lười biếng.' },
                { bold: 'Nhận 1 thử thách mới mỗi tháng:', text: 'Khí chất Phlegmatic rất kiên trì nhưng dễ rơi vào vùng an toàn quá êm đềm; hãy chủ động đăng ký 1 kỹ năng mới hoặc 1 dự án đòi hỏi bứt phá.' },
                { bold: 'Chia sẻ quan điểm thẳng thắn trong cuộc họp:', text: 'Bạn có cái nhìn sâu sắc và công tâm bậc nhất; đừng ngần ngại lên tiếng đóng góp góc nhìn quý báu của mình.' }
              ],
              pointsEn: [
                { bold: 'Mel Robbins 5-Second Rule:', text: 'When an opportunity appears, count down 5-4-3-2-1 and take physical action before your brain invents comfortable excuses.' },
                { bold: 'Monthly Micro-Challenge:', text: 'Phlegmatics are steadfast but prone to comfortable plateaus; proactively adopt 1 stretch project or new hobby every month.' },
                { bold: 'Voice your objective insights:', text: 'You possess unmatched fair-minded perspective; never hesitate to share your valuable grounding counsel in discussions.' }
              ]
            },
            {
              titleVi: 'Giao Tiếp Khẳng Định Vị Thế (Assertive Presence)',
              titleEn: 'Assertive Presence & Boundary Setting',
              badgeVi: 'Nâng cao tầm ảnh hưởng',
              badgeEn: 'Quiet Influence',
              icon: Shield,
              iconColor: 'text-teal-300',
              iconBg: 'bg-teal-500/20 border-teal-500/30',
              pointsVi: [
                { bold: 'Tránh xu hướng "sao cũng được":', text: 'Thói quen nhường nhịn đôi khi khiến bạn bị lãng quên mong muốn cá nhân; hãy tập bày tỏ sở thích rõ ràng: "Tôi thích phương án A hơn".' },
                { bold: 'Phát huy vai trò hòa giải trung lập:', text: 'Khí chất điềm đạm là chiếc mỏ neo của cả tập thể; bạn có tài năng thiên bẩm trong việc xoa dịu các xung đột căng thẳng.' },
                { bold: 'Tập thói quen đặt thời hạn chót nghiêm ngặt:', text: 'Tự áp đặt deadline sớm hơn 2 ngày để không bị nhịp độ êm đềm làm kéo dài tiến độ công việc.' }
              ],
              pointsEn: [
                { bold: 'Ditch "anything is fine" habit:', text: 'Polite accommodation can make you neglect personal preferences; practice stating clear opinions: "I prefer Option A."' },
                { bold: 'Anchor mediating leadership:', text: 'Your unflappable composure makes you a natural team anchor, resolving disputes with quiet wisdom.' },
                { bold: 'Set strict self-imposed deadlines:', text: 'Commit to delivering 2 days ahead of schedule to prevent comfortable steadiness from diluting execution speed.' }
              ]
            }
          ],
          productsHeaderVi: 'Dụng Cụ Đánh Thức Sự Chủ Động & Nâng Tầm Bản Lĩnh Điềm Đạm',
          productsHeaderEn: 'Phlegmatic Proactive Vitality & Quiet Leadership Tools',
          products: [
            { id: 'matcha-tea', icon: Coffee, color: '#10b981', title: isVi ? 'Trà Xanh Matcha Hữu Cơ Tỉnh Táo Nhẹ Nhàng' : 'Organic Ceremonial Japanese Matcha Powder', category: isVi ? 'Kích Hoạt Nhận Thức' : 'Cognitive Vitality', desc: isVi ? 'Hợp chất L-Theanine kết hợp caffein tự nhiên mang lại sự tỉnh táo minh mẫn bền bỉ suốt 6 tiếng mà không gây bồn chồn tim.' : 'Pure L-Theanine and clean caffeine provide 6 hours of calm, jitter-free sustained cognitive alertness.', benefit: isVi ? 'Đánh thức tinh thần hành động và xua tan sức ỳ' : 'Kindles sharp action drive and dissolves morning inertia', tag: isVi ? 'Tỉnh táo sạch' : 'Clean Energy', link: 'https://shopee.vn/search?keyword=matcha%20nhat%20ban%20organic' },
            { id: 'cards-challenge', icon: Target, color: '#0ea5e9', title: isVi ? 'Bộ Thẻ 52 Thử Thách Bứt Phá Vùng An Toàn' : '52 Comfort Zone Expansion Challenge Cards', category: isVi ? 'Phát Triển Bản Thân' : 'Growth Mindset', desc: isVi ? 'Mỗi tuần một hành động thử thách nhỏ giúp người điềm đạm rèn luyện lòng can đảm và mở rộng giới hạn năng lực.' : 'One micro-courage challenge per week designed to gently stretch comfort zones into confident leadership.', benefit: isVi ? 'Kích thích sự chủ động bứt phá đầy hào hứng' : 'Sparks proactive initiative with fun gamified steps', tag: isVi ? 'Đột phá' : 'Breakthrough', link: 'https://shopee.vn/search?keyword=the%20thu%20thach%20phat%20trien%20ban%20than' },
            { id: 'book-dare-change', icon: BookOpen, color: '#f59e0b', title: isVi ? 'Sách "Dám Thay Đổi" & "Quy Tắc 5 Giây"' : '"The 5 Second Rule" by Mel Robbins & "The Courage to Act"', category: isVi ? 'Kỹ Năng Hành Động' : 'Action Philosophy', desc: isVi ? 'Phương pháp tâm lý học phá vỡ thói quen chần chừ, giúp bạn bắt tay vào thực hiện ngay lập tức.' : 'Simple behavioral trick to bypass hesitation and translate quiet potential into immediate real-world motion.', benefit: isVi ? 'Xóa bỏ hoàn toàn thói quen trì hoãn êm đềm' : 'Permanently ends the habit of passive waiting', tag: isVi ? 'Khuyên dùng' : 'Top Action Read', link: 'https://tiki.vn/search?q=quy+tac+5+giay+mel+robbins' },
            { id: 'smart-band', icon: Activity, color: '#6366f1', title: isVi ? 'Vòng Đeo Tay Đo Hoạt Động & Nhắc Nhở Vận Động' : 'Smart Fitness & Active Sedentary Reminder Band', category: isVi ? 'Thúc Đẩy Vận Động' : 'Activity Catalyst', desc: isVi ? 'Tự động rung nhẹ nhắc nhở bạn đứng dậy vận động khi ngồi yên quá 60 phút, giúp cơ thể luôn duy trì sự sống động.' : 'Gently buzzes when sedentary for over 60 mins, encouraging dynamic posture changes and energetic circulation.', benefit: isVi ? 'Duy trì năng lượng thể chất và phong độ ổn định' : 'Keeps body active and maintains steady physical vitality', tag: isVi ? 'Thiết bị hữu ích' : 'Helpful Tech', link: 'https://shopee.vn/search?keyword=vong%20tay%20thong%20minh' }
          ]
        };

      // =========================================================
      // GROUP 4: BIG FIVE (BFI-44) SALIENT SUBGROUPS
      // =========================================================
      case 'bfi-introvert':
      default:
        return {
          badgeVi: '🧭 Người Hướng Nội (Năng Lượng Tĩnh & Chiều Sâu)',
          badgeEn: '🧭 Introverted Temperament (Quiet Power & Solitude)',
          badgeColor: '#8b5cf6',
          titleVi: 'Lộ trình Thích nghi Dành riêng cho Quản trị Pin Xã hội & Người Hướng Nội',
          titleEn: 'Temperament Optimization for Introvert Battery Management & Deep Focus',
          exercise: {
            id: 'introvert-solitude-breath',
            nameVi: 'Nhịp Thở Sạc Pin Nội Tâm 5-5 (Solitude Recharge Breath)',
            nameEn: '5-5 Solitude Recharge & Centering Breath',
            descVi: 'Thiết lập sự cân bằng sinh học tim mạch, ngắt bớt kích thích từ bên ngoài và nạp lại pin xã hội cho tâm trí.',
            descEn: 'Balances cardiovascular autonomic tone, dampening outer sensory overwhelm and restoring inner energy reserves.',
            icon: Compass,
            phases: [
              { nameVi: 'Hít tĩnh tại', nameEn: 'Inhale Quiet', duration: 5, type: 'inhale', instructionVi: 'Hít êm dịu, thu năng lượng từ thế giới bên ngoài quay trở về bên trong trong 5 giây...', instructionEn: 'Inhale smoothly, drawing attention gently away from outer chatter for 5s...' },
              { nameVi: 'Thở an yên', nameEn: 'Exhale Peace', duration: 5, type: 'exhale', instructionVi: 'Thở chậm rãi lan tỏa sự tĩnh tại và vững vàng ra toàn thân trong 5 giây...', instructionEn: 'Exhale slowly circulating deep composure and grounded peace for 5s...' }
            ]
          },
          cards: [
            {
              titleVi: 'Kiểm Kê Pin Xã Hội (Social Battery & Decompression)',
              titleEn: 'Social Battery Audit & Decompression Windows',
              badgeVi: 'Tôn trọng nhịp điệu tự nhiên',
              badgeEn: 'Honoring Your Neurology',
              icon: Compass,
              iconColor: 'text-purple-300',
              iconBg: 'bg-purple-500/20 border-purple-500/30',
              pointsVi: [
                { bold: 'Vùng đệm tĩnh 30 phút sau tương tác:', text: 'Sau các cuộc họp đông người hoặc sự kiện giao tiếp, luôn dành 30 phút một mình trong phòng yên tĩnh để phục hồi.' },
                { bold: 'Nhận diện tín hiệu cạn pin:', text: 'Khi thấy đầu óc nặng nề, khó tập trung nghe người khác nói, hãy lịch sự xin phép rút lui để sạc lại năng lượng.' },
                { bold: 'Tôn trọng bản thiết kế của bản thân:', text: 'Không tự phán xét bản thân là "khó gần" hay "kém giao tiếp"; người hướng nội có sức mạnh lãnh đạo thầm lặng vô song.' }
              ],
              pointsEn: [
                { bold: '30m quiet buffer window:', text: 'Schedule a 30-min decompression window after large meetings or social gatherings to restore autonomic balance.' },
                { bold: 'Notice battery drain signs:', text: 'When processing slows and auditory fatigue sets in, graciously excuse yourself to recharge without guilt.' },
                { bold: 'Depathologize battery limits:', text: 'Drop self-judgment; introverted neurology possesses immense gifts in deep thought and contemplative leadership.' }
              ]
            },
            {
              titleVi: 'Giao Tiếp Khẳng Định & Ranh Giới Cá Nhân (Boundaries)',
              titleEn: 'Assertive Boundaries & High-Value Solitude',
              badgeVi: 'Bảo vệ năng lượng cốt lõi',
              badgeEn: 'Boundary Protection',
              icon: Layers,
              iconColor: 'text-teal-300',
              iconBg: 'bg-teal-500/20 border-teal-500/30',
              pointsVi: [
                { bold: 'Lời từ chối thanh lịch và tôn trọng:', text: '"Tôi rất trân trọng lời mời này, nhưng hiện tại tôi cần dành thời gian tĩnh lặng để tập trung cao độ."' },
                { bold: 'Ưu tiên giao tiếp dạng văn bản (Async):', text: 'Đề xuất trao đổi qua email, tin nhắn hoặc tài liệu viết để có thời gian nghiền ngẫm câu trả lời sâu sắc nhất.' },
                { bold: 'Nhật ký phản chiếu (Reflective Journaling):', text: 'Mỗi tuần viết lại 1 bài học cuộc sống để chuyển hóa trải nghiệm thành trí tuệ sâu sắc.' }
              ],
              pointsEn: [
                { bold: 'Elegant decline scripts:', text: '"I truly appreciate the invitation, but right now I need to protect focused quiet time for high-leverage work."' },
                { bold: 'Lean into asynchronous communication:', text: 'Propose email or written briefs so you have spacious room to formulate deeply considered contributions.' },
                { bold: 'Reflective weekly journaling:', text: 'Distill weekly life observations into writing to transform everyday moments into enduring wisdom.' }
              ]
            }
          ],
          productsHeaderVi: 'Góc Thấu Hiểu Nhân Cách Hướng Nội & Không Gian Tĩnh Lặng',
          productsHeaderEn: 'Introvert Sanctuary & Relational Wisdom Aids',
          products: [
            { id: 'book-quiet-bfi', icon: BookOpen, color: '#8b5cf6', title: isVi ? 'Sách "Trầm Lặng (Quiet - Sức Mạnh Người Hướng Nội)"' : '"Quiet: The Power of Introverts" by Susan Cain', category: isVi ? 'Tâm Lý Học Nhân Cách' : 'Personality Psychology', desc: isVi ? 'Cuốn sách kinh điển thế giới thay đổi cách bạn nhìn nhận về sức mạnh tiềm ẩn của sự hướng nội và tĩnh tại.' : 'A global masterpiece celebrating the indispensable gifts and quiet genius of introspective personalities.', benefit: isVi ? 'Tự tin khẳng định giá trị bản thân trong thế giới ồn ào' : 'Empowers quiet confidence in a hyper-extroverted world', tag: isVi ? 'Kinh điển' : 'Classic Read', link: 'https://tiki.vn/search?q=tram+lang+susan+cain' },
            { id: 'cards-reflection-bfi', icon: Compass, color: '#ec4899', title: isVi ? 'Bộ Thẻ Câu Hỏi Tự Vấn Tâm Lý & Kết Nối Sâu' : 'Reflective Conversation & Self-Discovery Cards', category: isVi ? 'Khám Phá Chiều Sâu' : 'Deep Connection Tool', desc: isVi ? 'Những câu hỏi tâm lý học gợi mở giúp bạn tự soi chiếu nội tâm hoặc tạo nên các cuộc trò chuyện ý nghĩa với tri kỷ.' : 'Psychologically crafted prompts sparking meaningful introspection and authentic heart-to-heart dialogues.', benefit: isVi ? 'Nâng cao trí tuệ cảm xúc (EQ) và thấu cảm sâu sắc' : 'Expands emotional intelligence and self-awareness', tag: isVi ? 'Độc đáo' : 'Unique Choice', link: 'https://shopee.vn/search?keyword=the%20cau%20hoi%20tam%20ly' },
            { id: 'bullet-journal-bfi', icon: Layers, color: '#14b8a6', title: isVi ? 'Sổ Tay Bìa Da Bullet Journal Tối Giản' : 'Minimalist Dotted Leather Bullet Journal', category: isVi ? 'Quy Hoạch Thói Quen' : 'Habit & Mind Architecture', desc: isVi ? 'Không gian ghi chép linh hoạt giúp bạn theo dõi nhịp cảm xúc, rèn luyện thói quen tự chủ và ghi lại các bài học nhân sinh.' : 'Flexible grid notebook to map internal emotional rhythms, track habits, and distill life reflections.', benefit: isVi ? 'Thiết lập trật tự tinh thần và lưu giữ hành trình trưởng thành' : 'Structures mental clarity and chronicles personal evolution', tag: isVi ? 'Thanh lịch' : 'Elegant', link: 'https://shopee.vn/search?keyword=so%20bullet%20journal' },
            { id: 'candle-eucalyptus-bfi', icon: Flame, color: '#10b981', title: isVi ? 'Nến Thơm Hương Trầm & Bạch Đàn (Eucalyptus & Frankincense)' : 'Frankincense & Eucalyptus Meditative Candle', category: isVi ? 'Không Gian Tĩnh Lặng' : 'Sanctuary Ambiance', desc: isVi ? 'Mùi hương gỗ trầm thanh tịnh tạo nên không gian an yên cho những giờ phút đọc sách, viết nhật ký và sạc lại pin xã hội.' : 'Porous frankincense notes foster an atmospheric haven for reading, reflection, and social recharging.', benefit: isVi ? 'Tạo ranh giới tách biệt khỏi xô bồ ồn ào bên ngoài' : 'Carves out a sensory boundary away from outside noise', tag: isVi ? 'Thư giãn' : 'Relaxing', link: 'https://shopee.vn/search?keyword=nen%20thom%20bach%20dan' }
          ]
        };
    }
  }, [subGroupKey, isVi]);

  // Breathing state
  const [breathingActive, setBreathingActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [breathingCountdown, setBreathingCountdown] = useState(profileData.exercise.phases[0].duration);
  const [breathingCyclesCompleted, setBreathingCyclesCompleted] = useState(0);

  // Sync countdown whenever profile changes
  useEffect(() => {
    setBreathingActive(false);
    setPhaseIndex(0);
    setBreathingCountdown(profileData.exercise.phases[0].duration);
    setBreathingCyclesCompleted(0);
  }, [profileData]);

  // Breathing timer engine
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (breathingActive) {
      timer = setInterval(() => {
        setBreathingCountdown((prev) => {
          if (prev <= 1) {
            setPhaseIndex((currentPhase) => {
              const nextPhase = (currentPhase + 1) % profileData.exercise.phases.length;
              if (nextPhase === 0) {
                setBreathingCyclesCompleted((c) => c + 1);
              }
              return nextPhase;
            });
            const nextIdx = (phaseIndex + 1) % profileData.exercise.phases.length;
            return profileData.exercise.phases[nextIdx].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive, phaseIndex, profileData.exercise.phases]);

  const handleToggleBreathing = () => {
    if (!breathingActive) {
      setPhaseIndex(0);
      setBreathingCountdown(profileData.exercise.phases[0].duration);
      setBreathingCyclesCompleted(0);
      setBreathingActive(true);
    } else {
      setBreathingActive(false);
    }
  };

  // State for Emergency Crisis Dialog
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Support ESC key to close modal (for both Mac & Windows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCrisisModal(false);
      }
    };
    if (showCrisisModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCrisisModal]);

  const currentPhase = profileData.exercise.phases[phaseIndex] || profileData.exercise.phases[0];
  const ExerciseIcon = profileData.exercise.icon;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* ============================================================== */}
      {/* 1. TẦNG ĐỎ (RED TIER): HỘP HỖ TRỢ AN TOÀN & KHẨN CẤP KHÔNG PHÁN XÉT */}
      {/* ============================================================== */}
      {riskTier === 'red' && (
        <div className="rounded-3xl bg-gradient-to-br from-[#1d0d29] via-[#160a22] to-[#0d0517] border border-pink-500/30 p-6 sm:p-9 text-white shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold">
                <HeartHandshake className="w-4 h-4 text-pink-400" />
                <span>{isVi ? 'Không gian An toàn & Lắng nghe' : 'Safe Harbor & Empathetic Care'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                {isVi
                  ? 'Nếu bạn đang cảm thấy quá tải và cần một điểm tựa an toàn...'
                  : 'If you are feeling overwhelmed and need a safe place to turn...'}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowCrisisModal(true)}
              className="px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-200 text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 self-start shadow-sm"
            >
              <span>{isVi ? 'Xem đường dây nóng đầy đủ' : 'View full crisis directory'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compassionate Statement */}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed relative z-10 bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/5">
            {isVi
              ? 'Điểm số này phản ánh rằng cơ thể và tâm trí bạn đã phải gánh vác rất nhiều áp lực trong suốt thời gian dài vừa qua. Việc cảm thấy mệt mỏi, cạn kiệt hay hoang mang lúc này là phản ứng rất tự nhiên của con người. Bạn không cần phải vượt qua giai đoạn này một mình, và việc tìm kiếm sự trợ giúp là một hành động dũng cảm đối với chính mình.'
              : 'Your assessment reflects that your mind and body have been carrying profound pressure for an extended period. Feeling exhausted or overwhelmed right now is a natural human response. You do not have to walk through this alone, and reaching out for support is a meaningful act of self-care.'}
          </p>

          {/* Emergency Hotlines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {/* Hotline 1: Tổng đài Ngày Mai */}
            <div className="p-5 rounded-2xl bg-black/40 border border-pink-500/30 hover:border-pink-500/50 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
                    {isVi ? 'Tổng Đài Ngày Mai' : 'Ngay Mai Hotline'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {isVi ? 'Miễn phí' : 'Free & Anonymous'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {isVi ? 'Hỗ trợ Khủng hoảng & Trầm cảm (TS. Đặng Hoàng Giang)' : 'Mental Crisis & Depression Support'}
                </h4>
                <p className="text-xs text-gray-400">
                  {isVi ? 'Đội ngũ trực lắng nghe thấu cảm, bảo mật danh tính, hoạt động từ 13h00 – 20h30 hàng ngày.' : 'Empathetic confidential counseling, operating 13:00 - 20:30 daily.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-sm font-extrabold text-pink-300 font-mono tracking-wide">096 306 1414</span>
                <a
                  href="tel:0963061414"
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Gọi ngay' : 'Call Now'}</span>
                </a>
              </div>
            </div>

            {/* Hotline 2: Viện SKTT Bạch Mai */}
            <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/30 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    {isVi ? 'Viện Sức Khỏe Tâm Thần' : 'National Institute of Mental Health'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {isVi ? 'Bệnh viện Bạch Mai' : 'Bach Mai Hospital'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {isVi ? 'Khám & Điều Trị Chuyên Khoa Y Tế' : 'Clinical Assessment & Specialized Psychiatric Care'}
                </h4>
                <p className="text-xs text-gray-400">
                  {isVi ? 'Cơ sở đầu ngành về đánh giá lâm sàng, tư vấn tâm thần học và hỗ trợ y khoa chuyên sâu tại Hà Nội.' : 'Premier national hospital for clinical psychiatry, diagnostics and medical interventions.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-sm font-extrabold text-purple-300 font-mono tracking-wide">024 3869 3731</span>
                <a
                  href="tel:02438693731"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Gọi tư vấn' : 'Contact'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Clinic Appointment Connect (MindCare) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#180e33] to-black/60 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Calendar className="w-4 h-4 text-teal-400" />
                <h4 className="text-sm font-bold text-white">
                  {isVi ? 'Kết nối Tham vấn Tâm lý Chuyên gia (MindCare)' : 'Book Private Counseling with MindCare'}
                </h4>
              </div>
              <p className="text-xs text-gray-300">
                {isVi
                  ? 'Đặt lịch tham vấn trực tiếp hoặc online kín đáo cùng các nhà tâm lý lâm sàng uy tín tại Hà Nội & TP.HCM.'
                  : 'Schedule a private in-person or online consultation with licensed clinical psychologists.'}
              </p>
            </div>

            <a
              href="https://mindcare.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              <span>{isVi ? 'Đặt lịch với MindCare' : 'Visit MindCare Clinic'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TẦNG XANH / VÀNG (GREEN/YELLOW TIER): CHĂM SÓC & TỐI ƯU CÁ NHÂN HÓA */}
      {/* ============================================================== */}
      <div className="rounded-3xl bg-[#0f0822]/90 border border-purple-500/30 p-6 sm:p-9 text-white shadow-2xl space-y-8">
        {/* Section Header with Personalized Profile Indicator */}
        <div className="border-b border-white/10 pb-6 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {isVi ? 'Lộ trình Hành động An toàn' : 'Safe Next-Step Routing'}
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
              style={{
                color: profileData.badgeColor,
                borderColor: `${profileData.badgeColor}40`,
                backgroundColor: `${profileData.badgeColor}15`
              }}
            >
              {isVi ? profileData.badgeVi : profileData.badgeEn}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {isVi ? profileData.titleVi : profileData.titleEn}
          </h3>

          {/* Recommendations List from assessment if available */}
          {actionGuide?.recommendations && actionGuide.recommendations.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {actionGuide.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-gray-200 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KHU VỰC 1: BÀI TẬP ĐIỀU HÒA TÂM TRÍ TƯƠNG TÁC (INTERACTIVE PRACTICE) */}
        {/* ------------------------------------------------------------------ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#160b33] via-[#12082b] to-[#0a0518] border border-purple-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ExerciseIcon className="w-5 h-5 text-teal-300" />
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {isVi ? profileData.exercise.nameVi : profileData.exercise.nameEn}
                </h4>
              </div>
              <p className="text-xs text-gray-300">
                {isVi ? profileData.exercise.descVi : profileData.exercise.descEn}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleBreathing}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg active:scale-95 ${
                breathingActive
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-teal-500/20'
              }`}
            >
              {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{breathingActive ? (isVi ? 'Tạm dừng thở' : 'Pause Exercise') : (isVi ? 'Bắt đầu bài tập' : 'Start Guided Breath')}</span>
            </button>
          </div>

          {/* Interactive Breathing Visualizer */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  breathingActive && currentPhase.type === 'inhale'
                    ? 'bg-teal-500/20 scale-125 border border-teal-400/50'
                    : breathingActive && currentPhase.type === 'hold'
                    ? 'bg-purple-500/25 scale-125 border border-purple-400/50 animate-pulse'
                    : breathingActive && currentPhase.type === 'exhale'
                    ? 'bg-indigo-500/15 scale-95 border border-indigo-400/30'
                    : breathingActive && currentPhase.type === 'hold-empty'
                    ? 'bg-blue-500/20 scale-95 border border-blue-400/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              />

              {/* Center Circle with Countdown */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-purple-900/80 to-[#180e38] border border-purple-400/40 flex flex-col items-center justify-center shadow-xl">
                <span className="text-3xl font-extrabold text-white font-mono leading-none">
                  {breathingActive ? breathingCountdown : currentPhase.duration}
                </span>
                <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wider mt-1">
                  {breathingActive
                    ? isVi ? currentPhase.nameVi : currentPhase.nameEn
                    : (isVi ? 'Sẵn sàng' : 'Ready')}
                </span>
              </div>
            </div>

            {/* Instruction description */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-semibold text-purple-200">
                {breathingActive
                  ? isVi ? currentPhase.instructionVi : currentPhase.instructionEn
                  : (isVi ? `Bấm "Bắt đầu bài tập" để hòa vào nhịp điệu khoa học` : 'Click "Start Guided Breath" to begin')}
              </p>
              {breathingActive && (
                <span className="text-[11px] text-gray-400 block font-mono">
                  {isVi ? `Đã hoàn thành: ${breathingCyclesCompleted} chu kỳ` : `Completed: ${breathingCyclesCompleted} cycles`}
                </span>
              )}
            </div>

            {/* Step Pills for Each Phase */}
            <div className={`grid gap-2 w-full max-w-md pt-2 text-[11px] ${
              profileData.exercise.phases.length === 4 ? 'grid-cols-4' :
              profileData.exercise.phases.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
            }`}>
              {profileData.exercise.phases.map((phase, idx) => {
                const isActive = breathingActive && phaseIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-bold shadow-sm'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    {idx + 1}. {isVi ? phase.nameVi : phase.nameEn} ({phase.duration}s)
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KHU VỰC 2: CHIẾN LƯỢC THÓI QUEN CÁ NHÂN HÓA (2 ADAPTATION CARDS) */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {profileData.cards.map((card, idx) => {
            const CardIcon = card.icon;
            const points = isVi ? card.pointsVi : card.pointsEn;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-3xl bg-[#140b2b]/90 border border-white/10 space-y-4 flex flex-col justify-between hover:border-purple-500/30 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-xl border ${card.iconBg} ${card.iconColor}`}>
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {isVi ? card.titleVi : card.titleEn}
                      </h4>
                      <span className="text-[11px] text-gray-400 block font-mono">
                        {isVi ? card.badgeVi : card.badgeEn}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-gray-300 leading-relaxed pt-1">
                    {points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold mt-0.5">•</span>
                        <span>
                          <strong className="text-white">{pt.bold}</strong> {pt.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KHU VỰC 3: GÓC SẢN PHẨM GỢI Ý CÁ NHÂN HÓA (AFFILIATE SHOWCASE) */}
        {/* ------------------------------------------------------------------ */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-pink-400" />
                <span>{isVi ? profileData.productsHeaderVi : profileData.productsHeaderEn}</span>
              </h4>
              <p className="text-xs text-gray-400">
                {isVi
                  ? 'Gợi ý chọn lọc dựa trên kết quả trắc nghiệm nhằm kiến tạo không gian sống và làm việc tối ưu.'
                  : 'Tailored selections aligned with your assessment profile to support restorative living.'}
              </p>
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono self-start sm:self-auto">
              Curated Partners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profileData.products.map((prod) => {
              const Icon = prod.icon;
              return (
                <div
                  key={prod.id}
                  className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div
                        className="p-2 rounded-xl"
                        style={{ backgroundColor: `${prod.color}20`, color: prod.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                        {prod.tag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">
                        {prod.category}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                        {prod.title}
                      </h5>
                    </div>

                    <p className="text-[11px] text-gray-400 line-clamp-3 leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{prod.benefit}</span>
                    </div>

                    <a
                      href={prod.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackLiveEvent('affiliate_click', { productId: prod.id || prod.title })}
                      className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{isVi ? 'Xem gợi ý' : 'Explore'}</span>
                      <ExternalLink className="w-3 h-3 text-gray-300" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MODAL: ĐƯỜNG DÂY NÓNG KHỦNG HOẢNG & DANH MỤC THAM VẤN TOÀN DIỆN */}
      {/* ============================================================== */}
      {showCrisisModal && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowCrisisModal(false)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#1b0d2d] to-[#0d0517] border border-pink-500/40 p-6 sm:p-8 text-white shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCrisisModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-300 shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {isVi ? 'Danh mục Hỗ trợ Khủng hoảng & Tham vấn Tâm lý' : 'Mental Health Crisis & Care Directory'}
                </h3>
                <p className="text-xs text-gray-400">
                  {isVi ? 'Các đầu mối hỗ trợ uy tín, bảo mật và miễn phí tại Việt Nam' : 'Confidential and verified clinical resources in Vietnam'}
                </p>
              </div>
            </div>

            {/* Reassurance text */}
            <p className="text-xs text-gray-300 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/5">
              {isVi
                ? 'Khi cảm thấy bế tắc hoặc áp lực vượt quá khả năng chịu đựng, bạn không cần phải một mình đối diện. Các tổng đài viên và chuyên gia dưới đây luôn sẵn sàng lắng nghe bạn bằng tất cả sự thấu cảm và tôn trọng danh tính.'
                : 'When emotional pain feels unbearable, you do not have to carry it alone. These hotlines and clinics provide safe, confidential, and empathetic support.'}
            </p>

            {/* Full Contact List */}
            <div className="space-y-3">
              {/* 1. Tổng đài Ngày Mai */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white">Tổng đài Ngày Mai</h4>
                  <p className="text-xs text-gray-400">Hỗ trợ tâm lý, trầm cảm & khủng hoảng (TS. Đặng Hoàng Giang)</p>
                  <span className="text-xs font-mono text-pink-300 font-bold block pt-0.5">096 306 1414 (13h00 - 20h30 hàng ngày)</span>
                </div>
                <a
                  href="tel:0963061414"
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Gọi</span>
                </a>
              </div>

              {/* 2. Viện SKTT Bạch Mai */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white">Viện Sức khỏe Tâm thần — BV Bạch Mai</h4>
                  <p className="text-xs text-gray-400">Khám chuyên khoa, đánh giá lâm sàng & y tế tâm thần</p>
                  <span className="text-xs font-mono text-purple-300 font-bold block pt-0.5">024 3869 3731 / 0984 101 115</span>
                </div>
                <a
                  href="tel:02438693731"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Gọi</span>
                </a>
              </div>

              {/* 3. Tổng đài Quốc gia 111 */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white">Tổng đài Quốc gia 111</h4>
                  <p className="text-xs text-gray-400">Tư vấn khủng hoảng tâm lý & bảo vệ quyền lợi trẻ em, vị thành niên (24/7 Miễn phí)</p>
                  <span className="text-xs font-mono text-teal-300 font-bold block pt-0.5">Phím 111 (Cả nước)</span>
                </div>
                <a
                  href="tel:111"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Gọi</span>
                </a>
              </div>

              {/* 4. MindCare Clinic */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white">Trung tâm Tham vấn Tâm lý MindCare</h4>
                  <p className="text-xs text-gray-400">Đặt lịch trị liệu tâm lý cá nhân, cặp đôi & định hướng tại HN & TP.HCM</p>
                  <span className="text-xs text-gray-300 block pt-0.5">Website: mindcare.vn</span>
                </div>
                <a
                  href="https://mindcare.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shrink-0 flex items-center gap-1.5"
                >
                  <span>Đặt lịch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCrisisModal(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
              >
                {isVi ? 'Đóng hộp thoại' : 'Close Directory'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
