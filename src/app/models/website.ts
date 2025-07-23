import mongoose, { Schema, Document } from 'mongoose';
import { Website } from '../types/website';

interface WebsiteDocument extends Document {
  is_template: number;
  created_by_id?: number;
  company_id?: number;
  created_timestamp?: Date;
  business_category?: string;
  business_subcategory?: string;
  domain?: string;
  api_token?: string;
  api_topic?: string;
  zapier_api_key?: string;
  show_chatbox_on_mobile?: number;
  show_chatbox_on_desktop?: number;
  avatar_type?: string;
  post_agent_response_message_enabled?: number;
  use_global_notification_settings?: number;
  queue_message_id?: number;
  eye_catcher_id?: number;
  chat_widget_id?: number;
  assistant_id?: number;
  chat_bot_id?: number;
  business_category_template_id?: number;
  email_notifications?: number;
  push_notifications?: number;
  notification_settings_all_emails?: string;
  notification_settings_lead_emails?: string;
  notification_settings_service_chat_emails?: string;
  use_the_same_email?: number;
  lead_generated_notification?: number;
  service_chat_generated_notification?: number;
  greeting_id?: number;
  target_url?: string;
  time?: number;
  tag_ids?: string;
  smart_response_ids?: string;
  website_template_id?: number;
}

const WebsiteSchema = new Schema<WebsiteDocument>({
  is_template: { type: Number, enum: [0, 1], required: true, default: 0 },
  created_by_id: { type: Number, required: false },
  company_id: { type: Number, required: false },
  created_timestamp: { type: Date, required: false },
  business_category: { type: String, required: false },
  business_subcategory: { type: String, required: false },
  domain: { type: String, required: false },
  api_token: { type: String, required: false, unique: true, sparse: true },
  api_topic: { type: String, required: false },
  zapier_api_key: { type: String, required: false },
  show_chatbox_on_mobile: { type: Number, required: false },
  show_chatbox_on_desktop: { type: Number, required: false },
  avatar_type: { type: String, default: 'AGENT_AVATAR' },
  post_agent_response_message_enabled: { type: Number, default: 0 },
  use_global_notification_settings: { type: Number, default: 1 },
  queue_message_id: { type: Number, required: false },
  eye_catcher_id: { type: Number, required: false },
  chat_widget_id: { type: Number, required: false },
  assistant_id: { type: Number, required: false },
  chat_bot_id: { type: Number, required: false },
  business_category_template_id: { type: Number, required: false },
  email_notifications: { type: Number, required: false },
  push_notifications: { type: Number, required: false },
  notification_settings_all_emails: { type: String, required: false },
  notification_settings_lead_emails: { type: String, required: false },
  notification_settings_service_chat_emails: { type: String, required: false },
  use_the_same_email: { type: Number, default: 1 },
  lead_generated_notification: { type: Number, default: 0 },
  service_chat_generated_notification: { type: Number, default: 0 },
  greeting_id: { type: Number, required: false },
  target_url: { type: String, required: false },
  time: { type: Number, default: 0 },
  tag_ids: { type: String, required: false },
  smart_response_ids: { type: String, required: false },
  website_template_id: { type: Number, required: false },
}, {
  timestamps: false,
  toJSON: {
    virtuals: true,
    transform: (doc: Document, ret: any) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

// Indexes to match SQL schema
WebsiteSchema.index({ company_id: 1 });
WebsiteSchema.index({ queue_message_id: 1 });
WebsiteSchema.index({ eye_catcher_id: 1 });
WebsiteSchema.index({ chat_widget_id: 1 });
WebsiteSchema.index({ assistant_id: 1 });
WebsiteSchema.index({ chat_bot_id: 1 });
WebsiteSchema.index({ business_category_template_id: 1 });
WebsiteSchema.index({ website_template_id: 1 });
WebsiteSchema.index({ greeting_id: 1 });
WebsiteSchema.index({ domain: 1 });
WebsiteSchema.index({ api_token: 1 });

export default mongoose.models.Website || mongoose.model<WebsiteDocument>('Website', WebsiteSchema);
