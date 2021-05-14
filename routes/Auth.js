const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const authController = require('../controllers/Auth');

const router = express.Router();

router.post('/login',[
    body('email')
    .isEmail()
    .custom((value, {req}) => {
        return User.findOne({Email:value}).then(user => {
            if(!user) {
                return Promise.reject('Email not registered');
            }
        })
    }),
    
    body('password')
    .custom((value, {req}) => {
        return User.findOne({Email:req.body.email}).then(user => {
            if(user)  {
                return bcrypt.compare(value, user.Password)
                    .then(isEqualPassword => {
                        if(!isEqualPassword) {
                            return Promise.reject('Password is incorrect!');
                        }
                    })
            }
        })
    })
], authController.postLogin);

router.post('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid Email')
    .custom((value, {req})=> {
        return User.findOne({Email:value}).then(user => {
            if(user){
                return Promise.reject('Email address already exists')
            }
        })
    }),

    body('userName')
    .trim()
    .isLength({min:4})
    .withMessage('Username should atleast be 4 characters long')
    .custom((value, {req}) => {
        return User.findOne({UserName : value}).then(user => {
            if(user) {
                return Promise.reject('UserName already exists');
            }
        })
    }),

    body('phone')
    .isDecimal()
    .isLength({min:10,max:10})
    .withMessage('Enter a valid Phone Number'),

    body('fullName')
    .trim()
    .isLength({min:3})
    .withMessage('Name should atleast be 3 characters long'),

    body('password')
    .trim()
    .isLength({min:6})
    .withMessage('Password must atleast be 6 characters long'),

    body('confirmPassword')
    .custom((value, {req}) => {
        if(!(value == req.body.password)) {
            throw new Error('Password do not match');
        }
        return true;
    })

],authController.postSignup);

module.exports = router;
