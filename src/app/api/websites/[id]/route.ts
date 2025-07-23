import { NextRequest, NextResponse } from 'next/server';
import { WebsiteController } from '../../../controllers/websiteController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return WebsiteController.getWebsite(req, { params });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return WebsiteController.updateWebsite(req, { params });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return WebsiteController.deleteWebsite(req, { params });
}
