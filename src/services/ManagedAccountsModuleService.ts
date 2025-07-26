import ManagedAccountsModule from '../models/ManagedAccountsModule';
import { Types } from 'mongoose';

export class ManagedAccountsModuleService {
  async getAll() {
    return await ManagedAccountsModule.find().lean();
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const module = await ManagedAccountsModule.findById(id).lean();
    if (!module) throw new Error('ManagedAccountsModule not found');
    return module;
  }

  async create(data: any) {
    return await ManagedAccountsModule.create(data);
  }

  async update(id: string, data: any) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const module = await ManagedAccountsModule.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!module) throw new Error('ManagedAccountsModule not found');
    return module;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const module = await ManagedAccountsModule.findByIdAndDelete(id).lean();
    if (!module) throw new Error('ManagedAccountsModule not found');
    return true;
  }
}