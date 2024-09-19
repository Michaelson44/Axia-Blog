const express = require("express");
const { makeComment, getComment, getComments } = require("../controller/comments");
const {verify} = require("../middlewares/verify");
const router = express.Router();

router.post('/comment',verify, makeComment);
router.get('/comment', getComment);
router.get('/comments', getComments);

module.exports = router;