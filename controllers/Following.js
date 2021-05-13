const User = require("../models/User");

exports.addUser = async (req,res) => {
    try {
        const userId = req.body.userId;
        const requestedUserId = req.body.requestedUserId;
        
        await User.updateOne({_id : requestedUserId}, {"$push" : {"Following":UserId}},{ "safe": true });
        await User.updateOne({_id :userId}, {"$push" : {"Followers":requestedUserId}},{ "safe": true });
        await User.updateOne({_id : userId}, {"$pull" : {"Request" : requestedUserId}},{ "safe": true });
        await User.updateOne({_id : requestedUserId}, {"$pull" : {"GivenRequest" : userId}},{ "safe": true });
        
        res.status(200).json({
            message : "Added Followers, Following",
        });
    }
    catch(err) {
        res.status(500).json({
            message : "An Error Occured!",
            Error : err,
        });
    }
}

exports.removeUsers = async (req,res) => {
    try {
        const userId = req.body.userId;
        const followingId = req.body.followingId;
        const deletedUser = await User.updateOne({_id : userId}, { "$pull" : { "Following" : followingId }}, { "safe": true })
        if(deletedUser) {
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
        res.status(500).json({
            message : "Deletion Error",
            Error : err,
        });
    }
}

exports.showUsers = async(req, res) => {
    try {
        const userDetails = await User.findById(req.params.userId, {Following:1});
        if(userDetails) {
            const arr = userDetails.Following;
            const followingList = [];
            arr.map(user =>  {
                followingList.push(await User.findById(user, {UserName: 1,Email : 1, FullName:1, Phone : 1, Bio:1, Website:1, Gender:1, ProfilePicture:1}));
            });
            res.status(200).json({
                followingList,
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
}

exports.countUsers = async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId,{Following:1})
        if(currentUser) {
            const count = currentUser.Following.length;
            res.status(200).json({
                "FollowingCount": count,
                res:true,
            }); 
        }
        else {
            res.status(404).json({
                message : "User Not Found!",
                res:false,
            })
        }
    }
    catch(err) {
        res.status(500).json({
            message : "Count error occured",
        });
    }
}