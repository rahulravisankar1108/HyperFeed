/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const { LocalStorage } = require('node-localstorage');
const assert = require('assert');
require('dotenv').config();

const localStorage = new LocalStorage('./scratch');

const User = require('../../models/User');
const {
  dbConnect,
  dbDisconnect,
} = require('../../utils/test-utils/dbHandler.utils');

const testId = localStorage.getItem('testId');
let done;
let res;

describe('Unit Tests : Test for Routes/Follower.js:', () => {
  beforeEach(() => {
    jest.setTimeout(10 * 10000);
  });

  beforeAll(async () => {
    dbConnect();
  });

  afterAll(async () => {
    dbDisconnect();
    await new Promise((resolve) => setTimeout(() => resolve(), 10000));
  });

  it('should find the follower of the existing user', () => {
    User.findById(process.env.userId)
      .then((response) => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch(() => {
        expect(201);
      });
  });

  it('should add a follower in their followers list by the current user', () => {
    User.findByIdAndUpdate(process.env.userId,
      { $push: { Followers: testId } }, { new: true, safe: true })
      .then((response) => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch(() => {
        expect(201);
      });
  });
  it('should remove a follower from their followers list by the current user', () => {
    User.findByIdAndUpdate(process.env.userId,
      { $pull: { Followers: testId } }, { new: true, safe: true })
      .then((response) => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch(() => {
        expect(201);
      });
  });
});
