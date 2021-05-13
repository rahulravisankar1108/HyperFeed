const express = require('express');
const authController = require('../controllers/Auth');

const router = express.Router();

router.post('/Login', authController.Login);
router.post('/SignUp', authController.signUp);

module.exports = router;
