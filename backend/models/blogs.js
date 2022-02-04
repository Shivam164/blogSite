const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type : [String],
        required : false
    },
    likes : {
        type : Number,
        required : true
    }
},{timestamp : true});

module.exports = mongoose.model('Blog',blogSchema);