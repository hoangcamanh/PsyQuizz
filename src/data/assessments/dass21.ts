import { AssessmentDefinition, DimensionResult } from './types';

export const DASS21_ASSESSMENT: AssessmentDefinition = {
  id: 'dass-21',
  code: 'DASS-21',
  name: 'Đánh Giá Chung Về SKTT',
  subtitle: 'Depression Anxiety Stress Scales (DASS-21)',
  description: 'Thang đo chuẩn hóa quốc tế gồm 21 câu hỏi giúp nhận diện và lượng hóa 3 trạng thái cảm xúc: Trầm cảm, Lo âu và Căng thẳng trong vòng 1 tuần qua.',
  duration: '3 - 5 phút',
  itemCount: 21,
  license: 'Public Domain (Lovibond & Lovibond, 1995)',
  disclaimer: 'DASS-21 là công cụ sàng lọc hỗ trợ tự phản chiếu, không có giá trị chẩn đoán y khoa độc lập. Nếu bạn gặp khủng hoảng cấp tính, hãy liên hệ ngay dịch vụ y tế.',
  options: [
    { value: 0, label: '0', description: 'Không áp dụng với tôi' },
    { value: 1, label: '1', description: 'Áp dụng một phần hoặc thỉnh thoảng' },
    { value: 2, label: '2', description: 'Áp dụng đáng kể hoặc phần lớn thời gian' },
    { value: 3, label: '3', description: 'Áp dụng rất nhiều hoặc hầu hết thời gian' }
  ],
  questions: [
    { id: 1, text: 'Tôi cảm thấy khó thả lỏng', dimension: 'stress' },
    { id: 2, text: 'Tôi cảm thấy miệng bị khô', dimension: 'anxiety' },
    { id: 3, text: 'Tôi dường như không thể cảm thấy tích cực gì cả', dimension: 'depression' },
    { id: 4, text: 'Tôi thấy khó thở', dimension: 'anxiety' },
    { id: 5, text: 'Tôi cảm thấy khó bắt đầu làm việc gì đó', dimension: 'depression' },
    { id: 6, text: 'Tôi thường phản ứng thái quá với các tình huống', dimension: 'stress' },
    { id: 7, text: 'Tôi bị run', dimension: 'anxiety' },
    { id: 8, text: 'Tôi cảm thấy mình đang sử dụng quá nhiều năng lượng thần kinh', dimension: 'stress' },
    { id: 9, text: 'Tôi lo lắng về các tình huống mà tôi có thể hoảng sợ và làm trò cười cho thiên hạ', dimension: 'anxiety' },
    { id: 10, text: 'Tôi cảm thấy không có gì để mong đợi', dimension: 'depression' },
    { id: 11, text: 'Tôi thấy mình trở nên kích động', dimension: 'stress' },
    { id: 12, text: 'Tôi cảm thấy khó thư giãn', dimension: 'stress' },
    { id: 13, text: 'Tôi cảm thấy buồn bã và chán nản', dimension: 'depression' },
    { id: 14, text: 'Tôi không thể chịu đựng được bất cứ điều gì cản trở tôi làm việc của mình', dimension: 'stress' },
    { id: 15, text: 'Tôi cảm thấy mình sắp hoảng loạn', dimension: 'anxiety' },
    { id: 16, text: 'Tôi không thể hào hứng với bất cứ điều gì', dimension: 'depression' },
    { id: 17, text: 'Tôi cảm thấy mình không có giá trị nhiều với tư cách là một con người', dimension: 'depression' },
    { id: 18, text: 'Tôi cảm thấy mình khá nhạy cảm', dimension: 'stress' },
    { id: 19, text: 'Tôi nhận biết được nhịp tim của mình mặc dù không vận động thể chất', dimension: 'anxiety' },
    { id: 20, text: 'Tôi cảm thấy sợ hãi mà không có lý do chính đáng', dimension: 'anxiety' },
    { id: 21, text: 'Tôi cảm thấy cuộc sống vô nghĩa', dimension: 'depression' }
  ],
  calculateResults: (answers: Record<number, number>) => {
    let rawDepression = 0;
    let rawAnxiety = 0;
    let rawStress = 0;

    const depQ = [3, 5, 10, 13, 16, 17, 21];
    const anxQ = [2, 4, 7, 9, 15, 19, 20];
    const strQ = [1, 6, 8, 11, 12, 14, 18];

    depQ.forEach(id => { rawDepression += (answers[id] || 0); });
    anxQ.forEach(id => { rawAnxiety += (answers[id] || 0); });
    strQ.forEach(id => { rawStress += (answers[id] || 0); });

    const finalDepression = rawDepression * 2;
    const finalAnxiety = rawAnxiety * 2;
    const finalStress = rawStress * 2;

    // Severity calculation
    const getDepLevel = (score: number) => {
      if (score <= 9) return { label: 'Bình thường', color: '#10B981', weight: 1, desc: 'Bạn đang có một trạng thái tinh thần ổn định và không có dấu hiệu đáng kể của sự trầm cảm. Bạn vẫn cảm nhận được niềm vui trong cuộc sống và có động lực theo đuổi mục tiêu của mình.' };
      if (score <= 13) return { label: 'Nhẹ', color: '#3B82F6', weight: 2, desc: 'Bạn có thể cảm thấy hơi buồn hoặc thiếu động lực trong một số thời điểm, nhưng những cảm giác này không kéo dài. Hãy dành thêm thời gian cho các hoạt động sáng tạo hoặc người thân.' };
      if (score <= 20) return { label: 'Vừa', color: '#F59E0B', weight: 3, desc: 'Bạn có thể đang trải qua một số cảm giác trống rỗng hoặc mất hứng thú với những hoạt động trước đây. Nên kết nối với người bạn tin tưởng hoặc tìm hỗ trợ tâm lý.' };
      if (score <= 27) return { label: 'Nặng', color: '#EF4444', weight: 4, desc: 'Bạn có thể cảm thấy khá tuyệt vọng, mất phương hướng và thiếu động lực. Cảm giác mệt mỏi và suy nghĩ tiêu cực xuất hiện thường xuyên. Hãy tìm sự hỗ trợ chuyên môn sớm.' };
      return { label: 'Rất nặng', color: '#DC2626', weight: 5, desc: 'Trầm cảm của bạn đang ở mức nghiêm trọng. Hãy tìm kiếm sự trợ giúp y tế hoặc chuyên môn ngay lập tức để được hỗ trợ can thiệp an toàn.' };
    };

    const getAnxLevel = (score: number) => {
      if (score <= 7) return { label: 'Bình thường', color: '#10B981', weight: 1, desc: 'Bạn có khả năng kiểm soát tốt những lo lắng thường ngày. Những tình huống căng thẳng không làm bạn mất cân bằng đáng kể.' };
      if (score <= 9) return { label: 'Nhẹ', color: '#3B82F6', weight: 2, desc: 'Bạn có thể trải qua những cơn lo lắng nhỏ, thỉnh thoảng cảm thấy căng thẳng khi đối diện tình huống mới nhưng vẫn kiểm soát được.' };
      if (score <= 14) return { label: 'Vừa', color: '#F59E0B', weight: 3, desc: 'Lo âu đã trở nên rõ ràng hơn, có thể khó thư giãn, tim đập nhanh hoặc khó ngủ. Hãy dành thời gian chăm sóc bản thân và thực hành thở sâu, thiền.' };
      if (score <= 19) return { label: 'Nặng', color: '#EF4444', weight: 4, desc: 'Lo âu ở mức đáng lo ngại, có thể cảm thấy hồi hộp quá mức, khó tập trung hoặc có các triệu chứng cơ thể như chóng mặt, đau đầu.' };
      return { label: 'Rất nặng', color: '#DC2626', weight: 5, desc: 'Mức độ lo âu nghiêm trọng khiến bạn bất an gần như mọi lúc. Cần tìm kiếm sự hỗ trợ chuyên môn ngay lập tức.' };
    };

    const getStrLevel = (score: number) => {
      if (score <= 14) return { label: 'Bình thường', color: '#10B981', weight: 1, desc: 'Bạn có khả năng đối phó với áp lực một cách hiệu quả và nhanh chóng lấy lại trạng thái bình tĩnh.' };
      if (score <= 18) return { label: 'Nhẹ', color: '#3B82F6', weight: 2, desc: 'Bạn có thể cảm thấy căng thẳng thường xuyên hơn đôi chút, nhưng nhìn chung vẫn có thể tự điều hòa tốt.' };
      if (score <= 25) return { label: 'Vừa', color: '#F59E0B', weight: 3, desc: 'Áp lực khá lớn, thường xuyên mệt mỏi, khó thư giãn và có thể bắt đầu xuất hiện tình trạng căng cơ, khó ngủ.' };
      if (score <= 33) return { label: 'Nặng', color: '#EF4444', weight: 4, desc: 'Bạn cảm thấy kiệt sức, dễ nổi nóng và áp lực liên tục ảnh hưởng đến công việc và các mối quan hệ.' };
      return { label: 'Rất nặng', color: '#DC2626', weight: 5, desc: 'Căng thẳng nghiêm trọng gây ảnh hưởng lớn đến thể chất và tinh thần. Bạn có thể cảm thấy mất kiểm soát và cần được giảm tải ngay lập tức.' };
    };

    const depInfo = getDepLevel(finalDepression);
    const anxInfo = getAnxLevel(finalAnxiety);
    const strInfo = getStrLevel(finalStress);

    const maxWeight = Math.max(depInfo.weight, anxInfo.weight, strInfo.weight);
    let overallBadge = '🌱 Bình thường';
    let overallColor = '#10B981';
    let recommendations = [
      'Duy trì thói quen ngủ đủ giấc, vận động và giữ kết nối xã hội tích cực.',
      'Dành 5 - 10 phút/ngày để hít thở sâu hoặc thư giãn cơ bắp.'
    ];
    let emergencyNote: string | undefined = undefined;

    if (maxWeight === 2) {
      overallBadge = '🌤️ Mức độ Nhẹ';
      overallColor = '#3B82F6';
      recommendations = [
        'Tăng cường chăm sóc bản thân chủ động trong 2 – 4 tuần tới.',
        'Ngủ đủ 7 – 9 tiếng, hạn chế caffeine sau 14h, giảm chất kích thích.',
        'Viết nhật ký ngắn: Điều gì làm mình lo? Điều gì nằm trong tầm kiểm soát?',
        'Nếu triệu chứng tăng dần, cân nhắc gặp chuyên gia tâm lý.'
      ];
    } else if (maxWeight === 3) {
      overallBadge = '⛅ Mức độ Vừa';
      overallColor = '#F59E0B';
      recommendations = [
        'Lập kế hoạch 2 hướng: Tự chăm sóc + Nhận hỗ trợ từ người đáng tin cậy.',
        'Thực hành các bài tập điều hòa cảm xúc (hít thở sâu 4-7-8, chánh niệm).',
        'Giảm tải công việc, chia nhỏ nhiệm vụ để tránh kiệt sức.',
        'Khuyến khích tham vấn với chuyên gia tâm lý nếu kéo dài trên 2 tuần.'
      ];
    } else if (maxWeight >= 4) {
      overallBadge = maxWeight === 5 ? '⛈️ Cần Hỗ Trợ Khẩn Cấp' : '🌧️ Mức độ Nặng';
      overallColor = '#EF4444';
      recommendations = [
        'Nên gặp chuyên gia tâm lý hoặc bác sĩ chuyên khoa tâm thần sớm để được đánh giá kỹ lưỡng.',
        'Ưu tiên an toàn, không nên ở một mình khi cảm xúc bất ổn tăng cao.',
        'Tránh đưa ra các quyết định lớn khi cảm xúc đang ở cao trào.',
        'Nhờ người thân hỗ trợ các sinh hoạt thực tế và đồng hành đi khám.'
      ];
      emergencyNote = 'Nếu bạn cảm thấy mất kiểm soát hoặc có ý nghĩ tiêu cực làm hại bản thân, hãy gọi ngay Đường dây nóng Hỗ trợ Tâm lý Ngày Mai: 096 306 1414 (13h00 - 20h30, Thứ 4 - CN) hoặc Cấp cứu 115.';
    }

    const scores: Record<string, DimensionResult> = {
      depression: {
        id: 'depression',
        name: 'Trầm cảm (Depression)',
        score: finalDepression,
        maxScore: 42,
        levelLabel: depInfo.label,
        levelColor: depInfo.color,
        description: depInfo.desc
      },
      anxiety: {
        id: 'anxiety',
        name: 'Lo âu (Anxiety)',
        score: finalAnxiety,
        maxScore: 42,
        levelLabel: anxInfo.label,
        levelColor: anxInfo.color,
        description: anxInfo.desc
      },
      stress: {
        id: 'stress',
        name: 'Căng thẳng (Stress)',
        score: finalStress,
        maxScore: 42,
        levelLabel: strInfo.label,
        levelColor: strInfo.color,
        description: strInfo.desc
      }
    };

    return {
      title: 'Kết Quả Đánh Giá DASS-21',
      summary: `Đánh giá tổng quan theo mức cao nhất: ${overallBadge}`,
      scores,
      actionGuide: {
        levelTitle: `Hướng dẫn chăm sóc (${overallBadge})`,
        levelBadge: overallBadge,
        levelColor: overallColor,
        recommendations,
        emergencyNote
      }
    };
  }
};
