const express = require('express');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

const UserController = require("../controllers/User");

router.get('/show-user/:userId',isAuth,UserController.showUser);
router.get('/remove-user/:userId',isAuth,UserController.removeUser);
router.post('user/update-profile',isAuth,UserController.updateProfile);
router.get('/search-user',isAuth, UserController.searchUser);
router.put('user/update-profile-photo',isAuth, UserController.updateProfilePhoto);

module.exports = router;
