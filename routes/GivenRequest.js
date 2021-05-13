const express = require('express');

const router = express.Router();
const User = require("../models/User");


router.post('/RemoveUser',async (req,res) => {
    try {
        const UserId = req.body.UserID;
        const GivenRequestUser = req.body.GivenRequestUser;
        await User.updateOne({_id : UserId}, { "$pull" : { "GivenRequest" : GivenRequestUser }}, { safe: true })
        await User.updateOne({_id:GivenRequestUser} , {"$pull" : {"Request":UserId}}, { safe: true })
        res.status(200).json({
            message : "Deleted the Given Request ID"
        }); 
    }
    catch(err) {
        res.status(500).json({
            message : "Deletion Error",
            Error : err,
        });
    }
});

router.get('/ShowAll-Users/:UserID',async (req, res) => {
    await User.findById(req.params.UserID, {GivenRequest : 1})
    .then(async (user) => {
        if(user) {
            const arr = user.GivenRequest;
            if(arr.length>0) {
                const RequestedArr = [];
                for(var i=0;i<arr.length;i++) {
                    RequestedArr.push(await User.findById(arr[i], {UserName: 1,Email : 1, FullName:1, Phone : 1, Bio:1, Website:1, Gender:1, ProfilePicture:1}));
                }
                res.status(200).json({
                    "RequestedUsers":RequestedArr,
                    res:true,
                });
            }
            else {
                res.status(200).json({
                    res:false,
                }); 
            }
        }
        else {
            res.status(404).json({
                Message : "GetUser Error",
                res:false,
            });
        }
    })
    .catch(err => { 
        res.status(500).json({
            message : "Find error Occured"
        });
    });
});


router.get('/Count/:UserID',async (req, res) => {
    await User.findById(req.params.UserID, {GivenRequest:1})
    .then(response => {
        const count = response.GivenRequest.length;
        res.json({
            GivenRequestCount : count
        }); 
    })
    .catch(() => {
        res.json({
            message : "Count error occured"
        });
    });
});

module.exports = router;
