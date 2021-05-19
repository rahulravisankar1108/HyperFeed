const express = require('express');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

const followerController = require('../controllers/Followers');

router.post('/remove-user', isAuth, followerController.removeUser);
router.get('/show-users/:userId', isAuth, followerController.showUsers);
router.get('/count-users/:userId', isAuth, followerController.countUsers);
module.exports = router;
