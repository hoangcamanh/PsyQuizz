import { AssessmentDefinition, DimensionResult } from '../types';
import { Locale } from '@/i18n/types';

export const EYSENCK_QUESTIONS: Array<{
  id: number;
  dimension: 'extraversion' | 'neuroticism' | 'lie';
  isReverse?: boolean;
  textEn: string;
  textVi: string;
}> = [
  { id: 1, dimension: 'extraversion', textEn: 'Do you often long for excitement?', textVi: 'Bạn có thường khao khát những điều mới lạ, sôi nổi không?' },
  { id: 2, dimension: 'neuroticism', textEn: 'Do you often need understanding friends to cheer you up?', textVi: 'Bạn có thường cần những người bạn thấu hiểu để động viên, an ủi mình không?' },
  { id: 3, dimension: 'extraversion', textEn: 'Are you usually carefree?', textVi: 'Bạn có thường là người vô tư lự, ít khi bận tâm lo nghĩ không?' },
  { id: 4, dimension: 'neuroticism', textEn: 'Do you find it very hard to take no for an answer?', textVi: 'Bạn có thấy rất khó chấp nhận khi bị người khác từ chối không?' },
  { id: 5, dimension: 'extraversion', isReverse: true, textEn: 'Do you stop and think things over before doing anything?', textVi: 'Bạn có dừng lại suy nghĩ thấu đáo trước khi làm bất cứ việc gì không?' },
  { id: 6, dimension: 'lie', textEn: 'If you say you will do something, do you always keep your promise no matter how inconvenient it might be?', textVi: 'Nếu đã hứa làm điều gì, bạn có luôn giữ lời dù gặp khó khăn, bất tiện đến đâu không?' },
  { id: 7, dimension: 'neuroticism', textEn: 'Do your moods go up and down?', textVi: 'Tâm trạng của bạn có hay thất thường, khi vui khi buồn không?' },
  { id: 8, dimension: 'extraversion', textEn: 'Do you generally do and say things quickly without stopping to think?', textVi: 'Bạn có thường nói và làm nhanh chóng mà không cần suy tính trước không?' },
  { id: 9, dimension: 'neuroticism', textEn: 'Do you ever feel "just miserable" for no good reason?', textVi: 'Đã bao giờ bạn cảm thấy "thật khổ sở, ủ rũ" mà không có lý do rõ ràng chưa?' },
  { id: 10, dimension: 'extraversion', textEn: 'Would you do almost anything for a dare?', textVi: 'Bạn có sẵn sàng làm hầu như mọi thứ nếu được người khác thách đố không?' },
  { id: 11, dimension: 'neuroticism', textEn: 'Do you suddenly feel shy when you want to talk to an attractive stranger?', textVi: 'Bạn có đột nhiên thấy ngượng ngùng khi muốn bắt chuyện với một người lạ hấp dẫn không?' },
  { id: 12, dimension: 'lie', isReverse: true, textEn: 'Once in a while do you lose your temper and get angry?', textVi: 'Thỉnh thoảng bạn có mất bình tĩnh và nổi nóng không?' },
  { id: 13, dimension: 'extraversion', textEn: 'Do you often do things on the spur of the moment?', textVi: 'Bạn có thường hành động theo cảm hứng nhất thời không?' },
  { id: 14, dimension: 'neuroticism', textEn: 'Do you often worry about things you should not have done or said?', textVi: 'Bạn có hay lo nghĩ về những việc mình lẽ ra không nên làm hoặc không nên nói không?' },
  { id: 15, dimension: 'extraversion', isReverse: true, textEn: 'Generally do you prefer reading to meeting people?', textVi: 'Nhìn chung bạn có thích đọc sách hơn là giao lưu gặp gỡ mọi người không?' },
  { id: 16, dimension: 'neuroticism', textEn: 'Are your feelings rather easily hurt?', textVi: 'Cảm xúc của bạn có khá dễ bị tổn thương không?' },
  { id: 17, dimension: 'extraversion', textEn: 'Do you like going out a lot?', textVi: 'Bạn có thích ra ngoài dạo chơi, giao lưu thường xuyên không?' },
  { id: 18, dimension: 'lie', isReverse: true, textEn: 'Do you occasionally have thoughts and ideas that you would not like other people to know about?', textVi: 'Thỉnh thoảng bạn có những suy nghĩ hoặc ý định mà bạn không muốn người khác biết không?' },
  { id: 19, dimension: 'neuroticism', textEn: 'Are you sometimes bubbling over with energy and sometimes very sluggish?', textVi: 'Có lúc bạn tràn đầy năng lượng nhưng cũng có lúc lại rất uể oải, chậm chạp không?' },
  { id: 20, dimension: 'extraversion', isReverse: true, textEn: 'Do you prefer to have few but special friends?', textVi: 'Bạn có thích chỉ có ít bạn nhưng là những người bạn thực sự thân thiết, đặc biệt không?' },
  { id: 21, dimension: 'neuroticism', textEn: 'Do you daydream a lot?', textVi: 'Bạn có hay mơ mộng giữa ban ngày không?' },
  { id: 22, dimension: 'extraversion', textEn: 'When people shout at you, do you shout back?', textVi: 'Khi người khác lớn tiếng quát mắng bạn, bạn có quát lại họ không?' },
  { id: 23, dimension: 'neuroticism', textEn: 'Are you often troubled about feelings of guilt?', textVi: 'Bạn có thường bị dằn vặt bởi cảm giác tội lỗi hoặc ân hận không?' },
  { id: 24, dimension: 'lie', textEn: 'Are all your habits good and desirable ones?', textVi: 'Có phải tất cả các thói quen của bạn đều tốt và đáng khen ngợi không?' },
  { id: 25, dimension: 'extraversion', textEn: 'Can you usually let yourself go and have a good time at a lively party?', textVi: 'Bạn có thường hòa mình và tận hưởng hết mình trong một bữa tiệc sôi động không?' },
  { id: 26, dimension: 'neuroticism', textEn: 'Would you call yourself a nervous person?', textVi: 'Bạn có tự nhận mình là một người hay bồn chồn, lo lắng không?' },
  { id: 27, dimension: 'extraversion', textEn: 'Do other people think of you as being very lively?', textVi: 'Người khác có nhận xét bạn là một người rất hoạt bát, sôi nổi không?' },
  { id: 28, dimension: 'neuroticism', textEn: 'After you have done something important, do you often come away feeling you could have done it better?', textVi: 'Sau khi làm xong một việc quan trọng, bạn có thường cảm thấy mình lẽ ra có thể làm tốt hơn không?' },
  { id: 29, dimension: 'extraversion', isReverse: true, textEn: 'Are you usually quiet when you are with other people?', textVi: 'Bạn có thường trầm lặng, ít nói khi ở cùng người khác không?' },
  { id: 30, dimension: 'lie', isReverse: true, textEn: 'Do you sometimes gossip?', textVi: 'Thỉnh thoảng bạn có bàn tán, buôn chuyện về người khác không?' },
  { id: 31, dimension: 'neuroticism', textEn: 'Do ideas run through your head so that you cannot sleep?', textVi: 'Những suy nghĩ cứ quẩn quanh trong đầu có khiến bạn trằn trọc khó ngủ không?' },
  { id: 32, dimension: 'extraversion', isReverse: true, textEn: 'If there is something you want to know about, would you rather look it up in a book than talk to someone about it?', textVi: 'Nếu muốn tìm hiểu điều gì, bạn thích tự tra cứu trong sách hơn là hỏi người khác phải không?' },
  { id: 33, dimension: 'neuroticism', textEn: 'Do you get palpitations or thumping in your heart?', textVi: 'Bạn có hay bị hồi hộp, tim đập thình thịch trong lồng ngực không?' },
  { id: 34, dimension: 'extraversion', isReverse: true, textEn: 'Do you like the kind of work that you need to pay close attention to?', textVi: 'Bạn có thích những công việc đòi hỏi phải tập trung chú ý cao độ không?' },
  { id: 35, dimension: 'neuroticism', textEn: 'Do get attacks of shaking or trembling?', textVi: 'Bạn có hay bị những cơn run rẩy toàn thân hoặc run tay chân không?' },
  { id: 36, dimension: 'lie', textEn: 'Would you always declare everything at customs, even if you knew you would not be found out?', textVi: 'Bạn có luôn khai báo thành thật mọi thứ khi qua hải quan ngay cả khi biết chắc sẽ không bị phát hiện không?' },
  { id: 37, dimension: 'extraversion', isReverse: true, textEn: 'Do you hate being with a crowd who play jokes on one another?', textVi: 'Bạn có ghét việc ở cùng một nhóm người hay trêu đùa, chơi khăm nhau không?' },
  { id: 38, dimension: 'neuroticism', textEn: 'Are you an irritable person?', textVi: 'Bạn có phải là người dễ nổi cáu, gắt gỏng không?' },
  { id: 39, dimension: 'extraversion', textEn: 'Do you like doing things in which you have to act quickly?', textVi: 'Bạn có thích làm những công việc đòi hỏi phải hành động thật nhanh chóng không?' },
  { id: 40, dimension: 'neuroticism', textEn: 'Do you worry about awful things that might happen?', textVi: 'Bạn có hay lo sợ về những điều tồi tệ có thể xảy ra trong tương lai không?' },
  { id: 41, dimension: 'extraversion', isReverse: true, textEn: 'Are you slow and unhurried in the way you move?', textVi: 'Cử chỉ, đi đứng của bạn có chậm rãi, từ tốn không?' },
  { id: 42, dimension: 'lie', isReverse: true, textEn: 'Have you ever been late for an appointment or work?', textVi: 'Đã bao giờ bạn đi muộn trong một cuộc hẹn hoặc trễ giờ làm việc chưa?' },
  { id: 43, dimension: 'neuroticism', textEn: 'Do you have many nightmares?', textVi: 'Bạn có hay gặp ác mộng khi ngủ không?' },
  { id: 44, dimension: 'extraversion', textEn: 'Do you like talking to people so much that you never miss a chance of talking to a stranger?', textVi: 'Bạn có thích nói chuyện với mọi người đến mức không bao giờ bỏ lỡ cơ hội bắt chuyện với người lạ không?' },
  { id: 45, dimension: 'neuroticism', textEn: 'Are you troubled by aches and pains?', textVi: 'Bạn có hay bị quấy rầy bởi các cơn đau nhức thể chất không?' },
  { id: 46, dimension: 'extraversion', textEn: 'Would you be very unhappy if you could not see lots of people most of the time?', textVi: 'Bạn có cảm thấy rất buồn chán nếu không được gặp gỡ nhiều người trong phần lớn thời gian không?' },
  { id: 47, dimension: 'neuroticism', textEn: 'Would you call yourself a tense or highly-strung person?', textVi: 'Bạn có tự nhận mình là người hay căng thẳng, dễ bị kích động tâm lý không?' },
  { id: 48, dimension: 'lie', isReverse: true, textEn: 'Of all the people you know, are there some whom you definitely do not like?', textVi: 'Trong số những người quen biết, có ai mà bạn thực sự không ưa không?' },
  { id: 49, dimension: 'extraversion', textEn: 'Would you say you are fairly self-confident?', textVi: 'Bạn có tự đánh giá mình là người khá tự tin không?' },
  { id: 50, dimension: 'neuroticism', textEn: 'Are you easily hurt when people find fault with you or the work you do?', textVi: 'Bạn có dễ bị chạnh lòng tổn thương khi người khác bắt lỗi bạn hoặc công việc của bạn không?' },
  { id: 51, dimension: 'extraversion', isReverse: true, textEn: 'Do you find it hard to really enjoy yourself at a lively party?', textVi: 'Bạn có thấy khó để thực sự hòa nhập và vui vẻ trong một bữa tiệc náo nhiệt không?' },
  { id: 52, dimension: 'neuroticism', textEn: 'Are you troubled with feelings of inferiority?', textVi: 'Bạn có hay bị dằn vặt bởi cảm giác tự ti, thua kém người khác không?' },
  { id: 53, dimension: 'extraversion', textEn: 'Can you easily get some life into a rather dull party?', textVi: 'Bạn có thể dễ dàng khuấy động không khí tươi vui trong một bữa tiệc tẻ nhạt không?' },
  { id: 54, dimension: 'lie', isReverse: true, textEn: 'Do you sometimes talk about things you know nothing about?', textVi: 'Thỉnh thoảng bạn có nói về những điều mà mình thực sự không hiểu rõ không?' },
  { id: 55, dimension: 'neuroticism', textEn: 'Do you worry about your health?', textVi: 'Bạn có hay lo lắng về tình trạng sức khỏe của mình không?' },
  { id: 56, dimension: 'extraversion', textEn: 'Do you like playing practical jokes on others?', textVi: 'Bạn có thích trêu chọc hoặc đùa giỡn vui vẻ với người khác không?' },
  { id: 57, dimension: 'neuroticism', textEn: 'Do you suffer from sleeplessness?', textVi: 'Bạn có hay bị mất ngủ hành hạ không?' }
];

export function createEysenckDefinition(locale: Locale = 'en'): AssessmentDefinition {
  const isVi = locale === 'vi';

  return {
    id: 'eysenck',
    code: 'EPI-57',
    name: isVi ? 'Bảng kiểm Khí chất & Nhân cách Eysenck (EPI)' : 'Eysenck Personality & Temperament (EPI)',
    subtitle: isVi ? 'Bảng kiểm Khí chất & Nhân cách Eysenck (57 câu)' : 'Eysenck Personality Inventory (57 items)',
    description: isVi
      ? 'Bộ công cụ tâm lý học thực chứng kinh điển đánh giá khí chất sinh học qua các trục Hướng ngoại (Extraversion), Tính bất ổn cảm xúc (Neuroticism) và thang đo Điểm Thật / Chuẩn mực xã hội (Lie scale) (Eysenck & Eysenck, 1964).'
      : 'A classic psychometric assessment evaluating biological temperament and personality dynamics across Extraversion, Neuroticism, and the Lie (Social Desirability) scale.',
    duration: isVi ? '5 - 8 phút' : '5 - 8 mins',
    itemCount: 57,
    license: 'Public Domain (Eysenck & Eysenck, 1964)',
    disclaimer: isVi
      ? 'Khí chất liên quan đến tốc độ và cường độ của các quá trình thần kinh bẩm sinh. Đây là nền tảng sinh học định hình thói quen và hoàn toàn có thể được rèn luyện, thích ứng theo thời gian.'
      : 'Temperament relates to the underlying speed and strength of your nervous system processes. It is a biological foundation for your habits and can be adapted and developed over time.',
    notebookLmUrl: 'https://notebook.google.com/notebook/51f97a44-cdcb-43bd-9ac5-cee21c64e228',
    notebookLmPrompts: isVi
      ? [
          'Khí chất sinh học liên quan thế nào đến mức độ kích thích và phản ứng của hệ thần kinh theo Hans Eysenck?',
          'Đâu là thế mạnh độc đáo trong sự nghiệp và mối quan hệ của Khí chất Điềm đạm so với Khí chất Hoạt bát?',
          'Liệu một người có thể điều chỉnh hoặc rèn luyện các xu hướng khí chất bẩm sinh nhờ tính mềm dẻo của não bộ (neuroplasticity) không?',
          'Sự cân bằng giữa Hướng ngoại và Bất ổn cảm xúc định hình khả năng phục hồi trước stress như thế nào?'
        ]
      : [
          'How does biological temperament relate to nervous system arousal and reactivity according to Hans Eysenck?',
          'What are the unique career and relational strengths of a Phlegmatic vs a Sanguine temperament?',
          'Can someone modify or adapt their innate temperament tendencies over time through neuroplasticity?',
          'How does the balance between Extraversion and Neuroticism shape stress resilience?'
        ],
    options: [
      { value: 1, label: isVi ? 'Có' : 'Yes', description: isVi ? 'Đúng với tôi' : 'Yes, this describes me' },
      { value: 0, label: isVi ? 'Không' : 'No', description: isVi ? 'Không đúng với tôi' : 'No, this does not describe me' }
    ],
    questions: EYSENCK_QUESTIONS.map(q => ({
      id: q.id,
      text: isVi ? q.textVi : q.textEn,
      dimension: q.dimension,
      isReverse: q.isReverse
    })),
    calculateResults: (answers: Record<number, number>) => {
      // Invariant mathematical scoring logic
      const extYes = [1, 3, 8, 10, 13, 17, 22, 25, 27, 39, 44, 46, 49, 53, 56];
      const extNo = [5, 15, 20, 29, 32, 34, 37, 41, 51];

      let extScore = 0;
      extYes.forEach(id => {
        if (answers[id] === 1) extScore += 1;
      });
      extNo.forEach(id => {
        if (answers[id] === 0) extScore += 1;
      });

      const neuYes = [2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45, 47, 50, 52, 55, 57];
      let neuScore = 0;
      neuYes.forEach(id => {
        if (answers[id] === 1) neuScore += 1;
      });

      const lieYes = [6, 24, 36];
      const lieNo = [12, 18, 30, 42, 48, 54];
      let lieScore = 0;
      lieYes.forEach(id => {
        if (answers[id] === 1) lieScore += 1;
      });
      lieNo.forEach(id => {
        if (answers[id] === 0) lieScore += 1;
      });

      const isExt = extScore > 12;
      const isNeu = neuScore > 12;

      let temperamentTitle = '';
      let temperamentBadge = '';
      let temperamentColor = '#8B5CF6';
      let temperamentDesc = '';
      let recommendations: string[] = [];

      if (isExt && isNeu) {
        // Choleric
        temperamentTitle = isVi ? 'Khí chất Nóng nảy (Mạnh mẽ & Quyết đoán)' : 'Choleric Temperament (Bold & Dynamic)';
        temperamentBadge = isVi ? '🔥 Khí chất Nóng nảy (Năng nổ & Nhiệt huyết)' : '🔥 Choleric (Active & Passionate)';
        temperamentColor = '#F59E0B';
        temperamentDesc = isVi
          ? 'Hệ thần kinh của bạn hoạt động với năng lượng cao: phản ứng nhanh, giàu nhiệt huyết, quyết đoán và có ý chí tiến thủ. Bạn được thúc đẩy mạnh mẽ trước các thử thách, tuy nhiên có thể đôi khi phản ứng nhanh và nôn nóng khi gặp trở ngại.'
          : 'You have a high-energy nervous system: quick to react, passionate, decisive, and ambitious. You are driven by challenges, though you may occasionally feel quick to react or impatient when obstacles arise.';
        recommendations = isVi
          ? [
              'Chuyển hóa nhiệt huyết và năng lượng bùng nổ vào các mục tiêu lãnh đạo và dự án sáng tạo đột phá.',
              'Tập thói quen hít thở chậm vài nhịp trước khi phản hồi trong các cuộc thảo luận căng thẳng để hệ thần kinh tự điều hòa.',
              'Kết hợp vận động thể chất đều đặn (võ thuật, thể thao sức bền) để giải tỏa năng lượng dư thừa một cách tích cực.'
            ]
          : [
              'Channel your dynamic passion into goal-driven leadership and creative projects.',
              'Practice brief pauses before reacting in high-stakes conversations to allow your nervous system to regulate.',
              'Incorporate grounding physical movement (martial arts, endurance sports) to productively release excess arousal.'
            ];
      } else if (isExt && !isNeu) {
        // Sanguine
        temperamentTitle = isVi ? 'Khí chất Hoạt bát (Năng động & Cởi mở)' : 'Sanguine Temperament (Sociable & Outgoing)';
        temperamentBadge = isVi ? '✨ Khí chất Hoạt bát (Vui vẻ & Yêu đời)' : '✨ Sanguine (Lively & Carefree)';
        temperamentColor = '#10B981';
        temperamentDesc = isVi
          ? 'Bạn có một hệ thần kinh linh hoạt và cân bằng: lạc quan, ấm áp, thích nghi nhanh và giao tiếp tự nhiên. Bạn dễ dàng tạo thiện cảm, nhanh chóng vượt qua thất bại và mang lại bầu không khí tích cực cho tập thể.'
          : 'You have a balanced and lively nervous system: optimistic, warm, adaptable, and naturally communicative. You build rapport effortlessly, recover quickly from setbacks, and bring positive morale to group settings.';
        recommendations = isVi
          ? [
              'Phát huy thế mạnh trong môi trường hợp tác, công việc giao tiếp truyền thông và xây dựng cộng đồng.',
              'Kết hợp sự hào hứng tự nhiên với hệ thống kế hoạch có cấu trúc để theo đuổi mục tiêu dài hạn đến cùng.',
              'Dành khoảng lặng cần thiết để tập trung sâu giữa các hoạt động xã hội nhằm duy trì sự bền bỉ.'
            ]
          : [
              'Thrive in collaborative environments, communication roles, and community-building initiatives.',
              'Pair your spontaneous enthusiasm with structured planning systems to follow through on long-term goals.',
              'Protect time for deep, quiet focus amidst social engagements to maintain momentum.'
            ];
      } else if (!isExt && isNeu) {
        // Melancholic
        temperamentTitle = isVi ? 'Khí chất U sầu (Sâu sắc & Tinh tế)' : 'Melancholic Temperament (Thoughtful & Sensitive)';
        temperamentBadge = isVi ? '🌊 Khí chất U sầu (Sâu sắc & Thấu cảm)' : '🌊 Melancholic (Deep & Analytical)';
        temperamentColor = '#8B5CF6';
        temperamentDesc = isVi
          ? 'Bạn sở hữu hệ thần kinh nhạy bén, sâu sắc và tinh tế. Bạn cảm nhận cảm xúc phong phú, suy tư sâu xa về cuộc sống, đồng thời dành sự cẩn trọng và tận tâm đặc biệt cho chất lượng và độ hoàn hảo của công việc.'
          : 'You possess a deeply perceptive, introspective, and detail-attuned nervous system. You feel emotions with profound richness, think deeply about life, and bring immense dedication and care to quality and craft.';
        recommendations = isVi
          ? [
              'Trân trọng thế giới nội tâm phong phú và sự nhạy cảm như một lợi thế cho tư duy phân tích sâu và chiều sâu nghệ thuật.',
              'Cân bằng xu hướng tự phê bình bằng việc chủ động ghi nhận và ăn mừng những tiến bộ nhỏ mỗi ngày.',
              'Thiết lập nhịp sinh hoạt ổn định, không gian yên tĩnh để sạc lại năng lượng và tự nhủ nhân ái với bản thân khi đối mặt căng thẳng.'
            ]
          : [
              'Honor your rich inner world and sensitivity as a superpower for deep analytical thinking and artistic depth.',
              'Counter self-critical tendencies by intentionally celebrating small daily milestones.',
              'Ensure predictable routines, quiet recharge spaces, and compassionate self-talk when navigating stress.'
            ];
      } else {
        // Phlegmatic
        temperamentTitle = isVi ? 'Khí chất Điềm đạm (Bình thản & Điềm tĩnh)' : 'Phlegmatic Temperament (Calm & Peaceful)';
        temperamentBadge = isVi ? '🌱 Khí chất Điềm đạm (Vững vàng & Ôn hòa)' : '🌱 Phlegmatic (Steadfast & Serene)';
        temperamentColor = '#3B82F6';
        temperamentDesc = isVi
          ? 'Bạn sở hữu hệ thần kinh kiên định, bình hòa và có khả năng chống chịu áp lực rất cao: vững vàng, kiên nhẫn, đáng tin cậy và không dễ bị xáo trộn trước biến động. Bạn có năng lực giữ bình tĩnh tuyệt vời, quan sát khách quan và duy trì trạng thái cân bằng.'
          : 'You have a stable, tranquil, and highly resilient nervous system: steady, patient, reliable, and unruffled by chaos. You provide calming leadership, observe situations objectively, and excel in maintaining equilibrium.';
        recommendations = isVi
          ? [
              'Phát huy sự bình tĩnh và điềm đạm hiếm có như điểm tựa vững chãi cho đội nhóm và các mối quan hệ.',
              'Chủ động bày tỏ ý kiến, quan điểm và mong muốn cá nhân thay vì luôn nhường nhịn hoặc chiều theo số đông.',
              'Định kỳ đón nhận những thử thách mới lạ để giữ cho nguồn cảm hứng làm việc luôn tươi mới.'
            ]
          : [
              'Leverage your remarkable calm and composure as a stabilizing anchor for teams and relationships.',
              'Proactively express your personal desires and opinions rather than always accommodating others.',
              'Introduce small, novel challenges periodically to keep your natural motivation engaged.'
            ];
      }

      const scores: Record<string, DimensionResult> = {
        extraversion: {
          id: 'extraversion',
          name: isVi ? 'Thang Hướng ngoại (Thang E)' : 'Extraversion (E Scale)',
          score: extScore,
          maxScore: 24,
          levelLabel: extScore > 12 ? (isVi ? 'Hướng ngoại' : 'Extraverted') : (isVi ? 'Hướng nội' : 'Introverted'),
          levelColor: extScore > 12 ? '#10B981' : '#3B82F6',
          description: extScore > 12
            ? isVi
              ? 'Bạn có xu hướng hành vi năng động, cởi mở, thích khám phá điều mới mẻ và dễ dàng tương tác với thế giới bên ngoài.'
              : 'You tend towards an active, outgoing behavioral style, seeking excitement and engaging readily with your external environment.'
            : isVi
              ? 'Bạn có xu hướng hướng nội, điềm tĩnh, thích suy tư sâu sắc và lựa chọn các mối quan hệ xã hội chọn lọc, ý nghĩa.'
              : 'You tend towards an introspective, reserved style, prioritizing quiet reflection and selective social engagements.'
        },
        neuroticism: {
          id: 'neuroticism',
          name: isVi ? 'Thang Bất ổn cảm xúc (Thang N)' : 'Neuroticism (N Scale)',
          score: neuScore,
          maxScore: 24,
          levelLabel: neuScore > 12 ? (isVi ? 'Nhạy cảm cao' : 'High Reactivity') : (isVi ? 'Cảm xúc ổn định' : 'Emotional Stability'),
          levelColor: neuScore > 12 ? '#F59E0B' : '#10B981',
          description: neuScore > 12
            ? isVi
              ? 'Hệ thần kinh của bạn phản ứng nhạy bén trước áp lực và biến đổi cảm xúc, phản ánh sự nhạy cảm sâu sắc và phong phú.'
              : 'Your nervous system responds keenly to stress and emotional shifts, reflecting deep sensitivity and vivid responsiveness.'
            : isVi
              ? 'Hệ thần kinh của bạn duy trì sự vững vàng, điềm tĩnh và phục hồi nhanh trước những áp lực trong cuộc sống hàng ngày.'
              : 'Your nervous system maintains consistent stability and even composure under daily pressure.'
        },
        lie: {
          id: 'lie',
          name: isVi ? 'Thang Đo lường Tính Chuẩn mực Xã hội (Thang L)' : 'Lie Scale / Social Desirability (L Scale)',
          score: lieScore,
          maxScore: 9,
          levelLabel: lieScore >= 5 ? (isVi ? 'Khuynh hướng chuẩn mực xã hội cao' : 'High Social Bias') : (isVi ? 'Thẳng thắn, chân thực' : 'Candid & Authentic'),
          levelColor: lieScore >= 5 ? '#F59E0B' : '#10B981',
          description: lieScore >= 5
            ? isVi
              ? 'Kết quả cho thấy bạn có thể có xu hướng trả lời theo hướng tạo ấn tượng tốt hoặc theo khuôn mẫu xã hội mong đợi. Hãy lưu ý điều này khi đọc các kết quả phân tích.'
              : 'Your responses reflect a potential tendency to present an idealized version of yourself. Keep this in mind when reviewing your profile.'
            : isVi
              ? 'Câu trả lời của bạn thể hiện sự bộc trực, thẳng thắn và chân thực khi tự đánh giá bản thân.'
              : 'Your responses indicate frank, candid, and authentic self-evaluation.'
        }
      };

      return {
        title: temperamentTitle,
        summary: temperamentDesc,
        scores,
        actionGuide: {
          levelTitle: isVi ? 'Phát triển Khí chất & Bản thân' : 'Temperament Growth & Self-Development',
          levelBadge: temperamentBadge,
          levelColor: temperamentColor,
          recommendations
        }
      };
    }
  };
}

