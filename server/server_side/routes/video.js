const videoController = require('../controllers/video');
const multer = require('multer');
const path = require('path');
const express = require('express');
var router = express.Router();

router.route('/').get(videoController.findAllVideos);
//router.route('/').post(videoController.addVideo);

router.delete('/:id', videoController.removeVideo);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Correct the path according to where you want to store your files
        const targetPath = path.join(__dirname, '../../../web/footube/public/images/videos');
        cb(null, targetPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 100, // Max field name size
        fieldSize: 16 * 1024 * 1024 // Max field value size (2 MB in this example)
    }
});

router.post('/', upload.single('video_src'), videoController.addVideo);

module.exports = router;

// Set up storage for file uploads