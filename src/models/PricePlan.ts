import mongoose, { Schema } from 'mongoose';

const smartChatModuleSubSchema = new Schema({
  active_users_quantity: { type: Number, min: 0, default: 0, required: true },
  active_users_amount: { type: Number, min: 0, default: 0, required: true },
  website_quantity: { type: Number, min: 0, default: 0, required: true },
  website_amount: { type: Number, min: 0, default: 0, required: true },
  chat_history_quantity: { type: Number, min: -1, default: -1, required: true },
  chat_history_amount: { type: Number, min: 0, default: 0, required: true },
  active_chat_quantity: { type: Number, min: -1, default: -1, required: true },
  active_chat_amount: { type: Number, min: 0, default: 0, required: true },
  chat_takeover: { type: Number, min: 0, max: 1, default: 0, required: true },
  chat_tagging: { type: Number, min: 0, max: 1, default: 0, required: true },
  chat_transcript: { type: Number, min: 0, max: 1, default: 0, required: true },
  open_ai_included: { type: Number, min: 0, max: 1, default: 0, required: true },
});

const managedAccountsModuleSubSchema = new Schema({
  managedService: { type: Number, min: 0, max: 1, default: 0, required: true },
  qualifiedLeadsQuantity: { type: Number, min: 0, default: 0, required: true },
  qualifiedLeadsAmount: { type: Number, min: 0, required: true },
});

const pricePlanSchema = new Schema({
  name: { type: String, minLength: 1, maxLength: 255, required: true },
  default_plan: { type: Number, min: 0, max: 1, required: true },
  free_plan: { type: Number, min: 0, max: 1, required: true },
  amount_monthly: { type: Number, min: 0, required: true },
  amount_yearly: { type: Number, min: 0, required: true },
  description: { type: String, default: null },
  active: { type: Number, min: 0, max: 1, required: true },
  custom: { type: Number, min: 0, max: 1, default: null },
  smart_chat_module: { type: smartChatModuleSubSchema, required: true },
  managed_accounts_module: { type: managedAccountsModuleSubSchema, required: true },
}, { timestamps: true });

pricePlanSchema.index({ _id: 1 }, { unique: true });
pricePlanSchema.index({ name: 1 }, { unique: true });

export default mongoose.models.PricePlan || mongoose.model('PricePlan', pricePlanSchema);