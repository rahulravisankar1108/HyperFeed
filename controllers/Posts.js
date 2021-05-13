const {Posts} = require("../models/Posts");
const User = require("../models/User");

exports.getFriendsPost = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId,{Following:1});
        const FriendPost = [];
        if(user.Following) {
            user.Following.map(async (friend) => {
                const Friend = await User.findById(friend,{Post:1});
                Friend.Post.map(async(post) =>  {
                    FriendPost.push(await Posts.findById(post));
                });
            });
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
}

exports.storePost = async  (req,res) => {
    try {
        const userId = req.body.userId;
        const newPost = new Posts({
            Location : req.body.Location,
            Caption : req.body.Caption,
            Image : req.file.path,  
        });

        newPost.save()

        const savePost = await User.updateOne({_id : userId}, { "$push" : { "Post" : newPost} },{ "safe": true, "upsert": true})
        if(savePost) {
            res.status(200).json({
                message : "Post added Successfully"
            })
        }
        else {
            res.status(400).json({
                message : "Post add Failed"
            })
        }
    }
    catch(err) {
        res.status(500).json({
            message : "An error Occured",
            Error : err,
        })
    }
}

exports.myPosts = async (req,res) => {
    try {
        const currentUser = await User.findById(req.params.ID, {Post : 1});
        if(currentUser) {
            const arr = currentUser.Post;
            const GetPostDetails = [];
            arr.map(async (post) => {
                GetPostDetails.push(await Posts.findById(post));
            });
            if(GetPostDetails.length>0) {
                res.status(200).json({
                    GetPostDetails,
                    res:true, 
                });
            }
            else {
                res.status(400).json({
                    res:false, 
                });
            }
        }
        else {
            res.status(404).json({
                res:false,
            });
        }
    }
    catch(err) {
        res.status(500).json({
            message : "An error Occured",
            Error : err, 
        })
    };
}

exports.updateMyPostDetails = async (req, res) => {
    try{
        const ID =req.body.ID;
        const caption = req.body.Caption;
        const location = req.body.Location;
        await Posts.updateOne({_id:ID}, {"$set" : {Caption:caption, Location:location}}, {"safe":true, "upsert": true})
        res.status(200).json({
            message : "Updated",
        });
    }
    catch(err) {
        res.status(500).json({
            message : "An error Occured",
            Error : err,
        })
    }
}

exports.removeMypost = async (req, res) => {
    try {
        if(await User.updateOne({_id : req.body.userId}, {"$pull" : {"Post":req.body.ID}}, {"safe" : true,"upsert" :true}) && await Posts.findByIdAndRemove(req.body.ID)) {
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

}

exports.removeMyPosts = async (req,res) => {
    try {
        const deleteUserPost = await User.findById(req.params.userId);
        if(deleteUserPost) {
            const arr = deleteUserPost.Post;
            if(arr.length>0) {
                arr.map(async (post) => {
                    await Posts.findByIdAndRemove(post);
                });
                if(await User.findByIdAndUpdate(req.params.userId, {$set : {Post : []}}, {"safe" : true, "new" : true, "upsert":true})) {
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
}