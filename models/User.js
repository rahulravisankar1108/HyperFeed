const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserDetailsSchema = Schema({
    Email : {
        type: String,
        required : true,
    },
    UserName : {
        type : String,
        required : true,
    },
    FullName: {
        type: String,
        required : true,
    },
    Password: {
        type: String,
        required : true,
    },
    Phone: {
        type: String,
        required : true,
    },
    Bio : {
        type : String,
        default:'',  
    },
    Website : {
        type : String,
        default:'',
    },
    Gender : {
        type : String,
        default:'',
    },
    ProfilePicture : {
        type : String,
        default:'',
    },
    Followers : [{
        type : Schema.Types.ObjectId,
        ref : 'users',
    }],
    Following : [{
        type : Schema.Types.ObjectId,
        ref : 'users',
    }],
    Request : [{
        type : Schema.Types.ObjectId,
        ref : 'users',
    }],
    GivenRequest : [{
        type : Schema.Types.ObjectId,
        ref : 'users',
    }],
    Post : [{
        type : Schema.Types.ObjectId,
        ref : 'Posts',
    }],
});

const User = mongoose.model('users',UserDetailsSchema);
module.exports = User;