const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/RemoveUser',async (req,res) => {
    try {
        const UserID = req.body.UserID;
        const FollowerID = req.body.FollowerID;
        const updatedUser = await User.updateOne({_id : UserID}, { "$pull" : { "Followers" : FollowerID }}, { "safe": true })
        if(updatedUser) {
            res.status(200).json({
                message : "Deleted the ID"
            });
        }
        else {
            res.status(404).json({
                Message : "Error in Query"
            });
        }
        
    }
    catch (err) {
        res.json({
            message : "Deletion Error",
            Error : err,
        })
    }
});

 
router.get('/ShowAll-User/:UserID',async (req, res) => {

    await User.findById(req.params.UserID, {Followers:1})
    .then(async (response) => {
        const arr = response.Followers;
        const FollowersList = [];
        for(var i=0;i<arr.length;i++) {
            FollowersList.push(await User.findById(arr[i], {UserName: 1,Email : 1, FullName:1, Phone : 1, Bio:1, Website:1, Gender:1, ProfilePicture:1}));
        }
        res.json({
            FollowersList,
        })
    })
    .catch(() => {
        res.json({
            message : "Find error Occured"
        })
    });
});


router.get('/CountAll-User/:UserID',async (req, res) => {
    
    await User.findById(req.params.UserID)
    .then(response => {
        const count = response.Followers.length;
        res.json({
            "FollowersCount" : count
        }); 
    })
    .catch(() => {
        res.json({
            message : "Count error occured",
        });
    });
});

module.exports = router;
