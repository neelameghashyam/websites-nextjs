import { NextRequest, NextResponse } from 'next/server';
import { PricePlanService } from '../services/PricePlanService';

export class PricePlanController {
  private service = new PricePlanService();

  async getAll(req: NextRequest) {
    try {
      const plans = await this.service.getAll();
      return NextResponse.json(plans, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  async getById(req: NextRequest, id: string) {
    try {
      const plan = await this.service.getById(id);
      return NextResponse.json(plan, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: error.message.includes('not found') ? 404 : 400 });
    }
  }

  async create(req: NextRequest) {
    try {
      const data = await req.json();
      const plan = await this.service.create(data);
      return NextResponse.json(plan, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  async update(req: NextRequest, id: string) {
    try {
      const data = await req.json();
      const plan = await this.service.update(id, data);
      return NextResponse.json(plan, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: error.message.includes('not found') ? 404 : 400 });
    }
  }

  async delete(req: NextRequest, id: string) {
    try {
      await this.service.delete(id);
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: error.message.includes('not found') ? 404 : 400 });
    }
  }
}