const path = require('path');
const videoService = require('../services/video')

const findAllVideos = async (_, res) => {
    res.json(await videoService.findAllVideos());
}

// const addVideo = async(req,res) => {
//     res.json(await videoService.addVideo(req.body));
// }

const removeVideo = async (req, res) =>{
    const videoId = req.params.id;
    const video = await videoService.removeVideo(videoId);
    res.json(video);
}

const addVideo = (req, res) => {

    const absPath = path.resolve(req.file.path);

    const relPath = "/images/videos/";

    const videosIndex = absPath.indexOf("\\videos\\");

    const pathAfterVideos = absPath.substring(videosIndex + "\\videos\\".length);

    const endPath = path.join(relPath, pathAfterVideos);

    const videoData = {
        id: req.body.id,
        img: req.body.img,
        video_src: endPath,
        title: req.body.title,
        artist: req.body.artist,
        publication_date: new Date().toISOString(),
        details: req.body.details,
        likes: 1,
        user_id: req.body.user_id  // Assuming you have user session
    };

    videoService.addVideo(videoData)
        .then(video => res.status(201).json(video))
        .catch(error => res.status(500).json({ message: 'Failed to create video', error }));
};

module.exports = { findAllVideos, addVideo, removeVideo }
