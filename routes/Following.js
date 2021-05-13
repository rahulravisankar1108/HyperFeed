const express = require('express');
const router = express.Router();

const FollowController = require("../controllers/Following");

router.post('/add-user', FollowController.addUser);
router.post('/remove-user',FollowController.removeUsers);
router.get('/show-users/:userId', FollowController.showUsers);
router.get('/count-users/:userId', FollowController.countUsers);

module.exports = router;
