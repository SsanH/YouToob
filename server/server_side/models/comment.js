const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Comment = new Schema({
    video_id: Number,
    userImg: String,
    userName: String,
    comment: String,
    comment_id: Number
});

    module.exports = mongoose.model('Comments', Comment);
