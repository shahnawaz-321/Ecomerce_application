const ProductModel = require('../models/ProductModel');
const getDatauri = require('../Utils/feature');
const cloudinary = require('cloudinary');
const Get_products = async (req, res) => {
  try {
    const product = await ProductModel.find({});
    res.status(200).json({
      success: true,
      message: 'all products',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server errors',
      error,
    });
  }
};
const create_products = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    //console.log(req.body);

    if (!name || !description || !price || !stock) {
      return res.status(500).json({
        success: false,
        message: 'please provide all fields',
      });
    }
    if (!req.file) {
      return res.status(500).json({
        success: 'false',
        message: 'please provide products image',
      });
    }

    const file = getDatauri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.url,
    };

    const create_product = await ProductModel.create({
      name,
      description,
      price,
      stock,
      images: [image],
    });
    const save_product = await create_product.save();
    res.status(200).json({
      sucess: true,
      message: 'product added successfully',
      save_product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server errors',
      error,
    });
  }
};
const get_productbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: 'product not found',
      });
    }
    res.status(404).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server errors',
      error,
    });
  }
};

const updateproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, stock, price } = req.body;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: 'product not found',
      });
    }
    if (name) {
      product.name = name;
    }
    res.status(200).json({
      success: true,
      message: 'product updated successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server errors',
      error,
    });
  }
};
//update image of product

const upadate_imageproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: 'false',
        message: 'product is not found',
      });
    }
    if (!req.file) {
      return res.status(404).json({
        success: 'false',
        message: 'product image not found',
      });
    }
    const file = getDatauri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    product.images.push(image);
    res.status(200).json({
      success: true,
      message: 'image updated successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server errors',
      error,
    });
  }
};
const delete_product = async (req, res) => {
  try {
    const product_id = req.params.id;
    const product = await ProductModel.findById(product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }
    const id = req.query.id;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: 'product image is not found',
      });
    }
    let idx = -1;
    product.images.forEach((item, index) => {
      if (item._id.toString() === item.id.toString()) {
        idx = index;
      }
    });
    if (idx < 0) {
      return res.status(404).json({
        success: false,
        message: 'image not found',
      });
    }
    await cloudinary.v2.uploader.destroy(product.images[idx].public_id);
    //for deleteing the image
    product.images.splice(idx, 1);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'image deleted successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'server errors',
      error,
    });
  }
};
module.exports = {
  Get_products,
  create_products,
  get_productbyid,
  updateproduct,
  upadate_imageproduct,
  delete_product,
};
//ProductModel
