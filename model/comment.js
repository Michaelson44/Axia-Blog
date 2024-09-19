const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        postId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "post"
        }, 
        commentorId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "user"
        }
    }
);

const commentModel = mongoose.model("comments", schema);
module.exports = commentModel;