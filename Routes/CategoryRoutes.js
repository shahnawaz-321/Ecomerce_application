const express = require('express');
const isauth = require('../Middleware/Authmidleware');
const {
  add_category,
  update_category,
  delete_category,
} = require('../Controller/CategoryControler');

const router2 = express.Router();

router2.post('/category_post', isauth, add_category);

router2.put('/update_category/:id', isauth, update_category);

router2.delete('/delete_category/:id', isauth, delete_category);

module.exports = router2;
