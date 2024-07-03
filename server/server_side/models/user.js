const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    userId: Number,
    userName: String,
    userPassword: String,
    displayName: String,
    userImgFile: String
});

    module.exports = mongoose.model('Users', User);