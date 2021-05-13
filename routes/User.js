const express = require('express');
const router = express.Router();

const UserController = require("../controllers/User");

router.get('/show-user/:userId',UserController.showUser);
router.get('/remove-user/:userId',UserController.removeUser);
router.post('user/update-profile',UserController.updateProfile);
router.get('/search-user', UserController.searchUser);
router.put('user/update-profile-photo', UserController.updateProfilePhoto);

module.exports = router;
