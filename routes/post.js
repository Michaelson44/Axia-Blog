const express = require("express");
const { makePost, getPosts, getSinglePost, likePost, updatePost, deletePost } = require("../controller/post");
const {verify} = require('../middlewares/verify');
const router = express.Router();


router.post("/post", verify, makePost);
router.get("/post", verify, getPosts);
router.get("/post/:id", verify, getSinglePost);
router.put("/update", updatePost);
router.delete("/delete/:id", deletePost);
router.put("/likes", likePost);

module.exports = router;