const express = require('express');
const router = express.Router();

const requestController = require("../controllers/Request");
router.post('/initiate', requestController.initiate); 

router.post('/remove-user',requestController.removeUser);


router.get('/show-users/:userId', requestController.showUser);


router.get('/count-users/:userId',requestController.countUser);

router.get('/clear-users/:userId' , requestController.clearUser);

module.exports = router;
