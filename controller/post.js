const postModel = require("../model/post");

const makePost = async (req, res) => {
    const {creatorId, ...others} = req.body;
    const {id} = req.user;
    const newPost = new postModel({...others, creatorId: id});
    try {
        await newPost.save();
        res.json({message: "Post has been created successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({error: error.message});
    }
};

const getPosts = async (req, res) => {
    // GET ALL POST WITH THE FIND METHOD
    console.log(req.user);
    try {
        const allPost = await postModel.find().populate({path: "creatorId", select: "username email"})
                                            .populate({path: "comments", select: "comment commentorId"});
        res.json(allPost); 
    } catch (error) {
        console.log(error.message); 
        res.json({error: error.message});
    }
};

const getSinglePost = async (req, res) => {
    // GET THE ID FROM THE PARAM
    const {id} = req.params;
    // Find post by the id
    try {
        const onePost = await postModel.findById(id).populate({path: "comments", select: "title desc"});
        res.json(onePost);
    } catch (error) {
        console.log(error.message); 
        res.json({error: error.message});
    }
};

const updatePost = async (req, res) => {
    // get the creator id , likes, so user can't update them, then spread others
    const {id, creatorId, likes, ...others} = req.body;
    // get post so we can access the creator id for conditional checking
    const post = await postModel.findById(id);
    if (creatorId !== post.creatorId.toString()) {
        return res.json({error: " nigga we both know you cant update a friend's post"});
    }
    try {
        await postModel.findByIdAndUpdate(id, {...others}, {new: true});
        res.json({message: "post has been updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
};

const deletePost = async (req, res) => {
    // get the id and creator id from body;
    const {id, creatorId} = req.body;
    // get post by id to access creator id for conditional statement
    const post = await postModel.findById(id);
    if (creatorId !== post.creatorId) {
        return res.json({message: "you can only update your own post"});
    }
    try {
        await postModel.findByIdAndDelete(id);
        res.json({message: "post deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

const likePost = async (req, res) => {
    // get name from body;
    const {id, userId} = req.body;
    const thePost = await postModel.findById(id);
    if (!thePost) {
        return res.json({error: "post unavailable"});
    }
    // get our likes key to work with it
    const gottenLikes = thePost.likes;
    // check if user id is available in array
    const checkUser = gottenLikes.includes(userId);
    if (!checkUser) {
        gottenLikes.push(userId);
    } else {
        // get the index of the user, then splice it to unlike
        const index = gottenLikes.indexOf(userId);
        gottenLikes.splice(index, 1);
    }
    try {
        await postModel.findByIdAndUpdate(id, {likes: gottenLikes}, {new: true});
        checkUser ? res.json({message: "post has been liked"}) :
        res.json({message: "post disliked"});
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }

};

module.exports = {makePost, getPosts, getSinglePost, likePost, updatePost, deletePost};