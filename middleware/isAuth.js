const jwt = require('jsonwebtoken');
require('dotenv/config');

const User = require('../models/User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const error = new Error('User is not Authenticated');
    error.setStatus = 401;
    next(error);
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      const error = new Error('User is not Authenticated');
      error.setStatus = 401;
      next(error);
    }

    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
