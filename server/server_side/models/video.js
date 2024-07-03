const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Video = new Schema({
    id: Number,
    img: String,
    video_src: String, // Changed from File to String
    title: String,
    artist: String,
    publication_date: String,
    views: String,
    details: String,
    likes: Number,
    user_id: Number
});

module.exports = mongoose.model('Video', Video);