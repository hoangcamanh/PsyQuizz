import { NextRequest, NextResponse } from 'next/server';

// In-memory store of recently matched keys for real-time polling during user session
const paidKeysStore = new Map<string, { plan: string; timestamp: number }>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  const normalized = key.toUpperCase().trim();
  const payment = paidKeysStore.get(normalized);
  if (payment) {
    return NextResponse.json({ paid: true, plan: payment.plan });
  }
  return NextResponse.json({ paid: false });
}

/**
 * Webhook endpoint for automated bank transfer reconciliation (VietQR / SePAY / Casso / PayOS)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, description, transactionId, gateway, accountNumber } = body;

    if (!amount || !description) {
      return NextResponse.json(
        { error: 'Missing required payment fields (amount, description)' },
        { status: 400 }
      );
    }

    // Extract Anonymous Key matching format: PQ-XXXX-XXXX or PQXXXX
    const keyMatch = description.match(/PQ[-_ ]?([A-Z0-9]{3,6})[-_ ]?([A-Z0-9]{3,6})?/i);
    let matchedKey: string | null = null;

    if (keyMatch) {
      if (keyMatch[2]) {
        matchedKey = `PQ-${keyMatch[1].toUpperCase()}-${keyMatch[2].toUpperCase()}`;
      } else {
        matchedKey = `PQ-${keyMatch[1].toUpperCase()}`;
      }
    }

    // Determine purchased plan based on transfer amount
    let plan: 'monthly' | 'yearly' | 'lifetime' = 'monthly';
    if (amount >= 699000) {
      plan = 'lifetime';
    } else if (amount >= 299000) {
      plan = 'yearly';
    }

    if (matchedKey) {
      paidKeysStore.set(matchedKey, { plan, timestamp: Date.now() });
    }

    const transactionRecord = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      gateway: gateway || 'VPBank',
      accountNumber: accountNumber || '39112082003',
      amount: Number(amount),
      description: String(description),
      anonymousKey: matchedKey || 'UNKNOWN',
      plan,
      status: matchedKey ? 'matched' : 'manual_review',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      transactionRef: transactionId || `REF${Date.now()}`
    };

    return NextResponse.json({
      success: true,
      message: matchedKey 
        ? `Tự động kích hoạt thành công gói ${plan} cho khóa ${matchedKey}`
        : 'Giao dịch đã nhận nhưng cần đối soát thủ công do thiếu hoặc sai cú pháp khóa PQ',
      transaction: transactionRecord
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
