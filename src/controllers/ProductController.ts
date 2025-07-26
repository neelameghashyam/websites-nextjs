import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private service = new ProductService();

  async getAll(req: NextRequest) {
    try {
      const products = await this.service.getAll();
      return NextResponse.json(products, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  async getById(req: NextRequest, id: string) {
    try {
      const product = await this.service.getById(id);
      return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: error.message.includes('not found') ? 404 : 400 });
    }
  }

  async create(req: NextRequest) {
    try {
      const data = await req.json();
      const product = await this.service.create(data);
      return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  async update(req: NextRequest, id: string) {
    try {
      const data = await req.json();
      const product = await this.service.update(id, data);
      return NextResponse.json(product, { status: 200 });
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