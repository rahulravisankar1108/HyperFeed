const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    Image : 
    {
        type : String, 
        default : "",
    },
    Caption : {
        type : String,
        default : "",
    },
    Location : {
        type : String,
        default : "",
    },
});

const Posts = mongoose.model('Posts', PostSchema);
module.exports = {Posts };