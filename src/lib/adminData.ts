// Administrative Data Store & Persistence Model for PsyQuizz

export interface BankTransaction {
  id: string;
  gateway: 'VPBank' | 'MBBank' | 'Vietcombank' | 'Techcombank' | 'TPBank' | string;
  accountNumber: string;
  amount: number;
  description: string;
  anonymousKey: string;
  plan: 'monthly' | 'yearly' | 'lifetime';
  status: 'matched' | 'pending' | 'manual_review';
  timestamp: string;
  transactionRef: string;
}

export interface SubscriberRecord {
  id: string;
  anonymousKey: string;
  username?: string;
  plan: 'monthly' | 'yearly' | 'lifetime';
  amountPaid: number;
  registeredAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'canceled';
  aiTurnsUsed: number;
  paymentMethod: 'vietqr' | 'manual_admin' | 'promo';
}

export interface AffiliateClickRecord {
  id: string;
  productName: string;
  category: string;
  retailer: 'Shopee' | 'Tiki' | 'Lazada';
  clicks: number;
  estimatedOrders: number;
  estimatedGmv: number;
  estimatedCommission: number; // ~ 8-12%
  lastClickedAt: string;
}

export interface TrafficMetric {
  date: string;
  pageviews: number;
  uniqueVisitors: number;
  testsStarted: number;
  testsCompleted: number;
  upgradeClicks: number;
  successfulPurchases: number;
}

export interface BankingGatewayConfig {
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrImageUrl: string;
  monthlyPrice: number;
  yearlyPrice: number;
  lifetimePrice: number;
  webhookSecret: string;
  autoActivationEnabled: boolean;
}

// Initial Mock Seed Data
export const INITIAL_BANK_CONFIG: BankingGatewayConfig = {
  bankCode: 'VPBank',
  bankName: 'VPBank (Ngân hàng TMCP Việt Nam Thịnh Vượng)',
  accountNumber: '39112082003',
  accountHolder: 'LE HOANG ANH',
  qrImageUrl: '/qr-vpbank.jpg',
  monthlyPrice: 99000,
  yearlyPrice: 299000,
  lifetimePrice: 699000,
  webhookSecret: 'sepay_sec_99a8b7c6d5e4f3a2',
  autoActivationEnabled: true,
};

export const INITIAL_TRANSACTIONS: BankTransaction[] = [];

export const INITIAL_SUBSCRIBERS: SubscriberRecord[] = [];

export const INITIAL_AFFILIATE_PRODUCTS: AffiliateClickRecord[] = [
  {
    id: 'aff-01',
    productName: 'Trà Hoa Cúc & Lavender Thảo Mộc',
    category: 'Xoa Dịu Hệ Thần Kinh',
    retailer: 'Shopee',
    clicks: 0,
    estimatedOrders: 0,
    estimatedGmv: 0,
    estimatedCommission: 0,
    lastClickedAt: 'Chưa có lượt click'
  },
  {
    id: 'aff-02',
    productName: 'Đồng Hồ Đếm Ngược Visual Timer Đĩa Màu (ADHD)',
    category: 'Công Cụ Chống Mù Thời Gian',
    retailer: 'Shopee',
    clicks: 0,
    estimatedOrders: 0,
    estimatedGmv: 0,
    estimatedCommission: 0,
    lastClickedAt: 'Chưa có lượt click'
  },
  {
    id: 'aff-03',
    productName: 'Sách "Hiểu Về Trái Tim" & "Tư Duy Nhanh Và Chậm"',
    category: 'Tâm Lý Học Nhận Thức',
    retailer: 'Tiki',
    clicks: 0,
    estimatedOrders: 0,
    estimatedGmv: 0,
    estimatedCommission: 0,
    lastClickedAt: 'Chưa có lượt click'
  },
  {
    id: 'aff-04',
    productName: 'Nến Thơm Tinh Dầu Gỗ Tuyết Tùng & Cam Bergamot',
    category: 'Aromatherapy Xoa Dịu Căng Thẳng',
    retailer: 'Shopee',
    clicks: 0,
    estimatedOrders: 0,
    estimatedGmv: 0,
    estimatedCommission: 0,
    lastClickedAt: 'Chưa có lượt click'
  },
  {
    id: 'aff-05',
    productName: 'Tai Nghe Chống Ồn Chủ Động (Active Noise Cancelling)',
    category: 'Triệt Tiêu Âm Thanh Xao Nhãng',
    retailer: 'Shopee',
    clicks: 0,
    estimatedOrders: 0,
    estimatedGmv: 0,
    estimatedCommission: 0,
    lastClickedAt: 'Chưa có lượt click'
  },
  {
    id: 'aff-06',
    productName: 'Bóng Bóp Gai Massage Xả Stress',
    category: 'Điều Tiết Cảm Xúc Nóng Nảy',
    retailer: 'Shopee',
    clicks: 0,
    estimatedOrders: 0,
    estimatedGmv: 0,
    estimatedCommission: 0,
    lastClickedAt: 'Chưa có lượt click'
  }
];

export const INITIAL_TRAFFIC_METRICS: TrafficMetric[] = [];
