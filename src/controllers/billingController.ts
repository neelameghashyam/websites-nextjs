import { NextRequest, NextResponse } from 'next/server';
import { BillingService } from '@/services/billingService';
import { BillingRecordCreate, BillingRecordUpdate, ErrorResponse } from '@/types/billing';

export class BillingController {
  static async getBillingRecords(req: NextRequest): Promise<NextResponse> {
    try {
      const url = new URL(req.url);
      const query = {
        customer_id: url.searchParams.get('customer_id') ? Number(url.searchParams.get('customer_id')) : undefined,
        status: url.searchParams.get('status') || undefined,
        page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : undefined,
        limit: url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined,
      };
      const records = await BillingService.getBillingRecords(query);
      return NextResponse.json(records, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message } as ErrorResponse, { status: 500 });
    }
  }

  static async createBillingRecord(req: NextRequest): Promise<NextResponse> {
    try {
      const data: BillingRecordCreate = await req.json();
      const record = await BillingService.createBillingRecord(data);
      return NextResponse.json(record, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message } as ErrorResponse, { status: 400 });
    }
  }

  static async getBillingRecord(req: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const id = Number(params.id);
      const record = await BillingService.getBillingRecord(id);
      if (!record) {
        return NextResponse.json({ error: 'Billing record not found' } as ErrorResponse, { status: 404 });
      }
      return NextResponse.json(record, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message } as ErrorResponse, { status: 500 });
    }
  }

  static async updateBillingRecord(req: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const id = Number(params.id);
      const data: BillingRecordUpdate = await req.json();
      const record = await BillingService.updateBillingRecord(id, data);
      if (!record) {
        return NextResponse.json({ error: 'Billing record not found' } as ErrorResponse, { status: 404 });
      }
      return NextResponse.json(record, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message } as ErrorResponse, { status: 400 });
    }
  }

  static async deleteBillingRecord(req: NextRequest, params: { id: string }): Promise<NextResponse> {
    try {
      const id = Number(params.id);
      const record = await BillingService.deleteBillingRecord(id);
      if (!record) {
        return NextResponse.json({ error: 'Billing record not found' } as ErrorResponse, { status: 404 });
      }
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message } as ErrorResponse, { status: 500 });
    }
  }

  static async searchBillingRecords(req: NextRequest): Promise<NextResponse> {
    try {
      const url = new URL(req.url);
      const query = {
        customer_id: url.searchParams.get('customer_id') ? Number(url.searchParams.get('customer_id')) : undefined,
        status: url.searchParams.get('status') || undefined,
        date_from: url.searchParams.get('date_from') || undefined,
        date_to: url.searchParams.get('date_to') || undefined,
      };
      const records = await BillingService.searchBillingRecords(query);
      return NextResponse.json(records, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message } as ErrorResponse, { status: 500 });
    }
  }
}
