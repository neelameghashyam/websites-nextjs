import ProductPrice from '../models/ProductPrice';
import { Types } from 'mongoose';

export class ProductPriceService {
  async getAll() {
    return await ProductPrice.find().lean();
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const price = await ProductPrice.findById(id).lean();
    if (!price) throw new Error('ProductPrice not found');
    return price;
  }

  async create(data: any) {
    return await ProductPrice.create(data);
  }

  async update(id: string, data: any) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const price = await ProductPrice.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!price) throw new Error('ProductPrice not found');
    return price;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const price = await ProductPrice.findByIdAndDelete(id).lean();
    if (!price) throw new Error('ProductPrice not found');
    return true;
  }
}