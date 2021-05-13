const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv/config'); 

const User = require('./routes/User');
const Posts = require("./routes/Posts");
const Follower = require("./routes/Followers");
const Following = require("./routes/Following");
const Request = require("./routes/Request");
const Auth = require("./routes/Auth");
const GivenRequest = require("./routes/GivenRequest");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'images',
  allowedFormats: ['png', 'jpg', 'jpeg'],
  transformation: [{
      width: 600,
      height: 600,
      crop: "limit"
  }]
});



mongoose.connect(process.env.DATABASE_CONNECTION,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('DataBase Connected');
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({storage: imageStorage}).single('image'));
app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
}); 

app.use('/Auth',Auth);
app.use(User);
app.use(Posts);
app.use('/Followers',Follower);
app.use('/Following',Following);
app.use('/Request',Request);
app.use('/GivenRequest',GivenRequest);