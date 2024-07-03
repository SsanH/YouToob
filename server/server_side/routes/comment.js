const commentController = require('../controllers/comment');

const express = require('express');
var router = express.Router();

router.route('/add').post(commentController.addComment);
router.route('/').get(commentController.getComments);

module.exports = router;
