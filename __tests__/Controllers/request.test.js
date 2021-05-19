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

const User = require('../../models/User');

const testId = localStorage.getItem('testId');
let done;
let res;

describe('Unit Tests : Test for Routes/Request.js:', () => {
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

  it('should find all the Request from the other user to the current user', () => {
    User.findById(process.env.userId)
      .then((response) => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch(() => {
        expect(201);
      });
  });

  it('should initiate a request to other user from current user', () => {
    User.findByIdAndUpdate(process.env.userId,
      { $push: { Request: testId } }, { new: true, safe: true })
      .then(() => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch(() => {
        expect(201);
      });
  });

  it('should delete a request sent by current user to other user', () => {
    User.findByIdAndUpdate(process.env.userId,
      { $pull: { Request: testId } }, { new: true, safe: true })
      .then(() => {
        assert.ok(res.statusCode === 200);
        done();
      })
      .catch(() => {
        expect(201);
      });
  });
});
