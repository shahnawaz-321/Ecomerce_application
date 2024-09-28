const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'product name is required'],
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model('categoryModel', categorySchema);

module.exports = categoryModel;
