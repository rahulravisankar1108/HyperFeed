const express = require('express');
const router = express.Router();
const authController = require('../controllers/Auth');

router.post('/Login', authController.Login);
router.post('/SignUp', authController.signUp);

module.exports = router;
