const Users = require('../models/user');

const createUser = async (newUser) => {

    const user = new Users({
         userId: newUser.userId, 
         userName: newUser.userName,
         userPassword: newUser.userPassword, 
         displayName: newUser.displayName,
         userImgFile: newUser.userImgFile
    });

    userSaved = await user.save()

    return userSaved;
}

const findAllUsers = async() => {
    const users = await Users.find();
    return users;
}

module.exports = { createUser , findAllUsers}

// const userCount = async() => {
//     const len = await User.find();
//     console.log(len);
// }

// async function userCount() {
//     const usersArr = await User.find();
//     console.log(usersArr)
// }
