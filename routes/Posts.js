const express = require('express');
const {Posts} = require("../models/Posts");
const User = require("../models/User");
const router = express.Router();

router.get('GetFriendsPost/:UserID' , async (req, res) => {
    try {
        const user = await User.findById(req.params.UserID,{Following:1});
        const FriendPost = [];
        if(user.Following) {
            for(var i=0;i<user.Following.length;i++) {
                const Friend = await User.findById(user.Following[i],{Post:1});
                for(var j=0;j<Friend.Post.length;j++) {
                    FriendPost.push(await Posts.findById(Friend.Post[j]));
                }
            }
            res.status(200).json({FriendPost : FriendPost});
        }
        else {
            res.status(400).json({
                message : "You dint Follow Anyone",
                res:false,
            });
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
})
router.post('/StoreMyPost', (req,res) => {
    const UserID = req.body.UserID;
    const NewPost = new Posts({
        Location : req.body.Location,
        Caption : req.body.Caption,
        Image : req.file.path,  
    });

    NewPost.save()

    User.updateOne({_id : UserID}, { "$push" : { "Post" : NewPost} },{ "safe": true, "upsert": true})
    .then(response => {
        if(response) {
            res.json({
                message : "Post added Successfully"
            })
        }
        else {
            res.json({
                message : "Post add Failed"
            })
        }
    })
    .catch((err) => {
        res.json({
            message : "An error Occured",
            Error : err,
        })
    });
});
router.get('/MyPosts/:ID', async (req,res) => {
    await User.findById(req.params.ID, {Post : 1})
    .then(async (response) => {
        if(response) {
            const arr = response.Post;
            const GetPostDetails = [];
            for (var i=0;i<arr.length;i++) {
                GetPostDetails.push(await Posts.findById(arr[i]));
            }
            res.status(200).json({
                GetPostDetails,
                res:true, 
            });
        }
        else {
            res.status(404).json({
                res:false,
            });
        }   
    })
    .catch(() => {
        res.status(500).json({
            message : "An error Occured"
        })
    });
});
router.post('/UpdateMyPostDetails', async (req, res) => {
    const ID =req.body.ID;
    const caption = req.body.Caption;
    const location = req.body.Location;
    await Posts.updateOne({_id:ID}, {"$set" : {Caption:caption, Location:location}}, {"safe":true, "upsert": true})
    .then(response => {
        res.status(200).json({
            message : "Updated",
            response,
        });
    })
    .catch(() => {
        res.status(500).json({
            message : "An error Occured"
        })
    });
});
router.post('/RemoveMyPost',async (req, res) => {
    try {
        if(await User.updateOne({_id : req.body.UserID}, {"$pull" : {"Post":req.body.ID}}, {"safe" : true,"upsert" :true}) && await Posts.findByIdAndRemove(req.body.ID)) {
            res.status(200).json({
                message : "Post Deleted",
                "res":true,
            });
        }
        else {
            res.status(404).json({
                "res":false,
            });
        }
    }
    catch(err) {
        res.status(500).json({
            message : "An error Occured",
            Error : err,
        });
    };

});

router.get("/RemoveAllMyPost/:UserID" , async (req,res) => {
    try {
        const DeletUserPost = await User.findById(req.params.UserID);
        if(DeletUserPost) {
            const arr = DeletUserPost.Post;
            if(arr.length>0) {
                for(var i=0;i<arr.length;i++) {
                    await Posts.findByIdAndRemove(arr[i]);
                }
                if(await User.findByIdAndUpdate(req.params.UserID, {$set : {Post : []}}, {"safe" : true, "new" : true, "upsert":true})) {
                    res.status(200).json({
                        message : "Deleted All Posts",
                        res:true,
                    });
                }
            }
            else {
                res.status(400).json({
                    message : "No Posts Available",
                    res:false,
                });
            }
        }
        else {
            res.status(404).json({
                message : "No User Found!",
                res:false,
            });
        }
    }
    catch(err) {
        res.status(500).json({
            message : "No User Found!",
            Error : err,
        });
    }
})

module.exports = router;