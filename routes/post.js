const express = require("express");
const { makePost, getPosts, getSinglePost, likePost, updatePost, deletePost } = require("../controller/post");
const {verify} = require('../middlewares/verify');
const router = express.Router();


router.post("/post", verify, makePost);
router.get("/post", getPosts);
router.get("/post/:id", getSinglePost);
router.put("/update",verify, updatePost);
router.delete("/delete/:id",verify, deletePost);
router.put("/likes", likePost);

module.exports = router;