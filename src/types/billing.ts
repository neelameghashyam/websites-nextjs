export interface BillingRecord {
  id: number;
  external_id: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  billing_address?: {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  currency: string;
  invoice_status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  created_date: Date;
  total_quantity: number;
  item_description: string;
  payment_amount?: number;
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_date?: Date;
  payment_external_id?: string;
  cancellation_reason?: string;
}

export interface BillingRecordCreate {
  customer_id: number;
  customer_name: string;
  customer_email: string;
  billing_address?: {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  amount_due: number;
  currency: string;
  invoice_status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  total_quantity: number;
  item_description: string;
}

export interface BillingRecordUpdate extends Partial<BillingRecordCreate> {
  amount_paid?: number;
  amount_remaining?: number;
  payment_amount?: number;
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_date?: Date;
  payment_external_id?: string;
  cancellation_reason?: string;
}

export interface ErrorResponse {
  error: string;
}
