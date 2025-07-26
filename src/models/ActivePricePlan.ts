import mongoose, { Schema } from 'mongoose';

const activePricePlanSchema = new Schema({
  name: { type: String, maxLength: 255, default: null },
  paymentPeriod: { type: String, minLength: 1, maxLength: 50, required: true },
  maxActiveUsersQuantity: { type: Number, min: 0, default: 0, required: true },
  totalActiveUsersQuantity: { type: Number, min: 0, default: 0, required: true },
  maxWebsiteQuantity: { type: Number, min: 0, default: 0, required: true },
  totalWebsiteQuantity: { type: Number, min: 0, default: 0, required: true },
  maxChatHistoryQuantity: { type: Number, min: 0, default: 0, required: true },
  totalChatHistoryQuantity: { type: Number, min: 0, default: 0, required: true },
  maxActiveChatQuantity: { type: Number, min: 0, default: 0, required: true },
  totalActiveChatQuantity: { type: Number, min: 0, default: 0, required: true },
  maxQualifiedLeadsQuantity: { type: Number, min: 0, default: 0, required: true },
  totalQualifiedLeadsQuantity: { type: Number, min: 0, default: 0, required: true },
  chatTakeover: { type: Number, min: 0, max: 1, default: 0, required: true },
  chatTagging: { type: Number, min: 0, max: 1, default: 0, required: true },
  managedService: { type: Number, min: 0, max: 1, default: 0, required: true },
  chatTranscript: { type: Number, min: 0, max: 1, default: 0, required: true },
  plan_id: { type: Schema.Types.ObjectId, required: true },
  expiresAt: { type: Date, required: true },
  openAiIncluded: { type: Number, min: 0, max: 1, default: 0 },
  subscriptionScheduleId: { type: String, maxLength: 255, default: null },
  meteredSubscriptionScheduleId: { type: String, maxLength: 255, default: null },
  subscriptionId: { type: String, maxLength: 255, default: null },
  extraChat: { type: String, maxLength: 255, default: null },
  extraDayOfChatHistory: { type: String, maxLength: 255, default: null },
  extraUser: { type: String, maxLength: 255, default: null },
  extraWebsite: { type: String, maxLength: 255, default: null },
  extraQualifiedLead: { type: String, maxLength: 255, default: null },
}, { timestamps: true });

activePricePlanSchema.index({ _id: 1 }, { unique: true });
activePricePlanSchema.index({ plan_id: 1 });

export default mongoose.models.ActivePricePlan || mongoose.model('ActivePricePlan', activePricePlanSchema);