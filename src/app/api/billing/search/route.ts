import { NextRequest, NextResponse } from 'next/server';
import { BillingController } from '@/controllers/billingController';

export async function GET(req: NextRequest) {
  return BillingController.searchBillingRecords(req);
}
