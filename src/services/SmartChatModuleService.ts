import SmartChatModule from '../models/SmartChatModule';
import { Types } from 'mongoose';

export class SmartChatModuleService {
  async getAll() {
    return await SmartChatModule.find().lean();
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const module = await SmartChatModule.findById(id).lean();
    if (!module) throw new Error('SmartChatModule not found');
    return module;
  }

  async create(data: any) {
    return await SmartChatModule.create(data);
  }

  async update(id: string, data: any) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const module = await SmartChatModule.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!module) throw new Error('SmartChatModule not found');
    return module;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const module = await SmartChatModule.findByIdAndDelete(id).lean();
    if (!module) throw new Error('SmartChatModule not found');
    return true;
  }
}