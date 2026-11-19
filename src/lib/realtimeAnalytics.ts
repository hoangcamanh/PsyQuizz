// Realtime Analytics & Telemetry Tracking Store for PsyQuizz

export interface RealtimeAnalyticsData {
  pageviews: number;
  uniqueVisitors: number;
  testsCompleted: {
    'dass-21': number;
    'adhd': number;
    'eysenck': number;
    'bfi-44': number;
  };
  totalAiQuestionsAsked: number;
  affiliateClicks: Record<string, number>;
  transactions: Array<{
    id: string;
    gateway: string;
    accountNumber: string;
    amount: number;
    description: string;
    anonymousKey: string;
    plan: 'monthly' | 'yearly' | 'lifetime';
    status: 'matched' | 'manual_review';
    timestamp: string;
    transactionRef: string;
  }>;
  subscribers: Array<{
    id: string;
    anonymousKey: string;
    username?: string;
    plan: 'monthly' | 'yearly' | 'lifetime';
    amountPaid: number;
    registeredAt: string;
    expiresAt: string;
    status: 'active' | 'expired';
    aiTurnsUsed: number;
    paymentMethod: 'vietqr' | 'manual_admin';
  }>;
}

const STORAGE_KEY = 'psyquizz_live_telemetry_v1';

export const DEFAULT_ANALYTICS: RealtimeAnalyticsData = {
  pageviews: 0,
  uniqueVisitors: 0,
  testsCompleted: {
    'dass-21': 0,
    'adhd': 0,
    'eysenck': 0,
    'bfi-44': 0
  },
  totalAiQuestionsAsked: 0,
  affiliateClicks: {},
  transactions: [],
  subscribers: []
};

// Retrieve current live analytics
export function getLiveAnalytics(): RealtimeAnalyticsData {
  if (typeof window === 'undefined') return DEFAULT_ANALYTICS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANALYTICS));
      return DEFAULT_ANALYTICS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ANALYTICS;
  }
}

// Save analytics state
export function saveLiveAnalytics(data: RealtimeAnalyticsData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save analytics', e);
  }
}

// Reset all live analytics & stored plus transactions to clean zero state
export function resetAllSystemTelemetry(): RealtimeAnalyticsData {
  if (typeof window === 'undefined') return DEFAULT_ANALYTICS;
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem('psyquizz_visited_session');
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('psyquizz_plus_status_') || k.startsWith('psyquizz_ai_usage_') || k.startsWith('psyquizz_key_account_'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANALYTICS));
    return DEFAULT_ANALYTICS;
  } catch {
    return DEFAULT_ANALYTICS;
  }
}

// Track a specific live telemetry event
export function trackLiveEvent(
  eventType: 'pageview' | 'test_complete' | 'ai_question' | 'affiliate_click' | 'payment_success',
  payload?: any
) {
  if (typeof window === 'undefined') return;
  const data = getLiveAnalytics();

  switch (eventType) {
    case 'pageview': {
      data.pageviews += 1;
      const hasVisited = sessionStorage.getItem('psyquizz_visited_session');
      if (!hasVisited) {
        data.uniqueVisitors += 1;
        sessionStorage.setItem('psyquizz_visited_session', 'true');
      }
      break;
    }
    case 'test_complete': {
      const testId = payload?.testId as 'dass-21' | 'adhd' | 'eysenck' | 'bfi-44';
      if (testId && data.testsCompleted[testId] !== undefined) {
        data.testsCompleted[testId] += 1;
      }
      break;
    }
    case 'ai_question': {
      data.totalAiQuestionsAsked += 1;
      break;
    }
    case 'affiliate_click': {
      const productId = payload?.productId as string;
      if (productId) {
        data.affiliateClicks[productId] = (data.affiliateClicks[productId] || 0) + 1;
      }
      break;
    }
    case 'payment_success': {
      const { anonymousKey, amount, plan, gateway, transactionRef, description } = payload;
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + (plan === 'lifetime' ? 36500 : plan === 'yearly' ? 365 : 30));

      const newTxn = {
        id: `TXN-${Date.now().toString().slice(-4)}`,
        gateway: gateway || 'VPBank',
        accountNumber: '39112082003',
        amount: Number(amount) || 99000,
        description: description || `${anonymousKey} NANG CAP PREMIUM`,
        anonymousKey: anonymousKey || 'PQ-UNKNOWN',
        plan: (plan as any) || 'monthly',
        status: 'matched' as const,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        transactionRef: transactionRef || `FT${Date.now()}`
      };

      data.transactions.unshift(newTxn);

      // Check if subscriber exists
      const existingSubIdx = data.subscribers.findIndex((s) => s.anonymousKey === anonymousKey);
      if (existingSubIdx >= 0) {
        data.subscribers[existingSubIdx].status = 'active';
        data.subscribers[existingSubIdx].plan = plan;
        data.subscribers[existingSubIdx].amountPaid += Number(amount);
        data.subscribers[existingSubIdx].expiresAt = expireDate.toISOString().split('T')[0];
      } else {
        data.subscribers.unshift({
          id: `SUB-${Date.now().toString().slice(-4)}`,
          anonymousKey,
          plan,
          amountPaid: Number(amount),
          registeredAt: new Date().toISOString().split('T')[0],
          expiresAt: expireDate.toISOString().split('T')[0],
          status: 'active',
          aiTurnsUsed: 0,
          paymentMethod: 'vietqr'
        });
      }
      break;
    }
  }

  saveLiveAnalytics(data);
}

// Reset live analytics (for admin to start fresh)
export function resetLiveAnalytics() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANALYTICS));
}
