import { AssessmentDefinition, DimensionResult } from '../types';
import { Locale } from '@/i18n/types';

export const ADHD_QUESTIONS: Array<{
  id: number;
  dimension: 'inattention' | 'hyperactivity';
  textEn: string;
  textVi: string;
}> = [
  // Part A: Core 6 screening questions
  {
    id: 1,
    dimension: 'inattention',
    textEn: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
    textVi: 'Bạn có thường gặp khó khăn trong việc hoàn tất những chi tiết cuối cùng của một công việc hoặc dự án, sau khi những phần thử thách nhất đã được giải quyết?'
  },
  {
    id: 2,
    dimension: 'inattention',
    textEn: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?',
    textVi: 'Bạn có thường gặp khó khăn trong việc sắp xếp trật tự khi phải thực hiện một nhiệm vụ đòi hỏi tính tổ chức và kế hoạch?'
  },
  {
    id: 3,
    dimension: 'inattention',
    textEn: 'How often do you have problems remembering appointments or obligations?',
    textVi: 'Bạn có thường gặp khó khăn trong việc ghi nhớ các cuộc hẹn hoặc bổn phận, trách nhiệm cần làm?'
  },
  {
    id: 4,
    dimension: 'inattention',
    textEn: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?',
    textVi: 'Khi phải đối mặt với một nhiệm vụ đòi hỏi nhiều suy nghĩ và nỗ lực trí tuệ, bạn có thường né tránh hoặc trì hoãn việc bắt tay vào làm không?'
  },
  {
    id: 5,
    dimension: 'hyperactivity',
    textEn: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',
    textVi: 'Bạn có thường bồn chồn, ngọ nguậy tay chân khi phải ngồi yên một chỗ trong thời gian dài?'
  },
  {
    id: 6,
    dimension: 'hyperactivity',
    textEn: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?',
    textVi: 'Bạn có thường cảm thấy hoạt động quá mức và bị thôi thúc phải luôn làm điều gì đó, như thể bạn đang được điều khiển bởi một động cơ?'
  },
  // Part B: Additional 12 symptom severity questions
  {
    id: 7,
    dimension: 'inattention',
    textEn: 'How often do you make careless mistakes when you have to work on a boring or difficult project?',
    textVi: 'Bạn có thường mắc phải những lỗi bất cẩn khi phải làm việc trong một dự án nhàm chán hoặc khó khăn không?'
  },
  {
    id: 8,
    dimension: 'inattention',
    textEn: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?',
    textVi: 'Bạn có thường gặp khó khăn trong việc duy trì sự chú ý khi làm những công việc nhàm chán hoặc mang tính lặp đi lặp lại không?'
  },
  {
    id: 9,
    dimension: 'inattention',
    textEn: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?',
    textVi: 'Bạn có thường thấy khó tập trung vào lời người khác nói, ngay cả khi họ đang nói chuyện trực tiếp với bạn?'
  },
  {
    id: 10,
    dimension: 'inattention',
    textEn: 'How often do you misplace or have difficulty finding things at home or at work?',
    textVi: 'Bạn có thường để thất lạc đồ đạc hoặc gặp khó khăn khi tìm kiếm đồ dùng ở nhà hay nơi làm việc không?'
  },
  {
    id: 11,
    dimension: 'inattention',
    textEn: 'How often are you distracted by activity or noise around you?',
    textVi: 'Bạn có thường dễ bị phân tâm bởi các hoạt động hoặc âm thanh, tiếng ồn xung quanh mình không?'
  },
  {
    id: 12,
    dimension: 'hyperactivity',
    textEn: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?',
    textVi: 'Bạn có thường rời khỏi chỗ ngồi trong các cuộc họp hoặc những tình huống bắt buộc bạn phải ngồi yên không?'
  },
  {
    id: 13,
    dimension: 'hyperactivity',
    textEn: 'How often do you feel restless or squirmy?',
    textVi: 'Bạn có thường cảm thấy bồn chồn, bứt rứt hoặc khó ngồi yên trong người không?'
  },
  {
    id: 14,
    dimension: 'hyperactivity',
    textEn: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?',
    textVi: 'Bạn có thường gặp khó khăn trong việc thả lỏng và thực sự thư giãn khi có thời gian rảnh rỗi cho bản thân không?'
  },
  {
    id: 15,
    dimension: 'hyperactivity',
    textEn: 'How often do you find yourself talking too much when you are in social situations?',
    textVi: 'Bạn có thường thấy mình nói quá nhiều trong các tình huống xã hội và giao tiếp không?'
  },
  {
    id: 16,
    dimension: 'hyperactivity',
    textEn: 'When you are in a conversation, how often do you find yourself finishing the sentences of the people you are talking to before they can finish them?',
    textVi: 'Khi đang trò chuyện, bạn có thường nói chen vào để kết thúc câu của người đối diện trước khi họ kịp nói xong không?'
  },
  {
    id: 17,
    dimension: 'hyperactivity',
    textEn: 'How often do you have difficulty waiting your turn in situations when turn-taking is required?',
    textVi: 'Bạn có thường cảm thấy khó kiên nhẫn chờ đợi đến lượt mình trong những tình huống đòi hỏi phải xếp hàng hoặc lần lượt không?'
  },
  {
    id: 18,
    dimension: 'hyperactivity',
    textEn: 'How often do you interrupt others when they are busy?',
    textVi: 'Bạn có thường ngắt lời hoặc xen vào khi người khác đang bận rộn không?'
  }
];

export function createAdhdDefinition(locale: Locale = 'en'): AssessmentDefinition {
  const isVi = locale === 'vi';

  return {
    id: 'adhd',
    code: 'ASRS-18',
    name: isVi ? 'Thang Tự Đánh giá ADHD Người lớn của WHO (ASRS v1.1)' : 'Adult ADHD Screening Scale (ASRS v1.1)',
    subtitle: isVi ? 'Bảng tự đánh giá ADHD người lớn của WHO (18 câu)' : 'WHO Adult ADHD Self-Report Scale (18 items)',
    description: isVi
      ? 'Bộ câu hỏi sàng lọc chuẩn hóa quốc tế gồm 18 mục do Tổ chức Y tế Thế giới (WHO) và Trường Y Harvard phối hợp phát triển nhằm đánh giá kiểu tập trung, chức năng điều hành và xu hướng tăng động ở người trưởng thành (Kessler và cs., 2005).'
      : 'An internationally validated 18-item screening questionnaire developed in conjunction with the World Health Organization (WHO) and Harvard Medical School to assess adult attention patterns, executive functioning, and hyperactivity.',
    duration: isVi ? '4 - 6 phút' : '4 - 6 mins',
    itemCount: 18,
    license: 'Public Domain (World Health Organization & Harvard Medical School)',
    disclaimer: isVi
      ? 'Bài đánh giá này là công cụ sàng lọc khoa học phục vụ mục đích nâng cao nhận thức cá nhân và giáo dục. Bài kiểm tra không thay thế chẩn đoán lâm sàng toàn diện của bác sĩ tâm thần hoặc chuyên gia tâm lý lâm sàng.'
      : 'This assessment is a scientifically validated screening instrument for educational self-awareness. It cannot replace a comprehensive clinical consultation with a qualified psychiatrist or clinical psychologist.',
    notebookLmUrl: 'https://notebook.google.com/notebook/a3405fea-e381-4b2d-b50d-b30cff62b7bb',
    notebookLmPrompts: isVi
      ? [
          'Đâu là sự khác biệt cốt lõi giữa biểu hiện Giảm chú ý (Inattentive) và Tăng động - Bốc đồng (Hyperactive-Impulsive) ở người lớn?',
          'Những chiến lược chức năng điều hành dựa trên bằng chứng nào giúp quản lý sự trì hoãn và "mù thời gian" (time blindness)?',
          'Cơ chế điều hòa dopamine và hệ thần kinh theo đuổi sự hứng thú (interest-based nervous system) ảnh hưởng thế nào đến sự tập trung?',
          'Những điều chỉnh lối sống (vận động, giấc ngủ, sắp xếp môi trường sống) nào hỗ trợ tối ưu cho bộ não ADHD?'
        ]
      : [
          'What are the core differences between Inattentive and Hyperactive-Impulsive presentations of adult ADHD?',
          'What evidence-based executive functioning strategies help adults manage procrastination and time blindness?',
          'How do dopamine regulation and interest-based nervous systems influence ADHD focus?',
          'What lifestyle adaptations (exercise, sleep, environment design) best support ADHD brains?'
        ],
    options: [
      { value: 0, label: '0', description: isVi ? 'Không bao giờ' : 'Never' },
      { value: 1, label: '1', description: isVi ? 'Hiếm khi' : 'Rarely' },
      { value: 2, label: '2', description: isVi ? 'Thỉnh thoảng' : 'Sometimes' },
      { value: 3, label: '3', description: isVi ? 'Thường xuyên' : 'Often' },
      { value: 4, label: '4', description: isVi ? 'Rất thường xuyên' : 'Very Often' }
    ],
    questions: ADHD_QUESTIONS.map(q => ({
      id: q.id,
      text: isVi ? q.textVi : q.textEn,
      dimension: q.dimension
    })),
    calculateResults: (answers: Record<number, number>) => {
      // Official WHO ASRS v1.1 Scoring Algorithm
      let partAPositiveCount = 0;
      if ((answers[1] || 0) >= 2) partAPositiveCount += 1;
      if ((answers[2] || 0) >= 2) partAPositiveCount += 1;
      if ((answers[3] || 0) >= 2) partAPositiveCount += 1;
      if ((answers[4] || 0) >= 3) partAPositiveCount += 1;
      if ((answers[5] || 0) >= 3) partAPositiveCount += 1;
      if ((answers[6] || 0) >= 3) partAPositiveCount += 1;

      const inattItems = [1, 2, 3, 4, 7, 8, 9, 10, 11];
      let inattScore = 0;
      inattItems.forEach(id => {
        inattScore += answers[id] || 0;
      });

      const hyperItems = [5, 6, 12, 13, 14, 15, 16, 17, 18];
      let hyperScore = 0;
      hyperItems.forEach(id => {
        hyperScore += answers[id] || 0;
      });

      const isHighProbability = partAPositiveCount >= 4;
      const isModerateProbability = partAPositiveCount >= 2 && partAPositiveCount <= 3;

      let overallBadge = isVi ? '🌱 Chức năng Điều hành Điển hình' : '🌱 Typical Executive Function';
      let overallColor = '#10B981';
      let summaryText = isVi
        ? 'Phản hồi của bạn cho thấy mô thức tập trung và chức năng điều hành ở mức độ phổ biến, ít gặp xáo trộn đáng kể trong các hoạt động thường ngày.'
        : 'Your responses reflect typical attention and executive functioning patterns, with few significant disruptions to everyday routines.';
      let recommendations = isVi
        ? [
            'Duy trì các thói quen tổ chức, lịch trình biểu và nhịp sinh hoạt đang hỗ trợ tốt cho sự tập trung bền vững của bạn.',
            'Áp dụng các khoảng thời gian làm việc có cấu trúc (như kỹ thuật Pomodoro 25 phút) khi giải quyết các nhiệm vụ phức tạp.'
          ]
        : [
            'Maintain your current organizational habits, calendars, and routines that support sustained focus.',
            'Incorporate structured work intervals (such as 25-minute Pomodoro sessions) during complex tasks.'
          ];

      if (isHighProbability) {
        overallBadge = isVi ? '⚡ Mức độ tương đồng cao với đặc điểm ADHD' : '⚡ High Consistency with ADHD Traits';
        overallColor = '#F59E0B';
        summaryText = isVi
          ? 'Điểm sàng lọc Phần A của bạn cho thấy sự hiện diện đáng kể của các triệu chứng tương đồng với ADHD ở người lớn. Điều này gợi ý rằng não bộ của bạn có thể vận hành theo hệ thần kinh hướng theo sự hứng thú (interest-based), cần sự mới lạ và các chiến lược tổ chức chuyên biệt.'
          : 'Your Part A screening score indicates a notable presence of symptoms consistent with adult ADHD. This suggests your brain may operate on an interest-based nervous system that thrives on novelty and specialized organizational strategies.';
        recommendations = isVi
          ? [
              'Khám phá kỹ thuật "body doubling" (làm việc cùng người khác), các gợi ý thị giác trực quan và đồng hồ đếm ngược để bù đắp điểm nghẽn chức năng điều hành.',
              'Cân nhắc chia sẻ kết quả này với chuyên gia y tế hoặc chuyên gia tâm lý lâm sàng để được đánh giá chẩn đoán chuyên sâu.',
              'Thiết kế không gian sống và làm việc nhằm giảm thiểu lực cản: đặt các công cụ ưu tiên ở vị trí dễ nhìn thấy và tự động hóa các thao tác lặp đi lặp lại.'
            ]
          : [
              'Explore body doubling, visual cues, and external timers to bridge executive function gaps.',
              'Consider sharing this report with a qualified healthcare provider or ADHD specialist for formal clinical evaluation.',
              'Design your environment to minimize friction: keep high-priority tools in plain sight and automate repetitive logistics.'
            ];
      } else if (isModerateProbability) {
        overallBadge = isVi ? '🌤️ Dao động Tập trung Mức độ Vừa' : '🌤️ Moderate Attention Fluctuations';
        overallColor = '#3B82F6';
        summaryText = isVi
          ? 'Bạn thỉnh thoảng gặp khó khăn với sự tập trung, sự trì hoãn hoặc cảm giác bồn chồn; những biểu hiện này có thể dao động tùy theo mức độ căng thẳng, giấc ngủ và mức độ hứng thú với nhiệm vụ hiện tại.'
          : 'You experience occasional challenges with focus, procrastination, or restlessness, which may fluctuate depending on stress levels, sleep, and interest in current tasks.';
        recommendations = isVi
          ? [
              'Nhận diện các môi trường dễ gây phân tán tâm trí và chủ động giảm bớt các kích thích thị giác, thính giác gây xao nhãng.',
              'Chia nhỏ các nhiệm vụ lớn, mơ hồ thành các bước hành động cụ thể trong vòng 10 phút.',
              'Ưu tiên giấc ngủ chất lượng và tập luyện thể dục nhịp điệu đều đặn để nâng cao mức dopamine tự nhiên.'
            ]
          : [
              'Notice what environments trigger mental drift and proactively reduce auditory and visual distractions.',
              'Break larger, ambiguous obligations into concrete 10-minute micro-steps.',
              'Prioritize consistent sleep and regular cardiovascular exercise to naturally boost baseline dopamine.'
            ];
      }

      const scores: Record<string, DimensionResult> = {
        screeningPartA: {
          id: 'screeningPartA',
          name: isVi ? 'Sàng lọc Cốt lõi WHO Phần A' : 'WHO Part A Core Screening',
          score: partAPositiveCount,
          maxScore: 6,
          levelLabel: isHighProbability
            ? (isVi ? 'Dương tính (>= 4)' : 'Positive Screen (>= 4)')
            : isModerateProbability
              ? (isVi ? 'Mức độ vừa (2-3)' : 'Moderate (2-3)')
              : (isVi ? 'Thấp (0-1)' : 'Low (0-1)'),
          levelColor: isHighProbability ? '#F59E0B' : isModerateProbability ? '#3B82F6' : '#10B981',
          description: isHighProbability
            ? (isVi
                ? 'Bạn có từ 4 triệu chứng cốt lõi trở lên vượt ngưỡng sàng lọc lâm sàng. Trong nghiên cứu lâm sàng của WHO, điều này có mối tương quan mạnh mẽ với các đặc điểm ADHD ở người lớn.'
                : 'You endorsed 4 or more core symptoms exceeding clinical threshold. In clinical research, this strongly correlates with adult ADHD characteristics.')
            : (isVi
                ? 'Bạn có dưới 4 triệu chứng vượt ngưỡng sàng lọc lâm sàng, cho thấy ít sự xáo trộn cốt lõi trong các nhiệm vụ chức năng điều hành chính.'
                : 'You endorsed fewer than 4 symptoms above clinical threshold, indicating fewer core disruptions in primary executive tasks.')
        },
        inattention: {
          id: 'inattention',
          name: isVi ? 'Thiếu chú ý & Trí nhớ làm việc' : 'Inattention & Working Memory',
          score: inattScore,
          maxScore: 36,
          averageScore: +(inattScore / 9).toFixed(1),
          levelLabel: inattScore >= 20
            ? (isVi ? 'Biểu hiện Giảm chú ý cao' : 'Elevated Inattention')
            : inattScore >= 12
              ? (isVi ? 'Giảm chú ý mức độ vừa' : 'Moderate Inattention')
              : (isVi ? 'Mức độ nhẹ / Thấp' : 'Mild / Low'),
          levelColor: inattScore >= 20 ? '#F59E0B' : '#3B82F6',
          description: inattScore >= 18
            ? (isVi
                ? 'Bạn thường xuyên gặp phải tình trạng tâm trí xao nhãng, khó khăn khi chuyển đổi nhiệm vụ, hay quên hoặc khó duy trì sự chú ý vào các trách nhiệm lặp đi lặp lại.'
                : 'You experience frequent wandering attention, task-switching friction, forgetfulness, or difficulty sustaining focus on routine obligations.')
            : (isVi
                ? 'Bạn nhìn chung duy trì được sự chú ý thỏa đáng trong công việc và giữ được tính tổ chức sinh hoạt ổn định hàng ngày.'
                : 'You generally sustain adequate attention on tasks and maintain functional day-to-day organization.')
        },
        hyperactivity: {
          id: 'hyperactivity',
          name: isVi ? 'Tăng động & Xung động' : 'Hyperactivity & Impulsivity',
          score: hyperScore,
          maxScore: 36,
          averageScore: +(hyperScore / 9).toFixed(1),
          levelLabel: hyperScore >= 20
            ? (isVi ? 'Biểu hiện Tăng động cao' : 'Elevated Hyperactivity')
            : hyperScore >= 12
              ? (isVi ? 'Bồn chồn mức độ vừa' : 'Moderate Restlessness')
              : (isVi ? 'Mức độ nhẹ / Thấp' : 'Mild / Low'),
          levelColor: hyperScore >= 20 ? '#F59E0B' : '#3B82F6',
          description: hyperScore >= 18
            ? (isVi
                ? 'Bạn hay có cảm giác bồn chồn thể chất hoặc tâm trí, cảm giác gấp gáp bên trong, tốc độ nói nhanh hoặc khó thư giãn trong tĩnh lặng.'
                : 'You experience physical or mental restlessness, internal urgency, rapid verbal flow, or difficulty unwinding quietly.')
            : (isVi
                ? 'Bạn duy trì được sự bình tĩnh về mặt thể chất, thoải mái khi phải chờ đến lượt và dễ dàng thả lỏng khi ở trạng thái nghỉ ngơi.'
                : 'You experience comfortable physical composure, smooth turn-taking, and ease in relaxing when stationary.')
        }
      };

      return {
        title: isVi ? 'Hồ sơ Sàng lọc ADHD Người lớn (ASRS v1.1)' : 'Adult ADHD Screening Profile (ASRS v1.1)',
        summary: summaryText,
        scores,
        actionGuide: {
          levelTitle: isVi ? 'Hỗ trợ Chức năng Điều hành & Đa dạng Thần kinh' : 'Executive Function & Neurodiversity Support',
          levelBadge: overallBadge,
          levelColor: overallColor,
          recommendations
        }
      };
    }
  };
}

