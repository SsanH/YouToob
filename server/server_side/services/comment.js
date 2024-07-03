const comment = require('../models/comment');
const Comments = require('../models/comment');

const addComment = async (newComment) => {

    const comment = new Comments({
        video_id: newComment.video_id,
        userImg: newComment.userImg,
        userName: newComment.userName,
        comment: newComment.comment,
        comment_id: newComment.comment_id
    })

    const savedComment = await comment.save();

    return savedComment;
}

const getComments = async () => {
    const comment = await Comments.find();
    return comment
}

module.exports = { addComment, getComments }

