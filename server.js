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
const Posts = require('./routes/Posts');
const Follower = require('./routes/Followers');
const Following = require('./routes/Following');
const Request = require('./routes/Request');
const Auth = require('./routes/Auth');
const GivenRequest = require('./routes/GivenRequest');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  folder: 'images',
  allowedFormats: ['png', 'jpg', 'jpeg'],
  transformation: [{
    width: 600,
    height: 600,
    crop: 'limit',
  }],
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('DataBase Connected');
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: imageStorage }).single('image'));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

app.use('/',Auth);
app.use('/auth', Auth);
app.use(User);
app.use(Posts);
app.use('/followers', Follower);
app.use('/following', Following);
app.use('/request', Request);
app.use('/given-request', GivenRequest);
