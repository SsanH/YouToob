const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

router.route('/addUser').post(userController.createUser);
router.route('/find').get(userController.findAllUsers);
router.route('/addId').post(userController.addVideoId);

module.exports = router;
