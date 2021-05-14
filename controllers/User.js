const { validationResult } = require('express-validator');

const User = require("../models/User");

exports.showUser = async (req, res) => {
    try {
        const userDetails = await User.findById(req.params.userId);
        console.log(userDetails);
        if(userDetails!=null) {
            res.status(200).json({
                "userDetails":userDetails,
            });
        }
        else {
            res.status(400).json({
                Message : "No User available"
            });
        } 
    }
    catch(err) {
        res.status(500).json({
            message: 'Show User Error Occured',
            Error : err,
        });
    }
}

exports.removeUser = async (req,res) => {
    try { 
        const userId = req.params.userId;
        const DeletingUser = await User.findById(userId, {Followers:1, Following:1,Post:1, Request:1, GivenRequest:1})
        if(DeletingUser) {
            const DeletingFollowers =DeletingUser.Followers;
            const DeletingFollowing = DeletingUser.Following;
            const DeletingPost = DeletingUser.Post;
            const DeletingRequest = DeletingUser.Request;
            const  DeletingGivenRequest = DeletingUser.GivenRequest;
            if(DeletingFollowers.length>0) {
                DeletingFollowers.map(async (friend) => {
                    await User.findOneAndUpdate({_id:friend}, {"$pull" : {"Following":userId}}, {"safe":true, "upsert":true});
                });
            }
            if(DeletingFollowing.length>0) {
                DeletingFollowing.map(async (friend) => {
                    await User.findOneAndUpdate({_id:friend}, {'$pull': {"Followers" : userId}}, {"safe":true});
                });
            }
            if(DeletingRequest.length>0) {
                DeletingRequest.map(async (friend) => {
                    await User.findOneAndUpdate({_id:friend}, {'$pull': {"GivenRequest" : userId}}, {"safe":true});
                });
            }
            if(DeletingGivenRequest.length>0) {
                DeletingGivenRequest.map(async (friend) => {
                    await User.findOneAndUpdate({_id:friend}, {'$pull': {"Request" : userId}}, {"safe":true});
                });
            }
            if(DeletingPost.length>0) {
                DeletingPost.map(async (post) => {
                    await User.findOneAndUpdate({_id:post}, {$set: {"Post" : []}}, {"safe":true, "new":true});  
                })
                
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
}

exports.postupdateProfile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('Login failed!');
        err.statusCode = 422;
        err.data = errors.array();
        res.json({errors: err});
        return
    }   
    const userId = req.body.userId;
    const updatedData = {
        Email : req.body.email,
        UserName : req.body.userName,
        FullName : req.body.fullName,
        Password : req.body.password,
        Phone : req.body.phone,
        Bio : req.body.bio,
        Gender : req.body.gender,
    };
    try {
        const updateProfile = await User.findByIdAndUpdate(userId, { $set: updatedData }, { new: true });
        if(updateProfile) {
            res.status(200).json({
                message : "Updated Profile",
                res: true,
            })
        }
        else {
            res.status(400).json({
                message : "Updation Error",
                res:false,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'User detail Updation Error',
        });
    }
}

exports.searchUser = async (req,res) => {
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
}

exports.updateProfilePhoto = async (req,res) => {
    try {
        const userId = req.body.userId;
        const UpdatedData = {
            ProfilePicture : req.file.path,
        }
        await User.findByIdAndUpdate(userId, { $set : UpdatedData}, { new: true })
        
        return res.json({
            message : "User Profile Photo Updated!",
        })
    }
    catch(err) {
        res.status(500).json({
            message : "User Profile Photo Updation Error!",
        })
    }
}