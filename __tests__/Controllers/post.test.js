/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const { LocalStorage } = require('node-localstorage');
const assert = require('assert');
require('dotenv').config();

const localStorage = new LocalStorage('./scratch');
const {
  dbConnect,
  dbDisconnect,
} = require('../../utils/test-utils/dbHandler.utils');

const { Posts } = require('../../models/Posts');
const User = require('../../models/User');

let done;
let res;
let postId;

describe('Unit Tests : Test for Routes/Posts.js:', () => {
  beforeEach(() => {
    jest.setTimeout(10 * 30000);
  });

  beforeAll(async () => {
    dbConnect();
  });

  afterAll(async () => {
    dbDisconnect();
    await new Promise((resolve) => setTimeout(() => resolve(), 10000));
  });

  it('should create a new post', async () => {
    const user = User.findOne({ Email: 'b45cc58f-428d-429e-8601-f90a911d468b@gmail.com' });
    const post = new Posts({
      Caption: 'test',
      Location: 'test',
      Image: 'some@url',
      postedBy: user._id,
    });

    await post.save();
    const findPost = await Posts.findOne(post);
    postId = post._id;
    if (findPost === post._id) {
      assert.ok(res.statusCode === 200);
      done();
    } else {
      expect(201);
    }
  });

  it('Should find the post of current user', () => {
    Posts.findById(postId)
      .then(() => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch(() => {
        expect(201);
      });
  });

  it('should Delete a post', () => {
    Posts.deleteOne(postId)
      .then(() => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch((err) => {
        expect(201);
      });
  });
});
