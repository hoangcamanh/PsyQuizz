import { AssessmentDefinition, DimensionResult } from './types';

export const BFI44_ASSESSMENT: AssessmentDefinition = {
  id: 'bfi-44',
  code: 'BFI-44',
  name: 'Mô Hình Nhân Cách BIG FIVE (BFI-44)',
  subtitle: 'The Big Five Inventory (44 items)',
  description: 'Thang đo chuẩn hóa quốc tế gồm 44 câu hỏi nhằm đánh giá 5 chiều kích nhân cách cốt lõi: Hướng ngoại, Dễ chịu, Tận tâm, Nhiễu tâm và Cởi mở.',
  duration: '5 - 7 phút',
  itemCount: 44,
  license: 'Public Domain (John, Donahue, & Kentle, 1991)',
  disclaimer: 'Bài trắc nghiệm này đo lường các đặc điểm tính cách tương đối ổn định của bạn, có thể phát triển và điều chỉnh theo thời gian. Đây không phải là bài kiểm tra bệnh lý tâm thần.',
  notebookLmUrl: 'https://notebook.google.com/notebook/3c90b86a-da2a-4861-b906-af66b42f05dd',
  notebookLmPrompts: [
    'Với hồ sơ tính cách Big Five này, tôi phù hợp với những môi trường làm việc và nghề nghiệp nào?',
    'Điểm mạnh và điểm mù (điểm yếu) của người có tính Dễ chịu (Agreeableness) cao là gì?',
    'Làm sao để tôi quản lý cảm xúc tốt hơn khi có chỉ số Nhiễu tâm (Neuroticism) ở mức cao?',
    'Làm thế nào để người Hướng nội (Extraversion thấp) phát huy tối đa thế mạnh lãnh đạo?'
  ],
  options: [
    { value: 1, label: '1', description: 'Rất không đồng ý' },
    { value: 2, label: '2', description: 'Không đồng ý một chút' },
    { value: 3, label: '3', description: 'Trung lập' },
    { value: 4, label: '4', description: 'Đồng ý một chút' },
    { value: 5, label: '5', description: 'Rất đồng ý' }
  ],
  questions: [
    { id: 1, text: 'Tôi là người hay nói', dimension: 'extraversion' },
    { id: 2, text: 'Tôi là người hay bắt bẻ người khác', dimension: 'agreeableness', isReverse: true },
    { id: 3, text: 'Tôi là người làm việc cẩn thận, chu đáo', dimension: 'conscientiousness' },
    { id: 4, text: 'Tôi là người hay chán nản, buồn bã', dimension: 'neuroticism' },
    { id: 5, text: 'Tôi là người sáng tạo, có ý tưởng mới', dimension: 'openness' },
    { id: 6, text: 'Tôi là người kín đáo', dimension: 'extraversion', isReverse: true },
    { id: 7, text: 'Tôi là người sẵn lòng giúp đỡ và vị tha', dimension: 'agreeableness' },
    { id: 8, text: 'Tôi là người có phần bất cẩn', dimension: 'conscientiousness', isReverse: true },
    { id: 9, text: 'Tôi là người thư thái, chịu được áp lực tốt', dimension: 'neuroticism', isReverse: true },
    { id: 10, text: 'Tôi là người tò mò về nhiều điều mới lạ', dimension: 'openness' },
    { id: 11, text: 'Tôi là người tràn đầy năng lượng', dimension: 'extraversion' },
    { id: 12, text: 'Tôi là người hay gây gổ với người khác', dimension: 'agreeableness', isReverse: true },
    { id: 13, text: 'Tôi là người làm việc đáng tin cậy', dimension: 'conscientiousness' },
    { id: 14, text: 'Tôi là người hay căng thẳng', dimension: 'neuroticism' },
    { id: 15, text: 'Tôi là người thông minh, hay suy nghĩ sâu xa', dimension: 'openness' },
    { id: 16, text: 'Tôi là người tạo ra nhiều sự nhiệt tình', dimension: 'extraversion' },
    { id: 17, text: 'Tôi là người có bản tính khoan dung', dimension: 'agreeableness' },
    { id: 18, text: 'Tôi là người có xu hướng vô tổ chức', dimension: 'conscientiousness', isReverse: true },
    { id: 19, text: 'Tôi là người hay lo lắng', dimension: 'neuroticism' },
    { id: 20, text: 'Tôi là người có trí tưởng tượng phong phú', dimension: 'openness' },
    { id: 21, text: 'Tôi là người thường im lặng', dimension: 'extraversion', isReverse: true },
    { id: 22, text: 'Tôi là người thường tin tưởng người khác', dimension: 'agreeableness' },
    { id: 23, text: 'Tôi là người có xu hướng lười biếng', dimension: 'conscientiousness', isReverse: true },
    { id: 24, text: 'Tôi là người cảm xúc ổn định, không dễ bị kích động', dimension: 'neuroticism', isReverse: true },
    { id: 25, text: 'Tôi là người có tính phát minh', dimension: 'openness' },
    { id: 26, text: 'Tôi là người có cá tính quyết đoán', dimension: 'extraversion' },
    { id: 27, text: 'Tôi là người có thể lạnh lùng và xa cách', dimension: 'agreeableness', isReverse: true },
    { id: 28, text: 'Tôi là người kiên trì cho đến khi hoàn thành công việc', dimension: 'conscientiousness' },
    { id: 29, text: 'Tôi là người hay thay đổi tâm trạng', dimension: 'neuroticism' },
    { id: 30, text: 'Tôi là người đánh giá cao nghệ thuật, trải nghiệm thẩm mỹ', dimension: 'openness' },
    { id: 31, text: 'Tôi là người đôi khi nhút nhát, e dè', dimension: 'extraversion', isReverse: true },
    { id: 32, text: 'Tôi là người chu đáo và tử tế với hầu hết mọi người', dimension: 'agreeableness' },
    { id: 33, text: 'Tôi là người làm mọi việc một cách hiệu quả', dimension: 'conscientiousness' },
    { id: 34, text: 'Tôi là người giữ bình tĩnh trong tình huống căng thẳng', dimension: 'neuroticism', isReverse: true },
    { id: 35, text: 'Tôi là người thích công việc mang tính lặp lại', dimension: 'openness', isReverse: true },
    { id: 36, text: 'Tôi là người hướng ngoại, hòa đồng', dimension: 'extraversion' },
    { id: 37, text: 'Tôi là người đôi khi thô lỗ với người khác', dimension: 'agreeableness', isReverse: true },
    { id: 38, text: 'Tôi là người biết lập kế hoạch và thực hiện đến cùng', dimension: 'conscientiousness' },
    { id: 39, text: 'Tôi là người dễ bị lo âu', dimension: 'neuroticism' },
    { id: 40, text: 'Tôi là người thích suy ngẫm, chơi đùa với các ý tưởng', dimension: 'openness' },
    { id: 41, text: 'Tôi là người ít quan tâm đến nghệ thuật', dimension: 'openness', isReverse: true },
    { id: 42, text: 'Tôi là người thích hợp tác với người khác', dimension: 'agreeableness' },
    { id: 43, text: 'Tôi là người dễ bị phân tâm', dimension: 'conscientiousness', isReverse: true },
    { id: 44, text: 'Tôi là người sành sỏi về nghệ thuật, âm nhạc hoặc văn học', dimension: 'openness' }
  ],
  calculateResults: (answers: Record<number, number>) => {
    const getVal = (id: number, isReverse?: boolean) => {
      const val = answers[id] || 3;
      return isReverse ? (6 - val) : val;
    };

    // Extraversion: Q1, 6(R), 11, 16, 21(R), 26, 31(R), 36
    const extItems = [1, 11, 16, 26, 36];
    const extRev = [6, 21, 31];
    let extScore = 0;
    extItems.forEach(i => extScore += getVal(i, false));
    extRev.forEach(i => extScore += getVal(i, true));

    // Agreeableness: Q2(R), 7, 12(R), 17, 22, 27(R), 32, 37(R), 42
    const agrItems = [7, 17, 22, 32, 42];
    const agrRev = [2, 12, 27, 37];
    let agrScore = 0;
    agrItems.forEach(i => agrScore += getVal(i, false));
    agrRev.forEach(i => agrScore += getVal(i, true));

    // Conscientiousness: Q3, 8(R), 13, 18(R), 23(R), 28, 33, 38, 43(R)
    const conItems = [3, 13, 28, 33, 38];
    const conRev = [8, 18, 23, 43];
    let conScore = 0;
    conItems.forEach(i => conScore += getVal(i, false));
    conRev.forEach(i => conScore += getVal(i, true));

    // Neuroticism: Q4, 9(R), 14, 19, 24(R), 29, 34(R), 39
    const neuItems = [4, 14, 19, 29, 39];
    const neuRev = [9, 24, 34];
    let neuScore = 0;
    neuItems.forEach(i => neuScore += getVal(i, false));
    neuRev.forEach(i => neuScore += getVal(i, true));

    // Openness: Q5, 10, 15, 20, 25, 30, 35(R), 40, 41(R), 44
    const opeItems = [5, 10, 15, 20, 25, 30, 40, 44];
    const opeRev = [35, 41];
    let opeScore = 0;
    opeItems.forEach(i => opeScore += getVal(i, false));
    opeRev.forEach(i => opeScore += getVal(i, true));

    const getLevelText = (avg: number) => {
      if (avg >= 3.8) return { label: 'Mức Cao', color: '#10B981' };
      if (avg >= 2.6) return { label: 'Mức Trung bình', color: '#3B82F6' };
      return { label: 'Mức Thấp', color: '#F59E0B' };
    };

    const extAvg = +(extScore / 8).toFixed(1);
    const agrAvg = +(agrScore / 9).toFixed(1);
    const conAvg = +(conScore / 9).toFixed(1);
    const neuAvg = +(neuScore / 8).toFixed(1);
    const opeAvg = +(opeScore / 10).toFixed(1);

    const scores: Record<string, DimensionResult> = {
      extraversion: {
        id: 'extraversion',
        name: 'Hướng ngoại (Extraversion)',
        score: extScore,
        maxScore: 40,
        averageScore: extAvg,
        levelLabel: getLevelText(extAvg).label,
        levelColor: getLevelText(extAvg).color,
        description: extAvg >= 3.5 ? 'Bạn là người hoạt bát, thích giao tiếp, tràn đầy năng lượng khi ở trong đám đông và có xu hướng quyết đoán.' : 'Bạn là người điềm tĩnh, thích không gian yên tĩnh để tái tạo năng lượng, độc lập và suy nghĩ thấu đáo.'
      },
      agreeableness: {
        id: 'agreeableness',
        name: 'Dễ chịu / Vị tha (Agreeableness)',
        score: agrScore,
        maxScore: 45,
        averageScore: agrAvg,
        levelLabel: getLevelText(agrAvg).label,
        levelColor: getLevelText(agrAvg).color,
        description: agrAvg >= 3.5 ? 'Bạn có tính cách hòa nhã, đáng tin cậy, sẵn lòng giúp đỡ người khác và coi trọng sự hòa thuận trong các mối quan hệ.' : 'Bạn thẳng thắn, độc lập trong quan điểm, thích sự cạnh tranh và sẵn sàng đặt câu hỏi nghi vấn.'
      },
      conscientiousness: {
        id: 'conscientiousness',
        name: 'Tận tâm / Chu đáo (Conscientiousness)',
        score: conScore,
        maxScore: 45,
        averageScore: conAvg,
        levelLabel: getLevelText(conAvg).label,
        levelColor: getLevelText(conAvg).color,
        description: conAvg >= 3.5 ? 'Bạn có tính kỷ luật cao, làm việc có kế hoạch, đáng tin cậy và kiên trì theo đuổi mục tiêu đến cùng.' : 'Bạn linh hoạt, thích ứng tốt với sự thay đổi bất ngờ, hành động tự phát và không thích bị ràng buộc bởi quy tắc cứng nhắc.'
      },
      neuroticism: {
        id: 'neuroticism',
        name: 'Nhiễu tâm / Nhạy cảm cảm xúc (Neuroticism)',
        score: neuScore,
        maxScore: 40,
        averageScore: neuAvg,
        levelLabel: getLevelText(neuAvg).label,
        levelColor: getLevelText(neuAvg).color,
        description: neuAvg >= 3.5 ? 'Bạn có hệ thần kinh nhạy cảm, dễ cảm nhận sâu sắc các biến động cảm xúc, thỉnh thoảng dễ lo âu trước áp lực.' : 'Bạn có cảm xúc ổn định, điềm tĩnh trước khó khăn, ít khi bị dao động và chịu áp lực tâm lý tốt.'
      },
      openness: {
        id: 'openness',
        name: 'Cởi mở với trải nghiệm (Openness)',
        score: opeScore,
        maxScore: 50,
        averageScore: opeAvg,
        levelLabel: getLevelText(opeAvg).label,
        levelColor: getLevelText(opeAvg).color,
        description: opeAvg >= 3.5 ? 'Bạn giàu trí tưởng tượng, tò mò về thế giới, yêu thích cái đẹp nghệ thuật và cởi mở với những tư tưởng mới lạ.' : 'Bạn thực tế, thích những giải pháp cụ thể đã được kiểm chứng, coi trọng truyền thống và sự ổn định.'
      }
    };

    return {
      title: 'Hồ Sơ Nhân Cách Big Five (BFI-44)',
      summary: 'Biểu đồ phân bố 5 đặc tính tính cách cốt lõi của bạn theo thang đo Big Five.',
      scores,
      actionGuide: {
        levelTitle: 'Tra cứu chuyên sâu với Sổ tay NotebookLM',
        levelBadge: '🧠 Tri Thức Big Five',
        levelColor: '#8B5CF6',
        recommendations: [
          'Bạn có thể bấm vào nút "Mở Sổ tay NotebookLM" bên dưới để tìm hiểu chi tiết về từng thành phần trong bài test.',
          'Sổ tay tập hợp các tài liệu nghiên cứu khoa học được tuyển chọn, cho phép bạn hỏi bất kỳ câu hỏi nào về định hướng nghề nghiệp, cách giao tiếp và phát triển bản thân.'
        ]
      }
    };
  }
};
