const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const User = require("../models/User");

exports.signUp = async (req,res) => {
    try {
        const {email, userName, fullName, password, phone} = req.body;
        if(!email || !userName || !fullName || !password || !phone) {
            return res.status(400).json({ error: 'please fill all the fields' });
        }
        const ifExists = await User.findOne({Email : email});
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        if(ifExists) {
            res.status(400).send('You have Already Registered');
        }
        else {
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
            
            if(await New.save()) {
                res.status(200).json({
                    "User" : user,
                    message : "New User Details Added!",
                });
            }
            else {
                res.status(404).json({
                    message : "After SignUp Error",
                    Error : err,
                });
            }
        }
    }       
    catch (err) {
        res.status(500).json(err);
    } 
};

exports.Login = async (req, res) => {
    try {
        const  {email,password}  = req.body;
        if(!email || !password) {
            return res.status(422).json({Error : 'No Fields can left empty'});
        }
        const isUser = await User.findOne({ Email: email});
        if(isUser==null) {
            return res.status(4).json({Error : 'Check your credentials'});
        }
        
        bcrypt.compare(password, isUser.Password, function(err, result) {
            if(err) {
                res.json({ Error : err});
            }
            if(!result) {
                res.status(400).json({res: false, message : 'wrong Password'});
            }
            else {
                const token = jwt.sign({_id : isUser._id}, process.env.SECRET);
                const {
                    _id, 
                    FullName,
                    Email,
                    Followers,
                    Following,
                    Request,
                    GivenRequest} = isUser;

                res.status(200).json({ 
                    token, 
                    res: true,
                    user : {
                        _id, FullName,Email,
                        Followers,Following,
                        Request, GivenRequest}
                });
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