const express = require('express');
const {
  userControler,
  getUserprofileContoler,
  logoutControler,
  updateprofile,
  changepassword,
  upadteprofile_pic,
} = require('../Controller/userControler');
const { logincontroler } = require('../Controller/userControler');
const isauth = require('../Middleware/Authmidleware');
const single_upload = require('../Middleware/multer');
//const router1 = require('./productRoutes');
//const { delete_product } = require('../Controller/productControler');
const router = express.Router();
//Register routes
router.post('/register', userControler);
//Login routes

router.post('/login', logincontroler);

router.get('/profile', isauth, getUserprofileContoler);

router.get('/logout', isauth, logoutControler);

router.put('/update_profile', isauth, updateprofile);

//routes for updatig the password

router.put('/password_change', isauth, changepassword);

//routes for updating the profile pic

router.put('/update_image', single_upload, isauth, upadteprofile_pic);

//routes for deleting the image ///

//router1.delete('/delete_image/:id', isauth, single_upload, delete_product);

module.exports = router;
//userControler
//userControler.logincontroler
