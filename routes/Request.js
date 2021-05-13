const express = require('express');
const router = express.Router();

const User = require("../models/User");
router.post('/Initiate', async (req,res) => {
    try {
        const TargetID = req.body.TargetID;
        const RequestId = req.body.UserID;

        await User.updateOne({_id : TargetID}, {"$push" : {"Request":RequestId}}, { "safe": true })
        await User.updateOne({_id : RequestId}, {"$push" : {"GivenRequest" : TargetID}},{ "safe": true })        
        res.status(200).json({
            message : "Updated Request, GivenRequest"
        });
    }
    catch (err) {
        res.status(404).json({
            message : "An Error Occured"
        });
    }
     
}); 

router.post('/RemoveUser',async (req,res) => {
    try {
        const UserID = req.body.UserID;
        const RequestID = req.body.RequestID;
        await User.updateOne({_id : UserID}, { "$pull" : { "Request" : RequestID }}, { "safe": true })
        await User.findOneAndUpdate({_id:RequestID}, {"$pull" : {"GivenRequest":UserID}},{ "safe": true })
        res.status(200).json({
            message : "Deleted the Selected Request ID"
        });
    }
    catch (err) {
        res.status(404).json({
            message : "Deletion Error"
        });
    }
});


router.get('/ShowAll-Users/:UserID', async (req, res) => {
    await User.findById(req.params.UserID,{Request :1})
    .then(async (user) => {
        const arr = user.Request;
        const RequestedUser = [];
        for(var i=0;i<arr.length;i++) {                
            RequestedUser.push(await User.findById(arr[i], {UserName: 1,Email : 1, FullName:1, Phone : 1, Bio:1, Website:1, Gender:1, ProfilePicture:1}));
        }
        res.status(200).json({
            "RequestedUser":RequestedUser,
            res:true,
        });
    })
    .catch(() => {
        res.status(404).jsin({
            Message : "GetUser Error",
            res:false,
        }); 
    })
    .catch(err => {
        res.status(500).json({
            message : "Find error Occured",
            Error :err,
        });
    });
});


router.get('/CountAll-Users/:UserID',async (req, res) => {
    await User.findById(req.params.UserID, {Request:1})
    .then(response => {
        const count = response.Request.length;
        res.json({
            RequestCount : count
        }); 
    })
    .catch(() => {
        res.json({
            message : "Count error occured"
        });
    });
});

router.get('/ClearAll-Users/:UserID' , (req,res) => {
    const user = User.findById(req.params.UserID);
    const updatedRequest = [];
    user.findByIdAndUpdate(req.params.UserID, {$set : {Request : updatedRequest}}, {"safe" :true, "new" : true})
    .then((response) => {
        res.json({
            message : "Cleared",
            response,
        })
    })
});

module.exports = router;
