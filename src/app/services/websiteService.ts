import { Website, WebsiteCreate, WebsiteUpdate, ErrorResponse } from '../types/website';
import WebsiteModel from '../models/website';
import connectDB from '../utils/db';
import mongoose from 'mongoose';

interface LeanWebsite {
  _id?: mongoose.Types.ObjectId;
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
  __v?: number;
}

export class WebsiteService {
  static async getWebsites(query: {
    is_template?: number;
    company_id?: number;
    domain?: string;
  }): Promise<Website[]> {
    await connectDB();
    const websites = await WebsiteModel.find(query).lean().exec() as LeanWebsite[];
    return websites.map((website) => ({
      id: website._id?.toString(),
      is_template: website.is_template ?? 0,
      created_by_id: website.created_by_id,
      company_id: website.company_id,
      created_timestamp: website.created_timestamp,
      business_category: website.business_category,
      business_subcategory: website.business_subcategory,
      domain: website.domain,
      api_token: website.api_token,
      api_topic: website.api_topic,
      zapier_api_key: website.zapier_api_key,
      show_chatbox_on_mobile: website.show_chatbox_on_mobile,
      show_chatbox_on_desktop: website.show_chatbox_on_desktop,
      avatar_type: website.avatar_type,
      post_agent_response_message_enabled: website.post_agent_response_message_enabled,
      use_global_notification_settings: website.use_global_notification_settings,
      queue_message_id: website.queue_message_id,
      eye_catcher_id: website.eye_catcher_id,
      chat_widget_id: website.chat_widget_id,
      assistant_id: website.assistant_id,
      chat_bot_id: website.chat_bot_id,
      business_category_template_id: website.business_category_template_id,
      email_notifications: website.email_notifications,
      push_notifications: website.push_notifications,
      notification_settings_all_emails: website.notification_settings_all_emails,
      notification_settings_lead_emails: website.notification_settings_lead_emails,
      notification_settings_service_chat_emails: website.notification_settings_service_chat_emails,
      use_the_same_email: website.use_the_same_email,
      lead_generated_notification: website.lead_generated_notification,
      service_chat_generated_notification: website.service_chat_generated_notification,
      greeting_id: website.greeting_id,
      target_url: website.target_url,
      time: website.time,
      tag_ids: website.tag_ids,
      smart_response_ids: website.smart_response_ids,
      website_template_id: website.website_template_id,
    }));
  }

  static async createWebsite(data: WebsiteCreate): Promise<Website> {
    await connectDB();
    if (!('is_template' in data)) {
      throw new Error('is_template is required');
    }
    if (data.api_token) {
      const existing = await WebsiteModel.findOne({ api_token: data.api_token }).lean() as LeanWebsite | null;
      if (existing) {
        throw new Error('API token must be unique');
      }
    }
    const website = await WebsiteModel.create(data);
    return website.toJSON() as Website;
  }

  static async getWebsite(id: string): Promise<Website | null> {
    await connectDB();
    const website = await WebsiteModel.findById(id).lean().exec() as LeanWebsite | null;
    if (!website) return null;
    return {
      id: website._id?.toString(),
      is_template: website.is_template ?? 0,
      created_by_id: website.created_by_id,
      company_id: website.company_id,
      created_timestamp: website.created_timestamp,
      business_category: website.business_category,
      business_subcategory: website.business_subcategory,
      domain: website.domain,
      api_token: website.api_token,
      api_topic: website.api_topic,
      zapier_api_key: website.zapier_api_key,
      show_chatbox_on_mobile: website.show_chatbox_on_mobile,
      show_chatbox_on_desktop: website.show_chatbox_on_desktop,
      avatar_type: website.avatar_type,
      post_agent_response_message_enabled: website.post_agent_response_message_enabled,
      use_global_notification_settings: website.use_global_notification_settings,
      queue_message_id: website.queue_message_id,
      eye_catcher_id: website.eye_catcher_id,
      chat_widget_id: website.chat_widget_id,
      assistant_id: website.assistant_id,
      chat_bot_id: website.chat_bot_id,
      business_category_template_id: website.business_category_template_id,
      email_notifications: website.email_notifications,
      push_notifications: website.push_notifications,
      notification_settings_all_emails: website.notification_settings_all_emails,
      notification_settings_lead_emails: website.notification_settings_lead_emails,
      notification_settings_service_chat_emails: website.notification_settings_service_chat_emails,
      use_the_same_email: website.use_the_same_email,
      lead_generated_notification: website.lead_generated_notification,
      service_chat_generated_notification: website.service_chat_generated_notification,
      greeting_id: website.greeting_id,
      target_url: website.target_url,
      time: website.time,
      tag_ids: website.tag_ids,
      smart_response_ids: website.smart_response_ids,
      website_template_id: website.website_template_id,
    };
  }

  static async updateWebsite(id: string, data: WebsiteUpdate): Promise<Website | null> {
    await connectDB();
    if (data.api_token) {
      const existing = await WebsiteModel.findOne({ api_token: data.api_token, _id: { $ne: id } }).lean() as LeanWebsite | null;
      if (existing) {
        throw new Error('API token must be unique');
      }
    }
    const website = await WebsiteModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean().exec() as LeanWebsite | null;
    if (!website) return null;
    return {
      id: website._id?.toString(),
      is_template: website.is_template ?? 0,
      created_by_id: website.created_by_id,
      company_id: website.company_id,
      created_timestamp: website.created_timestamp,
      business_category: website.business_category,
      business_subcategory: website.business_subcategory,
      domain: website.domain,
      api_token: website.api_token,
      api_topic: website.api_topic,
      zapier_api_key: website.zapier_api_key,
      show_chatbox_on_mobile: website.show_chatbox_on_mobile,
      show_chatbox_on_desktop: website.show_chatbox_on_desktop,
      avatar_type: website.avatar_type,
      post_agent_response_message_enabled: website.post_agent_response_message_enabled,
      use_global_notification_settings: website.use_global_notification_settings,
      queue_message_id: website.queue_message_id,
      eye_catcher_id: website.eye_catcher_id,
      chat_widget_id: website.chat_widget_id,
      assistant_id: website.assistant_id,
      chat_bot_id: website.chat_bot_id,
      business_category_template_id: website.business_category_template_id,
      email_notifications: website.email_notifications,
      push_notifications: website.push_notifications,
      notification_settings_all_emails: website.notification_settings_all_emails,
      notification_settings_lead_emails: website.notification_settings_lead_emails,
      notification_settings_service_chat_emails: website.notification_settings_service_chat_emails,
      use_the_same_email: website.use_the_same_email,
      lead_generated_notification: website.lead_generated_notification,
      service_chat_generated_notification: website.service_chat_generated_notification,
      greeting_id: website.greeting_id,
      target_url: website.target_url,
      time: website.time,
      tag_ids: website.tag_ids,
      smart_response_ids: website.smart_response_ids,
      website_template_id: website.website_template_id,
    };
  }

  static async deleteWebsite(id: string): Promise<Website | null> {
    await connectDB();
    const website = await WebsiteModel.findByIdAndDelete(id).lean().exec() as LeanWebsite | null;
    if (!website) return null;
    return {
      id: website._id?.toString(),
      is_template: website.is_template ?? 0,
      created_by_id: website.created_by_id,
      company_id: website.company_id,
      created_timestamp: website.created_timestamp,
      business_category: website.business_category,
      business_subcategory: website.business_subcategory,
      domain: website.domain,
      api_token: website.api_token,
      api_topic: website.api_topic,
      zapier_api_key: website.zapier_api_key,
      show_chatbox_on_mobile: website.show_chatbox_on_mobile,
      show_chatbox_on_desktop: website.show_chatbox_on_desktop,
      avatar_type: website.avatar_type,
      post_agent_response_message_enabled: website.post_agent_response_message_enabled,
      use_global_notification_settings: website.use_global_notification_settings,
      queue_message_id: website.queue_message_id,
      eye_catcher_id: website.eye_catcher_id,
      chat_widget_id: website.chat_widget_id,
      assistant_id: website.assistant_id,
      chat_bot_id: website.chat_bot_id,
      business_category_template_id: website.business_category_template_id,
      email_notifications: website.email_notifications,
      push_notifications: website.push_notifications,
      notification_settings_all_emails: website.notification_settings_all_emails,
      notification_settings_lead_emails: website.notification_settings_lead_emails,
      notification_settings_service_chat_emails: website.notification_settings_service_chat_emails,
      use_the_same_email: website.use_the_same_email,
      lead_generated_notification: website.lead_generated_notification,
      service_chat_generated_notification: website.service_chat_generated_notification,
      greeting_id: website.greeting_id,
      target_url: website.target_url,
      time: website.time,
      tag_ids: website.tag_ids,
      smart_response_ids: website.smart_response_ids,
      website_template_id: website.website_template_id,
    };
  }
}
