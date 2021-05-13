const User = require("../models/User");

exports.removeUser = async (req,res) => {
    try {
        const userId = req.body.userId;
        const GivenRequestUser = req.body.GivenRequestUser;
        await User.updateOne({_id : userId}, { "$pull" : { "GivenRequest" : GivenRequestUser }}, { safe: true })
        await User.updateOne({_id:GivenRequestUser} , {"$pull" : {"Request":userId}}, { safe: true })
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
}

exports.showUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId, {GivenRequest : 1});
        const arr = currentUser.GivenRequest;
        if(arr.length>0) {
            const requestedArr = [];
            arr.map(async (user) => {
                requestedArr.push(await User.findById(user, {UserName: 1,Email : 1, FullName:1, Phone : 1, Bio:1, Website:1, Gender:1, ProfilePicture:1}));
            });
            res.status(200).json({
                "RequestedUsers":requestedArr,
                res:true,
            });
        }
        else {
            res.status(400).json({
                res:false,
            }); 
        }
    }
    catch(err)  { 
        res.status(500).json({
            Error : err,
        });
    }
}

exports.countUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId, {GivenRequest:1});
        const count = currentUser.GivenRequest.length;
        res.json({
            GivenRequestCount : count
        }); 
    }
    catch(err) {
        res.json({
            message : "Count error occured",
            Error : err,
        });
    }
}