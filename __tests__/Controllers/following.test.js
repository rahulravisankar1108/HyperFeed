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

describe('Unit Tests : Test for Routes/Following.js:', () => {
  beforeEach(() => {
    jest.setTimeout(10 * 30000);
  });

  beforeAll(async () => {
    dbConnect();
  });

  afterAll(async () => {
    dbDisconnect();
    await new Promise((resolve) => setTimeout(() => resolve(), 50000));
  });

  it('should start following other user', async () => {
    await User.findByIdAndUpdate(process.env.userId, {
      $push: { Followers: testId },
    }, {
      new: true,
    }, async (result) => {
      if (result) {
        await User.findByIdAndUpdate(testId, {
          $push: { Following: process.env.userId },
        },
        { new: true })
          .select('-Password')
          .then((result) => {
            assert.ok(res.statusCode === 200);
            done();
          })
          .catch((err) => {
            expect(201);
          });
      }
    });
  });

  it('should stop following other user', async () => {
    await User.findByIdAndUpdate(process.env.userId, {
      $pull: { Followers: testId },
    }, {
      new: true,
    }, async (err, result) => {
      if (result) {
        await User.findByIdAndUpdate(testId, {
          $pull: { Following: process.env.userId },
        },
        { new: true })
          .select('-Password')
          .then((result) => {
            assert.ok(res.statusCode === 200);
            done();
          })
          .catch((err) => {
            expect(201);
          });
      }
    });
  });
});
