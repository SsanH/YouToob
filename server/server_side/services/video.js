const Video = require('../models/video');


const findAllVideos = async() => {
    const videos = await Video.find();
    return videos;
}

const removeVideo = async(videoId) => {
    return await Video.deleteOne({id: videoId});
}

const addVideo = async (videoData) => {
    
    try {
        const video = new Video(videoData);
        await video.save();
        return video;
    } catch (error) {
        // Log or handle error appropriately
        throw error;
    }
}



module.exports = { findAllVideos , addVideo, removeVideo}
