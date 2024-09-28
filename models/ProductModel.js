const moongoose = require('mongoose');

const productSchema = new moongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'product name is required '],
    },
    description: {
      type: String,
      required: [true, 'product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    stock: {
      type: Number,
      required: [true, 'product stock is required'],
    },
    category: {
      type: moongoose.Schema.Types.ObjectId,
      ref: 'categoryModel',
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

const ProductModel = moongoose.model('ProductModel', productSchema);

module.exports = ProductModel;
