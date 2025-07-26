import { NextRequest, NextResponse } from 'next/server';
import { ProductController } from '../../../controllers/ProductController';
import { auth } from '../../../middleware/auth';
import connectDB from '../../../utils/db';

const controller = new ProductController();

export async function GET(req: NextRequest) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.getAll(req);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.create(req);
}