const express = require('express');
const router = express.Router();

const requestedController = require("../controllers/GivenRequest");

router.post('/remove-user',requestedController.removeUser);
router.get('/show-users/:userId',requestedController.showUsers);
router.get('/count-users/:userId',requestedController.countUsers);

module.exports = router;
