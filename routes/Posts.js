const express = require('express');
const {Posts} = require("../models/Posts");
const User = require("../models/User");
const router = express.Router();

router.post('/StorePost', (req,res) => {
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
router.get('/ShowPosts/:ID', async (req,res) => {
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
router.post('/Update-PostDetails', async (req, res) => {
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
router.post('/RemovePost',async (req, res) => {
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

router.get("/RemoveAllPost/:UserID" , async (req,res) => {
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
router.get('/', async (req,res) => {
    try {
        const getPosts = await Posts.find({});
        if(getPosts) {
            res.status(200).json({
                getPosts,
                "res":true,
            });
        }
        else {
            res.status(404).json({
                getPosts,
                "res":false,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            Error : err,
        });
    }
})
router.get("/ClearPost", async (req,res) => {
    try {
        const Clear = await Posts.deleteMany({});
        if(Clear) {
            res.status(200).json({
                Clear,
                message : "Cleared",
            });
        }
        else {
            res.status(404).json({
                message : "Not Cleared",
            });
        }
        
    }

    catch (err) {
        res.status(500).json({
            message : " Some Error Occured!",
        });
    }
})
module.exports = router;
