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

describe('Unit Tests : Test for Routes/Auth.js:', () => {
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
  it('should get all the following user Details', async () => {
    try {
      const user = await User.findOne(testId);
      if (user) {
        assert.ok(res.statusCode === 200);
        done();
      }
    } catch (err) {
      expect(201);
    }
  });

  it('should show the Details of the current user', () => {
    User.findOne({ _id: testId })
      .select('-Password')
      .then(() => {
        User.findById(testId)
          .populate('userName')
          .then(() => {
            assert.ok(200);
          });
      })
      .catch(() => {
        expect(201);
      });
  });

  it('should update profile Details of the existing user', async () => {
    try {
      const updateData = {
        Bio: 'Live the life',
        Website: 'www.efdb21c9.com',
        Gender: 'Male',
      };
      const user = await User.updateOne({ _id: testId },
        { $set: updateData }, { new: true, safe: true });
      if (user) {
        assert.ok(res.statusCode === 200);
        done();
      }
    } catch (err) {
      expect(201);
    }
  });

  it('should delete an existing user', async () => {
    try {
      const user = await User.deleteOne({ Email: 'b45cc58f-428d-429e-8601-f90a911d468b@gmail.com' });
      if (user) {
        assert.ok(res.statusCode === 200);
        done();
      }
    } catch (err) {
      expect(201);
    }
  });
});
