const express = require('express');
const { body } = require('express-validator'); 

const isAuth = require('../middleware/isAuth');
const User = require('../models/User');
const UserController = require("../controllers/User");

const router = express.Router();

router.get('/show-user/:userId',isAuth,UserController.showUser);
router.get('/remove-user/:userId',isAuth,UserController.removeUser);
router.post('user/edit-account',isAuth,[
    body('userName')
    .trim()
    .isLength({min : 4})
    .withMessage('UserName should atleast  be 4 characters long.')
    .custom((value, {req}) => {
        return User.find({userName : value}).then(users => {
            if(users) {
                users.map(user => {
                    if(user.UserName === value && user._id !== req.userId) {
                        return Promise.reject('UserName already taken.');
                    }
                })
            }
        })
    }),
    body('email')
    .isEmail()
    .withMessage('Please enter a valid Email Address')
    .custom((value, {req})=> {
        return User.find({Email:value}).then(users => {
            if(users){
                users.map(user => {
                    if(user.Email === value && user._id !== req.userId) {
                        return Promise.reject('Email address already exists');
                    }
                })
            }
        })
    }),

    body('fullName')
    .optional()
    .trim()
    .isLength({min:3})
    .withMessage('Name should atleast be 3 characters long'),

    body('password')
    .optional()
    .trim()
    .isLength({min:6})
    .withMessage('Password must atleast be 6 characters long'),

    body('phone')
    .optional()
    .isDecimal()
    .isLength({min:10,max:10})
    .withMessage('Enter a valid mobile Number'),
    
    body('bio')
    .optional(),

    body('gender')
    .optional(),

],UserController.postupdateProfile);
router.get('/search-user',isAuth,UserController.searchUser);
router.put('user/edit-profile-photo',isAuth, UserController.updateProfilePhoto);

module.exports = router;
