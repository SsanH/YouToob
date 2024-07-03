const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

router.route('/addUser').post(userController.createUser);
router.route('/find').get(userController.findAllUsers);

module.exports = router;
