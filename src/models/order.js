import mongoose  from 'mongoose'

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      totalPrice: Number,
      img: String
    }
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped','delivered', 'cancelled'],
    default: 'pending'
  },
  updateHistory: [
    {
      status: String,
      date: { type: Date, default: Date.now },
      note: String
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);
export default Order;