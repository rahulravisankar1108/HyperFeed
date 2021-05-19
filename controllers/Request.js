const User = require('../models/User');

exports.initiate = async (req, res) => {
  try {
    const { targetId } = req.body;
    const requestId = req.body.userId;
    await User.updateOne({ _id: targetId }, { $push: { Request: requestId } }, { safe: true });
    await User.updateOne({ _id: requestId }, { $push: { GivenRequest: targetId } }, { safe: true });
    res.status(200).json({
      message: 'Updated Request, GivenRequest',
    });
  } catch (err) {
    res.status(404).json({
      message: 'An Error Occured',
    });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { requestId } = req.body;
    await User.updateOne({ _id: userId }, { $pull: { Request: requestId } }, { safe: true });
    await User.findOneAndUpdate(
      { _id: requestId },
      { $pull: { GivenRequest: userId } },
      { safe: true },
    );
    res.status(200).json({
      message: 'Deleted the Selected Request ID',
    });
  } catch (err) {
    res.status(404).json({
      message: 'Deletion Error',
    });
  }
};

exports.showUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId, { Request: 1 });
    const arr = currentUser.Request;
    const requestedUser = [];
    arr.map(async (user) => {
      requestedUser.push(await User.findById(user, {
        UserName: 1,
        Email: 1,
        FullName: 1,
        Phone: 1,
        Bio: 1,
        Website: 1,
        Gender: 1,
        ProfilePicture: 1,
      }));
    });
    res.status(200).json({
      requestedUser,
      res: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Find error Occured',
      Error: err,
    });
  }
};

exports.countUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, { Request: 1 });
    res.json({
      requestCount: user.Request.length,
    });
  } catch (err) {
    res.json({
      message: 'Count error occured',
      Error: err,
    });
  }
};

exports.clearUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { Request: [] } },
      { safe: true, new: true, upsert: true },
    );
    res.json({
      message: 'Cleared',
      user,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
};
