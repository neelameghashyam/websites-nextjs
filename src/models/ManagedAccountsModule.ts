import mongoose, { Schema } from 'mongoose';

const managedAccountsModuleSchema = new Schema({
  managedService: { type: Number, min: 0, max: 1, default: 0, required: true },
  qualifiedLeadsQuantity: { type: Number, min: 0, default: 0, required: true },
  qualifiedLeadsAmount: { type: Number, min: 0, required: true },
}, { timestamps: true });

managedAccountsModuleSchema.index({ _id: 1 }, { unique: true });

export default mongoose.models.ManagedAccountsModule || mongoose.model('ManagedAccountsModule', managedAccountsModuleSchema);