import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, minLength: 1, maxLength: 255, required: true },
}, { timestamps: true });

productSchema.index({ _id: 1 }, { unique: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);