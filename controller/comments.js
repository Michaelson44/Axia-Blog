const commentModel = require("../model/comment");
const postModel = require("../model/post");

const makeComment = async (req, res) => {
    // get the comment id and post id
    const {comment, postId} = req.body;
    const {id} = req.user;
    try{
    // create new instance of comment model
    const newC = new commentModel({comment, commentorId: id, postId});
    const savedUser = await newC.save();
    // modify the post comment field 
    await postModel.findByIdAndUpdate(postId, {$push: {comments: savedUser.id}});
    res.json("comment created");
    } catch (error) {
        console.log(error.message)
        res.json(error.message);
    }
};

const getComment = async (req, res) => {
    const {commentId} = req.query;
    try {
        // const id = postId.toString();
        const comment = await commentModel.findById(commentId).populate({path: "commentorId", select: "username email gender"});
        console.log(comment);
        res.json(comment);
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await commentModel.find().populate({path: "comment", select: "comment"})
                                .populate({path: "commentorId", select: "username email gender"});
        res.json(comments);
    } catch (err) {
        res.json(err.message);
    }
}

module.exports = {makeComment, getComment, getComments};
