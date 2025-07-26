import PricePlan from '../models/PricePlan';
import { Types } from 'mongoose';

export class PricePlanService {
  async getAll() {
    return await PricePlan.find().lean();
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const plan = await PricePlan.findById(id).lean();
    if (!plan) throw new Error('PricePlan not found');
    return plan;
  }

  async create(data: any) {
    return await PricePlan.create(data);
  }

  async update(id: string, data: any) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const plan = await PricePlan.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!plan) throw new Error('PricePlan not found');
    return plan;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const plan = await PricePlan.findByIdAndDelete(id).lean();
    if (!plan) throw new Error('PricePlan not found');
    return true;
  }
}