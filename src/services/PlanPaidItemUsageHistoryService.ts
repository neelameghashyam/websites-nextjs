import PlanPaidItemUsageHistory from '../models/PlanPaidItemUsageHistory';

export class PlanPaidItemUsageHistoryService {
  async getAll() {
    return await PlanPaidItemUsageHistory.find().lean();
  }

  async getByCustomerIdAndDate(customerId: number, createdDate: string) {
    // Parse the input date
    const startDate = new Date(createdDate);
    if (isNaN(startDate.getTime())) throw new Error('Invalid date');

    // Set the end date to the end of the day
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    // Query for records where created_date is within the date range
    const record = await PlanPaidItemUsageHistory.findOne({
      customer_id: customerId,
      created_date: { $gte: startDate, $lte: endDate },
    }).lean();

    if (!record) throw new Error('PlanPaidItemUsageHistory not found');
    return record;
  }

  async create(data: any) {
    return await PlanPaidItemUsageHistory.create(data);
  }

  async update(customerId: number, createdDate: string, data: any) {
    const startDate = new Date(createdDate);
    if (isNaN(startDate.getTime())) throw new Error('Invalid date');

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    const record = await PlanPaidItemUsageHistory.findOneAndUpdate(
      { customer_id: customerId, created_date: { $gte: startDate, $lte: endDate } },
      data,
      { new: true, runValidators: true }
    ).lean();

    if (!record) throw new Error('PlanPaidItemUsageHistory not found');
    return record;
  }

  async delete(customerId: number, createdDate: string) {
    const startDate = new Date(createdDate);
    if (isNaN(startDate.getTime())) throw new Error('Invalid date');

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    const record = await PlanPaidItemUsageHistory.findOneAndDelete({
      customer_id: customerId,
      created_date: { $gte: startDate, $lte: endDate },
    }).lean();

    if (!record) throw new Error('PlanPaidItemUsageHistory not found');
    return true;
  }
}