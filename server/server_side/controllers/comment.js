const commentService = require('../services/comment');


const addComment = async (req, res) => {
    res.json(await commentService.addComment(req.body));
}

const getComments = async (_, res) => {
    res.json(await commentService.getComments());
}   


module.exports = { addComment, getComments }