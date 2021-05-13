const express = require('express');

const router = express.Router();
const User = require("../models/User");
router.post('/AddUser', async (req,res) => {
    try {
        const UserId = req.body.UserID;
        const RequestedUserID = req.body.RequestedUserID;
        
        await User.updateOne({_id : RequestedUserID}, {"$push" : {"Following":UserId}},{ "safe": true });
        await User.updateOne({_id :UserId}, {"$push" : {"Followers":RequestedUserID}},{ "safe": true });
        await User.updateOne({_id : UserId}, {"$pull" : {"Request" : RequestedUserID}},{ "safe": true });
        await User.updateOne({_id : RequestedUserID}, {"$pull" : {"GivenRequest" : UserId}},{ "safe": true });
        
        res.status(200).json({
            message : "Added Followers, Following",
        });
    }
    catch(err) {
        res.status(404).json({
            message : "An Error Occured!",
            Error : err,
        });
    }
});


router.post('/RemoveUser',async (req,res) => {
    try {
        const UserID = req.body.UserID;
        const FollowingID = req.body.FollowingID;
        const DeletedUser = await User.updateOne({_id : UserID}, { "$pull" : { "Following" : FollowingID }}, { "safe": true })
        if(DeletedUser) {
            res.status(200).json({
                message : "Deleted the Following ID",
            });
        }
        else {
            res.status(404).json({
                message : "Error in the Query",
            });
        } 
    }
    catch(err) {
        res.json({
            message : "Deletion Error",
            Error : err,
        });
    }
});

router.get('/ShowAll-User/:UserID', async(req, res) => {
    try {
        const UserDetails = await User.findById(req.params.UserID, {Following:1});
        if(UserDetails) {
            const arr = UserDetails.Following;
            const FollowingList = [];
            for(var i=0;i<arr.length;i++) {
                FollowingList.push(await User.findById(arr[i], {UserName: 1,Email : 1, FullName:1, Phone : 1, Bio:1, Website:1, Gender:1, ProfilePicture:1}));
            }
            res.status(200).json({
                FollowingList,
            });
        }
        else {
            res.status(404).json({
                Message : "Error in Query"
            })
        } 
    }
    catch(err) {
        res.json({
            message : "Find error Occured",
            Error : err,
        });
    }
});


router.get('/CountAll-User/:UserID', async(req, res) => {
    await User.findById(req.params.UserID,{Following:1})
    .then(response => {
        if(response) {
            const count = response.Following.length;
            res.status(200).json({
                "FollowingCount": count,
            }); 
        }
        else {
            res.status(404).json({
                message : "User Not Found!",
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            message : "Count error occured",
        });
    });
});

module.exports = router;
