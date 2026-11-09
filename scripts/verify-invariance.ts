import { createDass21Definition } from '../src/data/assessments/content/dass21';
import { createBfi44Definition } from '../src/data/assessments/content/bfi44';
import { createEysenckDefinition } from '../src/data/assessments/content/eysenck';
import { createAdhdDefinition } from '../src/data/assessments/content/adhd';

console.log('====================================================');
console.log('PSYQUIZZ PSYCHOMETRIC MATHEMATICAL INVARIANCE TEST');
console.log('====================================================\n');

let allPassed = true;

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    allPassed = false;
  } else {
    console.log(`✅ PASSED: ${msg}`);
  }
}

// 1. DASS-21
{
  console.log('\n--- 1. Testing DASS-21 ---');
  const en = createDass21Definition('en');
  const vi = createDass21Definition('vi');

  assert(en.itemCount === 21 && vi.itemCount === 21, 'Item count is exactly 21 in both EN & VI');
  assert(en.questions.length === 21 && vi.questions.length === 21, 'Question array length is 21');

  for (let i = 0; i < 21; i++) {
    assert(en.questions[i].id === i + 1, `EN Q${i + 1} ID is ${i + 1}`);
    assert(vi.questions[i].id === i + 1, `VI Q${i + 1} ID is ${i + 1}`);
    assert(en.questions[i].dimension === vi.questions[i].dimension, `Q${i + 1} dimension matches: ${en.questions[i].dimension}`);
  }

  assert(en.options.length === 4 && vi.options.length === 4, 'Options length is 4 in both languages');
  for (let i = 0; i < 4; i++) {
    assert(en.options[i].value === i && vi.options[i].value === i, `Option ${i} value is ${i}`);
  }

  // Test deterministic score invariance with 10 random trials
  for (let trial = 1; trial <= 10; trial++) {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 21; i++) {
      answers[i] = Math.floor(Math.random() * 4); // 0..3
    }
    const resEn = en.calculateResults(answers);
    const resVi = vi.calculateResults(answers);

    assert(
      resEn.scores.depression.score === resVi.scores.depression.score &&
      resEn.scores.anxiety.score === resVi.scores.anxiety.score &&
      resEn.scores.stress.score === resVi.scores.stress.score,
      `Trial ${trial}: DASS-21 exact score parity (Dep: ${resEn.scores.depression.score}, Anx: ${resEn.scores.anxiety.score}, Str: ${resEn.scores.stress.score})`
    );
  }
}

// 2. BFI-44
{
  console.log('\n--- 2. Testing BFI-44 ---');
  const en = createBfi44Definition('en');
  const vi = createBfi44Definition('vi');

  assert(en.itemCount === 44 && vi.itemCount === 44, 'Item count is exactly 44 in both EN & VI');
  assert(en.questions.length === 44 && vi.questions.length === 44, 'Question array length is 44');

  for (let i = 0; i < 44; i++) {
    assert(en.questions[i].id === i + 1, `EN Q${i + 1} ID is ${i + 1}`);
    assert(vi.questions[i].id === i + 1, `VI Q${i + 1} ID is ${i + 1}`);
    assert(en.questions[i].dimension === vi.questions[i].dimension, `Q${i + 1} dimension matches: ${en.questions[i].dimension}`);
    assert(en.questions[i].isReverse === vi.questions[i].isReverse, `Q${i + 1} reverse-coding flag matches: ${en.questions[i].isReverse}`);
  }

  assert(en.options.length === 5 && vi.options.length === 5, 'Options length is 5 in both languages');
  for (let i = 0; i < 5; i++) {
    assert(en.options[i].value === i + 1 && vi.options[i].value === i + 1, `Option ${i + 1} value is ${i + 1}`);
  }

  // Test deterministic score invariance with 10 random trials
  for (let trial = 1; trial <= 10; trial++) {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 44; i++) {
      answers[i] = Math.floor(Math.random() * 5) + 1; // 1..5
    }
    const resEn = en.calculateResults(answers);
    const resVi = vi.calculateResults(answers);

    const dims = ['extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'] as const;
    for (const d of dims) {
      assert(
        resEn.scores[d].score === resVi.scores[d].score &&
        resEn.scores[d].averageScore === resVi.scores[d].averageScore,
        `Trial ${trial}: BFI-44 ${d} parity (score: ${resEn.scores[d].score}, avg: ${resEn.scores[d].averageScore})`
      );
    }
  }
}

// 3. EPI-57
{
  console.log('\n--- 3. Testing EPI-57 ---');
  const en = createEysenckDefinition('en');
  const vi = createEysenckDefinition('vi');

  assert(en.itemCount === 57 && vi.itemCount === 57, 'Item count is exactly 57 in both EN & VI');
  assert(en.questions.length === 57 && vi.questions.length === 57, 'Question array length is 57');

  for (let i = 0; i < 57; i++) {
    assert(en.questions[i].id === i + 1, `EN Q${i + 1} ID is ${i + 1}`);
    assert(vi.questions[i].id === i + 1, `VI Q${i + 1} ID is ${i + 1}`);
    assert(en.questions[i].dimension === vi.questions[i].dimension, `Q${i + 1} dimension matches: ${en.questions[i].dimension}`);
    assert(en.questions[i].isReverse === vi.questions[i].isReverse, `Q${i + 1} reverse-coding matches: ${en.questions[i].isReverse}`);
  }

  assert(en.options.length === 2 && vi.options.length === 2, 'Options length is 2 in both languages');

  for (let trial = 1; trial <= 10; trial++) {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 57; i++) {
      answers[i] = Math.random() > 0.5 ? 1 : 0;
    }
    const resEn = en.calculateResults(answers);
    const resVi = vi.calculateResults(answers);

    assert(
      resEn.scores.extraversion.score === resVi.scores.extraversion.score &&
      resEn.scores.neuroticism.score === resVi.scores.neuroticism.score &&
      resEn.scores.lie.score === resVi.scores.lie.score,
      `Trial ${trial}: EPI-57 parity (E: ${resEn.scores.extraversion.score}, N: ${resEn.scores.neuroticism.score}, L: ${resEn.scores.lie.score})`
    );
  }
}

// 4. ADHD ASRS v1.1
{
  console.log('\n--- 4. Testing ADHD ASRS v1.1 ---');
  const en = createAdhdDefinition('en');
  const vi = createAdhdDefinition('vi');

  assert(en.itemCount === 18 && vi.itemCount === 18, 'Item count is exactly 18 in both EN & VI');
  assert(en.questions.length === 18 && vi.questions.length === 18, 'Question array length is 18');

  for (let i = 0; i < 18; i++) {
    assert(en.questions[i].id === i + 1, `EN Q${i + 1} ID is ${i + 1}`);
    assert(vi.questions[i].id === i + 1, `VI Q${i + 1} ID is ${i + 1}`);
    assert(en.questions[i].dimension === vi.questions[i].dimension, `Q${i + 1} dimension matches: ${en.questions[i].dimension}`);
  }

  assert(en.options.length === 5 && vi.options.length === 5, 'Options length is 5 in both languages');
  for (let i = 0; i < 5; i++) {
    assert(en.options[i].value === i && vi.options[i].value === i, `Option ${i} value is ${i}`);
  }

  for (let trial = 1; trial <= 10; trial++) {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 18; i++) {
      answers[i] = Math.floor(Math.random() * 5); // 0..4
    }
    const resEn = en.calculateResults(answers);
    const resVi = vi.calculateResults(answers);

    assert(
      resEn.scores.screeningPartA.score === resVi.scores.screeningPartA.score &&
      resEn.scores.inattention.score === resVi.scores.inattention.score &&
      resEn.scores.hyperactivity.score === resVi.scores.hyperactivity.score,
      `Trial ${trial}: ADHD parity (PartA: ${resEn.scores.screeningPartA.score}, Inatt: ${resEn.scores.inattention.score}, Hyper: ${resEn.scores.hyperactivity.score})`
    );
  }
}

console.log('\n====================================================');
if (allPassed) {
  console.log('🎉 ALL 140 ITEMS & SCORING ALGORITHMS 100% INVARIANT!');
  console.log('====================================================\n');
  process.exit(0);
} else {
  console.error('💥 TEST FAILED: INVARIANCE BREACH DETECTED');
  console.log('====================================================\n');
  process.exit(1);
}

