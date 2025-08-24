const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  sizes: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Crushed Stone", "Sand", "Gravel", "Concrete", "Aggregate", "Other"],
    required: true,
    default: "Other"
  }
}, { timestamps: true });

const Product = mongoose.model('crusher-stone', productSchema);

module.exports = Product;
