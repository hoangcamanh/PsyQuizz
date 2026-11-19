// Centralized Pricing & Subscription Configuration for PsyQuizz

export interface PlanPricing {
  price: number;
  originalPrice: number;
  discountPercent: number;
  durationDays: number;
  labelVi: string;
  labelEn: string;
}

export interface SystemPricingConfig {
  monthly: PlanPricing;
  yearly: PlanPricing;
  lifetime: PlanPricing;
}

export const DEFAULT_PRICING: SystemPricingConfig = {
  monthly: {
    price: 99000,
    originalPrice: 99000,
    discountPercent: 0,
    durationDays: 30,
    labelVi: 'Gói Tháng',
    labelEn: 'Monthly Plan'
  },
  yearly: {
    price: 299000,
    originalPrice: 1188000, // 12 x 99,000 = 1,188,000 đ
    discountPercent: 75,
    durationDays: 365,
    labelVi: 'Gói 1 Năm',
    labelEn: '1-Year Plan'
  },
  lifetime: {
    price: 699000,
    originalPrice: 2970000,
    discountPercent: 76,
    durationDays: 36500,
    labelVi: 'Gói Trọn Đời',
    labelEn: 'Lifetime Plan'
  }
};

const PRICING_STORAGE_KEY = 'psyquizz_system_pricing_v1';

export function getPricingConfig(): SystemPricingConfig {
  if (typeof window === 'undefined') return DEFAULT_PRICING;
  try {
    const raw = localStorage.getItem(PRICING_STORAGE_KEY);
    if (!raw) return DEFAULT_PRICING;
    const parsed = JSON.parse(raw);
    return {
      monthly: { ...DEFAULT_PRICING.monthly, ...parsed.monthly },
      yearly: { ...DEFAULT_PRICING.yearly, ...parsed.yearly },
      lifetime: { ...DEFAULT_PRICING.lifetime, ...parsed.lifetime }
    };
  } catch {
    return DEFAULT_PRICING;
  }
}

export function savePricingConfig(config: SystemPricingConfig) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save pricing config', e);
  }
}
