const Users = require('../models/user');

const createUser = async (newUser) => {

    const user = new Users({
         userId: newUser.userId, 
         userName: newUser.userName,
         userPassword: newUser.userPassword, 
         displayName: newUser.displayName,
         userImgFile: newUser.userImgFile,
         uploadedVids: []
    });

    userSaved = await user.save()

    return userSaved;
}

const findAllUsers = async() => {
    const users = await Users.find();
    return users;
}

const addVideoId = async (userId) => {

    const user = await Users.findOneAndUpdate(
        { userId: userId.user_id },
        { $push: { uploadedVids: userId.id } },
        { new: true }
    );
    return user;
};

module.exports = { createUser , findAllUsers, addVideoId}
