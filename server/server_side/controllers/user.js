const userService = require('../services/user')

const createUser = async(req, res) => {

    res.json(await userService.createUser(req.body));
}

const findAllUsers = async(_, res) => {
    res.json(await userService.findAllUsers());
}

const addVideoId = async (req, res) => {
    res.json(await userService.addVideoId(req.body));
}


module.exports = { createUser , findAllUsers, addVideoId}
