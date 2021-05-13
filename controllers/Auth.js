const bcrypt = require('bcrypt');

const User = require("../models/User");

exports.signUp = async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.Password.toString(), salt);
        const email = req.body.Email;
        const ifExists = await User.findOne({Email : email});
        if(ifExists) {
            res.status(400).send('You have Already Registered');
        }
        else {
            const New = new User({ 
                Email : email,
                UserName : req.body.UserName,
                FullName : req.body.FullName,
                Password : hashedPassword,
                Phone : req.body.Phone,
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
        const  userName  = req.body.UserName;
        const password = req.body.Password;
        const isUser = await User.findOne({ UserName: userName});
        if(isUser==null) {
            return res.status(404).json('user Not Found');
        }
        
        bcrypt.compare(password, response.Password, function(err, result) {
            if(err) {
                res.json({ Error : err})
            }
            if(!result) {
                res.status(400).json({res: false, message : 'wrong Password'});
            }
            else {
                res.status(200).json({ res: true,isUser});
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