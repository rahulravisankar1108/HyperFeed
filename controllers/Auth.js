const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult } = require('express-validator');
require('dotenv/config');

const User = require("../models/User");

exports.postSignup = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const err = new Error('Login failed!');
        err.statusCode = 422;
        err.data = errors.array();
        res.json({errors: err});
        return
    }
    const email = req.body.email; 
    const userName = req.body.userName;
    const fullName = req.body.fullName;
    const password = req.body.password;
    const phone = req.body.phone;
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        const New = new User({ 
            Email : email,
            UserName : userName,
            FullName : fullName,
            Password : hashedPassword,
            Phone : phone,
            Bio : "",
            Website : "",
            Gender : "",
            ProfilePicture : "",
            Followers : [], 
            Following : [],
            Request : [],
            GivenRequest : [],
            Post : [],
        });
        const createdNewUser = await New.save();
        if(createdNewUser) {
            res.status(200).json({
                "User" : createdNewUser,
                message : "New User Details Added!",
            });
        }
    }       
    catch (err) {
        res.status(500).json({
            message : "Error Occured!",
            Error : err,
        });
    } 
};

exports.postLogin = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('Login failed!');
        err.statusCode = 422;
        err.data = errors.array();
        res.json({errors: err});
        return
    }
    const  email = req.body.email;

    try {
        const currentUser = await User.findOne({ Email: email});
        
        const token = jwt.sign({_id : currentUser._id}, process.env.SECRET, {expiresIn : 360000});

        res.status(200).json({ 
            token, 
            res: true,
            user : {
                userid : currentUser._id,
                fullName : currentUser.FullName,
                email : currentUser.Email,
                followers : currentUser.Followers,
                following : currentUser.Following,
                request : currentUser.Request, 
                givenRequest : currentUser.GivenRequest
            }
        });         
    }
    catch(err) {
        res.status(500).json({
            message: 'An Error Occured',
            'Error' : err
        });
    } 
};