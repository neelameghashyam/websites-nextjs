import { NextRequest, NextResponse } from 'next/server';
import { ProductController } from '../../../../controllers/ProductController';
import { auth } from '../../../../middleware/auth';
import connectDB from '../../../../utils/db';

const controller = new ProductController();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.getById(req, params.id);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.update(req, params.id);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const authResponse = await auth(req);
  if (authResponse.status !== 200) return authResponse;
  return controller.delete(req, params.id);
}