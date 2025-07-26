import Product from '../models/Product';
import { Types } from 'mongoose';

export class ProductService {
  async getAll() {
    return await Product.find().lean();
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const product = await Product.findById(id).lean();
    if (!product) throw new Error('Product not found');
    return product;
  }

  async create(data: any) {
    return await Product.create(data);
  }

  async update(id: string, data: any) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!product) throw new Error('Product not found');
    return product;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const product = await Product.findByIdAndDelete(id).lean();
    if (!product) throw new Error('Product not found');
    return true;
  }
}