
import { NextRequest, NextResponse } from 'next/server';
import { BillingController } from '@/controllers/billingController';

export async function GET(req: NextRequest) {
  return BillingController.getBillingRecords(req);
}

export async function POST(req: NextRequest) {
  return BillingController.createBillingRecord(req);
}
