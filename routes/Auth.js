const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/User");

router.post('/Login', (req, res) => {
    const  Username  = req.body.UserName;
    const Password = req.body.Password;
    User.findOne({ UserName: Username})
    .then(response => {
        if(response==null) {
            res.status(404).json('user Not Found');
        }

        bcrypt.compare(Password, response.Password, function(err, result) {
            if(err) {
                res.json({ Error : err})
            }
            if(!result) {
                res.status(400).json({res: false, message : 'wrong Password'});
            }
            else {
                res.status(200).json({ res: true,response});
            }           
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'An Error Occured',
            'Error' : err
        });
    }); 
});


router.post('/SignUp',async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.Password.toString(), salt);
        const email = req.body.Email;
        const IfExists = await User.findOne({Email : email});
        if(IfExists) {
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
            New.save()
            .then((user) => {
                if(user) {
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
            })
            .catch((err) => {
                res.status(500).json({
                    Error : err,
                })
            });
        }
    }       
    catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;
