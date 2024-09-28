const categoryModel = require('../models/CategoryModel');

const add_category = async (req, res) => {
  try {
    const { category } = req.body;
    const create_product = await categoryModel.create({
      category,
    });
    const add_product = await create_product.save();
    res.status(200).json({
      success: true,
      message: 'product added successfully',
      add_product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server error',
    });
  }
};
const update_category = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const category = req.body;
    console.log(category);
    const product = await categoryModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product is not found',
      });
    }
    const updateproduct = await categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'product updated successfully',
      updateproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server error',
    });
  }
};

const delete_category = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log(id);
    const product = await categoryModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'product deleted successfuly',
    });
    //await categoryModel.deleteOne(id);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server error',
    });
  }
};
module.exports = { add_category, update_category, delete_category };
