const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: Number,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  delstatus: {
    type: String,
    enum: ["Pending", "Processing", "Delivered"],
    required: true,
    default: "Pending"
  }
}, { timestamps: true });

const Order = mongoose.model('product_order', orderSchema);
module.exports = Order;
