import PlanProductPrice from '../models/PlanProductPrice';
import { Types } from 'mongoose';

export class PlanProductPriceService {
  async getAll() {
    return await PlanProductPrice.find().lean();
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const price = await PlanProductPrice.findById(id).lean();
    if (!price) throw new Error('PlanProductPrice not found');
    return price;
  }

  async create(data: any) {
    return await PlanProductPrice.create(data);
  }

  async update(id: string, data: any) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const price = await PlanProductPrice.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!price) throw new Error('PlanProductPrice not found');
    return price;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const price = await PlanProductPrice.findByIdAndDelete(id).lean();
    if (!price) throw new Error('PlanProductPrice not found');
    return true;
  }
}