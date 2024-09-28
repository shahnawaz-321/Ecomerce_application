const express = require('express');
const moongoose = require('mongoose');
const router = require('./Routes/userRoutes');
const cookie = require('cookie-parser');
const cloudinary = require('cloudinary');
const router1 = require('./Routes/productRoutes');
const router2 = require('./Routes/CategoryRoutes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 2000;
const url = process.env.MONGODB_URI;
app.use(cookie());
app.use(express.json());
//app.use('/v1', router);

moongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongodb connected successfully');
  })
  .catch((error) => {
    console.error('mongodb connection errors', error);
  });

app.listen(port, () => {
  console.log(`out port is running on ${port}`);
});
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});
//middleware configuration
app.use('/v1', router);

app.use('/v2', router1);

app.use('/v3', router2);
