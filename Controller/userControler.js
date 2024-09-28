const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const getDatauri = require('../Utils/feature');
const cloudinary = require('cloudinary');
require('dotenv').config();
const userControler = async (req, res) => {
  try {
    const { name, email, password, adress, city, country, phone } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !adress ||
      !city ||
      !country ||
      !phone
    ) {
      return res.status(500).json({
        success: false,
        message: 'please provide all fields',
      });
    }
    const existuser = await User.findOne({
      email,
    });
    if (existuser) {
      return res.status(500).json({
        success: false,
        message: 'email is already taken',
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      adress,
      city,
      country,
      phone,
    });

    const newuser = await user.save();
    res.status(201).json({
      success: true,
      message: 'registration successfully',
      newuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'errors in register API ',
      error,
    });
  }
};
//module.exports = userControler;
const logincontroler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      success: false,
      message: 'please enter email and password',
    });
  }
  try {
    const existuser = await User.findOne({
      email,
    });
    //console.log(existuser.password);
    if (!existuser) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }
    //console.log(password);
    const ismatch = await bcrypt.compare(password, existuser.password);
    //console.log(ismatch);
    if (!ismatch) {
      return res.status(500).json({
        success: false,
        message: 'invalid crediantials',
      });
    }
    const token = existuser.generateToken();
    //console.log(token);
    existuser.password = undefined;
    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'development' ? true : false,
        httpOnly: process.env.NODE_ENV === 'development' ? true : false,
        samesite: process.env.NODE_ENV === 'developmen' ? true : false,
      })
      .json({
        success: true,
        message: 'login successfully',
        token,
        existuser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error in api',
      error,
    });
  }
};

const getUserprofileContoler = async (req, res) => {
  try {
    const existuser = await User.findById(req.user._id);
    if (!existuser) {
      return res.status(404).json({
        success: false,
        message: 'unauthorized person',
      });
    }
    // console.log(existuser);
    res.status(200).json({
      message: 'suucessfully',
      existuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'erroro in profile API',
      error,
    });
  }
};
const logoutControler = async (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'development' ? true : false,
        httpOnly: process.env.NODE_ENV === 'development' ? true : false,
        samesite: process.env.NODE_ENV === 'developmen' ? true : false,
      })
      .json({
        success: true,
        message: 'logout successfully',
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'erroro in profile API',
      error,
    });
  }
};
const updateprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const data = req.body;
    const updateprofile = await User.findByIdAndUpdate(user._id, data, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'User profile updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'erroro in profile API',
      error,
    });
  }
};

const changepassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    //console.log(req.body);
    if (!oldpassword || !newpassword) {
      return res.status(500).json({
        success: false,
        message: 'please provide new or old password',
      });
    }
    const isexist = await User.findById(req.user._id);
    if (!isexist) {
      return res.status(404).json({
        success: 'false',
        message: 'user not exists',
      });
    }
    const ismatch = bcrypt.compare(oldpassword, isexist.password);
    if (!ismatch) {
      return res.status(404).json({
        success: 'false',
        message: 'password is  not correct',
      });
    }
    // const passwordchange=await User.findByIdAndUpdate(isexist._id,isexist.password:newpassword)
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    isexist.password = hashedPassword;
    await isexist.save();

    res.status(200).json({
      success: true,
      message: 'password changed successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'erroro in profile API',
      error,
    });
  }
};

//update user profile photo
const upadteprofile_pic = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const file = getDatauri(req.file);
    //it will be give the content of the image image
    // console.log(file);
    await cloudinary.v2.uploader.destroy(user.profilepic.public_id);

    const cdb = await cloudinary.v2.uploader.upload(file.content);
    //it will be give an objects that will be contain the image urls and public_id
    //console.log(cdb);
    user.profilepic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    await user.save();
    res.status(200).json({
      suceess: true,
      message: 'profile image updataed',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'erroro in update_profile API',
      error,
    });
  }
};
module.exports = {
  logincontroler,
  userControler,
  getUserprofileContoler,
  logoutControler,
  updateprofile,
  changepassword,
  upadteprofile_pic,
};
