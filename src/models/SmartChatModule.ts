import mongoose, { Schema } from 'mongoose';

const smartChatModuleSchema = new Schema({
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
}, { timestamps: true });

smartChatModuleSchema.index({ _id: 1 }, { unique: true });

export default mongoose.models.SmartChatModule || mongoose.model('SmartChatModule', smartChatModuleSchema);