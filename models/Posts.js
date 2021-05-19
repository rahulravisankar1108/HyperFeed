const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  Image:
    {
      type: String,
      default: '',
    },
  Caption: {
    type: String,
    default: '',
  },
  Location: {
    type: String,
    default: '',
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  savedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  comments: [{
    message: String,
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, { timestamps: true });

const Posts = mongoose.model('Posts', PostSchema);
module.exports = { Posts };
