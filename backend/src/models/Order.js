import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    size: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderReference: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, default: '' },
    customerPhone: { type: String, required: true },
    shippingAddress: {
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
      altPhone: { type: String, default: '' },
      note: { type: String, default: '' },
    },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    shippingCost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, default: 'Cash On Delivery' },
    paymentStatus: { type: String, default: 'Pending' },
    orderDate: { type: String, default: '' },
    estimatedDeliveryDate: { type: String, default: '' },
    thankYouMessage: { type: String, default: 'Thank you for shopping with us!' },
    contactEmail: { type: String, default: '' },
    contactPhone: { type: String, default: '' },
    // Email delivery tracking
    emailStatus: { type: String, enum: ['pending', 'sent', 'partial', 'failed', ''], default: '' },
    emailFailureNote: { type: String, default: '' },
    // SMS delivery tracking
    smsStatus: { type: String, enum: ['pending', 'sent', 'failed', ''], default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);