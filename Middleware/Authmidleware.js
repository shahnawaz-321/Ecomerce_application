const jwt = require('jsonwebtoken');
//const express = require('express');
//const cookieParser = require('cookie-parser');
const User = require('../models/UserModel'); // Adjust the path as needed

const isauth = async (req, res, next) => {
  //  console.log(req.cookies); // Corrected to lowercase 'cookies'

  const { token } = req.cookies || {}; // Access cookies correctly
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'unauthorized token',
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.SECRET); // Corrected variable name
    req.user = await User.findById(decodedData._id); // Ensure User model is correctly set up
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

module.exports = isauth;
