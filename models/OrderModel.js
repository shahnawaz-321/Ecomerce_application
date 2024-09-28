const mongoose = require('mongoose');

const order_Schema = new mongoose.Schema(
  {
    shippingInfo: {
      adress: {
        type: String,
        required: [true, 'Adress is required'],
      },
      city: {
        type: String,
        required: [true, 'city name is required'],
      },
      country: {
        type: String,
        required: [true, 'country name is required'],
      },
    },
    orderItem: {
      name: {
        type: String,
        required: [true, 'order name is required'],
      },
      price: {
        type: Number,
        required: [true, 'product price is required'],
      },
      quantity: {
        type: String,
        required: [true, 'no of product item is required'],
      },
      image: {
        type: String,
        required: [true, 'product image is required'],
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel',
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    shippingCharges: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: [true, 'item total amount required'],
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered'],
      default: 'processing',
    },
  },
  { timestamps: true }
);

const order = mongoose.model('order', order_Schema);

module.exports = order;
