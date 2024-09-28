const express = require('express');
const {
  create_products,
  Get_products,
  get_productbyid,
  updateproduct,
  upadate_imageproduct,
  delete_product,
} = require('../Controller/productControler');
const single_upload = require('../Middleware/multer');
const isauth = require('../Middleware/Authmidleware');
//const Get_products = require('../Controller/productControler');

const router1 = express.Router();

router1.post('/post_product', isauth, single_upload, create_products);

//for getting all the products
router1.get('/get_product', isauth, Get_products);

//for getting products on the basis of id
router1.get('/get_product/:id', isauth, get_productbyid);

//for updating the product
router1.put('/update_product/:id', isauth, updateproduct);

//for updating the image on the basis of particular id
router1.put('/image_update/:id', isauth, single_upload, upadate_imageproduct);

//for deleteing the image on the basis of particular id

router1.delete('/image_delete/:id', isauth, single_upload, delete_product);

module.exports = router1;
