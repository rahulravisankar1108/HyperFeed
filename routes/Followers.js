const express = require('express');
const router = express.Router();

const followerController = require("../controllers/Followers");

router.post('/remove-user',followerController.removeUser);
router.get('/show-users/:userId',followerController.showUsers);
router.get('/count-users/:userId',followerController.countUsers);

module.exports = router;