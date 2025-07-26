import mongoose, { Schema } from 'mongoose';

const planProductPriceSchema = new Schema({
  monthly_id: { type: Schema.Types.ObjectId, required: true },
  yearly_id: { type: Schema.Types.ObjectId, required: true },
  monthly_per_day_id: { type: Schema.Types.ObjectId, required: true },
  yearly_per_day_id: { type: Schema.Types.ObjectId, required: true },
  extra_chat_id: { type: Schema.Types.ObjectId, required: true },
  extra_day_of_chat_history_id: { type: Schema.Types.ObjectId, required: true },
  extra_user_id: { type: Schema.Types.ObjectId, required: true },
  extra_site_id: { type: Schema.Types.ObjectId, required: true },
  extra_qualified_lead_id: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true });

planProductPriceSchema.index({ _id: 1 }, { unique: true });
planProductPriceSchema.index({ monthly_id: 1 });
planProductPriceSchema.index({ yearly_id: 1 });
planProductPriceSchema.index({ monthly_per_day_id: 1 });
planProductPriceSchema.index({ yearly_per_day_id: 1 });
planProductPriceSchema.index({ extra_chat_id: 1 });
planProductPriceSchema.index({ extra_day_of_chat_history_id: 1 });
planProductPriceSchema.index({ extra_user_id: 1 });
planProductPriceSchema.index({ extra_site_id: 1 });
planProductPriceSchema.index({ extra_qualified_lead_id: 1 });

export default mongoose.models.PlanProductPrice || mongoose.model('PlanProductPrice', planProductPriceSchema);