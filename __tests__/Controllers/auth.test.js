/* eslint-disable no-unused-vars */
const { LocalStorage } = require('node-localstorage');
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const localStorage = new LocalStorage('./scratch');
const {
  dbConnect,
  dbDisconnect,
} = require('../../utils/test-utils/dbHandler.utils');

const User = require('../../models/User');

let testUser;
let done;
let res;

describe('Unit Tests : Test for Routes/Auth.js:', () => {
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

  it('should signup a random user', async () => {
    const user = new User({
      FullName: `${uuidv4()}`,
      UserName: `${uuidv4()}`,
      Email: `${uuidv4()}@gmail.com`,
      Password: `${uuidv4()}`,
      Phone: '7894561236',
    });

    await user.save();

    const findUser = await User.findOne(user);
    testUser = findUser.Email;
    localStorage.setItem('testUser', findUser.Email);
    localStorage.setItem('testId', findUser._id);
    localStorage.setItem('testName', findUser.UserName);

    if (findUser._id === user._id) {
      assert.ok(res.statusCode === 200);
      done();
    } else {
      expect(201);
    }
  }, 50000);

  it('should login a unique user', async () => {
    try {
      const user = User.findById(testUser);
      if (user) {
        assert.ok(res.statusCode === 200);
        done();
      }
    } catch (err) {
      expect(201);
    }
  });
});
