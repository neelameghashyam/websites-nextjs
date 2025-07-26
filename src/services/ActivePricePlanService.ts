import ActivePricePlan from '../models/ActivePricePlan';
import { Types } from 'mongoose';

export class ActivePricePlanService {
  async getAll() {
    return await ActivePricePlan.find().lean();
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const plan = await ActivePricePlan.findById(id).lean();
    if (!plan) throw new Error('ActivePricePlan not found');
    return plan;
  }

  async create(data: any) {
    return await ActivePricePlan.create(data);
  }

  async update(id: string, data: any) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const plan = await ActivePricePlan.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!plan) throw new Error('ActivePricePlan not found');
    return plan;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const plan = await ActivePricePlan.findByIdAndDelete(id).lean();
    if (!plan) throw new Error('ActivePricePlan not found');
    return true;
  }
}