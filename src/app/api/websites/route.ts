import { NextRequest, NextResponse } from 'next/server';
import { WebsiteController } from '../../controllers/websiteController';

export async function GET(req: NextRequest) {
  return WebsiteController.getWebsites(req);
}

export async function POST(req: NextRequest) {
  return WebsiteController.createWebsite(req);
}
