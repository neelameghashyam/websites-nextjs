import mongoose, { Schema } from 'mongoose';

const planPaidItemUsageHistorySchema = new Schema({
  customer_id: { type: Number, min: 0, required: true },
  invoiced: { type: Number, min: 0, max: 1, required: true },
  price: { type: Number, min: 0, required: true },
  plan_paid_item: { type: String, minLength: 1, required: true },
  created_date: { type: Date, required: true },
}, { timestamps: true });

planPaidItemUsageHistorySchema.index({ customer_id: 1, created_date: 1 }, { unique: true });
planPaidItemUsageHistorySchema.index({ customer_id: 1 });

export default mongoose.models.PlanPaidItemUsageHistory || mongoose.model('PlanPaidItemUsageHistory', planPaidItemUsageHistorySchema);