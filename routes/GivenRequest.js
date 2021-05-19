const express = require('express');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

const requestedController = require('../controllers/GivenRequest');

router.post('/remove-user', isAuth, requestedController.removeUser);
router.get('/show-users/:userId', isAuth, requestedController.showUsers);
router.get('/count-users/:userId', isAuth, requestedController.countUsers);

module.exports = router;
