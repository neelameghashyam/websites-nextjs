import mongoose, { Schema } from 'mongoose';

const productPriceSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  priceId: { type: String, minLength: 1, maxLength: 255, required: true },
}, { timestamps: true });

productPriceSchema.index({ _id: 1 }, { unique: true });
productPriceSchema.index({ productId: 1 });

export default mongoose.models.ProductPrice || mongoose.model('ProductPrice', productPriceSchema);
