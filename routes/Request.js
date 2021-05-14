const express = require('express');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

const requestController = require("../controllers/Request");
router.post('/initiate',isAuth, requestController.initiate); 

router.post('/remove-user',isAuth,requestController.removeUser);

router.get('/show-users/:userId',isAuth, requestController.showUser);

router.get('/count-users/:userId',isAuth,requestController.countUser);

router.get('/clear-users/:userId' ,isAuth, requestController.clearUser);

module.exports = router;
