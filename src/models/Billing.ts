import mongoose, { Schema, Document } from 'mongoose';
import { BillingRecord } from '@/types/billing';

interface BillingDocument extends Document {
  _id: number;
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

const BillingSchema = new Schema<BillingDocument>({
  _id: { type: Number, required: true },
  external_id: { type: String, required: true, unique: true },
  customer_id: { type: Number, required: true },
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  billing_address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postal_code: { type: String, required: false },
    country: { type: String, required: false },
  },
  amount_due: { type: Number, required: true },
  amount_paid: { type: Number, required: true, default: 0 },
  amount_remaining: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true },
  invoice_status: { type: String, enum: ['draft', 'open', 'paid', 'void', 'uncollectible'], required: true },
  created_date: { type: Date, required: true },
  total_quantity: { type: Number, required: true },
  item_description: { type: String, required: true },
  payment_amount: { type: Number, required: false },
  payment_status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], required: false },
  payment_date: { type: Date, required: false },
  payment_external_id: { type: String, required: false },
  cancellation_reason: { type: String, required: false },
}, {
  timestamps: false,
  toJSON: {
    transform: (doc, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

BillingSchema.index({ customer_id: 1 }, { name: 'idx_billing_customer_id' });
BillingSchema.index({ external_id: 1 }, { unique: true, name: 'idx_billing_external_id' });

export default mongoose.models.Billing || mongoose.model<BillingDocument>('Billing', BillingSchema);
