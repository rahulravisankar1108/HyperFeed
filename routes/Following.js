const express = require('express');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

const FollowController = require("../controllers/Following");

router.post('/add-user', isAuth,FollowController.addUser);
router.post('/remove-user',isAuth,FollowController.removeUsers);
router.get('/show-users/:userId',isAuth, FollowController.showUsers);
router.get('/count-users/:userId', isAuth,FollowController.countUsers);

module.exports = router;
