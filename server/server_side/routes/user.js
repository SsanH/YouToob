const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

router.route('/').post(userController.createUser);
router.route('/').get(userController.findAllUsers);
router.route('/addId').post(userController.addVideoId);

module.exports = router;
