const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// comment Schema
const commentSchema = new Schema({
    text:{
        type : String,
        defalult : '',
        trim : true,
        required : true
    },
    user:{
        type : String,
        default : '',
        required : true,
        trim : true
    }
})

// blog Shcema
const blogSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    authorId : {
        type : String,
        required : true
    },
    authorName : {
        type : String,
        required : true
    },
    comments : {
        type : [commentSchema],
        required : false
    },
    likes : {
        type : Number,
        required : true
    },
    likedBy : {
        type : [String],
    }
},{timestamp : true});

module.exports = mongoose.model('Blog',blogSchema);