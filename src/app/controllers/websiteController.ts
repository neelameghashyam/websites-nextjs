import { NextRequest, NextResponse } from 'next/server';
import { WebsiteService } from '../services/websiteService';
import { ErrorResponse } from '../types/website';

export class WebsiteController {
  static async getWebsites(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const query: {
        is_template?: number;
        company_id?: number;
        domain?: string;
      } = {};
      const is_template = searchParams.get('is_template');
      const company_id = searchParams.get('company_id');
      const domain = searchParams.get('domain');

      if (is_template) query.is_template = Number(is_template);
      if (company_id) query.company_id = Number(company_id);
      if (domain) query.domain = domain;

      const websites = await WebsiteService.getWebsites(query);
      return NextResponse.json(websites, { status: 200 });
    } catch (error: any) {
      const errorResponse: ErrorResponse = { code: 'INTERNAL_SERVER_ERROR', message: error.message };
      return NextResponse.json(errorResponse, { status: 500 });
    }
  }

  static async createWebsite(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const website = await WebsiteService.createWebsite(body);
      return NextResponse.json(website, { status: 201 });
    } catch (error: any) {
      const errorResponse: ErrorResponse = { code: 'BAD_REQUEST', message: error.message };
      return NextResponse.json(errorResponse, { status: 400 });
    }
  }

  static async getWebsite(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      const website = await WebsiteService.getWebsite(params.id);
      if (!website) {
        const errorResponse: ErrorResponse = { code: 'NOT_FOUND', message: 'Website not found' };
        return NextResponse.json(errorResponse, { status: 404 });
      }
      return NextResponse.json(website, { status: 200 });
    } catch (error: any) {
      const errorResponse: ErrorResponse = { code: 'INTERNAL_SERVER_ERROR', message: error.message };
      return NextResponse.json(errorResponse, { status: 500 });
    }
  }

  static async updateWebsite(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      const body = await req.json();
      const website = await WebsiteService.updateWebsite(params.id, body);
      if (!website) {
        const errorResponse: ErrorResponse = { code: 'NOT_FOUND', message: 'Website not found' };
        return NextResponse.json(errorResponse, { status: 404 });
      }
      return NextResponse.json(website, { status: 200 });
    } catch (error: any) {
      const errorResponse: ErrorResponse = { code: 'BAD_REQUEST', message: error.message };
      return NextResponse.json(errorResponse, { status: 400 });
    }
  }

  static async deleteWebsite(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      const website = await WebsiteService.deleteWebsite(params.id);
      if (!website) {
        const errorResponse: ErrorResponse = { code: 'NOT_FOUND', message: 'Website not found' };
        return NextResponse.json(errorResponse, { status: 404 });
      }
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      const errorResponse: ErrorResponse = { code: 'INTERNAL_SERVER_ERROR', message: error.message };
      return NextResponse.json(errorResponse, { status: 500 });
    }
  }
}
