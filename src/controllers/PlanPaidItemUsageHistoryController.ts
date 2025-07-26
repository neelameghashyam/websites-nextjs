import { NextRequest, NextResponse } from 'next/server';
import { PlanPaidItemUsageHistoryService } from '../services/PlanPaidItemUsageHistoryService';

export class PlanPaidItemUsageHistoryController {
  private service = new PlanPaidItemUsageHistoryService();

  async getAll(req: NextRequest) {
    try {
      const records = await this.service.getAll();
      return NextResponse.json(records, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  async getByCustomerIdAndDate(req: NextRequest, customerId: string, createdDate: string) {
    try {
      const record = await this.service.getByCustomerIdAndDate(parseInt(customerId), createdDate);
      return NextResponse.json(record, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: error.message.includes('not found') ? 404 : 400 });
    }
  }

  async create(req: NextRequest) {
    try {
      const data = await req.json();
      const record = await this.service.create(data);
      return NextResponse.json(record, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  async update(req: NextRequest, customerId: string, createdDate: string) {
    try {
      const data = await req.json();
      const record = await this.service.update(parseInt(customerId), createdDate, data);
      return NextResponse.json(record, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: error.message.includes('not found') ? 404 : 400 });
    }
  }

  async delete(req: NextRequest, customerId: string, createdDate: string) {
    try {
      await this.service.delete(parseInt(customerId), createdDate);
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: error.message.includes('not found') ? 404 : 400 });
    }
  }
}