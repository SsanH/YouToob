const userService = require('../services/user')

const createUser = async(req, res) => {

    res.json(await userService.createUser(req.body));
}

const findAllUsers = async(_, res) => {
    res.json(await userService.findAllUsers());
}

module.exports = { createUser , findAllUsers}
