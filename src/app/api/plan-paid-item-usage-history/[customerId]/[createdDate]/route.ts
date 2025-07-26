import { NextRequest, NextResponse } from 'next/server';
import { PlanPaidItemUsageHistoryController } from '../../../../../controllers/PlanPaidItemUsageHistoryController';
import { auth } from '../../../../../middleware/auth';
import connectDB from '../../../../../utils/db';

const controller = new PlanPaidItemUsageHistoryController();

export async function GET(req: NextRequest, { params }: { params: { customerId: string; createdDate: string } }) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.getByCustomerIdAndDate(req, params.customerId, params.createdDate);
}

export async function PUT(req: NextRequest, { params }: { params: { customerId: string; createdDate: string } }) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.update(req, params.customerId, params.createdDate);
}

export async function DELETE(req: NextRequest, { params }: { params: { customerId: string; createdDate: string } }) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.delete(req, params.customerId, params.createdDate);
}