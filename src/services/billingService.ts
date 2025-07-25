import { BillingRecord, BillingRecordCreate, BillingRecordUpdate } from '@/types/billing';
import BillingModel from '@/models/Billing';
import connectDB from '@/utils/db';

interface LeanBilling {
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
  __v?: number;
}

// Generate a unique external_id without uuid package
const generateExternalId = (): string => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36 for shorter string
  const randomStr = Math.random().toString(36).substring(2, 8); // 6-character random string
  return `inv_${timestamp}_${randomStr}`;
};

export class BillingService {
  static async getBillingRecords(query: {
    customer_id?: number;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<BillingRecord[]> {
    await connectDB();
    const { customer_id, status, page = 1, limit = 20 } = query;
    const filter: any = {};
    if (customer_id) filter.customer_id = customer_id;
    if (status) filter.invoice_status = status;

    const records = await BillingModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec() as LeanBilling[];

    return records.map((record) => ({
      id: record._id,
      external_id: record.external_id,
      customer_id: record.customer_id,
      customer_name: record.customer_name,
      customer_email: record.customer_email,
      billing_address: record.billing_address,
      amount_due: record.amount_due,
      amount_paid: record.amount_paid,
      amount_remaining: record.amount_remaining,
      currency: record.currency,
      invoice_status: record.invoice_status,
      created_date: record.created_date,
      total_quantity: record.total_quantity,
      item_description: record.item_description,
      payment_amount: record.payment_amount,
      payment_status: record.payment_status,
      payment_date: record.payment_date,
      payment_external_id: record.payment_external_id,
      cancellation_reason: record.cancellation_reason,
    }));
  }

  static async createBillingRecord(data: BillingRecordCreate): Promise<BillingRecord> {
    await connectDB();
    const id = await BillingModel.countDocuments() + 1; // Simulate auto-increment
    const external_id = generateExternalId();
    const record = await BillingModel.create({
      ...data,
      _id: id,
      external_id,
      amount_paid: 0,
      amount_remaining: data.amount_due,
      created_date: new Date(),
    });
    return record.toJSON() as BillingRecord;
  }

  static async getBillingRecord(id: number): Promise<BillingRecord | null> {
    await connectDB();
    const record = await BillingModel.findById(id).lean().exec() as LeanBilling | null;
    if (!record) return null;
    return {
      id: record._id,
      external_id: record.external_id,
      customer_id: record.customer_id,
      customer_name: record.customer_name,
      customer_email: record.customer_email,
      billing_address: record.billing_address,
      amount_due: record.amount_due,
      amount_paid: record.amount_paid,
      amount_remaining: record.amount_remaining,
      currency: record.currency,
      invoice_status: record.invoice_status,
      created_date: record.created_date,
      total_quantity: record.total_quantity,
      item_description: record.item_description,
      payment_amount: record.payment_amount,
      payment_status: record.payment_status,
      payment_date: record.payment_date,
      payment_external_id: record.payment_external_id,
      cancellation_reason: record.cancellation_reason,
    };
  }

  static async updateBillingRecord(id: number, data: BillingRecordUpdate): Promise<BillingRecord | null> {
    await connectDB();
    if (data.amount_due && data.amount_paid !== undefined) {
      data.amount_remaining = data.amount_due - data.amount_paid;
    }
    const record = await BillingModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean().exec() as LeanBilling | null;
    if (!record) return null;
    return {
      id: record._id,
      external_id: record.external_id,
      customer_id: record.customer_id,
      customer_name: record.customer_name,
      customer_email: record.customer_email,
      billing_address: record.billing_address,
      amount_due: record.amount_due,
      amount_paid: record.amount_paid,
      amount_remaining: record.amount_remaining,
      currency: record.currency,
      invoice_status: record.invoice_status,
      created_date: record.created_date,
      total_quantity: record.total_quantity,
      item_description: record.item_description,
      payment_amount: record.payment_amount,
      payment_status: record.payment_status,
      payment_date: record.payment_date,
      payment_external_id: record.payment_external_id,
      cancellation_reason: record.cancellation_reason,
    };
  }

  static async deleteBillingRecord(id: number): Promise<BillingRecord | null> {
    await connectDB();
    const record = await BillingModel.findByIdAndDelete(id).lean().exec() as LeanBilling | null;
    if (!record) return null;
    return {
      id: record._id,
      external_id: record.external_id,
      customer_id: record.customer_id,
      customer_name: record.customer_name,
      customer_email: record.customer_email,
      billing_address: record.billing_address,
      amount_due: record.amount_due,
      amount_paid: record.amount_paid,
      amount_remaining: record.amount_remaining,
      currency: record.currency,
      invoice_status: record.invoice_status,
      created_date: record.created_date,
      total_quantity: record.total_quantity,
      item_description: record.item_description,
      payment_amount: record.payment_amount,
      payment_status: record.payment_status,
      payment_date: record.payment_date,
      payment_external_id: record.payment_external_id,
      cancellation_reason: record.cancellation_reason,
    };
  }

  static async searchBillingRecords(query: {
    customer_id?: number;
    status?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<BillingRecord[]> {
    await connectDB();
    const { customer_id, status, date_from, date_to } = query;
    const filter: any = {};
    if (customer_id) filter.customer_id = customer_id;
    if (status) filter.invoice_status = status;
    if (date_from || date_to) {
      filter.created_date = {};
      if (date_from) filter.created_date.$gte = new Date(date_from);
      if (date_to) filter.created_date.$lte = new Date(date_to);
    }

    const records = await BillingModel.find(filter).lean().exec() as LeanBilling[];
    return records.map((record) => ({
      id: record._id,
      external_id: record.external_id,
      customer_id: record.customer_id,
      customer_name: record.customer_name,
      customer_email: record.customer_email,
      billing_address: record.billing_address,
      amount_due: record.amount_due,
      amount_paid: record.amount_paid,
      amount_remaining: record.amount_remaining,
      currency: record.currency,
      invoice_status: record.invoice_status,
      created_date: record.created_date,
      total_quantity: record.total_quantity,
      item_description: record.item_description,
      payment_amount: record.payment_amount,
      payment_status: record.payment_status,
      payment_date: record.payment_date,
      payment_external_id: record.payment_external_id,
      cancellation_reason: record.cancellation_reason,
    }));
  }
}