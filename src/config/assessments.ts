import { Locale } from '@/i18n/types';

export interface AssessmentData {
  id: 'dass-21' | 'bfi-44' | 'eysenck' | 'adhd';
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  destinationUrl?: string;
  isExternal: boolean;
  destinationType: 'tally' | 'internal' | 'external';
  modalContent: {
    title: string;
    about: string;
    purpose: string[];
    instructions: string[];
    notice: string;
  };
}

export function getLocalizedAssessments(locale: Locale = 'en'): AssessmentData[] {
  const isVi = locale === 'vi';

  return [
    {
      id: 'dass-21',
      title: isVi ? 'Thang đo DASS-21' : 'DASS-21',
      subtitle: isVi ? 'Trầm cảm, Lo âu & Căng thẳng' : 'Depression, Anxiety & Stress',
      description: isVi
        ? 'Lượng giá các trạng thái trầm cảm, lo âu và căng thẳng bạn đã trải qua trong vòng một tuần qua.'
        : 'Explore symptoms of depression, anxiety, and stress experienced over the past week.',
      ctaText: isVi ? 'Làm bài kiểm tra' : 'Take the Test',
      destinationUrl: '/assessment/dass-21',
      isExternal: false,
      destinationType: 'internal',
      modalContent: {
        title: isVi ? 'Trước khi bắt đầu: DASS-21' : 'Before You Begin: DASS-21',
        about: isVi
          ? 'Thang đo DASS-21 là một trong những công cụ tâm lý học chuẩn hóa phổ biến nhất thế giới để sàng lọc nhanh sức khỏe cảm xúc trên 3 chiều kích: Trầm cảm, Lo âu và Căng thẳng (Lovibond & Lovibond, 1995).'
          : 'The DASS-21 scale is one of the most widely used psychometric instruments in the world for rapid screening of emotional well-being, specifically symptoms related to depression, anxiety, and stress.',
        purpose: isVi
          ? [
              'Tự nhận thức khách quan về trạng thái cảm xúc của bạn trong vòng một tuần trở lại đây.',
              'Phân biệt rõ ràng giữa căng thẳng thể chất (stress), kích thích sinh lý (lo âu) và tâm trạng chán nản (trầm cảm).',
              'Xác định các chỉ báo cụ thể để tự chiêm nghiệm hoặc trao đổi với chuyên gia tâm lý chuyên nghiệp.'
            ]
          : [
              'Gain objective self-awareness regarding your emotional state over the past week.',
              'Distinguish between physical tension (stress), physiological arousal (anxiety), and low mood (depression).',
              'Identify specific indicators to reflect on or discuss with a compassionate mental health professional.'
            ],
        instructions: isVi
          ? [
              'Đọc kỹ từng nhận định và chọn câu trả lời mô tả chính xác nhất trải nghiệm của bạn trong tuần vừa qua.',
              'Trả lời tự nhiên và nhanh chóng theo cảm nhận ban đầu, không nên suy nghĩ quá lâu ở một câu.',
              'Không có câu trả lời đúng hay sai; hãy chọn câu phản ánh trung thực nhất cảm giác của bạn.'
            ]
          : [
              'Read each statement carefully and select the response that best describes your experience over the past week.',
              'Respond naturally and spontaneously without overthinking any single question.',
              'There are no right or wrong answers; choose the response that feels most honest to you.'
            ],
        notice: isVi
          ? 'Lưu ý quan trọng: DASS-21 là công cụ sàng lọc tâm lý, không phải là công cụ chẩn đoán bệnh học. Để có chẩn đoán lâm sàng chính xác cần có sự thăm khám và phỏng vấn trực tiếp từ bác sĩ chuyên khoa hoặc chuyên gia tâm lý. Điểm số cao không đồng nghĩa với việc bạn bị rối loạn trầm cảm hay lo âu bệnh lý.'
          : 'Crucial note: DASS-21 is strictly a screening instrument, not a diagnostic test. An accurate clinical diagnosis requires in-depth evaluation and clinical interviews with a mental health professional. A high score does not mean you have a diagnosed depression or anxiety disorder.'
      }
    },
    {
      id: 'bfi-44',
      title: isVi ? 'Bảng kiểm 5 Yếu tố Nhân cách (BFI-44)' : 'Big Five Inventory (BFI-44)',
      subtitle: isVi ? '5 Chiều kích Nhân cách Lớn' : 'Personality Dimensions',
      description: isVi
        ? 'Khám phá hồ sơ đặc điểm nhân cách của bạn qua 5 chiều kích tâm lý học nền tảng.'
        : 'Discover your personality traits across five fundamental psychological dimensions.',
      ctaText: isVi ? 'Làm bài kiểm tra' : 'Take the Test',
      destinationUrl: '/assessment/bfi-44',
      isExternal: false,
      destinationType: 'internal',
      modalContent: {
        title: isVi ? 'Trước khi bắt đầu: Big Five (BFI-44)' : 'Before You Begin: Big Five (BFI-44)',
        about: isVi
          ? 'BFI-44 là bộ công cụ đo lường nhân cách theo mô hình Năm Yếu tố Lớn (Big Five / Five-Factor Model) được thừa nhận rộng rãi nhất trong tâm lý học thực nghiệm hiện đại (John, Donahue, & Kentle, 1991).'
          : 'The BFI-44 is an internationally recognized instrument measuring personality across the Big Five model—one of the most scientifically robust and widely accepted classification frameworks in modern psychology.',
        purpose: isVi
          ? [
              'Vẽ nên bức tranh nhân cách toàn diện qua 5 chiều kích: Hướng ngoại, Dễ chịu (Hòa thuận), Tận tâm, Bất ổn cảm xúc và Cởi mở với trải nghiệm.',
              'Hiểu rõ các xu hướng hành vi đặc trưng, phong cách tương tác xã hội và thói quen làm việc của bạn.',
              'Ứng dụng tâm lý học nhân cách thực chứng để định hướng phát triển bản thân theo thế mạnh riêng.'
            ]
          : [
              'Map your personality profile across 5 foundational dimensions: Extraversion, Agreeableness, Conscientiousness, Neuroticism, and Openness.',
              'Understand your characteristic behavioral tendencies, social interaction styles, and work habits.',
              'Use evidence-based personality psychology to guide personal growth according to your unique aspirations.'
            ],
        instructions: isVi
          ? [
              'Hãy trả lời dựa trên cách bạn thực sự nhìn nhận bản thân trong cuộc sống hàng ngày, thay vì hình mẫu bạn mong muốn trở thành.',
              'Đánh giá từng nhận định một cách trung thực theo thang điểm từ 1 (Rất không đồng ý) đến 5 (Rất đồng ý).',
              'Mỗi nét tính cách đều mang lại những thế mạnh tự nhiên và những điểm mù tiềm ẩn riêng biệt.'
            ]
          : [
              'Please respond based on how you genuinely see yourself in typical everyday life, rather than how you wish to be.',
              'Answer each statement honestly on the 5-point scale (from 1: Disagree strongly to 5: Agree strongly).',
              'Take note that each personality trait carries unique natural superpowers and potential blind spots.'
            ],
        notice: isVi
          ? 'Lưu ý rằng bài đánh giá này lượng giá các đặc điểm nhân cách — những xu hướng hành vi và nhận thức có thể thích nghi, bồi đắp và phát triển theo thời gian. Bài trắc nghiệm không phân loại con người thành các nhóm cứng nhắc mà mô tả các chiều kích liên tục để bạn tự thấu hiểu và phát huy tiềm năng.'
          : 'Please note that this assessment evaluates your personality traits—which can evolve and develop over time with fewer innate biological constraints compared to temperament (measured in the Eysenck test). This test helps you understand your current self to orient conscious development according to your needs.'
      }
    },
    {
      id: 'eysenck',
      title: isVi ? 'Bảng kiểm Khí chất & Nhân cách Eysenck (EPI)' : 'Eysenck Personality Test',
      subtitle: isVi ? 'Khí chất Sinh học (EPI)' : 'Biological Temperament (EPI)',
      description: isVi
        ? 'Lượng giá đặc điểm khí chất sinh học và hệ thần kinh qua mô hình kinh điển của Hans Eysenck.'
        : 'Evaluate core personality and temperament characteristics through a proven model.',
      ctaText: isVi ? 'Làm bài kiểm tra' : 'Take the Test',
      destinationUrl: '/assessment/eysenck',
      isExternal: false,
      destinationType: 'internal',
      modalContent: {
        title: isVi ? 'Trước khi bắt đầu: Bảng kiểm Khí chất Eysenck' : 'Before You Begin: Eysenck Personality Questionnaire',
        about: isVi
          ? 'Bảng kiểm Nhân cách & Khí chất Eysenck (EPI) là một trong những cột mốc kinh điển của tâm lý học, khám phá nền tảng sinh học thần kinh chi phối phản ứng và mức độ thích nghi của con người (Eysenck & Eysenck, 1964).'
          : 'Hans Eysenck’s Personality Theory (often translated as Temperament) is one of the most influential frameworks in personality psychology, exploring the biological foundations of human responsiveness.',
        purpose: isVi
          ? [
              'Xác định vị trí của bạn trên các trục nền tảng: Hướng ngoại - Hướng nội và Tính bất ổn cảm xúc.',
              'Khám phá bạn thuộc kiểu khí chất sinh học cổ điển nào: Hoạt bát (Sanguine), Nóng nảy (Choleric), U sầu (Melancholic), hay Điềm đạm (Phlegmatic).',
              'Làm sáng tỏ tốc độ hưng phấn, cường độ phản ứng và chu kỳ hồi phục tự nhiên của hệ thần kinh.'
            ]
          : [
              'Discover your position across foundational dimensions: Extraversion-Introversion and Neuroticism (Emotional Stability).',
              'Identify which of the four classic biological temperaments best characterizes you: Sanguine, Choleric, Melancholic, or Phlegmatic.',
              'Gain clarity on your nervous system’s natural speed of arousal, reaction intensity, and recovery patterns.'
            ],
        instructions: isVi
          ? [
              'Trả lời từng câu hỏi đơn giản bằng cách chọn "Có" hoặc "Không".',
              'Trả lời tự nhiên theo phản xạ đầu tiên mà không đắn đo quá lâu ở bất kỳ câu hỏi nào.',
              'Hãy trả lời trung thực; bài trắc nghiệm có tích hợp thang đo Tính Chuẩn mực Xã hội (Lie scale) để đánh giá độ chân thực của câu trả lời.'
            ]
          : [
              'Answer each question simply with "Yes" or "No".',
              'Respond spontaneously with your first natural reaction without deliberating too long on any question.',
              'Be genuine; the questionnaire includes a built-in scale to measure response authenticity.'
            ],
        notice: isVi
          ? '"Khí chất" của một người gắn liền với các quá trình thần kinh cơ bản — tốc độ và sức mạnh của hệ thần kinh (giải thích tại sao có người nhanh nổi nóng nhưng cũng nhanh nguội, trong khi người khác luôn bình thản và điềm tĩnh). Lưu ý: Nếu bạn thấy hồ sơ khí chất có điểm chưa hoàn hảo, hãy nhớ rằng thói quen ứng phó và hành vi hoàn toàn có thể được tôi luyện và thích nghi theo thời gian.'
          : 'A person\'s "temperament" is directly connected to their underlying nervous system processes—its speed and strength (explaining why some people heat up fast but cool down quickly, while others remain calm and steady). Note: If you feel your temperament profile seems to have certain disadvantages, remember that temperament and coping habits can be adapted and developed over time.'
      }
    },
    {
      id: 'adhd',
      title: isVi ? 'Thang Tự Đánh giá ADHD Người lớn (ASRS v1.1)' : 'ADHD Screening (ASRS v1.1)',
      subtitle: isVi ? 'Tập trung & Chức năng Điều hành' : 'Attention & Executive Function',
      description: isVi
        ? 'Sàng lọc các dấu hiệu về sự chú ý, tập trung và chức năng điều hành hành vi ở người trưởng thành.'
        : 'Screen attention, focus, and behavioral concentration patterns effectively.',
      ctaText: isVi ? 'Làm bài kiểm tra' : 'Take the Test',
      destinationUrl: '/assessment/adhd',
      isExternal: false,
      destinationType: 'internal',
      modalContent: {
        title: isVi ? 'Trước khi bắt đầu: Bảng câu hỏi Sàng lọc ADHD' : 'Before You Begin: ADHD Screening Questionnaire',
        about: isVi
          ? 'Được phát triển bởi Tổ chức Y tế Thế giới (WHO) cùng Nhóm nghiên cứu ADHD Người lớn thuộc Trường Y Harvard, thang đo 18 mục chuẩn hóa ASRS v1.1 được sử dụng rộng rãi trên toàn cầu để sàng lọc ADHD ở người trưởng thành (Kessler và cs., 2005).'
          : 'Developed in conjunction with the World Health Organization (WHO) and Harvard Medical School, this standardized 18-item scale is widely utilized by leading UK clinical organizations and worldwide healthcare providers to screen for adult ADHD.',
        purpose: isVi
          ? [
              'Đánh giá các biểu hiện thiếu chú ý, trí nhớ làm việc và sự trì hoãn nhiệm vụ.',
              'Lượng giá các chỉ báo về sự bồn chồn thể chất, tăng động tâm trí và kiểm soát xung động.',
              'Tạo bản báo cáo sàng lọc có cấu trúc dựa trên các ngưỡng lâm sàng tiêu chuẩn của WHO.'
            ]
          : [
              'Evaluate symptoms of inattention, working memory friction, and task procrastination.',
              'Assess indicators of physical or mental hyperactivity, restlessness, and impulse control.',
              'Generate a structured screening report grounded in WHO clinical threshold criteria.'
            ],
        instructions: isVi
          ? [
              'Xem xét các trải nghiệm điển hình của bạn trong công việc, học tập và sinh hoạt hàng ngày trong những tháng gần đây.',
              'Chọn mức độ mô tả chính xác nhất tần suất xảy ra tình huống (từ Không bao giờ đến Rất thường xuyên).',
              'Trả lời trung thực theo mô thức hành vi quen thuộc thay vì những ngày ngoại lệ hiếm hoi.'
            ]
          : [
              'Consider your typical experiences across work, study, and daily activities over recent months.',
              'Select the response that best describes how frequently each stated situation occurs for you (Never to Very Often).',
              'Answer honestly according to your typical patterns rather than isolated exceptional days.'
            ],
        notice: isVi
          ? 'Bài đánh giá này là công cụ sàng lọc, không phải là chẩn đoán y khoa. Điểm sàng lọc cao cho thấy kiểu hình tập trung của bạn tương đồng với các đặc điểm ADHD ở người lớn, là thông tin tham khảo hữu ích để thảo luận cùng bác sĩ chuyên khoa hoặc chuyên gia tâm lý lâm sàng.'
          : 'This assessment is a screening instrument, not a medical diagnosis. High screening scores indicate that your attention patterns are consistent with adult ADHD characteristics, which can serve as valuable context for discussion with a qualified psychiatrist or clinical specialist.'
      }
    }
  ];
}

export const ASSESSMENTS: AssessmentData[] = getLocalizedAssessments('en');
