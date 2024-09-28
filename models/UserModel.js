//const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.SECRET;
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      unique: [true, 'emails already taken'],
      required: [true, 'emails is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlenght: [6, 'password length should be greater than 6 characters'],
    },
    adress: {
      type: String,
      required: [true, 'adress is required'],
    },
    city: {
      type: String,
      required: [true, 'city name is required'],
    },
    country: {
      type: String,
      required: [true, 'country name is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone number is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilepic: {
      public_id: {
        //we get from cloudinary
        type: String,
      },
      url: {
        type: String, //we get URL FROM cloudinary
      },
    },
  },
  {
    timestamps: true,
  }
);
//
//console.log(Secret_key);
UserSchema.methods.generateToken = function () {
  if (!secret_key) {
    console.log(secret_key);
    throw new Error('Secret key is not valid'); // Additional error handling
  }
  return jwt.sign({ _id: this._id }, secret_key, {
    expiresIn: '7d',
  });
};
const User = mongoose.model('User', UserSchema);
module.exports = User;
