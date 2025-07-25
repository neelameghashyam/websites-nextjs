import { NextRequest, NextResponse } from 'next/server';
import { BillingController } from '@/controllers/billingController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return BillingController.getBillingRecord(req, params);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return BillingController.updateBillingRecord(req, params);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return BillingController.deleteBillingRecord(req, params);
}
