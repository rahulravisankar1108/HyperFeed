const User = require('../models/User');

exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const followerId = req.body.FollowerID;
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $pull: { Followers: followerId } },
      { safe: true },
    );
    if (updatedUser) {
      res.status(200).json({
        message: 'Deleted the ID',
      });
    } else {
      res.status(404).json({
        Message: 'Error in Query',
      });
    }
  } catch (err) {
    res.json({
      message: 'Deletion Error',
      Error: err,
    });
  }
};

exports.showUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId, { Followers: 1 });
    const arr = currentUser.Followers;
    const FollowersList = [];
    arr.map(async (user) => {
      FollowersList.push(await User.findOne({ _id: user }, {
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
    res.json({
      FollowersList,
    });
  } catch (err) {
    res.json({
      message: 'Find error Occured',
      Error: err,
    });
  }
};

exports.countUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    res.json({
      FollowersCount: currentUser.Followers.length,
    });
  } catch (err) {
    res.json({
      message: 'Count error occured',
      Error: err,
    });
  }
};
