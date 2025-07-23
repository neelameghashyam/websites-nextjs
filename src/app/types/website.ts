export interface Website {
  id?: string; // Added for API response compatibility
  is_template: number; // 1 for template, 0 for website instance
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

export interface WebsiteCreate extends Omit<Website, 'id'> {}

export interface WebsiteUpdate extends Partial<WebsiteCreate> {}

export interface ErrorResponse {
  code: string;
  message: string;
}
