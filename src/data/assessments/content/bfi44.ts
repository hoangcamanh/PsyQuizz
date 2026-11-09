import { AssessmentDefinition, DimensionResult } from '../types';
import { Locale } from '@/i18n/types';

export const BFI44_QUESTIONS: Array<{
  id: number;
  dimension: 'extraversion' | 'agreeableness' | 'conscientiousness' | 'neuroticism' | 'openness';
  isReverse?: boolean;
  textEn: string;
  textVi: string;
}> = [
  { id: 1, dimension: 'extraversion', textEn: 'I see myself as someone who is talkative', textVi: 'Tôi thấy mình là người hoạt ngôn, thích nói chuyện' },
  { id: 2, dimension: 'agreeableness', isReverse: true, textEn: 'I see myself as someone who tends to find fault with others', textVi: 'Tôi thấy mình là người hay bới móc, tìm lỗi ở người khác' },
  { id: 3, dimension: 'conscientiousness', textEn: 'I see myself as someone who does a thorough job', textVi: 'Tôi thấy mình là người làm việc cẩn thận, chu đáo' },
  { id: 4, dimension: 'neuroticism', textEn: 'I see myself as someone who is depressed, blue', textVi: 'Tôi thấy mình là người hay cảm thấy chán nản, buồn rầu' },
  { id: 5, dimension: 'openness', textEn: 'I see myself as someone who is original, comes up with new ideas', textVi: 'Tôi thấy mình là người độc đáo, luôn có những ý tưởng mới mẻ' },
  { id: 6, dimension: 'extraversion', isReverse: true, textEn: 'I see myself as someone who is reserved', textVi: 'Tôi thấy mình là người kín đáo, dè dặt' },
  { id: 7, dimension: 'agreeableness', textEn: 'I see myself as someone who is helpful and unselfish with others', textVi: 'Tôi thấy mình là người nhiệt tình giúp đỡ và vị tha với người khác' },
  { id: 8, dimension: 'conscientiousness', isReverse: true, textEn: 'I see myself as someone who can be somewhat careless', textVi: 'Tôi thấy mình là người đôi khi bất cẩn, lơ đãng' },
  { id: 9, dimension: 'neuroticism', isReverse: true, textEn: 'I see myself as someone who is relaxed, handles stress well', textVi: 'Tôi thấy mình là người điềm tĩnh, kiểm soát căng thẳng tốt' },
  { id: 10, dimension: 'openness', textEn: 'I see myself as someone who is curious about many different things', textVi: 'Tôi thấy mình là người tò mò, ham tìm hiểu nhiều điều khác nhau' },
  { id: 11, dimension: 'extraversion', textEn: 'I see myself as someone who is full of energy', textVi: 'Tôi thấy mình là người tràn đầy năng lượng và nhiệt huyết' },
  { id: 12, dimension: 'agreeableness', isReverse: true, textEn: 'I see myself as someone who starts quarrels with others', textVi: 'Tôi thấy mình là người hay gây tranh cãi, xích mích với người khác' },
  { id: 13, dimension: 'conscientiousness', textEn: 'I see myself as someone who is a reliable worker', textVi: 'Tôi thấy mình là một người làm việc đáng tin cậy' },
  { id: 14, dimension: 'neuroticism', textEn: 'I see myself as someone who can be tense', textVi: 'Tôi thấy mình là người dễ cảm thấy căng thẳng, bồn chồn' },
  { id: 15, dimension: 'openness', textEn: 'I see myself as someone who is ingenious, a deep thinker', textVi: 'Tôi thấy mình là người thông minh, có suy nghĩ sâu sắc' },
  { id: 16, dimension: 'extraversion', textEn: 'I see myself as someone who generates a lot of enthusiasm', textVi: 'Tôi thấy mình là người tạo ra nhiều sự nhiệt tình, phấn khởi cho người xung quanh' },
  { id: 17, dimension: 'agreeableness', textEn: 'I see myself as someone who has a forgiving nature', textVi: 'Tôi thấy mình là người có bản tính bao dung, độ lượng' },
  { id: 18, dimension: 'conscientiousness', isReverse: true, textEn: 'I see myself as someone who tends to be disorganized', textVi: 'Tôi thấy mình là người có xu hướng thiếu ngăn nắp, bừa bộn' },
  { id: 19, dimension: 'neuroticism', textEn: 'I see myself as someone who worries a lot', textVi: 'Tôi thấy mình là người hay lo lắng nhiều điều' },
  { id: 20, dimension: 'openness', textEn: 'I see myself as someone who has an active imagination', textVi: 'Tôi thấy mình là người có trí tưởng tượng phong phú' },
  { id: 21, dimension: 'extraversion', isReverse: true, textEn: 'I see myself as someone who tends to be quiet', textVi: 'Tôi thấy mình là người có xu hướng trầm lặng, ít nói' },
  { id: 22, dimension: 'agreeableness', textEn: 'I see myself as someone who is generally trusting', textVi: 'Tôi thấy mình là người nhìn chung dễ tin tưởng người khác' },
  { id: 23, dimension: 'conscientiousness', isReverse: true, textEn: 'I see myself as someone who tends to be lazy', textVi: 'Tôi thấy mình là người có xu hướng lười biếng' },
  { id: 24, dimension: 'neuroticism', isReverse: true, textEn: 'I see myself as someone who is emotionally stable, not easily upset', textVi: 'Tôi thấy mình là người ổn định về cảm xúc, không dễ bị buồn bực' },
  { id: 25, dimension: 'openness', textEn: 'I see myself as someone who is inventive', textVi: 'Tôi thấy mình là người có óc sáng tạo, phát minh' },
  { id: 26, dimension: 'extraversion', textEn: 'I see myself as someone who has an assertive personality', textVi: 'Tôi thấy mình là người có tính cách quyết đoán, dám khẳng định bản thân' },
  { id: 27, dimension: 'agreeableness', isReverse: true, textEn: 'I see myself as someone who can be cold and aloof', textVi: 'Tôi thấy mình là người có thể tỏ ra lạnh lùng và xa cách' },
  { id: 28, dimension: 'conscientiousness', textEn: 'I see myself as someone who perseveres until the task is finished', textVi: 'Tôi thấy mình là người kiên trì cho đến khi hoàn thành nhiệm vụ' },
  { id: 29, dimension: 'neuroticism', textEn: 'I see myself as someone who can be moody', textVi: 'Tôi thấy mình là người có tâm trạng thất thường, dễ thay đổi' },
  { id: 30, dimension: 'openness', textEn: 'I see myself as someone who values artistic, aesthetic experiences', textVi: 'Tôi thấy mình là người trân trọng các trải nghiệm nghệ thuật, thẩm mỹ' },
  { id: 31, dimension: 'extraversion', isReverse: true, textEn: 'I see myself as someone who is sometimes shy, inhibited', textVi: 'Tôi thấy mình là người đôi khi rụt rè, e ngại' },
  { id: 32, dimension: 'agreeableness', textEn: 'I see myself as someone who is considerate and kind to almost everyone', textVi: 'Tôi thấy mình là người chu đáo và tử tế với hầu hết mọi người' },
  { id: 33, dimension: 'conscientiousness', textEn: 'I see myself as someone who does things efficiently', textVi: 'Tôi thấy mình là người làm việc hiệu quả, bài bản' },
  { id: 34, dimension: 'neuroticism', isReverse: true, textEn: 'I see myself as someone who remains calm in tense situations', textVi: 'Tôi thấy mình là người giữ được bình tĩnh trong các tình huống căng thẳng' },
  { id: 35, dimension: 'openness', isReverse: true, textEn: 'I see myself as someone who prefers work that is routine', textVi: 'Tôi thấy mình là người thích những công việc theo khuôn mẫu, quen thuộc' },
  { id: 36, dimension: 'extraversion', textEn: 'I see myself as someone who is outgoing, sociable', textVi: 'Tôi thấy mình là người cởi mở, hòa đồng' },
  { id: 37, dimension: 'agreeableness', isReverse: true, textEn: 'I see myself as someone who is sometimes rude to others', textVi: 'Tôi thấy mình là người đôi khi có thể cộc lốc hoặc thô lỗ với người khác' },
  { id: 38, dimension: 'conscientiousness', textEn: 'I see myself as someone who makes plans and follows through with them', textVi: 'Tôi thấy mình là người lập kế hoạch và kiên quyết thực hiện đến cùng' },
  { id: 39, dimension: 'neuroticism', textEn: 'I see myself as someone who gets nervous easily', textVi: 'Tôi thấy mình là người dễ bị hồi hộp, lo âu' },
  { id: 40, dimension: 'openness', textEn: 'I see myself as someone who likes to reflect, play with ideas', textVi: 'Tôi thấy mình là người thích chiêm nghiệm, nghiền ngẫm các ý tưởng' },
  { id: 41, dimension: 'openness', isReverse: true, textEn: 'I see myself as someone who has few artistic interests', textVi: 'Tôi thấy mình là người ít quan tâm đến nghệ thuật' },
  { id: 42, dimension: 'agreeableness', textEn: 'I see myself as someone who likes to cooperate with others', textVi: 'Tôi thấy mình là người thích hợp tác với người khác' },
  { id: 43, dimension: 'conscientiousness', isReverse: true, textEn: 'I see myself as someone who is easily distracted', textVi: 'Tôi thấy mình là người dễ bị phân tâm, xao nhãng' },
  { id: 44, dimension: 'openness', textEn: 'I see myself as someone who is sophisticated in art, music, or literature', textVi: 'Tôi thấy mình là người am hiểu và có gu thẩm mỹ tinh tế về nghệ thuật, âm nhạc hoặc văn học' }
];

export const BFI44_OPTIONS: Record<Locale, Array<{ value: number; label: string; description: string }>> = {
  en: [
    { value: 1, label: '1', description: 'Disagree strongly' },
    { value: 2, label: '2', description: 'Disagree a little' },
    { value: 3, label: '3', description: 'Neither agree nor disagree' },
    { value: 4, label: '4', description: 'Agree a little' },
    { value: 5, label: '5', description: 'Agree strongly' }
  ],
  vi: [
    { value: 1, label: '1', description: 'Rất không đồng ý' },
    { value: 2, label: '2', description: 'Không đồng ý một phần' },
    { value: 3, label: '3', description: 'Không đồng ý cũng không phản đối' },
    { value: 4, label: '4', description: 'Đồng ý một phần' },
    { value: 5, label: '5', description: 'Rất đồng ý' }
  ]
};

export function createBfi44Definition(locale: Locale): AssessmentDefinition {
  const isVi = locale === 'vi';

  return {
    id: 'bfi-44',
    code: 'BFI-44',
    name: isVi ? 'Bảng kiểm 5 Yếu tố Nhân cách (BFI-44)' : 'Big Five Inventory (BFI-44)',
    subtitle: isVi
      ? 'Thang đo 5 Chiều kích Nhân cách Lớn (44 câu)'
      : 'The Big Five Inventory (44 items)',
    description: isVi
      ? 'Bộ công cụ tâm lý học chuẩn hóa đánh giá nhân cách theo mô hình Năm Yếu tố Lớn qua 5 chiều kích cốt lõi: Hướng ngoại, Dễ chịu (Hòa thuận), Tận tâm, Bất ổn cảm xúc và Cởi mở với trải nghiệm (John, Donahue, & Kentle, 1991).'
      : 'A globally validated 44-item psychometric instrument evaluating personality across five core dimensions: Extraversion, Agreeableness, Conscientiousness, Neuroticism, and Openness.',
    duration: isVi ? '5 - 7 phút' : '5 - 7 mins',
    itemCount: 44,
    license: 'Public Domain (John, Donahue, & Kentle, 1991)',
    disclaimer: isVi
      ? 'Bài trắc nghiệm mô tả các xu hướng và nét nhân cách tổng quát. Đây là công cụ giáo dục phục vụ tự nhận thức bản thân, không phải chẩn đoán y khoa.'
      : 'This inventory describes general personality tendencies and traits. It is an educational tool for self-reflection and not a clinical diagnosis.',
    notebookLmUrl: 'https://notebook.google.com/notebook/3c90b86a-da2a-4861-b906-af66b42f05dd',
    notebookLmPrompts: isVi
      ? [
          'Dựa trên hồ sơ Big Five này, những môi trường làm việc và lộ trình nghề nghiệp nào giúp tôi phát huy tối đa thế mạnh?',
          'Những thế mạnh cốt lõi và điểm mù tiềm ẩn của người có mức độ Dễ chịu (Agreeableness) cao là gì?',
          'Làm thế nào để chuyển hóa sự nhạy cảm cảm xúc (Neuroticism) thành sự thấu cảm sâu sắc và sức sáng tạo?',
          'Người có xu hướng hướng nội có thể tận dụng những thế mạnh tĩnh lặng nào trong vai trò lãnh đạo và làm việc nhóm?'
        ]
      : [
          'Based on this Big Five profile, which work environments and career paths allow me to excel?',
          'What are the core strengths and potential blind spots of high Agreeableness?',
          'How can I channel emotional sensitivity (Neuroticism) into empathy and creative focus?',
          'How can an introverted personality leverage quiet strengths in leadership and team collaboration?'
        ],
    options: BFI44_OPTIONS[locale],
    questions: BFI44_QUESTIONS.map((q) => ({
      id: q.id,
      text: isVi ? q.textVi : q.textEn,
      dimension: q.dimension,
      isReverse: q.isReverse
    })),
    calculateResults: (answers: Record<number, number>) => {
      const getVal = (id: number, isReverse?: boolean) => {
        const val = answers[id] || 3;
        return isReverse ? 6 - val : val;
      };

      // Extraversion: Q1, 6(R), 11, 16, 21(R), 26, 31(R), 36
      const extItems = [1, 11, 16, 26, 36];
      const extRev = [6, 21, 31];
      let extScore = 0;
      extItems.forEach((i) => (extScore += getVal(i, false)));
      extRev.forEach((i) => (extScore += getVal(i, true)));

      // Agreeableness: Q2(R), 7, 12(R), 17, 22, 27(R), 32, 37(R), 42
      const agrItems = [7, 17, 22, 32, 42];
      const agrRev = [2, 12, 27, 37];
      let agrScore = 0;
      agrItems.forEach((i) => (agrScore += getVal(i, false)));
      agrRev.forEach((i) => (agrScore += getVal(i, true)));

      // Conscientiousness: Q3, 8(R), 13, 18(R), 23(R), 28, 33, 38, 43(R)
      const conItems = [3, 13, 28, 33, 38];
      const conRev = [8, 18, 23, 43];
      let conScore = 0;
      conItems.forEach((i) => (conScore += getVal(i, false)));
      conRev.forEach((i) => (conScore += getVal(i, true)));

      // Neuroticism: Q4, 9(R), 14, 19, 24(R), 29, 34(R), 39
      const neuItems = [4, 14, 19, 29, 39];
      const neuRev = [9, 24, 34];
      let neuScore = 0;
      neuItems.forEach((i) => (neuScore += getVal(i, false)));
      neuRev.forEach((i) => (neuScore += getVal(i, true)));

      // Openness: Q5, 10, 15, 20, 25, 30, 35(R), 40, 41(R), 44
      const opeItems = [5, 10, 15, 20, 25, 30, 40, 44];
      const opeRev = [35, 41];
      let opeScore = 0;
      opeItems.forEach((i) => (opeScore += getVal(i, false)));
      opeRev.forEach((i) => (opeScore += getVal(i, true)));

      const getLevelText = (avg: number) => {
        if (avg >= 3.8) return { label: isVi ? 'Cao' : 'High', color: '#10B981' };
        if (avg >= 2.6) return { label: isVi ? 'Trung bình' : 'Moderate', color: '#3B82F6' };
        return { label: isVi ? 'Thấp' : 'Low', color: '#F59E0B' };
      };

      const extAvg = +(extScore / 8).toFixed(1);
      const agrAvg = +(agrScore / 9).toFixed(1);
      const conAvg = +(conScore / 9).toFixed(1);
      const neuAvg = +(neuScore / 8).toFixed(1);
      const opeAvg = +(opeScore / 10).toFixed(1);

      const scores: Record<string, DimensionResult> = {
        extraversion: {
          id: 'extraversion',
          name: isVi ? 'Tính Hướng ngoại (Extraversion)' : 'Extraversion',
          score: extScore,
          maxScore: 40,
          averageScore: extAvg,
          levelLabel: getLevelText(extAvg).label,
          levelColor: getLevelText(extAvg).color,
          description: extAvg >= 3.5
            ? isVi
              ? 'Bạn là người cởi mở, hoạt ngôn, năng động trong môi trường tập thể và cảm thấy thoải mái khi dẫn dắt hoặc kết nối mọi người.'
              : 'You are outgoing, talkative, assertive, energetic in social environments, and comfortable taking the lead.'
            : isVi
              ? 'Bạn là người điềm tĩnh, sâu sắc, thoải mái khi làm việc độc lập và thường nạp lại năng lượng qua những khoảng thời gian yên tĩnh.'
              : 'You are calm, reflective, comfortable with independence, and recharge your energy through quiet time.'
        },
        agreeableness: {
          id: 'agreeableness',
          name: isVi ? 'Tính Dễ chịu / Hòa thuận (Agreeableness)' : 'Agreeableness',
          score: agrScore,
          maxScore: 45,
          averageScore: agrAvg,
          levelLabel: getLevelText(agrAvg).label,
          levelColor: getLevelText(agrAvg).color,
          description: agrAvg >= 3.5
            ? isVi
              ? 'Bạn là người giàu lòng thấu cảm, đáng tin cậy, hào phóng và đặt giá trị cao vào sự hài hòa trong các mối quan hệ xã hội.'
              : 'You are empathetic, trustworthy, generous, and place high importance on harmony in interpersonal relationships.'
            : isVi
              ? 'Bạn là người độc lập trong suy nghĩ, giao tiếp thẳng thắn, không ngại cạnh tranh lành mạnh và có tư duy phản biện sắc bén.'
              : 'You are independent-minded, direct in communication, comfortable with competition, and naturally challenge assumptions.'
        },
        conscientiousness: {
          id: 'conscientiousness',
          name: isVi ? 'Tính Tận tâm (Conscientiousness)' : 'Conscientiousness',
          score: conScore,
          maxScore: 45,
          averageScore: conAvg,
          levelLabel: getLevelText(conAvg).label,
          levelColor: getLevelText(conAvg).color,
          description: conAvg >= 3.5
            ? isVi
              ? 'Bạn là người kỷ luật, ngăn nắp, có trách nhiệm cao và kiên định theo đuổi mục tiêu một cách có hệ thống.'
              : 'You are disciplined, organized, dependable, and systematically persevere until goals are accomplished.'
            : isVi
              ? 'Bạn là người linh hoạt, dễ thích ứng trước những thay đổi bất ngờ, làm việc thoải mái trong môi trường mở và sẵn sàng chuyển hướng khi cần.'
              : 'You are flexible, adaptable to spontaneous changes, comfortable with informal workflows, and open to pivoting.'
        },
        neuroticism: {
          id: 'neuroticism',
          name: isVi ? 'Tính Nhạy cảm cảm xúc (Neuroticism)' : 'Neuroticism (Emotional Sensitivity)',
          score: neuScore,
          maxScore: 40,
          averageScore: neuAvg,
          levelLabel: getLevelText(neuAvg).label,
          levelColor: getLevelText(neuAvg).color,
          description: neuAvg >= 3.5
            ? isVi
              ? 'Bạn trải nghiệm cảm xúc phong phú và sống động, với độ nhạy cảm cao trước các thay đổi áp lực hoặc biến động xung quanh.'
              : 'You experience emotions vividly, with heightened sensitivity to stressful shifts and changing circumstances.'
            : isVi
              ? 'Bạn có tâm lý vững vàng, kiên cường trước áp lực và duy trì được góc nhìn điềm tĩnh, sáng suốt qua các thử thách.'
              : 'You are emotionally steady, resilient under pressure, and maintain a composed, calm perspective through challenges.'
        },
        openness: {
          id: 'openness',
          name: isVi ? 'Tính Cởi mở với trải nghiệm (Openness)' : 'Openness to Experience',
          score: opeScore,
          maxScore: 50,
          averageScore: opeAvg,
          levelLabel: getLevelText(opeAvg).label,
          levelColor: getLevelText(opeAvg).color,
          description: opeAvg >= 3.5
            ? isVi
              ? 'Bạn có trí tưởng tượng phong phú, ham học hỏi tri thức, trân trọng nghệ thuật và thẩm mỹ, đồng thời luôn cởi mở trước những góc nhìn mới.'
              : 'You are imaginative, intellectually curious, appreciate diverse art and aesthetics, and embrace novel perspectives.'
            : isVi
              ? 'Bạn là người thực tế, dựa trên dữ kiện cụ thể, trân trọng các phương pháp đã được kiểm chứng và làm việc hiệu quả với cấu trúc rõ ràng.'
              : 'You are practical, grounded, prefer tested methods, value concrete facts, and appreciate structured routines.'
        }
      };

      return {
        title: isVi ? 'Hồ sơ Đặc điểm Nhân cách Big Five (BFI-44)' : 'Big Five Personality Profile (BFI-44)',
        summary: isVi
          ? 'Phân bổ trên 5 chiều kích nền tảng cấu thành nên nhân cách con người theo mô hình Five-Factor Model.'
          : 'Distribution across the five foundational dimensions of human personality based on the Five-Factor Model.',
        scores,
        actionGuide: {
          levelTitle: isVi ? 'Nghiên cứu chuyên sâu cùng NotebookLM' : 'In-Depth Research with NotebookLM',
          levelBadge: '',
          levelColor: '#8B5CF6',
          recommendations: isVi
            ? [
                'Nhấp "Google NotebookLM" bên dưới để tìm hiểu sâu hơn về các chiều kích Big Five qua y văn học thuật chuẩn hóa.',
                'Đặt câu hỏi cho trợ lý nghiên cứu AI về môi trường làm việc phù hợp, cách tương tác đội nhóm và lộ trình phát triển bản thân.'
              ]
            : [
                'Click "Google NotebookLM" below to delve deeper into your Big Five dimensions using curated academic literature.',
                'Ask the AI research assistant tailored questions on optimal career environments, interpersonal synergy, and personal growth.'
              ]
        }
      };
    }
  };
}

