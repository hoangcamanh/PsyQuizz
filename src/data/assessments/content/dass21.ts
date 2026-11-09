import { AssessmentDefinition, DimensionResult } from '../types';
import { Locale } from '@/i18n/types';

export const DASS21_QUESTIONS: Array<{
  id: number;
  dimension: 'stress' | 'anxiety' | 'depression';
  textEn: string;
  textVi: string;
}> = [
  { id: 1, dimension: 'stress', textEn: 'I found it hard to wind down', textVi: 'Tôi thấy khó mà thư giãn được' },
  { id: 2, dimension: 'anxiety', textEn: 'I was aware of dryness of my mouth', textVi: 'Tôi nhận thấy mình bị khô miệng' },
  { id: 3, dimension: 'depression', textEn: 'I couldn\'t seem to experience any positive feeling at all', textVi: 'Tôi dường như không thể cảm nhận được bất kỳ cảm xúc tích cực nào' },
  { id: 4, dimension: 'anxiety', textEn: 'I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)', textVi: 'Tôi bị khó thở (ví dụ: thở gấp, hụt hơi dù không vận động gắng sức)' },
  { id: 5, dimension: 'depression', textEn: 'I found it difficult to work up the initiative to do things', textVi: 'Tôi thấy khó có động lực để bắt tay vào thực hiện công việc' },
  { id: 6, dimension: 'stress', textEn: 'I tended to over-react to situations', textVi: 'Tôi có xu hướng phản ứng thái quá trước các tình huống' },
  { id: 7, dimension: 'anxiety', textEn: 'I experienced trembling (e.g. in the hands)', textVi: 'Tôi bị run rẩy (ví dụ: run tay)' },
  { id: 8, dimension: 'stress', textEn: 'I felt that I was using a lot of nervous energy', textVi: 'Tôi cảm thấy mình đang tiêu tốn nhiều năng lượng thần kinh' },
  { id: 9, dimension: 'anxiety', textEn: 'I was worried about situations in which I might panic and make a fool of myself', textVi: 'Tôi lo lắng về những tình huống có thể khiến tôi hoảng loạn và tự làm mình bẽ mặt' },
  { id: 10, dimension: 'depression', textEn: 'I felt that I had nothing to look forward to', textVi: 'Tôi cảm thấy mình không có điều gì để trông đợi ở tương lai' },
  { id: 11, dimension: 'stress', textEn: 'I found myself getting agitated', textVi: 'Tôi thấy mình dễ bị kích động, bồn chồn' },
  { id: 12, dimension: 'stress', textEn: 'I found it difficult to relax', textVi: 'Tôi thấy khó thư giãn, thả lỏng' },
  { id: 13, dimension: 'depression', textEn: 'I felt down-hearted and blue', textVi: 'Tôi cảm thấy buồn rầu và ủ rũ' },
  { id: 14, dimension: 'stress', textEn: 'I was intolerant of anything that kept me from getting on with what I was doing', textVi: 'Tôi không thể chịu được những điều cản trở việc tôi đang làm' },
  { id: 15, dimension: 'anxiety', textEn: 'I felt I was close to panic', textVi: 'Tôi cảm thấy mình gần như sắp hoảng loạn' },
  { id: 16, dimension: 'depression', textEn: 'I was unable to become enthusiastic about anything', textVi: 'Tôi không thể tìm thấy hứng thú với bất kỳ điều gì' },
  { id: 17, dimension: 'depression', textEn: 'I felt I wasn\'t worth much as a person', textVi: 'Tôi cảm thấy bản thân không có nhiều giá trị' },
  { id: 18, dimension: 'stress', textEn: 'I felt that I was rather touchy', textVi: 'Tôi thấy mình khá dễ phật ý, chạm tự ái' },
  { id: 19, dimension: 'anxiety', textEn: 'I was aware of the action of my heart in the absence of physical exertion', textVi: 'Tôi nhận biết rõ nhịp tim đập dù không vận động gắng sức (ví dụ: tim đập nhanh, lỡ nhịp)' },
  { id: 20, dimension: 'anxiety', textEn: 'I felt scared without any good reason', textVi: 'Tôi cảm thấy sợ hãi vô cớ mà không vì lý do nào rõ ràng' },
  { id: 21, dimension: 'depression', textEn: 'I felt that life was meaningless', textVi: 'Tôi cảm thấy cuộc sống thật vô nghĩa' }
];

export const DASS21_OPTIONS: Record<Locale, Array<{ value: number; label: string; description: string }>> = {
  en: [
    { value: 0, label: '0', description: 'Did not apply to me at all' },
    { value: 1, label: '1', description: 'Applied to me to some degree, or some of the time' },
    { value: 2, label: '2', description: 'Applied to me to a considerable degree, or a good part of time' },
    { value: 3, label: '3', description: 'Applied to me very much, or most of the time' }
  ],
  vi: [
    { value: 0, label: '0', description: 'Không đúng với tôi chút nào' },
    { value: 1, label: '1', description: 'Đúng với tôi một phần, hoặc thỉnh thoảng' },
    { value: 2, label: '2', description: 'Đúng với tôi phần nhiều, hoặc khá thường xuyên' },
    { value: 3, label: '3', description: 'Rất đúng với tôi, hoặc hầu như suốt thời gian' }
  ]
};

export function createDass21Definition(locale: Locale): AssessmentDefinition {
  const isVi = locale === 'vi';

  return {
    id: 'dass-21',
    code: 'DASS-21',
    name: isVi ? 'Thang đo Trầm cảm, Lo âu và Căng thẳng (DASS-21)' : 'Depression, Anxiety & Stress Scales (DASS-21)',
    subtitle: isVi
      ? 'Thang đo Trầm cảm, Lo âu & Căng thẳng (21 câu)'
      : 'Depression, Anxiety & Stress Scales (21 items)',
    description: isVi
      ? 'Bộ công cụ tâm lý học chuẩn hóa gồm 21 câu hỏi giúp đánh giá các trạng thái cảm xúc trong vòng một tuần qua trên 3 chiều kích: Trầm cảm, Lo âu và Căng thẳng (Lovibond & Lovibond, 1995; bản dịch tiếng Việt của Trần Thị Hà An và cs., 2013).'
      : 'A 21-item standardized self-reflection instrument measuring recent emotional states across three foundational dimensions: Depression, Anxiety, and Stress (Lovibond & Lovibond, 1995).',
    duration: isVi ? '3 - 5 phút' : '3 - 5 mins',
    itemCount: 21,
    license: 'Public Domain (Lovibond & Lovibond, 1995)',
    disclaimer: isVi
      ? 'DASS-21 là công cụ sàng lọc tâm lý phục vụ mục đích giáo dục và tự nhận thức bản thân trong vòng một tuần qua. Bài trắc nghiệm không có giá trị chẩn đoán y khoa hay thay thế sự thăm khám lâm sàng của bác sĩ chuyên khoa hoặc chuyên gia tâm lý.'
      : 'DASS-21 is an educational screening instrument designed for self-reflection and personal awareness over the past week. It is not a clinical diagnostic tool and does not replace professional clinical evaluation.',
    notebookLmUrl: 'https://notebook.google.com/notebook/a3405fea-e381-4b2d-b50d-b30cff62b7bb',
    notebookLmPrompts: isVi
      ? [
          'Những kỹ thuật hít thở dựa trên bằng chứng nào giúp làm dịu hệ thần kinh khi căng thẳng cấp tính?',
          'Làm thế nào để nhận diện dấu hiệu kiệt sức (burnout) sớm và phục hồi năng lượng tinh thần?',
          'Những ranh giới lành mạnh nào giúp bảo vệ sức khỏe tâm thần trong công việc và học tập?',
          'Các phương pháp chánh niệm thực tiễn nào giúp xoa dịu những suy nghĩ luẩn quẩn và lo âu?'
        ]
      : [
          'What evidence-based breathing techniques effectively soothe acute nervous tension?',
          'How can I identify early indicators of burnout and restore emotional energy?',
          'What practical boundaries help protect mental health and peace of mind at work or school?',
          'What gentle mindfulness practices help quiet repetitive worries and racing thoughts?'
        ],
    options: DASS21_OPTIONS[locale],
    questions: DASS21_QUESTIONS.map((q) => ({
      id: q.id,
      text: isVi ? q.textVi : q.textEn,
      dimension: q.dimension
    })),
    calculateResults: (answers: Record<number, number>) => {
      let rawDepression = 0;
      let rawAnxiety = 0;
      let rawStress = 0;

      const depressionItems = [3, 5, 10, 13, 16, 17, 21];
      const anxietyItems = [2, 4, 7, 9, 15, 19, 20];
      const stressItems = [1, 6, 8, 11, 12, 14, 18];

      depressionItems.forEach((id) => {
        rawDepression += answers[id] || 0;
      });
      anxietyItems.forEach((id) => {
        rawAnxiety += answers[id] || 0;
      });
      stressItems.forEach((id) => {
        rawStress += answers[id] || 0;
      });

      const finalDepression = rawDepression * 2;
      const finalAnxiety = rawAnxiety * 2;
      const finalStress = rawStress * 2;

      const getDepInfo = (score: number) => {
        if (score <= 9) {
          return {
            label: isVi ? 'Bình thường' : 'Normal',
            color: '#2dd4bf',
            weight: 1,
            desc: isVi
              ? 'Bạn thể hiện tinh thần nhiệt huyết, sự hứng khởi tự nhiên với cuộc sống thường nhật và khả năng duy trì năng lượng tích cực ổn định.'
              : 'You report healthy enthusiasm, active interest in everyday experiences, and steady positive engagement.'
          };
        }
        if (score <= 13) {
          return {
            label: isVi ? 'Nhẹ' : 'Mild',
            color: '#60a5fa',
            weight: 2,
            desc: isVi
              ? 'Bạn có thể đang gặp chút mệt mỏi tình huống hoặc thoáng chùng xuống về tinh thần, đây là phản ứng tự nhiên trước nhịp sống thường nhật.'
              : 'You may be encountering mild situational fatigue or brief dips in spirit, which are natural responses to daily life.'
          };
        }
        if (score <= 20) {
          return {
            label: isVi ? 'Vừa' : 'Moderate',
            color: '#fbbf24',
            weight: 3,
            desc: isVi
              ? 'Bạn có thể đang cảm thấy động lực bị giảm sút hoặc kiệt sức cảm xúc. Những khoảng nghỉ dịu êm và việc kết nối cùng người thân yêu sẽ giúp bạn hồi phục năng lượng.'
              : 'You might feel dampened motivation or emotional exhaustion. Taking gentle pauses and connecting with loved ones will help restore your natural spark.'
          };
        }
        if (score <= 27) {
          return {
            label: isVi ? 'Nặng' : 'Severe',
            color: '#c084fc',
            weight: 4,
            desc: isVi
              ? 'Bạn dường như đang chịu gánh nặng cảm xúc và sự mệt mỏi rõ rệt. Hãy ưu tiên lòng trắc ẩn với bản thân, giảm bớt lịch trình và tâm sự cùng người bạn tin cậy.'
              : 'You appear to be experiencing noticeable emotional weight and fatigue. Prioritize self-compassion, unburden your schedule, and confide in someone you trust.'
          };
        }
        return {
          label: isVi ? 'Rất nặng' : 'Extremely Severe',
          color: '#f472b6',
          weight: 5,
          desc: isVi
            ? 'Bạn đang mang vác gánh nặng cảm xúc rất lớn lúc này. Hãy đối xử với bản thân bằng sự dịu dàng sâu sắc, nghỉ ngơi đầy đủ và cân nhắc tìm kiếm sự hỗ trợ chuyên môn từ chuyên gia tâm lý.'
            : 'You are carrying significant emotional weight right now. Treat yourself with profound kindness, allow ample rest, and consider reaching out to a compassionate mental health professional.'
        };
      };

      const getAnxInfo = (score: number) => {
        if (score <= 7) {
          return {
            label: isVi ? 'Bình thường' : 'Normal',
            color: '#2dd4bf',
            weight: 1,
            desc: isVi
              ? 'Bạn đón nhận những bất định trong cuộc sống thường nhật với sự bình tĩnh và giữ vững cân bằng thể chất lẫn cảm xúc.'
              : 'You manage everyday uncertainties with steady composure and maintain physical and emotional equilibrium.'
          };
        }
        if (score <= 9) {
          return {
            label: isVi ? 'Nhẹ' : 'Mild',
            color: '#60a5fa',
            weight: 2,
            desc: isVi
              ? 'Đôi khi có thoáng bồn chồn hoặc suy nghĩ nhiều, nhưng cơ chế thích ứng tự nhiên của bạn nhanh chóng thiết lập lại sự cân bằng.'
              : 'Occasional brief restlessness or overthinking may occur, but your natural coping mechanisms quickly restore balance.'
          };
        }
        if (score <= 14) {
          return {
            label: isVi ? 'Vừa' : 'Moderate',
            color: '#fbbf24',
            weight: 3,
            desc: isVi
              ? 'Bạn có thể thỉnh thoảng cảm thấy hồi hộp về thể chất hoặc căng thẳng dự đoán trước. Hít thở cơ hoành (4-7-8) hoặc các bài tập tiếp đất (grounding) sẽ mang lại cảm giác xoa dịu nhanh chóng.'
              : 'You might occasionally notice physical nervousness or anticipatory tension. Slow diaphragmatic breathing (4-7-8) or grounding exercises can bring swift relief.'
          };
        }
        if (score <= 19) {
          return {
            label: isVi ? 'Nặng' : 'Severe',
            color: '#c084fc',
            weight: 4,
            desc: isVi
              ? 'Hệ thần kinh của bạn đang ở trạng thái kích hoạt cao và nhạy cảm trước áp lực bên ngoài. Hãy tiết chế caffein và đảm bảo bạn có không gian cá nhân yên tĩnh, không bị thúc ép.'
              : 'Your nervous system feels heightened and sensitive to external pressure. Moderate caffeine intake and ensure you have quiet, unpressured personal space.'
          };
        }
        return {
          label: isVi ? 'Rất nặng' : 'Extremely Severe',
          color: '#f472b6',
          weight: 5,
          desc: isVi
            ? 'Sự căng thẳng thần kinh và lo âu liên tục xuất hiện rõ nét. Cơ thể bạn đang nhắc nhở bạn lùi lại một bước, thở sâu và tìm kiếm sự đồng hành, hỗ trợ vững vàng.'
            : 'Persistent nervous tension and worry are prominent. Your body is reminding you to step back, exhale deeply, and seek warm, stabilizing guidance.'
        };
      };

      const getStrInfo = (score: number) => {
        if (score <= 14) {
          return {
            label: isVi ? 'Bình thường' : 'Normal',
            color: '#2dd4bf',
            weight: 1,
            desc: isVi
              ? 'Bạn có sức bền cảm xúc tốt, thích ứng êm dịu trước các đòi hỏi và nhanh chóng phục hồi sau những khoảnh khắc thử thách.'
              : 'You have solid emotional stamina, adapt smoothly to demands, and quickly decompress after challenging moments.'
          };
        }
        if (score <= 18) {
          return {
            label: isVi ? 'Nhẹ' : 'Mild',
            color: '#60a5fa',
            weight: 2,
            desc: isVi
              ? 'Đôi khi có sự mệt mỏi vào cuối ngày, nhưng giấc ngủ lành mạnh và các buổi đi dạo thư giãn sẽ giúp bạn nhanh chóng nạp lại năng lượng.'
              : 'Occasional end-of-day fatigue is present, but healthy sleep routines and relaxing walks swiftly replenish your energy.'
          };
        }
        if (score <= 25) {
          return {
            label: isVi ? 'Vừa' : 'Moderate',
            color: '#fbbf24',
            weight: 3,
            desc: isVi
              ? 'Khối lượng công việc hoặc trách nhiệm cá nhân có thể đang thúc ép giới hạn chịu đựng của bạn. Hãy thử chia nhỏ công việc thành từng khoảng 15 phút và có những khoảng nghỉ ngắn chánh niệm.'
              : 'Your workload or personal responsibilities may be pushing your bandwidth. Try chunking tasks into 15-minute intervals and taking frequent mindful breathers.'
          };
        }
        if (score <= 33) {
          return {
            label: isVi ? 'Nặng' : 'Severe',
            color: '#c084fc',
            weight: 4,
            desc: isVi
              ? 'Bạn đang trải qua sự căng thẳng kéo dài và có thể thấy mình dễ mất kiên nhẫn hoặc cạn kiệt năng lượng. Đây là tín hiệu kịp thời để hoãn lại các việc chưa cấp bách và bảo vệ giấc ngủ.'
              : 'You are experiencing sustained tension and may feel easily impatient or depleted. This is a timely signal to postpone non-urgent tasks and protect your sleep.'
          };
        }
        return {
          label: isVi ? 'Rất nặng' : 'Extremely Severe',
          color: '#f472b6',
          weight: 5,
          desc: isVi
            ? 'Áp lực dồn nén tích tụ ở mức rất cao. Hãy cho phép bản thân tạm dừng lại, tạm ngắt kết nối với các nghĩa vụ và dành thời gian cho những hoạt động mang lại sự bình yên đích thực.'
            : 'Cumulative pressure is notably high. Grant yourself permission to take a mental pause, disconnect from obligations, and engage in activities that bring genuine peace.'
        };
      };

      const dep = getDepInfo(finalDepression);
      const anx = getAnxInfo(finalAnxiety);
      const str = getStrInfo(finalStress);

      const maxWeight = Math.max(dep.weight, anx.weight, str.weight);
      let overallBadge = isVi ? '🌱 Cân bằng & Vững tâm' : '🌱 Balanced & Centered';
      let overallColor = '#2dd4bf';
      let recommendations = isVi
        ? [
            'Duy trì các thói quen lành mạnh: giấc ngủ sâu, dinh dưỡng cân đối và kết nối tích cực.',
            'Dành 5–10 phút mỗi ngày cho việc hít thở cơ hoành chậm, đi dạo chánh niệm hoặc chiêm nghiệm tĩnh lặng.'
          ]
        : [
            'Maintain your healthy routines: regular restful sleep, balanced nutrition, and positive connections.',
            'Dedicate 5–10 minutes each day to slow diaphragmatic breathing, mindful walks, or quiet reflection.'
          ];

      if (maxWeight === 2) {
        overallBadge = isVi ? '🌤️ Mệt mỏi nhẹ — Phục hồi êm dịu' : '🌤️ Mild Fatigue — Gentle Restoration';
        overallColor = '#60a5fa';
        recommendations = isVi
          ? [
              'Cố gắng duy trì 7–9 giờ ngủ mỗi đêm và ngắt kết nối với màn hình sáng trước khi ngủ.',
              'Ghi chép nhanh nhật ký buổi tối để giải tỏa các suy nghĩ tồn đọng trong ngày.',
              'Thưởng cho mình một khoảng nghỉ thư giãn cùng người bạn tốt hoặc sở thích nhẹ nhàng.'
            ]
          : [
              'Aim for 7–9 hours of sleep nightly and disconnect from bright screens before bed.',
              'Jot down a quick evening journal to release lingering daily thoughts.',
              'Treat yourself to a relaxing break with a good friend or calming hobby.'
            ];
      } else if (maxWeight === 3) {
        overallBadge = isVi ? '⛅ Căng thẳng mức độ vừa — Ưu tiên nghỉ ngơi' : '⛅ Moderate Strain — Prioritize Rest';
        overallColor = '#fbbf24';
        recommendations = isVi
          ? [
              'Chủ động hoãn lại các nhiệm vụ chưa khẩn cấp để tâm trí có thêm không gian thở.',
              'Thực hành điều hòa hơi thở hoặc vận động thể chất nhẹ (yoga, đi dạo, thả lỏng cơ).',
              'Chia sẻ cảm xúc với người bạn tin cậy thay vì chịu đựng áp lực trong im lặng.'
            ]
          : [
              'Proactively postpone non-urgent tasks to give your mind breathing room.',
              'Practice calming breathwork or light physical movement (yoga, walking, muscle relaxation).',
              'Share your feelings with someone you trust rather than carrying pressures in silence.'
            ];
      } else {
        overallBadge = isVi ? '🌸 Áp lực cao — Dịu dàng với chính mình' : '🌸 High Strain — Be Gentle With Yourself';
        overallColor = '#c084fc';
        recommendations = isVi
          ? [
              'Tâm trí và cơ thể bạn đang phát tín hiệu cần được phục hồi sau thời gian dài chịu áp lực.',
              'Tránh đưa ra những quyết định quan trọng khi tâm trạng đang căng thẳng; ưu tiên giấc ngủ và sự tĩnh lặng.',
              'Trò chuyện cởi mở với người thân yêu hoặc tham vấn chuyên gia tâm lý để nhận được sự đồng hành có cấu trúc và ấm áp.',
              'Ghi nhớ: Cảm thấy quá tải vào những giai đoạn nhất định là trải nghiệm con người tự nhiên, và bạn không phải gánh vác một mình.'
            ]
          : [
              'Your mind and body are signaling a need for recovery after prolonged periods of pressure.',
              'Avoid making major life decisions when feeling emotionally strained; prioritize sleep and calm.',
              'Talk openly with supportive loved ones or consult a professional counselor for warm, structured guidance.',
              'Remember: Feeling overwhelmed at times is a natural human experience, and you do not have to carry it alone.'
            ];
      }

      const scores: Record<string, DimensionResult> = {
        depression: {
          id: 'depression',
          name: isVi ? 'Trầm cảm (Depression)' : 'Depression',
          score: finalDepression,
          maxScore: 42,
          levelLabel: dep.label,
          levelColor: dep.color,
          description: dep.desc
        },
        anxiety: {
          id: 'anxiety',
          name: isVi ? 'Lo âu (Anxiety)' : 'Anxiety',
          score: finalAnxiety,
          maxScore: 42,
          levelLabel: anx.label,
          levelColor: anx.color,
          description: anx.desc
        },
        stress: {
          id: 'stress',
          name: isVi ? 'Căng thẳng (Stress)' : 'Stress',
          score: finalStress,
          maxScore: 42,
          levelLabel: str.label,
          levelColor: str.color,
          description: str.desc
        }
      };

      return {
        title: isVi ? 'Hồ sơ Sức khỏe Cảm xúc DASS-21' : 'DASS-21 Emotional Well-Being Profile',
        summary: isVi
          ? 'Đánh giá chuẩn hóa trên ba chiều kích Trầm cảm, Lo âu và Căng thẳng trong vòng một tuần qua.'
          : 'Standardized assessment across Depression, Anxiety, and Stress dimensions over the past week.',
        scores,
        actionGuide: {
          levelTitle: isVi ? 'Định hướng Chăm sóc Sức khỏe Cảm xúc' : 'Supportive Well-Being Guidance',
          levelBadge: overallBadge,
          levelColor: overallColor,
          recommendations
        }
      };
    }
  };
}

