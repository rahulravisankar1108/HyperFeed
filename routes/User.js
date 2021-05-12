const express = require('express');
const router = express.Router();
const User = require("../models/User");


router.get('/ShowUser/:UserID',(req, res) => {
    const UserID = req.params.UserID;
    User.findById(UserID)
    .then((response) => {
        res.json({
            response,
        });
    })
    .catch(() => {
        res.json({
            message: 'Show User Error Occured',
        });
    });
});


router.get('/RemoveUser/:UserID',async (req,res) => {
    try {
        const UserID = req.params.UserID;
        const DeletingUser = await User.findById(UserID, {Followers:1, Following:1,Post:1, Request:1, GivenRequest:1})
        if(DeletingUser) {
            const DeletingFollowers =DeletingUser.Followers;
            const DeletingFollowing = DeletingUser.Following;
            const DeletingPost = DeletingUser.Post;
            const DeletingRequest = DeletingUser.Request;
            const  DeletingGivenRequest = DeletingUser.GivenRequest;
            if(DeletingFollowers.length>0) {
                for(var i=0;i<DeletingFollowers.length;i++) {
                    await User.findOneAndUpdate({_id:DeletingFollowers[i]}, {"$pull" : {"Following":UserID}}, {"safe":true});
                }
            }
            if(DeletingFollowing.length>0) {
                for(var i=0;i<DeletingFollowing.length;i++) {
                    await User.findOneAndUpdate({_id:DeletingFollowing[i]}, {'$pull': {"Followers" : UserID}}, {"safe":true});
                }
            }
            if(DeletingRequest.length>0) {
                for(var i=0;i<DeletingRequest.length;i++) {
                    await User.findOneAndUpdate({_id:DeletingRequest[i]}, {'$pull': {"GivenRequest" : UserID}}, {"safe":true});
                }
            }
            if(DeletingGivenRequest.length>0) {
                for(var i=0;i<DeletingGivenRequest.length;i++) {
                    await User.findOneAndUpdate({_id:DeletingGivenRequest[i]}, {'$pull': {"Request" : UserID}}, {"safe":true});
                }
            }
            if(DeletingPost.length>0) {
                await User.findOneAndUpdate({_id:DeletingPost[i]}, {$set: {"Post" : []}}, {"safe":true, "new":true});  
            }
            res.json({
                message: 'User Deleted Succesfully',
            });
        }
    }
    catch(err) {
        res.json({
            message: 'User Deletion Error Occured',
        });
    }
});


router.post('/UpdateProfile',(req, res) => {
    const UserID = req.body.UserID;
    const UpdatedData = {
        Email : req.body.Email,
        UserName : req.body.UserName,
        FullName : req.body.FullName,
        Password : req.body.Password,
        Phone : req.body.Phone,
        Bio : req.body.Bio,
        Gender : req.body.Gender,
    };
    User.findByIdAndUpdate(UserID, { $set: UpdatedData }, { new: true })
    .then(() => {
        res.json({
            message: 'User Details Updated!',
        });
    })
    .catch(() => {
        res.json({
            message: 'User detail Updation Error',
        });
    });
});

router.get('/SearchUser', async (req,res) => {
    try {
        const FindUser = await User.find({UserName:req.params.UserName});
        res.json({
            FindUser,
        });
    }
    catch(err) {
        res.json({
            message : "An Error Occured!"
        });
    }
})

router.put('/UpdateProfilePhoto', (req,res) => {
    const UserID = req.body.UserID;
    const UpdatedData = {
        ProfilePicture : req.file.path,
    }

    User.findByIdAndUpdate(UserID, { $set : UpdatedData}, { new: true })
    .then(() => {
        res.json({
            message : "User Profile Photo Updated!",
        })
    })
    .catch(() => {
        res.json({
            message : "User Profile Photo Updation Error!",
        })
    });
});


router.get('/',(req,res) => {
    User.find({})
    .then(response => {
        res.json({
            response
        })
    })
});

router.get('/Clear' , (req,res) => {
    User.deleteMany({})
    .then((response) => {
        res.json({
            message : "Cleared",
            response,
        })
    })
});

module.exports = router;
